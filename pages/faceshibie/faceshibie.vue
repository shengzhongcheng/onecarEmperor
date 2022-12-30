<template>
	<view class="content">
		<!-- <image v-for="(logoSrc,i) in logoSrcs" :key="i" class="logo" :src="logoSrc"></image> -->
		<!-- <view>
			<button @click="inter(1)">活体检测</button>
			<button @click="inter(2)">人脸图像采集</button>
			<button @click="inter(3)">摄像头权限</button>
		</view>
		<view>
			默认静音(仅Android有效)
			<switch :checked="!isSound" @change="(e)=>{isSound=!e.target.value}" />
		</view>
		<view style="margin-top: 20rpx;">
			bestImage0默认截取脸部区域
			<switch :checked="AutoClip" @change="(e)=>{AutoClip=e.target.value}" />
		</view>
		<view style="margin-top: 20rpx;">
			后置摄像头
			<switch :checked="backCamera" @change="(e)=>{backCamera=e.target.value}" />
		</view>
		<scroll-view scroll-y="true">
			<view class="msg" v-html="msg">
			</view>
		</scroll-view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				msg: '',
				logoSrcs: [],
				isSound: true,
				AutoClip: true,
				backCamera:false,
				//人脸图片
				headimage:'',
				
				//用户信息
				username:'',
				sfid:'',
				//用户填写的信息
				user:null,
				
			}
		},
		onLoad(userinfor) {
			console.log('用户',userinfor)
			this.username = userinfor.name//用户名
			this.sfid = userinfor.sfid//身份证号码
			this.user = JSON.parse(userinfor.user)
			this.inter(2)
		},
		methods: {
			inter(inx) {
				const _self = this;
				const PPFace = uni.requireNativePlugin('PP-BaiduFace');
				console.log('插件',PPFace)
				let config = {
					licenseName: 'idl-license',
					licenseSuffix: 'face-android',
					licenseId: 'yichedishangface-face-android',
					liveActionArray: ["Mouth ", "HeadLeftOrRight"],
					bgColor: "#56445D",
					textColor: "#C5E99B",
					isSound: _self.isSound, //默认是否开启语音提示（仅Android有效）默认值：false
					AutoClip: _self.AutoClip ,//自动裁剪用户脸部区域 默认：false
					isBackCamera:_self.backCamera //启用后置摄像头
				}

				if (plus.os.name == 'iOS') {
					config.licenseSuffix = 'face-ios';
					config.licenseId = 'yichedishangface-face-ios';
				}

				if (inx == 1) {
					PPFace.faceliveness(config, result => {
						_self.msg = new Date().getHours() + ':' + new Date().getMinutes() + '  ' + JSON.stringify(result) + '<br/>' +
							_self.msg;
						if (result.FaceStatusEnum == '"OK"') {
							_self.saveImgs(result.base64ImageMap);
						}
					});
					if (plus.os.name == 'Android')
						setTimeout(function() {
							PPFace.ckcamera({}, result => {});
						}, 0);
				} else if (inx == 2) {
					PPFace.recycler(config, result => {
						_self.msg = new Date().getHours() + ':' + new Date().getMinutes() + '  ' + JSON.stringify(result) + '<br/>' +
							_self.msg;
						if (result.FaceStatusEnum == '"OK"') {
							_self.saveImgs(result.base64ImageMap);
						}
					});


					if (plus.os.name == 'Android')
						setTimeout(function() {
							PPFace.ckcamera({}, result => {});
						}, 0);
				} else {
					PPFace.ckcamera({}, result => {});
				}

			},
			saveImgs(imgsobj) {
				let _self = this;
				_self.logoSrcs = [];
				for (let key in imgsobj) {
					var base64data = imgsobj[key];
					_self.bitmapsave(base64data);
				}
			},
			bitmapsave(basedata) {
				let _self = this;
				var bitmap = new plus.nativeObj.Bitmap("test");
				bitmap.loadBase64Data(basedata, function(e) {
					bitmap.save('_doc/_tmp/head' + new Date().getTime() + '.png', {}, function(e) {
						_self.logoSrcs.push(e.target);
						// console.log('图片路径',_self.logoSrcs)
						_self.upload(_self.logoSrcs[0])//上传图片
					});
				}, function() {
					console.log('加载Base64图片数据失败：' + JSON.stringify(e));
				});
			},
			//图片上传
			upload(image){
				uni.uploadFile({
					url: 'https://xcx.yichedi.com/api/common/upload/image',
					filePath: image,
					name: 'file',
					// header:{
					// 	// #ifdef MP
					// 	"Content-Type": "multipart/form-data",
					// 	// #endif
					// 	[TOKENNAME]: 'Bearer ' + store.state.app.token
					// },
					success: (uploadFileRes) => {
						console.log('图片',uploadFileRes)
						/* if(uploadFileRes){
							uni.showToast({
								title:'图片异常',
								icon:'none',
								duration:1500
							})
						} */
						// this.txt = '成功了'
						let uploadMess = JSON.parse(uploadFileRes.data)
						console.log('解析图片',uploadMess)
						if(uploadFileRes.statusCode == 200){
							let headimg = this.getImgsrc(uploadMess.data.url)
							console.log('上传',headimg);//解析的人脸图片
							this.headimage = headimg
							this.user.selfi = this.headimage//把识别图片携带到请求参数中
							if(this.headimage != ''){
								this.headshibie()//调用人脸识别
							}else{
								uni.hideLoading()
								console.log('人脸识别失败')
								uni.showToast({
									icon:"error",
									title:'人脸识别失败，请重新识别'
								})
							}
							// this.getbaiduapi(uploadMess.data.url)
							// uni.showToast({
							// 	title:'上传成功',
							// })
						}else{
							uni.showToast({
								title:uploadMess.data.msg,
								icon:'none',
								duration:1500
							})
						}
					},
					fail: (err) => {
						uni.showModal({
							title:'cw',
							content:err
						})
						// this.txt = '出错了'
					},
					complete: () => {
					}
				});
				
			},
			
			//调用人脸识别
			async headshibie(){
				uni.showLoading({
					title:'验证中'
				})
				const req = await uni.$http.get('api/jiu/discern/baiduapi',{
					cardid:this.sfid,//身份id
					pathurl:this.headimage,//用户图像
					cardname:this.username,//用户名称
				})
				console.log('认证信息',req)
				
				if(req.data.msg == "认证成功"){
					if(this.user.typesf == 1){//师傅入驻
							console.log('师傅信息',this.user)
							 const res = await uni.$http.get('api/v1/appx/shifApp',this.user)
							if(res.statusCode == 200){
								uni.hideLoading()
								uni.showToast({
									icon:'none',
									title:res.data.msg,
									success: () => {
										setTimeout(()=>{
											uni.navigateBack({
											delta:2
										})
										},2000)
									}
								})
							} 
					}else if(this.user.typesf == 2){//商家入驻
							 console.log('商家信息',this.user)
							  const res = await uni.$http.get('api/v1/appx/retApp',this.user)
							 if(res.statusCode == 200){
								uni.hideLoading()
								uni.showToast({
									icon:'none',
									title:res.data.msg,
									success: () => {
										setTimeout(()=>{
											uni.navigateBack({
											delta:2
										})
										},2000)
									}
								})
							 }
					}
									 
				}else if(req.data.msg == "认证失败"){
						 uni.hideLoading()
						 uni.showToast({
							icon:'none',
							title:'认证失败，身份不匹配',
							success: () => {
								setTimeout(()=>{
									uni.navigateBack({
										delta:1
									})
								},2000)
							}
						 })
				}
			},
			
			
		}
	}
</script>

<style>
	page{
		background-color: #48c1ad;
	}
</style>
<style>
	.content {
		text-align: center;
		height: 400upx;
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 50upx;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}

	.msg {
		text-align: left;
		padding: 40rpx;
		font-size: 25rpx;
		color: #F0AD4E;
	}
</style>
