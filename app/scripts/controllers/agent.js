'use strict';

/**
 * @ngdoc function
 * @name webrtcYoApp.controller:AgentCtrl
 * @description
 * # AgentCtrl
 * Controller of the webrtcYoApp
 */
angular.module('webrtcYoApp')
  .controller('AgentCtrl', ['$scope', 'chameleonService', function ($scope, chameleonService) {


    var mySipUserId = "agentoracle@oracledemo.com";

    var configuration = {
      sipUser: mySipUserId,
      wscUri: "wss://" + window.location.hostname + ":" + window.location.port + "/ws/webrtc/guest",
      sipUsername: mySipUserId,
      sipPassword: "oracle4webrtc",
      localAudioId: "localAudio",
      remoteAudioId: "remoteAudio",
      ringtoneId: "ringtone",
      ringbackId: "ringback",
      localVideoId: "selfVideo",
      remoteVideoId: "remoteVideo",
      recordedVideoId: "recorded",
      maxAttemptedCalls: 1,
      maxActiveCalls: 1,
      callbacks: {}
    };



    var recordedBlobs = [];
    var fileBlobs = [];
    var counter = 0;

    var showDocumentSharing = true;
    var showSendAudioAnnouncement = true;
    var showFormSharing = true;
    var showTakePicture = true;
    var showRecordMovie = true;
    var showDesktopSharing = true;
    var showFileTransfer = true;
    var showChat = true;


    // Sets the names of the fields in the shared form
    var formFieldNames = {
      title: "Complaint Form",
      fields: [
        "Name",
        "Address",
        "Subscribed Service",
        "Telephone",
        "Date",
        "Comments"
      ]
    };


    var sharableDocs = [
      {
        name: "Terms and Conditions",
        url: "./images/oracle.pdf",
        width: "90%",
        height: "400px"
      },
      {
        name: "WSC Video",
        url: "https://www.youtube.com/embed/UHONP1p_ZiA",
        width: "560px",
        height: "315px"
      }
    ];

    console.log("DOM is Ready");


    $scope.configuration = configuration;

    $scope.configuration.callbacks.onIncomingData = function (event) {
      //        console.log("Got Data!!! " + event.data );
      var newData = JSON.parse(event.data);

      if (newData.type == "syncData") {
        if (newData.customerVersion === $scope.syncData.customerVersion) {
          console.log("ignore.");
        } else if (newData.customerVersion !== $scope.syncData.customerVersion) $scope.syncData = newData;
      }

      if (newData.type == "command") {
        switch (newData.action) {
          case "sendPicture":
            $scope.receivePicture(newData);
            break;

          case "sendRecording":
            $scope.receiveRecorder(newData);
            break;
          case "sendChat":
            // chat.sendMsg("customer:" + newData.MsgChat); // just show customer:Message Receive on the chatzone gui are
            break;
          case "sendFile":
            $scope.receiveFile(newData);
            break;
        }

      }

    };

    $scope.receivePicture = function (data) {

      var progressBar = document.getElementById("progressBar");
      var img = document.getElementById('pictureImg');

      if (data.chunkStart == 0) {
        $scope.showProgress = true;
        $scope.showTransfer = true;
        $scope.showPicture = true;
        $scope.base64Array = [];
        img.src = "";
      }

      //        alert("data.chunkStart"+data.chunkStart);
      //        alert("data.chunkSize"+data.chunkSize);
      $scope.base64Array[data.chunkStart / data.chunkSize] = data.picture;
      progressBar.style.width = "" + (100 * (data.chunkStart + data.picture.length) / data.base64Len) + "%";

      if (data.chunkStart + data.chunkSize >= data.base64Len) { // Last Chunk
        img.src = $scope.base64Array.join("");
        $scope.showProgress = false;
      }
    };

    $scope.receiveFile = function (data) {

      var progressBar = document.getElementById("progressBar");

      if (data.chunkStart == 0) {
        $scope.showProgress = true;
        $scope.showTransfer = true;
        fileBlobs = []; // resetting array
        counter = 0;
      }

      progressBar.style.width = "" + (100 * (data.chunkStart + data.chunkSize) / data.base64Len) + "%";

      fileBlobs[counter] = $scope._base64ToArray(data.file);
      //fileBlobs[counter] = data.file;
      counter++;

      if (data.chunkStart + data.chunkSize >= data.base64Len) { // Last Chunk
        $scope.showProgress = false;
        //alert("Agent String:"+fileBlobs.join("").length);
        var superBuffer2 = new Blob(fileBlobs);
        // alert("Agent Blob:"+superBuffer2.name);
        // alert("Agent Blob:"+superBuffer2.size);

        superBuffer2.url = (window.URL || window.webkitURL).createObjectURL(superBuffer2);
        if (data.fileName) {
          $scope.saveToDisk(superBuffer2.url, data.fileName);
        }
      }
    };

    $scope.saveToDisk = function (fileUrl, fileName) {
      console.log("Save file " + fileName);
      var hyperlink = document.createElement('a');
      hyperlink.href = fileUrl;
      hyperlink.target = '_blank';
      hyperlink.download = fileName || fileUrl;

      var mouseEvent = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
      });

      hyperlink.dispatchEvent(mouseEvent);
      //(window.URL || window.webkitURL).revokeObjectURL(hyperlink.href);
    }

    $scope.receiveRecorder = function (data) {

      var progressBar = document.getElementById("progressBar");
      var recorder = document.getElementById('recorded');

      if (data.chunkStart == 0) {
        $scope.showProgress = true;
        $scope.showTransfer = true;
        $scope.showMediaRecorder = true;
        recordedBlobs = []; // resetting array
      }

      progressBar.style.width = "" + (100 * (data.chunkStart + data.chunkSize) / data.base64Len) + "%";

      recordedBlobs[data.chunkStart / data.chunkSize] = $scope._base64ToArray(data.recording);

      if (data.chunkStart + data.chunkSize >= data.base64Len) { // Last Chunk

        //alert("Agent String:"+recordedBlobs.join("").length);
        var superBuffer2 = new Blob(recordedBlobs);
        $scope.showProgress = false;
        //alert("Agent Blob:"+superBuffer2.size);
        console.log($scope.configuration.recordedVideoId);
        attachSrcObject(document.getElementById($scope.configuration.recordedVideoId), superBuffer2);
      }
    };

    $scope._base64ToArrayBuffer = function (base64) {
      var binary_string = window.atob(base64);
      var len = binary_string.length;
      var bytes = new Uint8Array(len);
      for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
      }
      return bytes.buffer;
    }

    $scope._base64ToArray = function (base64) {
      var binary_string = window.atob(base64);
      var len = binary_string.length;
      var bytes = new Uint8Array(len);
      for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
      }
      return bytes;
    }

    $scope.sendAnnc = function () {

      if (document.getElementById('mediaAnnounc').paused) {
        document.getElementById('mediaAnnounc').play();
        document.getElementById('announc').innerHTML = "Stop";


        var peerconnection = chameleonService.calls.active[0].getPeerConnection();
        if (peerconnection == null) {
          console.error("can not get the audio track. failed to mute audio!");
          return;
        }

        peerconnection.getLocalStreams().map(function (stream) {
          stream.getAudioTracks()[0].enabled = false;
        });
      } else {
        document.getElementById('mediaAnnounc').pause();
        //document.getElementById('mediaAnnounc').currentTime = 0;
        document.getElementById('announc').innerHTML = "Send";

        var peerconnection = chameleonService.calls.active[0].getPeerConnection();
        if (peerconnection == null) {
          console.error("can not get the audio track. failed to mute audio!");
          return;
        }

        peerconnection.getLocalStreams().map(function (stream) {
          stream.getAudioTracks()[0].enabled = true;
        });
      }
    }

    $scope.sendChat = function () {
      var MsgChat = document.getElementById('msg').value;

      //var context = canvas.getContext('2d');
      //var canvasData = context.getImageData(0, 0, canvas.width, canvas.height);


      var dataToSend = {
        type: "command",
        action: "sendChat",
        MsgChat: MsgChat
      };

      console.log(dataToSend);

      chameleonService.calls.active[0].dataChannels[0].sendData(JSON.stringify(dataToSend));
      // chat.sendMsg("agent:" + document.getElementById("msg").value);


    }


    $scope.sendUrl = function (doc) {
      var dataToSend = {
        type: "command",
        action: "openUrl",
        url: doc.url,
        width: doc.width,
        height: doc.height
      };

      chameleonService.calls.active[0].dataChannels[0].sendData(JSON.stringify(dataToSend));
    }


    $scope.showDocumentSharing = showDocumentSharing;
    $scope.showSendAudioAnnouncement = showSendAudioAnnouncement;
    $scope.showDocSharingPanel = showDocumentSharing || showSendAudioAnnouncement;

    $scope.showFormSharing = showFormSharing;
    $scope.showTakePicture = showTakePicture;
    $scope.showChat = showChat;


    $scope.chameleon = chameleonService;
    $scope.pageIsLoaded = false;
    $scope.showProgress = false;
    $scope.showTransfer = false;
    $scope.showMediaRecorder = false;
    $scope.showPicture = false;
    $scope.syncData = {
      type: "syncData",
      customerVersion: 0,
      agentVersion: 0,
      form: {
        active: false,
        fields: []
      }
    };

    for (var i = 0; i < formFieldNames.fields.length; i++) {
      $scope.syncData.form.fields.push("");
    }

    $scope.formFieldNames = formFieldNames;
    $scope.sharableDocs = sharableDocs;
    $scope.outboundCallee;
    $scope.sessionMedia = {};
    $scope.sessionMedia.audio = true;
    $scope.sessionMedia.video = false;
    $scope.sessionMedia.data = false;

    setTimeout(function () {
      console.log("trigger removal of loader screen");
      $scope.pageIsLoaded = true;
      $scope.$apply();
    }, 1000);


    $scope.wscInit = function () {
      chameleonService.bootstrap($scope.configuration, $scope);
    };

    $scope.reset = function () {
      chameleonService.initialize();
    };

    $scope.wscStop = function () {
      chameleonService.closeSession();
    };

    $scope.answerIncomingCall = function (call) {
      console.log("Accept call button is clicked!");
      // $scope.resetForm1();
      $scope.showTransfer = false;
      $scope.showProgress = false;
      $scope.showMediaRecorder = false;
      $scope.showPicture = false;

      document.getElementById($scope.configuration.recordedVideoId).src = null;

      chameleonService.acceptIncomingCall(call);
    };

    $scope.declineIncomingCall = function (call) {
      console.log("Decline call button is clicked.");
      chameleonService.rejectIncomingCall(call);
    };

    $scope.cancelOutgoingCall = function (call) {
      console.log("Cancel call button is clicked.");
      chameleonService.cancelOutgoingCall(call);
    };

    $scope.hangupCall = function (call) {
      console.log("Hang up button clicked.");
      chameleonService.endActiveCall(call);
    };

    $scope.makeCall = function () {
      console.log("Make call button clicked");
      console.log("calling: " + $scope.outboundCallee);

      if ($scope.sessionMedia.data === true) {
        $scope.sessionMedia.dcConfig = [{ "label": "chameleonDataChannel", "reliable": true }];
      } else { $scope.sessionMedia.dcConfig = null }

      chameleonService.makeCall($scope.outboundCallee, $scope.sessionMedia);
    };

    $scope.$watch('syncData.form', function () {

      if (chameleonService.calls.active[0] && chameleonService.calls.active[0].dataChannels[0].getState() == "open") {
        console.log("sending form update");
        $scope.syncData.agentVersion++;
        chameleonService.calls.active[0].dataChannels[0].sendData(JSON.stringify($scope.syncData));
      }
    }, true);

    $scope.pushForm1 = function () {
      $scope.syncData.form.active = true;
      chameleonService.calls.active[0].dataChannels[0].sendData(JSON.stringify($scope.syncData));
    };

    $scope.resetForm1 = function () {
      $scope.syncData = {
        type: "syncData",
        customerVersion: 0,
        agentVersion: 0,
        form: {
          active: false,
          fields: []
        }
      };

      for (i = 0; i < formFieldNames.fields.length; i++) {
        $scope.syncData.form.fields.push("");
      }

      // chat.Init();

      if (chameleonService.isActiveCall === true) chameleonService.calls.active[0].dataChannels[0].sendData(JSON.stringify($scope.syncData));
    };


    $scope.takePicture = function () {
      var dataToSend = {
        type: "command",
        action: "takePicture",
      };

      chameleonService.calls.active[0].dataChannels[0].sendData(JSON.stringify(dataToSend));

    };

    $scope.focus = function (element) {
      var dataToSend = {
        type: "command",
        action: "focus",
        element: element
      };

      chameleonService.calls.active[0].dataChannels[0].sendData(JSON.stringify(dataToSend));

    };

    if (sessionStorage.getItem("sessionId")) {
      $scope.wscInit()
    }

    theAudioContext = new (window.AudioContext || window.webkitAudioContext)();
    // backgroundMusic = theAudioContext.createMediaElementSource(document.querySelector('mediaAnnounc'));

  }]);

