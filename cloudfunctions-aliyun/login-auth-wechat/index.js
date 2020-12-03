'use strict';
const db = uniCloud.database();
const collection = db.collection('wx-openids');
const tools = require('tools');
const {
	generateID
} = tools;
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const appid = 'wxdef61ae9500c7c5f';
	const secret = 'c9b70367be74c45a2ae9217f3bd7cfa1';
	const apiUrl =
		`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${event.code}&grant_type=authorization_code`
	const res = await uniCloud.httpclient.request(apiUrl, {
		dataType: 'json'
	})
	const openid = res.data.openid;
	const docid = generateID(openid);
	let openidsres = await collection.doc(docid).set({
		openid
	});
	//返回数据给客户端
	return openidsres
};
