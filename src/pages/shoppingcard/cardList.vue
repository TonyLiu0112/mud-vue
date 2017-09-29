<template>
  <div>
    <table>
      <tr>
        <td>商品名称</td>
        <td>图片</td>
        <td>数量</td>
        <td>价格</td>
        <td>操作</td>
      </tr>
      <tr v-if="shoppingcards.products" v-for="product in shoppingcards.products">
        <td>{{ product.name }}</td>
        <td>{{ product.image }}</td>
        <td>{{ product.count }}</td>
        <td>{{ product.price }}</td>
        <td>
          <button @click="addToCard(product)">加一个</button>
          <button @click="subToCard(product.id)">减一个</button>
          <button @click="removeToCard(product.id)">删掉</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'shoppingcards',
    data () {
      return {
        shoppingcards: {
          totalPrice: 0,
          products: []
        }
      }
    },
    computed: {
      ...mapGetters({
        cards: 'getAll'
      }),
      ...mapActions({
        _addToCard: 'addProduct',
        _subToCard: 'subCount',
        _del: 'removeProduct'
      }),
      all: function () {
        const allProduct = []
        for (const key in this.cards) {
          if (this.cards.hasOwnProperty(key)) {
            const p = this.cards[key]
            allProduct.push(p)
          }
        }
        const totalPrice = allProduct.reduce((price, p) => {
          return price + p.price
        }, 0)
        this.shoppingcards.products = allProduct
        this.shoppingcards.totalPrice = totalPrice
      }
    },
    methods: {
      addToCard: function (product) {
        this._addToCard(product)
      },
      subToCard: function (pId) {
        this._subToCard(pId)
      },
      removeToCard: function (pId) {
        this._del(pId)
      }
    },
    mounted: function () {
      // todo 加载购物车信息
    }
  }
</script>
