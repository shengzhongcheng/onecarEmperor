<template>
	<view>
		<view class="staffname">
			<view class="staffname_box">
				<view class="staffname_list">
					<view class="">姓名:</view>
					<view class="clo">
						<template>
						  <u--input
						    placeholder="请输入姓名"
						    border="surround"
						    v-model="name"
						  ></u--input>
						</template>
					</view>
				</view>
				<!-- <view class="staffname_list">
					<view class="">性别</view>
					<view class="clo">男</view>
				</view> -->
				<view class="staffname_list">
					<view class="">联系电话:</view>
					<view class="clo">
						<template>
						  <u--input
						    placeholder="联系电话"
						    border="surround"
						    v-model="mod"
						  ></u--input>
						</template>
					</view>
				</view>
				<view class="staffname_list">
					<view class="">地址:</view>
					<view class="clo">
						<template>
						  <u--input
						    placeholder="请输入地址"
						    border="surround"
						    v-model="adres"
						  ></u--input>
						</template>
					</view>
				</view>
			</view>
		</view>
		<!-- 删除按钮 -->
		<view class="rem">
			<u-button type="primary" text="确定" @click="edinfor()"></u-button>
			<u-button type="primary" color="#b40003" text="删除" @click="reminfor"></u-button>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//用户id
				id:null,
				//用户信息
				userinfor:null,
				//用户姓名
				name:'',
				//用户电话
				mod:'',
				//用户地址
				adres:'',
			}
		},
		onLoad(id) {
			this.id = id.id
			this.getuserinfor()
		},
		methods: {
			//获取员工信息
			async getuserinfor(){
				const req = await uni.$http.get('api/jiu/usercate/edittabulate',{
					id:this.id
				})
				this.userinfor = req.data.data.action
				console.log('信息',this.userinfor)
				this.name = this.userinfor.realname
				this.mod = this.userinfor.mobile
				this.adres = this.userinfor.adress
			},
			//确定修改
			async edinfor(){
				const req = await uni.$http.get('api/jiu/usercate/addtabulate',{
					user_id:uni.getStorageSync('user_id'),
					name:this.name,
					mobile:this.mod,
					adress:this.adres,
					id:this.id,
				})
				uni.showToast({
					icon:"none",
					title:req.data.msg,
					success: () => {
						setTimeout(()=>{
							uni.navigateBack()
						},1000)
						
					}
				})
			},
			//删除
			async reminfor(){
				const req = await uni.$http.get('api/jiu/usercate/deltabulate',{
					id:this.id,
				})
				uni.showToast({
					icon:"none",
					title:req.data.msg,
					success: () => {
						setTimeout(()=>{
							uni.navigateBack()
						},1000)
						
					}
				})
			},
			
		}
	}
</script>

<style scoped lang="scss">
.staffname{
	width: 100%;
	margin-top: 30rpx;
	.staffname_box{
		width: 90%;
		margin: auto;
		padding: 20rpx 20rpx;
		.staffname_list{
			// display: flex;
			// justify-content: space-between;
			// border-bottom: 1rpx solid gainsboro;
			.clo{
				color: #8f8f8f;
			}
			view{
				padding: 10rpx 20rpx;
			}
		}
	}
}
.rem{
	width: 90%;
	margin: auto;
	button{
		margin-top: 30rpx;
	}
}
</style>
