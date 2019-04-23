(function(t){function e(e){for(var i,o,r=e[0],l=e[1],c=e[2],u=0,v=[];u<r.length;u++)o=r[u],n[o]&&v.push(n[o][0]),n[o]=0;for(i in l)Object.prototype.hasOwnProperty.call(l,i)&&(t[i]=l[i]);d&&d(e);while(v.length)v.shift()();return s.push.apply(s,c||[]),a()}function a(){for(var t,e=0;e<s.length;e++){for(var a=s[e],i=!0,r=1;r<a.length;r++){var l=a[r];0!==n[l]&&(i=!1)}i&&(s.splice(e--,1),t=o(o.s=a[0]))}return t}var i={},n={app:0},s=[];function o(e){if(i[e])return i[e].exports;var a=i[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=t,o.c=i,o.d=function(t,e,a){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)o.d(a,i,function(e){return t[e]}.bind(null,i));return a},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],l=r.push.bind(r);r.push=e,r=r.slice();for(var c=0;c<r.length;c++)e(r[c]);var d=l;s.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"034f":function(t,e,a){"use strict";var i=a("1356"),n=a.n(i);n.a},"0560":function(t,e,a){"use strict";var i=a("dd1a"),n=a.n(i);n.a},"0729":function(t,e,a){"use strict";var i=a("f54e"),n=a.n(i);n.a},1356:function(t,e,a){},2047:function(t,e,a){"use strict";var i=a("7c09"),n=a.n(i);n.a},"4c1e":function(t,e,a){"use strict";var i=a("6ec1"),n=a.n(i);n.a},"56d7":function(t,e,a){"use strict";a.r(e);a("cadf"),a("551c"),a("f751"),a("097d");var i=a("2b0e"),n=a("d847"),s=a.n(n),o=a("795b"),r=a.n(o),l=a("bc3a"),c=a.n(l),d={},u=c.a.create(d);u.interceptors.request.use(function(t){return t},function(t){return r.a.reject(t)}),u.interceptors.response.use(function(t){return t},function(t){return r.a.reject(t)}),Plugin.install=function(t,e){t.axios=u,window.axios=u,s()(t.prototype,{axios:{get:function(){return u}},$axios:{get:function(){return u}}})},i["a"].use(Plugin);Plugin;var v=a("bb71");a("da64");i["a"].use(v["a"],{iconfont:"md"});var p=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",[a("v-container",[a("v-layout",{attrs:{"justify-center":"","align-center":"","fill-height":""}},[a("v-flex",[t.items.length?a("v-card",{attrs:{color:t.is_practice?"yellow lighten-5":"deep-purple lighten-5"}},[a("v-tooltip",{attrs:{left:""},scopedSlots:t._u([{key:"activator",fn:function(e){var i=e.on;return[a("v-btn",t._g({staticStyle:{position:"absolute",right:"0",top:"0","z-index":"100"},attrs:{flat:"",icon:"",color:"grey",large:""},on:{click:function(e){t.instructions_dialog=!0}}},i),[t._v("?")])]}}],null,!1,2002696190),model:{value:t.instructions_tooltip,callback:function(e){t.instructions_tooltip=e},expression:"instructions_tooltip"}},[a("span",[t._v("Instructions")])]),a("v-card-title",{attrs:{"primary-title":""}},[a("v-layout",{attrs:{column:"","align-center":""}},[a("h3",{staticClass:"headline"},[t._v("\n                Audio Classification "+t._s(t.is_practice?" (Practice)":null)+"\n              ")]),a("span",{staticClass:"subheading"},[t._v("Click Play to begin")])])],1),a("v-window",{model:{value:t.step,callback:function(e){t.step=e},expression:"step"}},t._l(t.items,function(e,i){return a("v-window-item",{key:e.file,attrs:{value:i+1}},[a("v-container",{attrs:{"grid-list-lg":""}},[a("v-layout",{attrs:{column:""}},[a("v-flex",[a("v-audio",{attrs:{file:"assets/audio/"+(t.group?t.group+"/":null)+e.file,ended:function(){e.audio_step=!0}}},[a("v-btn",{staticClass:"teal--text",attrs:{outline:"",round:""},on:{click:function(e){t.audiosample_dialog=!0}}},[a("span",[t._v(t._s(e.label)+" only recording")])])],1)],1),a("v-flex",[a("v-card",[a("v-card-title",[a("span",[t._v("Is there a(n) "+t._s(e.label)+" present in the recording?")])]),a("v-divider"),a("v-card-actions",{directives:[{name:"show",rawName:"v-show",value:e.audio_step,expression:"item.audio_step"}]},[a("v-radio-group",{attrs:{row:""},on:{change:function(t){e.class_step=!0}},model:{value:e.classification,callback:function(a){t.$set(e,"classification",a)},expression:"item.classification"}},[a("v-radio",{attrs:{label:"Yes",value:!0}}),a("v-radio",{attrs:{label:"No",value:!1}})],1)],1)],1)],1),1==t.task_type?[a("v-flex",{directives:[{name:"show",rawName:"v-show",value:e.class_step,expression:"item.class_step"}]},[a("v-card",[a("v-card-title",[t._v("\n                          How confident are you with your answer?\n                        ")]),a("v-divider"),a("v-card-actions",[a("v-tooltip",{staticClass:"v-input",attrs:{bottom:""}},[a("span",[t._v("I am "+t._s(e.confidence)+"% confident in my answer that there is/is not a "+t._s(e.label)+" present in the recording.")]),a("v-slider",{attrs:{slot:"activator","thumb-label":"",step:10,color:e.bet_step?"":"grey"},on:{change:function(t){e.bet_step=!0}},slot:"activator",model:{value:e.confidence,callback:function(a){t.$set(e,"confidence",a)},expression:"item.confidence"}},[a("span",{attrs:{slot:"prepend"},slot:"prepend"},[t._v("0%")]),a("span",{attrs:{slot:"append"},slot:"append"},[t._v("100%")])])],1)],1)],1)],1)]:t._e(),2==t.task_type?[a("v-flex",{directives:[{name:"show",rawName:"v-show",value:e.class_step,expression:"item.class_step"}]},[a("v-card",[a("v-card-title",[a("span",[a("b",[t._v("You have the chance to win a dollar in one of the following ways (choose one):")]),a("br"),t._v("\n                            1) by lottery ("),a("flash",{model:{value:t.animate,callback:function(e){t.animate=e},expression:"animate"}},[t._v(t._s(e.confidence)+"%")]),t._v(" chance of winning), or"),a("br"),t._v("\n                            2) by correctly answering the question\n                          ")],1)]),a("v-divider"),a("v-card-actions",{staticClass:"layout justify-space-around row wrap"},[a("v-btn",{attrs:{color:"primary",disabled:e.bet_step},on:{click:function(a){return t.addChoice(e,!1)}}},[a("span",[a("flash",{model:{value:t.animate,callback:function(e){t.animate=e},expression:"animate"}},[t._v(t._s(e.confidence)+"%")]),t._v(" chance lottery")],1)]),a("v-btn",{attrs:{color:"primary",disabled:e.bet_step},on:{click:function(a){return t.addChoice(e,!0)}}},[a("span",[t._v("Correctly answering the question")])])],1)],1)],1)]:t._e()],2)],1)],1)}),1),a("v-card-actions",{staticClass:"center-text-xs"},[a("v-spacer"),a("v-btn",{attrs:{depressed:"",block:"",color:t.step!==t.items.length?"primary":"success",disabled:!t.items[t.step-1].bet_step},on:{click:function(e){return t.submitOne(t.items[t.step-1])}}},[t._v("\n              "+t._s(t.step!==t.items.length?"Next Recording":"Finish")+"\n            ")]),a("v-spacer")],1)],1):t._e(),a("v-flex",{attrs:{xs12:"","justify-center":""}},[a("v-card",{attrs:{flat:"",color:"transparent"}},[a("v-card-text",{staticClass:"text-xs-center"},[a("span",{staticClass:"grey--text"},[t._v(t._s(t.step)+"/"+t._s(t.items.length))])])],1)],1)],1),a("round-dialog",{attrs:{round_data:t.round_response,task_type:t.task_type,demo:t.is_practice},on:{submit:function(e){return t.round_toggle()},repeat:function(e){return t.newPractice()}},model:{value:t.round_dialog,callback:function(e){t.round_dialog=e},expression:"round_dialog"}}),a("instructions-dialog",{attrs:{consent_form:t.instructions_consent,instructions:1==t.task_type?t.instructions_type1:t.instructions_type2},on:{active_parent_change:function(e){return t.showTooltip()}},model:{value:t.instructions_dialog,callback:function(e){t.instructions_dialog=e},expression:"instructions_dialog"}}),a("submit-dialog",{attrs:{reward:t.total_wins,uuid:t.id},model:{value:t.submit_dialog,callback:function(e){t.submit_dialog=e},expression:"submit_dialog"}}),a("v-dialog",{attrs:{"max-width":"500"},model:{value:t.audiosample_dialog,callback:function(e){t.audiosample_dialog=e},expression:"audiosample_dialog"}},[t.audiosample_dialog?a("v-audio",{attrs:{minimal:"",file:"assets/audio/demo.wav"}}):t._e()],1),a("error-dialog",{attrs:{message:t.error_message},model:{value:t.error_dialog,callback:function(e){t.error_dialog=e},expression:"error_dialog"}})],1)],1)],1)},h=[],_=a("5176"),f=a.n(_),m=a("e814"),g=a.n(m),y=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",{staticStyle:{"text-align":"center"}},[a("v-card-text",[a("v-layout",{attrs:{row:"",wrap:"","align-baseline":"","justify-center":""}},[a("div",[a("v-btn",{staticClass:"teal--text",attrs:{outline:"",icon:"",disabled:!1===t.loaded},nativeOn:{click:function(e){t.playing?t.pause():t.play()}}},[!1===t.playing||!0===t.paused?a("v-icon",[t._v("play_arrow")]):a("v-icon",[t._v("pause")])],1),t.minimal?t._e():[a("v-btn",{staticClass:"teal--text",attrs:{outline:"",icon:"",disabled:!1===t.loaded},nativeOn:{click:function(e){return t.stop()}}},[a("v-icon",[t._v("stop")])],1),a("v-btn",{staticClass:"teal--text",attrs:{outline:"",icon:""},nativeOn:{click:function(e){t.loaded?t.download():t.reload()}}},[!1===t.loaded?a("v-icon",[t._v("refresh")]):a("v-icon",[t._v("get_app")])],1),t._t("default")]],2),a("v-slider",{style:{"flex-basis":t.minimal?0:"100%"},attrs:{readonly:"","thumb-color":"transparent","track-color":"grey lighten-3",dark:""},model:{value:t.percentage,callback:function(e){t.percentage=e},expression:"percentage"}}),a("p",{staticClass:"mx-2"},[t._v(t._s(t.currentTime)+" / "+t._s(t.duration))])],1)],1),a("audio",{ref:"player",attrs:{id:"player",src:t.file},on:{ended:t.ended,canplay:t.canPlay}})],1)},b=[],w=function(t){var e=new Date(1e3*t).toISOString().substr(11,8);return e},x={name:"vuetify-audio",props:{file:{type:String,default:null},autoPlay:{type:Boolean,default:!1},minimal:{type:Boolean,default:!1},ended:{type:Function,default:function(){}},canPlay:{type:Function,default:function(){}}},computed:{duration:function(){return this.audio?w(this.totalDuration):""}},data:function(){return{isMuted:!1,loaded:!1,playing:!1,paused:!1,percentage:0,currentTime:"00:00:00",audio:void 0,totalDuration:0}},methods:{setPosition:function(){this.audio.currentTime=g()(this.audio.duration/100*this.percentage)},stop:function(){this.paused=this.playing=!1,this.audio.pause(),this.audio.currentTime=0},play:function(){this.playing||(this.paused=!1,this.audio.play(),this.playing=!0)},pause:function(){this.paused=!this.paused,this.paused?this.audio.pause():this.audio.play()},download:function(){this.audio.pause(),window.open(this.file,"download")},mute:function(){this.isMuted=!this.isMuted,this.audio.muted=this.isMuted,this.volumeValue=this.isMuted?0:75},reload:function(){this.audio.load()},_handleLoaded:function(){if(!(this.audio.readyState>=2))throw new Error("Failed to load sound file");this.autoPlay&&this.audio.play(),this.loaded=!0,this.totalDuration=g()(this.audio.duration)},_handlePlayingUI:function(){this.percentage=this.audio.currentTime/this.audio.duration*100,this.currentTime=w(this.audio.currentTime)},_handlePlayPause:function(t){"pause"===t.type&&!1===this.paused&&!1===this.playing&&(this.currentTime="00:00:00")},_handleEnded:function(){this.paused=this.playing=!1},init:function(){this.audio.addEventListener("timeupdate",this._handlePlayingUI),this.audio.addEventListener("loadeddata",this._handleLoaded),this.audio.addEventListener("pause",this._handlePlayPause),this.audio.addEventListener("play",this._handlePlayPause),this.audio.addEventListener("ended",this._handleEnded)}},mounted:function(){this.audio=this.$refs.player,this.init()},beforeDestroy:function(){this.audio.removeEventListener("timeupdate",this._handlePlayingUI),this.audio.removeEventListener("loadeddata",this._handleLoaded),this.audio.removeEventListener("pause",this._handlePlayPause),this.audio.removeEventListener("play",this._handlePlayPause),this.audio.removeEventListener("ended",this._handleEnded)}},k=x,C=a("2877"),V=a("6544"),T=a.n(V),P=a("8336"),j=a("b0af"),I=a("99d9"),S=a("132d"),E=a("a722"),$=a("ba0d"),N=Object(C["a"])(k,y,b,!1,null,null,null),O=N.exports;T()(N,{VBtn:P["a"],VCard:j["a"],VCardText:I["b"],VIcon:S["a"],VLayout:E["a"],VSlider:$["a"]});var Y=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"highlight",class:{"flash-animation":t.value}},[t._t("default")],2)},q=[],M={name:"text-highlight",props:{value:Boolean},watch:{value:function(t){var e=this;t&&setTimeout(function(){e.$emit("input",!1)},1e3)}}},F=M,L=(a("2047"),Object(C["a"])(F,Y,q,!1,null,"18d49ef4",null)),A=L.exports,B=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-dialog",{attrs:{persistent:"",width:"600"},model:{value:t.active,callback:function(e){t.active=e},expression:"active"}},[a("v-card",{attrs:{color:"blue",dark:""}},[a("v-card-title",{staticClass:"headline"},[t._v("Instructions")]),a("v-window",{model:{value:t.step,callback:function(e){t.step=e},expression:"step"}},[a("v-window-item",{attrs:{value:0}},[a("iframe",{staticStyle:{width:"100%",height:"400px","background-color":"#fff"},attrs:{srcdoc:t.consent_form}})]),a("v-window-item",{attrs:{value:1}},[t._l(t.instructions,function(e){return a("v-card-text",{key:e,staticClass:"subheading",domProps:{innerHTML:t._s(e)}})}),a("v-card-actions",[a("v-btn",{attrs:{color:"light-green",block:"",large:""},on:{click:function(e){t.active=!1}}},[t._v("\n            Begin Practice Round\n          ")])],1)],2)],1),0==t.step?a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"primary",depressed:""},on:{click:function(e){t.step++}}},[t._v("\n      Agree & Continue\n      ")])],1):t._e()],1)],1)},D=[],R={name:"instructions-dialog",model:{prop:"active_parent",event:"active_parent_change"},props:{active_parent:Boolean,consent_form:String,instructions:Array},data:function(){return{active:this.active_parent,step:0,step_instr:0,step_authority:2}},watch:{active_parent:function(t){this.active=t},active:function(t){this.$emit("active_parent_change",t)}}},H=R,U=a("12b2"),z=a("169a"),W=a("9910"),J=a("f665"),G=a("1e6c"),Q=Object(C["a"])(H,B,D,!1,null,null,null),X=Q.exports;T()(Q,{VBtn:P["a"],VCard:j["a"],VCardActions:I["a"],VCardText:I["b"],VCardTitle:U["a"],VDialog:z["a"],VSpacer:W["a"],VWindow:J["a"],VWindowItem:G["a"]});var K=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-dialog",{attrs:{persistent:"",width:"500"},model:{value:t.active,callback:function(e){t.active=e},expression:"active"}},[a("v-card",{attrs:{color:"error",dark:""}},[a("v-card-title",{staticClass:"headline"},[t._v("Fatal Error")]),a("v-card-text",[a("p",[t._v("There was an error submitting information to the server:")]),a("v-card",{attrs:{color:"black"}},[a("v-card-title",{staticClass:"header",domProps:{innerHTML:t._s(t.message.data)}}),a("code",{staticClass:"large-code "},[t._v(t._s(t.message))]),a("v-card-text",[t._v("\n          Please refresh the browser. If the issue persists\n          contact the owner for assistance.\n        ")])],1)],1)],1)],1)},Z=[],tt={name:"error-dialog",model:{prop:"active_parent",event:"active_parent_change"},props:{active_parent:Boolean,message:Object},data:function(){return{active:this.active_parent}},watch:{active_parent:function(t){this.active=t},active:function(t){this.$emit("active_parent_change",t)}}},et=tt,at=(a("4c1e"),Object(C["a"])(et,K,Z,!1,null,null,null)),it=at.exports;T()(at,{VCard:j["a"],VCardText:I["b"],VCardTitle:U["a"],VDialog:z["a"]});var nt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-dialog",{attrs:{persistent:"",width:"500"},model:{value:t.active,callback:function(e){t.active=e},expression:"active"}},[a("v-card",{attrs:{dark:"",color:"blue"}},[a("v-card-title",{staticClass:"headline"},[t._v("Survey Code")]),a("v-card-text",[a("p",[t._v("Thank you for participating, your bonus is $"+t._s(t.reward)+".00")]),a("p",[t._v("Copy the code below to the MTurk assignment to get approved and paid.")]),a("v-text-field",{staticClass:"centered",attrs:{light:"",solo:"",readonly:"",value:t.uuid}})],1)],1)],1)},st=[],ot=(a("c5f6"),{name:"submit-dialog",model:{prop:"active_parent",event:"active_parent_change"},props:{active_parent:Boolean,uuid:String,reward:Number},data:function(){return{active:this.active_parent}},watch:{active_parent:function(t){this.active=t},active:function(t){this.$emit("active_parent_change",t)}}}),rt=ot,lt=(a("63c6"),a("2677")),ct=Object(C["a"])(rt,nt,st,!1,null,null,null),dt=ct.exports;T()(ct,{VCard:j["a"],VCardText:I["b"],VCardTitle:U["a"],VDialog:z["a"],VTextField:lt["a"]});var ut=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-dialog",{attrs:{persistent:"",width:"500"},model:{value:t.active,callback:function(e){t.active=e},expression:"active"}},[a("v-card",[a("v-card-title",{staticClass:"headline"},[t.demo?a("b",[t._v("Practice ")]):t._e(),t._v(" Round Results\n    ")]),t.round_data.pending?[a("v-card-text",{staticClass:"text-sm-center"},[a("v-progress-circular",{attrs:{color:"primary",indeterminate:"",size:64}})],1)]:[2==t.task_type?a("v-card-text",{staticClass:"subheading"},[a("span",[t._v("From the 5 answers given, answer "+t._s(t.round_data.chose+1)+" was selected. You have chosen to ")]),0==t.round_data.type?a("span",[t._v("draw a "+t._s(t.round_data.chance)+"% chance lottery. ")]):a("span",[t._v("test your answer. ")])]):t._e(),a("v-divider"),0==t.round_data.type?a("v-card-text",[a("v-layout",[a("v-flex",{attrs:{grow:"",xs10:"","offset-xs1":""}},[a("spinner",{staticClass:"elevation-10",attrs:{chance:t.round_data.chance,result:t.round_data.spin,activate:t.round_data.spinner_activate},on:{complete:function(e){t.round_data.complete=!0}}})],1)],1)],1):t._e(),a("v-divider"),a("v-card-actions",[a("v-spacer"),t.demo?a("v-btn",{attrs:{color:"primary",depressed:"",outline:""},on:{click:function(e){t.$emit("repeat"),t.round_dialog=!1}}},[t._v("\n          Try another\n        ")]):t._e(),a("v-btn",{attrs:{color:"primary",depressed:""},on:{click:function(e){t.$emit("submit"),t.active=!1}}},[t._v("\n          Next\n        ")])],1)]],2)],1)},vt=[],pt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("svg",{style:{background:t.secondary},attrs:{viewBox:"0 0 32 32"}},[a("circle",{staticClass:"pie",style:{"stroke-dasharray":t.chance+" 100",stroke:t.primary,fill:t.secondary},attrs:{r:"16",cx:"16",cy:"16"}}),a("circle",{staticClass:"pin",attrs:{r:"4",cx:"16",cy:"16"}}),a("rect",{style:{transform:"rotate("+(360*t.current_spin-45)+"deg)"},attrs:{x:"16",y:"16",width:"4",height:"4"}})])},ht=[],_t={name:"spinner",props:{chance:{type:Number,required:!0},result:{type:Number,required:!0},activate:{type:Boolean},primary:{type:String,default:"#2196F3"},secondary:{type:String,default:"#ECEFF1"}},data:function(){return{current_spin:-8}},watch:{activate:function(){var t=this;this.current_spin=this.result,setTimeout(function(){t.$emit("complete")},4e3)}}},ft=_t,mt=(a("0729"),Object(C["a"])(ft,pt,ht,!1,null,"79359021",null)),gt=mt.exports,yt={name:"round-dialog",components:{spinner:gt},model:{prop:"active_parent",event:"active_parent_change"},props:{active_parent:Boolean,round_data:Object,task_type:Number,demo:Boolean},data:function(){return{active:this.active_parent}},watch:{active_parent:function(t){this.active=t},active:function(t){this.$emit("active_parent_change",t)}}},bt=yt,wt=(a("0560"),a("ce7e")),xt=a("0e8f"),kt=a("490a"),Ct=Object(C["a"])(bt,ut,vt,!1,null,null,null),Vt=Ct.exports;T()(Ct,{VBtn:P["a"],VCard:j["a"],VCardActions:I["a"],VCardText:I["b"],VCardTitle:U["a"],VDialog:z["a"],VDivider:wt["a"],VFlex:xt["a"],VLayout:E["a"],VProgressCircular:kt["a"],VSpacer:W["a"]});var Tt='<h3 align="center" >Consent Form for IRB-FY2019-2872</h3>\n\n<p>You have been invited to take part in a research study to learn more about how to elicit the true confidence of participants when making sound annotations with the goal of increasing the quality of the annotations and, in consequence, the performance of machine learning models. This study will be conducted by Ana Elisa Mendez Mendez, STEINHARDT - Music and Audio Research Laboratory (MARL), Steinhardt School of Culture, Education, and Human Development, New York University, as a part of her independent study. Her faculty sponsor is Professor Oded Nov, Deparmtent of TANDON - Technology Management and Innovation (TMI), Tandon School of Engineering, New York University.</p>\n\n<p>If you agree to be in this study, you will be asked to do the following:</p>\n\n<ul>\n<li>Listen to 15 sound recordings.</li>\n<li>Determine whether a specific sound source is present in each of the recordings or not.</li>\n<li>Select how confident you are about each of your answers</li>\n</ul>\n\n<p>Participation in this study will involve 15 minutes of your time: 1 minute to label each recording. There are no known risks associated with your participation in this research beyond those of everyday life. </p>\n\n<p>Although you will receive no direct benefits, this research may help the investigator understand how to elicit the true confidence of participants when making sound annotations with the goal of increasing the quality of the annotations and, in consequence, the performance of machine learning models. You will receive $1 for participating in the study and a bonus payment based on performance for up to $1 for each answer for a maximum possible payment of $16.</p>\n\n<p>Confidentiality of your research records will be strictly maintained by not saving any personalized data on our database. Your information from this study will not be used for future research.</p>\n\n<p>Participation in this study is voluntary. You may refuse to participate or withdraw at any time without penalty. For interviews, questionnaires, or surveys, you have the right to skip or not answer any questions you prefer not to answer. </p>\n\n<p>If there is anything about the study or your participation that is unclear or that you do not understand, if you have questions or wish to report a research-related problem, you may contact Ana Elisa Mendez Mendez at (305) 904-5899, anaelisamendez@nyu.edu, 35 W 4th St, Room 245, New York, NY 10012, or the faculty sponsor, Oded Nov at (646) 997-3562, onov@nyu.edu, LC 401, 5 MetroTech Center, Brooklyn, NY 11201.</p>\n\n<p>For questions about your rights as a research participant, you may contact the University Committee on Activities Involving Human Subjects (UCAIHS), New York University, 665 Broadway, Suite 804, New York, New York, 10012, at ask.humansubjects@nyu.edu or (212) 998-4808. Please reference the study # (IRB-FY2019-2872) when contacting the IRB (UCAIHS).</p>',Pt=["\n  <p>In this task we want you to help us identify if there is a jackhammer present in audio recordings. You will be presented with 20 sound files for which you should answer two questions:</p>\n  <ol>\n    <li>Is there a jackhammer present in the recording?</li>\n    <li>State your confidence as a percent value.</li>\n  </ol>",'<p>For example:</p>\n  <div class="v-card v-sheet theme--light"><div class="v-card__title"><span>Is there a(n) jackhammer present in the recording?</span></div><hr class="v-divider theme--light"><div class="v-card__actions" style=""><div class="v-input v-input--selection-controls v-input--radio-group v-input--radio-group--row v-input--is-label-active v-input--is-dirty v-input--is-disabled theme--light"><div class="v-input__control"><div class="v-input__slot" style="height: auto;"><div role="radiogroup" class="v-input--radio-group__input"><div class="v-radio v-radio--is-disabled theme--light accent--text"><div class="v-input--selection-controls__input"><input aria-label="Yes" aria-checked="true" role="radio" type="radio" value="true" disabled="disabled"><div class="v-input--selection-controls__ripple accent--text"></div><i aria-hidden="true" class="v-icon material-icons theme--light accent--text">radio_button_checked</i></div><label aria-hidden="true" class="v-label theme--light" style="left: 0px; right: auto; position: relative;">Yes</label></div><div class="v-radio v-radio--is-disabled theme--light"><div class="v-input--selection-controls__input"><input aria-label="No" aria-checked="false" role="radio" type="radio" value="false" disabled="disabled"><div class="v-input--selection-controls__ripple"></div><i aria-hidden="true" class="v-icon material-icons theme--light">radio_button_unchecked</i></div><label aria-hidden="true" class="v-label theme--light" style="left: 0px; right: auto; position: relative;">No</label></div></div></div><div class="v-messages theme--light"><div class="v-messages__wrapper"></div></div></div></div></div></div>','<p>For question #2 you enter your confidence level as a percent value using a slider from 0-100 in 10 step intervals.</p>\n  <p>For example if I say I am 87% confident I might enter:</p>\n  <div class="v-card v-sheet theme--light"><div class="v-card__title">How confident are you with your answer?</div><hr class="v-divider theme--light"><div class="v-card__actions"><span class="v-tooltip v-input v-tooltip--bottom"><span><div class="v-input v-input--slider v-input--slider--thumb-label v-input--is-label-active v-input--is-dirty theme--light"><div class="v-input__prepend-outer"><span>0%</span></div><div class="v-input__control"><div class="v-input__slot"><div class="v-slider"><input role="slider" value="90" readonly="readonly" aria-readonly="false" aria-valuemin="0" aria-valuemax="100" aria-valuenow="90"><div class="v-slider__track__container"><div class="v-slider__track" style="left: 0px; right: auto; width: 100%;"></div><div class="v-slider__track-fill grey" style="left: 0px; right: auto; width: 90%;"></div></div><div class="v-slider__thumb-container v-slider__thumb-container--show-label grey--text" style="left: 90%;"><div class="v-slider__thumb grey"></div><div class="v-slider__thumb-label__container"><div class="v-slider__thumb-label grey" style="height: 32px; width: 32px;"><span>90</span></div></div></div></div></div><div class="v-messages theme--light"><div class="v-messages__wrapper"></div></div></div><div class="v-input__append-outer"><span>100%</span></div></div></span></span></div></div>',"<p>At the end of each question you may win a dollar based on whether or not your answer is correct.</p>\n  <p>You will play for the chance of winning up to $20 in bonus, $1 per recording.</p>"],jt=["\n  <p>In this task we want you to help us identify if there is a jackhammer present in audio recordings. You will be presented with 20 sound files for which you should answer two questions:</p>\n  <ol>\n    <li>Is there a jackhammer present in the recording?</li>\n    <li>You have the chance to win a dollar in one of the following ways (choose one): 1) by correctly answering the question, or 2) by lottery (X% chance of winning).</li>\n  </ol>",'<p>For example:</p>\n  <div class="v-card v-sheet theme--light"><div class="v-card__title"><span>Is there a(n) jackhammer present in the recording?</span></div><hr class="v-divider theme--light"><div class="v-card__actions" style=""><div class="v-input v-input--selection-controls v-input--radio-group v-input--radio-group--row v-input--is-label-active v-input--is-dirty v-input--is-disabled theme--light"><div class="v-input__control"><div class="v-input__slot" style="height: auto;"><div role="radiogroup" class="v-input--radio-group__input"><div class="v-radio v-radio--is-disabled theme--light accent--text"><div class="v-input--selection-controls__input"><input aria-label="Yes" aria-checked="true" role="radio" type="radio" value="true" disabled="disabled"><div class="v-input--selection-controls__ripple accent--text"></div><i aria-hidden="true" class="v-icon material-icons theme--light accent--text">radio_button_checked</i></div><label aria-hidden="true" class="v-label theme--light" style="left: 0px; right: auto; position: relative;">Yes</label></div><div class="v-radio v-radio--is-disabled theme--light"><div class="v-input--selection-controls__input"><input aria-label="No" aria-checked="false" role="radio" type="radio" value="false" disabled="disabled"><div class="v-input--selection-controls__ripple"></div><i aria-hidden="true" class="v-icon material-icons theme--light">radio_button_unchecked</i></div><label aria-hidden="true" class="v-label theme--light" style="left: 0px; right: auto; position: relative;">No</label></div></div></div><div class="v-messages theme--light"><div class="v-messages__wrapper"></div></div></div></div></div></div>',"<p>Question #2 will be asked 5 times for each recording, progressively varying the chances of winning the lottery from 50% to 90%. Each of these options will happen only once. After the fifth round has been played, the round for payment will be chosen at random. </p>",'<p>You must answer these questions based on the confidence of your answer.</p>\n  <p>For example you choose:</p>\n  <div class="v-card v-sheet theme--light"><div class="v-card__actions layout justify-space-around row wrap"><button type="button" class="theme--light v-btn v-btn--disabled  v-btn--flat"><div class="v-btn__content">50% chance lottery</span></div></button><button type="button" class="theme--light v-btn v-btn--disabled v-btn--outline"><div class="v-btn__content"><span>Correctly answering the question</span></div></button></div></div>','<p>The chance for a win in a lottery now has risen by 10%. Would we take the better lottery option or stick with our answer?</p>\n  <div class="v-card v-sheet theme--light"><div class="v-card__actions layout justify-space-around row wrap"><button type="button" class="theme--light v-btn v-btn--disabled  v-btn--flat"><div class="v-btn__content">60% chance lottery</span></div></button><button type="button" class="theme--light v-btn v-btn--disabled v-btn--outline"><div class="v-btn__content"><span>Correctly answering the question</span></div></button></div></div>','<p>Now the odds have gotten to the point where we would rather take our chances with the lottery for the remaining rounds.</p>\n  <div style="margin-top:16px;" class="v-card v-sheet theme--light"><div class="v-card__actions layout justify-space-around row wrap"><button type="button" class="theme--light v-btn v-btn--disabled v-btn--outline"><div class="v-btn__content">70% chance lottery</span></div></button><button type="button" class="theme--light v-btn v-btn--disabled v-btn--flat"><div class="v-btn__content"><span>Correctly answering the question</span></div></button></div></div>\n  <div style="margin-top:16px;" class="v-card v-sheet theme--light"><div class="v-card__actions layout justify-space-around row wrap"><button type="button" class="theme--light v-btn v-btn--disabled v-btn--outline"><div class="v-btn__content">80% chance lottery</span></div></button><button type="button" class="theme--light v-btn v-btn--disabled v-btn--flat"><div class="v-btn__content"><span>Correctly answering the question</span></div></button></div></div>\n  <div style="margin-top:16px;" class="v-card v-sheet theme--light"><div class="v-card__actions layout justify-space-around row wrap"><button type="button" class="theme--light v-btn v-btn--disabled v-btn--outline"><div class="v-btn__content">90% chance lottery</span></div></button><button type="button" class="theme--light v-btn v-btn--disabled v-btn--flat"><div class="v-btn__content"><span>Correctly answering the question</span></div></button></div></div>',"<p>The round for payment will be selected at random from rounds 1-5, let&rsquo;s say round 2 was selected (the one where your answer was chosen). If your answer was correct, you would have won a dollar, if you answer was incorrect, you would not have won.</p>\n  <p>If on the other hand, round 4 was selected, there was an 80% chance of winning a dollar and 20% chance of getting nothing. If we run the lottery and you win, you get one dollar.</p>\n  <p>You will play for the chance of winning up to $20 in bonus, $1 per recording.</p>"],It={name:"App",components:{"v-audio":O,flash:A,"instructions-dialog":X,"error-dialog":it,"submit-dialog":dt,"round-dialog":Vt},data:function(){return{id:"05cdbc17-fc15-4e48-a29f-756029933bc5",practice:!0,submit_dialog:!1,round_dialog:!1,audiosample_dialog:!1,instructions_dialog:!0,instructions_consent:Tt,instructions_type1:Pt,instructions_type2:jt,instructions_tooltip:!1,error_dialog:!1,error_message:{data:"Cause unknown."},round_response:{spinner_activate:!1,chose:0,type:1,won:1,spin:.574,chance:70,pending:!1,complete:!1},total_wins:0,task_type:1,step:1,group:null,items:[{file:"demo.wav",label:"jackhammer",audio_step:!1,class_step:!1,bet_step:!1,confidence:50,classification:null,choices:[]}],animate:!1}},computed:{is_practice:function(){return 1==this.step}},methods:{showTooltip:function(){var t=this;this.instructions_tooltip=!0,setTimeout(function(){t.instructions_tooltip=!1},3e3)},round_toggle:function(){this.round_dialog||(this.items.length==this.step?this.submit_dialog=!0:this.step++)},handleError:function(t){this.error_message=t.response,this.error_dialog=!0,this.submit_dialog=this.round_dialog=!1},addChoice:function(t,e){t.choices.push(e),t.confidence+=10,t.bet_step=100==t.confidence,this.animate=!0},submitOne:function(t){var e=this,a={id:this.id,practice:this.is_practice,item:t};this.round_response.complete=!1,this.round_response.pending=!0,this.round_dialog=!0,this.$axios.post("/post/one",a).then(function(t){for(var a in t.data)t.data.hasOwnProperty(a)&&(e.round_response[a]=t.data[a]);e.round_response.won&&e.total_wins++,e.round_response.pending=!1,setTimeout(function(){e.round_response.spinner_activate=!e.round_response.spinner_activate},500)}).catch(function(t){e.handleError(t)})},newPractice:function(){0!=this.items.length&&(this.items[0]=this.items[1+Math.floor(Math.random()*(this.items.length-1))])}},created:function(){var t=window.surveydata;if(t){this.task_type=g()(t["task_type"],10),console.log("task: "+this.task_type),this.id=t["id"],this.group=t["group"];for(var e=0;e<t["items"].length;e++)t["items"][e]=f()(t["items"][e],{audio_step:!1,class_step:!1,bet_step:!1,confidence:50,classification:null,choices:[]});this.items=this.items.concat(t.items),this.newPractice()}else console.error("No data recieved from server! Demo only. ")}},St=It,Et=(a("034f"),a("7496")),$t=a("a523"),Nt=a("67b6"),Ot=a("43a6"),Yt=a("3a2f"),qt=Object(C["a"])(St,p,h,!1,null,null,null),Mt=qt.exports;T()(qt,{VApp:Et["a"],VBtn:P["a"],VCard:j["a"],VCardActions:I["a"],VCardText:I["b"],VCardTitle:U["a"],VContainer:$t["a"],VDialog:z["a"],VDivider:wt["a"],VFlex:xt["a"],VLayout:E["a"],VRadio:Nt["a"],VRadioGroup:Ot["a"],VSlider:$["a"],VSpacer:W["a"],VTooltip:Yt["a"],VWindow:J["a"],VWindowItem:G["a"]}),i["a"].config.productionTip=!1,new i["a"]({render:function(t){return t(Mt)}}).$mount("#app")},"63c6":function(t,e,a){"use strict";var i=a("708f"),n=a.n(i);n.a},"6ec1":function(t,e,a){},"708f":function(t,e,a){},"7c09":function(t,e,a){},dd1a:function(t,e,a){},f54e:function(t,e,a){}});
//# sourceMappingURL=app.ff640701.js.map