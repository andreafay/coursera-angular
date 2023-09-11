(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var itemList = this;
  itemList.items = ShoppingListCheckOffService.getItems();
  itemList.buy = function(index){
      ShoppingListCheckOffService.boughtItem(index);
  }
}


 AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
 function AlreadyBoughtController(ShoppingListCheckOffService) {
   var boughtList = this;

   boughtList.items = ShoppingListCheckOffService.getBoughtItems();

 }


function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var itemList = [
    { name: "cookies", quantity: "10" },
    { name: "apples", quantity: "1" },
    { name: "bananas", quantity: "3" },
    { name: "pasta", quantity: "5" },
    { name: "pizzas", quantity: "2" }
  ];

  var boughtList = [];

   service.boughtItem = function (itemIndex) {
     boughtList.push(itemList[itemIndex]);
     itemList.splice(itemIndex, 1);
   };

  service.getItems = function () {
    return itemList;
  };

  service.getBoughtItems = function () {
    return boughtList;
  };
}

})();
