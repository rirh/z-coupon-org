'use strict';
/**
 *  remove 
 */
const config = require('./config.json')
const db = uniCloud.database();
const collection = db.collection(config.name);
module.exports = async function(event) {
	let result;
	delete event.action;
	uniCloud.logger.log('======delete========')
	const _id = event._id;
	result = await collection.doc(_id).remove();
	uniCloud.logger.log(result);
	uniCloud.logger.log('======delete end====')
	return result;
}
