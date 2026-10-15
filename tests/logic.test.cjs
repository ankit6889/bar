const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const {BOTTLES, PANTRY, RECIPES} = require('../assets/data.js');
const logic = fs.existsSync(require('node:path').join(__dirname, '../assets/logic.js')) ? require('../assets/logic.js') : {};
const pantry = Object.fromEntries(PANTRY.map(p=>[p.id,p.def]));
// These tests protect actual collection filters, cocktail availability and saved preferences.
test('a flavour search finds the bottle without depending on punctuation or accents',()=>{
 assert.equal(typeof logic.filterBottles,'function','Collection filtering is not implemented');
 const result=logic.filterBottles(BOTTLES,{query:'hendricks cucumber',category:'All',status:'All',sort:'collection',favorites:[]});
 assert.ok(result.some(b=>b.id==='hendricks-original'));
 assert.ok(!result.some(b=>b.id==='gordons-london-dry'));
});
test('favourite filtering does not leak other bottles into the result',()=>{
 assert.equal(typeof logic.filterBottles,'function','Favourite filtering is not implemented');
 assert.deepEqual(logic.filterBottles(BOTTLES,{query:'',category:'All',status:'Favorites',sort:'collection',favorites:['monkey-47']}).map(b=>b.id),['monkey-47']);
});
test('taking tonic out of the pantry changes Gin & Tonic from ready to one item missing',()=>{
 assert.equal(typeof logic.evaluateRecipe,'function','Pantry availability is not implemented');
 const recipe=RECIPES.find(r=>r.n==='Gin & Tonic');
 assert.equal(logic.evaluateRecipe(recipe,BOTTLES,pantry).missing.length,0);
 const result=logic.evaluateRecipe(recipe,BOTTLES,{...pantry,tonic:false});
 assert.equal(result.missing.length,1);
 assert.equal(result.missing[0].p,'tonic');
});
test('a bottle-specific cocktail filter includes drinks that can use that bottle',()=>{
 assert.equal(typeof logic.filterRecipes,'function','Bottle-specific cocktail discovery is not implemented');
 const gin=BOTTLES.find(b=>b.id==='stranger-sons-gin');
 const matches=logic.filterRecipes(RECIPES,BOTTLES,pantry,{query:'',availability:'all',style:'All',bottle:gin});
 assert.ok(matches.some(x=>x.recipe.n==='Negroni'));
 assert.ok(!matches.some(x=>x.recipe.n==='White Russian'));
});
test('serving controls scale measured pours and preserve qualitative instructions',()=>{
 assert.equal(typeof logic.scaleAmount,'function','Serving controls are not implemented');
 assert.equal(logic.scaleAmount('22ml',2),'44 ml');
 assert.equal(logic.scaleAmount('a dash',2),'a dash');
});
test('saved preferences preserve valid choices and discard stale bottle IDs',()=>{
 assert.equal(typeof logic.sanitizePreferences,'function','Saved preferences are not implemented');
 const p=logic.sanitizePreferences({favorites:['monkey-47','deleted-bottle'],pantry:{tonic:false,nonexistent:true}},BOTTLES,PANTRY);
 assert.deepEqual(p.favorites,['monkey-47']);
 assert.equal(p.pantry.tonic,false);
 assert.equal(p.pantry.lime,true);
 assert.equal(p.pantry.nonexistent,undefined);
});

test('mixing with a selected bottle uses that bottle even when another matching bottle is fuller',()=>{
 const gin=BOTTLES.find(b=>b.id==='seven-seasons-green-ant-gin');
 const r=RECIPES.find(r=>r.n==='Negroni');
 const result=logic.evaluateRecipe(r,BOTTLES,pantry,gin);
 assert.equal(result.uses.find(u=>u.ingredient.n==='Gin').bottle.id,gin.id);
});
test('selected rum is preferred across ingredient alternatives',()=>{
 const bottle=BOTTLES.find(b=>b.id==='maka-zai-gold-rum');
 assert.ok(bottle,'Expected collection rum');
 const r=RECIPES.find(r=>r.n==="Dark 'n' Stormy");
 assert.ok(r);
 assert.equal(logic.evaluateRecipe(r,BOTTLES,pantry,bottle).uses.find(u=>u.ingredient.t).bottle.id,bottle.id);
});
test('batch method scales measured mixers, quantities and dashes while preserving ratios and years',()=>{
 assert.equal(logic.scaleMethod('Shake 25ml lemon, 15ml simple (2:1). A classic from 1920.',2),'Shake 50 ml lemon, 30 ml simple (2:1). A classic from 1920.');
 assert.equal(logic.scaleMethod('Shake 60/25/20. Add 2-3 dashes bitters.',2),'Shake 120/50/40. Add 4–6 dashes bitters.');
 assert.equal(logic.scaleAmount('2 dashes',2),'4 dashes');
});
test('stirred filter excludes cocktails explicitly labelled shaken',()=>{
 const rows=logic.filterRecipes(RECIPES,BOTTLES,pantry,{availability:'all',style:'Stirred'});
 assert.ok(!rows.some(x=>x.recipe.n==='Margarita'));
 assert.ok(rows.some(x=>x.recipe.n==='Negroni'));
});

// Removing the default category/name sort must fail this shuffled-collection check.
test('default collection order groups categories and alphabetizes bottles without mutating inventory',()=>{
 const bottles=[
  {id:'rum',cat:'Rum',name:'Alpha',fill:'low',price:100},
  {id:'gin-z',cat:'Gin',name:'Zulu',fill:'full',price:300},
  {id:'wine',cat:'Wine',name:'Bravo',fill:'half',price:200},
  {id:'gin-a',cat:'Gin',name:'Alpha',fill:'half',price:50},
 ];
 assert.deepEqual(logic.filterBottles(bottles).map(b=>b.id),['gin-a','gin-z','rum','wine']);
 assert.deepEqual(logic.filterBottles(bottles,{category:'Gin'}).map(b=>b.id),['gin-a','gin-z']);
 assert.deepEqual(logic.filterBottles([...bottles].reverse()).map(b=>b.id),['gin-a','gin-z','rum','wine']);
 assert.deepEqual(bottles.map(b=>b.id),['rum','gin-z','wine','gin-a']);
 assert.equal(logic.filterBottles(bottles,{sort:'level'})[0].id,'rum');
 assert.equal(logic.filterBottles(bottles,{sort:'price'})[0].id,'gin-z');
});

test('duplicate bottles share one label while retaining each inventory record',()=>{
 const groups=logic.groupBottles(logic.filterBottles(BOTTLES),BOTTLES);
 const gin=groups.find(g=>g.name==='Cherrapunji Eastern Craft Gin');
 assert.equal(gin.bottles.length,3);
 assert.equal(gin.matches.length,3);
 assert.equal(gin.bottle.id,'cherrapunji-2-open');
 assert.equal(groups.reduce((n,g)=>n+g.bottles.length,0),94);
 assert.equal(new Set(groups.flatMap(g=>g.bottles.map(b=>b.id))).size,94);
 const vodka=groups.find(g=>g.name==='Absolut Original');
 assert.deepEqual(vodka.bottles.map(b=>b.vol).sort((a,b)=>a-b),[750,1000]);
 assert.ok(groups.some(g=>g.name==='Absolut Citron'));
 assert.equal(groups.find(g=>g.name==='Angostura Aromatic Bitters').bottles.length,2);
 assert.ok(groups.some(g=>g.name==='Angostura Orange Bitters'));
});
test('filtered groups distinguish matching bottles from total stock',()=>{
 const matches=logic.filterBottles(BOTTLES,{query:'cherrapunji',status:'Opened'});
 const [group]=logic.groupBottles(matches,BOTTLES);
 assert.equal(group.matches.length,1);
 assert.equal(group.bottles.length,3);
 assert.equal(group.bottle.id,'cherrapunji-2-open');
 const [sealed]=logic.groupBottles(logic.filterBottles(BOTTLES,{query:'cherrapunji',status:'Attic'}),BOTTLES);
 assert.equal(sealed.matches.length,2);
 assert.equal(sealed.bottle.opened,false);
 assert.deepEqual(logic.groupBottles([],BOTTLES),[]);
});
test('known backup packaging shares a label without merging different recipes or strengths away',()=>{
 const groups=logic.groupBottles(logic.filterBottles(BOTTLES),BOTTLES);
 assert.equal(groups.find(g=>g.name==='Kahlua The Original').bottles.length,2);
 assert.equal(groups.find(g=>g.name==='The Botanist Islay Dry Gin').bottles.length,2);
 const rum=groups.find(g=>g.name==='Bacardi Carta Blanca Superior White Rum');
 assert.deepEqual(rum.bottles.map(b=>b.abv).sort((a,b)=>a-b),[40,42.8]);
 assert.equal(groups.filter(g=>g.name.startsWith("Hendrick's")).length,2);
});
