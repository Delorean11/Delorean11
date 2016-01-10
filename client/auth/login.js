angular.module('Login', [])
.controller('LoginController', ['$http', '$scope', function($http, $scope){
  $scope.user = {};
  $scope.login = function(user){
    $http({
      method: 'POST',
      url: '/api/login', //Server should have /api/login path defined
      data: user
    }).success(function(data){
      localStorage.setItem('loginKey', data);
      window.location.href = '/';
    });
  };
}]);
