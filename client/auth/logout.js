angular.module('Logout', [])
.controller('LogoutController', ['$http', function($http){
  var newHttpRequest = function(){
    $http({
      method: 'GET',
      url: '/api/logout'
    }).success(function(data){
      console.log(data);
    });
  }
  newHttpRequest();
}])