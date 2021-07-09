export default function(params) {
	if (!Boolean(params.url)) return;
	let url = process.env.VUE_APP_USER_HOST
	if (params.url) {
		const fullUrl = `${process.env.VUE_APP_USER_HOST}${params.url}`;
		url = params.url.startsWith('/') ? fullUrl : params.url
	}
	return new Promise((reslove, reject) => {
		uni.request({
			url,
			method: params.method || 'GET',
			data: params.data || {},
			success: (response => {
				reslove(response)
				if (typeof params.success === 'function') params.success(response)
			}),
			fail: ((fail) => {
				reject(fail)
				if (typeof params.fail === 'function') params.fail(response)
			}),
			complete: ((complete) => {
				if (typeof params.complete === 'function') params.complete(response)
			})
		})
	});
}
