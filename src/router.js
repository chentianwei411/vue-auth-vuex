import Vue from "vue";
import Router from "vue-router";
import store from './store.js'

import Home from "./views/Home.vue";
import About from './views/About.vue'
import Login from "./components/Login.vue"
import Secure from './components/Secure.vue'
import Register from "./components/Register.vue"

Vue.use(Router);

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login.vue
    },
    {
      path: '/register',
      name: 'register',
      component: Register.vue
    },
    {
      path: '/secure',
      name: 'secure',
      component: Secure,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/about",
      name: "about",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});

router.beforeEach((to,from,next) => {
  // 要前往的路由是否有meta条件：
  // 是，进一步判断
  // 否，直接跳转到这个路由。
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 判断用户是否有权限进入这个页面：（使用了vuex store）
    if (store.getters.isLoggedIn) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
