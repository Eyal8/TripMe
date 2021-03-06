angular.module('TripMe')
 .controller('registerController', ['setHeadersToken','$location','$http', function(setHeadersToken,$location, $http) {
  
    self = this;
    self.categories = [];
    self.countries = [];
    self.user = {};

    self.getCountries = function(){
        $http.get(setHeadersToken.serverUrl + "general/getCountries")
        .then(function (response) {
            var i = 0;
            for (countries in response.data){
                self.countries[i] = response.data[i];
                i++;
            }
        }, function (response) {
            self.signUp.content = "Something went wrong";
        });
    }

    self.getCategories = function(){
        $http.get(setHeadersToken.serverUrl + "general/getCategories")
        .then(function (response) {
            let i = 0;
            for (categories in response.data){
                self.categories[i] = {checked: false, value: response.data[i].CategoryName};
                i++;
            }
        }, function (response) {
            //Second function handles error
            self.signUp.content = "Something went wrong";
        });
    }

    self.all = false;

    validateCategories = function(){
        var index = 0;
        self.user.categories = [];
        if(self.all)
        {
            for (var i = 0; i < self.categories.length; i ++){
                self.user.categories[i] = self.categories[i].value;
            }
            return true;
        }
        else
            {
            for (var i = 0; i < self.categories.length; i ++){
                if(self.categories[i].checked == true)
                {
                    self.user.categories[index] = self.categories[i].value;
                    index++;
                }
            }
            if(index < 2 && self.all == false)
            {
                self.register.content = "Please choose at least two categories";
                return false;
            }
            return true;
        }
    }


    self.register = function () {
        if(validateCategories())
        {
            $http.post(setHeadersToken.serverUrl + "general/register", self.user)
                .then(function (response) {
                    //First function handles success
                    self.register.content = response.data.message;
                }, function (response) {
                    //Second function handles error
                    self.register.content = response.data.message;
                });
        }
    }

    self.getCountries();
    self.getCategories();
}]);
