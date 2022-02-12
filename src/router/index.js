import Vue from 'vue'
import Router from 'vue-router'
import MusicIndex from '@/components/MusicIndex'
import Playlist from '@/components/Playlist'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MusicIndex',
      component: MusicIndex
    },
    {
      path: '/playlist/:slug',
      name: 'Playlist',
      component: Playlist
    },
  ]
})
