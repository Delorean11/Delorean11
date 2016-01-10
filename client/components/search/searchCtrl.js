angular.module('Search', [])
.controller('SearchController',['$scope', '$rootScope', '$state', 'SendRequest', function($scope, $rootScope, $state, SendRequest){
  var congressNumber = '113';
  var house = 'house';
  var api_key = 'dab50f4c71783810c9a7c1f132ef3136:5:73959417';

  var getAPIVotes = function(id) {
    var url = '//api.nytimes.com/svc/politics/v3/us/legislative/congress/members/' + id + '/votes.json?api-key=' + api_key;
    SendRequest.getRequest(url)
    .success(function(data) {
      $rootScope.currentMember = data.results[0];
      $state.go('results');
      console.log($rootScope.currentMember.votes);
    });
  };

  $scope.getMemberAndVotes = function(name) {
    var url = 'api/getOneMember/'+name;
    SendRequest.getRequest(url)
    .success(function(data) {
      console.log(data);
      $rootScope.memberInfo = data;
      getAPIVotes(data.id);
    })
    .error(function(err) {
      console.log(err);
    });
  };

/*  $scope.getMembersByState = function(state) {
    var url = 'api/byState/'+state;
    SendRequest.getRequest(url)
    .success(function(data) {
      console.log(data);
      $rootScope.memberInfo = data;
      //$state.go('results');
      getAPIVotes(data.id);
    })
    .error(function(err) {
      console.log(err);
    });
  };*/

>>>>>>> Implemented Search By State without styling

}]);