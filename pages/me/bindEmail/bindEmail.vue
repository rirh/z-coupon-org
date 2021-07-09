<template>
	<view class="h-card ">
		<view class="h-item padding shadow-xs">
			<view v-if="userInfo.email" class="h-form-group " style="padding: 0;">
				<text class="title">当前邮箱</text>
				<input auto-focus :disabled="true" type="text" :value="userInfo.email" />
			</view>
			<view class="h-form-group " style="padding: 0;">
				<text class="title">邮&nbsp;&nbsp;箱</text>
				<input auto-focus :disabled="loading" type="text" v-model="email" />
				<button @click="handleSetCode" class="h-btn block bg-primary shadow">{{ vmsg }}</button>
			</view>
			<view class="h-form-group " style="padding: 0;">
				<text class="title">验证码</text>
				<input :disabled="loading" type="text" v-model="code" />
			</view>
			<view class="h-form-group">
				<button style="width: 100%;margin-top: 30rpx;" :loading="loading" @click="handleBindEmail" class="h-btn block bg-primary">确定</button>
			</view>
		</view>
	</view>
</template>

<script>
import { postUniParams, postCheckToken, postSendEmail } from 'api';
import { showToast } from 'utils';
import { mapState } from 'vuex';

export default {
	data() {
		return {
			email: '',
			loading: false,
			code: '',
			rightCode: '',
			vmsg: '验证码',
			isend: false
		};
	},
	computed: {
		...mapState({
			userInfo: state => state.user.userInfo
		})
	},
	methods: {
		async handleSetCode() {
			if (this.isend) return;
			if (!Boolean(this.email)) return;
			const code = await this.genCode();
			this.rightCode = code;
			uni.showLoading();
			const response = await postUniParams({
				function: 'setVerifyCode',
				email: this.email,
				code,
				expiresIn: 180,
				type: 'bind'
			});
			const sendresponse = await postSendEmail({
				email: this.email,
				type: 'bind'
			});
			uni.hideLoading();
			if (!Boolean(sendresponse.data.code)) {
				showToast('邮件已发送！');
			}
			this.vmsg = '180s';
			this.isend = true;
			let timer = {};
			const countDown = () => {
				timer && clearTimeout(timer);
				let currentS = Number(this.vmsg.split('s')[0]);
				if (currentS > 0) {
					currentS -= 1;
					this.vmsg = `${currentS}s`;
					timer = setTimeout(countDown, 1000);
				} else {
					this.vmsg = '验证码';
					this.isend = false;
				}
			};
			countDown();
		},

		async genCode() {
			const randomStr = '00000' + Math.floor(Math.random() * 1000000);
			const code = randomStr.substring(randomStr.length - 6);
			return code;
		},
		async handleBindEmail() {
			if (!Boolean(this.email)) return;
			if (!Boolean(this.code)) return;
			const uid = this.$store.state.user.userInfo._id;
			const emailReponse = await postUniParams({
				function: 'bindEmail',
				uid,
				email: this.email,
				code: this.code
			});
			console.log(emailReponse);
			this.loading = false;
			showToast(emailReponse.data.message);
		}
	}
};
</script>

<style></style>
