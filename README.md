This is an experimental build

******

### Set up your environment
Make sure you have node & npm installed. Follow the instructions on Cordova website on how to install the right dependendcies

#### Mac installation
If you are on Mac the fastest way to install node and npm is: brew install npm (if you have brew installed)
Then all you have to do is:
sudo npm install –g cordova
npm install –g plugman
 
 
### Get an api key
Log into your account at mint.splunk.com and create a new API key

### Install the Cordova MINT SDK

* Get the .tar.gz from Bitbucket (git.splunk.com)
* Open the terminal and go to (cd) the directory of your Cordova project
* Then run the following command:
`plugman install --platform android --plugin /path/to/splunkmintcordovasdk/ --project platforms/android/ --variable API_KEY=yourapikey`
* After plugman has ran you should see the following:
> Installing "splunkmint" for android
 
### Testing the integration
You can now launch your app, open Safari (for iOS builds) or Chrome (for Android builds) and inspect the running app. You can open the Chrome/Safari developer tools and go to console. You should be able to call the MINT object and send some commands like `Mint.logEvent('Test')`. Then type `Mint.flush()` to send the data and inspect them in Splunk Enterprise.