<template>
	<view class="">
	</view>
</template>

<script>
	export default {
		data() {
			return {};
		},
		onShow() {
			this.getUserInfo()
		},
		methods: {
			getUserInfo() {
				wx.getUserProfile({
					desc: "用于完善会员资料",
					success: async (res) => {
						console.log(res);
					},
					error: error => {
						console.log(error);
					}
				})
			}
		},
	};
</script>

<style></style>
