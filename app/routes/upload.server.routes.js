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
	/*app.use(multer({ dest: './uploads/',
		rename: function (fieldname, filename) {
		    return filename + Date.now();
		},
		onFileUploadStart: function (file) {
		  console.log('========>' + file.originalname + ' is starting ...');
		},
		onFileUploadComplete: function (file) {
		  console.log('========>' + file.fieldname + ' uploaded to  ' + file.path);
		  done = true;
		}
	}).single('image'), function (req, res, next) {
		console.log('========>' + req.file);
	});*/

	/**
	 * POST "/api/upload"
	 */
	app.post('/uploadFile', function(req,res){
		if (done === true){
			console.log('========>' + req.files);
			res.end('File uploaded.');
		}
	});
};

/*var express = require('express')
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
app.post('/profile', upload.single('avatar'), function (req, res, next) {
  // req.file is the `avatar` file
})

app.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
  // req.files is array of `photos` files
})

var cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
app.post('/cool-profile', cpUpload, function (req, res, next) {
  // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
  //
  // e.g.
  //  req.files['avatar'][0] -> File
  //  req.files['gallery'] -> Array
})*/

