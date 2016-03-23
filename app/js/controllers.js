'use strict';

/* Controllers */

var registryControllers = angular.module('registryControllers', []);

registryControllers.controller('registryCtrl', ['$scope', '$rootScope', '$http',
  function($scope, $rootScope, $http) {
    $http.get('/userinfo')
        .then(function(response){
            $scope.user = response.data;
        });

    $scope.post = function(){
      $http.post('/api/product', this.product)
          .then(function(response){
            //console.log(response)
            $http.get('/api/product')
                .then(function(response){
                  //console.log(response.data)
                  $scope.gifts = response.data
                });
          });
      $scope.product = {}
    };

    $http.get('/api/product').success(function(data) {
        $scope.gifts = data;
        //console.log(data)
    });

    $scope.delete = function(gift, index){
        var r = confirm("Are you sure you want to delete this?");
        if (r == true) {
            console.log(gift._id)
            $http.delete('/api/product/' + gift._id)
                .then(function(response){
                    console.log(response)
                    $http.get('/api/product')
                        .then(function(response){
                            console.log(response.data)
                            $scope.gifts = response.data
                        });
                });
        }
        //console.log(gift, index)
    };
    $scope.logout = function(){
        $http.get('/auth/logout')
            .then(function(response){
                $scope.user = response.data
            })
    };

    $scope.orderProp = 'id';
  }]);

registryControllers.controller('eventDetailsCtrl', ['$scope', '$routeParams',
  function($scope, $https) {
    $scope.phoneId = $routeParams.phoneId;
  }]);

registryControllers.controller('homeCtrl', ['$scope', 
  function($scope){
  	$scope.map = data;
}]);

registryControllers.controller('contactUsCtrl', ['$scope', 
  function($scope){
  $scope.lodge = data;
}])

registryControllers.controller('loginController', ['$scope', '$http', '$location',
    function($scope, $http, $location) {
        console.log('hello');
        $scope.login = function(){
            //console.log('hello?')
            $http.post('/auth/login', $scope.user)
                .then(function(response){
                    if(response.data.password){
                        $location.url('/')
                    }
                    else{
                        alert('User does not exist')
                        $location.url('/login')
                    }
                })
        };

        $scope.newuser = function(){
            //console.log($scope.newUser);
            $http.post('/auth/signup', $scope.newUser)
                .then(function(response){
                    if(response.data.password){
                        $location.url('/')
                    }
                    else{
                        alert('User does not exist');
                        $location.url('/login')
                    }
                })
        }
}]);