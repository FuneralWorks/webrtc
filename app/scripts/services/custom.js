'use strict';

/**
 * @ngdoc service
 * @name webrtcYoApp.custom
 * @description
 * # custom
 * Factory in the webrtcYoApp.
 */
angular.module('webrtcYoApp')
  .factory('custom', function () {
    // Service logic
    // ...

    

    // Public API here
    return {
      clientSiteName: 'AssurTout',
      helpButtonText: 'Besoin d aide?',
      agentName: 'Benedicte Monge',
      clientName: 'Marc Chable',
      sharableDocs: [
        {
          name: "Termes & Conditions",
          url: "./images/devis_telephone.pdf",
          width: "100%",
          height: "500px"
        },
        {
          name: "Video",
          url: "https://www.youtube.com/embed/UHONP1p_ZiA",
          width: "100%",
          height: "500px"
        }
      ],
      formFieldNames: {
        title: "Formulaire Réclamation",
        fields: [
          "Nom",
          'Prenom',
          "Adresse",
          "Type de Contrat",
          "Telephone",
          "Date"
        ]
      },

    showDocumentSharing: true,
    showSendAudioAnnouncement: true,
    showFormSharing: true,
    showTakePicture: true,
    showRecordMovie: true,
    showDesktopSharing: true,
    showFileTransfer: true,
    showChat: true



    };
  });
