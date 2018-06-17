angular.module('TripMe')
    .service('registeredUsersService',[ '$location', '$http', 'localStorageModel', function ($location, $http, localStorageModel) {
        self = this
        self.savePOI = function(poi){
            var user_poi_object = {};
            user_poi_object = {name: poi, timestamp: Date.now()}; 
            if(localStorageModel.getLocalStorage('user saved pois')==undefined){
                var user_saved_pois = [];
                user_saved_pois.push(user_poi_object);
                localStorageModel.addLocalStorage('user saved pois', user_saved_pois);
            }
            else{
                var local_storage_pois = localStorageModel.getLocalStorage('user saved pois');
                var alreadyInLocalStorage = false;
                for(var i = 0; i < local_storage_pois.length; i++){
                    if(local_storage_pois[i].name == poi){
                        alreadyInLocalStorage = true;
                    }
                }
                if(!alreadyInLocalStorage){
                    local_storage_pois.push(user_poi_object);
                }            
                sortPoisInLocalStorage(local_storage_pois);
                localStorageModel.updateLocalStorage('user saved pois', local_storage_pois)
            }
        }

        self.removePOI = function(poi){
            var index = -1;
            var local_storage_pois = localStorageModel.getLocalStorage('user saved pois');
            for(var i = 0; i < local_storage_pois.length; i++){
                if(local_storage_pois[i].name == poi){
                    index = i;
                }
            }
           // var index = local_storage_pois.indexOf(poi);
            if(index > -1){
                local_storage_pois.splice(index,1);
                sortPoisInLocalStorage(local_storage_pois);
                localStorageModel.updateLocalStorage('user saved pois', local_storage_pois);
            }
        }
        self.inLocalStorage = function(poi){
            var local_storage_pois = localStorageModel.getLocalStorage('user saved pois');
            if(local_storage_pois != undefined){
                for(var k = 0; k < local_storage_pois.length; k++){
                    if(poi == local_storage_pois[k].name){
                        return true;
                    }
                }
            }
            return false;
        }
        self.poisInLocalStorage = function(){
            var local_storage_pois = localStorageModel.getLocalStorage('user saved pois');
            if(local_storage_pois != undefined){
                return local_storage_pois;
            }
            return [];
        }
        sortPoisInLocalStorage = function(local_storage_pois){
            var currentTime = 0;
            for(var i = 0; i < local_storage_pois.length; i++){
                currentTime = local_storage_pois[i].timestamp
            }
            local_storage_pois.sort(compare)
        }
        
        function compare(poi1,poi2) {
            if (poi1.timestamp < poi2.timestamp)
              return 1;
            if (poi1.timestamp > poi2.timestamp)
              return -1;
            return 0;
        }
          
    }]);