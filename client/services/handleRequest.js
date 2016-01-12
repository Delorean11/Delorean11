angular.module('HandleRequests', [])
  .factory('SendRequest', ['$http', '$rootScope', '$state', function($http, $rootScope, $state) {

    // var api_key = 'dab50f4c71783810c9a7c1f132ef3136:5:73959417';

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

    return {
      getRequest: getRequest,
      postRequest: postRequest
    };
  }]);