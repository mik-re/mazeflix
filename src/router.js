import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "@/views/Home";
import HomeV2 from "@/views/HomeV2";
import Search from "@/views/Search";
import ShowDetail from "@/views/ShowDetail";

Vue.use(VueRouter)

const routes = [
    {path: '/', redirect: {name: 'home'}},
    {path: "/browse-v2", name: "home-v2", component: HomeV2},
    {path: "/browse", name: "home", component: Home},
    {path: "/search", name: "search", component: Search},
    {path: "/show/:id", name: "show", component: ShowDetail},
];

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
