(this["webpackJsonpmobile-app"]=this["webpackJsonpmobile-app"]||[]).push([[0],{27:function(e,n,t){},29:function(e,n,t){},35:function(e,n,t){"use strict";t.r(n),t.d(n,"db",(function(){return j}));var o=t(8),r=t.n(o),a=t(18),i=t.n(a),c=(t(27),t(7));function s(){return Object(c.jsx)("div",{style:{height:"10vh",alignItems:"center",flexDirection:"row",display:"flex",backgroundColor:"InfoBackground",justifyContent:"center",fontWeight:"bolder"},children:"Suivi des personnes ag\xe9es"})}var l=t(19),d=t(20),u=t(22),f=t(21),h=(t(29),function(e){Object(u.a)(t,e);var n=Object(f.a)(t);function t(){var e;Object(l.a)(this,t);for(var o=arguments.length,r=new Array(o),a=0;a<o;a++)r[a]=arguments[a];return(e=n.call.apply(n,[this].concat(r))).startAccel=function(){window.addEventListener("devicemotion",(function(e){var n=j.ref("users/").push().key;j.ref("users/"+n).set({accel:{acceleration:e.acceleration,accelerationIncludingGravity:e.accelerationIncludingGravity,rotationRate:e.rotationRate}})}))},e}return Object(d.a)(t,[{key:"render",value:function(){return Object(c.jsx)("div",{className:"App",children:Object(c.jsx)("header",{className:"App-header",children:Object(c.jsx)("button",{style:{backgroundColor:"InfoBackground",height:"20vh",width:"20vh",border:"0",borderRadius:"50%",fontWeight:"bolder",fontSize:"30px",boxShadow:"0 0 solid black"},onClick:this.startAccel,children:"Start"})})})}}]),t}(r.a.Component));var p=function(){return Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)(s,{}),Object(c.jsx)(h,{})]})},g=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function b(e,n){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var t=e.installing;null!=t&&(t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA."),n&&n.onUpdate&&n.onUpdate(e)):(console.log("Content is cached for offline use."),n&&n.onSuccess&&n.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}var v=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,36)).then((function(n){var t=n.getCLS,o=n.getFID,r=n.getFCP,a=n.getLCP,i=n.getTTFB;t(e),o(e),r(e),a(e),i(e)}))},w=t(13);t(32),t(33),t(34);w.a.initializeApp({apiKey:"AIzaSyBhWCedCUO7yVNDd-nhnAXatyq0V6GShic",authDomain:"elderly-622a9.firebaseapp.com",databaseURL:"https://elderly-622a9-default-rtdb.europe-west1.firebasedatabase.app",projectId:"elderly-622a9",storageBucket:"elderly-622a9.appspot.com",messagingSenderId:"792971798543",appId:"1:792971798543:web:2c5ffefb25ca6926131b7a",measurementId:"G-GXN13DRQ8W"}),i.a.render(Object(c.jsx)(r.a.StrictMode,{children:Object(c.jsx)(p,{})}),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/ActivityTrackingMobile",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var n="".concat("/ActivityTrackingMobile","/service-worker.js");g?(!function(e,n){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(t){var o=t.headers.get("content-type");404===t.status||null!=o&&-1===o.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):b(e,n)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(n,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://cra.link/PWA")}))):b(n,e)}))}}(),v();var j=w.a.database()}},[[35,1,2]]]);
//# sourceMappingURL=main.7ed052d3.chunk.js.map