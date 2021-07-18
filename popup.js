let amazonextension = angular.module("amazonextension", ['ui.router']).config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
    
      $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: './home.html',
          controller: 'HomeController'
        }).state('login', {
            url: '/login',
            templateUrl: './login.html',
            controller: 'LoginController'
          }).state('signup', {
            url: '/signup',
            templateUrl: './signup.html',
            controller: 'SignupController'
          });
    
      $urlRouterProvider.otherwise('login');
    }
  ]);
  
  amazonextension.controller('LoginController', function($scope){
    $scope.email="";
    $scope.password="";
    $scope.login = function(){
      console.log("login's console",$scope.email,$scope.password);
      chrome.runtime.sendMessage({form: "login", email: $scope.email, password: $scope.password}, (resp) => {
        if(resp.status==='success'){
          chrome.storage.local.get('token',(result)=>console.log("everything is working properly and token is "+result.token));
          window.location.href="#!home"
        }
      });
      $scope.email="";
      $scope.password="";
    }
  });
  
  amazonextension.controller('SignupController', function($scope){
    $scope.username="";
    $scope.email="";
    $scope.password="";
    $scope.signup = function(){
      console.log("signup's console",$scope.username, $scope.email, $scope.password);
      chrome.runtime.sendMessage({form: "signup", username: $scope.username, email: $scope.email, password: $scope.password}, (resp) => {
        if(resp.status==='success'){
          window.location.href="#!login"
        }
      });
      $scope.username="";
      $scope.email="";
      $scope.password="";
    }
    
  });
  
  amazonextension.controller('HomeController', function($scope){
    $scope.track = function(){
  
    }
    $scope.show = function(){
  
    }
  })