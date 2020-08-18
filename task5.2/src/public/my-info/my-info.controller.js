(function() {
  'use strict';

  angular.module('public')
  .controller('MyInfoController', MyInfoController);

  MyInfoController.$inject = ['CustomerService', 'MenuService']
  function MyInfoController (CustomerService, MenuService) {
    var myInfo = this;


    myInfo.isRegistered = CustomerService.isRegistered();

    myInfo.user = CustomerService.getUserInfo();

    if(myInfo.isRegistered) {
      MenuService.getMenuItems(myInfo.user['favourite'])
      .then(function (response) {
        myInfo.menuItems = response;
      })
    }
  }
}());