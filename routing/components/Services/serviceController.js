angular.module('TripMe')
    // .service('myService', function () { this.set = function() {return "hello"} })
    .service('setHeadersToken',[ '$http', function ($http) {

        let token = ""

        this.set = function (t) {
            token = t
            $http.defaults.headers.common[ 'x-access-token' ] = t
            // $httpProvider.defaults.headers.post[ 'x-access-token' ] = token
            console.log("set")

        }

        this.userName='shir'
 

    }])

    
    .controller('serviceController', ['$location', '$http', 'setHeadersToken','localStorageModel', function ($location, $http, setHeadersToken,localStorageModel) {


        self = this;
        self.directToPOI = function () {
            $location.path('/poi')
        }

        let serverUrl = 'http://localhost:3000/'

        self.register = function () {
         /*   self.userName = document.getElementById("userName").value;
            self.password = document.getElementById("password").value;
            self.confirmedPassword = document.getElementById("confirmedPassword").value;
            self.firstName = document.getElementById("firstName").value;
            self.lastName = document.getElementById("lastName").value;
            self.city = document.getElementById("city").value;
            self.country = document.getElementById("country").value;
            self.email = document.getElementById("email").value;
            self.categories = [];
            var c0 = document.getElementById("categories[0]");
            self.categories[0] = c0.options[c0.selectedIndex].value;
            var c1 = document.getElementById("categories[1]");
            self.categories[1] = c1.options[c1.selectedIndex].value;
            self.answersForRecovery = [];
            self.answersForRecovery[0] = document.getElementById("answersForRecovery[0]").value;
            self.answersForRecovery[1] = document.getElementById("answersForRecovery[1]").value;
            let user = {
                userName: self.userName,
                password: self.password,
                confirmedPassword: self.confirmedPassword,
                firstName: self.firstName,
                lastName: self.lastName,
                city: self.city,
                country: self.country,
                email: self.email,
                categories: self.categories,
                answersForRecovery: self.answersForRecovery
            }*/
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
   /*     $scope.submit = function(user)
        {
            localUser = {
                userName: user.userName,
                password: user.password,
                confirmedPassword: user.confirmedPassword,
                firstName: user.firstName,
                lastName: user.lastName,
                city: user.city,
                country: user.country,
                email: user.email,
                categories: user.categories,
                answersForRecovery: user.answersForRecovery
            }
        }*/
        self.login = function () {
            // register user
            $http.post(serverUrl + "general/login", user)
                .then(function (response) {
                    //First function handles success
                    self.login.content = response.data.token;
                    setHeadersToken.set(self.login.content)
                }, function (response) {
                    //Second function handles error
                    self.login.content = "Something went wrong";
                });
        }

  /*      self.reg = function () {
            // register user
            $http.post(serverUrl + "reg/", user)
                .then(function (response) {
                    //First function handles success
                    self.reg.content = response.data;

                }, function (response) {
                    self.reg.content = response.data
                    //Second function handles error
                    // self.reg.content = "Something went wrong";
                });
        }*/

        self.addTokenToLocalStorage = function () {
            localStorageModel.addLocalStorage('token', self.login.content)
        }



    }]);


