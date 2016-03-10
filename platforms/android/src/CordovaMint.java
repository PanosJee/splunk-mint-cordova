package splunkmint;

import android.content.Context;
import android.content.res.Resources;

import com.splunk.mint.*;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.json.JSONArray;
import org.json.JSONException;

import java.util.HashMap;

public class CordovaMint extends CordovaPlugin {
    private MintJavascript mj = null;
    private Context context = null;

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
        context = this.cordova.getActivity();

        Resources resources = context.getResources();
        final String packageName = context.getPackageName();
        String API_KEY = context.getString(resources.getIdentifier("API_KEY", "string", packageName));

        Mint.initAndStartSession(context, API_KEY);
        mj = new MintJavascript(context, null);
    }

    @Override
    public boolean execute(String action, final JSONArray args,
                           CallbackContext callbackContext) throws JSONException {
        if (action.equals("initAndStartSession")) {
            Mint.initAndStartSession(context, args.getString(0));
        }
        else if (action.equals("logEvent")) {
            final String name = args.getString(0);
            final String extraData = args.getString(1);
            cordova.getThreadPool().execute(new Runnable() {
                public void run() {
                    mj.logEvent(name, extraData);
                }
            });
        }
        else if (action.equals("leaveBreadcrumb")) {
            final String name = args.getString(0);
            cordova.getThreadPool().execute(new Runnable() {
                public void run() {
                    Mint.leaveBreadcrumb(name);
                }
            });
        }
        else if (action.equals("addExtraData")) {
            final String key = args.getString(0);
            final String value = args.getString(1);
            cordova.getThreadPool().execute(new Runnable() {
                public void run() {
                    Mint.addExtraData(key, value);
                }
            });
        }
        else if (action.equals("clearExtraData")) {
            Mint.clearExtraData();
        }
        else if (action.equals("closeSession")) {
            Mint.closeSession(context);
        }
        else if (action.equals("setUserIdentifier")) {
            final String name = args.getString(0);
            cordova.getThreadPool().execute(new Runnable() {
                public void run() {
                    Mint.setUserIdentifier(name);
                }
            });
        }
        else if (action.equals("transactionStart")) {
            final String name = args.getString(0);
            final String jsonExtra = args.getString(1);
            cordova.getThreadPool().execute(new Runnable() {
                public void run() {
                    mj.transactionStart(name, jsonExtra);
                }
            });
        }
        else if (action.equals("transactionStop")) {
            final String name = args.getString(0);
            final String jsonExtra = args.getString(1);
            cordova.getThreadPool().execute(new Runnable() {
                public void run() {
                    mj.transactionStop(name, jsonExtra);
                }
            });
        }
        else if (action.equals("transactionCancel")) {
            final String name = args.getString(0);
            final String reason = args.getString(1);
            final String jsonExtra = args.getString(2);
            cordova.getThreadPool().execute(new Runnable() {
                public void run() {
                    mj.transactionCancel(name, reason, jsonExtra);
                }
            });
        }
        else if (action.equals("logNetwork")){
            final String method = args.getString(0);
            final String url = args.getString(1);
            final String latency = args.getString(2);
            final String httpStatusCode = args.getString(3);
            final String responseDataSize = args.getString(4);
            cordova.getThreadPool().execute(new Runnable() {
                public void run() {
                    mj.logNetwork(method, url, latency, httpStatusCode, responseDataSize);
                }
            });
        }
        else if (action.equals("javascriptError")){
            final String message = args.getString(0);
            final String url = args.getString(1);
            final String line = args.getString(2);
            final String stacktrace = args.getString(3);
            final String handled = args.getString(4);
            cordova.getThreadPool().execute(new Runnable() {
                public void run() {
                    mj.javascriptError(message, url, line, stacktrace, handled);
                }
            });
        }
        else if (action.equals("logView")){
            final String currentView = args.getString(0);
            final String pageLoadTime = args.getString(1);
            final String domainLookupTime = args.getString(2);
            final String serverTime = args.getString(3);
            final String domProcessingTime = args.getString(4);
            final String host = args.getString(5);
            final String smth = args.getString(6);
            cordova.getThreadPool().execute(new Runnable() {
                public void run() {
                    if (args.length() < 2) {
                        HashMap extraData = new HashMap(0);
                        Mint.logView(currentView, extraData);
                    } else {
                        mj.logView(currentView, pageLoadTime, domainLookupTime, serverTime, domProcessingTime, host, smth);
                    }
                }
            });
        }
        else if (action.equals("flush")) {
            Mint.flush();
        }
        return true;
    }
}