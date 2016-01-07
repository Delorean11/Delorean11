angular.module('CongressionalStalker', ['Search', 'Results', 'ui.router'])
.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
  function($stateProvider, $urlRouterProvider, $httpProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('main', {
      url: '/',
      templateUrl: 'components/search/searchView.html',
      controller: 'SearchController'
    })
    .state('results', {
      url:'/results',
      templateUrl: 'components/results/resultsView.html',
      controller: 'ResultsController'
    });

}]);

console.log('in app.js');