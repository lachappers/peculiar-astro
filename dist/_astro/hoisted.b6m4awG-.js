document.querySelectorAll('a[href^="#"]').forEach(e=>{e.addEventListener("click",function(t){t.preventDefault(),document.querySelector(this.getAttribute("href")).scrollIntoView({behavior:"smooth"})})});const M="aW5mb0BwZWN1bGlhcmR5bmFtaWNzLmNvLnVr",k=document.querySelectorAll(".email-link");k.forEach(e=>{e.setAttribute("href","mailto:".concat(atob(M)).concat("?subject=I've got a Peculiar Query"))});const w=document.querySelector("body"),E=document.querySelectorAll(".modal");let p,g;const q=e=>{e.remove(),w.appendChild(e)},D=e=>[...e.querySelectorAll('a, button, input, textarea, select, details,[tabindex]:not([tabindex="-1"])')].filter(t=>!t.hasAttribute("disabled")),C=(e,t)=>{const n=D(t),o=n[0],s=n[n.length-1];document.activeElement===s&&e.key==="Tab"&&!e.shiftKey&&(e.preventDefault(),o.focus()),document.activeElement===o&&e.key==="Tab"&&e.shiftKey&&(e.preventDefault(),s.focus())},B=e=>{const t=e.querySelector("h3");e.classList.add("show"),w.classList.add("modal-is-active"),t.focus(),p=new AbortController,g=new AbortController,document.addEventListener("keydown",n=>C(n,e),{signal:p.signal}),e.addEventListener("keydown",n=>{n.key==="Escape"&&f()},{signal:g.signal})},f=e=>{E.forEach(t=>{t.classList.remove("show");const n=t.getAttribute("aria-labelledby");document.querySelector(`#${n}`).focus({preventScroll:!0}),p.abort(),g.abort()}),w.classList.remove("modal-is-active")};E.forEach(e=>{const t=e.getAttribute("aria-labelledby"),n=e.querySelector(".modal__close button");document.querySelector(`#${t}`).addEventListener("click",()=>B(e)),n.addEventListener("click",f),e.addEventListener("click",s=>{s.target.closest(".modal__content")||f()}),q(e)});window.closeModal=f;const c=document.querySelector("#main-navigation"),h=c.querySelector("ul"),m=[...document.querySelectorAll(".has-dropdown button")],I=()=>{const e=c.querySelectorAll("nav > ul"),t=window.location.pathname;e.forEach(n=>{[...n.querySelectorAll('a:not([rel*="external"])')].forEach(s=>{(t.includes(s.pathname.replaceAll("/",""))&&s.textContent!=="Home"||s.textContent==="Home"&&t==="/")&&(s.classList.add("is-active"),s.setAttribute("aria-current","page"))})})},S=()=>{const e=c.getBoundingClientRect().width,t=document.querySelector(".desktop-menu").getBoundingClientRect().width,o=Math.round(t)+350;o>=e?(c.classList.remove("is-desktop"),c.classList.add("is-mobile")):o<=e&&(c.classList.add("is-desktop"),c.classList.remove("is-mobile"))},T=e=>e.getBoundingClientRect().right>(window.innerWidth||document.documentElement.clientWidth),x=e=>{const t=e.parentNode.querySelector("ul");e.classList.add("show"),e.setAttribute("aria-expanded","true"),T(t)&&(t.style.left="auto")},b=e=>{e.classList.remove("show"),e.setAttribute("aria-expanded","false")},v=()=>{for(let e=0;e<m.length;e++)b(m[e])},W=e=>{e.target.getAttribute("aria-expanded")==="false"?(v(),x(e.target)):b(e.target)};h&&h.addEventListener("keydown",e=>{const t=e.target,n=t.closest("li"),o=[...h.querySelectorAll(".menu-item")],s=t.closest(".has-dropdown button"),d=t.closest(".has-dropdown li"),L=o.findIndex(a=>a===n),l=e.key;let r;if(l==="ArrowRight"&&(o.indexOf(n)===o.length-1?r=o[0]:r=o[L+1]),l==="ArrowLeft"&&(o.indexOf(n)===0?r=o[o.length-1]:r=o[L-1]),l==="Escape"&&(r=o[0]),s){const a=s.nextElementSibling.querySelector("li");l==="ArrowDown"&&(e.preventDefault(),x(s),r=a),l==="Escape"&&b(s)}if(d){const a=d.parentNode,i=[...a.querySelectorAll("li")],y=i.findIndex(A=>A===d);l==="ArrowDown"&&(e.preventDefault(),i.indexOf(d)===i.length-1?r=i[0]:r=i[y+1]),l==="ArrowUp"&&(e.preventDefault(),i.indexOf(d)===0?r=i[i.length-1]:r=i[y-1]),l==="Escape"&&(r=a.previousElementSibling.parentNode,v())}r&&r.querySelector("a, button, input").focus()});m&&m.forEach(e=>{e.addEventListener("click",W)});I();S();window.addEventListener("resize",S);window.addEventListener("click",e=>{const t=e.target;!t.hasAttribute("aria-haspopup")&&!t.classList.contains("submenu-item")&&v()});const u=document.querySelector(".responsive-toggle"),N=e=>{e.setAttribute("aria-expanded",!0),e.setAttribute("aria-label","Close menu navigation"),e.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="var(--action-color)" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"/></svg>'},H=e=>{e.setAttribute("aria-expanded",!1),e.setAttribute("aria-label","Open menu navigation"),e.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="var(--action-color)" d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2Z"/></svg>'};u.addEventListener("click",e=>{const t=document.querySelector(".mobile-menu");console.log(u),t.classList.toggle("show"),t.classList.contains("show")?N(u):H(u)});