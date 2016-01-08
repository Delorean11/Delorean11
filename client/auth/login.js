<<<<<<< d9caca03ac0cfb1a679afaef421fe611eaf6359d
angular.module('Login', [])
.controller('LoginController', ['$http', function($http){
  var newHttpRequest = function(){
    $http({
      method: 'GET',
      url: '/api/login' //Server should have /api/login path defined
=======
angular.module('login', [])
.controller('loginControllerTest', ['$http', function($http){
  var newHttpRequest = function(){
    $http({
      method: 'GET',
      url: '/api/auth'
>>>>>>> Sets up infrastructure to connect sessions. Login.js recieves response from server.
    }).success(function(data){
      console.log(data);
    });
  }
  newHttpRequest();
<<<<<<< d9caca03ac0cfb1a679afaef421fe611eaf6359d
}])
=======
}])
>>>>>>> Sets up infrastructure to connect sessions. Login.js recieves response from server.
