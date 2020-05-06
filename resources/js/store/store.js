import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        user: []
    },
    mutations: {
        setuser: (state, userdata) => state.user = userdata,
    },
    actions: {
        async fetchuser({
            commit
        }) {
            const res = await axios.get('/user');
            commit('setuser', res.data)
        }
    }
})
