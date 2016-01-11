angular.module('CongressionalStalker', [
  'Search',
  'Results',
  'ui.router',
  'ui.materialize',
  'Register',
  'Login',
  'Logout',
  'HandleRequests',
  'Directives',
  'ByState',
  'ByStateResults',
  'DlFilters'
])
.controller('AuthCheck', function($scope, $rootScope){
  $rootScope.loginCheck = function(){
    return localStorage.getItem('loginKey') !== null;
  };
  $rootScope.searchCacheCheck = function(){
    return JSON.parse(localStorage.getItem('searchCache')).length > 0;
  }
  $rootScope.searchCache = (function(){
      return JSON.parse(localStorage.getItem('searchCache'));
    })();
  $rootScope.nameCase = function(name){
    var split = name.split(' ');
    for(var i = 0; i < 2; i++){
      var firstLetter = String.fromCharCode(split[i].charCodeAt(0) - 32);
      split[i] = firstLetter + split[i].slice(1);
    }
    return split.join(' ');
  }
})
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
    })
    .state('auth', {
      url: '/api/auth',
      templateUrl: 'auth/login.html',
      controller: 'LoginController'
    })
    .state('login', {
      url: '/api/login',
      templateUrl: 'auth/login.html',
      controller: 'LoginController'
    })
    .state('register', {
      url: '/api/register',
      templateUrl: 'auth/register.html',
      controller: 'RegisterController'
    })
    .state('logout', {
      url: '/api/logout',
      templateUrl: 'auth/logout.html',
      controller: 'LogoutController'
    })
    .state('byState', {
      url:'/api/byState',
      templateUrl: 'components/search/byState.html',
      controller: 'ByStateController'
    })
    .state('byStateResults', {
      url:'/api/byState/results',
      templateUrl: 'components/results/byStateResults.html',
      controller: 'ByStateResultsController'
    });
}])
.factory('SearchConnector', ['$http', function($http){
  // Factory exists to pass objects from one controller to the next
  // In order to access we need to call resultObject function passing in your queryResult as a parameter to your callback function

  var resultObject = function (queryResult, cb){
    cb(queryResult);
  };

    /* example implementation:
      SearchConnector.resultObject(testObject, function(passedObject){
           console.log(passedObject);
        });
  */

  return {
    resultObject: resultObject
  };

}]);