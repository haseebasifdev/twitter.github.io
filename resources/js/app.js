require('./bootstrap');

window.Vue = require('vue');
import router from './router'
import store from './store/store'
import moment from 'moment'
Vue.component('navbar', require('./components/Navbar.vue').default);
Vue.component('routerset', require('./components/routerset.vue').default);
Vue.filter('date', function (value) {
    return moment(value).format('MMMM Do YYYY');
})
// import VueLocalStorage from 'vue-localstorage'

// Vue.use(VueLocalStorage)
// Vue.use(VueLocalStorage, {
//   name: 'ls',
//   bind: true 
// })
import {
    mapActions,
    mapState
} from "vuex";
const app = new Vue({
    router,
    store,
    el: '#app',
    methods: {
        ...mapActions(["alluser"]),
    },
    // computed: {
    //     ...mapState(["messages", "user"])
    // },
    // created() {
    //     const from = $('meta[name="userid"]').attr("content");
    //     const to = this.messages.user.id;
    //     console.log("from", from);
    //     console.log("to", to);
    //     Echo.private("chat." + to + "." + from).listen("Chat", e => {
    //         console.log(e.message.message);
    //         this.$store.dispatch("setmessage", e.message);
    //     });
    // }


});
