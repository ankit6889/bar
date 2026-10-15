"""Build vector silhouettes for product photos without changing their RGB pixels.

Requires Pillow, numpy and scipy. Run from any directory after adding stock
photos. Existing transparent photographs need no mask. Photographs with
scenery, pale edges or broad shadows use explicitly traced outlines.
"""
import hashlib
import json
from pathlib import Path

import numpy as np
from PIL import Image
from scipy import ndimage

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'photos' / 'masks'
OUT.mkdir(exist_ok=True)

# Pale, reflective glass needs a continuous contour: colour thresholds can
# mistake the bottle's own highlights for background and cut into its sides.
CURVED = {
    # These files have transparent padding around an opaque white rectangle.
    # An alpha channel alone does not mean that the background was removed.
    'absolut-citron': (
        'M209,5 Q213,0 236,0 Q257,0 262,5 L262,35 '
        'L259,39 L259,96 Q260,103 273,109 '
        'C296,119 310,139 310,164 L309,344 L310,361 L309,456 '
        'Q310,469 238,470 Q163,470 161,456 L161,362 L163,345 '
        'L160,165 C159,139 176,118 198,109 '
        'Q212,104 212,96 L212,39 L209,36Z'
    ),
    'benedictine-dom-1l': (
        'M273,103 Q300,97 327,103 Q334,105 334,116 '
        'L338,143 Q340,154 332,167 L334,281 '
        'C335,321 339,351 353,371 L414,452 Q425,463 423,482 '
        'L400,674 Q399,688 369,693 Q300,705 225,694 '
        'Q201,691 199,677 L179,482 Q177,468 187,453 '
        'L244,375 C261,351 261,318 266,282 L268,167 '
        'Q260,155 264,139 L268,113 Q269,105 273,103Z'
    ),
    'stranger-sons-perry-road-peru': (
        'M128.5,42 C133,39 150,38.5 155.5,41 '
        'Q157,43 156.5,52 L153,55 L152,59 L153.5,70 '
        'Q153,74 152.5,77 L155.5,115 '
        'Q156,122 161,128 C166,137 183,142 189,156 '
        'Q194,168 192,184 L191,211 L189,309 L189,325 '
        'C188,333 169,338 145,338 '
        'C121,338 101,334 98.5,326 '
        'L96,274 L93,211 L92.5,183 '
        'C92,166 95,155 105,146 '
        'L120,135 Q126,130 127,120 '
        'L129,77 Q129,73 131,71 L131,59 L128,53 '
        'Q127.5,47 128.5,42Z'
    ),
}

TRACED = {
    'cobalto-17': [
        [(262, 17), (286, 14), (334, 15), (350, 17), (352, 50),
         (347, 59), (348, 142), (359, 151), (382, 162), (401, 174),
         (415, 191), (424, 214), (428, 242), (429, 257), (418, 512),
         (412, 543), (401, 568), (388, 581), (369, 590), (346, 593),
         (256, 593), (231, 589), (215, 582), (203, 570), (194, 550),
         (188, 522), (183, 258), (184, 229), (190, 203), (202, 181),
         (221, 166), (249, 153), (264, 145), (265, 60), (261, 51)],
    ],
    'peller-icewine-cabernet-franc': [
        [(285, 4), (378, 1), (401, 7), (401, 547), (378, 560),
         (294, 555), (285, 550)],
        [(217, 9), (225, 6), (271, 6), (275, 10), (275, 69),
         (273, 78), (274, 174), (279, 187), (288, 203), (293, 223),
         (294, 548), (290, 560), (278, 567), (244, 570), (215, 567),
         (204, 561), (199, 550), (198, 225), (201, 209), (207, 195),
         (216, 180), (219, 167), (219, 75), (217, 65)],
    ],
    'jura-16-diurachs-own': [
        [(68, 28), (75, 20), (84, 24), (290, 20), (301, 28),
         (303, 558), (293, 566), (81, 573), (68, 554)],
        [(393, 35), (456, 35), (460, 43), (460, 75), (456, 79),
         (458, 157), (466, 183), (488, 194), (510, 211), (524, 234),
         (531, 258), (532, 278), (526, 313), (519, 357), (520, 423),
         (530, 471), (532, 503), (527, 530), (516, 550), (495, 562),
         (464, 568), (375, 568), (347, 560), (332, 545), (321, 521),
         (317, 498), (319, 465), (327, 422), (329, 370), (325, 330),
         (319, 294), (317, 268), (321, 244), (331, 222), (348, 206),
         (376, 192), (389, 179), (395, 156), (395, 79), (392, 72)],
    ],
    'jameson-triple-triple': [
        [(237, 35), (248, 28), (270, 26), (290, 28), (302, 33),
         (302, 48), (298, 57), (301, 63), (300, 82), (295, 91),
         (300, 124), (307, 241), (313, 253), (339, 272), (354, 289),
         (362, 308), (365, 329), (360, 677), (365, 703), (365, 738),
         (359, 752), (345, 761), (322, 767), (272, 770), (222, 767),
         (192, 760), (180, 751), (173, 738), (172, 714), (176, 679),
         (171, 328), (174, 306), (185, 284), (204, 267), (226, 252),
         (232, 240), (238, 124), (238, 87), (236, 75), (238, 53)],
    ],
    'scapegrace-classic': [
        [(270, 54), (280, 51), (321, 51), (330, 55), (330, 126),
         (333, 132), (337, 146), (365, 157), (375, 173), (378, 189),
         (377, 240), (374, 300), (371, 350), (370, 400), (367, 450),
         (364, 500), (362, 545), (358, 555), (350, 558), (251, 558),
         (243, 553), (240, 500), (237, 450), (234, 400), (233, 350),
         (229, 300), (228, 200), (227, 185), (229, 168), (241, 157), (266, 146),
         (269, 130)],
    ],
    'botanist-1l-gift-tin': [
        [(169, 68), (186, 63), (212, 63), (225, 68), (227, 91),
         (222, 157), (224, 200), (233, 207), (262, 214), (271, 220),
         (272, 520), (268, 534), (253, 542), (194, 547), (147, 542),
         (129, 533), (124, 520), (123, 226), (127, 216), (164, 206),
         (175, 200), (175, 158), (170, 148)],
        [(303, 113), (308, 92), (322, 76), (343, 69), (425, 66),
         (449, 71), (470, 82), (482, 100), (488, 118), (490, 477),
         (482, 495), (461, 509), (438, 514), (340, 515), (321, 507),
         (308, 491), (302, 470)],
    ],
}


def outline_paths(mask):
    """Trace pixel boundaries as SVG paths; interiors stay fully opaque."""
    padded = np.pad(mask, 1)
    edges = {}
    def edge(start, end):
        edges.setdefault(start, []).append(end)
    for y, x in zip(*np.nonzero(mask)):
        if not padded[y, x + 1]: edge((x, y), (x + 1, y))
        if not padded[y + 1, x + 2]: edge((x + 1, y), (x + 1, y + 1))
        if not padded[y + 2, x + 1]: edge((x + 1, y + 1), (x, y + 1))
        if not padded[y + 1, x]: edge((x, y + 1), (x, y))
    paths = []
    while edges:
        start = next(iter(edges))
        points = [start]
        current = start
        while current in edges:
            following = edges[current].pop()
            if not edges[current]: del edges[current]
            points.append(following)
            current = following
            if current == start: break
        # Drop collinear vertices, keeping the exact silhouette.
        simplified = []
        for point in points:
            while len(simplified) > 1:
                a, b = simplified[-2:]
                if (b[0]-a[0])*(point[1]-b[1]) != (b[1]-a[1])*(point[0]-b[0]): break
                simplified.pop()
            simplified.append(point)
        if len(simplified) > 3:
            paths.append('M' + 'L'.join(f'{x},{y}' for x, y in simplified) + 'Z')
    return ''.join(paths)


def silhouette(image):
    pixels = np.asarray(image.convert('RGB'), dtype=np.int16)
    border = np.concatenate((pixels[0], pixels[-1], pixels[:, 0], pixels[:, -1]))
    background = np.median(border, axis=0)
    foreground = np.max(np.abs(pixels-background), axis=2) > 18
    foreground = ndimage.binary_closing(foreground, iterations=2)
    labels, count = ndimage.label(foreground)
    areas = np.bincount(labels.ravel())
    areas[0] = 0
    # Discard compression specks, while retaining disconnected caps and cartons.
    keep = areas >= max(24, image.width * image.height * .00015)
    foreground = keep[labels]
    return ndimage.binary_fill_holes(foreground)


sources = json.loads((ROOT / 'stock-image-sources.json').read_text())['bottles']
masks = {}
generated = {}
for bottle_id, item in sources.items():
    source = item['asset']
    image = Image.open(ROOT / source)
    stem = Path(source).stem
    if (stem not in CURVED and stem not in TRACED
            and 'A' in image.getbands() and image.getchannel('A').getextrema()[0] < 255):
        continue
    if source not in generated:
        if stem in CURVED:
            path = CURVED[stem]
        elif stem in TRACED:
            path = ''.join('M' + 'L'.join(f'{x},{y}' for x, y in polygon) + 'Z'
                           for polygon in TRACED[stem])
        else:
            path = outline_paths(silhouette(image))
        assert path, f'Empty silhouette: {source}'
        name = f'{stem}.svg'
        svg = (
            f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {image.width} {image.height}">'
            f'<path fill="white" d="{path}"/></svg>\n')
        (OUT / name).write_text(svg)
        version = hashlib.sha256(svg.encode()).hexdigest()[:8]
        generated[source] = f'photos/masks/{name}?v={version}'
    masks[bottle_id] = generated[source]

(ROOT / 'assets' / 'photo-masks.js').write_text(
    '// Generated by scripts/build-photo-masks.py. Original photos are unchanged.\n'
    'const BOTTLE_MASKS=' + json.dumps(masks, separators=(',', ':')) + ';\n')
print(f'Built {len(generated)} SVG silhouettes for {len(masks)} bottles.')
