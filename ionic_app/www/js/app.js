// Ionic Starter App
 
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('ID_App', ['ionic', 'ID_App.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    

  });
})


.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router, which uses the concept of states.
  // Learn more here: https://github.com/angular-ui/ui-router.
  // Set up the various states in which the app can be.
  // Each state's controller can be found in controllers.js.
  $stateProvider


  // Set up an abstract state for the tabs directive:
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller: 'TabsCtrl'
  })

  // Each tab has its own nav history stack:

  .state('tab.ID', {
    url: '/ID',
    views: {
      'tab-ID': {
        templateUrl: 'templates/ID.html',
        controller: 'ID_Ctrl'
      }
    }
  })

  .state('tab.Config', {
      url: '/Config',
      views: {
        'tab-Config': {
          templateUrl: 'templates/Config.html',
          controller: 'Config_Ctrl'
        }
      }
    })

  .state('tab.Info', {
      url: '/Info',
      views: {
        'tab-Info': {
          templateUrl: 'templates/Info.html',
          controller: 'Info_Ctrl'
        }
      }
    })


  // If none of the above states are matched, use this as the fallback:
  $urlRouterProvider.otherwise('/tab/ID');

})


.constant('SERVER', {
  // Local server
  //url: 'http://localhost:3000'

  // Public Heroku server
  url: 'https://ionic-songhop.herokuapp.com'
});
