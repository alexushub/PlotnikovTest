<script>
  import moment from 'moment'

  export default {
    name: 'NameMixin',
    methods: {
      fullName: function (user){
        return user.name.title + ' ' + user.name.first + ' ' + user.name.last;
      }
    },

    filters: {
      moment: function (date) {
        return moment(date).format('DD.MM.YYYY, HH:mm:ss');
      }
    }
  }
</script>
