
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/loning/loning","pages/index/index","pages/login/login","pages/login/loginUser","pages/login/loginForget","pages/carMe/carmechild/masterAuth-car","pages/carMe/carmechild/merchant-car","pages/my/my","pages/gradords/gradords","pages/ordsxx/ordsxx","pages/myinfor/myinfor","pages/shopinfor/shopinfor","pages/ordsinfor/ordsinfor","pages/ordsstatus/ordsstatus","pages/ordsgo/ordsgo","pages/ordsing/ordsing","pages/ordsover/ordsover","pages/personalqualif/personalqualif","pages/scoperan/scoperan","pages/editscope/editscope","pages/bond/bond","pages/edpaw/edpaw","pages/shopadmin/shopadmin","pages/shopedit/shopedit","pages/wallet/wallet","pages/withdrawal/withdrawal","pages/gowithdrawal/gowithdrawal","pages/staff/staff","pages/staffadmin/staffadmin","pages/addstaff/addstaff","pages/apply/apply","pages/editmyinfor/editmyinfor","pages/bondadmin/bondadmin","pages/bondadmin/bondords/bondords","pages/bondadmin/bondfronzen/bondfronzen","pages/personalqualif/shopperson/shopperson","pages/editmyinfor/editshopinfor/editshopinfor","pages/ordsshohou/ordsshohou","pages/bargaingord/bargaingord","pages/pinlun/pinlun","pages/guanzhu/guanzhu","pages/beitaidou/beitaidou","pages/dengjishenqing/dengjishenqing","pages/zhisiketang/zhisiketang","pages/faquan/faquan","pages/fujinderen/fujinderen","pages/guanggao/guanggao","pages/shousuo/shousuo","pages/shouziminxi/shouziminxi","pages/shop/shop","pages/knowclassroom/knowclassroom","pages/zhishiinfor/zhishiinfor","pages/zhishishouyi/zhishishouyi","pages/knowquan/knowquan","pages/fanquaninfor/fanquaninfor","pages/edfaquan/edfaquan","pages/zhishilist/zhishilist","pages/knowclassroom/vid/vid","pages/knowclassroom/image/image","pages/fuwuquyu/fuwuquyu","pages/leimuguanli/leimuguanli","pages/fabufuwu/fabufuwu","pages/fabuguanggao/fabuguanggao","pages/shoporde/shoporde","pages/shopordinfor/shopordinfor","pages/chatroom/chatroom","pages/chat/chat","pages/main/main","pages/add_new/add_new","pages/groups/groups","pages/add_groups/add_groups","pages/fujinRoom/fujinRoom","pages/faceshibie/faceshibie","pages/jubao/jubao"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"tabBar":{"color":"#222222","selectedColor":"#11c60b","list":[{"iconPath":"static/tabbarimg/index.png","selectedIconPath":"static/tabbarimg/indexblue.png","pagePath":"pages/index/index","text":"首页"},{"iconPath":"static/tabbarimg/my.png","selectedIconPath":"static/tabbarimg/myblue.png","pagePath":"pages/my/my","text":"我的"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"一车帝商户端","compilerVersion":"3.6.5","entryPagePath":"pages/loning/loning","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/loning/loning","meta":{"isQuit":true},"window":{"navigationBarTitleText":"加载","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"首页","enablePullDownRefresh":true}},{"path":"/pages/login/login","meta":{},"window":{"navigationBarTitleText":"","navigationBarBackgroundColor":"#ffffff","navigationStyle":"custom"}},{"path":"/pages/login/loginUser","meta":{},"window":{"navigationBarTitleText":"","navigationBarBackgroundColor":"#ffffff"}},{"path":"/pages/login/loginForget","meta":{},"window":{"navigationBarTitleText":"","navigationBarBackgroundColor":"#ffffff"}},{"path":"/pages/carMe/carmechild/masterAuth-car","meta":{},"window":{"navigationBarTitleText":"师傅认证","navigationBarBackgroundColor":"#ffffff"}},{"path":"/pages/carMe/carmechild/merchant-car","meta":{},"window":{"navigationBarTitleText":"商家认证","navigationBarBackgroundColor":"#ffffff"}},{"path":"/pages/my/my","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/gradords/gradords","meta":{},"window":{"navigationBarTitleText":"抢单大厅","enablePullDownRefresh":true}},{"path":"/pages/ordsxx/ordsxx","meta":{},"window":{"navigationBarTitleText":"订单详情","enablePullDownRefresh":false}},{"path":"/pages/myinfor/myinfor","meta":{},"window":{"navigationBarTitleText":"个人信息","enablePullDownRefresh":false}},{"path":"/pages/shopinfor/shopinfor","meta":{},"window":{"navigationBarTitleText":"门店信息","enablePullDownRefresh":false}},{"path":"/pages/ordsinfor/ordsinfor","meta":{},"window":{"navigationBarTitleText":"订单信息","enablePullDownRefresh":false}},{"path":"/pages/ordsstatus/ordsstatus","meta":{},"window":{"navigationBarTitleText":"待派单","enablePullDownRefresh":false}},{"path":"/pages/ordsgo/ordsgo","meta":{},"window":{"navigationBarTitleText":"已派单","enablePullDownRefresh":false}},{"path":"/pages/ordsing/ordsing","meta":{},"window":{"navigationBarTitleText":"已完成","enablePullDownRefresh":false}},{"path":"/pages/ordsover/ordsover","meta":{},"window":{"navigationBarTitleText":"完成订单","enablePullDownRefresh":false}},{"path":"/pages/personalqualif/personalqualif","meta":{},"window":{"navigationBarTitleText":"个人资质","enablePullDownRefresh":false}},{"path":"/pages/scoperan/scoperan","meta":{},"window":{"navigationBarTitleText":"服务范围","enablePullDownRefresh":false}},{"path":"/pages/editscope/editscope","meta":{},"window":{"navigationBarTitleText":"修改服务范围","enablePullDownRefresh":false}},{"path":"/pages/bond/bond","meta":{},"window":{"navigationBarTitleText":"缴纳保证金","enablePullDownRefresh":false}},{"path":"/pages/edpaw/edpaw","meta":{},"window":{"navigationBarTitleText":"修改密码","enablePullDownRefresh":false}},{"path":"/pages/shopadmin/shopadmin","meta":{},"window":{"navigationBarTitleText":"服务管理","enablePullDownRefresh":true}},{"path":"/pages/shopedit/shopedit","meta":{},"window":{"navigationBarTitleText":"商品编辑","enablePullDownRefresh":false}},{"path":"/pages/wallet/wallet","meta":{},"window":{"navigationBarTitleText":"钱包","enablePullDownRefresh":false}},{"path":"/pages/withdrawal/withdrawal","meta":{},"window":{"navigationBarTitleText":"提现记录","enablePullDownRefresh":false}},{"path":"/pages/gowithdrawal/gowithdrawal","meta":{},"window":{"navigationBarTitleText":"提现","enablePullDownRefresh":false}},{"path":"/pages/staff/staff","meta":{},"window":{"navigationBarTitleText":"员工","enablePullDownRefresh":false}},{"path":"/pages/staffadmin/staffadmin","meta":{},"window":{"navigationBarTitleText":"员工管理","enablePullDownRefresh":false}},{"path":"/pages/addstaff/addstaff","meta":{},"window":{"navigationBarTitleText":"添加员工","enablePullDownRefresh":false}},{"path":"/pages/apply/apply","meta":{},"window":{"navigationBarTitleText":"申请入驻","enablePullDownRefresh":false}},{"path":"/pages/editmyinfor/editmyinfor","meta":{},"window":{"navigationBarTitleText":"修改个人信息","enablePullDownRefresh":false}},{"path":"/pages/bondadmin/bondadmin","meta":{},"window":{"navigationBarTitleText":"保证金管理","enablePullDownRefresh":false}},{"path":"/pages/bondadmin/bondords/bondords","meta":{},"window":{"navigationBarTitleText":"缴纳保证金","enablePullDownRefresh":false}},{"path":"/pages/bondadmin/bondfronzen/bondfronzen","meta":{},"window":{"navigationBarTitleText":"冻结中金额","enablePullDownRefresh":false}},{"path":"/pages/personalqualif/shopperson/shopperson","meta":{},"window":{"navigationBarTitleText":"门店资质","enablePullDownRefresh":false}},{"path":"/pages/editmyinfor/editshopinfor/editshopinfor","meta":{},"window":{"navigationBarTitleText":"修改店铺信息","enablePullDownRefresh":false}},{"path":"/pages/ordsshohou/ordsshohou","meta":{},"window":{"navigationBarTitleText":"售后订单","enablePullDownRefresh":false}},{"path":"/pages/bargaingord/bargaingord","meta":{},"window":{"navigationBarTitleText":"议价订单","enablePullDownRefresh":false}},{"path":"/pages/pinlun/pinlun","meta":{},"window":{"navigationBarTitleText":"评论","enablePullDownRefresh":false}},{"path":"/pages/guanzhu/guanzhu","meta":{},"window":{"navigationBarTitleText":"关注","enablePullDownRefresh":false}},{"path":"/pages/beitaidou/beitaidou","meta":{},"window":{"navigationBarTitleText":"我的备胎豆","enablePullDownRefresh":false}},{"path":"/pages/dengjishenqing/dengjishenqing","meta":{},"window":{"navigationBarTitleText":"等级申请","enablePullDownRefresh":false}},{"path":"/pages/zhisiketang/zhisiketang","meta":{},"window":{"navigationBarTitleText":"知识课堂","enablePullDownRefresh":false}},{"path":"/pages/faquan/faquan","meta":{},"window":{"navigationBarTitleText":"发圈","enablePullDownRefresh":false}},{"path":"/pages/fujinderen/fujinderen","meta":{},"window":{"navigationBarTitleText":"附近的人","enablePullDownRefresh":false}},{"path":"/pages/guanggao/guanggao","meta":{},"window":{"navigationBarTitleText":"广告管理","enablePullDownRefresh":false}},{"path":"/pages/shousuo/shousuo","meta":{},"window":{"navigationBarTitleText":"搜索","enablePullDownRefresh":false}},{"path":"/pages/shouziminxi/shouziminxi","meta":{},"window":{"navigationBarTitleText":"收支明细","enablePullDownRefresh":false}},{"path":"/pages/shop/shop","meta":{},"window":{"navigationBarTitleText":"商品管理","enablePullDownRefresh":false}},{"path":"/pages/knowclassroom/knowclassroom","meta":{},"window":{"navigationBarTitleText":"发布知识","enablePullDownRefresh":false}},{"path":"/pages/zhishiinfor/zhishiinfor","meta":{},"window":{"navigationBarTitleText":"知识详情","enablePullDownRefresh":false}},{"path":"/pages/zhishishouyi/zhishishouyi","meta":{},"window":{"navigationBarTitleText":"知识殿堂打赏收益","enablePullDownRefresh":false}},{"path":"/pages/knowquan/knowquan","meta":{},"window":{"navigationBarTitleText":"发布帖子","enablePullDownRefresh":false}},{"path":"/pages/fanquaninfor/fanquaninfor","meta":{},"window":{"navigationBarTitleText":"发圈详情","enablePullDownRefresh":false}},{"path":"/pages/edfaquan/edfaquan","meta":{},"window":{"navigationBarTitleText":"修改内容","enablePullDownRefresh":false}},{"path":"/pages/zhishilist/zhishilist","meta":{},"window":{"navigationBarTitleText":"知识分享","enablePullDownRefresh":true}},{"path":"/pages/knowclassroom/vid/vid","meta":{},"window":{"navigationBarTitleText":"发布知识","enablePullDownRefresh":false}},{"path":"/pages/knowclassroom/image/image","meta":{},"window":{"navigationBarTitleText":"发布知识","enablePullDownRefresh":false}},{"path":"/pages/fuwuquyu/fuwuquyu","meta":{},"window":{"navigationBarTitleText":"服务区域","enablePullDownRefresh":false}},{"path":"/pages/leimuguanli/leimuguanli","meta":{},"window":{"navigationBarTitleText":"类目管理","enablePullDownRefresh":false}},{"path":"/pages/fabufuwu/fabufuwu","meta":{},"window":{"navigationBarTitleText":"发布服务","enablePullDownRefresh":false}},{"path":"/pages/fabuguanggao/fabuguanggao","meta":{},"window":{"navigationBarTitleText":"发布广告","enablePullDownRefresh":false}},{"path":"/pages/shoporde/shoporde","meta":{},"window":{"navigationBarTitleText":"商城订单","enablePullDownRefresh":false}},{"path":"/pages/shopordinfor/shopordinfor","meta":{},"window":{"navigationBarTitleText":"订单详情","enablePullDownRefresh":false}},{"path":"/pages/chatroom/chatroom","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/chat/chat","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/main/main","meta":{},"window":{"navigationBarTitleText":"联系人","enablePullDownRefresh":false}},{"path":"/pages/add_new/add_new","meta":{},"window":{"navigationBarTitleText":"添加好友","enablePullDownRefresh":false}},{"path":"/pages/groups/groups","meta":{},"window":{"navigationBarTitleText":"群聊","enablePullDownRefresh":false}},{"path":"/pages/add_groups/add_groups","meta":{},"window":{"navigationBarTitleText":"新建群聊","enablePullDownRefresh":false}},{"path":"/pages/fujinRoom/fujinRoom","meta":{},"window":{"navigationBarTitleText":"附近","enablePullDownRefresh":true}},{"path":"/pages/faceshibie/faceshibie","meta":{},"window":{"navigationBarTitleText":"人脸识别","enablePullDownRefresh":false}},{"path":"/pages/jubao/jubao","meta":{},"window":{"navigationBarTitleText":"举报","enablePullDownRefresh":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
