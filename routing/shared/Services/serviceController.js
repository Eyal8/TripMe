angular.module('TripMe')
    // .service('myService', function () { this.set = function() {return "hello"} })
    .service('setHeadersToken',[ '$location', '$http', 'localStorageModel', function ($location, $http, localStorageModel) {

        this.serverUrl = "http://localhost:3000/";

        this.set = function (t) {
            $http.defaults.headers.common[ 'token' ] = t;
          //   $httpProvider.defaults.headers.post[ 'token' ] = token
            console.log("set")
            //getUserName();
        }

        this.authenticate = function(){              
            let jwt = getTokenFromLocalStorage();
            if(jwt)
            {
                var tokens = jwt.split(".");
                var obj = JSON.parse(atob(tokens[1]));
                this.userName = obj.userName;
                if(obj.exp >= (Date.now()/1000))
                {
                    this.set(jwt);
                    return true;
                }
                else 
                {
                    removeTokenFromLocalStorage();
                    return false;   
                }
            }
            else
            {
                return false;
            }           
        }

        this.route = function()
        {
            if(this.authenticate())
            {
                $location.path('/registered_users');
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
            $http.get("http://localhost:3000/registeredUsers/getUserName", user)
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




