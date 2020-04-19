<template>
  <div>
    <router-link to="/">返回首页</router-link>
    <router-link to="/wanx_index">主页</router-link>
    <router-link to="/wanx_order">订单</router-link>
    <router-link to="/wanx_user">登录</router-link>
    <div class="bus-wrap">
              <table>
                  <tr>
                      <th>
                          <input type="checkbox" @click="check_all" :checked="check_goods.length == buss.length"/>
                      </th>
                      <th>商品名称</th>
                      <th>商品图片</th>
                      <th>商品价格</th>
                      <th>数量</th>
                      <th>操作</th>
                  </tr>
                  <tr v-for="(cart,index) in buss" :key="index">
                      <td>
                        <input type="checkbox" :value="cart.id" v-model="ids" />
                      </td>
                      <td>{{cart.book.title}}</td>
                      <td>
                        <img v-bind:src="'http://image.wanx.com/upload/'+cart.book.img" alt="">
                      </td>
                      <td>{{cart.book.price}}元</td>
                      <td>
                          <input  type="number" v-model="cart.bookCount" />
                      </td>
                      <td>
                          <button  v-on:click="delete_num(cart)">删除</button>
                      </td>
                  </tr>
              </table>
              <div>
                  总计：共 {{buss.length    }}件商品，已选择 {{total_num}} 件
                  <div>
                      合计：{{total_price}}元
                      <button :disabled="check_goods.length <= 0" @click="addOrder()">确认订单</button>
                  </div>
              </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'wanx_bus',
  data () {
    return {
      buss:[],
      bus:{},
      check_goods: [], //已选择的商品
      ids:[]
    }
  },
  created(){
	  this.loadBuss();
  },
  computed: {
    // 总价
    total_price() {
        let price = 0　　　　　　　　　　　　　　　　　　　　　　　　
        this.check_goods.forEach(item => {
      //总价 = 价格 * 数量
            price += Number(item.book.price) * Number(item.bookCount)
        })
        return price
    },
    //数量
    total_num() {
        let t_num = 0;
        this.check_goods.forEach(item => {
            t_num += Number(item.bookCount);
        })
        return t_num
    }
  },
  methods:{
    loadBuss(){
          this.$http.get('/item-bus/bus/getBusList')
          .then(resp => {
            this.buss = resp.data;
          })
      },
    //删除商品
      delete_num(bus){
          // this.check_goods.splice(this.check_goods.indexOf(cart),1)
          // this.buss.splice(this.buss.indexOf(cart),1)
          this.$http.get('/item-bus/bus/del/'+bus.id)
                    .then(resp => {
                        this.loadBuss();
                    })
      },
    //全选
      check_all() {
          if (this.check_goods.length >0) {
              this.check_goods = [];
              this.ids = [];
          } else {
              this.buss.forEach(item => {
                  this.check_goods.push(item);
                  this.ids.push(item.id);
              })
          }
      },
      //添加订单
      addOrder(){
        console.log(this.ids.join(","))
          this.$http.get('/item-bus/bus/addOrder/'+this.ids.join(","))
                    .then(resp => {
                        this.loadBuss();
                    })
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button{
		color: white;
		background: rgb(30, 48, 3);
		width: 100px;
		height: 40px;
	}
table{
    width: 900px;
		height: 400px;
    margin-left: 200px;
}
tr{
    width: 900px;
		height: 50px;
}
th,td{
    width: 100px;
		height: 40px;
    text-align: center;
    vertical-align: middle;
}
input[type=checkbox]{
    width: 30px;
		height: 30px;
}
input[type=number]{
    width: 70px;
		height: 40px;
}
.bus-wrap img{
  width: 200px;
  height: 150px;
}
.bus-wrap {
  text-align: center;
}
</style>
