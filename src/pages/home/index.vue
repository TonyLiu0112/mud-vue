<template>
  <div>
    <baseHeader></baseHeader>
    <div>
      <h2>{{ welcome }}！</h2>
    </div>
  </div>
</template>

<script>
  import baseHeader from '../../components/header.vue'

  const homeData = {
    welcome: '欢迎来到Microservice项目实战',
    img: '',
    show: false
  }

  export default {
    components: {baseHeader},
    name: 'home_index',
    data () {
      return homeData
    },
    methods: {
      goProduct: function () {
        this.$router.push('/product/detail')
      }
    }
  }
</script>
