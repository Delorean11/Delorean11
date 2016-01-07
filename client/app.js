angular.module('CongressionalStalker', ['ui.router'])
.config(['$stateProvider', '$urlRouteProvider', function($stateProvider, $urlRouteProvider) {
  $urlRouteProvider.otherwise('/');

  $stateProvider
    .state('main', {
      url: '/',
      templateUrl: 'client/components/search/searchView.html',
      controller: 'SearchController'
    })
    .state('results', {
      url:'/results',
      templateUrl: 'client/components/results/resultsView.html',
      controller: 'ResultsController'
    });

}]);