# Splunk MINT Android & iOS SDK for Cordova
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FPanosJee%2Fsplunk-mint-cordova.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FPanosJee%2Fsplunk-mint-cordova?ref=badge_shield)


## This is an unofficial Cordova plugin for the Splunk MINT Android & iOS SDKs

### Installation

In your Cordova project directory run this command:
```
// Android
plugman install -platform android -project platforms/android -plugin com.splunk.mint --variable API_KEY=YOURAPIKEY

// iOS
plugman install -platform ios -project platforms/ios -plugin com.splunk.mint --variable API_KEY=YOURAPIKEY
```


### Congifuring symbolication for iOS
You can read more on how to upload dSYMs in case you want to symbolicate native crashes at [Splunk Docs](http://docs.splunk.com/Documentation/MintIOSSDK/latest/DevGuide/Configureyourprojectforsymbolication).

Now you can either run your app directly from Xcode/Android sutiod or exit out and run your app via the command line. In several minutes, you should be able to see data being reported in Splunk Enterprise.

### Functions
The following functions are available for custom logging & attribute setting. Please refer to Splunk Docs for further information. The functions available to the Cordova web view map one to one to the functions provided by the native SDKs.

+ Mint.addExtraData(key, value)
+ Mint.clearExtraData()
+ Mint.closeSession()
+ Mint.flush()
+ Mint.logEvent(eventName, options)
+ Mint.transactionStart(eventName, options)
+ Mint.transactionStop(eventName, options)
+ Mint.transactionCancel(eventName, options)
+ Mint.setUserIdentifier(userName)


##License

splunk-mint-cordova plugin is licensed under the Apache 2 License. http://www.apache.org/licenses/LICENSE-2.0.html

SplunkMint.framework (Splunk MINT SDK for iOS) & mint.jar (Splunk MINT SDK for Android) are Copyright (c) 2014 Splunk. All rights reserved. For license details see http://www.splunk.com/en_us/legal/terms/splunk-mint-terms-of-service.html


[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FPanosJee%2Fsplunk-mint-cordova.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FPanosJee%2Fsplunk-mint-cordova?ref=badge_large)