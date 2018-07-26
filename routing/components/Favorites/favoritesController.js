angular.module('TripMe')
 .controller('favoritesController',['registeredUsersService', '$location','singlePOIService', 'setHeadersToken','$http', function(registeredUsersService, $location, singlePOIService, setHeadersToken, $http) {
  
    self = this;

    self.filter = false;
    self.rankSort = false;

    authenticate = function()
    {
        var connected = setHeadersToken.authenticate();
        if(!connected){
            setHeadersToken.route();
        }
    }

    authenticate();
    self.set = new Set();

    self.userName = setHeadersToken.userName;
    self.fav_pois = [];
    self.poisNotOnLocalStorage = [];
    //get all saved points of user
    getPOIsForUser = function(){
        self.fav_pois = [];
        self.sortMode = false;
        $http.get(setHeadersToken.serverUrl + "poi/all")
        .then(function (response) {
                let i = 0;
                let indexToAddPoi = 0;
                var local_storage_pois = registeredUsersService.poisInLocalStorage();
                
                local_storage_pois.sort(function(obj1, obj2) {
                    return obj1.position - obj2.position;
                });

                    for(var j = 0; j < local_storage_pois.length; j++){
                        for (poi in response.data){
                            if(local_storage_pois[j].name == response.data[i].POI_name)
                            {
                                self.fav_pois[indexToAddPoi] = {checked: false, name: response.data[i].POI_name, poi_img: response.data[i].PicturePath, poi_saved: "full_heart", poi_rank: response.data[i].POI_rank}
                                addPOItoCategory(self.fav_pois[indexToAddPoi], response.data[i].Category);
                                indexToAddPoi++;
                            }              
                            i++;
                    }
                    i=0;
                }
                if(local_storage_pois[0] == undefined){
                    self.noPoisForUser = true;

                }
            }, function (response) {

        });

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



    //save changes in user's favorites to DB
    self.saveFavoritesToDB = function(){
        var local_storage_pois = registeredUsersService.poisInLocalStorage();
        for(var i = 0; i < local_storage_pois.length; i++){
            var point = {};
            point.poi_name = local_storage_pois[i].name;
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
            getPOIsForUser();
    }


    self.disableNewOrder = true;
    self.insert = function(poi)
    {
        if(self.set.has(poi))
        {
            self.set.delete(poi);
        }
        else
        {
            self.set.add(poi);
        }

        self.order = Array.from(self.set);

        if(self.fav_pois.length == self.set.size)
            self.disableNewOrder = false;
    }

    self.goToSortMode = function(){
        self.sortMode = true;
    }

    self.saveNewOrder = function(){
        var body = {};
        body.pois = self.order;
        $http.put(setHeadersToken.serverUrl + "registeredUsers/reorder", body)
        .then(function (response) {
                self.saveNewOrder.content = response.data.message;
        });
        var local_storage_pois = registeredUsersService.poisInLocalStorage();
        for(var j = 0; j < self.order.length; j++){
            for(var i = 0; i < local_storage_pois.length; i++){
                if(local_storage_pois[i].name == self.order[j]){
                    local_storage_pois[i].position = j;
                }
            }
        }
        registeredUsersService.savePoisToLocalStorage(local_storage_pois);
        getPOIsForUser();
    }

    self.categories = [];

    getCategories = function(){
        $http.get(setHeadersToken.serverUrl + "general/getCategories")
        .then(function (response) {
            let i = 0;
            for (categories in response.data){
                self.categories[i] = {value: response.data[i].CategoryName, pois:[]};
                i++;
            }
            return Promise.resolve();
        })
        .then(function(){
            getPOIsForUser();
        });
           
    }


    self.filterByCategory = function(){
        if(self.filter == true)
        {
            self.filter = false;
        }
        else{
            self.filter = true;
            for(var i = 0; i < self.categories.length; i++)
            {
                if(self.categories[i].value == self.chosenCategory)
                {
                    self.poisToShow = self.categories[i].pois;
                }
            }
        }
    }

    var addPOItoCategory = function(POI, Category){
        for(var i = 0; i < self.categories.length; i++)
        {
            if(self.categories[i].value == Category)
            {
                self.categories[i].pois.push(POI);
            }
        }
    }

    self.sortByRank = function(){
        if(self.rankSort == true){
            self.rankSort = false;
        }
        else{
            self.rankSort = true;
        }
        self.poisArray = Object.values(self.fav_pois);
        self.poisArray.sort(function(obj1, obj2) {
            return obj2.poi_rank - obj1.poi_rank;
        });
    }

    getCategories();

  
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
