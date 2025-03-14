import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NetworkView from '../views/NetworkView.vue'
import ClassroomsView from "../views/ClassroomsView.vue"
import MarketplaceView from "../views/MarketplaceView.vue"
import ProfileView from '../views/ProfileView.vue'
import AdminDashboard from '@/views/AdminDashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/network',
      name: 'network',
      component: NetworkView
    },
    {
      path: '/classrooms',
      name: 'classrooms',
      component: ClassroomsView
    },
    {
      path: '/marketplace',
      name: 'marketplace',
      component: MarketplaceView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/AdminDashboard',
      name: 'AdminDashboard',
      component: AdminDashboard
    },

  ]
})

export default router