import Vue from 'vue';
import Profile from './components/Profile.vue'
import Home from './components/Home.vue'
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
        path: '/profile',
        component: Profile,
        name:'profile'
    },
]
export default new VueRouter({
    routes // short for `routes: routes`
})

