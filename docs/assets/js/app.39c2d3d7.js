(function(e){function t(t){for(var i,o,s=t[0],c=t[1],l=t[2],d=0,p=[];d<s.length;d++)o=s[d],r[o]&&p.push(r[o][0]),r[o]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(e[i]=c[i]);u&&u(t);while(p.length)p.shift()();return a.push.apply(a,l||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],i=!0,s=1;s<n.length;s++){var c=n[s];0!==r[c]&&(i=!1)}i&&(a.splice(t--,1),e=o(o.s=n[0]))}return e}var i={},r={app:0},a=[];function o(t){if(i[t])return i[t].exports;var n=i[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=i,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)o.d(n,i,function(t){return e[t]}.bind(null,i));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=t,s=s.slice();for(var l=0;l<s.length;l++)t(s[l]);var u=c;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("097d");var i=n("2b0e"),r=n("bc3a"),a=n.n(r),o={},s=a.a.create(o);s.interceptors.request.use(function(e){return e},function(e){return Promise.reject(e)}),s.interceptors.response.use(function(e){return e},function(e){return Promise.reject(e)}),Plugin.install=function(e,t){e.axios=s,window.axios=s,Object.defineProperties(e.prototype,{axios:{get:function(){return s}},$axios:{get:function(){return s}}})},i["a"].use(Plugin);Plugin;var c=n("bb71");n("da64");i["a"].use(c["a"],{iconfont:"md"});var l=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",[n("v-container",[n("v-layout",{attrs:{"justify-center":"","align-center":"","fill-height":""}},[n("v-flex",[n("v-form",[n("v-card",{attrs:{color:"deep-purple lighten-5"}},[n("v-card-title",{attrs:{"primary-title":""}},[n("v-layout",{attrs:{"justify-center":""}},[n("h3",{staticClass:"headline"},[e._v("\n                  Audio Classification\n                ")])])],1),n("v-window",{model:{value:e.step,callback:function(t){e.step=t},expression:"step"}},e._l(e.items,function(t,i){return n("v-window-item",{key:t.file,attrs:{value:i+1}},[n("v-card-text",[n("v-container",{attrs:{"grid-list-lg":""}},[n("v-layout",{attrs:{column:""}},[n("v-flex",[n("v-audio",{attrs:{file:t.file,ended:function(){t.audio_step=!0}}})],1),t.audio_step?n("v-flex",[n("v-card",[n("v-card-title",[n("span",[e._v("Does this contain a(n) "+e._s(t.question))])]),n("v-divider"),n("v-card-actions",[n("v-radio-group",{attrs:{row:""},on:{change:function(e){t.class_step=!0}},model:{value:t.classification,callback:function(n){e.$set(t,"classification",n)},expression:"item.classification"}},[n("v-radio",{attrs:{label:"Yes",value:!0}}),n("v-radio",{attrs:{label:"No",value:!1}})],1)],1)],1)],1):e._e(),t.class_step?n("v-flex",[n("v-card",[n("v-card-title",[e._v("\n                            Confidence\n                          ")]),n("v-divider"),n("v-card-actions",[n("v-slider",{attrs:{"thumb-label":"",step:10,color:t.bet_step?"":"grey"},on:{change:function(e){t.bet_step=!0}},model:{value:t.confidence,callback:function(n){e.$set(t,"confidence",n)},expression:"item.confidence"}},[n("span",{attrs:{slot:"append"},slot:"append"},[e._v("\n                                "+e._s(t.confidence)+"%\n                              ")])])],1)],1)],1):e._e()],1)],1)],1)],1)}),1),n("v-card-actions",[n("v-btn",{attrs:{disabled:1===e.step,flat:""},on:{click:function(t){e.step--}}},[e._v("\n                Back\n              ")]),n("v-spacer"),e._v("\n              "+e._s(e.step)+"/"+e._s(e.items.length)+"\n              "),n("v-spacer"),e.step!==e.items.length?n("v-btn",{attrs:{color:"primary",depressed:"",disabled:!e.items[e.step-1].bet_step},on:{click:function(t){e.step++}}},[e._v("\n                Next\n              ")]):n("v-btn",{attrs:{color:"success",depressed:"",disabled:!e.items[e.step-1].bet_step},on:{click:function(t){e.submit()}}},[e._v("\n                Submit\n              ")])],1)],1)],1)],1)],1)],1)],1)},u=[],d=(n("c5f6"),n("5df2"),n("6b54"),n("59bd")),p={name:"App",components:{"v-audio":d["a"]},data:function(){return{task_type:2,step:1,items:[{audio_step:!1,class_step:!1,bet_step:!1,confidence:50,file:"https://drive.google.com/uc?export=download&id=1NEmYdc_P49JfULEEk1lbMJaQTxNLoYzc",question:"kangaroo",classification:null}]}},methods:{submit:function(){console.log("{{ name }}");var e=[];for(var t in this.items)e.append({file:t.file,question:t.question,classification:t.classification,confidence:t.confidence});var n=new FormData;n.append("user-input",JSON.stringify(e))}},filters:{dollars:function(e){return e||(e=0),e=Number.parseFloat(e).toFixed(2).toString(),"$"+e}}},f=p,v=n("2877"),b=n("6544"),m=n.n(b),_=n("7496"),g=n("8336"),h=n("b0af"),y=n("99d9"),x=n("12b2"),w=n("a523"),V=n("ce7e"),j=n("0e8f"),k=n("4bd4"),P=n("a722"),O=n("67b6"),S=n("43a6"),C=n("ba0d"),N=n("9910"),T=n("f665"),$=n("1e6c"),q=Object(v["a"])(f,l,u,!1,null,null,null);q.options.__file="App.vue";var A=q.exports;m()(q,{VApp:_["a"],VBtn:g["a"],VCard:h["a"],VCardActions:y["a"],VCardText:y["b"],VCardTitle:x["a"],VContainer:w["a"],VDivider:V["a"],VFlex:j["a"],VForm:k["a"],VLayout:P["a"],VRadio:O["a"],VRadioGroup:S["a"],VSlider:C["a"],VSpacer:N["a"],VWindow:T["a"],VWindowItem:$["a"]}),i["a"].config.productionTip=!1,new i["a"]({render:function(e){return e(A)}}).$mount("#app")}});
//# sourceMappingURL=app.39c2d3d7.js.map