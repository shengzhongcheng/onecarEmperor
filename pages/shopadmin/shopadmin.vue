<template>
	<view>
		<!-- 店铺名称 -->
		<!-- <view class="shopname">
			<view class="shopname_left">
				<view class=""><strong>奥迪车友会</strong></view>
				<view class="fenshiclo">粉丝数：200</view>
			</view>
			<view class="sosuo">
				<image src="@/static/indexiconfont/sousuo.png" mode=""></image>
			</view>
		</view> -->
		<!-- 分类导航 -->
		<!-- <view class="navclass">
			<view class="classtext">
				<text>分类</text><image src="@/static/shopadmin/topbot.png" mode=""></image>
			</view>
			<view class="classtext">
				<text>上传时间</text><image src="@/static/shopadmin/topbot.png" mode=""></image>
			</view>
			<view class="classtext">
				<text>商品状态</text><image src="@/static/shopadmin/topbot.png" mode=""></image>
			</view>
		</view> -->
		<!-- 商品列表 -->
		<checkbox-group @change="chexvalue">
		<view class="gradordlist" v-for="(item,index) in shoplist" :key="index" >
			
			<!-- 订单详情 -->
			<view class="ordsxx">
				<view class="shopinfor">
					<view class="shopinfor_letft">
						<image :src="getImgsrc(item.serimage)" mode=""></image>
						<view class="shopinfor_right">
							<view class="listshopname">{{item.title}}</view>
							<view class="shopguige">服务类目：{{item.cate.catename}}</view>
							<view class="shopguige">
								<text v-show="item.status == 1">当前已上架</text>
								<text v-show="item.status == 2">当前已下架</text>
							</view>
							<view class="listshoppre">￥{{item.money}}元</view>
						</view>
						<!-- 当前状态 -->
						<view class="status">
							<view class="gre" v-if="item.is_shen == 1">已通过</view>
							<view class="org" v-if="item.is_shen == 2">已驳回</view>
							<view class="blu" v-if="item.is_shen == 0">审核中</view>
						</view>
						<!-- 是否推送到商城 -->
						<!-- <view class="tsbox">
							<view class="gre" v-if="item.stat == 1">已推送</view>
							<view class="blu" v-if="item.stat == 0">未推送</view>
						</view> -->
					</view>
				</view>
			</view>
			<!-- 编辑删除 -->
			<view class="ordstime">
				<view class="ortime" v-show="checkbox == false">
					<view @click="remshop(item.id)">删除服务</view>
				</view>
				<view class="ortime" v-show="checkbox == false" @click="open(item.id)">
					查看评价
				</view>
				<view class="ortime" v-show="checkbox == false" @click="tuisong(item)" v-if="item.stat == 0">
					推送至商城
				</view>
				<view class="ortime" style="color: #55dcb4;" v-show="checkbox == false" v-if="item.stat == 1">
					已推送
				</view>
				<view class="ortime" v-show="checkbox == false" @click="navtoeditshop(item.id)">
					编辑服务
				</view>
				<!-- 编辑框 -->
				<view class="uni-checkbox-wrapper" v-show="checkbox">
					<checkbox   :value="String(item.id)" :checked="che === true" />
				</view>
			</view>
			
		</view>
		</checkbox-group>
		<!-- 底部编辑 -->
		<view class="bottomed" v-show="checkbox == false">
			<view class="edit" @click="numsedit()">
				批量编辑
			</view>
		</view>
		<!-- 第二个底部编辑 -->
		<view class="botttow" v-show="checkbox">
			<view class="edittow" v-for="(item,index) in batchlist" :class="{ba:index == edindex}" :key="index" @click="batch(index)">
				{{item.name}}
			</view>
		</view>
		<view class="tanchu" v-show="tan">
			<view class="inp">
				<label for="">服务标题</label> <input type="text" v-model="title">
				<label for="">服务价格</label> <input type="text" v-model="money">
			</view>
			<view class="but">
				<view class="" @click="oked()">
					确定
				</view>
				<view class="" @click="noed()">
					取消
				</view>
			</view>
		</view>
		<view v-show="tan" @click="tanfal()" class="mask" :style="{'height':screenHeight}" style="background-color: black;width: 100%;position: fixed;top: 0;opacity: 0.3;">
		    
		</view>
		
		<!-- 弹出框 -->
		<uni-popup ref="popup" type="bottom">
			<view class="tankaung">
				<scroll-view scroll-y="true" style="height: 1000rpx;">
					<view class="title">全部评论</view>
					<view class="pinglun" v-for="(item,index) in pinglunlist" :key="index">
						<view class="head"><u-avatar :src="getImgsrc(item.user.avatar)"></u-avatar> <text>{{item.user.nickname}}</text><text class="pos">{{item.uptime | timeAgo}}</text> </view>
						<view class="usertext">
							{{item.content}}
						</view>
					</view>
					<view class="">
						<u-empty
						        mode="message"
								text="评论为空"
						        icon="http://cdn.uviewui.com/uview/empty/message.png"
						>
						</u-empty>
					</view>
				</scroll-view>
			</view>
		</uni-popup>
		<!-- 推送到商城 -->
		<uni-popup ref="shop" type="bottom">
			<view class="tankaung" style="height: 500rpx;">
				<scroll-view scroll-y="true" style="height: 500rpx;">
					<view class="title">该服务将会被推送到商城</view>
					<view class="inp"><input type="text" v-model="btd" placeholder="输入价格"> </view>
					<view class="radio">
						<radio-group @change="shoptype">
							<label>
								<radio :value="1" /><text>备胎豆兑换</text>
							</label>
							<!-- <label>
								<radio :value="2" /><text>折扣购买</text>
							</label> -->
						</radio-group>
					</view>
					
					<view class="okshop"><button @click="tuishongshop()">确定</button></view>
				</scroll-view>
			</view>
		</uni-popup>
		
		
		<!-- 提示是否有订单信息 -->
			<view class="trfaOrd" v-if="shoplist.length == 0">
				<view class="orderr"><strong>还没有服务，快去添加吧~~</strong></view>
			</view>
		
		
		<!-- 占位 -->
		<view class="zw">
			
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//弹框蒙城是否显示
				tan:false,
				id:null,
				//多选框是否显示
				checkbox:false,
				//多选框是否选中
				che:false,
				//批量管理
				batchlist:[
					{'name':'批量删除'},
					{'name':'批量上架'},
					{'name':'批量下架'},
				],
				//底部编辑选中是否变色
				edindex:null,
				//商品数据列表
				shoplist:[],
				//接收选中的商品列表
				shopidlist:[],
				//屏幕高度
				screenHeight:null,
				//修改的边框
				title:'',
				//修改的价格
				money:'',
				//批量选择的数据
				fuwulist:[],
				//评论列表
				pinglunlist:[],
				//查看评论点击的服务id
				fwwuid:null,
				//要推送到商城的服务id
				fid:null,
				//推送到商城的备胎豆数量
				btd:null,
				//商品类型
				typeshop:null,
				
			}
		},
		onLoad() {
			this.getshoplist()
			
			uni.getSystemInfo({
			    success: (res) => {
			     console.log(res.screenHeight)
			     this.screenHeight = res.screenHeight+'px'
			    },
			    fail: (err) => {
			     console.log('错误信息',err)
			    }
			   })
		},
		onPullDownRefresh() {
			this.getshoplist()
			setTimeout(()=>{
				uni.stopPullDownRefresh()
			},1000)
		},
		methods: {
			//选着推送商品类型
			shoptype(e){
				console.log(e.detail.value)
				this.typeshop = e.detail.value
			},
			//确定推送到商城
			async tuishongshop(){
				if(this.typeshop != null && this.btd != null){
					const req = await uni.$http.post('api/jiu/consult/addshop',{
						user_id:uni.getStorageSync('user_id'),
						server:this.fid,//服务id
						bean:this.btd,//备胎豆
						type:this.typeshop,//是价格还是备胎豆
					})
					uni.showToast({
						icon:"none",
						title:req.data.msg,
						success: () => {
							setTimeout(()=>{
								this.getshoplist()
									this.$refs.shop.close()
							},1000)
						}
					})
				}else{
					uni.showToast({
						icon:"none",
						title:'请填写价格并选择类型'
					})
				}
				
			},
			
			//服务推送至商城
			tuisong(item){
				this.btd = null
				this.typeshop = null
				console.log(item)
				this.fid = item.id
				this.$refs.shop.open('bottom')
			},
			
			//获取评论
			async getpinlun(){
				const req = await uni.$http.post('api/jiu/server/serverping',{
					id:this.fwwuid
				})
				console.log('评论列表',req)
				this.pinglunlist = req.data.data.action
			},
			
			//唤起弹框
			 open(id){
				 this.fwwuid = id
				 this.getpinlun()
				// 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
				this.$refs.popup.open('bottom')
			},
			//弹框确定
			async oked(){
				const req = await uni.$http.get('api/jiu/server/seredit',{
					id:this.id,
					title:this.title,
					money:this.money
				})
				
				console.log(req)
				this.tan = false
				this.id = null
				this.getshoplist()
			},
			noed(){
				this.tan = false
			},
			//弹框隐藏
			tanfal(){
				this.tan = false
			},
			//商品上架
			async shoptop(){
				const req = await uni.$http.get('api/jiu/server/batch',{
					id:this.shopidlist,
					type:1,
				})
				console.log(req)
				this.getshoplist()
			},
			//商品下架
			async shopbot(){
				const req = await uni.$http.get('api/jiu/server/batch',{
					id:this.shopidlist,
					type:2,
				})
				console.log(req)
				this.getshoplist()
			},
			//商品删除
			async shoprem(){
				const req = await uni.$http.get('api/jiu/server/batch',{
					id:this.shopidlist,
					type:3,
				})
				console.log(req)
				this.getshoplist()
			},
			async remshop(i){
				const req = await uni.$http.get('api/jiu/server/batch',{
					id:i,
					type:3,
				})
				console.log(req)
				this.getshoplist()
			},
			
			//商品多选
			chexvalue(value){
				console.log(value.detail.value)
				this.shopidlist = value.detail.value
			},
			
			//获取商品列表
			async getshoplist(){
				const req = await uni.$http.get('api/jiu/server/list',{
					user_id:uni.getStorageSync('user_id')
				})
				console.log(req)
				this.shoplist = req.data.data.action
			},
			
			//单个商品编辑选项
			navtoeditshop(id){
				this.tan = true
				this.id = id//当前商品的id
				this.editinfor()
			},
			async editinfor(){
				const req = await uni.$http.get('api/jiu/server/listinfo',{
					id:this.id
				})
				console.log('信息',req)
				this.title = req.data.data.action.title
				this.money = req.data.data.action.money
			},

			// navtoeditshop(){
			// 	uni.navigateTo({
			// 		url:'../shopedit/shopedit'
			// 	})
			// },
			//批量编辑
			numsedit(){
				if(this.checkbox == true){//多选框以显示让它隐藏
					this.checkbox = false
				}else if(this.checkbox == false){
					this.checkbox = true
				}
			},
			//批量编辑按钮
			batch(index){
				this.edindex = index
				if(this.edindex == 1){
					this.shoptop()
					// this.shopidlist = []
					console.log('有吗',this.shopidlist)
				}else if(this.edindex == 0){
					this.shoprem()
					// this.shopidlist = []
					console.log('有吗',this.shopidlist)
				}else if(this.edindex == 2){
					this.shopbot()
					// this.shopidlist = []
					console.log('有吗',this.shopidlist)
				}
				if(this.checkbox == this.checkbox){
					this.checkbox = false
				}
			}
			
		}
	}
</script>
<style>
	page{
		background-color: #f3f3f3;
	}
</style>

<style scoped lang="scss">
	.tanchu{
		width: 90%;
		height: 400rpx;
		position: fixed;
		left: 5%;
		top: 40%;
		z-index: 1;
		background-color: white;
		border-radius: 15rpx;
		transform: translateY(-50%);
		.inp{
			
			width: 90%;
			margin:20rpx auto;
			input{
				width: 100%;
				padding: 20rpx 0rpx;
				padding-left: 10rpx;
				background-color: #e3e3e3;
				border-radius: 15rpx;
				margin-top: 20rpx;
			}
		}
		.radio{
			width: 90%;
			margin:20rpx auto;
		}
		.but{
			width: 50%;
			margin: auto;
			justify-content: space-between;
			display: flex;
			view{
				padding: 10rpx 20rpx;
				background-color: #848484;
				border-radius: 15rpx;
				color: white;
			}
		}
	}
.shopname{
	display: flex;
	justify-content: space-between;
	width: 90%;
	margin:20rpx auto;
	border: 1rpx solid gainsboro;
	border-radius: 20rpx;
	padding: 25rpx 20rpx;
	.shopname_left{
		.fenshiclo{
			color: #848484;
			font-size: 20rpx;
		}
	}
	.sosuo{
		image{
			margin-top: 15rpx;
			width: 40rpx;
			height: 40rpx;
		}
	}
}
.navclass{
	width: 90%;
	margin: auto;
	padding: 20rpx 10rpx;
	display: flex;
	justify-content: space-between;
	.classtext{
		image{
			height: 30rpx;
			width: 20rpx;
			position: relative;
			top: 5rpx;
			left: 5rpx;
		}
	}
}
.gradordlist{
	position: relative;
	background-color: white;
		width: 90%;
		// height: 400rpx;
		padding-bottom: 20rpx;
		margin:30rpx auto;
		border-radius: 20rpx;
		box-shadow:0rpx 0rpx  3rpx 3rpx #e3e3e3;
		.gradhead{
			display: flex;
			justify-content: space-between;
			border-bottom: 1rpx solid gainsboro;
			padding: 10rpx 20rpx;
			.gradhead_left{
				display: flex;
				image{
					height: 80rpx;
					width: 80rpx;
					border-radius: 50%;
				}
				.gradusername{
					margin-top: 20rpx;
					margin-left: 20rpx;
				}
			}
			.gradhead_right{
				margin-top: 20rpx;
				color: green;
			}
			
		}
		.ordsxx{
			width: 100%;
			margin:20rpx auto;
			border-bottom: 1rpx solid gainsboro;
			padding-bottom: 20rpx;
			.shopinfortext{
				margin: 10rpx 20rpx;
			}
			.shopinfor{
				width: 100%;
				padding-top: 20rpx;
				.shopinfor_letft{
					margin-left: 20rpx;
					display: flex;
					image{
						width: 150rpx;
						height: 150rpx;
						border-radius: 20rpx;
					}
					.shopinfor_right{
						margin-left: 20rpx;
						.listshopname{
							width: 400rpx;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
						}
						.shopguige{
							margin-top: 15rpx;
							color: #787878;
							font-size: 20rpx;
							text{
								// margin-left: 10rpx;
							}
						}
						.listshoppre{
							margin-top: 40rpx;
							color: #ff5500;
						}
					}
					.status{
						margin-right: 5rpx;
						margin-top: 70rpx;
						// color: #08c590;
						.gre{
							color: #08c590;
						}
						.org{
							color: orangered;
						}
						.blu{
							color: #39d4ff;;
						}
					}
					.tsbox{
						position: absolute;
						right: 0rpx;
						top: 0rpx;
					}
					
					.shopmoney{
						margin-left: 180rpx;
						margin-top: 10rpx;
						text{
							font-size: 40rpx;
						}
					}
				}
			}
		}
		.ordstime{
			position: relative;
			width: 90%;
			display: flex;
			justify-content: space-between;
			margin: auto;
			.ortime{
				color: #787878;
			}
			.goords{
				padding: 5rpx 40rpx;
				padding-bottom: 10rpx;
				border-radius: 20rpx;
			}
			.ordsrem{
				position: absolute;
				right: -34rpx;
				bottom: -146rpx;
				width: 200rpx;
				box-shadow:0rpx 0rpx  3rpx 3rpx #e3e3e3;
				border-radius: 20rpx;
				background-color: white;
				view{
					padding: 20rpx 10rpx;
					text-align: center;
					border-bottom: 1rpx solid #e3e3e3;
				}
			}
		}
	}
	.bottomed{
		width: 100%;
		box-shadow: 0rpx -5rpx 5rpx #e3e3e3;
		position: fixed;
		bottom: 0rpx;
		left: 0rpx;
		background-color: white;
		padding: 20rpx 0rpx;
		.edit{
			float: right;
			margin-right: 20rpx;
			padding: 25rpx 30rpx;
			background-color: #08c590;
			color: white;
			border-radius: 5rpx;
		}
	}
	.botttow{
		width: 100%;
		box-shadow: 0rpx -5rpx 5rpx #e3e3e3;
		position: fixed;
		bottom: 0rpx;
		left: 0rpx;
		background-color: white;
		padding: 20rpx 0rpx;
		display: flex;
		justify-content: space-around;
		.edittow{
			float: right;

			padding: 25rpx 30rpx;
			color: white;
			border-radius: 5rpx;
			color: #08c590;
			border: 1rpx solid #08c590;
		}
		.ba{
			background-color: #08c590;
			color: white;
		}
	}
	.tankaung{
		height: 1000rpx;
		background-color: white;
		border-radius: 20rpx 20rpx 0rpx 0rpx;
		.title{
			width: 90%;
			margin:30rpx auto;
			font-size: 33rpx;
			font-weight: 600;
			color: #35ad95;
		}
		.inp{
			width: 88%;
			margin: auto;
			padding: 20rpx 20rpx;
			border-radius: 15rpx;
			background-color: #cfcfcf;
		}
		.radio{
			width: 90%;
			margin:20rpx auto;
		}
		.okshop{
			width: 90%;
			margin: 30rpx auto;
			button{
				background-color: #08c590;
				color: white;
			}
		}
		.pinglun{
			width: 90%;
			margin:20rpx auto;
			padding: 30rpx 20rpx;
			border: 1rpx solid #b5b5b5;
			border-radius: 15rpx;
			.head{
				position: relative;
				display: flex;
				text{
					margin-top: 10rpx;
					margin-left: 20rpx;
				}
				.pos{
					position: absolute;
					top: 40rpx;
					left: 80rpx;
					color: #787878;
					font-size: 20rpx;
				}
			}
			.usertext{
				width: 100%;
				margin-top: 20rpx;
			}
		}
	}
	.trfaOrd{
			width: 90%;
			margin:100rpx auto;
			text-align: center;
			color: #787878;
		}
	.zw{
		height: 300rpx;
	}
</style>
