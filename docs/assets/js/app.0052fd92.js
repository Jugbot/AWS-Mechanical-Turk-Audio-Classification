(function(e){function t(t){for(var i,a,s=t[0],c=t[1],l=t[2],d=0,p=[];d<s.length;d++)a=s[d],o[a]&&p.push(o[a][0]),o[a]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(e[i]=c[i]);u&&u(t);while(p.length)p.shift()();return r.push.apply(r,l||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],i=!0,s=1;s<n.length;s++){var c=n[s];0!==o[c]&&(i=!1)}i&&(r.splice(t--,1),e=a(a.s=n[0]))}return e}var i={},o={app:0},r=[];function a(t){if(i[t])return i[t].exports;var n=i[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=i,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)a.d(n,i,function(t){return e[t]}.bind(null,i));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=t,s=s.slice();for(var l=0;l<s.length;l++)t(s[l]);var u=c;r.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("097d");var i=n("2b0e"),o=n("bc3a"),r=n.n(o),a={},s=r.a.create(a);s.interceptors.request.use(function(e){return e},function(e){return Promise.reject(e)}),s.interceptors.response.use(function(e){return e},function(e){return Promise.reject(e)}),Plugin.install=function(e,t){e.axios=s,window.axios=s,Object.defineProperties(e.prototype,{axios:{get:function(){return s}},$axios:{get:function(){return s}}})},i["a"].use(Plugin);Plugin;var c=n("bb71");n("da64");i["a"].use(c["a"],{iconfont:"md"});var l=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",[n("v-container",[n("v-layout",{attrs:{"justify-center":"","align-center":"","fill-height":""}},[n("v-flex",[n("v-form",[n("v-card",{attrs:{color:"deep-purple lighten-5"}},[n("v-card-title",{attrs:{"primary-title":""}},[n("v-layout",{attrs:{"justify-center":""}},[n("h3",{staticClass:"headline"},[e._v("\n                  Audio Classification\n                ")])])],1),n("v-window",{model:{value:e.step,callback:function(t){e.step=t},expression:"step"}},e._l(e.items,function(t,i){return n("v-window-item",{key:t.file,attrs:{value:i+1}},[n("v-card-text",[n("v-container",{attrs:{"grid-list-lg":""}},[n("v-layout",{attrs:{column:""}},[n("v-flex",[n("v-audio",{attrs:{file:t.file,ended:function(){t.audio_step=!0}}})],1),n("v-flex",{directives:[{name:"show",rawName:"v-show",value:t.audio_step,expression:"item.audio_step"}]},[n("v-card",[n("v-card-title",[n("span",[e._v("Does this contain a(n) "+e._s(t.question))])]),n("v-divider"),n("v-card-actions",[n("v-radio-group",{attrs:{row:""},on:{change:function(e){t.class_step=!0}},model:{value:t.classification,callback:function(n){e.$set(t,"classification",n)},expression:"item.classification"}},[n("v-radio",{attrs:{label:"Yes",value:!0}}),n("v-radio",{attrs:{label:"No",value:!1}})],1)],1)],1)],1),1==e.task_type?[n("v-flex",{directives:[{name:"show",rawName:"v-show",value:t.class_step,expression:"item.class_step"}]},[n("v-card",[n("v-card-title",[e._v("\n                              Confidence\n                            ")]),n("v-divider"),n("v-card-actions",[n("v-slider",{attrs:{"thumb-label":"",step:10,color:t.bet_step?"":"grey"},on:{change:function(e){t.bet_step=!0}},model:{value:t.confidence,callback:function(n){e.$set(t,"confidence",n)},expression:"item.confidence"}},[n("span",{attrs:{slot:"append"},slot:"append"},[e._v("\n                                  "+e._s(t.confidence)+"%\n                                ")])])],1)],1)],1)]:e._e(),2==e.task_type?[n("v-flex",{directives:[{name:"show",rawName:"v-show",value:t.class_step,expression:"item.class_step"}]},[n("v-card",[n("v-card-title",[e._v("\n                              Confidence\n                            ")]),n("v-card-text",[e._v("\n                              If you could win money using a lottery or\n                              the correctness of your answer,\n                              which would you chose?\n                            ")]),n("v-divider"),n("v-card-actions",[!t.bet_step||t.confidence<100?[n("v-spacer"),n("v-btn",{attrs:{color:"primary",disabled:t.bet_step},on:{click:function(e){t.bet_step=!0}}},[e._v("\n                                  "+e._s(t.confidence)+":"+e._s(100-t.confidence)+" lottery\n                                ")])]:e._e(),n("v-spacer"),t.bet_step&&100!=t.confidence?e._e():[n("v-btn",{attrs:{color:"primary",disabled:t.bet_step},on:{click:function(e){t.confidence+=10,t.bet_step=100==t.confidence}}},[e._v("\n                                  your answer\n                                ")]),n("v-spacer")]],2)],1)],1)]:e._e()],2)],1)],1)],1)}),1),n("v-card-actions",[n("v-btn",{attrs:{disabled:1===e.step,flat:""},on:{click:function(t){e.step--}}},[e._v("\n                Back\n              ")]),n("v-spacer"),e._v("\n              "+e._s(e.step)+"/"+e._s(e.items.length)+"\n              "),n("v-spacer"),e.step!==e.items.length?n("v-btn",{attrs:{color:"primary",depressed:"",disabled:!e.items[e.step-1].bet_step},on:{click:function(t){e.step++}}},[e._v("\n                Next\n              ")]):n("v-btn",{attrs:{color:"success",depressed:"",disabled:!e.items[e.step-1].bet_step},on:{click:function(t){e.submit()}}},[e._v("\n                Submit\n              ")])],1)],1)],1)],1)],1)],1)],1)},u=[],d=(n("c5f6"),n("5df2"),n("6b54"),n("59bd")),p={name:"App",components:{"v-audio":d["a"]},data:function(){return{task_type:2,step:1,items:[{audio_step:!1,class_step:!1,bet_step:!1,confidence:50,file:"https://drive.google.com/uc?export=download&id=1NEmYdc_P49JfULEEk1lbMJaQTxNLoYzc",question:"kangaroo",classification:null}]}},methods:{submit:function(){console.log(window.mturksession);var e=window.mturksession,t=[];for(var n in this.items)t.push({file:n.file,question:n.question,classification:n.classification,confidence:n.confidence});var i=new FormData;i.append("user-input",JSON.stringify(t)),i.append("assignmentId",JSON.stringify(e.assignment_id)),i.append("workerId",JSON.stringify(e.worker_id)),i.append("hitId",JSON.stringify(e.hit_id)),axios.post(e.amazon_host,i)}},filters:{dollars:function(e){return e||(e=0),e=Number.parseFloat(e).toFixed(2).toString(),"$"+e}}},f=p,v=n("2877"),b=n("6544"),_=n.n(b),m=n("7496"),h=n("8336"),y=n("b0af"),w=n("99d9"),g=n("12b2"),x=n("a523"),k=n("ce7e"),V=n("0e8f"),O=n("4bd4"),j=n("a722"),P=n("67b6"),S=n("43a6"),N=n("ba0d"),C=n("9910"),J=n("f665"),T=n("1e6c"),$=Object(v["a"])(f,l,u,!1,null,null,null);$.options.__file="App.vue";var q=$.exports;_()($,{VApp:m["a"],VBtn:h["a"],VCard:y["a"],VCardActions:w["a"],VCardText:w["b"],VCardTitle:g["a"],VContainer:x["a"],VDivider:k["a"],VFlex:V["a"],VForm:O["a"],VLayout:j["a"],VRadio:P["a"],VRadioGroup:S["a"],VSlider:N["a"],VSpacer:C["a"],VWindow:J["a"],VWindowItem:T["a"]}),i["a"].config.productionTip=!1,new i["a"]({render:function(e){return e(q)}}).$mount("#app")}});
//# sourceMappingURL=app.0052fd92.js.map