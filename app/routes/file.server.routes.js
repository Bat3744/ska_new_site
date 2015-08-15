'use strict';

module.exports = function(app) {

	var file = require('../../app/controllers/file.server.controller');
	
	app.route('/api/file/remove').post(file.remove, function(request,response,next){
        console.log('file ' + request.originalFilePath + ' a été supprimée');
    });
};