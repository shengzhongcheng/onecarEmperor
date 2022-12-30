<template>
	<view>
		
		<uni-table border stripe emptyText="暂无更多数据">
			<!-- 表头行 -->
			<uni-tr>
				<uni-th align="center">名称</uni-th>
				<uni-th align="center">价格</uni-th>
				<uni-th align="center">操作</uni-th>
			</uni-tr>
			<!-- 表格数据行 -->
			<uni-tr v-for="(item,index) in leimulist" :key="index">
				<uni-td align="center">{{item.cate.name}}</uni-td>
				<uni-td align="center">{{item.cate.price}}</uni-td>
				<uni-td align="center">
					<button class="mini-btn" type="primary" size="mini" @click="open(item)" style="margin-right: 10rpx;">关联品牌</button>
					<button class="mini-btn" type="warn" size="mini" @click="rempop(item)">移除品牌</button>
				</uni-td>
			</uni-tr>

		</uni-table>
		<!-- 选择品牌弹窗 -->
		<uni-popup ref="popup" type="bottom">
			<view class="tachuang">
				<view class="title">请配置服务品牌</view>
				<view class="titletext">
					<view class="">服务名称：{{namepar}}</view>
					<view class="">价格：{{par}}</view>
					<view class="oktianjia"><button class="mini-btn" type="primary" size="mini" @tap="addcar()">确认添加</button></view>
				</view>
				<view class="bodybig">
					<!-- 左边 -->
					<scroll-view scroll-y="true" class="leftbod" @scrolltolower="pingpaijiazhai">
						<!-- <view class="inp"><input type="text" placeholder="请输入需要添加的车品牌"></view> -->
						<view ><!--  @tap="pingpaitap(index,item)" :class="{blue:index==carindex}" {{item.name}} -->
						
							<view class="" v-for="(item,index) in allcar" :key="index"  @tap="pingpaitap(index,item)" :class="{blue:index==carindex}">
								<!-- <label style="position: absolute;left: 5rpx;top: 50%;transform: translateY(-50%);">
									<checkbox :value="item.brand_id" @click.stop.native="()=>{}"/><text></text>
								</label> -->
								{{item.name}}
							</view>
						
						</view>
					</scroll-view>
					<!-- 右边 -->
					<scroll-view scroll-y="true" class="rightbod">
						<view>
						<uni-table ref="table" border stripe emptyText="暂无更多数据" type="selection" @selection-change="selectionChange" >
							<!-- 表头行 -->
							<uni-tr>
								<uni-th align="center">车系名称</uni-th>
							</uni-tr>
							<!-- 表格数据行 -->
							<uni-tr v-for="(item,index) in carlist" :key="index">
								<uni-td align="center">{{item.name}}</uni-td>
							</uni-tr>
						
						</uni-table>
							
						</view>
					</scroll-view>
				</view>
			</view>
		</uni-popup>
		<!-- 删除品牌弹窗 -->
		<uni-popup ref="rempop" type="bottom">
			<view class="tachuang">
				<view class="title">移除服务品牌</view>
				<view class="titletext">
					<view class="">服务名称：{{leimuname}}</view>
					<view class="">价格：{{leimujiage}}</view>
					<view class="oktianjia"><button class="mini-btn" type="warn" size="mini" @tap="remcar()">确认移除</button></view>
				</view>
				<view class="bodybig">
					<!-- 左边 -->
					<scroll-view scroll-y="true" class="leftbod" @scrolltolower="havejiazhai">
						<!-- <view class="inp"><input type="text" placeholder="请输入需要添加的车品牌"></view> -->
						<view ><!--  @tap="pingpaitap(index,item)" :class="{blue:index==carindex}" {{item.name}} -->
						
							<view class="" v-for="(item,index) in havelist" :key="index"  @tap="pingpai(index,item)" :class="{blue:index==pingindex}">
								<!-- <label style="position: absolute;left: 5rpx;top: 50%;transform: translateY(-50%);">
									<checkbox :value="item.brand_id" @click.stop.native="()=>{}"/><text></text>
								</label> -->
								{{item.name}}
							</view>
						
						</view>
					</scroll-view>
					<!-- 右边 -->
					<scroll-view scroll-y="true" class="rightbod">
						<view>
						<uni-table ref="table" border stripe emptyText="暂无更多数据" type="selection" @selection-change="allxilie" >
							<!-- 表头行 -->
							<uni-tr>
								<uni-th align="center">车系名称</uni-th>
							</uni-tr>
							<!-- 表格数据行 -->
							<uni-tr v-for="(item,index) in chiderlist" :key="index">
								<uni-td align="center">{{item.name}}</uni-td>
							</uni-tr>
						
						</uni-table>
							
						</view>
					</scroll-view>
				</view>
			</view>
		</uni-popup>
		
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//类目列表
				leimulist:[],
				//选中的数据
				okdata:[],
				//选中的名称
				namepar:null,
				//选中的价格
				par:null,
				//选中的id
				xid:null,
				//全部车品牌
				allcar:[],
				//车品牌的数字下标
				carindex:0,
				//汽车品牌
				carlist:[],
				
				//选中的品牌id
				pinpaiid:[],
				//选中的系列id
				xilieid:[],
				
				//品牌分页
				page:0,
				
				//已有品牌
				havepingpai:[],
				//已有类目点击id
				haveid:null,
				//已有品牌分页
				havepage:0,
				//接收已有品牌
				havelist:[],
				//品牌子代车系
				chiderlist:[],
				//品牌index
				pingindex:0,
				//点击的品牌id
				rempingpaiid:null,
				//选中的车系id
				allchexiid:[],
				//选中的类目名字
				leimuname:'',
				//选中的类目名字
				leimujiage:'',
				
			}
		},
		onLoad() {
			this.getleimu()
		},
		methods: {
			//移除品牌车系
			async remcar(){
				const req = await uni.$http.post('api/jiu/usercate/editcatepai',{
					id:this.haveid,
					brand_ids:this.rempingpaiid,
					mark_ids:this.allchexiid
				})
				console.log('删除',req)
				if(req.data.msg == "移除成功"){
					uni.showToast({
						icon:"none",
						title:req.data.msg,
						success: () => {
							setTimeout(()=>{
								this.$refs.rempop.close()
							},500)
							
						}
					})
				}else{
					uni.showToast({
						icon:"none",
						title:'移除失败'
					})
				}
			},
			
			//品牌加载更多
			async havejiazhai(){
				this.havepage++
				this.ping()
			},
			async ping(){
				console.log('123123')
				const req = await uni.$http.post('api/jiu/usercate/carpinpai',{
					id:this.haveid,
					page:this.havepage,
				})
				console.log('已拥有',req)
				this.havelist = [...this.havelist,req.data.data]
			},
			//删除弹框弹出
			rempop(item){
				this.havelist = []
				this.chiderlist = []
				console.log('item',item)
				this.leimuname = item.cate.name
				 this.leimujiage = item.cate.price
				this.haveid = item.id
				this.getping()//获取已拥有品牌
				this.$refs.rempop.open('bottom')
				
			},
			//多选系列
			allxilie(e){
				console.log(e.detail.index)
				var inar = e.detail.index
				var okarr = []
				for(let i in inar){
					inar[i]
					for(let k in this.chiderlist){
						this.chiderlist[k]
						if(inar[i] == k){
							okarr.push(this.chiderlist[k].seriesid)
						}
					}
				}
				
				this.allchexiid = okarr
				console.log('选中的车',this.allchexiid)
			},
			//点击品牌
			pingpai(index,item){
				this.pingindex = index
				this.$refs.table.clearSelection()
				this.rempingpaiid = this.havelist[this.pingindex].brand_id//选中第品牌数据
				this.chiderlist = this.havelist[this.pingindex].child
			},
			
			//请求已拥有品牌
			async getping(){
				console.log('123123')
				const req = await uni.$http.post('api/jiu/usercate/carpinpai',{
					id:this.haveid,
					page:this.havepage,
				})
				console.log('已拥有',req)
				this.havelist = req.data.data
				this.rempingpaiid = this.havelist[this.pingindex].brand_id//默认选中第一个品牌数据
				this.chiderlist = this.havelist[this.pingindex].child
			},
			
			/* 下面为添加 */
			
			
			//品牌加载更多
			async pingpaijiazhai(){
				this.page++
				this.jiazhai()
			},
			async jiazhai(){//加载更多的时候调用
				const req = await uni.$http.post('api/jiu/usercate/nocarpinpai',{
					id:this.xid,
					page:this.page,
				})
				console.log('未',req)
				this.allcar=[...this.allcar,...req.data.data]
				console.log('加载后的',this.allcar)
			},
			//未拥有
			async getweiping(){//默认打开弹窗获取数据且默认选择第一个车品牌的数据
				const req = await uni.$http.post('api/jiu/usercate/nocarpinpai',{
					id:this.xid,
					page:this.page,
				})
				console.log('未',req)
				this.allcar = req.data.data
				this.carlist = this.allcar[this.carindex].child
				this.pinpaiid = this.allcar[this.carindex].brand_id
			},
			//添加车
			async addcar(){
				console.log('123',this.xid)
				console.log('234',this.pinpaiid)
				console.log('567',this.xilieid)
				
				if(this.xid != null && this.pinpaiid != '' && this.xilieid.length != 0){
					const req = await uni.$http.post('api/jiu/usercate/addcatepai',{
						id:this.xid,
						brand_ids:this.pinpaiid,
						mark_ids:this.xilieid
					})
					console.log('添加',req)
					if(req.data.msg == "添加成功"){
						uni.showToast({
							icon:"none",
							title:req.data.msg,
							success: () => {
								setTimeout(()=>{
									this.$refs.popup.close()
								},500)
								
							}
						})
					}else{
						uni.showToast({
							icon:"none",
							title:'添加成功'
						})
					}
				}else{
					uni.showToast({
						icon:"none",
						title:'请选择品牌车系'
					})
				}
				
			},
			
			//点击车品牌
			pingpaitap(index,item){
				console.log('index',index)
				console.log('品牌',item)
				this.$refs.table.clearSelection()
				// this.xilieid = []
				// console.log('删除了数组',this.xilieid)
				this.pinpaiid = item.brand_id
				this.carindex = index
				console.log('数字下标',this.carindex)
				this.carlist = this.allcar[this.carindex].child
				this.pinpaiid = this.allcar[this.carindex].brand_id
				// console.log(index)
				// this.carindex = index
				// this.getcar(this.carindex)
			},
			
			//唤起弹窗
			 open(item){
				 // this.page=0
				 this.carlist = []
				 this.allcar = []
				this.xid = item.id
				 this.okdata = item
				 this.namepar = item.cate.name
				 this.par = item.cate.price
				console.log(this.namepar)
			        // 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
			    this.$refs.popup.open('bottom')
				this.getweiping()
			},
			
			//类目列表
			async getleimu(){
				const req = await uni.$http.post('api/jiu/usercate/carelist',{
					user_id:uni.getStorageSync('user_id')
				})
				console.log(req)
				this.leimulist = req.data.data.action
			},
			
			// 多选
			selectionChange(e) {
				console.log(e.detail.index)
				var inar = e.detail.index
				var okarr = []
				for(let i in inar){
					inar[i]
					for(let k in this.carlist){
						this.carlist[k]
						if(inar[i] == k){
							okarr.push(this.carlist[k].seriesid)
						}
					}
				}
				
				this.xilieid = okarr
				console.log('选中的车',this.xilieid)
			},
			
		}
	}
</script>
<style >
	page{
		background-color: #f3f3f3;
	}
</style>

<style scoped lang="scss">
.tachuang{
	border-radius: 15rpx 15rpx 0rpx 0rpx; 
	width: 100%;
	height: 1000rpx;
	background-color: white;
	.title{
		width: 90%;
		text-align: center;
		margin: auto;
		font-weight: 600;
	}
	.titletext{
		width: 90%;
		margin: 20rpx auto;
		.oktianjia{
			position: absolute;
			right: 50rpx;
			top: 60rpx;
		}
	}
	.bodybig{
		width: 100%;
		display: flex;
		
		.leftbod{
			height: 800rpx;
			flex: 1;
			.inp{
				background-color: #e6e6e6;
			}
			view{
				position: relative;
				text-align: center;
				padding: 20rpx 0rpx;
				color: #626262;
			}
			.blue{
				color: #2892d3;
			}
		}
		
		.rightbod{
			height: 800rpx;
			flex: 1.5;
			// border: 1rpx solid black;
		}
	}
}
</style>
