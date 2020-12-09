'use strict';
/**
 *  remove 
 */
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
