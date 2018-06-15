angular.module('TripMe')
 .controller('registeredUsersCtrl', ['localStorageModel','setHeadersToken','$http', function(localStorageModel,setHeadersToken, $http) {
 
    self = this;

    self.userName = function(){
        setHeadersToken.authenticate();
    }
    self.userName();
    
    self.reorder = function(){
        $http.get(setHeadersToken.serverUrl + "registeredUsers/reorder", user)
        .then(function (response) {
            self.signUp.content = response.data;
        }, function (response) {
            self.signUp.content = "Something went wrong";
        });
    }

    self.savePOI = function(){
        $http.get(setHeadersToken.serverUrl + "registeredUsers/savePOI", user)
        .then(function (response) {
            self.signUp.content = response.data;
        }, function (response) {
            self.signUp.content = "Something went wrong";
        });
    }

    self.removePOI = function(){
        $http.get(setHeadersToken.serverUrl + "registeredUsers/removePOI", user)
        .then(function (response) {
            self.signUp.content = response.data;
        }, function (response) {
            self.signUp.content = "Something went wrong";
        });
    }

    self.getPOIsForUser = function(){
        $http.get(setHeadersToken.serverUrl + "registeredUsers/getPOIs", user)
        .then(function (response) {
            self.signUp.content = response.data;
        }, function (response) {
            self.signUp.content = "Something went wrong";
        });
    }

    get2MostPopularPOIs = function(){
        var x = $http.defaults.headers.common['token'];
        $http.get(setHeadersToken.serverUrl + "registeredUsers/get2MostPopularPOIs")
        .then(function (response) {
            let i = 0;
            self.fav_pois = {}
            for (poi in response.data){
                self.fav_pois[i] = {name: response.data[i].POI_name, num_of_views: response.data[i].NumOfViews, poi_description: response.data[i].POI_description, poi_rank: response.data[i].POI_rank, poi_review1: response.data[i].Review1, poi_review2: response.data[i].Review2, poi_img: response.data[i].PicturePath}
                i++;
            }
        }, function (response) {
            if(response.success == false)
            {
                removeTokenFromLocalStorage();
            }
        });
    }

    get2MostRecentPOIs = function(){
        var x = $http.defaults.headers.common['token'];
        $http.get(setHeadersToken.serverUrl + "registeredUsers/get2MostRecentPOIs")
        .then(function (response) {
            //First function handles success
            let i = 0;
            self.recent_pois = {}
            for (poi in response.data){
                self.recent_pois[i] = {name: response.data[i].POI_name, num_of_views: response.data[i].NumOfViews, poi_description: response.data[i].POI_description, poi_rank: response.data[i].POI_rank, poi_review1: response.data[i].Review1, poi_review2: response.data[i].Review2, poi_img: response.data[i].PicturePath}
                i++;
            }
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
        $http.get(setHeadersToken.serverUrl + "registeredUsers/rankPOI", user)
        .then(function (response) {
            //First function handles success
            self.signUp.content = response.data;
        }, function (response) {
            //Second function handles error
            self.signUp.content = "Something went wrong";
        });
    }
        get2MostPopularPOIs()
        get2MostRecentPOIs()

        getTokenFromLocalStorage = function () {
            return localStorageModel.getLocalStorage('token');
        }
}]);
