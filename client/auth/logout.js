angular.module('Logout', [])
.controller('LogoutController', ['$scope', '$http','$state', '$interval', function($scope, $http, $state, $interval){
  $scope.timer = 3;
  var newHttpRequest = function(){
    $http({
      method: 'GET',
      url: '/api/logout'
    }).success(function(data){
      localStorage.removeItem('loginKey');
      localStorage.removeItem('searchCache');
      localStorage.removeItem('memberData');
      localStorage.removeItem('currMemberVotes');
      $interval(function() {
        $scope.timer--;
        if($scope.timer === 0){
          $state.go('main');
        }
      }, 1000, 0);
    });
  };
  newHttpRequest();
}]);