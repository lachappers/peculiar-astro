import{r as Nt}from"./index.ed373d49.js";function jt(){return Nt.useEffect((()=>{document.getElementById("cc--main")||(window.CC=window.initCookieConsent(),window.CC.run(Tt))}),[]),null}!function(){var e="initCookieConsent";typeof window<"u"&&"function"!=typeof window[e]&&(window[e]=function(e){var t,n,o,i,a,c,r,s,l,d,u,p,f,h,g,_,v,m,b,y,k,C,w,A,x,S,N,T,L,j,O,M,H,D,E,I={mode:"opt-in",current_lang:"en",auto_language:null,autorun:!0,page_scripts:!0,hide_from_bots:!0,cookie_name:"cc_cookie",cookie_expiration:182,cookie_domain:location.hostname,cookie_path:"/",cookie_same_site:"Lax",use_rfc_cookie:!1,autoclear_cookies:!0,revision:0,script_selector:"data-cookiecategory"},J={},q={},P=null,F=!0,U=!1,R=!1,z=!1,B=!1,W=!0,G=[],K=!1,V=[],Y=[],Q=[],X=!1,Z=[],$=[],ee=[],te=[],ne=[],oe=document.documentElement,ie=function(e){for(var t="accept-",n=r("c-settings"),o=r(t+"all"),i=r(t+"necessary"),a=r(t+"custom"),c=0;c<n.length;c++)n[c].setAttribute("aria-haspopup","dialog"),be(n[c],"click",(function(e){e.preventDefault(),J.showSettings(0)}));for(c=0;c<o.length;c++)be(o[c],"click",(function(e){s(e,"all")}));for(c=0;c<a.length;c++)be(a[c],"click",(function(e){s(e)}));for(c=0;c<i.length;c++)be(i[c],"click",(function(e){s(e,[])}));function r(t){return(e||document).querySelectorAll('[data-cc="'+t+'"]')}function s(e,t){e.preventDefault(),J.accept(t),J.hideSettings(),J.hide()}},ae=function(e,t){return t.hasOwnProperty(e)?e:ye(t).length>0?t.hasOwnProperty(I.current_lang)?I.current_lang:ye(t)[0]:void 0},ce=function(e){if(!0===t.force_consent&&ke(oe,"force--consent"),!b){b=de("div");var n=de("div"),o=de("div");b.id="cm",n.id="c-inr-i",o.id="cm-ov",b.tabIndex=-1,b.setAttribute("role","dialog"),b.setAttribute("aria-modal","true"),b.setAttribute("aria-hidden","false"),b.setAttribute("aria-labelledby","c-ttl"),b.setAttribute("aria-describedby","c-txt"),m.appendChild(b),m.appendChild(o),b.style.visibility=o.style.visibility="hidden",o.style.opacity=0}var i=t.languages[e].consent_modal.title;i&&(y||((y=de("h2")).id="c-ttl",n.appendChild(y)),y.innerHTML=i);var a=t.languages[e].consent_modal.description;B&&(a=W?a.replace("{{revision_message}}",""):a.replace("{{revision_message}}",t.languages[e].consent_modal.revision_message||"")),k||((k=de("div")).id="c-txt",n.appendChild(k)),k.innerHTML=a;var c,r=t.languages[e].consent_modal.primary_btn,s=t.languages[e].consent_modal.secondary_btn;r&&(C||((C=de("button")).id="c-p-bn",C.className="c-bn",C.appendChild(Ae(1)),"accept_all"===r.role&&(c="all"),be(C,"click",(function(){J.hide(),J.accept(c)}))),C.firstElementChild.innerHTML=t.languages[e].consent_modal.primary_btn.text),s&&(w||((w=de("button")).id="c-s-bn",w.className="c-bn c_link",w.appendChild(Ae(1)),"accept_necessary"===s.role?be(w,"click",(function(){J.hide(),J.accept([])})):be(w,"click",(function(){J.showSettings(0)}))),w.firstElementChild.innerHTML=t.languages[e].consent_modal.secondary_btn.text);var l=t.gui_options;x||((x=de("div")).id="c-inr",x.appendChild(n)),A||((A=de("div")).id="c-bns",l&&l.consent_modal&&!0===l.consent_modal.swap_buttons?(s&&A.appendChild(w),r&&A.appendChild(C),A.className="swap"):(r&&A.appendChild(C),s&&A.appendChild(w)),(r||s)&&x.appendChild(A),b.appendChild(x)),U=!0,ie(x)},re=function(e){if(S)(O=de("div")).id="s-bl";else{(S=de("div")).tabIndex=-1;var n=de("div"),o=de("div"),i=de("div");N=de("div"),T=de("h2");var a=de("div");(L=de("button")).appendChild(Ae(2));var c=de("div");j=de("div");var r=de("div"),s=!1;be(S,"mouseup",(function(e){!z||s||N.contains(e.target)||J.hideSettings()})),be(S,"mousedown",(function(e){z&&(s=N.contains(e.target))})),S.id="s-cnt",n.id="c-vln",i.id="c-s-in",o.id="cs",T.id="s-ttl",N.id="s-inr",a.id="s-hdr",j.id="s-bl",L.id="s-c-bn",r.id="cs-ov",c.id="s-c-bnc",L.className="c-bn",S.setAttribute("role","dialog"),S.setAttribute("aria-modal","true"),S.setAttribute("aria-hidden","true"),S.setAttribute("aria-labelledby","s-ttl"),S.style.visibility=r.style.visibility="hidden",r.style.opacity=0,c.appendChild(L),be(document,"keydown",(function(e){27===e.keyCode&&z&&J.hideSettings()}),!0),be(L,"click",(function(){J.hideSettings()}))}var u=t.languages[e].settings_modal;L.setAttribute("aria-label",u.close_btn_label||"Close"),d=u.blocks,l=u.cookie_table_headers;var p=u.cookie_table_caption,f=d.length;T.innerHTML=u.title;for(var h=0;h<f;++h){var g=d[h].title,_=d[h].description,v=d[h].toggle,b=d[h].cookie_table,y=!0===t.remove_cookie_tables,k=!!_||!y&&!!b,C=de("div"),w=de("div");if(_){var A=de("div");A.className="p",A.insertAdjacentHTML("beforeend",_)}var x=de("div");if(x.className="title",C.className="c-bl",w.className="desc",void 0!==v){var I="c-ac-"+h,P=de(k?"button":"div"),U=de("label"),R=de("input"),B=de("span"),W=de("span"),G=de("span"),K=de("span");P.className=k?"b-tl exp":"b-tl",U.className="b-tg",R.className="c-tgl",G.className="on-i",K.className="off-i",B.className="c-tg",W.className="t-lb",k&&(P.setAttribute("aria-expanded","false"),P.setAttribute("aria-controls",I)),R.type="checkbox",B.setAttribute("aria-hidden","true");var V=v.value;R.value=V,W.textContent=g,P.insertAdjacentHTML("beforeend",g),x.appendChild(P),B.appendChild(G),B.appendChild(K),F?v.enabled?(R.checked=!0,!O&&ee.push(!0),v.enabled&&!O&&Q.push(V)):!O&&ee.push(!1):le(q.categories,V)>-1?(R.checked=!0,!O&&ee.push(!0)):!O&&ee.push(!1),!O&&te.push(V),v.readonly&&(R.disabled=!0,ke(B,"c-ro"),!O&&ne.push(V)),ke(w,"b-acc"),ke(x,"b-bn"),ke(C,"b-ex"),w.id=I,w.setAttribute("aria-hidden","true"),U.appendChild(R),U.appendChild(B),U.appendChild(W),x.appendChild(U),k&&function(e,t,n){be(P,"click",(function(){we(t,"act")?(Ce(t,"act"),n.setAttribute("aria-expanded","false"),e.setAttribute("aria-hidden","true")):(ke(t,"act"),n.setAttribute("aria-expanded","true"),e.setAttribute("aria-hidden","false"))}),!1)}(w,C,P)}else if(g){var Y=de("div");Y.className="b-tl",Y.setAttribute("role","heading"),Y.setAttribute("aria-level","3"),Y.insertAdjacentHTML("beforeend",g),x.appendChild(Y)}if(g&&C.appendChild(x),_&&w.appendChild(A),!y&&void 0!==b){for(var X=document.createDocumentFragment(),Z=0;Z<l.length;++Z){var $=de("th"),oe=l[Z];if($.setAttribute("scope","col"),oe){var ie=oe&&ye(oe)[0];$.textContent=l[Z][ie],X.appendChild($)}}var ae=de("tr");ae.appendChild(X);var ce=de("thead");ce.appendChild(ae);var re=de("table");if(p){var se=de("caption");se.innerHTML=p,re.appendChild(se)}re.appendChild(ce);for(var ue=document.createDocumentFragment(),pe=0;pe<b.length;pe++){for(var fe=de("tr"),he=0;he<l.length;++he)if(oe=l[he]){ie=ye(oe)[0];var ge=de("td");ge.insertAdjacentHTML("beforeend",b[pe][ie]),ge.setAttribute("data-column",oe[ie]),fe.appendChild(ge)}ue.appendChild(fe)}var _e=de("tbody");_e.appendChild(ue),re.appendChild(_e),w.appendChild(re)}(v&&g||!v&&(g||_))&&(C.appendChild(w),O?O.appendChild(C):j.appendChild(C))}M||((M=de("div")).id="s-bns"),D||((D=de("button")).id="s-all-bn",D.className="c-bn",M.appendChild(D),be(D,"click",(function(){J.accept("all"),J.hideSettings(),J.hide()}))),D.innerHTML=u.accept_all_btn;var ve=u.reject_all_btn;if(ve&&(E||((E=de("button")).id="s-rall-bn",E.className="c-bn",be(E,"click",(function(){J.accept([]),J.hideSettings(),J.hide()})),N.className="bns-t",M.appendChild(E)),E.innerHTML=ve),H||((H=de("button")).id="s-sv-bn",H.className="c-bn",M.appendChild(H),be(H,"click",(function(){J.accept(),J.hideSettings(),J.hide()}))),H.innerHTML=u.save_settings_btn,O)return N.replaceChild(O,j),void(j=O);a.appendChild(T),a.appendChild(c),N.appendChild(a),N.appendChild(j),N.appendChild(M),i.appendChild(N),o.appendChild(i),n.appendChild(o),S.appendChild(n),m.appendChild(S),m.appendChild(r)};J.updateLanguage=function(e,n){if("string"==typeof e){var o=ae(e,t.languages);return(o!==I.current_lang||!0===n)&&(I.current_lang=o,U&&ce(o),re(o),!0)}};var se=function(e){var t=d.length,n=-1;K=!1;var o=ve("","all"),i=[I.cookie_domain,"."+I.cookie_domain];if("www."===I.cookie_domain.slice(0,4)){var a=I.cookie_domain.substr(4);i.push(a),i.push("."+a)}for(var c=0;c<t;c++){var r=d[c];if(r.hasOwnProperty("toggle")){var s=le(G,r.toggle.value)>-1;if(!ee[++n]&&r.hasOwnProperty("cookie_table")&&(e||s)){var u=r.cookie_table,p=ye(l[0])[0],f=u.length;"on_disable"===r.toggle.reload&&s&&(K=!0);for(var h=0;h<f;h++){var g=i,_=u[h],v=[],m=_[p],b=_.is_regex||!1,y=_.domain||null,k=_.path||!1;if(y&&(g=[y,"."+y]),b)for(var C=0;C<o.length;C++)o[C].match(m)&&v.push(o[C]);else{var w=le(o,m);w>-1&&v.push(o[w])}v.length>0&&(me(v,k,g),"on_clear"===r.toggle.reload&&(K=!0))}}}}},le=function(e,t){return e.indexOf(t)},de=function(e){var t=document.createElement(e);return"button"===e&&t.setAttribute("type",e),t},ue=function(e,t){return"browser"===I.auto_language?ae(pe(),e):"document"===I.auto_language?ae(document.documentElement.lang,e):"string"==typeof t?I.current_lang=ae(t,e):I.current_lang},pe=function(){var e=navigator.language||navigator.browserLanguage;return e.length>2&&(e=e[0]+e[1]),e.toLowerCase()};J.allowedCategory=function(e){if(F&&"opt-in"!==I.mode)t=Q;else var t=JSON.parse(ve(I.cookie_name,"one",!0)||"{}").categories||[];return le(t,e)>-1},J.run=function(r){if(!document.getElementById("cc_div")){if(function(e){"number"==typeof(t=e).cookie_expiration&&(I.cookie_expiration=t.cookie_expiration),"number"==typeof t.cookie_necessary_only_expiration&&(I.cookie_necessary_only_expiration=t.cookie_necessary_only_expiration),"boolean"==typeof t.autorun&&(I.autorun=t.autorun),"string"==typeof t.cookie_domain&&(I.cookie_domain=t.cookie_domain),"string"==typeof t.cookie_same_site&&(I.cookie_same_site=t.cookie_same_site),"string"==typeof t.cookie_path&&(I.cookie_path=t.cookie_path),"string"==typeof t.cookie_name&&(I.cookie_name=t.cookie_name),"function"==typeof t.onAccept&&(u=t.onAccept),"function"==typeof t.onFirstAction&&(f=t.onFirstAction),"function"==typeof t.onChange&&(p=t.onChange),"opt-out"===t.mode&&(I.mode="opt-out"),"number"==typeof t.revision&&(t.revision>-1&&(I.revision=t.revision),B=!0),"boolean"==typeof t.autoclear_cookies&&(I.autoclear_cookies=t.autoclear_cookies),!0===t.use_rfc_cookie&&(I.use_rfc_cookie=!0),"boolean"==typeof t.hide_from_bots&&(I.hide_from_bots=t.hide_from_bots),I.hide_from_bots&&(X=navigator&&(navigator.userAgentData&&/bot|crawl|spider|slurp|teoma/i.test(navigator.userAgentData)||navigator.webdriver)),I.page_scripts=!0===t.page_scripts,"browser"===t.auto_language||!0===t.auto_language?I.auto_language="browser":"document"===t.auto_language&&(I.auto_language="document"),I.current_lang=ue(t.languages,t.current_lang)}(r),X)return;q=JSON.parse(ve(I.cookie_name,"one",!0)||"{}");var s=void 0!==(i=q.consent_uuid);if((n=q.consent_date)&&(n=new Date(n)),(o=q.last_consent_update)&&(o=new Date(o)),P=void 0!==q.data?q.data:null,B&&q.revision!==I.revision&&(W=!1),U=F=!(s&&W&&n&&o&&i),function(){(v=de("div")).id="cc--main",v.style.position="fixed",v.innerHTML='<div id="cc_div" class="cc_div"></div>',m=v.children[0];var t=I.current_lang;U&&ce(t),re(t),(e||document.body).appendChild(v)}(),function(){var e=["[href]","button","input","details",'[tabindex="0"]'];function t(t,n){try{var o=t.querySelectorAll(e.join(':not([tabindex="-1"]), '))}catch{return t.querySelectorAll(e.join(", "))}n[0]=o[0],n[1]=o[o.length-1]}t(N,$),U&&t(b,Z)}(),function(e,t){if("object"==typeof e){var n=e.consent_modal,o=e.settings_modal;U&&n&&i(b,["box","bar","cloud"],["top","middle","bottom"],["zoom","slide"],n.layout,n.position,n.transition),o&&i(S,["bar"],["left","right"],["zoom","slide"],o.layout,o.position,o.transition)}function i(e,t,n,o,i,a,c){if(a=a&&a.split(" ")||[],le(t,i)>-1&&(ke(e,i),("bar"!==i||"middle"!==a[0])&&le(n,a[0])>-1))for(var r=0;r<a.length;r++)ke(e,a[r]);le(o,c)>-1&&ke(e,c)}}(r.gui_options),ie(),I.autorun&&U&&J.show(r.delay||0),setTimeout((function(){ke(v,"c--anim")}),30),setTimeout((function(){be(document,"keydown",(function(e){if("Tab"===e.key&&(R||z)&&a){var t=Ne();e.shiftKey?t!==a[0]&&c.contains(t)||(e.preventDefault(),xe(a[1])):t!==a[1]&&c.contains(t)||(e.preventDefault(),xe(a[0]))}}))}),100),F)"opt-out"===I.mode&&fe();else{var l="boolean"==typeof q.rfc_cookie;(!l||l&&q.rfc_cookie!==I.use_rfc_cookie)&&(q.rfc_cookie=I.use_rfc_cookie,_e(I.cookie_name,JSON.stringify(q))),h=ge(he()),fe(),"function"==typeof u&&u(q)}}};var fe=function(){if(I.page_scripts){var e=q.categories||[];F&&"opt-out"===I.mode&&(e=Q);var t=document.querySelectorAll("script["+I.script_selector+"]"),n=function(t,o){if(o<t.length){var i=t[o],a=i.getAttribute(I.script_selector);if(le(e,a)>-1){i.type=i.getAttribute("data-type")||"text/javascript",i.removeAttribute(I.script_selector);var c=i.getAttribute("data-src");c&&i.removeAttribute("data-src");var r=de("script");if(r.textContent=i.innerHTML,function(e,t){for(var n=t.attributes,o=n.length,i=0;i<o;i++){var a=n[i].nodeName;e.setAttribute(a,t[a]||t.getAttribute(a))}}(r,i),c?r.src=c:c=i.src,c&&(r.readyState?r.onreadystatechange=function(){"loaded"!==r.readyState&&"complete"!==r.readyState||(r.onreadystatechange=null,n(t,++o))}:r.onload=function(){r.onload=null,n(t,++o)}),i.parentNode.replaceChild(r,i),c)return}n(t,++o)}};n(t,0)}};J.set=function(e,t){return"data"===e&&function(e,t){var n=!1;if("update"===t){var o=typeof(P=J.get("data"))==typeof e;if(o&&"object"==typeof P)for(var i in!P&&(P={}),e)P[i]!==e[i]&&(P[i]=e[i],n=!0);else!o&&P||P===e||(P=e,n=!0)}else P=e,n=!0;return n&&(q.data=P,_e(I.cookie_name,JSON.stringify(q))),n}(t.value,t.mode)},J.get=function(e,t){return JSON.parse(ve(t||I.cookie_name,"one",!0)||"{}")[e]},J.getConfig=function(e){return I[e]||t[e]};var he=function(){return V=q.categories||[],Y=te.filter((function(e){return-1===le(V,e)})),{accepted:V,rejected:Y}},ge=function(e){var t="custom",n=ne.length;return e.accepted.length===te.length?t="all":e.accepted.length===n&&(t="necessary"),t};J.getUserPreferences=function(){var e=he();return{accept_type:ge(e),accepted_categories:e.accepted,rejected_categories:e.rejected}},J.loadScript=function(e,t,n){var o="function"==typeof t;if(document.querySelector('script[src="'+e+'"]'))o&&t();else{var i=de("script");if(n&&n.length>0)for(var a=0;a<n.length;++a)n[a]&&i.setAttribute(n[a].name,n[a].value);o&&(i.onload=t),i.src=e,document.head.appendChild(i)}},J.updateScripts=function(){fe()},J.show=function(e,t){!0===t&&ce(I.current_lang),U&&(g=Ne(),a=Z,c=b,R=!0,b.removeAttribute("aria-hidden"),setTimeout((function(){ke(oe,"show--consent")}),e>0?e:t?30:0))},J.hide=function(){U&&(R=!1,xe(r),b.setAttribute("aria-hidden","true"),Ce(oe,"show--consent"),xe(g),g=null)},J.showSettings=function(e){z=!0,S.removeAttribute("aria-hidden"),R?_=Ne():g=Ne(),c=S,a=$,setTimeout((function(){ke(oe,"show--settings")}),e>0?e:0)},J.hideSettings=function(){z=!1,Se(),xe(s),S.setAttribute("aria-hidden","true"),Ce(oe,"show--settings"),R?(xe(_),_=null,c=b,a=Z):(xe(g),g=null)},J.accept=function(e,t){var a=e||void 0,c=t||[],r=[];if(a)if("object"==typeof a&&"number"==typeof a.length)for(var s=0;s<a.length;s++)-1!==le(te,a[s])&&r.push(a[s]);else"string"==typeof a&&("all"===a?r=te.slice():-1!==le(te,a)&&r.push(a));else r=function(){for(var e=document.querySelectorAll(".c-tgl")||[],t=[],n=0;n<e.length;n++)e[n].checked&&t.push(e[n].value);return t}();if(c.length>=1)for(s=0;s<c.length;s++)r=r.filter((function(e){return e!==c[s]}));for(s=0;s<te.length;s++)!0===ne.includes(te[s])&&-1===le(r,te[s])&&r.push(te[s]);!function(e){G=[];var t=S.querySelectorAll(".c-tgl")||[];if(t.length>0)for(var a=0;a<t.length;a++)-1!==le(e,te[a])?(t[a].checked=!0,ee[a]||(G.push(te[a]),ee[a]=!0)):(t[a].checked=!1,ee[a]&&(G.push(te[a]),ee[a]=!1));!F&&I.autoclear_cookies&&G.length>0&&se(),n||(n=new Date),i||(i=([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,(function(e){try{return(e^(window.crypto||window.msCrypto).getRandomValues(new Uint8Array(1))[0]&15>>e/4).toString(16)}catch{return""}}))),q={categories:e,level:e,revision:I.revision,data:P,rfc_cookie:I.use_rfc_cookie,consent_date:n.toISOString(),consent_uuid:i},(F||G.length>0)&&(W=!0,o=o?new Date:n,q.last_consent_update=o.toISOString(),h=ge(he()),_e(I.cookie_name,JSON.stringify(q)),fe()),F&&(I.autoclear_cookies&&se(!0),"function"==typeof f&&f(J.getUserPreferences(),q),"function"==typeof u&&u(q),F=!1,"opt-in"===I.mode)||("function"==typeof p&&G.length>0&&p(q,G),K&&location.reload())}(r)},J.eraseCookies=function(e,t,n){var o=[],i=n?[n,"."+n]:[I.cookie_domain,"."+I.cookie_domain];if("object"==typeof e&&e.length>0)for(var a=0;a<e.length;a++)this.validCookie(e[a])&&o.push(e[a]);else this.validCookie(e)&&o.push(e);me(o,t,i)};var _e=function(e,t){var n=I.cookie_expiration;"number"==typeof I.cookie_necessary_only_expiration&&"necessary"===h&&(n=I.cookie_necessary_only_expiration),t=I.use_rfc_cookie?encodeURIComponent(t):t;var o=new Date;o.setTime(o.getTime()+24*n*60*60*1e3);var i=e+"="+(t||"")+"; expires="+o.toUTCString()+"; Path="+I.cookie_path+";";i+=" SameSite="+I.cookie_same_site+";",location.hostname.indexOf(".")>-1&&I.cookie_domain&&(i+=" Domain="+I.cookie_domain+";"),"https:"===location.protocol&&(i+=" Secure;"),document.cookie=i},ve=function(e,t,n){var o;if("one"===t){if((o=(o=document.cookie.match("(^|;)\\s*"+e+"\\s*=\\s*([^;]+)"))?n?o.pop():e:"")&&e===I.cookie_name){try{o=JSON.parse(o)}catch{try{o=JSON.parse(decodeURIComponent(o))}catch{o={}}}o=JSON.stringify(o)}}else if("all"===t){var i=document.cookie.split(/;\s*/);o=[];for(var a=0;a<i.length;a++)o.push(i[a].split("=")[0])}return o},me=function(e,t,n){for(var o=t||"/",i=0;i<e.length;i++){for(var a=0;a<n.length;a++)document.cookie=e[i]+"=; path="+o+(0==n[a].indexOf(".")?"; domain="+n[a]:"")+"; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";e[i]}};J.validCookie=function(e){return""!==ve(e,"one",!0)},J.validConsent=function(){return!F};var be=function(e,t,n,o){e.addEventListener(t,n,!0===o&&{passive:!0})},ye=function(e){if("object"==typeof e)return Object.keys(e)},ke=function(e,t){e.classList.add(t)},Ce=function(e,t){e.classList.remove(t)},we=function(e,t){return e.classList.contains(t)},Ae=function(e){var t=de("span");return t.tabIndex=-1,1===e?r=t:s=t,t},xe=function(e){e&&e instanceof HTMLElement&&e.focus()},Se=function(){for(var e=N.querySelectorAll(".c-tgl"),t=0;t<e.length;t++){var n=e[t].value,o=ne.includes(n);e[t].checked=o||J.allowedCategory(n)}},Ne=function(){return document.activeElement};return J})}();const Tt={current_lang:"en",autoclear_cookies:!0,page_scripts:!0,cookie_same_site:"Lax",gui_options:{consent_modal:{layout:"cloud",position:"bottom center",transition:"slide"},settings_modal:{layout:"bar",position:"left",transition:"slide"}},onFirstAction:function(e,t){const n=window.CC.allowedCategory("analytics");console.log("analytics "+(n?"enabled":"disabled"))},onAccept:function(e){},onChange:function(e,t){},languages:{en:{consent_modal:{title:"We use cookies!",description:'Hi, this website uses essential cookies to ensure its proper operation and tracking cookies to understand how you interact with it. The latter will be set only after consent.<br/> <button type="button" data-cc="c-settings" class="cc-link">Let me choose.</button>',primary_btn:{text:"Accept all",role:"accept_all"},secondary_btn:{text:"Reject all",role:"accept_necessary"},revision_message:"<br><br> Our terms and conditions have changed since the last time you visisted!"},settings_modal:{title:"Cookie Settings",save_settings_btn:"Save settings",accept_all_btn:"Accept all",reject_all_btn:"Reject all",close_btn_label:"Close",cookie_table_headers:[{col1:"Name"},{col2:"Domain"},{col3:"Expiration"}],blocks:[{title:"Cookie usage 📢",description:'I use cookies to ensure the basic functionalities of the website and to enhance your online experience. You can choose for each category to opt-in/out whenever you want. For more details relative to cookies and other sensitive data, please read the full <a href="/policies/cookies" class="cc-link">cookie notice</a>.'},{title:"Strictly necessary cookies",description:"These cookies are essential for the proper functioning of my website. Without these cookies, the website would not work properly",toggle:{value:"necessary",enabled:!0,readonly:!0}},{title:"Performance and Analytics cookies",description:"These cookies allow the website to remember the choices you have made in the past",toggle:{value:"analytics",enabled:!1,readonly:!1},cookie_table:[{col1:"^_ga",col2:".peculiardynamics.co.uk",col3:"14 months",is_regex:!0},{col1:"_gid",col2:".peculiardynamics.co.uk",col3:"1 day"}]},{title:"Advertisement and Targeting cookies",description:"These cookies collect information about how you use the website, which pages you visited and which links you clicked on. All of the data is anonymized and cannot be used to identify you",toggle:{value:"targeting",enabled:!1,readonly:!1}},{title:"More information",description:'For any queries in relation to our policy on cookies and your choices, please <a class="cc-link" href="/contact">contact us</a>.'}]}}}};export{jt as default};