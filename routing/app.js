let app = angular.module('TripMe', ["ngRoute", 'LocalStorageModule']);

app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider)  {


    $locationProvider.hashPrefix('');


    $routeProvider.when('/', {
       // template: '<h1>This is the default route</h1>'
    })
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
        .when('/singlePOI', {
            templateUrl: 'routing/components/SinglePOI/singlePOI.html',
            controller: 'singlePOICtrl as sglCtrl'
        })
        .when('/service', {
            templateUrl: 'shared/Services/Services/service.html',
            controller : 'serviceController as srvCtrl'
        })
        .otherwise({ redirectTo: '/' });

        
}]);










