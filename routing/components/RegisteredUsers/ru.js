angular.module('TripMe')
 .controller('registeredUsersCtrl', [function() {
 

    self = this;

    self.cities = {
        1 : {name:"Paris", state: "France", image: "https://media-cdn.tripadvisor.com/media/photo-s/0d/f5/7c/f2/eiffel-tower-priority.jpg"}
        ,2 : {name:"Jerusalem", state: "Israel", image: "https://cdni.rt.com/files/2017.12/article/5a3fe04efc7e93cd698b4567.jpg"}
        ,3 : {name:"London", state: "England", image: "http://www.ukguide.co.il/Photos/England/London/British-Royal-Tour.jpg"}
    }

    self.validateLogin = function(){
        // register user
        $http.get(serverUrl + "registeredUsers", user)
        .then(function (response) {
            //First function handles success
            self.signUp.content = response.data;
        }, function (response) {
            //Second function handles error
            self.signUp.content = "Something went wrong";
        });
    }

    self.reorder = function(){
        // register user
        $http.get(serverUrl + "registeredUsers/reorder", user)
        .then(function (response) {
            //First function handles success
            self.signUp.content = response.data;
        }, function (response) {
            //Second function handles error
            self.signUp.content = "Something went wrong";
        });
    }

    self.savePOI = function(){
        // register user
        $http.get(serverUrl + "registeredUsers/savePOI", user)
        .then(function (response) {
            //First function handles success
            self.signUp.content = response.data;
        }, function (response) {
            //Second function handles error
            self.signUp.content = "Something went wrong";
        });
    }

    self.removePOI = function(){
        // register user
        $http.get(serverUrl + "registeredUsers/removePOI", user)
        .then(function (response) {
            //First function handles success
            self.signUp.content = response.data;
        }, function (response) {
            //Second function handles error
            self.signUp.content = "Something went wrong";
        });
    }

    self.getPOIsForUser = function(){
        // register user
        $http.get(serverUrl + "registeredUsers/getPOIs", user)
        .then(function (response) {
            //First function handles success
            self.signUp.content = response.data;
        }, function (response) {
            //Second function handles error
            self.signUp.content = "Something went wrong";
        });
    }

    self.get2MostPopularPOIs = function(){
        // register user
        $http.get(serverUrl + "registeredUsers/get2MostPopularPOIs", user)
        .then(function (response) {
            //First function handles success
            self.signUp.content = response.data;
        }, function (response) {
            //Second function handles error
            self.signUp.content = "Something went wrong";
        });
    }

    self.get2MostRecentPOIs = function(){
        // register user
        $http.get(serverUrl + "registeredUsers/get2MostRecentPOIs", user)
        .then(function (response) {
            //First function handles success
            self.signUp.content = response.data;
        }, function (response) {
            //Second function handles error
            self.signUp.content = "Something went wrong";
        });
    }

    self.reviewPOI = function(){
        // register user
        $http.get(serverUrl + "registeredUsers/reviewPOI", user)
        .then(function (response) {
            //First function handles success
            self.signUp.content = response.data;
        }, function (response) {
            //Second function handles error
            self.signUp.content = "Something went wrong";
        });
    }

    self.rankPOI = function(){
        // register user
        $http.get(serverUrl + "registeredUsers/rankPOI", user)
        .then(function (response) {
            //First function handles success
            self.signUp.content = response.data;
        }, function (response) {
            //Second function handles error
            self.signUp.content = "Something went wrong";
        });
    }
}]);
