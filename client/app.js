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

}])
.factory('SearchConnector', ['$http', function($http){
  // Factory exists to pass objects from one controller to the next
  // In order to access we need to call resultObject function passing in your queryResult as a parameter to your callback function

  var resultObject = function (queryResult, cb){
    cb(queryResult)
  };

    /* example implementation:
      SearchConnector.resultObject(testObject, function(passedObject){
           console.log(passedObject);
        });
  */

  return {
    resultObject: resultObject
  }

}]);