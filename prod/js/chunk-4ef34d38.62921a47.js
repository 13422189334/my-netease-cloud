(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4ef34d38"],{"0158":function(e,t,n){},"6c13":function(e,t,n){},7884:function(e,t,n){"use strict";n("a9e3"),n("b0c0");var c=n("7a23"),a={class:"item"},o={class:"cover"},l={class:"label"},i={class:"label"},r={props:{image:{type:String},name:{type:String},label:{type:[String,Number]},album:{type:[String,Number]}},setup:function(e){return function(t,n){var r=Object(c["resolveComponent"])("el-image"),b=Object(c["resolveComponent"])("el-col"),u=Object(c["resolveComponent"])("el-row");return Object(c["openBlock"])(),Object(c["createElementBlock"])("nav",a,[Object(c["createVNode"])(u,{class:"item-newSong",align:"middle"},{default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(b,{span:3},{default:Object(c["withCtx"])((function(){return[Object(c["createElementVNode"])("div",o,[Object(c["createVNode"])(r,{src:e.image,class:"image"},null,8,["src"])])]})),_:1}),Object(c["createVNode"])(b,{span:10},{default:Object(c["withCtx"])((function(){return[Object(c["createElementVNode"])("div",null,Object(c["toDisplayString"])(e.name),1)]})),_:1}),Object(c["createVNode"])(b,{span:9},{default:Object(c["withCtx"])((function(){return[Object(c["createElementVNode"])("div",l,Object(c["toDisplayString"])(e.label),1)]})),_:1}),Object(c["createVNode"])(b,{span:2},{default:Object(c["withCtx"])((function(){return[Object(c["createElementVNode"])("div",i,Object(c["toDisplayString"])(e.album),1)]})),_:1})]})),_:1})])}}},b=(n("7a00"),n("6b0d")),u=n.n(b);const s=u()(r,[["__scopeId","data-v-2eef8bdb"]]);t["a"]=s},"7a00":function(e,t,n){"use strict";n("6c13")},d621:function(e,t,n){"use strict";n.r(t);n("b0c0");var c=n("7a23"),a=n("7884"),o=n("5502"),l=n("6c02"),i=n("8d85"),r=n("0250"),b=n("a5e1"),u={class:"skeleton-item-box"},s={key:0},d={key:1},m={setup:function(e){var t=Object(c["ref"])([]),n=Object(c["ref"])(!0);Object(c["onMounted"])((function(){Object(i["b"])().then((function(e){t.value=e.data.data,n.value=!1}))}));var m=Object(l["d"])(),j=Object(o["b"])(),O=function(e){Object(r["a"])(e).then((function(e){j.commit("setSongList",Object(b["a"])(e.data.album)),j.commit("setSongMusic",e.data.songs),m.push("/detail/song")}))};return function(e,o){var l=Object(c["resolveComponent"])("el-skeleton-item"),i=Object(c["resolveComponent"])("el-empty"),r=Object(c["resolveComponent"])("el-skeleton");return Object(c["openBlock"])(),Object(c["createElementBlock"])(c["Fragment"],null,[Object(c["createElementVNode"])("h4",null,"收藏的专辑("+Object(c["toDisplayString"])(t.value.length)+")",1),Object(c["createVNode"])(r,{count:8,loading:n.value,animated:""},{template:Object(c["withCtx"])((function(){return[Object(c["createElementVNode"])("div",u,[Object(c["createVNode"])(l,{variant:"image",class:"skeleton-item-image"}),Object(c["createVNode"])(l,{variant:"p",class:"skeleton-item-p"})])]})),default:Object(c["withCtx"])((function(){return[t.value.length?(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",s,[(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(t.value,(function(e){return Object(c["openBlock"])(),Object(c["createElementBlock"])("div",{key:e.id,class:"mgt-10"},[Object(c["createVNode"])(a["a"],{image:e.picUrl,name:e.name,label:e.artists[0].name,album:e.size+"首",onClick:function(t){return O(e.id)}},null,8,["image","name","label","album","onClick"])])})),128))])):(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",d,[Object(c["createVNode"])(i,{"image-size":300})]))]})),_:1},8,["loading"])],64)}}},j=(n("e104"),n("6b0d")),O=n.n(j);const p=O()(m,[["__scopeId","data-v-deb7d83a"]]);t["default"]=p},e104:function(e,t,n){"use strict";n("0158")}}]);