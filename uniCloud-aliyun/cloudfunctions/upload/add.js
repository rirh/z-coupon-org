'use strict';
/**
 *  add 
 */
const tools = require('tools');
const {
	generateID
} = tools;

module.exports = async function(event) {
	uniCloud.logger.log('======add========')
	let result;
	delete event.action;
	result = Buffer.from(event.file, 'base64').toJSON();
	result = await uniCloud.uploadFile({
		filePath: result,
		cloudPath: event.name,
	});
	uniCloud.logger.log('======add end====')
	return result;
}
