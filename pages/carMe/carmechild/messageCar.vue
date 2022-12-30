<template>
	<view class="messCar">
		<view class="mesbox">
			<!-- <view class="mesTop">
				<view class="text">{{carBrand}}</view>
				<view class="textFixed">删除</view>
			</view> -->
			<view class="carset_con" @tap="spikcontrol">
				<view class="carset_left">上传照片</view>
				<view class="carset_right">
					<view class="rigImg">
						<image :src="'https://xcx.yichedi.com'+carImage" mode=""></image>
					</view>
					<image class="right" src="@/static/image/right_skip.png"></image>
				</view>
			</view>
			<!-- @tap="spikcontrol" -->
			<view class="carset_con">
				<view class="carset_left">车品牌</view>
				<view class="carset_right">
					<input type="text" v-model="car_brand" placeholder="请选择车品牌" @input="inputChange">
					<image class="right" src="@/static/image/right_skip.png"></image>
				</view> 
			</view>
			<view class=""  v-if="carp != '' " style="height: 500rpx;">
				<scroll-view scroll-y="true" class="a-lists" style="height: 500rpx;">
					<view class="carset_con1">
						<!-- <view class="carset_left">车品牌</view> -->
						<view class="carset_right" v-for="(item, index) in carAll" :key="index">
							<view class="name"@click="change(item)">{{item.fname}}</view>
							<!-- <image class="right" src="@/static/image/right_skip.png"></image> -->
						</view> 
					</view>
				</scroll-view>
			</view>
			<view class="carset_con" >
				<view class="carset_left">车型号</view>
				<view class="carset_right">
					<input type="text" v-model="car_service" placeholder="请选择车型号" @input="marking">
					<image class="right" src="@/static/image/right_skip.png"></image>
				</view> 
			</view>
			<view class="" v-if="carx != ''">
				<scroll-view scroll-y="true" >
					<view class="carset_con1">
						<!-- <view class="carset_left">车品牌</view> -->
						<view class="carset_right" v-for="(item,index) in servieAll" :key="index">
							<view class="name" @click="change1(item)">{{item.name}}</view>
							<!-- <image class="right" src="@/static/image/right_skip.png"></image> -->
						</view> 
					</view>
				</scroll-view>
			</view>
			<view class="carset_con">
				<view class="carset_left">车牌号</view>
				<view class="carset_right">
					<input type="text" v-model="carRegistrantion" placeholder="请输入车牌号">
					<image class="right" src="@/static/image/right_skip.png"></image>
				</view> 
			</view>
			<view class="carset_con">
				<view class="carset_left">汽车颜色</view>
				<view class="carset_right">
					<input type="text" v-model="Colour" placeholder="请输入颜色">
					<image class="right" src="@/static/image/right_skip.png"></image>
				</view> 
			</view>
			<view class="carset_con">
				<view class="carset_left">车年份</view>
				<view class="carset_right">
					<input type="text" v-model="Year" placeholder="请输入车的年份">
					<!-- <view class="rigImg">2年</view> -->
					<image class="right" src="@/static/image/right_skip.png"></image>
				</view>
			</view>
			<view class="carset_con">
				<view class="carset_left">车架号</view>
				<view class="carset_right">
					<input type="text" v-model="carFrame" placeholder="请输入车架号">
					<!-- <view class="rigImg">y2j3j1l2l3i4jjswjw</view> -->
					<image class="right" src="@/static/image/right_skip.png"></image>
				</view>
			</view>
			<view class="carset_con"></view>
		</view>
		
		<view class="messAddCar"  @click="addCar">
			<!-- <image @click="add" class="img" src="@/static/image/addg.png" mode=""></image> -->
			<text>保存</text>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 获取用户id
				userid: uni.getStorageSync('UID'),
				// 爱车 图片
				carImage: '',
				// 车品牌
				carBrand: '',
				// 车型号
				Marking: '',
				// 年份
				Year: '',
				// 车的颜色
				Colour: '',
				// 车架号
				carFrame: '',
				// 牌照
				carRegistrantion: '',
				Brand: '',
				// 模糊查询所有数据
				carAll: [],
				// 每一个品牌
				car_brand: '',
				// 每一个品牌ID
				brandID: '',
				// 车系
				carMarking: '',
				// 所有车系数据
				servieAll: '',
				// 每一个车系数据
				car_service: '',
				// 每一个车系ID
				markingID: '',
				all: false,
				all_a: false,
				
				/* 判断车品牌选择 */
				carp:'',
				/* 判断车型号 */
				carx:'',
				
			}
		},
		methods: {
			change(item) {
				console.log('item', item)
				console.log('点击每一个品牌',this.car_brand)
				this.car_brand = item.fname
				this.carp = ''
				this.brandID = item.brand_id
				this.servieAll = item.child
				console.log('刷多少',this.brandID)
				console.log('系i嘻嘻',this.servieAll)
				this.all = false
			},
			inputChange(e) {
				this.Brand = e.detail.value
				this.carp = e.detail.value
				console.log('event',e)
				let that = this
				that.$http.userBrand({
					brand: that.Brand
				})
				.then(res=> {
					console.log('品牌', res)
					that.carAll = res.data.data.action
					console.log('所有车品牌',that.carAll)
					that.all = true
				})
			},
			// 车型号
			marking(e) {
				console.log('车系', e)
				this.carx = e.detail.value
				let _this = this
				let p = {
					serve: _this.Marking,
					brand_id: _this.brandID
				}
				console.log("d", p)
				_this.$http.userService(p)
				
				.then(res=> {
					console.log('车系1',res)
					_this.servieAll = res.data.data.action
					console.log('二级联动',_this.servieAll)
					_this.all_a = true
				})
			},
			// 触发每一个车系事件
			change1(item) {
				console.log('匆匆匆匆',item)
				this.car_service = item.name
				this.carx = ''
				console.log('车系名字',this.car_service)
				this.markingID = item.seriesid
				console.log('车系id', this.markingID)
				this.all_a = false
			},
			// 添加爱车信息
			addCar() {
				if(this.car_brand != '' && this.car_service != '' && this.carRegistrantion != '' && this.Colour != '' && this.Year != '' && this.carFrame != '' && this.carImage != ''){
					
					let that = this
					let p = {
						user_id: that.userid,
						image: that.carImage,
						brand: that.brandID,
						marking: that.markingID,
						year: that.Year,
						colour: that.Colour,
						frame: that.carFrame,
						registration: that.carRegistrantion
					}
					console.log('爱车信息',p)
					that.$http.addCar(p)
					.then(res=> {
						console.log('爱车',res)
						uni.showToast({
							icon:"none",
							title:res.data.msg,
							success: (req) => {
								setTimeout(()=>{
									uni.navigateBack({
										delta:1
									})
								},2000)
							}
						})
					})
					
					
				}else {
					uni.showToast({
						icon:'none',
						title:'请填写完整信息'
					})
				}
				
				
			},
			//选着车图片
			spikcontrol() {
				let that = this
				that.$upload.uploadImg(1, res => {
					this.carImage = res
					console.log('上传图片',res)
				})
			},
			// wayBrand() {
			// 	let that = this
			// 	that.$http.userBrand({
			// 		brand: that.Brand
			// 	})
			// 	.then(res=> {
			// 		console.log('品牌', res)
			// 	})
			// }
		},
		onLoad() {
		// this.wayBrand()
		}
	}
</script>

<style lang="scss" scoped>
	.messCar{
		padding-top: 30rpx;
		width: 100%;
		height: 100vh;
		background-color: #f7f8fc;
		.mesbox{
			margin-bottom: 30rpx;
			color: #333333;
			// .carset_cons {
			// 	display: none;
			// }
			.mesTop{
				width: 100%;
				padding: 22.5rpx 0;
				background-color: #45b787;
				position: relative;
				.text{
					color: #FFFFFF;
					text-align: center;
					letter-spacing: 2rpx;
				}
				.textFixed{
					position: absolute;
					right: 20rpx;
					top:50%;
					font-size: 28rpx;
					padding: 6rpx 30rpx;
					border-radius: 50rpx;
					transform: translateY(-50%);
					background-color: #e5e5e5;
				}
			}
			.carset_con1 {
				height: 500rpx;
				.name {
					// text-align: center;
					width: 90%;
					margin:20rpx auto;
					padding: 20rpx 0rpx;
					border-bottom: 1rpx solid #e5e5e5;
				}
			}
			.carset_con{
				width: 100%;
				padding: 30rpx 0;
				display: flex;
				justify-content: space-between;
				align-items: center;
				background-color: #ffffff;
				border-bottom: 2rpx solid #e1e1e1;
				.iput {
					text-align: center;
				}
				.carset_left{
					padding-left: 30rpx;
				}
				.carset_right{
					display: flex;
					align-items: center;
					color: #666666;
					font-size: 26rpx;
					padding-right: 30rpx;
					
					.rigImg{
						letter-spacing: 2rpx;
						image{
								width: 110rpx;
								height: 80rpx;
						}
					}
					.right{
						padding-left: 20rpx;
						width: 20rpx;
						height: 30rpx;
					}
					
				}
			}
			.carset_con:last-child{
				border-bottom: none;
			}
		}
		
		.messAddCar{
			margin: auto;
			width: 90%;
			padding: 20rpx 0;
			background-color: #ffffff;
			text-align: center;
			.img{
				width: 50rpx;
				height: 50rpx;
			}
		}
	}
</style>
