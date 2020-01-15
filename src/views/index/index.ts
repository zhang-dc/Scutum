import Vue from 'vue'
import Index from './index.vue'
import router from './router'
import store from './store'
import vuetify from '@/plugins/vuetify'

new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(Index),
  }).$mount('#app')
