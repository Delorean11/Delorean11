angular.module('Search', [])
.controller('SearchController',['$scope', '$http', '$rootScope', '$state', function($scope, $http, $rootScope, $state){
  var congressNumber = '113';
  var house = 'house';
  var api_key = 'dab50f4c71783810c9a7c1f132ef3136:5:73959417';
  $scope.getAllMembers = function() {
    $http({
      method: 'GET',
      url: '//api.nytimes.com/svc/politics/v3/us/legislative/congress/' + congressNumber + '/' + house + '/members.json?api-key=' + api_key
    })
    .success(function(data) {
      if(!localStorage.getItem('members')) {
        var members = {};
        var bios = {};
        data.results[0].members.forEach(function(member){
          var firstNameKey = member.first_name.toLowerCase();
          var lastNameKey = member.last_name.toLowerCase();
          var fullNameKey = firstNameKey + ' ' + lastNameKey;
          var userId = member.id;
          var memberInfo = {
            name: member.first_name,
            id: member.id,
            state: member.state,
            district: member.district,
            website: member.url,
            party: member.party
          };
          members[fullNameKey] = memberInfo;
        });
        localStorage.setItem('members', JSON.stringify(members));
        // We need to JSON.parse and JSON.stringify when working
        // with local storage because we can only store strings.
        // console.log(JSON.parse(localStorage.getItem('memberIds')));
      }
    });
  };

  $scope.searchById = function(name) {
    name = name.toLowerCase();
    var memberName = name;
    var memberId = JSON.parse(localStorage.getItem('members'))[name]['id'];
    // $rootScope.currentMember.name = member;
    $rootScope.memberInfo = JSON.parse(localStorage.getItem('members'))[name];
    console.log($rootScope.memberInfo);
    if (memberId){
      $http({
        method: 'GET',
        url: '//api.nytimes.com/svc/politics/v3/us/legislative/congress/members/' + memberId + '/votes.json?api-key=' + api_key
      })
      .success(function(data) {

        $rootScope.currentMember = data.results[0];
        $state.go('results');
        console.log($rootScope.currentMember.votes);

        // $rootScope.memberInfo = data;
        // console.log(data);

      });
    }
  };

  $scope.getAllMembersFromDb = function() {
    $http({
      method: 'GET',
      url: 'api/allMembers'
    })
    .success(function(data) {
      console.log('data exists. Retrieving.. ' + data);
    })
    .error(function(err) {
      console.log('members do not exist');
    })
  }

  $scope.getOneMemberFromDb = function(name) {
    //db expects name to be uppercase
    name = angular.uppercase(name.charAt(0)) + name.slice(1)
    $http({
      method: 'GET',
      url: 'api/getOneMember/'+name
    })
    .success(function(data) {
      console.log(data);
      $rootScope.memberInfo = data
      $state.go('results');
    })
    .error(function(err) {
      console.log(err);
    })
  }

  //$scope.getAllMembers();
}]);