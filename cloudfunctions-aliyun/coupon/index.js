"use strict";
const db = uniCloud.database();
const collection = db.collection('coupon');

exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log("event : ", event)
	const {
		data = []
	} = await collection.get();
	event = {
		code: data.length ? 0 : 500,
		data
	}
	//返回数据给客户端
	return event
};
