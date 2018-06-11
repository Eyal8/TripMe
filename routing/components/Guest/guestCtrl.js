angular.module('TripMe')
 .controller('guestCtrl', ['$http', function($http) {
  
    self = this;

    let serverUrl = 'http://localhost:3000/'

    self.get3PopRand = function(){
        // get 3 random popular pois
        $http.get(serverUrl + "poi/get3PopRand")
        .then(function (response) {
            //First function handles success
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
