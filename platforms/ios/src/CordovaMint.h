#import <Cordova/CDV.h>

@interface CordovaMint : CDVPlugin

- (void) initAndStartSession:(CDVInvokedUrlCommand*)command;
- (void) logEvent:(CDVInvokedUrlCommand*)command;
- (void) flush:(CDVInvokedUrlCommand*)command;
- (void) logView:(CDVInvokedUrlCommand*)command;
- (void) javascriptError:(CDVInvokedUrlCommand*)command;
- (void) leaveBreadcrumb:(CDVInvokedUrlCommand*)command;
- (void) addExtraData:(CDVInvokedUrlCommand*)command;
- (void) clearExtraData:(CDVInvokedUrlCommand*)command;
- (void) closeSession:(CDVInvokedUrlCommand*)command;
- (void) startSession:(CDVInvokedUrlCommand*)command;

- (void) transactionStart:(CDVInvokedUrlCommand*)command;
- (void) transactionStop:(CDVInvokedUrlCommand*)command;
- (void) transactionCancel:(CDVInvokedUrlCommand*)command;

- (void) logNetwork:(CDVInvokedUrlCommand*)command;
- (void) setUserIdentifier:(CDVInvokedUrlCommand*)command;

@end
