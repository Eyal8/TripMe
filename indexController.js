angular.module('TripMe')
    .service('singlePOIService',[ '$http', function ($http) {        
        self.setCurrentPOI = function(poi){
            this.cur_poi = poi;
            console.log("current poi set")
        }
    }])
    .controller('indexController', ['localStorageModel', '$location', '$http', 'singlePOIService', 'setHeadersToken', function (localStorageModel, $location, $http, singlePOIService, setHeadersToken) {


        self = this;
<<<<<<< HEAD

        var authenticate = function(){              
            setHeadersToken.authenticate();
        };

        var getAllPOIs = function(){
=======
        console.log("START INDEX CONTROLLER")
        function authenticate(){
            let token = localStorageModel.getLocalStorage('token');
            if(token)
            {
                setHeadersToken.set(token);
                $location.path('/registered_users');
            }
            else
            {
                $location.path('/guest');
            }
        }


        function getAllPOIs (){
>>>>>>> ad7b3fb1646661964e92820f47c10c1a8e4a9d9c
            $http.get(setHeadersToken.serverUrl + "poi/all")
            .then(function (response) {
                let i = 0;
                self.pois = {}
                for (poi in response.data){
                    self.pois[i] = {name: response.data[i].POI_name, poi_img: response.data[i].PicturePath}
                    i++;
                }
                console.log("BEFORE AUTHENTICATE CALL")

                authenticate();
            }, function (response) {
                //Second function handles error
                self.signUp.content = "Something went wrong";
            });
        }

        getAllPOIs();

    
       // self.selectedCity= function (id){
            //console.log (self.selected )
         //   singlePOIService.setCurrentPOI(self.selected)
       // }
    }]);
