<template>
	<view>
		<!-- 标题部分 -->
		<view class="title">
			<view class="titleinput"><input type="text" v-model="title" placeholder="请输入标题"></view>
		</view>
		<!-- 正文部分 -->
		<view class="body">
			<textarea v-model="usertext" placeholder="请输入正文" name="" id="" cols="30" rows="10">
				
			</textarea>
		</view>
		<!-- 图片部分 -->
		<view class="image">
			<image :src="getImgsrc(imgurl)" mode="" v-show="imgurl != ''"></image>
		</view>
		<view class="images" @click="getimg()" v-show="imgurl == ''">
			<view class="jia">+</view>
			<view class="">上传视频或图片</view>
		</view>
		<!-- 选择服务类容 -->
		<view class="class" @click="getclass()">
			<view class="">选择类目和话题</view>
			<view class="classlist" >{{fuwu}} {{topictext}}<image src="/static/indexiconfont/rightjt.png" mode=""></image> </view>
		</view>
		
		<view class="goknow" @click="gofabu()">发布</view>
		
		<!-- 弹出层 -->
		<view class="pop" v-if="kdtf">
			<text>请选择类目</text>
			<view class="" v-for="(item,index) in getclasslist" @click="getitem(item)" :class="{col:item.id == cloque}">{{item.name}}</view>
			<text>请选择话题</text>
			<view class="" v-for="(item,index) in topiclist" @click="topics(item)" :class="{col:item.id == hua}">{{item.name}}</view>
		</view>
		
		<view class="men" @click="none()" v-if="kdtf" :style="{height:windowheight}"  style="background-color: black;width: 100%;position: fixed;top: 0;opacity: 0.3;z-index: 888;">
			
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
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
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success:(res) => {
					this.windowwidth = res.windowWidth
					this.windowheight = res.windowHeight+'px'
				}
			})
		},
		methods: {
			//发布知识
			async gofabu(){
				if(this.fenleiid != null && this.title != '' && this.usertext != ''){
					const req = await uni.$http.get('api/jiu/scrunchie/addquan',{
						user_id:uni.getStorageSync('user_id'),
						id:this.fenleiid,
						title:this.title,
						content:this.usertext,
						image:this.imgurl,
						topic:this.topic,
						cate:this.cate_id,
					})
					console.log(req)
					if(req.data.msg == "发布成功"){
						uni.showToast({
							icon:"none",
							title:req.data.msg,
							success: (res) => {
								
								setTimeout(()=>{
									uni.navigateBack({
										delta:1
									})
								},1000)
								
							}
						})
					}
					
				}else{
					uni.showToast({
						icon:"none",
						title:'请填写详细内容'
					})
				}
				
			},
			
			//获取图片
			getimg(){
				this.$upload.uploadImg(1,res =>{
					console.log('路径',res)
					this.imgurl = res
				})
			},
			
			//选中类目
			getitem(item){
				this.cloque = item.id//变色
				this.fenleiid = item.id//类目id
				this.fuwu = item.name
				this.cate_id = item.cate_id//cartid
				if(this.fenleiid != '' && this.topic != null){
					this.kdtf = false
				}
			},
			//选中话题
			topics(item){
				this.hua = item.id//变色
				this.topic = item.id//话题id
				this.topictext = item.name
				if(this.fenleiid != '' && this.topic != null){
					this.kdtf = false
				}
			},
			
			//蒙层事件
			none(){
				this.kdtf = false
			},
			
			//知识课堂—用户已拥有的服务类目
			async getclass(){
				this.kdtf = true
				const req = await uni.$http.get('api/jiu/answer/server',{
					user_id:uni.getStorageSync('user_id')
				})
				console.log('类目',req)
				
				
				//话题列表
				const res = await uni.$http.get('api/jiu/scrunchie/quantitle')
				console.log('话题',res)
				this.topiclist = res.data.data.action
				this.getclasslist = req.data.data.action
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
		image{
			width: 200rpx;
			height: 200rpx;
		}
		margin-left: 40rpx;
		margin-bottom: 30rpx;
	}
	.images{
		width: 200rpx;
		height: 200rpx;
		padding: 20rpx 20rpx;
		border: 1rpx solid gainsboro;
		margin-left: 40rpx;
		margin-bottom: 50rpx;
		.jia{
			font-size: 50rpx;
			margin-top: 30rpx;
		}
		view{
			width: 100%;
			text-align: center;
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
</style>
