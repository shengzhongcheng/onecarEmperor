<template>
	<view>
		<!-- 图片部分 -->
		<view class="image">
			<image :src="getImgsrc(imgurl)" mode="" v-show="imgurl != '' && gtype==1"></image>
		</view>
		<view class="images" @click="getimg()" v-show="imgurl == '' && gtype==1">
			<view class="jia">+</view>
			<view class="">上传视频或图片</view>
		</view>
		<!-- 文字 -->
		<view class="weizhi" v-if="gtype == 2">
			<u--textarea v-model="textgao" placeholder="请输入广告内容" count maxlength="30"></u--textarea>
		</view>
		<!-- 广告价格 -->
		<view class="weizhi">
			<view class="">广告价格：</view>
			<view class="col">￥{{datmoney}}/天</view>
		</view>
		<!-- 广告类型 -->
		<view class="weizhi" style="padding: 30rpx 0rpx;">
			<radio-group name="" @change="type">
				<label>
					<radio :value="1" :checked="gtype == 1"/><text>图片广告</text>
				</label>
				<label>
					<radio :value="2" :checked="gtype == 2"/><text>文字广告</text>
				</label>
			</radio-group>
		</view>
		<!-- 选择地址区域 -->
		<u-sticky >
		<view class="weizhi" style="background-color: white;" @tap="toufang">
			<view class="">请选择投放地区：</view>
			<view class="">
				<image src="../../static/image/dew.png" mode="" style="height: 30rpx;width: 40rpx;"></image>
			</view>
		</view>
		</u-sticky>
		<view class="dizhi" :class="{di:p}">
			 <u-checkbox-group
			            v-model="checkboxValue1"
			            placement="column"
			            @change="checkboxChange"
			        >
			            <u-checkbox
			            	:customStyle="{marginBottom: '8px'}"
			            	v-for="(item, index) in chengshi"
			            	:key="index"
			            	:label="item.cityname+item.monry"
			            	:name="item.cityname"
			            >
			            </u-checkbox>
						
			</u-checkbox-group>
			<!-- <view class="" v-for="(item,index) in chengshi" :key="index">
				
				{{item.cityname}}
			</view> -->
		</view>
		<!-- 选择位置 -->
		<view class="weizhi" @click="show = true" v-if="gtype == 1">
			<view class="">请选择展示区域：</view>
			<view class="col">{{okcolum.name || '请选择展示区域'}}</view>
		</view>
		<view class="weizhi"  v-else>
			<view class="">请选择展示区域：</view>
			<view class="col">文字广告仅在用户端首页展示</view>
		</view>
		<u-picker :show="show" keyName="name"  :columns="columns" :closeOnClickOverlay="true" @close="clo" @cancel="quxiao" @confirm="okquyu"></u-picker>
		<!-- 开始和结束时间 -->
		<view class="weizhi" @click="timeshow = true">
			<view class="">请选择开始时间：</view>
			<view class="col">{{kaishitime | date}}</view>
		</view>
		<template>
			<view>
		        <u-datetime-picker
		                :show="timeshow"
		                v-model="kaishitime"
						:closeOnClickOverlay="true"
						:minDate="timestamp"
		                mode="date"
						@confirm="oktime"
						@cancel="timeguan"
						@close="timeguan"
		        ></u-datetime-picker>
			</view>
		</template>
		<!-- 结束时间 -->
		<view class="weizhi" @click="jieshushow = true">
			<view class="">请选择结束时间：</view>
			<view class="col">{{jieshushijian | date}}</view>
		</view>
		<template>
			<view>
		        <u-datetime-picker
		                :show="jieshushow"
		                v-model="jieshushijian"
						:closeOnClickOverlay="true"
						:minDate="timehou"
		                mode="date"
						@confirm="jieshutime"
						@cancel="timeguan"
						@close="timeguan"
		        ></u-datetime-picker>
			</view>
		</template>
		
		<!-- 支付方式 -->
		<view class="weizhi">
			<radio-group name="" @change="zhifu">
				<label>
					<radio :value="1" /><text>余额支付</text>
				</label>
				<label>
					<radio :value="2" :checked="zhifutype==2"/><text>微信支付</text>
				</label>
			</radio-group>
		</view>
		
		<view class="goknow" @click="postguaogao()">发布</view>
		<u-back-top :scroll-top="scrollTop"></u-back-top>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				checkboxValue1:[],
				scrollTop: 0,//返回顶部
				jieshushow:false,//显示结束时间
				timeshow:false,//显示开始时间
				kaishitime:Number(new Date()),//开始时间
				jieshushijian:Number(new Date()),
				//服务类容
				fuwu:'',
				//话题内容
				topictext:'',
				
				//选择分类id
				fenleiid:null,
				//接受正文内容
				usertext:'',
				//标题内容
				title:'',
				//图片
				imgurl:'',
				//话题id
				topic:null,
				
				//话题列表
				topiclist:[],
				
				//当前已拥有的服务
				getclasslist:[],
				/* 屏幕宽度 */
				windowwidth:0,
				/* 屏幕高度 */
				windowheight:0,
				kdtf:false,
				
				//接收类目点击边色
				cloque:null,
				//接收话题点击边色
				hua:null,
				//接收类目cate_id
				cate_id:null,
				//接收类目id
				id:null,
				//组件数据
				 columns: [],
				 //是否隐藏弹出框
				 show: false,
				 //选择的区域
				 okcolum:'',
				 //选择的类型
				 gtype:1,
				 //广告
				 textgao:'',
				 //支付方式
				 zhifutype:2,
				 //位置id
				 guanggaoid:null,
				 //广告价格
				 datmoney:null,
				 //当前时间时间搓
				 timestamp:null,
				 //当前时间后一天
				 timehou:null,
				 //一共多少钱
				 allday:null,
				 shen:null,
				 si:null,
				 qu:null,
				 //可选城市
				 chengshi:[],
				 p:false,
				 //选中的城市id数组
				 jiagepre:[],
				 //选中的城市名称
				 cSName:[],
			}
		},
		onLoad() {
			this.getimgweizhi()
			this.getjiage()
			this.getdizhi()
			this.timestamp = Date.parse(new Date());
			console.log('这还是',this.timestamp)
			this.timehou = +new Date() + 24*60*60*1000;
			console.log('后一天',this.timehou)
			console.log('开始',this.kaishitime)
		},
		methods: {
			checkboxChange(n) {
				let arr = []
				for(let k in this.chengshi){
					for(let i in n){
						if(this.chengshi[k].cityname == n[i]){
							arr.push(this.chengshi[k].city)
						}
					}
				}
				this.jiagepre = arr
				this.cSName = n
				console.log('城市id',this.jiagepre)
				console.log('change', this.cSName);
			},
			//投放区域
			toufang(){
				this.p = !this.p
			},
			//获取选择列表
			async getdizhi(){
				const req = await uni.$http.post('api/jiu/advert/adventcity')
				console.log('城市',req.data.data)
				this.chengshi = req.data.data
			},
			onPageScroll(e) {
					this.scrollTop = e.scrollTop;
				},
			//提交广告
			async postguaogao(){
				if(this.jieshushijian != this.kaishitime){
					const time = await uni.$http.get('api/jiu/advert/jisaunshijian',{
						jieshu:this.jieshushijian,//结束时间
						kaishi:this.kaishitime
					})
					console.log('一共多少天',time)
					this.allday = parseFloat(time.data.data.action)*parseFloat(this.datmoney)//计算一共多少钱
					console.log('全部价格',this.allday)
					if(this.gtype == 1 && this.allday != null){
						if(this.guanggaoid != null && this.imgurl != ''){
							const req = await uni.$http.get('api/jiu/advert/addposter',{
								user_id:uni.getStorageSync('user_id'),
								type:this.gtype,//1文字广告2图片广告
								createtime:this.kaishitime,
								updatetime:this.jieshushijian,
								types:this.zhifutype,//支付方式
								bannerweizhi:this.guanggaoid,//位置
								image:this.imgurl,//图片路径
								money:this.allday,//广告价格
								city:this.jiagepre,//选取城市id
								cityname:this.cSName//选取城市名称
							})
							console.log('支付图片',req)
							if(req.data.msg == "支付成功"){
								uni.requestPayment({
								    "provider": "wxpay", 
								    "orderInfo": {
								        "appid": req.data.data.pay.appid ,  // 微信开放平台 - 应用 - AppId，注意和微信小程序、公众号 AppId 可能不一致
								        "noncestr": req.data.data.pay.noncestr, // 随机字符串
								        "package": req.data.data.pay.package,        // 固定值
								        "partnerid": req.data.data.pay.partnerid,      // 微信支付商户号
								        "prepayid": req.data.data.pay.prepayid, // 统一下单订单号 
								        "timestamp": req.data.data.pay.timestamp,        // 时间戳（单位：秒）
								        "sign":req.data.data.pay.sign // 签名，这里用的 MD5/RSA 签名
								    },
								    success(res) {
										console.log(res)
										uni.showToast({
											icon:"none",
											title:req.data.msg,
										})
										setTimeout(()=>{
											uni.navigateBack()
										},1500)
									},
								    fail(e) {
										uni.showToast({
											icon:"none",
											title:'取消支付',
										})
									}
								})
							}else if(req.data.msg != "支付成功"){
								uni.showToast({
									icon:"none",
									title:req.data.msg,
									success: () => {
										if(req.data.msg == '余额支付成功'){
											setTimeout(()=>{
												uni.navigateBack()
											},1500)
										}
									}
								})
							}
						}else{
							uni.showToast({
								icon:"none",
								title:'请选择广告展示位置和广告图片'
							})
						}
						
						
						
					}else if(this.gtype == 2 && this.allday != null){
						if(this.textgao != ''){
							const req = await uni.$http.get('api/jiu/advert/addposter',{
								user_id:uni.getStorageSync('user_id'),
								type:this.gtype,//1文字广告2图片广告
								createtime:this.kaishitime,
								updatetime:this.jieshushijian,
								types:this.zhifutype,//支付方式
								content:this.textgao,//广告文字
								money:this.allday//广告价格
							})
							console.log('支付文字',req)
							if(req.data.msg == "支付成功"){
								uni.requestPayment({
								    "provider": "wxpay", 
								    "orderInfo": {
								        "appid": req.data.data.pay.appid ,  // 微信开放平台 - 应用 - AppId，注意和微信小程序、公众号 AppId 可能不一致
								        "noncestr": req.data.data.pay.noncestr, // 随机字符串
								        "package": req.data.data.pay.package,        // 固定值
								        "partnerid": req.data.data.pay.partnerid,      // 微信支付商户号
								        "prepayid": req.data.data.pay.prepayid, // 统一下单订单号 
								        "timestamp": req.data.data.pay.timestamp,        // 时间戳（单位：秒）
								        "sign":req.data.data.pay.sign // 签名，这里用的 MD5/RSA 签名
								    },
								    success(res) {
										console.log(res)
										uni.showToast({
											icon:"none",
											title:req.data.msg,
										})
										setTimeout(()=>{
											uni.navigateBack()
										},1500)
									},
								    fail(e) {
										uni.showToast({
											icon:"none",
											title:'取消支付',
										})
									}
								})
							}else if(req.data.msg != "支付成功"){
								uni.showToast({
									icon:"none",
									title:req.data.msg,
									success: () => {
										if(req.data.msg == '余额支付成功'){
											setTimeout(()=>{
												uni.navigateBack()
											},1500)
										}
										
									}
								})
							}
						}else{
							uni.showToast({
								icon:"none",
								title:'请输入广告内容'
							})
						}
						
						
						
					}else{
						uni.showToast({
							icon:"none",
							title:'请重新选择时间'
						})
					}
				}else{
					uni.showToast({
						icon:"none",
						title:'广告时间最少为一天'
					})
				}
				
				
			},
			//支付方式
			zhifu(e){
				console.log(e)
				this.zhifutype = e.detail.value
			},
			//选着类型
			type(e){
				console.log(e)
				this.gtype = e.detail.value
				if(e.detail.value == 2){
					this.imgurl = ''
				}else if(e.detail.value == 1){
					this.textgao = ''
				}
			},
			
			//选择区域
			okquyu(e){
				console.log('区域',e)
				this.okcolum = e.value[0]
				this.guanggaoid = e.value[0].id
				console.log(this.guanggaoid)
				this.show = false
				
			},
			//确定开始时间
			oktime(){
				console.log('时间',this.kaishitime)
				this.timeshow = false
				
			},
			jieshutime(){
				console.log('结束时间',this.jieshushijian)
				this.jieshushow = false
			},
			//日期关闭
			timeguan(){
				this.timeshow = false
				this.jieshushow = false
			},
			//日期选择
			confirm(e) {
							console.log(e);
			},
			//点击取消按钮
			quxiao(){
				this.show = false
			},
			//关闭选择器
			clo(){
				this.show = false
			},
			//展开触发
			change(e){
				console.log(e)
			},
			//发布知识
			async gofabu(){
				
			},
			//广告价格
			async getjiage(){
				const req = await uni.$http.get('api/jiu/advert/jiage')
				console.log(req)
				this.datmoney=req.data.data.action.money
			},
			//获取位置
			async getimgweizhi(){
				const req = await uni.$http.get('api/jiu/advert/adventweizhi')
				console.log('weizhi',req)
				this.columns.push(req.data.data.action)
				console.log(this.columns)
			},
			//获取图片
			getimg(){
				this.$upload.uploadImg(1,res =>{
					console.log('路径',res)
					this.imgurl = res
				})
			},

			
			
		}
	}
</script>

<style scoped lang="scss">
	
	.title{
		width: 90%;
		margin: auto;
		.titleinput{
			width: 100%;
			border-bottom: 1rpx solid gainsboro;
			input{
				padding: 20rpx 10rpx;
			}
		}
	}
	.body{
		width: 90%;
		margin: auto;
		padding: 20rpx 0rpx;
	}
	.image{
		text-align: center;
		image{
			width: 200rpx;
			height: 200rpx;
		}
		margin: 20rpx auto;
	}
	.images{
		width: 200rpx;
		height: 200rpx;
		padding: 20rpx 20rpx;
		border: 1rpx solid gainsboro;
		margin: 20rpx auto;
		.jia{
			font-size: 50rpx;
			margin-top: 30rpx;
		}
		view{
			width: 100%;
			text-align: center;
		}
	}
	.weizhi{
		width: 90%;
		margin:30rpx auto;
		display: flex;
		justify-content: space-between;
		padding: 15rpx 0rpx;
		border-bottom: 1rpx solid #dedede;
		.col{
			color: #555555;
		}
	}
	.class{
		width: 85%;
		margin: auto;
		border-radius: 20rpx;
		background-color: gainsboro;
		padding: 20rpx 40rpx;
		// padding-right: 40rpx;
		display: flex;
		justify-content: space-between;
		.classlist{
			font-size: 33rpx;
			position: relative;
			image{
				width: 40rpx;
				height: 40rpx;
				position: absolute;
				right: -40rpx;
				top: 0rpx;
			}
		}
	}
	.goknow{
		width: 100rpx;
		padding: 30rpx 30rpx;
		background-color: #31ab78;
		color: white;
		text-align: center;
		margin: auto;
		margin-top: 90rpx;
		border-radius: 15rpx;
	}
	.pop{
		width: 80%;
		height: 700rpx;
		// height: 500rpx;
		overflow: auto;
		background-color: white;
		position: fixed;
		top: 50%;
		left: 10%;
		transform: translateY(-50%);
		border-radius: 15rpx;
		z-index: 999;
		padding: 20rpx 10rpx;
		text{
			color: #31ab78;
			display: inline-block;
			padding: 10rpx 10rpx;
			font-size: 35rpx;
		}
		view{
			margin-bottom: 20rpx;
			padding: 20rpx 20rpx;
			// color: #666666;
			font-size: 28rpx;
			background-color: #dedede;
		}
	}
	.col{
		color: red;
	}
	.dizhi{
		width: 90%;
		margin: auto;
		display: none;
		view{
			padding: 20rpx;
			border-bottom: 1rpx solid #eaeaea;
		}
		// display: none;
	}
	.di{
		width: 90%;
		margin: auto;
		display: block;
		view{
			padding: 20rpx;
			border-bottom: 1rpx solid #eaeaea;
		}
	}
</style>
