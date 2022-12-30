<template>
	<view>
		<!-- 资质身份证 -->
		<view class="idname">
			<view class=""><strong>上传身份证</strong></view>
		</view>
		<view class="userid">
			<view class="idpositive" >
				<image src="" mode=""></image>
			</view>
			<view class="idpositive">
				<image src="" mode=""></image>
			</view>
		</view>
		<!-- 技能证书 -->
		<view class="idname">
			<view class=""><strong>技能证书</strong></view>
		</view>
		<view class="userid">
			<view class="idpositive">
				
			</view>
			<view class="idpositive">
				
			</view>
		</view>
		<!-- 确定 -->
		<view class="userok">
			<view>取消</view>
			<view>确定</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				/* 身份证正反面 */
				idpositives:[],
			}
		},
		methods: {
	

		}
	}
</script>

<style scoped lang="scss">
	.idname{
		width: 90%;
		margin: auto;
		padding: 20rpx 0rpx;
	}
	.userid{
		width: 90%;
		height: 200rpx;
		margin: auto;
		display: flex;
		justify-content: space-between;
		.idpositive{
			width: 45%;
			height: 100%;
			border: 1rpx solid gainsboro;
			image{
				width: 100%;
				height: 100%;
			}
		}
	}
	.userok{
		width: 100%;
		margin-top: 50rpx;
		display: flex;
		justify-content: center;
		view{
			padding: 20rpx 40rpx;
			border: 1rpx solid gainsboro;
			background-color: green;
			color: white;
		}
	}
</style>
