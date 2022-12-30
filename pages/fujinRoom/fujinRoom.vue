<template>
  <view>
	  <!-- 附近的人列表 -->
	  <view class="userName" v-for="(item,index) in fuJingList">
	  	<view class=""><u-avatar :src="getImgsrc(item.avatar)" size="50"></u-avatar> </view>
	  	<view class="name">{{item.nickname}}</view>
		<view class="liao" @tap="toChatPage(item)">聊一聊</view>
	  </view>
	  
    <view  class="chat_noChat" v-if="fuJingList.length == 0">
      <image class="ctbg" src="/static/images/ctbg.png"></image>
      暂无内容
    </view>

	

  </view>
</template>

<script>

export default {
  data() {
    return {
     //接收附近的人
	 fuJingList:[],
    };
  },
	onPullDownRefresh() {
		this.getFujingName()
		setTimeout(()=>{
			uni.stopPullDownRefresh();
		},1000)
	},
  onLoad() {
    this.getFujingName()
  },

  onShow: function () {
    
  },
  methods: {
	  toChatPage(item){
	  	console.log('>>>>>跳转chat页面')
	  	console.log('>>>>>跳转chat页面',item.huanxin.username)
	  	var nameList = {
	  		myName:uni.getStorageSync('myUsername'),
	  		your:item.huanxin.username
	  	}
	  	console.log('单聊数据',nameList)
	  	//单聊
	  	uni.navigateTo({
	  		url:'/pages/chatroom/chatroom?username='+JSON.stringify(nameList)
	  	})
	  },
	  //商户登录以后获取经纬度返回环信用户名
	  async getFujingName(){
		  const req = await uni.$http.post('api/jiu/advert/huoqujingwdu',{
			  user_id:uni.getStorageSync('user_id'),
			  lng:uni.getStorageSync('longitude'),
			  lat:uni.getStorageSync('latitude')
		  })
		  console.log('附近额人',req)
		  this.fuJingList = req.data.data
		  console.log('附近',this.fuJingList)
	  }
    
  }
};
</script>

<style>
	page{
		background-color: #e6e6e6;
	}
</style>

<style scoped lang="scss">
@import "./chat.css";
.userName{
	display: flex;
	width: 90%;
	padding: 30rpx 20rpx;
	margin:30rpx auto;
	background-color: white;
	border-radius: 15rpx;
	position: relative;
	.name{
		margin-top: 20rpx;
		color: #434343;
		margin-left: 20rpx;
	}
	.liao{
		color: #2fb364;
		position: absolute;
		right: 50rpx;
		top: 50%;
		transform: translateY(-50%);
	}
}
</style>
