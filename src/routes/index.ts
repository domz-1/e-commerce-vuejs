import { createRouter, createWebHistory } from 'vue-router';
// Views
import HomeLayout from '../layouts/HomeLayout.vue';
import Home from '../views/Home.vue';
import Products from '../views/Products.vue';
import Categories from '../views/Categories.vue';
import Brands from '../views/Brands.vue';
import SignIn from '../views/SignIn.vue';
import SignUp from '../views/SignUp.vue';
import NotFound from '../views/NotFound.vue';
import ProductDetails from '../views/ProductDetails.vue';
import Cart from '../views/Cart.vue';
import { useAuthStore } from '../store/authStore';
// Router configuration
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
                meta: { requiresAuth: true },
            },
            {
                path: 'products',
                name: 'products',
                component: Products,
                meta: { requiresAuth: true },
            },
            {
                path: 'product/:id',
                name: 'product-details',
                component: ProductDetails,
                meta: { requiresAuth: true },
            },
            {
                path: 'categories',
                name: 'categories',
                component: Categories,
                meta: { requiresAuth: true },
            },
            {
                path: 'cart',
                name: 'cart',
                component: Cart,
                meta: { requiresAuth: true },
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
                meta: { requiresGuest: true },
            },
            {
                path: '/signup',
                name: 'signup',
                component: SignUp,
                meta: { requiresGuest: true },
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
router.beforeEach((to, _from, next) => {
    const { isAuthenticated } = useAuthStore();
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (!isAuthenticated) {
            next({ name: 'signin', query: { redirect: to.fullPath } });
        } else {
            next();
        }
    } else if (to.matched.some((record) => record.meta.requiresGuest)) {
        if (isAuthenticated) {
            next({ name: 'home' });
        } else {
            next();
        }
    }
    // For all other routes
    else {
        next();
    }
});
export default router;
