angular.module('CongressionalStalker', [
  'Search',
  'Results',
  'ui.router',
  'Register',
  'Login',
  'Logout'
])
.controller('AuthCheck', function($scope){
  $scope.loginCheck = function(){
    return localStorage.getItem('loginKey') !== null;
  };
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