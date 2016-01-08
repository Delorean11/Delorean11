angular.module('Search', [])
.controller('SearchController',['$scope', '$http', function($scope, $http){
  var congressNumber = '113';
  var house = 'house';
  var api_key = 'dab50f4c71783810c9a7c1f132ef3136:5:73959417';
  $scope.getAllMembers = function() {
    $http({
      method: 'GET',
      url: 'http://api.nytimes.com/svc/politics/v3/us/legislative/congress/' + congressNumber + '/' + house + '/members.json?api-key=' + api_key
    })
    .success(function(data) {
      $scope.memberData = data.results[0].members;
      console.log(data.results[0].members);
    })
  };

  $scope.getAllMembers();
}]);