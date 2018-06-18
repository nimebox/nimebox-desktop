import Vue from 'vue'
import Router from 'vue-router'
import News from '@/components/News'
import Anime from '@/components/Anime'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'news',
      component: News
    },
    {
      path: '/anime',
      name: 'anime',
      component: Anime
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
