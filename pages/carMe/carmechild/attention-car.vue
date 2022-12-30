<template>
	<view class="attention" :style="{'height':maskHeight+'px'}">
		<u-tabs :list="list1" :activeStyle="{
						fontWeight:'bold',
						transform:'scale(1.05)',
									color:'#333333'
		}" lineColor="#333333" :inactiveStyle="{
					 color:'#333333'
		}" @click="click"></u-tabs>
		
		<!-- 关注列表 -->
		<view class="attContent">
			<view class="attentBox" v-for="(item,index) in guanzhulist" :key="index">
				<view class="attentImg" @tap="navtouser(item)">
					<image :src="$jointImage(item.avater)" mode=""></image>
				</view>
				<view class="attentCon">
					<view class="con">
						<text class="tOne">{{item.realname}}</text>
						<image class="img" src="@/static/image/jinpai.png" mode=""></image>
						<text class="tTwe" v-if="item.zhuan != null">已认证</text>
					</view>
					<view class="fati">发帖:<text>{{item.tie}}</text>粉丝:<text>{{item.fen}}</text></view>
				</view>
				<view class="textAb" @tap="quxiao(item)">
					已关注
				</view>
			</view>
		</view>
		<view class="" v-if="guanzhulist.length == 0">
			<u-empty
			        mode="list"
					text="暂无关注"
			        icon="http://cdn.uviewui.com/uview/empty/list.png"
			>
			</u-empty>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list1: [{
					name: '店铺',
				}, {
					name: '师傅',
				}, {
					name: '车友'
				}, {
					name: '车友圈'
				},],
				maskHeight: 0,
				//分类
				index:1,
				//分页
				page:0,
				//关注列表
				guanzhulist:[],
			}
		},
		onLoad() {
			let _this = this
			// 获取屏幕高度，设置遮罩层
			uni.getSystemInfo({
				success(res) {
					_this.maskHeight = res.screenHeight
				}
			})
			this.gaunzhu()
			
			
		},
		onReachBottom(){
			this.page++
			this.gaunzhu()
			console.log(this.page)
		},
		onPullDownRefresh() {
			this.guanzhulist = []
			this.gaunzhu()
			setTimeout(()=>{
				uni.stopPullDownRefresh()
			},1000)
		},
		methods: {
			
			//跳转个人页
			navtouser(item){
				if(this.index == 1 || this.index == 2){//店铺
					console.log(item.gzuser_id)
					uni.navigateTo({
						// url:'/pages/expertHome/expertHome?exid='+item.user.id
						url:'/pages/expertHome/expertHome?exid='+item.gzuser_id
					})
				}else if(this.index == 3){
					console.log(item)
					//跳转个人主页
					uni.navigateTo({
						// url:'/pages/expertHome/expertHome?exid='+item.user.id
						url:'/pages/faquanHome/faquanHome?exid='+item.user_id
					})
				}else if(this.index == 4){
					console.log('话题',item)
					uni.navigateTo({
						url:'/pages/huati/huati?itemid='+item.gzuser_id
					})
				}
				
			},
			//取消关注
			async quxiao(item){
				if(this.index == 1 || this.index == 2){
					console.log('item',item)
					const req = await uni.$http.post('api/jiu/replenish/refuconcern',{
						user_id:uni.getStorageSync('UID'),
						shopid:item.gzuser_id,
						type:this.index
					})
					uni.showToast({
						icon:"none",
						title:req.data.msg,
						success: () => {
							this.guanzhulist = []
							this.gaunzhu()
						}
					})
				}else if(this.index == 3){
					console.log('item',item)
					const req = await uni.$http.post('api/jiu/replenish/refuconcern',{
						user_id:uni.getStorageSync('UID'),
						shopid:item.user_id,
						type:this.index
					})
					uni.showToast({
						icon:"none",
						title:req.data.msg,
						success: () => {
							this.guanzhulist = []
							this.gaunzhu()
						}
					})
				}else if(this.index == 4){
					console.log('item',item)
					const req = await uni.$http.post('api/jiu/replenish/refuconcern',{
						user_id:uni.getStorageSync('UID'),
						shopid:item.gzuser_id,
						type:this.index
					})
					uni.showToast({
						icon:"none",
						title:req.data.msg,
						success: () => {
							this.guanzhulist = []
							this.gaunzhu()
						}
					})
				}
				
			},
			//关注列表
			async gaunzhu(){
				console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',this.index)
				let k = {
					zheshifenlei:this.index,
					user_id:uni.getStorageSync('UID'),
					page:this.page,
				}
				const req = await uni.$http.post('api/jiu/replenish/guanzhulist',k)
				// this.guanzhulist = req.data.data.action
				this.guanzhulist = [...req.data.data.action,...this.guanzhulist]
				console.log('全部关注',this.guanzhulist)
			},
			
			//导航栏
			click(item) {
				
				console.log('item', item);
				this.guanzhulist = []
				this.page = 0
				if(item.index == 0){
					this.index = 1
				}else if(item.index == 1){
					this.index = 2
				}else if(item.index == 2){
					this.index = 3
				}else if(item.index == 3){
					this.index = 4
				}
				this.gaunzhu()
				
			}
		},
		
	}
</script>

<style lang="scss" scoped>
	.attention {
		width: 100%;
		background-color: #f7f8fc;

		.attContent {
			width: 690rpx;
			margin: 0 auto;
			margin-top: 40rpx;

			.attentBox {
				width: 100%;
				display: flex;
				background-color: #FFFFFF;
				border-radius: 20rpx;
				padding: 20rpx 30rpx;
				box-sizing: border-box;
				box-shadow: 0px 0px 12px 1px rgba(0, 0, 0, 0.14);
				position: relative;

				margin-bottom: 30rpx;

				.attentImg {
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
					overflow: hidden;
					margin-top: 15rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.attentCon {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					padding-left: 20rpx;

					.con {
						display: flex;
						align-items: flex-end;

						.tOne {
							font-size: 32rpx;
							color: #333333;
						}

						.img {
							width: 60rpx;
							height: 60rpx;
							// transform: scale(1.4);

						}

						.tTwe {
							font-size: 22rpx;
							padding: 0 10rpx;
							border-radius: 30rpx;
							color: #FFFFFF;
							background-color: #45b787;
						}
					}

					.fati {
						font-size: 26rpx;
						color: #4f4f4f;
						letter-spacing: 2rpx;

						text {
							padding: 0 15rpx;
						}
					}
				}

				.textAb {
					position: absolute;
					right: 30rpx;
					top: 50%;
					transform: translateY(-50%);
					height: 40rpx;
					padding: 5rpx 10rpx;
					font-size: 26rpx;
					background-color: #e5e5e5;
					color: #4f4f4f;
					border-radius: 20rpx;
					letter-spacing: 2rpx;
				}
			}
		}

	}
</style>
