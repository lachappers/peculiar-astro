import{r as u}from"./index.ed373d49.js";import"./client.df21ed18.js";var f={exports:{}},c={},a=u,p=Symbol.for("react.element"),h=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,j=a.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,_={key:!0,ref:!0,__self:!0,__source:!0};function x(e,n,r){var t,s={},o=null,c=null;for(t in void 0!==r&&(o=""+r),void 0!==n.key&&(o=""+n.key),void 0!==n.ref&&(c=n.ref),n)m.call(n,t)&&!_.hasOwnProperty(t)&&(s[t]=n[t]);if(e&&e.defaultProps)for(t in n=e.defaultProps)void 0===s[t]&&(s[t]=n[t]);return{$$typeof:p,type:e,key:o,ref:c,props:s,_owner:j.current}}c.Fragment=h,c.jsx=x,c.jsxs=x,f.exports=c;var n=f.exports;function v(e){return n.jsx("li",{children:e.user})}function y(e){return 0===e.users.length?n.jsx("div",{children:"There are no users!"}):n.jsx("ul",{children:e.users.map((e=>n.jsx(v,{user:e.name},e.id)))})}function E(){let e={};const[r,t]=u.useState([]);u.useEffect((()=>{fetch("https://jsonplaceholder.typicode.com/users").then((e=>e.json())).then((e=>{t(e)}))}),[]),console.log(r);const[s,o]=u.useState(0);return e=r[s],console.log({user:e}),console.log(e),n.jsxs("div",{children:[n.jsx("button",{onClick:function(){o(s+1)},children:"Next"}),n.jsx("p",{children:s}),n.jsxs("p",{children:["(",s+1," of ",r.length,")"]}),n.jsx(y,{users:r})]})}function O(){return n.jsx("div",{className:"container w-64 rounded-md bg-white text-black",children:n.jsx(E,{})})}export{O as default};