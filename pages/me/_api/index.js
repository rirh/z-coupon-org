import request from 'utils/request.js'
// 注册
export function postUpdateUserInfo(params) {
	return request({
		method: 'POST',
		url: '/updateUserInfo',
		data: params
	})
}
// 同步ip
export function getUserInfo(params) {
	return request({
		method: 'POST',
		url: '/getUserInfo',
		data: params
	})
}
// 
export function postUniParams(params) {
	return request({
		method: 'POST',
		url: '/uniParams',
		data: params
	})
}
// 检车token
export function postCheckToken(params) {
	return request({
		method: 'POST',
		url: '/checkToken',
		data: params
	})
}
// 检车token
export function postSendEmail(params) {
	return request({
		method: 'POST',
		url: '/code',
		data: params
	})
}

