document.querySelectorAll('a[href^="#"]').forEach((e=>{e.addEventListener("click",(function(e){e.preventDefault(),document.querySelector(this.getAttribute("href")).scrollIntoView({behavior:"smooth"})}))})),function(e,t,n,o,a){e[o]=e[o]||[],e[o].push({"gtm.start":(new Date).getTime(),event:"gtm.js"});var l=t.getElementsByTagName(n)[0],r=t.createElement(n);r.async=!0,r.src="https://www.googletagmanager.com/gtm.js?id=GTM-TQXQ4HMD",l.parentNode.insertBefore(r,l)}(window,document,"script","dataLayer");const x="aW5mb0BwZWN1bGlhcmR5bmFtaWNzLmNvLnVr",M=document.querySelectorAll(".email-link");function q(){const e=document.createElement("script");e.type="text/partytown",e.src="./vanilla-cookieconsent/dist/cookieconsent.js";const t=document.getElementsByTagName("script")[0];t.parentNode?.insertBefore(e,t),window.initCookieConsent()}M.forEach((e=>{e.setAttribute("href","mailto:".concat(atob(x)).concat("?subject=I've got a Peculiar Query"))})),window.onload=()=>{q()};const b=document.querySelector("body"),E=document.querySelectorAll(".modal");let w,h;const D=e=>{e.remove(),b.appendChild(e)},T=e=>[...e.querySelectorAll('a, button, input, textarea, select, details,[tabindex]:not([tabindex="-1"])')].filter((e=>!e.hasAttribute("disabled"))),C=(e,t)=>{const n=T(t),o=n[0],a=n[n.length-1];document.activeElement===a&&"Tab"===e.key&&!e.shiftKey&&(e.preventDefault(),o.focus()),document.activeElement===o&&"Tab"===e.key&&e.shiftKey&&(e.preventDefault(),a.focus())},B=e=>{const t=e.querySelector("h3");e.classList.add("show"),b.classList.add("modal-is-active"),t.focus(),w=new AbortController,h=new AbortController,document.addEventListener("keydown",(t=>C(t,e)),{signal:w.signal}),e.addEventListener("keydown",(e=>{"Escape"===e.key&&f()}),{signal:h.signal})},f=e=>{E.forEach((e=>{e.classList.remove("show");const t=e.getAttribute("aria-labelledby");document.querySelector(`#${t}`).focus({preventScroll:!0}),w.abort(),h.abort()})),b.classList.remove("modal-is-active")};E.forEach((e=>{const t=e.getAttribute("aria-labelledby"),n=e.querySelector(".modal__close button");document.querySelector(`#${t}`).addEventListener("click",(()=>B(e))),n.addEventListener("click",f),e.addEventListener("click",(e=>{e.target.closest(".modal__content")||f()})),D(e)})),window.closeModal=f;const l=document.querySelector("#main-navigation"),g=l.querySelector("ul"),p=[...document.querySelectorAll(".has-dropdown button")],N=()=>{const e=l.querySelectorAll("nav > ul"),t=window.location.pathname;e.forEach((e=>{[...e.querySelectorAll('a:not([rel*="external"])')].forEach((e=>{(t.includes(e.pathname.replaceAll("/",""))&&"Home"!==e.textContent||"Home"===e.textContent&&"/"===t)&&(e.classList.add("is-active"),e.setAttribute("aria-current","page"))}))}))},k=()=>{const e=l.getBoundingClientRect().width,t=document.querySelector(".desktop-menu").getBoundingClientRect().width,n=Math.round(t)+350;n>=e?(l.classList.remove("is-desktop"),l.classList.add("is-mobile")):n<=e&&(l.classList.add("is-desktop"),l.classList.remove("is-mobile"))},I=e=>e.getBoundingClientRect().right>(window.innerWidth||document.documentElement.clientWidth),S=e=>{const t=e.parentNode.querySelector("ul");e.classList.add("show"),e.setAttribute("aria-expanded","true"),I(t)&&(t.style.left="auto")},v=e=>{e.classList.remove("show"),e.setAttribute("aria-expanded","false")},y=()=>{for(let e=0;e<p.length;e++)v(p[e])},W=e=>{"false"===e.target.getAttribute("aria-expanded")?(y(),S(e.target)):v(e.target)};g&&g.addEventListener("keydown",(e=>{const t=e.target,n=t.closest("li"),o=[...g.querySelectorAll(".menu-item")],a=t.closest(".has-dropdown button"),l=t.closest(".has-dropdown li"),r=o.findIndex((e=>e===n)),i=e.key;let s;if("ArrowRight"===i&&(s=o.indexOf(n)===o.length-1?o[0]:o[r+1]),"ArrowLeft"===i&&(s=0===o.indexOf(n)?o[o.length-1]:o[r-1]),"Escape"===i&&(s=o[0]),a){const t=a.nextElementSibling.querySelector("li");"ArrowDown"===i&&(e.preventDefault(),S(a),s=t),"Escape"===i&&v(a)}if(l){const t=l.parentNode,n=[...t.querySelectorAll("li")],o=n.findIndex((e=>e===l));"ArrowDown"===i&&(e.preventDefault(),s=n.indexOf(l)===n.length-1?n[0]:n[o+1]),"ArrowUp"===i&&(e.preventDefault(),s=0===n.indexOf(l)?n[n.length-1]:n[o-1]),"Escape"===i&&(s=t.previousElementSibling.parentNode,y())}s&&s.querySelector("a, button, input").focus()})),p&&p.forEach((e=>{e.addEventListener("click",W)})),N(),k(),window.addEventListener("resize",k),window.addEventListener("click",(e=>{const t=e.target;!t.hasAttribute("aria-haspopup")&&!t.classList.contains("submenu-item")&&y()}));const m=document.querySelector(".responsive-toggle"),H=e=>{e.setAttribute("aria-expanded",!0),e.setAttribute("aria-label","Close menu navigation"),e.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="var(--action-color)" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"/></svg>'},O=e=>{e.setAttribute("aria-expanded",!1),e.setAttribute("aria-label","Open menu navigation"),e.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="var(--action-color)" d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2Z"/></svg>'};m.addEventListener("click",(e=>{const t=document.querySelector(".mobile-menu");console.log(m),t.classList.toggle("show"),t.classList.contains("show")?H(m):O(m)}));