<template>
	<view>
		<view class="bondnum">
			<view class="bondum_top">
				<view class="">类目：{{inforlist[0].name}}</view>
			</view>
		</view>
		<!-- 付款信息 -->
		<view class="bondinfor">
			<view class="infor">
				<strong>付款信息</strong>
			</view>
		</view>
		<!-- 信息 -->
		<view class="allinfor">
			<view class="allinfor_list">
				<view class="">缴纳人</view>
				<view class="">{{inforlist[0].realname}}</view>
			</view>
			<view class="allinfor_list">
				<view class="">手机号码</view>
				<view class="">{{inforlist[0].mobile}}</view>
			</view>
			<!-- <view class="allinfor_list">
				<view class="">付款时间</view>
				<view class="">2022.12.12 14:00</view>
			</view> -->
			<!-- <view class="allinfor_list">
				<view class="">付款方式</view>
				<view class="">在线支付</view>
			</view> -->
			<view class="allinfor_list">
				<view class="">保证金总额</view>
				<view class="">￥{{inforlist[0].price}}</view>
			</view>
			<view class="allinfor_list">
				<view class="">支付状态</view>
				<view class="">未缴纳</view>
			</view>
			<!-- 底部弹窗 -->
			<picker mode="selector" :range="zfarry" :value="zhifuOk" @change="zhifufangshi">
				<view class="allinfor_list" >
					<view><strong>选择支付方式</strong>: {{zfarry[zhifuOk]}}</view>
					<!-- <view class=""><image style="height: 30rpx;width: 30rpx;" src="/static/image/right_skip.png" mode=""></image> </view> -->
				</view>
			</picker>
			
		</view>
		
		<view class="but" @click="goshoping()">
			去缴纳
		</view>
		
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:null,
				inforlist:[],
				//ordid支付id
				orderid:null,
				//用户选择了那一项
				zhifuOk:1,//默认微信支付
				typehzifu:2,
				//选择支付方式
				zfarry:["余额支付","微信支付"],
			}
		},
		onLoad(res) {
			console.log(res)
			this.id = res.id
			this.infor()
		},
		methods: {
			//选择支付方式
			zhifufangshi(e){//["余额支付","微信支付"]接口2是微信支付1是余额支付
				console.log(e)
				
				this.zhifuOk = e.detail.value
				console.log('zhifuOk',this.zhifuOk)
				// console.log(this.zhifuOk)
				if(e.detail.value == 1){
					this.typehzifu = 2//微信支付
					console.log('微信支付',this.typehzifu)
				}else if(e.detail.value == 0){
					this.typehzifu = 1//余额支付
					console.log('余额支付',this.typehzifu)
				}
			},
			//缴纳
			async goshoping(){
				if(this.inforlist[0].price != 0){
					const req = await uni.$http.get('api/jiu/server/categorybuy',{
						user_id:uni.getStorageSync('user_id'),
						id:this.orderid,
						type:this.typehzifu
					})
					console.log('uhdakshfdkjfh',req)
					if(req.data.msg == "支付成功"){
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
						    success(res) {
								console.log(res)
								uni.navigateBack({
									delta:1
								})
							},
						    fail(e) {
								console.log(e)
							}
						})
					}else if(req.data.msg == "余额支付成功"){
						uni.showToast({
							icon:"none",
							title:req.data.msg,
							success: (res) => {
								setTimeout(()=>{
									uni.navigateBack({
										delta:1
									})
								},1000)
								
							}
						})
					}
				}else if(this.inforlist[0].price == 0){
					const req = await uni.$http.get('api/jiu/server/categorybuy',{
						user_id:uni.getStorageSync('user_id'),
						id:this.orderid,
						type:1
					})
					console.log('uhdakshfdkjfh',req)
					if(req.data.msg == "支付成功"){
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
						    success(res) {
								console.log(res)
								uni.navigateBack({
									delta:1
								})
							},
						    fail(e) {
								console.log(e)
							}
						})
					}else if(req.data.msg == "余额支付成功"){
						uni.showToast({
							icon:"none",
							title:req.data.msg,
							success: (res) => {
								setTimeout(()=>{
									uni.navigateBack({
										delta:1
									})
								},1000)
								
							}
						})
					}
				}
				
			},
			//详情
			async infor(){
				const req = await uni.$http.get('api/jiu/server/serverdetail',{
					id:this.id
				})
				console.log('12123',req)
				this.inforlist = req.data.data.action
				this.orderid = req.data.data.action[0].id
				console.log('orid',this.orderid)
				// console.log(this.inforlist)
			}
			
			
			
		}
	}
</script>

<style scoped lang="scss">
.bondnum{
	width: 100%;
	border: 1rpx solid gainsboro;
	margin-top: 30rpx;
	padding: 30rpx 0rpx;
	.bondum_top{
		width: 90%;
		margin: auto;
		view{
			font-size: 35rpx;
		}
	}
}
.bondinfor{
	width: 100%;
	margin-top: 30rpx;
	border-bottom: 1rpx solid gainsboro;
	.infor{
		width: 90%;
		margin: auto;
		padding: 20rpx 0rpx;
	}
}
.allinfor{
	width: 90%;
	margin: auto;
	.allinfor_list{
		display: flex;
		justify-content: space-between;
		padding: 20rpx 0rpx;
	}
}
.but{
	margin:200rpx auto;
	width: 300rpx;
	text-align: center;
	padding: 30rpx 0rpx;
	background-color: #00b86b;
	color: white;
	border-radius: 15rpx;
}
</style>
