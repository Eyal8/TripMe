angular.module('TripMe')
 .controller('registeredUsersCtrl', ['$location','localStorageModel','setHeadersToken','$http', function($location, localStorageModel,setHeadersToken, $http) {
 
    self = this;

    self.route = function()
    {
        setHeadersToken.route();
    }

    self.route();
    
    self.userName = setHeadersToken.userName;

    self.fav_pois = []

    self.saved = []
    self.logout = function()
    {
        removeTokenFromLocalStorage();
        $http.defaults.headers.common['token'] = "";
        $location.path('/guest');
    }

    removeTokenFromLocalStorage = function () {
        localStorageModel.deleteFromLocalStorage('token');
    }

    self.reorder = function(){
        $http.get(setHeadersToken.serverUrl + "registeredUsers/reorder", user)
        .then(function (response) {
           // self.signUp.content = response.data;
        }, function (response) {
          //  self.signUp.content = "Something went wrong";
        });
    }

    self.savePOI = function(poi){
        point = {}
        point.poi_name = poi
        setHeadersToken.authenticate();
        $http.post(setHeadersToken.serverUrl + "registeredUsers/savePOI", point)
        .then(function (response) {
            for(var i = 0; self.fav_pois.length; i++){
                if(self.fav_pois[i].name == poi){
                    if(self.fav_pois[i].poi_saved == "full_heart"){
                        self.saved[i] = true;
                    }
                }
            }
            if(response.data.success == false){
                self.content.poi = true;
            }
            else{
                let i = 0;
                for(i = 0; self.fav_pois.length; i++){
                    if(self.fav_pois[i].name == poi){
                        self.fav_pois[i].poi_saved = "full_heart"
                    }
                }
                self.content.poi = true;
            }
        }, function (response) {
            alert("cannot save point.")
        });
    }

    self.removePOI = function(){
        $http.get(setHeadersToken.serverUrl + "registeredUsers/removePOI", user)
        .then(function (response) {
        }, function (response) {
        });
    }

    self.getPOIsForUser = function(){
        $http.get(setHeadersToken.serverUrl + "registeredUsers/getPOIs", user)
        .then(function (response) {
        }, function (response) {
        });
    }
    var user_pois = []
    get2MostPopularPOIs = function(){
        $http.get(setHeadersToken.serverUrl + "registeredUsers/getPOIs")
        .then(function (response2) {
            for(var j = 0; j < response2.data.length;j++){
                user_pois[j] = response2.data[j].POI_name;
            }
            $http.get(setHeadersToken.serverUrl + "registeredUsers/get2MostPopularPOIs")
        .then(function (response) {
           
            let i = 0;
            for (poi in response.data){
                var exists = false;
                for(var k = 0; k < user_pois.length; k++){
                    if(response.data[i].POI_name == user_pois[k]){
                        exists = true;
                    }
                }
                if(exists == true){
                    self.fav_pois[i] = {name: response.data[i].POI_name, num_of_views: response.data[i].NumOfViews, poi_description: response.data[i].POI_description, poi_rank: response.data[i].POI_rank, poi_review1: response.data[i].Review1, poi_review2: response.data[i].Review2, poi_img: response.data[i].PicturePath, poi_saved: "full_heart"}
                }
                else{
                    self.fav_pois[i] = {name: response.data[i].POI_name, num_of_views: response.data[i].NumOfViews, poi_description: response.data[i].POI_description, poi_rank: response.data[i].POI_rank, poi_review1: response.data[i].Review1, poi_review2: response.data[i].Review2, poi_img: response.data[i].PicturePath, poi_saved: "empty_heart"}
                }
                i++;
            }
            for(var m = 0; self.fav_pois.length; m++){
                    self.saved[m] = false;
                
            }
        }, function (response) {
        });
        }, function (response2) {
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
        });
    }

    self.reviewPOI = function(){
        // register user
        $http.get(setHeadersToken.serverUrl + "registeredUsers/reviewPOI", user)
        .then(function (response) {
            //First function handles success
        }, function (response) {
            //Second function handles error
        });
    }

    self.rankPOI = function(){
        $http.get(setHeadersToken.serverUrl + "registeredUsers/rankPOI", user)
        .then(function (response) {
            //First function handles success
        }, function (response) {
            //Second function handles error
        });
    }
        get2MostPopularPOIs()
      //  get2MostRecentPOIs()

        getTokenFromLocalStorage = function () {
            return localStorageModel.getLocalStorage('token');
        }
}]);
