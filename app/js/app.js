'use strict';

/* App Module */

var registryApp = angular.module('registryApp', [
  'ngRoute',
  'registryControllers',
  'GoogleMapsNative'
]);

registryApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/gifts', {
        templateUrl: 'templates/gift-picker-tmpl.html',
        controller: 'giftListCtrl'
      }).
      when('/login', {
        templateUrl: 'templates/login.html',
        controller: 'loginController'
      }).
      when('/song', {
        templateUrl: 'templates/song-suggestion-tmpl.html',
        controller: 'suggestSongCtrl'
      }).
      when('/reception',{
        templateUrl: 'templates/reception-info-tmpl.html',
        controller: 'receptionInfoCtrl'
      }).
      when('/lodging',{
        templateUrl: 'templates/lodging-info-tmpl.html',
        controller: 'lodgingCtrl'
      }).
      otherwise({
        redirectTo: '/gifts'
      });
  }]);
