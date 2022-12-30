<template>
	<view>
		<!-- 服务类目 -->
		<view class="title">
			<view class="">
				<label >请选择服务类目：</label>
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							当前选择
						</view>
						<view class="uni-list-cell-db">
							<picker @change="bindPickerChange" :value="index" :range="namelist">
								<view class="uni-input">{{namelist[index]}}</view>
							</picker>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 请输入服务名称 -->
		<view class="title">
			<view class=""><label >请输入服务名称：</label><input type="text" placeholder="服务名称" v-model="fuwuaname"></view>
		</view>
		<!-- 请输入服务价格 -->
		<view class="title">
			<view class=""><label >请输入服务价格：</label><input type="text" placeholder="服务价格" v-model="fuwujiage"></view>
		</view>
		<!-- 请输入服务上下架 -->
		<view class="title" style="display: flex;">
			<label >商品是否上下架：</label>
			<view class="">
				<radio-group name="" @change="sxj">
					<label>
						<radio value="1" /><text>上架</text>
					</label>
					<label>
						<radio value="2" /><text>下架</text>
					</label>
				</radio-group>
			</view>
		</view>
		<!-- 请上传服务图片 -->
		<view class="title">
			<view class=""><label >请上传服务图片：</label></view>
			<view class="image" v-if="imagurl">
				<image :src="getImgsrc(imagurl)" mode=""></image>
			</view>
			<view class="image_s" @tap="imagtap" v-else>
				<view class="">点击选择图片</view>
			</view>
		</view>
		<!-- 确定添加 -->
		
		<view class="wig"><button type="primary" @tap="okfuwu">确定添加</button></view>
		
		
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index:0,
				//接收服务类目列表
				fuwulist:[],
				//服务类目名称列表
				namelist:['请选择服务类目'],
				//选择的服务类目id
				fuwuoklist:null,
				carid:null,
				//服务名称
				fuwuaname:'',
				//服务价格
				fuwujiage:'',
				//是否上下架
				sxjtf:null,
				//图片地址
				imagurl:'',
			}
		},
		onLoad() {
			this.getfuwulist()
		},
		methods: {
			//添加服务类目
			async okfuwu(){
				if(this.fuwuoklist != null && this.carid != null && this.fuwuaname != '' && this.fuwujiage != '' && this.sxjtf != null && this.imagurl != ''){
					const req = await uni.$http.post('api/jiu/server/addserver',{
						id:this.fuwuoklist,//服务id
						category:this.carid,//catid
						user_id:uni.getStorageSync('user_id'),
						title:this.fuwuaname,//服务名称
						money:this.fuwujiage,//服务价格 
						serimage:this.imagurl,//服务图片
						status:this.sxjtf,//是否上架
					})
					uni.showToast({
						icon:"none",
						title:req.data.msg,
						success: () => {
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
						title:'请填写完整信息'
					})
				}
			},
			//点击选着图片
			imagtap(){
				this.$upload.uploadImg(1,(res) =>{
					console.log(res)
					this.imagurl = res
				})
			},
			
			//选着服务类目
			bindPickerChange(e){
				this.index = e.detail.value
				console.log(e.detail.value)
				if(e.detail.value == 0){
					this.fuwuoklist = null
				}else{
					this.fuwuoklist = this.fuwulist[e.detail.value-1].id
					this.carid = this.fuwulist[e.detail.value-1].cate_id
					console.log(this.fuwuoklist,this.carid)
				}
				
			},
			
			//商品是否上下架
			sxj(e){
				this.sxjtf = e.detail.value
				console.log(this.sxjtf)
			},
			//获取服务类目
			async getfuwulist(){
				const req = await uni.$http.get('api/jiu/server/serverbuy',{
					user_id:uni.getStorageSync('user_id')
				})
				this.fuwulist = req.data.data.action
				console.log(this.fuwulist)
				for(let i in this.fuwulist){
					this.namelist.push(this.fuwulist[i].name)
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
.title{
	width: 90%;
	margin:20rpx auto;
	.image{
		width: 100%;
		text-align: center;
		margin: auto;
	}
	.image_s{
		
		border: 1rpx solid #c6c6c6;
		line-height: 400rpx;
		height: 400rpx;
		width: 400rpx;
		margin: 20rpx auto;
		text-align: center;
	}
	label{
		font-size: 33rpx;
		font-weight: 600;
	}
	input{
		width: 95%;
		margin: auto;
		background-color: #e2e2e2;
		padding: 20rpx 10rpx;
		border-radius: 15rpx;
	}
}
.wig{
	width: 90%;
	margin: auto;
}
</style>
