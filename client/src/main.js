import Vue from 'vue'
import './plugins/axios'
import './plugins/vuetify'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

window.vue = new Vue({
  render: h => h(App),
  store,

  methods: {
    debug() {
      this.$children[0].$data.debug = !this.$children[0].$data.debug
      return "Debug mode " + (this.$children[0].$data.debug ? "enabled. " : "disabled. ")
    }
  }
}).$mount('#app')
