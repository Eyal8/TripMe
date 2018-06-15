angular.module('TripMe')
 .controller('loginController', ['setHeadersToken', '$http', 'localStorageModel', '$location', function(setHeadersToken, $http, localStorageModel, $location) {
  
    self = this;
    let serverUrl = 'http://localhost:3000/'

    self.login = function () {
        // register user
        $http.post(serverUrl + "general/login", self.user)
            .then(function (response) {
                if(response.data.success == true)
                {
                setHeadersToken.set(response.data.token);
                updateTokenInLocalStorage(response.data.token);
                $location.path('/registered_users');
                }
                self.login.content = response.data.message;

            });
    }

    self.forgotPassword = function(){
        $location.path('/forgotPassword');
    }

    updateTokenInLocalStorage = function (token) {
        localStorageModel.updateLocalStorage('token', token);
    }

}]);
