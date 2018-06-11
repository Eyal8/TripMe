let app = angular.module('TripMe', ["ngRoute", 'LocalStorageModule']);

app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider)  {


    $locationProvider.hashPrefix('');


    $routeProvider.when('/', {
        template: '<h1>This is the default route</h1>'
    })
        .when('/register', {
            templateUrl: 'components/Register/register.html',
            controller : 'registerController as rgCtrl'
        })
        .when('/home', {
            templateUrl: 'components/Home/home.html',
            controller : 'homeController as hmCtrl'
        })
        .when('/about', {
            templateUrl: 'components/About/about.html',
            controller : 'aboutController as abtCtrl'
        })
        .when('/poi', {
            templateUrl: 'components/POI/poi.html',
            controller : 'poiCtrl as poiCtrl'
        })
        .when('/registered_users', {
            templateUrl: 'components/RegisteredUsers/ru.html',
            controller: 'ruCtrl as ruCtrl'
        })
        .when('/singelPOI', {
            templateUrl: 'components/SinglePOI/singlePOI.html',
            controller: 'SinglePOICtrl as sglCtrl'
        })
        .when('/service', {
            templateUrl: 'components/Services/service.html',
            controller : 'serviceController as srvCtrl'
        })
        .otherwise({ redirectTo: '/' });

        
}]);










