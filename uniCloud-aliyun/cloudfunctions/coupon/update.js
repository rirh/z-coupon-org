'use strict';
/**
 *  update 
 */
const config = require('./config.json')
const db = uniCloud.database();
const collection = db.collection(config.name);

module.exports = async function(event) {
	let result;
	delete event.action;
	uniCloud.logger.log('======update========')
	let data = {}
	for (const key in config.dbkeys) {
		if (event.hasOwnProperty(key)) {
			const element = event[key];
			data[key] = element || ''
		}
	}
	result = await collection.doc(event._id).update(data)
	uniCloud.logger.log(result);
	uniCloud.logger.log('======update end====')
	return result;
}
