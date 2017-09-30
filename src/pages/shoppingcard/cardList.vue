<template>
  <div>
    购物车列表
    <table style="margin: auto;" border="1">
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
    <div>
      总价：{{ shoppingcards.totalPrice }} RMB
    </div>
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
    methods: {
      ...mapGetters({
        cards: 'getAll'
      }),
      ...mapActions({
        _addToCard: 'addProduct',
        _subToCard: 'subCount',
        _del: 'removeProduct'
      }),
      addToCard: function (product) {
        this._addToCard(product)
        this.all()
      },
      subToCard: function (pId) {
        this._subToCard(pId)
        this.all()
      },
      removeToCard: function (pId) {
        this._del(pId)
        this.all()
      },
      all: function () {
        const allProduct = []
        const cacheProduct = this.cards().cards
        console.log(cacheProduct)
        for (const key in cacheProduct) {
          if (cacheProduct.hasOwnProperty(key)) {
            const p = cacheProduct[key]
            if (p && p.count > 0) {
              p.info.count = p.count
              allProduct.push(p.info)
            }
          }
        }
        const totalPrice = allProduct.reduce((price, p) => {
          return price + p.price * p.count
        }, 0)
        this.shoppingcards.products = allProduct
        this.shoppingcards.totalPrice = totalPrice
      }
    },
    mounted: function () {
      this.all()
    }
  }
</script>
