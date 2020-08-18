(function (){
  'use strict';
  angular.module('common')
  .service('CustomerService', CustomerService);

  function CustomerService () {
    let service = this;
    let user;
    service.register = function (userInfo) {
      user = userInfo;
    }
    service.isRegistered = function () {
      if (user) {
        return true;
      }
      return false;
    }
    service.getUserInfo = function () {
      return user;
    }
  }
})();