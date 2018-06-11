let app = angular.module('TripMe', ["ngRoute", 'LocalStorageModule']);

app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider)  {


    $locationProvider.hashPrefix('');


    $routeProvider.when('/', {
        template: '<h1>This is the default route</h1>'
    })
        .when('/login', {
            templateUrl: 'components/Login/login.html',
            controller : 'loginController as lgnCtrl'
        })
        .when('/register', {
            templateUrl: 'components/Register/register.html',
            controller : 'registerController as rgCtrl'
        })
        .when('/about', {
            templateUrl: 'components/About/about.html',
            controller : 'aboutController as abtCtrl'
        })
        .when('/guest', {
            templateUrl: 'components/Guest/guest.html',
            controller : 'guestCtrl as gstCtrl'
        })
        .when('/registered_users', {
            templateUrl: 'components/RegisteredUsers/ru.html',
            controller: 'registeredUsersCtrl as ruCtrl'
        })
        .when('/singlePOI', {
            templateUrl: 'components/SinglePOI/singlePOI.html',
            controller: 'singlePOICtrl as sglCtrl'
        })
        .when('/service', {
            templateUrl: 'components/Services/service.html',
            controller : 'serviceController as srvCtrl'
        })
        .otherwise({ redirectTo: '/' });

        
}]);










