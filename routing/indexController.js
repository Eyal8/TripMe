angular.module('TripMe')
    .service('singlePOIService',[ '$http', function ($http) {        
        self.setCurrentPOI = function(poi){
            this.cur_poi = poi;
            console.log("current poi set")
        }
    }])
    .controller('indexController', ['$location', '$http', 'singlePOIService', 'setHeadersToken', function ($location, $http, singlePOIService, setHeadersToken) {


        self = this;
        if(setHeadersToken.get() == undefined){
            $location.path('/guest');
        }
        else{
            $location.path('/registered_users');
        }
        let serverUrl = 'http://localhost:3000/'

        self.getAllPOIs = function(){
            $http.get(serverUrl + "poi/all")
            .then(function (response) {
                let i = 0;
                self.pois = {}
                for (poi in response.data){
                    self.pois[i] = {name: response.data[i].POI_name, poi_img: response.data[i].PicturePath}
                    i++;
                }
            }, function (response) {
                //Second function handles error
                self.signUp.content = "Something went wrong";
            });
        }
        self.getAllPOIs();
    
        self.selectedCity= function (id){
            //console.log (self.selected )
            singlePOIService.setCurrentPOI(self.selected)
        }
    }]);
