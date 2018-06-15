angular.module('TripMe')
    // .service('myService', function () { this.set = function() {return "hello"} })
    .service('setHeadersToken',[ '$location', '$http', 'localStorageModel', function ($location, $http, localStorageModel) {

        this.serverUrl = "http://localhost:3000/";

        this.set = function (t) {
            $http.defaults.headers.common[ 'token' ] = t;
          //   $httpProvider.defaults.headers.post[ 'token' ] = token
            console.log("set")
            getUserName();
        }

        this.authenticate = function(){              
            let token = getTokenFromLocalStorage();
            if(token)
            {
               //if(get() == token)
                 //   return true;
                this.set(token);
             //   return false;
            }
            else
            {
                $location.path('/guest');
            }
        }

        get = function(){
            return $http.defaults.headers.common[ 'token' ];
        }

        function getUserName() {
            var token = get();
            var user = {};
            user.token = token;
<<<<<<< HEAD
            $http.get("http://localhost:3000/registeredUsers/getUserName", user)
=======
            $http.get("http://localhost:3000/"+ "registeredUsers/getUserName", user)
>>>>>>> ad7b3fb1646661964e92820f47c10c1a8e4a9d9c
            .then(function (response) {
                if(response.data.success == false)
                {
                    removeTokenFromLocalStorage();
                    $location.path('/guest');
                }
                else
                {
                    self.userName = {};
                    self.userName.content = response.data.message.userName;
                     $location.path('/registered_users');
                }
            }, function (response) {
                console.log("matai megia lepo?!?!? line 50 service controller");
                $location.path('/guest');
            });
        }

        removeTokenFromLocalStorage = function () {
            localStorageModel.deleteFromLocalStorage('token');
        }

        getTokenFromLocalStorage = function () {
            return localStorageModel.getLocalStorage('token');
        }

    }])




