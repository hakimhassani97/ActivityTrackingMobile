# A PWA for the tracking of the activities of elderly people

# A working version of the code is available here :  
[hakimhassani97/ActivityTrackingMobile](https://github.com/hakimhassani97/ActivityTrackingMobile)

# Configuration steps :

Creating the Firebase project on :  
[Firebase console](https://console.firebase.google.com/)

Copy the firebase config json object in this format and replace it in `index.js` :  
`{  
  apiKey: "xxxxxxxx",  
  authDomain: "xxxxxxxx",  
  databaseURL: "xxxxxxxx",  
  projectId: "xxxxxxxx",  
  storageBucket: "xxxxxxxx",  
  messagingSenderId: "xxxxxxxx",  
  appId: "xxxxxxxx",  
  measurementId: "xxxxxxxx"  
}`  

Install the dependencies :  
`npm install`

To launch the app on localhost :  
`set HOST=localhost&&npm start`

To launch the app on the local network with HTTPS on :  
`set HOST=0.0.0.0&&set HTTPS=true&&npm start`

To deploy the app on Github Pages :  
`npm run deploy`

Access the mobile app PWA through HTTPS required :  
[Mobile app](https:example.com/ActivityTrackingMobile/mobile/Home)

Access the admin web app :  
[Web app](https:example.com/ActivityTrackingMobile/web/Home)