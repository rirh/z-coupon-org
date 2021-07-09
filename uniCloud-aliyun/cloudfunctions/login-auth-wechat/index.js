"use strict";
const add = require('./add.js');
const remove = require('./remove.js');
const update = require('./update.js');
const q = require('./query.js');
const tools = require('tools');
const {
	enResult,
	enRequestParams
} = tools;
const config = require('./config.json')
exports.main = async (event, context) => {
	//event为客户端上传的参数
	uniCloud.logger.log(`================${config.name} event===============`)
	const params = await enRequestParams(event);
	let result;
	switch (params.action) {
		case 'add':
			result = await add(params)
			break;
		case 'remove':
			result = await remove(params)
			break;
		case 'update':
			result = await update(params)
			break;
		case 'query':
		case 'queryRow':
			result = await params.action === 'query' ? q.query(params) : q.queryRow(params);
			break;
		default:
			result = await add(params)
			break;
	}
	result = enResult(result);
	uniCloud.logger.log(result)
	uniCloud.logger.log(`================${config.name} end===========`)
	//返回数据给客户端
	return result
};
