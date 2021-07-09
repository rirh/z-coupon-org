import request from 'utils/request.js'
// 注册
export function postRegister(params) {
	return request({
		method: 'POST',
		url: '/register',
		data: {
			// unencode https://tool.oschina.net/encrypt?type=3
			appid: 'd3hkZWY2MWFlOTUwMGM3YzVm',
			secret: 'YzliNzAzNjdiZTc0YzQ1YTJhZTkyMTdmM2JkN2NmYTE=',
			action: 'openid',
			code: params.code
		}
	})
}
// 同步ip
export function getFetchIP(params) {
	return request({
		method: 'GET',
		url: '/ip'
	})
}
