angular.module('TripMe')
 .controller('favoritesController',['setHeadersToken','$http', function(setHeadersToken, $http) {
  
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
    getPOIsForUser();
}]);
