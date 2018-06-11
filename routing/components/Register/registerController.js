angular.module('TripMe')
 .controller('registerController', ['$location','$http', function($location, $http) {
  
    self = this;
    let serverUrl = 'http://localhost:3000/'
    self.categories = []
    self.countries = [];

    self.getCountries = function(){
        $http.get(serverUrl + "general/getCountries")
        .then(function (response) {
            let i = 0;
            for (countries in response.data){
                self.countries[i] = response.data[i];
                i++;
            }
        }, function (response) {
            self.signUp.content = "Something went wrong";
        });
    }

    self.getCategories = function(){
        $http.get(serverUrl + "general/getCategories")
        .then(function (response) {
            let i = 0;
            for (categories in response.data){
                self.categories[i] = response.data[i];
                i++;
            }
        }, function (response) {
            //Second function handles error
            self.signUp.content = "Something went wrong";
        });
    }


    self.register = function () {
        // register user
        $http.post(serverUrl + "general/register", self.user)
            .then(function (response) {
                //First function handles success
                self.register.content = response.data.message;
                if(response.data.success == "true")
                    $location.path('/registered_users')
            }, function (response) {
                //Second function handles error
                self.register.content = response.data.message;
            });
    }
    self.getCountries();
    self.getCategories();
}]);
