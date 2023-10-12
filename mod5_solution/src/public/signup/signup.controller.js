(function () {
    "use strict";

    angular.module('public')
    .controller('SignUpController', SignUpController);

    SignUpController.$inject = ['UserService', 'MenuService'];

    function SignUpController(UserService, MenuService) {


      var signUpCtrl = this;

      signUpCtrl.dishShortName = "";
      signUpCtrl.favoriteError = "";

      signUpCtrl.user = UserService.getUser();
      signUpCtrl.registered = signUpCtrl.user != null;


      signUpCtrl.submit = function () {
        signUpCtrl.favoriteError = "";
        try {
            MenuService.getMenuItem(signUpCtrl.dishShortName).then(function (favoriteItem) {
                if (favoriteItem) {
                    signUpCtrl.user.favorite = favoriteItem;
                    UserService.register(signUpCtrl.user);
                    signUpCtrl.registered = true;
                } else {
                    treatItemError("Item not found");
                }
            }).catch(function (error) {
                treatItemError(error);
            });
        } catch (error) {
            treatItemError(error);
        }
      }

      function treatItemError(error) {
        signUpCtrl.favoriteError = error;
      }
    }

    })();
