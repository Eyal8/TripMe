angular.module('TripMe')
<<<<<<< HEAD
    .service('singlePOIService',[ '$http', function ($http) {
        this.cur_poi ="";        
        self.setCurrentPOI = function(poi_name){
            this.cur_poi = poi_name;
=======
    .service('singlePOIService',[ '$http', function ($http) {   
             
        self.setCurrentPOI = function(poi){
            this.cur_poi = poi;
>>>>>>> b38ea249ef51728b185cdac76b90515b9f199eb6
            console.log("current poi set")
        }
    }])
    .controller('indexController', ['localStorageModel', '$location', '$http', 'singlePOIService', 'setHeadersToken', function (localStorageModel, $location, $http, singlePOIService, setHeadersToken) {


        self = this;

        self.authenticate = function(){              
            setHeadersToken.authenticate();
        };

<<<<<<< HEAD
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
=======
>>>>>>> b38ea249ef51728b185cdac76b90515b9f199eb6

        self.authenticate();

       // self.selectedCity= function (id){
            //console.log (self.selected )
         //   singlePOIService.setCurrentPOI(self.selected)
       // }
    }]);
