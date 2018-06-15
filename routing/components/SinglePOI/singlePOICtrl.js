angular.module('TripMe')
 .controller('singlePOICtrl', ['$http', 'singlePOIService', function($http, singlePOIService) {
  
    self = this;
    self.current_poi = singlePOIService.cur_poi
    let serverUrl = 'http://localhost:3000/'

    alert(self.current_poi)
    self.getOnePOI = function(){
        $http.get(serverUrl + "poi/:name")
        .then(function (response) {
            //First function handles success
            self.signUp.content = response.data;
        }, function (response) {
            //Second function handles error
            self.signUp.content = "Something went wrong";
        });
    }

}]);
