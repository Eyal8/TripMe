angular.module('TripMe')
 .controller('singlePOICtrl', ['setHeadersToken','$http', 'singlePOIService', function(setHeadersToken, $http, singlePOIService) {
  
    self = this;
    self.current_poi = {};
    self.current_poi.name = singlePOIService.getCurrentPOI();

    getOnePOI = function(){
        $http.get(setHeadersToken.serverUrl + "poi/" + self.current_poi.name)
        .then(function (response) {
            if(response.data.success == true){
                var date_review_1 = response.data.DateReview1;
                var date_review_2 = response.data.DateReview2;
                if(date_review_1 != undefined){
                    date_review_1 = date_review_1.substring(0,10);
                }
                if(date_review_2 != undefined){
                    date_review_2 = date_review_2.substring(0,10);
                }
                self.current_poi = {name: response.data.POI_name, num_of_views: response.data.NumOfViews, poi_description: response.data.POI_description, poi_rank: response.data.POI_rank, poi_review1: response.data.Review1, poi_review2: response.data.Review2, poi_date_review1:date_review_1, poi_date_review2:date_review_2, poi_img: response.data.PicturePath, poi_latitude: response.data.Latitude, poi_longitude: response.data.Longitude};
                var mymap = L.map('map').setView([self.current_poi.poi_latitude,self.current_poi.poi_longitude], 14);
                L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox.streets',
                accessToken: 'pk.eyJ1IjoiZXlhbGFyIiwiYSI6ImNqanJldjUycDZieW4zcW8zcTF0OTJsN24ifQ.3XNiGZTb6WB-TFVQUj73sg'
            }).addTo(mymap);
            var ratIcon = L.icon({
                iconUrl: 'rat.png',
                iconSize: [60,50]
              });
            var marker = L.marker([self.current_poi.poi_latitude,self.current_poi.poi_longitude]).addTo(mymap);
        }}, function (response) {
            getOnePOI.content = response.data.message;
        });
    }

    getOnePOI();


}]);
