'use strict';

/**
 * Module dependencies.
 */
var express = require('express');
var multer = require('multer');
var app = express();
var done = false;

/**
 * use : appelé à chaque path "./uploads/"
 */
app.use(multer({ dest: './uploads/',
	rename: function (fieldname, filename) {
	    return filename+Date.now();
	},
	onFileUploadStart: function (file) {
	  console.log(file.originalname + ' is starting ...');
	},
	onFileUploadComplete: function (file) {
	  console.log(file.fieldname + ' uploaded to  ' + file.path);
	  done = true;
	}
}));

/**
 * GET "/"
 */
app.get('/', function(req,res){
    res.sendfile('index.html');
});

/**
 * POST "/api/upload"
 */
app.post('/api/upload', function(req,res){
	if (done===true){
		console.log(req.files);
		res.end('File uploaded.');
	}
});