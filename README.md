# hurry-up

The goal of hurry-up is to make sure you are never late to an appointment again. hurry-up allows users to save an appointment and receive a text message reminder when they should leave, based on wherever their location happens to be at that time.


This is a fork of the [original project] (https://github.com/LuxuriousNeckbeards/hurry-up) by **Luxurious Neckbeards**.

## Team
- <https://avatars0.githubusercontent.com/u/7966607?v=3" width="64"> [**Bryan Newby**] (https://github.com/brnewby602)

- <img src="https://avatars.githubusercontent.com/u/15864056?v=3" width="64"> [**Alex Nitta**](https://github.com/alexnitta)

- <https://avatars0.githubusercontent.com/u/15930866?v=3" width="64"> [**Toben Green**](https://github.com/tobensg)

- <img src="https://avatars3.githubusercontent.com/u/13231400?v=3" width="64"> [**Trini Le**](https://github.com/trinile)


## Features We Added
1. Ability to edit/delete events
2. Directions for events, including map/route
3. Error handling for sign up / sign in
4. Different text messages based on time until event; i.e. the app texts you when it is time to leave, but if you are already late when you add the event, the text tells you how late you are.
5. Added a picker menu for selecting states in the destination.
6. Fixed errors with 12:00 pm events.
7. Events display on app load, rather than waiting for user to refresh. 

## NPM Modules We Added
* [polyline] (https://github.com/mapbox/polyline)
* [react-native-collapsible] (https://github.com/oblador/react-native-collapsible)
* [react-native-vector-icons] (https://github.com/oblador/react-native-vector-icons)
* [rnpm] (https://github.com/rnpm/rnpm)

## Roadmap

See our [issues] (https://github.com/mediocreokra/hurry-up/issues) for features to be added. 

## Installation

1. Install all dependencies (there are many!) - run `npm install`
2. Run rnpm link
3. Add your `api_keys.js` file to the server folder - see [API Keys] below.
4. To run the server - from the root directory do `nodemon server/server.js`
5. To query the database - from the root directory do `sqlite3 server/db/hurryup.sqlite`

#### Client-side specifics

1. Run `npm start` to start the React Native server.

#### To Simulate App on XCODE
1. To open the project in Xcode:
 1. `open ios/hurryup.xcodeproj`
 2. Or in the command line `react-native run-ios`
2. Click **Build and Run (PLAY BUTTON)** to open the application in the simulator
 * Immediately got to Debug -> Simulate Location -> San Francisco, CA (or choose other locations). 
 * App will be unable to retrieve location if no location is simulated.
3. This application has only been tested on iPhone 6+ models. 
 * Visual elements will not display correctly on older models.
 * Note: Xcode 7.3 required for IOS 9.3.1 and above to test on iphone directly.

#####Non-platform specific commands:

1. In emulator, `ctrl-cmd-Z` brings up a popup that allows you to Enable Live Reload.  This will let you edit your code and immediately see the result in the emulator.
2. In emulator, `cmd-D` it will open a debugger window.


## API Keys

This project will require developer accounts for two API's: Google Maps for location information, and Twilio to send text messages to users. It should be noted that each trial Twilio account allows texting to a single phone number. Each team member might need to create a separate account for testing purposes.

[Get a Google API Key] (https://developers.google.com/maps/documentation/javascript/get-api-key#key)

[Create Twilio Account] (https://www.twilio.com/try-twilio)

### Create a Twilio number

On your account in Twilio, Choose the **Account** menu option off of your account in top right menu.


Click the **Create Your First Twilio Number** button to create a number.  
This will give you a number that will need to be used as the from phone number in the app, currently at `server/workers/twilio-api-call.js`.  

### Create an `api_keys` file

Once you have created the necessary developer accounts, you will need to create a file called `api_keys.js` within the `server` directory (this file should already be `.gitignore`d). This file -- which is required in several places in the back end -- should contain the following information:


```javascript
var API_KEYS = {
  googleAPI: ' /* INSERT HERE */ ',
  twilioAccountSid: ' /* INSERT HERE */ ',
  twilioAuthToken: ' /* INSERT HERE */ ',
  twilioPhoneNumber: ' /* INSERT HERE */ '
};
module.exports = API_KEYS;
```

Make sure the Twilio phone number is a string of ten digits, with a leading + sign and no dashes - for example: `'+14151234567'`.


## Tech Stack

The client side is written entirely in React Native for iOS. The server is written in Node Express and uses the Sqlite database engine, along with the Bookshelf.js ORM and Knex SQL query builder.

## Deployment

The client side cannot be truly deployed to an iPhone without going through the app store approval process. For this reason, the client side must be tested through the Xcode simulator, or on the device through a USB connection.


Our server side code and database is currently deployed to Digital Ocean. To deploy your own, the droplet needs to be the $10/month option with 1GB memory, set to Flexible in order to do `npm install`. Once you have the server installed, you can resize it down to the $5/month option.
