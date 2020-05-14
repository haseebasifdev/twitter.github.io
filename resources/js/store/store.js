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
        commentpostindex: 0,
        allusers: [],
        messages: {}

    },
    getters: {
        allfollower: state => {
            return state.allusers.filter(user => user.follower)
        },
        allfollowing: state => {
            return state.allusers.filter(user => user.following)
        },
        authusertweet: state => {
            return state.alltweet.filter(tweet => tweet.user.id == state.user.id)
        },
    },
    mutations: {
        finduser: (state, username) => {
            return state.allusers.filter(user => user.username == username)
        },
        setcommentpostindex: (state, index) => state.commentpostindex = index,
        setnewmessage: (state, data) => state.messages.messages.push(data),
        setuser: (state, userdata) => state.user = userdata,
        setmessageuser: (state, data) => state.messages = data,
        setusertweet: (state, tweet) => state.usertweet = tweet,
        setcommentpost: (state, index) => state.usertweet[index].comments++,
        setusers: (state, users) => state.allusers = users,
        setfolow: (state, index) => {
            state.allusers[index].following = !state.allusers[index].following
        },
        setlikedpost: (state, index) => {
            if (state.usertweet[index].liked) {

                state.usertweet[index].likes--;
                state.usertweet[index].liked = (!state.usertweet[index].liked);

            } else {

                state.usertweet[index].likes++;
                state.usertweet[index].liked = (!state.usertweet[index].liked);
            }
            console.log(state.usertweet[index].liked, state.usertweet[index].likes)
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
        alluser: async ({
            commit
        }) => {
            try {
                const response = await axios.get('/users');
                commit('setusers', response.data);
            } catch (err) {
                console.log(err);
            }
        },
        follow: async ({
            commit
        }, payload) => {
            try {
                commit('setfolow', payload.index);
                const response = await axios.post('/follow', payload);

            } catch (err) {
                console.log(err);
            }
        },
        unfollow: async ({
            commit
        }, payload) => {
            try {
                commit('setfolow', payload.index);
                const response = await axios.post('/unfollow', payload);

            } catch (err) {
                console.log(err);
            }
        },
        messageuser: async ({
            commit
        }, payload) => {
            try {
                const response = await axios.post('/allmessage', payload);
                commit('setmessageuser', response.data);

            } catch (err) {
                console.log(err);
            }
        },
        savemessage: async ({
            commit
        }, payload) => {
            try {
                commit('setnewmessage', payload);
                const response = await axios.post('/savemessage', payload);


            } catch (err) {
                console.log(err);
            }
        },
    }
})
