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
	const docid = generateID(event.name, 24);
	let data = {}
	for (const key in config.dbkeys) {
		if (event.hasOwnProperty(key)) {
			const element = event[key];
			data[key] = element || ''
		}
	}
	result = await collection.doc(docid).set(data);
	uniCloud.logger.log('======add end====')
	return result;
}
