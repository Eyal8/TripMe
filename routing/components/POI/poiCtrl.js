angular.module('TripMe')
 .controller('poiCtrl', [function() {
 

    self = this;

    self.cities = {
        1 : {name:"Paris", state: "France", image: "https://media-cdn.tripadvisor.com/media/photo-s/0d/f5/7c/f2/eiffel-tower-priority.jpg"}
        ,2 : {name:"Jerusalem", state: "Israel", image: "https://cdni.rt.com/files/2017.12/article/5a3fe04efc7e93cd698b4567.jpg"}
        ,3 : {name:"London", state: "England", image: "http://www.ukguide.co.il/Photos/England/London/British-Royal-Tour.jpg"}
    }

    self.selectedCity= function (id){

        console.log (self.selected )
    }

    self.addToCart = function (id, city) {

        console.log(id)
        console.log(city)
        console.log(self.amount[id])


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

    self.getAllPOIs = function(){
        // register user
        $http.get(serverUrl + "poi/all", user)
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
    }
}]);
