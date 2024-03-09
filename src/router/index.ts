import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      transition: 'slide-left'
    }
  },
  {
    path: '/search',
    name: 'search',
    component: Home,
    meta: {
      transition: 'slide-left'
    }
  },
  {
    path: '/job/:id',
    name: 'job',
    component: () => import('@/views/JobView.vue'),
    meta: {
      transition: 'slide-right'
    }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

export default router;
