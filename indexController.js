angular.module('TripMe')
    .service('singlePOIService',[ '$http', function ($http) {
        this.cur_poi ="";        
        self.setCurrentPOI = function(poi_name){
            this.cur_poi = poi_name;
            console.log("current poi set")
        }
    }])
    .controller('indexController', ['localStorageModel', '$location', '$http', 'singlePOIService', 'setHeadersToken', function (localStorageModel, $location, $http, singlePOIService, setHeadersToken) {


        self = this;

        self.authenticate = function(){              
            setHeadersToken.authenticate();
        };

        self.singlePOI = function(poi_name){
            alert(poi_name);
        }
        var getAllPOIs = function(){
            $http.get(setHeadersToken.serverUrl + "poi/all")
            .then(function (response) {
                let i = 0;
                self.pois = {}
                for (poi in response.data){
                    self.pois[i] = {name: response.data[i].POI_name, poi_img: response.data[i].PicturePath}
                    i++;
                }
                return Promise.resolve();
            }, function (response) {
                //Second function handles error
            })
           .then(self.authenticate());
        }

        getAllPOIs();

    
       // self.selectedCity= function (id){
            //console.log (self.selected )
         //   singlePOIService.setCurrentPOI(self.selected)
       // }
    }]);
