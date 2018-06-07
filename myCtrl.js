angular.module('TripMe', [])
 .controller('myCtrl','setHeadersToken', [function (setHeadersToken) {

    self = this;

    self.userName = setHeadersToken.userName
    
 }]);
