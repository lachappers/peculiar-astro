import{X as M,O as x}from"./cookieconsent.esm.CpWJ-JYd.js";document.querySelectorAll('a[href^="#"]').forEach(e=>{e.addEventListener("click",function(t){t.preventDefault(),document.querySelector(this.getAttribute("href")).scrollIntoView({behavior:"smooth"})})});const q="aW5mb0BwZWN1bGlhcmR5bmFtaWNzLmNvLnVr",D=document.querySelectorAll(".email-link");D.forEach(e=>{e.setAttribute("href","mailto:".concat(atob(q)).concat("?subject=I've got a Peculiar Query"))});const C={onConsent:function(){},autoShow:!1,mode:"opt-in",cookie:{name:"cc_cookie",domain:window.location.hostname,path:"/",expiresAfterDays:182,sameSite:"Lax"},guiOptions:{consentModal:{layout:"box inline",position:"bottom right"},preferencesModal:{layout:"box",position:"right",equalWeightButtons:!0,flipButtons:!1}},categories:{necessary:{readOnly:!0},functionality:{},analytics:{autoClear:{cookies:[{name:/^_ga/},{name:"_gid"}]},services:{ga4:{label:'<a href="https://marketingplatform.google.com/about/analytics/terms/us/" target="_blank">Google Analytics 4</a>',onAccept:()=>{console.log("ga4 accepted")},onReject:()=>{console.log("ga4 rejected")},cookies:[{name:/^(_ga|_gid)/}]}}},ads:{}},language:{default:"en",autoDetect:"browser",translations:{en:{consentModal:{title:"We use cookies",description:"We use some essential cookies to make this website work. We'd like to set additional cookies to understand how you use our site, remember your preferences and improve our services.",acceptAllBtn:"Accept all",acceptNecessaryBtn:"Reject all",showPreferencesBtn:"Manage Individual preferences",footer:`<a href="/policies/cookies" target="_blank">Full Cookie Notice</a>
                     <a href="/policies/privacy" target="_blank">Privacy Policy</a>`},preferencesModal:{title:"Manage cookie preferences",acceptAllBtn:"Accept all",acceptNecessaryBtn:"Reject all",savePreferencesBtn:"Accept current selection",closeIconLabel:"Close modal",serviceCounterLabel:"Service|Services",sections:[{title:"Your Privacy Choices",description:'In this panel you can express some preferences related to the processing of your personal information. You may review and change expressed choices at any time by resurfacing this panel via the provided button displayed in the full <a href="/policies/cookies" class="cc-link">Cookie Notice</a>. To deny your consent to the specific processing activities described below, switch the toggles to off or use the “Reject all” button and confirm you want to save your choices.'},{title:"Strictly Necessary",description:"These cookies are essential for the proper functioning of the website and cannot be disabled as the website would not work without them.",linkedCategory:"necessary"},{title:"Performance and Analytics",description:"These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site. All of the data is anonymised and cannot be used to identify you.",linkedCategory:"analytics"},{title:"Targeting and Advertising",description:"These cookies are used to make advertising messages more relevant to you and your interests.",linkedCategory:"ads"},{title:"More information",description:'For any queries in relation to our policy on cookies and your choices, please <a class="cc-link" href="/contact">contact us</a>.'}]}}}}};M(C);setTimeout(x,3e3);const c=document.querySelector("#main-navigation"),h=c?.querySelector("ul"),g=[...document.querySelectorAll(".has-dropdown button")],B=()=>{const e=c?.querySelectorAll("nav > ul"),t=window.location.pathname;e?.forEach(n=>{[...n.querySelectorAll('a:not([rel*="external"])')].forEach(s=>{(t.includes(s.pathname.replaceAll("/",""))&&s.textContent!=="Home"||s.textContent==="Home"&&t==="/")&&(s.classList.add("is-active"),s.setAttribute("aria-current","page"))})})},A=()=>{const e=c.getBoundingClientRect().width,t=document.querySelector(".desktop-menu").getBoundingClientRect().width,o=Math.round(t)+350;o>=e?(c.classList.remove("is-desktop"),c.classList.add("is-mobile")):o<=e&&(c.classList.add("is-desktop"),c.classList.remove("is-mobile"))},T=e=>e.getBoundingClientRect().right>(window.innerWidth||document.documentElement.clientWidth),E=e=>{const t=e.parentNode.querySelector("ul");e.classList.add("show"),e.setAttribute("aria-expanded","true"),T(t)&&(t.style.left="auto")},w=e=>{e.classList.remove("show"),e.setAttribute("aria-expanded","false")},b=()=>{for(let e=0;e<g.length;e++)w(g[e])},I=e=>{e.target.getAttribute("aria-expanded")==="false"?(b(),E(e.target)):w(e.target)};h&&h.addEventListener("keydown",e=>{const t=e.target,n=t.closest("li"),o=[...h.querySelectorAll(".menu-item")],s=t.closest(".has-dropdown button"),d=t.closest(".has-dropdown li"),v=o.findIndex(l=>l===n),a=e.key;let i;if(a==="ArrowRight"&&(o.indexOf(n)===o.length-1?i=o[0]:i=o[v+1]),a==="ArrowLeft"&&(o.indexOf(n)===0?i=o[o.length-1]:i=o[v-1]),a==="Escape"&&(i=o[0]),s){const l=s.nextElementSibling.querySelector("li");a==="ArrowDown"&&(e.preventDefault(),E(s),i=l),a==="Escape"&&w(s)}if(d){const l=d.parentNode,r=[...l.querySelectorAll("li")],k=r.findIndex(L=>L===d);a==="ArrowDown"&&(e.preventDefault(),r.indexOf(d)===r.length-1?i=r[0]:i=r[k+1]),a==="ArrowUp"&&(e.preventDefault(),r.indexOf(d)===0?i=r[r.length-1]:i=r[k-1]),a==="Escape"&&(i=l.previousElementSibling.parentNode,b())}i&&i.querySelector("a, button, input").focus()});g&&g.forEach(e=>{e.addEventListener("click",I)});B();A();window.addEventListener("resize",A);window.addEventListener("click",e=>{const t=e.target;!t.hasAttribute("aria-haspopup")&&!t.classList.contains("submenu-item")&&b()});let m=document.querySelectorAll(".modal"),y,u;const _=e=>[...e.querySelectorAll('a, button, input, textarea, select, details,[tabindex]:not([tabindex="-1"])')].filter(t=>!t.hasAttribute("disabled")),N=(e,t)=>{const n=_(t),o=n[0],s=n[n.length-1];document.activeElement===s&&e.key==="Tab"&&!e.shiftKey&&(e.preventDefault(),o.focus()),document.activeElement===o&&e.key==="Tab"&&e.shiftKey&&(e.preventDefault(),s.focus())},S=e=>{const t=e.querySelector("h3"),n=e.querySelector(".modal__inner");e.showModal(),t.focus(),y=new AbortController,u=new AbortController,document.addEventListener("keydown",o=>N(o,e),{signal:y.signal}),e.addEventListener("keydown",o=>{o.key==="Escape"&&f()},{signal:u.signal}),e.addEventListener("click",()=>{f()},{signal:u.signal}),n.addEventListener("click",o=>{o.stopPropagation()},{signal:u.signal})},f=()=>{m.forEach(e=>{const t=e.getAttribute("aria-labelledby");document.querySelector(`#${t}`).focus({preventScroll:!0}),e.close(),y?.abort(),u?.abort()})};m.forEach(e=>{const t=e.getAttribute("aria-labelledby"),n=e.querySelector(".modal__close button"),o=document.querySelector(`#${t}`);if(!o)throw new Error(`Trigger element not found. 

      Did you forget to add a trigger element with id: "${t}"?`);o.addEventListener("click",()=>S(e)),n.addEventListener("click",f)});window.closeModal=f;document.addEventListener("astro:after-swap",()=>{m=document.querySelectorAll(".modal"),m.forEach(e=>{const t=e.getAttribute("aria-labelledby"),n=e.querySelector(".modal__close button"),o=document.querySelector(`#${t}`);if(!o)throw new Error(`Trigger element not found. 

      Did you forget to add a trigger element with id: "${t}"?`);o.addEventListener("click",()=>S(e)),n.addEventListener("click",f)})});const p=document.querySelector(".responsive-toggle"),W=e=>{e.setAttribute("aria-expanded",!0),e.setAttribute("aria-label","Close menu navigation"),e.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="var(--action-color)" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"/></svg>'},O=e=>{e.setAttribute("aria-expanded",!1),e.setAttribute("aria-label","Open menu navigation"),e.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="var(--action-color)" d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2Z"/></svg>'};p?.addEventListener("click",e=>{const t=document.querySelector(".mobile-menu");console.log(p),t?.classList.toggle("show"),t?.classList.contains("show")?W(p):O(p)});