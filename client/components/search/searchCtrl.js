angular.module('Search', [])
.controller('SearchController',['$scope', '$http', '$rootScope', '$state', function($scope, $http, $rootScope, $state){
  var congressNumber = '113';
  var house = 'house';
  var api_key = 'dab50f4c71783810c9a7c1f132ef3136:5:73959417';
  $scope.getAllMembers = function() {
    $http({
      method: 'GET',
      url: 'http://api.nytimes.com/svc/politics/v3/us/legislative/congress/' + congressNumber + '/' + house + '/members.json?api-key=' + api_key
    })
    .success(function(data) {
      if(!localStorage.getItem('memberIds')) {
        var memberIds = {};
        data.results[0].members.forEach(function(member){
          var firstNameKey = member.first_name.toLowerCase();
          var lastNameKey = member.last_name.toLowerCase();
          var fullNameKey = firstNameKey + ' ' + lastNameKey;
          var userId = member.id
          memberIds[fullNameKey] = userId;
        });
        localStorage.setItem('memberIds', JSON.stringify(memberIds));
        // We need to JSON.parse and JSON.stringify when working
        // with local storage because we can only store strings.
        // console.log(JSON.parse(localStorage.getItem('memberIds')));
      }
    });
  };

  $scope.searchById = function(name) {
    name = name.toLowerCase();
    var memberId = JSON.parse(localStorage.getItem('memberIds'))[name];
    console.log(memberId);
    if (memberId){
      $http({
        method: 'GET',
        url: 'http://api.nytimes.com/svc/politics/v3/us/legislative/congress/members/' + memberId + '/votes.json?api-key=' + api_key
      })
      .success(function(data) {
<<<<<<< HEAD
        $rootScope.currentNumber = data.results[0];
        $state.go('results');
        console.log($rootScope.currentNumber.votes);
=======
        $rootScope.singleMember = data;
        console.log($rootScope.singleMember);
>>>>>>> Added some changes to results view.
      });
    }
<<<<<<< HEAD
  }
=======
  };



>>>>>>> Added some changes to results view.
  $scope.getAllMembers();
}]);