import Vue from 'vue'
import Router from 'vue-router'
import Welcome from './pages/welcome.vue'
import Login from './pages/Login/login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Welcome,
    },
    {
      path: '/login',
      component: Login,
    },
  ],
})
