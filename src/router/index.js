import { createWebHistory, createRouter } from 'vue-router';

import HomePage from '~/pages/Home.vue';
import CartPage from '~/pages/Cart.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/cart', component: CartPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router