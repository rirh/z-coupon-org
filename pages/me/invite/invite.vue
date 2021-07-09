<template>
	<view>
		<view class="h-card" v-if="Boolean(list.length)">
			<view class="h-item padding" v-for="(item, index) in list" :key="index">{{ item }}</view>
		</view>
		<view @click="startRefashData" class="h-card margin-top-lg" v-else>
			<view class="h-item padding-lg flex flex-direction justify-center align-center">
				<view class="flex justify-center align-center"><text class="icon icon-empty">&#xe8f1;</text></view>
				<view class="flex justify-center align-center padding-top-lg text-empty">这里空空如也，什么也没有～</view>
			</view>
		</view>
	</view>
</template>

<script>
import { postUniParams } from 'api';
import { mapState } from 'vuex';
export default {
	data() {
		return {
			queryParams: {
				pageNumber: 1,
				pageSize: 20,
				total: 0
			},
			list: []
		};
	},
	computed: {
		...mapState({
			userInfo: state => state.user.userInfo
		})
	},
	onLoad() {
		this.fetchInvitedUser();
	},
	onPullDownRefresh() {
		this.queryParams.pageNumber = 1;
		this.fetchInvitedUser();
	},
	onReachBottom() {
		this.queryParams.pageNumber += 1;
		this.fetchInvitedUser();
	},
	methods: {
		startRefashData() {
			uni.startPullDownRefresh();
			this.queryParams.pageNumber = 1;
			this.fetchInvitedUser();
		},
		fetchInvitedUser() {
			const { pageSize, pageNumber } = this.queryParams;
			postUniParams({
				uid: this.userInfo._id,
				function: 'getInvitedUser',
				limit: pageSize,
				offset: (pageNumber - 1) * pageSize,
				needTotal: true
			}).then(response => {
				uni.stopPullDownRefresh();
				const { total, invitedUser } = response.data;
				this.queryParams.total = total;
				this.list = invitedUser;
				// this.list = Array(20).fill('ooxx');
			});
		}
	}
};
</script>

<style lang="scss">
.icon-empty {
	font-size: 115rpx;
	color: #999;
}
.text-empty {
	font-size: 30rpx;
	color: #999;
}
</style>
