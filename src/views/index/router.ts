import Vue from 'vue'
import Router from 'vue-router'
import Welcome from './pages/welcome.vue'
import Login from './pages/login_register/login.vue'
import Register from './pages/login_register/register.vue'
import Challenge from './pages/challenge/challenge.vue'

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
    {
      path: '/register',
      component: Register,
    },
    {
      path: '/challenge',
      component: Challenge,
    },
  ],
})
