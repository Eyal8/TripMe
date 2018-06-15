angular.module('TripMe')
 .controller('poisController', ['setHeadersToken', '$http', function(setHeadersToken,$http) {
  
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
                self.pois[i] = {name: response.data[i].POI_name, poi_img: response.data[i].PicturePath, rank: response.data[i].POI_rank};
                addPOItoCategory(self.pois[i], response.data[i].Category);
                i++;
            }
        }, function (response) {
            //Second function handles error
        })
    }

    getCategories();

    self.sortByCategory = function(){
        for(var i = 0; i < self.categories.length; i++)
        {
            if(self.categories[i].value == self.chosenCategory)
            {
                self.poisToShow = self.categories[i].pois;
            }
        }
    }



    self.sortByRank = function(){
        self.sortable = [];
        for (var i = 0; i <self.pois.length; i ++) {
            self.sortable.push([self.pois[i].rank, self.pois[self.pois[i].rank]]);
        }
        self.sortable.sort(function(a, b) {
            return a[1] - b[1];
        });
        console.log(self.sortable);
    
    }

}]);
