import Home from '@/components/Home.vue';

export const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    }, // TODO DO 404
    {
        path: '/heavy_page',
        name: 'HeavyPage',
        component: async () => await import('@/components/HeavyPage.vue'),
    },
];
