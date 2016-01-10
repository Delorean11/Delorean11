angular.module('ByStateResults', ['HandleRequests'])
.controller('ByStateResultsController', ['$scope', 'SendRequest', '$rootScope', function($scope, SendRequest, $rootScope) {
  $scope.getVotes = $rootScope.getMemberAndVotes;
}]);