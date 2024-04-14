
// 区分开发环境和生产环境  接口地址
export const baseUrl = 'http://47.108.74.228:50002'; //这里要改成你的接口地址
import store from '../store/index.js';//需要引入store
export function https(config) {
	//显示loading
	// uni.showLoading({
	// 	title: '加载中...'
	// });
	//设置请求头
	if (config.url === '/api/launch' || config.url === '/api/user/login') {
		config.header = {
			'content-type': 'application/json;charset=utf-8',
			'x-app-id': '10000',
			'x-token': uni.getStorageSync('Token'),
			'x-version': uni.getStorageSync("saveAllList").appVersion,
			'x-platform': uni.getStorageSync("saveAllList").osName,
			'x-device-id': uni.getStorageSync("saveAllList").deviceId,
			'x-channel': uni.getStorageSync('channel'),
			'x-mobile-brand': uni.getStorageSync("saveAllList").brand || "",
			'x-mobile-model': uni.getStorageSync("saveAllList").model,
			'x-user-agent': 'ua',
			'x-share-user-id':uni.getStorageSync("stickup"),
			'x-push-id':uni.getStorageSync("clientInfo"),
			'x-push-platform':'uni_android',
		};
	} else {
		config.header = {
			'content-type': 'application/json;charset=utf-8',
			'x-app-id': '10000',
			'x-token': uni.getStorageSync('Token'),
			'x-version': uni.getStorageSync("saveAllList").appVersion,
			'x-platform': uni.getStorageSync("saveAllList").osName,
			'x-device-id': uni.getStorageSync("saveAllList").deviceId,
			'x-channel': uni.getStorageSync('channel'),
			'x-mobile-brand': uni.getStorageSync("saveAllList").brand || "",
			'x-mobile-model': uni.getStorageSync("saveAllList").model,
			'x-user-agent': 'ua',
			'x-share-user-id':uni.getStorageSync("stickup"),
			'x-push-id':uni.getStorageSync("clientInfo"),
			'x-push-platform':'uni_android',
		};
	}

	//检查缓存中有没有token
	const token = uni.getStorageSync('Token');
	if (token) {
		config.header.Authorization = token
		// let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
		// let curRoute = routes[routes.length - 1].route //获取当前页面路由
		// if (routes == 'pages/login/login') {
		// 	uni.switchTab({
		// 		url: '../index/index',
		// 	});
		// }
	} else {
		// uni.redirectTo({
		// 	url: '/pages/login/login'
		// })
	}
	config.url = baseUrl + config.url; // 请求地址
	let promise = new Promise(function(resolve, reject) {
		uni.request(config).then(res => {
			// uni.hideLoading() //隐藏loading
			if (res[0]) {
				uni.showToast({
					title: "数据获取失败",
					icon: "none",
					duration: 1500
				})
				resolve(false);
			} else {
				let data = res
				if (data.code == 1) {
					resolve(data);
				} else {
					resolve(data);
				}
			}
		}).catch(error => {
			// wx.hideLoading() //隐藏loading
			reject(error);
		})
	})
	return promise
}