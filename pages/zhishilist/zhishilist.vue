<template>
	<view>
		<!-- 知识课堂 -->
		<!-- <view class="navclass">
			<view class="classtext">
				<text>全部</text><image src="@/static/shopadmin/topbot.png" mode=""></image>
			</view>
			<view class="classtext">
				<text>上传时间</text><image src="@/static/shopadmin/topbot.png" mode=""></image>
			</view>
			<view class="classtext">
				<text>分类</text><image src="@/static/shopadmin/topbot.png" mode=""></image>
			</view>
		</view> -->
		<template>
			<u-subsection :list="list" :current="current" @change="sectionChange" activeColor="#45B787"></u-subsection>
		</template>
		
		<!-- 课堂列表 -->
		<view class="nowlist" v-for="(item,index) in zslist" :key="index">
			<!-- 审核状态 -->
			<view class="pos err" v-if="item.is_shen == 0">审核中</view>
			
			<view class="pos red" v-if="item.is_shen == 2">已驳回</view>
			<view class="pos gre" v-if="item.is_shen == 1">已通过</view>
			<!-- 上驾状态 -->
			<view class="jpos gre" v-if="item.status == 1">已上架</view>
			<view class="jpos red" v-else>已下架</view>
			<!-- 是否收费 -->
			<view class="fpos red" v-if="item.fee_switch == 1">付费：￥{{item.fu_money}}</view>
			<view class="fpos gre" v-else>免费</view>
			
			
			<view class="title"><strong>{{item.question}}</strong></view>
			<view class="content">{{item.answer}}</view>
			<view class="time">发布时间：{{item.createtime | timeAgo}}</view>
			<view class="admin">
				<view class="org" @click="remlist(item.id)" v-if="current != 0">删除动态</view>
				<view class="gre"  @click="getclass(item)" v-if="current != 0">修改费用</view>
				<view class="gre"  @click="edtop(item)" v-if="item.status == 2 && current != 0">上架</view>
				<view class="gre"  @click="edbot(item)" v-else-if="current != 0">下架</view>
				<view class="gre"  v-if="item.fee_switch != 0">
					<radio-group name="" @change="zhifuxuanzhe">
						<label>
							<radio :value="1" /><text>余额支付</text>
						</label>
						<label>
							<radio :value="2" /><text>微信支付</text>
						</label>
					</radio-group>
				</view>
				<view class="gre" @click="lookinfor(item)">查看详情</view>
			</view>
		</view>
		<!-- 提示是否有订单信息 -->
		<view class="botnav" @click="fabu()">上传知识</view>
		
		
			<view class="trfaOrd" v-if="zslist.length == 0">
				<u-empty
				        mode="list"
						text="暂无知识"
				        icon="http://cdn.uviewui.com/uview/empty/list.png"
				>
				</u-empty>
			</view>
		
		<view class="zw">
			
		</view>
		<!-- 弹出层 -->
		<view class="pop" v-if="kdtf">
			<view class="">是否开启付费</view>
			<!-- 是否开启付费 -->
				<switch style="margin: 20rpx;" @change="switch2Change" :checked="whethermoney == 1" />
			<!-- 修改付费价格 -->
			<label v-if="fufei"><input type="text" v-model="thismoney" placeholder="请输入付费金额"> </label>
			<view class="yn" ><text @tap="remmoney">确定</text> <text @click="none()">取消</text></view>
		</view>
		
		<view class="men" @click="none()" v-if="kdtf" :style="{height:windowheight}"  style="background-color: black;width: 100%;position: fixed;top: 0;opacity: 0.3;z-index: 888;">
			
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current:0,
				list: ['全部', '我的'],
				//知识列表
				zslist:[],
				//接收是哪个页面过来的type = 0，传参images type = 1，传参images，answer type = 2，传参video
				type:null,
				//是否显示弹出
				kdtf:false,
				/* 屏幕宽度 */
				windowwidth:0,
				/* 屏幕高度 */
				windowheight:0,
				/* 弹框中的金额输入是否显示 */
				fufei:false,
				/* 当前知识是否付费 */
				whethermoney:null,
				//当前知识的价格
				thismoney:null,
				//当前付费的id
				thisid:null,
				//开关状态
				thiststus:null,
				//支付方式
				fangshi:null,
				
			}
		},
		onLoad(type) {
			uni.getSystemInfo({
				success:(res) => {
					this.windowwidth = res.windowWidth
					this.windowheight = res.windowHeight+'px'
				}
			})
			this.type = type.type
			console.log(this.type)
			this.getlist()
		},
		onShow() {
			this.getlist()
		},
		onPullDownRefresh() {
			this.getlist()
			setTimeout(()=>{
			uni.stopPullDownRefresh()	
			},1000)
		},
		
		methods: {
			//支付选着
			zhifuxuanzhe(e){
				console.log('e',e)
				this.fangshi = e.detail.value
			},
			
			//导航栏
			sectionChange(index) {
					this.current = index;
					this.getlist()
			},
			
			//上架
			async edtop(item){
				const req = await uni.$http.get('api/jiu/answer/change',{
					id:item.id,
					status:1
				})
				uni.showToast({
					icon:"none",
					title:req.data.msg,
					success: () => {
						this.getlist()
					}
				})
			},
			
			//下架
			async edbot(item){
				const req = await uni.$http.get('api/jiu/answer/change',{
					id:item.id,
					status:2
				})
				uni.showToast({
					icon:"none",
					title:req.data.msg,
					success: () => {
						this.getlist()
					}
				})
			},
			//修改价格
			async remmoney(){
				
					const req = await uni.$http.get('api/jiu/answer/monbegin',{
						id:this.thisid,
						fee:this.thiststus,
						fumoney:this.thismoney
					})
					uni.showToast({
						icon:"none",
						title:req.data.msg,
						success: () => {
							if(req.data.msg == "修改成功"){
								setTimeout(()=>{
									this.kdtf = false
									this.getlist()
								},1000)
							}
							
						}
					})
				
				
			},
			
			//开关
			switch2Change: function (e) {
				console.log('switch2 发生 change 事件，携带值为', e.detail.value)
				this.fufei = e.detail.value
				if(this.fufei == true){
					this.thiststus = 1
				}else if(this.fufei == false){
					this.thiststus = 0
					this.thismoney = 0 
				}
			},
			
			
			//修改付费
			async getclass(item){
				this.kdtf = true
				this.thisid = item.id
				this.whethermoney = item.fee_switch
				this.thismoney = item.fu_money
				console.log(this.whethermoney)
				if(this.whethermoney == 1){//是1就是已经为付费的
					this.fufei = true
				}
			},
			//蒙层事件
			none(){
				this.kdtf = false
			},
			
			//删除动态
			async remlist(id){
				const req = await uni.$http.get('api/jiu/answer/delete',{
					id:id,
				})
				console.log(req)
				this.getlist()
			},
			
			//跳转发布页面
			fabu(){
				if(this.type == 0){
					uni.navigateTo({
						url:'../knowclassroom/image/image',
						fail(err) {
							console.log(err)
						}
					})
				} else if(this.type == 1){
					uni.navigateTo({
						url:'../knowclassroom/knowclassroom'
					})
				}else if(this.type == 2){
					uni.navigateTo({
						url:'../knowclassroom/vid/vid'
					})
				}
				
			},
			
			/* type = 0，传参images
				type = 1，传参images，answer
				type = 2，传参video */
			
			//获取用户课堂列表
			async getlist(){
				const req = await uni.$http.get('api/jiu/answer/list',{
					user_id:uni.getStorageSync('user_id'),
					type:this.type,
					typeser:this.current
				})
				console.log(req)
				this.zslist = req.data.data.action
			},
			
			
			//查看详情
			async lookinfor(item){
				console.log('item',item)
				if(item.fee_switch != 0){
					if(this.fangshi != null){
						
						uni.navigateTo({
							url:'../zhishiinfor/zhishiinfor?id='+item.id+'&pay_way='+this.fangshi
						})
						
					}else{
						uni.showToast({
							icon:"none",
							title:'请选择支付方式'
						})
					}
					
					
				}else{
					uni.navigateTo({
						url:'../zhishiinfor/zhishiinfor?id='+item.id
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

<style scoped lang="scss">
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
	.nowlist{
		position: relative;
		width: 90%;
		margin: 20rpx auto;
		padding: 20rpx 20rpx;
		background-color: white;
		border-radius: 20rpx;
		.pos{
			position: absolute;
			top: 25rpx;
			right: 40rpx;
		}
		.jpos{
			position: absolute;
			top: 25rpx;
			right: 160rpx;
		}
		.fpos{
			position: absolute;
			top: 25rpx;
			right: 280rpx;
		}
		.err{
			color: orange;
		}
		.red{
			color: red;
		}
		.gre{
			color: #45B787;
		}
		.title{
			margin-top: 55rpx;
			width: 550rpx;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			font-size: 33rpx;
		}
		.content{
			margin: 20rpx 0rpx;
			overflow : hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 3;
			-webkit-box-orient: vertical;
			-webkit-line-clamp:3;
		}
		.time{
			border-bottom: 1rpx solid gainsboro;
			padding: 20rpx 0rpx;
			font-size: 20rpx;
		}
		.admin{
			display: flex;
			justify-content: space-between;
			margin-top: 20rpx;
			padding: 20rpx 0rpx;
			.org{
				color: orange;
			}
			.gre{
				color: #45B787;
			}
		}
	}
	.botnav{
		border-radius: 15rpx;
		position: fixed;
		bottom: 30rpx;
		left: 50%;
		transform: translateX(-50%);
		text-align: center;
		padding: 20rpx 20rpx;
		color: white;
		background-color: #45B787;
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
.pop{
		width: 80%;
		height: 300rpx;
		overflow: auto;
		background-color: white;
		position: fixed;
		top: 40%;
		left: 10%;
		transform: translateY(-50%);
		border-radius: 15rpx;
		z-index: 999;
		padding: 40rpx 10rpx;
		input{
			border: 1rpx solid #787878;
			border-radius: 15rpx;
			padding: 10rpx 20rpx;
		}
		.kaiguan{
			margin: 20rpx;
		}
		.yn{
			width: 90%;
			margin: auto;
			display: flex;
			justify-content: space-around;
			margin-top: 20rpx;
			text{
				background-color: #787878;
				color: white;
				padding: 10rpx 10rpx;
				border-radius: 15rpx;
			}
		}
	}
</style>
