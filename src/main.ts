import { createApp } from 'vue';
import { createStore } from 'vuex'
import App from './App.vue';

// Import tailwind
import './index.css';
const store = createStore({
    state() {
        return {
          connectedAccount: null
        }
      },
      getters: {
        getConnectedAccount(state) { return state.connectedAccount }
      },
      mutations: {
        setConnectedAccount(state, payload) {
          state.connectedAccount = payload
        }
      },
      actions: {
        setConnectedAccount(context, payload) {
          context.commit('setConnectedAccount', payload);
        }
      }
});

const app = createApp(App);
app.use(store)

// Routing
import { createWebHistory, createRouter } from 'vue-router';
import { routes } from './Routes';
const router = createRouter({
    history: createWebHistory(),
    routes,
});
app.use(router);

app.mount('#app');
