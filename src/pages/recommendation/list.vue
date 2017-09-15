<template>
  <div style="border: 1px solid gainsboro; margin: 1px 0;">
    <h2>推荐列表</h2>
    <table style="margin: auto;" border="1">
      <tr>
        <th>图片</th>
        <th>名称</th>
        <th>价格</th>
      </tr>
      <tr v-for="rec in recommendations" :id="rec.productId">
        <th></th>
        <th>{{ rec.product.name }}</th>
        <th>¥ {{rec.product.price }}</th>
      </tr>
    </table>
    <br>
  </div>
</template>

<script>
  export default {
    name: 'recommendation_list',
    props: ['recommendations']
  }
</script>
