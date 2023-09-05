(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.menu = "";
  $scope.message = "";
  $scope.color = "";

  $scope.checkIfTooMuch = function () {
    var menu = $scope.menu.split(',');
    menu = menu.filter((str) => str.trim() !== '');
    if(menu == ''){
      $scope.message = "Please enter data first";
      $scope.color = "red";
    }else if(menu.length < 4){
      $scope.message = "Enjoy!";
      $scope.color = "green";
    }else {
      $scope.message = "Too much!";
      $scope.color = "green";
    }
  };
}

})();
