import Home from '@/components/HomePage.vue';

export const routes = [
    {
        path: '/:catchAll(.*)',
        name: 'Home',
        component: Home,
    },
];
