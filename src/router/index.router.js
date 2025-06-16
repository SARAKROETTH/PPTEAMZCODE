import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../views/HomePage.vue'
import LoginPage from '../views/LoginPage.vue'
import NotFoundPage from '../views/NotFoundPage.vue'
import CourseDetailPage from '../views/CourseDetailPage.vue'
import QuziePage from '../views/QuziePage.vue'
import StudentProfitTracker from '../views/DashDoadPage.vue'


const routes = [
  {
    path: '/',
     name: 'home' ,
    component: HomePage,
  },
  {
    path:'/:id',
    name: 'homeStudent',
    component:HomePage

  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path:'/register',
    component: LoginPage
  },
  {
    path:'/DetailCourse/:courseId/lession/:id',
    component: CourseDetailPage ,
     meta: { requiresAuth: true }
  },
  {
    path:'/lesion_id=:lesionId/quiezze/:id',
    component: QuziePage
  },
  {
    path:'/profile/:id',
    component:StudentProfitTracker
  },
  {
    path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundPage
  }
  ,
  {
    path:'/test',
    component: () => import('../components/DropDowns/ProfileDropDown.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {

  const isAuthenticated = localStorage.getItem("token") // Replace with your auth logic

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login' }); // redirect to login if not authenticated
  } else {
    next(); // allow the navigation
  }
});


export default router

