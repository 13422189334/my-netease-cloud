(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-27f44914"],{"883c":function(e,t,n){"use strict";n.d(t,"c",(function(){return r})),n.d(t,"g",(function(){return a})),n.d(t,"b",(function(){return i})),n.d(t,"e",(function(){return o})),n.d(t,"d",(function(){return l})),n.d(t,"a",(function(){return u})),n.d(t,"f",(function(){return s}));var c=n("1ae0");function r(e){return Object(c["a"])({url:"/artist/list",params:e})}function a(e){return Object(c["a"])({url:"/artist/top/song",params:{id:e}})}function i(e,t){return Object(c["a"])({url:"/artist/album",params:{id:e,offset:t}})}function o(e){return Object(c["a"])({url:"/artist/detail",params:{id:e}})}function l(e){return Object(c["a"])({url:"/artist/desc",params:{id:e}})}function u(e){return Object(c["a"])({url:"/simi/artist",params:{id:e}})}function s(e){return Object(c["a"])({url:"/artist/mv",params:{id:e}})}},a275:function(e,t,n){},b59f:function(e,t,n){"use strict";n("a275")},b772:function(e,t,n){"use strict";n.r(t);var c=n("1da1"),r=(n("b0c0"),n("96cf"),n("7a23")),a=n("b8b0"),i=n("d627"),o={class:"top"},l={class:"content"},u={class:"A"},s={class:"B"},d={class:"C"},b=Object(r["createTextVNode"])("收藏"),j=Object(r["createTextVNode"])("个人主页"),O={class:"D"},m={props:{singerDetail:{type:Object}},setup:function(e){return function(t,n){var c=Object(r["resolveComponent"])("el-image"),m=Object(r["resolveComponent"])("el-link"),p=Object(r["resolveComponent"])("el-button"),f=Object(r["resolveComponent"])("el-collapse-item"),v=Object(r["resolveComponent"])("el-collapse");return Object(r["openBlock"])(),Object(r["createElementBlock"])("div",o,[Object(r["createElementVNode"])("div",null,[Object(r["createVNode"])(c,{class:"cover",src:e.singerDetail.artist.cover,alt:"img"},null,8,["src"])]),Object(r["createElementVNode"])("div",l,[Object(r["createElementVNode"])("div",u,[Object(r["createElementVNode"])("h2",null,Object(r["toDisplayString"])(e.singerDetail.artist.name),1)]),Object(r["createElementVNode"])("div",s,[Object(r["createVNode"])(m,{type:"info"},{default:Object(r["withCtx"])((function(){var t;return[Object(r["createTextVNode"])(Object(r["toDisplayString"])(null===(t=e.singerDetail.identify)||void 0===t?void 0:t.imageDesc),1)]})),_:1})]),Object(r["createElementVNode"])("div",d,[Object(r["createVNode"])(p,{size:"small",round:"",icon:Object(r["unref"])(a["a"]),disabled:""},{default:Object(r["withCtx"])((function(){return[b]})),_:1},8,["icon"]),Object(r["createVNode"])(p,{size:"small",round:"",icon:Object(r["unref"])(i["a"]),disabled:""},{default:Object(r["withCtx"])((function(){return[j]})),_:1},8,["icon"])]),Object(r["createElementVNode"])("div",O,[Object(r["createElementVNode"])("p",null,[(Object(r["openBlock"])(!0),Object(r["createElementBlock"])(r["Fragment"],null,Object(r["renderList"])(e.singerDetail.secondaryExpertIdentiy,(function(e){return Object(r["openBlock"])(),Object(r["createElementBlock"])("span",{key:e.expertIdentiyId,class:"mgl-25"},Object(r["toDisplayString"])(e.expertIdentiyName)+" : "+Object(r["toDisplayString"])(e.expertIdentiyCount),1)})),128))]),Object(r["createVNode"])(v,null,{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(f,{title:"点击展开更多"},{default:Object(r["withCtx"])((function(){return[Object(r["createTextVNode"])(Object(r["toDisplayString"])(e.singerDetail.artist.briefDesc),1)]})),_:1})]})),_:1})])])])}}},p=(n("b59f"),n("6b0d")),f=n.n(p);const v=f()(m,[["__scopeId","data-v-778b8279"]]);var g=v,h=n("5502"),V=n("883c"),x={name:"Singer"},w=Object.assign(x,{setup:function(e){var t=Object(h["b"])(),n=Object(r["computed"])((function(){return t.state.singer.singerId})),a=Object(r["ref"])([{name:"单曲",path:"/detail/singer"},{name:"专辑",path:"/detail/singer/album"},{name:"MV",path:"/detail/singer/mv"},{name:"歌手详情",path:"/detail/singer/detail"},{name:"相似歌手",path:"/detail/singer/similar"}]),i=Object(r["ref"])(null);return Object(r["watch"])(n,function(){var e=Object(c["a"])(regeneratorRuntime.mark((function e(t){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(V["e"])(t);case 2:n=e.sent,i.value=n.data.data;case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),{immediate:!0,deep:!0}),function(e,t){var n,c=Object(r["resolveComponent"])("skeleton1"),o=Object(r["resolveComponent"])("el-menu-item"),l=Object(r["resolveComponent"])("el-menu"),u=Object(r["resolveComponent"])("router-view");return Object(r["openBlock"])(),Object(r["createElementBlock"])(r["Fragment"],null,[Object(r["createVNode"])(c,{loading:null===(n=i.value)||void 0===n?void 0:n.artist.id,image:{width:"210px",height:"220px"},margin:{width:"900px",marginLeft:"20px"}},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(g,{"singer-detail":i.value},null,8,["singer-detail"])]})),_:1},8,["loading"]),Object(r["createVNode"])(l,{"default-active":e.$route.path,router:"",mode:"horizontal"},{default:Object(r["withCtx"])((function(){return[(Object(r["openBlock"])(!0),Object(r["createElementBlock"])(r["Fragment"],null,Object(r["renderList"])(a.value,(function(e){return Object(r["openBlock"])(),Object(r["createBlock"])(o,{key:e.name,index:e.path},{default:Object(r["withCtx"])((function(){return[Object(r["createTextVNode"])(Object(r["toDisplayString"])(e.name),1)]})),_:2},1032,["index"])})),128))]})),_:1},8,["default-active"]),Object(r["createVNode"])(u,null,{default:Object(r["withCtx"])((function(e){var t=e.Component;return[(Object(r["openBlock"])(),Object(r["createBlock"])(r["KeepAlive"],null,[(Object(r["openBlock"])(),Object(r["createBlock"])(Object(r["resolveDynamicComponent"])(t)))],1024))]})),_:1})],64)}}});const k=w;t["default"]=k},b8b0:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var c=n("2138"),r=n("9ee5");const a=Object(c["defineComponent"])({name:"FolderAdd"}),i={viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg"},o=Object(c["createElementVNode"])("path",{fill:"currentColor",d:"M128 192v640h768V320H485.76L357.504 192H128zm-32-64h287.872l128.384 128H928a32 32 0 0 1 32 32v576a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32zm384 416V416h64v128h128v64H544v128h-64V608H352v-64h128z"},null,-1),l=[o];function u(e,t,n,r,a,o){return Object(c["openBlock"])(),Object(c["createElementBlock"])("svg",i,l)}var s=Object(r["a"])(a,[["render",u]])}}]);