(function() {
  'use strict';

angular.module("public")
.controller("SignUpController", SignUpController);

SignUpController.$inject = ['MenuService', 'CustomerService'];

function SignUpController(MenuService, CustomerService) {
  let regVal = this;
  regVal.signup = function () {
    MenuService.getMenuItems(regVal.favourite)
    .then(function (response) {
      if(response){
        CustomerService.register({
          firstName: regVal.firstName,
          lastName: regVal.lastName,
          email: regVal.email,
          phone: regVal.phone,
          favourite: regVal.favourite
        });
        regVal.exists = true;
        regVal.isMenuCategoryNotFound = false;
      }
      else {
        ctrl.isMenuCategoryNotFound = true;
        ctrl.exists = false;
      }
    });
  }
}

})();