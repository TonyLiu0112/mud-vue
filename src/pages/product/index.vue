<template>
  <baseHeader>
    <div slot="content">
      <div id="recommendation">
        <recommendation-set></recommendation-set>
      </div>
      <br>
      <div id="product">这里是产品信息</div>
      <br>
      <div id="review">
        <revew-set></revew-set>
      </div>
      <br>
    </div>
  </baseHeader>
</template>

<script>
  import baseHeader from '../../components/header.vue'
  import recommendationSet from '../recommendation/list.vue'
  import revewSet from '../review/list.vue'

  export default {
    components: {baseHeader, recommendationSet, revewSet},
    name: 'product_details'
  }
</script>
