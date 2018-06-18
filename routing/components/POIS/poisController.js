angular.module('TripMe')
 .controller('poisController', ['registeredUsersService', 'singlePOIService', '$location', 'localStorageModel', 'setHeadersToken', '$http', function(registeredUsersService, singlePOIService, $location, localStorageModel, setHeadersToken,$http) {
  
    self = this;
    self.filter = false;
    self.rankSort = false;
    self.showAll = true;

    self.categories = [];
    self.pois = [];
    var registered_user_pois = [];
    getCategories = function(){
        $http.get(setHeadersToken.serverUrl + "general/getCategories")
        .then(function (response) {
            let i = 0;
            for (categories in response.data){
                self.categories[i] = {value: response.data[i].CategoryName, pois:[]};
                i++;
            }
            return Promise.resolve();
        }, function (response) {
            //Second function handles error
            self.signUp.content = "Something went wrong";
        })
        .then(function(){
            if(!self.guest){
                getAllPOIsForRegisteredUsers();
            }
            else{
                getAllPOIsForguests();
            }
        });
           
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
    
    var getAllPOIsForguests = function(){
        $http.get(setHeadersToken.serverUrl + "poi/all")
        .then(function (response) {
            let i = 0;
            for (poi in response.data){
                self.pois[i] = {name: response.data[i].POI_name, poi_img: response.data[i].PicturePath};
                addPOItoCategory(self.pois[i], response.data[i].Category);
                i++;
            }
        }, function (response) {
            //Second function handles error
        })
    }

    var getAllPOIsForRegisteredUsers = function(){
        setHeadersToken.authenticate();
      /*  $http.get(setHeadersToken.serverUrl + "registeredUsers/getPOIs")
        .then(function (response2) {
            for(var j = 0; j < response2.data.length;j++){
                registered_user_pois[j] = response2.data[j].POI_name;
            }
            return Promise.resolve()})
        .then(function () {*/
        $http.get(setHeadersToken.serverUrl + "poi/all")
        .then(function (response) {
            let i = 0;
            for (poi in response.data){
                var exists = false;
                //check if saved in local storage
                if(registeredUsersService.inLocalStorage(response.data[i].POI_name)){
                    self.pois[i] = {name: response.data[i].POI_name, poi_img: response.data[i].PicturePath, poi_saved: "full_heart", poi_rank: response.data[i].POI_rank}
                    addPOItoCategory(self.pois[i], response.data[i].Category);
                }
                else{
                    self.pois[i] = {name: response.data[i].POI_name, poi_img: response.data[i].PicturePath, poi_saved: "empty_heart", poi_rank: response.data[i].POI_rank}
                    addPOItoCategory(self.pois[i], response.data[i].Category);
                }
                i++;
            }
        });
      //  });       
    }

    self.savePOI = function(poi){
        registeredUsersService.savePOI(poi);
        for(var i = 0; i < self.categories.length; i++){
            for(var j = 0; j < self.categories[i].pois.length; j++){
                if(self.categories[i].pois[j].name==poi){
                    self.categories[i].pois[j].poi_saved = "full_heart";
                }
            }
        }
    }
    self.removePOI = function(poi){
        registeredUsersService.removePOI(poi);
        for(var i = 0; i < self.categories.length; i++){
            for(var j = 0; j < self.categories[i].pois.length; j++){
                if(self.categories[i].pois[j].name==poi){
                    self.categories[i].pois[j].poi_saved = "empty_heart";
                }
            }
        }
    }



    getCategories();

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

    self.allPOIS = function(){
        if(self.showAll == true)
            self.showAll = false;
        else{
           self.showAll = true; 
        }
    }

    self.sortByRank = function(){
        if(self.rankSort == true){
            self.rankSort = false;
        }
        else{
            self.rankSort = true;
        }
        self.poisArray = Object.values(self.pois);
        self.poisArray.sort(function(obj1, obj2) {
            return obj2.poi_rank - obj1.poi_rank;
        });
    }

    self.cleanSortByRank = function(){
        self.rankSort = false;
    }

    self.searchByName = function(){
        $http.get(setHeadersToken.serverUrl + "poi/" + self.poiName)
        .then(function (response) {
            if(response.data.success == true)
            {
            self.searchedPoi = response.data;
            self.showme = true;
            }
            else
            {
                self.searchByName.content = response.data.message;
                self.showme = false;
            }
        })
    }

    self.goToFavorites = function()
    {
        $location.path('/favorites');
    }

      self.guest = !setHeadersToken.authenticate();

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
    body.rank = self.modal.rank;
    $http.put(setHeadersToken.serverUrl + "registeredUsers/rankPOI", body)
    .then(function (response) {
        self.setRank.content = response.data.message;
    });
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
    if(document.getElementById("selectRank"))
     document.getElementById("selectRank").selectedIndex = "0";
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
