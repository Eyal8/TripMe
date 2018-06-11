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

    }]);


