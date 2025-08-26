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
                path: 'categories',
                name: 'categories',
                component: Categories,
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

// Route guard implementation
router.beforeEach((to, _from, next) => {
    // Import the auth store inside the guard to avoid circular dependencies
    const { isAuthenticated } = useAuthStore();

    // Check if the route requires authentication
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (!isAuthenticated) {
            // Redirect to signin page if not authenticated
            next({ name: 'signin', query: { redirect: to.fullPath } });
        } else {
            next(); // Proceed to the route
        }
    } else if (to.matched.some((record) => record.meta.requiresGuest)) {
        if (isAuthenticated) {
            next({ name: 'home' });
        } else {
            next(); // Proceed to the route
        }
    }
    // For all other routes
    else {
        next(); // Proceed to the route
    }
});

export default router;
