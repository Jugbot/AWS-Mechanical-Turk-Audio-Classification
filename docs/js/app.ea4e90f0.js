(function(e){function t(t){for(var r,i,s=t[0],l=t[1],c=t[2],f=0,p=[];f<s.length;f++)i=s[f],a[i]&&p.push(a[i][0]),a[i]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(e[r]=l[r]);u&&u(t);while(p.length)p.shift()();return o.push.apply(o,c||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,s=1;s<n.length;s++){var l=n[s];0!==a[l]&&(r=!1)}r&&(o.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},a={app:0},o=[];function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var c=0;c<s.length;c++)t(s[c]);var u=l;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("097d");var r=n("2b0e"),a=n("bc3a"),o=n.n(a),i={},s=o.a.create(i);s.interceptors.request.use(function(e){return e},function(e){return Promise.reject(e)}),s.interceptors.response.use(function(e){return e},function(e){return Promise.reject(e)}),Plugin.install=function(e,t){e.axios=s,window.axios=s,Object.defineProperties(e.prototype,{axios:{get:function(){return s}},$axios:{get:function(){return s}}})},r["a"].use(Plugin);Plugin;var l=n("bb71");n("da64");r["a"].use(l["a"],{iconfont:"md"});var c=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",[n("v-container",[n("v-layout",{attrs:{"justify-center":"","align-center":"","fill-height":""}},[n("v-flex",[n("v-form",[n("v-card",{attrs:{color:"deep-purple lighten-5"}},[n("v-card-title",{attrs:{"primary-title":""}},[n("v-layout",{attrs:{"justify-center":""}},[n("h3",{staticClass:"headline"},[e._v("\n                  Balance:\n                  "),n("v-chip",{attrs:{color:"green","text-color":"white",label:""}},[e._v("\n                    "+e._s(e._f("dollars")(e.money))+"\n                  ")])],1)])],1),n("v-window",{model:{value:e.step,callback:function(t){e.step=t},expression:"step"}},e._l(e.items,function(t,r){return n("v-window-item",{attrs:{value:r+1}},[n("v-card-text",[n("v-audio",{attrs:{file:t.file}}),n("v-subheader",[e._v("Classification")]),n("v-text-field",{attrs:{solo:"",label:"label"},model:{value:t.classification,callback:function(n){e.$set(t,"classification",n)},expression:"item.classification"}}),n("v-subheader",[e._v("Confidence Bet")]),n("v-slider",{attrs:{"thumb-label":""},model:{value:t.betval,callback:function(n){e.$set(t,"betval",n)},expression:"item.betval"}},[n("span",{attrs:{slot:"append"},slot:"append"},[e._v("\n                      "+e._s(e._f("dollars")(e.bet(t.betval)))+"\n                    ")])])],1)],1)})),n("v-card-actions",[n("v-btn",{attrs:{disabled:1===e.step,flat:""},on:{click:function(t){e.step--}}},[e._v("\n                Back\n              ")]),n("v-spacer"),e._v("\n              "+e._s(e.step)+"/"+e._s(e.items.length)+"\n              "),n("v-spacer"),2!==e.step?n("v-btn",{attrs:{color:"primary",depressed:""},on:{click:function(t){e.step++}}},[e._v("\n                Next\n              ")]):n("v-btn",{attrs:{color:"success",depressed:""},on:{click:function(t){e.submit()}}},[e._v("\n                Submit\n              ")])],1)],1)],1)],1)],1)],1)],1)},u=[],f=(n("c5f6"),n("5df2"),n("6b54"),n("59bd")),p={name:"App",components:{"v-audio":f["a"]},data:function(){return{step:1,money:57,items:[{betval:10,file:"",classification:""},{betval:38,file:"",classification:""}]}},methods:{bet:function(e){return e/100*this.money},submit:function(){}},filters:{dollars:function(e){return e||(e=0),e=Number.parseFloat(e).toFixed(2).toString(),"$"+e}}},d=p,v=n("2877"),b=n("6544"),m=n.n(b),h=n("7496"),y=n("8336"),_=n("b0af"),g=n("99d9"),x=n("12b2"),w=n("cc20"),V=n("a523"),j=n("0e8f"),P=n("4bd4"),O=n("a722"),k=n("ba0d"),S=n("9910"),C=n("e0c7"),T=n("2677"),$=n("f665"),F=n("1e6c"),A=Object(v["a"])(d,c,u,!1,null,null,null);A.options.__file="App.vue";var B=A.exports;m()(A,{VApp:h["a"],VBtn:y["a"],VCard:_["a"],VCardActions:g["a"],VCardText:g["b"],VCardTitle:x["a"],VChip:w["a"],VContainer:V["a"],VFlex:j["a"],VForm:P["a"],VLayout:O["a"],VSlider:k["a"],VSpacer:S["a"],VSubheader:C["a"],VTextField:T["a"],VWindow:$["a"],VWindowItem:F["a"]}),r["a"].config.productionTip=!1,new r["a"]({render:function(e){return e(B)}}).$mount("#app")}});
//# sourceMappingURL=app.ea4e90f0.js.map