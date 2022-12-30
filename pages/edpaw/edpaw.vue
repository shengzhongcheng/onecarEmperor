<template>
	<view>
		<view class="funlist">
			<!-- <view class="funalllist">
				<view class="funalllistimg" >手机号</view>
				<input type="number" name="" id="" v-model="tel" placeholder="请输入手机号">
			</view> -->
			<!-- <view class="funalllist">
				<view class="funalllistimg">验证码</view>
				<input type="number" name="" id="" v-show="yanzentf == false" placeholder="请输入验证码">
				<view class="yanzhemacol" v-show="yanzentf" @click="getyanzen()">点击获取验证码</view>
			</view> -->
			<view class="funalllist">
				<view class="funalllistimg">原密码</view>
				<input type="password" name="" id="" v-model="paw" placeholder="请输入原密码">
			</view>
			<view class="funalllist">
				<view class="funalllistimg">新密码</view>
				<input type="password" name="" id="" v-model="newpaw" placeholder="请输入新密码">
			</view>
			<view class="funalllist">
				<view class="funalllistimg">确认密码</view>
				<input type="password" name="" id="" v-model="oknewpaw" placeholder="请确认密码">
			</view>
			<!-- 退出按钮 -->
			<view class="tuicu" @click="rempaw()">
				确认修改
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//是否隐藏验证码
				yanzentf:true,
				// 所有input的数据
				
					tel:null,
					yanzen:null,
					paw:null,
					newpaw:null,
					oknewpaw:null,
				
				
			}
		},
		methods: {
			//确认修改
			async rempaw(){
				if(this.paw != null && this.newpaw != null && this.oknewpaw != null){
					const req =await uni.$http.get('api/jiu/user/uppwd',{
						user_id:uni.getStorageSync('user_id'),
						password:this.paw,
						newpassword:this.newpaw,
						newpwd:this.oknewpaw
					})
					console.log(req)
					if(req.statusCode == 200){
						uni.showToast({
							icon:"none",
							title:req.data.msg
						})
						this.paw = null
						this.newpaw = null
						this.oknewpaw = null
					}
				}else{
					uni.showToast({
						icon:"none",
						title:'请输入账号密码'
					})
				}
				
			},
			
			//点击获取验证码
			getyanzen(){
				this.yanzentf =  false
			}
			
		}
	}
</script>

<style scoped lang="scss">
.funlist{
		width: 85%;
		margin:30rpx auto;
		padding: 30rpx 0rpx;
		box-shadow:0rpx 0rpx  3rpx 3rpx #e3e3e3;
		border-radius: 15rpx;
		position: relative;
		image{
			height: 30rpx;
			width: 30rpx;
		}
		.funalllist{
			display: flex;
			justify-content: space-between;
			width: 90%;
			margin: auto;
			padding: 15rpx 10rpx;
			.funalllistimg{
				image{
					margin-right: 10rpx;
				}
			}
			.yanzhemacol{
				color: #0ae3ca;
			}
		}
		.tuicu{
			position: absolute;
			bottom: -174rpx;
			left: 184rpx;
			box-shadow:0rpx 0rpx  3rpx 3rpx #e3e3e3;
			padding: 26rpx 104rpx;
			border-radius: 20rpx;
		}
	}
	.zw{
		height: 300rpx;
	}

</style>
