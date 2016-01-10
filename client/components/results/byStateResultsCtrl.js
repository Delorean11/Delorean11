angular.module('ByStateResults', ['HandleRequests'])
.controller('ByStateResultsController', ['$scope', 'SendRequest', function($scope, SendRequest) {
  $scope.getVotes = SendRequest.getMemberAndVotes;
}]);