angular.module('TripMe')
 .controller('registerController', ['$http', function($http) {
  
    self = this;
    let serverUrl = 'http://localhost:3000/'

    self.register = function () {
        // register user
        $http.post(serverUrl + "general/register", self.user)
            .then(function (response) {
                //First function handles success
                self.register.content = response.data;
            }, function (response) {
                //Second function handles error
                self.register.content = "Something went wrong";
            });
    }

}]);
