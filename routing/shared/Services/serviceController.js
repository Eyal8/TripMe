angular.module('TripMe')
    // .service('myService', function () { this.set = function() {return "hello"} })
    .service('setHeadersToken',[ '$http', function ($http) {

        this.serverUrl = "http://localhost:3000/";

        this.set = function (t) {
            $http.defaults.headers.common[ 'token' ] = t;
            // $httpProvider.defaults.headers.post[ 'x-access-token' ] = token
            console.log("set")
            getUserName();
        }
        function get(){
            let tok = $http.defaults.headers.common[ 'token' ];
            return tok;
        }

        function getUserName() {
            var token = get();
            var user = {};
            user.token = token;
            $http.get(serverUrl + "registeredUsers/getUserName", user)
            .then(function (response) {
                self.userName.content = response.data.userName;
            }, function (response) {
                console.log("get user name failed");
                self.getUserName.content = "Something went wrong";
            });
        }

    }])




