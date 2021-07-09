<template>
	<view>
		<view class="wapper">
			<view class="header">
				<view class="">
					<image @click="goUserInfo" class="avatar round" :src="userinfo.avatarUrl" mode="scaleToFill">
					</image>
				</view>
				<view v-if="isSyncUserInfo"><button class="userinfo-btn" open-type="getUserInfo"
						@getuserinfo="handleGetUserInfo">立即登录</button></view>
				<view v-else class="">
					<view class="">
						<text class="nick-name" @click="goUserInfo">{{ userinfo.nickName }}</text>
					</view>
					<view class="margin-top-xs">
						<text class="id">ID: {{ userinfo._id }}</text>
					</view>
				</view>
			</view>
		</view>

		<view class="h-card ">
			<view class="h-item shadow-xs">
				<!-- <view @click="goBindPhone" class="row flex padding-sm">
					<view class="pre"><text></text></view>
					<view class="contant text-bold flex justify-start align-center flex-sub"><text>绑定手机</text></view>
					<view class="append"><text class="icon">&#xe6aa;</text></view>
				</view> -->
				<view @click="goBindEmail" class="row flex padding-sm">
					<view class="pre"><text></text></view>
					<view class="contant text-bold flex justify-start align-center flex-sub"><text>绑定邮箱</text></view>
					<view class="append"><text class="icon">&#xe6aa;</text></view>
				</view>
			</view>
		</view>
		<view class="h-card ">
			<view class="h-item shadow-xs">
				<view @click="goInvitePage" class="row flex padding-sm">
					<view class="pre"><text></text></view>
					<view class="contant text-bold flex justify-start align-center flex-sub"><text>邀请码</text></view>
					<view class="append"><text class="icon">&#xe6aa;</text></view>
				</view>
				<view @click="goInvitedPage" class="row flex padding-sm">
					<view class="pre"><text></text></view>
					<view class="contant text-bold flex justify-start align-center flex-sub"><text>邀请列表</text></view>
					<view class="append"><text class="icon">&#xe6aa;</text></view>
				</view>
			</view>
		</view>
		<!-- <view class="h-card ">
			<view class="h-item shadow-xs">
				<view @click="goRolePage" class="row flex padding-sm">
					<view class="pre"><text></text></view>
					<view class="contant text-bold flex justify-start align-center flex-sub"><text>权限管理</text></view>
					<view class="append"><text class="icon">&#xe6aa;</text></view>
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import {
		showToast
	} from 'utils';
	import {
		postUpdateUserInfo,
		getUserInfo
	} from 'api';
	export default {
		data() {
			return {};
		},
		computed: {
			...mapState({
				userInfo: state => state.user.userInfo
			}),
			userinfo() {
				return this.userInfo || '';
			},
			isSyncUserInfo() {
				const avatarUrl = this.userInfo?.avatarUrl;
				// const isOpi = username && username.startsWith('opi');
				// const isOvi = username && username.startsWith('ovi');
				return Boolean(!avatarUrl);
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.userInfo?._id && this.fetchUserInfo();
			});
		},
		beforeDestroy() {},
		methods: {
			goRolePage() {
				uni.navigateTo({
					url: 'role/role'
				});
			},
			goUserInfo() {
				if (this.userInfo._id) {
					uni.navigateTo({
						url: 'userinfo/userinfo'
					});
				}
			},
			goBindPhone() {
				showToast('敬请期待');
				return;
				uni.navigateTo({
					url: 'bindPhone/bindPhone'
				});
			},
			goBindEmail() {
				uni.navigateTo({
					url: 'bindEmail/bindEmail'
				});
			},
			goInvitedPage() {
				uni.navigateTo({
					url: 'invite/invite'
				});
			},
			goInvitePage() {
				uni.navigateTo({
					url: 'inviteCode/inviteCode'
				});
			},
			async fetchUserInfo() {
				const response = await getUserInfo({
					uid: this.userInfo._id
				});
				uni.hideLoading();
				this.$store.commit('user/updateUserInfo', response.data.userInfo);
			},
			async handleGetUserInfo(user) {
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
			}
		}
	};
</script>

<style lang="scss">
	@import '../../styles/variables.scss';

	.userinfo-btn {
		background-color: transparent;
		color: #fff;
		font-size: 28rpx;
		padding: 0;
	}

	.userinfo-btn:after {
		border: none;
	}

	.header {
		background-color: $--color-primary;
		height: 200rpx;
		display: flex;
		justify-content: flex-start;
		// padding: 20rpx;
		align-items: center;

		.avatar {
			height: 120rpx;
			width: 120rpx;
			// border-radius: 50%;
			margin: 0 20px;
			background-color: #efefef;
		}

		.nick-name {
			color: white;
			font-size: 32rpx;
			font-weight: bold;
		}

		.id {
			color: #efefef;
			font-size: 28rpx;
		}
	}
</style>
