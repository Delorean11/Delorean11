angular.module('Results', [])
.controller('ResultsController',['$scope', 'SearchConnector', function($scope, SearchConnector){
  var testObject = {hello: 'hello'};
  $scope.testFunction = function(){
    SearchConnector.resultObject(testObject, function(passedObject){
      console.log(passedObject);
    });
  };
}]);