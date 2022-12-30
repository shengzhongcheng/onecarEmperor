<template>
	<view>
		
		<view class="usertitle">
			<!-- 用户信息 -->
			<!-- <view class="user">
				<view class="userimage"><image :src="getImgsrc(shopinfor.user.avatar)" mode=""></image> </view>
				<view class="name"><strong>{{shopinfor.user.nickname}}</strong></view>
				
			</view> -->
			<!-- 内容标题 -->
			<view class="title" style="width: 100%;text-align: center;">{{shopinfor.title}}</view>
			<!-- 时间 -->
			<view class="time" style="width: 100%;text-align: center;margin-bottom: 20rpx;font-size: 20rpx;">{{shopinfor.nickname}} {{shopinfor.createtime | timeAgo}}</view>
			<!-- 内容标题 -->
			<view class="ms">{{shopinfor.answer}}</view>
			<!-- 内容 -->
			<view class="content">
				{{shopinfor.content || ''}}
			</view>
			<!-- 图片 -->
			<view class="image"><image @click="lookimg()" :src="getImgsrc(shopinfor.image)" mode="aspectFit"></image> </view>
			<!-- 视频 -->
			<view class="vid"><video :src="getImgsrc(shopinfor.video_files)" v-if="shopinfor.video_files"></video> </view>
		</view>
		<view class="chequan">
		    <view class="letft">
		     <view class=""><image :src="getImgsrc(shopinfor.imagees)" mode=""></image> </view>
		     <view class="marletft">
		      <view class=""><strong>{{shopinfor.name}}</strong></view>
		      <view class="fons"><text>活跃车友{{shopinfor.user}}</text><text class="tow">认证车主{{shopinfor.shi}}</text> </view>
		     </view>
		    </view>
		   </view>
		
		<!-- 全部评论 -->
		<view class="allpinglun">
			<view class="title"><strong>全部评论</strong></view>
		</view>
		<!-- 用户评论 -->
		<view class="userpinglunlist" v-for="(item,index) in pinglunlist" :key="index">
			<view class="usertop">
				<view class="images"><image :src="getImgsrc(item.avatar)" mode=""></image> </view>
				<view class="name">{{item.nickname}}</view>
			</view>
			<view class="pinglun">
				{{item.desc}}
			</view>
			<view class="time">{{item.createtime | timeAgo}} 
				<text @click="huifumen(item.id)" style="color: gray;">回复</text> 
				<text @click="tf(item.id)" style="color: #45B787;" v-show="item.id != newid && item.reply != null  ">展开</text> 
				<text @click="sq()" style="color: #45B787;" v-show="item.id == newid">收起</text> 
			</view>
			<!-- 子代 -->
			<view class="childer" v-for="(item2,index2) in item.reply" :key="index2" v-show="item.id == newid">
				<view class="usertop">
					<view class="images" style="width: 50rpx;height: 50rpx;"><image style="width: 50rpx;height: 50rpx;" :src="getImgsrc(item2.avatar)" mode=""></image> </view>
					<view class="name" style="margin-top: 5rpx;font-size: 25rpx;">{{item2.nickname}} <text class="huifutext" style="margin-left:10rpx" v-if="item2.reply_type == 2">回复<text style="margin-left: 10rpx;">{{item2.to_nickname}}</text> </text> </view>
				</view>
				<view class="pinglun">
					{{item2.desc}}
				</view>
				<view class="time">{{item2.createtime | timeAgo}} <text @click="chairhuifu(item2.id,item.id)">回复</text> </view>
			</view>
			
		</view>
		<view class="" v-if="pinglunlist.length == 0">
			<u-empty
			        mode="message"
					text="暂无评论"
			        icon="http://cdn.uviewui.com/uview/empty/message.png"
			>
			</u-empty>
		</view>
		
		
		
		<view class="huifu"><input type="text" v-model="pinglun" placeholder="写下你的评论吧!"><view class="pinglunok" @click="pinglungo()">发表</view> </view>
		<view class="zw">
			
		</view>
		
		<!-- 弹出层 -->
		<view class="pop" v-if="kdtf">
			<view class="" ><input type="text" v-model="huifupinlun" placeholder="请输入回复内容"></view>
			<text @click="huifu()">确认回复</text>
		</view>
		
		<view class="men" @click="none()" v-if="kdtf" :style="{height:windowheight}"  style="background-color: black;width: 100%;position: fixed;top: 0;opacity: 0.3;z-index: 888;">
			
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//当前id
				id:null,
				//接收详情
				shopinfor:[],
				//接受评论列表
				pinglunlist:[],
				//评论
				pinglun:'',
				//当前评论的pid
				pid:null,
				//评论子代id
				cid:null,
				//回复的评论
				huifupinlun:'',
				//评论是否展开
				trfa:false,
				/* 屏幕宽度 */
				windowwidth:0,
				/* 屏幕高度 */
				windowheight:0,
				kdtf:false,
				//当前评论的id
				newid:null,
				//回复类型:1=评论的回复,2=回复的回复
				tid:null,
				
			}
		},
		onLoad(res) {
			
			uni.getSystemInfo({
				success:(res) => {
					this.windowwidth = res.windowWidth
					this.windowheight = res.windowHeight+'px'
				}
			})
			
			this.id = res.id
			this.getinfor()
			this.getuserpinglun()
		},
		methods: {
			//预览图片
			lookimg(){
				var arr = []
				// for(let i in this.shopinfor.image){
					
					
				// }
				let urlk = this.shopinfor.image;
				let str = RegExp('http');
				let newUrl;
				//通过三元运算符进行判断该图片是否含有http域名，没有就拼接上去https://xcx.yichedi.com/
				str.test(urlk) ? newUrl = urlk : newUrl = 'https://xcx.yichedi.com/' + urlk;
				const urlss = newUrl
				arr.push(urlss)
				
				// this.shopinfor.image = urlss
				console.log('图片',arr)
				
				uni.previewImage({
					
						urls:arr, //需要预览的图片http链接列表，多张的时候，url直接写在后面就行了
						// current: '0', // 当前显示图片的http链接，默认是第一个
						success: function(res) {
							console.log('放大图片',res)
						},
						fail: function(res) {},
						complete: function(res) {},
					})
			},
			
			//评论是否展开
			tf(id){
				this.newid = id
				if(id == this.newid){
					this.trfa = true
				}
				
			},
			sq(){
				this.newid = -1
				this.trfa = false
			},
			
			
			//第一代父级弹出评论
			huifumen(pid){
				console.log(pid)
				this.tid = null
				this.pid = null
				this.cid = null
				this.cid = pid//回复目标id，在回复第一父代中cid和pid都是一样的
				this.pid = pid//父级id
				this.tid = 1//回复类型:1=评论的回复,2=回复的回复
				console.log(this.pid)
				this.kdtf = true
			},
			
			//子代回复
			async chairhuifu(cid,pid){
				this.tid = null
				this.pid = null
				this.cid = null
				this.pid = pid//父级id
				this.cid = cid//子代id
				this.tid = 2//回复类型:1=评论的回复,2=回复的回复
				this.kdtf = true
			},
			
			
			//回复
			async huifu(){
				const req = await uni.$http.post('api/v1/answer/writeReport',{
					user_id:uni.getStorageSync('user_id'),//用户id
					reply_type:this.tid,//回复类型:1=评论的回复,2=回复的回复
					community_comment_id:this.pid,//评论ID
					desc:this.huifupinlun,//回复内容
					reply_id:this.cid,//回复目标的ID
					flag:1,//身份:0=用户,1=店铺/师傅
				})
				uni.showToast({
					icon:"none",
					title:req.data.msg,
					success: (res) => {
						setTimeout(()=>{
							this.kdtf = false
							this.huifupinlun = ''
							this.getuserpinglun()
						},1000)
						
					}
				})
				console.log(req)
			},
			//蒙层
			none(){
				this.kdtf = false
			},
			
			//知识课堂—发布评论
			async pinglungo(){
				console.log(uni.getStorageSync('user_id'))
				console.log(this.id)
				console.log(this.pinglun)
				
				
				const req = await uni.$http.post('api/v1/answer/comment',{
					user_id:uni.getStorageSync('user_id'),//用户id
					moment_id:this.id,//当前知识id
					desc:this.pinglun,//内容
					flag:1,//身份:0=用户,1=店铺/师傅
					moment_type:2,//来源类型:1=知识学堂,2=车圈
				})
				console.log(req)
				if(req.data.msg == "评论成功"){
					console.log('评论车工')
					uni.showToast({
						icon:"none",
						title:req.data.msg,
						success: (res) => {
							setTimeout(()=>{
								this.pinglun = ''
								this.getuserpinglun()
							},1000)
							
						}
					})
				}
			},
			//获取详情
			async getinfor(){
				const req = await uni.$http.get('api/jiu/scrunchie/quandetail',{
					id:this.id
				})
				console.log(req)
				this.shopinfor = req.data.data.action
			},
			//获取用户评论
			async getuserpinglun(){
				const req = await uni.$http.get('api/v1/answer/commentList',{
					id:this.id,
					moment_type:2
				})
				console.log('评论列表',req)
				this.pinglunlist = req.data.data.data
			}
			
			
		}
	}
</script>

<style scoped>
	page{
		background-color: #F7F7F7;
	}
</style>
<style scoped lang="scss">
	.zw{
		height: 300rpx;
	}
	.usertitle{
		width: 90%;
		margin:0rpx auto;
		background-color: white;
		padding: 0rpx 36rpx;
		.user{
			display: flex;
			
			.userimage{
				width: 100rpx;
				height: 100rpx;
				image{
					border-radius: 50%;
					width: 100rpx;
					height: 100rpx;
				}
			}
			.name{
				margin-top: 25rpx;
				font-size: 25rpx;
				margin-left: 5rpx;
				
			}
			.xx{
				margin-top: 30rpx;
				background-color: #45B787;
				color: white;
				height: 40rpx;
				padding: 5rpx 10rpx;
				border-radius: 20rpx;
				margin-left: 10rpx;
				font-size: 20rpx;
			}
		}
		.title{
			padding: 20rpx 0rpx;
			width: 100%;
			color: #666666 ;
			font-size: 33rpx;
		}
		.content{
			margin: 20rpx 0rpx;
		}
		.image{
			image{
				
				height: 300rpx;
				width: 100%;
			}
		}
		.vid{
			width: 90%;
			margin: auto;
			video{
				width: 100%;
			}
		}
		
	}
	.allpinglun{
		width: 90%;
		margin:60rpx auto;
		margin-bottom: 60rpx;
		.title{
			font-size: 35rpx;
		}
	}
	.userpinglunlist{
		width: 90%;
		margin: auto;
		margin-bottom: 20rpx;
		border-bottom: 1rpx solid gainsboro;
		padding-bottom: 10rpx;
		.usertop{
			display: flex;
			.images{
				width: 90rpx;
				height: 90rpx;
				image{
					width: 90rpx;
					height: 90rpx;
					border-radius: 50%;
				}
			}
			.name{
				margin-top: 20rpx;
				margin-left: 20rpx;
				font-size: 30rpx;
				color: #666666;
			}
			
		}
		.pinglun{
			margin: 20rpx 0rpx;
			margin-left: 30rpx;
		}
		.time{
			font-size: 24rpx;
			padding-left: 30rpx;
			text{
				margin-left: 20rpx;
			}
		}
		.ms{
			font-size: 23rpx;
			color: #303030;
		}
		.childer{
			margin-top: 30rpx;
			margin-left: 80rpx;
			.usertop{
				display: flex;
				.images{
					width: 90rpx;
					height: 90rpx;
					image{
						width: 90rpx;
						height: 90rpx;
						border-radius: 50%;
					}
				}
				.name{
					margin-top: 20rpx;
					margin-left: 20rpx;
					font-size: 30rpx;
					color: #666666;
				}
				
			}
			.pinglun{
				margin: 20rpx 0rpx;
				margin-left: 30rpx;
			}
			.time{
				padding-left: 30rpx;
				text{
					margin-left: 20rpx;
				}
			}
		}
	}
	.huifu{
		display: flex;
		justify-content: space-between;
		width: 100%;
		padding: 20rpx 20rpx;
		position: fixed;
		bottom: 0rpx;
		left: 0rpx;
		background-color: white;
		input{
			width: 100%;
			padding: 20rpx 10rpx;
			background-color: #F5F5F5;
		}
		.pinglunok{
			width: 80rpx;
			padding: 20rpx 20rpx;
			background-color: #45B787;
			color: white;
		}
	}
	.pop{
		width: 80%;
		// height: 500rpx;
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
			margin-bottom: 20rpx;
			padding: 20rpx 20rpx;
			color: #666666;
			font-size: 28rpx;
			background-color: #dedede;
			input{
				width: 100%;
			}
		}
		text{
			width: 150rpx;
			display: block;
			background-color: #45B787;
			color: white;
			// margin-top: 50rpx;
			margin: 50rpx auto;
			padding: 20rpx 30rpx;
			text-align: center;
			// margin-left: 20%;
		}
	}
	.chequan{
	  border-radius: 20rpx;
	  width: 90%;
	  margin:20rpx auto;
	  background-color: #EEEEEE;
	  padding: 30rpx 20rpx;
	  .letft{
	   display: flex;
	   view{
	    image{
	     height: 80rpx;
	     width: 80rpx;
	    }
	   }
	   .marletft{
	    margin-left: 30rpx;
	    .fons{
	     font-size: 20rpx;
	     margin-top: 15rpx;
	     .tow{
	      margin-left: 20rpx;
	     }
	    }
	   }
	  }
	 }
</style>
