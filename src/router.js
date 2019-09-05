import Vue from 'vue'
import Router from 'vue-router'

import SplashScreen from '@/views/SplashScreen'
import CharacterSheet from './views/CharacterSheet'

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: SplashScreen
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/character/:uuid',
      name: 'character',
      component: CharacterSheet
    }
  ]
})
