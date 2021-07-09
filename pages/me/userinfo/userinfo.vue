<<<<<<< Updated upstream
<template>
	<view class="">
		<view class="">
			<view class="h-form-group padding-top-sm padding-bottom-sm">
				<text class="title">头像</text>
				<image @click="handlePreviewAvatar" class="h-avatar lg round" :src="userInfo.avatarUrl" mode="scaleToFill"></image>
			</view>
			<view class="h-form-group ">
				<text class="title">名称</text>
				<text class="">{{ userInfo.nickName }}</text>
			</view>
			<view class="h-form-group" @click="goEmailPage">
				<text class="title">邮箱</text>
				<text class="text-blue">{{ userInfo.email }}</text>
			</view>
			<view class="h-form-group ">
				<text class="title">手机</text>
				<text class="">{{ userInfo.mobile }}</text>
			</view>
			<view class="h-form-group ">
				<text class="title">城市</text>
				<text class="">{{ userInfo.country }}{{ userInfo.province }}{{ userInfo.city }}</text>
			</view>
			<view class="h-form-group ">
				<text class="title">性别</text>
				<text class="">{{ userInfo.gender ? '男' : '女' }}</text>
			</view>
			<view class="h-form-group ">
				<text class="title">语言</text>
				<text class="">{{ userInfo.language }}</text>
			</view>
			<view class="h-form-group ">
				<text class="title">上次登录IP</text>
				<text class="">{{ userInfo.last_login_ip }}</text>
			</view>
			<view class="h-form-group ">
				<text class="title">上次登录日期</text>
				<text class="">{{ userInfo.last_login_date | formatTime }}</text>
			</view>
			<view class="h-form-group ">
				<text class="title">注册IP</text>
				<text class="">{{ userInfo.register_ip }}</text>
			</view>
			<view class="h-form-group ">
				<text class="title">注册日期</text>
				<text class="">{{ userInfo.register_date | formatTime }}</text>
			</view>
			<view class="h-form-group ">
				<button open-type="getUserInfo" @getuserinfo="handleAsyncUserInfo" style="width: 100%;margin-top: 30rpx;" :loading="loading" class="h-btn block bg-primary">
					一键同步用户信息
				</button>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
import { postUpdateUserInfo, getUserInfo } from 'api';
export default {
	data() {
		return {
			loading: false
		};
	},
	filters: {
		formatTime(val) {
			var date = new Date(val + 8 * 3600 * 1000); // 增加8小时
			return date
				.toJSON()
				.substr(0, 19)
				.replace('T', ' ');
		}
	},
	computed: {
		...mapState({
			userInfo: state => state.user.userInfo
		})
	},
	onShow() {
		this.asyncUserInfo();
	},
	methods: {
		handlePreviewAvatar() {
			uni.previewImage({
				urls: [this.userInfo.avatarUrl],
				longPressActions: {
					itemList: ['保存图片'],
					success: function(data) {
						console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
					},
					fail: function(err) {
						console.log(err.errMsg);
					}
				}
			});
		},
		goEmailPage() {
			// if (!Boolean(this.userInfo.email)) {
			uni.navigateTo({
				url: '../bindEmail/bindEmail'
			});
			// }
		},
		goMobilPage() {
			if (!Boolean(this.userInfo.mobil)) {
				uni.navigateTo({
					url: '../bindPhone/bindPhone'
				});
			}
		},
		handleAsyncUserInfo(user) {
			console.log(user);
			const userinfo = user?.detail?.userInfo;
			const params = JSON.parse(JSON.stringify(userinfo));
			if (this.userInfo._id) {
				params.uid = this.userInfo._id;
				params.wxopenid = this.userInfo.username;
				this.asyncUserInfo(params);
			} else {
				// TODO need to login page
			}
		},
		async asyncUserInfo(params) {
			uni.showLoading();
			const response = await postUpdateUserInfo(params);
			this.fetchUserInfo();
		},
		async fetchUserInfo() {
			const response = await getUserInfo({
				uid: this.userInfo._id
			});
			uni.hideLoading();
			this.$store.commit('user/updateUserInfo', response.data.userInfo);
		}
	}
};
</script>

=======
<template>
	<view class="">
		<view class="">
			<view class="h-form-group ">
				<text class="title">头像</text>
				<image class="h-avatar lg round" :src="userInfo.avatarUrl" mode="scaleToFill"></image>
			</view>
			<view class="h-form-group ">
				<text class="title">名称</text>
				<text class="">{{ userInfo.nickName }}</text>
			</view>
			<view class="h-form-group" @click="goEmailPage">
				<text class="title">邮箱</text>
				<text class="">{{ userInfo.email }}</text>
			</view>
			<view class="h-form-group ">
				<text class="title">手机</text>
				<text class="">{{ userInfo.mobile }}</text>
			</view>
			<view class="h-form-group ">
				<text class="title">城市</text>
				<text class="">{{ userInfo.country }}{{ userInfo.province }}{{ userInfo.city }}</text>
			</view>
			<view class="h-form-group ">
				<text class="title">性别</text>
				<text class="">{{ userInfo.gender ? '男' : '女' }}</text>
			</view>
			<view class="h-form-group ">
				<text class="title">语言</text>
				<text class="">{{ userInfo.language }}</text>
			</view>
			<view class="h-form-group ">
				<text class="title">上次登录IP</text>
				<text class="">{{ userInfo.last_login_ip }}</text>
			</view>
			<view class="h-form-group ">
				<text class="title">上次登录日期</text>
				<text class="">{{ userInfo.last_login_date | formatTime }}</text>
			</view>
			<view class="h-form-group ">
				<text class="title">注册IP</text>
				<text class="">{{ userInfo.register_ip }}</text>
			</view>
			<view class="h-form-group ">
				<text class="title">注册日期</text>
				<text class="">{{ userInfo.register_date | formatTime }}</text>
			</view>
			<view class="h-form-group ">
				<!-- <button open-type="getPhoneNumber" @getphonenumber="handleAsyncUserInfo" 　
					style="width: 100%;margin-top: 30rpx;" :loading="loading" class="h-btn block bg-primary">
					获取用户手机号
				</button> -->
				<button open-type="getUserInfo" @getuserinfo="handleAsyncUserInfo"
					style="width: 100%;margin-top: 30rpx;" :loading="loading" class="h-btn block bg-primary">
					一键同步用户信息
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import {
		postUpdateUserInfo,
		getUserInfo
	} from 'api';
	export default {
		data() {
			return {
				loading: false
			};
		},
		filters: {
			formatTime(val) {
				var date = new Date(val + 8 * 3600 * 1000); // 增加8小时
				return date
					.toJSON()
					.substr(0, 19)
					.replace('T', ' ');
			}
		},
		computed: {
			...mapState({
				userInfo: state => state.user.userInfo
			})
		},
		onShow() {
			this.asyncUserInfo();
		},
		methods: {
			goEmailPage() {
				if (!Boolean(this.userInfo.email)) {
					uni.navigateTo({
						url: '../bindEmail/bindEmail'
					});
				}
			},
			goMobilPage() {
				if (!Boolean(this.userInfo.mobil)) {
					uni.navigateTo({
						url: '../bindPhone/bindPhone'
					});
				}
			},
			handleAsyncUserInfo(user) {
				console.log(user);
				const userinfo = user?.detail?.userInfo;
				const params = JSON.parse(JSON.stringify(userinfo));
				if (this.userInfo._id) {
					params.uid = this.userInfo._id;
					params.wxopenid = this.userInfo.username;
					this.asyncUserInfo(params);
				} else {
					// TODO need to login page
				}
			},
			async asyncUserInfo(params) {
				uni.showLoading();
				const response = await postUpdateUserInfo(params);
				this.fetchUserInfo();
			},
			async fetchUserInfo() {
				const response = await getUserInfo({
					uid: this.userInfo._id
				});
				uni.hideLoading();
				this.$store.commit('user/updateUserInfo', response.data.userInfo);
			}
		}
	};
</script>

>>>>>>> Stashed changes
<style></style>
