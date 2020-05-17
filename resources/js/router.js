import Vue from 'vue';
import Profile from './components/Profile.vue'
import Home from './components/Home.vue'
import Explore from './components/Follow'
import Follower from './components/Followers'
import Following from './components/Following'
import Friend from './components/Friend'
import Message from './components/Message'
import MessageFriends from './components/MessageFriends'
import Notification from './components/Notification'
import ShowPost from './components/ShowPost'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const Foo = {
    template: '<div>foo</div>'
}
const Bar = {
    template: '<div>bar</div>'
}

const routes = [{
        path: '/',
        component: Home
    },
    {
        path: '/bar',
        component: Bar
    },
    {
        path: '/notifications',
        component: Notification,
        name:'notifications'
    },
    {
        path: '/:username/status/:id',
        component: ShowPost,
        name:'showpost'
    },
    {
        path: '/message',
        component: MessageFriends,
        name: 'message',
        children: [{
            path: '/:username',
            component: Message,
            name: 'messagebody'
        }, ]
    },
    {
        path: '/auth/:username',
        component: Profile,
        name: 'profile',
        children: [
            // {
            //     path: 'follower',
            //     component: Follower,
            //     name: 'follower'
            // },
            // {
            //     path: 'following',
            //     component: Following,
            //     name: 'following'
            // },
        ]
    },
    {
        path: '/users',
        component: Friend,
        name: 'profileto',
        children: [{
                path: 'follower',
                component: Follower,
                name: 'follower'
            },
            {
                path: 'following',
                component: Following,
                name: 'following'
            },
        ]
    },
    // {
    //     path: '/follower',
    //     component: Follower,
    //     name: 'follower'
    // },
    // {
    //     path: '/following',
    //     component: Following,
    //     name: 'following'
    // },
    {
        path: '/explore/follow',
        component: Explore,
        name: 'explore'
    },
]
export default new VueRouter({
    routes // short for `routes: routes`
})
