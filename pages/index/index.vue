<template>
	<view class="content base64">
		<skeleton :row="rowComputed" animate :loading="loading">
			<view class="goods" v-for="(item,index) in dataList" :key="index" @click="handleShare(item)">
				<image class="goods-image" :src="item.image" mode="scaleToFill"></image>
				<view class="goods-content">
					<view class="">
						<text class="goods-price">
							¥{{item.price}}
						</text>
					</view>
					<view class="">
						<text class="goods-news">{{item.content}}</text>
					</view>
				</view>
			</view>
		</skeleton>
	</view>
</template>

<script>
	import skeleton from 'components/skeleton/skeleton.vue'
	export default {
		components: {
			skeleton
		},
		computed: {
			rowComputed() {
				return uni.getSystemInfoSync().windowHeight / 35;
			}
		},
		data() {
			return {
				loading: false,
				dataList: []
			}
		},
		onPullDownRefresh() {
			this.init();
		},
		onLoad() {
			this.loading = true;
			this.init();
		},
		methods: {
			init() {
				uniCloud.callFunction({
					name: 'coupon',
					success: ({
						result: {
							code,
							data
						}
					}) => {
						uni.vibrateShort()
						uni.stopPullDownRefresh();
						this.loading = false;
						if (!code) this.dataList = data;
					},
					fail(error) {
						uni.stopPullDownRefresh();
						this.loading = false;
						console.log(error);
					}
				})
			},
			handleShare(item) {
				// #ifdef MP-WEIXIN
				console.log(item);
				wx.navigateToMiniProgram({
					appId: item.targetAppid,
					path: item.url,
					envVersion: 'release',
					success(res) {
						// 打开成功
						console.log(res);
					},
					fail(error) {
						console.log(error);
					}
				})
				// #endif
			}
		}
	}
</script>

<style>
	.content {
		height: 100vh;
		width: 100vw;
		overflow: scroll;
		background-color: #f6f6f6;
		padding-top: 40rpx;
	}



	.goods {
		/* height: 100rpx; */
		height: 240rpx;
		width: 100%;
		box-sizing: border-box;
		width: 94vw;
		margin-left: 3vw;
		margin-bottom: 20rpx;
		background-color: #d85c54;
		border-radius: 10rpx;
		display: flex;
		padding: 20rpx;
		background-color: ;
		box-shadow: 0rpx 3rpx 3rpx -2rpx rgba(0, 0, 0, 0.2), 0rpx 3rpx 4rpx 0rpx rgba(0, 0, 0, 0.14), 0rpx 1rpx 8rpx 0rpx rgba(0, 0, 0, 0.12);

	}

	.goods-image {
		height: 100%;
		width: 140rpx;
		margin-left: 10rpx;
	}

	.goods-content {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: start;
		flex-direction: column;
		margin-left: 50rpx;
	}

	.goods-price {
		color: #fff;
		font-size: 78rpx;
		font-weight: bold;
		font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif
	}

	.goods-news {
		color: #f4f4f4;
		font-size: 38rpx;
		font-weight: bold;
		font-family: 'Courier New', Courier, monospace;
		padding-top: 20rpx;
		display: block;
	}
</style>
