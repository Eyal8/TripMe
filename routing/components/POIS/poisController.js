angular.module('TripMe')
 .controller('poisController', ['singlePOIService', '$location', 'localStorageModel', 'setHeadersToken', '$http', function(singlePOIService, $location, localStorageModel, setHeadersToken,$http) {
  
    self = this;

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
        }, function (response) {
            //Second function handles error
            self.signUp.content = "Something went wrong";
        })
        .then(getAllPOIs());
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
    
    var getAllPOIs = function(){
        $http.get(setHeadersToken.serverUrl + "poi/all")
        .then(function (response) {
            let i = 0;
            self.pois = {};
            for (poi in response.data){
                self.pois[i] = {name: response.data[i].POI_name, num_of_views: response.data[i].NumOfViews, poi_description: response.data[i].POI_description, poi_rank: response.data[i].POI_rank, poi_review1: response.data[i].Review1, poi_review2: response.data[i].Review2, poi_img: response.data[i].PicturePath}
                addPOItoCategory(self.pois[i], response.data[i].Category);
                i++;
            }
        }, function (response) {
            //Second function handles error
        })
    }

    getCategories();

    self.filterByCategory = function(){
        for(var i = 0; i < self.categories.length; i++)
        {
            if(self.categories[i].value == self.chosenCategory)
            {
                self.poisToShow = self.categories[i].pois;
            }
        }
    }

    self.sortByRank = function(){
        self.poisArray = Object.values(self.pois);
        self.poisArray.sort(function(obj1, obj2) {
            return obj2.poi_rank - obj1.poi_rank;
        });
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

}]);
