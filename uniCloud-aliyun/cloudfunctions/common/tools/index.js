let crypto = require('crypto') //引用加密模块
const error_message_list = require('./error-msg.json');

/*
 * 根据一个盐值加密生成随机的字符串
 * @function
 * @param {string} source 要转换的字符串
 */
const sha512 = function(source, salt) {
	const hash = crypto.createHmac('sha512', salt) // 盐值
	hash.update(source)
	const value = hash.digest('hex')
	console.log(value)
	return {
		salt: salt,
		Hash: value
	}
}

/**
 * @param {Object} 
 */
function isJSON(str) {
	if (typeof str == 'string') {
		try {
			if (str.indexOf('{') > -1) {
				return true;
			} else {
				return false;
			}
		} catch (e) {
			console.log(e);
			return false;
		}
	}
	return false;
}
/*
 * 根据账号 返回一个6位随机加密字符串的方法
 * function 
 * @param {string} user
 */
function generateInviteCode(user) {
	let now = new Date().getTime().toString();
	let code = sha512(user, now) // 这里使用了timestemp作为盐值，让生成的抽奖码更不随机
	return code.Hash.substr(3, 6) // 如果需要更多位 可以多截取一些，也可以从不同位置截取
}

/*
 * 根据信息 返回一个ID
 * function 
 * @param {string} user
 */
function generateID(user) {
	let code = sha512(user, 'tigerzh') // 这里使用了timestemp作为盐值，让生成的抽奖码更不随机
	return code.Hash.substr(1, 15) // 如果需要更多位 可以多截取一些，也可以从不同位置截取
}

/**
 * @param {string} algorithm
 * @param {any} content
 *  @return {string}
 */
function encrypt(algorithm, content) {
	let hash = crypto.createHash(algorithm)
	hash.update(content)
	return hash.digest('hex')
}
/**
 * @param {Object} content
 */
function sha1(content) {
	return encrypt('sha1', content)
}

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
	// 格式化数据 url化的接口和 客户端的不一致
	event = isJSON(event) ? JSON.parse(event) : event;
	result = event.body ? JSON.parse(event.body) : event;
	// url 端 token 在 header 里面取得 
	const h5_token = event.headers && event.headers['x-token'];
	// token 在客户端是uniIdToken 或者 uni_id_token 
	let token = result.uniIdToken || result.uni_id_token || h5_token;
	result.action = result.action || result.type || '';
	// 如果有token就需要校验
	if (token && uniID) {
		const res = await uniID.checkToken(token);
		if (res.code) return res;
		result.token = token;
	};
	return result;
}

module.exports = {
	generateInviteCode,
	generateID,
	sha1,
	isJSON,
	enRequestParams,
	enResult
}
