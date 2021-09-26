import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Course from '../views/Course.vue'
import Module from '../views/Module.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/courses/:id',
    name: 'Courses',
    component: Course,
  },
  {
    path: '/courses/:id/modules/:module_id',
      name: 'Modules',
      component: Module,
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
