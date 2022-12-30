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
			<view class="status red" v-if="item.is_shen == 1">已通过</view>
			<view class="status blu" v-if="item.is_shen == 0">审核中</view>
			<view class="status red" v-if="item.is_shen == 2">驳回</view>
			<!-- 订单详情 -->
			<view class="ordsxx">
				<view class="shopinfor">
					<view class="shopinfor_letft">
						<image :src="getImgsrc(item.server.serimage)" mode=""></image>
						<view class="shopinfor_right">
							<view class="listshopname">{{item.server.title}}</view>
							<view class="shopguige">
								<text v-show="item.status == 0">当前已上架</text>
								<text v-show="item.status == 1">当前已下架</text>
							</view>
							<view class="listshoppre"><text v-if="item.type == 2">￥</text> {{item.bean}}<text v-if="item.type == 1">备胎豆</text> <text  v-if="item.type == 2">折扣价</text> </view>
						</view>
					</view>
				</view>
			</view>
			<!-- 编辑删除 -->
			<view class="ordstime">
				<view class="ortime" v-show="checkbox == false" @tap="remshop(item.id)">
					<view>删除商品</view>
				</view>
				<view class="ortime" v-show="checkbox == false" @click="navtoeditshop(item)">
					编辑商品
				</view>
				<!-- 编辑框 -->
				<view class="uni-checkbox-wrapper" v-show="checkbox">
					<checkbox   color="#FFCC33" :value="item.id" :checked="che == true" />
				</view>
			</view>
			
		</view>
		</checkbox-group>
		<!-- 底部编辑 -->
		<!-- <view class="bottomed" v-show="checkbox == false">
			<view class="edit" @click="numsedit()">
				批量编辑
			</view>
		</view> -->
		<!-- 第二个底部编辑 -->
		<!-- <view class="botttow" v-show="checkbox">
			<view class="edittow" v-for="(item,index) in batchlist" :class="{ba:index == edindex}" :key="index" @click="batch(index)">
				{{item.name}}
			</view>
		</view> -->

		<!-- 占位 -->
		<uni-popup ref="shop" type="bottom">
			<view class="tankaung" style="height: 500rpx;">
				<scroll-view scroll-y="true" style="height: 500rpx;">
					<view class="title">编辑商品</view>
					<view class="inp"><input type="text" v-model="btd" placeholder="收取备胎豆数量"> </view>
					<view class="radio">
						<radio-group name="" @change="sxbut" v-if="adminshopid">
							<label>
								<radio :value="0" :checked="adminshopid.status == 0"/><text>上架</text>
							</label>
							<label>
								<radio :value="1" :checked="adminshopid.status == 1" /><text>下架</text>
							</label>
						</radio-group>
					</view>
					<view class="okshop"><button @click="edshopser()">确定</button></view>
				</scroll-view>
			</view>
		</uni-popup>
		<!-- 数据为空 -->
		<view class="" v-if="shoplist.length == 0">
			<u-empty
			        mode="list"
					text="暂无数据"
			        icon="http://cdn.uviewui.com/uview/empty/list.png"
			>
			</u-empty>
		</view>
		<!-- 触底 -->
		<view class="zw">
			
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//多选框是否显示
				checkbox:false,
				//多选框是否显示
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
				//备胎豆
				btd:null,
				//选中管理的商品id
				adminshopid:null,
				
				
				
				
			}
		},
		onLoad() {
			this.getshoplist()//商品列表
		},
		methods: {
			//删除商品
			async remshop(id){
				const req = await uni.$http.post('api/jiu/consult/condelete',{
					id:id
				})
				uni.showToast({
					icon:"none",
					title:req.data.msg,
					success: () => {
						setTimeout(()=>{
							this.getshoplist()
						},500)
						
					}
				})
			},
			
			//更改商品价格
			async edshopser(){
				const req = await uni.$http.post('api/jiu/consult/moneyedit',{
					id:this.adminshopid.id,//选中商品id
					money:this.btd,
				})
				uni.showToast({
					icon:"none",
					title:req.data.msg,
					success: () => {
						setTimeout(()=>{
							this.getshoplist()
							this.$refs.shop.close()
						},500)
						
					}
				})
			},
			
			//商品上下架
			async sxbut(e){
				console.log(e)
				const req = await uni.$http.post('api/jiu/consult/shopstatus',{
					status:e.detail.value,//状态:0=正常,1=下架
					id:this.adminshopid.id,
				})
				uni.showToast({
					icon:"none",
					title:req.data.msg,
					success: () => {
						setTimeout(()=>{
							this.getshoplist()
						},500)
						
					}
				})
			},
			//商品多选
			chexvalue(value){
				console.log(value.detail.value)
				this.shopidlist = value.detail.value
			},
			
			//获取商品列表
			async getshoplist(){
				const req = await uni.$http.get('api/jiu/consult/conlist',{
					user_id:uni.getStorageSync('user_id')
				})
				console.log(req)
				this.shoplist = req.data.data.action
			},
			
			//单个商品编辑选项
			navtoeditshop(item){
				this.adminshopid = item
				this.btd = item.bean
				console.log(this.adminshopid)
				this.$refs.shop.open('bottom')
			},
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
				if(this.checkbox == this.checkbox){
					this.checkbox = false
				}
				if(this.edindex == 1){
					this.shoptop()
				}else if(this.edindex == 0){
					this.shoprem()
				}else if(this.edindex == 2){
					this.shopbot()
				}
			}
			
		}
	}
</script>

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
		width: 90%;
		// height: 400rpx;
		padding-bottom: 20rpx;
		margin:30rpx auto;
		border-radius: 20rpx;
		box-shadow:0rpx 0rpx  3rpx 3rpx #e3e3e3;
		position: relative;
		.status{
			position: absolute;
			right: 20rpx;
			top: 20rpx;
			
		}
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
								margin-left: 10rpx;
							}
						}
						.listshoppre{
							margin-top: 40rpx;
							color: #ff5500;
						}
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
	.zw{
		height: 300rpx;
	}
	.red{
		color: #c5491f;
	}
	.blu{
		color: #08c590;
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
			color: #3fcbaf;
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
			margin:30rpx auto;
		}
		.okshop{
			width: 90%;
			margin: 30rpx auto;
			button{
				background-color: #08c590;
				color: white;
			}
		}
	}
</style>
