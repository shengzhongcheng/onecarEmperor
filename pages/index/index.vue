<template>
	<view >
		<!-- 头部占位符 -->
		<!-- <view class="status_bar">
		</view> -->
		<!-- 首页头部导航栏 -->
		<!-- <view class="indexheader">
			
			<view class="state" v-show="usernewstatustf == 1" @click="statusswitch()">
				<text class="dian"></text>工作中
			</view>
			<view class="stateres" v-show="usernewstatustf == 2" @click="statusswitch()">
				<text class="dian"></text>已下班
			</view> 
			<view class="stategre" v-show="usernewstatustf == 3" @click="statusswitch()">
				<text class="dian"></text>闭店中
			</view>
			
			<view class="stateinp">
				<view class="search_class">
					<image src="../../static/indexiconfont/sousuo.png" mode=""></image>
					<view class="region">
						<view>郑州</view>
					</view>
				</view>
			</view>
		</view> -->
		<!-- 轮播图 -->
		<view class="imgswiper" v-if="typelist == 2">
			<swiper :circular="true" :indicator-dots="false" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item v-for="(item,index) in swiperList" :key="index">
					<navigator  class="swiper-item">
						<image :src="getImgsrc(item.bannerimage)" mode="" class="swiperwith"></image>
					</navigator>
					
				</swiper-item>
				
			</swiper>
		</view>
		<view class="imgswiper" v-else>
			<swiper :circular="true" :indicator-dots="false" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item v-for="(item,index) in guangao" :key="index">
					<navigator  class="swiper-item">
						<image :src="getImgsrc(item.banner1image)" mode="" class="swiperwith"></image>
					</navigator>
					
				</swiper-item>
				
			</swiper>
		</view>

		<!-- 常用功能部分 -->
		<view class="comfun">
			<view class="title">
				<strong>常用功能</strong>
			</view>
			<!-- 常用功能导航 -->
			<view class="navcomfun">
				<view class="funall" v-for="(item,index) in navcomfun" :key="index" @click="navto(index)">
					<image :src="item.imgs" mode=""></image>
					<view class="">{{item.name}}</view>
				</view>
				<view class="funall" @click="navto(3)" v-if="fas">
					<image src="../../static/indexiconfont/dingdan.png" mode=""></image>
					<view class="">服务</view>
				</view>
			</view>
			<!-- 其他功能导航 -->
			<view class="title">
				<strong>其他功能</strong>
			</view>
			<view class="navorfun">
				<!-- <view class="orall" v-for="(item,index) in navallfun" :key="index" @click="navtofun(index)" >
					<image :src="item.imgs" mode=""></image>
					<view class="">{{item.name}}</view>
				</view> -->
				<view class="orall" @click="navtofun(7)" v-if="fas">
					<image src="../../static/indexiconfont/gggl.png" mode=""></image>
					<view class="">广告管理</view>
				</view>
				<view class="orall" @click="navtofun(6)">
					<image src="../../static/indexiconfont/guanli.png" mode=""></image>
					<view class="">商品管理</view>
				</view>
				<!-- <view class="orall" @click="navtofun(5)">
					<image src="../../static/indexiconfont/zx.png" mode=""></image>
					<view class="">发布服务</view>
				</view> -->
				<view class="orall" @click="navtofun(4)">
					<image src="../../static/indexiconfont/leimu.png" mode=""></image>
					<view class="">类目管理</view>
				</view>
				<view class="orall" @click="navtofun(3)">
					<image src="../../static/indexiconfont/dingwei.png" mode=""></image>
					<view class="">服务区域</view>
				</view>
				<view class="orall" @click="navtofun(5)">
					<image src="../../static/indexiconfont/zx.png" mode=""></image>
					<view class="">发布服务</view>
				</view>
				<view class="orall" @click="navtofun(2)">
					<image src="../../static/indexiconfont/fuwu.png" mode=""></image>
					<view class="">服务管理</view>
				</view>
				<view class="orall" @click="navtofun(1)" v-if="fas">
					<image src="../../static/indexiconfont/pyq.png" mode=""></image>
					<view class="">发圈</view>
				</view>
				<!-- 知识学堂 -->
				<view class="orall" @click="navtofun(0)"  v-if="fas">
					<image src="../../static/indexiconfont/zs.png" mode=""></image>
					<view class="">知识学堂</view>
				</view>
				<!-- 员工管理 -->
				<view class="orall" @click="navtofun(8)" v-if="typeuser != 2">
					<image src="../../static/indexiconfont/yggl.png" mode=""></image>
					<view class="">员工管理</view>
				</view>
				<!-- 附近的人 -->
				<view class="orall" @click="fujin()">
					<image src="../../static/indexiconfont/fjdr.png" mode=""></image>
					<view class="">附近的人</view>
				</view>
			</view>
	
		</view>
		<!-- 状态弹出 -->
		<view class="statelist" v-show="statustf">
			<view class="blue" @click="bulestatus(userstatus[0].status)">
				<text class="dian"></text>{{userstatus[0].status}}
			</view>
			<view class="red" @click="redstatus(userstatus[1].status)">
				<text class="dian"></text>{{userstatus[1].status}}
			</view>
			<view class="gre" @click="grestatus(userstatus[2].status)">
				<text class="dian"></text>{{userstatus[2].status}}
			</view>
		</view>
		
	</view>
</template>

<script>
	let WebIM = require("../../utils/WebIM")["default"];
	let __test_account__, __test_psword__;
	let disp = require("../../utils/broadcast");
	let runAnimation = true;
	export default {
		data() {
			return {
				/* 身份信息 */
				typeuser:uni.getStorageSync('type'),
				/* 功能导航 */
				navcomfun:[
					{'name':'一口价订单','imgs':'../../static/indexiconfont/sehbeixinxi.png'},
					{'name':'议价订单','imgs':'../../static/indexiconfont/xiangmuxinxi.png'},
					{'name':'抢单','imgs':'../../static/indexiconfont/wodedingdan.png'},
					// {'name':'服务','imgs':'../../static/indexiconfont/dingdan.png'}
				],
				/* 其他导航数据 */
				navallfun:[
					// {'name':'知识课堂','imgs':'../../static/indexiconfont/zs.png'},
					// {'name':'发圈','imgs':'../../static/indexiconfont/pyq.png'},
					// {'name':'附近的人','imgs':'../../static/indexiconfont/fjdr.png'},
					// {'name':'申请入驻','imgs':'../../static/indexiconfont/rzsq.png'},
					// {'name':'资质管理','imgs':'../../static/indexiconfont/zx.png'},
					// {'name':'服务管理','imgs':'../../static/indexiconfont/fuwu.png'},
					// {'name':'服务区域','imgs':'../../static/indexiconfont/dingwei.png'},
					// {'name':'类目管理','imgs':'../../static/indexiconfont/leimu.png'},
					// {'name':'发布服务','imgs':'../../static/indexiconfont/zx.png'},
					// {'name':'商品管理','imgs':'../../static/indexiconfont/guanli.png'},
					// {'name':'广告管理','imgs':'../../static/indexiconfont/gggl.png'},
					// {'name':'员工管理','imgs':'../../static/indexiconfont/yggl.png'},
				],
				/* 用户状态 */
				usernewstatus:'工作中',//用户当前状态
				usernewstatustf:1,
				userstatus:[//用户切换的状态
					{'status':'工作中'},
					{'status':'已下班'},
					{'status':'闭店中'},
				],
				/* 状态是否隐藏和显示 */
				statustf:false,
				swiperList: [], //轮播图
				guangao:[],//广告图
				//轮播图类型
				typelist:null,
				
				
				//环信
				name: "",
				psd: "",
				grant_type: "password",
				psdFocus: "",
				nameFocus: "",
				showPassword:false,
				type:'text',
				
				//控制按钮
				fas:false,
			}
		},
		onLoad() {
			this.kongzhi()
			if(!uni.getStorageSync('user_id')){
				//清空缓存
					uni.clearStorageSync()
					uni.reLaunch({
						url:'../loning/loning'
					})
			}
			this.getWeizhi()
			// this.kongzhiimg()//控制轮播图类型
		},
		onPullDownRefresh() {
			this.kongzhiimg()
			setTimeout(()=>{
				uni.stopPullDownRefresh()
			},1000)
		},
		onShow() {
			this.getUserHx()
		},
		methods: {
			//获取当前用户所在城市用于后台统计
			async getuserMorendizhi(){
				const req = await uni.$http.post('api/jiu/plug/shangcundizhi',{
					user_id:uni.getStorageSync('user_id'),
					city:uni.getStorageSync('city')
				})
				// console.log('统计',req)
			},
			//默认地址
			async getmorendizhi(){
				const req = await uni.$http.get('api/jiu/xcxserver/morendizhi',{
					lat:uni.getStorageSync('latitude'),
					log:uni.getStorageSync('longitude'),
				})
				console.log('默认地址',req)
				if(req){
					uni.setStorageSync('cityname',req.data.data.region_name)
					uni.setStorageSync('province',req.data.data.province)
					uni.setStorageSync('city',req.data.data.city)
					uni.setStorageSync('area',req.data.data.district)
					this.kongzhiimg()//控制轮播图类型
					if(uni.getStorageSync('user_id')){
						console.log('0009999999999999999333333333333333888888888888888')
						this.getuserMorendizhi()
					}
				}
				
			},
			//控制广告管理
			async kongzhi(){
				const req = await uni.$http.post('api/jiu/useranswer/shangxianzhiquantang')
				this.fas = req.data.data
				console.log('控制',req)
			},
			
			//获取定位
			getWeizhi(){
				uni.getLocation({
					type: 'wgs84',
					success:  (res)=> {
						uni.setStorageSync('longitude',res.longitude)
						uni.setStorageSync('latitude',res.latitude)
						console.log('当前位置的经度：' + uni.getStorageSync('longitude'));
						console.log('当前位置的纬度：' + uni.getStorageSync('latitude'));
						this.getmorendizhi()
					}
				});
			},
			
			
			//跳转附近的人
			fujin(){
				console.log(111, {
				  apiUrl: WebIM.config.apiURL,
				  user: __test_account__ || this.name.toLowerCase(),
				  pwd: __test_psword__ || this.psd,
				  grant_type: this.grant_type,
				  appKey: WebIM.config.appkey
				})
				getApp().globalData.conn.open({
				  apiUrl: WebIM.config.apiURL,
				  user: __test_account__ || this.name.toLowerCase(),
				  pwd: __test_psword__ || this.psd,
				  grant_type: this.grant_type,
				  appKey: WebIM.config.appkey
				});
				getApp().globalData.onLoginSuccess(
				  uni.getStorageSync("myUsername").toLowerCase()
				);
			},
			
			//登录环信
			//登录环信
			async getUserHx(){
					  console.log('》》》》》》》》用户user_id',uni.getStorageSync('user_id'))
					  
					  if(uni.getStorageSync('user_id')){
						  uni.request({
						      url: 'https://xcx.yichedi.com/api/jiu/discern/huanxinshang', //获取当前用户环信账号。
						      data: {
						          user_id:uni.getStorageSync('user_id')
						      },
						      success: (res) => {
								 
						          console.log('》》》》》》》回调',res.data.data.action.username);
								  //获取到环信的账号信息后调用登录环信
								console.log('》》》》》调用登录')
								uni.WebIM.conn.open({
									user:res.data.data.action.username,
									pwd:res.data.data.action.password,
									appKey:uni.WebIM.config.appKey,
								})
								console.log('》》》》》登录环信',uni.WebIM)
								uni.setStorage({
									key:"myUsername",
									data:res.data.data.action.username
								})
								console.log('信息',uni.getStorageSync('myUsername'))
						      }
						  });
					  }else{
						  return
					  }
					  
			},
			
			//控制轮播图类型
			async kongzhiimg(){
				const req = await uni.$http.get('api/ke/Banner/weizhixianzhi06')
				console.log('轮播图限制',req)
				if(req.statusCode == 200){
					console.log('asjfhsjkdfhashd jkakjdhasjk')
					this.typelist = req.data.data.action.typelist
					if(this.typelist == 2){
						this.postSwiper()//获取轮播图
					}else if(this.typelist == 1){
						this.guangaoSwiper()//获取广告图
					}
					
				}
			},
			//获取广告图片
			async guangaoSwiper() {
				const req = await uni.$http.get('api/ke/Banner/tupianguanggao06',{
					city:uni.getStorageSync('city')
				})
				console.log('广告图',req)
				if(req.data.data.action.length === 0){
					this.guangao = [
						{
							banner1image:'https://xcx.yichedi.com/uploads/20220907/20220908142736.jpg'
						}
					]
				}else{
					this.guangao = req.data.data.action
				}
				
			},
			//获取轮博图片
			async postSwiper() {
				const req = await uni.$http.get('api/ke/Banner/indexbaner06')
				console.log('轮播图',req)
				this.swiperList = req.data.data.action
				
			},
			/* 常用功能跳转 */
			navto(index){
				console.log(index)
				if(index == 2){//跳转抢单
					uni.navigateTo({
						url:'../gradords/gradords'
					})
				}else if(index == 3){
					uni.navigateTo({
						url:'../scoperan/scoperan'
					})
				}else if(index == 0){
					uni.navigateTo({
						url:'../ordsinfor/ordsinfor?indexclass='+index
					})
				}else if(index == 1){
					uni.navigateTo({
						url:'../ordsinfor/ordsinfor?indexclass='+index
					})
				}
			},
			
			/* 状态选项切换 */
			statusswitch(){
				// if(this.statustf == false){
				// 	this.statustf = true
				// }else if(this.statustf == true){
				// 	this.statustf = false
				// }
			},
			/* 工作状态切换 */
			bulestatus(i){
				this.usernewstatus = i//切换当前状态
				this.statustf = false//关闭状态框
				this.usernewstatustf = 1//当前转状态样式转换
			},
			/* 下班 */
			redstatus(i){
				this.usernewstatus = i//切换当前状态
				this.statustf = false//关闭状态框
				this.usernewstatustf = 2//当前转状态样式转换
			},
			/* 闭店 */
			grestatus(i){
				this.usernewstatus = i//切换当前状态
				this.statustf = false//关闭状态框
				this.usernewstatustf = 3//当前转状态样式转换
			},
			/* 其他功能 */
			navtofun(index){
				if(index == 5){
					uni.navigateTo({//发布服务
						url:'/pages/fabufuwu/fabufuwu',
						
					})
				}else if(index == 3){
					uni.navigateTo({//服务区域
						url:'/pages/fuwuquyu/fuwuquyu'
					})
				}else if(index == 0){
					uni.navigateTo({//知识
						url:'../zhisiketang/zhisiketang'
					})
				}else if(index == 1){
					uni.navigateTo({//发圈
						url:'../faquan/faquan'
					})
				}else if(index == 2){
					uni.navigateTo({//服务管理
						url:'../shopadmin/shopadmin',
						fail(res) {
							console.log(res)
						}
					})
				}else if(index == 4){//类目管理
					uni.navigateTo({
						url:'/pages/leimuguanli/leimuguanli'
					})
				}else if(index == 6){
					
					uni.navigateTo({//商品管理
						url:'../shop/shop',
						fail(res) {
							console.log(res)
						}
					})
				}else if(index == 7){
					
					uni.navigateTo({//广告管理
						url:'/pages/guanggao/guanggao',
						fail(res) {
							console.log(res)
						}
					})
				}else if(index == 8){//员工管理
					uni.navigateTo({
						url:'/pages/staff/staff'
					})
				}
			}
			
		}
	}
</script>
<style >
	page{
		background-color: #f3f3f3;
	}
</style>

<style lang="scss" scoped>
	.dian{
		padding: 1rpx 1rpx;
		background-color: #14be0e;
		display: inline-block;
		height: 5rpx;
		width: 5rpx;
		margin-bottom: 8rpx;
		margin-right: 16rpx;
		border-radius: 50%;
	}
	.statelist{
		position: absolute;
		top: 120rpx;
		left: 40rpx;
		width: 300rpx;
		text-align: center;
		border-radius: 15rpx;
		box-shadow:0rpx 0rpx  3rpx 3rpx #e3e3e3;
		background-color: white;
		.blue{
			color: #14be0e;
			.dian{
				background-color: #14be0e;
			}
		}
		.red{
			color: red;
			.dian{
				background-color: red;
			}
		}
		.gre{
			color: #5555ff;
			.dian{
				background-color: #5555ff;
			}
		}
		view{
			width: 240rpx;
			text-align: center;
			padding: 40rpx 30rpx;
			border-bottom: 1rpx solid gainsboro;
		}
		view:last-child{
			border-bottom: none;
		}
		
	}
	//头部占位符
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}
	//头部导航栏
	.indexheader{
		width: 90%;
		margin:30rpx auto;
		display: flex;
		justify-content: space-between;
		align-content: center;
		.state{
			color: #14be0e;
			border: 1rpx solid #14be0e;
			padding: 10rpx 90rpx;
			border-radius: 20rpx;
		}
		.stateres{
			color: red;
			border: 1rpx solid red;
			padding: 10rpx 90rpx;
			border-radius: 20rpx;
			.dian{
				background-color: red;
			}
		}
		.stategre{
			color: #5555ff;
			border: 1rpx solid #5555ff;
			padding: 10rpx 90rpx;
			border-radius: 20rpx;
			.dian{
				background-color:#5555ff ;
			}
		}
		//右侧搜索
		.stateinp{
			width: 100rpx;
			padding-top: 10rpx;
			.search_class{
				display: flex;
				justify-content: space-between;
				image{
					margin-top: 5rpx;
					width: 30rpx;
					height: 30rpx;
				}
				.region{
					
					display: flex;
				}
			}
		}
	}
	
	.lunbo{
		width: 90%;
		height: 300rpx;
		margin: 20rpx auto;
		swiper{
			width: 100%;
			height: 100%;
			swiper-item{
				.swiper-item{
					.wi{
						width: 100%;
						height: 300upx;
						border-radius: 15rpx;
					}
				}
			}
		}
		
	}
	
	//常用功能
	.comfun{
		width: 90%;
		margin:40rpx auto;
		.title{
			padding-left: 20rpx;
			border-left: 5rpx solid #14be0e;
		}
		.navcomfun{
			width: 100%;
			// border: 1rpx solid red;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
				margin-top: 30rpx;
			.funall{
				background-color: white;
				text-align: center;
				width: 40%;
				padding: 40rpx 20rpx;
				border-radius: 15rpx;
				box-shadow:0rpx 0rpx  3rpx 3rpx #e3e3e3;
				margin-bottom: 40rpx;
				image{
					height: 60rpx;
					width: 60rpx;
				}
			}
		}
		.navorfun{
			margin-top: 30rpx;
			display: flex;
			// justify-content: space-between;
			flex-wrap: wrap;
			.orall{
				background-color: white;
				// font-size: 18rpx;
				width: 15%;
				height: 100rpx;
				padding: 30rpx 20rpx;
				box-shadow:0rpx 0rpx  3rpx 3rpx #e3e3e3;
				text-align: center;
				// margin-bottom: 20rpx;
				margin-left: 26rpx;
				margin-bottom: 25rpx;
				// margin: 10rpx 30rpx;
				border-radius: 15rpx;
				image{
					height: 40rpx;
					width: 40rpx;
				}
				view{
					font-size: 25rpx;
					margin-top: 10rpx;
				}
			}
		}
		
	}
	.imgswiper{
		width: 90%;
		margin: auto;
		height: 300rpx;
		margin: 20rpx auto;
		/* background-color: aqua; */
	}
	.imgswiper>swiper{
		height: 100%;
		width: 100%;
		text-align: center;
	}
	.swiperwith{
		width: 100%;
		height: 300upx;
		border-radius: 20rpx;
	}
</style>
