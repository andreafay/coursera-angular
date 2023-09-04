(function () {
  'use strict';

  angular.module('myFirstApp', [])
  .controller('MyFirstController', function($scope) {
    $scope.name = "Andre";
    $scope.sayHello = function() {
      return "Hello Coursera!";
    }
  });

})();
