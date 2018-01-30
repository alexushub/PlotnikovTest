import Vue from 'vue'
import VueRouter from 'vue-router'
import UserList from './UserList.vue'
import UserItem from './UserItem.vue'

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'hash',//'history',
  base: '/',
  routes: [
    { path: '/', redirect: { name: 'users' } },
    { name: 'users', path: '/users', component: UserList },
    { name: 'user-view', path: '/user-view/:seed', component: UserItem, props: true },
    { name: 'other', path: '*', redirect: { name: 'users' } }
  ]
});

new Vue({
  router,
  el: '#app',
  components: {
    //'userlist': UserList,
    //'editable': VueXeditable
  },
  data: {

  },

  methods: {

  },

  computed: {

  }
});//.$mount('#app');
