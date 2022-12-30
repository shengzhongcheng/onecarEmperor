<template>
	<view>
		<!-- 知识课堂 1推介0正常-->
		<view class="navclass">
			<view class="classtext" @click="allormy(0)" :class="{bak:type == 0}">
				<text>全部发圈</text></image>
			</view>
			<view class="classtext" @click="allormy(1)" :class="{bak:type == 1}">
				<text>我的发圈</text></image>
			</view>
		</view>
		<!-- 课堂列表 -->
		<view class="nowlist" v-for="(item,index) in zslist">
			<view class="but" v-if="item.tui_switch == 1">精选</view>
			<view class="but" v-if="item.is_shen == 0">审核中</view>
			<view class="red" v-if="item.is_shen == 2">驳回</view>
			<view class="title"><strong>{{item.title}}</strong></view>
			<view class="content">{{item.content}}</view>
			<view class="time">发布时间：{{item.createtime | timeAgo}}</view>
			<view class="admin">
				<view class="org" @click="remlist(item.id)">删除动态</view>
				<view class="gre" @click="lookinfor(item.id)" v-if="item.is_shen != 2">查看详情</view>
				<view class="gre" @click="edfaquan(item.id)" v-if="item.is_shen == 2">去修改</view>
			</view>
		</view>
		
		<!-- 提示内容 -->
		<view class="trfaOrd" v-if="zslist.length == 0">
			<u-empty
			        mode="data"
					text="还没有人发圈，快去发布吧~~"
			        icon="http://cdn.uviewui.com/uview/empty/data.png"
			>
			</u-empty>
		</view>
		
		
		<view class="botnav" @click="fabu()">发布帖子</view>
		
		<view class="zw">
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//知识列表
				zslist:[],
				//我的发圈或者全部发圈0为全部1为我的
				type:1,
			}
		},
		onLoad() {
			this.getlist()
		},
		onShow() {
			this.getlist()
		},
		methods: {
			//去修改发圈
			edfaquan(id){
				uni.navigateTo({
					url:'/pages/edfaquan/edfaquan?id='+id
				})
			},
			
			//切换我的和全部
			allormy(type){
				this.type = type
				this.remlist()
			},
			
			//删除发圈
			async remlist(id){
				const req = await uni.$http.get('api/jiu/scrunchie/quandel',{
					id:id
				})
				console.log(req)
				this.getlist()
			},
			
			//跳转发布页面
			fabu(){
				uni.navigateTo({
					url:'../knowquan/knowquan'
				})
			},
			
			//获取用户发圈列表
			async getlist(){
				const req = await uni.$http.get('api/jiu/scrunchie/list',{
					user_id:uni.getStorageSync('user_id'),
					type:this.type
				})
				console.log(req)
				this.zslist = req.data.data.action
			},
			
			
			//查看详情
			async lookinfor(id){
				uni.navigateTo({
					url:'../fanquaninfor/fanquaninfor?id='+id
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
	
	.navclass{
		width: 90%;
		margin: auto;
		padding: 20rpx 10rpx;
		display: flex;
		justify-content: space-around;
		// border-bottom: 1rpx solid #45B787;
		.classtext{
			background-color: white;
			display: inline-block;
			padding: 30rpx 60rpx;
			font-size: 25rpx;
			border-radius: 20rpx;
			color: #636363;
			image{
				height: 30rpx;
				width: 20rpx;
				position: relative;
				top: 5rpx;
				left: 5rpx;
			}
		}
		.bak{
			background-color: #45B787;
			color: white;
		}
	}
	.nowlist{
		width: 90%;
		margin: 20rpx auto;
		padding: 20rpx 20rpx;
		background-color: white;
		border-radius: 20rpx;
		.but{
			float: right;
			font-size: 20rpx;
			
			// letter-spacing: 5rpx;
			background-color: orange;
			color: white;
			padding: 10rpx 10rpx;
			border-radius: 15rpx;
		}
		.red{
			float: right;
			font-size: 20rpx;
			
			// letter-spacing: 5rpx;
			background-color: red;
			color: white;
			padding: 10rpx 10rpx;
			border-radius: 15rpx;
		}
		.title{
			font-size: 33rpx;
			overflow : hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			-webkit-line-clamp:2;
		}
		.content{
			margin: 20rpx 0rpx;
			overflow : hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 3;
			-webkit-box-orient: vertical;
			-webkit-line-clamp:3;
		}
		.time{
			border-bottom: 1rpx solid gainsboro;
			padding: 20rpx 0rpx;
			font-size: 20rpx;
		}
		.admin{
			display: flex;
			justify-content: space-between;
			margin-top: 20rpx;
			padding: 20rpx 0rpx;
			.org{
				color: orange;
			}
			.gre{
				color: #45B787;
			}
		}
	}
	.botnav{
		border-radius: 15rpx;
		position: fixed;
		bottom: 30rpx;
		left: 50%;
		transform: translateX(-50%);
		text-align: center;
		padding: 20rpx 20rpx;
		color: white;
		background-color: #45B787;
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
