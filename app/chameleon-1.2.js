/* ===============================================================================================

    chameleon-1.2.js
    Manages calls, sessions, and state for Oracle WebRTC Session Controller (WSC).
    Built as an Angular.js-friendly wrapper around wsc.js.

================================================================================================*/

   
/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
var CryptoJS=CryptoJS||function(s,p){var m={},l=m.lib={},n=function(){},r=l.Base={extend:function(b){n.prototype=this;var h=new n;b&&h.mixIn(b);h.hasOwnProperty("init")||(h.init=function(){h.$super.init.apply(this,arguments)});h.init.prototype=h;h.$super=this;return h},create:function(){var b=this.extend();b.init.apply(b,arguments);return b},init:function(){},mixIn:function(b){for(var h in b)b.hasOwnProperty(h)&&(this[h]=b[h]);b.hasOwnProperty("toString")&&(this.toString=b.toString)},clone:function(){return this.init.prototype.extend(this)}},
q=l.WordArray=r.extend({init:function(b,h){b=this.words=b||[];this.sigBytes=h!=p?h:4*b.length},toString:function(b){return(b||t).stringify(this)},concat:function(b){var h=this.words,a=b.words,j=this.sigBytes;b=b.sigBytes;this.clamp();if(j%4)for(var g=0;g<b;g++)h[j+g>>>2]|=(a[g>>>2]>>>24-8*(g%4)&255)<<24-8*((j+g)%4);else if(65535<a.length)for(g=0;g<b;g+=4)h[j+g>>>2]=a[g>>>2];else h.push.apply(h,a);this.sigBytes+=b;return this},clamp:function(){var b=this.words,h=this.sigBytes;b[h>>>2]&=4294967295<<
32-8*(h%4);b.length=s.ceil(h/4)},clone:function(){var b=r.clone.call(this);b.words=this.words.slice(0);return b},random:function(b){for(var h=[],a=0;a<b;a+=4)h.push(4294967296*s.random()|0);return new q.init(h,b)}}),v=m.enc={},t=v.Hex={stringify:function(b){var a=b.words;b=b.sigBytes;for(var g=[],j=0;j<b;j++){var k=a[j>>>2]>>>24-8*(j%4)&255;g.push((k>>>4).toString(16));g.push((k&15).toString(16))}return g.join("")},parse:function(b){for(var a=b.length,g=[],j=0;j<a;j+=2)g[j>>>3]|=parseInt(b.substr(j,
2),16)<<24-4*(j%8);return new q.init(g,a/2)}},a=v.Latin1={stringify:function(b){var a=b.words;b=b.sigBytes;for(var g=[],j=0;j<b;j++)g.push(String.fromCharCode(a[j>>>2]>>>24-8*(j%4)&255));return g.join("")},parse:function(b){for(var a=b.length,g=[],j=0;j<a;j++)g[j>>>2]|=(b.charCodeAt(j)&255)<<24-8*(j%4);return new q.init(g,a)}},u=v.Utf8={stringify:function(b){try{return decodeURIComponent(escape(a.stringify(b)))}catch(g){throw Error("Malformed UTF-8 data");}},parse:function(b){return a.parse(unescape(encodeURIComponent(b)))}},
g=l.BufferedBlockAlgorithm=r.extend({reset:function(){this._data=new q.init;this._nDataBytes=0},_append:function(b){"string"==typeof b&&(b=u.parse(b));this._data.concat(b);this._nDataBytes+=b.sigBytes},_process:function(b){var a=this._data,g=a.words,j=a.sigBytes,k=this.blockSize,m=j/(4*k),m=b?s.ceil(m):s.max((m|0)-this._minBufferSize,0);b=m*k;j=s.min(4*b,j);if(b){for(var l=0;l<b;l+=k)this._doProcessBlock(g,l);l=g.splice(0,b);a.sigBytes-=j}return new q.init(l,j)},clone:function(){var b=r.clone.call(this);
b._data=this._data.clone();return b},_minBufferSize:0});l.Hasher=g.extend({cfg:r.extend(),init:function(b){this.cfg=this.cfg.extend(b);this.reset()},reset:function(){g.reset.call(this);this._doReset()},update:function(b){this._append(b);this._process();return this},finalize:function(b){b&&this._append(b);return this._doFinalize()},blockSize:16,_createHelper:function(b){return function(a,g){return(new b.init(g)).finalize(a)}},_createHmacHelper:function(b){return function(a,g){return(new k.HMAC.init(b,
g)).finalize(a)}}});var k=m.algo={};return m}(Math);
(function(s){function p(a,k,b,h,l,j,m){a=a+(k&b|~k&h)+l+m;return(a<<j|a>>>32-j)+k}function m(a,k,b,h,l,j,m){a=a+(k&h|b&~h)+l+m;return(a<<j|a>>>32-j)+k}function l(a,k,b,h,l,j,m){a=a+(k^b^h)+l+m;return(a<<j|a>>>32-j)+k}function n(a,k,b,h,l,j,m){a=a+(b^(k|~h))+l+m;return(a<<j|a>>>32-j)+k}for(var r=CryptoJS,q=r.lib,v=q.WordArray,t=q.Hasher,q=r.algo,a=[],u=0;64>u;u++)a[u]=4294967296*s.abs(s.sin(u+1))|0;q=q.MD5=t.extend({_doReset:function(){this._hash=new v.init([1732584193,4023233417,2562383102,271733878])},
_doProcessBlock:function(g,k){for(var b=0;16>b;b++){var h=k+b,w=g[h];g[h]=(w<<8|w>>>24)&16711935|(w<<24|w>>>8)&4278255360}var b=this._hash.words,h=g[k+0],w=g[k+1],j=g[k+2],q=g[k+3],r=g[k+4],s=g[k+5],t=g[k+6],u=g[k+7],v=g[k+8],x=g[k+9],y=g[k+10],z=g[k+11],A=g[k+12],B=g[k+13],C=g[k+14],D=g[k+15],c=b[0],d=b[1],e=b[2],f=b[3],c=p(c,d,e,f,h,7,a[0]),f=p(f,c,d,e,w,12,a[1]),e=p(e,f,c,d,j,17,a[2]),d=p(d,e,f,c,q,22,a[3]),c=p(c,d,e,f,r,7,a[4]),f=p(f,c,d,e,s,12,a[5]),e=p(e,f,c,d,t,17,a[6]),d=p(d,e,f,c,u,22,a[7]),
c=p(c,d,e,f,v,7,a[8]),f=p(f,c,d,e,x,12,a[9]),e=p(e,f,c,d,y,17,a[10]),d=p(d,e,f,c,z,22,a[11]),c=p(c,d,e,f,A,7,a[12]),f=p(f,c,d,e,B,12,a[13]),e=p(e,f,c,d,C,17,a[14]),d=p(d,e,f,c,D,22,a[15]),c=m(c,d,e,f,w,5,a[16]),f=m(f,c,d,e,t,9,a[17]),e=m(e,f,c,d,z,14,a[18]),d=m(d,e,f,c,h,20,a[19]),c=m(c,d,e,f,s,5,a[20]),f=m(f,c,d,e,y,9,a[21]),e=m(e,f,c,d,D,14,a[22]),d=m(d,e,f,c,r,20,a[23]),c=m(c,d,e,f,x,5,a[24]),f=m(f,c,d,e,C,9,a[25]),e=m(e,f,c,d,q,14,a[26]),d=m(d,e,f,c,v,20,a[27]),c=m(c,d,e,f,B,5,a[28]),f=m(f,c,
d,e,j,9,a[29]),e=m(e,f,c,d,u,14,a[30]),d=m(d,e,f,c,A,20,a[31]),c=l(c,d,e,f,s,4,a[32]),f=l(f,c,d,e,v,11,a[33]),e=l(e,f,c,d,z,16,a[34]),d=l(d,e,f,c,C,23,a[35]),c=l(c,d,e,f,w,4,a[36]),f=l(f,c,d,e,r,11,a[37]),e=l(e,f,c,d,u,16,a[38]),d=l(d,e,f,c,y,23,a[39]),c=l(c,d,e,f,B,4,a[40]),f=l(f,c,d,e,h,11,a[41]),e=l(e,f,c,d,q,16,a[42]),d=l(d,e,f,c,t,23,a[43]),c=l(c,d,e,f,x,4,a[44]),f=l(f,c,d,e,A,11,a[45]),e=l(e,f,c,d,D,16,a[46]),d=l(d,e,f,c,j,23,a[47]),c=n(c,d,e,f,h,6,a[48]),f=n(f,c,d,e,u,10,a[49]),e=n(e,f,c,d,
C,15,a[50]),d=n(d,e,f,c,s,21,a[51]),c=n(c,d,e,f,A,6,a[52]),f=n(f,c,d,e,q,10,a[53]),e=n(e,f,c,d,y,15,a[54]),d=n(d,e,f,c,w,21,a[55]),c=n(c,d,e,f,v,6,a[56]),f=n(f,c,d,e,D,10,a[57]),e=n(e,f,c,d,t,15,a[58]),d=n(d,e,f,c,B,21,a[59]),c=n(c,d,e,f,r,6,a[60]),f=n(f,c,d,e,z,10,a[61]),e=n(e,f,c,d,j,15,a[62]),d=n(d,e,f,c,x,21,a[63]);b[0]=b[0]+c|0;b[1]=b[1]+d|0;b[2]=b[2]+e|0;b[3]=b[3]+f|0},_doFinalize:function(){var a=this._data,k=a.words,b=8*this._nDataBytes,h=8*a.sigBytes;k[h>>>5]|=128<<24-h%32;var l=s.floor(b/
4294967296);k[(h+64>>>9<<4)+15]=(l<<8|l>>>24)&16711935|(l<<24|l>>>8)&4278255360;k[(h+64>>>9<<4)+14]=(b<<8|b>>>24)&16711935|(b<<24|b>>>8)&4278255360;a.sigBytes=4*(k.length+1);this._process();a=this._hash;k=a.words;for(b=0;4>b;b++)h=k[b],k[b]=(h<<8|h>>>24)&16711935|(h<<24|h>>>8)&4278255360;return a},clone:function(){var a=t.clone.call(this);a._hash=this._hash.clone();return a}});r.MD5=t._createHelper(q);r.HmacMD5=t._createHmacHelper(q)})(Math);


wsc.setLogger(console);
wsc.setLogLevel(wsc.LOGLEVEL.DEBUG);

/**==========================================
 *  chameleon Object literal initialization
   ========================================== */

var chameleon = {
    configuration : null,
    signallingStateId : 0,
    signallingState: "None",
    signallingError : null,
    wscSessionObj : {},
    handlers : {},
    calls : {
        active : [],
        incoming : [],
        outgoing: [],
        all : []
    },
    callbacks : {}
};

var theAudioContext; //=  new AudioContext; 
var backgroundMusic; // = theAudioContext.createMediaElementSource(document.getElementById("back"));

// set up a basic logger
chameleon.log = function(logMessage) {
    var now = new Date(),
        timestamp = now.getFullYear() + "-" + now.getMonth() + "-" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    if (typeof(logMessage) == 'string') console.log("%c" + timestamp + " [chameleon log] " + logMessage, 'background: #222; color: #82FA58' );
    else if (typeof(logMessage) == 'object') console.log("%c" + timestamp + " [chameleon log] ", 'background: #222; color: #82FA58', logMessage);
};



/**==========================================
 *  
 * 
 * 
 * 
 * 
 * chameleon Object Properties
 *  and Property Getters
 * 
 * 
 * 
 * 
 * 
   ========================================== */
// set up an accessor to play ringtones with Reconnecting
Object.defineProperty(chameleon, 'isReconnecting', {
    get : function() {
        return this._currentReconnecting;
    },
    set : function(state) {
        if(this.configuration.ringtoneId && state === true) {
            chameleon.log("starting ringtone plaback of " + this.configuration.ringtoneId + " because state is " + state);
            chameleon.log("setting isReconnecting to true");
            document.getElementById(this.configuration.ringtoneId).play();
        }
        if(this.configuration.ringtoneId && state === false) {
            chameleon.log("stopping ringtone plaback of " + this.configuration.ringtoneId);
            chameleon.log("setting isReconnecting to false");
            document.getElementById(this.configuration.ringtoneId).pause();
            document.getElementById(this.configuration.ringtoneId).currentTime = 0;
        }
        this._currentReconnecting = state;
    },
    _currentReconnecting : false
});

// set up an accessor to play ringtones
Object.defineProperty(chameleon, 'isIncomingCall', {
    get : function() {
        return this._currentIncoming;
    },
    set : function(state) {
        if(this.configuration.ringtoneId && state === true) {
            chameleon.log("starting ringtone plaback of " + this.configuration.ringtoneId + " because state is " + state);
            chameleon.log("setting isIncomingCall to true");
            document.getElementById(this.configuration.ringtoneId).play();
        }
        if(this.configuration.ringtoneId && state === false) {
            chameleon.log("stopping ringtone plaback of " + this.configuration.ringtoneId);
            chameleon.log("setting isIncomingCall to false");
            document.getElementById(this.configuration.ringtoneId).pause();
            document.getElementById(this.configuration.ringtoneId).currentTime = 0;
        }
        this._currentIncoming = state;
    },
    _currentIncoming : false
});

// set up an accessor to play ringtones
Object.defineProperty(chameleon, 'isOutgoingCall', {
    get : function() {
        return this._currentOutgoing;
    },
    set : function(state) {
        if(this.configuration.ringbackId !== null && state === true) {
            chameleon.log("starting ringback plaback of " + this.configuration.ringbackId);
            chameleon.log("setting isOutgoingCall to true");
            document.getElementById(this.configuration.ringbackId).play();
        }
        if(this.configuration.ringbackId !== null && state === false) {
            chameleon.log("setting isOutgoingCall to false");
            chameleon.log("stopping ringback playback of " + this.configuration.ringbackId);
            document.getElementById(this.configuration.ringbackId).pause();
            document.getElementById(this.configuration.ringbackId).currentTime = 0;
        }
        this._currentOutgoing = state;
    },
    _currentOutgoing : false
});

// set up an accessor for signalling state
Object.defineProperty(chameleon, 'signallingState', {
    get : function () {
        if (!chameleon.wscSessionObj.sessionState || chameleon.wscSessionObj.sessionState === null) {
            if (chameleon.signallingStateId === 0) return "Not Activated";
            else return "Deactivated";
        }
        if (chameleon.wscSessionObj.sessionState == "NONE" && chameleon.signallingStateId === 3) return "Connecting...";
        return chameleon.wscSessionObj.sessionState;
    }
});

// shortcut to see if there is an active call
Object.defineProperty(chameleon, 'isActiveCall', {
    get: function() {
        if (chameleon.calls.active.length > 0 ) return true;
        else return false;
    }
});

// shortcut the newest, most recent active call state
Object.defineProperty(chameleon, 'activeCallState', {
    get: function() {
        if (chameleon.calls.active.length > 0) return chameleon.calls.active[chameleon.calls.active.length - 1].callState.state;
        else return "none";
    }
});

// shortcut the newest, most recent active call media path state
Object.defineProperty(chameleon, 'activeCallMediaPath', {
    get: function() {
        if (chameleon.calls.active.length > 0) return chameleon.calls.active[chameleon.calls.active.length - 1].mediaPath;
        else return "none";
    }
});

// shortcut the newest, most recent active call direction
Object.defineProperty(chameleon, 'activeCallDirection', {
    get: function() {
        if (chameleon.calls.active.length > 0) return chameleon.calls.active[chameleon.calls.active.length - 1].direction;
        else return "none";
    }
});

// shortcut the newest, most recent active callee
Object.defineProperty(chameleon, 'activeCallee', {
    get: function() {
        if (chameleon.calls.active.length > 0) return chameleon.calls.active[chameleon.calls.active.length - 1].callee;
        else return "none";
    }
});

// shortcut the newest, most recent active callee
Object.defineProperty(chameleon, 'activeCaller', {
    get: function() {
        if (chameleon.calls.active.length > 0) return chameleon.calls.active[chameleon.calls.active.length - 1].caller;
        else return "none";
    }
});

// shortcut the newest, most recent incoming caller
Object.defineProperty(chameleon, 'incomingCaller', {
    get: function() {
        if (chameleon.calls.incoming.length > 0) return chameleon.calls.incoming[chameleon.calls.incoming.length - 1].caller;
        else return "none";
    }
});


// shortcut the newest, most recent incoming callee
Object.defineProperty(chameleon, 'incomingCallee', {
    get: function() {
        if (chameleon.calls.incoming.length > 0) return chameleon.calls.incoming[chameleon.calls.incoming.length - 1].callee;
        else return "none";
    }
});

// shortcut the newest, most recent outgoing caller
Object.defineProperty(chameleon, 'outgoingCaller', {
    get: function() {
        if (chameleon.calls.outgoing.length > 0) return chameleon.calls.outgoing[chameleon.calls.outgoing.length - 1].caller;
        else return "none";
    }
});


// shortcut the newest, most recent outgoing callee
Object.defineProperty(chameleon, 'outgoingCallee', {
    get: function() {
        if (chameleon.calls.outgoing.length > 0) return chameleon.calls.outgoing[chameleon.calls.outgoing.length - 1].callee;
        else return "none";
    }
});

// shortcut for the Active call video state
Object.defineProperty(chameleon, 'activeCallVideo', {
    get: function() {
        if (chameleon.calls.active.length > 0) return chameleon.calls.active[chameleon.calls.active.length - 1].getCallConfig().videoConfig;
        else return "none";
    }
});

// shortcut for the Active call video state
Object.defineProperty(chameleon, 'activeCallAudio', {
    get: function() {
        if (chameleon.calls.active.length > 0) return chameleon.calls.active[chameleon.calls.active.length - 1].getCallConfig().audioConfig;
        else return "none";
    }
});

// shortcut for the Active call data state
Object.defineProperty(chameleon, 'activeCallDC', {
    get: function() {
        if (chameleon.calls.active.length > 0 && chameleon.calls.active[chameleon.calls.active.length - 1].dataChannels.length > 0) {
            
            var state = chameleon.calls.active[chameleon.calls.active.length - 1].dataChannels[0].getState();
            if (state == "open") return "OPEN"
            else if (state == "closed") return "CLOSED"
            else if (state == "none") return "NONE"
            else if (state == "connecting") return "CONNECTING"
            else return state;
        }
        else return "none";
    }
});

Object.defineProperty(chameleon, 'isRecordingMode', {
    get : function() {
        if (chameleon.calls.active.length > 0){
           chameleon.log(chameleon.calls.active.length);
           chameleon.log(chameleon.calls.active[chameleon.calls.active.length - 1]);
              return chameleon.calls.active[chameleon.calls.active.length - 1].isRecordingMode;  }
        else false;
    },
    set : function(state) {
        if (chameleon.calls.active.length > 0){
            chameleon.calls.active[chameleon.calls.active.length - 1].isRecordingMode = state;
        }
    }
});


Object.defineProperty(chameleon, 'isScreenSharingMode', {
    get : function() {
        if (chameleon.calls.active.length > 0){ 
           chameleon.log(chameleon.calls.active.length);
           chameleon.log(chameleon.calls.active[chameleon.calls.active.length - 1]);
              return chameleon.calls.active[chameleon.calls.active.length - 1].screenSharingMode;  }
        else false;
    },
    set : function(state) {      
        if (chameleon.calls.active.length > 0){
            chameleon.calls.active[chameleon.calls.active.length - 1].screenSharingMode = state;
        }
    }
});

Object.defineProperty(chameleon, 'isdidToggleScreenSharingMode', {
    get : function() {
        if (chameleon.calls.active.length > 0) 
              return chameleon.calls.active[chameleon.calls.active.length - 1].didToggleScreenSharingMode;
        else false;
    },
    set : function(state) {      
        if (chameleon.calls.active.length > 0){
            chameleon.calls.active[chameleon.calls.active.length - 1].didToggleScreenSharingMode = state;
        }
    }
});

Object.defineProperty(chameleon, 'isExtensionInstalled', {
    get : function() {
        return this._extensionInstalled;
    },
    set : function(state) {      
        this._extensionInstalled = state;
    },
    _extensionInstalled : false
});

/**==========================================
 *  
 * 
 * 
 * 
 * 
 *        chameleon Object Methods
 * 
 * 
 * 
 * 
 * 
   ========================================== */
   
/**==================Initialize================ 


This takes in a configuration object, and starts 
a session with a WSC. It will attempt to register
a SIP user, and set up event handlers for calls,
session state changes, etc. 

   ========================================== */

chameleon.bootstrap = function(configuration, $scope) {
    
    var self = this;
    chameleon.log(self);
    if (!configuration) {
        chameleon.log("Error...need to pass a configuration object.");
        return;
    }
    
// do some checking to see that we have good configuration
    if (typeof(configuration.sipUser) == 'undefined' || typeof(configuration.wscUri) == 'undefined' ) {
        chameleon.log("Init Error: Improper configuration obj provided. " + configuration);
        return;
    }
    
    chameleon.configuration = configuration;
    chameleon.$scope = $scope;
// Add a method to the scope to safely apply model updates
    $scope.safeApply = function(fn) {
        var phase = this.$root.$$phase;
        if(phase == '$apply' || phase == '$digest') {
            if(fn && (typeof(fn) === 'function')) {
            fn();
        }
        } else {
            this.$apply(fn);
        }
    };
    
    chameleon.updateAngular = function() { $scope.safeApply() };
    
    if (configuration.callbacks && configuration.callbacks.onIncomingData){
        chameleon.callbacks.onIncomingData = configuration.callbacks.onIncomingData;
    }
    
    self.signallingStateId = 3;
    chameleon.log("Configuration loaded");

// config is good...lets start the WSC session
    startWscSession(configuration);
    
// initialize the state variables
    self.isIncomingCall = false;
    self.isOutgoingCall = false;
    self.isActiveCall = false;
    self.isReconnecting = false;
// function to start the WSC session
    function startWscSession(configuration){
        chameleon.log("starting session with WSC");
// create the session object
        var sessionId = sessionStorage.getItem("sessionId");
	if (sessionId) {
		//alert("configuration.sipUser:"+configuration.sipUser+", configuration.wscUri:"+configuration.wscUri+", sessionId:"+sessionId)
		chameleon.wscSessionObj = new wsc.Session(configuration.sipUser, configuration.wscUri, onSuccess, onFailure, sessionId);
	}else{
		chameleon.wscSessionObj = new wsc.Session(configuration.sipUser, configuration.wscUri, onSuccess, onFailure);
	}
	
        chameleon.log(chameleon.wscSessionObj.sessionState);
// make the WSC session state available in our chameleon variable
       // chameleon.signallingState = chameleon.wscSessionObj.sessionState;
        
        var authHandler = new wsc.AuthHandler(chameleon.wscSessionObj);
        
//set up the auth handler
        authHandler.refresh =  function(authType, authHeaders) {
            authHeaders = chameleon.handlers.challengeHandler(authType, authHeaders);
            return authHeaders;
        };
        
// Create a CallPackage and an AuthHandler
        chameleon.log("creating call package");
        chameleon.wscCallPackage = new wsc.CallPackage(chameleon.wscSessionObj);
// Set up the Incoming call handler
        chameleon.log("Set up the Incoming call handler");
        chameleon.wscCallPackage.onIncomingCall = function(callObj, callConfig){

           chameleon.handlers.setupCallEvents(callObj);
           chameleon.log("Incoming call...calling handler");
           chameleon.handlers.incomingCall(callObj, callConfig);
        };

// Set up the OnResurrect handler
        chameleon.log("Set up the OnResurrect handler");
        chameleon.wscCallPackage.onResurrect = function(resurrectedCall) {
 		
	   //if (resurrectedCall.dataChannelConfig) {
	   //	  resurrectedCall.onDataTransfer = onDataTransfer;
	   //}
	   //resurrectedCall.dataChannels = [];
           chameleon.handlers.setupCallEvents(resurrectedCall);
				
           chameleon.log("Resurrect call...calling handler");
           chameleon.handlers.reConnecting(resurrectedCall);
           
           resurrectedCall.resume(function() {onResumeCallSuccess(resurrectedCall);}, onResumeCallFailed);

           function onResumeCallSuccess(resurrectedCall) {
					
                      chameleon.log("Resurrect onResumeCallSuccess");
									
                      var callState = resurrectedCall.getCallState().state;
                      if (callState == wsc.CALLSTATE.ESTABLISHED) {
                        chameleon.log("Call is established.");
                        resurrectedCall.startTime = new Date();

			//if(sessionStorage.getItem("direction") == "Incoming") resurrectedCall.direction = "Incoming";
			//if(sessionStorage.getItem("direction") == "Outgoing") resurrectedCall.direction = "Outgoing";
                
			//alert(resurrectedCall.dataChannels);
		        //resurrectedCall.dataChannels = [];
	                // Remove call from attempted array, and push to active array

//                        alert(chameleon.calls.active.length);
//                        WORKAROUND
                        if(chameleon.calls.active.length == 0)
                        chameleon.calls.active.push(resurrectedCall);
        
                        sessionStorage.setItem("audioMediaDirection", resurrectedCall.getCallConfig().audioConfig);
                        sessionStorage.setItem("videoMediaDirection", resurrectedCall.getCallConfig().videoConfig);
		
			chameleon.isReconnecting = false;
			resurrectedCall.mediaPath = "OPEN"
			chameleon.updateAngular();

                        //alert(chameleon.calls.active.length);
                      } 
	
                      if (callState == wsc.CALLSTATE.UPDATED) {
						  alert('test')
                        callUpdated(resurrectedCall);
                      }
           }

           function onResumeCallFailed() {
                      //TODO setStatus("Failed to resume call.");
           }
        }		
		
		
        function onSuccess() {
            
            chameleon.log("WSC web session successfully started.");
            chameleon.log(chameleon.wscSessionObj);
            chameleon.log(chameleon);
// Set handler for state changes
            chameleon.wscSessionObj.onSessionStateChange = function(newState){
                chameleon.handlers.sessionStateChange(newState);
            };

            sessionStorage.setItem("sessionId", chameleon.wscSessionObj.getSessionId());
			
            chameleon.signallingStateId = 4;
            chameleon.updateAngular();
            
            chameleon.log("sessionSuccessCallback provided is:  " + typeof chameleon.configuration.callbacks.sessionSuccessCallback);
            if (typeof chameleon.configuration.callbacks.sessionSuccessCallback === "function") {
                chameleon.log("got a success callback...executing it.");
                chameleon.configuration.callbacks.sessionSuccessCallback();
            }
            
        }
        
        function onFailure(err) {
            chameleon.log("WSC web session failed to start.");
            chameleon.log(err.reason);
            chameleon.signallingError = err;
            self.signallingStateId = 1;
            chameleon.updateAngular();
        }
    }
};

/**==========================================
 *  Shuts down the connection to a WSC
   ========================================== */

chameleon.closeSession = function(){
    if (!this.wscSessionObj || this.wscSessionObj == {}) {
        chameleon.log("session object not set");
        chameleon.log(this.wscSessionObj);
        return;
    }
    if (this.signallingStateId < 3) return chameleon.log("session already closed");
    
    else {
        this.wscSessionObj.close();
    
    // clear the call arrays
        chameleon.calls.active = [];
        chameleon.calls.incoming = [];
        chameleon.calls.outgoing = [];
        
    // initialize the state variables
        chameleon.isIncomingCall = false;
        chameleon.isOutgoingCall = false;
        chameleon.isActiveCall = false;
        chameleon.isReconnecting = false; 
    }
    this.signallingStateId = 2;
};

/**==========================================
 *  Shuts down connection to WSC and resets
 *  object state.
   ========================================== */

chameleon.initialize = function(){
    this.wscSessionObj.close();
    chameleon.log("Initializing...");
    
    this.signallingStateId = 0;
    this.configuration = null;
    this.signallingState = "None";
    this.signallingError = null;
    this.wscSessionObj = {};
    
};

/**==========================================
 *  When chameleon has an incoming call, this
 *  answers the call.
   ========================================== */

chameleon.acceptIncomingCall = function(callObj){

    chameleon.log("accepting a call.");
    
    if (callObj) {
        chameleon.log("acceptAttemptedCall called with a callObject: " + callObj);
    } else {
        chameleon.log("acceptAttemptedCall called without a callObject...using most recent");
        callObj = chameleon.calls.incoming[0];
        
    }
    chameleon.calls.active.push(callObj);
    
    if (callObj.direction == "Incoming") chameleon.calls.incoming.splice(chameleon.calls.incoming.indexOf(callObj), 1);
    if (callObj.direction == "Outgoing") chameleon.calls.outgoing.splice(chameleon.calls.outgoing.indexOf(callObj), 1);
  

//    callObj.accept(callObj.callConfig);

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia; 
    
    constraints = {
      audio : callObj.callConfig.shouldSendAudio(),
      video : callObj.callConfig.shouldSendVideo()
    }; 

    navigator.getUserMedia(constraints, onCapture, onCaptureError);
  
    
    function onCapture(stream) {
		
	/*var microphone = theAudioContext.createMediaStreamSource(stream);
        
        var analyser = theAudioContext.createAnalyser();
        var mixedOutput = theAudioContext.createMediaStreamDestination();
        microphone.connect(analyser);
        analyser.connect(mixedOutput);
        backgroundMusic.connect(mixedOutput);
          
        chameleon.log(stream);
	var audioT=	stream.getAudioTracks()
	stream.removeTrack(audioT[0]);
	var audioT2 = mixedOutput.stream.getAudioTracks();
        stream.addTrack(audioT2[0]);
	*/

        var mixedOutput = theAudioContext.createMediaStreamDestination();
        backgroundMusic.connect(mixedOutput);

        var audioT2 = mixedOutput.stream.getAudioTracks();
        stream.addTrack(audioT2[0]);

	callObj.accept(callObj.callConfig, [stream]);
    }

    function onCaptureError(error) {
      chameleon.log("on capture error: " + error.name + " Msg: " + error.message + " ConstraintName : " + error.constraintName);
    } 
    return;
};

/**==========================================
 *  When chameleon has an incoming call, this
 *  rejects the call.
   ========================================== */

chameleon.rejectIncomingCall = function(callObj){
    
    chameleon.log("rejecting an incoming call.");
    
    if (callObj) {
        chameleon.log("rejectIncomingCall called with a callObject: " + callObj);
    } else {
        chameleon.log("rejectIncomingCall called without a callObject...using most recent");
        callObj = chameleon.calls.incoming[0];
    }
    
    chameleon.log("Declining the call.");
    callObj.terminator = "I declined the call";
    chameleon.calls.incoming.splice(chameleon.calls.incoming.indexOf(callObj), 1);
    callObj.decline(603);

};

/**==========================================
 *  When chameleon has an outgoing call, this
 *  cancels the call.
   ========================================== */
 
chameleon.cancelOutgoingCall = function(callObj){
    
    chameleon.log("cancelling an outgoing call.");
    
    if (callObj) {
        chameleon.log("rejectIncomingCall called with a callObject: " + callObj);
    } else {
        chameleon.log("rejectIncomingCall called without a callObject...using most recent");
        callObj = chameleon.calls.outgoing[0];
    }
    
    chameleon.log("Cancelling the call.");
    callObj.terminator = "I cancelled the call";
    chameleon.calls.outgoing.splice(chameleon.calls.outgoing.indexOf(callObj), 1);
    callObj.end();

};


/**==========================================
 *  When chameleon has an active call, this
 *  hangs up the call.
   ========================================== */

chameleon.endActiveCall = function(callObj){
    
    chameleon.log("hanging up the call");
    
    if (callObj) {
        chameleon.log("endActiveCall called with a callObject: " + callObj);

    } else {
        chameleon.log("endActiveCall called without a callObject...using most recent");
        callObj = chameleon.calls.active[0];
    }
    
    chameleon.log("Hanging up the call.");
    callObj.terminator = "I hung up";
    callObj.end();

};

/**==========================================
 *  This sets up a new call.
   ========================================== */
   
chameleon.makeCall = function(callee, options, localMediaStream){
    if(!callee) return chameleon.log("Need to specify a callee to make a call");
    if(chameleon.signallingStateId != 4) return chameleon.log("Not connected to WSC...can't make a call");
    var callConfig;
    var audioMediaDirection;
    var videoMediaDirection;
    var dcConfig = null;
    
    if(!options){
        audioMediaDirection = wsc.MEDIADIRECTION.SENDRECV;
        videoMediaDirection = wsc.MEDIADIRECTION.NONE;
    }
    else if ((options.audio === false ||  options.audio == "NONE" || !options.audio) && (options.video === false || options.video === "NONE" || !options.video) && !options.data) {
        chameleon.log("ERROR: at least one media type must be used");
        return
        
    } else if (options) {
        
// test and set up audio config       
        if (options.audio === true) {
            audioMediaDirection = wsc.MEDIADIRECTION.SENDRECV
        } else if (options.audio === false) {
            audioMediaDirection = wsc.MEDIADIRECTION.NONE;
        } else if (options.audio == "NONE" || options.audio == "SENDONLY" || options.audio == "RECVONLY" || options.audio == "SENDRECV") { 
            audioMediaDirection = options.audio;
        } else {
            chameleon.log("ERROR: Invalid Audio Config");
            return
        }
// test and set up video config        
        if (options.video === true) {
            videoMediaDirection = wsc.MEDIADIRECTION.SENDRECV;
        } else if (options.video === false) {
            videoMediaDirection = wsc.MEDIADIRECTION.NONE;
        } else if (options.video == "NONE" || options.video == "SENDONLY" || options.video == "RECVONLY" || options.video == "SENDRECV") {
            videoMediaDirection = options.video;
        } else {
            chameleon.log("ERROR: Invalid Video Config");
            return;
        }


        if (options.dcConfig && options.data === true) {
// test to make sure dcConfig is an array
            if (Object.prototype.toString.call(options.dcConfig) !== '[object Array]') {
                chameleon.log("ERROR: Received dcConfig that is not an array");
                return;
            };
// test to make sure dcConfig has the required properties
            for (var i = 0; i < options.dcConfig.length; i++) { 
                if (!options.dcConfig[i].label || !options.dcConfig[i].reliable) {
                    chameleon.log('ERROR: dtConfig at index ' + i + ' does not have required properties. Need "label" and "reliable".');
                    return
                }
            }
// all should be well...assign the data channels config
            dcConfig = options.dcConfig;
        }
    }
    
// create the WSC callConfig
    if (dcConfig !== null && options.data === true) callConfig = new wsc.CallConfig(audioMediaDirection, videoMediaDirection, dcConfig);
    else callConfig = new wsc.CallConfig(audioMediaDirection, videoMediaDirection);
    
    chameleon.log("Making a call to " + callee);
    var newCallObj = chameleon.wscCallPackage.createCall(callee, callConfig, doCallError);
    
    newCallObj.direction = "Outgoing";
    newCallObj.dataChannels = [];
    sessionStorage.setItem("direction","Outgoing");   
    chameleon.handlers.setupCallEvents(newCallObj);
    
    
    chameleon.calls.outgoing.push(newCallObj);
    chameleon.calls.all.push(newCallObj);
   


    if (localMediaStream) {
        chameleon.log("Making call with provided localMediaStream");
        newCallObj.start([localMediaStream]);
    } else {
        newCallObj.start();
    }
    
    chameleon.isOutgoingCall = true;
    
    function doCallError(error, newCallObj){
        chameleon.log("WSC Error...sending to outbound Call Error handler.");
        chameleon.handlers.callError(error);
    }
    
};

//share start
/*Registering screen sharing extension. */
window.addEventListener('message', function (event) {
        if (event.origin != window.location.origin) return;


        // content-script will send a 'OCWSC_PING' msg if extension is installed
        if (event.data.type && (event.data.type === 'OCWSC_PING')) {
            chameleon.isExtensionInstalled = true;
        }

        if(!chameleon.isExtensionInstalled) {
            alert("Screen sharing plugin is not installed");
        }

        // user chose a stream
        if (event.data.type && (event.data.type === 'OCWSC_DIALOG_SUCCESS')) {
            chameleon.screenShare(event.data.streamId);
        }

        // user clicked on 'cancel' in choose media dialog
        if (event.data.type && (event.data.type === 'OCWSC_DIALOG_CANCEL')) {
            chameleon.isdidToggleScreenSharingMode = false;
            chameleon.isScreenSharingMode = !chameleon.isScreenSharingMode;
            console.log('User cancelled!');
        }
});
//share end 	 

    /**
     * Creates a local video stream (local webcam).
     * @param onLocalMediaSuccess(stream,url) - Callback for successful video stream creation
     * @param onLocalMediaError(error) - Callback for error in video stream creation
     */
 chameleon.getLocalVideoStream = function(onLocalMediaSuccess, onLocalMediaError, streamId) {

        var onSuccessStream = function(localMediaStream) {
            localVideoStream = localMediaStream;
			
			onLocalMediaSuccess(localMediaStream);			
        };

        // Lazy initiation - if already have a local video stream, return it.
        if (chameleon.isdidToggleScreenSharingMode) {
            // if we toggled the screen sharing mode - we need a new local video stream - hence we avoid using the cached stream
            chameleon.isdidToggleScreenSharingMode = false;
        }
        else {
            // if we didn't toggle the screen sharing mode - we can use the cached stream
            if (localVideoStream) {
                console.log("Already have local webcam");
                onSuccessStream(localVideoStream);
                return;
            }
        }

        var mediaOptions = {
            audio : true,
            video : true,
            data  : true,
            dcConfig : [{"label":"chameleonDataChannel", "reliable" : true }]
        };

        if (chameleon.isScreenSharingMode && streamId) {
            console.log("Screen share on..."+streamId);
            mediaOptions = {
                audio: false,
                video: {
                    mandatory: {
                        chromeMediaSource: 'desktop',
                        chromeMediaSourceId: streamId,
                        maxWidth: 1280,
                        maxHeight: 720
                    },
                    optional: []
                },
                data  : true,
                dcConfig : [{"label":"chameleonDataChannel", "reliable" : true }]				
            };
        }else if (chameleon.isScreenSharingMode && navigator.mozGetUserMedia){
            mediaOptions = {
                audio: false,
                video: {
                    mozMediaSource: 'window',
                    mediaSource: 'window',
                    maxWidth: 1920,
                    maxHeight: 1080,
                    minAspectRatio: 1.77
                },
                data  : true,
                dcConfig : [{"label":"chameleonDataChannel", "reliable" : true }]
            };
        }

        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;


        console.log("Retrieving local webcam by getUserMedia()"+JSON.stringify(mediaOptions));
        navigator.getUserMedia(mediaOptions, onSuccessStream, onLocalMediaError);
    };

chameleon.screenShare = function(streamId) {

        function updateMyVideo(stream, localMediaStreamUrl) {

            /*var videoElement = document.getElementById('selfVideo');
            videoElement.src = URL.createObjectURL(stream);
            videoElement.play();
			*/

            attachMediaStream(document.getElementById(chameleon.configuration.localVideoId), stream);
			
            var callObj = chameleon.calls.active[chameleon.calls.active.length - 1];			
            var pc = callObj.getPeerConnection();

            if(!navigator.mozGetUserMedia){			
            var streams = pc.getLocalStreams();
            for (var streamL of streams) {
                 var audioT = streamL.getAudioTracks();
                 stream.addTrack(audioT[0]);
            }

            }
								
            callObj.update(callObj.getCallConfig(),[stream]);


            stream.getVideoTracks()[0].onended = function () {

                if (chameleon.isScreenSharingMode) {
                     chameleon.toggleSharing();
                }            
             };

            /*stream.onended = function() {
		alert("stream ended");

                if (chameleon.isScreenSharingMode) {
                    // in case user used the chrome stop sharing panel in order
                    // to
                    // stop screen sharing. We will get an event here and we
                    // toggle
                    // back to self view.
                    chameleon.screenShare();
                }
            };*/
        }
        function onLocalSharingStreamError(error) {
            console.log("On local desktop sharing fail");
        }

        // Refetch the local stream (now it is desktop sharing),
        // upon success, notify to other peer, that my stream changed
        //wscConference.screenShare();
        chameleon.getLocalVideoStream(updateMyVideo,
            onLocalSharingStreamError, streamId);
///        roomId = getParameterValue("room");
    }

chameleon.toggleSharing = function(){
	console.log(chameleon.isScreenSharingMode);
    
    chameleon.isdidToggleScreenSharingMode = true;

    if (navigator.mozGetUserMedia) {
         chameleon.isScreenSharingMode = !chameleon.isScreenSharingMode;
         chameleon.screenShare(); 
    } else if (navigator.webkitGetUserMedia) {
         if(!chameleon.isScreenSharingMode) {
            //this will trigger the plugin, to receive call back to share screen share pop-up.
            window.postMessage({ type: 'OCWSC_REQUEST', text: 'start' }, '*');
         } else {
            chameleon.screenShare();
         }
         chameleon.isScreenSharingMode = !chameleon.isScreenSharingMode;
    }
    
}

chameleon.toggleRecording  = function() {

    if(!chameleon.isRecordingMode) {

     try {

      var peerconnection = chameleon.calls.active[0].getPeerConnection();
      if (peerconnection == null) {
          console.error("FUCK!");
          return;
      }

     if (navigator.mozGetUserMedia) {
        var options = {
           mimeType: 'video/webm', // or video/mp4 or audio/ogg
           bitsPerSecond: 720000
        };

        mediaRecorder = new MediaRecorder(peerconnection.getLocalStreams()[0],options /* , 'video/vp8' */);

     }else{
        mediaRecorder = new MediaRecorder(peerconnection.getLocalStreams()[0] /* , 'video/vp8' */);
     }

      mediaRecorder.blobData = [];

     } catch (event) {
       alert('MediaRecorder is not supported by this browser.\n\n' +
      'Try Firefox 29 or later, or Chrome 47 or later, with Enable experimental Web Platform features enabled from chrome://flags.');
      console.error('Exception while creating MediaRecorder:');
      return;
     }

     mediaRecorder.onstop = handleStop;
     mediaRecorder.ondataavailable = handleDataAvailable;
     mediaRecorder.start();

    } else {
     mediaRecorder.stop();
     //recordedVideo.controls = true;
     console.log('Recorded Blobs: '+ mediaRecorder.blobData);
    }

    chameleon.isRecordingMode = !chameleon.isRecordingMode;
    chameleon.updateAngular();
}

function handleStop(event) {
  console.log('Recorder stopped: '+event);
  var superBuffer = new Blob(mediaRecorder.blobData);
 
  attachSrcObject(document.getElementById(chameleon.configuration.recordedVideoId),superBuffer);
}

function handleDataAvailable(event) {
  if (event.data.size > 0) {
    mediaRecorder.blobData.push(event.data);
    console.log('Yeahhhh');
  } else {
   console.log('FUCK2'); 
 }
}






/**==========================================
 *  
 *  
 * 
 * 
 * 
 *  Event handlers
 * 
 * 
 * 
 * 
 * 
   ========================================== */
   
/**===============auth Handler============== */
 chameleon.handlers.challengeHandler = function(authType, authHeaders){
    chameleon.log("Auth challenge: " + authType);
    chameleon.log("Challenge headers: ");
    chameleon.log(authHeaders);
    chameleon.log(chameleon.wscSessionObj.sessionState);
        
//Set up the response object by calling a function.
    var authInfo = null;
    chameleon.updateAngular();
    
    if(authType==wsc.AUTHTYPE.SERVICE){
        authInfo = getSipAuth(authHeaders);
    } else if(authType==wsc.AUTHTYPE.TURN){
        chameleon.log("TURN Auth Handler called.");
        
       var config = {
   "iceServers":[
      {
         "url":"stun:10.174.82.10:3478"
      },
      {
         "url":"turn:10.174.82.10:3478",
         "credential":"TurnPassword",
         "username":"TurnUser"
      }
   ]
}
        authInfo = config;
        
        return authInfo;
    }
    
    chameleon.log("Returning authInfo: " + JSON.stringify(authInfo));
    return authInfo;
    
    function getSipAuth(authHeaders) {
        chameleon.log("getting SIP auth headers");
        var authInfo;
        if (chameleon.configuration.sipPassword != null) {
            chameleon.log("generating local auth response");
            authInfo = localAuthGenerator(authHeaders);
        }
        return authInfo;
        
        // function to create auth response
        function localAuthGenerator(authHeaders){
            chameleon.log("local auth generation start");
            var ha1String = chameleon.configuration.sipUsername + ":" + authHeaders.realm + ":" + chameleon.configuration.sipPassword,
                ha1 = CryptoJS.MD5(ha1String).toString(CryptoJS.enc.Hex);
            //authHeaders.username = chameleon.sipUsername;
            authHeaders.ha1 = ha1;
            //authHeaders.opaque = '"auth"';
            return authHeaders;
        }
    }
 };
 
/**===============set up call event handlers============== */
chameleon.handlers.setupCallEvents = function(callObj){
// set up event handlers for the provided callObj
    chameleon.log("setting call event Handlers");
    
    
// set the ice check timer

    
    chameleon.log("Current ICE Timer is: " + callObj.getIceCheckInterval());
    
    if (typeof chameleon.configuration.iceTimer === "number") {
        callObj.setIceCheckInterval(chameleon.configuration.iceTimer);
        chameleon.log("Now ICE Timer is: "  + callObj.getIceCheckInterval());
    };
    
    
// onCallStateChange event
    callObj.onCallStateChange = function(newState){
        chameleon.handlers.callStateChange(callObj, newState);
    };

// onMediaStreamEvent event
    callObj.onMediaStreamEvent = chameleon.handlers.mediaStreamEventHandler;
    
// onDataTransfer event
    callObj.onDataTransfer = function(dataTransfer) {
        chameleon.handlers.dataEventHandler(callObj, dataTransfer);
    };
    
// onMessage

// onUpdate

    callObj.onUpdate = function(newCallConfig){
        chameleon.log ("got a call update request...new callConfig is: " + JSON.stringify(newCallConfig));
        chameleon.log("accepting the update.");
        callObj.accept(newCallConfig);
    };
};


/**===============Incoming call Handler============== */
chameleon.handlers.incomingCall = function(callObj, callConfig){
    chameleon.log("Incoming call handler invoked");
    callObj.direction = "Incoming";
    callObj.dataChannels = [];

    sessionStorage.setItem("direction","Incoming");
    chameleon.calls.all.push(callObj);
    chameleon.calls.incoming.push(callObj);
    chameleon.isIncomingCall = true;
    chameleon.updateAngular();
};

/**===============Reconnecting call Handler============== */
chameleon.handlers.reConnecting = function(callObj){
   
   if (callObj.dataChannelConfig) {
       callObj.onDataTransfer = onDataTransfer;
   }
   callObj.dataChannels = []; 
      
   if(sessionStorage.getItem("direction") == "Incoming") callObj.direction = "Incoming";

   if(sessionStorage.getItem("direction") == "Outgoing"){ 
    callObj.direction = "Outgoing";
    chameleon.isReconnecting = true;
    chameleon.updateAngular();
   }
}

chameleon.handlers.callError = function(err){
    chameleon.log("Error...something went wrong with the call: " + err.reason.name);
    chameleon.log(JSON.stringify(err));

    var callState = callObj.getCallState();
    
    chameleon.log("Call state is:  " + JSON.stringify(callState));
    
    if (callState.state == "NONE" || callState.state == "FAILED" || callState.state == "ERROR" || callState.state == "ENDED") {
        chameleon.log("call is " + callState.state + ". Doing nothing.");
    } else if (callState.state == "RESPONDED" || callState.state == "ESTABLISHED" || callState.state == "UPDATED") {
        chameleon.log("call is " + callState.state + ". Ending call.");
        callObj.end();
    } else if (callState.state == "UPDATING") {
        chameleon.log("call is " + callState.state + ". Rejecting Update.");
        callObj.decline(488);
    } else if (callState.state == "UPDATE_FAILED") {
        chameleon.log("call is " + callState.state + ". Resume session at previous state.");
    } else {
        chameleon.log("call is " + callState.state + ". This state is unhandled, so doing nothing.");
    }
};


/**===============callStateChangeHandler============== */
chameleon.handlers.callStateChange = function(callObj, newCallState){
    chameleon.log("CALL STATE CHANGE. " + JSON.stringify(newCallState));
    if (newCallState.state == wsc.CALLSTATE.STARTED) {
        
    // Create a object property to indicate media state
        callObj.mediaPath = "NONE"
        
        //chameleon.log(pc.getStats());
        chameleon.log(pc.getLocalStreams());
        chameleon.log(pc.getRemoteStreams());
    }
    
    if (newCallState.state == wsc.CALLSTATE.ESTABLISHED) {
        chameleon.log("Call is established.");
        callObj.startTime = new Date();
        // Remove call from attempted array, and push to active array
        
        if (callObj.direction == 'Outgoing') {
            //alert(chameleon.calls.active.length);

            chameleon.calls.active.push(callObj);
            chameleon.calls.outgoing.splice(chameleon.calls.outgoing.indexOf(callObj), 1);
        }
        
    // Wire up handler for once call is started, to grab the peerConnection associated with the call
        var pc = callObj.getPeerConnection();
        chameleon.log("Call started, getting peerConnection");
        chameleon.log(pc);
        
    // Set call object media path state per current iceConnectionState
        switch(pc.iceConnectionState) {
            case "new" :
                callObj.mediaPath = "NEW";
                break;
            case "checking" :
                callObj.mediaPath = "CHECKING";
                break;
            case "connected" :
                callObj.mediaPath = "OPEN";
                break;
            case "completed" :
                callObj.mediaPath = "OPEN";
                break;
            case "disconnected" :
                callObj.mediaPath = "CLOSED";
                break;
            case "failed" :
                callObj.mediaPath = "FAILED";
                break;
            case "closed" :
                callObj.mediaPath = "CLOSED";
                break;
            default :
                callObj.mediaPath = "UNKNOWN";
                break;
        }
        
    // Set up handler for ICE state changes
        pc.oniceconnectionstatechange = function(event) {
            chameleon.log("Ice state change! New state is: " + event.target.iceConnectionState);
            chameleon.log(event);
            switch(event.target.iceConnectionState) {
                case "new" :
                    callObj.mediaPath = "NEW";
                    break;
                case "checking" :
                    callObj.mediaPath = "CHECKING";
                    break;
                case "connected" :
                    callObj.mediaPath = "OPEN";
                    break;
                case "completed" :
                    callObj.mediaPath = "OPEN";
                    break;
                case "disconnected" :
                    callObj.mediaPath = "CLOSED";
                    break;
                case "failed" :
                    callObj.mediaPath = "FAILED";
                    break;
                case "closed" :
                    callObj.mediaPath = "CLOSED";
                    break;
                default :
                    callObj.mediaPath = "UNKNOWN";
                    break;
            };
            chameleon.updateAngular();
        }
        
        
    sessionStorage.setItem("audioMediaDirection", callObj.getCallConfig().audioConfig);
	sessionStorage.setItem("videoMediaDirection", callObj.getCallConfig().videoConfig);
    } else if (newCallState.state == wsc.CALLSTATE.UPDATED) {    
        chameleon.log("TODO: newCallState.state == wsc.CALLSTATE.UPDATED");    
		 
		     // Wire up handler for once call is started, to grab the peerConnection associated with the call
        var pc = callObj.getPeerConnection();
        chameleon.log("Call updated, getting peerConnection");
        chameleon.log(pc);
        
    // Set call object media path state per current iceConnectionState
        switch(pc.iceConnectionState) {
            case "new" :
                callObj.mediaPath = "NEW";
                break;
            case "checking" :
                callObj.mediaPath = "CHECKING";
                break;
            case "connected" :
                callObj.mediaPath = "OPEN";
                break;
            case "completed" :
                callObj.mediaPath = "OPEN";
                break;
            case "disconnected" :
                callObj.mediaPath = "CLOSED";
                break;
            case "failed" :
                callObj.mediaPath = "FAILED";
                break;
            case "closed" :
                callObj.mediaPath = "CLOSED";
                break;
            default :
                callObj.mediaPath = "UNKNOWN";
                break;
        }
        
    // Set up handler for ICE state changes
        pc.oniceconnectionstatechange = function(event) {
            chameleon.log("Ice state change! New state is: " + event.target.iceConnectionState);
            chameleon.log(event);
            switch(event.target.iceConnectionState) {
                case "new" :
                    callObj.mediaPath = "NEW";
                    break;
                case "checking" :
                    callObj.mediaPath = "CHECKING";
                    break;
                case "connected" :
                    callObj.mediaPath = "OPEN";
                    break;
                case "completed" :
                    callObj.mediaPath = "OPEN";
                    break;
                case "disconnected" :
                    callObj.mediaPath = "CLOSED";
                    break;
                case "failed" :
                    callObj.mediaPath = "FAILED";
                    break;
                case "closed" :
                    callObj.mediaPath = "CLOSED";
                    break;
                default :
                    callObj.mediaPath = "UNKNOWN";
                    break;
            };
            chameleon.updateAngular();
        } 

    } else if (newCallState.state == wsc.CALLSTATE.ENDED) {

        callObj.endTime = new Date();
        if (!callObj.startTime) callObj.startTime = callObj.endTime;
        chameleon.log("Setting call duration");
        var millisecondDuration = callObj.endTime.getTime() - callObj.startTime.getTime();
        callObj.duration = millisecondDuration;
        
        if (!callObj.terminator) {
            chameleon.log("Far end hung up");
            callObj.terminator = "Far end hung up";
        };
        
        chameleon.log("Removing object from active calls: ");
        chameleon.log(callObj);
        chameleon.calls.active.splice(chameleon.calls.active.indexOf(callObj), 1);
        chameleon.calls.incoming.splice(chameleon.calls.incoming.indexOf(callObj), 1);
        chameleon.calls.outgoing.splice(chameleon.calls.outgoing.indexOf(callObj), 1);

        //alert(chameleon.calls.active.length);

    } else if (newCallState.state == wsc.CALLSTATE.FAILED) {
        
        chameleon.log("Call Failure.");
        var err = callObj.getCallState();
        callObj.endTime = new Date();
        if (!callObj.startTime) callObj.startTime = callObj.endTime;
        millisecondDuration = callObj.endTime.getTime() - callObj.startTime.getTime();
        callObj.duration = millisecondDuration;
        callObj.terminator = err.status.code + " " + err.status.reason;
        chameleon.calls.active.splice(chameleon.calls.active.indexOf(callObj), 1);
        chameleon.calls.incoming.splice(chameleon.calls.incoming.indexOf(callObj), 1);
        chameleon.calls.outgoing.splice(chameleon.calls.outgoing.indexOf(callObj), 1);
    }
    
// Reset state boolean values, if needed
    chameleon.log("testing call states for cleanup");
    if (chameleon.calls.incoming.length === 0 && chameleon.isIncomingCall === true) {
        chameleon.log("Incoming call array is: " + chameleon.calls.incoming.length + " and isIncomingCall is " + chameleon.isIncomingCall + ". Setting isIncomingCall to false");
        chameleon.isIncomingCall = false;
    }
    if (chameleon.calls.outgoing.length === 0 && chameleon.isOutgoingCall === true) {
        chameleon.log("Outgoing call array is: " + chameleon.calls.outgoing.length + ". Setting isOutgoingCall to false");
        chameleon.isOutgoingCall = false;
    }
    if (chameleon.calls.active.length === 0 && chameleon.isActiveCall === true) {
        chameleon.log("Active call array is: " + chameleon.calls.active.length + ". Setting isActiveCall to false");
        chameleon.isActiveCall = false;
    }
    
    chameleon.updateAngular();
    
};

/**===============sessionStateChangeHandler============ */
chameleon.handlers.sessionStateChange = function(newSessionState){
    chameleon.log("SESSION STATE CHANGE.");
    switch (newSessionState) {
        case "CLOSED" :
            chameleon.signallingStateId = 2;
            break;
        default:
            chameleon.log("no change needed");
    }
    chameleon.updateAngular();
};


/**===============mediaEventHandler============== */
chameleon.handlers.mediaStreamEventHandler = function(mediaState, stream){
    chameleon.log("GOT MEDIA EVENT.");
    chameleon.log(mediaState);
    
    if (mediaState == wsc.MEDIASTREAMEVENT.LOCAL_STREAM_ADDED) {
        chameleon.log("Local Stream Added. Attaching to " + chameleon.configuration.localAudioId);
        //attachMediaStream(document.getElementById(chameleon.configuration.localAudioId), stream);
        attachMediaStream(document.getElementById(chameleon.configuration.localVideoId), stream);
   } else if (mediaState == wsc.MEDIASTREAMEVENT.REMOTE_STREAM_ADDED) {
        chameleon.log("Remote Stream Added. Attaching to " + chameleon.configuration.remoteAudioId);
        //attachMediaStream(document.getElementById(chameleon.configuration.remoteAudioId), stream);
        attachMediaStream(document.getElementById(chameleon.configuration.remoteVideoId), stream);
   }
};

/**===============dataEventHandler============== */
chameleon.handlers.dataEventHandler = function(callObj, dataTransfer) {
    chameleon.log("GOT DATA TRANSFER EVENT");
    chameleon.log(dataTransfer);
    
// set up the callObj DC callback
    callObj.dcIncomingCallback = function(event){
        if (chameleon.callbacks.onIncomingData) {
            chameleon.callbacks.onIncomingData(event);
        } else chameleon.log("Data callback not set...doing nothing.");
    }

// assign the dataTransfer handlers
    dataTransfer.onOpen = onDCOpen;
    dataTransfer.onError = onDCError;
    dataTransfer.onClose = onDCClose;
    
// add dataTransfer to array of dataTransfer objects
    callObj.dataChannels.push(dataTransfer);
    
// define dataTransfer handlers

    function onDCOpen() {
        chameleon.log("Data Channel is Open");
// set up data receiver and sender objects
        var receiver = dataTransfer.getReceiver();
        var sender = dataTransfer.getSender();
        
        if (receiver) {
            receiver.onMessage = function (event) {
                event.callIndex = chameleon.calls.all.indexOf(callObj);
                event.activeCallIndex = chameleon.calls.active.indexOf(callObj);
                chameleon.log("Received incoming data from call number " + event.callIndex + ", active call number " + event.activeCallIndex + "...calling callBack");
                callObj.dcIncomingCallback(event);
                chameleon.updateAngular();
            }
        }
        
        dataTransfer.sendData = function(data) {
            chameleon.log("Got data to send: " + data);
            if (sender) {
                sender.send(data);
                
            } else {
               console.log("sender is null");
            }
        }
            
        chameleon.updateAngular();
    }
    
    function onDCError() {
        chameleon.log("Data Channel got an error");
        chameleon.updateAngular();
    }
    
    function onDCClose() {
        chameleon.log("Data Channel is Closed");
        chameleon.updateAngular();
        
    }
}

/**===============messageEventHandler============== */


/**===============updateEventHandler============== */
chameleon.handlers.updateEventHandler = function(callObj, callConfig) {
    callObj.accept(callObj.callConfig);
}


/**==========================================
 *  Function for attaching 
 *  media streams, based on browser type
   ========================================== */
   
var attachMediaStream = {};

if (navigator.mozGetUserMedia) {
    chameleon.log("Attaching media stream");
    // Attach a media stream to an element.
    attachMediaStream = function(element, stream) {
        chameleon.log("Application using Mozilla browser");
        chameleon.log(stream);
        chameleon.log(stream.getVideoTracks());
        chameleon.log(stream.getAudioTracks());
        element.mozSrcObject = stream;
        element.play();
    };

    attachSrcObject = function(element, srcObject) {
        chameleon.log("Application using Mozilla browser");
//        element.mozSrcObject = srcObject;

        element.src = URL.createObjectURL(srcObject);
        element.play();
    };
    
} else if (navigator.webkitGetUserMedia) {
    chameleon.log("Application using Chrome browser");
    // Attach a media stream to an element.
    attachMediaStream = function(element, stream) {
        chameleon.log(stream);
        chameleon.log(stream.getVideoTracks());
        chameleon.log(stream.getAudioTracks());
        element.src = webkitURL.createObjectURL(stream);
    };

    attachSrcObject = function(element, srcObject) {
        element.src = webkitURL.createObjectURL(srcObject);
    };
} else {
    // The browser does not support media streams
    chameleon.log("Browser does not support media streams");
}



// A little clean-up
window.onunload = function(){
    //chameleon.closeSession();
};
