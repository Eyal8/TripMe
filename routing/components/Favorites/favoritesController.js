angular.module('TripMe')
 .controller('favoritesController',['registeredUsersService', '$location','singlePOIService', 'setHeadersToken','$http', function(registeredUsersService, $location, singlePOIService, setHeadersToken, $http) {
  
    self = this;

    authenticate = function()
    {
        var connected = setHeadersToken.authenticate();
        if(!connected){
            setHeadersToken.route();
        }
    }

    authenticate();
    
    self.userName = setHeadersToken.userName;
    self.fav_pois = [];
    self.poisNotOnLocalStorage = [];
    //get all saved points of user
    getPOIsForUser = function(){
        $http.get(setHeadersToken.serverUrl + "poi/all")
        .then(function (response) {
                let i = 0;
                let indexToAddPoi = 0;
                var local_storage_pois = registeredUsersService.poisInLocalStorage();
                
                for (poi in response.data){
                    for(var j = 0; j < local_storage_pois.length; j++){
                        if(local_storage_pois[j].name == response.data[i].POI_name)
                        {
                            self.fav_pois[indexToAddPoi] = {name: response.data[i].POI_name, poi_img: response.data[i].PicturePath, poi_saved: "full_heart"}
                            //exists = true;
                            indexToAddPoi++;
                        }
                        //j = 0;
                        //i++;
                        
                    }
                    i++;
                    /*
                    //check if saved in local storage
                    if(firstPoiInLocalStorage == response.data[i].POI_name){
                        self.two_recent_pois[0] = {name: response.data[i].POI_name, poi_img: response.data[i].PicturePath, poi_saved: "full_heart"}
                    }
                    if(secondPoiInLocalStorage == response.data[i].POI_name){
                        self.two_recent_pois[1] = {name: response.data[i].POI_name, poi_img: response.data[i].PicturePath, poi_saved: "full_heart"}
                    }
                    i++;*/
                }
                if(local_storage_pois[0] == undefined){
                    self.noPoisForUser = true;

                }
            }, function (response) {
                //Second function handles error
           // })

        });
        /*
        
        $http.get(setHeadersToken.serverUrl + "registeredUsers/getPOIs")
        .then(function (response) {
            var i = 0;
            for (poi in response.data){
                self.fav_pois[i] = {name: response.data[i].POI_name, num_of_views: response.data[i].NumOfViews, poi_description: response.data[i].POI_description, poi_rank: response.data[i].POI_rank, poi_review1: response.data[i].Review1, poi_review2: response.data[i].Review2, poi_img: response.data[i].PicturePath, poi_saved: "full_heart"}
                i++;
            }
        }, function (response) {
        });*/
    }
    
    self.savePOI = function(poi){
        registeredUsersService.savePOI(poi);
        
        let i;
        for(i = 0; i < self.fav_pois.length; i++){
            if(self.fav_pois[i].name == poi){
                self.fav_pois[i].poi_saved = "full_heart";
            }
        }
    }

    self.removePOI = function(poi){
        registeredUsersService.removePOI(poi);
        let i = 0;
        for(i = 0; i < self.fav_pois.length; i++){
            if(self.fav_pois[i].name == poi){
                self.fav_pois[i].poi_saved = "empty_heart";
            }
        }
    }
    
    self.singlePOI = function(poi_name){
        singlePOIService.setCurrentPOI(poi_name);
        $location.path('/singlePOI');

    }
    getPOIsForUser();



    //save changes in user's favorites to DB
    self.saveFavoritesToDB = function(){
        for(i = 0; i < self.fav_pois.length; i++){
            var point = {};
            point.poi_name = self.fav_pois[i].name;
            setHeadersToken.authenticate();
            $http.post(setHeadersToken.serverUrl + "registeredUsers/savePOI", point)
            .then(function (response) {
                if(response.data.success == true)
                {
                    self.fav_pois[i].poi_saved = 'full_heart';
                }
                else{
                    self.savePOI.content = response.data.message;
                }
            }, function (response) {
                alert("cannot save point.")
            });
        }
        $http.get(setHeadersToken.serverUrl + "poi/all")
        .then(function (response2) {
                let i = 0;
                var local_storage_pois = registeredUsersService.poisInLocalStorage();
                
                for (poi in response2.data){
                    var foundPOI = false;
                    for(var j = 0; j < local_storage_pois.length; j++){
                        if(local_storage_pois[j].name == response2.data[i].POI_name)
                        {
                            foundPOI = true;
                        }
                    }
                    if(!foundPOI){
                        self.poisNotOnLocalStorage.push(response2.data[i].POI_name);
                    }
                    i++;
                }

            return Promise.resolve()})
            .then(function () {
                for(var l = 0; l < self.poisNotOnLocalStorage.length; l++){
                    //$http.defaults.headers.common[ 'poi_name' ] = self.poisNotOnLocalStorage[l];
                    $http.delete(setHeadersToken.serverUrl + "registeredUsers/removePOI/"+ self.poisNotOnLocalStorage[l])
                    .then(function (response3) {
                        if(response3.data.success == false){
                            self.removePOI.content = response3.data.message;
                        }
                    }, function (response3) {
                        console.log('cannot delete point');
                    });
                }
            })
    }

}]);
