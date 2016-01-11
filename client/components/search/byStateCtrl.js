angular.module('ByState', ['HandleRequests'])
.controller('ByStateController', ['$http', '$scope', '$rootScope', 'SendRequest', '$state', function($http, $scope, $rootScope, SendRequest, $state) {



  $scope.getMembersByState = function(state) {
    var url = 'api/byState/'+ state;
    $rootScope.state = state;
    SendRequest.getRequest(url)
    .success(function(data) {
      $rootScope.byStateResults = data;
      console.log($rootScope.byStateResults);
      $state.go('byStateResults');
    })
    .error(function(err) {
      console.log(err);
    });
  };

  $scope.states = ['AL','AK','AZ','AR','CA','CO','CT',
                   'DC','DE','FL','GA','HI','ID','IL',
                   'IN','IA','KS','KY','LA','ME','MD',
                   'MA','MI','MN','MS','MO','MT','NE',
                   'NV','NH','NJ','NM','NY','NC','ND',
                   'OH','OK','OR','PA','RI','SC','SD',
                   'TN','TX','UT','VT','VA','WA','WV',
                   'WI','WY'];
}]);