angular.module('TripMe')
 .controller('loginController', ['setHeadersToken', '$http', 'localStorageModel', '$location', function(setHeadersToken, $http, localStorageModel, $location) {
  
    self = this;
    let serverUrl = 'http://localhost:3000/'

    self.login = function () {
        // register user
        $http.post(serverUrl + "general/login", self.user)
            .then(function (response) {
                self.login.content = response.data.message;
                setHeadersToken.set(response.data.token);
                addTokenToLocalStorage(response.data.token);
                $location.path('/registered_users');
            }, function (response) {
                self.login.content = response.data.message;
            });
    }

    self.forgotPassword = function(){
        $location.path('/forgotPassword');
    }

    addTokenToLocalStorage = function (token) {
        localStorageModel.addLocalStorage('token', token);
    }

}]);
