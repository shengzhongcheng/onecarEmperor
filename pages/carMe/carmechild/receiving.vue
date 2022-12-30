<template>
	<!-- 收货地址 -->
	<view class="receiving">
		<radio-group @change="radioChange">
			<view class="receBox" v-for="(item,index) in pageInfo" :key="index" @click="add(item)">
				<view class="receCont">
					<view class="con-title">
						<text class="t-h1">{{item.real_name}}</text>
						<text class="t-h2">{{item.phone}}</text>
						<!-- <view class="t-h3">默认</view> -->
					</view>
					<view class="con-map">
						<text>{{item.province}}</text><text>{{item.city}}</text><text>{{item.district}}</text><text></text>
					</view>
					<view class="con-messMap">
						{{item.detail}}
					</view>
					<view class="conFixed" @tap="spikReceiving3(item.id)">
						<image src="@/static/image/xiugai.png" mode=""></image>
					</view>
				</view>
				<view class="receBott">
					<view class="bott-left">
						<radio :value="item.id+'&'+item.is_default" :checked="item.is_default == 1">
							<text>设置为默认地址</text>
						</radio>
					</view>
					<view class="bott-right" @tap.stop="getRemoveMap(item.id)">
						删除
					</view>
				</view>
			</view>
		</radio-group>
		<view class="" style="width: 100%;margin-top: 30rpx;text-align: center;font-size: 40rpx;" v-if="pageInfo.length == 0">
			<u-empty
					text="没有收货地址，快去添加吧~~"
			        mode="data"
			        icon="http://cdn.uviewui.com/uview/empty/data.png"
			>
			</u-empty>
		</view>
		<view class="messAddCar" @click="spikReceiving2">
			<image class="img" src="@/static/image/addg.png" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userId: uni.getStorageSync('UID') || '',
				pageInfo: [], //页面数据
				boolBack: false, //是否选中默认地址后返回
				wID: false,
			}
		},
		onShow() {
			this.getMapList()
		},
		onLoad(option) {
			// this.add()
			this.wID = option.boole
			if (option.boole == 'true') this.boolBack = true
		},
		
		
		methods: {
			// 点击选择订单地址
			add(item) {
				if(this.wID) {
					let pages =getCurrentPages()
					let prePage = pages[pages.length-2]
					prePage.info = JSON.stringify(item)
					uni.navigateBack({
						delta:1
					})
				}
			},
			//获取页面信息
			getMapList() {
				let _this = this
				_this.$http.getAddressList({
						uid: _this.userId
					})
					.then(res => {
						console.log('地址详情', res)
						_this.pageInfo = res.data.data
					})
			},
			//选中的默认地址
			radioChange(e) {
				console.log('默认地址', e)
				let data = e.detail.value
				let mapId = data.split('&')[0]
				let num = data.split('&')[1]

				this.getAddressList(mapId, '1')
			},
			//删除地址
			getRemoveMap(e) {
				let _this = this
				_this.$http.getDeletemap({
						id: e
					})
					.then(res => {
						console.log('删除地址', res)
						if (res.data.code == 1) {
							uni.showToast({
								title: '删除成功'
							})
							_this.getMapList()
						} else {
							uni.showToast({
								title: '删除失败',
								icon: 'none'
							})
						}

					})
			},
			//设置默认地址
			getAddressList(id, b) {
				let _this = this
				_this.$http.getSetmorenmap({
						uid: _this.userId,
						id: id,
						is_default: b
					})
					.then(res => {
						console.log('保存默认地址', res)
						if (res.data.code == 1) {
							uni.showToast({
								title: '设置成功'
							})
							
						}
						_this.getMapList()
					})
			},
			spikReceiving2() {
				uni.navigateTo({
					url: './receiving-2'
				})
			},
			spikReceiving3(id) {
				uni.navigateTo({
					url: '././editAddress?id=' + id
				})
			}

		},
		

	}
</script>

<style lang="scss" scoped>
	.receiving {
		width: 100%;
		height: 100vh;
		padding-top: 30rpx;
		background-color: #f7f8fc;

		.receBox {
			width: 100%;
			margin-bottom: 30rpx;
			background-color: #FFFFFF;

			.receCont {
				padding: 35rpx 30rpx;
				border-bottom: 2rpx solid #e1e1e1;
				position: relative;

				.con-title {
					display: flex;
					align-items: flex-end;

					.t-h1 {
						font-size: 34rpx;
						color: #333333;
					}

					.t-h2 {
						font-size: 26rpx;
						letter-spacing: 2rpx;
						color: #999999;
						padding: 0 20rpx;
					}

					.t-h3 {
						color: #45b787;
						font-size: 26rpx;
						border: 2rpx solid #45b787;
						padding: 0 20rpx;
						border-radius: 15rpx;
					}
				}

				.con-map {
					padding: 15rpx 0;

					text {
						color: #666666;
						font-size: 30rpx;
						padding-right: 15rpx;
					}
				}

				.con-messMap {
					color: #666666;
					font-size: 30rpx;
				}

				.conFixed {

					position: absolute;
					right: 30rpx;
					top: 50%;
					transform: translateY(-50%);
					width: 70rpx;
					height: 70rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}
			}

			.receBott {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 30rpx;

				.bott-left {
					padding: 15rpx 0;
					font-size: 28rpx;
					color: #666666;
				}

				.bott-right {
					color: #666666;
					font-size: 28rpx;
				}
			}
		}

		.messAddCar {
			margin-top: 20rpx;
			width: 100%;
			padding: 20rpx 0;
			background-color: #FFFFFF;
			text-align: center;

			.img {
				width: 50rpx;
				height: 50rpx;
				
			}
		}
	}
</style>
