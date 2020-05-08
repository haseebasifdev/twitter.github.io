import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
// import base64Img from 'file-system';
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        user: [],
        usertweet: [],
        alltweet: []
    },
    mutations: {
        setuser: (state, userdata) => state.user = userdata,
        setusertweet: (state, tweet) => state.usertweet = tweet,
    },
    actions: {
        async fetchuser({
            commit
        }) {

            console.log('fetuser');
            const res = await axios.get('/user');
            commit('setuser', res.data)
        },
        async fetchusertweet({
            commit
        }) {
            console.log('fettweet');
            const res = await axios.get('/post');
            commit('setusertweet', res.data)
        },
        posttweet: async ({
            commit
        }, payload) => {
            try {
                const response = await axios.post('/post', payload.tweet);
                
            } catch (err) {
                console.log(err);
            }
        },
        saveprofile: async ({
            commit
        }, payload) => {
            try {
                const response = await axios.post('/saveprofile', payload);
                
            } catch (err) {
                console.log(err);
            }
        },
    }
})
