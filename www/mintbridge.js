var exec = require('cordova/exec');
var success = function(msg){ console.info('MINT exec success: '+msg); }
var fail = function(msg){ console.log('MINT exec error: '+msg); }

window.mintBridge = {
    initAndStartSession: function(appkey){
        exec(success, fail, 'CordovaMint', 'initAndStartSession', appkey);
    },
    logEvent: function(name, extraJson){
        exec(success, fail, 'CordovaMint', 'logEvent', [name, extraJson]);
    },
    flush: function(){
        exec(success, fail, 'CordovaMint', 'flush', [null]);
    },
    logView: function(currentView, pageLoadTime, domainLookupTime, serverTime, domProcessingTime, host, smth){
        if (window.navigator.userAgent.indexOf("Android") == -1) {
                    exec(success, fail, 'CordovaMint', 'logView', [currentView,smth]);
               } else {
        exec(success, fail, 'CordovaMint', 'logView', [currentView, pageLoadTime, domainLookupTime, serverTime, domProcessingTime, host, smth]);
               }
    },
    javascriptError: function(message, url, line, stacktrace, handled){
        exec(success, fail, 'CordovaMint', 'javascriptError', [message, url, line, stacktrace, handled]);
    },
    leaveBreadcrumb: function(name){
        exec(success, fail, 'CordovaMint', 'leaveBreadcrumb', [name]);
    },
    addExtraData: function(key, value){
        exec(success, fail, 'CordovaMint', 'addExtraData', [key, value]);
    },
    clearExtraData: function(){
        exec(success, fail, 'CordovaMint', 'clearExtraData', [null]);
    },
    closeSession: function(){
        exec(success, fail, 'CordovaMint', 'closeSession', [null]);
    },
    setUserIdentifier: function(name){
        exec(success, fail, 'CordovaMint', 'setUserIdentifier', [name]);
    },
    transactionCancel: function(name, reason, jsonExtra){
        exec(success, fail, 'CordovaMint', 'transactionCancel', [name, reason, jsonExtra]);
    },
    transactionStart: function(name, jsonExtra){
        exec(success, fail, 'CordovaMint', 'transactionStart', [name, jsonExtra]);
    },
    transactionStop: function(name, jsonExtra){
        exec(success, fail, 'CordovaMint', 'transactionStop', [name, jsonExtra]);
    },
    logNetwork: function(method, url, latency, httpStatusCode, responseDataSize){
        exec(success, fail, 'CordovaMint', 'logNetwork', [method, url, latency, httpStatusCode, responseDataSize]);
    }
}