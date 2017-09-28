<template>
  <a @click="goCards">
    购物车:{{ productCount }}
  </a>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'sci',
    data () {
      return {
        productCount: 0
      }
    },
    methods: {
      goCards: function () {
        this.$router.push('/shoppingcard/list')
      }
    },
    computed: {
      ...mapGetters({
        count: 'getCount'
      }),
      getCount: function () {
        return this.count
      }
    },
    mounted: function () {
      this.productCount = this.getCount
    }
  }
</script>
