<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
		// #ifdef MP-WEIXIN
		wx.login({
			success(res) {
				if (res.code) {
					//发起网络请求
					uniCloud.callFunction({
						name: 'login-auth-wechat',
						data: {
							code: res.code
						},
						success(res) {
							console.log(res);
						}
					});
				} else {
					console.log('登录失败！' + res.errMsg);
				}
			}
		});
		// #endif
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/*每个页面公共css */
</style>
