angular.module('TripMe')
 .controller('favoritesController',['$location','singlePOIService', 'setHeadersToken','$http', function($location, singlePOIService, setHeadersToken, $http) {
  
    self = this;

    self.authenticate = function()
    {
        setHeadersToken.authenticate();
    }

    self.authenticate();
    
    self.userName = setHeadersToken.userName;
    self.fav_pois = [];
    //get all saved points of user
    getPOIsForUser = function(){
        $http.get(setHeadersToken.serverUrl + "registeredUsers/getPOIs")
        .then(function (response) {
            var i = 0;
            for (poi in response.data){
                self.fav_pois[i] = {name: response.data[i].POI_name, num_of_views: response.data[i].NumOfViews, poi_description: response.data[i].POI_description, poi_rank: response.data[i].POI_rank, poi_review1: response.data[i].Review1, poi_review2: response.data[i].Review2, poi_img: response.data[i].PicturePath, poi_saved: "full_heart"}
                i++;
            }
        }, function (response) {
        });
    }
    
    self.savePOI = function(poi){
        var point = {};
        point.poi_name = poi;
        setHeadersToken.route();
        $http.post(setHeadersToken.serverUrl + "registeredUsers/savePOI", point)
        .then(function (response) {
            if(response.data.success == true)
            {
                let i = 0;
                for(i = 0; self.fav_pois.length; i++){
                    if(self.fav_pois[i].name == poi){
                        self.fav_pois[i].poi_saved = "full_heart";
                    }
                }
            }
            else{
                self.savePOI.content = response.data.message;
            }
        }, function (response) {
            alert("cannot save point.")
        });
    }

    self.removePOI = function(poi){
        $http.defaults.headers.common[ 'poi_name' ] = poi;

        $http.delete(setHeadersToken.serverUrl + "registeredUsers/removePOI")
        .then(function (response) {
            if(response.data.success == false){
                self.removePOI.content = response.data.message;
            }
            else
            {
                let i = 0;
                for(i = 0; self.fav_pois.length; i++){
                    if(self.fav_pois[i].name == poi){
                        self.fav_pois[i].poi_saved = "empty_heart";
                    }
                }
            }

        }, function (response) {
            console.log('cannot delete point');
        });
    }
    self.singlePOI = function(poi_name){
        singlePOIService.setCurrentPOI(poi_name);
        $location.path('/singlePOI');

    }
    getPOIsForUser();
}]);
