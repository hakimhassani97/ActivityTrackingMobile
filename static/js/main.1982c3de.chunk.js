(this["webpackJsonpmobile-app"]=this["webpackJsonpmobile-app"]||[]).push([[0],{27:function(e,n,t){},29:function(e,n,t){},35:function(e,n,t){"use strict";t.r(n),t.d(n,"db",(function(){return m})),t.d(n,"uid",(function(){return j}));var o=t(8),i=t.n(o),r=t(18),a=t.n(r),c=(t(27),t(7));function s(){return Object(c.jsx)("div",{style:{height:"10vh",alignItems:"center",flexDirection:"row",display:"flex",backgroundColor:"InfoBackground",justifyContent:"center",fontWeight:"bolder"},children:"Suivi des personnes ag\xe9es"})}var d=t(19),l=t(20),u=t(22),h=t(21);t(29);window.DeviceOrientationEvent?console.log("DeviceOrientation is supported"):window.OrientationEvent&&console.log("MozOrientation is supported"),window.DeviceMotionEvent&&console.log("DeviceMotionEvent is supported");var f=function(e){Object(u.a)(t,e);var n=Object(h.a)(t);function t(e){var o;return Object(d.a)(this,t),(o=n.call(this,e)).startAccel=function(){!1===o.state.recording?o.setState({recording:!0},(function(){window.addEventListener("deviceorientation",(function(e){var n=m.ref("users/"+j+"/").push().key;m.ref("users/"+j+"/"+n).set({gyro:{alpha:e.alpha,beta:e.beta,gamma:e.gamma},date:(new Date).toISOString()}),window.addEventListener("devicemotion",(function(e){m.ref("users/"+j+"/"+n).set({accel:{acceleration:Math.random(),accelerationIncludingGravity:Math.random(),rotationRate:Math.random()}})}),!1)}))})):o.setState({recording:!1},(function(){window.ondeviceorientation=null,window.ondevicemotion=null}))},o.state={recording:!1},o}return Object(l.a)(t,[{key:"render",value:function(){return Object(c.jsx)("div",{className:"App",children:Object(c.jsx)("header",{className:"App-header",children:Object(c.jsx)("button",{style:{backgroundColor:this.state.recording?"red":"green",height:"20vh",width:"20vh",border:"0",borderRadius:"50%",fontWeight:"bolder",fontSize:"30px",boxShadow:"0 0 solid black",color:"white"},onClick:this.startAccel,children:this.state.recording?"Stop":"Start"})})})}}]),t}(i.a.Component);var g=function(){return Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)(s,{}),Object(c.jsx)(f,{})]})},v=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function p(e,n){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var t=e.installing;null!=t&&(t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA."),n&&n.onUpdate&&n.onUpdate(e)):(console.log("Content is cached for offline use."),n&&n.onSuccess&&n.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}var b=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,36)).then((function(n){var t=n.getCLS,o=n.getFID,i=n.getFCP,r=n.getLCP,a=n.getTTFB;t(e),o(e),i(e),r(e),a(e)}))},w=t(13);t(32),t(33),t(34);w.a.initializeApp({apiKey:"AIzaSyBhWCedCUO7yVNDd-nhnAXatyq0V6GShic",authDomain:"elderly-622a9.firebaseapp.com",databaseURL:"https://elderly-622a9-default-rtdb.europe-west1.firebasedatabase.app",projectId:"elderly-622a9",storageBucket:"elderly-622a9.appspot.com",messagingSenderId:"792971798543",appId:"1:792971798543:web:2c5ffefb25ca6926131b7a",measurementId:"G-GXN13DRQ8W"}),a.a.render(Object(c.jsx)(i.a.StrictMode,{children:Object(c.jsx)(g,{})}),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/ActivityTrackingMobile",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var n="".concat("/ActivityTrackingMobile","/service-worker.js");v?(!function(e,n){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(t){var o=t.headers.get("content-type");404===t.status||null!=o&&-1===o.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):p(e,n)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(n,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://cra.link/PWA")}))):p(n,e)}))}}(),b();var m=w.a.database(),j="hakimhassani97"}},[[35,1,2]]]);
//# sourceMappingURL=main.1982c3de.chunk.js.map