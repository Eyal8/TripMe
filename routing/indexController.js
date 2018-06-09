angular.module('TripMe')
    .controller('indexController', ['setHeadersToken', function (setHeadersToken) {


        self = this;

        self.userName = setHeadersToken.userName

    }]);
