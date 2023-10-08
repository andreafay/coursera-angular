
(function () {
  'use strict';

  angular.module('MenuApp')
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function RoutesConfig($stateProvider, $urlRouterProvider) {

    // Redirect to home page if no other URL matches
    $urlRouterProvider.otherwise('/');

    // *** Set up UI States ***
    $stateProvider

    // Home page
    .state('home', {
      url: '/',
      templateUrl: 'src/templates/home.html'
    })

    // Premade categories page
    .state('categories', {
      url: '/categories',
      templateUrl: 'src/templates/categories.html',
      controller: 'CategoriesController as categories',
      resolve: {
        categoriesList: ['MenuDataService', function (MenuDataService) {
          return MenuDataService.getAllCategories();
        }]
      }
    })

    .state('items', {
      url: '/categories/{category}/items',
      templateUrl: 'src/templates/item-detail.html',
      controller:'ItemsController as items',
      resolve: {
        itemsList: ['MenuDataService', '$stateParams',
        function (MenuDataService, $stateParams) {
          var result =  MenuDataService.getItemsForCategory($stateParams.category);
          console.log(result);
          return result;
        }]
      }
    })
  }
})();
