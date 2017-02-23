
'use strict';

/**
 * @ngdoc overview
 * @name webrtcYoApp
 * @description
 * # webrtcYoApp
 *
 * Main module of the application.
 */
angular
  .module('webrtcYoApp', [
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'chat'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/client', {
        templateUrl: 'views/client.html',
        controller: 'ClientCtrl',
        controllerAs: 'client'
      })
      .when('/agent', {
        templateUrl: 'views/agent.html',
        controller: 'AgentCtrl',
        controllerAs: 'agent'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
  
angular.module('chat').constant( 'config', {
    rltm: {
        service: 'pubnub', 
        config: {
            publishKey: 'demo',
            subscribeKey: 'demo'
        }
    }
});