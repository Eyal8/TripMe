angular.module('TripMe')
 .controller('loginController', ['setHeadersToken', '$http', 'localStorageModel', '$location', function(setHeadersToken, $http, localStorageModel, $location) {
  
    self = this;
    let serverUrl = 'http://localhost:3000/'

    check = function(){
        if(setHeadersToken.authenticate())
            $location.path('/registered_users');
    }

    check();

    self.login = function () {
        // register user
        $http.post(serverUrl + "general/login", self.user)
            .then(function (response) {
                if(response.data.success == true)
                {
                setHeadersToken.set(response.data.token);
                addTokenInLocalStorage(response.data.token);
                $location.path('/registered_users');
                }
                self.login.content = response.data.message;

            });
    }

    self.forgotPassword = function(){
        $location.path('/forgotPassword');
    }

    addTokenInLocalStorage = function (token) {
        localStorageModel.addLocalStorage('token', token);
    }

}]);
