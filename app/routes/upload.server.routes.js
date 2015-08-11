'use strict';

/**
 * Module dependencies.
 */

var multer = require('multer');
var fs = require('fs');
var done = false;

var upload = multer({ 
	dest: './public/modules/news/img',
	rename: function (fieldname, filename) {
	    return filename + 'test';
	},
	onFileUploadStart: function (file) {
	  	console.log(file.originalname + ' is starting ...');
	},
	onFileUploadComplete: function (file) {
	  	console.log(file.fieldname + ' uploaded to  ' + file.path);
	  	done = true;
	}
});

module.exports = function(app) {

	/**
	 * POST "/api/upload"
	 */
	app.post('/api/upload', upload.single('file'), function(req,res){

		// fs.renameSync(req.file.path, req.file.path + '.png');
		console.log('========> test server 5 ' + req.file.path + req.file.filename);
		res.end(req.file.path);
		
		if (done === true){
			console.log('========> test server 4 ' + req.files);
			res.end('File uploaded.');
		}
	});

	// app.route('uploads')
};


