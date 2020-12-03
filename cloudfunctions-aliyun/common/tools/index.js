"use strict";
/**
 * @param {Object} 
 */
const error_message_list = require('./error-msg.json');

function isJSON(str) {
	if (typeof str == 'string') {
		try {
			JSON.parse(str);
			return true;
		} catch (e) {
			console.log(e);
			return false;
		}
	}
};

// 统一返回数据
/**
 * @param {Object} result
 */
function enResult(result) {
	const code = result.code;
	if (code)
		result.message = error_message_list[`${code}`] || '';
	return result;
}
/**
 *  校验头部信息
 *  event 请求参数
 *  uniID 校验头部
 */
async function enRequestParams(event, uniID) {
	let result;
	// 公用模块用法请参考 https://uniapp.dcloud.io/uniCloud/cf-common
	event = isJSON(event) ? JSON.parse(event) : event;
	result = event.body ? JSON.parse(event.body) : event;
	const h5_token = event.headers && event.headers['x-token'];
	let token = result.uniIdToken || result.uni_id_token || h5_token;
	result.action = result.action || result.type || '';
	if (token) {
		const res = await uniID.checkToken(token);
		if (res.code) return res;
		result.token = token;
	};
	return result;
}
/*
 * 根据一个盐值加密生成随机的字符串
 * @function
 * @param {string} source 要转换的字符串
 */
const sha512 = function(source, salt) {
	const hash = require('crypto').createHmac('sha512', salt) // 盐值
	hash.update(source)
	const value = hash.digest('hex')
	console.log(value)
	return {
		salt: salt,
		Hash: value
	}
}
/*
 * 根据信息 返回一个ID
 * function 
 * @param {string} user
 */
function generateID(user) {
	let code = sha512(user, 'tigerzh') // 这里使用了timestemp作为盐值，让生成ID更不随机
	return code.Hash.substr(code.Hash.length - 6, code.Hash.length - 1) // 如果需要更多位 可以多截取一些，也可以从不同位置截取
}
module.exports = {
	isJSON,
	enResult,
	enRequestParams,
	generateID
}
