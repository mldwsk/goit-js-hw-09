const e=document.querySelector("#search-box");document.querySelector(".country-list"),document.querySelector(".country-info");e.addEventListener("input",(async()=>{try{await async function(e){const o="https://restcountries.com/v3.1/{service}?fields={name},{capital},{population},{flag-svg},{languages}";console.log(o),console.log(e);let t=[];const a=["name","capital","population","flag-svg","languages"];for(let e=0;e<a;e++)t.push(await fetch(`${o}/${a[e]}/${userId}`)),console.log(a[e]);return await Promise.all(a)}(e.value)}catch(e){console.log(e.message)}}));
//# sourceMappingURL=index.c9e24945.js.map
