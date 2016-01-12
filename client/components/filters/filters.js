angular.module('DlFilters', [])
  .filter('capitalize', function() {
    return function(input, scope) {

      if (input!== null);
      input = input.toLowerCase();
      var arr = input.split(' ');
      var newStr = "";
      if(arr.length === 2) {
        arr.forEach(function(val) {
          newStr = newStr + " " + val.substring(0,1).toUpperCase()+val.substring(1);
        });
        return newStr;
      }
      return input.substring(0,1).toUpperCase()+input.substring(1);
    };
  })
  .filter('title', function(){    
        return function(s) {
            s = ( s === undefined || s === null ) ? '' : s;
            return s.toString().toLowerCase().replace( /\b([a-z])/g, function(ch) {
                return ch.toUpperCase();
            });
        };
  })
  .filter('startFrom', function() {
    return function(input, start) {
      if(input) {
          start = +start; //parse to int
          return input.slice(start);
      }
      return [];
    }
});