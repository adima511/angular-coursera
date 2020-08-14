( function() {
  "use strict";
  angular.module("MenuApp")
  .component("items",{
    templateUrl: "views/items.html",
    bindings: {
      itemsData: "<"
    }
  })
  .controller("ItemsController", ItemsController);

  ItemsController.$inject = ["itemsData"];
  function ItemsController (itemsData) {
    this.itemsData = itemsData.data["menu_items"];
  }

})();