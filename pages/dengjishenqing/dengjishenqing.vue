<template>
	<view>
		<!-- 等级申请 -->
		<view class="externalBox">
			<!-- 等级列表 -->
			<view class="denjiList" v-for="(item,index) in allDjList" :key="index">
				<view class="name">V{{item.grade}} ￥{{item.money}} <text v-if="item.status == 1" @tap="apply(item)">申请等级</text> <text v-if="item.status == 2" @tap="buyOrApply(item)">购买等级</text> </view>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//接收全部等级列表
				allDjList:[],
			}
		},
		onLoad() {
			this.getDengjiList()//全部等级列表
		},
		onShow() {
			this.getDengjiList()//全部等级列表
		},
		methods: {
			//购买或者申请等级
			async buyOrApply(item){
				const req = await uni.$http.get('api/jiu/user/buyleavl',{
					user_id:uni.getStorageSync('user_id'),
					type:item.status,
					price:item.money,
					level:item.id
				})
				console.log(req)
				if(req.data.msg == "支付成功" && req.statusCode == 200){
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
							uni.showToast({
								icon:"none",
								title:'购买成功',
								success: (req) => {
									setTimeout(()=>{
										uni.navigateBack({
											delta:1
										})
									},1000)
								}
							})
							
						},
					    fail(e) {
							console.log(e)
						}
					})
				}else if(req.data.msg == "请求成功" && req.statusCode == 200){
					uni.showToast({
						icon:"none",
						title:'申请成功'
					})
				}
			},
			
			//申请等级
			apply(item){
				uni.showModal({
					title:'通知',
					content:item.content,
					confirmText:'去申请',
					success: (res) => {
						if (res.cancel) {
							return
						}else if(res.confirm){
							this.buyOrApply(item)
						}
					}
				})
			},
			
			//等级全部列表接口
			async getDengjiList(){
				const req = await uni.$http.get('api/jiu/user/leavl',{
					user_id:uni.getStorageSync('user_id')
				})
				console.log('全部等级列表',req)
				this.allDjList = req.data.data.action
			},
			
		}
	}
</script>

<style scoped lang="scss">
	
	.externalBox{
		width: 90%;
		margin:30rpx auto;
		.denjiList{
			width: 90%;
			margin: auto;
			background-color: #222222;
			border-radius: 15rpx;
			padding: 30rpx 20rpx;
			margin-bottom: 30rpx;
			.name{
				color: #fff14f;
				font-size: 35rpx;
				width: 100%;
				display: flex;
				justify-content: space-between;
				text{
					background-color: #d9cd43;
					color: white;
					padding: 10rpx 30rpx;
				}
			}
		}
	}
</style>
