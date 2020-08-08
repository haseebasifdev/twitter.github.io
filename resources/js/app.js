require('./bootstrap');

window.Vue = require('vue');
import router from './router'
import store from './store/store'
import moment from 'moment'
import VueProgressBar from 'vue-progressbar'

Vue.use(VueProgressBar, {
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '2px'
})
Vue.component('navbar', require('./components/Navbar.vue').default);
Vue.component('routerset', require('./components/routerset.vue').default);
Vue.filter('date', function (value) {
    return moment(value).calendar();
})
Vue.filter('datecomment', function (value) {
    return moment(value).format('MMMM Do YYYY, h:mm:ss a');
})

// import VueLocalStorage from 'vue-localstorage'

// Vue.use(VueLocalStorage)
// Vue.use(VueLocalStorage, {
//   name: 'ls',
//   bind: true 
// })
import {
    mapActions,
    mapState,
    mapMutations
} from "vuex";
const app = new Vue({
    router,
    store,
    el: '#app',
    methods: {
        ...mapActions(["alluser", "unreadnotification"]),
        ...mapMutations(['setcountnote', "setonlineusers", "setleaveonlineusers", "setjoinonlineusers"]),
    },
    mounted() {
        console.log("Width", $(window).width());
        mapState(["countnote"]);
        // console.log("loca storage ength", (JSON.parse(localStorage.getItem('notifications')).length));
        // this.setcountnote((JSON.parse(localStorage.getItem('notifications')).length));
        this.unreadnotification()
    },
    created() {

        var from = $('meta[name="userid"]').attr("content");
        Echo.private("notification." + from).listen("BroadcastNotification", e => {
            this.setcountnote(1);

        });
        var from = $('meta[name="username"]').attr("content");
        Echo.join("Online")

            .here((users) => {
                this.setonlineusers(users)
            })
            .joining((user) => {
                this.setjoinonlineusers(user)
            })
            .leaving((user) => {
                this.setleaveonlineusers(user)

            });
    },

});
