import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";

Vue.use(VueRouter)
Vue.config.productionTip = false

const routes = [
    {name: "home", path: '/', component: HomePage, meta: {allowBack: false}},
    {name: "login", path: '/login', component: LoginPage, meta: {allowBack: false}}
]

const router = new VueRouter({
    routes: routes
})

new Vue({
    render: h => h(App),
    router: router
}).$mount('#app')
