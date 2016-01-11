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
      $rootScope.memberInfo = data;
      if(localStorage.getItem('loginKey')){
        updateSearchCache({id: localStorage.getItem('loginKey'), search: {name: name, id: data.id}});
      }
      getAPIVotes(data.id);
    });
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
  };

  $scope.getOneMemberFromDb = function(name) {
    $http({
      method: 'GET',
      url: 'api/getOneMember/'+name
    })
    .success(function(data) {
      $rootScope.memberInfo = data;
      if(localStorage.getItem('loginKey')){
        updateSearchCache({id: localStorage.getItem('loginKey'), search: {name: name, id: data.id}});
      }
      $state.go('results');
    })
    .error(function(err) {
      console.log(err);
    });
  };

  var updateSearchCache = function(info){
    console.log('in update search cache before request');
    SendRequest.postRequest('/api/user/cacheSearch', info)
      .success(function(data){
        console.log(data, ' in update search cache after request');
        localStorage.setItem('searchCache', data);
      });
    // $http({
    //   method: 'POST',
    //   url: 'api/user/cacheSearch',
    //   data: info
    // })
    // .success(function(data){
    //   console.log(data, ' in update search cache after request');
    //   localStorage.setItem('searchCache', data);
    // })
  };
}]);