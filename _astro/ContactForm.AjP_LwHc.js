import{r as l}from"./index.LFf77hJu.js";var d={exports:{}},c={},b=l,h=Symbol.for("react.element"),x=Symbol.for("react.fragment"),j=Object.prototype.hasOwnProperty,_=b.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,y={key:!0,ref:!0,__self:!0,__source:!0};function u(e,r,s){var t,a={},o=null,l=null;for(t in void 0!==s&&(o=""+s),void 0!==r.key&&(o=""+r.key),void 0!==r.ref&&(l=r.ref),r)j.call(r,t)&&!y.hasOwnProperty(t)&&(a[t]=r[t]);if(e&&e.defaultProps)for(t in r=e.defaultProps)void 0===a[t]&&(a[t]=r[t]);return{$$typeof:h,type:e,key:o,ref:l,props:a,_owner:_.current}}c.Fragment=x,c.jsx=u,c.jsxs=u,d.exports=c;var e=d.exports;function v(){const r=l.useRef(null),[s,t]=l.useState(""),[a,o]=l.useState("bg-secondary-100"),[n,c]=l.useState(!1);return e.jsxs("form",{id:"contactForm",name:"contactForm",method:"post",ref:r,onSubmit:function(e){e.preventDefault(),console.log("submitting");const s=new FormData(r.current);c(!0),fetch("https://script.google.com/macros/s/AKfycbxsNrMMVOqB6N6B7ocFwkKdbPIk3lQ_u4X8jZj_PF62bnguR-ZD4a6I_U6mhQ4Uy_-OdQ/exec",{method:"POST",body:s,mode:"cors"}).then((e=>{console.log(e),console.log("submitted"),o("bg-green-200"),t("Message received - We'll be in touch ASAP.")})).catch((e=>{console.log(e),console.log("there was an error"),o("bg-red-200"),t("There was an error submitting your message. Please resubmit or try again later.")}))},className:"contactForm",children:[n&&e.jsx("div",{className:`mt-4 flex w-full items-center justify-center rounded p-4 font-medium ${a}`,children:s?e.jsx("p",{children:s}):e.jsx("p",{children:"Sending message... "})}),e.jsxs("div",{className:"mt-4",children:[e.jsx("label",{className:"mb-2",children:"Name"}),e.jsx("input",{name:"name",type:"text",placeholder:"Ada Lovelace",className:"form-input rounded border-2 bg-inherit",required:!0})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx("label",{className:"mb-2",children:"Email address"}),e.jsx("input",{name:"email",type:"email",placeholder:"adalovelace@example.com",className:"form-input rounded border-2 bg-inherit",required:!0})]}),e.jsxs("div",{className:"mt-4 w-full",children:[e.jsx("label",{className:"mb-2",children:"Message"}),e.jsx("textarea",{name:"message",className:"form-textarea rounded border-2 bg-inherit md:h-56",placeholder:"Message",required:!0,minLength:"20",maxLength:"1500"})]}),e.jsxs("button",{type:"submit",className:"button mt-4 w-full",children:[" ","Send message"]})]})}export{v as default};