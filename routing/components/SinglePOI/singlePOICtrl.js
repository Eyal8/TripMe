angular.module('TripMe')
 .controller('singlePOICtrl', ['$http', function($http) {
  
    self = this;

    let serverUrl = 'http://localhost:3000/'

    

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
