import{r as y,m as w,p as B,o as b,c as h,q as C,d as a,s as k,x as $,y as D,z,_ as S,A as N,B as V,e as r,t as p,f as _,w as m,C as E,F as M,l as x,n as T}from"./index-f4199718.js";import{_ as O}from"./Button-0333f1c2.js";const F={__name:"DragBox",props:{x:{type:Number,default:0},y:{type:Number,default:0},preventDefault:{type:Boolean,default:!0},notOutside:{type:Boolean,default:!0}},emits:["move","end","start"],setup(u,{emit:t}){const n=u,s=y(null),i=y(null);function d(e){if(!n.notOutside)return e;const c=e;o.value<0&&(c.x=0),l.value<0&&(c.y=0);const g=window.innerWidth-s.value.offsetWidth,v=window.innerHeight-s.value.offsetHeight;return o.value>g&&(c.x=g),l.value>v&&(c.y=v),c}const{x:o,y:l,style:f}=w(s,{initialValue:{x:n.x,y:n.y},preventDefault:n.preventDefault,handle:i,onMove:e=>t("move",e),onEnd:e=>t("end",d(e)),onStart:e=>t("start",e)});return B(()=>{window.addEventListener("resize",()=>d({x:o.value,y:l.value}))}),(e,c)=>(b(),h("div",{ref_key:"el",ref:s,style:k(a(f))},[C(e.$slots,"default",{setRef:g=>i.value=g,x:a(o),y:a(l)})],4))}},H=$(()=>{const u=D("count",0),t=z(()=>u.value*2);function n(){u.value++}return{count:u,doubleCount:t,increment:n}}),I="dragcontainer_xa47bv",W="draggable_f1xiYw",q="dragbox_z3-Vzh",A={dragcontainer:I,draggable:W,dragbox:q},G={class:"dev"},K=r("h1",null,"Dev page",-1),L=r("p",null,"This is a dialog",-1),P={__name:"dev",setup(u){const t=H(),n=D("draggable",{x:0,y:0}),s=N({storageKey:"theme"}),i=V(s);return(d,o)=>{const l=O,f=F;return b(),h(M,null,[r("div",G,[K,r("p",null,"Dark mode: "+p(a(s)),1),_(l,{onClick:o[0]||(o[0]=e=>a(i)())},{default:m(()=>[x("Toggle dark mode")]),_:1}),r("p",null,p(a(t).count)+" / "+p(a(t).doubleCount),1),_(l,{onClick:a(t).increment},{default:m(()=>[x("Increment")]),_:1},8,["onClick"])]),r("div",{style:k(d.$style.dragcontainer)},[_(f,E(a(n),{class:d.$style.dragbox,onEnd:o[1]||(o[1]=e=>n.value=e)}),{default:m(({setRef:e})=>[r("div",{ref:e,class:T(d.$style.draggable)},null,2),L]),_:1},16,["class"])],4)],64)}}},R={$style:A},J=S(P,[["__cssModules",R]]);export{J as default};
