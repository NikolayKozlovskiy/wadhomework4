import { createRouter, createWebHashHistory } from "vue-router";
import FormView from "../views/FormView.vue";
import MainView from "../views/MainView.vue"
import AddPost from "../views/AddPost.vue"

const routes = [
    {
        path: "/signup",
        name: "signup",
        component: FormView,
    },
    {
        path:"/", 
        name:'Main', 
        component: MainView,
    },
    {
        path:"/post",
        name:'post',
        component: AddPost,
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;