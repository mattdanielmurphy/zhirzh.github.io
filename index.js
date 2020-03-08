parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"TwU4":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const e=require("marked"),r=new e.Slugger;function u(u,t=!1){return t?r.slug(u):(new e.Slugger).slug(u)}exports.default=u;
},{}],"ifYj":[function(require,module,exports) {
"use strict";var e=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t},t=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});const r=require("cheerio"),i=require("fs-extra"),n=require("highlight.js"),o=e(require("marked")),a=t(require("~/slugify")),l=({body:e,caption:t})=>`\n   <figure>\n      ${e}\n      ${t?`<figcaption>${t}</figcaption>`:""}\n   </figure>\n`,s=new o.Renderer;function u(e){return o.default(i.readFileSync(e,"UTF-8"))}function c(e){const t=Object.entries(e).map(([e,t])=>`${e}="${t}"`).join(" ");return t.length>0?" "+t:""}o.default.setOptions({renderer:s,highlight:(e,t)=>n.highlight(t||"plaintext",e).value}),s.code=((e,t)=>l({body:`<pre class="hljs"><code>${n.highlight(t||"plaintext",e).value}</code></pre>`})),s.heading=((e,t,r)=>{const i=`h${t}`,n=a.default(r,!0);return`\n      <${i} id="${n}" class="post-heading">\n         <a href="#${n}">${e}</a>\n      </${i}>\n   `}),s.html=(e=>{const t=r.load(e);return t("body").children().toArray().map(e=>{if("insert"!==e.tagName)return t.html(e);const r=e.attribs,{type:i}=r;switch(delete r.type,i){case"image":{const{title:e}=r;delete r.title;const t=e||r.alt;return l({body:`<img ${c(r)} />`,caption:t})}case"iframe":{const e=r.title;return delete r.title,l({body:`<iframe ${c(r)}></iframe>`,caption:e})}case"video":{const e=r.title;return delete r.title,l({body:`<video ${c(r)}></video>`,caption:e})}default:throw new Error("Unknown insert type")}}).join("\n")}),exports.default=u;
},{"~/slugify":"TwU4"}],"nM9x":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const e=require("fs");function t(r){return e.readdirSync(r).map(s=>{const n=`${r}/${s}`;return e.lstatSync(n).isDirectory()?t(n):n}).flat()}exports.default=t;
},{}],"r8ie":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});const t=require("cheerio"),r=require("path"),l=e(require("~markdown")),n=e(require("~slugify")),o=e(require("~walk")),i=e=>!e;function s(e){var t;const l=r.relative("./posts",e).match(/(\d+)\/(\d+)\/(\d+)-([^\/]+)(.+)?/);if(null===l)throw new Error([`Unexpected path found: ${e}`,"Post path must match one of following patterns:","  <year>/<month>/<day>-<title>.md","  <year>/<month>/<day>-<title>/index.md","  <year>/<month>/<day>-<title>/<sub>"].join("\n"));const[o,i,s,d,a]=l.slice(1),u=d.replace(".md",""),p="/"+[o,i,s].join("")+"-"+n.default(u)+(null!==(t=null==a?void 0:a.replace("index.md",""))&&void 0!==t?t:"");return{date:{year:Number(o),month:Number(i),day:Number(s)},title:u,url:p}}const d=o.default("./posts").filter(e=>i(e.includes("node_modules"))).filter(e=>e.endsWith(".md"));exports.posts=d.map((e,r)=>{const{date:o,title:i,url:a}=s(e),u=l.default(e),p=u.split(/(?<=<\/p>)/)[0],c=0===r?null:s(d[r-1]),m=r===d.length-1?null:s(d[r+1]),h=t.load(u);return{content:u,date:o,excerpt:p,headings:[{level:1,id:n.default(i),text:i}].concat(h(".post-heading").toArray().map(e=>({level:Number(e.tagName.replace("h","")),id:e.attribs.id,text:h(e).text()}))),next:c,path:e,prev:m,title:i,url:a}}).reverse();const a=o.default("./posts").filter(e=>i(e.includes("node_modules"))).filter(e=>i(e.endsWith(".md"))).filter(e=>i([".prettierrc",".DS_Store"].some(t=>e.endsWith(t))));exports.postsAssets=a.map(e=>{const{url:t}=s(e);return{path:e,url:t}});
},{"~markdown":"ifYj","~slugify":"TwU4","~walk":"nM9x"}],"GS4b":[function(require,module,exports) {
"use strict";var n=this&&this.__importDefault||function(n){return n&&n.__esModule?n:{default:n}};Object.defineProperty(exports,"__esModule",{value:!0});const e=n(require("react"));function t(n,e){if(0===n.length)return[];const r=n.filter(n=>n.level===e).map(e=>n.indexOf(e));return r.map((o,c)=>{const i=r[c],s=r[c+1],l=n.slice(i+1,s);return{value:n[i],children:t(l,e+1)}})}function r(n,t=1){return 0===n.length?null:e.default.createElement("ul",null,n.map(({value:n,children:o})=>e.default.createElement("li",{key:n.id},e.default.createElement("a",{href:`#${n.id}`},n.text),r(o,t+1))))}const o=({headings:n})=>e.default.createElement(e.default.Fragment,null,e.default.createElement("aside",{className:"contents"},"Contents",e.default.createElement("nav",null,r(t(n,1)))),e.default.createElement("script",{dangerouslySetInnerHTML:{__html:c}})),c="\nconst topThreshold = 20\n\nconst initialTop = 270 // refer index.css for .contents top offset\nconst finalTop = 100\n\nlet prevTop = 0\n\nwindow.addEventListener('scroll', contentsMain, {\n   passive: true,\n})\n\nwindow.addEventListener('resize', contentsMain, {\n   passive: true,\n})\n\nsetTimeout(contentsMain, 1000)\n\nfunction contentsMain() {\n   if (window.innerWidth >= 1300) {\n      moveSidebar()\n      highlightCurrentSection()\n   } else {\n      resetSidebar()\n   }\n}\n\nfunction highlightCurrentSection() {\n   const $contents = document.querySelector('.contents')\n\n   const $targetLink = Array.from($contents.querySelectorAll('a'))\n      .reverse()\n      .find((a, i) => {\n         const id = a.getAttribute('href').slice(1)\n         const h = document.getElementById(id)\n         const top = h.getBoundingClientRect().top\n         return top < topThreshold\n      })\n\n   if (!$targetLink) {\n      return\n   }\n\n   $contents.querySelectorAll('.current-section').forEach($currentSection => {\n      $currentSection.classList.remove('current-section')\n   })\n\n   $targetLink.classList.add('current-section')\n}\n\nfunction moveSidebar() {\n   const top = Math.max(finalTop, initialTop - window.scrollY)\n\n   if (prevTop === top) {\n      return\n   }\n\n   prevTop = top\n\n   const $contents = document.querySelector('.contents')\n   $contents.style.top = top + 'px'\n}\n\nfunction resetSidebar() {\n   const $contents = document.querySelector('.contents')\n\n   $contents.style.top = 0\n\n   $contents.querySelectorAll('.current-section').forEach($currentSection => {\n      $currentSection.classList.remove('current-section')\n   })\n}\n";exports.default=o;
},{}],"oSjs":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});const t=e(require("react")),o=20,n=()=>t.default.createElement(t.default.Fragment,null,t.default.createElement("button",{className:"lamp"},t.default.createElement("svg",{viewBox:"0 0 100 100"},t.default.createElement("circle",{cx:"50",cy:"50",r:35,fill:"none",strokeWidth:10}),t.default.createElement("path",{d:"M 50 70 A 20 20 0 0 1 50 30"}),t.default.createElement("path",{d:"M 50 70 A 20 20 0 0 0 50 30"}))),t.default.createElement("script",{dangerouslySetInnerHTML:{__html:r}})),r="\ndocument.querySelector('.lamp').addEventListener('click', toggleColorScheme)\n\nconst darkModeMediaQuery = matchMedia('(prefers-color-scheme: dark)')\ndarkModeMediaQuery.addListener(toggleColorScheme)\n\nconst documentClasses = document.documentElement.classList\ndocumentClasses.add(getColorScheme())\n\nfunction getColorScheme() {\n   const savedColorScheme = localStorage.getItem('color-scheme')\n\n   if (savedColorScheme) {\n      return savedColorScheme === 'dark' ? 'dark' : 'light'\n   }\n\n   return darkModeMediaQuery.matches ? 'dark' : 'light'\n}\n\nfunction toggleColorScheme() {\n   const colorScheme = getColorScheme()\n   documentClasses.remove(colorScheme)\n\n   const nextColorScheme = colorScheme === 'dark' ? 'light' : 'dark'\n   documentClasses.add(nextColorScheme)\n   localStorage.setItem('color-scheme', nextColorScheme)\n}\n";exports.default=n;
},{}],"qN43":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});const t=e(require("react")),l=e(require("~components/Lamp")),a=({children:e,title:a})=>t.default.createElement("html",{lang:"en-US"},t.default.createElement("head",null,t.default.createElement("meta",{charSet:"UTF-8"}),t.default.createElement("meta",{name:"viewport",content:"width=device-width, initial-scale=1, minimum-scale=1"}),t.default.createElement("title",null,a),t.default.createElement("link",{rel:"stylesheet",href:"/index.css"}),t.default.createElement("script",{src:"/sw.js"})),t.default.createElement("body",null,t.default.createElement("div",{className:"fonts-loader"},t.default.createElement("div",null,"0"),t.default.createElement("div",{style:{fontStyle:"italic"}},"1"),t.default.createElement("div",{style:{fontWeight:"bold"}},"2"),t.default.createElement("div",{style:{fontWeight:"bold",fontStyle:"italic"}},"3")),t.default.createElement("header",{className:"main-nav"},t.default.createElement("nav",null,t.default.createElement("ul",{className:"nav-list"},t.default.createElement("li",null,t.default.createElement("h1",null,t.default.createElement("a",{href:"/"},"Blog"))),t.default.createElement("li",null,t.default.createElement("a",{href:"/archive"},"Archive")),t.default.createElement("li",null,t.default.createElement("a",{href:"/about"},"About")))),t.default.createElement(l.default,null)),e,t.default.createElement("footer",{className:"social-links"},t.default.createElement("nav",null,t.default.createElement("ul",{className:"nav-list"},t.default.createElement("li",null,t.default.createElement("a",{target:"_blank",href:"https://github.com/zhirzh"},"github")),t.default.createElement("div",{className:"dot"},"•"),t.default.createElement("li",null,t.default.createElement("a",{target:"_blank",href:"https://medium.com/@zhirzh"},"medium")),t.default.createElement("div",{className:"dot"},"•"),t.default.createElement("li",null,t.default.createElement("a",{target:"_blank",href:"https://twitter.com/zhirzh"},"twitter")),t.default.createElement("div",{className:"dot"},"•"),t.default.createElement("li",null,t.default.createElement("a",{target:"_blank",href:"https://www.linkedin.com/in/shirsh-zibbu"},"linkedin")),t.default.createElement("div",{className:"dot"},"•"),t.default.createElement("li",null,t.default.createElement("a",{target:"_blank",href:"https://stackoverflow.com/users/1343488/zhirzh"},"stackoverflow")))))));exports.default=a;
},{"~components/Lamp":"oSjs"}],"YQE2":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});const t=e(require("react")),l=e(require("~components/Contents")),a=e(require("~slugify")),r=e(require("./Base")),n=({post:e})=>t.default.createElement(r.default,{title:e.title},t.default.createElement("h1",{id:a.default(e.title),className:"post-heading"},t.default.createElement("a",{href:`#${a.default(e.title)}`},e.title)),t.default.createElement(l.default,{headings:e.headings}),t.default.createElement("article",{dangerouslySetInnerHTML:{__html:e.content}}),t.default.createElement("footer",{className:"related-posts"},t.default.createElement("nav",null,t.default.createElement("ul",{className:"nav-list"},e.prev&&t.default.createElement("li",{className:"related-posts-prev"},t.default.createElement("a",{href:e.prev.url},"⟵ ",e.prev.title)),e.next&&t.default.createElement("li",{className:"related-posts-next"},t.default.createElement("a",{href:e.next.url},e.next.title," ⟶"))))));exports.default=n;
},{"~components/Contents":"GS4b","~slugify":"TwU4","./Base":"qN43"}],"zcop":[function(require,module,exports) {
"use strict";var e=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t},t=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});const r=e(require("react")),a=require("~data/posts"),l=t(require("~layouts/Base")),u={};a.posts.forEach(e=>{var t;const{year:r}=e.date;u[r]=(null===(t=u[r])||void 0===t?void 0:t.concat(e))||[e]});const n=Object.keys(u).sort((e,t)=>Number(t)-Number(e)),o=()=>r.default.createElement(l.default,{title:"Archive"},n.map(e=>r.default.createElement(r.Fragment,{key:e},r.default.createElement("h2",null,e),r.default.createElement("ul",null,u[e].map(e=>r.default.createElement("li",{key:e.url},r.default.createElement("a",{href:e.url},e.title)))))));exports.default=o;
},{"~data/posts":"r8ie","~layouts/Base":"qN43"}],"pGKe":[function(require,module,exports) {
"use strict";var e=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t},t=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});const r=e(require("react")),a=require("~data/posts"),l=t(require("~layouts/Base")),u=()=>r.default.createElement(l.default,{title:"Blog"},a.posts.map(e=>r.default.createElement(r.Fragment,{key:e.url},r.default.createElement("h2",{className:"post-heading"},r.default.createElement("a",{href:e.url},e.title)),r.default.createElement("article",{dangerouslySetInnerHTML:{__html:e.excerpt}}))));exports.default=u;
},{"~data/posts":"r8ie","~layouts/Base":"qN43"}],"zo2T":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});const t=require("fs-extra"),r=require("path"),i=e(require("react")),s=require("react-dom/server"),a=require("~data/posts"),l=e(require("~layouts/Post")),c=e(require("~pages/Archive")),n=e(require("~pages/Blog")),u=e(require("~walk"));a.posts.forEach(e=>{const a=e.url,c="./dist/"+a+(a.endsWith("/")?"index.html":".html");t.ensureDirSync(r.dirname(c)),t.writeFileSync(c,"<!DOCTYPE html>"+s.renderToStaticMarkup(i.default.createElement(l.default,{post:e})))}),a.postsAssets.forEach(e=>{const i=`dist/${e.url}`;t.ensureDirSync(r.dirname(i)),t.copyFileSync(e.path,i)}),t.writeFileSync("dist/index.html","<!DOCTYPE html>"+s.renderToStaticMarkup(i.default.createElement(n.default,null))),t.writeFileSync("dist/archive.html","<!DOCTYPE html>"+s.renderToStaticMarkup(i.default.createElement(c.default,null))),t.copySync("src/assets","dist"),t.writeFileSync("dist/sw.js",t.readFileSync("dist/sw.js","UTF-8").replace("__BUILD_FILES__",JSON.stringify(u.default("dist").map(e=>e.replace(/^dist/,"")).filter(e=>"/sw.js"!==e).filter(e=>!e.match(/\.(map|gitignore)$/)).map(e=>e.replace(/\.html$/,""))))),console.log("done");
},{"~data/posts":"r8ie","~layouts/Post":"YQE2","~pages/Archive":"zcop","~pages/Blog":"pGKe","~walk":"nM9x"}]},{},["zo2T"], null)
//# sourceMappingURL=/index.js.map