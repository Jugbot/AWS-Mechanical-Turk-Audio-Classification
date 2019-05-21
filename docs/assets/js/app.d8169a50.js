(function(t){function e(e){for(var a,s,r=e[0],c=e[1],l=e[2],u=0,h=[];u<r.length;u++)s=r[u],n[s]&&h.push(n[s][0]),n[s]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(t[a]=c[a]);d&&d(e);while(h.length)h.shift()();return o.push.apply(o,l||[]),i()}function i(){for(var t,e=0;e<o.length;e++){for(var i=o[e],a=!0,r=1;r<i.length;r++){var c=i[r];0!==n[c]&&(a=!1)}a&&(o.splice(e--,1),t=s(s.s=i[0]))}return t}var a={},n={app:0},o=[];function s(e){if(a[e])return a[e].exports;var i=a[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,s),i.l=!0,i.exports}s.m=t,s.c=a,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)s.d(i,a,function(e){return t[e]}.bind(null,a));return i},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],c=r.push.bind(r);r.push=e,r=r.slice();for(var l=0;l<r.length;l++)e(r[l]);var d=c;o.push([0,"chunk-vendors"]),i()})({0:function(t,e,i){t.exports=i("56d7")},"034f":function(t,e,i){"use strict";var a=i("1356"),n=i.n(a);n.a},"0560":function(t,e,i){"use strict";var a=i("dd1a"),n=i.n(a);n.a},"0e3f":function(t,e,i){},1356:function(t,e,i){},2047:function(t,e,i){"use strict";var a=i("7c09"),n=i.n(a);n.a},"4c1e":function(t,e,i){"use strict";var a=i("6ec1"),n=i.n(a);n.a},"56d7":function(t,e,i){"use strict";i.r(e);i("cadf"),i("551c"),i("f751"),i("097d");var a=i("2b0e"),n=i("d847"),o=i.n(n),s=i("795b"),r=i.n(s),c=i("bc3a"),l=i.n(c),d={},u=l.a.create(d);u.interceptors.request.use(function(t){return t},function(t){return r.a.reject(t)}),u.interceptors.response.use(function(t){return t},function(t){return r.a.reject(t)}),Plugin.install=function(t,e){t.axios=u,window.axios=u,o()(t.prototype,{axios:{get:function(){return u}},$axios:{get:function(){return u}}})},a["a"].use(Plugin);Plugin;var h=i("bb71");i("da64");a["a"].use(h["a"],{iconfont:"md"});var p=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-app",[i("v-container",[i("v-layout",{attrs:{"justify-center":"","align-center":"","fill-height":""}},[i("v-flex",[i("v-card",{attrs:{color:t.is_practice?"yellow lighten-5":"deep-purple lighten-5"}},[i("v-tooltip",{attrs:{left:""},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on;return[i("v-btn",t._g({staticStyle:{position:"absolute",right:"0",top:"0","z-index":"100"},attrs:{flat:"",icon:"",color:"grey",large:""},on:{click:function(e){t.instructions_dialog=!0}}},a),[t._v("?")])]}}]),model:{value:t.instructions_tooltip,callback:function(e){t.instructions_tooltip=e},expression:"instructions_tooltip"}},[i("span",[t._v("Instructions")])]),i("v-card-title",{attrs:{"primary-title":""}},[i("v-layout",{attrs:{column:"","align-center":""}},[i("h3",{staticClass:"headline"},[t._v("\n                Audio Classification "+t._s(t.is_practice?" (Practice)":null)+"\n              ")]),i("span",{staticClass:"subheading"},[t._v("Click Play to begin")])])],1),i("v-window",{model:{value:t.step,callback:function(e){t.step=e},expression:"step"}},t._l(t.current_items,function(e,a){return i("v-window-item",{key:a,attrs:{lazy:""}},[i("v-container",{attrs:{"grid-list-lg":""}},[i("v-layout",{attrs:{column:""}},[i("v-flex",[i("v-audio",{attrs:{file:"assets/audio/"+(t.group?t.group+"/":"")+e.file,ended:function(){e.audio_step=!0}}},[i("v-btn",{staticClass:"teal--text",attrs:{outline:"",round:""},on:{click:function(e){t.audiosample_dialog=!0}}},[i("span",[t._v("What does a "+t._s(e.label)+" sound like?")])])],1)],1),i("v-flex",[i("v-card",[i("v-card-title",[i("span",[t._v("Is there a(n) "+t._s(e.label)+" present in the recording?")])]),i("v-divider"),i("v-card-actions",{directives:[{name:"show",rawName:"v-show",value:e.audio_step||t.debug,expression:"item.audio_step || debug"}]},[i("v-radio-group",{attrs:{row:""},on:{change:function(t){e.class_step=!0}},model:{value:e.classification,callback:function(i){t.$set(e,"classification",i)},expression:"item.classification"}},[i("v-radio",{attrs:{label:"Yes",value:!0}}),i("v-radio",{attrs:{label:"No",value:!1}})],1)],1)],1)],1),1===t.task_type?[i("v-flex",{directives:[{name:"show",rawName:"v-show",value:e.class_step,expression:"item.class_step"}]},[i("v-card",[i("v-card-title",[t._v("\n                          How confident are you with your answer?\n                        ")]),i("v-divider"),i("v-card-actions",[i("v-tooltip",{staticClass:"v-input",attrs:{bottom:""}},[i("span",[t._v("I am "+t._s(e.confidence)+"% confident in my answer that there is "+t._s(e.classification?"":"not")+" a "+t._s(e.label)+" present in the recording.")]),i("v-slider",{attrs:{slot:"activator","thumb-label":"",step:10,color:e.bet_step?"":"grey"},on:{change:function(t){e.bet_step=!0}},slot:"activator",model:{value:e.confidence,callback:function(i){t.$set(e,"confidence",i)},expression:"item.confidence"}},[i("span",{attrs:{slot:"prepend"},slot:"prepend"},[t._v("0%")]),i("span",{attrs:{slot:"append"},slot:"append"},[t._v("100%")])])],1)],1)],1)],1)]:t._e(),2===t.task_type?[i("v-flex",{directives:[{name:"show",rawName:"v-show",value:e.class_step,expression:"item.class_step"}]},[i("v-card",[i("v-card-title",[i("span",[i("b",[t._v("You have the chance to win a dollar in one of the following ways (choose one):")]),i("br"),t._v("\n                            1) by lottery ("),i("flash",{model:{value:t.animate,callback:function(e){t.animate=e},expression:"animate"}},[t._v(t._s(e.confidence)+"%")]),t._v(" chance of winning), or"),i("br"),t._v("\n                            2) if my answer to the question about the presence of a "+t._s(e.label)+" is correct\n                          ")],1)]),i("v-divider"),i("v-card-actions",{staticClass:"layout justify-space-around row wrap"},[i("v-btn",{attrs:{color:"primary",disabled:e.bet_step},on:{click:function(i){return t.addChoice(e,!1)}}},[i("span",[i("flash",{model:{value:t.animate,callback:function(e){t.animate=e},expression:"animate"}},[t._v(t._s(e.confidence)+"%")]),t._v(" chance lottery")],1)]),i("v-btn",{attrs:{color:"primary",disabled:e.bet_step},on:{click:function(i){return t.addChoice(e,!0)}}},[i("span",[t._v("My answer to the question about the presence of a "+t._s(e.label))])])],1)],1)],1)]:t._e()],2)],1)],1)}),1),i("v-card-actions",{staticClass:"center-text-xs"},[i("v-spacer"),i("v-btn",{attrs:{depressed:"",block:"",color:t.is_final?"success":"primary",disabled:!t.current_items[t.step].bet_step},on:{click:function(e){return t.processRound(t.current_items[t.step])}}},[t._v("\n              "+t._s(t.is_final?"Finish":"Next Recording")+"\n            ")]),i("v-spacer")],1)],1),i("v-flex",{attrs:{xs12:"","justify-center":""}},[i("v-card",{attrs:{flat:"",color:"transparent"}},[i("v-card-text",{staticClass:"text-xs-center"},[i("span",{staticClass:"grey--text"},[t._v(t._s(t.is_practice?"~":t.current_round)+"/"+t._s(t.items.length))])])],1)],1)],1),i("round-dialog",{attrs:{item:t.current_items[t.step],task_type:t.task_type,round:t.current_round,demo:t.is_practice},on:{submit:function(e){return t.next_round()},repeat:function(e){return t.newPractice()}},model:{value:t.round_dialog,callback:function(e){t.round_dialog=e},expression:"round_dialog"}}),i("instructions-dialog",{attrs:{consent_form:t.instructions_consent,instructions:1==t.task_type?t.instructions_type1:t.instructions_type2},on:{active_parent_change:function(e){return t.showTooltip()}},model:{value:t.instructions_dialog,callback:function(e){t.instructions_dialog=e},expression:"instructions_dialog"}}),i("v-dialog",{attrs:{persistent:"",width:"500"},model:{value:t.submit_dialog,callback:function(e){t.submit_dialog=e},expression:"submit_dialog"}},[t.items.length?i("v-card",[i("v-card-title",[i("span",{staticClass:"heading"},[t._v("Round #"+t._s(t.submit_step+1))])]),i("v-window",{model:{value:t.submit_step,callback:function(e){t.submit_step=e},expression:"submit_step"}},[i("v-window-item",{attrs:{value:-1}},[i("v-card-text",[2==t.task_type?[i("p",[t._v("This is your computer clock, presenting the time down to the millisecond (1/1000th of a second).")]),i("p",[t._v("If the last two digits of the stopped clock are strictly less than the lottery winning chances you win the $1 bonus, and if they are more, then you win nothing.")]),i("p",[t._v("Now, try to stop the clock showing the current time to millisecond precision. Because of the human reaction time, it is not possible for you to control these last two digits of the millisecond clock. The purpose of this is to generate a random number, and match your probability of winning to the selected round chances. ")]),i("stopwatch"),i("p",[t._v("For questions in which you selected to test your choice to the question about the presence of a "+t._s(t.item.label)+", your win will depend on if your choice was correct.")])]:[i("p",[t._v("Now your answers will be tested. Whether you win or not depends on if your answer to the question about the presence of a "+t._s(t.item.label)+" is correct for that round.")])]],2)],1),t._l(t.items,function(e,a){return i("v-window-item",{key:e.file,attrs:{value:a}},[1==t.task_type||1==e.type?i("v-card-text",{staticClass:"text-xs-center"},[i("h1",[t._v("Answer Test")]),i("h3",[t._v("In round "+t._s(t.submit_step+1)+" your choice to the question about the presence of a "+t._s(e.label)+" was selected for testing.")]),e.won?i("span",[i("h3",[t._v("Your choice was correct")]),i("h1",{staticClass:"green--text"},[t._v("You won a dollar!")])]):i("span",[i("h3",[t._v("Your choice was incorrect")]),i("h1",{staticClass:"red--text"},[t._v("No dollar won :(")])])]):i("v-card-text",{staticClass:"text-xs-center"},[i("h1",[t._v("Lottery")]),i("h3",[t._v("In round "+t._s(t.submit_step+1)+" a(n) "),i("b",[t._v(t._s(e.chance))]),t._v("% lottery was selected. To determine if you win the bonus, we will let you stop the clock below. ")]),i("p",[t._v("The last two digits must be less than "),i("b",[t._v(t._s(e.chance))]),t._v(" for you to win.")]),i("stopwatch",{on:{stop:function(i){return t.setWon(i,e)}}}),-1!=e.won?[e.won?i("span",[i("h3",[t._v("You won the lottery")]),i("h1",{staticClass:"green--text"},[t._v("You won a dollar!")])]):i("span",[i("h3",[t._v("You lost the lottery")]),i("h1",{staticClass:"red--text"},[t._v("No dollar won :(")])])]:t._e()],2)],1)})],2),i("v-card-actions",{staticClass:"center-text-xs"},[i("v-spacer"),i("v-btn",{attrs:{depressed:"",block:"",color:t.is_final_submit?"success":"primary",disabled:t.submit_step>=0&&-1==t.items[t.submit_step].won},on:{click:function(e){return t.next_submit()}}},[t._v("\n              "+t._s(t.is_final_submit?"Finish":"Next")+"\n            ")]),i("v-spacer")],1)],1):t._e()],1),i("code-dialog",{attrs:{uuid:t.id,reward:t.wins},model:{value:t.code_dialog,callback:function(e){t.code_dialog=e},expression:"code_dialog"}}),i("v-dialog",{attrs:{"max-width":"500"},model:{value:t.audiosample_dialog,callback:function(e){t.audiosample_dialog=e},expression:"audiosample_dialog"}},[t.audiosample_dialog?i("v-audio",{attrs:{minimal:"",file:"assets/audio/demo.wav"}}):t._e()],1),i("error-dialog",{attrs:{message:t.error_message},model:{value:t.error_dialog,callback:function(e){t.error_dialog=e},expression:"error_dialog"}})],1)],1)],1)},v=[],_=i("e814"),f=i.n(_),m=i("5176"),b=i.n(m),y=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-card",{staticStyle:{"text-align":"center"}},[i("v-card-text",[i("v-layout",{attrs:{row:"",wrap:"","align-baseline":"","justify-center":""}},[i("div",[i("v-btn",{staticClass:"teal--text",attrs:{outline:"",icon:"",disabled:!1===t.loaded},nativeOn:{click:function(e){t.playing?t.pause():t.play()}}},[!1===t.playing||!0===t.paused?i("v-icon",[t._v("play_arrow")]):i("v-icon",[t._v("pause")])],1),t.minimal?t._e():[i("v-btn",{staticClass:"teal--text",attrs:{outline:"",icon:"",disabled:!1===t.loaded},nativeOn:{click:function(e){return t.stop()}}},[i("v-icon",[t._v("stop")])],1),i("v-btn",{staticClass:"teal--text",attrs:{outline:"",icon:""},nativeOn:{click:function(e){t.loaded?t.download():t.reload()}}},[!1===t.loaded?i("v-icon",[t._v("refresh")]):i("v-icon",[t._v("get_app")])],1),t._t("default")]],2),i("v-slider",{style:{"flex-basis":t.minimal?0:"100%"},attrs:{readonly:"","thumb-color":"transparent","track-color":"grey lighten-3",dark:""},model:{value:t.percentage,callback:function(e){t.percentage=e},expression:"percentage"}}),i("p",{staticClass:"mx-2"},[t._v(t._s(t.currentTime)+" / "+t._s(t.duration))])],1)],1),i("audio",{ref:"player",attrs:{id:"player",src:t.file},on:{ended:t.ended,canplay:t.canPlay}})],1)},g=[],w=function(t){var e=new Date(1e3*t).toISOString().substr(11,8);return e},k={name:"vuetify-audio",props:{file:{type:String,default:null},autoPlay:{type:Boolean,default:!1},minimal:{type:Boolean,default:!1},ended:{type:Function,default:function(){}},canPlay:{type:Function,default:function(){}}},computed:{duration:function(){return this.audio?w(this.totalDuration):""}},data:function(){return{isMuted:!1,loaded:!1,playing:!1,paused:!1,percentage:0,currentTime:"00:00:00",audio:void 0,totalDuration:0}},methods:{setPosition:function(){this.audio.currentTime=f()(this.audio.duration/100*this.percentage)},stop:function(){this.paused=this.playing=!1,this.audio.pause(),this.audio.currentTime=0},play:function(){this.playing||(this.paused=!1,this.audio.play(),this.playing=!0)},pause:function(){this.paused=!this.paused,this.paused?this.audio.pause():this.audio.play()},download:function(){this.audio.pause(),window.open(this.file,"download")},mute:function(){this.isMuted=!this.isMuted,this.audio.muted=this.isMuted,this.volumeValue=this.isMuted?0:75},reload:function(){this.audio.load()},_handleLoaded:function(){if(!(this.audio.readyState>=2))throw new Error("Failed to load sound file");this.autoPlay&&this.audio.play(),this.loaded=!0,this.totalDuration=f()(this.audio.duration)},_handlePlayingUI:function(){this.percentage=this.audio.currentTime/this.audio.duration*100,this.currentTime=w(this.audio.currentTime)},_handlePlayPause:function(t){"pause"===t.type&&!1===this.paused&&!1===this.playing&&(this.currentTime="00:00:00")},_handleEnded:function(){this.paused=this.playing=!1},init:function(){this.audio.addEventListener("timeupdate",this._handlePlayingUI),this.audio.addEventListener("loadeddata",this._handleLoaded),this.audio.addEventListener("pause",this._handlePlayPause),this.audio.addEventListener("play",this._handlePlayPause),this.audio.addEventListener("ended",this._handleEnded)}},mounted:function(){this.audio=this.$refs.player,this.init()},beforeDestroy:function(){this.audio.removeEventListener("timeupdate",this._handlePlayingUI),this.audio.removeEventListener("loadeddata",this._handleLoaded),this.audio.removeEventListener("pause",this._handlePlayPause),this.audio.removeEventListener("play",this._handlePlayPause),this.audio.removeEventListener("ended",this._handleEnded)}},x=k,C=i("2877"),V=i("6544"),T=i.n(V),j=i("8336"),I=i("b0af"),P=i("99d9"),$=i("132d"),Y=i("a722"),M=i("ba0d"),N=Object(C["a"])(x,y,g,!1,null,null,null),q=N.exports;T()(N,{VBtn:j["a"],VCard:I["a"],VCardText:P["b"],VIcon:$["a"],VLayout:Y["a"],VSlider:M["a"]});var E=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"highlight",class:{"flash-animation":t.value}},[t._t("default")],2)},S=[],O={name:"text-highlight",props:{value:Boolean},watch:{value:function(t){var e=this;t&&setTimeout(function(){e.$emit("input",!1)},1e3)}}},A=O,L=(i("2047"),Object(C["a"])(A,E,S,!1,null,"18d49ef4",null)),B=L.exports,F=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-dialog",{attrs:{persistent:"",width:"600"},model:{value:t.active,callback:function(e){t.active=e},expression:"active"}},[i("v-card",{attrs:{color:"blue",dark:""}},[i("v-card-title",{staticClass:"headline"},[t._v("Instructions")]),i("v-window",{model:{value:t.step,callback:function(e){t.step=e},expression:"step"}},[i("v-window-item",{attrs:{value:0}},[i("iframe",{staticStyle:{width:"100%",height:"400px","background-color":"#fff"},attrs:{srcdoc:t.consent_form}})]),i("v-window-item",{attrs:{value:1}},[t._l(t.instructions,function(e){return i("v-card-text",{key:e,staticClass:"subheading",domProps:{innerHTML:t._s(e)}})}),i("v-card-actions",[i("v-btn",{attrs:{color:"light-green",block:"",large:""},on:{click:function(e){t.active=!1}}},[t._v("\n            Begin Practice Round\n          ")])],1)],2)],1),0==t.step?i("v-card-actions",[i("v-spacer"),i("v-btn",{attrs:{color:"primary",depressed:""},on:{click:function(e){t.step++}}},[t._v("\n      Agree & Continue\n      ")])],1):t._e()],1)],1)},D=[],R={name:"instructions-dialog",model:{prop:"active_parent",event:"active_parent_change"},props:{active_parent:Boolean,consent_form:String,instructions:Array},data:function(){return{active:this.active_parent,step:0,step_instr:0,step_authority:2}},watch:{active_parent:function(t){this.active=t},active:function(t){this.$emit("active_parent_change",t)}}},H=R,W=i("12b2"),U=i("169a"),z=i("9910"),J=i("f665"),G=i("1e6c"),Q=Object(C["a"])(H,F,D,!1,null,null,null),X=Q.exports;T()(Q,{VBtn:j["a"],VCard:I["a"],VCardActions:P["a"],VCardText:P["b"],VCardTitle:W["a"],VDialog:U["a"],VSpacer:z["a"],VWindow:J["a"],VWindowItem:G["a"]});var K=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-dialog",{attrs:{persistent:"",width:"500"},model:{value:t.active,callback:function(e){t.active=e},expression:"active"}},[i("v-card",{attrs:{color:"error",dark:""}},[i("v-card-title",{staticClass:"headline"},[t._v("Fatal Error")]),i("v-card-text",[i("p",[t._v("There was an error submitting information to the server:")]),i("v-card",{attrs:{color:"black"}},[i("v-card-title",{staticClass:"header",domProps:{innerHTML:t._s(t.message.data)}}),i("code",{staticClass:"large-code "},[t._v(t._s(t.message))]),i("v-card-text",[t._v("\n          Please refresh the browser. If the issue persists\n          contact the owner for assistance.\n        ")])],1)],1)],1)],1)},Z=[],tt={name:"error-dialog",model:{prop:"active_parent",event:"active_parent_change"},props:{active_parent:Boolean,message:Object},data:function(){return{active:this.active_parent}},watch:{active_parent:function(t){this.active=t},active:function(t){this.$emit("active_parent_change",t)}}},et=tt,it=(i("4c1e"),Object(C["a"])(et,K,Z,!1,null,null,null)),at=it.exports;T()(it,{VCard:I["a"],VCardText:P["b"],VCardTitle:W["a"],VDialog:U["a"]});var nt=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-btn",{attrs:{outline:"",small:""},on:{click:function(e){return t.stop()}}},[t._v(t._s(t._f("time")(t.date)))])},ot=[],st=i("0a0d"),rt=i.n(st),ct={data:function(){return{date:0,interval:null,stopped:!1}},methods:{update:function(){this.date=rt()()},stop:function(){clearInterval(this.interval),this.$emit("stop",this.date%100)}},created:function(){this.interval=setInterval(this.update,10)},destroyed:function(){this.stop()},filters:{time:function(t){var e=t%1e3;e<10?e="00"+e:e<100&&(e="0"+e),t=Math.floor(t/1e3);var i=t%60;i<10&&(i="0"+i),t=Math.floor(t/60);var a=t%60;return a<10&&(a="0"+a),a+":"+i+":"+e}}},lt=ct,dt=Object(C["a"])(lt,nt,ot,!1,null,"2b302d35",null),ut=dt.exports;T()(dt,{VBtn:j["a"]});var ht=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-dialog",{attrs:{persistent:"",width:"500"},model:{value:t.active,callback:function(e){t.active=e},expression:"active"}},[i("v-card",{attrs:{dark:"",color:"blue"}},[i("v-card-title",{staticClass:"headline"},[t._v("Survey Code")]),i("v-card-text",[i("p",[t._v("Thank you for participating, your bonus is $"+t._s(t.reward)+".00")]),i("p",[t._v("Copy the code below to the MTurk assignment to get approved and paid.")]),i("v-text-field",{staticClass:"centered",attrs:{light:"",solo:"",readonly:"",value:t.uuid}})],1)],1)],1)},pt=[],vt=(i("c5f6"),{name:"submit-dialog",model:{prop:"active_parent",event:"active_parent_change"},props:{active_parent:Boolean,uuid:String,reward:Number},data:function(){return{active:this.active_parent}},watch:{active_parent:function(t){this.active=t},active:function(t){this.$emit("active_parent_change",t)}}}),_t=vt,ft=(i("d18f"),i("2677")),mt=Object(C["a"])(_t,ht,pt,!1,null,null,null),bt=mt.exports;T()(mt,{VCard:I["a"],VCardText:P["b"],VCardTitle:W["a"],VDialog:U["a"],VTextField:ft["a"]});var yt=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-dialog",{attrs:{persistent:"",width:"500"},model:{value:t.active,callback:function(e){t.active=e},expression:"active"}},[i("v-card",[i("v-card-title",{staticClass:"headline"},[t.demo?i("b",[t._v("Practice ")]):t._e(),t._v(" Round Results\n    ")]),[i("v-card-text",{staticClass:"subheading"},[i("p",[t._v("You just completed round "+t._s(t.round)+". ")]),2==t.task_type?[i("span",[t._v("You made 5 different choices between playing the lottery or your choice to the question about the presence of a "+t._s(t.item.label)+". From the 5 answers you selected in this round, we will randomly select one to be tested for payment. In this round, answer "+t._s(t.item.chose+1)+" was randomly selected. ")]),0==t.item.type?i("span",[t._v("You will draw a "+t._s(t.item.chance)+"% chance lottery after round 20. ")]):i("span",[t._v("Your choice to the question about the presence of a "+t._s(t.item.label)+" will be tested after round 20.")])]:t._e(),1==t.task_type?[i("span",[t._v("Your choice to the question about the presence of a "+t._s(t.item.label)+" will be tested after round 20.")])]:t._e()],2),i("v-divider"),i("v-card-actions",[i("v-spacer"),t.demo?i("v-btn",{attrs:{color:"primary",depressed:"",outline:""},on:{click:function(e){t.$emit("repeat"),t.active=!1}}},[t._v("\n          Try another\n        ")]):t._e(),i("v-btn",{attrs:{color:"primary",depressed:""},on:{click:function(e){t.$emit("submit"),t.active=!1}}},[t._v("\n          "+t._s(t.demo?"Begin Task":"Next")+"\n        ")])],1)]],2)],1)},gt=[],wt={model:{prop:"active_parent",event:"active_parent_change"},props:{active_parent:Boolean,item:Object,task_type:Number,round:Number,demo:Boolean},data:function(){return{active:this.active_parent}},watch:{active_parent:function(t){this.active=t},active:function(t){this.$emit("active_parent_change",t)}}},kt=wt,xt=(i("0560"),i("ce7e")),Ct=Object(C["a"])(kt,yt,gt,!1,null,null,null),Vt=Ct.exports;T()(Ct,{VBtn:j["a"],VCard:I["a"],VCardActions:P["a"],VCardText:P["b"],VCardTitle:W["a"],VDialog:U["a"],VDivider:xt["a"],VSpacer:z["a"]});var Tt='<h3 align="center" >Consent Form for IRB-FY2019-2872</h3>\n\n<p>You have been invited to take part in a research study to learn more about how to elicit the true confidence of participants when making sound annotations with the goal of increasing the quality of the annotations and, in consequence, the performance of machine learning models. This study will be conducted by Ana Elisa Mendez Mendez, STEINHARDT - Music and Audio Research Laboratory (MARL), Steinhardt School of Culture, Education, and Human Development, New York University, as a part of her independent study. Her faculty sponsor is Professor Oded Nov, Deparmtent of TANDON - Technology Management and Innovation (TMI), Tandon School of Engineering, New York University.</p>\n\n<p>If you agree to be in this study, you will be asked to do the following:</p>\n\n<ul>\n<li>Listen to 15 sound recordings.</li>\n<li>Determine whether a specific sound source is present in each of the recordings or not.</li>\n<li>Select how confident you are about each of your answers</li>\n</ul>\n\n<p>Participation in this study will involve 15 minutes of your time: 1 minute to label each recording. There are no known risks associated with your participation in this research beyond those of everyday life. </p>\n\n<p>Although you will receive no direct benefits, this research may help the investigator understand how to elicit the true confidence of participants when making sound annotations with the goal of increasing the quality of the annotations and, in consequence, the performance of machine learning models. You will receive $1 for participating in the study and a bonus payment based on performance for up to $1 for each answer for a maximum possible payment of $16.</p>\n\n<p>Confidentiality of your research records will be strictly maintained by not saving any personalized data on our database. Your information from this study will not be used for future research.</p>\n\n<p>Participation in this study is voluntary. You may refuse to participate or withdraw at any time without penalty. For interviews, questionnaires, or surveys, you have the right to skip or not answer any questions you prefer not to answer. </p>\n\n<p>If there is anything about the study or your participation that is unclear or that you do not understand, if you have questions or wish to report a research-related problem, you may contact Ana Elisa Mendez Mendez at (305) 904-5899, anaelisamendez@nyu.edu, 35 W 4th St, Room 245, New York, NY 10012, or the faculty sponsor, Oded Nov at (646) 997-3562, onov@nyu.edu, LC 401, 5 MetroTech Center, Brooklyn, NY 11201.</p>\n\n<p>For questions about your rights as a research participant, you may contact the University Committee on Activities Involving Human Subjects (UCAIHS), New York University, 665 Broadway, Suite 804, New York, New York, 10012, at ask.humansubjects@nyu.edu or (212) 998-4808. Please reference the study # (IRB-FY2019-2872) when contacting the IRB (UCAIHS).</p>',jt=["\n  <p>In this task we want you to help us identify if there is a jackhammer present in audio recordings. You will be presented with 20 sound files for which you should answer two questions:</p>\n  <ol>\n    <li>Is there a jackhammer present in the recording?</li>\n    <li>How confident are you with your answer?</li>\n  </ol>",'<p>For example:</p>\n  <div class="v-card v-sheet theme--light"><div class="v-card__title"><span>Is there a(n) jackhammer present in the recording?</span></div><hr class="v-divider theme--light"><div class="v-card__actions" style=""><div class="v-input v-input--selection-controls v-input--radio-group v-input--radio-group--row v-input--is-label-active v-input--is-dirty v-input--is-disabled theme--light"><div class="v-input__control"><div class="v-input__slot" style="height: auto;"><div role="radiogroup" class="v-input--radio-group__input"><div class="v-radio v-radio--is-disabled theme--light accent--text"><div class="v-input--selection-controls__input"><input aria-label="Yes" aria-checked="true" role="radio" type="radio" value="true" disabled="disabled"><div class="v-input--selection-controls__ripple accent--text"></div><i aria-hidden="true" class="v-icon material-icons theme--light accent--text">radio_button_checked</i></div><label aria-hidden="true" class="v-label theme--light" style="left: 0px; right: auto; position: relative;">Yes</label></div><div class="v-radio v-radio--is-disabled theme--light"><div class="v-input--selection-controls__input"><input aria-label="No" aria-checked="false" role="radio" type="radio" value="false" disabled="disabled"><div class="v-input--selection-controls__ripple"></div><i aria-hidden="true" class="v-icon material-icons theme--light">radio_button_unchecked</i></div><label aria-hidden="true" class="v-label theme--light" style="left: 0px; right: auto; position: relative;">No</label></div></div></div><div class="v-messages theme--light"><div class="v-messages__wrapper"></div></div></div></div></div></div>','<p>For question #2 you should answer the question <b>How confident are you with your answer?</b> as a percent value using a slider from 0-100 in 10 step intervals.</p>\n  <p>For example if I say I am 87% confident I might enter:</p>\n  <div class="v-card v-sheet theme--light"><div class="v-card__title">How confident are you with your answer?</div><hr class="v-divider theme--light"><div class="v-card__actions"><span class="v-tooltip v-input v-tooltip--bottom"><span><div class="v-input v-input--slider v-input--slider--thumb-label v-input--is-label-active v-input--is-dirty theme--light"><div class="v-input__prepend-outer"><span>0%</span></div><div class="v-input__control"><div class="v-input__slot"><div class="v-slider"><input role="slider" value="90" readonly="readonly" aria-readonly="false" aria-valuemin="0" aria-valuemax="100" aria-valuenow="90"><div class="v-slider__track__container"><div class="v-slider__track" style="left: 0px; right: auto; width: 100%;"></div><div class="v-slider__track-fill grey" style="left: 0px; right: auto; width: 90%;"></div></div><div class="v-slider__thumb-container v-slider__thumb-container--show-label grey--text" style="left: 90%;"><div class="v-slider__thumb grey"></div><div class="v-slider__thumb-label__container"><div class="v-slider__thumb-label grey" style="height: 32px; width: 32px;"><span>90</span></div></div></div></div></div><div class="v-messages theme--light"><div class="v-messages__wrapper"></div></div></div><div class="v-input__append-outer"><span>100%</span></div></div></span></span></div></div>',"<p>At the end of each question you may win a dollar based on whether or not your choice to the question about the presence of a jackhammer is correct or not.</p>\n  <p>You will play for the chance of winning up to $20 in bonus, $1 per recording.</p>"],It=["\n  <p>In this task we want you to help us identify if there is a jackhammer present in audio recordings. You will be presented with 20 sound files for which you should answer two questions:</p>\n  <ol>\n    <li>Is there a jackhammer present in the recording?</li>\n    <li>You have the chance to win a dollar in one of the following ways (choose one): 1) by lottery (X% chance of winning), or 2) if my answer to the question about the presence of a jackhammer is correct.</li>\n  </ol>",'<p>For example:</p>\n  <div class="v-card v-sheet theme--light"><div class="v-card__title"><span>Is there a(n) jackhammer present in the recording?</span></div><hr class="v-divider theme--light"><div class="v-card__actions" style=""><div class="v-input v-input--selection-controls v-input--radio-group v-input--radio-group--row v-input--is-label-active v-input--is-dirty v-input--is-disabled theme--light"><div class="v-input__control"><div class="v-input__slot" style="height: auto;"><div role="radiogroup" class="v-input--radio-group__input"><div class="v-radio v-radio--is-disabled theme--light accent--text"><div class="v-input--selection-controls__input"><input aria-label="Yes" aria-checked="true" role="radio" type="radio" value="true" disabled="disabled"><div class="v-input--selection-controls__ripple accent--text"></div><i aria-hidden="true" class="v-icon material-icons theme--light accent--text">radio_button_checked</i></div><label aria-hidden="true" class="v-label theme--light" style="left: 0px; right: auto; position: relative;">Yes</label></div><div class="v-radio v-radio--is-disabled theme--light"><div class="v-input--selection-controls__input"><input aria-label="No" aria-checked="false" role="radio" type="radio" value="false" disabled="disabled"><div class="v-input--selection-controls__ripple"></div><i aria-hidden="true" class="v-icon material-icons theme--light">radio_button_unchecked</i></div><label aria-hidden="true" class="v-label theme--light" style="left: 0px; right: auto; position: relative;">No</label></div></div></div><div class="v-messages theme--light"><div class="v-messages__wrapper"></div></div></div></div></div></div>',"<p>Question #2 will be asked 5 times for each recording, progressively varying the chances of winning the lottery from 50% to 90%. Each of these options will happen only once. After the fifth round has been played, the round for payment will be chosen at random. </p>",'<p>You must answer these questions based on the confidence of your answer.</p>\n  <p>For example you choose:</p>\n  <div class="v-card v-sheet theme--light"><div class="v-card__actions layout justify-space-around row wrap"><button type="button" class="theme--light v-btn v-btn--disabled  v-btn--flat"><div class="v-btn__content">50% chance lottery</span></div></button><button type="button" class="theme--light v-btn v-btn--disabled v-btn--outline"><div class="v-btn__content"><span>My answer to the question about the presence of a jackhammer</span></div></button></div></div>','<p>The chance for a win in a lottery now has risen by 10%. Would we take the better lottery option or stick with our answer?</p>\n  <div class="v-card v-sheet theme--light"><div class="v-card__actions layout justify-space-around row wrap"><button type="button" class="theme--light v-btn v-btn--disabled  v-btn--flat"><div class="v-btn__content">60% chance lottery</span></div></button><button type="button" class="theme--light v-btn v-btn--disabled v-btn--outline"><div class="v-btn__content"><span>My answer to the question about the presence of a jackhammer</span></div></button></div></div>','<p>Now the odds have gotten to the point where we would rather take our chances with the lottery for the remaining rounds.</p>\n  <div style="margin-top:16px;" class="v-card v-sheet theme--light"><div class="v-card__actions layout justify-space-around row wrap"><button type="button" class="theme--light v-btn v-btn--disabled v-btn--outline"><div class="v-btn__content">70% chance lottery</span></div></button><button type="button" class="theme--light v-btn v-btn--disabled v-btn--flat"><div class="v-btn__content"><span>My answer to the question about the presence of a jackhammer</span></div></button></div></div>\n  <div style="margin-top:16px;" class="v-card v-sheet theme--light"><div class="v-card__actions layout justify-space-around row wrap"><button type="button" class="theme--light v-btn v-btn--disabled v-btn--outline"><div class="v-btn__content">80% chance lottery</span></div></button><button type="button" class="theme--light v-btn v-btn--disabled v-btn--flat"><div class="v-btn__content"><span>My answer to the question about the presence of a jackhammer</span></div></button></div></div>\n  <div style="margin-top:16px;" class="v-card v-sheet theme--light"><div class="v-card__actions layout justify-space-around row wrap"><button type="button" class="theme--light v-btn v-btn--disabled v-btn--outline"><div class="v-btn__content">90% chance lottery</span></div></button><button type="button" class="theme--light v-btn v-btn--disabled v-btn--flat"><div class="v-btn__content"><span>My answer to the question about the presence of a jackhammer</span></div></button></div></div>',"<p>The round for payment will be selected at random from rounds 1-5, let&rsquo;s say round 2 was selected (the one where your answer was chosen). If your answer was correct, you would have won a dollar, if you answer was incorrect, you would not have won.</p>\n  <p>If on the other hand, round 4 was selected, there was an 80% chance of winning a dollar and 20% chance of getting nothing. If we run the lottery and you win, you get one dollar.</p>\n  <p>You will play for the chance of winning up to $20 in bonus, $1 per recording.</p>"],Pt={name:"App",components:{"v-audio":q,flash:B,"instructions-dialog":X,"error-dialog":at,stopwatch:ut,"code-dialog":bt,"round-dialog":Vt},data:function(){return{id:"05cdbc17-fc15-4e48-a29f-756029933bc5",practice:!0,code_dialog:!1,submit_dialog:!1,round_dialog:!1,audiosample_dialog:!1,instructions_dialog:!0,instructions_consent:Tt,instructions_type1:jt,instructions_type2:It,instructions_tooltip:!1,error_dialog:!1,error_message:{data:"Cause unknown."},round_response:{chose:0,type:1,chance:70,pending:!1,complete:!0},task_type:1,step:0,submit_step:-1,group:null,practice_item:[{file:"demo.wav",label:"jackhammer",audio_step:!1,class_step:!1,bet_step:!1,confidence:50,classification:null,choices:[],practicekey:""}],items:[],animate:!1,debug:!1,is_practice:!0}},computed:{is_final:function(){return this.current_round==this.items.length},current_items:function(){return this.is_practice?this.practice_item:this.items},current_round:function(){return this.step+1},is_final_submit:function(){return this.current_submit_round==this.items.length},current_submit_round:function(){return this.submit_step+1},wins:function(){return this.items.filter(function(t){return t.won}).length}},methods:{next_submit:function(){this.is_final_submit?(this.submit_dialog=!1,this.submitAll()):this.submit_step++},setWon:function(t,e){-1===e.won&&(e.won=t<e.chance)},showTooltip:function(){var t=this;this.instructions_tooltip=!0,setTimeout(function(){t.instructions_tooltip=!1},3e3)},next_round:function(){this.is_practice?this.is_practice=!1:this.is_final?this.submit_dialog=!0:this.step++},handleError:function(t){this.error_message=t.response,this.error_dialog=!0,this.submit_dialog=this.round_dialog=!1},addChoice:function(t,e){t.choices.push(e),t.confidence+=10,t.bet_step=100==t.confidence,this.animate=!0},processRound:function(t){var e=this;if(2==this.task_type){var i=Math.floor(5*Math.random());t.chose=i,t.type=t.choices[i],0==t.type&&(t.chance=10*(i+5))}if(1==this.task_type||1==t.type){var a={id:this.id,item:t};this.$axios.post("/truth",a).then(function(e){t.won=e.data}).catch(function(t){e.handleError(t)})}this.round_dialog=!0},submitAll:function(){var t=this,e={id:this.id,wins:this.wins,items:this.items};this.$axios.post("/post/all",e).then(function(){t.code_dialog=!0}).catch(function(e){t.handleError(e)})},newPractice:function(){0!=this.items.length&&(this.practice_item=[b()({},this.items[Math.floor(Math.random()*this.items.length)])],this.practice_item[0].practice_key="practice",this.practice_item[0].choices=[])}},created:function(){var t=window.surveydata;if(!t)return console.error("No data recieved from server! Demo only. "),void(this.task_type=Math.floor(2*Math.random())+1);this.task_type=f()(t["task_type"],10),console.log("task: "+this.task_type),this.id=t["id"],this.group=t["group"];for(var e=0;e<t["items"].length;e++)t["items"][e]=b()(t["items"][e],{audio_step:!1,class_step:!1,bet_step:!1,confidence:50,classification:null,choices:[],won:-1,practicekey:""});this.items=t.items,this.newPractice()}},$t=Pt,Yt=(i("034f"),i("7496")),Mt=i("a523"),Nt=i("0e8f"),qt=i("67b6"),Et=i("43a6"),St=i("3a2f"),Ot=Object(C["a"])($t,p,v,!1,null,null,null),At=Ot.exports;T()(Ot,{VApp:Yt["a"],VBtn:j["a"],VCard:I["a"],VCardActions:P["a"],VCardText:P["b"],VCardTitle:W["a"],VContainer:Mt["a"],VDialog:U["a"],VDivider:xt["a"],VFlex:Nt["a"],VLayout:Y["a"],VRadio:qt["a"],VRadioGroup:Et["a"],VSlider:M["a"],VSpacer:z["a"],VTooltip:St["a"],VWindow:J["a"],VWindowItem:G["a"]}),a["a"].config.productionTip=!1,window.vue=new a["a"]({render:function(t){return t(At)},methods:{debug:function(){return this.$children[0].$data.debug=!this.$children[0].$data.debug,"Debug mode "+(this.$children[0].$data.debug?"enabled. ":"disabled. ")}}}).$mount("#app")},"6ec1":function(t,e,i){},"7c09":function(t,e,i){},d18f:function(t,e,i){"use strict";var a=i("0e3f"),n=i.n(a);n.a},dd1a:function(t,e,i){}});
//# sourceMappingURL=app.d8169a50.js.map