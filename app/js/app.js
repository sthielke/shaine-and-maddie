'use strict';

/* App Module */

var registryApp = angular.module('registryApp', [
  'ngRoute',
  'registryControllers'
]);

registryApp.config(['$routeProvider', 'angularPayments',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'templates/home-tmpl.html',
        controller: 'homeCtrl'
      }).
      when('/login', {
        templateUrl: 'templates/login.html',
        controller: 'loginController'
      }).
      when('/event', {
        templateUrl: 'templates/event-details-tmpl.html',
        controller: 'eventDetailsCtrl'
      }).
      when('/registry' || 'auth/login',{
        templateUrl: 'templates/registry-tmpl.html',
        controller: 'registryCtrl'
      }).
      when('/contact',{
        templateUrl: 'templates/contact-us-tmpl.html',
        controller: 'contactUsCtrl'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);

