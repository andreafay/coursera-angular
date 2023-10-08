(function () {
    angular.module('MenuApp')
    .component('items', {
      templateUrl: 'src/templates/item-detail.html',
      controller: 'ItemsController as items',
      bindings: {
        itemsList: '<'
      }
    })
  })();
