<template>
  <div id="order">
    <router-link to="/">返回首页</router-link>
    <router-link to="/wanx_index">主页</router-link>
		<router-link to="/wanx_bus">购物车</router-link>
    <router-link to="/wanx_user">登录</router-link>
          <div class="order-wrap">
              <ul>
                <li>
                  <table id="order_table">
                    <tr>
                      <td>收货人:</td><td><input type="text" placeholder="请输入收货人" required v-model="order.receiver"></td>
                      <td>所在地区:</td><td><input type="text" placeholder="请输入所在地区" required v-model="order.area"></td>
                    </tr>
                    <tr>
                      <td>详细地址:</td><td><input type="text" placeholder="请输入详细地址" required v-model="order.address"></td>
                      <td>手机号码:</td><td><input type="text" placeholder="请输入手机号码" required v-model="order.tel"></td>
                    </tr>
                  </table>
                </li>
                <li>
                  <table>
                    <tr>
                      <td>
                          <input type="checkbox" @click="check_all" :checked="check_orders.length == orders.length"/>
                      </td>
                      <td>订单编号</td>
                      <td>金额</td>
                    </tr>
                    <tr v-for="(o ,index) in orders" :key="index">
                      <td><input type="checkbox" :value="o.id" v-model="ids" /></td>
                      <td>{{o.orderNumber}}</td>
                      <td>{{o.totalPrice}}元</td>
                    </tr>
                  </table>
                </li>
              </ul>
              <div id="footer"><span :disabled="check_orders.length <= 0" v-on:click="goCharge()">提交订单</span></div>
          </div>
    
  </div>
</template>

<style>
.order-wrap {
  text-align: center;
}
li{
  padding: 25px;
  list-style: none;
  margin: 25px;
  border: 1px solid #eee;
  width: 1000px;
  height:auto;
}
#footer span{
  color: white;
  background:green;
  width: 100px;
  height: 30px;
  vertical-align: middle;
  text-align: center;
  float: right;
  margin-right: 220px;
}
td{
  text-align: center;
  width: 300px;
  height: 20px;
}
#order_table input{
  width: 300px;
  height: 30px;
}

#footer{
  height: 100px;
}

</style>

<script>
export default {
  name: 'wanx_order',
  data() {
    return {
      orders:[],
      order:{
        ids:'',
        receiver:'',
        area:'',
        address:'',
        tel:''
      },
      check_orders:[],
      ids:[]
    }
  },
  created(){
	this.loadOrders();
  },
  methods:{
    loadOrders(){
      this.$http.get('/item-order/order/getOrderList')
			.then(resp => {
				this.orders = resp.data;
			})
    },
    check_all() {
          if (this.check_orders.length >0) {
              this.check_orders = [];
              this.ids = [];
          } else {
              this.orders.forEach(item => {
                  this.check_orders.push(item);
                  this.ids.push(item.id);
              })
          }
      },
      goCharge(){
          if(this.order.receiver == ''){
            alert("请填写收件人!")
          }else if(this.order.area == ''){
            alert("请填写收件人所在地区!")
          }else if(this.order.address == ''){
            alert("请填写收件人详细地址!")
          }else if(this.order.tel == ''){
            alert("请填写收件人联系电话!")
          }else if(this.ids.length <= 0){
            console.log(this.ids.length)
            alert("请选择订单!")
          }else{
              const {ids,receiver,area,address,tel, ...params} = this.order;
                params.receiver = receiver;
                params.area = area;
                params.address = address;
                params.tel = tel;
                params.ids = this.ids.join(",");
              this.$http.post('/item-order/order/updateOrder/', this.$qs.stringify(params))
              .then(resp => {
                if(resp.data != null){
                    alert("下单成功!")
                }else{
                    alert('下单失败！')
                }
              })
          }
          
         
      }
  }
}
</script>

