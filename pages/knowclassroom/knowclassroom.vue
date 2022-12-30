<template>
	<view>
		<!-- 标题部分 -->
		<view class="title">
			<view class="titleinput"><input type="text" v-model="title" placeholder="请输入标题"></view>
		</view>
		<!-- 描述部分 -->
		<view class="title">
			<view class="titleinput"><input type="text" v-model="miaoshu" placeholder="请输入内容描述"></view>
		</view>
		<!-- 图片部分 -->
		<view class="image">
			<image :src="getImgsrc(imgurl)" mode="" v-show="imgurl != ''"></image>
		</view>
		<view class="images" @click="getimg()" v-show="imgurl == ''">
			<view class="jia">+</view>
			<view class="">上传图片</view>
		</view>
		<!-- 正文部分 -->
		<view class="body">
			<textarea v-model="usertext" placeholder="请输入正文" name="" id="" cols="30" rows="10" style="margin: auto;padding: 10rpx 10rpx;width: 95%;border-radius: 15rpx;border: 1rpx solid gainsboro;">
				
			</textarea>
		</view>
		<!-- 知识是否付费 -->
		<radio-group name="" @change="ord">
			<view class="ffkg">
				<label class="radio">
					<radio :value="radt" /><text>付费</text>
				</label>
				<label class="radio">
					<radio :value="radf" /><text>免费</text>
				</label>
			</view>
		</radio-group>
		
		<!-- 付费金额 -->
		<view class="moneys" v-if="sr">
			<label >付费金额：</label><input type="number" v-model="mon" placeholder="请输入付费金额">
		</view>
		
		<!-- 选择服务类容 -->
		<view class="class" @click="getclass()">
			<view class="">选择服务分类</view>
			<view class="classlist" >{{fuwu}}<image src="/static/indexiconfont/rightjt.png" mode=""></image> </view>
		</view>
		
		<view class="goknow" @click="gofabu()">发布</view>
		
		<!-- 弹出层 -->
		<view class="pop" v-if="kdtf">
			<view class="" v-for="(item,index) in getclasslist" @click="getitem(item)">{{item.name}}</view>
		</view>
		
		<view class="men" @click="none()" v-if="kdtf" :style="{height:windowheight}"  style="background-color: black;width: 100%;position: fixed;top: 0;opacity: 0.3;z-index: 888;">
			
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//默认服务类容
				fuwu:'',
				
				//选择分类id
				fenleiid:null,
				//接受正文内容
				usertext:'',
				//标题内容
				title:'',
				//图片
				imgurl:'',
				//描述
				miaoshu:'',
				
				//当前已拥有的服务
				getclasslist:[],
				/* 屏幕宽度 */
				windowwidth:0,
				/* 屏幕高度 */
				windowheight:0,
				kdtf:false,
				/* 是否付费 */
				radf:0,//否
				radt:1,//是
				/* 付费金额 */
				mon:'0',
				/* 是否显示输入框 */
				sr:false,
				//接收是否付费
				monyn:null,
				
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
			//付费按钮
			ord(e){
				console.log(e)
				if(e.detail.value == 0){
					this.sr = false
					this.monyn = e.detail.value
					console.log('我是免费',this.monyn)
				}else if(e.detail.value == 1){
					this.sr = true
					this.monyn = e.detail.value
					console.log('我是付费',this.monyn)
				}
			},
			
			//发布知识
			async gofabu(){
				if(this.fenleiid != null && this.title != '' && this.usertext != '' && this.monyn != null && this.miaoshu != ''){
					
					const req = await uni.$http.get('api/jiu/answer/release',{
						user_id:uni.getStorageSync('user_id'),//用户id
						type:1,//图文
						lei:this.fenleiid,//分类id
						content:this.title,//标题
						answer:this.usertext,//正文
						images:this.imgurl,//图片路径
						money:this.mon,//付费价格
						fee:this.monyn,//是否付费
						answers:this.miaoshu//描述
					})
					console.log(req)
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
				console.log('item',item)
				this.fenleiid = item.cate_id
				this.fuwu = item.name
				console.log('id',this.fenleiid)
				this.kdtf = false
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
				console.log(req)
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
	.ffkg{
		margin: 20rpx auto;
		width: 90%;
		padding: 10rpx 0rpx;
	}
	.moneys{
		width: 90%;
		margin:20rpx auto;
		input{
			border: #31ab78;
			color: #31ab78;
			padding: 20rpx 20rpx;
			border-radius: 15rpx;
			border: #31ab78 1rpx solid;
		}
	}
	.image{
		margin-top: 20rpx;
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
				top: 4rpx;
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
		height: 500rpx;
		overflow: auto;
		background-color: white;
		position: fixed;
		top: 50%;
		left: 10%;
		transform: translateY(-50%);
		border-radius: 15rpx;
		z-index: 999;
		padding: 40rpx 10rpx;
		view{
			border-radius: 15rpx;
			margin-bottom: 20rpx;
			padding: 20rpx 20rpx;
			color: #666666;
			font-size: 28rpx;
			background-color: #dedede;
		}
	}
	
</style>
