angular.module('Register', [])
.controller('RegisterController', ['$http', '$scope', function($http, $scope){
  $scope.user = {};
  $scope.register = function(user){
    $http({
      method: 'POST',
      url: '/api/register',
      data: user
    }).success(function(data){
      console.log(data);
    });
  };
  //newHttpRequest();
}]);