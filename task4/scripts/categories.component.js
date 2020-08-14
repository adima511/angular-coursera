( function() {
  "use strict";
  angular.module("MenuApp")
  .component("categories",{
    templateUrl: "views/categories.html",
    bindings: {
      categoriesData: "<"
    }
  })
  .controller("CategoriesController", CategoriesController);
  CategoriesController.$inject = ["categoriesData"];
  function CategoriesController (categoriesData) {
    this.categoriesData = categoriesData.data;
  }
})();