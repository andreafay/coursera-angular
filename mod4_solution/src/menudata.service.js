(function () {
    'use strict';

    angular.module('data')
    .service('MenuDataService', MenuDataService)
    .constant('apiBasePath', 'https://coursera-jhu-default-rtdb.firebaseio.com/');

    MenuDataService.$inject = ['$http', 'apiBasePath'];
    function MenuDataService ($http, apiBasePath) {
      var service = this;

      service.getAllCategories = function () {
        var result = $http({
          method: 'GET',
       referrerPolicy: "unsafe_url",
	   mode: "no-cors",
          url: (apiBasePath + 'categories.json'),

        });

        return result;
      }

      service.getItemsForCategory = function (categoryShortName) {
        return $http({
          method: 'GET',
            referrerPolicy: "unsafe_url",
	   mode: "no-cors",
          url: (apiBasePath + `menu_items/${categoryShortName}.json`)
        });
      }
    }

  })();
