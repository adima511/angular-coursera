( function() {
  "use strict";
  angular.module("MenuApp")
  .component("items",{
    templateUrl: "views/items.html",
    bindings: {
      itemsData: "<",
      category: "<"
    }
  })
  .controller("ItemsController", ItemsController);

  ItemsController.$inject = ["itemsData", "categoryName"];
  function ItemsController (itemsData, categoryName) {
    this.itemsData = itemsData.data["menu_items"]; 
    this.categoryName = categoryName;
  }

})();