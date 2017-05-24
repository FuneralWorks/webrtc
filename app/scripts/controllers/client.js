'use strict';

/**
 * @ngdoc function
 * @name webrtcYoApp.controller:ClientCtrl
 * @description
 * # ClientCtrl
 * Controller of the webrtcYoApp
 */
angular.module('webrtcYoApp')
  .controller('ClientCtrl', function ($scope, chameleonService, Messages, custom) {
    // Sent Indicator 
    $scope.status = "";

    // Keep an Array of Messages 
    $scope.messages = [];

    $scope.me = { name: custom.clientName };

    // Set User Data 
    Messages.user($scope.me);

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    // Get Received Messages and Add it to Messages Array. 
    // This will automatically update the view. 
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    var chatmessages = document.querySelector(".chat-messages");

    Messages.receive(function (msg) {
      console.log(msg);
      $scope.messages.push(msg);
      console.log('Message received');
      setTimeout(function () {
        chatmessages.scrollTop = chatmessages.scrollHeight;
      }, 10);

    });

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    // Send Messages 
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    $scope.send = function () {

      Messages.send({
        data: {
          text: $scope.textbox,
          type: 'text'
        }
      });

      $scope.status = "sending";
      $scope.textbox = "";
      console.log('Message sent');
      setTimeout(function () {
        $scope.status = ""
      }, 1200);

    };



    $scope.agentName = custom.agentName;
    $scope.clientName = custom.clientName;

    var showDocumentSharing = custom.showDocumentSharing;
    var showSendAudioAnnouncement = custom.showSendAudioAnnouncement;
    var showFormSharing = custom.showFormSharing;
    var showTakePicture = custom.showTakePicture;
    var showRecordMovie = custom.showRecordMovie;
    var showDesktopSharing = custom.showDesktopSharing;
    var showFileTransfer = custom.showFileTransfer;
    var showChat = custom.showChat;

    var _blob2 = [];

    var formFieldNames = custom.formFieldNames;


    var sharableDocs = custom.sharableDocs;

    // END OF SHARED CUSTOMIZATION



    var mySipUserId = "customer@oracledemo.com";
    var agentSipUserId = "agentoracle@oracledemo.com";

    var configuration = {
      sipUser: mySipUserId,
      wscUri: "wss://" + window.location.hostname + ":" + window.location.port + "/ws/webrtc/guest",
      sipUsername: mySipUserId,
      sipPassword: "oracle4webrtc",
      localAudioId: "localAudio",
      remoteAudioId: "remoteAudio",
      ringtoneId: "ringback",
      ringbackId: "ringback",
      localVideoId: "selfVideo",
      remoteVideoId: "remoteVideo",
      recordedVideoId: "recorded",
      maxAttemptedCalls: 1,
      maxActiveCalls: 1,
      callbacks: {}
    };
    console.log('Client configuration : ' + configuration);
    $scope.pageIsLoaded = false;
    $scope.helpActive = false;
    $scope.madeHelpCall = false;
    $scope.widgetDocked = null;

    $scope.showTakePicture = showTakePicture;
    $scope.showRecordMovie = showRecordMovie;
    $scope.showDesktopSharing = showDesktopSharing;
    $scope.showFileTransfer = showFileTransfer;
    $scope.showChat = showChat;

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

    console.log("Page is ready");
    setTimeout(function () {
      console.log("trigger removal of loader screen");
      $scope.pageIsLoaded = true;
      $scope.$apply();
    }, 1000);


    $scope.configuration = configuration;

    $scope.configuration.callbacks.onIncomingData = function (event) {
      console.log("Got Data!!! " + event.data);
      var newData = JSON.parse(event.data);

      if (newData.type == "syncData") {
        if (newData.agentVersion === $scope.syncData.agentVersion) {
          console.log("ignore.");
        } else if (newData.agentVersion !== $scope.syncData.agentVersion) $scope.syncData = newData;

        if ($scope.syncData.form.active === true) {
          $scope.widgetDocked = true;
        }
      }

      if (newData.type == "command") {
        console.log("Got a command: " + newData.action);
        switch (newData.action) {
          case "focus":
            var element = document.getElementById(newData.element);
            element.classList.add('focusElement');

            setTimeout(function () {
              element.classList.remove('focusElement');
            }, 1000);
            break;
          case "takePicture":
            $scope.takePicture();
            break;
          case "openUrl":
            $scope.openUrl(newData.url, newData.width, newData.height);
            $scope.widgetDocked = true;
            $scope.showSharingArea = true;
            break;
          case "sendChat":
            // chat.sendMsg("agent:" + newData.MsgChat); // just show agent:Message Receive on the chatzone gui are
            break;
        }
      }
    };

    $scope.openUrl = function (url, width, height) {
      var sharingArea = document.getElementById('sharingArea');
      var iframe = document.getElementById('sharingIframe');
      sharingArea.style.width = width;
      sharingArea.style.height = height;
      iframe.setAttribute('src', url);
    }


    $scope.takePicture = function () {
      var canvas = document.getElementById('pictureCanvas');
      var video = document.getElementById('selfVideo');
      var context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      $scope.widgetDocked = true;
      $scope.showPicture = true;

    }

    $scope.sendPicture = function () {
      var canvas = document.getElementById('pictureCanvas');

      //var context = canvas.getContext('2d');
      //var canvasData = context.getImageData(0, 0, canvas.width, canvas.height);

      var maxChunkSize = 1000;
      var pictureBase64 = canvas.toDataURL("image/jpeg", 1.0);
      var base64Len = pictureBase64.length;

      for (i = 0; i < base64Len; i += maxChunkSize) {
        var dataToSend = {
          type: "command",
          action: "sendPicture",
          base64Len: base64Len,
          chunkStart: i,
          chunkSize: maxChunkSize,
          picture: pictureBase64.substr(i, maxChunkSize)
        };

        //	    console.log(dataToSend);

        chameleonService.calls.active[0].dataChannels[0].sendData(JSON.stringify(dataToSend));

      }

      $scope.showPicture = false;
      $scope.widgetDocked = false;


    }

    $scope.sendRecording = function () {

      var _blob = new Blob(mediaRecorder.blobData);
      var i = 0;
      //alert("Customer Blob:"+_blob.size);

      $scope.parseFile(_blob, function (chunk, offset) {
        var dataToSend = {
          type: "command",
          action: "sendRecording",
          base64Len: _blob.size,
          chunkStart: offset,
          chunkSize: chunk.byteLength,
          recording: $scope.arrayBufferToBase64(chunk)
        };

        //alert("data.chunkSize"+dataToSend.chunkSize);
        //alert("recording"+dataToSend.recording.length);
        //alert("test new:"+$scope._base64ToArrayBuffer(btoa(String.fromCharCode.apply(null, new Uint8Array(chunk)))).byteLength);

        //_blob2[dataToSend.chunkStart / dataToSend.chunkSize] = dataToSend.recording;
        _blob2[i] = $scope._base64ToArray(dataToSend.recording);
        //_blob2[dataToSend.chunkStart / dataToSend.chunkSize] = btoa(String.fromCharCode.apply(null, new Uint8Array(chunk)));
        i++;

        chameleonService.calls.active[0].dataChannels[0].sendData(JSON.stringify(dataToSend));

      });

      $scope.showRecording = false;
      $scope.widgetDocked = false;
    }

    $scope.sendChat = function () {

      var MsgChat = document.getElementById('msg').value;

      console.log("sendChat:" + MsgChat);

      var dataToSend = {
        type: "command",
        action: "sendChat",
        MsgChat: MsgChat
      };

      console.log(dataToSend);

      chameleonService.calls.active[0].dataChannels[0].sendData(JSON.stringify(dataToSend));
      // chat.sendMsg("customer:" + document.getElementById("msg").value);
    }

    $scope.sendFile = function () {

      document.getElementById('my_file').click();

      document.getElementById('my_file').onchange = function () {
        var fileInput = document.querySelector("#my_file");
        var i = 0;
        var _blob = fileInput.files[0];
        //             alert(_blob.name);
        //             alert(_blob.size);

        $scope.parseFile(_blob, function (chunk, offset) {
          var dataToSend = {
            type: "command",
            action: "sendFile",
            base64Len: _blob.size,
            chunkStart: offset,
            chunkSize: chunk.byteLength,
            fileName: _blob.name,
            file: $scope.arrayBufferToBase64(chunk)
          };

          //alert("data.chunkSize"+dataToSend.chunkSize);
          //alert("recording"+dataToSend.recording.length);
          //alert("test new:"+$scope._base64ToArrayBuffer(btoa(String.fromCharCode.apply(null, new Uint8Array(chunk)))).byteLength);

          //_blob2[dataToSend.chunkStart / dataToSend.chunkSize] = dataToSend.recording;
          //_blob2[i] = dataToSend.file;
          //_blob2[dataToSend.chunkStart / dataToSend.chunkSize] = btoa(String.fromCharCode.apply(null, new Uint8Array(chunk)));
          i++;

          chameleonService.calls.active[0].dataChannels[0].sendData(JSON.stringify(dataToSend));

        });
      }
    }

    $scope.parseFile = function (file, callback) {

      var fileSize = file.size;
      var chunkSize = 5 * 1024; // bytes
      var offset = 0;
      var self = this; // we need a reference to the current object
      var block = null;

      var foo = function (evt) {
        if (evt.target.error == null) {
          var _offset = offset;
          offset += evt.target.result.byteLength;
          callback(evt.target.result, _offset); // callback for handling read chunk
        } else {
          console.log("Read error: " + evt.target.error);
          return;
        }

        if (offset >= fileSize) {
          console.log("Done reading file");
          return;
        }

        block(offset, chunkSize, file);
      }

      block = function (_offset, length, _file) {
        var r = new FileReader();
        var blob = _file.slice(_offset, length + _offset);
        r.onload = foo;
        r.readAsArrayBuffer(blob);
      }

      block(offset, chunkSize, file);
    }

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


    $scope.base64ToBlob = function (b64Data, contentType) {
      contentType = contentType || '';

      var byteArrays = [], byNumbers, slice;
      for (var i = 0; i < b64Data.length; i++) {
        slice = b64Data[i];
        byteNumbers = new Array(slice.length);

        for (var n = 0; n < slice.length; n++) {
          byteNumbers[n] = slice.charCodeAt(n);
        }

        var byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }

      var blob = new Blob(byteArrays, { type: contentType });
      return blob;
    }

    $scope.arrayBufferToBase64 = function (buffer) {
      var binary = '';
      var bytes = new Uint8Array(buffer);
      var len = bytes.byteLength;
      for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return btoa(binary);
    }

    $scope.chameleon = chameleonService;

    $scope.talkToAdvisor = function () {
      console.log($scope.helpActive);
      document.getElementById("activate").play();
      $scope.helpActive = true;
      $scope.widgetDocked = null;
      $scope.showSharingArea = false;
      $scope.showPicture = false;
      chameleonService.bootstrap($scope.configuration, $scope);
      console.log("Request for Help");
      console.log($scope.helpActive);
    };

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


    $scope.doVoiceCall = function () {
      console.log("Make voice call button clicked");
      $scope.syncData.form.active = false;
      chameleonService.makeCall(agentSipUserId, audioCall);
      // chat.Init();
    };

    $scope.doVideoCall = function () {
      console.log("Make video call button clicked");
      $scope.syncData.form.active = false;
      chameleonService.makeCall(agentSipUserId, videoCall);
      // chat.Init();
    };

    $scope.doChat = function () {
      console.log("Make chat button clicked");
      $scope.syncData.form.active = false;
      chameleonService.makeChat(true);
      chameleonService.log('Chat state dochart: ' + chameleonService.isChatActivated);
      // chat.Init();
    };

    $scope.endHelp = function () {
      chameleonService.closeSession();
      $scope.helpActive = false;
      $scope.syncData.form.active = false;
      $scope.madeHelpCall = false;
      document.getElementById("deactivate").play();
    };

    $scope.toggleWidgetDock = function () {

      if ($scope.syncData.form.active === true) {

        $scope.widgetDocked = true;

        return;
      }

      if ($scope.widgetDocked === null) $scope.widgetDocked = true;
      else $scope.widgetDocked = !$scope.widgetDocked;
    };

    $scope.submitForm = function () {
      $scope.syncData.form.active = false;
      $scope.widgetDocked = false;
      Messages.send({
        data: {
          text: 'Formulaire envoyé',
          type: 'text'
        }
      });
    };

    $scope.outboundCallee;
    $scope.sessionMedia = {};
    $scope.sessionMedia.audio = true;
    $scope.sessionMedia.video = false;
    $scope.sessionMedia.data = false;

    var audioCall = {
      audio: true,
      video: false,
      data: true,
      dcConfig: [{ "label": "chameleonDataChannel", "reliable": true }]
    };

    var videoCall = {
      audio: true,
      video: true,
      data: true,
      dcConfig: [{ "label": "chameleonDataChannel", "reliable": true }]
    };

    var dataCall = {
      audio: false,
      video: false,
      data: true,
      dcConfig: [{ "label": "chameleonDataChannel", "reliable": true }]
    }


    $scope.$watch('syncData.form', function () {

      if (chameleonService.calls.active[0] && chameleonService.calls.active[0].dataChannels[0].getState() == "open") {
        console.log("sending form update.");
        $scope.syncData.customerVersion++;
        chameleonService.calls.active[0].dataChannels[0].sendData(JSON.stringify($scope.syncData));
      }
    }, true);

    $scope.toggleSharing = function () {
      chameleonService.toggleSharing();
    }

    $scope.startRecording = function () {
      chameleonService.toggleRecording();
    }

    $scope.stopRecording = function () {
      $scope.widgetDocked = true;
      $scope.showRecording = true;

      chameleonService.toggleRecording();
    }

    if (sessionStorage.getItem("sessionId")) {
      console.log($scope.helpActive);
      document.getElementById("activate").play();
      $scope.helpActive = true;
      $scope.widgetDocked = null;
      chameleonService.bootstrap($scope.configuration, $scope);
      console.log("Request for Help");
      console.log($scope.helpActive);
    }
  });

