angular.module('TripMe')
 .controller('poiCtrl', ['$http', function($http) {
  
    self = this;

    let serverUrl = 'http://localhost:3000/'

    
   /* self.selectedCity= function (id){

        console.log (self.selected)
    }

 /*   self.addToCart = function (id, city) {

        console.log(id)
        console.log(city)
        console.log(self.amount[id])


    }*/

    
    
    
    /*
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
    }

    self.get3PopRand = function(){
        // register user
        $http.get(serverUrl + "poi/get3PopRand", user)
        .then(function (response) {
            //First function handles success
            self.signUp.content = response.data;
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
