import Home from '@/components/Home.vue';

export const routes = [
    {
        path: '/:catchAll(.*)',
        name: 'Home',
        component: Home,
    },
];
