(function () {
  'use strict';

  angular.module("NarrowItDownApp", [])
  .controller("NarrowItDownController", NarrowItDownController)
  .service("MenuSearchService", MenuSearchService)
  .directive("foundItems", FoundItemsDirective)
  .constant("dataUrl",  "https://davids-restaurant.herokuapp.com/");

  function FoundItemsDirective () {
    let ddo = {

      templateUrl: "loader/loader.html",
      scope: {
        found: "<items",
        onRemove: "&"
      },
      controller: NarrowItDownController ,
      controllerAs: "narrowCtrl",
      link: NothingFoundLink
    }
    return ddo;
  }
  function NothingFoundLink (scope, element, attrs, controller)  {
    scope.$watch('found', function (newValue, oldValue) {
      // show when new value is [] and not on load
      if(newValue !== undefined && newValue.length == 0) {
        element.find('h3').css('display', 'block');
      } else {
        element.find('h3').css('display', 'none');
      }
    });
  }

  NarrowItDownController.$inject = ["MenuSearchService"];
  function NarrowItDownController (MenuSearchService) {
    let proc = this;
    proc.find = function () {
      if (proc.term === undefined || proc.term.trim() === "") {
        proc.found = [];
      } else {
        let resItems = MenuSearchService.getMatchedMenuItems(proc.term);
        resItems.then(function (res) {
          proc.found = res;
        });
      }
      
    }
    proc.removeItem = function (index) {
      MenuSearchService.removeItem(index.index);
    }
  }
  MenuSearchService.$inject = ['$http', 'dataUrl'];
  function MenuSearchService ($http, dataUrl) {
    let service = this;
    let foundItems = [];
    service.getMatchedMenuItems = function (searchTerm) {
      return $http({
          method: "GET",
          url: dataUrl + "menu_items.json"
        }).then(function (result) {
          // process result and only keep items that match
          foundItems = [];
          let allItems = result.data.menu_items;
          for (let i = 0; i < allItems.length; i++) {
            if (allItems[i].description.toLowerCase().search(searchTerm.toLowerCase()) !== -1 ) {
             foundItems.push(allItems[i]);           
            }
          }
          // return processed items
          return foundItems;
        });
    }
    service.removeItem = function (index) {
      foundItems.splice(index, 1);
    }
  } 


  
})();