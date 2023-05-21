import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

// 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

new Vue({
  router,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')
