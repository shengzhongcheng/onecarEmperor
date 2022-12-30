<template>
	<!-- 师傅认证 -->
	<view class="masterAuth" :style="{'height':maskHeight+'px'}">
		

		
		<view class="masterList">
			<view class="listBox">
				<view class="box-name"><text style="color: red;">*</text>姓名</view>
				<view class="box-right">
					<input type="text" v-model="realname" :placeholder="userinfor.realname || '请输入姓名'" :disabled="userinfor.realname != null?true:false " />
					<image class="img" src="@/static/image/right_skip.png" mode=""></image>
				</view>
			</view>
			<view class="listBox">
				<view class="box-name"><text style="color: red;">*</text>性别</view>
				<view class="box-right">
					<!-- <input type="text" v-model="res.gender" /> -->
					<view class="uni-list-cell-db">
						<picker @change="bindPickerChange" :value="index" :range="array" :disabled="userinfor.gender != null?true:false">
							<view class="uni-input">{{array[index] || userinfor.gender}}</view>
						</picker>
					</view>
					<image class="img" src="@/static/image/right_skip.png" mode=""></image>
				</view>
			</view>
			<view class="listBox">
				<view class="box-name"><text style="color: red;">*</text>年龄</view>
				<view class="box-right">
					<input type="text" :placeholder="userinfor.age || '请输入年龄'" :disabled="userinfor.age != null?true:false"  v-model="age" />
					<image class="img" src="@/static/image/right_skip.png" mode=""></image>
				</view>
			</view>
			<view class="listBox">
				<view class="box-name"><text style="color: red;">*</text>手机号</view>
				<view class="box-right">
					<input type="text" v-model="mobile" :placeholder="userinfor.mobile || '请输入手机号'" :disabled="userinfor.mobile != null?true:false" />
					<image class="img" src="@/static/image/right_skip.png" mode=""></image>
				</view>
			</view>
			<view class="listBox" v-if="userinfor == null || userinfor.length == 0">
				<view class="box-name"><text style="color: red;">*</text>密码</view>
				<view class="box-right">
					<input type="password" v-model="password" :placeholder="userinfor.pwd || '请输入密码'" :disabled="userinfor.pwd != null?true:false" />
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
				<!-- <view class="box-name">上传身份证</view> -->
				
				<view class="boxUp" >
					<view class="box-name"><text style="color: red;">*</text>请上传身份证正面：<!-- <input type="text" placeholder="当前身份证号码" v-model="sfID" :disabled="true"> --></view>
					<view class="imaOne"  @click="wayUpLoad()">
						<image class="image1" :src="sfzz_image" mode="" v-if="sfzz_image"></image>
						<image class="image1" src="@/static/image/idz.jpg" mode="" v-else></image>
						<view class="imgOneFixed"  v-if="!sfzz_image">
							<image src="@/static/image/add1.png" mode="" >
							</image>
						</view>
					</view>
					<view class="box-name"><text style="color: red;">*</text>请上传身份证反面：<!-- <input type="text" v-model="office" placeholder="发证机关" :disabled="true"> --></view>
					<view class="imaOne" @click="wayUpLoad1()">
						<image class="image1" :src="sfzf_image" mode="" v-if="sfzf_image"></image>
						<image class="image1" src="@/static/image/idf.jpg" mode="" v-else></image>
						<view class="imgOneFixed"  v-if="!sfzf_image">
							<image src="@/static/image/add1.png" mode="" >
							</image>
						</view>
					</view>
				</view>
			</view>
			<view class="lisZhnshu">
				<view class="box-name">上传资格证书</view>
				<view class="shuBox" >
					<view class="boxshang" @click="wayUpLoad2()">
						<template v-if="!zgz_image">
							<view @click="wayUpLoad2()">点击上传</view>
							<image class="imgee" src="@/static/image/add1.png" mode="" v-model="zgz_image"></image>
						</template>
						<image :src="zgz_image" class="zgz_image" mode="" v-else></image>
					</view>
				</view>
			</view>
		</view>
		<view class="xieyi">
			<!-- 用户协议 -->
			<view class="">勾选表示您已同意</view>
			<checkbox-group class="checbox" name="checkbox" @change="changes">
				<label>
					<checkbox value="checkbox1" class="chebok"/>
					
					<u-popup  mode="center" :show="show" @click.stop.native="()=>{}" @close="close"  >
					  <scroll-view class="scoll" scroll-y="true">
							<view class="content">
								{{content}}
								<!-- <rich-text :nodes="content.agreement"></rich-text> -->
							</view>
					  </scroll-view>
					</u-popup>
				</label>
				<text @click.stop="opens" class="text-content">《用户协议》</text>
			</checkbox-group>
			<!-- 隐私协议 -->
			<checkbox-group class="checbox" name="checkbox" @change="changess">
				<label>
					<!-- <checkbox value="checkbox2" /> -->
					
					<u-popup  mode="center" :show="ysf" @click.stop.native="()=>{}" @close="closes"  >
					  <scroll-view class="scoll" scroll-y="true">
							<view class="content">
								{{content}}
								<!-- <rich-text :nodes="content.privacy"></rich-text> -->
							</view>
					  </scroll-view>
					</u-popup>
				</label>
				
				<text @click.stop="ys" class="text-content">《隐私协议》</text>
			</checkbox-group>
			
		</view>
		<view class="renzhen" @click="wayShif()" v-if="userinfor.length == 0">
			下一步
		</view>
		
		<view class="renzhen"  v-if="userinfor.status == 'normal'">
			已通过
		</view>
		<view class="renzhen"  v-if="userinfor.status == 'hidden'">
			审核中
		</view>
		<view class="renzhen" @click="lose()" v-if="userinfor.status == 'reject'">
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
				useID: uni.getStorageSync('UID'),
				maskHeight: 0, // 屏幕高度
				// 用户名字
				realname: '',
				// 年龄
				age: '',
				// 手机号
				mobile: '',
				//推广码
				plug:'',
				// 性别
				gender: '',
				// 身份证正面
				sfzz_image: '',
				// 身份证反面
				sfzf_image: '',
				// 上传资格证书
				zgz_image: '',
				array: ['男', '女'],
				index: 0,
				Type: '2',
				// 密码
				password: '',
				//用户上传的全部信息
				userinfor:[],
				//商家信息id
				sid:null,
				content: '',
				show: false,
				ysf:false,
				showss: false,
				showw: false,
				
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
		
		onLoad() {
			let _this = this
			uni.getSystemInfo({
				success(res) {
					// console.log('高度',res)
					_this.maskHeight = res.screenHeight
					console.log('高度',_this.maskHeight)
				}
			})
			this.shifOrshop()
			// this.wayTreaty()
		},
		// onShow() {
		// 	this.shifOrshop()
		// },
		methods: {
			aaa(){
				console.log(this.sfzz_image)
			},
			changess(e) {
				console.log(e)
				if(this.showw==true) {
					this.showw=false
				} else if (this.showw==false) {
					this.showw=true
				}
			},
			close() {
				this.show = false
			},
			closes() {
				this.ysf = false
			},
			changes(e) {
				console.log(e)
				if(this.showss==true) {
					this.showss=false
				} else if (this.showss==false) {
					this.showss=true
				}
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
				//  	// console.log('res',res)
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
					 
				// 	 // console.log('res',res)
				 	
				//  	that.content = res.data.data.action
				//  })
			},
			// wayTreaty() {
			// 	let that = this
			// 	that.$http.treaty()
			// 	.then(res=> {
			// 		console.log('res',res)
			// 		that.content = res.data.data.action
			// 	})
			// },
			//审核失败
			lose(){
				let that = this
				let k = {
					type:2,
					id:that.sid
				}
				that.$http.loselist(k)
				.then(res =>{
					console.log('我是驳回了',res)
					that.userinfor = []
					that.sfzz_image = ''
					that.sfzf_image = ''
					that.zgz_image = ''
					that.shifOrshop()
				})
				
			},
			
			// 师傅信息
			async shifOrshop() {
				const res = await uni.$http.post('api/v1/appx/retApp',{
					type: this.Type,
					user_id: this.useID
				})
				if(res.data.data){
					this.userinfor = res.data.data
					//身份证正面
					this.sfzz_image = res.data.data.sfzz_image
					//身份证反面
					this.sfzf_image = res.data.data.sfzf_image
					console.log('sff',this.sfzf_image)
					//资格证书
					this.zgz_image = res.data.data.zgz_image
					//商家信息id
					this.sid = res.data.data.id
					console.log('师傅商家',s)
				}
				
				
				
				
				// let that = this
				// let s= {
				// 	type: that.Type,
				// 	user_id: that.useID
				// }
				// console.log('参数',s)
				// that.$http.shifOrshop(s)
				// .then(res=> {
				// 	console.log('用户师傅信息',res)
				// 	if(res.data.data){
				// 		that.userinfor = res.data.data
				// 		//身份证正面
				// 		that.sfzz_image = res.data.data.sfzz_image
				// 		//身份证反面
				// 		that.sfzf_image = res.data.data.sfzf_image
				// 		console.log('sff',that.sfzf_image)
				// 		//资格证书
				// 		that.zgz_image = res.data.data.zgz_image
				// 		//商家信息id
				// 		that.sid = res.data.data.id
				// 		console.log('师傅商家',s)
				// 	}
					
				// })
			},
			// 性别弹框
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.index = e.detail.value
			},
			// 师傅申请入驻
			wayShif() {
				console.log(uni.$u.test.rangeLength(this.password, [6, 25]));
				console.log(uni.$u.test.mobile(this.mobile))
				
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
				}else if(this.password == ''){
					uni.showToast({
						icon:"none",
						title:'请输入密码'
					})
				}else if(!uni.$u.test.rangeLength(this.password, [6, 25])){
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
					let d = {
						password: this.password,
						user_id: this.useID,
						realname: this.realname,
						gender: this.array[this.index],
						age: this.age,
						mobile: this.mobile,
						sfzz_image: this.sfzz_image,
						sfzf_image: this.sfzf_image,
						zgz_image: this.zgz_image,
						selfi:'',
						plug:this.plug,
						typesf:'1',
					}
					uni.navigateTo({
						url:"/pages/faceshibie/faceshibie?sfid="+this.sfID+'&name='+this.sfname+'&user='+JSON.stringify(d)
					})
					// // #ifdef APP
					// 	uni.navigateTo({
					// 		url:'/pages/user/face?sfid='+this.sfID+'&name='+this.sfname+'&user='+JSON.stringify(d)
					// 	})
					// // #endif
					
				}
				
				
				
				
				// let that = this
				// let d = {
				// 	password: that.password,
				// 	user_id: that.useID,
				// 	realname: that.realname,
				// 	gender: that.array[that.index],
				// 	age: that.age,
				// 	mobile: that.mobile,
				// 	sfzz_image: that.sfzz_image,
				// 	sfzf_image: that.sfzf_image,
				// 	zgz_image: that.zgz_image
				// }
				// if(that.showss==true && that.showw==true) {
				// 	that.$http.postShifApp(d)
				// 		.then(res => {
				// 			console.log('data', res)
				// 			// 认证成功提示语
				// 			uni.showToast({
				// 				title: res.data.msg,
				// 				duration: 2000,
				// 			 icon: 'none'
				// 			})
				// 			// 认证成功后跳转到上一页
				// 			setTimeout(() => {
				// 				uni.navigateBack({
				// 					delta:1
				// 				})
				// 			}, 1000)
				// 		})
				// } else if(that.showss==false || that.showw==false) {
				// 	uni.showToast({
				// 		title:'请勾选用户协议和隐私协议',
				// 		icon:"none"
				// 	})
				// }
				
			},
			// 上传身份证正面
			wayUpLoad() {
				let that = this
				if(!this.sfzz_image){
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
			wayUpLoad1() {
				let that = this
				if(!this.sfzf_image) {
					that.$upload.uploadImg(1, res => {
						this.sfzf_image = 'https://xcx.yichedi.com' + res
						console.log('上传图片', this.sfzf_image)
						this.sfzfshibie(this.sfzf_image)//识别身份证正面
					})
				}
			},
			// 上传资格证书
			wayUpLoad2() {
				let that = this
				if(!this.zgz_image) {
					that.$upload.uploadImg(1, res => {
						this.zgz_image = 'https://xcx.yichedi.com' + res
						console.log('上传图片', this.zgz_image)
					})
				}
			}
		},
		
	}
</script>

<style lang="scss" scoped>
	.masterAuth {
		width: 100%;
		padding-top: 30rpx;
		background-color: #f7f8fc;

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
					.shengfenz{
						width: 90%;
						margin: auto;
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
