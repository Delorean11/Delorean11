angular.module('Results', [])
.controller('ResultsController',['$scope', '$rootScope', function($scope, $rootScope){
  $scope.limit = 20;
  $scope.increment = function() {
    $scope.limit+= 10;
  };
  var nonMissedVotes = (100 - $rootScope.memberInfo.missedVotesPerc)/100;
  // console.log(nonMissedVotes);
  var circle = new ProgressBar.Circle('#voteProgress', {
      color: '#FCB03C',
      strokeWidth: 6,
      trailWidth: 1,
      duration: 1500,
      text: {
          value: '0 Votes',
          style: {
            color: 'coral',
            'font-size': 'x-large',
            left: '50%',
            top: '45%'
          }
      },
      step: function(state, bar) {
        bar.setText((bar.value() * 100).toFixed(0) + '%');
      }
  });

  circle.animate(1, function() {
      circle.animate(nonMissedVotes);
  });
}]);