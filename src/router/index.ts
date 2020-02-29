import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/EditView.vue';

import authService from '@/services/auth.service';

// This is a work around to enable mock the route when doing unit tests
if (!process || process.env.NODE_ENV !== 'test') {
    Vue.use(VueRouter);
}

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '*',
        name: 'page404',
        component: () => import(/* webpackChunkName: "page404" */ '../views/Page404.vue')
    }
];

const router = new VueRouter({
    base: process.env.BASE_URL,
    routes
});

router.beforeEach(async (to, from, next) => {
    const isPrivate = to.meta.private || to.matched.some(route => route.meta.private);
    if (!isPrivate) {
        next();
        return;
    }
    const isAuthenticated = await authService.hasLocalSession();

    if (to.name !== 'login' && !isAuthenticated && isPrivate) {
        next('/login');
    } else {
        next();
    }
});

export default router;
