angular.module('Logout', [])
.controller('LogoutController', ['$http','$state', function($http, $state){
  var newHttpRequest = function(){
    $http({
      method: 'GET',
      url: '/api/logout'
    }).success(function(data){
      localStorage.removeItem('loginKey');
      setTimeout(function() {
        $state.go('main');
      }, 3000);
    });
  };
  newHttpRequest();
}]);