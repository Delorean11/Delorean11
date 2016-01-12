angular.module('Login', [])
.controller('LoginController', ['$http', '$scope', function($http, $scope){
  $scope.user = {};
  $scope.login = function(user){
    $http({
      method: 'POST',
      url: '/api/login',
      data: user
    }).success(function(data){
      // Setting loginKey creates a session
      localStorage.setItem('loginKey', data._id);
      // Get the user's previous searches from database and keep it in localStorage
      localStorage.setItem('searchCache', JSON.stringify(data.searchCache));
      window.location.href = '/';
    });
  };
}]);
