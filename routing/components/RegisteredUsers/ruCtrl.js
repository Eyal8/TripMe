angular.module('TripMe')
 .controller('registeredUsersCtrl', ['setHeadersToken', function(setHeadersToken) {
 
    self = this;
    self.userName = function(){
        setHeadersToken.getUserName();
    }

    self.reorder = function(){
        // register user
        $http.get(setHeadersToken.serverUrl + "registeredUsers/reorder", user)
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
        $http.get(setHeadersToken.serverUrl + "registeredUsers/savePOI", user)
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
        $http.get(setHeadersToken.serverUrl + "registeredUsers/removePOI", user)
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
        $http.get(setHeadersToken.serverUrl + "registeredUsers/getPOIs", user)
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
        $http.get(setHeadersToken.serverUrl + "registeredUsers/get2MostPopularPOIs", user)
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
        $http.get(setHeadersToken.serverUrl + "registeredUsers/get2MostRecentPOIs", user)
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
        $http.get(setHeadersToken.serverUrl + "registeredUsers/reviewPOI", user)
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
        $http.get(setHeadersToken.serverUrl + "registeredUsers/rankPOI", user)
        .then(function (response) {
            //First function handles success
            self.signUp.content = response.data;
        }, function (response) {
            //Second function handles error
            self.signUp.content = "Something went wrong";
        });
    }
}]);
