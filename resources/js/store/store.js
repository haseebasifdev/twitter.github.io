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
        countnote: 0,
        onlineusers: [],
        explore: [],
        trendstweets: [],

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
        trendstweets: (state, data) => {
            state.trendstweets = data;
        },
        explore: (state, data) => {
            state.explore = data;
        },
        removeTweet: (state, index) => {
            state.usertweet.splice(index, 1);
        },
        setonlineusers: (state, data) => {
            state.onlineusers = data;
        },
        setleaveonlineusers: (state, data) => {
            state.onlineusers = state.onlineusers.filter(user => user != data)
        },
        setjoinonlineusers: (state, data) => {
            state.onlineusers.push(data);
        },

        checkonline: (state, data) => {
            state.onlineusers.find(user => {
                if (user == data) {
                    console.log("Checking", user);
                    return true;
                }
            });
        },

        finduser: (state, username) => {
            return state.allusers.filter(user => user.username == username)
        },
        setcountnote: (state, data) => {
            state.countnote = state.countnote + data;
        },
        resetcountnote: (state) => {
            state.countnote = 0;
        },
        setshowprofile: (state, data) => state.showprofile = data,
        settweet: (state, data) => state.tweet = data,
        setcommentpostindex: (state, index) => state.commentpostindex = index,
        setnotifications: (state, data) => state.notifications = data,
        setnewnotifications: (state, data) => state.notifications.push(data),
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
        setlikedpost: (state, data) => {
            if (data.flag == 2) {
                if (state.tweet.liked) {

                    state.tweet.likes--;
                    state.tweet.liked = (!state.tweet.liked);

                } else {

                    state.tweet.likes++;
                    state.tweet.liked = (!state.tweet.liked);
                }
                // state.tweet.liked = !state.tweet.liked

            } else if (data.flag == 3) {

                if (state.trendstweets[data.index].liked) {

                    state.trendstweets[data.index].likes--;
                    state.trendstweets[data.index].liked = (!state.trendstweets[data.index].liked);

                } else {

                    state.trendstweets[data.index].likes++;
                    state.trendstweets[data.index].liked = (!state.trendstweets[data.index].liked);
                }
            } else {

                if (state.usertweet[data.index].liked) {

                    state.usertweet[data.index].likes--;
                    state.usertweet[data.index].liked = (!state.usertweet[data.index].liked);

                } else {

                    state.usertweet[data.index].likes++;
                    state.usertweet[data.index].liked = (!state.usertweet[data.index].liked);
                }
                // console.log(state.usertweet[data.index].liked, state.usertweet[data.index].likes)
            }
        },
        setretweetedpost: (state, data) => {
            if (data.flag == 2) {
                if (state.tweet.retweeted) {

                    state.tweet.retweet--;
                    state.tweet.retweeted = (!state.tweet.retweeted);

                } else {

                    state.tweet.retweet++;
                    state.tweet.retweeted = (!state.tweet.retweeted);
                }
                // state.tweet.retweeted = !state.tweet.retweeted

            } else if (data.flag == 3) {
                if (state.trendstweets[data.index].retweeted) {

                    state.trendstweets[data.index].retweet--;
                    state.trendstweets[data.index].retweeted = (!state.trendstweets[data.index].retweeted);

                } else {

                    state.trendstweets[data.index].retweet++;
                    state.trendstweets[data.index].retweeted = (!state.trendstweets[data.index].retweeted);
                }

            } else {

                if (state.usertweet[data.index].retweeted) {

                    state.usertweet[data.index].retweet--;
                    state.usertweet[data.index].retweeted = (!state.usertweet[data.index].retweeted);

                } else {

                    state.usertweet[data.index].retweet++;
                    state.usertweet[data.index].retweeted = (!state.usertweet[data.index].retweeted);
                }
                console.log(state.usertweet[index].retweeted, state.usertweet[index].retweet)
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
                commit('setlikedpost', payload);
                await axios.post('/like', payload);


            } catch (err) {
                console.log(err);
            }
        },
        retweetpost: async ({
            commit
        }, payload) => {
            try {
                commit('setretweetedpost', payload);
                await axios.post('/retweet', payload);


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
        deletetweet: async ({
            commit
        }, payload) => {
            try {
                commit('removeTweet', payload.index);
                const response = await axios.get('/deletepost/' + payload.post_id);


            } catch (err) {
                console.log(err)
            }
        },
        hashtag: async ({
            commit
        }, payload) => {
            try {
                await axios.post('explore', payload)
            } catch (err) {
                console.error();

            }
        },
        explore: async ({
            commit
        }) => {
            try {
                var res = await axios.get('explore');
                commit('explore', res.data);

            } catch (err) {
                console.error();

            }
        },
        Trendingtweets: async ({
            commit
        }, payload) => {
            try {
                console.log("Before Exploring", payload);
                var res = await axios.post('/trending/', payload);
                console.log("After Explore", res.data);
                commit('trendstweets', res.data);

            } catch (err) {
                console.error();

            }
        },
    }
})
