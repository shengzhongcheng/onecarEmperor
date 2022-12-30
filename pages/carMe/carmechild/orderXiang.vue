<template>
	<view class="orderXiang">
		
		<view class="orderMap" @click="addRess" v-if="pageMessage.adres == null && pageMessage.status != 4" >
			<view class="left">
				<image src="@/static/image/map.png" mode=""></image>
				<view class="div">
					<view class="p1">
						{{mapInfo.city || ''}}{{mapInfo.detail || ''}}
					</view>
					<view class="p2">{{mapInfo.real_name || ''}}<text>{{mapInfo.phone || ''}}</text></view>
				</view>
			</view>
			<view class="right">
				<image src="/static/image/right_skip.png" mode=""></image>
			</view>
		</view>
		<view class="orderMap"  v-if="pageMessage.adres != null && pageMessage.status != 4">
			<view class="left">
				<image src="@/static/image/map.png" mode=""></image>
				<view class="div">
					<view class="p1">
						{{pageMessage.adres.city}}{{pageMessage.adres.detail}}
					</view>
					<view class="p2">{{pageMessage.adres.real_name}}<text>{{pageMessage.adres.phone}}</text></view>
				</view>
			</view>
			<view class="right">
				<image src="/static/image/right_skip.png" mode=""></image>
			</view>
		</view>
		
		
		<view class="orderTop">
			<!-- <view class="top">
				<image src="@/static/image/dianpu2.png" mode=""></image>
				<text>{{orderData.ser_adres}}</text>
			</view> -->
			<view class="o-left">
				<image :src="$jointImage(pageMessage.server.serimage)" mode=""></image>
			</view>
			<view class="o-right">
				<view class="p1">{{pageMessage.server.title}}</view>
				<view class="p2">数量：{{pageMessage.num}}</view>
				<view class="p3"><text>￥{{pageMessage.money}}</text><text></text></view>
			</view>
		</view>
		<view class="divOne" v-if="pageMessage.status == 1">
			<view class="left">
				上门服务
			</view>
			<view class="right">
					<picker mode="selector" @change="typeall" :value="indexF" :range="type">
						<view class="uni-input">{{type[indexF]}}</view>
					</picker>
				<image src="@/static/image/youyou.png" mode=""></image>
			</view>
		</view>
		<view class="o-title">
			付款方式
		</view>
		<view class="o-content">
			<!-- <view class="cont">
				<view class="clist" >
					<text>收货人</text>
					<text>{{pageMessage.adres.real_name}}</text>
				</view>
			</view>
			<view class="cont">
				<view class="clist">
					<text>手机号</text>
					<text>{{pageMessage.adres.phone}}</text>
				</view>
			</view>
			<view class="cont">
				<view class="clist" v-if="pageMessage.adres">
					<text>地址</text>
					<text>{{pageMessage.adres.city}}{{pageMessage.adres.detail}}</text>
				</view>
			</view> -->
			<view class="cont">
				<view class="clist">
					<text>下单时间</text>
					<text>{{pageMessage.uptime | timeAgo}}</text>
				</view>
			</view>
			<view class="cont" v-if="pageMessage.type == 1">
				<view class="clist">
					<text>上门服务</text>
					<text>用户上门</text>
				</view>
			</view>
			<view class="cont" v-if="pageMessage.type == 2">
				<view class="clist">
					<text>上门服务</text>
					<text>商家上门</text>
				</view>
			</view>
<!-- 			<view class="cont">
				<view class="clist">
					<text>付款方式</text>
					<text>在线支付</text>
				</view>
			</view> -->
			<view class="cont">
				<view class="clist">
					<text>商品总额</text>
					<text>￥{{pageMessage.total_price || ''}}</text>
				</view>
			</view>
		</view>
	
		<view class="o-money">
			<text v-if="pageMessage.status == 6">退款金额: ￥{{pageMessage.money}}</text>
			<text v-else>实付金额: ￥{{pageMessage.money}}</text>
		
		</view>
		
		<view class="submitFixed" v-if="pageMessage.status == 1" @click="goPay">去支付</view>
		<view class="submitFixed" v-else-if="pageMessage.status == 2">待发货</view>
		<view class="submitFixed" v-else-if="pageMessage.status == 3" @tap="shouhuo">确认收货</view>
		<view class="submitFixed" v-else-if="pageMessage.status == 4" @tap="open">待评价</view>
		<view class="submitFixed" v-else-if="pageMessage.status == 5">已完成</view>
		<view class="submitFixed" v-else="pageMessage.status == 6">已退款</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				userId:uni.getStorageSync('UID') || '', //用户ID
				// 订单数据
				pageMessage:{},
				// 订单详情id
				xiangID: '',
				//服务id
				fuwuid:'',
				//订单id
				dingdanid:'',
				// 地址id 
				adreID: '',
				// 金额
				money: '',
				//跳转返回的地址
				mapInfo:[],
				//选择上门
				type: ['用户上门','商家上门'],
				indexF: 0,
				Type:1,
			}
		},
		onShow() {
			let pages = getCurrentPages()
			let currPage = pages[pages.length - 1]
			let info = JSON.parse(currPage.info)
			console.log('携带', info)
			this.mapInfo = info
			this.adreID = info.id //地址id
		},
		
		methods:{
			//订单收货
			async shouhuo(){
				const req = await uni.$http.post('api/jiu/Orderform/queren',{
					id:this.dingdanid
				})
				uni.showToast({
					icon:"none",
					title:req.data.msg,
					success: () => {
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						},1000)
					}
				})
			},
			
			//评论页
			 open(){
			     uni.navigateTo({
			     	url:'/pages/pingjia/pingjia?fuwuid='+this.fuwuid+'&dingdanid='+this.dingdanid
			     })
			},
			//上门选择
			
			typeall(e) {
				if(e.detail.value==1) {
					this.Type = 2
					console.log(	this.Type )
				} else if (e.detail.value==0){
					this.Type = 1
					console.log(	this.Type )
				}
				// console.log('picker发送选择改变，携带值为', e.detail.value)
				this.indexF = e.detail.value
				// console.log('fc',this.indexF)
			},
			// 选择地址
			addRess() {
				console.log('123123')
				uni.navigateTo({
					// url:'../carMe/carmechild/receiving'
					url:'./receiving?boole='+true,
				})
			},
			
			// 去支付
			// #ifdef MP-WEIXIN
			
			goPay() {
				let that = this
				let p = {
					id: that.xiangID,
					user_id: that.userId,
					adres: that.adreID,
					money: that.money,
					type:'miniapp'
				}
				console.log('ooo', that.xiangID,that.userId,that.adreID,that.money)
				console.log('rrrr', p)
				
				if(this.adreID != null){
					that.$http.serverpay(p)
					.then(res=> {
						console.log('去下单页', res)
						if (res.data.msg =="支付成功") {
							console.log('9999')
							uni.requestPayment({
							  provider: 'wxpay',
							  timeStamp: res.data.data.pay.timeStamp,
							  nonceStr: res.data.data.pay.nonceStr,
							  package: res.data.data.pay.package,
							  signType: res.data.data.pay.signType,
							  paySign: res.data.data.pay.paySign,
							 success: (res) => {
							 	uni.showToast({
							 		icon:"none",
							 		title:'支付成功',
							 		success: () => {
							 			setTimeout(()=>{
							 				uni.navigateBack({
							 					delta:1
							 				})
							 			},1000)
							 			
							 		}
							 	})
							 	
							 },
							  fail: function(err) {
							  	
							  	uni.showToast({
							  		icon:"none",
							  		title:'支付失败',
							  		
							  	})
							  	
							  },
							  
							})
						}
					})
				}else{
					uni.showToast({
						icon:"none",
						title:'请选择地址'
					})
				}
				
			},
			
			// #endif
			
			// #ifdef APP
			
			async goPay() {
				let that = this
				let p = {
					id: that.xiangID,
					user_id: that.userId,
					adres: that.adreID,
					money: that.money,
					type:'app'
				}
				console.log('地址id',this.adreID)
				if(this.adreID != null){
					const req = await uni.$http.get('api/jiu/orderform/serverpay',p)
					console.log('支付',req)
					if(req.data.msg == "支付成功"){
						console.log(req.data.msg)
						uni.requestPayment({
									"provider": "wxpay",
									"orderInfo": {
									    "appid": req.data.data.pay.appid ,  // 微信开放平台 - 应用 - AppId，注意和微信小程序、公众号 AppId 可能不一致
									    "noncestr": req.data.data.pay.noncestr, // 随机字符串
									    "package": req.data.data.pay.package,        // 固定值
									    "partnerid": req.data.data.pay.partnerid,      // 微信支付商户号
									    "prepayid": req.data.data.pay.prepayid, // 统一下单订单号 
									    "timestamp": req.data.data.pay.timestamp,        // 时间戳（单位：秒）
									    "sign":req.data.data.pay.sign // 签名，这里用的 MD5/RSA 签名
									},
									success: (res) => {
										uni.showToast({
											icon:"none",
											title:'支付成功',
											success: () => {
												setTimeout(()=>{
													uni.navigateBack({
														delta:1
													})
												},1000)
												
											}
										})
										
									},
									fail: function(err) {
										
										uni.showToast({
											icon:"none",
											title:'支付失败',
											
										})
										
									}
								})
					
					}
				}else{
					uni.showToast({
						icon:"none",
						title:'请选择地址'
					})
				}
				
			},
			
			
			// #endif
			
			
			// 订单详情页
			wayGetOrderMessage(){
				let _this = this 
				let a = {
					id:_this.xiangID
				}
				console.log('订单id', a)
				_this.$http.pridetail(a)
				.then(res=>{
					console.log('订单详情',res)
					_this.fuwuid = res.data.data.action.server_id//服务id
					_this.dingdanid = res.data.data.action.id//订单id
					_this.pageMessage = res.data.data.action
					_this.adreID = res.data.data.action.user_adres_id
					_this.money = res.data.data.action.money
					
				})
			}
		},
		//获取默认地址
		// wayDefaultMap(){
		// 	let _this = this 
		// 	_this.$http.postDefaultMap({uid:_this.UserID})
		// 	.then(res=>{
		// 		console.log('默认地址',res)
		// 		_this.mapInfo = res.data.data
		// 		_this.adResID = res.data.data.id
		// 		console.log('地址ID',_this.adResID)
		// 	})
		// },
		// 时间戳的处理
		// filters: {
		// 	formatData: function(value) {
		// 		var that = this
		// 		var date = new Date(parseInt(value + '000'))
		// 		var year = date.getFullYear()
		// 		var month = date.getMonth()+1
		// 		var sdate = date.getDate()
		// 		var hour = date.getHours()
		// 		if (hour < 10) 
		// 		hour = "0"+hour
		// 		var minute = date.getMinutes()
		// 		if (minute < 10)
		// 		minute = "0" + minute
		// 		var second = date.getSeconds()
		// 		if (second < 10)
		// 		second = "0" + second
		// 		var time =year+"-"+month+"-"+sdate+"-"+hour+":"+minute+":"+second
		// 		console.log("时间", time)
		// 		return time
				
		// 	}
		// },
		onLoad(option){
			console.log('option', option)
			this.xiangID = option.id
			console.log('order',this.xiangID)
			this.wayGetOrderMessage()
			// this.wayDefaultMap()
		}
	}
</script>

<style>
	page{
			background-color: #f6f6f6;
	}
</style>
<style lang="scss" scoped>
	.orderXiang{
		width: 100%;
		padding-top: 4rpx;
		
		.orderMap {
			width: 690rpx;
			margin: 30rpx auto;
			background-color: #fff;
			border-radius: 30rpx;
			box-sizing: border-box;
			padding: 20rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
		
			.left {
				display: flex;
		
				image {
					width: 40rpx;
					height: 40rpx;
				}
		
				.div {
					width: 510rpx;
					margin-left: 20rpx;
		
					.p1 {
						margin-bottom: 10rpx;
					}
		
					.p2 {
						font-size: 26rpx;
						color: #999999;
		
						text {
							padding-left: 20rpx;
						}
					}
				}
			}
		
			.right {
				image {
					width: 18rpx;
					height: 28rpx;
				}
			}
		}
		
		
		
		.submitFixed{
			width: 600rpx;
			margin: 100rpx auto;
			color: #fff;
			text-align: center;
			padding: 26rpx 0;
			border-radius: 50rpx;
			background-color: #45b787;
		}
		.orderTop{
			width: 100%;
			padding: 20rpx 30rpx;
			margin-bottom: 20rpx;
			background-color: #ffffff;
			display: flex;
			align-items: center;
			.o-left{
				
				width: 200rpx;
				height: 200rpx;
				image{
					border-radius: 10rpx;
					width: 100%;
					height: 100%;
				}
			}
			.o-right{
				padding-left: 20rpx;
				.p1{
					color: #333333;
				}
				.p2{
					padding: 20rpx 0;
					font-size: 26rpx;
					color: #999999;
				}
				.p3{
					font-size: 28rpx;
					text:nth-child(1){
						color: #45b787;
					}
					text:nth-child(2){
						color: #999999;
						padding-left: 30rpx;
					}
				}
			}
		}
		.divOne{
			color: #333;
			border-bottom: 2rpx solid #f1f1f1;
			box-sizing: border-box;
			padding: 30rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			background-color: #fff;
			.left{
				
			}
			.right{
				display: flex;
				align-items: center;
				font-size: 30rpx;
				color: #666;
				image{
					width:30rpx;
					height: 36rpx;
				}
			}
		}
	
		.o-title{
			background-color: #ffffff;
			color: #333333;
			padding: 15rpx 30rpx;
			margin-bottom: 2rpx;
		}
		.o-money{
			border-top: 2rpx solid #f1f1f1;
			font-size: 34rpx;
			color: #45b787;
			padding:30rpx;
			text-align: right;
			background-color: #ffffff;
		}
		.o-content{
			width: 100%;
			background-color: #ffffff;
			.cont{
				width: 690rpx;
				margin: 0 auto;
			
				.clist{
					display: flex;
					justify-content: space-between;
					font-size: 30rpx;
					padding: 14rpx 0;
					text:nth-child(1){
						color: #999999;
					}
					text:nth-child(2){
						color: #666666;
					}
				}
			
			}
			
		}
	}
</style>