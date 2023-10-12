(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    return $http.get(ApiPath + '/menu_items/' + category + '.json').then(function (response) {
      return response.data;
    });
  };

  service.getMenuItem = function (short_name) {
    short_name = short_name.toUpperCase();
    if (short_name.match(/^[A-Z]+[0-9]+$/)) {
      var i = short_name.search(/[0-9]+/);
      var category = short_name.substring(0,i);
      var itemIndex = short_name.substring(i) - 1;
      return $http.get(ApiPath + '/menu_items/' + category + '/menu_items/' + itemIndex + '.json').then(function (response) {
        response.data.categoryShortName = category;
        return response.data;
      });
    } else {
      throw "Invalid item code";
    }
  };

}



})();
