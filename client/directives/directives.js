angular.module('Directives', [])
  .directive('dlSearchMember', [function() {
    /*This directive was created for modularity
    and future reuse of the search bar in other views.*/
    return {
      restrict: 'A',
      templateUrl: '/directives/searchMember.html',
      controller: function($scope, $rootScope, $state, SendRequest) {
        var congressNumber = '113';
        var house = 'house';
        var api_key = 'dab50f4c71783810c9a7c1f132ef3136:5:73959417';
        /* On submit of the 'search by name' form, getMemberandVotes function (below)
        is called, in turning calling this getAPIVotes function is called and it sends
        a call to the API for the congress member's voting history. */
        $rootScope.getAPIVotes = function(id) {
          $rootScope.loading = true;
          var url = '//api.nytimes.com/svc/politics/v3/us/legislative/congress/members/' + id + '/votes.json?api-key=' + api_key;
          /* SendRequest is a factory located in the handleRequest.js file */
          SendRequest.getRequest(url)
          .success(function(data) {
            localStorage.setItem('currMemberVotes', JSON.stringify(data.results[0]));
            $rootScope.loading = false;
            $rootScope.currentMember = data.results[0];
            $state.go('results');
            // console.log($rootScope.currentMember.votes);
          })
          .error(function(err) {
            console.log("ERR: data not found");
          });
        };

        /* On submit of the 'search by name' form, the getMemberAndVotes
        function:
        - checks if the user is logged and stores the search for future use if they are;
        - calls getAPIVotes to get the congress member's voting history from the API;
        - refreshes the data on the page via a call to $state.go */
        $rootScope.getMemberAndVotes = function(name) {
          var url = 'api/getOneMember/'+name;
          SendRequest.getRequest(url)
          .success(function(data) {
            // console.log(data.member, ' in the getmembers and votes');
            if(localStorage.getItem('loginKey')){
              updateSearchCache({_id: localStorage.getItem('loginKey'), search: {name: name, id: data.member.id}});
            }
            localStorage.setItem('memberData', JSON.stringify(data));
            $rootScope.getAPIVotes(data.member.id);
            $state.go($state.current, {}, {reload: true});
          })
          .error(function(err) {
            console.log(err);
          });
        };
        /* updateSearchCache caches a logged-in user's searches */
        var updateSearchCache = function(info){
          // console.log('in update search cache before request');
          SendRequest.postRequest('/api/user/cacheSearch', info)
          .success(function(data){
            // console.log(data, ' in update search cache after request');
            localStorage.setItem('searchCache', JSON.stringify(data));
          });
        };
      }
    };
  }]);