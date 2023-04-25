import { createApp } from 'vue';
import { createPinia } from 'pinia'
import App from './App.vue';

// Import tailwind
import './index.css';
const pinia = createPinia();

// const accountStore = defineStore({
//     state() {
//         return {
//           connectedAccount: null
//         }
//       },
//       getters: {
//         getConnectedAccount(state) { return state.connectedAccount }
//       },
//       },
//       actions: {
//         setConnectedAccount(context, payload) {
//           context.commit('setConnectedAccount', payload);
//         }
//       }
// // });

const app = createApp(App);

// Routing
import { createWebHistory, createRouter } from 'vue-router';
import { routes } from './Routes';
const router = createRouter({
    history: createWebHistory(),
    routes,
});
app.use(router);

// Store
app.use(pinia)

app.mount('#app');
