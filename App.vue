<script>
	import store from './stores';
	import {
		postRegister,
		getFetchIP
	} from './api/index.js';
	export default {
		onLaunch: async function() {
			console.log('App Launch');
			// #ifdef MP-WEIXIN
			wx.login({
				async success(res) {
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
					console.log(res);
					const response = await postRegister(res);
					uni.hideLoading()
					if (!Boolean(response.data.code)) {
						let userInfo = JSON.parse(JSON.stringify(response.data.userInfo));
						console.log(response.data.uid);
						if (!Boolean(userInfo?._id)) userInfo._id = response.data.uid || ''
						store.commit('user/updateUserInfo', userInfo);
						// this.$nextTick && this.$nextTick(() => {
						// 	uni.switchTab({
						// 		url: '/pages/me/me'
						// 	});
						// })
					}
					getFetchIP();
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

<style lang="scss">
	/*每个页面公共css */
	@import './styles/colorui.scss';
	@import './styles/icon.scss';
	@import './styles/index.scss';
</style>
