angular.module('HandleRequests', [])
  .factory('SendRequest', ['$http', function($http) {
    var getRequest = function(url) {
      return $http({
        method: 'GET',
        url: url
      })
    };

    var postRequest = function(url, data) {
      return $http({
        method: 'POST',
        url: url,
        data: data
      })
    };

    return {
      getRequest: getRequest,
      postRequest: postRequest
    }
  }]);