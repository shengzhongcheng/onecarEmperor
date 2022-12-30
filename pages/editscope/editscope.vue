<template>
	<view>
		<!-- 当前有的服务 -->
		<!-- <view class="newscope">
			<view class=""><strong>当前已选择服务</strong></view>
		</view>
		<view class="scopelist">
			<view class="scopelist_list" v-for="(item,index) in scoperan">
				{{item.service}}
				<view class="xx" @click="remscope(index,item)">x</view>
			</view>
			
		</view> -->
		<!-- 可选择服务 -->
		<view class="newscope">
			<view class=""><strong>可添加服务</strong></view>
		</view>
		<view class="scopelist">
			<!-- 第一级 -->
			<checkbox-group @change="allclass">
			<view class="scopelist_list" v-for="(item,index) in addscopelist" :key="index" @click="addscope(item)"><!-- {roat:item.id == tow} -->
				<view class="text"><strong>{{item.name}} </strong><image :class="item.id == tow?'roat':'foat'" src="/static/indexiconfont/botjiantou.png" mode=""></image> </view>
				
				
				<!-- 二级 -->
				<scroll-view class="chatow" name="tow" scroll-y="true" v-show="item.id == tow">
					
					<view class="towtext" v-for="(item2,index2) in item.children" :key="index2" @click.stop="towsco(item2)"><!-- 第二级点击事件 -->
						<view class="totextall">{{item2.name}} <text>￥{{item2.price}}</text> <checkbox class="malet" :value="String(item2.id)" @click.stop.native="()=>{}"/></view>
							
							
						<!-- 三级 -->
						<scroll-view class="serbox" scroll-y="true" v-show="item2.id == ser">
							<view class="chaser" v-for="(item3,index3) in item2.children" :key="index3" @click.stop="sersco(item3)"><!-- 第三级点击事件 -->
								{{item3.name}}<text>￥{{item3.price}}</text><checkbox class="malet" :value="String(item3.id)" @click.stop.native="()=>{}" />
							</view>
						</scroll-view>
						
						
					</view>
					
				</scroll-view>
				

			</view>
			</checkbox-group>
		</view>
		<!-- 确定 -->
		<view class="okbut" @click="buylist()">
			结算
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
				//当前服务
				scoperan:[
					
				],
				//可选择的服务
				addscopelist:[
					
				],
				//用户id
				user_id:uni.getStorageSync('user_id') || null,
				//已选商品的id
				shopid:[],
				//第二行显示
				tow:null,
				//第三行显示
				ser:null,
				//接受当前所选择的id数组
				alllist:[]
				
				
			}
		},
		onLoad() {
			this.addsco()//可添加的服务列表
			// this.scopcart()//当前已选服务
		},
		methods: {
			//购买服务类目
			async buylist(){
				if(this.alllist.length != 0){//先判断是否选中服务
					const req = await uni.$http.get('api/jiu/server/buy',{//提交服务id跳转结算页面
						user_id:uni.getStorageSync('user_id'),
						lei:this.alllist
					})
					console.log('购买',req)
					if(req.data.msg == "添加成功"){
						uni.navigateTo({
							url:'../bond/bond?sid='+req.data.data.action
						})
					}else if(req.data.msg == "请勿重复购买已有服务类目"){
						uni.showToast({
							icon:"none",
							title:req.data.msg
						})
					}

				}else{
					uni.showToast({
						icon:"none",
						title:'请选择服务类目后结算'
					})
				}
				
			},
			
			
			
			//勾选的数据
			allclass(e){
				console.log('勾选的数组',e)
				this.alllist = e.detail.value
			},
			//去结算
			async gomoney(){
				
					uni.navigateTo({
						url:'../bond/bond'
					})

			},
			//获取当前已选服务
			async scopcart(){
				const req = await uni.$http.get('api/jiu/server/cart',{
					user_id:uni.getStorageSync('user_id')
				})
				this.scoperan = req.data.data.action
				console.log(req)
			},
			
			
			//获取可添加服务列表
			async addsco(){
				const req = await uni.$http.get('api/jiu/server/bond')
				console.log('可添加服务',req)
				this.addscopelist = req.data.data.action
			},

			//删除当前已有服务
			async remscope(index,item){
				const req = await uni.$http.get('api/jiu/server/delserver',{
					id:item.id
				})
				console.log(req)
				for(let i in this.shopid){
					if(item.id == this.shopid[i]){
						this.shopid.splice(i,1)
					}
				}
				console.log(this.shopid)
				this.scoperan.splice(index,1)
				// this.addscopelist.push(this.addscopelist[index])
			},
			//点击第一级分类
			 addscope(item){
				if(this.tow != item.id){
					this.tow = item.id
				}else if(this.tow == item.id){
					this.tow = null
					this.ser = null
				}
			},
			//点击第二季分类
			towsco(item){
				if(this.ser != item.id){
					this.ser = item.id
				}else if(this.ser == item.id){
					this.ser = null
				}
				
			},
			//点击第三级分类
			sersco(item){
				
			}
			
		}
	}
</script>

<style scoped lang="scss">
	.roat{
		transform: rotate(180deg);
		transition: all 0.3s;
	}
	.foat{
		transition: all 0.3s;
	}
.newscope{
		width: 100%;
		padding: 20rpx 40rpx;
	}
	.scopelist{
		width: 90%;
		margin: 20rpx auto;
		.scopelist_list{
			padding: 20rpx 0rpx;
			width: 100%;
			margin-top: 30rpx;
			border-radius: 10rpx;
			border: 1rpx solid gainsboro;
			.text{
				font-size: 35rpx;
				padding-left: 20rpx;
				padding-top: 10rpx;
				padding-bottom: 10rpx;
				display: flex;
				justify-content: space-between;
				image{
					width: 40rpx;
					height: 40rpx;
					margin-top: 10rpx;
					margin-right: 50rpx;
				}
				
			}
			text{
				margin-left: 20rpx;
				color: red;
			}
			.chatow{
				width: 100%;
				margin-top: 10rpx;
				height: 500rpx;
				// padding-left: 30rpx;
				.towtext{
					margin-top: 20rpx;
					.totextall{
						display: flex;
						justify-content: space-between;
						width: 90%;
						margin: auto;
						font-size: 32rpx;
						border-bottom: 1rpx solid gainsboro;
						padding: 10rpx 0rpx;
						.malet{
							margin-left: 100rpx;
						}
					}
					.serbox{
						height: 300rpx;
					}
					.chaser{
						display: flex;
						justify-content: space-between;
						width: 80%;
						margin:20rpx auto;
						border-bottom: 1rpx solid gainsboro;
						padding: 10rpx 0rpx;
						// padding-left: 20rpx;
						// margin-top: 20rpx;
						.malet{
							margin-left: 100rpx;
						}
					}
				}
			}
		}
		
	}
	.okbut{
		position: fixed;
		left: 50%;
		bottom: 100rpx;
		transform: translateX(-50%);
		padding: 20rpx 40rpx;
		color: white;
		background-color: #0ad6be;
	}
	.zw{
		height: 400rpx;
	}
</style>
