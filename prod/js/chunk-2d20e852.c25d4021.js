(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d20e852"],{b05c:function(e,t,n){"use strict";n.r(t);var o=n("7a23"),c=n("6c02"),a=n("5502"),r=n("74b4"),u={setup:function(e){var t=Object(a["b"])(),n=Object(o["computed"])((function(){return t.state.songDetail.keywords})),u=Object(o["ref"])([]);Object(o["onMounted"])((function(){Object(r["b"])({keywords:n.value,type:100}).then((function(e){u.value=e.data.result.artists}))}));var i=Object(c["d"])(),s=function(e){t.commit("setSingerId",e),i.push("/detail/singer")};return function(e,t){var n=Object(o["resolveComponent"])("searchCover"),c=Object(o["resolveComponent"])("skeleton1");return Object(o["openBlock"])(),Object(o["createBlock"])(c,{count:10,loading:u.value.length,image:{width:"50px",height:"50px"},row:1,margin:{width:"95%",marginLeft:"10px"}},{default:Object(o["withCtx"])((function(){return[Object(o["createVNode"])(n,{data:u.value,onToDetail:s},null,8,["data"])]})),_:1},8,["loading"])}}};const i=u;t["default"]=i}}]);