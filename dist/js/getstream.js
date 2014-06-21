!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var t;"undefined"!=typeof window?t=window:"undefined"!=typeof global?t=global:"undefined"!=typeof self&&(t=self),t.stream=e()}}(function(){return function e(t,r,n){function o(s,a){if(!r[s]){if(!t[s]){var u="function"==typeof require&&require;if(!a&&u)return u(s,!0);if(i)return i(s,!0);throw new Error("Cannot find module '"+s+"'")}var c=r[s]={exports:{}};t[s][0].call(c.exports,function(e){var r=t[s][1][e];return o(r?r:e)},c,c.exports,e,t,r,n)}return r[s].exports}for(var i="function"==typeof require&&require,s=0;s<n.length;s++)o(n[s]);return o}({1:[function(e,t){function r(e,t){if("function"!=typeof t)throw new Error("Bad callback given: "+t);if(!e)throw new Error("No options given");var s=e.onResponse;if(e="string"==typeof e?{uri:e}:JSON.parse(JSON.stringify(e)),e.onResponse=s,e.verbose&&(r.log=i()),e.url&&(e.uri=e.url,delete e.url),!e.uri&&""!==e.uri)throw new Error("options.uri is a required argument");if("string"!=typeof e.uri)throw new Error("options.uri must be a string");for(var a=["proxy","_redirectsFollowed","maxRedirects","followRedirect"],c=0;c<a.length;c++)if(e[a[c]])throw new Error("options."+a[c]+" is not supported");if(e.callback=t,e.method=e.method||"GET",e.headers=e.headers||{},e.body=e.body||null,e.timeout=e.timeout||r.DEFAULT_TIMEOUT,e.headers.host)throw new Error("Options.headers.host is not supported");e.json&&(e.headers.accept=e.headers.accept||"application/json","GET"!==e.method&&(e.headers["content-type"]="application/json"),"boolean"!=typeof e.json?e.body=JSON.stringify(e.json):"string"!=typeof e.body&&(e.body=JSON.stringify(e.body)));var d=function(e){var t=[];for(var r in e)e.hasOwnProperty(r)&&t.push(encodeURIComponent(r)+"="+encodeURIComponent(e[r]));return t.join("&")};if(e.qs){var f="string"==typeof e.qs?e.qs:d(e.qs);e.uri=-1!==e.uri.indexOf("?")?e.uri+"&"+f:e.uri+"?"+f}var l=function(e){var t={};t.boundry="-------------------------------"+Math.floor(1e9*Math.random());var r=[];for(var n in e)e.hasOwnProperty(n)&&r.push("--"+t.boundry+'\nContent-Disposition: form-data; name="'+n+'"\n\n'+e[n]+"\n");return r.push("--"+t.boundry+"--"),t.body=r.join(""),t.length=t.body.length,t.type="multipart/form-data; boundary="+t.boundry,t};if(e.form){if("string"==typeof e.form)throw"form name unsupported";if("POST"===e.method){var h=(e.encoding||"application/x-www-form-urlencoded").toLowerCase();switch(e.headers["content-type"]=h,h){case"application/x-www-form-urlencoded":e.body=d(e.form).replace(/%20/g,"+");break;case"multipart/form-data":var p=l(e.form);e.body=p.body,e.headers["content-type"]=p.type;break;default:throw new Error("unsupported encoding:"+h)}}}return e.onResponse=e.onResponse||o,e.onResponse===!0&&(e.onResponse=t,e.callback=o),!e.headers.authorization&&e.auth&&(e.headers.authorization="Basic "+u(e.auth.username+":"+e.auth.password)),n(e)}function n(e){function t(){d=!0;var t=new Error("ETIMEDOUT");return t.code="ETIMEDOUT",t.duration=e.timeout,r.log.error("Timeout",{id:u._id,milliseconds:e.timeout}),e.callback(t,u)}function n(){if(d)return r.log.debug("Ignoring timed out state change",{state:u.readyState,id:u.id});if(r.log.debug("State change",{state:u.readyState,id:u.id,timed_out:d}),u.readyState===c.OPENED){r.log.debug("Request started",{id:u.id});for(var t in e.headers)u.setRequestHeader(t,e.headers[t])}else u.readyState===c.HEADERS_RECEIVED?o():u.readyState===c.LOADING?(o(),i()):u.readyState===c.DONE&&(o(),i(),s())}function o(){if(!y.response){if(y.response=!0,r.log.debug("Got response",{id:u.id,status:u.status}),clearTimeout(u.timeoutTimer),u.statusCode=u.status,l&&0==u.statusCode){var t=new Error("CORS request rejected: "+e.uri);return t.cors="rejected",y.loading=!0,y.end=!0,e.callback(t,u)}e.onResponse(null,u)}}function i(){y.loading||(y.loading=!0,r.log.debug("Response body loading",{id:u.id}))}function s(){if(!y.end){if(y.end=!0,r.log.debug("Request done",{id:u.id}),u.body=u.responseText,e.json)try{u.body=JSON.parse(u.responseText)}catch(t){return e.callback(t,u)}e.callback(null,u,u.body)}}var u=new c,d=!1,l=a(e.uri),h="withCredentials"in u;if(f+=1,u.seq_id=f,u.id=f+": "+e.method+" "+e.uri,u._id=u.id,l&&!h){var p=new Error("Browser does not support cross-origin request: "+e.uri);return p.cors="unsupported",e.callback(p,u)}u.timeoutTimer=setTimeout(t,e.timeout);var y={response:!1,loading:!1,end:!1};return u.onreadystatechange=n,u.open(e.method,e.uri,!0),l&&(u.withCredentials=!!e.withCredentials),u.send(e.body),u}function o(){}function i(){var e,t,r={},n=["trace","debug","info","warn","error"];for(t=0;t<n.length;t++)e=n[t],r[e]=o,"undefined"!=typeof console&&console&&console[e]&&(r[e]=s(console,e));return r}function s(e,t){function r(r,n){return"object"==typeof n&&(r+=" "+JSON.stringify(n)),e[t].call(e,r)}return r}function a(e){var t,r=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/;try{t=location.href}catch(n){t=document.createElement("a"),t.href="",t=t.href}var o=r.exec(t.toLowerCase())||[],i=r.exec(e.toLowerCase()),s=!(!i||i[1]==o[1]&&i[2]==o[2]&&(i[3]||("http:"===i[1]?80:443))==(o[3]||("http:"===o[1]?80:443)));return s}function u(e){var t,r,n,o,i,s,a,u,c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",d=0,f=0,l="",h=[];if(!e)return e;do t=e.charCodeAt(d++),r=e.charCodeAt(d++),n=e.charCodeAt(d++),u=t<<16|r<<8|n,o=u>>18&63,i=u>>12&63,s=u>>6&63,a=63&u,h[f++]=c.charAt(o)+c.charAt(i)+c.charAt(s)+c.charAt(a);while(d<e.length);switch(l=h.join(""),e.length%3){case 1:l=l.slice(0,-2)+"==";break;case 2:l=l.slice(0,-1)+"="}return l}var c=XMLHttpRequest;if(!c)throw new Error("missing XMLHttpRequest");r.log={trace:o,debug:o,info:o,warn:o,error:o};var d=18e4,f=0;r.withCredentials=!1,r.DEFAULT_TIMEOUT=d,r.defaults=function(e){var t=function(t){var r=function(r,n){r="string"==typeof r?{uri:r}:JSON.parse(JSON.stringify(r));for(var o in e)void 0===r[o]&&(r[o]=e[o]);return t(r,n)};return r},n=t(r);return n.get=t(r.get),n.post=t(r.post),n.put=t(r.put),n.head=t(r.head),n};var l=["get","put","post","head"];l.forEach(function(e){var t=e.toUpperCase(),n=e.toLowerCase();r[n]=function(e){"string"==typeof e?e={method:t,uri:e}:(e=JSON.parse(JSON.stringify(e)),e.method=t);var n=[e].concat(Array.prototype.slice.apply(arguments,[1]));return r.apply(this,n)}}),r.couch=function(e,t){function n(e,r,n){if(e)return t(e,r,n);if((r.statusCode<200||r.statusCode>299)&&n.error){e=new Error("CouchDB error: "+(n.error.reason||n.error.error));for(var o in n)e[o]=n[o];return t(e,r,n)}return t(e,r,n)}"string"==typeof e&&(e={uri:e}),e.json=!0,e.body&&(e.json=e.body),delete e.body,t=t||o;var i=r(e,n);return i},t.exports=r},{}],2:[function(){},{}],3:[function(e,t){function r(e,t){return new n(e,t)}var n=e("./lib/client"),o=e("./lib/errors"),i=e("request");t.exports.connect=r,t.exports.errors=o,t.exports.request=i},{"./lib/client":4,"./lib/errors":5,request:1}],4:[function(e,t){var r=e("request"),n=e("./feed"),o=e("./signing"),i=e("./errors"),s=e("crypto"),a=function(){this.initialize.apply(this,arguments)};a.prototype={baseUrl:"https://getstream.io",initialize:function(e,t,r){this.key=e,this.secret=t,this.fayeUrl=r?r:"https://getstream.io/faye"},feed:function(e,t,r){var a=e.match(/\:/g);if(null===a||1!=a.length)throw new i.FeedError("Wrong feed format "+e+" correct format is flat:1");if(s.createHash&&this.secret&&!t&&(t=o.sign(this.secret,e.replace(":",""))),!t)throw new i.FeedError("Missing token, in client side mode please provide a feed secret");var u=new n(this,e,t,r);return u},enrichUrl:function(e){var t=this.baseUrl+e;return t+=-1!=t.indexOf("?")?"&api_key="+this.key:"?api_key="+this.key},enrichKwargs:function(e){e.url=this.enrichUrl(e.url),e.json=!0;var t=e.secret||this.secret;return e.headers={},e.headers.Authorization=t,e},get:function(e,t){return e=this.enrichKwargs(e),e.method="GET",console.log(e),r.get(e,t)},post:function(e,t){return e=this.enrichKwargs(e),e.method="POST",r(e,t)},"delete":function(e,t){return e=this.enrichKwargs(e),e.method="DELETE",r(e,t)}},t.exports=a},{"./errors":5,"./feed":6,"./signing":7,crypto:2,request:1}],5:[function(e,t){function r(e,t){this.message=e,Error.call(this,this.message),o?Error.captureStackTrace(this,t):this.stack=i?(new Error).stack:""}var n=t.exports,o="function"==typeof Error.captureStackTrace,i=!!(new Error).stack;n._Abstract=r,r.prototype=new Error,n.FeedError=function(e){r.call(this,e)},n.FeedError.prototype=new r},{}],6:[function(e,t){var r=function(){this.initialize.apply(this,arguments)};r.prototype={initialize:function(e,t,r,n){this.client=e,this.feed=t,this.token=r,this.feedUrl=t.replace(":","/"),this.feedTogether=t.replace(":",""),this.feedToken=this.feedTogether+" "+this.token,this.fayeClient=null,this.notificationChannel="site-"+n+"-feed-"+this.feedTogether},addActivity:function(e,t){var r=this.client.post({url:"/api/feed/"+this.feedUrl+"/",body:e,secret:this.feedToken},t);return r},removeActivity:function(e,t){var r=this.client.delete({url:"/api/feed/"+this.feedUrl+"/"+e+"/",secret:this.feedToken},t);return r},follow:function(e,t){var r=this.client.post({url:"/api/feed/"+this.feedUrl+"/follows/",body:{target:e},secret:this.feedToken},t);return r},unfollow:function(e,t){var r=this.client.delete({url:"/api/feed/"+this.feedUrl+"/follows/"+e+"/",secret:this.feedToken},t);return r},get:function(e,t){var r=this.client.get({url:"/api/feed/"+this.feedUrl+"/",qs:e,secret:this.feedToken},t);return r},getFayeAuthorization:function(){var e=this.client.key,t=this.notificationChannel,r=this.token;return{incoming:function(e,t){t(e)},outgoing:function(n,o){n.ext={user_id:t,api_key:e,signature:r},o(n)}}},getFayeClient:function(){if(null===this.fayeClient){this.fayeClient=new Faye.Client(this.client.fayeUrl);var e=this.getFayeAuthorization();this.fayeClient.addExtension(e)}return this.fayeClient},subscribe:function(e){return this.getFayeClient().subscribe("/"+this.notificationChannel,e)}},t.exports=r},{}],7:[function(e,t,r){function n(e){var t=e.replace("+","-").replace("/","_");return t.replace(/^=+/,"").replace(/=+$/,"")}var o=e("crypto");r.sign=function(e,t){var r=new o.createHash("sha1").update(e).digest(),i=o.createHmac("sha1",r),s=i.update(t).digest("base64"),a=n(s);return a}},{crypto:2}]},{},[3])(3)});