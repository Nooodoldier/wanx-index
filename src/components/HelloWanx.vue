<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <router-link to="/wanx_index">书城主页</router-link>
    <router-link to="/wanx_bus">购物车</router-link>
    <router-link to="/wanx_order">订单</router-link>
    <router-link to="/wanx_user">登录</router-link>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '万象书城'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
