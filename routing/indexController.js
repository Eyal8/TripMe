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
                return Promise.resolve();
            }, function (response) {
                self.signUp.content = "Something went wrong";
            })
            .then(authenticate);
        }
        getAllPOIs();
    
        self.selectedCity= function (id){
            //console.log (self.selected )
            singlePOIService.setCurrentPOI(self.selected)
        }
    }]);
