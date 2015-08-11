'use strict';

// var fs = require("fs");

// News controller
angular.module('news').controller('NewsController', ['$scope', 'Upload', '$timeout', '$log', '$stateParams', '$location', 'Authentication', 'News',
	function($scope, Upload, $timeout, $log, $stateParams, $location, Authentication, News) {
		$scope.authentication = Authentication;

	    $scope.$watch('image', function () {
	        if ($scope.image !== null) {
				$scope.upload($scope.image);
	        }
	    });

	    $scope.upload = function (file) {
	        if (file) {

                Upload.upload({
                    url: '/api/upload',
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                }).progress(function (evt) {
		            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
		            $scope.progress = progressPercentage;
		        }).success(function (data, status, headers, config) {
					$timeout(function() {

						// redéfinition du path de l'image
                        var renameImagePath = data.replace('public', '');
                        $scope.imagePath = renameImagePath;

                        try {
							$scope.news.image.relativePath = renameImagePath;
							$scope.news.image.absolutePath = data;
						}
                        catch (ex) {
                        	$scope.image.relativePath = renameImagePath;
                        	$scope.image.absolutePath = data;
                        }
                        
                    });
                });
	            
	        }
	    };

		// Create new news
		$scope.create = function() {

			// Création de l'objet news
			var news = new News ({
				titre: this.titre,
				texte: this.texte,
				image: {
					relativePath: this.image.relativePath,
					absolutePath: this.image.absolutePath
				}
			});

			// Redirect after save
			news.$save(function(response) {
				$location.path('news/' + response._id);

				// Clear form fields
				$scope.titre = '';
				$scope.image = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing news
		$scope.remove = function(news) {
			if (news) { 

				news.$remove();

				for (var i in $scope.news) {
					if ($scope.news [i] === news) {
						$scope.news.splice(i, 1);
					}
				}
			} else {
				$scope.news.$remove(function() {
					$location.path('news');
				});
			}
		};

		// Update existing news
		$scope.update = function() {
			var news = $scope.news;

			news.$update(function() {
				$location.path('news/' + news._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of news
		$scope.find = function() {
			$scope.news = News.query();
		};

		// Find existing news
		$scope.findOne = function() {
			$scope.news = News.get({ 
				newsId: $stateParams.newsId
			});
		};
	}
]);