(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .constant('ApiBasePath', "https://coursera-jhu-default-rtdb.firebaseio.com")
  .directive('foundItems', FoundItemsDirective);

  function FoundItemsDirective() {
      var ddo = {
          templateUrl: 'foundItems.html',
          scope: {
              items: '<',
              onRemove: '&'
          }
      };

      return ddo;
  }


  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var ctrl = this;
    ctrl.searchTerm = '';
    ctrl.found = [];

    ctrl.search = function () {
      ctrl.found = [];
      if (ctrl.searchTerm.trim() != "") {
          var promise = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);
          promise.then(function (result) {
              ctrl.found = result;
          })
          .catch(function (error) {
              console.log("Ops, error: " + error);
          });
      }
    }

    ctrl.remove = function (index) {
      ctrl.found.splice(index, 1);
    }

  }


  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
      var response = $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
      });

      return response.then(function (result) {
          var searchItems = [];
          var data = result.data;

          for (var category in data) {
              searchItems.push( data[category].menu_items.filter( item => item.description.toLowerCase().includes(searchTerm.toLowerCase()) )
              );
          }
          return searchItems.flat();
      });
    };

  }

  })();
