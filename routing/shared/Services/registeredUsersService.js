angular.module('TripMe')
    .service('registeredUsersService',[ '$location', '$http', 'localStorageModel', function ($location, $http, localStorageModel) {
        self = this
        self.savePOI = function(poi){
            if(localStorageModel.getLocalStorage('user saved pois')==undefined){
                var user_saved_pois = [];
                user_saved_pois.push(poi);
                localStorageModel.addLocalStorage('user saved pois', user_saved_pois);
            }
            else{
                var local_storage_pois = localStorageModel.getLocalStorage('user saved pois');
                var alreadyInLocalStorage = false;
                for(var i = 0; i < local_storage_pois.length; i++){
                    if(local_storage_pois[i] == poi){
                        alreadyInLocalStorage = true;
                    }
                }
                if(!alreadyInLocalStorage){
                    local_storage_pois.push(poi);
                }            
                localStorageModel.updateLocalStorage('user saved pois', local_storage_pois)
            }
        }

        self.removePOI = function(poi){
            var local_storage_pois = localStorageModel.getLocalStorage('user saved pois');
            var index = local_storage_pois.indexOf(poi);
            if(index > -1){
                local_storage_pois.splice(index,1);
                localStorageModel.updateLocalStorage('user saved pois', local_storage_pois);
            }
        }
        self.getCurrentSavedPois = function(){
            return localStorageModel.getLocalStorage('user saved pois');
        }
        self.inLocalStorage = function(poi){
            var currentSavedPois = [];
            currentSavedPois = localStorageModel.getLocalStorage('user saved pois');
            for(var k = 0; k < currentSavedPois.length; k++){
                if(poi == currentSavedPois[k]){
                    return true;
                }
            }
            return false;
        }
    }]);