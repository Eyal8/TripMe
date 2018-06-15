angular.module('TripMe')
 .controller('guestCtrl', ['singlePOIService', '$location', '$http', function(singlePOIService, $location, $http) {
  
    self = this;

    let serverUrl = 'http://localhost:3000/'
   /* if(setHeadersToken.get() == undefined){
         $location.path('/guest');
    }*/

    self.login = function(){
        $location.path('/login');
    }
    self.register = function(){
        $location.path('/register');
    }
    self.get3PopRand = function(){
        // get 3 random popular pois
        $http.get(serverUrl + "poi/get3PopRand")
        .then(function (response) {
            //First function handles success
            let i = 0;
                self.rand_pois = {}
                for (poi in response.data){
                    self.rand_pois[i] = {name: response.data[i].POI_name, num_of_views: response.data[i].NumOfViews, poi_description: response.data[i].POI_description, poi_rank: response.data[i].POI_rank, poi_review1: response.data[i].Review1, poi_review2: response.data[i].Review2, poi_img: response.data[i].PicturePath}
                    i++;
                }
        }, function (response) {
            //Second function handles error
            self.signUp.content = "Something went wrong";
        });
    }
    self.get3PopRand();
    self.singlePOI = function(poi_name){
        singlePOIService.cur_poi = poi_name;
    }
    /*
    self.getOnePOI = function(){
        // register user
        $http.get(serverUrl + "poi/:name", user)
        .then(function (response) {
            //First function handles success
            self.signUp.content = response.data;
        }, function (response) {
            //Second function handles error
            self.signUp.content = "Something went wrong";
        });
    }

    self.updatePOIs = function(){
        // register user
        $http.get(serverUrl + "poi/update", user)
        .then(function (response) {
            //First function handles success
            self.signUp.content = response.data;
        }, function (response) {
            //Second function handles error
            self.signUp.content = "Something went wrong";
        });
    }*/
}]);
