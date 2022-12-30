<template>
	<!-- 添加地址 -->
	<view class="receiving-2">
		<view class="list">
			<view>收货人</view> 
			<view>
				<input type="text" style="text-align: right;" placeholder='请填写收货人姓名' v-model='real_name'>
			</view>
		</view>
		<view class="list">
			<view>手机号码</view>
			<view>
				<input type="text" style="text-align: right;" placeholder='请填写收货人手机号' v-model='phone'>
			</view>
		</view>
		<view class="list">
			<view>选择所在地区</view>
			<view style="font-size: 28rpx; color: #333;">
				<!-- {{address}}<text class="iconfont icon-daohang"></text> -->
				<picker mode="multiSelector" @columnchange="bindMultiPickerColumnChange" :value="multiIndex" :range="multiArray">
						<view class="" v-if="dress">
							{{dress}}
						</view>
						<view v-else>
							{{ multiArray[0][multiIndex[0]] || ''}}，
							{{ multiArray[1][multiIndex[1]] || ''}}
							{{ multiArray[2][multiIndex[2]]  ? '，'+multiArray[2][multiIndex[2]]:''}}
						</view>
				</picker>
			</view>
		</view>
		<view class="list">
			<view>详细地址</view>
			<view class="area">
				<input type="text" placeholder="输入详情地址" v-model="detail">
			</view>
		</view>
		<view class="list">
			<view>设置默认地址</view>
			<view>
				<checkbox-group @change="checkChange">
					<label>
						<checkbox :value="1"/><text></text>
					</label>
				</checkbox-group>
			</view>
		</view>
		
		<view class="issue" @click="submitBox">
			保存
		</view>
		
		
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				multiArray:[],
				multiIndex: [0,0,0],// 三级联动的下标数组
				dress:'',
				area_list: [],//请求到的省市区数组
				
				//信息
				real_name:'', //名字
				phone:'', //手机号
				detail:'', //详情地址
				is_default:'0', //是否默认
				userId:uni.getStorageSync('UID') || '',
			}
		},
		onShow() {
			
		},
		methods:{
			//确认选择默认
			checkChange(e){
				console.log('e',e)
				if(e.detail.value > 0 ){
						this.is_default = e.detail.value[0]
				}else{
					this.is_default = 0
				}
			
			},
			//请求地区三级联动
			queyRegion(){
				let _this = this 
				_this.$http.postReginData()
				.then(res=>{
					_this.area_list = res.data.data
					console.log('三级联动数据',res)
						_this.multiArrayInit()
				})
			},
			// 初始化三级菜单
			multiArrayInit(){
				// console.log('area_list',this.area_list)
				let l = this.area_list.length
				let l2 = this.area_list[this.multiIndex[0]].children.length
				let l3 = this.area_list[this.multiIndex[0]].children[this.multiIndex[1]].children.length
				let mularray1 = []
				let mularray2 = []
				let mularray3 = []
				for(let i = 0; i < l; i++){
					mularray1.push(this.area_list[i].text)
				}
				for(let i = 0; i < l2; i++){
					mularray2.push(this.area_list[this.multiIndex[0]].children[i].text)
				}
				for(let i = 0; i < l3;i++){
					mularray3.push(this.area_list[this.multiIndex[0]].children[this.multiIndex[1]].children[i].text)
				}
				this.multiArray.push(mularray1)
				this.multiArray.push(mularray2)
				this.multiArray.push(mularray3)
				console.log(this.multiArray)
			},
			bindMultiPickerColumnChange(e){
				console.log('选中的',e)
				// e.detail.column 代表第几列
				// e.detail.value  代表选中的下标
				this.multiIndex[e.detail.column] = e.detail.value;
				let detail_value = e.detail.value
				switch (e.detail.column) {
					case 0: //拖动第1列
						console.log('拖动第1列')
						// this.multiIndex[]
						let l = this.area_list[detail_value].children.length
						let l2 = this.area_list[detail_value].children[0].children.length
						// this.area_list[detail_value].children
						let mularray2 = []
						let mularray3 = []
						for(let i = 0; i < l; i++){
							mularray2.push(this.area_list[detail_value].children[i].text)
						}
						for(let i = 0; i < l2; i++){
							mularray3.push(this.area_list[detail_value].children[0].children[i].text)
						}
						console.log(mularray2)
						this.multiArray[1] = mularray2
						this.multiArray[2] = mularray3
						break;
					case 1: //拖动第2列
						l2 = this.area_list[this.multiIndex[0]].children[detail_value].children.length
						
						mularray3 = []
						for(let i = 0; i < l2; i++){
							mularray3.push(this.area_list[this.multiIndex[0]].children[detail_value].children[i].text)
						}
						this.multiArray[2] = mularray3
						break;
				}
				this.$forceUpdate();
			},
			submitBox(){
				let _this = this 
				let data = {
					real_name:_this.real_name,
					phone:_this.phone,
					city:_this.multiArray[0][_this.multiIndex[0]]+'-'+_this.multiArray[1][_this.multiIndex[1]]+'-'+_this.multiArray[2][_this.multiIndex[2]],
					detail:_this.detail,
					is_default:_this.is_default,
					uid:_this.userId
				}
				_this.$http.postAddMap(data)
				.then(res=>{
					console.log('保存地址',res)
					if(res.data.code == 1){
						uni.showToast({
							title:'添加成功',
							icon:'none',
						})
						setTimeout(()=>{
							uni.navigateBack()
						},1000)
					}else{
						uni.showToast({
							title:'添加失败',
							icon:'none'
						})
					}
				})
			}
		},
		onLoad(){
			this.queyRegion()
		}
		
	}
</script>

<style lang="scss" scoped>
	.receiving-2{
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 60rpx;
		
		.list {
			width: 100%;
			height: 120rpx;
			display: flex;
			box-sizing: border-box;
			align-items: center;
			justify-content: space-between;
			border-bottom: #d4d4d4 2rpx solid;
			padding: 0 30rpx;
		
			.area {
				width: 70%;
				
				input{
					text-align: right;
				}
				textarea {
					width: 100%;
					height: 80rpx;
		
				}
			}
		}
		
		.issue {
			width: 600rpx;
			margin: 50rpx auto;
			padding: 30rpx 0;
			background-color: #45b787;
			text-align: center;
			color: #FFFFFF;
			border-radius: 50rpx;
		}
	}
</style>