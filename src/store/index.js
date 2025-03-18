import { createStore } from 'vuex';

export const store = createStore({
    state() {
        return {
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
            token: localStorage.getItem('token') || null
        };
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setToken(state, token) {
            state.token = token;
            if (token) {
                localStorage.setItem('token', token);
            } else {
                localStorage.removeItem('token');
            }
        }
    },
    actions: {
        logout({ commit }) {
            commit('setUser', null);
            commit('setToken', null);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },
        setUserData({ commit }, { user, token }) {
            commit('setUser', user);
            commit('setToken', token);
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
        }
    },
    getters: {
        isAuthenticated: (state) => !!state.token,
        currentUser: (state) => state.user
    }
});
