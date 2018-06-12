angular.module("TripMe")
    .service('localStorageModel', ['localStorageService', function(localStorageService) {

        var self=this;

        self.addLocalStorage = function (key, value) {
            var dataVal = localStorageService.get(key);
            console.log(dataVal)
            if (!dataVal)
            if (localStorageService.set(key, value)) {
                console.log("data added")
            }
            else
                console.log('failed to add the data');
        }



        self.getLocalStorage= function (key)
        {
           return  localStorageService.get(key)
        }

        self.updateLocalStorage = function (key,value)
        {
            var dataVal = localStorageService.get(key);
            if (dataVal)
                localStorageService.remove(key);
            localStorageService.set(key,value);
        }

        self.deleteFromLocalStorage = function(key)
        {
            localStorageService.remove(key);
        }



    }]);