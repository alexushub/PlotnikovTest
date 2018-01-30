<script>
  import axios from 'axios'

  export default {
    name: 'UserService',
    data () {
      return {
        randUserUrl: 'https://randomuser.me/api',
        getUserUrl: 'https://randomuser.me/api'
      }
    },
    methods: {
      getRandomUser: function () {
        return axios.get(this.randUserUrl);
      },

      getUser: function (seed){
        return axios.get(this.getUserUrl, {
          params: {
            seed: seed
          }
        });
      },
    }
  }
</script>
