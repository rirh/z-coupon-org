export * from './request.js'
export const showToast = (title, duration) => {
	uni.showToast({
		title: title || '加载中...',
		duration: duration || 2000,
		position: 'bottom',
		icon: 'none'
	});
}
