import axios from 'axios';
const state = {
    authuser: []


};
const getters = {
    data: (state) => state.authusers,
    user: (state) => {
        axios.get('/user').then(response => {
            console.log (response.data);
        })
    }
};
const actions = {};
const mutations = {};
export default {
    state,
    getters,
    actions,
    mutations
}
