<template>
	<div>
		<router-link to="/">返回首页</router-link>
		<router-link to="/wanx_bus">购物车</router-link>
    <router-link to="/wanx_order">订单</router-link>
    <router-link to="/wanx_user">登录</router-link>
		<div id="index">
			<ul>
				<li v-for="(v ,index) in books" :key="index">
					<img v-bind:src="'http://image.wanx.com/upload/'+v.img" alt="">
					<p>{{v.title}}/{{v.describe}}</p>
					<p style="color:red">{{v.price}}元</p>
					<button  @click="addBus(v)">加入购物车</button>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
  name: 'wanx_index',
  data () {
    return {
		books:[],
		book:{}
		}
  },
  created(){
	this.loadBooks();
  },
  methods:{
	  loadBooks(){
		  this.$http.get('/item-store/store/getBookList')
			.then(resp => {
				this.books = resp.data;
			})
	  },
	  addBus(book){
			this.$http.get('/item-store/store/addBus/'+book.id)
			.then(resp => {
				this.$router.push({
          path: '/wanx_bus'
        })
			})
	  }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	#index ul{
		display: flex;
		flex-wrap: wrap;
	}
	#index li{
		padding: 3px;
		list-style: none;
		margin: 15px;
		border: 1px solid #eee;
		width: 200px;
		height: 300px;
	}
	#index img{
		width: 200px;
		height: 150px;
	}
	button{
		color: white;
		background: rgb(30, 48, 3);
		width: 200px;
		height: 40px;
	}
	#index{
		text-align: center;
	}
</style>

