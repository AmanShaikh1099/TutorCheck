import { createRouter, createWebHistory } from 'vue-router';
import tutorLogin from '../login/tutorLogin.vue';
import tutorCheckForm from '../components/tutorCheckForm.vue';

const routes = [
  { path: '/', component: tutorLogin },
  { path: '/tutorCheckForm', component: tutorCheckForm},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
