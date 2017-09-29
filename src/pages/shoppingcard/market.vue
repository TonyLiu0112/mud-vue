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
        allProduct: 'getAll'
      }),
      totalCount: function () {
        const products = this.allProduct.cards
        console.log(products)
        let count = 0
        for (const key in products) {
          if (products.hasOwnProperty(key)) {
            const p = products[key]
            count += p.count
          }
        }
        return count
      }
    },
    mounted: function () {
      this.productCount = this.totalCount
    }
  }
</script>
