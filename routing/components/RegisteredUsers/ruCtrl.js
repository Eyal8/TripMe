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
        removePoisFromLocalStorage();
        $http.defaults.headers.common['token'] = "";
        $location.path('/guest');
    }

    removeTokenFromLocalStorage = function () {
        localStorageModel.deleteFromLocalStorage('token');
    }
    removePoisFromLocalStorage = function(){
        localStorageModel.deleteFromLocalStorage('user saved pois');
    }
    self.reorder = function(){
        $http.get(setHeadersToken.serverUrl + "registeredUsers/reorder", user)
        .then(function (response) {
        }, function (response) {
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
    }

    get2MostPopularPOIs = function(){
        setHeadersToken.route();
            $http.get(setHeadersToken.serverUrl + "registeredUsers/get2MostPopularPOIs")
            .then(function (response) {
            let i = 0;
            for (poi in response.data){
                if(registeredUsersService.inLocalStorage(response.data[i].POI_name)){
                    self.two_fav_pois[i] = {name: response.data[i].POI_name, poi_img: response.data[i].PicturePath, poi_saved: "full_heart"}
                }
                else{
                    self.two_fav_pois[i] = {name: response.data[i].POI_name, poi_img: response.data[i].PicturePath, poi_saved: "empty_heart"}
                }
                i++;
            }
            });
    }

    get2MostRecentPOIs = function(){
        setHeadersToken.route();
        $http.get(setHeadersToken.serverUrl + "poi/all")
        .then(function (response) {
                let i = 0;
                var local_storage_pois = registeredUsersService.poisInLocalStorage();
                var firstPoiInLocalStorage;
                var secondPoiInLocalStorage;
                if(local_storage_pois[0] != undefined){
                    self.noPoisForUser = false;
                    firstPoiInLocalStorage = local_storage_pois[0].name;
                    self.NumOfSavedPois = 1;
                }
                if(local_storage_pois[1] != undefined){
                    secondPoiInLocalStorage = local_storage_pois[1].name;
                    self.NumOfSavedPois = 2;
                }
                
                for (poi in response.data){
                    //check if saved in local storage
                    if(firstPoiInLocalStorage == response.data[i].POI_name){
                        self.two_recent_pois[0] = {name: response.data[i].POI_name, poi_img: response.data[i].PicturePath, poi_saved: "full_heart"}
                    }
                    if(secondPoiInLocalStorage == response.data[i].POI_name){
                        self.two_recent_pois[1] = {name: response.data[i].POI_name, poi_img: response.data[i].PicturePath, poi_saved: "full_heart"}
                    }
                    i++;
                }
                if(local_storage_pois[0] == undefined){
                    self.noPoisForUser = true;

                }
            }, function (response) {
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

        // Get the modal
var modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];


//ranks and review

self.modal = {};
self.modal.rank="";
self.modal.review = "";

self.setRank = function()
{
    var body = {};
    body.poi_name = self.modal.poi;
    var ranks=document.getElementsByClassName('stars');
    var rank_selected = false;
    for(var i=0;i<ranks.length;i++){
        if(ranks[i].checked)
        {
            body.rank = 4-i+1; //stars are opposite :)
            rank_selected = true;
            self.noRankSelected=false;
        }
    }
    if(rank_selected){
        $http.put(setHeadersToken.serverUrl + "registeredUsers/rankPOI", body)
        .then(function (response) {
            self.setRank.content = response.data.message;
        });
    }
    else{
        self.noRankSelected=true;
    }
}

self.setReview = function(){
    var body = {};
    body.poi_name = self.modal.poi;
    body.review = self.modal.review;
    $http.put(setHeadersToken.serverUrl + "registeredUsers/reviewPOI", body)
    .then(function (response) {
        self.setReview.content = response.data.message;
    });
}

// When the user clicks on the button, open the modal 
self.rankAndReview = function(poi) {
    self.modal.poi = poi;
    modal.style.display = "block";
    var ranks=document.getElementsByClassName('stars');
    for(var i=0;i<ranks.length;i++){
        ranks[i].checked = false;
    }
    if(document.getElementById("review"))
        document.getElementById("review").value = "";
    self.setRank.content = "";
    self.setReview.content = "";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

}])

.filter('range', function() {
    return function(list, total) {
      total = parseInt(total, 10);
      
      for (var i = 0; i < total; i++) {
        list.push(i);
      }
      return list;
    };
  });