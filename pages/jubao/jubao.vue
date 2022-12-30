<template>
	<view>
		<view class="userName">
			<view class="name">被举报人名称：</view>
			 <u--input
			    placeholder="被举报人账号名称"
			    border="surround"
				v-model="name"
			  ></u--input>
		</view>
		<view class="title">
			<view class="yuan">举报原因：</view>
		<u--textarea v-model="value1" height="200"  count  placeholder="请输入举报原因" ></u--textarea>
		</view>
		<u-gap :height="30"></u-gap>
		<view class="whid">
			<u-button type="primary" text="确定" @click="jubao"></u-button>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value1:'',
				name:'',
			}
		},
		methods: {
			async jubao(){
				if(this.value1 !== '' && this.name !== ''){
					const req = await uni.$http.post('api/jiu/useranswer/shangjvbao',{
						type:'环信举报',
						content:this.value1
					})
					console.log('举报',req)
					if(req.data.msg == "举报成功"){
						uni.showToast({
							icon:"none",
							title:req.data.msg
						})
					}
				}else{
					uni.showToast({
						icon:"none",
						title:'请输入举报账号和原因'
					})
				}
				
				
			}
		}
	}
</script>
<style>
	page{
		background-color: #eeeeee;
	}
</style>
<style scoped lang="scss">
.userName{
	width: 90%;
	margin: auto;
	.name{
		color: #3496ff;
		font-size: 30rpx;
		font-weight: 300;
	}
}
.title{
	width: 90%;
	margin: auto;
	.yuan{
		font-size: 30rpx;
		color: #3496ff;
	}
}
.whid{
	width: 90%;
	margin: auto;
}
</style>
