angular.module('Directives', [])
  .directive('dlSearchMember', [function() {
    return {
      restrict: 'A',
      templateUrl: '/directives/searchMember.html',
      controller: function($scope, $rootScope, $state, SendRequest) {
        var congressNumber = '113';
        var house = 'house';
        var api_key = 'dab50f4c71783810c9a7c1f132ef3136:5:73959417';
        $rootScope.getAPIVotes = function(id) {
          var url = '//api.nytimes.com/svc/politics/v3/us/legislative/congress/members/' + id + '/votes.json?api-key=' + api_key;
          SendRequest.getRequest(url)
          .success(function(data) {
            $rootScope.currentMember = data.results[0];
            $state.go('results');
            console.log($rootScope.currentMember.votes);
          });
        };

        $rootScope.getMemberAndVotes = function(name) {
          var url = 'api/getOneMember/'+name;
          SendRequest.getRequest(url)
          .success(function(data) {
            console.log(data);
            console.log("https://theunitedstates.io/images/congress/225x275/" + data.id + ".jpg");
            $rootScope.memberInfo = data;
            $rootScope.memberImageUrl = "https://theunitedstates.io/images/congress/225x275/" + data.id + ".jpg"
            $rootScope.getAPIVotes(data.id);
          })
          .error(function(err) {
            console.log(err);
          });
        };
      }
    };
  }]);