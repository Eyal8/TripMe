angular.module('TripMe')
    .controller('indexController', ['$http', 'setHeadersToken', function ($http, setHeadersToken) {


        self = this;

        self.userName = setHeadersToken.userName;
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
            console.log (self.selected )
        }
    }]);
