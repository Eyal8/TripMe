angular.module('TripMe')
 .controller('loginController', ['setHeadersToken', '$http', 'localStorageModel', '$location', function(setHeadersToken, $http, localStorageModel, $location) {
  
    self = this;
    let serverUrl = 'http://localhost:3000/'

    self.login = function () {
        // register user
        $http.post(serverUrl + "general/login", self.user)
            .then(function (response) {
                //First function handles success
                self.login.content = response.data.message;
                setHeadersToken.set(response.data.token);
            }, function (response) {
                //Second function handles error
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
