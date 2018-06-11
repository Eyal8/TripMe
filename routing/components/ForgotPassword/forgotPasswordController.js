angular.module('TripMe')
 .controller('forgotPasswordController', ['$http', function($http) {
  
    self = this;
    let serverUrl = 'http://localhost:3000/'

    self.getPassword = function(){
        $http.post(serverUrl + "general/forgotpass", self.user)
            .then(function (response) {
                self.getPassword.content = response.data.message;
            }, function (response) {
                self.getPassword.content = response.data.message;
            });
    }
}]);
