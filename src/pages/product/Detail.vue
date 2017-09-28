<template>
  <div>
    <baseHeader></baseHeader>
    <div id="recommendation">
      <recommendation-set :recommendations="recommendations.data"></recommendation-set>
    </div>
    <br>
    <div id="product" style="border: 1px solid gainsboro; margin: 1px 0;">
      <h2>产品详情</h2>
      <div>{{ product.image }}</div>
      <div>
        <h4>商品名称</h4>
        {{ product.name }}
      </div>
      <div><h4>售价</h4> ¥ {{ product.price }} 人民币</div>
      <div><h4>商品描述</h4> {{ product.productDesc }}</div>
      <div><h4>分类</h4>{{ product.tag }}</div>
    </div>
    <br>
    <div id="review">
      <review-set></review-set>
    </div>
    <br>
  </div>
</template>
<script>
  import _content from '../../../static/content'
  import _fetch from '../../../static/fetch.helper'
  import baseHeader from '../../components/header.vue'
  import recommendationSet from '../recommendation/list.vue'
  import reviewSet from '../review/list.vue'

  export default {
    components: {baseHeader, recommendationSet, reviewSet},
    name: 'product_details',
    data () {
      return {
        product: {image: '默认图片.jpg'},
        recommendations: {}
      }
    },
    methods: {
      getProduct: function (pId) {
        const uri = _content.API_PATH.URI + 'shelf/products/' + pId
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
            this.product = json.data.product
            this.recommendations.data = json.data.recommendations
            if (!this.product.image) {
              this.product.image = '默认图片.jpg'
            }
          })
      }
    },
    mounted: function () {
      this.getProduct(this.$router.currentRoute.query.pId)
    }
  }
</script>
