if(!self.define){let s,e={};const r=(r,i)=>(r=new URL(r+".js",i).href,e[r]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=r,s.onload=e,document.head.appendChild(s)}else s=r,importScripts(r),e()})).then((()=>{let s=e[r];if(!s)throw new Error(`Module ${r} didn’t register its module`);return s})));self.define=(i,l)=>{const n=s||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let t={};const o=s=>r(s,n),u={module:{uri:n},exports:t,require:o};e[n]=Promise.all(i.map((s=>u[s]||o(s)))).then((s=>(l(...s),t)))}}define(["./workbox-5ffe50d4"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/AboutUs-BLDMRCGU.js",revision:null},{url:"assets/arrow-left-DYW1xNvI.js",revision:null},{url:"assets/blog-BJj3leUn.js",revision:null},{url:"assets/Blog-C7jSuChV.js",revision:null},{url:"assets/BlogEntry-Dl_vHfUH.js",revision:null},{url:"assets/clock-YGdME1H0.js",revision:null},{url:"assets/Contact-gqU8hUat.js",revision:null},{url:"assets/Cookies-Cj28oLx8.js",revision:null},{url:"assets/Disclaimer-ii7kM7An.js",revision:null},{url:"assets/index-1KhUkhOl.css",revision:null},{url:"assets/index-Drqso2-i.js",revision:null},{url:"assets/Privacy-Dv_HasDT.js",revision:null},{url:"assets/ProjectEntry-DDnHMrMM.js",revision:null},{url:"assets/Projects-BYzcedCs.js",revision:null},{url:"assets/ServiceEntry-Bnupb1hE.js",revision:null},{url:"assets/Services-BojsU3Pt.js",revision:null},{url:"assets/Terms-CJfmKWpd.js",revision:null},{url:"assets/trending-up-D7jh5p9H.js",revision:null},{url:"index.html",revision:"95c10c9cde071e8b30c347c55543aca1"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"favicon.svg",revision:"285b2f42304a9d0eb5fa8f3240efed4e"},{url:"robots.txt",revision:"8fc734a0a314eeac8a5a593181d64c48"},{url:"manifest.webmanifest",revision:"3b1060230925b57025f2d3148ebc150e"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
