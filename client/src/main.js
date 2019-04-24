import Vue from 'vue'
import './plugins/axios'
import './plugins/vuetify'
import App from './App.vue'

Vue.config.productionTip = false

window.vue = new Vue({
  render: h => h(App),
  methods: {
    debug() {
      this.$children[0].$data.debug = !this.$children[0].$data.debug
    }
  }
}).$mount('#app')
