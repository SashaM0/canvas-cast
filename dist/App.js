parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"A9wb":[function(require,module,exports) {

},{}],"lY9v":[function(require,module,exports) {
"use strict";function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function e(t,e){for(var s=0;s<e.length;s++){var i=e[s];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function s(t,s,i){return s&&e(t.prototype,s),i&&e(t,i),t}require("./css/styles.scss");var i=function(){function e(){t(this,e)}return s(e,[{key:"init",value:function(t){this.ip=t.ip,this.width=t.width,this.height=t.height,this.brightness=t.brightness,this.type=t.type,this.customMap=t.customMap||!1,this.layoutSerpentine=t.layoutSerpentine||!1,this.stageResized=!1,this.wsOpen=!1,this.ws=!1,this.connect(),this.ui()}},{key:"connect",value:function(){var t=this;this.status(1),this.ws=new WebSocket("ws://".concat(this.ip,"/")),this.ws.binaryType="arraybuffer",this.ws.onopen=function(){console.log("WebSocket open"),t.wsOpen=!0,t.status(1),t.uiBrightness()},this.ws.onclose=function(){console.log("WebSocket close"),t.wsOpen=!1,t.status(0)},this.ws.onerror=function(e){console.log(e),t.status(3)},this.ws.onmessage=function(e){switch(e.data){case"Connected":t.status(2);break;case"Busy":t.ws.close(),setTimeout(function(){return t.status(4)},250);break;case"Closed":t.ws.close();break;case"Error":t.status(3);break;default:console.log("WS message: ".concat(e.data))}},window.addEventListener("unload",function(e){t.ws.close()})}},{key:"status",value:function(t){var e=document.querySelector(".wsBar .status"),s=document.querySelector(".wsBar .statusTxt");switch(t){case 0:e.dataset.status="closed",s.innerHTML="closed";break;case 1:e.dataset.status="connecting",s.innerHTML="connecting...";break;case 2:e.dataset.status="open",s.innerHTML="connected";break;case 3:e.dataset.status="error",s.innerHTML="error connecting";break;case 4:e.dataset.status="busy",s.innerHTML="too many connected"}}},{key:"ui",value:function(){var t=this,e=document.getElementById("matrix-brightness");e.value=this.brightness,e.addEventListener("input",function(){t.uiBrightness()}),document.querySelector(".wsBar .statusIP").innerText=this.ip,window.addEventListener("resize",function(){t.stageResized=!1},!1)}},{key:"uiBrightness",value:function(){var t=document.getElementById("matrix-brightness");this.wsOpen&&(this.brightness=t.value,this.ws.send("BRIGHTNESS:".concat(this.brightness)))}},{key:"pixelPosition",value:function(t){return this.layoutSerpentine?this.matrixSerpentine(t):t}},{key:"matrixSerpentine",value:function(t){var e,s=Math.floor(t/this.width),i=t-this.width*s;if(1&s){var n=this.width-1-i;e=3*(s*this.width+n)}else e=3*t;return e}},{key:"resizeStage",value:function(t){var e=.9*window.innerWidth/this.width,s=.8*window.innerHeight/this.height,i=s<e?s:e,n=this.width*i,a=this.width*i;t.style.width="".concat(n,"px"),t.style.height="".concat(a,"px"),this.stageResized=!0}},{key:"cast",value:function(t){if(this.stageResized||this.resizeStage(t),this.wsOpen){var e,s=new ArrayBuffer(this.getBufferSize()),i=new Uint8Array(s,0,this.getBufferSize());"2d"===this.type?e=t.getContext("2d"):"webgl"===this.type&&(e=t.getContext("webgl",{antialias:!1,depth:!1}));for(var n=0;n<this.getBufferSize();n+=3){var a=n/3,o=this.canvasMapping(a),r=void 0;"2d"===this.type?r=e.getImageData(o.x,o.y,1,1).data:"webgl"===this.type&&(r=new Uint8Array(4),e.readPixels(o.x,o.y,1,1,e.RGBA,e.UNSIGNED_BYTE,r)),i[o.position]=r[0],i[o.position+1]=r[1],i[o.position+2]=r[2]}this.ws.send(i)}}},{key:"guide",value:function(t,e){var s=t.getContext("2d");if(s)for(var i=0;i<this.customMap.length;i++)s.lineWidth=1,s.strokeStyle="black",s.beginPath(),s.ellipse(this.customMap[i].x,this.customMap[i].y,e,e,Math.PI/4,0,2*Math.PI),s.stroke(),s.strokeStyle="white",s.beginPath(),s.ellipse(this.customMap[i].x,this.customMap[i].y,e-1,e-1,Math.PI/4,0,2*Math.PI),s.stroke()}},{key:"getBufferSize",value:function(){return this.customMap?3*this.customMap.length:this.width*this.height*3}},{key:"canvasMapping",value:function(t){if(this.customMap)return{y:this.customMap[t].y,x:this.customMap[t].x,position:3*t};var e=Math.floor(t/this.width);return{y:e,x:t-e*this.width,position:this.pixelPosition(t)}}}]),e}(),n=new i;window.canvasCast=n;
},{"./css/styles.scss":"A9wb"}]},{},["lY9v"], null)
//# sourceMappingURL=/App.js.map