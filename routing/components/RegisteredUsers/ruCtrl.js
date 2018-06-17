angular.module('TripMe')
 .controller('registeredUsersCtrl', ['registeredUsersService', 'singlePOIService', '$location','localStorageModel','setHeadersToken','$http', function(registeredUsersService, singlePOIService, $location, localStorageModel,setHeadersToken, $http) {
 
    self = this;

    self.route = function()
    {
        setHeadersToken.route();
    }
    
    self.route();


    self.userName = setHeadersToken.userName;

    var user_pois = [];
    self.two_fav_pois = [];
    self.two_recent_pois = [];
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

    self.savePOI = function(call, poi){
        registeredUsersService.savePOI(poi);
        
        let i = 0;
        if(call=='favs'){
            for(i = 0; i < self.two_fav_pois.length; i++){
                if(self.two_fav_pois[i].name == poi){
                    self.two_fav_pois[i].poi_saved = "full_heart";
                }
            }
        }
        else{
            for(i = 0; i < self.two_recent_pois.length; i++){
                if(self.two_recent_pois[i].name == poi){
                    self.two_recent_pois[i].poi_saved = "full_heart";
                }
            }
        }
        
       /* var point = {};
        point.poi_name = poi;
        //setHeadersToken.route();
        if(localStorageModel.getLocalStorage('user saved pois')==undefined){
            var user_saved_pois = [];
            user_saved_pois.push(poi);
            localStorageModel.addLocalStorage('user saved pois', user_saved_pois);
        }
        else{
            var local_storage_pois = localStorageModel.getLocalStorage('user saved pois');
            local_storage_pois.push(poi);            
            localStorageModel.updateLocalStorage('user saved pois', local_storage_pois)
        }
        $http.post(setHeadersToken.serverUrl + "registeredUsers/savePOI", point)
        .then(function (response) {
            if(response.data.success == true)
            {
                let i = 0;
                if(call=='favs'){
                    for(i = 0; self.two_fav_pois.length; i++){
                        if(self.two_fav_pois[i].name == poi){
                            self.two_fav_pois[i].poi_saved = "full_heart";
                        }
                    }
                }
                else{
                    for(i = 0; self.two_recent_pois.length; i++){
                        if(self.two_recent_pois[i].name == poi){
                            self.two_recent_pois[i].poi_saved = "full_heart";
                        }
                    }
                }
            }
            else{
                self.savePOI.content = response.data.message;
            }
        }, function (response) {
            alert("cannot save point.")
        });*/
    }

    self.removePOI = function(call, poi){
        registeredUsersService.removePOI(poi);
        let i = 0;
        if(call=='favs'){
            for(i = 0; i < self.two_fav_pois.length; i++){
                if(self.two_fav_pois[i].name == poi){
                    self.two_fav_pois[i].poi_saved = "empty_heart";
                }
            }
        }
        else{
            for(i = 0; i < self.two_recent_pois.length; i++){
                if(self.two_recent_pois[i].name == poi){
                    self.two_recent_pois[i].poi_saved = "empty_heart";
                }
            }
        }
    /*    var local_storage_pois = localStorageModel.getLocalStorage('user saved pois');
        var index = local_storage_pois.indexOf(poi);
        if(index > -1){
            local_storage_pois.splice(index,1);
            localStorageModel.updateLocalStorage('user saved pois', local_storage_pois);
        }
        $http.defaults.headers.common[ 'poi_name' ] = poi;

        $http.delete(setHeadersToken.serverUrl + "registeredUsers/removePOI")
        .then(function (response) {
            if(response.data.success == false){
                self.removePOI.content = response.data.message;
            }
            else
            {
                let i = 0;
                if(call=='favs'){
                    for(i = 0; self.two_fav_pois.length; i++){
                        if(self.two_fav_pois[i].name == poi){
                            self.two_fav_pois[i].poi_saved = "empty_heart";
                        }
                    }
                }
                else{
                    for(i = 0; self.two_recent_pois.length; i++){
                        if(self.two_recent_pois[i].name == poi){
                            self.two_recent_pois[i].poi_saved = "empty_heart";
                        }
                    }
                }
            }

        }, function (response) {
            console.log('cannot delete point.');
        });*/
    }

    self.getPOIsForUser = function(){
        $http.get(setHeadersToken.serverUrl + "registeredUsers/getPOIs", user)
        .then(function (response) {
        }, function (response) {
        });
    }

    get2MostPopularPOIs = function(){
        setHeadersToken.route();
        $http.get(setHeadersToken.serverUrl + "registeredUsers/getPOIs")
        .then(function (response2) {
            for(var j = 0; j < response2.data.length;j++){
                user_pois[j] = response2.data[j].POI_name;
            }
            return Promise.resolve()})
        .then(function () {
            $http.get(setHeadersToken.serverUrl + "registeredUsers/get2MostPopularPOIs")
            .then(function (response) {
            let i = 0;
            for (poi in response.data){
               /* for(var k = 0; k < user_pois.length; k++){
                    if(response.data[i].POI_name == user_pois[k]){
                        exists = true;
                    }
                }*/
                if(registeredUsersService.inLocalStorage(response.data[i].POI_name)){
                    self.two_fav_pois[i] = {name: response.data[i].POI_name, poi_img: response.data[i].PicturePath, poi_saved: "full_heart"}
                }
                else{
                    self.two_fav_pois[i] = {name: response.data[i].POI_name, poi_img: response.data[i].PicturePath, poi_saved: "empty_heart"}
                }
                i++;
            }
            });
        });       
    }

    get2MostRecentPOIs = function(){
        setHeadersToken.route();
        $http.get(setHeadersToken.serverUrl + "registeredUsers/get2MostRecentPOIs")
        .then(function (response) {
            //First function handles success
            let i = 0;
            if(response.data.isEmpty==false){
                self.noPoisForUser = false;
                console.log("not empty");
                for (poi in response.data.data){
                    self.two_recent_pois[i] = {name: response.data.data[i].POI_name, poi_img: response.data.data[i].PicturePath, poi_saved: "full_heart"}
                    i++;
                }
            }
            else{
                self.noPoisForUser = true;
                console.log("empty");
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
        get2MostRecentPOIs()

        getTokenFromLocalStorage = function () {
            return localStorageModel.getLocalStorage('token');
        }
        self.singlePOI = function(poi_name){
            singlePOIService.setCurrentPOI(poi_name);
            $location.path('/singlePOI');

        }
}]);
