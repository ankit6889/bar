/* Recipe-specific serves. Keep these aligned with the preparation in data.js. */
const CocktailArt=(()=>{
 const profiles={};
 function add(name,glass,color,ice='none',garnish='',extra={}){
  profiles[name]={glass,color,ice,garnish,...extra};
 }
 add('Gin & Tonic','highball','#e0e9ce','cubes','lime',{fizz:true,clear:true});
 add('Dry Martini','coupe','#e6dfac','none','lemon-twist',{clear:true});
 add('Gibson','coupe','#e5e5ca','none','onion',{clear:true});
 add('Negroni','rocks','#c53e22','big','orange');
 add('Gimlet','coupe','#cbdc87','none','lime');
 add('Tom Collins','highball','#e8e1a5','cubes','lemon-cherry',{fizz:true});
 add('French 75','flute','#dfc879','none','lemon-twist',{fizz:true});
 add('Last Word','coupe','#a8b967','none','cherry');
 add('Bijou','coupe','#a57b30','none','cherry');
 add('Martinez','coupe','#a34d25','none','orange-twist');
 add('Casino','coupe','#e5d39e','none','cherry');
 add('Corpse Reviver #2','coupe','#dfd7a4','none','lemon-twist');
 add('Vesper','martini','#e6e6c7','none','lemon-twist',{clear:true});
 add("Bee's Knees",'coupe','#e6bd50','none','lemon-twist');
 add('White Lady','coupe','#e6e2bd','none','lemon-twist',{foam:'white'});
 add('Hugo Spritz','wine','#e0dfae','cubes','mint-lime',{fizz:true,clear:true});
 add('Elderflower Collins','highball','#e4d7a0','cubes','lemon',{fizz:true});
 add('Bloody Shiraz Spritz','wine','#9d3058','cubes','lemon',{fizz:true});
 add('Old Fashioned','rocks','#b97224','big','orange-twist');
 add('Whiskey Sour','rocks','#d6b16a','cubes','lemon-cherry',{foam:'white',bitters:true});
 add('Manhattan','coupe','#9b462a','none','cherry');
 add('Boulevardier','rocks','#ad3d22','big','orange-twist');
 add('Gold Rush','rocks','#ddb858','big','lemon');
 add('Penicillin','rocks','#c9a04c','big','ginger',{float:'#9b5c27'});
 add('Whisky Highball','highball','#d5ad5c','cubes','lemon-twist',{fizz:true,clear:true});
 add('Rob Roy','coupe','#975126','none','cherry');
 add('Tipperary','coupe','#9c812d','none','orange-twist');
 add('Irish Coffee','hot','#392418','none','',{foam:'cream',hot:true});
 add('Sazerac','rocks','#bf8b3a','none','');
 add('Vieux Carré','rocks','#a6682e','big','lemon-twist');
 add('Fancy Free','rocks','#c17d36','big','orange-twist');
 add('Brooklyn (bourbon)','coupe','#b4733e','none','cherry');
 add('Seelbach','flute','#b88034','none','orange-twist',{fizz:true});
 add('Hot Toddy','hot','#ceac58','none','lemon-cinnamon',{hot:true});
 add('Lynchburg Lemonade','highball','#d6cf8c','cubes','lemon',{fizz:true});
 add('Honey Highball','highball','#d5b961','cubes','lemon',{fizz:true});
 add('Daiquiri','coupe','#e1e3bc','none','lime');
 add('Mojito','highball','#dbe0b3','crushed','mint-lime',{fizz:true,mint:true,clear:true});
 add('Cuba Libre','highball','#542a19','cubes','lime',{fizz:true});
 add('Monk & Cola','highball','#3d251c','cubes','lime',{fizz:true});
 add("Dark 'n' Stormy",'highball','#d6b46b','cubes','lime',{float:'#653018',fizz:true});
 add('Jungle Bird','rocks','#c3693c','crushed','pineapple');
 add("Queen's Park Swizzle",'highball','#c6cd8c','crushed','mint-lime',{mint:true,float:'#773a27'});
 add('Piña Colada (Malibu)','hurricane','#eee4b4','none','pineapple-cherry',{foam:'cream',straw:true});
 add('Mary Pickford','coupe','#dc947e','none','cherry');
 add('Margarita','rocks','#d3dd9a','cubes','lime',{rim:'salt'});
 add("Tommy's Margarita",'rocks','#c9d395','big','lime');
 add('Paloma','highball','#e7b9a9','cubes','grapefruit',{fizz:true,rim:'salt'});
 add('Ranch Water','highball','#d9e5c9','cubes','lime',{clear:true,fizz:true});
 add('Tequila Sunrise','hurricane','#f2ba48','cubes','orange-cherry',{bottom:'#c13935'});
 add('Arak Madu','rocks','#dfd08c','cubes','lime');
 add('Espresso Martini','martini','#56311e','none','beans',{foam:'coffee'});
 add('White Russian','rocks','#c4a079','cubes','',{foam:'cream',bottom:'#603820',cream:true});
 add('Black Russian','rocks','#40271d','cubes','');
 add('Cosmopolitan','martini','#d3617d','none','orange-twist');
 add('Moscow Mule','copper','#d7c392','crushed','mint-lime',{fizz:true});
 add('Kamikaze','martini','#dce3b7','none','lime');
 add('Lemon Drop','coupe','#e9d782','none','lemon-twist',{rim:'sugar'});
 add('Sex on the Beach','highball','#e9a34a','cubes','orange-cherry',{bottom:'#b83c50'});
 add('Fuzzy Navel','highball','#f0b448','cubes','orange');
 add('Aperol Spritz','wine','#ee8d2a','cubes','orange',{fizz:true});
 add('Campari Spritz','wine','#cc4939','cubes','orange',{fizz:true});
 add('Fiero Spritz','wine','#e1713f','cubes','orange',{fizz:true});
 add('Americano','highball','#b64a2a','cubes','orange',{fizz:true});
 add('Milano-Torino','rocks','#a13926','big','orange-twist');
 add('Negroni Sbagliato','wine','#bf5235','cubes','orange',{fizz:true});
 add('Garibaldi','highball','#ed9d38','cubes','orange',{foam:'orange'});
 add('Amaretto Sour','rocks','#cbb175','cubes','lemon-cherry',{foam:'white'});
 add('Godfather','rocks','#b58138','big','orange-twist');
 add('Champagne Cocktail','flute','#d7ba61','none','lemon-twist',{fizz:true,sugarCube:true});
 add('Mimosa','flute','#edb84d','none','',{fizz:true});
 add('Bellini (peach)','flute','#e9bd99','none','',{fizz:true});
 add('Death in the Afternoon','flute','#cbd69b','none','',{fizz:true});
 add('Ricard Pastis (classic)','highball','#e0ddb5','cubes','');
 add('Chartreuse Tonic','highball','#b4c36f','cubes','lime',{fizz:true});
 add('Kindschi Kirsch Fizz','highball','#be7a7c','cubes','lemon',{fizz:true});
 add('Grand Sidecar','coupe','#d5ae62','none','orange-twist',{rim:'sugar'});
 add('Port & Tonic','highball','#b98a60','cubes','orange',{fizz:true});
 add('Fireball Mule','copper','#cfa95f','crushed','lime-cinnamon',{fizz:true});
 add('B-52 (needs Baileys)','shot','#c69b69','none','',{layers:['#d99b44','#d3ba93','#442b20']});
 add('Paper Plane (needs Amaro Nonino)','coupe','#df9766','none','lemon-twist');
 add('Hanky Panky (needs Fernet)','coupe','#975530','none','orange-twist');
 add('Mai Tai (needs orgeat)','rocks','#cfa263','crushed','mint-lime',{straw:true});
 add('Hemingway Daiquiri','coupe','#e1d8b1','none','grapefruit');

 // Mouth position, liquid surface and bowl silhouette are independent, so
 // toppings and garnishes follow the vessel rather than one generic drawing.
 const vessels={
  rocks:{d:'M75 112 Q160 124 245 112 L235 273 Q160 291 85 273Z',x:75,y:112,w:170,level:146,base:282},
  highball:{d:'M103 58 Q160 66 217 58 L208 278 Q160 289 112 278Z',x:103,y:58,w:114,level:91,base:286},
  coupe:{d:'M53 100 Q160 118 267 100 C260 150 225 188 160 190 C95 188 60 150 53 100Z',x:53,y:100,w:214,level:122,base:190,stem:true},
  martini:{d:'M55 86 Q160 101 265 86 L167 212 Q160 219 153 212Z',x:55,y:86,w:210,level:111,base:216,stem:true},
  flute:{d:'M125 42 Q160 48 195 42 L189 179 Q188 224 160 230 Q132 224 131 179Z',x:125,y:42,w:70,level:73,base:230,stem:true},
  wine:{d:'M106 58 Q160 69 214 58 C228 94 249 155 222 193 Q199 228 160 232 Q121 228 98 193 C71 155 92 94 106 58Z',x:106,y:58,w:108,level:105,base:232,stem:true},
  hurricane:{d:'M108 55 Q160 69 212 55 C216 88 190 121 193 151 C196 185 229 217 214 252 Q200 276 160 279 Q120 276 106 252 C91 217 124 185 127 151 C130 121 104 88 108 55Z',x:108,y:55,w:104,level:87,base:279,stem:true},
  copper:{d:'M83 112 Q150 126 224 112 L220 260 Q153 287 89 260Z',x:83,y:112,w:141,level:119,base:278,handle:true,metal:true},
  hot:{d:'M88 112 Q150 126 219 112 L213 254 Q153 275 94 254Z',x:88,y:112,w:131,level:137,base:268,handle:true,stem:true},
  shot:{d:'M110 133 Q160 144 210 133 L194 276 Q160 286 126 276Z',x:110,y:133,w:100,level:155,base:284},
 };
 const leaf=(x,y,r=0)=>`<path d="M${x} ${y}q-23-5-19-30q24 2 19 30q26-3 27-25q-24-3-27 25" fill="#659056" stroke="#b1c385" stroke-width="1" transform="rotate(${r} ${x} ${y})"/>`;
 function citrus(kind,x,y,r=26){
  const colors=kind==='lime'?['#7e9a49','#d4dd87']:kind==='grapefruit'?['#e9cb93','#e99486']:kind==='lemon'?['#d7bd57','#f1e3a1']:['#d58b40','#f0bc68'];
  return `<g transform="translate(${x} ${y}) rotate(-18)"><circle r="${r}" fill="${colors[0]}"/><circle r="${r-4}" fill="${colors[1]}" stroke="#f4e2b2" stroke-width="2"/>${Array.from({length:8},(_,i)=>`<path d="M0 0L${Math.cos(i*Math.PI/4)*(r-6)} ${Math.sin(i*Math.PI/4)*(r-6)}" stroke="#fff4ce" stroke-opacity=".7" stroke-width="1.3"/>`).join('')}<circle r="2" fill="#f7edc9"/></g>`;
 }
 function garnish(p,v){
  const x=v.x+v.w-9,y=v.y+4,g=p.garnish;
  let out='';
  const afloat=markup=>`<g class="drink-garnish-floating">${markup}</g>`;
  if(/twist/.test(g))out+=afloat(`<g transform="translate(${v.x+v.w*.64-x+20} ${v.level-y+5})"><path d="M${x-28} ${y-17}c-37 10 31 21 6 37c-9 6-25 1-25-6" fill="none" stroke="${g.startsWith('orange')?'#edab51':'#e5d77b'}" stroke-width="8" stroke-linecap="round"/></g>`);
  else if(/lime|lemon|orange|grapefruit/.test(g))out+=citrus(g.includes('lime')?'lime':g.includes('lemon')?'lemon':g.includes('grapefruit')?'grapefruit':'orange',x,y,25);
  if(g.includes('mint'))out+=afloat(`<path d="M${v.x+22} ${v.level+16}l5-30" stroke="#66874e" stroke-width="2"/>`+leaf(v.x+18,v.level-2,-25)+leaf(v.x+32,v.level-4,25));
  if(g.includes('cherry')){const cherry=`<path d="M${x-22} ${y+30}q14-30 31-20" fill="none" stroke="#7b8448" stroke-width="2"/><circle cx="${x-22}" cy="${y+30}" r="10" fill="#8f2834"/><circle cx="${x-25}" cy="${y+26}" r="2.5" fill="#df9390"/>`;out+=g==='cherry'?afloat(`<g transform="translate(-18 ${v.level-y-20})">${cherry}</g>`):cherry;}
  if(g==='onion')out+=`<path d="M104 140l118-65" stroke="#c3aa77" stroke-width="2"/><circle cx="171" cy="103" r="12" fill="#ede7cc"/><circle cx="188" cy="94" r="11" fill="#e0dfc0"/>`;
  if(g==='beans')out+=afloat([[145,v.level+3,-24],[168,v.level+2,20],[157,v.level+12,70]].map(([x,y,r])=>`<g transform="translate(${x} ${y}) rotate(${r})"><ellipse rx="7" ry="4.5" fill="#3b2319"/><path d="M-5 0q5-2 10 0" stroke="#a17a55" stroke-width="1" fill="none"/></g>`).join(''));
  if(g.includes('pineapple'))out+=`<g transform="translate(${x-13} ${y-10}) rotate(13)"><path d="M-17 15L16-32L34 15Z" fill="#f0cc70" stroke="#b79540" stroke-width="3"/><path d="M18-29L8-57L22-44L29-65L32-40L45-51L34-22" fill="#60865c"/></g>`;
  if(g.includes('cinnamon'))out+=`<path d="M${v.x+27} ${v.y+34}l17-68m-12 68l17-68" stroke="#98613e" stroke-width="5" stroke-linecap="round"/>`;
  if(g==='ginger')out+=`<path d="M${x-23} ${y+1}l16-22 19 11-14 23Z" fill="#d8b477" stroke="#f0d6a4" stroke-width="2"/>`;
  return out;
 }
 function ice(p,v){
  if(p.ice==='none')return '';
  const r=p.ice==='big'?88:43,mid=v.x+v.w/2;
  const cubes=p.ice==='big'?[[mid,v.level+65,8]]:p.ice==='crushed'?Array.from({length:18},(_,i)=>[mid-35+(i%4)*23,v.level+12+Math.floor(i/4)*25,i*29]):[[mid-16,v.level+28,-14],[mid+19,v.level+74,18],[mid-8,v.level+121,-8]];
  return cubes.map(([x,y,rotate],i)=>{
   const crushed=p.ice==='crushed',large=p.ice==='big',size=crushed?18:r;
   // Keep the placement on the outer group; each inner cube drifts separately.
   const dx=(i%2?-1:1)*(crushed?.8:large?1.2:2.4),dy=crushed?1:large?1.7:3;
   return `<g transform="translate(${x} ${y}) rotate(${rotate})"><g class="ice-drift" style="--ice-x:${dx}px;--ice-y:${dy}px;--ice-tilt:${(i%2?-1:1)*(crushed?2:large?2.5:4)}deg;--ice-duration:${5.6+(i%5)*.83}s;--ice-phase:-${.9+i*1.37}s"><rect x="${-size/2}" y="${-size/2}" width="${size}" height="${size}" rx="${size/6}" fill="#f4f5e9" fill-opacity=".24" stroke="#f7f5db" stroke-opacity=".53" stroke-width="1.4"/><path d="M${-size/2+4} ${size/2-4}v${-size+8}h${size-8}" fill="none" stroke="#fff9e2" stroke-opacity=".48" stroke-width="2"/></g></g>`}).join('');
 }
 function render(name,id){
  const p=profiles[name]||{glass:'rocks',color:'#d1bc82',ice:'none',garnish:''},v=vessels[p.glass],cx=v.x+v.w/2;
  const foam=p.foam?({coffee:'#b98b5a',cream:'#f1e8ce',orange:'#f7cc75',white:'#f5efdc'}[p.foam]):null;
  let liquid=`<path d="M40 ${v.level}Q110 ${v.level-5} 160 ${v.level}T280 ${v.level}V300H40Z" fill="url(#${id}-liquid)"/>`;
  if(p.layers)liquid=p.layers.map((c,i)=>`<rect x="40" y="${v.level+i*42}" width="240" height="43" fill="${c}"/>`).join('');
  if(p.float)liquid+=`<path d="M40 ${v.level}H280V${v.level+35}Q180 ${v.level+45} 40 ${v.level+26}Z" fill="${p.float}" opacity=".8"/>`;
  if(p.cream)liquid+=`<path d="M75 ${v.level}H245V175Q188 168 190 203T145 222Q167 179 105 190Z" fill="#eadbc0" opacity=".7"/>`;
  liquid+=ice(p,v);
  if(p.mint)liquid+=leaf(cx-25,v.level+64,25)+leaf(cx+16,v.level+125,-35);
  if(p.sugarCube)liquid+='<rect x="148" y="211" width="19" height="17" rx="3" fill="#d2a168"/>';
  if(foam)liquid+=`<path d="M40 ${v.level-2}Q160 ${v.level-12} 280 ${v.level-2}V${v.level+13}Q170 ${v.level+23} 40 ${v.level+12}Z" fill="${foam}"/>`;
  if(p.bitters)liquid+=[136,155,175].map(x=>`<ellipse cx="${x}" cy="${v.level+6}" rx="4" ry="2" fill="#9c5536"/>`).join('');
  const bubbles=p.fizz?Array.from({length:7},(_,i)=>`<circle class="bubble" cx="${cx-25+(i%3)*22}" cy="${v.level+35+(i%4)*23}" r="${1.3+i%2}" fill="#fff8db" opacity=".55" style="animation-delay:-${i*.73}s"/>`).join(''):'';
  const stem=v.stem?`<path d="M160 ${v.base}V301m-36 7q36-12 72 0" stroke="#e6edde" stroke-opacity=".65" stroke-width="2.5" fill="none"/><path d="M163 ${v.base+3}V298" stroke="#fff" stroke-opacity=".15"/>`:'';
  const handle=v.handle?`<path d="M${v.x+v.w-2} 143C283 122 286 228 ${v.x+v.w-5} 231" fill="none" stroke="${v.metal?'#b77649':'#b8d1c0'}" stroke-opacity=".8" stroke-width="10"/><path d="M${v.x+v.w} 143C274 132 278 222 ${v.x+v.w} 228" fill="none" stroke="#f0cba3" stroke-opacity=".55" stroke-width="2"/>`:'';
  const salt=p.rim?`<path d="M${v.x} ${v.y}Q${cx} ${v.y+13} ${v.x+v.w} ${v.y}" fill="none" stroke="#f3eedb" stroke-width="5" stroke-dasharray="1 4" stroke-linecap="round"/>`:'';
  const steam=p.hot?`<g class="drink-steam" fill="none" stroke="#f0e8d1" stroke-opacity=".35" stroke-width="2.5" stroke-linecap="round"><path d="M133 92c-15-17 16-25 2-43m29 43c-15-17 16-25 2-43m29 43c-15-17 16-25 2-43"/></g>`:'';
  return `<svg class="cocktail-art" viewBox="0 0 320 340" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" data-drink="${name.replace(/[&<>"']/g,'')}" style="--motion-phase:-${name.length%7*.7}s;--liquid-origin:${cx}px ${v.level}px"><defs><clipPath id="${id}-clip"><path d="${v.d}"/></clipPath><clipPath id="${id}-surface"><ellipse cx="${cx}" cy="${v.y+5}" rx="${v.w/2-3}" ry="11"/></clipPath><linearGradient id="${id}-liquid" x1="0" y1="0" x2="0" y2="1"><stop stop-color="${p.color}" stop-opacity="${p.clear?.53:.96}"/><stop offset="1" stop-color="${p.bottom||p.color}" stop-opacity="${p.clear?.78:1}"/></linearGradient><linearGradient id="${id}-glass"><stop stop-color="#e9f5e0" stop-opacity=".23"/><stop offset=".2" stop-color="#e9f5e0" stop-opacity=".03"/><stop offset=".8" stop-color="#e9f5e0" stop-opacity=".07"/><stop offset="1" stop-color="#e9f5e0" stop-opacity=".24"/></linearGradient><linearGradient id="${id}-copper"><stop stop-color="#703b25"/><stop offset=".3" stop-color="#db9f68"/><stop offset=".55" stop-color="#b16a3e"/><stop offset=".85" stop-color="#e0a670"/><stop offset="1" stop-color="#81482b"/></linearGradient></defs><ellipse cx="160" cy="314" rx="${v.stem?64:88}" ry="8" fill="#0a1511" opacity=".25"/>${handle}${stem}<path d="${v.d}" fill="url(#${id}-${v.metal?'copper':'glass'})" stroke="#e5edde" stroke-opacity=".5" stroke-width="1.5"/><g clip-path="url(#${id}-clip)">${v.metal?`<g clip-path="url(#${id}-surface)"><g class="drink-fluid"><ellipse cx="${cx}" cy="${v.y+7}" rx="${v.w/2-4}" ry="13" fill="${p.color}"/>${ice({...p,ice:'crushed'},{...v,level:v.y-8})}</g></g>`:`<g class="drink-fluid">${liquid}</g>${bubbles}<path d="M${v.x+8} ${v.y+15}Q${v.x+16} ${v.base-25} ${v.x+18} ${v.base-14}" stroke="#fffce5" stroke-opacity=".43" stroke-width="3" fill="none" stroke-linecap="round"/>`}</g><path d="${v.d}" fill="none" stroke="#ecf1df" stroke-opacity=".35" stroke-width="1.5"/><ellipse cx="${cx}" cy="${v.y+3}" rx="${v.w/2}" ry="7" fill="none" stroke="${v.metal?'#eec28b':'#eef1df'}" stroke-opacity=".65" stroke-width="2"/>${salt}${p.straw?`<path d="M183 210l31-170h24" stroke="#decba3" stroke-width="5" fill="none" stroke-linejoin="round"/>`:''}${garnish(p,v)}${steam}</svg>`;
 }
 return {profiles,render};
})();
if(typeof module!=='undefined')module.exports=CocktailArt;
