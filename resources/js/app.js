require('./bootstrap');

window.Vue = require('vue');
import router from './router'
import store from './store/store'
import moment from 'moment'
Vue.component('navbar', require('./components/Navbar.vue').default);
Vue.filter('date', function (value) {
    return moment(value).format('MMMM Do YYYY'); 
  })
const app = new Vue({
    router,
    store,
    el: '#app',
});
