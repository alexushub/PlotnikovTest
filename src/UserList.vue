<template>
  <div id="userList">
    <div class="head">
      <h1>User list</h1>
      <div v-show="isUsersLoadingInProgress"class="loadContainer">
        <p>Users are loading...</p>
        <img src="./assets/loadingList.gif" alt="">
      </div>
    </div>
    <div class="table">

      <table>
        <tr>
          <th></th>
          <th id="dd">Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Dob</th>
          <th></th>
        </tr>
        <tr v-for="user in users">
          <td><img v-bind:src="user.picture.thumbnail" alt=""></td>
          <td><router-link data-name="name" :to="{name: 'user-view', params: {seed: user.seed}}">{{ fullName(user) }}</router-link></td>
          <td>
            <input type="text" v-model="user.emailEdit">
          </td>
          <td>
            <input type="text" v-model="user.phone">
          </td>
          <td>
            <input type="text" v-model="user.dob">
            <!--<span class="eddate" data-name="dob" v-bind:data-seed="user.seed" >{{ user.dob | moment }}</span>-->
          </td>
          <td><a href="#" @click.prevent="deleteUser(user.seed)"><img class="delete" src="./assets/delete.png" alt=""></a></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>

  import UserService from './UserService.vue'
  import NameMixin from './NameMixin.vue'

export default {
  name: 'UserList',
  mixins: [UserService, NameMixin],

  props: {

  },
  components: {
  },
  data () {
    return {
      usersCount: 10,
      isUsersLoadingInProgress: false,
      users: [],
    }
  },
  created: function () {
    this.loadUsers();
  },
  methods: {
    loadUsers: function () {
      var vm = this;

      vm.isUsersLoadingInProgress = true;
      let promises = [];

      for (var i = 0; i < vm.usersCount; i++) {
        var usProm = vm.getRandomUser();
        promises.push(usProm);

        usProm.then(function (response) {
          //debugger;
          var u = response.data.results[0];
          u.seed = response.data.info.seed;
          u.emailEdit = u.email;
          vm.users.push(u)
        })
      }

      Promise.all(promises).then(function () {
        vm.isUsersLoadingInProgress = false;
      })
    },

    deleteUser: function (seed) {
      this.users = this.users.filter(function(item) {
        return item.seed !== seed;
      });
    },
  }
}
</script>

<style lang="scss">

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: ClearSansThin;
  }

  a {
    text-decoration: none;
    &:visited {
      color: blue;
    }
  }

  body{
    //text-align: center;
  }
  table {
    width: 100%;
  }

  .head {
    text-align: center;
    .loadContainer {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    img {
      width: 30px;
      height: 30px;
    }
  }

  #userList {
    .table {
      margin: 0 auto;
      margin-top: 50px;
      width: 96%;

      input {
        border: none;
        width: 100%;
        text-align: center;
        font-size: 16px;
      }

      tr:nth-child(2) {
        td {
          padding-top: 20px;
        }
      }

      td, th {
        padding: 2px 8px;
        text-align: center;
      }

      img.delete{
        width: 20px;
        height: 20px;
      }
    }
  }

</style>
