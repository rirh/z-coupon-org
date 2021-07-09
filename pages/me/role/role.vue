<template>
	<view>
		<view class="h-card">
			<view class="h-item">
				<view class=""><button @click="handleAddRole" class="h-btn block bg-primary">新增角色</button></view>
				<view class="margin-top-sm"><button @click="handleAddPermission"
						class="h-btn block bg-primary">新增权限</button></view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		postUniParams
	} from 'api';
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {};
		},
		computed: {
			...mapState({
				userInfo: state => state.user.userInfo
			}),
		},
		async onLoad() {
			this.fetchAllList();
			const postAllRole = await postUniParams({
				function: 'getRoleByUid',
				uid: this.userInfo._id
			});
			console.log(postAllRole)


		},
		methods: {
			fetchAllList() {
				uni.showLoading();
				const postAllRole = postUniParams({
					function: 'getRoleList',
					limit: 0,
					offset: 20,
					needTotal: true
				});
				const postAllPermission = postUniParams({
					function: 'getPermissionList',
					limit: 0,
					offset: 20,
					needTotal: true
				});
				Promise.all([postAllRole, postAllPermission]).then(response => {
					uni.hideLoading();
					console.log(response);
				});
			},
			handleAddRole() {
				uni.showLoading();
				postUniParams({
					function: 'addRole',
					roleID: 'Admin',
					roleName: '超级管理员',
					comment: '具有最高权限的超级管理员'
				}).then(response => {
					uni.hideLoading();
					console.log(response);
					this.fetchAllList();
				});
			},
			handleAddPermission() {
				uni.showLoading();
				postUniParams({
					function: 'addPermission',
					permissionID: 'USER',
					permissionName: '个人中心',
					comment: '个人中心模块'
				}).then(response => {
					uni.hideLoading();
					console.log(response);
					this.fetchAllList();
				});
			}
		}
	};
</script>

<style></style>
