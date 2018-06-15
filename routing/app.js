let app = angular.module('TripMe', ["ngRoute", 'LocalStorageModule']);

app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider)  {


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
        .when('/logout', {
            templateUrl: 'routing/components/Logout/logout.html',
            controller : 'logoutController as lgtCtrl'
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
            templateUrl: 'shared/Services/service.html',
            controller : 'serviceController as srvCtrl'
        })
        .otherwise({ redirectTo: '/' });

        
}]);










