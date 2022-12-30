<template>
	<view>
		<view class="staffname">
			<view class="staffname_box">
				<view class="staffname_list">
					<view class="title">姓名:</view>
					<view class="clo">
						<template>
						  <u--input
						    placeholder="请输入姓名"
						    border="surround"
						    v-model="name"
						  ></u--input>
						</template>
					</view>
				</view>
				<!-- <view class="staffname_list">
					<view class="">性别:</view>
					<view class="clo">
						<template>
						  <u--input
						    placeholder="请输入性别"
						    border="surround"
						    v-model="value"
						  ></u--input>
						</template>
					</view>
				</view> -->
				<view class="staffname_list">
					<view class="">联系电话:</view>
					<view class="clo">
						<template>
						  <u--input
						    placeholder="请输入电话"
						    border="surround"
						    v-model="mobile"
						  ></u--input>
						</template>
					</view>
				</view>
				<view class="staffname_list">
					<view class="">地址:</view>
					<view class="clo">
						<template>
						  <u--input
						    placeholder="请输入地址"
						    border="surround"
						    v-model="adress"
						  ></u--input>
						</template>
					</view>
				</view>
			</view>
		</view>
		<!-- 删除按钮 -->
		<view class="rem" @tap="adduser">
			确认添加
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:'',
				mobile:'',
				adress:'',
				id:null,
			}
		},
		methods: {
			//添加
			async adduser(){
				if(this.name == ''){
					uni.showToast({
						title: '姓名不能为空',
						icon: 'none'
					});
				}else if(this.mobile == ''){
					uni.showToast({
						title: '号码不能为空',
						icon: 'none'
					});
				}else{
					const req = await uni.$http.get('api/jiu/usercate/addtabulate',{
						user_id:uni.getStorageSync('user_id'),
						name:this.name,
						mobile:this.mobile,
						adress:this.adress,
						id:this.id,
					})
					uni.showToast({
						icon:"none",
						title: req.data.msg,
						success: () => {
							setTimeout(()=>{
								uni.navigateBack({
									delta: 1
								});
							},1000)
							
						}
					});
				}
			}
		}
	}
</script>

<style scoped lang="scss">
.staffname{
	width: 100%;
	margin-top: 30rpx;
	.staffname_box{
		width: 90%;
		margin: auto;
		padding: 20rpx 20rpx;
		.staffname_list{
			
			// border-bottom: 1rpx solid gainsboro;
			.title{
				
			}
			.clo{
				color: #8f8f8f;
				input{
					background-color: aliceblue;
				}
			}
			view{
				padding: 10rpx 20rpx;
			}
		}
	}
}
.rem{
	position: absolute;
	bottom: 200rpx;
	left: 50%;
	transform: translateX(-50%);
	padding: 20rpx 100rpx;
	border-radius: 20rpx;
	background-color: #0aba77;
	color: white;
}
</style>
