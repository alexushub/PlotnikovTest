<template>
  <div>
    <div class="head">
      <h1>{{ header }}</h1>
      <p><router-link :to="{name: 'users', params: {}}">Back to list</router-link></p>
      <div v-if="errorMsg">{{ errorMsg }}</div>
    </div>


    <div id="userInfo" v-if="currentUser">
      <div class="photo">
        <img v-bind:src="currentUser.picture.large" alt="">
      </div>
      <div class="info">
        <ul>
          <li>
            <h3>Name:</h3>
            <p>{{ fullName(currentUser) }}</p>
          </li>
          <li>
            <h3>Email:</h3>
            <p>{{ currentUser.email }}</p>
          </li>
          <li>
            <h3>Phone:</h3>
            <p>{{ currentUser.phone }}</p>
          </li>
          <li>
            <h3>Dob:</h3>
            <p>{{ currentUser.dob | moment }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import NameMixin from './NameMixin.vue'
  import UserService from './UserService.vue'

export default {
  name: 'UserItem',
  data () {
    return {
      currentUser: null,
      errorMsg: null
    }
  },
  mixins: [NameMixin, UserService],
  props: [
    'seed'
  ],
  created: function () {
    //debugger;
    if (!this.currentUser){
      if (this.seed) {
        this.loadUser(this.seed);
      } else {
        this.errorMsg = 'no seed passed'
      }

    }
  },
  methods: {
    loadUser: function (seed) {
      var vm = this;

      var usProm = vm.getUser(seed);
      usProm.then(function (response) {
        var u = response.data.results[0];
        u.seed = response.data.info.seed;

        vm.currentUser = u;
      })
    },

    backToList: function () {
      this.$router.push({ name: 'users', params: {  }})
    }
  },
  computed: {
    header: function () {
      //debugger;
      return 'User ' + (this.currentUser !== null ? '\'' + this.fullName(this.currentUser) + '\'' : '');
    }
  }
}
</script>

<style lang="scss">
  #userInfo {
    margin: 0 auto;
    margin-top: 40px;

    display: grid;
    grid-template-columns: 1fr 3fr;
    width: 500px;

    .photo {
      margin-top: 8px;
    }
    .info {
      padding-left: 50px;

      li {
        list-style: none;

        &:not(:nth-child(1)) {
          margin-top: 10px;
        }

        h3 {
          margin-top: 0;
        }
      }
    }
  }
</style>
