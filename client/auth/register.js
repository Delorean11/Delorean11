angular.module('Register', [])
.controller('RegisterController', ['$http', function($http){
  var newHttpRequest = function(){
    $http({
      method: 'GET',
      url: '/api/register'
    }).success(function(data){
      console.log(data);
    });
  }
  newHttpRequest();
}])