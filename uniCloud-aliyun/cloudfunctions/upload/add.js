'use strict';
/**
 *  add 
 */
const tools = require('tools');

module.exports = async function(event) {
	uniCloud.logger.log('======add========')
	let result;
	delete event.action;
	result = Buffer.from(event.file, 'base64').toJSON();
	uniCloud.uploadFile({
		cloudPath: event.name,
		filePath: result,
		success(e) {
			console.log(e);
		},
		fail(e) {
			console.log(e);
		}
	})
	result = await uniCloud.uploadFile({
		filePath: result,
		cloudPath: event.name,
		fileType: 'image'
	});
	uniCloud.logger.log('======add end====')
	return result;
}
