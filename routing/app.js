let app = angular.module('TripMe', ["ngRoute", 'LocalStorageModule']);

app.config(['$locationProvider', '$routeProvider','$qProvider', function($locationProvider, $routeProvider, $qProvider)  {

    $qProvider.errorOnUnhandledRejections(false);

    $locationProvider.hashPrefix('');

    $routeProvider
        .when('/forgotPassword', {
            templateUrl: 'routing/components/ForgotPassword/forgotPassword.html',
            controller : 'forgotPasswordController as frgtCtrl'
        })
        .when('/login', {
            templateUrl: 'routing/components/Login/login.html',
            controller : 'loginController as lgnCtrl'
        })
        .when('/register', {
            templateUrl: 'routing/components/Register/register.html',
            controller : 'registerController as rgCtrl'
        })
        .when('/about', {
            templateUrl: 'routing/components/About/about.html',
            controller : 'aboutController as abtCtrl'
        })
        .when('/guest', {
            templateUrl: 'routing/components/Guest/guest.html',
            controller : 'guestCtrl as gstCtrl'
        })
        .when('/registered_users', {
            templateUrl: 'routing/components/RegisteredUsers/ru.html',
            controller: 'registeredUsersCtrl as ruCtrl'
        })
        .when('/pois', {
            templateUrl: 'routing/components/POIS/pois.html',
            controller: 'poisController as poiCtrl'
        })
        .when('/favorites', {
            templateUrl: 'routing/components/Favorites/favorites.html ',
            controller: 'favoritesController as fvrtlCtrl'
        })
        .when('/singlePOI', {
            templateUrl: 'routing/components/SinglePOI/singlePOI.html',
            controller: 'singlePOICtrl as sglCtrl'
        })
        .when('/service', {
            templateUrl: 'shared/Services/service.html',
            controller : 'serviceController as srvCtrl'
        })
        .otherwise({ redirectTo: '/registered_users'});

        
}]);










