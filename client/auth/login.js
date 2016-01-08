angular.module('Login', [])
.controller('LoginController', ['$http', function($http){
  var newHttpRequest = function(){
    $http({
      method: 'GET',
      url: '/api/login' //Server should have /api/login path defined
    }).success(function(data){
      console.log(data);
    });
  }
  newHttpRequest();
}])