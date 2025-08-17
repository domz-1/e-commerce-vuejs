import { createRouter, createWebHistory } from 'vue-router';
import HomeLayout from '../layouts/HomeLayout.vue';
import Home from '../views/Home.vue';
import Products from '../views/Products.vue';
import Categories from '../views/Categories.vue';
import Brands from '../views/Brands.vue';
import SignIn from '../views/SignIn.vue';
import SignUp from '../views/SignUp.vue';
import NotFound from '../views/NotFound.vue';
const routes = [
    {
        path: '/',
        component: HomeLayout,
        children: [
            {
                path: '',
                name: 'home',
                component: Home,
            },
            {
                path: 'brands',
                name: 'brands',
                component: Brands,
            },
            {
                path: 'products',
                name: 'products',
                component: Products,
            },
            {
                path: 'categories',
                name: 'categories',
                component: Categories,
            },
        ],
    },
    {
        path: '/auth',
        component: HomeLayout,
        children: [
            {
                path: '/signin',
                name: 'signin',
                component: SignIn,
            },
            {
                path: '/signup',
                name: 'signup',
                component: SignUp,
            },
        ],
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFound,
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;
