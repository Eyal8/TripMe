angular.module('TripMe')
 .controller('loginController', ['$http', 'localStorageModel', '$location', function($http, localStorageModel, $location) {
  
    self = this;
    let serverUrl = 'http://localhost:3000/'

    self.login = function () {
        // register user
        $http.post(serverUrl + "general/login", self.user)
            .then(function (response) {
                self.login.content = response.data.message;
                setHeadersToken.set(response.data.token);
                //self.addTokenToLocalStorage
                $location.path('/registered_users');
            }, function (response) {
                self.login.content = response.data.message;
            });
    }

    self.forgotPassword = function(){
        $location.path('/forgotPassword');
    }
//TODO: מתי משתמשים?
    self.addTokenToLocalStorage = function () {
        localStorageModel.addLocalStorage('token', self.login.content)
    }

}]);
