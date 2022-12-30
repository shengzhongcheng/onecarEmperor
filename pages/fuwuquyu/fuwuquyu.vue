<template>
	<view>
		<!-- 头部添加按钮 -->
		<view class="topbut">
			<uni-section title="本地数据" type="line" padding style="height: calc(100vh - 100px);">
						<uni-data-picker placeholder="请选择地址" popup-title="请选择服务地区" :localdata="Province" @change="okquyu" :clear-icon="false">
						</uni-data-picker>
						<button class="mini-btn" type="primary" size="mini" @tap="addquyu">添加区域</button>
			</uni-section>
		</view>
		<!-- 表单 -->
		<uni-table border stripe emptyText="暂无更多数据" >
			<!-- 表头行 -->
			<uni-tr>
				<!-- <uni-th align="center">id</uni-th> -->
				<uni-th align="center">省</uni-th>
				<uni-th align="center">市</uni-th>
				<uni-th align="center">区</uni-th>
				<uni-th align="center">操作</uni-th>
			</uni-tr>
			<!-- 表格数据行 -->
			<uni-tr v-for="(item,index) in fuwulist" :key="index">
				<!-- <uni-td align="center">{{item.id}}</uni-td> -->
				<uni-td align="center">{{item.province.region_name}}</uni-td>
				<uni-td align="center">{{item.city.region_name}}</uni-td>
				<uni-td align="center">{{item.district.region_name}}</uni-td>
				<uni-td align="center"><button class="mini-btn" type="warn" size="mini" @tap="remdiqu(item)">删除</button></uni-td>
			</uni-tr>
		</uni-table>
		<!-- 选择所在区域 -->
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//接收省市区
				Province:[],
				//已有服务区域列表
				fuwulist:[],
				//省
				shen:null,
				//市
				si:null,
				//区
				qu:null,
			}
		},
		onShow() {
			this.getquyulist()//获取区域列表
			this.getProvince()
		},
		methods: {
			//删除已有地域列表
			async remdiqu(item){
				const req = await uni.$http.post('api/jiu/news/deletequyu',{
					id:item.id
				})
				console.log('删除',req)
				uni.showToast({
					icon:"none",
					title:req.data.msg,
					success: () => {
						setTimeout(()=>{
							this.getquyulist()
						},500)
						
					}
				})
			},
			
			//区域选着完毕触发
			okquyu(e){
				console.log(e)
				this.shen = e.detail.value[0].value
				this.si = e.detail.value[1].value
				this.qu = e.detail.value[2].value
			},
			//添加区域
			async addquyu(){
				if(this.shen != null && this.si != null && this.qu != null){
					const req = await uni.$http.post('api/jiu/news/addquyu',{
						user_id:uni.getStorageSync('user_id'),
						province:this.shen,
						city:this.si,
						district:this.qu
					})
					uni.showToast({
						icon:"none",
						title:req.data.msg,
						success: () => {
							setTimeout(()=>{
								this.getquyulist()
							},500)
							
						}
					})
				}else{
					uni.showToast({
						icon:"none",
						title:'请选择区域'
					})
				}
				
			},
			
			//获取区域列表
			async getquyulist(){
				const req = await uni.$http.get('api/jiu/news/qulist',{
					user_id:uni.getStorageSync('user_id')
				})
				console.log('区域列表',req)
				this.fuwulist = req.data.data
			},
			//获取省市区
			async getProvince(){
				const req = await uni.$http.post('api/ke/order/get_area_list')
				this.Province = req.data.data
				// console.log('地域',this.Province)
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
.topbut{
	margin:20rpx auto;
	width: 90%;
	button{
		margin-top: 20rpx;
		margin-right: 20rpx;
	}
}
</style>
