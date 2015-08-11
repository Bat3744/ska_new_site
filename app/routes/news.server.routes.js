'use strict';

module.exports = function(app) {

    var news = require('../../app/controllers/news.server.controller');
    var users = require('../../app/controllers/users.server.controller');
    var multer = require('multer');

    app.route('/news')
        .get(news.list)
        .post(users.requiresLogin, news.create, function(request,response,next){
            console.log(request.body);
            console.log(request.files);
            // Response code and stuff then ...
        });

    app.route('/news/:newsId')
        .get(news.read)
        .put(users.requiresLogin, news.update)
        .delete(users.requiresLogin, news.delete);

    // Finish by binding the article middleware
    app.param('newsId', news.newsByID);
};