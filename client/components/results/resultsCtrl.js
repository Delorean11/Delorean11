angular.module('Results', [])
.controller('ResultsController',['$scope', 'SearchConnector', function($scope, SearchConnector){
  $scope.testFunction = function(){
    SearchConnector.resultObject({hello: 'hello'}, function(passedObject){
      console.log(passedObject);
    });
  }
}]);