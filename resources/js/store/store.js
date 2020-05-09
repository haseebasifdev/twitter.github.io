import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
// import base64Img from 'file-system';
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        user: [],
        usertweet: [],
        alltweet: [],
        likedpost: '',
        commentpostindex: 0

    },
    mutations: {
        setcommentpostindex: (state, index) => state.commentpostindex = index,
        setuser: (state, userdata) => state.user = userdata,
        setusertweet: (state, tweet) => state.usertweet = tweet,
        setcommentpost: (state, index) => state.usertweet[index].comments++,
        setlikedpost: (state, index) => {
            // console.log(state.usertweet[index].liked)
            if (state.usertweet[index].liked) {

                state.usertweet[index].likes--;
                state.usertweet[index].liked = (!state.usertweet[index].liked);

            } else {

                state.usertweet[index].likes++;
                state.usertweet[index].liked = (!state.usertweet[index].liked);
            }
            console.log(state.usertweet[index].liked, state.usertweet[index].likes)
            // state.likedpost = post[0];
            // state.usertweet[index].likes = post[1]
        },
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
        saveprofilepicture: async ({
            commit
        }, payload) => {
            try {
                const response = await axios.post('/saveprofilepicture', payload);

            } catch (err) {
                console.log(err);
            }
        },
        likepost: async ({
            commit
        }, payload) => {
            try {
                commit('setlikedpost', payload.index);
                const response = await axios.post('/like', payload);


            } catch (err) {
                console.log(err);
            }
        },
        commentit: async ({
            commit
        }, payload) => {
            try {
                commit('setcommentpost', payload.index);
                const response = await axios.post('/comment', payload);


            } catch (err) {
                console.log(err);
            }
        },
        commentpostindex: async ({
            commit
        }, payload) => {
            try {
                commit('setcommentpostindex', payload);
            } catch (err) {
                console.log(err);
            }
        },
    }
})
