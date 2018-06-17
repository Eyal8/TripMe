angular.module('TripMe')
 .controller('loginController', ['registeredUsersService', 'setHeadersToken', '$http', 'localStorageModel', '$location', function(registeredUsersService, setHeadersToken, $http, localStorageModel, $location) {
  
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

            })
            .then(function(){
                //save user's pois from server to local storage.
                $http.get(setHeadersToken.serverUrl + "registeredUsers/getPOIs")
                .then(function (response2) {
                    for(var j = 0; j < response2.data.length;j++){
                        registeredUsersService.savePOI(response2.data[j].POI_name, response2.data[j].Position);
                    }
                }, function (response2) {
                });
            })

    }

    self.forgotPassword = function(){
        $location.path('/forgotPassword');
    }

    addTokenInLocalStorage = function (token) {
        localStorageModel.addLocalStorage('token', token);
    }

}]);
