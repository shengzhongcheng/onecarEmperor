<template>
	<!-- 商家认证 -->
	<view class="merchant-car" :style="{'height':maskHeight+'px'}">
		<view class="masterList">
			<view class="listBox">
				<view class="box-name"><text style="color: red;">*</text>姓名</view>
				<view class="box-right">
					<input type="text" v-model="realname" :placeholder="shopinfor.realname || '请输入姓名'" :disabled="shopinfor.realname != null?true:false" />
					<image class="img" src="@/static/image/right_skip.png" mode=""></image>
				</view>
			</view>
			<view class="listBox">
				<view class="box-name"><text style="color: red;">*</text>性别</view>
				<view class="box-right">
<!-- 					<input type="text" v-model="res.gender" /> -->
					<view class="uni-list-cell-db">
						<picker @change="bindPickerChange" :value="index" :range="array" :disabled="shopinfor.gender != null?true:false">
							<view class="uni-input">{{array[index] || shopinfor.gender}}</view>
						</picker>
					</view>
					<image class="img" src="@/static/image/right_skip.png" mode=""></image>
				</view>
			</view>
			<view class="listBox">
				<view class="box-name"><text style="color: red;">*</text>年龄</view>
				<view class="box-right">
					<input type="text" value="18" :placeholder="shopinfor.age || '请输入年龄'" :disabled="shopinfor.age != null?true:false" v-model="age" />
					<image class="img" src="@/static/image/right_skip.png" mode=""></image>
				</view>
			</view>
			<view class="listBox">
				<view class="box-name"><text style="color: red;">*</text>手机号</view>
				<view class="box-right">
					<input type="text" v-model="mobile" :placeholder="shopinfor.mobile || '请输入手机号'" :disabled="shopinfor.mobile != null?true:false"/>
					<image class="img" src="@/static/image/right_skip.png" mode=""></image>
				</view>
			</view>
			<view class="listBox" v-if="shopinfor.shop == null">
				<view class="box-name"><text style="color: red;">*</text>密码</view>
				<view class="box-right">
					<input type="password" v-model="pwd" :placeholder="shopinfor.pwd || '请输入密码'" :disabled="shopinfor.pwd != null?true:false"/>
					<image class="img" src="@/static/image/right_skip.png" mode=""></image>
				</view>
			</view>
			<view class="listBox">
				<view class="box-name">推广码</view>
				<view class="box-right">
					<input type="text" v-model="plug" placeholder="请输入推广码" />
					<image class="img" src="@/static/image/right_skip.png" mode=""></image>
				</view>
			</view>
			<view class="tishi">(申请成功后该密码将用于您登录商户端app与商家后台管理系统)</view>
			<view class="lisZhnshu">
				
				<view class="boxUp">
					<view class="box-name"><text style="color: red;">*</text>请上传身份证正面：<!-- <input type="text" v-model="sfID" placeholder="当前身份证号码" :disabled="true"> --></view>
					<view class="imaOne" @click="shopUpload()">
						<image class="image1" :src="sfzz_image" mode="" v-if="sfzz_image"></image>
						<image class="image1" src="@/static/image/idz.jpg" mode="" v-else></image>
						<view class="imgOneFixed" v-if="!sfzz_image">
							<image src="@/static/image/add1.png" mode=""></image>
						</view>
					</view>
					<view class="box-name"><text style="color: red;">*</text>请上传身份证反面：<!-- <input type="text" v-model="office" placeholder="发证机关" :disabled="true"> --></view>
					<view class="imaOne" @click="shopUpload1()">
						<image class="image1" :src="sfzf_image" mode="" v-if="sfzf_image"></image>
						<image class="image1" src="@/static/image/idf.jpg" mode="" v-else></image>
						<view class="imgOneFixed" v-if="!sfzf_image">
							<image src="@/static/image/add1.png" mode="" ></image>
						</view>
					</view>
				</view>
			</view>
			<view class="lisZhnshu">
				<view class="box-name">上传商家信息(如门店照片、门头照片等)</view>
				<view class="shuBox">
					<view class="boxshang" @click="shopUpload2()">
						<template v-if="!image">
							<view>点击上传</view>
							<image class="imgee" src="@/static/image/add1.png" mode="" >
							</image>
						</template>
						<image :src="image" class="zgz_image" mode="" v-else></image>
					</view>
				</view>
				<view class="box-name">上传技师资格证</view>
				<view class="shuBox">
					<view class="boxshang" @click="shopUpload3()">
						<template v-if="!zgz_image">
							<view >点击上传</view>
							<image class="imgee" src="@/static/image/add1.png" mode="" >
							</image>
						</template>
						<image :src="zgz_image" class="zgz_image" mode="" v-else></image>
					</view>
				</view>
				<view class="box-name">上传营业执照</view>
				<view class="shuBox">
					<view class="boxshang" @click="shopUpload4()">
						<template v-if="!yyzz_images">
							<view >点击上传</view>
							<image class="imgee" src="@/static/image/add1.png" mode="" >
							</image>
						</template>
						<image :src="yyzz_images" class="zgz_image" mode="" v-else></image>
					</view>
				</view>
			</view>
		</view>
		<view class="xieyi">
			<view class="">勾选表示您已同意</view>
			<checkbox-group class="checbox" name="checkbox" @change="changes">
				<label>
					<checkbox value="checkbox1" class="chebok" />
					<u-popup  mode="center" :show="show" @click.stop.native="()=>{}" @close="close" >
					  <scroll-view class="scoll" scroll-y="true">
							<view class="content">
								{{content}}
								<!-- <rich-text :nodes="content.agreement  "></rich-text> -->
							</view>
					  </scroll-view>
					</u-popup>
				</label>
				<text @click="opens" class="text-content">《用户协议》</text>
				<!-- <text @click="open" class="text-content">隐私协议</text> -->
			</checkbox-group>
			<checkbox-group class="checbox" name="checkbox" @change="changess">
				<label>
					<!-- <checkbox value="checkbox2" /> -->
					<u-popup  mode="center" @click.stop.native="()=>{}" :show="ysf" @close="closes" >
					  <scroll-view class="scoll" scroll-y="true">
							<view class="content">
								{{content}}
								<!-- <rich-text :nodes="content.privacy"></rich-text> -->
							</view>
					  </scroll-view>
					</u-popup>
				</label>
				<!-- <text @click="open" class="text-content">用户协议</text> -->
				<text @click="ys" class="text-content">《隐私协议》</text>
			</checkbox-group>
		</view>
		<view class="renzhen" v-if="shopinfor.shop == null" @click="wayShop()">
			下一步
		</view>
		<view class="renzhen"  v-if="shopinfor.status == 'normal'">
			已通过
		</view>
		<view class="renzhen"  v-if="shopinfor.status == 'hidden'">
			审核中
		</view>
		<view class="renzhen" @click="loses()" v-if="shopinfor.status == 'reject'">
			审核失败，请重新填写
		</view>
		
		<view class="zw"></view>
		<!-- <view class="masterMess">
			遇到问题了? 点击联系客服
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				useID: uni.getStorageSync('user_id'),
				maskHeight: 0, // 屏幕高度
				// 商家名字
				realname: '',
				// 性别
				gender: '',
				// 年龄
				age: '',
				// 手机号
				mobile: '',
				// 身份证正面
				sfzz_image: '',
				// 身份证反面
				sfzf_image: '',
				// 商家信息,门头照
				image: '',
				//密码
				pwd:'',
				//推广码
				plug:'',
				// 营业执照
				yyzz_images: '',
				// 资格证
				zgz_image: '',
				array: ['男', '女'],
				index: 0,
				// 密码
				password: '',
				//商家上传的全部信息
				shopinfor:[],
				//商家信息id
				ssid:null,
				Type: 1,
				content: '',
				show: false,
				showss: false,
				showw:false,
				/* 隐私协议 */
				ysf:false,
				
				
				
				//识别到的身份证号码
				sfID:'',
				//识别到的姓名
				sfname:'',
				//识别到的身份证年龄
				sford:'',
				//识别到的身份证性别
				Gender:'',
				//发证机关
				office:'',
				//有效期
				youxiao:'',
				
			}
		},
		
		// onShow() {
		// 	this.shopOrshop()
		// },
		onLoad() {
			let _this = this
			uni.getSystemInfo({
				success(res) {
					_this.maskHeight = res.screenHeight
				}
			})
			// this.shopOrshop()
		},
		methods: {

			changess(e) {
				if(this.showw==true) {
					this.showw=false
				} else if (this.showw==false) {
					this.showw=true
				}
			},
			changes(e) {
				console.log(e)
				if(this.showss==true) {
					this.showss=false
				} else if (this.showss==false) {
					this.showss=true
				}
			},
			
			close() {
				this.show = false
			},
			
			closes() {
				this.ysf = false
			},
			
			//隐私协议
			async ys(){
				console.log('协议')
				this.ysf = true
				const res = await uni.$http.post('api/jiu/yinsixieyi/shanghuxieyi')
				console.log(res.data.data)
				this.content = res.data.data
				
				
				// console.log('隐私')
				//  this.ysf = true
				//  let that = this
				//  that.$http.treaty()
				//  .then(res=> {
				//  	console.log('res',res)
				//  	that.content = res.data.data.action
				//  })
			},
			
			
			
			// 用户协议
			async opens() {
				console.log('协议')
				 this.show = true
				const res = await uni.$http.post('api/jiu/yinsixieyi/userxieyi')
				console.log(res.data.data)
				this.content = res.data.data
				
				
				// console.log('协议')
				//  this.show = true
				//  let that = this
				//  that.$http.treaty()
				//  .then(res=> {
				//  	console.log('res',res)
				//  	that.content = res.data.data.action
				//  })
			},
			//审核失败
			async loses(){
			
			const res = await uni.$http.get('api/v1/appx/retdel',{
				type:1,
				id:this.sid
			})
				console.log('我是驳回了',res)
				this.shopinfor = []
				this.sfzz_image = ''
				this.sfzf_image = ''
				this.zgz_image = ''
				this.image = ''
				this.yyzz_images = ''
				this.shopOrshop()
			
			
				// let that = this
				// let k = {
				// 	type:1,
				// 	id:that.sid
				// }
				// that.$http.loselist(k)
				// .then(res =>{
				// 	console.log('我是驳回了',res)
				// 	that.shopinfor = []
				// 	that.sfzz_image = ''
				// 	that.sfzf_image = ''
				// 	that.zgz_image = ''
				// 	that.image = ''
				// 	that.yyzz_images = ''
				// 	that.shopOrshop()
				// })
				
			},
			// 商家信息
			async shopOrshop() {
				const res = await uni.$http.post('api/v1/appx/retApp',{
					type: this.Type,
					user_id: this.useID
				})
				console.log('123',res)
				this.shopinfor = res.data.data
				// 身份证正面
				this.sfzz_image = res.data.data.sfzz_image
				// 身份证反面
				this.sfzf_image = res.data.data.sfzf_image
				// 资格证书
				this.zgz_image = res.data.data.zgz_image
				// 营业执照
				this.yyzz_images = res.data.data.shop.yyzz_images
				// 商家信息
				this.image = res.data.data.shop.image
				//商家信息id
				this.ssid = res.data.data.id
				console.log('师傅商家',s)
				
				
				
				
				// let that = this
				// let s= {
				// 	type: that.Type,
				// 	user_id: that.useID
				// }
				// that.$http.shifOrshop(s)
				// .then(res=> {
				// 	console.log('123',res)
				// 	that.shopinfor = res.data.data
				// 	// 身份证正面
				// 	that.sfzz_image = res.data.data.sfzz_image
				// 	// 身份证反面
				// 	that.sfzf_image = res.data.data.sfzf_image
				// 	// 资格证书
				// 	that.zgz_image = res.data.data.zgz_image
				// 	// 营业执照
				// 	that.yyzz_images = res.data.data.shop.yyzz_images
				// 	// 商家信息
				// 	that.image = res.data.data.shop.image
				// 	//商家信息id
				// 	that.ssid = res.data.data.id
				// 	console.log('师傅商家',s)
				// })
			},
			// 性别弹框
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.index = e.detail.value
			},
			// 商家认证
			wayShop() {
				if(this.realname != this.sfname){
					uni.showToast({
						icon:"none",
						title:'用户身份证姓名不匹配'
					})
				}else if(this.array[this.index] != this.Gender){
					uni.showToast({
						icon:"none",
						title:'用户身份证性别不匹配'
					})
				}else if(this.sfID == '' || this.sfname == '' || this.sford == '' || this.office == '' || this.youxiao == ''){
					uni.showToast({
						icon:"none",
						title:'请上传身份证正反面'
					})
				}else if(this.realname == ''){
					uni.showToast({
						icon:"none",
						title:'请填写姓名'
					})
				}else if(this.age == ''){
					uni.showToast({
						icon:"none",
						title:'请填写年龄'
					})
				}else if(this.mobile == ''){
					uni.showToast({
						icon:"none",
						title:'请填写手机号'
					})
				}else if(this.pwd == ''){
					uni.showToast({
						icon:"none",
						title:'请输入密码'
					})
				}else if(!uni.$u.test.rangeLength(this.pwd, [6, 25])){
					uni.showToast({
						icon:"none",
						title:'密码长度需为6~25位数字、字母'
					})
				}else if(!uni.$u.test.mobile(this.mobile)){
					uni.showToast({
						icon:"none",
						title:'手机号码不正确'
					})
				}else if(this.showss == false){
					uni.showToast({
						icon:"none",
						title:'请勾选用户协议和隐私协议'
					})
				}else{
					let p = {
						password: this.pwd,
						user_id: this.useID,
						realname: this.realname,
						gender: this.array[this.index],
						age: this.age,
						mobile: this.mobile,
						sfzz_image: this.sfzz_image,
						sfzf_image: this.sfzf_image,
						image: this.image,
						yyzz_images: this.yyzz_images,
						zgz_image: this.zgz_image,
						selfi:'',
						plug:this.plug,
						typesf:'2',
					}
					console.log(p)
					uni.navigateTo({
						url:"/pages/faceshibie/faceshibie?sfid="+this.sfID+'&name='+this.sfname+'&user='+JSON.stringify(p)
					})
					// // #ifdef APP
					// 	uni.navigateTo({
					// 		url:'/pages/user/face?sfid='+this.sfID+'&name='+this.sfname+'&user='+JSON.stringify(p)
					// 	})
					// // #endif
					// // #ifdef MP-WEIXIN
					// 	uni.navigateTo({
					// 		url:'/pages/renlianshibie/renlianshibie?sfid='+this.sfID+'&name='+this.sfname+'&user='+JSON.stringify(p)
					// 	})
					// // #endif
				}
				
				
				
				// let that = this
				// let p = {
				// 	password: that.pwd,
				// 	user_id: that.useID,
				// 	realname: that.realname,
				// 	gender: that.array[that.index],
				// 	age: that.age,
				// 	mobile: that.mobile,
				// 	sfzz_image: that.sfzz_image,
				// 	sfzf_image: that.sfzf_image,
				// 	image: that.image,
				// 	yyzz_images: that.yyzz_images,
				// 	zgz_image: that.zgz_image
				// }
				// if(that.showss == true&& that.showw==true) {
				// 	that.$http.postShopApp(p)
				// 		.then(res => {
				// 			console.log('shop', res)
				// 			uni.showToast({
				// 				icon:"none",
				// 				title:res.data.msg,
				// 				duration: 2000
				// 			})
				// 			setTimeout(() => {
				// 				uni.navigateBack()
				// 			}, 2000)
				// 		})
				// } else if(that.showss ==false||that.showw==false) {
				// 	uni.showToast({
				// 		title:'请勾选用户协议和隐私协议',
				// 		icon:"none"
				// 	})
				// }
			},
			// 上传身份证正面
			shopUpload() {
				let that = this
				if(!this.sfzz_image) {
					that.$upload.uploadImg(1, res => {
						this.sfzz_image = 'https://xcx.yichedi.com' + res
						console.log('上传图片', this.sfzz_image)
						if(this.sfzz_image != ''){
							this.sfzshibie(this.sfzz_image)//识别身份证正面
						}
					})
				}
			},
			//识别身份证
			async sfzshibie(e){//正面
				uni.showLoading({
					title:"识别中，请稍等"
				})
				const req = await uni.$http.post('api/jiu/discern/main',{
					image:e
				})
				console.log('识别结果',req)
				if(req.data.data.action == null){//如果识别失败
					uni.hideLoading()
					uni.showToast({
						icon:"none",
						title:'识别失败，请重新上传',
						success: () => {
							this.sfzz_image = ''
						}
					})
				}else if(req.data.data.action.length != 6){//如果不是正面照片
				uni.hideLoading()
					uni.showToast({
						icon:"none",
						title:'请上传身份证正面',
						success: () => {
							this.sfzz_image = ''
						}
					})
				}else{//识别成功
				uni.hideLoading()
					uni.showToast({
						icon:"none",
						title:'上传成功',
						success: () => {
							this.sfID = req.data.data.action[4].Value//身份证号码
							this.sfname = req.data.data.action[0].Value//身份证姓名
							this.sford = req.data.data.action[2].Value//身份证出生日期
							this.Gender = req.data.data.action[5].Value//身份证性别
						}
					})
				}
			},
			async sfzfshibie(e){//反面
				
				const req = await uni.$http.post('api/jiu/discern/main',{
					image:e
				})
				uni.showLoading({
					title:"识别中，请稍等"
				})
				console.log('识别结果',req)
				if(req.data.data.action == null){
					uni.hideLoading()
					uni.showToast({
						icon:"none",
						title:'识别失败，请重新上传',
						success: () => {
							this.sfzf_image = ''
						}
					})
				}else if(req.data.data.action.length != 2){
					uni.showToast({
						icon:"none",
						title:'请上传身份证反面',
						success: () => {
							this.sfzf_image = ''
						}
					})
				}else{
					uni.showToast({
						icon:"none",
						title:'上传成功',
						success: () => {
							this.office = req.data.data.action[0].Value//机关
							this.youxiao = req.data.data.action[1].Value//有效期
						}
					})
				}
			},
			// 上传身份证反面
			shopUpload1() {
				let that = this
				if(!this.sfzf_image) {
					that.$upload.uploadImg(1, res => {
						this.sfzf_image = 'https://xcx.yichedi.com' + res
						console.log('上传图片', this.sfzf_image)
						if(this.sfzf_image != ''){
							this.sfzfshibie(this.sfzf_image)//识别身份证正面
						}
					})
				}
			},
			// 上传门头照
			shopUpload2() {
				let that = this
				if(!this.image) {
					that.$upload.uploadImg(1, res => {
						this.image = 'https://xcx.yichedi.com' + res
						console.log('上传图片', this.image)
					})
				}
			},
			// 上传技师资格证
			shopUpload3() {
				let that = this
				if(!this.zgz_image) {
					that.$upload.uploadImg(1, res => {
						this.zgz_image = 'https://xcx.yichedi.com' + res
						console.log('上传图片', this.zgz_image)
					})
				}
			},
			// 上传营业执照
			shopUpload4() {
				let that = this
				if(!this.yyzz_images) {
					that.$upload.uploadImg(1, res => {
						this.yyzz_images = 'https://xcx.yichedi.com' + res
						console.log('上传图片', this.yyzz_images)
					})
				}
			}
		},
		
	}
</script>

<style>
	page{
				background-color: #f7f8fc;
	}
</style>
<style lang="scss" scoped>
	.merchant-car {
		width: 100%;
		padding-top: 30rpx;


		.masterList {

			.listBox {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 20rpx 30rpx;
				border-bottom: 2rpx solid #e1e1e1;

				.box-name {
					color: #333333;
				}

				.box-right {
					display: flex;
					align-items: center;

					input {
						text-align: right;
						font-size: 30rpx;
						letter-spacing: 2rpx;
						color: #999999;
					}

					.uni-list-cell-db {
						picker {
							.uni-input {
								font-size: 30rpx;
								color: #999;
							}
						}
					}

					.img {
						padding-left: 20rpx;
						width: 20rpx;
						height: 30rpx;
					}
				}
			}
			.tishi{
				width: 90%;
				margin: auto;
				font-size: 28rpx;
				color: #d90508;
			}
			.lisZhnshu {
				width: 100%;
				padding: 20rpx 30rpx;

				.box-name {
					color: #333333;
				}

				.boxUp {
					.box-name{
						display: flex;
						input{
							width: 58%;
							background-color: #eaeaea;
							padding: 10rpx 10rpx;
						}
					}
					.imaOne {
						width: 350rpx;
						height: 220rpx;
						margin: 30rpx auto;
						position: relative;

						.image1 {
							width: 100%;
							height: 100%;
						}

						.imgOneFixed {
							width: 60rpx;
							height: 60rpx;
							background-color: #666666;
							border-radius: 50%;
							position: absolute;
							left: 50%;
							top: 50%;
							transform: translate(-50%, -50%);

							image {
								padding: 10rpx;
								box-sizing: border-box;
								width: 100%;
								height: 100%;
							}
						}
					}

				}

				.shuBox {
					width: 100%;
					margin: 30rpx 0 50rpx;

					.boxshang {
						width: 400rpx;
						height: 280rpx;
						margin: 0 auto;
						border-radius: 20rpx;
						background-color: #e1e1e1;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						color: #666666;
						font-size: 30rpx;

						.zgz_image {
							width: 100%;
							height: 100%;
							border-radius: 20rpx;
						}

						.imgee {
							width: 60rpx;
							height: 60rpx;
							padding-top: 30rpx;
						}
					}
				}
			}
		}
   .xieyi {
   		display: flex;
   		width: 690rpx;
   		padding: 15rpx 50rpx;
   		position: relative;
   		margin-left: 50rpx;
   		margin-bottom: 20rpx;
		font-size: 25rpx;
   		.chebok{
   			position: absolute;
   			left: 0rpx;
   		}
   		.text-content {
   			// margin: 0 15rpx 0 15rpx;
   			color: #45b787;
   		}
   		.checbox {
   			display: flex;
   		}
   		.scoll {
   			width: 500rpx;
   			height: 500rpx;
   			padding: 15rpx;
   			.content {
   				padding: 10rpx;
   				margin: 10rpx;
   				.text-title{
   					font-size: 30rpx;
   					font-weight: bold;
   					text-align: left;
   				}
   				.rich {
   					text-align: right;
   				}
   				.adnum {
   					margin-top: 15rpx;
   				}
   			}
   		}
   	}
		.renzhen {
			width: 690rpx;
			margin: 0 auto;
			padding: 20rpx 0;
			background-color: #45b787;
			text-align: center;
			color: #FFFFFF;
			border-radius: 40rpx;
		}

		.masterMess {
			width: 690rpx;
			margin: 0 auto;
			font-size: 24rpx;
			padding: 20rpx 0;
			color: #45b787;
		}
		.zw{
			height: 50rpx;
		}
	}
</style>
