function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},n={},r=t.parcelRequired7c6;null==r&&((r=function(e){if(e in o)return o[e].exports;if(e in n){var t=n[e];delete n[e];var r={id:e,exports:{}};return o[e]=r,t.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){n[e]=t},t.parcelRequired7c6=r);var i=r("7Y9D8");const l=document.querySelector(".form"),u=l.querySelector("button");function s(e,t){return new Promise(((o,n)=>{Math.random()>.3?setTimeout((()=>{o({position:e,delay:t})}),t):setTimeout((()=>{n({position:e,delay:t})}),t)}))}l.addEventListener("submit",(function(t){t.preventDefault(),console.log(t),u.setAttribute("disabled","");const{elements:{delay:o,amount:n,step:r}}=t.currentTarget,l=Number(o.value),d=Number(n.value),a=Number(r.value);let f=l,c=1;for(let t=0;t<d;t++)s(c,f).then((({position:t,delay:o})=>{e(i).Notify.success(`✅ Fulfilled promise ${t} in ${o}ms`)})).catch((({position:t,delay:o})=>{e(i).Notify.failure(`❌ Rejected promise ${t} in ${o}ms`)})).finally((()=>{u.removeAttribute("disabled")})),c+=1,f+=a}));
//# sourceMappingURL=03-promises.48496ca5.js.map
