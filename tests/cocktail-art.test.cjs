const test=require('node:test');
const assert=require('node:assert/strict');
const {RECIPES}=require('../assets/data');
const art=require('../assets/cocktail-art');
test('every recipe has an explicit visual profile rather than a name-based guess',()=>{
 for(const recipe of RECIPES)assert.ok(art.profiles[recipe.n],recipe.n);
});
test('recognizable serves preserve glassware, toppings and ice differences',()=>{
 assert.equal(art.profiles['Negroni'].glass,'rocks');
 assert.equal(art.profiles['Dry Martini'].glass,'coupe');
 assert.equal(art.profiles['Gin & Tonic'].glass,'highball');
 assert.equal(art.profiles['Moscow Mule'].glass,'copper');
 assert.equal(art.profiles['Espresso Martini'].foam,'coffee');
 assert.equal(art.profiles['Espresso Martini'].garnish,'beans');
 assert.equal(art.profiles['Margarita'].rim,'salt');
 assert.equal(art.profiles['Irish Coffee'].glass,'hot');
 assert.equal(art.profiles['Irish Coffee'].ice,'none');
 assert.equal(art.profiles['B-52 (needs Baileys)'].layers.length,3);
 assert.notEqual(art.profiles['White Russian'].color,art.profiles['Black Russian'].color);
});
test('only carbonated drinks get bubbles and SVG definitions stay unique',()=>{
 const gin=art.render('Gin & Tonic','glass-a');
 const negroni=art.render('Negroni','glass-b');
 assert.match(gin,/class="bubble"/);
 assert.doesNotMatch(negroni,/class="bubble"/);
 assert.match(gin,/id="glass-a-clip"/);
 assert.doesNotMatch(negroni,/glass-a/);
 for(const recipe of RECIPES){
  const svg=art.render(recipe.n,'check');
  assert.ok(svg.startsWith('<svg'),recipe.n);
  assert.ok(!/undefined|NaN/.test(svg),recipe.n);
 }
});
