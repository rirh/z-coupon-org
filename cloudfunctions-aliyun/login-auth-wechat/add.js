'use strict';
/**
 *  add 
 */
const config = require('./config.json')
const db = uniCloud.database();
const collection = db.collection(config.name);
const tools = require('tools');
const {
	generateID
} = tools;

module.exports = async function (event) {
	uniCloud.logger.log('======add========')
	let result;
	delete event.action;
	const appid = 'wxdef61ae9500c7c5f';
	const secret = 'c9b70367be74c45a2ae9217f3bd7cfa1';
	const apiUrl =
		`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${event.code}&grant_type=authorization_code`
	const res = await uniCloud.httpclient.request(apiUrl, {
		dataType: 'json'
	})
	event.code = res.data;
	result = res.data;
	if (!event.code) {
		event.openid = res.data.openid;
		const docid = generateID(`${event.openid}`, 24);
		let data = {}
		for (const key in config.dbkeys) {
			if (event.hasOwnProperty(key)) {
				const element = event[key];
				data[key] = element || ''
			}
		}
		console.log(data);
		result = await collection.doc(docid).set(data);
	}
	uniCloud.logger.log('======add end====')
	return result;
}
