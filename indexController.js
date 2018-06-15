angular.module('TripMe')
    .service('singlePOIService',[ '$http', function ($http) {        
        self.setCurrentPOI = function(poi){
            this.cur_poi = poi;
            console.log("current poi set")
        }
    }])
    .controller('indexController', ['localStorageModel', '$location', '$http', 'singlePOIService', 'setHeadersToken', function (localStorageModel, $location, $http, singlePOIService, setHeadersToken) {


        self = this;

        var authenticate = function(){              
            setHeadersToken.authenticate();
        };

        var getAllPOIs = function(){
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
