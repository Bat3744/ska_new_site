'use strict';

/**
 * Module dependencies.
 */

var multer = require('multer');
var fs = require('fs');
var done = false;

var upload = multer({dest: './public/modules/news/img'});

module.exports = function(app) {

	/**
	 * POST "/api/upload"
	 */
	app.post('/api/upload', upload.single('file'), function(req,res){
		// fs.renameSync(req.file.path, req.file.path + '.png');
		res.end(req.file.path);
	});

};


