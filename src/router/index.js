import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import Admin from '../components/Admin/Admin.vue';
import PasswordRecovery from "../components/PasswordRecovery.vue";
import { auth } from '../../firebase-config.js';

const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/passwordRecovery', component: PasswordRecovery },
    {
        path: '/admin',
        component: Admin,
        meta: { requiresAuth: true },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    const checkAuth = () => {
        return new Promise((resolve, reject) => {
            const unsubscribe = auth.onAuthStateChanged(user => {
                unsubscribe();  // Stop listening for changes
                resolve(!!user); // Resolve with the authentication state
            }, reject);
        });
    };

    if (requiresAuth) {
        checkAuth().then(isAuthenticated => {
            if (!isAuthenticated) {
                next('/login');
            } else {
                next();
            }
        }).catch(() => {
            next('/login');
        });
    } else {
        next();
    }
});

export default router;
