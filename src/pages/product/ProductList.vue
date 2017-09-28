<template>
  <div>
    <base-header></base-header>
    <div>

      <table style="margin: auto;" border="1">
        <tr>
          <td>产品名称</td>
          <td>产品价格</td>
          <td>操作</td>
        </tr>
        <tr v-for="product in products" :id="product.id">
          <td>{{ product.name }}</td>
          <td>RMB: {{ product.price }} 元</td>
          <td>
            <button @click="showDetail(product.id)">查看明细</button>
          </td>
        </tr>
        <tr v-if="!hasProduct">
          <td colspan=3>{{ message }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  import _content from '../../../static/content'
  import _fetch from '../../../static/fetch.helper'
  import baseHeader from '../../components/header.vue'

  export default {
    components: {baseHeader},
    name: 'ProductList',
    data: function () {
      return {
        products: [],
        hasProduct: false,
        message: ''
      }
    },
    methods: {
      search: function (content) {
        if (content.trim() === '') {
          this.emptyList('请输入您要查询的产品信息')
          return
        }
        const uri = (_content.API_PATH.URI + 'shelf/find/products/%s').replace('%s', content)
        fetch(uri, _fetch.options.get())
          .then(response => {
            const status = response.status
            if (status === 200) {
              return response.json()
            }
            if (status === 404) {
              this.emptyList('未找到产品信息!')
            }
            if (status === 500) {
              this.emptyList('内部服务错误!')
            }
            throw Error(response.statusText)
          })
          .then(json => {
            console.log('正在处理...')
            this.products = json.data.list
            this.hasProduct = !!this.products
            if (!this.hasProduct) {
              this.emptyList('未找到产品信息!')
            }
          })
          .catch(errorMsg => { console.error(errorMsg) })
        console.log('nihao')
      },
      emptyList: function (msg) {
        this.products = []
        this.hasProduct = false
        this.message = msg
      },
      showDetail: function (id) {
        this.$router.push({path: '/product/detail', query: {pId: id}})
      }
    },
    mounted: function () {
      this.search(this.$router.currentRoute.query.searchContent)
    },
    watch: {
      '$route' (to, from) {
        this.search(this.$router.currentRoute.query.searchContent)
      }
    }
  }
</script>
