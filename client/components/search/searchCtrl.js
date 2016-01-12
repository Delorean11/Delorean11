angular.module('Search', [])
.controller('SearchController',['$scope', '$rootScope', '$state', 'SendRequest', function($scope, $rootScope, $state, SendRequest){
  $scope.teamMembers = 
  [
    {
      name: 'Bryan Bierce',
      role: 'Software Engineer', 
      image: '/images/bryan.jpg'
    },

    {
      name: 'Delphine Foo-Matkin',
      role: 'Software Engineer', 
      image: '/images/delphine.png'
    },

    {
      name: 'Santosh Gautam',
      role: 'Scrum Master', 
      image: '/images/santosh.png'
    },

    {
      name: 'Sean Reimer',
      role: 'Product Owner', 
      image: '/images/sean.jpg'
    }
  ]
}]);