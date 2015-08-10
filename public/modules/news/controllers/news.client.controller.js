'use strict';

// News controller
angular.module('news', []).controller('NewsController', ['$scope', '$log', '$stateParams', '$location', 'Authentication', 'News',
	function($scope, $log, $stateParams, $location, Authentication, News) {
		$scope.authentication = Authentication;

	/*	var uploader = $scope.uploader = new FileUploader({
            url: 'upload.php'
        });*/

/*
		$scope.onFileSelect = function($file) {

			$upload.upload({
			url: './uploads/',
			file: $file,
			progress: function(e){}
			}).then(function(data, status, headers, config) {
				// file is uploaded successfully
				$log.debug('========> ' + data);
			}); 

		};
*/

		// Create new news
		$scope.create = function() {

			$log.debug('========> ' + this.image);

			// Upload de l'image et récupération du nom
		/*	if (this.image) {
                $upload.upload({url: '/uploadFile', file: this.image}).progress(function (event) {
                    var progressPercentage = parseInt(100.0 * event.loaded / event.total);
                    $log.debug('progress: ' + progressPercentage + '% ' + event.config.file.name);
                }).success(function (data, status, headers, config) {
                    $log.debug('file ' + config.file.name + 'uploaded. Response: ' + JSON.stringify(data));
                    $scope.image.path = data.path;
                });
            }*/

			// Création de l'objet news
			var news = new News ({
				titre: this.titre,
				texte: this.texte,
				image: this.image
			});

			$log.debug('Enregistrement [' + this.titre + ' | ' + this.texte + '|' + this.image + ']');

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