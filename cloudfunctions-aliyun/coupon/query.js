'use strict';
/**
 *  query 
 */
const config = require('./config.json')
const db = uniCloud.database();
const collection = db.collection(config.name);

async function queryRow(event) {
	let result;
	delete event.action;
	uniCloud.logger.log('======query========')
	const _id = event.id;
	result = await collection.where({
		_id
	})
	uniCloud.logger.log('======query end====')
	return result;
}

async function query(event) {
	let result;
	delete event.action;
	uniCloud.logger.log('======query========')
	const where = {};
	const {
		page = 1,
			limit = 15
	} = event
	let skip = (page - 1) * limit;
	result = await collection.where(where)
		.skip(skip)
		.limit(limit)
		.get();
	const count = await collection.count();
	result = {
		...result,
		...count
	};
	uniCloud.logger.log('======query end====')
	return result;
}

module.exports = {
	queryRow,
	query
}
