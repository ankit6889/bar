const BarLogic = (() => {
 const fillPercent={full:100,'3/4':75,'2/3':66,half:50,'1/3':33,'1/4':25,low:10,unknown:50};
 const normalize=s=>String(s??'').normalize('NFD').replace(/\p{M}/gu,'').toLowerCase().replace(/[’']/g,'').replace(/[^\p{L}\p{N}]+/gu,' ').trim();
 function filterBottles(bottles,options={}){
  const {query='',category='All',status='All',sort='collection',favorites=[]}=options;
  const words=normalize(query).split(/\s+/).filter(Boolean),saved=new Set(favorites);
  let result=bottles.filter(b=>{
   if(category!=='All'&&b.cat!==category)return false;
   if(status==='Favorites'&&!saved.has(b.id))return false;
   if(status==='Opened'&&!b.opened)return false;
   if(status==='Sealed'&&b.opened)return false;
   if(status==='Running low'&&!['low','1/4'].includes(b.fill))return false;
   if(status==='Main bar'&&b.loc!=='main bar')return false;
   if(status==='Attic'&&b.loc!=='attic shelf')return false;
   const hay=normalize([b.name,b.brand,b.sub,...(b.flav||[]),...(b.tags||[])].join(' '));
   return words.every(w=>hay.includes(w));
  });
  if(sort==='name')result.sort((a,b)=>a.name.localeCompare(b.name));
  if(sort==='level')result.sort((a,b)=>(fillPercent[a.fill]??50)-(fillPercent[b.fill]??50));
  if(sort==='price')result.sort((a,b)=>(b.price||0)-(a.price||0));
  return result;
 }
 function ingredientStatus(ing,bottles,pantry,preferredBottle=null){
  if(ing.p)return pantry[ing.p]?{ok:true,use:ing.n}:{ok:false,need:ing.n,p:ing.p};
  if(preferredBottle&&(ing.t||[]).some(t=>(preferredBottle.tags||[]).includes(t))&&bottles.some(b=>b.id===preferredBottle.id))return {ok:true,use:preferredBottle.name,bottle:preferredBottle,low:['low','1/4'].includes(preferredBottle.fill)};
  for(const tag of ing.t||[]){
   const matches=bottles.filter(b=>(b.tags||[]).includes(tag));
   if(matches.length){
    const bottle=matches.find(b=>b.id===preferredBottle?.id)||matches.slice().sort((a,b)=>(fillPercent[b.fill]??50)-(fillPercent[a.fill]??50))[0];
    return {ok:true,use:bottle.name,bottle,low:matches.every(b=>['low','1/4'].includes(b.fill))};
   }
  }
  return {ok:false,need:ing.n,tags:ing.t||[]};
 }
 function evaluateRecipe(recipe,bottles,pantry,preferredBottle=null){
  const missing=[],uses=[];
  for(const ingredient of recipe.i){
   const status=ingredientStatus(ingredient,bottles,pantry,preferredBottle);
   if(status.ok)uses.push({...status,ingredient});else missing.push({...status,ingredient});
  }
  return {missing,uses,anyLow:uses.some(u=>u.low),ready:missing.length===0};
 }
 function styleMatches(recipe,style){
  const s=normalize(recipe.s),n=normalize(recipe.n);
  if(style==='All')return true;
  if(style==='Stirred')return /stirred/.test(s)||(/stir/.test(normalize(recipe.m))&&!/shaken/.test(s));
  if(style==='Long')return /tall|highball|long|mug|fizzy/.test(s);
  if(style==='Sparkling')return /sparkling|spritz|brunch/.test(s);
  if(style==='Shaken')return /shaken|sour|tiki/.test(s);
  return true;
 }
 function filterRecipes(recipes,bottles,pantry,options={}){
  const {query='',availability='ready',style='All',bottle=null}=options,words=normalize(query).split(/\s+/).filter(Boolean);
  return recipes.map(recipe=>({recipe,evaluation:evaluateRecipe(recipe,bottles,pantry)})).filter(({recipe,evaluation})=>{
   if(availability==='ready'&&!evaluation.ready)return false;
   if(availability==='almost'&&evaluation.missing.length!==1)return false;
   if(!styleMatches(recipe,style))return false;
   if(bottle&&!recipe.i.some(i=>(i.t||[]).some(tag=>(bottle.tags||[]).includes(tag))))return false;
   return words.every(w=>normalize([recipe.n,recipe.s,...recipe.i.map(i=>i.n)].join(' ')).includes(w));
  });
 }
 function scaleAmount(amount,servings=1){
  const m=String(amount??'').match(/^\s*(\d+(?:\.\d+)?)\s*(ml|dashes?|drops?|tsp|tbsp)\s*$/i);
  return m?`${Math.round(Number(m[1])*Math.max(1,Math.min(4,servings))*10)/10} ${m[2]}`:String(amount??'');
 }
 function scaleMethod(method,servings=1){
  const n=Math.max(1,Math.min(4,servings));
  if(n===1)return method;
  return String(method).replace(/\b(\d+(?:\.\d+)?)\s*[-–]\s*(\d+(?:\.\d+)?)\s*(dashes?|drops?)\b/gi,(_,a,b,u)=>`${Number(a)*n}–${Number(b)*n} ${u}`)
   .replace(/\b(\d+(?:\.\d+)?)\s*(ml|dashes?|drops?|tsp|tbsp)\b/gi,(whole,a,u,offset,text)=>offset>0&&/[–\d]/.test(text[offset-1])?whole:scaleAmount(`${a} ${u}`,n))
   .replace(/\b\d+(?:\/\d+){2,3}\b/g,values=>values.split('/').map(v=>Number(v)*n).join('/'));
 }
 function sanitizePreferences(input,bottles,pantry){
  const valid=new Set(bottles.map(b=>b.id)),p=input&&typeof input==='object'?input:{};
  const favorites=Array.isArray(p.favorites)?[...new Set(p.favorites.filter(id=>valid.has(id)))]:[];
  const state=Object.fromEntries(pantry.map(item=>[item.id,typeof p.pantry?.[item.id]==='boolean'?p.pantry[item.id]:item.def]));
  return {favorites,pantry:state};
 }
 return {fillPercent,normalize,filterBottles,ingredientStatus,evaluateRecipe,filterRecipes,scaleAmount,scaleMethod,sanitizePreferences};
})();
if(typeof module!=='undefined')module.exports=BarLogic;
