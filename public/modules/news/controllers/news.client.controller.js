'use strict';

// var fs = require("fs");

// News controller
angular.module('news').controller('NewsController', ['$scope', 'Upload', '$timeout', '$log', '$stateParams', '$location', 'Authentication', 'News', '$http', '$sce',
	function($scope, Upload, $timeout, $log, $stateParams, $location, Authentication, News, $http, $sce) {

		$scope.authentication = Authentication;

	    $scope.$watch('image', function () {
	        if ($scope.image !== null) {
				$scope.upload($scope.image);
	        }
	    });

	    $scope.upload = function (file) {
	        if (file) {

	        	//===============================================
	        	// TODO delete old file when update
	        	//===============================================
				/*if (typeof $scope.news !== 'undefined') {

					$http.post('/api/file/remove', $scope.news.image.absolutePath)
                        .success(function(data) {
                            $log.debug('remove success');
                        })
                        .error(function(data) {
                            $log.debug('remove error' + data);
                        });

					// $log.debug('$scope.news.image.absolutePath = ' + $scope.news.image.absolutePath);
					// fileService.remove($scope.news.image.absolutePath);
	        	}*/

                Upload.upload({
                    url: '/api/upload',
                    file: file,
                    originalFilePath: typeof $scope.news !== 'undefined' ? $scope.news.image.absolutePath : null
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

                        // Update
                        if (typeof $scope.news !== 'undefined') {
							$scope.news.image.relativePath = renameImagePath;
							$scope.news.image.absolutePath = data;
						}
						// Create
                        else {
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
					relativePath: typeof this.image !== 'undefined' ? this.image.relativePath : null,
					absolutePath: typeof this.image !== 'undefined' ? this.image.absolutePath : null
				},
				video: {
					link: typeof this.video !== 'undefined' ? 'http://www.youtube.com/embed/' + this.video.link.split('/')[3] : null
				},
				publie: this.publie
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

		// Suppression d'une news par l'id
		$scope.removeById = function(newsId) {
			if (newsId) { 

				var newsToDelete = News.get({ 
					newsId: newsId
				}, function(){
					newsToDelete.$remove();
					$scope.news = News.query();

					for (var i in $scope.news) {
						if ($scope.news [i] === newsToDelete) {
							$scope.news.splice(i, 1);
						}
					}
				});
			} else {
				$scope.news.$remove(function() {
					$location.path('news');
				});
			}
		};

		// Update existing news
		$scope.update = function() {
			var news = $scope.news;

			if (typeof news.video !== 'undefined') {
				news.video.link = 'http://www.youtube.com/embed/' + news.video.link.split('/')[3];
			}	

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

		// Find a list of news publiées
		$scope.findPublie = function() {
			$scope.news = [];

			var newsList = News.query(function() {
				for (var i = 0; i < newsList.length; i++) {
					if (newsList[i].publie) {
						if (typeof newsList[i].video !== 'undefined') {
							newsList[i].videoHtml = $sce.trustAsHtml('<iframe id="ytplayer" type="text/html" width="640" height="390" src="' + newsList[i].video.link + '?output=embed&autoplay=0" frameborder="0" allowfullscreen/>');
						}
						$scope.news.push(newsList[i]);
					}
				}
			});
		};

		// Find existing news
		$scope.findOne = function() {
			$scope.news = News.get({ 
				newsId: $stateParams.newsId
			}, function(){
				$scope.videoHtml = $sce.trustAsHtml('<iframe id="ytplayer" type="text/html" width="640" height="390" src="' + $scope.news.video.link + '?output=embed&autoplay=0" frameborder="0" allowfullscreen/>');
			});

		};
	}
]);