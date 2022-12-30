<template>
	<view>
		<!-- 基本信息 -->
		<view class="headinfor">
			<view class=""><strong>基本信息</strong></view>
		</view>
		<!-- 商品详细信息 -->
		<view class="shopinfor">
			<view class="shopinfor_list">
				<view class="shopinforname">商品名称</view>
				<view class=""><input type="text" placeholder="点击输入"></view>
			</view>
			<!-- <view class="shopinfor_list">
				<view class="shopinforname">商品类型</view>
				<view class="shopclass"><view>普通商品</view><view>服务类型商品</view> </view>
			</view> -->
			<radio-group @change="shoptype">
			<view class="shopinfor_list">
				<view class="shopinforname">商品类型</view>
					<label class="radio"><radio value="普通"  />普通商品</label>
					<label class="radio"><radio value="服务" />服务类型商品</label>
			</view>
			</radio-group>
			<view class="shopinfor_list">
				<view class="shopinforname">商品分类</view>
				<view class=""><input type="text" placeholder="点击输入"></view>
			</view>
			<view class="shopinfor_list">
				<view class="shopinforname">单位</view>
				<view class=""><input type="text" placeholder="点击输入"></view>
			</view>
			<radio-group @change="shopst">
			<view class="shopinfor_list">
				<view class="shopinforname">商品状态</view>
					<label class="radio"><radio value="1"  />上架</label>
					<label class="radio"><radio value="2" />下架</label>
			</view>
			</radio-group>
			<view class="shopimg">
				<view class="shopinforname">商品轮播图</view>
				<view class="add">
					+
				</view>
			</view>
		</view>
		<!-- 商品规格 -->
		<view class="headinfor">
			<view class=""><strong>商品规格</strong></view>
		</view>
		<view class="shopinfor">
			<radio-group>
			<view class="shopinfor_list">
				<view class="shopinforname">商品规格</view>
					<label class="radio"><radio value="1"  />单规格</label>
					<label class="radio"><radio value="2" />多规格</label>
			</view>
			</radio-group>
			<view class="shopimg">
				<view class="shopinforname">商品轮播图</view>
				<view class="add">
					+
				</view>
			</view>
			<view class="shopinfor_list">
				<view class="shopinforname">售价</view>
				<view class=""><input type="text" placeholder="点击输入"></view>
			</view>
			<view class="shopinfor_list">
				<view class="shopinforname">成本价</view>
				<view class=""><input type="text" placeholder="点击输入"></view>
			</view>
			<view class="shopinfor_list">
				<view class="shopinforname">原价</view>
				<view class=""><input type="text" placeholder="点击输入"></view>
			</view>
			<view class="shopinfor_list">
				<view class="shopinforname">库存</view>
				<view class=""><input type="text" placeholder="点击输入"></view>
			</view>
			<view class="shopinfor_list">
				<view class="shopinforname">商品编号</view>
				<view class=""><input type="text" placeholder="点击输入"></view>
			</view>
		</view>
		<view class="headinfor">
			<view class=""><strong>商品详情图</strong></view>
		</view>
		<view class="shopinfor">
			
			<view class="shopimg">
				<view class="shopinforname">商品详情图</view>
				<view class="add">
					+
				</view>
			</view>
			
		</view>
		
		
		<!-- 占位 -->
		<view class="zw">
			
		</view>
		<view class="over">
			提交审核
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//商品状态
				shopstatusradio:0,
			}
		},
		methods: {
			//商品状态单选事件
			shopst(value){
				console.log(value)
			},
			//商品类型单选事件
			shoptype(value){
				console.log(value)
			}
			
		}
	}
</script>

<style scoped lang="scss">
.headinfor{
	width: 90%;
	margin: auto;
	border-left: 5rpx solid #30c635;
	padding-left: 5rpx;
	margin-top: 20rpx;
}
.shopinfor{
	width: 90%;
	margin:40rpx auto;
	.shopinfor_list{
		margin-top: 30rpx;
		display: flex;
		justify-content: space-between;
		.shopinforname{
			padding: 15rpx 20rpx;
			.radio{
				padding-top: 16rpx;
				margin-top: 16rpx;
			}
			
		}
		input{
			border-radius: 15rpx;
			background-color: aliceblue;
			padding: 15rpx 20rpx;
		}
		.shopclass{
			display: flex;
			padding: 15rpx 20rpx;
			view{
				margin-left: 10rpx;
				color: #30c635;
				border: 1rpx solid #30c635;
				padding: 5rpx 5rpx;
			}
		}
	}
	.shopimg{
		margin-top: 30rpx;
		.add{
			height: 200rpx;
			text-align: center;
			line-height: 200rpx;
			width: 200rpx;
			border-radius: 15rpx;
			background-color: aliceblue;
			font-size: 40rpx;
		}
	}
}
.zw{
	height: 300rpx;
}
.over{
	padding: 20rpx 40rpx;
	background-color: #30c635;
	color: white;
	width: 150rpx;
	text-align: center;
	position: relative;
	bottom: 50rpx;
	left: 50%;
	transform: translateX(-50%);
	border-radius: 20rpx;
}
</style>
