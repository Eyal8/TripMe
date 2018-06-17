angular.module('TripMe')
 .controller('singlePOICtrl', ['setHeadersToken','$http', 'singlePOIService', function(setHeadersToken, $http, singlePOIService) {
  
    self = this;
    self.current_poi = {};
    self.current_poi.name = singlePOIService.getCurrentPOI();

    getOnePOI = function(){
        $http.get(setHeadersToken.serverUrl + "poi/" + self.current_poi.name)
        .then(function (response) {
            if(response.data.success == true)
                self.current_poi = {name: response.data.POI_name, num_of_views: response.data.NumOfViews, poi_description: response.data.POI_description, poi_rank: response.data.POI_rank, poi_review1: response.data.Review1, poi_review2: response.data.Review2, poi_img: response.data.PicturePath};
        }, function (response) {
            getOnePOI.content = response.data.message;
        });
    }

    getOnePOI();

}]);
