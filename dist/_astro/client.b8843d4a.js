import{r as e}from"./index.6460afdd.js";import{c as m,h as p}from"./client.352409db.js";const a=({value:t,name:r,hydrate:o=!0})=>{if(!t)return null;const n=o?"astro-slot":"astro-static-slot";return e.createElement(n,{name:r,suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:t}})};a.shouldComponentUpdate=()=>!1;function y(t){for(const r in t)if(r.startsWith("__reactContainer"))return r}const h=t=>(r,o,{default:n,...u},{client:f})=>{if(!t.hasAttribute("ssr"))return;const l={identifierPrefix:t.getAttribute("prefix")};for(const[c,d]of Object.entries(u))o[c]=e.createElement(a,{value:d,name:c});const s=e.createElement(r,o,n!=null?e.createElement(a,{value:n}):n),i=y(t);return i&&delete t[i],f==="only"?e.startTransition(()=>{m(t).render(s)}):e.startTransition(()=>{p(t,s,l)})};export{h as default};
