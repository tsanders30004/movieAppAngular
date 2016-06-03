var myApp = angular.module('myAppModule', ['ngRoute']);

myApp.config(function($routeProvider){

     $routeProvider
     .when('/', {
          controller:    'MainController',
          templateUrl:   'main.html'
     })
     .when('/:movieID', {
          controller:    'DetailsController',
          templateUrl:   'details.html'
     })
});

/* http://api.themoviedb.org/3/movie/now_playing?api_key=fec8b5ab27b292a68294261bb21b04a5 */

myApp.controller('MainController', function($scope, $http){
     $http.get('http://api.themoviedb.org/3/movie/now_playing?api_key=fec8b5ab27b292a68294261bb21b04a5')
          .success(function(data){
               $scope.data = data;
               $scope.posterArray = [];

               /* sample movie poster: http://image.tmdb.org/t/p/w500/8uO0gUM8aNqYLs1OsTBQiXu0fEv.jpg?api_key=fec8b5ab27b292a68294261bb21b04a5 */
               for (var i=0; i < $scope.data.results.length; i++) {
                    $scope.posterArray.push('http://image.tmdb.org/t/p/w500' + $scope.data.results[i].poster_path
                         + '?api_key=fec8b5ab27b292a68294261bb21b04a5');
               };
          });
});

myApp.controller('DetailsController', function($scope, $http, $routeParams){
     $http.get('http://api.themoviedb.org/3/movie/' + $routeParams.movieID + '?api_key=fec8b5ab27b292a68294261bb21b04a5')
          .success(function(detailData){
               $scope.detailData = detailData;
               $scope.titleArray = [];
               console.log('inside success function');
               console.log(detailData);
               console.log('outside success function');
               $scope.movieID = $routeParams.movieID;
               $scope.movieDetails = 'http://api.themoviedb.org/3/movie/' + $scope.movieID + '?api_key=fec8b5ab27b292a68294261bb21b04a5';
          });
});
