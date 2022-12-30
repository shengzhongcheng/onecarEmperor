<template>
	<view>
		<!-- 知识课堂 -->
		<!-- <view class="navclass">
			<view class="classtext">
				<text>全部</text><image src="@/static/shopadmin/topbot.png" mode=""></image>
			</view>
			<view class="classtext">
				<text>上传时间</text><image src="@/static/shopadmin/topbot.png" mode=""></image>
			</view>
			<view class="classtext">
				<text>分类</text><image src="@/static/shopadmin/topbot.png" mode=""></image>
			</view>
		</view> -->
		<!-- 课堂列表 -->
		<!-- <view class="nowlist" v-for="(item,index) in zslist">
			<view class="title"><strong>{{item.question}}</strong></view>
			<view class="content">{{item.answer}}</view>
			<view class="time">发布时间：{{item.createtime | timeAgo}}</view>
			<view class="admin">
				<view class="org" @click="remlist(item.id)">删除动态</view>
				<view class="gre" @click="lookinfor(item.id)">查看详情</view>
			</view>
		</view> -->
		<!-- 提示是否有订单信息 -->
		<!-- <view class="botnav" @click="fabu()">上传知识</view>
		
		
			<view class="trfaOrd" v-if="zslist.length == 0">
				<view class="orderr"><strong>没人发布知识，快去发布吧~~</strong></view>
			</view>
		
		<view class="zw">
			
		</view> -->
		
		<!-- 知识课堂分类 -->
		<view class="classlist">
			<view class="class" @tap="navzhilist(2)">
				<image src="../../static/shopadmin/sp.png" mode=""></image>
				视频讲解
			</view>
			<view class="class" @tap="navzhilist(1)">
				<image src="../../static/shopadmin/tw.png" mode=""></image>
				图文讲解
			</view>
			<view class="class" @tap="navzhilist(0)">
				<image src="../../static/shopadmin/img.png" mode=""></image>
				图片分享
			</view>
			
		</view>
		
		
		
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//知识列表
				zslist:[],
				
			}
		},
		onLoad() {
			
		},
		methods: {
			//跳转详情页
			navzhilist(i){
				uni.navigateTo({
					url:"/pages/zhishilist/zhishilist?type="+i
				})
			},
			
		}
	}
</script>

<style >
	page{
		background-color: #f3f3f3;
	}
</style>

<style scoped lang="scss">
	.classlist{
		width: 100%;
		.class{
			font-size: 40rpx;
			width: 90%;
			height: 300rpx;
			line-height: 300rpx;
			border-radius: 15rpx;
			color: white;
			background-color: #2ab857;
			text-align: center;
			margin:30rpx auto;
			border: 1rpx solid #31d372;
			position: relative;
			image{
				height: 50rpx;
				width: 50rpx;
				position: absolute;
				top: 50%;
				left: 200rpx;
				transform: translateY(-50%);
			}
		}
		
	}
	
	// .navclass{
	// 	width: 90%;
	// 	margin: auto;
	// 	padding: 20rpx 10rpx;
	// 	display: flex;
	// 	justify-content: space-between;
	// 	.classtext{
	// 		image{
	// 			height: 30rpx;
	// 			width: 20rpx;
	// 			position: relative;
	// 			top: 5rpx;
	// 			left: 5rpx;
	// 		}
	// 	}
	// }
	// .nowlist{
	// 	width: 90%;
	// 	margin: 20rpx auto;
	// 	padding: 20rpx 20rpx;
	// 	background-color: white;
	// 	border-radius: 20rpx;
	// 	.title{
	// 		font-size: 33rpx;
	// 	}
	// 	.content{
	// 		margin: 20rpx 0rpx;
	// 		overflow : hidden;
	// 		text-overflow: ellipsis;
	// 		display: -webkit-box;
	// 		-webkit-line-clamp: 3;
	// 		-webkit-box-orient: vertical;
	// 		-webkit-line-clamp:3;
	// 	}
	// 	.time{
	// 		border-bottom: 1rpx solid gainsboro;
	// 		padding: 20rpx 0rpx;
	// 		font-size: 20rpx;
	// 	}
	// 	.admin{
	// 		display: flex;
	// 		justify-content: space-between;
	// 		margin-top: 20rpx;
	// 		padding: 20rpx 0rpx;
	// 		.org{
	// 			color: orange;
	// 		}
	// 		.gre{
	// 			color: #45B787;
	// 		}
	// 	}
	// }
	// .botnav{
	// 	position: fixed;
	// 	bottom: 30rpx;
	// 	left: 50%;
	// 	transform: translateX(-50%);
	// 	text-align: center;
	// 	padding: 20rpx 20rpx;
	// 	color: white;
	// 	background-color: #45B787;
	// }
	// .trfaOrd{
	// 		width: 90%;
	// 		margin:100rpx auto;
	// 		text-align: center;
	// 		color: #787878;
	// 	}
	// .zw{
	// 	height: 300rpx;
	// }
</style>
