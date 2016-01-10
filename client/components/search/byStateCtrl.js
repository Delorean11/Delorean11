angular.module('ByState', [])
.controller('ByStateController', ['$http', '$scope', function($http, $scope) {
  $scope.search = function(state) {
    $http({
      method:'POST',
      url: '/api/byState',
      data: state
    }).success(function(data) {
      console.log('going to state search view');
    });
  };
  $scope.states = ['AL','AK','AZ','AR','CA','CO','CT',
                   'DE','FL','GA','HI','ID','IL','IN',
                   'IA','KS','KY','LA','ME','MD','MA',
                   'MI','MN','MS','MO','MT','NE','NV',
                   'NH','NJ','NM','NY','NC','ND','OH',
                   'OK','OR','PA','RI','SC','SD','TN',
                   'TX','UT','VT','VA','WA','WV','WI',
                   'WY'];
}]);