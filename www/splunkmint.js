// Copyright 2016 Splunk
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var SPLUNKMINT_VERSION = "v4.4.0";

var SplunkMint = function(){ 
    // remote settings should be stored here
    var config = {};

    var ApplyXMLHTTPRequestMonitor = function() {
        var open = XMLHttpRequest.prototype.open;
        var send = XMLHttpRequest.prototype.send;
        XMLHttpRequest.prototype.open = function(method, url, async, user, pass) {
            this._method = method;
            this._url = url;
            open.call(this, method, url, async, user, pass);
        };
        XMLHttpRequest.prototype.send = function(data) {
            var self = this;
            var startTime;
            var oldOnReadyStateChange;
            var method = this._method;
            var url = this._url;
            function onReadyStateChange() {
                if (self.readyState == 4) // complete
                {
                  var endTime = (new Date()).getTime();
                  var latency = endTime - startTime;
                  var networkPerfData = {
                    method: method,
                    url: url,
                    latency: latency.toString(),
                    httpStatusCode: self.status.toString(),
                    responseDataSize: self.responseText.length,
                  };
                  //console.log(networkPerfData)
                  mintBridge.logNetwork(networkPerfData.method, networkPerfData.url, networkPerfData.latency, networkPerfData.httpStatusCode, networkPerfData.responseDataSize);

                }
            }
            if (true){
                startTime = (new Date()).getTime();
                this.addEventListener("readystatechange", onReadyStateChange, false);
            }
            send.call(this, data);
        };
    };
    // Initialize monitors
    ApplyXMLHTTPRequestMonitor();

    var WindowLoadedCallback = function() {
        // Get referrer (previous screen)
        // Note won't work with logView
        var currentView = window.location.pathname;
        currentView = currentView.replace(/[A-F0-9]{8}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{12}/g, "*");
        // if preview view was empty then get previous view from referrer
        var host = window.location.host;
        var protocol = window.location.protocol;
        // If you want work with loadEventEnd, make sure to get it after the load event has ended.
        setTimeout(function(){
            // Performance metrics
            if (window.navigator.userAgent.indexOf("Android") == -1) {
                Mint.logView(currentView, {});
            } else {
                var pageLoadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
                var domainLookupTime = window.performance.timing.domainLookupEnd - window.performance.timing.domainLookupStart;
                var domProcessingTime = window.performance.timing.domComplete - window.performance.timing.domLoading;
                var serverTime = window.performance.timing.responseEnd - window.performance.timing.responseStart;

                mintBridge.logView(currentView, pageLoadTime, domainLookupTime, serverTime, domProcessingTime, host, null);
            }
        }, 100);
    };
    window.onload = WindowLoadedCallback;

    // Capture JS crashes
    var logException = window.TraceKit.report;
    logException.subscribe(function mintLogger(error){
        var handled = error.mode === 'stack' ? 'true' : 'false';
        var stacktrace = error.stack.map(function(s){ return s.func+"@"+s.url+":"+s.line }).join('\n');
        console.error("MINT: "+error.message+" at"+error.url);
        mintBridge.javascriptError(error.message, error.url, error.stack[0].line, stacktrace, handled);
    });


    function _format_extra_data(extraData){
        if ('userAgent' in window.navigator) {
            if (window.navigator.userAgent.indexOf("Android") == -1) {
                if (extraData===undefined || extraData===null) {
                    extraData = {};
                }
                return extraData;
            } else {
                if (typeof(extraData)=="object"){
                    return JSON.stringify(extraData)
                } else if (extraData===undefined || extraData===null) {
                    return '{}';
                } else {
                    return JSON.stringify({error:'Not a valid argument. Only JSON object allowed.'});
                }
            }
        } else {
            console.error('no user agent')
            return null;
        }
    }

    return {
        'logException': function(ex){
            logException(ex);
            return Mint;
        },
        'initAndStartSession': function(name){ 
            mintBridge.initAndStartSession(name);
            return Mint; 
        },
        'logEvent': function(ev, extraData){
            mintBridge.logEvent(ev, _format_extra_data(extraData));
            return Mint; 
        },
        'leaveBreadcrumb': function(name){ 
            mintBridge.leaveBreadcrumb(name);
            return Mint; 
        },
        'transactionStart': function(name, extraData){ 
            mintBridge.transactionStart(name, _format_extra_data(extraData));
            return Mint; 
        },
        'transactionStop': function(name, extraData){ 
            mintBridge.transactionStop(name, _format_extra_data(extraData));
            return Mint;
        },
        'transactionCancel': function(name, reason, extraData){
            mintBridge.transactionCancel(name, reason, _format_extra_data(extraData));
            return Mint; 
        },
        'addExtraData': function(k,v){ 
            mintBridge.addExtraData(k,v);
            return Mint; 
        },
        'clearExtraData': function(){ 
            mintBridge.clearExtraData();
            return Mint; 
        },
        'flush': function(){ 
            mintBridge.flush();
            return Mint; 
        },
        'startSession': function(){ 
            mintBridge.startSession();
            return Mint;
        },
        'closeSession': function(){ 
            mintBridge.closeSession();
            return Mint; 
        },
        'logView': function(name, extraData){
            mintBridge.logView(name, null, null, null, null, null, _format_extra_data(extraData));
            return Mint;
        },
        'setUserIdentifier': function(name){ 
            mintBridge.setUserIdentifier(name);
            return Mint; 
        }
    }
};

module.exports = SplunkMint();