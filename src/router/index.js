import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NetworkView from '../views/NetworkView.vue'
import ClassroomsView from "../views/ClassroomsView.vue"
import MarketplaceView from "../views/MarketplaceView.vue"
import ProfileView from '../views/ProfileView.vue'
import AdminDashboard from '@/views/AdminDashboard.vue'
import login from '@/views/Login.vue'
import userProfile from '@/views/userProfile.vue'
import classroom from '@/views/ClassroomView.vue'
import TeacherDashboard from '@/views/TeacherDashboard.vue'
import { useUserStore } from '@/stores/userStore'
const router = createRouter({
  history: createWebHistory(),
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
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/profile/:id',
      name: 'user-profile',
      component: userProfile,
      props: true
    },
    {
      path: '/classroom/:id',
      name: 'classrom',
      component: classroom,
      props: true
    },
    {
      path: '/TeacherDashboard',
      name: 'TeacherDashboard',
      component: TeacherDashboard
    }
  ]
})

// Global navigation guard
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();

  const token = document.cookie.split('; ').find(row => row.startsWith('token='));
  if (!token) {

    if (to.name !== 'login') {
      next({ name: 'login' });
    } else {
      next();
    }
    return;
  }

  // Allow access to the login page without authentication
  if (to.name === 'login') {
    next();
    return;
  }

  // Wait for user data to be fetched
  if (!userStore.isFetched) {
    try {
      await userStore.fetchUserData();
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  // Check if the user is logged in
  if (!userStore.user) {
    // Redirect to login if not authenticated
    next({ name: 'login' });
  } else {

    if (to.name === 'AdminDashboard' && userStore.user.role !== 'admin') {
      next({ name: 'home' });
    }
    else if (to.name === 'TeacherDashboard' && userStore.user.role !== 'teacher') {
      next({ name: 'home' });
    } else {
    // Allow access if authenticated and authorized
    next();
    }
  }
});

export default router;