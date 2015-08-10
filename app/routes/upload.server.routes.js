'use strict';

module.exports = function(app) {

	/**
	 * Module dependencies.
	 */
	// var express = require('express');
	var multer = require('multer');
	// var app = express();
	var done = false;

	/**
	 * use : appelé à chaque requete "/api/upload"
	 */
	app.use(multer({ dest: './uploads/',
		rename: function (fieldname, filename, req, res) {
			console.log('========> file name server : ' + filename);
		    return filename + Date.now();
		},
		onFileUploadStart: function (file) {
		  	console.log('========>' + file.originalname + ' is starting ...');
		},
		onFileUploadComplete: function (file) {
		  	console.log('========>' + file.fieldname + ' uploaded to  ' + file.path);
		  	done = true;
		}
	}).single('file'), function (req, res, next) {
		console.log('========> test server 3 ' + req.file);
	});

	/**
	 * POST "/api/upload"
	 */
	app.post('/api/upload', function(req,res){
		if (done === true){
			console.log('========> test server 4 ' + req.files);
			res.end('File uploaded.');
		}
	});
};


