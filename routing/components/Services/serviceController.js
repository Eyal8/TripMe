

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

        let user = {
            userName: "Shiruuu",
            password: "abcd",
        
        }


        self.signUp = function () {
            // register user
            console.log("1")
            $http.post(serverUrl + "general/register/", user)
                .then(function (response) {
                    console.log("2")
                    //First function handles success
                    self.signUp.content = response.data;
                }, function (response) {
                    //Second function handles error
                    self.signUp.content = "Something went wrong";
                    console.log("3")
                });
        }

        self.login = function () {
            // register user
            $http.post(serverUrl + "Users/login", user)
                .then(function (response) {
                    //First function handles success
                    self.login.content = response.data.token;
                    setHeadersToken.set(self.login.content)


                }, function (response) {
                    //Second function handles error
                    self.login.content = "Something went wrong";
                });
        }

        self.reg = function () {
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
        }

        self.addTokenToLocalStorage = function () {
            localStorageModel.addLocalStorage('token', self.login.content)
        }



    }]);


