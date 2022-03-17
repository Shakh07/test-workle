import VueRouter from "vue-router"
import mainPage from "../pages/main.vue"
import userPage from "../pages/user.vue"
export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: "/",
            name: "main",
            component: mainPage
        },
        {
            path: "/user/:id",
            name: "user",
            component: userPage
        },
    ]
})