<template>
	<view>
		<!-- 知识课堂 1推介0正常-->
		<view class="navclass">
			<!-- <view class="classtext" @click="allormy(0)" :class="{bak:type == 0}">
				<text>图片广告</text></image>
			</view>
			<view class="classtext" @click="allormy(1)" :class="{bak:type == 1}">
				<text>文字广告</text></image>
			</view> -->
			<template>
				<u-subsection :list="list" :current="moren" @change="sectionChange" activeColor="#45B787"></u-subsection>
			</template>
		</view>
		<!-- 广告列表 -->
		<view class="nowlist" v-for="(item,index) in forlist">
			<view class="but" v-if="item.status == 1">审核中</view>
			<view class="but" v-if="item.status == 2">审核通过</view>
			<view class="red" v-if="item.status == 3">已下架</view>
			<view class="title" v-if="item.content"><strong>广告内容：</strong>{{item.content}}</view>
			<view class="title" v-if="item.banner1image">广告图片：<image :src="getImgsrc(item.banner1image)" mode=""></image> </view>
			<!-- <view class="content">{{item.content}}</view> -->
			<view class="time">到期时间：{{item.updatetime | timeAgo}}</view>
<!-- 			<view class="admin">
				<view class="org" @click="remlist(item.id)">删除广告</view>
			</view> -->
		</view>
		
		<!-- 提示内容 -->
		<view class="trfaOrd" v-if="image.length == 0">
			<u-empty
			        mode="data"
					text="还没有发布广告，快去发布吧~~"
			        icon="http://cdn.uviewui.com/uview/empty/data.png"
			>
			</u-empty>
		</view>
		
		
		<view class="botnav" @click="fabu()">发布广告</view>
		
		<view class="zw">
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//我的广告
				list: ['图片广告', '文字广告'],
				//默认选中第几个广告
				moren:0,
				//广告列表
				zslist:[],
				//文字广告
				textlist:[],
				//图文广告
				image:[],
				//用与循环的广告
				forlist:[],
				//我的发圈或者全部发圈0为全部1为我的
				type:1,
			}
		},
		onLoad() {
			this.getlist()
		},
		onShow() {
			// this.getlist()
		},
		methods: {
			//导航事件
			sectionChange(index){
				this.moren = index//切换选中的位置
				if(index == 0){
					this.forlist = this.image
				}else if(index == 1){
					this.forlist = this.textlist
				}
			},

			//跳转发布页面
			fabu(){
				uni.navigateTo({
					url:'/pages/fabuguanggao/fabuguanggao'
				})
			},
			
			//获取用户广告列表
			async getlist(){
				const req = await uni.$http.get('api/jiu/advert/adverlist',{
					user_id:uni.getStorageSync('user_id'),
				})
				console.log('广告列表',req)
				let arr = req.data.data.action
				arr.forEach((item,index)=> {
				  item.updatetime = item.updatetime.split('.')[0]
				 if(item.type == 2){
				 	this.textlist.push(item)
				 }else if(item.type == 1){
				 	this.image.push(item)
				 }
				  console.log('转换时间',item.type,index)
				})
				this.forlist = this.image
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
			image{
				height: 300rpx;
				width: 100%;
				margin: 30rpx auto;
			}
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
