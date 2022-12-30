function chooseImg(count, success) {
	console.log(count)
	uni.chooseImage({
		count: count,
		success: res => {
			console.log('chooseImg',res)
			// console.log(res.tempFilePaths)
			uploadFiles(res.tempFilePaths,success)
			console.log(res.tempFilePaths)
		}
	})
}
const TOKEN = uni.getStorageSync('token')
async function uploadFiles(paths,success) {
	console.log('paths',paths)
	uni.showLoading({
		title: '正在上传'
	})
	for (let path of paths) {
		try {
			const uploadData = await uploadFile(path)
			console.log('uploadData',uploadData)
			success(uploadData)
		} catch(err) {
			console.log('错误',err)
			uni.showToast({
				title:err||'上传失败',
				icon:'error',
				mask:true
			})
			break;
		}
	}
	uni.hideLoading()
}

function uploadFile(path) {
	console.log(JSON.stringify(TOKEN))
	console.log('1231231')
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: 'https://xcx.yichedi.com/api/common/upload',
			// url: 'https://bb.dangjunwei.top/api/common/upload',
			filePath: path,
			name: 'file',
			header: {  //（根据自身接口要求选择）
				token:JSON.stringify(TOKEN)
			},
			// formData: {  //上传文件的额外参数（根据自身接口要求选择）
			// 	type: 1
			// },
			success: res => {
				console.log('上传文件', res)
				const imgRes=JSON.parse(res.data)
				if(res.statusCode==200){
					console.log('111112222',imgRes)
					resolve(imgRes.data.url)
					// 可能会出bug的地方，因为接口返回的数据不一样可能会导致无法返回图片路径
				}else{
					reject('上传失败');
				}
			},
			fail: () => {
				reject('网络错误');
			}
		});
	})
}

module.exports = {
	uploadImg: chooseImg,
}
