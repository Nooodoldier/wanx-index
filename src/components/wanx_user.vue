<template>
  <div>
    <router-link to="/">返回首页</router-link>
    <router-link to="/wanx_index">主页</router-link>
		<router-link to="/wanx_bus">购物车</router-link>
    <router-link to="/wanx_order">订单</router-link>

    <div class="login-wrap" v-show="showLogin">
      <h3>登录</h3>
      <input type="text" placeholder="请输入用户名" v-model="bookUser.name">
      <input type="password" placeholder="请输入密码" v-model="bookUser.password">
      <button v-on:click="login">登录</button>
      <span v-on:click="ToRegister">没有账号？马上注册</span>
    </div>

    <div class="register-wrap" v-show="showRegister">
      <h3>注册</h3>
      <input type="text" placeholder="请输入用户名" v-model="bookUser.name">
      <input type="password" placeholder="请输入密码" v-model="bookUser.password">
      <button v-on:click="register">注册</button>
      <span v-on:click="ToLogin">已有账号？马上登录</span>
    </div>
    
    
  </div>
</template>

<style>
.login-wrap {
  text-align: center;
}
.register-wrap {
  text-align: center;
}
input {
  display: block;
  width: 250px;
  height: 40px;
  line-height: 40px;
  margin: 0 auto;
  margin-bottom: 10px;
  outline: none;
  border: 1px solid #888;
  padding: 10px;
  box-sizing: border-box;
}
p {
  color: red;
}
button {
  display: block;
  width: 250px;
  height: 40px;
  line-height: 40px;
  margin: 0 auto;
  border: none;
  background-color: #41b883;
  color: #fff;
  font-size: 16px;
  margin-bottom: 5px;
}
span {
  cursor: pointer;
}
span:hover {
  color: #41b883;
}
</style>

<script>
export default {
  data() {
    return {
      showLogin: true,
      showRegister: false,
      bookUser:{
        name: '',
        password: '',
      },
    }
  },
  methods: {
   login() {
      if (this.bookUser.name === '' || this.bookUser.password === '') {
        alert('请输入用户名或密码')
      }else{
        const {name, password, ...params} = this.bookUser;
          params.name = name;
          params.password = password;
        this.$http.post('/item-user/user/login/', this.$qs.stringify(params))
        .then(resp => {
            console.log(resp.data);
            if(resp.data != null && resp.data.name == this.bookUser.name && resp.data.password == this.bookUser.password){
              alert('登录成功！')
              this.$router.push({
                path: '/wanx_index'
              })
            }else{
              alert('登录失败！')
            }
         
        })
      }
    },
    register() {
      if (this.bookUser.name === '' || this.bookUser.password === '') {
        alert('请输入用户名或密码')
      } else {
        const {name, password, ...params} = this.bookUser;
        params.name = name;
        params.password = password;
        this.$http.post('/item-user/user/register/', this.$qs.stringify(params))
        .then(resp => {
          alert('注册成功，请登录')
           this.ToLogin();
        })
      }
    },
    ToLogin() {
      this.showRegister = false
      this.showLogin = true
    },
    ToRegister() {
      this.showRegister = true
      this.showLogin = false
    }
  }
}
</script>

