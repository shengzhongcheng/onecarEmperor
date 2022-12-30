<template>
	<view>
		<!-- 顶部分类 -->
		<view class="topclasslist">
			<view class="topclasstext" v-for="(item,index) in topnavlist" :key="index" :class="{border_bot:topnav == index}" @click="classtop(index)">
				<view class="">{{item.name}}</view>
			</view>
		</view>
		<!-- 订单列表 -->
		<view class="gradordlist" v-for="(item,index) in pricelist" :key="index" >
			<!-- 订单用户信息 -->
			<view class="gradhead">
				<view class="gradhead_left">
					<image :src="getImgsrc(item.user.avatar)" mode=""></image>
					<view class="gradusername">
						<view>{{item.user.nickname}}</view>
					</view>
				</view>
				<view class="gradhead_right">
					<view class="red" v-show="item.status == 2">待派单</view>
					<view class="blue"  v-show="item.status == 3 && item.type == 2">已派单</view><!--type1用户上门2商家上门  -->
					<view class="red" v-show="item.status == 5">已完成</view>
					<view class="red" v-show="item.status == 6">已售后</view>
					<view class="org" v-show="item.status == 3 && item.type == 1">用户到店</view>
				</view>
			</view>
			<!-- 订单详情 -->
			<view class="ordsxx">
				<view class="shopinfor">
					<!-- <view class="shopinfortext">商品信息</view> -->
					<view class="shopinfor_letft">
						<image v-if="indexclass == 1" :src="getImgsrc(item.image)" mode=""></image>
						<image v-if="indexclass == 0" :src="getImgsrc(item.serimage)" mode=""></image>
						<view class="shopinfor_right">
							<view class="tit" v-if="indexclass == 1">{{item.cate.catename}}</view>
							<view class="tit" v-if="indexclass == 0">{{item.title}}</view>
							<view class="shopguige" v-show="indexclass != 1"><text>数量：{{item.num}}份</text> </view>
						</view>
						<view class="shopmoney">
							￥<text>{{item.amount || item.total_price}}</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 订单时间 -->
			<view class="ordstime">
				<view class="ortime">
					<view>支付时间：{{item.paytime | timeAgo}}</view>
				</view>
				<view class="goords" ><!-- @click="remords(index)" -->
					<view class="oreinfor" @click="navtoordinfor(item.status,item)">订单详情</view>
					<!-- <text class="dian"></text><text class="dian"></text><text class="dian"></text> -->
				</view>
				<!-- 弹出框 -->
				<!-- <view class="ordsrem" v-show="index == remordstf?true:false">
					<view class="" @click="navtoordinfor(item.status,item)">订单详情</view>
					<view class="">删除订单</view>
				</view> -->
			</view>
			
		</view>
		
		<!-- 提示是否有订单信息 -->
			<view class="trfaOrd" v-if="pricelist.length == 0 ">
				<u-empty
				        mode="order"
						text="您还没有收到订单信息哦~~"
				        icon="http://cdn.uviewui.com/uview/empty/order.png"
				>
				</u-empty>
			</view>
			
			
		<!-- 占位 -->
		<view class="zw">
			
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				/* 顶部分类 */
				topnavlist:[
					{'name':'全部'},
					{'name':'待派单'},
					{'name':'已派单'},
					{'name':'已完成'},//评价按钮
					{'name':'售后订单'},
				],
				
				topnavshop:[
					{'name':'全部'},
					{'name':'未发货'},
					{'name':'已发货'},
					{'name':'已完成'},//评价按钮
					{'name':'售后订单'},
				],
				/* 头部导航栏是否切换 */
				topnav:0,
				/* 订单状态 */
				ordsstatus:false,
				/* 是否显示删除 */
				remordstf:null,
				//接受一口价订单列表
				pricelist:[],
				//接收订单按钮传递的值
				indexclass:null,
				//列表数据替换
				allpers:[]
			}
		},
		onLoad(indexclass){
			console.log(indexclass)
			this.indexclass = indexclass.indexclass
			/* 不同订单按钮拿到不同数据 */
			if(indexclass.indexclass == 2){//等于2就是点击商城订单进入的,切换导航栏内容
				this.topnavlist = this.topnavshop
				console.log(indexclass)
			}else if(indexclass.indexclass == 0){//等于0就是点击一口价订单进入的,切换导航栏
				this.getoneordlist()
			}else if(indexclass.indexclass == 1){//等于1就是点击议价订单进入的,切换导航栏
				this.getyijia()
			}
		},
		onShow() {
			console.log(this.indexclass)
			if(this.indexclass == 0){//如果是一口价订单页面显示那么调用一口价列表的值
				this.getoneordlist()
				this.topnav = 0
			}
		},
		methods: {
			//如果是一口价订单进入那么就获取一口价订单列表
			async getoneordlist(){
				const req = await uni.$http.get('api/jiu/order/pricelist',{//一口价全部订单
					user_id:uni.getStorageSync('user_id')
				})
				this.pricelist = req.data.data.action
				this.allpers = req.data.data.action
				console.log('一口价全部订单列表',req)
			},
			//议价订单列表
			async getyijia(){
				const req = await uni.$http.get('api/jiu/order/barginlist',{//一口价全部订单
					user_id:uni.getStorageSync('user_id')
				})
				this.pricelist = req.data.data.action
				this.allpers = req.data.data.action
				console.log('议价订单',req)
			},
			
			
			/* 跳转到订单详情 */
			navtoordinfor(status,item){
				// console.log(status)
				if(this.indexclass == 0 && status == 2){//如果ststus是2那么就是未派单，订单详情去未派单页面
					uni.navigateTo({
						url:'../ordsstatus/ordsstatus?id='+item.id
					})
				}else if(this.indexclass == 0 && status == 3){//如果ststus是3那么就是已派单，订单详情去已派单页面
					uni.navigateTo({
						url:'../ordsgo/ordsgo?id='+item.id
					})
				}else if(this.indexclass == 0 && status == 5){//如果ststus是5那么就是已完成，订单详情去已完成
					uni.navigateTo({
						url:'../ordsing/ordsing?id='+item.id
					})
				}else if(this.indexclass == 0 && status == 6){//如果ststus是5那么就是已完成，订单详情去已完成
					uni.navigateTo({
						url:'../ordsshohou/ordsshohou?id='+item.id
					})
				}
				
				//议价订单
				if(this.indexclass == 1 && status == 2){
					uni.navigateTo({
						url:'../ordsstatus/ordsstatus?id='+item.id+'&status='+item.status+'&zt=1'
					})
				}else if(this.indexclass == 1 && status == 3){//如果ststus是3那么就是已派单，订单详情去已派单页面
					uni.navigateTo({
						url:'../ordsgo/ordsgo?id='+item.id+'&status='+item.status+'&zt=1'
					})
				}else if(this.indexclass == 1 && status == 5){//如果ststus是5那么就是已完成，订单详情去已完成
					uni.navigateTo({
						url:'../ordsing/ordsing?id='+item.id+'&status='+item.status+'&zt=1'
					})
				}else if(this.indexclass == 1 && status == 6){//如果ststus是5那么就是已完成，订单详情去已完成
					uni.navigateTo({
						url:'../ordsshohou/ordsshohou?id='+item.id+'&status='+item.status+'&zt=1'
					})
				}
				
			},
			/* 导航栏分类点击 */
			async classtop(index){
				this.topnav = index
				console.log('判断',this.indexclass)
				this.pricelist = []
				if(this.indexclass == 0 && this.topnav == 1){//是一口价订单的同时也是待派单分类
				console.log('我是待派单')
					this.pricelist = []
					let pri = []
					for(let i in this.allpers){
						if(this.allpers[i].status == 2){
							pri.push(this.allpers[i])
						}
					}
					this.pricelist = pri
					
				}else if(this.indexclass == 0 && this.topnav == 2){//是一口价订单的同时也是已派单分类
					console.log('我是已派单')
					this.pricelist = []
					let pri = []
					for(let i in this.allpers){
						if(this.allpers[i].status == 3){
							pri.push(this.allpers[i])
						}
					}
					this.pricelist = pri
					
				}else if(this.indexclass == 0 && this.topnav == 0){//是一口价订单的同时也是全部分类
					console.log('我是全部')
					this.getoneordlist()
				}else if(this.indexclass == 0 && this.topnav == 3){//是一口价订单的同时也是已完成分类
					console.log('我是已完成')
					this.pricelist = []
					let pri = []
					for(let i in this.allpers){
						if(this.allpers[i].status == 5){
							pri.push(this.allpers[i])
						}
					}
					this.pricelist = pri
				}else if(this.indexclass == 0 && this.topnav == 4){//是一口价订单的同时也是售后分类
					console.log('我是已完成')
					this.pricelist = []
					let pri = []
					for(let i in this.allpers){
						if(this.allpers[i].status == 6){
							pri.push(this.allpers[i])
						}
					}
					this.pricelist = pri
					// console.log(this.pricelist)
				}
				
				//议价订单
				if(this.indexclass == 1 && this.topnav == 1){//是一口价订单的同时也是待派单分类
				console.log('我是待派单')
				this.pricelist = []
					let pri = []
					for(let i in this.allpers){
						if(this.allpers[i].status == 2){
							pri.push(this.allpers[i])
						}
					}
					this.pricelist = pri
					
				}else if(this.indexclass == 1 && this.topnav == 2){//是一口价订单的同时也是已派单分类
					console.log('我是已派单')
					this.pricelist = []
					let pri = []
					for(let i in this.allpers){
						if(this.allpers[i].status == 3){
							pri.push(this.allpers[i])
						}
					}
					this.pricelist = pri
					
				}else if(this.indexclass == 1 && this.topnav == 0){//是一口价订单的同时也是全部分类
					console.log('我是全部')
					this.getyijia()
				}else if(this.indexclass == 1 && this.topnav == 3){//是一口价订单的同时也是已完成分类
					console.log('我是已完成')
					this.pricelist = []
					let pri = []
					for(let i in this.allpers){
						if(this.allpers[i].status == 5){
							pri.push(this.allpers[i])
						}
					}
					this.pricelist = pri
				}else if(this.indexclass == 1 && this.topnav == 4){//是一口价订单的同时也是售后分类
					console.log('我是已完成')
					this.pricelist = []
					let pri = []
					for(let i in this.allpers){
						if(this.allpers[i].status == 6){
							pri.push(this.allpers[i])
						}
					}
					this.pricelist = pri
				}
				
				
				
			},
			
			
			/* 三个点 */
			remords(index){
				if(index == this.remordstf){//点击一次显示再点击一次隐藏
					this.remordstf = null
					console.log(this.remordstf)
				}else{
					this.remordstf = index
				}
			},
			//跳转订单完成页
			over(){
				uni.navigateTo({
					url:'../ordsover/ordsover'
				})
			},
			ing(){
				uni.navigateTo({
					url:'../ordsing/ordsing'
				})
			}
			
		}
	}
</script>
<style >
	page{
		background-color: #f3f3f3;
	}
</style>

<style scoped lang="scss">
	.dian{
		padding: 1rpx 1rpx;
		background-color: #14be0e;
		display: inline-block;
		height: 5rpx;
		width: 5rpx;
		margin-bottom: 8rpx;
		margin-right: 16rpx;
		border-radius: 50%;
	}
	.border_bot{
		border-bottom: 4rpx solid #2bb381;
	}
	.red{
		color: #f6452b;
	}
	.blue{
		color: #23cece;
	}
	.org{
		color: orange;
	}
	.topclasslist{
		width: 90%;
		margin: auto;
		display: flex;
		justify-content: space-between;
		// border-bottom: 1rpx solid gainsboro;
		padding-bottom: 15rpx;
		.topclasstext{
			padding-bottom: 10rpx;
		}
	}
	.gradordlist{
		background-color: white;
		width: 90%;
		// height: 400rpx;
		padding-bottom: 20rpx;
		margin:30rpx auto;
		border-radius: 20rpx;
		box-shadow:0rpx 0rpx  3rpx 3rpx #e3e3e3;
		.gradhead{
			display: flex;
			justify-content: space-between;
			border-bottom: 1rpx solid gainsboro;
			padding: 10rpx 20rpx;
			.gradhead_left{
				display: flex;
				image{
					height: 80rpx;
					width: 80rpx;
					border-radius: 50%;
				}
				.gradusername{
					margin-top: 20rpx;
					margin-left: 20rpx;
				}
			}
			.gradhead_right{
				margin-top: 20rpx;
				color: green;
			}
			
		}
		.ordsxx{
			width: 100%;
			margin:20rpx auto;
			border-bottom: 1rpx solid gainsboro;
			padding-bottom: 20rpx;
			.shopinfortext{
				margin: 10rpx 20rpx;
			}
			.shopinfor{
				width: 100%;
				.shopinfor_letft{
					margin-left: 20rpx;
					display: flex;
					image{
						flex: 1;
						width: 100rpx;
						height: 100rpx;
						border-radius: 20rpx;
					}
					.shopinfor_right{
						margin-left: 20rpx;
						flex: 2;
						.tit{
							  display: inline-block;
							  white-space: nowrap; 
							  width: 288rpx;
							  overflow: hidden;
							  text-overflow:ellipsis;
						}
						.shopguige{
							margin-top: 15rpx;
							color: #787878;
							font-size: 20rpx;
						}
					}
					.shopmoney{
						flex: 1;
						margin-left: 80rpx;
						margin-top: 10rpx;
						padding-top: 20rpx;
						// margin-right: 20rpx;
						text{
							font-size: 30rpx;
						}
					}
				}
			}
		}
		.ordstime{
			position: relative;
			width: 90%;
			display: flex;
			justify-content: space-between;
			margin: auto;
			.ortime{
				color: #787878;
			}
			.goords{
				padding: 5rpx 40rpx;
				padding-bottom: 10rpx;
				border-radius: 20rpx;
			}
			.oreinfor{
				color: #14be0e;
			}
			.ordsrem{
				position: absolute;
				right: -34rpx;
				bottom: -146rpx;
				width: 200rpx;
				box-shadow:0rpx 0rpx  3rpx 3rpx #e3e3e3;
				border-radius: 20rpx;
				background-color: white;
				view{
					padding: 20rpx 10rpx;
					text-align: center;
					border-bottom: 1rpx solid #e3e3e3;
				}
			}
		}
	}
	.trfaOrd{
		width: 90%;
		margin:100rpx auto;
		text-align: center;
		color: #787878;
	}
	.zw{
		height: 300rpx;
	}
</style>
