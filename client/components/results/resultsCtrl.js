angular.module('Results', [])
.controller('ResultsController',['$scope', '$rootScope', function($scope, $rootScope){
  $scope.init = function(){
    if(localStorage.getItem('memberData') !== null){
      var data = JSON.parse(localStorage.getItem('memberData')); 
      $rootScope.memberInfo = data.member;
      $rootScope.memberBio = data.memberBio[0].split(';');
      $rootScope.memberImageUrl = "https://theunitedstates.io/images/congress/225x275/" + data.member.id + ".jpg";
      $rootScope.memberFacebookUrl = "http://www.facebook.com/" + data.member.facebook;
      $rootScope.memberTwitterUrl = "http://www.twitter.com/" + data.member.twitter;
      
      data = JSON.parse(localStorage.getItem('currMemberVotes'));
      $rootScope.currentMember = data;
    }
  }
  $scope.init();

  $scope.pages = {
    min: 1,
    max: 10
  };

  //Circular animation
  var nonMissedVotes = (100 - $rootScope.memberInfo.missedVotesPerc)/100;
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

  //Pagination
  $scope.changePage = function(page) {
    console.log(page);
    $scope.prevMax = $scope.pages.max;
    $scope.pages.max = page * 10;
    $scope.pages.min =  (page * 10) - 10 + 1
  }

}]);
