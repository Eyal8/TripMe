angular.module('TripMe')
    .service('singlePOIService',[ 'localStorageModel', function (localStorageModel) {   
        self = this;
        self.setCurrentPOI = function(poi){
            //this.cur_poi = poi;
            if(localStorageModel.getLocalStorage('single poi')==undefined){
                localStorageModel.addLocalStorage('single poi', poi);
            }
            else{
                localStorageModel.updateLocalStorage('single poi', poi)
            }
        }
        self.getCurrentPOI = function(poi){
            var cur_poi = localStorageModel.getLocalStorage('single poi');
            return cur_poi;
        }

    }]);