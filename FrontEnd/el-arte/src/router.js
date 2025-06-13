import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {path:'/',component:()=> import('./components/LoginPage.vue')},
  {path:'/t',component:()=> import('./components/MainPage.vue')}
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
