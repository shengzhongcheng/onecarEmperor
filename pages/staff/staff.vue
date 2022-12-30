<template>
	<view>
		<!-- 头部搜索框 -->
		<view class="topinput">
			<view class="topinput_input">
				<image class="shousuo" src="../../static/indexiconfont/sousuo.png" mode=""></image>
				<input type="text" placeholder="搜索手机号或者名字" v-model="value" @blur="shousuo">
				<image src="../../static/staff/adduser.png" mode="" @click="navtoaddstaff()"></image>
			</view>
		</view>
		<!-- 用户列表 -->
		<view class="userlist" v-for="(item,index) in userlist" :key="index">
			<view class="userlist_left">
				<view class=""><!-- <image src="/static/image/Fala.png" mode=""></image> -->
				<template>
				    <u-avatar
				            :text="item.realname"
				            fontSize="18"
				            randomBgColor
				    ></u-avatar>
				</template>
				</view>
				<view class="userinfor">
					<view class="">{{item.realname}}</view>
					<view class="tel">{{item.mobile}}</view>
				</view>
			</view>
			<view class="userlist_right" @click="navtoadmin(item.id)">
				信息管理
			</view>
		</view>
		
		<!-- 数据为空 -->
		<view class="" v-if="userlist.length == 0">
			<u-empty
			        mode="list"
					text="暂无员工信息"
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
				value:'',
				
				//员工列表
				userlist:[],
				
			}
		},
		onShow() {
			this.getuserlist()
		},
		
		methods: {
			//模糊搜索
			async shousuo(){
				const req = await uni.$http.get('api/jiu/usercate/seachtabulate',{
					name:this.value
				})
				console.log('req',req)
				this.userlist = req.data.data.action
			},
			//获取员工列表
			async getuserlist(){
				const req = await uni.$http.get('api/jiu/usercate/shoptabulate',{
					user_id:uni.getStorageSync('user_id')
				})
				console.log(req)
				this.userlist = req.data.data.action
			},
			
			//跳转员工管理
			navtoadmin(id){
				uni.navigateTo({
					url:'../staffadmin/staffadmin?id='+id
				})
			},
			//跳转添加员工
			navtoaddstaff(){
				uni.navigateTo({
					url:'../addstaff/addstaff'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
.topinput{
	width: 100%;
	// border-bottom: 1rpx solid gainsboro;
	.topinput_input{
		position: relative;
		padding: 20rpx 10rpx;
		width: 90%;
		margin: auto;
		display: flex;
		justify-content: space-between;
		.shousuo{
			position: absolute;
			left: 20rpx;
			top: 40%;
			transform: translateY(-40%);
			height: 40rpx;
			width: 40rpx;
		}
		input{
			flex: 2;
			background-color: aliceblue;
			border-radius: 15rpx;
			padding-top: 20rpx;
			padding-bottom: 20rpx;
			padding-left: 60rpx;
		}
		image{
			height: 60rpx;
			width: 60rpx;
			margin-top: 10rpx;
		}
	}
}
.userlist{
	padding: 20rpx 10rpx;
	width: 90%;
	margin: auto;
	margin-top: 40rpx;
	border-radius: 10rpx;
	border: 1rpx solid gainsboro;
	display: flex;
	justify-content: space-between;
	.userlist_left{
		display: flex;
		view{
			image{
				height: 80rpx;
				width: 80rpx;
				border-radius: 15rpx;
			}
		}
		.userinfor{
			margin-left: 20rpx;
			.tel{
				color: #7e7e7e;
			}
		}
	}
	.userlist_right{
		height: 50rpx;
		line-height: 50rpx;
		background-color: #43b182;
		color: white;
		margin-top: 20rpx;
		padding: 0rpx 20rpx;
		border-radius: 15rpx;
	}
}
</style>
