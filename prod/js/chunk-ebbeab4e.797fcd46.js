(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ebbeab4e"],{"45fd":function(t,e,n){"use strict";n.r(e);var c=n("1da1"),r=(n("b0c0"),n("96cf"),n("7a23")),a=n("6c02"),u=n("5502"),i=n("0250"),o=n("a5e1"),s=n("883c"),b={key:0,class:"album-box"},l={setup:function(t){var e=Object(a["d"])(),n=Object(u["b"])(),l=Object(r["computed"])((function(){return n.state.singer.singerId})),d=Object(r["ref"])([]);Object(r["watch"])(l,function(){var t=Object(c["a"])(regeneratorRuntime.mark((function t(e){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(s["b"])(e);case 2:n=t.sent,d.value=n.data.hotAlbums;case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),{immediate:!0,deep:!0});var f=function(t){Object(i["a"])(t).then((function(t){n.commit("setSongList",Object(o["a"])(t.data.album)),n.commit("setSongMusic",t.data.songs),e.push("/detail/song")}))};return function(t,e){var n=Object(r["resolveComponent"])("cover"),c=Object(r["resolveComponent"])("el-empty");return d.value.length?(Object(r["openBlock"])(),Object(r["createElementBlock"])("div",b,[(Object(r["openBlock"])(!0),Object(r["createElementBlock"])(r["Fragment"],null,Object(r["renderList"])(d.value,(function(t){return Object(r["openBlock"])(),Object(r["createBlock"])(n,{key:t.id,image:t.picUrl,name:t.name,time:t.publishTime,onClick:function(e){return f(t.id)}},null,8,["image","name","time","onClick"])})),128))])):(Object(r["openBlock"])(),Object(r["createBlock"])(c,{key:1,description:"暂无专辑"}))}}},d=(n("8a6f"),n("6b0d")),f=n.n(d);const m=f()(l,[["__scopeId","data-v-22cee804"]]);e["default"]=m},"5ccb":function(t,e,n){},"883c":function(t,e,n){"use strict";n.d(e,"c",(function(){return r})),n.d(e,"g",(function(){return a})),n.d(e,"b",(function(){return u})),n.d(e,"e",(function(){return i})),n.d(e,"d",(function(){return o})),n.d(e,"a",(function(){return s})),n.d(e,"f",(function(){return b}));var c=n("1ae0");function r(t){return Object(c["a"])({url:"/artist/list",params:t})}function a(t){return Object(c["a"])({url:"/artist/top/song",params:{id:t}})}function u(t,e){return Object(c["a"])({url:"/artist/album",params:{id:t,offset:e}})}function i(t){return Object(c["a"])({url:"/artist/detail",params:{id:t}})}function o(t){return Object(c["a"])({url:"/artist/desc",params:{id:t}})}function s(t){return Object(c["a"])({url:"/simi/artist",params:{id:t}})}function b(t){return Object(c["a"])({url:"/artist/mv",params:{id:t}})}},"8a6f":function(t,e,n){"use strict";n("5ccb")}}]);