import Vue from "vue"
import Router from "vue-router"

const Home = () => import('./components/Home')
const About = () => import('./components/About')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: About
    }
  ]
})
