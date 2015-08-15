'use strict';

var fs = require('fs');

/**
 * Remove a File
 */
exports.remove = function(req, res) {

	console.log('req.originalFilePath = ' + req.originalFilePath);

	// suppression de l'ancienne image
	if (req.originalFilePath !== null && typeof req.originalFilePath  !== 'undefined') {
		fs.unlinkSync(req.originalFilePath);
	}
};
