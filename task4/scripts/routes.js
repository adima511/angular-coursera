(function () {
  "use strict";

  angular.module("MenuApp")
  .config(RoutingMenuApp);
  RoutingMenuApp.$inject = ["$stateProvider", "$urlRouterProvider"];

  function RoutingMenuApp ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state("home", {
      url: "/",
      templateUrl: "views/home.html"
    })

    .state("categories", {
      url: "/categories",
      templateUrl: "views/categories.html",
      controller: "CategoriesController as categories", 
      resolve: {
        categoriesData: ["MenuDataService", function (MenuDataService) {
          return MenuDataService.getAllCategories();
        }]
      }
    })

    .state("items", {
      url: "/categories/{categoryShort}_items/",
      templateUrl: "views/items.html",
      controller: "ItemsController as items", 
      params: {
        categoryShort: null,
        categoryName:null
      },
      resolve: {
        itemsData: ["MenuDataService","$stateParams", function (MenuDataService, $stateParams) {
          return MenuDataService.getItemsForCategory($stateParams.categoryShort);
        }],
        categoryName: ["$stateParams", function ($stateParams) {
          return $stateParams.categoryName;
        }]
      }
    });
  }
})();