'use strict';

/**
 * @ngdoc function
 * @name webrtcYoApp.controller:AgentCtrl
 * @description
 * # AgentCtrl
 * Controller of the webrtcYoApp
 */
angular.module('webrtcYoApp')
  .controller('AgentCtrl',['$scope', 'Messages', function($scope, Messages) {

    // Sent Indicator
    $scope.status = '';

    // Keep an Array of Messages
    $scope.messages = [];

    $scope.me = {name: 'Arthur'};

    // Set User Data
    Messages.user($scope.me);

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // Get Received Messages and Add it to Messages Array.
    // This will automatically update the view.
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    var chatmessages = document.querySelector('.chat-messages');

    Messages.receive(function(msg) {
        
        $scope.messages.push(msg);
        console.log('Message received');
        setTimeout(function() {
            chatmessages.scrollTop = chatmessages.scrollHeight;
        }, 10);

    });

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // Send Messages
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    $scope.send = function() {

        Messages.send({data: $scope.textbox});
        
        $scope.status = 'sending';
        $scope.textbox = '';

        setTimeout(function() { 
            $scope.status = '' ;
        }, 1200 );

    };

} ] );

