import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
// import base64Img from 'file-system';
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        user: [],
        showprofile: [],
        showtweets: [],
        usertweet: [],
        alltweet: [],
        likedpost: '',
        commentpostindex: 0,
        allusers: [],
        messages: {},
        notifications: [],
        tweet: [],

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
        setshowprofile: (state, data) => state.showprofile = data,
        settweet: (state, data) => state.tweet = data,
        setcommentpostindex: (state, index) => state.commentpostindex = index,
        setnotifications: (state, data) => state.notifications = data,
        setnewmessage: (state, data) => state.messages.messages.push(data),
        setuser: (state, userdata) => state.user = userdata,
        setmessageuser: (state, data) => state.messages = data,
        setusertweet: (state, tweet) => state.usertweet = tweet,
        setcommentpost: (state, index) => state.usertweet[index].comments++,
        setcommentpostuser: (state, data) => {
            var newdata = {
                comment: data,
                user: state.user
            }
            state.tweet.comments.push(newdata)
        },

        setusers: (state, users) => state.allusers = users,
        setfolow: (state, index) => {
            if (index == -1) {
                state.showprofile.follow = !state.showprofile.follow
            } else {
                state.allusers[index].following = !state.allusers[index].following
            }

        },
        setlikedpost: (state, index) => {
            if (index == -1) {
                if (state.tweet.liked) {

                    state.tweet.likes--;
                    state.tweet.liked = (!state.tweet.liked);

                } else {

                    state.tweet.likes++;
                    state.tweet.liked = (!state.tweet.liked);
                }
                // state.tweet.liked = !state.tweet.liked

            } else {

                if (state.usertweet[index].liked) {

                    state.usertweet[index].likes--;
                    state.usertweet[index].liked = (!state.usertweet[index].liked);

                } else {

                    state.usertweet[index].likes++;
                    state.usertweet[index].liked = (!state.usertweet[index].liked);
                }
                console.log(state.usertweet[index].liked, state.usertweet[index].likes)
            }
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
                await axios.post('/like', payload);


            } catch (err) {
                console.log(err);
            }
        },
        commentit: async ({
            commit
        }, payload) => {
            try {
                if (payload.index == -1) {

                    commit('setcommentpostuser', payload);

                } else {

                    commit('setcommentpost', payload.index);
                }
                await axios.post('/comment', payload);


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
        notification: async ({
            commit
        }, payload) => {
            try {
                const response = await axios.get('/index', payload);

                commit('setnotifications', response.data);


            } catch (err) {
                console.log(err);
            }
        },
        showtweet: async ({
            commit
        }, payload) => {
            try {
                const response = await axios.get('/post/' + payload);

                commit('settweet', response.data);


            } catch (err) {
                console.log(err);
            }
        },
        showtweets: async ({
            commit
        }, payload) => {
            try {
                const response = await axios.get('/posts/' + payload);

                commit('setusertweet', response.data);


            } catch (err) {
                console.log(err);
            }
        },
        showprofile: async ({
            commit
        }, payload) => {
            try {
                const response = await axios.get('/user/' + payload);

                commit('setshowprofile', response.data);


            } catch (err) {
                console.log(err);
            }
        },
    }
})
