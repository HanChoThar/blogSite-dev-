import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import { getAuth } from 'firebase/auth'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import('../views/Blog.vue'),
    meta: {
      title: 'Blog'
    }
  },
  {
    path: '/createpost',
    name: 'Createpost',
    component: () => import('../views/Createpost.vue'),
    async beforeEnter(to, from) {
      const auth =await getAuth()
      const user =await auth.currentUser
      if(!user){
       return {name: 'Login'} 
      }
      else return
    },
    meta: {
      title: 'Createpost'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      title: 'Login'
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta: {
      title: 'Register'
    }
  },
  {
    path: '/forgotpassword',
    name: 'Forgotpassword',
    component: () => import('../views/ForgotPassword.vue'),
    meta: {
      title: 'Forgotpassword'
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta: {
      title: 'Profile'
    }
  },
  {
    path: '/preview',
    name: 'Preview',
    component: () => import('../views/Preview.vue'),
    meta: {
      title: 'Preview'
    }
  },
  {
    path: '/view-blog/:blogid',
    name: 'Viewblog',
    component: () => import('../views/Viewblog.vue'),
    meta: {
      title: 'Viewblog'
    }
  },
  {
    path: '/editblog/:blogid',
    name: 'Editblog',
    component: () => import('../views/EditBlog.vue'),
    meta: {
      title: 'Editblog'
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/Admin.vue'),
    meta: {
      title: 'Admin'
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  },
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | BlogSite`
  next()
})

export default router
