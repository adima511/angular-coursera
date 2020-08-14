(function () {
  "use strict";

  angular.module("data")
  .service("MenuDataService", MenuDataService)
  .constant("dataUrl", "https://davids-restaurant.herokuapp.com/");

  MenuDataService.$inject = ['$http', 'dataUrl'];

  function MenuDataService ($http, dataUrl) {
    let service = this;
    
    service.getAllCategories = function () {
      return $http({
        method: "GET",
        url: (dataUrl + "categories.json") 
      });
    }

    service.getItemsForCategory = function(categoryShortName) {
      return $http({
        method: "GET",
        url: (dataUrl + "menu_items.json?category=" + categoryShortName)
      });
    } 
  }
}
)();