'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	News = mongoose.model('News'),
	fs = require('fs'),
    _ = require('lodash');

/**
 * Create a news
 */
exports.create = function(req, res) {
	var news = new News(req.body);

	news.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.status(201).json(news);
		}
	});
};

/**
 * Show the current news
 */
exports.read = function(req, res) {
	res.json(req.news);
};

/**
 * Update a news
 */
exports.update = function(req, res) {
	var news = req.news;

	news = _.extend(news, req.body);

	news.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(news);
		}
	});
};

/**
 * Delete an news
 */
exports.delete = function(req, res) {
	var news = req.news;

	console.log('------------------> ' + req.url);

	if (news.image.absolutePath !== null) {
		fs.unlinkSync(news.image.absolutePath);
	}

	news.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(news);
		}
	});
};

/**
 * List of news
 */
exports.list = function(req, res) {
	News.find().sort('titre').exec(function(err, news) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(news);
		}
	});
};

/**
 * news middleware
 */
exports.newsByID = function(req, res, next, id) {

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'L\'id de la news est invalide'
		});
	}

	News.findById(id).exec(function(err, news) {
		if (err) return next(err);
		if (!news) {
			return res.status(404).send({
  				message: 'Aucune news n\'a été treouvée'
  			});
		}
		req.news = news;
		next();
	});
};