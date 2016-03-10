#import "CordovaMint.h"
#import <SplunkMint/SplunkMint.h>

@implementation CordovaMint

- (void)pluginInitialize {
    NSString *apikey = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"MINT_API_KEY"];
    [[MintWebViewJavaScriptBridge sharedInstance] callFunction:@"initAndStartSession" withArgs:apikey];
}


- (void) initAndStartSession:(CDVInvokedUrlCommand*)command {
    [self.commandDelegate runInBackground:^{
        [[MintWebViewJavaScriptBridge sharedInstance] callFunction:@"initAndStartSession" withArgs:command.arguments];
    }];
}
- (void) logEvent:(CDVInvokedUrlCommand*)command {
    
    [self.commandDelegate runInBackground:^{
         [[MintWebViewJavaScriptBridge sharedInstance] callFunction:@"logEventAsyncWithTag:completionBlock" withArgs:command.arguments];
    }];
}

- (void) setUserIdentifier:(CDVInvokedUrlCommand*)command {
    [self.commandDelegate runInBackground:^{
        [[MintWebViewJavaScriptBridge sharedInstance] callFunction:@"userIdentifier" withArgs:[command.arguments objectAtIndex:0]];
    }];
    

}

- (void) flush:(CDVInvokedUrlCommand*)command {
    
    [[MintWebViewJavaScriptBridge sharedInstance] callFunction:@"flushAsyncWithBlock" withArgs:command.arguments];
}

- (void) closeSession:(CDVInvokedUrlCommand*)command {
    [self.commandDelegate runInBackground:^{
        [[MintWebViewJavaScriptBridge sharedInstance] callFunction:@"startSessionAsyncWithCompletionBlock" withArgs:nil];
    }];
}
- (void) startSession:(CDVInvokedUrlCommand*)command {
    [self.commandDelegate runInBackground:^{
        [[MintWebViewJavaScriptBridge sharedInstance] callFunction:@"closeSessionAsyncWithCompletionBlock" withArgs:nil];
    }];
}

- (void) transactionStart:(CDVInvokedUrlCommand*)command {
    [self.commandDelegate runInBackground:^{
        [[MintWebViewJavaScriptBridge sharedInstance] callFunction:@"transactionStart:andResultBlock" withArgs:command.arguments];
    }];
}
- (void) transactionStop:(CDVInvokedUrlCommand*)command {
    [self.commandDelegate runInBackground:^{
        [[MintWebViewJavaScriptBridge sharedInstance]
         callFunction:@"transactionStop:andResultBlock" withArgs:command.arguments];
    }];
}
- (void) transactionCancel:(CDVInvokedUrlCommand*)command {
    [self.commandDelegate runInBackground:^{
        [[MintWebViewJavaScriptBridge sharedInstance] callFunction:@"transactionCancel:reason:andResultBlock" withArgs:command.arguments];
    }];
}

- (void) leaveBreadcrumb:(CDVInvokedUrlCommand*)command {
    [self.commandDelegate runInBackground:^{
        [[MintWebViewJavaScriptBridge sharedInstance] callFunction:@"leaveBreadcrumb" withArgs:[command.arguments objectAtIndex:0]];
    }];
}

- (void) addExtraData:(CDVInvokedUrlCommand*)command {
    
    [self.commandDelegate runInBackground:^{
        [[MintWebViewJavaScriptBridge sharedInstance] callFunction:@"addExtraData" withArgs:command.arguments];
    }];
}

- (void) clearExtraData:(CDVInvokedUrlCommand*)command {
    [self.commandDelegate runInBackground:^{
        [[MintWebViewJavaScriptBridge sharedInstance] callFunction:@"clearExtraData" withArgs:nil];
    }];
}


- (void) logView:(CDVInvokedUrlCommand*)command {
    [self.commandDelegate runInBackground:^{

        [[MintWebViewJavaScriptBridge sharedInstance] callFunction:@"logView" withArgs:@[[command.arguments objectAtIndex:0], [command.arguments objectAtIndex:1]]];
    }];
}

- (void) javascriptError:(CDVInvokedUrlCommand*)command {
    [self.commandDelegate runInBackground:^{
        
        NSArray *data = command.arguments;
        [[MintWebViewJavaScriptBridge sharedInstance] callFunction:@"javascriptError" withArgs:@{@"message":[data objectAtIndex:0], @"url":[data objectAtIndex:1], @"line":[data objectAtIndex:2], @"stacktrace":[data objectAtIndex:3], @"handled":[data objectAtIndex:4]}];
    }];
}

- (void) logNetwork:(CDVInvokedUrlCommand*)command {
    [self.commandDelegate runInBackground:^{
        
        NSArray *data = command.arguments;
        
        [[MintWebViewJavaScriptBridge sharedInstance] callFunction:@"logNetwork" withArgs:@{@"method":[data objectAtIndex:0], @"url":[data objectAtIndex:1], @"latency":[data objectAtIndex:2], @"httpStatusCode":[data objectAtIndex:3], @"responseDataSize":[data objectAtIndex:4]}];
    }];
}

@end