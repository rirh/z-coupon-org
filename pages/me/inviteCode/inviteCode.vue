<template>
	<view>
		<view class="h-card ">
			<view class="h-item shadow-warp">
				<view @click="goScanQRcode" class="row flex padding-sm">
					<view class="pre">
						<text></text>
					</view>
					<view class="contant text-bold flex justify-start align-center flex-sub">
						<text>扫邀请码</text>
					</view>
					<view class="append">
						<text class="icon">&#xe6aa;</text>
					</view>
				</view>
			</view>
		</view>
		<view class="h-card">
			<view class="h-item shadow-warp padding-bottom-lg">
				<view class="flex justify-center align-center padding-lg">
					<text class="text-bold text-xxl">{{userInfo.my_invite_code}}</text>
				</view>
				<view class="flex justify-center align-center">
					<image style="height: 600rpx;width: 600rpx;" :src="image" mode="scaleToFill"></image>
					<canvas canvas-id="qrcode" class="qrcode" />
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import uQRCode from './uqrcode.js'
	import {
		postUniParams
	} from 'api'
	import {
		showToast
	} from 'utils'
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				image: ''
			};
		},
		computed: {
			...mapState({
				userInfo: state => state.user.userInfo
			}),
		},
		onLoad() {
			this.$nextTick(() => {
				this.makeQRcode()
			})
		},
		methods: {
			goScanQRcode() {
				uni.scanCode({
					success: (res) => {
						if (res.result) {
							uni.showLoading()
							postUniParams({
								function: 'acceptInvite',
								uid: this.userInfo._id,
								inviteCode: res.result
							}).then(response => {
								uni.hideLoading()
								showToast(response.data.message, 6000)
							})
						}
					}
				});
			},
			makeQRcode() {
				uni.showLoading()
				uQRCode.make({
					canvasId: 'qrcode',
					componentInstance: this,
					text: this.userInfo.my_invite_code,
					size: 300,
					margin: 10,
					backgroundColor: '#ffffff',
					foregroundColor: '#000000',
					fileType: 'jpg',
					correctLevel: uQRCode.errorCorrectLevel.H,
					success: res => {
						this.image = res;
						uni.hideLoading()

					},

				})
			}
		},
	}
</script>

<style lang="scss">
	.qrcode {
		height: 300px;
		width: 300px;
		visibility: hidden;
		position: fixed;
		z-index: -1;
	}
</style>
