angular.module('TripMe')
    .service('singlePOIService',[ '$http', function ($http) {   
        this.setCurrentPOI = function(poi){
            this.cur_poi = poi;
        }
    }])
    .controller('indexController', ['localStorageModel', '$location', '$http', 'singlePOIService', 'setHeadersToken', function (localStorageModel, $location, $http, singlePOIService, setHeadersToken) {


        self = this;

        self.route = function(){              
            setHeadersToken.route();
        };

      //  self.route()
       // self.selectedCity= function (id){
            //console.log (self.selected )
         //   singlePOIService.setCurrentPOI(self.selected)
       // }
    }]);
