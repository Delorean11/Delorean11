angular.module('Login', [])
.controller('LoginController', ['$http', '$scope', function($http, $scope){
  $scope.user = {};
  $scope.login = function(){
    $http({
      method: 'POST',
      url: '/api/login' //Server should have /api/login path defined
    }).success(function(data){
      console.log(data);
    });
  }
// $scope.login();
}])
