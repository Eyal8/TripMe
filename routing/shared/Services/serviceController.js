angular.module('TripMe')
    // .service('myService', function () { this.set = function() {return "hello"} })
    .service('setHeadersToken',[ '$http', 'localStorageModel', function ($http, localStorageModel) {

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
<<<<<<< HEAD:routing/components/Services/serviceController.js
            $http.get("http://localhost:3000/registeredUsers/getUserName", user)
=======
            $http.get("http://localhost:3000/"+ "registeredUsers/getUserName", user)
>>>>>>> aafc67859a7060ca8b44331fe66c82d953b6f0dc:routing/shared/Services/serviceController.js
            .then(function (response) {
                self.userName.content = response.data.userName;
                if(response.success == false)
                {
                    removeTokenFromLocalStorage();
                }
            }, function (response) {
                console.log("get user name failed");
                self.getUserName.content = "Something went wrong";
            });
        }

        removeTokenFromLocalStorage = function () {
            localStorageModel.deleteFromLocalStorage('token');
        }

    }])




