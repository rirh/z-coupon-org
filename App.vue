<script>
	export default {
		onLaunch: function() {
			// #ifdef MP-WEIXIN
			wx.login({
				success(res) {
					if (res.code) {
						//发起网络请求
						console.log(res.code);
						// uniCloud.callFunction({
						// 	name: 'login-auth-wechat',
						// 	data: {
						// 		code: res.code
						// 	},
						// });
					} else {
						console.log('登录失败！' + res.errMsg);
					}
				}
			});
			// #endif
		},
		onShow: function() {},
		onHide: function() {
			console.log('App Hide');
		},
	};
</script>

<style>
	/*每个页面公共css */
</style>
