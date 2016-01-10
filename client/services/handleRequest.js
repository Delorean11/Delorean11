angular.module('HandleRequests', [])
  .factory('SendRequest', ['$http', '$rootScope', '$state', function($http, $rootScope, $state) {

    var api_key = 'dab50f4c71783810c9a7c1f132ef3136:5:73959417';

    var getRequest = function(url) {
      return $http({
        method: 'GET',
        url: url
      });
    };

    var postRequest = function(url, data) {
      return $http({
        method: 'POST',
        url: url,
        data: data
      });
    };

    var getAPIVotes = function(id) {
      var url = '//api.nytimes.com/svc/politics/v3/us/legislative/congress/members/' + id + '/votes.json?api-key=' + api_key;
      getRequest(url)
      .success(function(data) {
        $rootScope.currentMember = data.results[0];
        $state.go('results');
        console.log($rootScope.currentMember.votes);
      });
    };

    var getMemberAndVotes = function(name) {
      var url = 'api/getOneMember/'+name;
      getRequest(url)
      .success(function(data) {
        console.log(data);
        $rootScope.memberInfo = data;
        getAPIVotes(data.id);
      })
      .error(function(err) {
        console.log(err);
      });
    };

    return {
      getRequest: getRequest,
      postRequest: postRequest,
      getMemberAndVotes: getMemberAndVotes,
    };
  }]);