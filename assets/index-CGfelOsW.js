(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();/*! Capacitor: https://capacitorjs.com/ - MIT License */var Ki;(function(i){i.Unimplemented="UNIMPLEMENTED",i.Unavailable="UNAVAILABLE"})(Ki||(Ki={}));class Br extends Error{constructor(t,e,n){super(t),this.message=t,this.code=e,this.data=n}}const Mu=i=>{var t,e;return i!=null&&i.androidBridge?"android":!((e=(t=i==null?void 0:i.webkit)===null||t===void 0?void 0:t.messageHandlers)===null||e===void 0)&&e.bridge?"ios":"web"},Su=i=>{const t=i.CapacitorCustomPlatform||null,e=i.Capacitor||{},n=e.Plugins=e.Plugins||{},s=()=>t!==null?t.name:Mu(i),r=()=>s()!=="web",a=d=>{const u=l.get(d);return!!(u!=null&&u.platforms.has(s())||o(d))},o=d=>{var u;return(u=e.PluginHeaders)===null||u===void 0?void 0:u.find(m=>m.name===d)},c=d=>i.console.error(d),l=new Map,h=(d,u={})=>{const m=l.get(d);if(m)return console.warn(`Capacitor plugin "${d}" already registered. Cannot register plugins twice.`),m.proxy;const g=s(),x=o(d);let p;const f=async()=>(!p&&g in u?p=typeof u[g]=="function"?p=await u[g]():p=u[g]:t!==null&&!p&&"web"in u&&(p=typeof u.web=="function"?p=await u.web():p=u.web),p),M=(v,b)=>{var q,C;if(x){const D=x==null?void 0:x.methods.find(F=>b===F.name);if(D)return D.rtype==="promise"?F=>e.nativePromise(d,b.toString(),F):(F,G)=>e.nativeCallback(d,b.toString(),F,G);if(v)return(q=v[b])===null||q===void 0?void 0:q.bind(v)}else{if(v)return(C=v[b])===null||C===void 0?void 0:C.bind(v);throw new Br(`"${d}" plugin is not implemented on ${g}`,Ki.Unimplemented)}},E=v=>{let b;const q=(...C)=>{const D=f().then(F=>{const G=M(F,v);if(G){const V=G(...C);return b=V==null?void 0:V.remove,V}else throw new Br(`"${d}.${v}()" is not implemented on ${g}`,Ki.Unimplemented)});return v==="addListener"&&(D.remove=async()=>b()),D};return q.toString=()=>`${v.toString()}() { [capacitor code] }`,Object.defineProperty(q,"name",{value:v,writable:!1,configurable:!1}),q},y=E("addListener"),w=E("removeListener"),T=(v,b)=>{const q=y({eventName:v},b),C=async()=>{const F=await q;w({eventName:v,callbackId:F},b)},D=new Promise(F=>q.then(()=>F({remove:C})));return D.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await C()},D},R=new Proxy({},{get(v,b){switch(b){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return x?T:y;case"removeListener":return w;default:return E(b)}}});return n[d]=R,l.set(d,{name:d,proxy:R,platforms:new Set([...Object.keys(u),...x?[g]:[]])}),R};return e.convertFileSrc||(e.convertFileSrc=d=>d),e.getPlatform=s,e.handleError=c,e.isNativePlatform=r,e.isPluginAvailable=a,e.registerPlugin=h,e.Exception=Br,e.DEBUG=!!e.DEBUG,e.isLoggingEnabled=!!e.isLoggingEnabled,e},yu=i=>i.Capacitor=Su(i),Ln=yu(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),xi=Ln.registerPlugin;class hh{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(t,e){let n=!1;this.listeners[t]||(this.listeners[t]=[],n=!0),this.listeners[t].push(e);const r=this.windowListeners[t];r&&!r.registered&&this.addWindowListener(r),n&&this.sendRetainedArgumentsForEvent(t);const a=async()=>this.removeListener(t,e);return Promise.resolve({remove:a})}async removeAllListeners(){this.listeners={};for(const t in this.windowListeners)this.removeWindowListener(this.windowListeners[t]);this.windowListeners={}}notifyListeners(t,e,n){const s=this.listeners[t];if(!s){if(n){let r=this.retainedEventArguments[t];r||(r=[]),r.push(e),this.retainedEventArguments[t]=r}return}s.forEach(r=>r(e))}hasListeners(t){var e;return!!(!((e=this.listeners[t])===null||e===void 0)&&e.length)}registerWindowListener(t,e){this.windowListeners[e]={registered:!1,windowEventName:t,pluginEventName:e,handler:n=>{this.notifyListeners(e,n)}}}unimplemented(t="not implemented"){return new Ln.Exception(t,Ki.Unimplemented)}unavailable(t="not available"){return new Ln.Exception(t,Ki.Unavailable)}async removeListener(t,e){const n=this.listeners[t];if(!n)return;const s=n.indexOf(e);this.listeners[t].splice(s,1),this.listeners[t].length||this.removeWindowListener(this.windowListeners[t])}addWindowListener(t){window.addEventListener(t.windowEventName,t.handler),t.registered=!0}removeWindowListener(t){t&&(window.removeEventListener(t.windowEventName,t.handler),t.registered=!1)}sendRetainedArgumentsForEvent(t){const e=this.retainedEventArguments[t];e&&(delete this.retainedEventArguments[t],e.forEach(n=>{this.notifyListeners(t,n)}))}}const ul=i=>encodeURIComponent(i).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),dl=i=>i.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class bu extends hh{async getCookies(){const t=document.cookie,e={};return t.split(";").forEach(n=>{if(n.length<=0)return;let[s,r]=n.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");s=dl(s).trim(),r=dl(r).trim(),e[s]=r}),e}async setCookie(t){try{const e=ul(t.key),n=ul(t.value),s=t.expires?`; expires=${t.expires.replace("expires=","")}`:"",r=(t.path||"/").replace("path=",""),a=t.url!=null&&t.url.length>0?`domain=${t.url}`:"";document.cookie=`${e}=${n||""}${s}; path=${r}; ${a};`}catch(e){return Promise.reject(e)}}async deleteCookie(t){try{document.cookie=`${t.key}=; Max-Age=0`}catch(e){return Promise.reject(e)}}async clearCookies(){try{const t=document.cookie.split(";")||[];for(const e of t)document.cookie=e.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(t){return Promise.reject(t)}}async clearAllCookies(){try{await this.clearCookies()}catch(t){return Promise.reject(t)}}}xi("CapacitorCookies",{web:()=>new bu});const Eu=async i=>new Promise((t,e)=>{const n=new FileReader;n.onload=()=>{const s=n.result;t(s.indexOf(",")>=0?s.split(",")[1]:s)},n.onerror=s=>e(s),n.readAsDataURL(i)}),Au=(i={})=>{const t=Object.keys(i);return Object.keys(i).map(s=>s.toLocaleLowerCase()).reduce((s,r,a)=>(s[r]=i[t[a]],s),{})},Tu=(i,t=!0)=>i?Object.entries(i).reduce((n,s)=>{const[r,a]=s;let o,c;return Array.isArray(a)?(c="",a.forEach(l=>{o=t?encodeURIComponent(l):l,c+=`${r}=${o}&`}),c.slice(0,-1)):(o=t?encodeURIComponent(a):a,c=`${r}=${o}`),`${n}&${c}`},"").substr(1):null,wu=(i,t={})=>{const e=Object.assign({method:i.method||"GET",headers:i.headers},t),s=Au(i.headers)["content-type"]||"";if(typeof i.data=="string")e.body=i.data;else if(s.includes("application/x-www-form-urlencoded")){const r=new URLSearchParams;for(const[a,o]of Object.entries(i.data||{}))r.set(a,o);e.body=r.toString()}else if(s.includes("multipart/form-data")||i.data instanceof FormData){const r=new FormData;if(i.data instanceof FormData)i.data.forEach((o,c)=>{r.append(c,o)});else for(const o of Object.keys(i.data))r.append(o,i.data[o]);e.body=r;const a=new Headers(e.headers);a.delete("content-type"),e.headers=a}else(s.includes("application/json")||typeof i.data=="object")&&(e.body=JSON.stringify(i.data));return e};class Cu extends hh{async request(t){const e=wu(t,t.webFetchExtra),n=Tu(t.params,t.shouldEncodeUrlParams),s=n?`${t.url}?${n}`:t.url,r=await fetch(s,e),a=r.headers.get("content-type")||"";let{responseType:o="text"}=r.ok?t:{};a.includes("application/json")&&(o="json");let c,l;switch(o){case"arraybuffer":case"blob":l=await r.blob(),c=await Eu(l);break;case"json":c=await r.json();break;case"document":case"text":default:c=await r.text()}const h={};return r.headers.forEach((d,u)=>{h[u]=d}),{data:c,headers:h,status:r.status,url:r.url}}async get(t){return this.request(Object.assign(Object.assign({},t),{method:"GET"}))}async post(t){return this.request(Object.assign(Object.assign({},t),{method:"POST"}))}async put(t){return this.request(Object.assign(Object.assign({},t),{method:"PUT"}))}async patch(t){return this.request(Object.assign(Object.assign({},t),{method:"PATCH"}))}async delete(t){return this.request(Object.assign(Object.assign({},t),{method:"DELETE"}))}}xi("CapacitorHttp",{web:()=>new Cu});const Ru="modulepreload",Iu=function(i,t){return new URL(i,t).href},fl={},Pr=function(t,e,n){let s=Promise.resolve();if(e&&e.length>0){let a=function(h){return Promise.all(h.map(d=>Promise.resolve(d).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};const o=document.getElementsByTagName("link"),c=document.querySelector("meta[property=csp-nonce]"),l=(c==null?void 0:c.nonce)||(c==null?void 0:c.getAttribute("nonce"));s=a(e.map(h=>{if(h=Iu(h,n),h in fl)return;fl[h]=!0;const d=h.endsWith(".css"),u=d?'[rel="stylesheet"]':"";if(!!n)for(let x=o.length-1;x>=0;x--){const p=o[x];if(p.href===h&&(!d||p.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${h}"]${u}`))return;const g=document.createElement("link");if(g.rel=d?"stylesheet":Ru,d||(g.as="script"),g.crossOrigin="",g.href=h,l&&g.setAttribute("nonce",l),document.head.appendChild(g),d)return new Promise((x,p)=>{g.addEventListener("load",x),g.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${h}`)))})}))}function r(a){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=a,window.dispatchEvent(o),!o.defaultPrevented)throw a}return s.then(a=>{for(const o of a||[])o.status==="rejected"&&r(o.reason);return t().catch(r)})},uh=xi("App",{web:()=>Pr(()=>import("./web-BuqVHhWj.js"),[],import.meta.url).then(i=>new i.AppWeb)}),Pu=xi("SplashScreen",{web:()=>Pr(()=>import("./web-1XT7Qkwg.js"),[],import.meta.url).then(i=>new i.SplashScreenWeb)});var pl;(function(i){i.Dark="DARK",i.Light="LIGHT",i.Default="DEFAULT"})(pl||(pl={}));var ml;(function(i){i.None="NONE",i.Slide="SLIDE",i.Fade="FADE"})(ml||(ml={}));const gl=xi("StatusBar"),Lu=xi("AppTrackingTransparency",{web:()=>Pr(()=>import("./web-B37rDVHy.js"),[],import.meta.url).then(i=>new i.AppTrackingTransparencyWeb)}),It=xi("WildlifePlatform",{web:()=>Pr(()=>import("./web-m4qQmrG_.js"),[],import.meta.url).then(i=>new i.WildlifePlatformWeb)});let _l=!1;function Du(){if(_l||!Ln.isNativePlatform())return;_l=!0;const i=t=>{(t.level==="error"?console.error:t.level==="warn"?console.warn:t.level==="info"?console.info:console.log)(`[WildlifePlatform:${t.tag}]`,t.msg)};(async()=>{try{await It.addListener("nativeLog",i);const{logs:t}=await It._drainEarlyNativeLogs();for(const e of t)i(e)}catch{}})()}const Uu="0.1.0";class wt{constructor(t,e,n){this.value=t,this.exception=e,this.isSuccessful=n}static success(t){return new wt(t,null,!0)}static error(t){return new wt(null,t,!1)}get errorMessages(){var t,e;return(e=(t=this.exception)===null||t===void 0?void 0:t.toString())!==null&&e!==void 0?e:"Unknown error"}voided(){return this.isSuccessful?wt.success(void 0):wt.error(this.exception)}}async function Zi(i,t,e){var n;const s=Date.now(),r=(n=e==null?void 0:e.method)!==null&&n!==void 0?n:"GET",a=typeof t=="string"?t:t.url,o=`[WildlifePlatform:${i}]`;console.log(`${o} → ${r} ${a}`);try{const c=await fetch(t,e),l=Date.now()-s,h=c.ok?"log":"warn";return console[h](`${o} ← ${c.status} ${r} ${a} (${l}ms)`),c}catch(c){const l=Date.now()-s,h=c instanceof Error?c.message:String(c);throw console.error(`${o} ✗ ${r} ${a} (${l}ms): ${h}`),c}}const vl="https://authentication-service-api-prod.authentication-service.shared-services.us-east-1.general.prod.wildlife.io",xl="wildlife_platform_security_token",Ml="wildlife_platform_account_id";class Nu{constructor(){this._securityToken=""}get securityToken(){return this._securityToken}get isAuthenticated(){return this._securityToken.length>0}async authenticate(t){var e,n,s,r;const a=(e=globalThis.localStorage)===null||e===void 0?void 0:e.getItem(xl),o=(n=globalThis.localStorage)===null||n===void 0?void 0:n.getItem(Ml);if(a&&a.length>0&&o===t.playerId&&(await this.authenticateAccount({playerId:t.playerId,tenantId:t.tenantId,securityToken:a,accountData:t.accountData})).isSuccessful)return this._securityToken=a,wt.success(this._securityToken);const c=await this.createAccount({playerId:t.playerId,tenantId:t.tenantId,accountData:t.accountData});return c.isSuccessful?(this._securityToken=c.value,(s=globalThis.localStorage)===null||s===void 0||s.setItem(xl,this._securityToken),(r=globalThis.localStorage)===null||r===void 0||r.setItem(Ml,t.playerId),wt.success(this._securityToken)):wt.error(c.exception)}async createAccount(t){var e;try{const n=await Zi("AccountService",`${vl}/accounts`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({tenantId:t.tenantId,id:t.playerId,accountData:t.accountData})});if(n.status===200){const r=await n.json();return wt.success(r.account.securityToken)}const s=await n.text().catch(()=>"");return wt.error(new Error(`Account creation failed (${n.status}): ${s}`))}catch(n){return wt.error(new Error(`Account creation error: ${(e=n==null?void 0:n.message)!==null&&e!==void 0?e:n}`))}}async authenticateAccount(t){var e;try{const n=await Zi("AccountService",`${vl}/accounts:authenticate`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({tenantId:t.tenantId,accountId:t.playerId,securityToken:t.securityToken,accountData:t.accountData})});if(n.status===200)return wt.success(void 0);const s=await n.text().catch(()=>"");return wt.error(new Error(`Authentication failed (${n.status}): ${s}`))}catch(n){return wt.error(new Error(`Authentication error: ${(e=n==null?void 0:n.message)!==null&&e!==void 0?e:n}`))}}}const kr="wildlife_platform_player_id";function Fu(){var i;return!((i=globalThis.crypto)===null||i===void 0)&&i.randomUUID?globalThis.crypto.randomUUID():"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,t=>{const e=Math.random()*16|0;return(t==="x"?e:e&3|8).toString(16)})}class qu{constructor(){this._playerId="",this._isInitialized=!1}async initialize(){this._isInitialized||(await this.loadPlayerId(),this._isInitialized=!0)}getPlayerId(){if(!this._isInitialized)throw new Error("IdentificationService is not initialized");return this._playerId}async setPlayerId(t){var e;this._playerId=t,this._isInitialized=!0,(e=globalThis.localStorage)===null||e===void 0||e.setItem(kr,t)}async loadPlayerId(){var t,e,n;let s=(e=(t=globalThis.localStorage)===null||t===void 0?void 0:t.getItem(kr))!==null&&e!==void 0?e:null;s==null&&(s=Fu(),(n=globalThis.localStorage)===null||n===void 0||n.setItem(kr,s)),this._playerId=s}}class Ts{constructor(t,e,n,s){this.id=t,this.score=e,this.rank=n,this.metadata=s}static fromJson(t,e){let n;return t.metadata!=null&&e?n=e(t.metadata):t.metadata!=null&&(n=t.metadata),new Ts(t.publicID,Number(t.score),t.rank,n)}toJson(){const t={publicID:this.id,score:this.score,rank:this.rank};return this.metadata!=null&&(t.metadata=this.metadata),t}}class xe extends Error{constructor(t,e){super(t),this.name="LeaderboardException",this.statusCode=e}static badRequest(){return new xe("bad request",400)}static unauthorized(){return new xe("unauthorized access",401)}static notFound(){return new xe("success on communication, but no entity was found",404)}static internalServerError(){return new xe("internal server error",500)}static unknown(t,e){return new xe(`unknown error
${t}`,e)}toString(){return`LeaderboardException(${this.statusCode}): ${this.message}`}}class Vu{constructor(t,e,n,s){this.leaderboardId=t,this.api=e,this.cache=n,this.metadataFromJson=s}async fetchEntity(t){var e;const n=await this.api.getMembers(this.leaderboardId,[t],this.metadataFromJson);if(!n.isSuccessful)return wt.error(n.exception);const s=(e=n.value)!==null&&e!==void 0?e:[];return s.length===0?wt.error(xe.notFound()):(this.cache.cacheMembers(this.leaderboardId,this.leaderboardId,s,[t]),this.cache.cacheMembers("getMembers",this.leaderboardId,s,[t]),wt.success(s[0]))}async fetchEntities(t){const e=await this.api.getMembers(this.leaderboardId,t,this.metadataFromJson);return e.isSuccessful&&this.cache.cacheMembers("getMembers",this.leaderboardId,e.value,t),e}async fetchTopEntities(t=10){const e=this.validatePageSize(t);if(e)return e;const n=await this.api.getTopMembers(this.leaderboardId,t,this.metadataFromJson);return n.isSuccessful&&this.cache.cacheMembers("getTopMembers",this.leaderboardId,n.value,[String(t)]),n}async fetchEntitiesAroundEntity(t,e=10){const n=this.validatePageSize(e);if(n)return n;const s=await this.api.getMembersAroundMember(this.leaderboardId,t,e,this.metadataFromJson);return s.isSuccessful&&this.cache.cacheMembers("getMembersAroundMember",this.leaderboardId,s.value,[t,String(e)]),s}getCachedEntity(t){const e=this.cache.getMembers("getMembers",this.leaderboardId,{metadataFromJson:this.metadataFromJson,keyParts:[t]});return e&&e.length>0?e[0]:null}getCachedEntities(t){return this.cache.getMembers("getMembers",this.leaderboardId,{metadataFromJson:this.metadataFromJson,keyParts:t})}getCachedTopEntities(t=10){return this.cache.getMembers("getTopMembers",this.leaderboardId,{metadataFromJson:this.metadataFromJson,keyParts:[String(t)]})}getCachedEntitiesAroundEntity(t,e=10){return this.cache.getMembers("getMembersAroundMember",this.leaderboardId,{metadataFromJson:this.metadataFromJson,keyParts:[t,String(e)]})}async upsertScore(t,e,n=-1){const s=await this.api.upsertScore(this.leaderboardId,t,e,n);if(!s.isSuccessful)return wt.error(s.exception);const r=s.value;if(r.publicID!==t)return wt.error(xe.notFound());const a=this.getCachedEntity(t),o=new Ts(t,e,r.rank,a==null?void 0:a.metadata);return this.cache.cacheMembers("getMembers",this.leaderboardId,[o],[t]),wt.success(o)}validatePageSize(t){return t<1||t>100?wt.error(xe.badRequest()):null}}const Ou=12,Bu="leaderboard_cache_";function ku(i){let t=5381;const e=i.join(":");for(let n=0;n<e.length;n++)t=(t<<5)+t+e.charCodeAt(n)|0;return String(t)}class zu{cacheMembers(t,e,n,s){var r;const a=this.buildKey(t,e,s),o=JSON.stringify({writeTime:new Date().toISOString(),members:n.map(c=>c.toJson())});(r=globalThis.localStorage)===null||r===void 0||r.setItem(a,o)}getMembers(t,e,n={}){var s,r,a;const o=this.buildKey(t,e,n.keyParts),c=(s=globalThis.localStorage)===null||s===void 0?void 0:s.getItem(o);if(!c)return null;let l;try{l=JSON.parse(c)}catch{return(r=globalThis.localStorage)===null||r===void 0||r.removeItem(o),null}const h=new Date(l.writeTime);return Date.now()-h.getTime()>=Ou*3600*1e3?((a=globalThis.localStorage)===null||a===void 0||a.removeItem(o),null):l.members.map(u=>Ts.fromJson(u,n.metadataFromJson))}buildKey(t,e,n){const s=[t,e];return n&&s.push(...[...n].sort()),`${Bu}${ku(s)}`}}class Do{constructor(t,e,n,s,r){this.success=t,this.publicID=e,this.rank=n,this.previousRank=s,this.expireAt=r}static fromJson(t){return new Do(t.success,t.publicID,t.rank,t.previousRank,t.expireAt)}}const Ls="https://podium.shared-services.us-east-1.general.prod.wildlife.io";class Gu{constructor(t){this.headers=t}async getTopMembers(t,e,n){const s=`${Ls}/l/${t}/top/1?pageSize=${e}`;return this.getRequest(s,n)}async getMembers(t,e,n){const s=`${Ls}/l/${t}/members?ids=${e.join(",")}`;return this.getRequest(s,n)}async getMembersAroundMember(t,e,n,s){const r=`${Ls}/l/${t}/members/${e}/around?pageSize=${n}`;return this.getRequest(r,s)}async upsertScore(t,e,n,s=-1){var r;let a=`${Ls}/l/${t}/members/${e}/score`;s!==-1&&(a+=`?scoreTTL=${s}`);try{const o=await Zi("Podium",a,{method:"PUT",headers:Object.assign(Object.assign({},this.headers),{"Content-Type":"application/json"}),body:JSON.stringify({score:n})});return this.handleUpsertResponse(o)}catch(o){return wt.error(xe.unknown(String((r=o==null?void 0:o.message)!==null&&r!==void 0?r:o),0))}}async getRequest(t,e){var n;try{const s=await Zi("Podium",t,{headers:this.headers});return this.handleResponse(s,e)}catch(s){return wt.error(xe.unknown(String((n=s==null?void 0:s.message)!==null&&n!==void 0?n:s),0))}}async handleResponse(t,e){var n;switch(t.status){case 200:{const r=((n=(await t.json()).members)!==null&&n!==void 0?n:[]).map(a=>Ts.fromJson(a,e));return wt.success(r)}case 400:return wt.error(xe.badRequest());case 401:return wt.error(xe.unauthorized());case 404:return wt.error(xe.notFound());case 500:return wt.error(xe.internalServerError());default:{const s=await t.text().catch(()=>"");return wt.error(xe.unknown(s,t.status))}}}async handleUpsertResponse(t){switch(t.status){case 200:{const e=await t.json();return wt.success(Do.fromJson(e))}case 400:return wt.error(xe.badRequest());case 401:return wt.error(xe.unauthorized());case 404:return wt.error(xe.notFound());case 500:return wt.error(xe.internalServerError());default:{const e=await t.text().catch(()=>"");return wt.error(xe.unknown(e,t.status))}}}}class Hu{constructor(){this.isInitialized=!1}initialize(t){this.isInitialized||(this.api=new Gu(t),this.cache=new zu,this.isInitialized=!0)}fetch(t,e){if(!this.isInitialized||!this.api||!this.cache)throw new Error("LeaderboardsService is not initialized");return new Vu(t,this.api,this.cache,e)}}class es{constructor(t,e,n="",s="",r={}){this.accountId=t,this.name=e,this.region=n,this.pictureUrl=s,this.metadata=r}static fromJson(t){var e,n,s,r;const a=(e=t.metadata)!==null&&e!==void 0?e:{},o={};for(const[c,l]of Object.entries(a))o[c]=String(l);return new es(t.accountId,(n=t.name)!==null&&n!==void 0?n:"",(s=t.region)!==null&&s!==void 0?s:"",(r=t.pictureUrl)!==null&&r!==void 0?r:"",o)}toJson(){return{accountId:this.accountId,name:this.name,region:this.region,pictureUrl:this.pictureUrl,metadata:this.metadata}}}class Ee extends Error{constructor(t,e){super(t),this.name="PlayerProfileException",this.statusCode=e}static badRequest(){return new Ee("bad request",400)}static unauthorized(){return new Ee("unauthorized access",401)}static notFound(){return new Ee("success on communication, but no entity was found",404)}static internalServerError(){return new Ee("internal server error",500)}static unknown(t,e){return new Ee(`unknown error
${t}`,e)}toString(){return`PlayerProfileException(${this.statusCode}): ${this.message}`}}const Sl="https://cloud-save-api.cloud-save.shared-services.us-east-1.general.prod.wildlife.io",yl="wildlife-platform-player-profile";class Wu{constructor(t,e,n,s){this.headers=t,this.tenantId=e,this.accountId=n,this.deviceId=s}async fetchPublicProfiles(t){var e;const n=`${Sl}/get-public-documents/${yl}`,s=JSON.stringify({tenant_id:this.tenantId,account_id:this.accountId,public_account_ids:t});try{const r=await Zi("CloudSave",n,{method:"POST",headers:Object.assign(Object.assign({},this.headers),{"Content-Type":"application/json"}),body:s});return this.handleFetchResponse(r)}catch(r){return wt.error(Ee.unknown(String((e=r==null?void 0:r.message)!==null&&e!==void 0?e:r),0))}}async publishProfile(t){var e;const n=`${Sl}/public-documents/${yl}`,s=JSON.stringify({tenant_id:this.tenantId,account_id:this.accountId,device_id:this.deviceId,document:t.toJson()});try{const r=await Zi("CloudSave",n,{method:"POST",headers:Object.assign(Object.assign({},this.headers),{"Content-Type":"application/json"}),body:s});return this.handlePublishResponse(r,t)}catch(r){return wt.error(Ee.unknown(String((e=r==null?void 0:r.message)!==null&&e!==void 0?e:r),0))}}async handleFetchResponse(t){var e;switch(t.status){case 200:{const n=await t.json(),s={};for(const r of(e=n.documents)!==null&&e!==void 0?e:[]){const a=r.accountId,o=Object.assign(Object.assign({},r.data),{accountId:a});s[a]=es.fromJson(o)}return wt.success(s)}case 400:return wt.error(Ee.badRequest());case 401:return wt.error(Ee.unauthorized());case 404:return wt.error(Ee.notFound());case 500:return wt.error(Ee.internalServerError());default:{const n=await t.text().catch(()=>"");return wt.error(Ee.unknown(n,t.status))}}}async handlePublishResponse(t,e){switch(t.status){case 200:return wt.success(e);case 400:return wt.error(Ee.badRequest());case 401:return wt.error(Ee.unauthorized());case 404:return wt.error(Ee.notFound());case 500:return wt.error(Ee.internalServerError());default:{const n=await t.text().catch(()=>"");return wt.error(Ee.unknown(n,t.status))}}}}const Xu=12,Ds="player_profile_cache_";class Yu{cacheProfile(t,e){var n;const s=JSON.stringify({writeTime:new Date().toISOString(),profile:e.toJson()});(n=globalThis.localStorage)===null||n===void 0||n.setItem(`${Ds}${t}`,s)}getProfile(t){var e,n,s;const r=(e=globalThis.localStorage)===null||e===void 0?void 0:e.getItem(`${Ds}${t}`);if(!r)return null;let a;try{a=JSON.parse(r)}catch{return(n=globalThis.localStorage)===null||n===void 0||n.removeItem(`${Ds}${t}`),null}const o=new Date(a.writeTime);return Date.now()-o.getTime()>=Xu*3600*1e3?((s=globalThis.localStorage)===null||s===void 0||s.removeItem(`${Ds}${t}`),null):es.fromJson(a.profile)}cacheProfiles(t){for(const[e,n]of Object.entries(t))this.cacheProfile(e,n)}getProfiles(t){const e={};for(const n of t){const s=this.getProfile(n);s&&(e[n]=s)}return e}}class Ku{constructor(){this.isInitialized=!1,this.playerId=""}initialize(t){this.isInitialized||(this.api=new Wu(t.platformHeaders,t.tenantId,t.playerId,t.deviceId),this.cache=new Yu,this.playerId=t.playerId,this.isInitialized=!0)}async fetchMyProfile(){this.requireInit();const t=await this.fetchPublicProfiles([this.playerId]);if(!t.isSuccessful)return wt.error(t.exception);const e=t.value;return this.playerId in e?wt.success(e[this.playerId]):wt.error(Ee.notFound())}async fetchPublicProfiles(t){this.requireInit();const e=await this.api.fetchPublicProfiles(t);return e.isSuccessful&&this.cache&&this.cache.cacheProfiles(e.value),e}async publishProfile(t){this.requireInit();const e=await this.api.publishProfile(t);return e.isSuccessful&&this.cache&&this.cache.cacheProfile(this.playerId,e.value),e}async publishPlayerProfile(t){const e=new es(this.playerId,t.name,t.region,t.pictureUrl,t.metadata);return this.publishProfile(e)}get cachedProfile(){var t,e;return this.requireInit(),(e=(t=this.cache)===null||t===void 0?void 0:t.getProfile(this.playerId))!==null&&e!==void 0?e:null}requireInit(){if(!this.isInitialized)throw new Error("PlayerProfilesService is not initialized")}}class Zu{constructor(){this._isInitialized=!1}async initialize(t){this._isInitialized||(await It.singular_initialize({playerId:t.playerId,firstUserInstallId:t.firstUserInstallId,installId:t.installId,facebookAnonymousId:t.facebookAnonymousId}),this._isInitialized=!0)}async trackEvent(t,e){this._isInitialized&&await It.singular_trackEvent({eventName:t,attributes:e})}async trackRevenue(t,e,n,s){this._isInitialized&&await It.singular_trackRevenue({eventName:t,currency:e,amount:n,attributes:s})}}const bl="0.1.0";class ju{constructor(){this._isInitialized=!1,this._accountService=new Nu,this._identificationService=new qu,this._leaderboardsService=new Hu,this._playerProfilesService=new Ku,this._singularService=new Zu,this.deviceInfoGetDeviceName=async()=>(await It.deviceInfo_getDeviceName()).value,this.deviceInfoGetDeviceModel=async()=>(await It.deviceInfo_getDeviceModel()).value,this.deviceInfoGetDeviceRegion=async()=>(await It.deviceInfo_getDeviceRegion()).value,this.deviceInfoGetDeviceLanguage=async()=>(await It.deviceInfo_getDeviceLanguage()).value,this.deviceInfoGetDeviceTimezone=async()=>(await It.deviceInfo_getDeviceTimezone()).value,this.deviceInfoGetDeviceSystemVersion=async()=>(await It.deviceInfo_getDeviceSystemVersion()).value,this.deviceInfoGetAppBundle=async()=>(await It.deviceInfo_getAppBundle()).value,this.deviceInfoGetAppVersion=async()=>(await It.deviceInfo_getAppVersion()).value,this.deviceInfoGetAppBuildNumber=async()=>(await It.deviceInfo_getAppBuildNumber()).value,Du()}get accountService(){return this._accountService}get identificationService(){return this._identificationService}get leaderboardsService(){return this._leaderboardsService}get playerProfilesService(){return this._playerProfilesService}get singularService(){return this._singularService}get isInitialized(){return this._isInitialized}async initialize(t){var e,n,s,r,a,o,c,l,h,d,u;if(this._isInitialized)throw new Error("Platform already initialized");await this._identificationService.initialize(),t.playerId!=null&&await this._identificationService.setPlayerId(t.playerId);const m=this._identificationService.getPlayerId();await It.initialize({appId:t.appId,playerId:m,platformVersion:bl,tenantId:`${t.appId}:${t.environment}`});const g=(e=await this.deviceInfoGetAppBundle())!==null&&e!==void 0?e:t.appId,x=`${t.appId}:${t.environment}`,p=(n=await this.getDeviceId())!==null&&n!==void 0?n:"",f=!((s=await this.getPlatformVersion())===null||s===void 0)&&s.toLowerCase().includes("ios")?"ios":"android",M={fiu:p,bundleId:g,platform:f,buildNumber:(r=await this.deviceInfoGetAppBuildNumber())!==null&&r!==void 0?r:"1",deviceType:(a=await this.deviceInfoGetDeviceModel())!==null&&a!==void 0?a:"unknown",clientVersion:(o=await this.deviceInfoGetAppVersion())!==null&&o!==void 0?o:"1.0.0",language:(c=await this.deviceInfoGetDeviceLanguage())!==null&&c!==void 0?c:"en",osVersion:(l=await this.deviceInfoGetDeviceSystemVersion())!==null&&l!==void 0?l:"unknown",region:(h=await this.deviceInfoGetDeviceRegion())!==null&&h!==void 0?h:"US"};await this._accountService.authenticate({playerId:m,tenantId:x,accountData:M});const E={"Wildlife-Platform-SDK-Version":bl,"Wildlife-Platform-Bundle-Id":g,"Wildlife-Platform-Tenant-Id":x,"Wildlife-Platform-Player-Id":m,"Wildlife-Platform-Runtime-Platform":"Capacitor"};this._accountService.isAuthenticated&&(E["Wildlife-Platform-Player-Token"]=this._accountService.securityToken),this._leaderboardsService.initialize(E),this._playerProfilesService.initialize({platformHeaders:E,playerId:m,tenantId:x,deviceId:p});const y=await this.getFirstInstall(),w=await this.getCurrentInstall(),T=(d=y==null?void 0:y.gameInstallId)!==null&&d!==void 0?d:"",R=(u=w==null?void 0:w.gameInstallId)!==null&&u!==void 0?u:"";await this._singularService.initialize({playerId:m,firstUserInstallId:T,installId:R,facebookAnonymousId:t.facebookAnonymousId}),this._isInitialized=!0,t.facebookAnonymousId!=null&&await this.analyticsSendEvent("singular:ConfigureFBAnon",{anonId:t.facebookAnonymousId,init:"automatic"})}requireInit(){if(!this._isInitialized)throw new Error("Platform is not initialized")}async getPlatformVersion(){return(await It.getPlatformVersion()).value}async getNativeSdkVersion(){return(await It.getNativeSdkVersion()).value}get pluginVersion(){return Uu}async setPlatformHeaders(t){await It.networking_setPlatformHeaders(t)}async trackingTransparencyGetAdvertisementId(){return(await It.trackingTransparency_getAdvertisementId()).value}async getInstallId(){return(await It.identification_getDeviceId()).value}async getDeviceId(){return(await It.identification_getDeviceId()).value}async getCurrentInstall(){return(await It.identification_getCurrentInstall()).value}async getFirstInstall(){return(await It.identification_getFirstInstall()).value}async analyticsSendEvent(t,e,n=!1){this.requireInit(),await It.analytics_sendEvent({eventType:t,eventParameters:e,oneTimeEvent:n})}async analyticsTriggerAllEventsUpload(){this.requireInit(),await It.analytics_triggerAllEventsUpload()}get analyticsIsFirstSession(){return It.analytics_isFirstSession().then(t=>t.value)}get analyticsIsReinstall(){return It.analytics_isReinstall().then(t=>t.value)}get analyticsNumSessions(){return It.analytics_numSessions().then(t=>t.value)}get analyticsFirstInstallId(){return It.analytics_firstInstallId().then(t=>t.value)}get analyticsFirstInstallAppVersion(){return It.analytics_firstInstallAppVersion().then(t=>t.value)}get analyticsActivationDate(){return It.analytics_activationDate().then(t=>t.value)}async purchasesInitialize(t){this.requireInit(),await It.purchases_initialize(t)}async purchasesBuyProduct(t,e){this.requireInit(),await It.purchases_buyProduct({itemId:t,placement:e})}async purchasesRestorePurchases(){this.requireInit(),await It.purchases_restorePurchases()}async purchasesGetProductsList(){return this.requireInit(),(await It.purchases_getProductsList()).value}async purchasesFinishTransaction(t,e){this.requireInit(),await It.purchases_finishTransaction({productId:t,transactionId:e})}async remoteConfigInitialize(){this.requireInit(),await It.remoteconfig_initialize()}async remoteConfigFetch(){this.requireInit(),await It.remoteconfig_fetch()}async remoteConfigActivate(){this.requireInit(),await It.remoteconfig_activate()}async remoteConfigGetAll(){return this.requireInit(),It.remoteconfig_getAll()}async remoteConfigGetValue(t){return this.requireInit(),(await It.remoteconfig_getValue({key:t})).value}async remoteConfigGetBoolean(t){return this.requireInit(),(await It.remoteconfig_getBoolean({key:t})).value}async remoteConfigGetString(t){return this.requireInit(),(await It.remoteconfig_getString({key:t})).value}async remoteConfigGetInt(t){return this.requireInit(),(await It.remoteconfig_getInt({key:t})).value}async remoteConfigGetDouble(t){return this.requireInit(),(await It.remoteconfig_getDouble({key:t})).value}addAnalyticsListener(t){return It.addListener("analyticsEvents",t)}addPurchaseListener(t){return It.addListener("purchaseEvents",t)}addRemoteConfigListener(t){return It.addListener("remoteConfigEvents",t)}}let zr=null;function Er(){return zr||(zr=new ju),zr}var El;(function(i){i.providerNotFound="providerNotFound",i.invalidScopeArgument="invalidScopeArgument",i.timeoutException="timeoutException",i.unexpectedException="unexpectedException",i.networkError="networkError",i.deserializationError="deserializationError"})(El||(El={}));var Al;(function(i){i.remote="remote",i.local="local",i.fallback="fallback",i.cache="cache"})(Al||(Al={}));const Ju=""+new URL("splash-art-CZSKqKGm.jpg",import.meta.url).href,$u=18;let Hi,Wi,Na,Tl,Ar,Tr,dh;function Qu(){Hi=document.getElementById("loader"),Wi=document.getElementById("progress-bar"),Na=document.getElementById("loader-status"),Tl=document.getElementById("loader-title"),Ar=document.getElementById("loader-shell-version"),Tr=document.getElementById("loader-content-version"),dh=document.getElementById("particles"),Hi.style.backgroundImage=`url(${Ju})`,Hi.classList.add("has-splash"),Tl.textContent="soccer1x1-37",Ar.textContent="Shell v...",Tr.textContent="Content v1.2.3",nd(),fh(!0)}function td(i){Ar&&(Ar.textContent=`Shell v${i}`);const t=document.getElementById("error-shell-version");t&&(t.textContent=`Shell v${i}`)}function ed(i){Tr&&(Tr.textContent=`Content v${i}`);const t=document.getElementById("error-content-version");t&&(t.textContent=`Content v${i}`);const e=document.getElementById("loader-bundle-checksum");if(e){const n=localStorage.getItem("ota_current_checksum")||"";e.textContent=n?`Bundle: ${n.slice(7,19)}`:"Bundle: built-in"}}function nd(){for(let i=0;i<$u;i++){const t=document.createElement("div");t.className="particle";const e=2+Math.random()*4,n=Math.random()*100,s=8+Math.random()*12,r=Math.random()*s;t.style.cssText=`
      width: ${e}px; height: ${e}px;
      left: ${n}%;
      bottom: -${e}px;
      animation-duration: ${s}s;
      animation-delay: -${r}s;
    `,dh.appendChild(t)}}function Us(i){Na&&(Na.textContent=i)}function wl(i){Wi&&(fh(!1),Wi.style.width=`${Math.min(100,Math.max(0,i))}%`)}function fh(i){Wi&&(i?Wi.classList.add("indeterminate"):Wi.classList.remove("indeterminate"))}function id(){return new Promise(i=>{if(!Hi)return i();Hi.classList.add("fade-out"),setTimeout(()=>{Hi.style.display="none",i()},500)})}let Uo,ph,Cl,Fa=null;function sd(){Uo=document.getElementById("error-screen"),ph=document.getElementById("error-message"),Cl=document.getElementById("error-retry");const i=document.getElementById("error-shell-version"),t=document.getElementById("error-content-version");i&&(i.textContent="Shell v..."),t&&(t.textContent="Content v1.2.3"),Cl.addEventListener("click",()=>{Fa?(ad(),Fa()):window.location.reload()})}function rd(i,t){Fa=t||null,ph.textContent=i,Uo.hidden=!1}function ad(){Uo.hidden=!0}const od="",Gr=!1,Ns="1.2.3",Ei=(...i)=>console.log("[OTA]",...i);let ld=null,ki={};function Rl(i,t){(ki[i]||[]).forEach(e=>e(t))}function Hr(){return Ln.isNativePlatform()}const kn={on(i,t){return ki[i]||(ki[i]=[]),ki[i].push(t),()=>{ki[i]=ki[i].filter(e=>e!==t)}},async init(){Ei("Config:",JSON.stringify({OTA_ENABLED:Gr,OTA_MANIFEST_URL:od,CURRENT_VERSION:Ns,native:Hr()}));{Ei("Skipping — OTA_ENABLED:",Gr,"native:",Hr()),Rl("status","OTA skipped (web or disabled)");return}},async checkForUpdate(){return Ei("Check skipped — OTA_ENABLED:",Gr,"OTA_MANIFEST_URL:","(empty)"),null},async downloadUpdate(i){return Ei("Download skipped — plugin not available"),Rl("status","Updater not available"),null},async applyNow(){{Ei("applyNow() skipped — no pending bundle or plugin");return}},async getShellVersion(){if(Hr())try{return(await uh.getInfo()).version||Ns}catch{}return Ns},async getContentVersion(){return Ei("Content version: using shell version (no plugin or web)"),Ns},hasPendingUpdate(){return ld!==null}};/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const No="183",cd=0,Il=1,hd=2,mr=1,mh=2,vs=3,$n=0,We=1,qe=2,Un=0,Xi=1,Pl=2,Ll=3,Dl=4,ud=5,ui=100,dd=101,fd=102,pd=103,md=104,gd=200,_d=201,vd=202,xd=203,qa=204,Va=205,Md=206,Sd=207,yd=208,bd=209,Ed=210,Ad=211,Td=212,wd=213,Cd=214,Oa=0,Ba=1,ka=2,ji=3,za=4,Ga=5,Ha=6,Wa=7,Fo=0,Rd=1,Id=2,xn=0,gh=1,_h=2,vh=3,xh=4,Mh=5,Sh=6,yh=7,bh=300,_i=301,Ji=302,Wr=303,Xr=304,Lr=306,Xa=1e3,Dn=1001,Ya=1002,Pe=1003,Pd=1004,Fs=1005,Ve=1006,Yr=1007,mi=1008,je=1009,Eh=1010,Ah=1011,Ms=1012,qo=1013,Sn=1014,ln=1015,Fn=1016,Vo=1017,Oo=1018,Ss=1020,Th=35902,wh=35899,Ch=1021,Rh=1022,cn=1023,qn=1026,gi=1027,Bo=1028,ko=1029,$i=1030,zo=1031,Go=1033,gr=33776,_r=33777,vr=33778,xr=33779,Ka=35840,Za=35841,ja=35842,Ja=35843,$a=36196,Qa=37492,to=37496,eo=37488,no=37489,io=37490,so=37491,ro=37808,ao=37809,oo=37810,lo=37811,co=37812,ho=37813,uo=37814,fo=37815,po=37816,mo=37817,go=37818,_o=37819,vo=37820,xo=37821,Mo=36492,So=36494,yo=36495,bo=36283,Eo=36284,Ao=36285,To=36286,Ld=3200,Ih=0,Dd=1,Kn="",$e="srgb",Qi="srgb-linear",wr="linear",te="srgb",Ai=7680,Ul=519,Ud=512,Nd=513,Fd=514,Ho=515,qd=516,Vd=517,Wo=518,Od=519,Nl=35044,Fl="300 es",_n=2e3,ys=2001;function Bd(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function bs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function kd(){const i=bs("canvas");return i.style.display="block",i}const ql={};function Vl(...i){const t="THREE."+i.shift();console.log(t,...i)}function Ph(i){const t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){const e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Dt(...i){i=Ph(i);const t="THREE."+i.shift();{const e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function Xt(...i){i=Ph(i);const t="THREE."+i.shift();{const e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function Cr(...i){const t=i.join(" ");t in ql||(ql[t]=!0,Dt(...i))}function zd(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const Gd={[Oa]:Ba,[ka]:Ha,[za]:Wa,[ji]:Ga,[Ba]:Oa,[Ha]:ka,[Wa]:za,[Ga]:ji};class ns{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const s=n[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const Ne=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Kr=Math.PI/180,wo=180/Math.PI;function ws(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ne[i&255]+Ne[i>>8&255]+Ne[i>>16&255]+Ne[i>>24&255]+"-"+Ne[t&255]+Ne[t>>8&255]+"-"+Ne[t>>16&15|64]+Ne[t>>24&255]+"-"+Ne[e&63|128]+Ne[e>>8&255]+"-"+Ne[e>>16&255]+Ne[e>>24&255]+Ne[n&255]+Ne[n>>8&255]+Ne[n>>16&255]+Ne[n>>24&255]).toLowerCase()}function Gt(i,t,e){return Math.max(t,Math.min(e,i))}function Hd(i,t){return(i%t+t)%t}function Zr(i,t,e){return(1-e)*i+e*t}function rs(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Ge(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class Ht{constructor(t=0,e=0){Ht.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Gt(this.x,t.x,e.x),this.y=Gt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Gt(this.x,t,e),this.y=Gt(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Gt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Gt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class is{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let c=n[s+0],l=n[s+1],h=n[s+2],d=n[s+3],u=r[a+0],m=r[a+1],g=r[a+2],x=r[a+3];if(d!==x||c!==u||l!==m||h!==g){let p=c*u+l*m+h*g+d*x;p<0&&(u=-u,m=-m,g=-g,x=-x,p=-p);let f=1-o;if(p<.9995){const M=Math.acos(p),E=Math.sin(M);f=Math.sin(f*M)/E,o=Math.sin(o*M)/E,c=c*f+u*o,l=l*f+m*o,h=h*f+g*o,d=d*f+x*o}else{c=c*f+u*o,l=l*f+m*o,h=h*f+g*o,d=d*f+x*o;const M=1/Math.sqrt(c*c+l*l+h*h+d*d);c*=M,l*=M,h*=M,d*=M}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,s,r,a){const o=n[s],c=n[s+1],l=n[s+2],h=n[s+3],d=r[a],u=r[a+1],m=r[a+2],g=r[a+3];return t[e]=o*g+h*d+c*m-l*u,t[e+1]=c*g+h*u+l*d-o*m,t[e+2]=l*g+h*m+o*u-c*d,t[e+3]=h*g-o*d-c*u-l*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(s/2),d=o(r/2),u=c(n/2),m=c(s/2),g=c(r/2);switch(a){case"XYZ":this._x=u*h*d+l*m*g,this._y=l*m*d-u*h*g,this._z=l*h*g+u*m*d,this._w=l*h*d-u*m*g;break;case"YXZ":this._x=u*h*d+l*m*g,this._y=l*m*d-u*h*g,this._z=l*h*g-u*m*d,this._w=l*h*d+u*m*g;break;case"ZXY":this._x=u*h*d-l*m*g,this._y=l*m*d+u*h*g,this._z=l*h*g+u*m*d,this._w=l*h*d-u*m*g;break;case"ZYX":this._x=u*h*d-l*m*g,this._y=l*m*d+u*h*g,this._z=l*h*g-u*m*d,this._w=l*h*d+u*m*g;break;case"YZX":this._x=u*h*d+l*m*g,this._y=l*m*d+u*h*g,this._z=l*h*g-u*m*d,this._w=l*h*d-u*m*g;break;case"XZY":this._x=u*h*d-l*m*g,this._y=l*m*d-u*h*g,this._z=l*h*g+u*m*d,this._w=l*h*d+u*m*g;break;default:Dt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],c=e[9],l=e[2],h=e[6],d=e[10],u=n+o+d;if(u>0){const m=.5/Math.sqrt(u+1);this._w=.25/m,this._x=(h-c)*m,this._y=(r-l)*m,this._z=(a-s)*m}else if(n>o&&n>d){const m=2*Math.sqrt(1+n-o-d);this._w=(h-c)/m,this._x=.25*m,this._y=(s+a)/m,this._z=(r+l)/m}else if(o>d){const m=2*Math.sqrt(1+o-n-d);this._w=(r-l)/m,this._x=(s+a)/m,this._y=.25*m,this._z=(c+h)/m}else{const m=2*Math.sqrt(1+d-n-o);this._w=(a-s)/m,this._x=(r+l)/m,this._y=(c+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Gt(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+a*o+s*l-r*c,this._y=s*h+a*c+r*o-n*l,this._z=r*h+a*l+n*c-s*o,this._w=a*h-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let c=1-e;if(o<.9995){const l=Math.acos(o),h=Math.sin(l);c=Math.sin(c*l)/h,e=Math.sin(e*l)/h,this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+a*e,this._onChangeCallback()}else this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+a*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class N{constructor(t=0,e=0,n=0){N.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Ol.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Ol.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*s-o*n),h=2*(o*e-r*s),d=2*(r*n-a*e);return this.x=e+c*l+a*d-o*h,this.y=n+c*h+o*l-r*d,this.z=s+c*d+r*h-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Gt(this.x,t.x,e.x),this.y=Gt(this.y,t.y,e.y),this.z=Gt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Gt(this.x,t,e),this.y=Gt(this.y,t,e),this.z=Gt(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Gt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,c=e.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return jr.copy(this).projectOnVector(t),this.sub(jr)}reflect(t){return this.sub(jr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Gt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const jr=new N,Ol=new is;class Ft{constructor(t,e,n,s,r,a,o,c,l){Ft.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l)}set(t,e,n,s,r,a,o,c,l){const h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],d=n[7],u=n[2],m=n[5],g=n[8],x=s[0],p=s[3],f=s[6],M=s[1],E=s[4],y=s[7],w=s[2],T=s[5],R=s[8];return r[0]=a*x+o*M+c*w,r[3]=a*p+o*E+c*T,r[6]=a*f+o*y+c*R,r[1]=l*x+h*M+d*w,r[4]=l*p+h*E+d*T,r[7]=l*f+h*y+d*R,r[2]=u*x+m*M+g*w,r[5]=u*p+m*E+g*T,r[8]=u*f+m*y+g*R,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8];return e*a*h-e*o*l-n*r*h+n*o*c+s*r*l-s*a*c}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],d=h*a-o*l,u=o*c-h*r,m=l*r-a*c,g=e*d+n*u+s*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/g;return t[0]=d*x,t[1]=(s*l-h*n)*x,t[2]=(o*n-s*a)*x,t[3]=u*x,t[4]=(h*e-s*c)*x,t[5]=(s*r-o*e)*x,t[6]=m*x,t[7]=(n*c-l*e)*x,t[8]=(a*e-n*r)*x,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+t,-s*l,s*c,-s*(-l*a+c*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Jr.makeScale(t,e)),this}rotate(t){return this.premultiply(Jr.makeRotation(-t)),this}translate(t,e){return this.premultiply(Jr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Jr=new Ft,Bl=new Ft().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),kl=new Ft().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Wd(){const i={enabled:!0,workingColorSpace:Qi,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===te&&(s.r=Nn(s.r),s.g=Nn(s.g),s.b=Nn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===te&&(s.r=Yi(s.r),s.g=Yi(s.g),s.b=Yi(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Kn?wr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Cr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Cr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Qi]:{primaries:t,whitePoint:n,transfer:wr,toXYZ:Bl,fromXYZ:kl,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:$e},outputColorSpaceConfig:{drawingBufferColorSpace:$e}},[$e]:{primaries:t,whitePoint:n,transfer:te,toXYZ:Bl,fromXYZ:kl,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:$e}}}),i}const Yt=Wd();function Nn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Yi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Ti;class Xd{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Ti===void 0&&(Ti=bs("canvas")),Ti.width=t.width,Ti.height=t.height;const s=Ti.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=Ti}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=bs("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Nn(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Nn(e[n]/255)*255):e[n]=Nn(e[n]);return{data:e,width:t.width,height:t.height}}else return Dt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Yd=0;class Xo{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Yd++}),this.uuid=ws(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push($r(s[a].image)):r.push($r(s[a]))}else r=$r(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function $r(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Xd.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Dt("Texture: Unable to serialize Texture."),{})}let Kd=0;const Qr=new N;class Le extends ns{constructor(t=Le.DEFAULT_IMAGE,e=Le.DEFAULT_MAPPING,n=Dn,s=Dn,r=Ve,a=mi,o=cn,c=je,l=Le.DEFAULT_ANISOTROPY,h=Kn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Kd++}),this.uuid=ws(),this.name="",this.source=new Xo(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Ht(0,0),this.repeat=new Ht(1,1),this.center=new Ht(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ft,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Qr).x}get height(){return this.source.getSize(Qr).y}get depth(){return this.source.getSize(Qr).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){Dt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Dt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==bh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Xa:t.x=t.x-Math.floor(t.x);break;case Dn:t.x=t.x<0?0:1;break;case Ya:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Xa:t.y=t.y-Math.floor(t.y);break;case Dn:t.y=t.y<0?0:1;break;case Ya:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Le.DEFAULT_IMAGE=null;Le.DEFAULT_MAPPING=bh;Le.DEFAULT_ANISOTROPY=1;class me{constructor(t=0,e=0,n=0,s=1){me.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const c=t.elements,l=c[0],h=c[4],d=c[8],u=c[1],m=c[5],g=c[9],x=c[2],p=c[6],f=c[10];if(Math.abs(h-u)<.01&&Math.abs(d-x)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+x)<.1&&Math.abs(g+p)<.1&&Math.abs(l+m+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const E=(l+1)/2,y=(m+1)/2,w=(f+1)/2,T=(h+u)/4,R=(d+x)/4,v=(g+p)/4;return E>y&&E>w?E<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(E),s=T/n,r=R/n):y>w?y<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),n=T/s,r=v/s):w<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),n=R/r,s=v/r),this.set(n,s,r,e),this}let M=Math.sqrt((p-g)*(p-g)+(d-x)*(d-x)+(u-h)*(u-h));return Math.abs(M)<.001&&(M=1),this.x=(p-g)/M,this.y=(d-x)/M,this.z=(u-h)/M,this.w=Math.acos((l+m+f-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Gt(this.x,t.x,e.x),this.y=Gt(this.y,t.y,e.y),this.z=Gt(this.z,t.z,e.z),this.w=Gt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Gt(this.x,t,e),this.y=Gt(this.y,t,e),this.z=Gt(this.z,t,e),this.w=Gt(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Gt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Zd extends ns{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ve,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new me(0,0,t,e),this.scissorTest=!1,this.viewport=new me(0,0,t,e),this.textures=[];const s={width:t,height:e,depth:n.depth},r=new Le(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){const e={minFilter:Ve,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new Xo(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Mn extends Zd{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Lh extends Le{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Pe,this.minFilter=Pe,this.wrapR=Dn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class jd extends Le{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Pe,this.minFilter=Pe,this.wrapR=Dn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class oe{constructor(t,e,n,s,r,a,o,c,l,h,d,u,m,g,x,p){oe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l,h,d,u,m,g,x,p)}set(t,e,n,s,r,a,o,c,l,h,d,u,m,g,x,p){const f=this.elements;return f[0]=t,f[4]=e,f[8]=n,f[12]=s,f[1]=r,f[5]=a,f[9]=o,f[13]=c,f[2]=l,f[6]=h,f[10]=d,f[14]=u,f[3]=m,f[7]=g,f[11]=x,f[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new oe().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinant()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinant()===0)return this.identity();const e=this.elements,n=t.elements,s=1/wi.setFromMatrixColumn(t,0).length(),r=1/wi.setFromMatrixColumn(t,1).length(),a=1/wi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){const u=a*h,m=a*d,g=o*h,x=o*d;e[0]=c*h,e[4]=-c*d,e[8]=l,e[1]=m+g*l,e[5]=u-x*l,e[9]=-o*c,e[2]=x-u*l,e[6]=g+m*l,e[10]=a*c}else if(t.order==="YXZ"){const u=c*h,m=c*d,g=l*h,x=l*d;e[0]=u+x*o,e[4]=g*o-m,e[8]=a*l,e[1]=a*d,e[5]=a*h,e[9]=-o,e[2]=m*o-g,e[6]=x+u*o,e[10]=a*c}else if(t.order==="ZXY"){const u=c*h,m=c*d,g=l*h,x=l*d;e[0]=u-x*o,e[4]=-a*d,e[8]=g+m*o,e[1]=m+g*o,e[5]=a*h,e[9]=x-u*o,e[2]=-a*l,e[6]=o,e[10]=a*c}else if(t.order==="ZYX"){const u=a*h,m=a*d,g=o*h,x=o*d;e[0]=c*h,e[4]=g*l-m,e[8]=u*l+x,e[1]=c*d,e[5]=x*l+u,e[9]=m*l-g,e[2]=-l,e[6]=o*c,e[10]=a*c}else if(t.order==="YZX"){const u=a*c,m=a*l,g=o*c,x=o*l;e[0]=c*h,e[4]=x-u*d,e[8]=g*d+m,e[1]=d,e[5]=a*h,e[9]=-o*h,e[2]=-l*h,e[6]=m*d+g,e[10]=u-x*d}else if(t.order==="XZY"){const u=a*c,m=a*l,g=o*c,x=o*l;e[0]=c*h,e[4]=-d,e[8]=l*h,e[1]=u*d+x,e[5]=a*h,e[9]=m*d-g,e[2]=g*d-m,e[6]=o*h,e[10]=x*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Jd,t,$d)}lookAt(t,e,n){const s=this.elements;return Ye.subVectors(t,e),Ye.lengthSq()===0&&(Ye.z=1),Ye.normalize(),zn.crossVectors(n,Ye),zn.lengthSq()===0&&(Math.abs(n.z)===1?Ye.x+=1e-4:Ye.z+=1e-4,Ye.normalize(),zn.crossVectors(n,Ye)),zn.normalize(),qs.crossVectors(Ye,zn),s[0]=zn.x,s[4]=qs.x,s[8]=Ye.x,s[1]=zn.y,s[5]=qs.y,s[9]=Ye.y,s[2]=zn.z,s[6]=qs.z,s[10]=Ye.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],d=n[5],u=n[9],m=n[13],g=n[2],x=n[6],p=n[10],f=n[14],M=n[3],E=n[7],y=n[11],w=n[15],T=s[0],R=s[4],v=s[8],b=s[12],q=s[1],C=s[5],D=s[9],F=s[13],G=s[2],V=s[6],B=s[10],k=s[14],Q=s[3],j=s[7],ht=s[11],gt=s[15];return r[0]=a*T+o*q+c*G+l*Q,r[4]=a*R+o*C+c*V+l*j,r[8]=a*v+o*D+c*B+l*ht,r[12]=a*b+o*F+c*k+l*gt,r[1]=h*T+d*q+u*G+m*Q,r[5]=h*R+d*C+u*V+m*j,r[9]=h*v+d*D+u*B+m*ht,r[13]=h*b+d*F+u*k+m*gt,r[2]=g*T+x*q+p*G+f*Q,r[6]=g*R+x*C+p*V+f*j,r[10]=g*v+x*D+p*B+f*ht,r[14]=g*b+x*F+p*k+f*gt,r[3]=M*T+E*q+y*G+w*Q,r[7]=M*R+E*C+y*V+w*j,r[11]=M*v+E*D+y*B+w*ht,r[15]=M*b+E*F+y*k+w*gt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],c=t[9],l=t[13],h=t[2],d=t[6],u=t[10],m=t[14],g=t[3],x=t[7],p=t[11],f=t[15],M=c*m-l*u,E=o*m-l*d,y=o*u-c*d,w=a*m-l*h,T=a*u-c*h,R=a*d-o*h;return e*(x*M-p*E+f*y)-n*(g*M-p*w+f*T)+s*(g*E-x*w+f*R)-r*(g*y-x*T+p*R)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],d=t[9],u=t[10],m=t[11],g=t[12],x=t[13],p=t[14],f=t[15],M=e*o-n*a,E=e*c-s*a,y=e*l-r*a,w=n*c-s*o,T=n*l-r*o,R=s*l-r*c,v=h*x-d*g,b=h*p-u*g,q=h*f-m*g,C=d*p-u*x,D=d*f-m*x,F=u*f-m*p,G=M*F-E*D+y*C+w*q-T*b+R*v;if(G===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const V=1/G;return t[0]=(o*F-c*D+l*C)*V,t[1]=(s*D-n*F-r*C)*V,t[2]=(x*R-p*T+f*w)*V,t[3]=(u*T-d*R-m*w)*V,t[4]=(c*q-a*F-l*b)*V,t[5]=(e*F-s*q+r*b)*V,t[6]=(p*y-g*R-f*E)*V,t[7]=(h*R-u*y+m*E)*V,t[8]=(a*D-o*q+l*v)*V,t[9]=(n*q-e*D-r*v)*V,t[10]=(g*T-x*y+f*M)*V,t[11]=(d*y-h*T-m*M)*V,t[12]=(o*b-a*C-c*v)*V,t[13]=(e*C-n*b+s*v)*V,t[14]=(x*E-g*w-p*M)*V,t[15]=(h*w-d*E+u*M)*V,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,c=t.z,l=r*a,h=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,h*o+n,h*c-s*a,0,l*c-s*o,h*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,a=e._y,o=e._z,c=e._w,l=r+r,h=a+a,d=o+o,u=r*l,m=r*h,g=r*d,x=a*h,p=a*d,f=o*d,M=c*l,E=c*h,y=c*d,w=n.x,T=n.y,R=n.z;return s[0]=(1-(x+f))*w,s[1]=(m+y)*w,s[2]=(g-E)*w,s[3]=0,s[4]=(m-y)*T,s[5]=(1-(u+f))*T,s[6]=(p+M)*T,s[7]=0,s[8]=(g+E)*R,s[9]=(p-M)*R,s[10]=(1-(u+x))*R,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];const r=this.determinant();if(r===0)return n.set(1,1,1),e.identity(),this;let a=wi.set(s[0],s[1],s[2]).length();const o=wi.set(s[4],s[5],s[6]).length(),c=wi.set(s[8],s[9],s[10]).length();r<0&&(a=-a),sn.copy(this);const l=1/a,h=1/o,d=1/c;return sn.elements[0]*=l,sn.elements[1]*=l,sn.elements[2]*=l,sn.elements[4]*=h,sn.elements[5]*=h,sn.elements[6]*=h,sn.elements[8]*=d,sn.elements[9]*=d,sn.elements[10]*=d,e.setFromRotationMatrix(sn),n.x=a,n.y=o,n.z=c,this}makePerspective(t,e,n,s,r,a,o=_n,c=!1){const l=this.elements,h=2*r/(e-t),d=2*r/(n-s),u=(e+t)/(e-t),m=(n+s)/(n-s);let g,x;if(c)g=r/(a-r),x=a*r/(a-r);else if(o===_n)g=-(a+r)/(a-r),x=-2*a*r/(a-r);else if(o===ys)g=-a/(a-r),x=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=d,l[9]=m,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=_n,c=!1){const l=this.elements,h=2/(e-t),d=2/(n-s),u=-(e+t)/(e-t),m=-(n+s)/(n-s);let g,x;if(c)g=1/(a-r),x=a/(a-r);else if(o===_n)g=-2/(a-r),x=-(a+r)/(a-r);else if(o===ys)g=-1/(a-r),x=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=d,l[9]=0,l[13]=m,l[2]=0,l[6]=0,l[10]=g,l[14]=x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const wi=new N,sn=new oe,Jd=new N(0,0,0),$d=new N(1,1,1),zn=new N,qs=new N,Ye=new N,zl=new oe,Gl=new is;class yn{constructor(t=0,e=0,n=0,s=yn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],h=s[9],d=s[2],u=s[6],m=s[10];switch(e){case"XYZ":this._y=Math.asin(Gt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Gt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Gt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,m),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Gt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,m),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Gt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-Gt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,m),this._y=0);break;default:Dt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return zl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(zl,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Gl.setFromEuler(this),this.setFromQuaternion(Gl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}yn.DEFAULT_ORDER="XYZ";class Yo{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Qd=0;const Hl=new N,Ci=new is,Tn=new oe,Vs=new N,as=new N,tf=new N,ef=new is,Wl=new N(1,0,0),Xl=new N(0,1,0),Yl=new N(0,0,1),Kl={type:"added"},nf={type:"removed"},Ri={type:"childadded",child:null},ta={type:"childremoved",child:null};class De extends ns{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Qd++}),this.uuid=ws(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=De.DEFAULT_UP.clone();const t=new N,e=new yn,n=new is,s=new N(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new oe},normalMatrix:{value:new Ft}}),this.matrix=new oe,this.matrixWorld=new oe,this.matrixAutoUpdate=De.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=De.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Yo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ci.setFromAxisAngle(t,e),this.quaternion.multiply(Ci),this}rotateOnWorldAxis(t,e){return Ci.setFromAxisAngle(t,e),this.quaternion.premultiply(Ci),this}rotateX(t){return this.rotateOnAxis(Wl,t)}rotateY(t){return this.rotateOnAxis(Xl,t)}rotateZ(t){return this.rotateOnAxis(Yl,t)}translateOnAxis(t,e){return Hl.copy(t).applyQuaternion(this.quaternion),this.position.add(Hl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Wl,t)}translateY(t){return this.translateOnAxis(Xl,t)}translateZ(t){return this.translateOnAxis(Yl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Tn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Vs.copy(t):Vs.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),as.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Tn.lookAt(as,Vs,this.up):Tn.lookAt(Vs,as,this.up),this.quaternion.setFromRotationMatrix(Tn),s&&(Tn.extractRotation(s.matrixWorld),Ci.setFromRotationMatrix(Tn),this.quaternion.premultiply(Ci.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Xt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Kl),Ri.child=t,this.dispatchEvent(Ri),Ri.child=null):Xt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(nf),ta.child=t,this.dispatchEvent(ta),ta.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Tn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Tn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Tn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Kl),Ri.child=t,this.dispatchEvent(Ri),Ri.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(as,t,tf),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(as,ef,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const d=c[l];r(t.shapes,d)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(t.materials,this.material[c]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(t.animations,c))}}if(e){const o=a(t.geometries),c=a(t.materials),l=a(t.textures),h=a(t.images),d=a(t.shapes),u=a(t.skeletons),m=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),m.length>0&&(n.animations=m),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const c=[];for(const l in o){const h=o[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),t.pivot!==null&&(this.pivot=t.pivot.clone()),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}De.DEFAULT_UP=new N(0,1,0);De.DEFAULT_MATRIX_AUTO_UPDATE=!0;De.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Qe extends De{constructor(){super(),this.isGroup=!0,this.type="Group"}}const sf={type:"move"};class ea{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Qe,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Qe,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Qe,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(const x of t.hand.values()){const p=e.getJointPose(x,n),f=this._getHandJoint(l,x);p!==null&&(f.matrix.fromArray(p.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=p.radius),f.visible=p!==null}const h=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],u=h.position.distanceTo(d.position),m=.02,g=.005;l.inputState.pinching&&u>m+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&u<=m-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(sf)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Qe;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const Dh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Gn={h:0,s:0,l:0},Os={h:0,s:0,l:0};function na(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Kt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=$e){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Yt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=Yt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Yt.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=Yt.workingColorSpace){if(t=Hd(t,1),e=Gt(e,0,1),n=Gt(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=na(a,r,t+1/3),this.g=na(a,r,t),this.b=na(a,r,t-1/3)}return Yt.colorSpaceToWorking(this,s),this}setStyle(t,e=$e){function n(r){r!==void 0&&parseFloat(r)<1&&Dt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Dt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Dt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=$e){const n=Dh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Dt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Nn(t.r),this.g=Nn(t.g),this.b=Nn(t.b),this}copyLinearToSRGB(t){return this.r=Yi(t.r),this.g=Yi(t.g),this.b=Yi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=$e){return Yt.workingToColorSpace(Fe.copy(this),t),Math.round(Gt(Fe.r*255,0,255))*65536+Math.round(Gt(Fe.g*255,0,255))*256+Math.round(Gt(Fe.b*255,0,255))}getHexString(t=$e){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Yt.workingColorSpace){Yt.workingToColorSpace(Fe.copy(this),e);const n=Fe.r,s=Fe.g,r=Fe.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let c,l;const h=(o+a)/2;if(o===a)c=0,l=0;else{const d=a-o;switch(l=h<=.5?d/(a+o):d/(2-a-o),a){case n:c=(s-r)/d+(s<r?6:0);break;case s:c=(r-n)/d+2;break;case r:c=(n-s)/d+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=Yt.workingColorSpace){return Yt.workingToColorSpace(Fe.copy(this),e),t.r=Fe.r,t.g=Fe.g,t.b=Fe.b,t}getStyle(t=$e){Yt.workingToColorSpace(Fe.copy(this),t);const e=Fe.r,n=Fe.g,s=Fe.b;return t!==$e?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Gn),this.setHSL(Gn.h+t,Gn.s+e,Gn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Gn),t.getHSL(Os);const n=Zr(Gn.h,Os.h,e),s=Zr(Gn.s,Os.s,e),r=Zr(Gn.l,Os.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Fe=new Kt;Kt.NAMES=Dh;class rf extends De{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new yn,this.environmentIntensity=1,this.environmentRotation=new yn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}const rn=new N,wn=new N,ia=new N,Cn=new N,Ii=new N,Pi=new N,Zl=new N,sa=new N,ra=new N,aa=new N,oa=new me,la=new me,ca=new me;class on{constructor(t=new N,e=new N,n=new N){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),rn.subVectors(t,e),s.cross(rn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){rn.subVectors(s,e),wn.subVectors(n,e),ia.subVectors(t,e);const a=rn.dot(rn),o=rn.dot(wn),c=rn.dot(ia),l=wn.dot(wn),h=wn.dot(ia),d=a*l-o*o;if(d===0)return r.set(0,0,0),null;const u=1/d,m=(l*c-o*h)*u,g=(a*h-o*c)*u;return r.set(1-m-g,g,m)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Cn)===null?!1:Cn.x>=0&&Cn.y>=0&&Cn.x+Cn.y<=1}static getInterpolation(t,e,n,s,r,a,o,c){return this.getBarycoord(t,e,n,s,Cn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Cn.x),c.addScaledVector(a,Cn.y),c.addScaledVector(o,Cn.z),c)}static getInterpolatedAttribute(t,e,n,s,r,a){return oa.setScalar(0),la.setScalar(0),ca.setScalar(0),oa.fromBufferAttribute(t,e),la.fromBufferAttribute(t,n),ca.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(oa,r.x),a.addScaledVector(la,r.y),a.addScaledVector(ca,r.z),a}static isFrontFacing(t,e,n,s){return rn.subVectors(n,e),wn.subVectors(t,e),rn.cross(wn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return rn.subVectors(this.c,this.b),wn.subVectors(this.a,this.b),rn.cross(wn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return on.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return on.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return on.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return on.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return on.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let a,o;Ii.subVectors(s,n),Pi.subVectors(r,n),sa.subVectors(t,n);const c=Ii.dot(sa),l=Pi.dot(sa);if(c<=0&&l<=0)return e.copy(n);ra.subVectors(t,s);const h=Ii.dot(ra),d=Pi.dot(ra);if(h>=0&&d<=h)return e.copy(s);const u=c*d-h*l;if(u<=0&&c>=0&&h<=0)return a=c/(c-h),e.copy(n).addScaledVector(Ii,a);aa.subVectors(t,r);const m=Ii.dot(aa),g=Pi.dot(aa);if(g>=0&&m<=g)return e.copy(r);const x=m*l-c*g;if(x<=0&&l>=0&&g<=0)return o=l/(l-g),e.copy(n).addScaledVector(Pi,o);const p=h*g-m*d;if(p<=0&&d-h>=0&&m-g>=0)return Zl.subVectors(r,s),o=(d-h)/(d-h+(m-g)),e.copy(s).addScaledVector(Zl,o);const f=1/(p+x+u);return a=x*f,o=u*f,e.copy(n).addScaledVector(Ii,a).addScaledVector(Pi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class Mi{constructor(t=new N(1/0,1/0,1/0),e=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(an.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(an.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=an.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,an):an.fromBufferAttribute(r,a),an.applyMatrix4(t.matrixWorld),this.expandByPoint(an);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Bs.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Bs.copy(n.boundingBox)),Bs.applyMatrix4(t.matrixWorld),this.union(Bs)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,an),an.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(os),ks.subVectors(this.max,os),Li.subVectors(t.a,os),Di.subVectors(t.b,os),Ui.subVectors(t.c,os),Hn.subVectors(Di,Li),Wn.subVectors(Ui,Di),ni.subVectors(Li,Ui);let e=[0,-Hn.z,Hn.y,0,-Wn.z,Wn.y,0,-ni.z,ni.y,Hn.z,0,-Hn.x,Wn.z,0,-Wn.x,ni.z,0,-ni.x,-Hn.y,Hn.x,0,-Wn.y,Wn.x,0,-ni.y,ni.x,0];return!ha(e,Li,Di,Ui,ks)||(e=[1,0,0,0,1,0,0,0,1],!ha(e,Li,Di,Ui,ks))?!1:(zs.crossVectors(Hn,Wn),e=[zs.x,zs.y,zs.z],ha(e,Li,Di,Ui,ks))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,an).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(an).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Rn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Rn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Rn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Rn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Rn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Rn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Rn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Rn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Rn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Rn=[new N,new N,new N,new N,new N,new N,new N,new N],an=new N,Bs=new Mi,Li=new N,Di=new N,Ui=new N,Hn=new N,Wn=new N,ni=new N,os=new N,ks=new N,zs=new N,ii=new N;function ha(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){ii.fromArray(i,r);const o=s.x*Math.abs(ii.x)+s.y*Math.abs(ii.y)+s.z*Math.abs(ii.z),c=t.dot(ii),l=e.dot(ii),h=n.dot(ii);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}const Se=new N,Gs=new Ht;let af=0;class en{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:af++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Nl,this.updateRanges=[],this.gpuType=ln,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Gs.fromBufferAttribute(this,e),Gs.applyMatrix3(t),this.setXY(e,Gs.x,Gs.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.applyMatrix3(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.applyMatrix4(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.applyNormalMatrix(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.transformDirection(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=rs(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Ge(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=rs(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ge(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=rs(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ge(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=rs(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ge(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=rs(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ge(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Ge(e,this.array),n=Ge(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Ge(e,this.array),n=Ge(n,this.array),s=Ge(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Ge(e,this.array),n=Ge(n,this.array),s=Ge(s,this.array),r=Ge(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Nl&&(t.usage=this.usage),t}}class Uh extends en{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Nh extends en{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class fe extends en{constructor(t,e,n){super(new Float32Array(t),e,n)}}const of=new Mi,ls=new N,ua=new N;class Cs{constructor(t=new N,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):of.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ls.subVectors(t,this.center);const e=ls.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(ls,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ua.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ls.copy(t.center).add(ua)),this.expandByPoint(ls.copy(t.center).sub(ua))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let lf=0;const Je=new oe,da=new De,Ni=new N,Ke=new Mi,cs=new Mi,Re=new N;class ze extends ns{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:lf++}),this.uuid=ws(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Bd(t)?Nh:Uh)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ft().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Je.makeRotationFromQuaternion(t),this.applyMatrix4(Je),this}rotateX(t){return Je.makeRotationX(t),this.applyMatrix4(Je),this}rotateY(t){return Je.makeRotationY(t),this.applyMatrix4(Je),this}rotateZ(t){return Je.makeRotationZ(t),this.applyMatrix4(Je),this}translate(t,e,n){return Je.makeTranslation(t,e,n),this.applyMatrix4(Je),this}scale(t,e,n){return Je.makeScale(t,e,n),this.applyMatrix4(Je),this}lookAt(t){return da.lookAt(t),da.updateMatrix(),this.applyMatrix4(da.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ni).negate(),this.translate(Ni.x,Ni.y,Ni.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new fe(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Dt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Mi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Xt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];Ke.setFromBufferAttribute(r),this.morphTargetsRelative?(Re.addVectors(this.boundingBox.min,Ke.min),this.boundingBox.expandByPoint(Re),Re.addVectors(this.boundingBox.max,Ke.max),this.boundingBox.expandByPoint(Re)):(this.boundingBox.expandByPoint(Ke.min),this.boundingBox.expandByPoint(Ke.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Xt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Cs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Xt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(t){const n=this.boundingSphere.center;if(Ke.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];cs.setFromBufferAttribute(o),this.morphTargetsRelative?(Re.addVectors(Ke.min,cs.min),Ke.expandByPoint(Re),Re.addVectors(Ke.max,cs.max),Ke.expandByPoint(Re)):(Ke.expandByPoint(cs.min),Ke.expandByPoint(cs.max))}Ke.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)Re.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Re));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Re.fromBufferAttribute(o,l),c&&(Ni.fromBufferAttribute(t,l),Re.add(Ni)),s=Math.max(s,n.distanceToSquared(Re))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Xt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Xt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new en(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let v=0;v<n.count;v++)o[v]=new N,c[v]=new N;const l=new N,h=new N,d=new N,u=new Ht,m=new Ht,g=new Ht,x=new N,p=new N;function f(v,b,q){l.fromBufferAttribute(n,v),h.fromBufferAttribute(n,b),d.fromBufferAttribute(n,q),u.fromBufferAttribute(r,v),m.fromBufferAttribute(r,b),g.fromBufferAttribute(r,q),h.sub(l),d.sub(l),m.sub(u),g.sub(u);const C=1/(m.x*g.y-g.x*m.y);isFinite(C)&&(x.copy(h).multiplyScalar(g.y).addScaledVector(d,-m.y).multiplyScalar(C),p.copy(d).multiplyScalar(m.x).addScaledVector(h,-g.x).multiplyScalar(C),o[v].add(x),o[b].add(x),o[q].add(x),c[v].add(p),c[b].add(p),c[q].add(p))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let v=0,b=M.length;v<b;++v){const q=M[v],C=q.start,D=q.count;for(let F=C,G=C+D;F<G;F+=3)f(t.getX(F+0),t.getX(F+1),t.getX(F+2))}const E=new N,y=new N,w=new N,T=new N;function R(v){w.fromBufferAttribute(s,v),T.copy(w);const b=o[v];E.copy(b),E.sub(w.multiplyScalar(w.dot(b))).normalize(),y.crossVectors(T,b);const C=y.dot(c[v])<0?-1:1;a.setXYZW(v,E.x,E.y,E.z,C)}for(let v=0,b=M.length;v<b;++v){const q=M[v],C=q.start,D=q.count;for(let F=C,G=C+D;F<G;F+=3)R(t.getX(F+0)),R(t.getX(F+1)),R(t.getX(F+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new en(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,m=n.count;u<m;u++)n.setXYZ(u,0,0,0);const s=new N,r=new N,a=new N,o=new N,c=new N,l=new N,h=new N,d=new N;if(t)for(let u=0,m=t.count;u<m;u+=3){const g=t.getX(u+0),x=t.getX(u+1),p=t.getX(u+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,x),a.fromBufferAttribute(e,p),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,p),o.add(h),c.add(h),l.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(p,l.x,l.y,l.z)}else for(let u=0,m=e.count;u<m;u+=3)s.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),a.fromBufferAttribute(e,u+2),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Re.fromBufferAttribute(t,e),Re.normalize(),t.setXYZ(e,Re.x,Re.y,Re.z)}toNonIndexed(){function t(o,c){const l=o.array,h=o.itemSize,d=o.normalized,u=new l.constructor(c.length*h);let m=0,g=0;for(let x=0,p=c.length;x<p;x++){o.isInterleavedBufferAttribute?m=c[x]*o.data.stride+o.offset:m=c[x]*h;for(let f=0;f<h;f++)u[g++]=l[m++]}return new en(u,h,d)}if(this.index===null)return Dt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new ze,n=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=t(c,n);e.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let h=0,d=l.length;h<d;h++){const u=l[h],m=t(u,n);c.push(m)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let d=0,u=l.length;d<u;d++){const m=l[d];h.push(m.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const s=t.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(e))}const r=t.morphAttributes;for(const l in r){const h=[],d=r[l];for(let u=0,m=d.length;u<m;u++)h.push(d[u].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let l=0,h=a.length;l<h;l++){const d=a[l];this.addGroup(d.start,d.count,d.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let cf=0;class Rs extends ns{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:cf++}),this.uuid=ws(),this.name="",this.type="Material",this.blending=Xi,this.side=$n,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=qa,this.blendDst=Va,this.blendEquation=ui,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Kt(0,0,0),this.blendAlpha=0,this.depthFunc=ji,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ul,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ai,this.stencilZFail=Ai,this.stencilZPass=Ai,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){Dt(`Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Dt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Xi&&(n.blending=this.blending),this.side!==$n&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==qa&&(n.blendSrc=this.blendSrc),this.blendDst!==Va&&(n.blendDst=this.blendDst),this.blendEquation!==ui&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ji&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ul&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ai&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ai&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ai&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const In=new N,fa=new N,Hs=new N,Xn=new N,pa=new N,Ws=new N,ma=new N;class Fh{constructor(t=new N,e=new N(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,In)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=In.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(In.copy(this.origin).addScaledVector(this.direction,e),In.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){fa.copy(t).add(e).multiplyScalar(.5),Hs.copy(e).sub(t).normalize(),Xn.copy(this.origin).sub(fa);const r=t.distanceTo(e)*.5,a=-this.direction.dot(Hs),o=Xn.dot(this.direction),c=-Xn.dot(Hs),l=Xn.lengthSq(),h=Math.abs(1-a*a);let d,u,m,g;if(h>0)if(d=a*c-o,u=a*o-c,g=r*h,d>=0)if(u>=-g)if(u<=g){const x=1/h;d*=x,u*=x,m=d*(d+a*u+2*o)+u*(a*d+u+2*c)+l}else u=r,d=Math.max(0,-(a*u+o)),m=-d*d+u*(u+2*c)+l;else u=-r,d=Math.max(0,-(a*u+o)),m=-d*d+u*(u+2*c)+l;else u<=-g?(d=Math.max(0,-(-a*r+o)),u=d>0?-r:Math.min(Math.max(-r,-c),r),m=-d*d+u*(u+2*c)+l):u<=g?(d=0,u=Math.min(Math.max(-r,-c),r),m=u*(u+2*c)+l):(d=Math.max(0,-(a*r+o)),u=d>0?r:Math.min(Math.max(-r,-c),r),m=-d*d+u*(u+2*c)+l);else u=a>0?-r:r,d=Math.max(0,-(a*u+o)),m=-d*d+u*(u+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(fa).addScaledVector(Hs,u),m}intersectSphere(t,e){In.subVectors(t.center,this.origin);const n=In.dot(this.direction),s=In.dot(In)-n*n,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,c;const l=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return l>=0?(n=(t.min.x-u.x)*l,s=(t.max.x-u.x)*l):(n=(t.max.x-u.x)*l,s=(t.min.x-u.x)*l),h>=0?(r=(t.min.y-u.y)*h,a=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,a=(t.min.y-u.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(t.min.z-u.z)*d,c=(t.max.z-u.z)*d):(o=(t.max.z-u.z)*d,c=(t.min.z-u.z)*d),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,In)!==null}intersectTriangle(t,e,n,s,r){pa.subVectors(e,t),Ws.subVectors(n,t),ma.crossVectors(pa,Ws);let a=this.direction.dot(ma),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Xn.subVectors(this.origin,t);const c=o*this.direction.dot(Ws.crossVectors(Xn,Ws));if(c<0)return null;const l=o*this.direction.dot(pa.cross(Xn));if(l<0||c+l>a)return null;const h=-o*Xn.dot(ma);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Jt extends Rs{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Kt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yn,this.combine=Fo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const jl=new oe,si=new Fh,Xs=new Cs,Jl=new N,Ys=new N,Ks=new N,Zs=new N,ga=new N,js=new N,$l=new N,Js=new N;class ot extends De{constructor(t=new ze,e=new Jt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){js.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=o[c],d=r[c];h!==0&&(ga.fromBufferAttribute(d,t),a?js.addScaledVector(ga,h):js.addScaledVector(ga.sub(e),h))}e.add(js)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Xs.copy(n.boundingSphere),Xs.applyMatrix4(r),si.copy(t.ray).recast(t.near),!(Xs.containsPoint(si.origin)===!1&&(si.intersectSphere(Xs,Jl)===null||si.origin.distanceToSquared(Jl)>(t.far-t.near)**2))&&(jl.copy(r).invert(),si.copy(t.ray).applyMatrix4(jl),!(n.boundingBox!==null&&si.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,si)))}_computeIntersections(t,e,n){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,m=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,x=u.length;g<x;g++){const p=u[g],f=a[p.materialIndex],M=Math.max(p.start,m.start),E=Math.min(o.count,Math.min(p.start+p.count,m.start+m.count));for(let y=M,w=E;y<w;y+=3){const T=o.getX(y),R=o.getX(y+1),v=o.getX(y+2);s=$s(this,f,t,n,l,h,d,T,R,v),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{const g=Math.max(0,m.start),x=Math.min(o.count,m.start+m.count);for(let p=g,f=x;p<f;p+=3){const M=o.getX(p),E=o.getX(p+1),y=o.getX(p+2);s=$s(this,a,t,n,l,h,d,M,E,y),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,x=u.length;g<x;g++){const p=u[g],f=a[p.materialIndex],M=Math.max(p.start,m.start),E=Math.min(c.count,Math.min(p.start+p.count,m.start+m.count));for(let y=M,w=E;y<w;y+=3){const T=y,R=y+1,v=y+2;s=$s(this,f,t,n,l,h,d,T,R,v),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{const g=Math.max(0,m.start),x=Math.min(c.count,m.start+m.count);for(let p=g,f=x;p<f;p+=3){const M=p,E=p+1,y=p+2;s=$s(this,a,t,n,l,h,d,M,E,y),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}}}function hf(i,t,e,n,s,r,a,o){let c;if(t.side===We?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,t.side===$n,o),c===null)return null;Js.copy(o),Js.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(Js);return l<e.near||l>e.far?null:{distance:l,point:Js.clone(),object:i}}function $s(i,t,e,n,s,r,a,o,c,l){i.getVertexPosition(o,Ys),i.getVertexPosition(c,Ks),i.getVertexPosition(l,Zs);const h=hf(i,t,e,n,Ys,Ks,Zs,$l);if(h){const d=new N;on.getBarycoord($l,Ys,Ks,Zs,d),s&&(h.uv=on.getInterpolatedAttribute(s,o,c,l,d,new Ht)),r&&(h.uv1=on.getInterpolatedAttribute(r,o,c,l,d,new Ht)),a&&(h.normal=on.getInterpolatedAttribute(a,o,c,l,d,new N),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:c,c:l,normal:new N,materialIndex:0};on.getNormal(Ys,Ks,Zs,u.normal),h.face=u,h.barycoord=d}return h}class qh extends Le{constructor(t=null,e=1,n=1,s,r,a,o,c,l=Pe,h=Pe,d,u){super(null,a,o,c,l,h,s,r,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ql extends en{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Fi=new oe,tc=new oe,Qs=[],ec=new Mi,uf=new oe,hs=new ot,us=new Cs;class df extends ot{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Ql(new Float32Array(n*16),16),this.previousInstanceMatrix=null,this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,uf)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Mi),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Fi),ec.copy(t.boundingBox).applyMatrix4(Fi),this.boundingBox.union(ec)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Cs),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Fi),us.copy(t.boundingSphere).applyMatrix4(Fi),this.boundingSphere.union(us)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.previousInstanceMatrix!==null&&(this.previousInstanceMatrix=t.previousInstanceMatrix.clone()),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(hs.geometry=this.geometry,hs.material=this.material,hs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),us.copy(this.boundingSphere),us.applyMatrix4(n),t.ray.intersectsSphere(us)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Fi),tc.multiplyMatrices(n,Fi),hs.matrixWorld=tc,hs.raycast(t,Qs);for(let a=0,o=Qs.length;a<o;a++){const c=Qs[a];c.instanceId=r,c.object=this,e.push(c)}Qs.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Ql(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new qh(new Float32Array(s*this.count),s,this.count,Bo,ln));const r=this.morphTexture.source.data.data;let a=0;for(let l=0;l<n.length;l++)a+=n[l];const o=this.geometry.morphTargetsRelative?1:1-a,c=s*t;r[c]=o,r.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const _a=new N,ff=new N,pf=new Ft;class ci{constructor(t=new N(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=_a.subVectors(n,e).cross(ff.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(_a),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||pf.getNormalMatrix(t),s=this.coplanarPoint(_a).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ri=new Cs,mf=new Ht(.5,.5),tr=new N;class Ko{constructor(t=new ci,e=new ci,n=new ci,s=new ci,r=new ci,a=new ci){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=_n,n=!1){const s=this.planes,r=t.elements,a=r[0],o=r[1],c=r[2],l=r[3],h=r[4],d=r[5],u=r[6],m=r[7],g=r[8],x=r[9],p=r[10],f=r[11],M=r[12],E=r[13],y=r[14],w=r[15];if(s[0].setComponents(l-a,m-h,f-g,w-M).normalize(),s[1].setComponents(l+a,m+h,f+g,w+M).normalize(),s[2].setComponents(l+o,m+d,f+x,w+E).normalize(),s[3].setComponents(l-o,m-d,f-x,w-E).normalize(),n)s[4].setComponents(c,u,p,y).normalize(),s[5].setComponents(l-c,m-u,f-p,w-y).normalize();else if(s[4].setComponents(l-c,m-u,f-p,w-y).normalize(),e===_n)s[5].setComponents(l+c,m+u,f+p,w+y).normalize();else if(e===ys)s[5].setComponents(c,u,p,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ri.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ri.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ri)}intersectsSprite(t){ri.center.set(0,0,0);const e=mf.distanceTo(t.center);return ri.radius=.7071067811865476+e,ri.applyMatrix4(t.matrixWorld),this.intersectsSphere(ri)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(tr.x=s.normal.x>0?t.max.x:t.min.x,tr.y=s.normal.y>0?t.max.y:t.min.y,tr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(tr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Vh extends Le{constructor(t=[],e=_i,n,s,r,a,o,c,l,h){super(t,e,n,s,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class nc extends Le{constructor(t,e,n,s,r,a,o,c,l){super(t,e,n,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Es extends Le{constructor(t,e,n=Sn,s,r,a,o=Pe,c=Pe,l,h=qn,d=1){if(h!==qn&&h!==gi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:t,height:e,depth:d};super(u,s,r,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Xo(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class gf extends Es{constructor(t,e=Sn,n=_i,s,r,a=Pe,o=Pe,c,l=qn){const h={width:t,height:t,depth:1},d=[h,h,h,h,h,h];super(t,t,e,n,s,r,a,o,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class Oh extends Le{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class zt extends ze{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],h=[],d=[];let u=0,m=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,s,a,2),g("x","z","y",1,-1,t,n,-e,s,a,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new fe(l,3)),this.setAttribute("normal",new fe(h,3)),this.setAttribute("uv",new fe(d,2));function g(x,p,f,M,E,y,w,T,R,v,b){const q=y/R,C=w/v,D=y/2,F=w/2,G=T/2,V=R+1,B=v+1;let k=0,Q=0;const j=new N;for(let ht=0;ht<B;ht++){const gt=ht*C-F;for(let dt=0;dt<V;dt++){const qt=dt*q-D;j[x]=qt*M,j[p]=gt*E,j[f]=G,l.push(j.x,j.y,j.z),j[x]=0,j[p]=0,j[f]=T>0?1:-1,h.push(j.x,j.y,j.z),d.push(dt/R),d.push(1-ht/v),k+=1}}for(let ht=0;ht<v;ht++)for(let gt=0;gt<R;gt++){const dt=u+gt+V*ht,qt=u+gt+V*(ht+1),ue=u+(gt+1)+V*(ht+1),he=u+(gt+1)+V*ht;c.push(dt,qt,he),c.push(qt,ue,he),Q+=6}o.addGroup(m,Q,b),m+=Q,u+=k}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new zt(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class di extends ze{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],a=[],o=[],c=[],l=new N,h=new Ht;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let d=0,u=3;d<=e;d++,u+=3){const m=n+d/e*s;l.x=t*Math.cos(m),l.y=t*Math.sin(m),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[u]/t+1)/2,h.y=(a[u+1]/t+1)/2,c.push(h.x,h.y)}for(let d=1;d<=e;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new fe(a,3)),this.setAttribute("normal",new fe(o,3)),this.setAttribute("uv",new fe(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new di(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Pn extends ze{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const h=[],d=[],u=[],m=[];let g=0;const x=[],p=n/2;let f=0;M(),a===!1&&(t>0&&E(!0),e>0&&E(!1)),this.setIndex(h),this.setAttribute("position",new fe(d,3)),this.setAttribute("normal",new fe(u,3)),this.setAttribute("uv",new fe(m,2));function M(){const y=new N,w=new N;let T=0;const R=(e-t)/n;for(let v=0;v<=r;v++){const b=[],q=v/r,C=q*(e-t)+t;for(let D=0;D<=s;D++){const F=D/s,G=F*c+o,V=Math.sin(G),B=Math.cos(G);w.x=C*V,w.y=-q*n+p,w.z=C*B,d.push(w.x,w.y,w.z),y.set(V,R,B).normalize(),u.push(y.x,y.y,y.z),m.push(F,1-q),b.push(g++)}x.push(b)}for(let v=0;v<s;v++)for(let b=0;b<r;b++){const q=x[b][v],C=x[b+1][v],D=x[b+1][v+1],F=x[b][v+1];(t>0||b!==0)&&(h.push(q,C,F),T+=3),(e>0||b!==r-1)&&(h.push(C,D,F),T+=3)}l.addGroup(f,T,0),f+=T}function E(y){const w=g,T=new Ht,R=new N;let v=0;const b=y===!0?t:e,q=y===!0?1:-1;for(let D=1;D<=s;D++)d.push(0,p*q,0),u.push(0,q,0),m.push(.5,.5),g++;const C=g;for(let D=0;D<=s;D++){const G=D/s*c+o,V=Math.cos(G),B=Math.sin(G);R.x=b*B,R.y=p*q,R.z=b*V,d.push(R.x,R.y,R.z),u.push(0,q,0),T.x=V*.5+.5,T.y=B*.5*q+.5,m.push(T.x,T.y),g++}for(let D=0;D<s;D++){const F=w+D,G=C+D;y===!0?h.push(G,G+1,F):h.push(G+1,G,F),v+=3}l.addGroup(f,v,y===!0?1:2),f+=v}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Pn(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class jn extends ze{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(n),c=Math.floor(s),l=o+1,h=c+1,d=t/o,u=e/c,m=[],g=[],x=[],p=[];for(let f=0;f<h;f++){const M=f*u-a;for(let E=0;E<l;E++){const y=E*d-r;g.push(y,-M,0),x.push(0,0,1),p.push(E/o),p.push(1-f/c)}}for(let f=0;f<c;f++)for(let M=0;M<o;M++){const E=M+l*f,y=M+l*(f+1),w=M+1+l*(f+1),T=M+1+l*f;m.push(E,y,T),m.push(y,w,T)}this.setIndex(m),this.setAttribute("position",new fe(g,3)),this.setAttribute("normal",new fe(x,3)),this.setAttribute("uv",new fe(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new jn(t.width,t.height,t.widthSegments,t.heightSegments)}}class Gi extends ze{constructor(t=.5,e=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const o=[],c=[],l=[],h=[];let d=t;const u=(e-t)/s,m=new N,g=new Ht;for(let x=0;x<=s;x++){for(let p=0;p<=n;p++){const f=r+p/n*a;m.x=d*Math.cos(f),m.y=d*Math.sin(f),c.push(m.x,m.y,m.z),l.push(0,0,1),g.x=(m.x/e+1)/2,g.y=(m.y/e+1)/2,h.push(g.x,g.y)}d+=u}for(let x=0;x<s;x++){const p=x*(n+1);for(let f=0;f<n;f++){const M=f+p,E=M,y=M+n+1,w=M+n+2,T=M+1;o.push(E,y,T),o.push(y,w,T)}}this.setIndex(o),this.setAttribute("position",new fe(c,3)),this.setAttribute("normal",new fe(l,3)),this.setAttribute("uv",new fe(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Gi(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class As extends ze{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const h=[],d=new N,u=new N,m=[],g=[],x=[],p=[];for(let f=0;f<=n;f++){const M=[],E=f/n;let y=0;f===0&&a===0?y=.5/e:f===n&&c===Math.PI&&(y=-.5/e);for(let w=0;w<=e;w++){const T=w/e;d.x=-t*Math.cos(s+T*r)*Math.sin(a+E*o),d.y=t*Math.cos(a+E*o),d.z=t*Math.sin(s+T*r)*Math.sin(a+E*o),g.push(d.x,d.y,d.z),u.copy(d).normalize(),x.push(u.x,u.y,u.z),p.push(T+y,1-E),M.push(l++)}h.push(M)}for(let f=0;f<n;f++)for(let M=0;M<e;M++){const E=h[f][M+1],y=h[f][M],w=h[f+1][M],T=h[f+1][M+1];(f!==0||a>0)&&m.push(E,y,T),(f!==n-1||c<Math.PI)&&m.push(y,w,T)}this.setIndex(m),this.setAttribute("position",new fe(g,3)),this.setAttribute("normal",new fe(x,3)),this.setAttribute("uv",new fe(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new As(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class fi extends ze{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},n=Math.floor(n),s=Math.floor(s);const c=[],l=[],h=[],d=[],u=new N,m=new N,g=new N;for(let x=0;x<=n;x++){const p=a+x/n*o;for(let f=0;f<=s;f++){const M=f/s*r;m.x=(t+e*Math.cos(p))*Math.cos(M),m.y=(t+e*Math.cos(p))*Math.sin(M),m.z=e*Math.sin(p),l.push(m.x,m.y,m.z),u.x=t*Math.cos(M),u.y=t*Math.sin(M),g.subVectors(m,u).normalize(),h.push(g.x,g.y,g.z),d.push(f/s),d.push(x/n)}}for(let x=1;x<=n;x++)for(let p=1;p<=s;p++){const f=(s+1)*x+p-1,M=(s+1)*(x-1)+p-1,E=(s+1)*(x-1)+p,y=(s+1)*x+p;c.push(f,M,y),c.push(M,E,y)}this.setIndex(c),this.setAttribute("position",new fe(l,3)),this.setAttribute("normal",new fe(h,3)),this.setAttribute("uv",new fe(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new fi(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}function ts(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(Dt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function ke(i){const t={};for(let e=0;e<i.length;e++){const n=ts(i[e]);for(const s in n)t[s]=n[s]}return t}function _f(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Bh(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Yt.workingColorSpace}const vf={clone:ts,merge:ke};var xf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Mf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class bn extends Rs{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=xf,this.fragmentShader=Mf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ts(t.uniforms),this.uniformsGroups=_f(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Sf extends bn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class be extends Rs{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Kt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Kt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ih,this.normalScale=new Ht(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yn,this.combine=Fo,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class yf extends Rs{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ld,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class bf extends Rs{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const va={enabled:!1,files:{},add:function(i,t){this.enabled!==!1&&(ic(i)||(this.files[i]=t))},get:function(i){if(this.enabled!==!1&&!ic(i))return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};function ic(i){try{const t=i.slice(i.indexOf(":")+1);return new URL(t).protocol==="blob:"}catch{return!1}}class Ef{constructor(t,e,n){const s=this;let r=!1,a=0,o=0,c;const l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,d){return l.push(h,d),this},this.removeHandler=function(h){const d=l.indexOf(h);return d!==-1&&l.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=l.length;d<u;d+=2){const m=l[d],g=l[d+1];if(m.global&&(m.lastIndex=0),m.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const Af=new Ef;class Zo{constructor(t){this.manager=t!==void 0?t:Af,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){const n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}}Zo.DEFAULT_MATERIAL_NAME="__DEFAULT";const qi=new WeakMap;class Tf extends Zo{constructor(t){super(t)}load(t,e,n,s){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,a=va.get(`image:${t}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(t),setTimeout(function(){e&&e(a),r.manager.itemEnd(t)},0);else{let d=qi.get(a);d===void 0&&(d=[],qi.set(a,d)),d.push({onLoad:e,onError:s})}return a}const o=bs("img");function c(){h(),e&&e(this);const d=qi.get(this)||[];for(let u=0;u<d.length;u++){const m=d[u];m.onLoad&&m.onLoad(this)}qi.delete(this),r.manager.itemEnd(t)}function l(d){h(),s&&s(d),va.remove(`image:${t}`);const u=qi.get(this)||[];for(let m=0;m<u.length;m++){const g=u[m];g.onError&&g.onError(d)}qi.delete(this),r.manager.itemError(t),r.manager.itemEnd(t)}function h(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),va.add(`image:${t}`,o),r.manager.itemStart(t),o.src=t,o}}class wf extends Zo{constructor(t){super(t)}load(t,e,n,s){const r=new Le,a=new Tf(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(t,function(o){r.image=o,r.needsUpdate=!0,e!==void 0&&e(r)},n,s),r}}class jo extends De{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Kt(t),this.intensity=e}dispose(){this.dispatchEvent({type:"dispose"})}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}}class Cf extends jo{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(De.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Kt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){const e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}}const xa=new oe,sc=new N,rc=new N;class Rf{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ht(512,512),this.mapType=je,this.map=null,this.mapPass=null,this.matrix=new oe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ko,this._frameExtents=new Ht(1,1),this._viewportCount=1,this._viewports=[new me(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;sc.setFromMatrixPosition(t.matrixWorld),e.position.copy(sc),rc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(rc),e.updateMatrixWorld(),xa.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(xa,e.coordinateSystem,e.reversedDepth),e.coordinateSystem===ys||e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(xa)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const er=new N,nr=new is,dn=new N;class kh extends De{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new oe,this.projectionMatrix=new oe,this.projectionMatrixInverse=new oe,this.coordinateSystem=_n,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(er,nr,dn),dn.x===1&&dn.y===1&&dn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(er,nr,dn.set(1,1,1)).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorld.decompose(er,nr,dn),dn.x===1&&dn.y===1&&dn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(er,nr,dn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Yn=new N,ac=new Ht,oc=new Ht;class tn extends kh{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=wo*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Kr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return wo*2*Math.atan(Math.tan(Kr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Yn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Yn.x,Yn.y).multiplyScalar(-t/Yn.z),Yn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Yn.x,Yn.y).multiplyScalar(-t/Yn.z)}getViewSize(t,e){return this.getViewBounds(t,ac,oc),e.subVectors(oc,ac)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Kr*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,e-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}class Jo extends kh{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class If extends Rf{constructor(){super(new Jo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class lc extends jo{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(De.DEFAULT_UP),this.updateMatrix(),this.target=new De,this.shadow=new If}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}}class Pf extends jo{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}const Vi=-90,Oi=1;class Lf extends De{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new tn(Vi,Oi,t,e);s.layers=this.layers,this.add(s);const r=new tn(Vi,Oi,t,e);r.layers=this.layers,this.add(r);const a=new tn(Vi,Oi,t,e);a.layers=this.layers,this.add(a);const o=new tn(Vi,Oi,t,e);o.layers=this.layers,this.add(o);const c=new tn(Vi,Oi,t,e);c.layers=this.layers,this.add(c);const l=new tn(Vi,Oi,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,c]=e;for(const l of e)this.remove(l);if(t===_n)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===ys)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let p=!1;t.isWebGLRenderer===!0?p=t.state.buffers.depth.getReversed():p=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,2,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,3,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),t.setRenderTarget(n,4,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(d,u,m),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Df extends tn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const cc=new oe;class Uf{constructor(t,e,n=0,s=1/0){this.ray=new Fh(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new Yo,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):Xt("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return cc.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(cc),this}intersectObject(t,e=!0,n=[]){return Co(t,this,n,e),n.sort(hc),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)Co(t[s],this,n,e);return n.sort(hc),n}}function hc(i,t){return i.distance-t.distance}function Co(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)Co(r[a],t,e,!0)}}function uc(i,t,e,n){const s=Nf(n);switch(e){case Ch:return i*t;case Bo:return i*t/s.components*s.byteLength;case ko:return i*t/s.components*s.byteLength;case $i:return i*t*2/s.components*s.byteLength;case zo:return i*t*2/s.components*s.byteLength;case Rh:return i*t*3/s.components*s.byteLength;case cn:return i*t*4/s.components*s.byteLength;case Go:return i*t*4/s.components*s.byteLength;case gr:case _r:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case vr:case xr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Za:case Ja:return Math.max(i,16)*Math.max(t,8)/4;case Ka:case ja:return Math.max(i,8)*Math.max(t,8)/2;case $a:case Qa:case eo:case no:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case to:case io:case so:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ro:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ao:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case oo:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case lo:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case co:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case ho:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case uo:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case fo:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case po:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case mo:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case go:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case _o:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case vo:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case xo:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Mo:case So:case yo:return Math.ceil(i/4)*Math.ceil(t/4)*16;case bo:case Eo:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Ao:case To:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Nf(i){switch(i){case je:case Eh:return{byteLength:1,components:1};case Ms:case Ah:case Fn:return{byteLength:2,components:1};case Vo:case Oo:return{byteLength:2,components:4};case Sn:case qo:case ln:return{byteLength:4,components:1};case Th:case wh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:No}}));typeof window<"u"&&(window.__THREE__?Dt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=No);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function zh(){let i=null,t=!1,e=null,n=null;function s(r,a){e(r,a),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Ff(i){const t=new WeakMap;function e(o,c){const l=o.array,h=o.usage,d=l.byteLength,u=i.createBuffer();i.bindBuffer(c,u),i.bufferData(c,l,h),o.onUploadCallback();let m;if(l instanceof Float32Array)m=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)m=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?m=i.HALF_FLOAT:m=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)m=i.SHORT;else if(l instanceof Uint32Array)m=i.UNSIGNED_INT;else if(l instanceof Int32Array)m=i.INT;else if(l instanceof Int8Array)m=i.BYTE;else if(l instanceof Uint8Array)m=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)m=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:m,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,c,l){const h=c.array,d=c.updateRanges;if(i.bindBuffer(l,o),d.length===0)i.bufferSubData(l,0,h);else{d.sort((m,g)=>m.start-g.start);let u=0;for(let m=1;m<d.length;m++){const g=d[u],x=d[m];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++u,d[u]=x)}d.length=u+1;for(let m=0,g=d.length;m<g;m++){const x=d[m];i.bufferSubData(l,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=t.get(o);c&&(i.deleteBuffer(c.buffer),t.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=t.get(o);if(l===void 0)t.set(o,e(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var qf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Vf=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Of=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Bf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,kf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,zf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Gf=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Hf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Wf=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Xf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Yf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Kf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Zf=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,jf=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Jf=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,$f=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Qf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,tp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ep=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,np=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,ip=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,sp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,rp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,ap=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,op=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,lp=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,cp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,hp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,up=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,dp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,fp="gl_FragColor = linearToOutputTexel( gl_FragColor );",pp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,mp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,gp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,_p=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,vp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,xp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Mp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Sp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,yp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,bp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ep=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Ap=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Tp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,wp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Cp=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Rp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Ip=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Pp=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Lp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Dp=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Up=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Np=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return v;
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Fp=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,qp=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Vp=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Op=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Bp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,kp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Gp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Hp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Wp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Xp=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Yp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Kp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Zp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,jp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Jp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,$p=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Qp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,tm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,em=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,nm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,im=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,sm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,rm=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,am=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,om=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,lm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,cm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,hm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,um=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,dm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,fm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,pm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,mm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,gm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,_m=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,vm=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,xm=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Mm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Sm=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,ym=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,bm=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Em=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Am=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Tm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,wm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Cm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Rm=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Im=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Pm=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Lm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Dm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Um=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Nm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Fm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,qm=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Om=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Bm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,km=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Gm=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Hm=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Wm=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Xm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ym=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Km=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Zm=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,jm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Jm=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$m=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Qm=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,tg=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,eg=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ng=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,ig=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,sg=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,rg=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ag=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,og=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lg=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,cg=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hg=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,ug=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,dg=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,fg=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,pg=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,mg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Vt={alphahash_fragment:qf,alphahash_pars_fragment:Vf,alphamap_fragment:Of,alphamap_pars_fragment:Bf,alphatest_fragment:kf,alphatest_pars_fragment:zf,aomap_fragment:Gf,aomap_pars_fragment:Hf,batching_pars_vertex:Wf,batching_vertex:Xf,begin_vertex:Yf,beginnormal_vertex:Kf,bsdfs:Zf,iridescence_fragment:jf,bumpmap_pars_fragment:Jf,clipping_planes_fragment:$f,clipping_planes_pars_fragment:Qf,clipping_planes_pars_vertex:tp,clipping_planes_vertex:ep,color_fragment:np,color_pars_fragment:ip,color_pars_vertex:sp,color_vertex:rp,common:ap,cube_uv_reflection_fragment:op,defaultnormal_vertex:lp,displacementmap_pars_vertex:cp,displacementmap_vertex:hp,emissivemap_fragment:up,emissivemap_pars_fragment:dp,colorspace_fragment:fp,colorspace_pars_fragment:pp,envmap_fragment:mp,envmap_common_pars_fragment:gp,envmap_pars_fragment:_p,envmap_pars_vertex:vp,envmap_physical_pars_fragment:Rp,envmap_vertex:xp,fog_vertex:Mp,fog_pars_vertex:Sp,fog_fragment:yp,fog_pars_fragment:bp,gradientmap_pars_fragment:Ep,lightmap_pars_fragment:Ap,lights_lambert_fragment:Tp,lights_lambert_pars_fragment:wp,lights_pars_begin:Cp,lights_toon_fragment:Ip,lights_toon_pars_fragment:Pp,lights_phong_fragment:Lp,lights_phong_pars_fragment:Dp,lights_physical_fragment:Up,lights_physical_pars_fragment:Np,lights_fragment_begin:Fp,lights_fragment_maps:qp,lights_fragment_end:Vp,logdepthbuf_fragment:Op,logdepthbuf_pars_fragment:Bp,logdepthbuf_pars_vertex:kp,logdepthbuf_vertex:zp,map_fragment:Gp,map_pars_fragment:Hp,map_particle_fragment:Wp,map_particle_pars_fragment:Xp,metalnessmap_fragment:Yp,metalnessmap_pars_fragment:Kp,morphinstance_vertex:Zp,morphcolor_vertex:jp,morphnormal_vertex:Jp,morphtarget_pars_vertex:$p,morphtarget_vertex:Qp,normal_fragment_begin:tm,normal_fragment_maps:em,normal_pars_fragment:nm,normal_pars_vertex:im,normal_vertex:sm,normalmap_pars_fragment:rm,clearcoat_normal_fragment_begin:am,clearcoat_normal_fragment_maps:om,clearcoat_pars_fragment:lm,iridescence_pars_fragment:cm,opaque_fragment:hm,packing:um,premultiplied_alpha_fragment:dm,project_vertex:fm,dithering_fragment:pm,dithering_pars_fragment:mm,roughnessmap_fragment:gm,roughnessmap_pars_fragment:_m,shadowmap_pars_fragment:vm,shadowmap_pars_vertex:xm,shadowmap_vertex:Mm,shadowmask_pars_fragment:Sm,skinbase_vertex:ym,skinning_pars_vertex:bm,skinning_vertex:Em,skinnormal_vertex:Am,specularmap_fragment:Tm,specularmap_pars_fragment:wm,tonemapping_fragment:Cm,tonemapping_pars_fragment:Rm,transmission_fragment:Im,transmission_pars_fragment:Pm,uv_pars_fragment:Lm,uv_pars_vertex:Dm,uv_vertex:Um,worldpos_vertex:Nm,background_vert:Fm,background_frag:qm,backgroundCube_vert:Vm,backgroundCube_frag:Om,cube_vert:Bm,cube_frag:km,depth_vert:zm,depth_frag:Gm,distance_vert:Hm,distance_frag:Wm,equirect_vert:Xm,equirect_frag:Ym,linedashed_vert:Km,linedashed_frag:Zm,meshbasic_vert:jm,meshbasic_frag:Jm,meshlambert_vert:$m,meshlambert_frag:Qm,meshmatcap_vert:tg,meshmatcap_frag:eg,meshnormal_vert:ng,meshnormal_frag:ig,meshphong_vert:sg,meshphong_frag:rg,meshphysical_vert:ag,meshphysical_frag:og,meshtoon_vert:lg,meshtoon_frag:cg,points_vert:hg,points_frag:ug,shadow_vert:dg,shadow_frag:fg,sprite_vert:pg,sprite_frag:mg},at={common:{diffuse:{value:new Kt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ft},alphaMap:{value:null},alphaMapTransform:{value:new Ft},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ft}},envmap:{envMap:{value:null},envMapRotation:{value:new Ft},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ft}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ft}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ft},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ft},normalScale:{value:new Ht(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ft},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ft}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ft}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ft}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Kt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Kt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ft},alphaTest:{value:0},uvTransform:{value:new Ft}},sprite:{diffuse:{value:new Kt(16777215)},opacity:{value:1},center:{value:new Ht(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ft},alphaMap:{value:null},alphaMapTransform:{value:new Ft},alphaTest:{value:0}}},gn={basic:{uniforms:ke([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.fog]),vertexShader:Vt.meshbasic_vert,fragmentShader:Vt.meshbasic_frag},lambert:{uniforms:ke([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new Kt(0)},envMapIntensity:{value:1}}]),vertexShader:Vt.meshlambert_vert,fragmentShader:Vt.meshlambert_frag},phong:{uniforms:ke([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new Kt(0)},specular:{value:new Kt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Vt.meshphong_vert,fragmentShader:Vt.meshphong_frag},standard:{uniforms:ke([at.common,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.roughnessmap,at.metalnessmap,at.fog,at.lights,{emissive:{value:new Kt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Vt.meshphysical_vert,fragmentShader:Vt.meshphysical_frag},toon:{uniforms:ke([at.common,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.gradientmap,at.fog,at.lights,{emissive:{value:new Kt(0)}}]),vertexShader:Vt.meshtoon_vert,fragmentShader:Vt.meshtoon_frag},matcap:{uniforms:ke([at.common,at.bumpmap,at.normalmap,at.displacementmap,at.fog,{matcap:{value:null}}]),vertexShader:Vt.meshmatcap_vert,fragmentShader:Vt.meshmatcap_frag},points:{uniforms:ke([at.points,at.fog]),vertexShader:Vt.points_vert,fragmentShader:Vt.points_frag},dashed:{uniforms:ke([at.common,at.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Vt.linedashed_vert,fragmentShader:Vt.linedashed_frag},depth:{uniforms:ke([at.common,at.displacementmap]),vertexShader:Vt.depth_vert,fragmentShader:Vt.depth_frag},normal:{uniforms:ke([at.common,at.bumpmap,at.normalmap,at.displacementmap,{opacity:{value:1}}]),vertexShader:Vt.meshnormal_vert,fragmentShader:Vt.meshnormal_frag},sprite:{uniforms:ke([at.sprite,at.fog]),vertexShader:Vt.sprite_vert,fragmentShader:Vt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ft},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Vt.background_vert,fragmentShader:Vt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ft}},vertexShader:Vt.backgroundCube_vert,fragmentShader:Vt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Vt.cube_vert,fragmentShader:Vt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Vt.equirect_vert,fragmentShader:Vt.equirect_frag},distance:{uniforms:ke([at.common,at.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Vt.distance_vert,fragmentShader:Vt.distance_frag},shadow:{uniforms:ke([at.lights,at.fog,{color:{value:new Kt(0)},opacity:{value:1}}]),vertexShader:Vt.shadow_vert,fragmentShader:Vt.shadow_frag}};gn.physical={uniforms:ke([gn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ft},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ft},clearcoatNormalScale:{value:new Ht(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ft},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ft},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ft},sheen:{value:0},sheenColor:{value:new Kt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ft},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ft},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ft},transmissionSamplerSize:{value:new Ht},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ft},attenuationDistance:{value:0},attenuationColor:{value:new Kt(0)},specularColor:{value:new Kt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ft},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ft},anisotropyVector:{value:new Ht},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ft}}]),vertexShader:Vt.meshphysical_vert,fragmentShader:Vt.meshphysical_frag};const ir={r:0,b:0,g:0},ai=new yn,gg=new oe;function _g(i,t,e,n,s,r){const a=new Kt(0);let o=s===!0?0:1,c,l,h=null,d=0,u=null;function m(M){let E=M.isScene===!0?M.background:null;if(E&&E.isTexture){const y=M.backgroundBlurriness>0;E=t.get(E,y)}return E}function g(M){let E=!1;const y=m(M);y===null?p(a,o):y&&y.isColor&&(p(y,1),E=!0);const w=i.xr.getEnvironmentBlendMode();w==="additive"?e.buffers.color.setClear(0,0,0,1,r):w==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||E)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function x(M,E){const y=m(E);y&&(y.isCubeTexture||y.mapping===Lr)?(l===void 0&&(l=new ot(new zt(1,1,1),new bn({name:"BackgroundCubeMaterial",uniforms:ts(gn.backgroundCube.uniforms),vertexShader:gn.backgroundCube.vertexShader,fragmentShader:gn.backgroundCube.fragmentShader,side:We,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(w,T,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),ai.copy(E.backgroundRotation),ai.x*=-1,ai.y*=-1,ai.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(ai.y*=-1,ai.z*=-1),l.material.uniforms.envMap.value=y,l.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,l.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(gg.makeRotationFromEuler(ai)),l.material.toneMapped=Yt.getTransfer(y.colorSpace)!==te,(h!==y||d!==y.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,h=y,d=y.version,u=i.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new ot(new jn(2,2),new bn({name:"BackgroundMaterial",uniforms:ts(gn.background.uniforms),vertexShader:gn.background.vertexShader,fragmentShader:gn.background.fragmentShader,side:$n,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.toneMapped=Yt.getTransfer(y.colorSpace)!==te,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||d!==y.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,h=y,d=y.version,u=i.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function p(M,E){M.getRGB(ir,Bh(i)),e.buffers.color.setClear(ir.r,ir.g,ir.b,E,r)}function f(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,E=1){a.set(M),o=E,p(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(M){o=M,p(a,o)},render:g,addToRenderList:x,dispose:f}}function vg(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null);let r=s,a=!1;function o(C,D,F,G,V){let B=!1;const k=d(C,G,F,D);r!==k&&(r=k,l(r.object)),B=m(C,G,F,V),B&&g(C,G,F,V),V!==null&&t.update(V,i.ELEMENT_ARRAY_BUFFER),(B||a)&&(a=!1,y(C,D,F,G),V!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(V).buffer))}function c(){return i.createVertexArray()}function l(C){return i.bindVertexArray(C)}function h(C){return i.deleteVertexArray(C)}function d(C,D,F,G){const V=G.wireframe===!0;let B=n[D.id];B===void 0&&(B={},n[D.id]=B);const k=C.isInstancedMesh===!0?C.id:0;let Q=B[k];Q===void 0&&(Q={},B[k]=Q);let j=Q[F.id];j===void 0&&(j={},Q[F.id]=j);let ht=j[V];return ht===void 0&&(ht=u(c()),j[V]=ht),ht}function u(C){const D=[],F=[],G=[];for(let V=0;V<e;V++)D[V]=0,F[V]=0,G[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:F,attributeDivisors:G,object:C,attributes:{},index:null}}function m(C,D,F,G){const V=r.attributes,B=D.attributes;let k=0;const Q=F.getAttributes();for(const j in Q)if(Q[j].location>=0){const gt=V[j];let dt=B[j];if(dt===void 0&&(j==="instanceMatrix"&&C.instanceMatrix&&(dt=C.instanceMatrix),j==="instanceColor"&&C.instanceColor&&(dt=C.instanceColor)),gt===void 0||gt.attribute!==dt||dt&&gt.data!==dt.data)return!0;k++}return r.attributesNum!==k||r.index!==G}function g(C,D,F,G){const V={},B=D.attributes;let k=0;const Q=F.getAttributes();for(const j in Q)if(Q[j].location>=0){let gt=B[j];gt===void 0&&(j==="instanceMatrix"&&C.instanceMatrix&&(gt=C.instanceMatrix),j==="instanceColor"&&C.instanceColor&&(gt=C.instanceColor));const dt={};dt.attribute=gt,gt&&gt.data&&(dt.data=gt.data),V[j]=dt,k++}r.attributes=V,r.attributesNum=k,r.index=G}function x(){const C=r.newAttributes;for(let D=0,F=C.length;D<F;D++)C[D]=0}function p(C){f(C,0)}function f(C,D){const F=r.newAttributes,G=r.enabledAttributes,V=r.attributeDivisors;F[C]=1,G[C]===0&&(i.enableVertexAttribArray(C),G[C]=1),V[C]!==D&&(i.vertexAttribDivisor(C,D),V[C]=D)}function M(){const C=r.newAttributes,D=r.enabledAttributes;for(let F=0,G=D.length;F<G;F++)D[F]!==C[F]&&(i.disableVertexAttribArray(F),D[F]=0)}function E(C,D,F,G,V,B,k){k===!0?i.vertexAttribIPointer(C,D,F,V,B):i.vertexAttribPointer(C,D,F,G,V,B)}function y(C,D,F,G){x();const V=G.attributes,B=F.getAttributes(),k=D.defaultAttributeValues;for(const Q in B){const j=B[Q];if(j.location>=0){let ht=V[Q];if(ht===void 0&&(Q==="instanceMatrix"&&C.instanceMatrix&&(ht=C.instanceMatrix),Q==="instanceColor"&&C.instanceColor&&(ht=C.instanceColor)),ht!==void 0){const gt=ht.normalized,dt=ht.itemSize,qt=t.get(ht);if(qt===void 0)continue;const ue=qt.buffer,he=qt.type,K=qt.bytesPerElement,nt=he===i.INT||he===i.UNSIGNED_INT||ht.gpuType===qo;if(ht.isInterleavedBufferAttribute){const rt=ht.data,Nt=rt.stride,Ct=ht.offset;if(rt.isInstancedInterleavedBuffer){for(let Pt=0;Pt<j.locationSize;Pt++)f(j.location+Pt,rt.meshPerAttribute);C.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let Pt=0;Pt<j.locationSize;Pt++)p(j.location+Pt);i.bindBuffer(i.ARRAY_BUFFER,ue);for(let Pt=0;Pt<j.locationSize;Pt++)E(j.location+Pt,dt/j.locationSize,he,gt,Nt*K,(Ct+dt/j.locationSize*Pt)*K,nt)}else{if(ht.isInstancedBufferAttribute){for(let rt=0;rt<j.locationSize;rt++)f(j.location+rt,ht.meshPerAttribute);C.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=ht.meshPerAttribute*ht.count)}else for(let rt=0;rt<j.locationSize;rt++)p(j.location+rt);i.bindBuffer(i.ARRAY_BUFFER,ue);for(let rt=0;rt<j.locationSize;rt++)E(j.location+rt,dt/j.locationSize,he,gt,dt*K,dt/j.locationSize*rt*K,nt)}}else if(k!==void 0){const gt=k[Q];if(gt!==void 0)switch(gt.length){case 2:i.vertexAttrib2fv(j.location,gt);break;case 3:i.vertexAttrib3fv(j.location,gt);break;case 4:i.vertexAttrib4fv(j.location,gt);break;default:i.vertexAttrib1fv(j.location,gt)}}}}M()}function w(){b();for(const C in n){const D=n[C];for(const F in D){const G=D[F];for(const V in G){const B=G[V];for(const k in B)h(B[k].object),delete B[k];delete G[V]}}delete n[C]}}function T(C){if(n[C.id]===void 0)return;const D=n[C.id];for(const F in D){const G=D[F];for(const V in G){const B=G[V];for(const k in B)h(B[k].object),delete B[k];delete G[V]}}delete n[C.id]}function R(C){for(const D in n){const F=n[D];for(const G in F){const V=F[G];if(V[C.id]===void 0)continue;const B=V[C.id];for(const k in B)h(B[k].object),delete B[k];delete V[C.id]}}}function v(C){for(const D in n){const F=n[D],G=C.isInstancedMesh===!0?C.id:0,V=F[G];if(V!==void 0){for(const B in V){const k=V[B];for(const Q in k)h(k[Q].object),delete k[Q];delete V[B]}delete F[G],Object.keys(F).length===0&&delete n[D]}}}function b(){q(),a=!0,r!==s&&(r=s,l(r.object))}function q(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:b,resetDefaultState:q,dispose:w,releaseStatesOfGeometry:T,releaseStatesOfObject:v,releaseStatesOfProgram:R,initAttributes:x,enableAttribute:p,disableUnusedAttributes:M}}function xg(i,t,e){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),e.update(h,n,1)}function a(l,h,d){d!==0&&(i.drawArraysInstanced(n,l,h,d),e.update(h,n,d))}function o(l,h,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,d);let m=0;for(let g=0;g<d;g++)m+=h[g];e.update(m,n,1)}function c(l,h,d,u){if(d===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<l.length;g++)a(l[g],h[g],u[g]);else{m.multiDrawArraysInstancedWEBGL(n,l,0,h,0,u,0,d);let g=0;for(let x=0;x<d;x++)g+=h[x]*u[x];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function Mg(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const R=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(R){return!(R!==cn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){const v=R===Fn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==je&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==ln&&!v)}function c(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(Dt("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const d=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),m=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),p=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),w=i.getParameter(i.MAX_SAMPLES),T=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:m,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:p,maxAttributes:f,maxVertexUniforms:M,maxVaryings:E,maxFragmentUniforms:y,maxSamples:w,samples:T}}function Sg(i){const t=this;let e=null,n=0,s=!1,r=!1;const a=new ci,o=new Ft,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const m=d.length!==0||u||n!==0||s;return s=u,n=d.length,m},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,m){const g=d.clippingPlanes,x=d.clipIntersection,p=d.clipShadows,f=i.get(d);if(!s||g===null||g.length===0||r&&!p)r?h(null):l();else{const M=r?0:n,E=M*4;let y=f.clippingState||null;c.value=y,y=h(g,u,E,m);for(let w=0;w!==E;++w)y[w]=e[w];f.clippingState=y,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=M}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,u,m,g){const x=d!==null?d.length:0;let p=null;if(x!==0){if(p=c.value,g!==!0||p===null){const f=m+x*4,M=u.matrixWorldInverse;o.getNormalMatrix(M),(p===null||p.length<f)&&(p=new Float32Array(f));for(let E=0,y=m;E!==x;++E,y+=4)a.copy(d[E]).applyMatrix4(M,o),a.normal.toArray(p,y),p[y+3]=a.constant}c.value=p,c.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,p}}const Jn=4,dc=[.125,.215,.35,.446,.526,.582],pi=20,yg=256,ds=new Jo,fc=new Kt;let Ma=null,Sa=0,ya=0,ba=!1;const bg=new N;class pc{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){const{size:a=256,position:o=bg}=r;Ma=this._renderer.getRenderTarget(),Sa=this._renderer.getActiveCubeFace(),ya=this._renderer.getActiveMipmapLevel(),ba=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,s,c,o),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=_c(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=gc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Ma,Sa,ya),this._renderer.xr.enabled=ba,t.scissorTest=!1,Bi(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===_i||t.mapping===Ji?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Ma=this._renderer.getRenderTarget(),Sa=this._renderer.getActiveCubeFace(),ya=this._renderer.getActiveMipmapLevel(),ba=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Ve,minFilter:Ve,generateMipmaps:!1,type:Fn,format:cn,colorSpace:Qi,depthBuffer:!1},s=mc(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=mc(t,e,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Eg(r)),this._blurMaterial=Tg(r,t,e),this._ggxMaterial=Ag(r,t,e)}return s}_compileMaterial(t){const e=new ot(new ze,t);this._renderer.compile(e,ds)}_sceneToCubeUV(t,e,n,s,r){const c=new tn(90,1,e,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,m=d.toneMapping;d.getClearColor(fc),d.toneMapping=xn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ot(new zt,new Jt({name:"PMREM.Background",side:We,depthWrite:!1,depthTest:!1})));const x=this._backgroundBox,p=x.material;let f=!1;const M=t.background;M?M.isColor&&(p.color.copy(M),t.background=null,f=!0):(p.color.copy(fc),f=!0);for(let E=0;E<6;E++){const y=E%3;y===0?(c.up.set(0,l[E],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[E],r.y,r.z)):y===1?(c.up.set(0,0,l[E]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[E],r.z)):(c.up.set(0,l[E],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[E]));const w=this._cubeSize;Bi(s,y*w,E>2?w:0,w,w),d.setRenderTarget(s),f&&d.render(x,c),d.render(t,c)}d.toneMapping=m,d.autoClear=u,t.background=M}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===_i||t.mapping===Ji;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=_c()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=gc());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=t;const c=this._cubeSize;Bi(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(a,ds)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=n}_applyGGXFilter(t,e,n){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const c=a.uniforms,l=n/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),d=Math.sqrt(l*l-h*h),u=0+l*1.25,m=d*u,{_lodMax:g}=this,x=this._sizeLods[n],p=3*x*(n>g-Jn?n-g+Jn:0),f=4*(this._cubeSize-x);c.envMap.value=t.texture,c.roughness.value=m,c.mipInt.value=g-e,Bi(r,p,f,3*x,2*x),s.setRenderTarget(r),s.render(o,ds),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=g-n,Bi(t,p,f,3*x,2*x),s.setRenderTarget(t),s.render(o,ds)}_blur(t,e,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",r),this._halfBlur(a,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Xt("blur direction must be either latitudinal or longitudinal!");const h=3,d=this._lodMeshes[s];d.material=l;const u=l.uniforms,m=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*pi-1),x=r/g,p=isFinite(r)?1+Math.floor(h*x):pi;p>pi&&Dt(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${pi}`);const f=[];let M=0;for(let R=0;R<pi;++R){const v=R/x,b=Math.exp(-v*v/2);f.push(b),R===0?M+=b:R<p&&(M+=2*b)}for(let R=0;R<f.length;R++)f[R]=f[R]/M;u.envMap.value=t.texture,u.samples.value=p,u.weights.value=f,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:E}=this;u.dTheta.value=g,u.mipInt.value=E-n;const y=this._sizeLods[s],w=3*y*(s>E-Jn?s-E+Jn:0),T=4*(this._cubeSize-y);Bi(e,w,T,3*y,2*y),c.setRenderTarget(e),c.render(d,ds)}}function Eg(i){const t=[],e=[],n=[];let s=i;const r=i-Jn+1+dc.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let c=1/o;a>i-Jn?c=dc[a-i+Jn-1]:a===0&&(c=0),e.push(c);const l=1/(o-2),h=-l,d=1+l,u=[h,h,d,h,d,d,h,h,d,d,h,d],m=6,g=6,x=3,p=2,f=1,M=new Float32Array(x*g*m),E=new Float32Array(p*g*m),y=new Float32Array(f*g*m);for(let T=0;T<m;T++){const R=T%3*2/3-1,v=T>2?0:-1,b=[R,v,0,R+2/3,v,0,R+2/3,v+1,0,R,v,0,R+2/3,v+1,0,R,v+1,0];M.set(b,x*g*T),E.set(u,p*g*T);const q=[T,T,T,T,T,T];y.set(q,f*g*T)}const w=new ze;w.setAttribute("position",new en(M,x)),w.setAttribute("uv",new en(E,p)),w.setAttribute("faceIndex",new en(y,f)),n.push(new ot(w,null)),s>Jn&&s--}return{lodMeshes:n,sizeLods:t,sigmas:e}}function mc(i,t,e){const n=new Mn(i,t,e);return n.texture.mapping=Lr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Bi(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Ag(i,t,e){return new bn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:yg,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Dr(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Un,depthTest:!1,depthWrite:!1})}function Tg(i,t,e){const n=new Float32Array(pi),s=new N(0,1,0);return new bn({name:"SphericalGaussianBlur",defines:{n:pi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Dr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Un,depthTest:!1,depthWrite:!1})}function gc(){return new bn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Dr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Un,depthTest:!1,depthWrite:!1})}function _c(){return new bn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Dr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Un,depthTest:!1,depthWrite:!1})}function Dr(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class Gh extends Mn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Vh(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new zt(5,5,5),r=new bn({name:"CubemapFromEquirect",uniforms:ts(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:We,blending:Un});r.uniforms.tEquirect.value=e;const a=new ot(s,r),o=e.minFilter;return e.minFilter===mi&&(e.minFilter=Ve),new Lf(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}}function wg(i){let t=new WeakMap,e=new WeakMap,n=null;function s(u,m=!1){return u==null?null:m?a(u):r(u)}function r(u){if(u&&u.isTexture){const m=u.mapping;if(m===Wr||m===Xr)if(t.has(u)){const g=t.get(u).texture;return o(g,u.mapping)}else{const g=u.image;if(g&&g.height>0){const x=new Gh(g.height);return x.fromEquirectangularTexture(i,u),t.set(u,x),u.addEventListener("dispose",l),o(x.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){const m=u.mapping,g=m===Wr||m===Xr,x=m===_i||m===Ji;if(g||x){let p=e.get(u);const f=p!==void 0?p.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==f)return n===null&&(n=new pc(i)),p=g?n.fromEquirectangular(u,p):n.fromCubemap(u,p),p.texture.pmremVersion=u.pmremVersion,e.set(u,p),p.texture;if(p!==void 0)return p.texture;{const M=u.image;return g&&M&&M.height>0||x&&M&&c(M)?(n===null&&(n=new pc(i)),p=g?n.fromEquirectangular(u):n.fromCubemap(u),p.texture.pmremVersion=u.pmremVersion,e.set(u,p),u.addEventListener("dispose",h),p.texture):null}}}return u}function o(u,m){return m===Wr?u.mapping=_i:m===Xr&&(u.mapping=Ji),u}function c(u){let m=0;const g=6;for(let x=0;x<g;x++)u[x]!==void 0&&m++;return m===g}function l(u){const m=u.target;m.removeEventListener("dispose",l);const g=t.get(m);g!==void 0&&(t.delete(m),g.dispose())}function h(u){const m=u.target;m.removeEventListener("dispose",h);const g=e.get(m);g!==void 0&&(e.delete(m),g.dispose())}function d(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:d}}function Cg(i){const t={};function e(n){if(t[n]!==void 0)return t[n];const s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&Cr("WebGLRenderer: "+n+" extension not supported."),s}}}function Rg(i,t,e,n){const s={},r=new WeakMap;function a(d){const u=d.target;u.index!==null&&t.remove(u.index);for(const g in u.attributes)t.remove(u.attributes[g]);u.removeEventListener("dispose",a),delete s[u.id];const m=r.get(u);m&&(t.remove(m),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function o(d,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,e.memory.geometries++),u}function c(d){const u=d.attributes;for(const m in u)t.update(u[m],i.ARRAY_BUFFER)}function l(d){const u=[],m=d.index,g=d.attributes.position;let x=0;if(g===void 0)return;if(m!==null){const M=m.array;x=m.version;for(let E=0,y=M.length;E<y;E+=3){const w=M[E+0],T=M[E+1],R=M[E+2];u.push(w,T,T,R,R,w)}}else{const M=g.array;x=g.version;for(let E=0,y=M.length/3-1;E<y;E+=3){const w=E+0,T=E+1,R=E+2;u.push(w,T,T,R,R,w)}}const p=new(g.count>=65535?Nh:Uh)(u,1);p.version=x;const f=r.get(d);f&&t.remove(f),r.set(d,p)}function h(d){const u=r.get(d);if(u){const m=d.index;m!==null&&u.version<m.version&&l(d)}else l(d);return r.get(d)}return{get:o,update:c,getWireframeAttribute:h}}function Ig(i,t,e){let n;function s(u){n=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function c(u,m){i.drawElements(n,m,r,u*a),e.update(m,n,1)}function l(u,m,g){g!==0&&(i.drawElementsInstanced(n,m,r,u*a,g),e.update(m,n,g))}function h(u,m,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,m,0,r,u,0,g);let p=0;for(let f=0;f<g;f++)p+=m[f];e.update(p,n,1)}function d(u,m,g,x){if(g===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let f=0;f<u.length;f++)l(u[f]/a,m[f],x[f]);else{p.multiDrawElementsInstancedWEBGL(n,m,0,r,u,0,x,0,g);let f=0;for(let M=0;M<g;M++)f+=m[M]*x[M];e.update(f,n,1)}}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function Pg(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:Xt("WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Lg(i,t,e){const n=new WeakMap,s=new me;function r(a,o,c){const l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0;let u=n.get(o);if(u===void 0||u.count!==d){let b=function(){R.dispose(),n.delete(o),o.removeEventListener("dispose",b)};u!==void 0&&u.texture.dispose();const m=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],f=o.morphAttributes.normal||[],M=o.morphAttributes.color||[];let E=0;m===!0&&(E=1),g===!0&&(E=2),x===!0&&(E=3);let y=o.attributes.position.count*E,w=1;y>t.maxTextureSize&&(w=Math.ceil(y/t.maxTextureSize),y=t.maxTextureSize);const T=new Float32Array(y*w*4*d),R=new Lh(T,y,w,d);R.type=ln,R.needsUpdate=!0;const v=E*4;for(let q=0;q<d;q++){const C=p[q],D=f[q],F=M[q],G=y*w*4*q;for(let V=0;V<C.count;V++){const B=V*v;m===!0&&(s.fromBufferAttribute(C,V),T[G+B+0]=s.x,T[G+B+1]=s.y,T[G+B+2]=s.z,T[G+B+3]=0),g===!0&&(s.fromBufferAttribute(D,V),T[G+B+4]=s.x,T[G+B+5]=s.y,T[G+B+6]=s.z,T[G+B+7]=0),x===!0&&(s.fromBufferAttribute(F,V),T[G+B+8]=s.x,T[G+B+9]=s.y,T[G+B+10]=s.z,T[G+B+11]=F.itemSize===4?s.w:1)}}u={count:d,texture:R,size:new Ht(y,w)},n.set(o,u),o.addEventListener("dispose",b)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let m=0;for(let x=0;x<l.length;x++)m+=l[x];const g=o.morphTargetsRelative?1:1-m;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",u.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function Dg(i,t,e,n,s){let r=new WeakMap;function a(l){const h=s.render.frame,d=l.geometry,u=t.get(l,d);if(r.get(u)!==h&&(t.update(u),r.set(u,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==h&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){const m=l.skeleton;r.get(m)!==h&&(m.update(),r.set(m,h))}return u}function o(){r=new WeakMap}function c(l){const h=l.target;h.removeEventListener("dispose",c),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:a,dispose:o}}const Ug={[gh]:"LINEAR_TONE_MAPPING",[_h]:"REINHARD_TONE_MAPPING",[vh]:"CINEON_TONE_MAPPING",[xh]:"ACES_FILMIC_TONE_MAPPING",[Sh]:"AGX_TONE_MAPPING",[yh]:"NEUTRAL_TONE_MAPPING",[Mh]:"CUSTOM_TONE_MAPPING"};function Ng(i,t,e,n,s){const r=new Mn(t,e,{type:i,depthBuffer:n,stencilBuffer:s}),a=new Mn(t,e,{type:Fn,depthBuffer:!1,stencilBuffer:!1}),o=new ze;o.setAttribute("position",new fe([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new fe([0,2,0,0,2,0],2));const c=new Sf({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),l=new ot(o,c),h=new Jo(-1,1,1,-1,0,1);let d=null,u=null,m=!1,g,x=null,p=[],f=!1;this.setSize=function(M,E){r.setSize(M,E),a.setSize(M,E);for(let y=0;y<p.length;y++){const w=p[y];w.setSize&&w.setSize(M,E)}},this.setEffects=function(M){p=M,f=p.length>0&&p[0].isRenderPass===!0;const E=r.width,y=r.height;for(let w=0;w<p.length;w++){const T=p[w];T.setSize&&T.setSize(E,y)}},this.begin=function(M,E){if(m||M.toneMapping===xn&&p.length===0)return!1;if(x=E,E!==null){const y=E.width,w=E.height;(r.width!==y||r.height!==w)&&this.setSize(y,w)}return f===!1&&M.setRenderTarget(r),g=M.toneMapping,M.toneMapping=xn,!0},this.hasRenderPass=function(){return f},this.end=function(M,E){M.toneMapping=g,m=!0;let y=r,w=a;for(let T=0;T<p.length;T++){const R=p[T];if(R.enabled!==!1&&(R.render(M,w,y,E),R.needsSwap!==!1)){const v=y;y=w,w=v}}if(d!==M.outputColorSpace||u!==M.toneMapping){d=M.outputColorSpace,u=M.toneMapping,c.defines={},Yt.getTransfer(d)===te&&(c.defines.SRGB_TRANSFER="");const T=Ug[u];T&&(c.defines[T]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=y.texture,M.setRenderTarget(x),M.render(l,h),x=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){r.dispose(),a.dispose(),o.dispose(),c.dispose()}}const Hh=new Le,Ro=new Es(1,1),Wh=new Lh,Xh=new jd,Yh=new Vh,vc=[],xc=[],Mc=new Float32Array(16),Sc=new Float32Array(9),yc=new Float32Array(4);function ss(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=vc[s];if(r===void 0&&(r=new Float32Array(s),vc[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function Ae(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Te(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Ur(i,t){let e=xc[t];e===void 0&&(e=new Int32Array(t),xc[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Fg(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function qg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;i.uniform2fv(this.addr,t),Te(e,t)}}function Vg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ae(e,t))return;i.uniform3fv(this.addr,t),Te(e,t)}}function Og(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;i.uniform4fv(this.addr,t),Te(e,t)}}function Bg(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Te(e,t)}else{if(Ae(e,n))return;yc.set(n),i.uniformMatrix2fv(this.addr,!1,yc),Te(e,n)}}function kg(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Te(e,t)}else{if(Ae(e,n))return;Sc.set(n),i.uniformMatrix3fv(this.addr,!1,Sc),Te(e,n)}}function zg(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Te(e,t)}else{if(Ae(e,n))return;Mc.set(n),i.uniformMatrix4fv(this.addr,!1,Mc),Te(e,n)}}function Gg(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Hg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;i.uniform2iv(this.addr,t),Te(e,t)}}function Wg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ae(e,t))return;i.uniform3iv(this.addr,t),Te(e,t)}}function Xg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;i.uniform4iv(this.addr,t),Te(e,t)}}function Yg(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Kg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;i.uniform2uiv(this.addr,t),Te(e,t)}}function Zg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ae(e,t))return;i.uniform3uiv(this.addr,t),Te(e,t)}}function jg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;i.uniform4uiv(this.addr,t),Te(e,t)}}function Jg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Ro.compareFunction=e.isReversedDepthBuffer()?Wo:Ho,r=Ro):r=Hh,e.setTexture2D(t||r,s)}function $g(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Xh,s)}function Qg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Yh,s)}function t0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Wh,s)}function e0(i){switch(i){case 5126:return Fg;case 35664:return qg;case 35665:return Vg;case 35666:return Og;case 35674:return Bg;case 35675:return kg;case 35676:return zg;case 5124:case 35670:return Gg;case 35667:case 35671:return Hg;case 35668:case 35672:return Wg;case 35669:case 35673:return Xg;case 5125:return Yg;case 36294:return Kg;case 36295:return Zg;case 36296:return jg;case 35678:case 36198:case 36298:case 36306:case 35682:return Jg;case 35679:case 36299:case 36307:return $g;case 35680:case 36300:case 36308:case 36293:return Qg;case 36289:case 36303:case 36311:case 36292:return t0}}function n0(i,t){i.uniform1fv(this.addr,t)}function i0(i,t){const e=ss(t,this.size,2);i.uniform2fv(this.addr,e)}function s0(i,t){const e=ss(t,this.size,3);i.uniform3fv(this.addr,e)}function r0(i,t){const e=ss(t,this.size,4);i.uniform4fv(this.addr,e)}function a0(i,t){const e=ss(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function o0(i,t){const e=ss(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function l0(i,t){const e=ss(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function c0(i,t){i.uniform1iv(this.addr,t)}function h0(i,t){i.uniform2iv(this.addr,t)}function u0(i,t){i.uniform3iv(this.addr,t)}function d0(i,t){i.uniform4iv(this.addr,t)}function f0(i,t){i.uniform1uiv(this.addr,t)}function p0(i,t){i.uniform2uiv(this.addr,t)}function m0(i,t){i.uniform3uiv(this.addr,t)}function g0(i,t){i.uniform4uiv(this.addr,t)}function _0(i,t,e){const n=this.cache,s=t.length,r=Ur(e,s);Ae(n,r)||(i.uniform1iv(this.addr,r),Te(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=Ro:a=Hh;for(let o=0;o!==s;++o)e.setTexture2D(t[o]||a,r[o])}function v0(i,t,e){const n=this.cache,s=t.length,r=Ur(e,s);Ae(n,r)||(i.uniform1iv(this.addr,r),Te(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||Xh,r[a])}function x0(i,t,e){const n=this.cache,s=t.length,r=Ur(e,s);Ae(n,r)||(i.uniform1iv(this.addr,r),Te(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||Yh,r[a])}function M0(i,t,e){const n=this.cache,s=t.length,r=Ur(e,s);Ae(n,r)||(i.uniform1iv(this.addr,r),Te(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||Wh,r[a])}function S0(i){switch(i){case 5126:return n0;case 35664:return i0;case 35665:return s0;case 35666:return r0;case 35674:return a0;case 35675:return o0;case 35676:return l0;case 5124:case 35670:return c0;case 35667:case 35671:return h0;case 35668:case 35672:return u0;case 35669:case 35673:return d0;case 5125:return f0;case 36294:return p0;case 36295:return m0;case 36296:return g0;case 35678:case 36198:case 36298:case 36306:case 35682:return _0;case 35679:case 36299:case 36307:return v0;case 35680:case 36300:case 36308:case 36293:return x0;case 36289:case 36303:case 36311:case 36292:return M0}}class y0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=e0(e.type)}}class b0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=S0(e.type)}}class E0{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],n)}}}const Ea=/(\w+)(\])?(\[|\.)?/g;function bc(i,t){i.seq.push(t),i.map[t.id]=t}function A0(i,t,e){const n=i.name,s=n.length;for(Ea.lastIndex=0;;){const r=Ea.exec(n),a=Ea.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){bc(e,l===void 0?new y0(o,i,t):new b0(o,i,t));break}else{let d=e.map[o];d===void 0&&(d=new E0(o),bc(e,d)),e=d}}}class Mr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=t.getActiveUniform(e,a),c=t.getUniformLocation(e,o.name);A0(o,c,this)}const s=[],r=[];for(const a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&n.push(a)}return n}}function Ec(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const T0=37297;let w0=0;function C0(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const Ac=new Ft;function R0(i){Yt._getMatrix(Ac,Yt.workingColorSpace,i);const t=`mat3( ${Ac.elements.map(e=>e.toFixed(4))} )`;switch(Yt.getTransfer(i)){case wr:return[t,"LinearTransferOETF"];case te:return[t,"sRGBTransferOETF"];default:return Dt("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Tc(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+C0(i.getShaderSource(t),o)}else return r}function I0(i,t){const e=R0(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}const P0={[gh]:"Linear",[_h]:"Reinhard",[vh]:"Cineon",[xh]:"ACESFilmic",[Sh]:"AgX",[yh]:"Neutral",[Mh]:"Custom"};function L0(i,t){const e=P0[t];return e===void 0?(Dt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const sr=new N;function D0(){Yt.getLuminanceCoefficients(sr);const i=sr.x.toFixed(4),t=sr.y.toFixed(4),e=sr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function U0(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(xs).join(`
`)}function N0(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function F0(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function xs(i){return i!==""}function wc(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Cc(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const q0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Io(i){return i.replace(q0,O0)}const V0=new Map;function O0(i,t){let e=Vt[t];if(e===void 0){const n=V0.get(t);if(n!==void 0)e=Vt[n],Dt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Io(e)}const B0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Rc(i){return i.replace(B0,k0)}function k0(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Ic(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}const z0={[mr]:"SHADOWMAP_TYPE_PCF",[vs]:"SHADOWMAP_TYPE_VSM"};function G0(i){return z0[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const H0={[_i]:"ENVMAP_TYPE_CUBE",[Ji]:"ENVMAP_TYPE_CUBE",[Lr]:"ENVMAP_TYPE_CUBE_UV"};function W0(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":H0[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const X0={[Ji]:"ENVMAP_MODE_REFRACTION"};function Y0(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":X0[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const K0={[Fo]:"ENVMAP_BLENDING_MULTIPLY",[Rd]:"ENVMAP_BLENDING_MIX",[Id]:"ENVMAP_BLENDING_ADD"};function Z0(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":K0[i.combine]||"ENVMAP_BLENDING_NONE"}function j0(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function J0(i,t,e,n){const s=i.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const c=G0(e),l=W0(e),h=Y0(e),d=Z0(e),u=j0(e),m=U0(e),g=N0(r),x=s.createProgram();let p,f,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(xs).join(`
`),p.length>0&&(p+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(xs).join(`
`),f.length>0&&(f+=`
`)):(p=[Ic(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(xs).join(`
`),f=[Ic(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==xn?"#define TONE_MAPPING":"",e.toneMapping!==xn?Vt.tonemapping_pars_fragment:"",e.toneMapping!==xn?L0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Vt.colorspace_pars_fragment,I0("linearToOutputTexel",e.outputColorSpace),D0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(xs).join(`
`)),a=Io(a),a=wc(a,e),a=Cc(a,e),o=Io(o),o=wc(o,e),o=Cc(o,e),a=Rc(a),o=Rc(o),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,p=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,f=["#define varying in",e.glslVersion===Fl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Fl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const E=M+p+a,y=M+f+o,w=Ec(s,s.VERTEX_SHADER,E),T=Ec(s,s.FRAGMENT_SHADER,y);s.attachShader(x,w),s.attachShader(x,T),e.index0AttributeName!==void 0?s.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function R(C){if(i.debug.checkShaderErrors){const D=s.getProgramInfoLog(x)||"",F=s.getShaderInfoLog(w)||"",G=s.getShaderInfoLog(T)||"",V=D.trim(),B=F.trim(),k=G.trim();let Q=!0,j=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(Q=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,w,T);else{const ht=Tc(s,w,"vertex"),gt=Tc(s,T,"fragment");Xt("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+V+`
`+ht+`
`+gt)}else V!==""?Dt("WebGLProgram: Program Info Log:",V):(B===""||k==="")&&(j=!1);j&&(C.diagnostics={runnable:Q,programLog:V,vertexShader:{log:B,prefix:p},fragmentShader:{log:k,prefix:f}})}s.deleteShader(w),s.deleteShader(T),v=new Mr(s,x),b=F0(s,x)}let v;this.getUniforms=function(){return v===void 0&&R(this),v};let b;this.getAttributes=function(){return b===void 0&&R(this),b};let q=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return q===!1&&(q=s.getProgramParameter(x,T0)),q},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=w0++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=w,this.fragmentShader=T,this}let $0=0;class Q0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new t_(t),e.set(t,n)),n}}class t_{constructor(t){this.id=$0++,this.code=t,this.usedTimes=0}}function e_(i,t,e,n,s,r){const a=new Yo,o=new Q0,c=new Set,l=[],h=new Map,d=n.logarithmicDepthBuffer;let u=n.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(v){return c.add(v),v===0?"uv":`uv${v}`}function x(v,b,q,C,D){const F=C.fog,G=D.geometry,V=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?C.environment:null,B=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,k=t.get(v.envMap||V,B),Q=k&&k.mapping===Lr?k.image.height:null,j=m[v.type];v.precision!==null&&(u=n.getMaxPrecision(v.precision),u!==v.precision&&Dt("WebGLProgram.getParameters:",v.precision,"not supported, using",u,"instead."));const ht=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,gt=ht!==void 0?ht.length:0;let dt=0;G.morphAttributes.position!==void 0&&(dt=1),G.morphAttributes.normal!==void 0&&(dt=2),G.morphAttributes.color!==void 0&&(dt=3);let qt,ue,he,K;if(j){const Qt=gn[j];qt=Qt.vertexShader,ue=Qt.fragmentShader}else qt=v.vertexShader,ue=v.fragmentShader,o.update(v),he=o.getVertexShaderID(v),K=o.getFragmentShaderID(v);const nt=i.getRenderTarget(),rt=i.state.buffers.depth.getReversed(),Nt=D.isInstancedMesh===!0,Ct=D.isBatchedMesh===!0,Pt=!!v.map,we=!!v.matcap,Wt=!!k,$t=!!v.aoMap,ie=!!v.lightMap,Ot=!!v.bumpMap,ge=!!v.normalMap,I=!!v.displacementMap,Me=!!v.emissiveMap,jt=!!v.metalnessMap,le=!!v.roughnessMap,yt=v.anisotropy>0,A=v.clearcoat>0,_=v.dispersion>0,L=v.iridescence>0,Y=v.sheen>0,Z=v.transmission>0,X=yt&&!!v.anisotropyMap,_t=A&&!!v.clearcoatMap,it=A&&!!v.clearcoatNormalMap,Tt=A&&!!v.clearcoatRoughnessMap,Rt=L&&!!v.iridescenceMap,J=L&&!!v.iridescenceThicknessMap,tt=Y&&!!v.sheenColorMap,vt=Y&&!!v.sheenRoughnessMap,Mt=!!v.specularMap,ut=!!v.specularColorMap,Bt=!!v.specularIntensityMap,P=Z&&!!v.transmissionMap,st=Z&&!!v.thicknessMap,et=!!v.gradientMap,mt=!!v.alphaMap,$=v.alphaTest>0,W=!!v.alphaHash,xt=!!v.extensions;let Lt=xn;v.toneMapped&&(nt===null||nt.isXRRenderTarget===!0)&&(Lt=i.toneMapping);const ce={shaderID:j,shaderType:v.type,shaderName:v.name,vertexShader:qt,fragmentShader:ue,defines:v.defines,customVertexShaderID:he,customFragmentShaderID:K,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:u,batching:Ct,batchingColor:Ct&&D._colorsTexture!==null,instancing:Nt,instancingColor:Nt&&D.instanceColor!==null,instancingMorph:Nt&&D.morphTexture!==null,outputColorSpace:nt===null?i.outputColorSpace:nt.isXRRenderTarget===!0?nt.texture.colorSpace:Qi,alphaToCoverage:!!v.alphaToCoverage,map:Pt,matcap:we,envMap:Wt,envMapMode:Wt&&k.mapping,envMapCubeUVHeight:Q,aoMap:$t,lightMap:ie,bumpMap:Ot,normalMap:ge,displacementMap:I,emissiveMap:Me,normalMapObjectSpace:ge&&v.normalMapType===Dd,normalMapTangentSpace:ge&&v.normalMapType===Ih,metalnessMap:jt,roughnessMap:le,anisotropy:yt,anisotropyMap:X,clearcoat:A,clearcoatMap:_t,clearcoatNormalMap:it,clearcoatRoughnessMap:Tt,dispersion:_,iridescence:L,iridescenceMap:Rt,iridescenceThicknessMap:J,sheen:Y,sheenColorMap:tt,sheenRoughnessMap:vt,specularMap:Mt,specularColorMap:ut,specularIntensityMap:Bt,transmission:Z,transmissionMap:P,thicknessMap:st,gradientMap:et,opaque:v.transparent===!1&&v.blending===Xi&&v.alphaToCoverage===!1,alphaMap:mt,alphaTest:$,alphaHash:W,combine:v.combine,mapUv:Pt&&g(v.map.channel),aoMapUv:$t&&g(v.aoMap.channel),lightMapUv:ie&&g(v.lightMap.channel),bumpMapUv:Ot&&g(v.bumpMap.channel),normalMapUv:ge&&g(v.normalMap.channel),displacementMapUv:I&&g(v.displacementMap.channel),emissiveMapUv:Me&&g(v.emissiveMap.channel),metalnessMapUv:jt&&g(v.metalnessMap.channel),roughnessMapUv:le&&g(v.roughnessMap.channel),anisotropyMapUv:X&&g(v.anisotropyMap.channel),clearcoatMapUv:_t&&g(v.clearcoatMap.channel),clearcoatNormalMapUv:it&&g(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Tt&&g(v.clearcoatRoughnessMap.channel),iridescenceMapUv:Rt&&g(v.iridescenceMap.channel),iridescenceThicknessMapUv:J&&g(v.iridescenceThicknessMap.channel),sheenColorMapUv:tt&&g(v.sheenColorMap.channel),sheenRoughnessMapUv:vt&&g(v.sheenRoughnessMap.channel),specularMapUv:Mt&&g(v.specularMap.channel),specularColorMapUv:ut&&g(v.specularColorMap.channel),specularIntensityMapUv:Bt&&g(v.specularIntensityMap.channel),transmissionMapUv:P&&g(v.transmissionMap.channel),thicknessMapUv:st&&g(v.thicknessMap.channel),alphaMapUv:mt&&g(v.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(ge||yt),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!G.attributes.uv&&(Pt||mt),fog:!!F,useFog:v.fog===!0,fogExp2:!!F&&F.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||G.attributes.normal===void 0&&ge===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:rt,skinning:D.isSkinnedMesh===!0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:gt,morphTextureStride:dt,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:i.shadowMap.enabled&&q.length>0,shadowMapType:i.shadowMap.type,toneMapping:Lt,decodeVideoTexture:Pt&&v.map.isVideoTexture===!0&&Yt.getTransfer(v.map.colorSpace)===te,decodeVideoTextureEmissive:Me&&v.emissiveMap.isVideoTexture===!0&&Yt.getTransfer(v.emissiveMap.colorSpace)===te,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===qe,flipSided:v.side===We,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:xt&&v.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(xt&&v.extensions.multiDraw===!0||Ct)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return ce.vertexUv1s=c.has(1),ce.vertexUv2s=c.has(2),ce.vertexUv3s=c.has(3),c.clear(),ce}function p(v){const b=[];if(v.shaderID?b.push(v.shaderID):(b.push(v.customVertexShaderID),b.push(v.customFragmentShaderID)),v.defines!==void 0)for(const q in v.defines)b.push(q),b.push(v.defines[q]);return v.isRawShaderMaterial===!1&&(f(b,v),M(b,v),b.push(i.outputColorSpace)),b.push(v.customProgramCacheKey),b.join()}function f(v,b){v.push(b.precision),v.push(b.outputColorSpace),v.push(b.envMapMode),v.push(b.envMapCubeUVHeight),v.push(b.mapUv),v.push(b.alphaMapUv),v.push(b.lightMapUv),v.push(b.aoMapUv),v.push(b.bumpMapUv),v.push(b.normalMapUv),v.push(b.displacementMapUv),v.push(b.emissiveMapUv),v.push(b.metalnessMapUv),v.push(b.roughnessMapUv),v.push(b.anisotropyMapUv),v.push(b.clearcoatMapUv),v.push(b.clearcoatNormalMapUv),v.push(b.clearcoatRoughnessMapUv),v.push(b.iridescenceMapUv),v.push(b.iridescenceThicknessMapUv),v.push(b.sheenColorMapUv),v.push(b.sheenRoughnessMapUv),v.push(b.specularMapUv),v.push(b.specularColorMapUv),v.push(b.specularIntensityMapUv),v.push(b.transmissionMapUv),v.push(b.thicknessMapUv),v.push(b.combine),v.push(b.fogExp2),v.push(b.sizeAttenuation),v.push(b.morphTargetsCount),v.push(b.morphAttributeCount),v.push(b.numDirLights),v.push(b.numPointLights),v.push(b.numSpotLights),v.push(b.numSpotLightMaps),v.push(b.numHemiLights),v.push(b.numRectAreaLights),v.push(b.numDirLightShadows),v.push(b.numPointLightShadows),v.push(b.numSpotLightShadows),v.push(b.numSpotLightShadowsWithMaps),v.push(b.numLightProbes),v.push(b.shadowMapType),v.push(b.toneMapping),v.push(b.numClippingPlanes),v.push(b.numClipIntersection),v.push(b.depthPacking)}function M(v,b){a.disableAll(),b.instancing&&a.enable(0),b.instancingColor&&a.enable(1),b.instancingMorph&&a.enable(2),b.matcap&&a.enable(3),b.envMap&&a.enable(4),b.normalMapObjectSpace&&a.enable(5),b.normalMapTangentSpace&&a.enable(6),b.clearcoat&&a.enable(7),b.iridescence&&a.enable(8),b.alphaTest&&a.enable(9),b.vertexColors&&a.enable(10),b.vertexAlphas&&a.enable(11),b.vertexUv1s&&a.enable(12),b.vertexUv2s&&a.enable(13),b.vertexUv3s&&a.enable(14),b.vertexTangents&&a.enable(15),b.anisotropy&&a.enable(16),b.alphaHash&&a.enable(17),b.batching&&a.enable(18),b.dispersion&&a.enable(19),b.batchingColor&&a.enable(20),b.gradientMap&&a.enable(21),v.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reversedDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),v.push(a.mask)}function E(v){const b=m[v.type];let q;if(b){const C=gn[b];q=vf.clone(C.uniforms)}else q=v.uniforms;return q}function y(v,b){let q=h.get(b);return q!==void 0?++q.usedTimes:(q=new J0(i,b,v,s),l.push(q),h.set(b,q)),q}function w(v){if(--v.usedTimes===0){const b=l.indexOf(v);l[b]=l[l.length-1],l.pop(),h.delete(v.cacheKey),v.destroy()}}function T(v){o.remove(v)}function R(){o.dispose()}return{getParameters:x,getProgramCacheKey:p,getUniforms:E,acquireProgram:y,releaseProgram:w,releaseShaderCache:T,programs:l,dispose:R}}function n_(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function i_(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function Pc(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Lc(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(u){let m=0;return u.isInstancedMesh&&(m+=2),u.isSkinnedMesh&&(m+=1),m}function o(u,m,g,x,p,f){let M=i[t];return M===void 0?(M={id:u.id,object:u,geometry:m,material:g,materialVariant:a(u),groupOrder:x,renderOrder:u.renderOrder,z:p,group:f},i[t]=M):(M.id=u.id,M.object=u,M.geometry=m,M.material=g,M.materialVariant=a(u),M.groupOrder=x,M.renderOrder=u.renderOrder,M.z=p,M.group=f),t++,M}function c(u,m,g,x,p,f){const M=o(u,m,g,x,p,f);g.transmission>0?n.push(M):g.transparent===!0?s.push(M):e.push(M)}function l(u,m,g,x,p,f){const M=o(u,m,g,x,p,f);g.transmission>0?n.unshift(M):g.transparent===!0?s.unshift(M):e.unshift(M)}function h(u,m){e.length>1&&e.sort(u||i_),n.length>1&&n.sort(m||Pc),s.length>1&&s.sort(m||Pc)}function d(){for(let u=t,m=i.length;u<m;u++){const g=i[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:d,sort:h}}function s_(){let i=new WeakMap;function t(n,s){const r=i.get(n);let a;return r===void 0?(a=new Lc,i.set(n,[a])):s>=r.length?(a=new Lc,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function r_(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new N,color:new Kt};break;case"SpotLight":e={position:new N,direction:new N,color:new Kt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new N,color:new Kt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new N,skyColor:new Kt,groundColor:new Kt};break;case"RectAreaLight":e={color:new Kt,position:new N,halfWidth:new N,halfHeight:new N};break}return i[t.id]=e,e}}}function a_(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ht};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ht};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ht,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let o_=0;function l_(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function c_(i){const t=new r_,e=a_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new N);const s=new N,r=new oe,a=new oe;function o(l){let h=0,d=0,u=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let m=0,g=0,x=0,p=0,f=0,M=0,E=0,y=0,w=0,T=0,R=0;l.sort(l_);for(let b=0,q=l.length;b<q;b++){const C=l[b],D=C.color,F=C.intensity,G=C.distance;let V=null;if(C.shadow&&C.shadow.map&&(C.shadow.map.texture.format===$i?V=C.shadow.map.texture:V=C.shadow.map.depthTexture||C.shadow.map.texture),C.isAmbientLight)h+=D.r*F,d+=D.g*F,u+=D.b*F;else if(C.isLightProbe){for(let B=0;B<9;B++)n.probe[B].addScaledVector(C.sh.coefficients[B],F);R++}else if(C.isDirectionalLight){const B=t.get(C);if(B.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const k=C.shadow,Q=e.get(C);Q.shadowIntensity=k.intensity,Q.shadowBias=k.bias,Q.shadowNormalBias=k.normalBias,Q.shadowRadius=k.radius,Q.shadowMapSize=k.mapSize,n.directionalShadow[m]=Q,n.directionalShadowMap[m]=V,n.directionalShadowMatrix[m]=C.shadow.matrix,M++}n.directional[m]=B,m++}else if(C.isSpotLight){const B=t.get(C);B.position.setFromMatrixPosition(C.matrixWorld),B.color.copy(D).multiplyScalar(F),B.distance=G,B.coneCos=Math.cos(C.angle),B.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),B.decay=C.decay,n.spot[x]=B;const k=C.shadow;if(C.map&&(n.spotLightMap[w]=C.map,w++,k.updateMatrices(C),C.castShadow&&T++),n.spotLightMatrix[x]=k.matrix,C.castShadow){const Q=e.get(C);Q.shadowIntensity=k.intensity,Q.shadowBias=k.bias,Q.shadowNormalBias=k.normalBias,Q.shadowRadius=k.radius,Q.shadowMapSize=k.mapSize,n.spotShadow[x]=Q,n.spotShadowMap[x]=V,y++}x++}else if(C.isRectAreaLight){const B=t.get(C);B.color.copy(D).multiplyScalar(F),B.halfWidth.set(C.width*.5,0,0),B.halfHeight.set(0,C.height*.5,0),n.rectArea[p]=B,p++}else if(C.isPointLight){const B=t.get(C);if(B.color.copy(C.color).multiplyScalar(C.intensity),B.distance=C.distance,B.decay=C.decay,C.castShadow){const k=C.shadow,Q=e.get(C);Q.shadowIntensity=k.intensity,Q.shadowBias=k.bias,Q.shadowNormalBias=k.normalBias,Q.shadowRadius=k.radius,Q.shadowMapSize=k.mapSize,Q.shadowCameraNear=k.camera.near,Q.shadowCameraFar=k.camera.far,n.pointShadow[g]=Q,n.pointShadowMap[g]=V,n.pointShadowMatrix[g]=C.shadow.matrix,E++}n.point[g]=B,g++}else if(C.isHemisphereLight){const B=t.get(C);B.skyColor.copy(C.color).multiplyScalar(F),B.groundColor.copy(C.groundColor).multiplyScalar(F),n.hemi[f]=B,f++}}p>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=at.LTC_FLOAT_1,n.rectAreaLTC2=at.LTC_FLOAT_2):(n.rectAreaLTC1=at.LTC_HALF_1,n.rectAreaLTC2=at.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;const v=n.hash;(v.directionalLength!==m||v.pointLength!==g||v.spotLength!==x||v.rectAreaLength!==p||v.hemiLength!==f||v.numDirectionalShadows!==M||v.numPointShadows!==E||v.numSpotShadows!==y||v.numSpotMaps!==w||v.numLightProbes!==R)&&(n.directional.length=m,n.spot.length=x,n.rectArea.length=p,n.point.length=g,n.hemi.length=f,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=E,n.pointShadowMap.length=E,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=E,n.spotLightMatrix.length=y+w-T,n.spotLightMap.length=w,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=R,v.directionalLength=m,v.pointLength=g,v.spotLength=x,v.rectAreaLength=p,v.hemiLength=f,v.numDirectionalShadows=M,v.numPointShadows=E,v.numSpotShadows=y,v.numSpotMaps=w,v.numLightProbes=R,n.version=o_++)}function c(l,h){let d=0,u=0,m=0,g=0,x=0;const p=h.matrixWorldInverse;for(let f=0,M=l.length;f<M;f++){const E=l[f];if(E.isDirectionalLight){const y=n.directional[d];y.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(p),d++}else if(E.isSpotLight){const y=n.spot[m];y.position.setFromMatrixPosition(E.matrixWorld),y.position.applyMatrix4(p),y.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(p),m++}else if(E.isRectAreaLight){const y=n.rectArea[g];y.position.setFromMatrixPosition(E.matrixWorld),y.position.applyMatrix4(p),a.identity(),r.copy(E.matrixWorld),r.premultiply(p),a.extractRotation(r),y.halfWidth.set(E.width*.5,0,0),y.halfHeight.set(0,E.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),g++}else if(E.isPointLight){const y=n.point[u];y.position.setFromMatrixPosition(E.matrixWorld),y.position.applyMatrix4(p),u++}else if(E.isHemisphereLight){const y=n.hemi[x];y.direction.setFromMatrixPosition(E.matrixWorld),y.direction.transformDirection(p),x++}}}return{setup:o,setupView:c,state:n}}function Dc(i){const t=new c_(i),e=[],n=[];function s(h){l.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function a(h){n.push(h)}function o(){t.setup(e)}function c(h){t.setupView(e,h)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:o,setupLightsView:c,pushLight:r,pushShadow:a}}function h_(i){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new Dc(i),t.set(s,[o])):r>=a.length?(o=new Dc(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}const u_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,d_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,f_=[new N(1,0,0),new N(-1,0,0),new N(0,1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1)],p_=[new N(0,-1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1),new N(0,-1,0),new N(0,-1,0)],Uc=new oe,fs=new N,Aa=new N;function m_(i,t,e){let n=new Ko;const s=new Ht,r=new Ht,a=new me,o=new yf,c=new bf,l={},h=e.maxTextureSize,d={[$n]:We,[We]:$n,[qe]:qe},u=new bn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ht},radius:{value:4}},vertexShader:u_,fragmentShader:d_}),m=u.clone();m.defines.HORIZONTAL_PASS=1;const g=new ze;g.setAttribute("position",new en(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new ot(g,u),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=mr;let f=this.type;this.render=function(T,R,v){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||T.length===0)return;this.type===mh&&(Dt("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=mr);const b=i.getRenderTarget(),q=i.getActiveCubeFace(),C=i.getActiveMipmapLevel(),D=i.state;D.setBlending(Un),D.buffers.depth.getReversed()===!0?D.buffers.color.setClear(0,0,0,0):D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);const F=f!==this.type;F&&R.traverse(function(G){G.material&&(Array.isArray(G.material)?G.material.forEach(V=>V.needsUpdate=!0):G.material.needsUpdate=!0)});for(let G=0,V=T.length;G<V;G++){const B=T[G],k=B.shadow;if(k===void 0){Dt("WebGLShadowMap:",B,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;s.copy(k.mapSize);const Q=k.getFrameExtents();s.multiply(Q),r.copy(k.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/Q.x),s.x=r.x*Q.x,k.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/Q.y),s.y=r.y*Q.y,k.mapSize.y=r.y));const j=i.state.buffers.depth.getReversed();if(k.camera._reversedDepth=j,k.map===null||F===!0){if(k.map!==null&&(k.map.depthTexture!==null&&(k.map.depthTexture.dispose(),k.map.depthTexture=null),k.map.dispose()),this.type===vs){if(B.isPointLight){Dt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}k.map=new Mn(s.x,s.y,{format:$i,type:Fn,minFilter:Ve,magFilter:Ve,generateMipmaps:!1}),k.map.texture.name=B.name+".shadowMap",k.map.depthTexture=new Es(s.x,s.y,ln),k.map.depthTexture.name=B.name+".shadowMapDepth",k.map.depthTexture.format=qn,k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=Pe,k.map.depthTexture.magFilter=Pe}else B.isPointLight?(k.map=new Gh(s.x),k.map.depthTexture=new gf(s.x,Sn)):(k.map=new Mn(s.x,s.y),k.map.depthTexture=new Es(s.x,s.y,Sn)),k.map.depthTexture.name=B.name+".shadowMap",k.map.depthTexture.format=qn,this.type===mr?(k.map.depthTexture.compareFunction=j?Wo:Ho,k.map.depthTexture.minFilter=Ve,k.map.depthTexture.magFilter=Ve):(k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=Pe,k.map.depthTexture.magFilter=Pe);k.camera.updateProjectionMatrix()}const ht=k.map.isWebGLCubeRenderTarget?6:1;for(let gt=0;gt<ht;gt++){if(k.map.isWebGLCubeRenderTarget)i.setRenderTarget(k.map,gt),i.clear();else{gt===0&&(i.setRenderTarget(k.map),i.clear());const dt=k.getViewport(gt);a.set(r.x*dt.x,r.y*dt.y,r.x*dt.z,r.y*dt.w),D.viewport(a)}if(B.isPointLight){const dt=k.camera,qt=k.matrix,ue=B.distance||dt.far;ue!==dt.far&&(dt.far=ue,dt.updateProjectionMatrix()),fs.setFromMatrixPosition(B.matrixWorld),dt.position.copy(fs),Aa.copy(dt.position),Aa.add(f_[gt]),dt.up.copy(p_[gt]),dt.lookAt(Aa),dt.updateMatrixWorld(),qt.makeTranslation(-fs.x,-fs.y,-fs.z),Uc.multiplyMatrices(dt.projectionMatrix,dt.matrixWorldInverse),k._frustum.setFromProjectionMatrix(Uc,dt.coordinateSystem,dt.reversedDepth)}else k.updateMatrices(B);n=k.getFrustum(),y(R,v,k.camera,B,this.type)}k.isPointLightShadow!==!0&&this.type===vs&&M(k,v),k.needsUpdate=!1}f=this.type,p.needsUpdate=!1,i.setRenderTarget(b,q,C)};function M(T,R){const v=t.update(x);u.defines.VSM_SAMPLES!==T.blurSamples&&(u.defines.VSM_SAMPLES=T.blurSamples,m.defines.VSM_SAMPLES=T.blurSamples,u.needsUpdate=!0,m.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Mn(s.x,s.y,{format:$i,type:Fn})),u.uniforms.shadow_pass.value=T.map.depthTexture,u.uniforms.resolution.value=T.mapSize,u.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(R,null,v,u,x,null),m.uniforms.shadow_pass.value=T.mapPass.texture,m.uniforms.resolution.value=T.mapSize,m.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(R,null,v,m,x,null)}function E(T,R,v,b){let q=null;const C=v.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(C!==void 0)q=C;else if(q=v.isPointLight===!0?c:o,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const D=q.uuid,F=R.uuid;let G=l[D];G===void 0&&(G={},l[D]=G);let V=G[F];V===void 0&&(V=q.clone(),G[F]=V,R.addEventListener("dispose",w)),q=V}if(q.visible=R.visible,q.wireframe=R.wireframe,b===vs?q.side=R.shadowSide!==null?R.shadowSide:R.side:q.side=R.shadowSide!==null?R.shadowSide:d[R.side],q.alphaMap=R.alphaMap,q.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,q.map=R.map,q.clipShadows=R.clipShadows,q.clippingPlanes=R.clippingPlanes,q.clipIntersection=R.clipIntersection,q.displacementMap=R.displacementMap,q.displacementScale=R.displacementScale,q.displacementBias=R.displacementBias,q.wireframeLinewidth=R.wireframeLinewidth,q.linewidth=R.linewidth,v.isPointLight===!0&&q.isMeshDistanceMaterial===!0){const D=i.properties.get(q);D.light=v}return q}function y(T,R,v,b,q){if(T.visible===!1)return;if(T.layers.test(R.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&q===vs)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,T.matrixWorld);const F=t.update(T),G=T.material;if(Array.isArray(G)){const V=F.groups;for(let B=0,k=V.length;B<k;B++){const Q=V[B],j=G[Q.materialIndex];if(j&&j.visible){const ht=E(T,j,b,q);T.onBeforeShadow(i,T,R,v,F,ht,Q),i.renderBufferDirect(v,null,F,ht,T,Q),T.onAfterShadow(i,T,R,v,F,ht,Q)}}}else if(G.visible){const V=E(T,G,b,q);T.onBeforeShadow(i,T,R,v,F,V,null),i.renderBufferDirect(v,null,F,V,T,null),T.onAfterShadow(i,T,R,v,F,V,null)}}const D=T.children;for(let F=0,G=D.length;F<G;F++)y(D[F],R,v,b,q)}function w(T){T.target.removeEventListener("dispose",w);for(const v in l){const b=l[v],q=T.target.uuid;q in b&&(b[q].dispose(),delete b[q])}}}function g_(i,t){function e(){let P=!1;const st=new me;let et=null;const mt=new me(0,0,0,0);return{setMask:function($){et!==$&&!P&&(i.colorMask($,$,$,$),et=$)},setLocked:function($){P=$},setClear:function($,W,xt,Lt,ce){ce===!0&&($*=Lt,W*=Lt,xt*=Lt),st.set($,W,xt,Lt),mt.equals(st)===!1&&(i.clearColor($,W,xt,Lt),mt.copy(st))},reset:function(){P=!1,et=null,mt.set(-1,0,0,0)}}}function n(){let P=!1,st=!1,et=null,mt=null,$=null;return{setReversed:function(W){if(st!==W){const xt=t.get("EXT_clip_control");W?xt.clipControlEXT(xt.LOWER_LEFT_EXT,xt.ZERO_TO_ONE_EXT):xt.clipControlEXT(xt.LOWER_LEFT_EXT,xt.NEGATIVE_ONE_TO_ONE_EXT),st=W;const Lt=$;$=null,this.setClear(Lt)}},getReversed:function(){return st},setTest:function(W){W?nt(i.DEPTH_TEST):rt(i.DEPTH_TEST)},setMask:function(W){et!==W&&!P&&(i.depthMask(W),et=W)},setFunc:function(W){if(st&&(W=Gd[W]),mt!==W){switch(W){case Oa:i.depthFunc(i.NEVER);break;case Ba:i.depthFunc(i.ALWAYS);break;case ka:i.depthFunc(i.LESS);break;case ji:i.depthFunc(i.LEQUAL);break;case za:i.depthFunc(i.EQUAL);break;case Ga:i.depthFunc(i.GEQUAL);break;case Ha:i.depthFunc(i.GREATER);break;case Wa:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}mt=W}},setLocked:function(W){P=W},setClear:function(W){$!==W&&($=W,st&&(W=1-W),i.clearDepth(W))},reset:function(){P=!1,et=null,mt=null,$=null,st=!1}}}function s(){let P=!1,st=null,et=null,mt=null,$=null,W=null,xt=null,Lt=null,ce=null;return{setTest:function(Qt){P||(Qt?nt(i.STENCIL_TEST):rt(i.STENCIL_TEST))},setMask:function(Qt){st!==Qt&&!P&&(i.stencilMask(Qt),st=Qt)},setFunc:function(Qt,En,An){(et!==Qt||mt!==En||$!==An)&&(i.stencilFunc(Qt,En,An),et=Qt,mt=En,$=An)},setOp:function(Qt,En,An){(W!==Qt||xt!==En||Lt!==An)&&(i.stencilOp(Qt,En,An),W=Qt,xt=En,Lt=An)},setLocked:function(Qt){P=Qt},setClear:function(Qt){ce!==Qt&&(i.clearStencil(Qt),ce=Qt)},reset:function(){P=!1,st=null,et=null,mt=null,$=null,W=null,xt=null,Lt=null,ce=null}}}const r=new e,a=new n,o=new s,c=new WeakMap,l=new WeakMap;let h={},d={},u=new WeakMap,m=[],g=null,x=!1,p=null,f=null,M=null,E=null,y=null,w=null,T=null,R=new Kt(0,0,0),v=0,b=!1,q=null,C=null,D=null,F=null,G=null;const V=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let B=!1,k=0;const Q=i.getParameter(i.VERSION);Q.indexOf("WebGL")!==-1?(k=parseFloat(/^WebGL (\d)/.exec(Q)[1]),B=k>=1):Q.indexOf("OpenGL ES")!==-1&&(k=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),B=k>=2);let j=null,ht={};const gt=i.getParameter(i.SCISSOR_BOX),dt=i.getParameter(i.VIEWPORT),qt=new me().fromArray(gt),ue=new me().fromArray(dt);function he(P,st,et,mt){const $=new Uint8Array(4),W=i.createTexture();i.bindTexture(P,W),i.texParameteri(P,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(P,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let xt=0;xt<et;xt++)P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY?i.texImage3D(st,0,i.RGBA,1,1,mt,0,i.RGBA,i.UNSIGNED_BYTE,$):i.texImage2D(st+xt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,$);return W}const K={};K[i.TEXTURE_2D]=he(i.TEXTURE_2D,i.TEXTURE_2D,1),K[i.TEXTURE_CUBE_MAP]=he(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),K[i.TEXTURE_2D_ARRAY]=he(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),K[i.TEXTURE_3D]=he(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),nt(i.DEPTH_TEST),a.setFunc(ji),Ot(!1),ge(Il),nt(i.CULL_FACE),$t(Un);function nt(P){h[P]!==!0&&(i.enable(P),h[P]=!0)}function rt(P){h[P]!==!1&&(i.disable(P),h[P]=!1)}function Nt(P,st){return d[P]!==st?(i.bindFramebuffer(P,st),d[P]=st,P===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=st),P===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=st),!0):!1}function Ct(P,st){let et=m,mt=!1;if(P){et=u.get(st),et===void 0&&(et=[],u.set(st,et));const $=P.textures;if(et.length!==$.length||et[0]!==i.COLOR_ATTACHMENT0){for(let W=0,xt=$.length;W<xt;W++)et[W]=i.COLOR_ATTACHMENT0+W;et.length=$.length,mt=!0}}else et[0]!==i.BACK&&(et[0]=i.BACK,mt=!0);mt&&i.drawBuffers(et)}function Pt(P){return g!==P?(i.useProgram(P),g=P,!0):!1}const we={[ui]:i.FUNC_ADD,[dd]:i.FUNC_SUBTRACT,[fd]:i.FUNC_REVERSE_SUBTRACT};we[pd]=i.MIN,we[md]=i.MAX;const Wt={[gd]:i.ZERO,[_d]:i.ONE,[vd]:i.SRC_COLOR,[qa]:i.SRC_ALPHA,[Ed]:i.SRC_ALPHA_SATURATE,[yd]:i.DST_COLOR,[Md]:i.DST_ALPHA,[xd]:i.ONE_MINUS_SRC_COLOR,[Va]:i.ONE_MINUS_SRC_ALPHA,[bd]:i.ONE_MINUS_DST_COLOR,[Sd]:i.ONE_MINUS_DST_ALPHA,[Ad]:i.CONSTANT_COLOR,[Td]:i.ONE_MINUS_CONSTANT_COLOR,[wd]:i.CONSTANT_ALPHA,[Cd]:i.ONE_MINUS_CONSTANT_ALPHA};function $t(P,st,et,mt,$,W,xt,Lt,ce,Qt){if(P===Un){x===!0&&(rt(i.BLEND),x=!1);return}if(x===!1&&(nt(i.BLEND),x=!0),P!==ud){if(P!==p||Qt!==b){if((f!==ui||y!==ui)&&(i.blendEquation(i.FUNC_ADD),f=ui,y=ui),Qt)switch(P){case Xi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Pl:i.blendFunc(i.ONE,i.ONE);break;case Ll:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Dl:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Xt("WebGLState: Invalid blending: ",P);break}else switch(P){case Xi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Pl:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Ll:Xt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Dl:Xt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Xt("WebGLState: Invalid blending: ",P);break}M=null,E=null,w=null,T=null,R.set(0,0,0),v=0,p=P,b=Qt}return}$=$||st,W=W||et,xt=xt||mt,(st!==f||$!==y)&&(i.blendEquationSeparate(we[st],we[$]),f=st,y=$),(et!==M||mt!==E||W!==w||xt!==T)&&(i.blendFuncSeparate(Wt[et],Wt[mt],Wt[W],Wt[xt]),M=et,E=mt,w=W,T=xt),(Lt.equals(R)===!1||ce!==v)&&(i.blendColor(Lt.r,Lt.g,Lt.b,ce),R.copy(Lt),v=ce),p=P,b=!1}function ie(P,st){P.side===qe?rt(i.CULL_FACE):nt(i.CULL_FACE);let et=P.side===We;st&&(et=!et),Ot(et),P.blending===Xi&&P.transparent===!1?$t(Un):$t(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),a.setFunc(P.depthFunc),a.setTest(P.depthTest),a.setMask(P.depthWrite),r.setMask(P.colorWrite);const mt=P.stencilWrite;o.setTest(mt),mt&&(o.setMask(P.stencilWriteMask),o.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),o.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),Me(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?nt(i.SAMPLE_ALPHA_TO_COVERAGE):rt(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ot(P){q!==P&&(P?i.frontFace(i.CW):i.frontFace(i.CCW),q=P)}function ge(P){P!==cd?(nt(i.CULL_FACE),P!==C&&(P===Il?i.cullFace(i.BACK):P===hd?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):rt(i.CULL_FACE),C=P}function I(P){P!==D&&(B&&i.lineWidth(P),D=P)}function Me(P,st,et){P?(nt(i.POLYGON_OFFSET_FILL),(F!==st||G!==et)&&(F=st,G=et,a.getReversed()&&(st=-st),i.polygonOffset(st,et))):rt(i.POLYGON_OFFSET_FILL)}function jt(P){P?nt(i.SCISSOR_TEST):rt(i.SCISSOR_TEST)}function le(P){P===void 0&&(P=i.TEXTURE0+V-1),j!==P&&(i.activeTexture(P),j=P)}function yt(P,st,et){et===void 0&&(j===null?et=i.TEXTURE0+V-1:et=j);let mt=ht[et];mt===void 0&&(mt={type:void 0,texture:void 0},ht[et]=mt),(mt.type!==P||mt.texture!==st)&&(j!==et&&(i.activeTexture(et),j=et),i.bindTexture(P,st||K[P]),mt.type=P,mt.texture=st)}function A(){const P=ht[j];P!==void 0&&P.type!==void 0&&(i.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function _(){try{i.compressedTexImage2D(...arguments)}catch(P){Xt("WebGLState:",P)}}function L(){try{i.compressedTexImage3D(...arguments)}catch(P){Xt("WebGLState:",P)}}function Y(){try{i.texSubImage2D(...arguments)}catch(P){Xt("WebGLState:",P)}}function Z(){try{i.texSubImage3D(...arguments)}catch(P){Xt("WebGLState:",P)}}function X(){try{i.compressedTexSubImage2D(...arguments)}catch(P){Xt("WebGLState:",P)}}function _t(){try{i.compressedTexSubImage3D(...arguments)}catch(P){Xt("WebGLState:",P)}}function it(){try{i.texStorage2D(...arguments)}catch(P){Xt("WebGLState:",P)}}function Tt(){try{i.texStorage3D(...arguments)}catch(P){Xt("WebGLState:",P)}}function Rt(){try{i.texImage2D(...arguments)}catch(P){Xt("WebGLState:",P)}}function J(){try{i.texImage3D(...arguments)}catch(P){Xt("WebGLState:",P)}}function tt(P){qt.equals(P)===!1&&(i.scissor(P.x,P.y,P.z,P.w),qt.copy(P))}function vt(P){ue.equals(P)===!1&&(i.viewport(P.x,P.y,P.z,P.w),ue.copy(P))}function Mt(P,st){let et=l.get(st);et===void 0&&(et=new WeakMap,l.set(st,et));let mt=et.get(P);mt===void 0&&(mt=i.getUniformBlockIndex(st,P.name),et.set(P,mt))}function ut(P,st){const mt=l.get(st).get(P);c.get(st)!==mt&&(i.uniformBlockBinding(st,mt,P.__bindingPointIndex),c.set(st,mt))}function Bt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},j=null,ht={},d={},u=new WeakMap,m=[],g=null,x=!1,p=null,f=null,M=null,E=null,y=null,w=null,T=null,R=new Kt(0,0,0),v=0,b=!1,q=null,C=null,D=null,F=null,G=null,qt.set(0,0,i.canvas.width,i.canvas.height),ue.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:nt,disable:rt,bindFramebuffer:Nt,drawBuffers:Ct,useProgram:Pt,setBlending:$t,setMaterial:ie,setFlipSided:Ot,setCullFace:ge,setLineWidth:I,setPolygonOffset:Me,setScissorTest:jt,activeTexture:le,bindTexture:yt,unbindTexture:A,compressedTexImage2D:_,compressedTexImage3D:L,texImage2D:Rt,texImage3D:J,updateUBOMapping:Mt,uniformBlockBinding:ut,texStorage2D:it,texStorage3D:Tt,texSubImage2D:Y,texSubImage3D:Z,compressedTexSubImage2D:X,compressedTexSubImage3D:_t,scissor:tt,viewport:vt,reset:Bt}}function __(i,t,e,n,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Ht,h=new WeakMap;let d;const u=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(A,_){return m?new OffscreenCanvas(A,_):bs("canvas")}function x(A,_,L){let Y=1;const Z=yt(A);if((Z.width>L||Z.height>L)&&(Y=L/Math.max(Z.width,Z.height)),Y<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const X=Math.floor(Y*Z.width),_t=Math.floor(Y*Z.height);d===void 0&&(d=g(X,_t));const it=_?g(X,_t):d;return it.width=X,it.height=_t,it.getContext("2d").drawImage(A,0,0,X,_t),Dt("WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+X+"x"+_t+")."),it}else return"data"in A&&Dt("WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),A;return A}function p(A){return A.generateMipmaps}function f(A){i.generateMipmap(A)}function M(A){return A.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?i.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function E(A,_,L,Y,Z=!1){if(A!==null){if(i[A]!==void 0)return i[A];Dt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let X=_;if(_===i.RED&&(L===i.FLOAT&&(X=i.R32F),L===i.HALF_FLOAT&&(X=i.R16F),L===i.UNSIGNED_BYTE&&(X=i.R8)),_===i.RED_INTEGER&&(L===i.UNSIGNED_BYTE&&(X=i.R8UI),L===i.UNSIGNED_SHORT&&(X=i.R16UI),L===i.UNSIGNED_INT&&(X=i.R32UI),L===i.BYTE&&(X=i.R8I),L===i.SHORT&&(X=i.R16I),L===i.INT&&(X=i.R32I)),_===i.RG&&(L===i.FLOAT&&(X=i.RG32F),L===i.HALF_FLOAT&&(X=i.RG16F),L===i.UNSIGNED_BYTE&&(X=i.RG8)),_===i.RG_INTEGER&&(L===i.UNSIGNED_BYTE&&(X=i.RG8UI),L===i.UNSIGNED_SHORT&&(X=i.RG16UI),L===i.UNSIGNED_INT&&(X=i.RG32UI),L===i.BYTE&&(X=i.RG8I),L===i.SHORT&&(X=i.RG16I),L===i.INT&&(X=i.RG32I)),_===i.RGB_INTEGER&&(L===i.UNSIGNED_BYTE&&(X=i.RGB8UI),L===i.UNSIGNED_SHORT&&(X=i.RGB16UI),L===i.UNSIGNED_INT&&(X=i.RGB32UI),L===i.BYTE&&(X=i.RGB8I),L===i.SHORT&&(X=i.RGB16I),L===i.INT&&(X=i.RGB32I)),_===i.RGBA_INTEGER&&(L===i.UNSIGNED_BYTE&&(X=i.RGBA8UI),L===i.UNSIGNED_SHORT&&(X=i.RGBA16UI),L===i.UNSIGNED_INT&&(X=i.RGBA32UI),L===i.BYTE&&(X=i.RGBA8I),L===i.SHORT&&(X=i.RGBA16I),L===i.INT&&(X=i.RGBA32I)),_===i.RGB&&(L===i.UNSIGNED_INT_5_9_9_9_REV&&(X=i.RGB9_E5),L===i.UNSIGNED_INT_10F_11F_11F_REV&&(X=i.R11F_G11F_B10F)),_===i.RGBA){const _t=Z?wr:Yt.getTransfer(Y);L===i.FLOAT&&(X=i.RGBA32F),L===i.HALF_FLOAT&&(X=i.RGBA16F),L===i.UNSIGNED_BYTE&&(X=_t===te?i.SRGB8_ALPHA8:i.RGBA8),L===i.UNSIGNED_SHORT_4_4_4_4&&(X=i.RGBA4),L===i.UNSIGNED_SHORT_5_5_5_1&&(X=i.RGB5_A1)}return(X===i.R16F||X===i.R32F||X===i.RG16F||X===i.RG32F||X===i.RGBA16F||X===i.RGBA32F)&&t.get("EXT_color_buffer_float"),X}function y(A,_){let L;return A?_===null||_===Sn||_===Ss?L=i.DEPTH24_STENCIL8:_===ln?L=i.DEPTH32F_STENCIL8:_===Ms&&(L=i.DEPTH24_STENCIL8,Dt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===Sn||_===Ss?L=i.DEPTH_COMPONENT24:_===ln?L=i.DEPTH_COMPONENT32F:_===Ms&&(L=i.DEPTH_COMPONENT16),L}function w(A,_){return p(A)===!0||A.isFramebufferTexture&&A.minFilter!==Pe&&A.minFilter!==Ve?Math.log2(Math.max(_.width,_.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?_.mipmaps.length:1}function T(A){const _=A.target;_.removeEventListener("dispose",T),v(_),_.isVideoTexture&&h.delete(_)}function R(A){const _=A.target;_.removeEventListener("dispose",R),q(_)}function v(A){const _=n.get(A);if(_.__webglInit===void 0)return;const L=A.source,Y=u.get(L);if(Y){const Z=Y[_.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&b(A),Object.keys(Y).length===0&&u.delete(L)}n.remove(A)}function b(A){const _=n.get(A);i.deleteTexture(_.__webglTexture);const L=A.source,Y=u.get(L);delete Y[_.__cacheKey],a.memory.textures--}function q(A){const _=n.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),n.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(_.__webglFramebuffer[Y]))for(let Z=0;Z<_.__webglFramebuffer[Y].length;Z++)i.deleteFramebuffer(_.__webglFramebuffer[Y][Z]);else i.deleteFramebuffer(_.__webglFramebuffer[Y]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[Y])}else{if(Array.isArray(_.__webglFramebuffer))for(let Y=0;Y<_.__webglFramebuffer.length;Y++)i.deleteFramebuffer(_.__webglFramebuffer[Y]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let Y=0;Y<_.__webglColorRenderbuffer.length;Y++)_.__webglColorRenderbuffer[Y]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[Y]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const L=A.textures;for(let Y=0,Z=L.length;Y<Z;Y++){const X=n.get(L[Y]);X.__webglTexture&&(i.deleteTexture(X.__webglTexture),a.memory.textures--),n.remove(L[Y])}n.remove(A)}let C=0;function D(){C=0}function F(){const A=C;return A>=s.maxTextures&&Dt("WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+s.maxTextures),C+=1,A}function G(A){const _=[];return _.push(A.wrapS),_.push(A.wrapT),_.push(A.wrapR||0),_.push(A.magFilter),_.push(A.minFilter),_.push(A.anisotropy),_.push(A.internalFormat),_.push(A.format),_.push(A.type),_.push(A.generateMipmaps),_.push(A.premultiplyAlpha),_.push(A.flipY),_.push(A.unpackAlignment),_.push(A.colorSpace),_.join()}function V(A,_){const L=n.get(A);if(A.isVideoTexture&&jt(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&L.__version!==A.version){const Y=A.image;if(Y===null)Dt("WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)Dt("WebGLRenderer: Texture marked for update but image is incomplete");else{K(L,A,_);return}}else A.isExternalTexture&&(L.__webglTexture=A.sourceTexture?A.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,L.__webglTexture,i.TEXTURE0+_)}function B(A,_){const L=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&L.__version!==A.version){K(L,A,_);return}else A.isExternalTexture&&(L.__webglTexture=A.sourceTexture?A.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,L.__webglTexture,i.TEXTURE0+_)}function k(A,_){const L=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&L.__version!==A.version){K(L,A,_);return}e.bindTexture(i.TEXTURE_3D,L.__webglTexture,i.TEXTURE0+_)}function Q(A,_){const L=n.get(A);if(A.isCubeDepthTexture!==!0&&A.version>0&&L.__version!==A.version){nt(L,A,_);return}e.bindTexture(i.TEXTURE_CUBE_MAP,L.__webglTexture,i.TEXTURE0+_)}const j={[Xa]:i.REPEAT,[Dn]:i.CLAMP_TO_EDGE,[Ya]:i.MIRRORED_REPEAT},ht={[Pe]:i.NEAREST,[Pd]:i.NEAREST_MIPMAP_NEAREST,[Fs]:i.NEAREST_MIPMAP_LINEAR,[Ve]:i.LINEAR,[Yr]:i.LINEAR_MIPMAP_NEAREST,[mi]:i.LINEAR_MIPMAP_LINEAR},gt={[Ud]:i.NEVER,[Od]:i.ALWAYS,[Nd]:i.LESS,[Ho]:i.LEQUAL,[Fd]:i.EQUAL,[Wo]:i.GEQUAL,[qd]:i.GREATER,[Vd]:i.NOTEQUAL};function dt(A,_){if(_.type===ln&&t.has("OES_texture_float_linear")===!1&&(_.magFilter===Ve||_.magFilter===Yr||_.magFilter===Fs||_.magFilter===mi||_.minFilter===Ve||_.minFilter===Yr||_.minFilter===Fs||_.minFilter===mi)&&Dt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(A,i.TEXTURE_WRAP_S,j[_.wrapS]),i.texParameteri(A,i.TEXTURE_WRAP_T,j[_.wrapT]),(A===i.TEXTURE_3D||A===i.TEXTURE_2D_ARRAY)&&i.texParameteri(A,i.TEXTURE_WRAP_R,j[_.wrapR]),i.texParameteri(A,i.TEXTURE_MAG_FILTER,ht[_.magFilter]),i.texParameteri(A,i.TEXTURE_MIN_FILTER,ht[_.minFilter]),_.compareFunction&&(i.texParameteri(A,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(A,i.TEXTURE_COMPARE_FUNC,gt[_.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Pe||_.minFilter!==Fs&&_.minFilter!==mi||_.type===ln&&t.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){const L=t.get("EXT_texture_filter_anisotropic");i.texParameterf(A,L.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function qt(A,_){let L=!1;A.__webglInit===void 0&&(A.__webglInit=!0,_.addEventListener("dispose",T));const Y=_.source;let Z=u.get(Y);Z===void 0&&(Z={},u.set(Y,Z));const X=G(_);if(X!==A.__cacheKey){Z[X]===void 0&&(Z[X]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,L=!0),Z[X].usedTimes++;const _t=Z[A.__cacheKey];_t!==void 0&&(Z[A.__cacheKey].usedTimes--,_t.usedTimes===0&&b(_)),A.__cacheKey=X,A.__webglTexture=Z[X].texture}return L}function ue(A,_,L){return Math.floor(Math.floor(A/L)/_)}function he(A,_,L,Y){const X=A.updateRanges;if(X.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,_.width,_.height,L,Y,_.data);else{X.sort((J,tt)=>J.start-tt.start);let _t=0;for(let J=1;J<X.length;J++){const tt=X[_t],vt=X[J],Mt=tt.start+tt.count,ut=ue(vt.start,_.width,4),Bt=ue(tt.start,_.width,4);vt.start<=Mt+1&&ut===Bt&&ue(vt.start+vt.count-1,_.width,4)===ut?tt.count=Math.max(tt.count,vt.start+vt.count-tt.start):(++_t,X[_t]=vt)}X.length=_t+1;const it=i.getParameter(i.UNPACK_ROW_LENGTH),Tt=i.getParameter(i.UNPACK_SKIP_PIXELS),Rt=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,_.width);for(let J=0,tt=X.length;J<tt;J++){const vt=X[J],Mt=Math.floor(vt.start/4),ut=Math.ceil(vt.count/4),Bt=Mt%_.width,P=Math.floor(Mt/_.width),st=ut,et=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Bt),i.pixelStorei(i.UNPACK_SKIP_ROWS,P),e.texSubImage2D(i.TEXTURE_2D,0,Bt,P,st,et,L,Y,_.data)}A.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,it),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Tt),i.pixelStorei(i.UNPACK_SKIP_ROWS,Rt)}}function K(A,_,L){let Y=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(Y=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(Y=i.TEXTURE_3D);const Z=qt(A,_),X=_.source;e.bindTexture(Y,A.__webglTexture,i.TEXTURE0+L);const _t=n.get(X);if(X.version!==_t.__version||Z===!0){e.activeTexture(i.TEXTURE0+L);const it=Yt.getPrimaries(Yt.workingColorSpace),Tt=_.colorSpace===Kn?null:Yt.getPrimaries(_.colorSpace),Rt=_.colorSpace===Kn||it===Tt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Rt);let J=x(_.image,!1,s.maxTextureSize);J=le(_,J);const tt=r.convert(_.format,_.colorSpace),vt=r.convert(_.type);let Mt=E(_.internalFormat,tt,vt,_.colorSpace,_.isVideoTexture);dt(Y,_);let ut;const Bt=_.mipmaps,P=_.isVideoTexture!==!0,st=_t.__version===void 0||Z===!0,et=X.dataReady,mt=w(_,J);if(_.isDepthTexture)Mt=y(_.format===gi,_.type),st&&(P?e.texStorage2D(i.TEXTURE_2D,1,Mt,J.width,J.height):e.texImage2D(i.TEXTURE_2D,0,Mt,J.width,J.height,0,tt,vt,null));else if(_.isDataTexture)if(Bt.length>0){P&&st&&e.texStorage2D(i.TEXTURE_2D,mt,Mt,Bt[0].width,Bt[0].height);for(let $=0,W=Bt.length;$<W;$++)ut=Bt[$],P?et&&e.texSubImage2D(i.TEXTURE_2D,$,0,0,ut.width,ut.height,tt,vt,ut.data):e.texImage2D(i.TEXTURE_2D,$,Mt,ut.width,ut.height,0,tt,vt,ut.data);_.generateMipmaps=!1}else P?(st&&e.texStorage2D(i.TEXTURE_2D,mt,Mt,J.width,J.height),et&&he(_,J,tt,vt)):e.texImage2D(i.TEXTURE_2D,0,Mt,J.width,J.height,0,tt,vt,J.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){P&&st&&e.texStorage3D(i.TEXTURE_2D_ARRAY,mt,Mt,Bt[0].width,Bt[0].height,J.depth);for(let $=0,W=Bt.length;$<W;$++)if(ut=Bt[$],_.format!==cn)if(tt!==null)if(P){if(et)if(_.layerUpdates.size>0){const xt=uc(ut.width,ut.height,_.format,_.type);for(const Lt of _.layerUpdates){const ce=ut.data.subarray(Lt*xt/ut.data.BYTES_PER_ELEMENT,(Lt+1)*xt/ut.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,Lt,ut.width,ut.height,1,tt,ce)}_.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,0,ut.width,ut.height,J.depth,tt,ut.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,$,Mt,ut.width,ut.height,J.depth,0,ut.data,0,0);else Dt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else P?et&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,0,ut.width,ut.height,J.depth,tt,vt,ut.data):e.texImage3D(i.TEXTURE_2D_ARRAY,$,Mt,ut.width,ut.height,J.depth,0,tt,vt,ut.data)}else{P&&st&&e.texStorage2D(i.TEXTURE_2D,mt,Mt,Bt[0].width,Bt[0].height);for(let $=0,W=Bt.length;$<W;$++)ut=Bt[$],_.format!==cn?tt!==null?P?et&&e.compressedTexSubImage2D(i.TEXTURE_2D,$,0,0,ut.width,ut.height,tt,ut.data):e.compressedTexImage2D(i.TEXTURE_2D,$,Mt,ut.width,ut.height,0,ut.data):Dt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):P?et&&e.texSubImage2D(i.TEXTURE_2D,$,0,0,ut.width,ut.height,tt,vt,ut.data):e.texImage2D(i.TEXTURE_2D,$,Mt,ut.width,ut.height,0,tt,vt,ut.data)}else if(_.isDataArrayTexture)if(P){if(st&&e.texStorage3D(i.TEXTURE_2D_ARRAY,mt,Mt,J.width,J.height,J.depth),et)if(_.layerUpdates.size>0){const $=uc(J.width,J.height,_.format,_.type);for(const W of _.layerUpdates){const xt=J.data.subarray(W*$/J.data.BYTES_PER_ELEMENT,(W+1)*$/J.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,W,J.width,J.height,1,tt,vt,xt)}_.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,tt,vt,J.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Mt,J.width,J.height,J.depth,0,tt,vt,J.data);else if(_.isData3DTexture)P?(st&&e.texStorage3D(i.TEXTURE_3D,mt,Mt,J.width,J.height,J.depth),et&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,tt,vt,J.data)):e.texImage3D(i.TEXTURE_3D,0,Mt,J.width,J.height,J.depth,0,tt,vt,J.data);else if(_.isFramebufferTexture){if(st)if(P)e.texStorage2D(i.TEXTURE_2D,mt,Mt,J.width,J.height);else{let $=J.width,W=J.height;for(let xt=0;xt<mt;xt++)e.texImage2D(i.TEXTURE_2D,xt,Mt,$,W,0,tt,vt,null),$>>=1,W>>=1}}else if(Bt.length>0){if(P&&st){const $=yt(Bt[0]);e.texStorage2D(i.TEXTURE_2D,mt,Mt,$.width,$.height)}for(let $=0,W=Bt.length;$<W;$++)ut=Bt[$],P?et&&e.texSubImage2D(i.TEXTURE_2D,$,0,0,tt,vt,ut):e.texImage2D(i.TEXTURE_2D,$,Mt,tt,vt,ut);_.generateMipmaps=!1}else if(P){if(st){const $=yt(J);e.texStorage2D(i.TEXTURE_2D,mt,Mt,$.width,$.height)}et&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,tt,vt,J)}else e.texImage2D(i.TEXTURE_2D,0,Mt,tt,vt,J);p(_)&&f(Y),_t.__version=X.version,_.onUpdate&&_.onUpdate(_)}A.__version=_.version}function nt(A,_,L){if(_.image.length!==6)return;const Y=qt(A,_),Z=_.source;e.bindTexture(i.TEXTURE_CUBE_MAP,A.__webglTexture,i.TEXTURE0+L);const X=n.get(Z);if(Z.version!==X.__version||Y===!0){e.activeTexture(i.TEXTURE0+L);const _t=Yt.getPrimaries(Yt.workingColorSpace),it=_.colorSpace===Kn?null:Yt.getPrimaries(_.colorSpace),Tt=_.colorSpace===Kn||_t===it?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Tt);const Rt=_.isCompressedTexture||_.image[0].isCompressedTexture,J=_.image[0]&&_.image[0].isDataTexture,tt=[];for(let W=0;W<6;W++)!Rt&&!J?tt[W]=x(_.image[W],!0,s.maxCubemapSize):tt[W]=J?_.image[W].image:_.image[W],tt[W]=le(_,tt[W]);const vt=tt[0],Mt=r.convert(_.format,_.colorSpace),ut=r.convert(_.type),Bt=E(_.internalFormat,Mt,ut,_.colorSpace),P=_.isVideoTexture!==!0,st=X.__version===void 0||Y===!0,et=Z.dataReady;let mt=w(_,vt);dt(i.TEXTURE_CUBE_MAP,_);let $;if(Rt){P&&st&&e.texStorage2D(i.TEXTURE_CUBE_MAP,mt,Bt,vt.width,vt.height);for(let W=0;W<6;W++){$=tt[W].mipmaps;for(let xt=0;xt<$.length;xt++){const Lt=$[xt];_.format!==cn?Mt!==null?P?et&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+W,xt,0,0,Lt.width,Lt.height,Mt,Lt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+W,xt,Bt,Lt.width,Lt.height,0,Lt.data):Dt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):P?et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+W,xt,0,0,Lt.width,Lt.height,Mt,ut,Lt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+W,xt,Bt,Lt.width,Lt.height,0,Mt,ut,Lt.data)}}}else{if($=_.mipmaps,P&&st){$.length>0&&mt++;const W=yt(tt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,mt,Bt,W.width,W.height)}for(let W=0;W<6;W++)if(J){P?et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,0,0,tt[W].width,tt[W].height,Mt,ut,tt[W].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,Bt,tt[W].width,tt[W].height,0,Mt,ut,tt[W].data);for(let xt=0;xt<$.length;xt++){const ce=$[xt].image[W].image;P?et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+W,xt+1,0,0,ce.width,ce.height,Mt,ut,ce.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+W,xt+1,Bt,ce.width,ce.height,0,Mt,ut,ce.data)}}else{P?et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,0,0,Mt,ut,tt[W]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,Bt,Mt,ut,tt[W]);for(let xt=0;xt<$.length;xt++){const Lt=$[xt];P?et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+W,xt+1,0,0,Mt,ut,Lt.image[W]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+W,xt+1,Bt,Mt,ut,Lt.image[W])}}}p(_)&&f(i.TEXTURE_CUBE_MAP),X.__version=Z.version,_.onUpdate&&_.onUpdate(_)}A.__version=_.version}function rt(A,_,L,Y,Z,X){const _t=r.convert(L.format,L.colorSpace),it=r.convert(L.type),Tt=E(L.internalFormat,_t,it,L.colorSpace),Rt=n.get(_),J=n.get(L);if(J.__renderTarget=_,!Rt.__hasExternalTextures){const tt=Math.max(1,_.width>>X),vt=Math.max(1,_.height>>X);Z===i.TEXTURE_3D||Z===i.TEXTURE_2D_ARRAY?e.texImage3D(Z,X,Tt,tt,vt,_.depth,0,_t,it,null):e.texImage2D(Z,X,Tt,tt,vt,0,_t,it,null)}e.bindFramebuffer(i.FRAMEBUFFER,A),Me(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Y,Z,J.__webglTexture,0,I(_)):(Z===i.TEXTURE_2D||Z>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Y,Z,J.__webglTexture,X),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Nt(A,_,L){if(i.bindRenderbuffer(i.RENDERBUFFER,A),_.depthBuffer){const Y=_.depthTexture,Z=Y&&Y.isDepthTexture?Y.type:null,X=y(_.stencilBuffer,Z),_t=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Me(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,I(_),X,_.width,_.height):L?i.renderbufferStorageMultisample(i.RENDERBUFFER,I(_),X,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,X,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,_t,i.RENDERBUFFER,A)}else{const Y=_.textures;for(let Z=0;Z<Y.length;Z++){const X=Y[Z],_t=r.convert(X.format,X.colorSpace),it=r.convert(X.type),Tt=E(X.internalFormat,_t,it,X.colorSpace);Me(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,I(_),Tt,_.width,_.height):L?i.renderbufferStorageMultisample(i.RENDERBUFFER,I(_),Tt,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,Tt,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ct(A,_,L){const Y=_.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,A),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Z=n.get(_.depthTexture);if(Z.__renderTarget=_,(!Z.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),Y){if(Z.__webglInit===void 0&&(Z.__webglInit=!0,_.depthTexture.addEventListener("dispose",T)),Z.__webglTexture===void 0){Z.__webglTexture=i.createTexture(),e.bindTexture(i.TEXTURE_CUBE_MAP,Z.__webglTexture),dt(i.TEXTURE_CUBE_MAP,_.depthTexture);const Rt=r.convert(_.depthTexture.format),J=r.convert(_.depthTexture.type);let tt;_.depthTexture.format===qn?tt=i.DEPTH_COMPONENT24:_.depthTexture.format===gi&&(tt=i.DEPTH24_STENCIL8);for(let vt=0;vt<6;vt++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,tt,_.width,_.height,0,Rt,J,null)}}else V(_.depthTexture,0);const X=Z.__webglTexture,_t=I(_),it=Y?i.TEXTURE_CUBE_MAP_POSITIVE_X+L:i.TEXTURE_2D,Tt=_.depthTexture.format===gi?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(_.depthTexture.format===qn)Me(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Tt,it,X,0,_t):i.framebufferTexture2D(i.FRAMEBUFFER,Tt,it,X,0);else if(_.depthTexture.format===gi)Me(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Tt,it,X,0,_t):i.framebufferTexture2D(i.FRAMEBUFFER,Tt,it,X,0);else throw new Error("Unknown depthTexture format")}function Pt(A){const _=n.get(A),L=A.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==A.depthTexture){const Y=A.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),Y){const Z=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,Y.removeEventListener("dispose",Z)};Y.addEventListener("dispose",Z),_.__depthDisposeCallback=Z}_.__boundDepthTexture=Y}if(A.depthTexture&&!_.__autoAllocateDepthBuffer)if(L)for(let Y=0;Y<6;Y++)Ct(_.__webglFramebuffer[Y],A,Y);else{const Y=A.texture.mipmaps;Y&&Y.length>0?Ct(_.__webglFramebuffer[0],A,0):Ct(_.__webglFramebuffer,A,0)}else if(L){_.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(e.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[Y]),_.__webglDepthbuffer[Y]===void 0)_.__webglDepthbuffer[Y]=i.createRenderbuffer(),Nt(_.__webglDepthbuffer[Y],A,!1);else{const Z=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,X=_.__webglDepthbuffer[Y];i.bindRenderbuffer(i.RENDERBUFFER,X),i.framebufferRenderbuffer(i.FRAMEBUFFER,Z,i.RENDERBUFFER,X)}}else{const Y=A.texture.mipmaps;if(Y&&Y.length>0?e.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=i.createRenderbuffer(),Nt(_.__webglDepthbuffer,A,!1);else{const Z=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,X=_.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,X),i.framebufferRenderbuffer(i.FRAMEBUFFER,Z,i.RENDERBUFFER,X)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function we(A,_,L){const Y=n.get(A);_!==void 0&&rt(Y.__webglFramebuffer,A,A.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),L!==void 0&&Pt(A)}function Wt(A){const _=A.texture,L=n.get(A),Y=n.get(_);A.addEventListener("dispose",R);const Z=A.textures,X=A.isWebGLCubeRenderTarget===!0,_t=Z.length>1;if(_t||(Y.__webglTexture===void 0&&(Y.__webglTexture=i.createTexture()),Y.__version=_.version,a.memory.textures++),X){L.__webglFramebuffer=[];for(let it=0;it<6;it++)if(_.mipmaps&&_.mipmaps.length>0){L.__webglFramebuffer[it]=[];for(let Tt=0;Tt<_.mipmaps.length;Tt++)L.__webglFramebuffer[it][Tt]=i.createFramebuffer()}else L.__webglFramebuffer[it]=i.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){L.__webglFramebuffer=[];for(let it=0;it<_.mipmaps.length;it++)L.__webglFramebuffer[it]=i.createFramebuffer()}else L.__webglFramebuffer=i.createFramebuffer();if(_t)for(let it=0,Tt=Z.length;it<Tt;it++){const Rt=n.get(Z[it]);Rt.__webglTexture===void 0&&(Rt.__webglTexture=i.createTexture(),a.memory.textures++)}if(A.samples>0&&Me(A)===!1){L.__webglMultisampledFramebuffer=i.createFramebuffer(),L.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,L.__webglMultisampledFramebuffer);for(let it=0;it<Z.length;it++){const Tt=Z[it];L.__webglColorRenderbuffer[it]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,L.__webglColorRenderbuffer[it]);const Rt=r.convert(Tt.format,Tt.colorSpace),J=r.convert(Tt.type),tt=E(Tt.internalFormat,Rt,J,Tt.colorSpace,A.isXRRenderTarget===!0),vt=I(A);i.renderbufferStorageMultisample(i.RENDERBUFFER,vt,tt,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+it,i.RENDERBUFFER,L.__webglColorRenderbuffer[it])}i.bindRenderbuffer(i.RENDERBUFFER,null),A.depthBuffer&&(L.__webglDepthRenderbuffer=i.createRenderbuffer(),Nt(L.__webglDepthRenderbuffer,A,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(X){e.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture),dt(i.TEXTURE_CUBE_MAP,_);for(let it=0;it<6;it++)if(_.mipmaps&&_.mipmaps.length>0)for(let Tt=0;Tt<_.mipmaps.length;Tt++)rt(L.__webglFramebuffer[it][Tt],A,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+it,Tt);else rt(L.__webglFramebuffer[it],A,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+it,0);p(_)&&f(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(_t){for(let it=0,Tt=Z.length;it<Tt;it++){const Rt=Z[it],J=n.get(Rt);let tt=i.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(tt=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(tt,J.__webglTexture),dt(tt,Rt),rt(L.__webglFramebuffer,A,Rt,i.COLOR_ATTACHMENT0+it,tt,0),p(Rt)&&f(tt)}e.unbindTexture()}else{let it=i.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(it=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(it,Y.__webglTexture),dt(it,_),_.mipmaps&&_.mipmaps.length>0)for(let Tt=0;Tt<_.mipmaps.length;Tt++)rt(L.__webglFramebuffer[Tt],A,_,i.COLOR_ATTACHMENT0,it,Tt);else rt(L.__webglFramebuffer,A,_,i.COLOR_ATTACHMENT0,it,0);p(_)&&f(it),e.unbindTexture()}A.depthBuffer&&Pt(A)}function $t(A){const _=A.textures;for(let L=0,Y=_.length;L<Y;L++){const Z=_[L];if(p(Z)){const X=M(A),_t=n.get(Z).__webglTexture;e.bindTexture(X,_t),f(X),e.unbindTexture()}}}const ie=[],Ot=[];function ge(A){if(A.samples>0){if(Me(A)===!1){const _=A.textures,L=A.width,Y=A.height;let Z=i.COLOR_BUFFER_BIT;const X=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,_t=n.get(A),it=_.length>1;if(it)for(let Rt=0;Rt<_.length;Rt++)e.bindFramebuffer(i.FRAMEBUFFER,_t.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Rt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,_t.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Rt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,_t.__webglMultisampledFramebuffer);const Tt=A.texture.mipmaps;Tt&&Tt.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,_t.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,_t.__webglFramebuffer);for(let Rt=0;Rt<_.length;Rt++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(Z|=i.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(Z|=i.STENCIL_BUFFER_BIT)),it){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,_t.__webglColorRenderbuffer[Rt]);const J=n.get(_[Rt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,J,0)}i.blitFramebuffer(0,0,L,Y,0,0,L,Y,Z,i.NEAREST),c===!0&&(ie.length=0,Ot.length=0,ie.push(i.COLOR_ATTACHMENT0+Rt),A.depthBuffer&&A.resolveDepthBuffer===!1&&(ie.push(X),Ot.push(X),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Ot)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ie))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),it)for(let Rt=0;Rt<_.length;Rt++){e.bindFramebuffer(i.FRAMEBUFFER,_t.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Rt,i.RENDERBUFFER,_t.__webglColorRenderbuffer[Rt]);const J=n.get(_[Rt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,_t.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Rt,i.TEXTURE_2D,J,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,_t.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&c){const _=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function I(A){return Math.min(s.maxSamples,A.samples)}function Me(A){const _=n.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function jt(A){const _=a.render.frame;h.get(A)!==_&&(h.set(A,_),A.update())}function le(A,_){const L=A.colorSpace,Y=A.format,Z=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||L!==Qi&&L!==Kn&&(Yt.getTransfer(L)===te?(Y!==cn||Z!==je)&&Dt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Xt("WebGLTextures: Unsupported texture color space:",L)),_}function yt(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(l.width=A.naturalWidth||A.width,l.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(l.width=A.displayWidth,l.height=A.displayHeight):(l.width=A.width,l.height=A.height),l}this.allocateTextureUnit=F,this.resetTextureUnits=D,this.setTexture2D=V,this.setTexture2DArray=B,this.setTexture3D=k,this.setTextureCube=Q,this.rebindTextures=we,this.setupRenderTarget=Wt,this.updateRenderTargetMipmap=$t,this.updateMultisampleRenderTarget=ge,this.setupDepthRenderbuffer=Pt,this.setupFrameBufferTexture=rt,this.useMultisampledRTT=Me,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function v_(i,t){function e(n,s=Kn){let r;const a=Yt.getTransfer(s);if(n===je)return i.UNSIGNED_BYTE;if(n===Vo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Oo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Th)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===wh)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Eh)return i.BYTE;if(n===Ah)return i.SHORT;if(n===Ms)return i.UNSIGNED_SHORT;if(n===qo)return i.INT;if(n===Sn)return i.UNSIGNED_INT;if(n===ln)return i.FLOAT;if(n===Fn)return i.HALF_FLOAT;if(n===Ch)return i.ALPHA;if(n===Rh)return i.RGB;if(n===cn)return i.RGBA;if(n===qn)return i.DEPTH_COMPONENT;if(n===gi)return i.DEPTH_STENCIL;if(n===Bo)return i.RED;if(n===ko)return i.RED_INTEGER;if(n===$i)return i.RG;if(n===zo)return i.RG_INTEGER;if(n===Go)return i.RGBA_INTEGER;if(n===gr||n===_r||n===vr||n===xr)if(a===te)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===gr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===_r)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===vr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===xr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===gr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===_r)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===vr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===xr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ka||n===Za||n===ja||n===Ja)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Ka)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Za)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ja)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ja)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===$a||n===Qa||n===to||n===eo||n===no||n===io||n===so)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===$a||n===Qa)return a===te?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===to)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===eo)return r.COMPRESSED_R11_EAC;if(n===no)return r.COMPRESSED_SIGNED_R11_EAC;if(n===io)return r.COMPRESSED_RG11_EAC;if(n===so)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===ro||n===ao||n===oo||n===lo||n===co||n===ho||n===uo||n===fo||n===po||n===mo||n===go||n===_o||n===vo||n===xo)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ro)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ao)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===oo)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===lo)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===co)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ho)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===uo)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===fo)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===po)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===mo)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===go)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===_o)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===vo)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===xo)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Mo||n===So||n===yo)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Mo)return a===te?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===So)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===yo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===bo||n===Eo||n===Ao||n===To)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===bo)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Eo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ao)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===To)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ss?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const x_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,M_=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class S_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new Oh(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new bn({vertexShader:x_,fragmentShader:M_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ot(new jn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class y_ extends ns{constructor(t,e){super();const n=this;let s=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,d=null,u=null,m=null,g=null;const x=typeof XRWebGLBinding<"u",p=new S_,f={},M=e.getContextAttributes();let E=null,y=null;const w=[],T=[],R=new Ht;let v=null;const b=new tn;b.viewport=new me;const q=new tn;q.viewport=new me;const C=[b,q],D=new Df;let F=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let nt=w[K];return nt===void 0&&(nt=new ea,w[K]=nt),nt.getTargetRaySpace()},this.getControllerGrip=function(K){let nt=w[K];return nt===void 0&&(nt=new ea,w[K]=nt),nt.getGripSpace()},this.getHand=function(K){let nt=w[K];return nt===void 0&&(nt=new ea,w[K]=nt),nt.getHandSpace()};function V(K){const nt=T.indexOf(K.inputSource);if(nt===-1)return;const rt=w[nt];rt!==void 0&&(rt.update(K.inputSource,K.frame,l||a),rt.dispatchEvent({type:K.type,data:K.inputSource}))}function B(){s.removeEventListener("select",V),s.removeEventListener("selectstart",V),s.removeEventListener("selectend",V),s.removeEventListener("squeeze",V),s.removeEventListener("squeezestart",V),s.removeEventListener("squeezeend",V),s.removeEventListener("end",B),s.removeEventListener("inputsourceschange",k);for(let K=0;K<w.length;K++){const nt=T[K];nt!==null&&(T[K]=null,w[K].disconnect(nt))}F=null,G=null,p.reset();for(const K in f)delete f[K];t.setRenderTarget(E),m=null,u=null,d=null,s=null,y=null,he.stop(),n.isPresenting=!1,t.setPixelRatio(v),t.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){r=K,n.isPresenting===!0&&Dt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){o=K,n.isPresenting===!0&&Dt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(K){l=K},this.getBaseLayer=function(){return u!==null?u:m},this.getBinding=function(){return d===null&&x&&(d=new XRWebGLBinding(s,e)),d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(K){if(s=K,s!==null){if(E=t.getRenderTarget(),s.addEventListener("select",V),s.addEventListener("selectstart",V),s.addEventListener("selectend",V),s.addEventListener("squeeze",V),s.addEventListener("squeezestart",V),s.addEventListener("squeezeend",V),s.addEventListener("end",B),s.addEventListener("inputsourceschange",k),M.xrCompatible!==!0&&await e.makeXRCompatible(),v=t.getPixelRatio(),t.getSize(R),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let rt=null,Nt=null,Ct=null;M.depth&&(Ct=M.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,rt=M.stencil?gi:qn,Nt=M.stencil?Ss:Sn);const Pt={colorFormat:e.RGBA8,depthFormat:Ct,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(Pt),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),y=new Mn(u.textureWidth,u.textureHeight,{format:cn,type:je,depthTexture:new Es(u.textureWidth,u.textureHeight,Nt,void 0,void 0,void 0,void 0,void 0,void 0,rt),stencilBuffer:M.stencil,colorSpace:t.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const rt={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,e,rt),s.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),y=new Mn(m.framebufferWidth,m.framebufferHeight,{format:cn,type:je,colorSpace:t.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),he.setContext(s),he.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function k(K){for(let nt=0;nt<K.removed.length;nt++){const rt=K.removed[nt],Nt=T.indexOf(rt);Nt>=0&&(T[Nt]=null,w[Nt].disconnect(rt))}for(let nt=0;nt<K.added.length;nt++){const rt=K.added[nt];let Nt=T.indexOf(rt);if(Nt===-1){for(let Pt=0;Pt<w.length;Pt++)if(Pt>=T.length){T.push(rt),Nt=Pt;break}else if(T[Pt]===null){T[Pt]=rt,Nt=Pt;break}if(Nt===-1)break}const Ct=w[Nt];Ct&&Ct.connect(rt)}}const Q=new N,j=new N;function ht(K,nt,rt){Q.setFromMatrixPosition(nt.matrixWorld),j.setFromMatrixPosition(rt.matrixWorld);const Nt=Q.distanceTo(j),Ct=nt.projectionMatrix.elements,Pt=rt.projectionMatrix.elements,we=Ct[14]/(Ct[10]-1),Wt=Ct[14]/(Ct[10]+1),$t=(Ct[9]+1)/Ct[5],ie=(Ct[9]-1)/Ct[5],Ot=(Ct[8]-1)/Ct[0],ge=(Pt[8]+1)/Pt[0],I=we*Ot,Me=we*ge,jt=Nt/(-Ot+ge),le=jt*-Ot;if(nt.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(le),K.translateZ(jt),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),Ct[10]===-1)K.projectionMatrix.copy(nt.projectionMatrix),K.projectionMatrixInverse.copy(nt.projectionMatrixInverse);else{const yt=we+jt,A=Wt+jt,_=I-le,L=Me+(Nt-le),Y=$t*Wt/A*yt,Z=ie*Wt/A*yt;K.projectionMatrix.makePerspective(_,L,Y,Z,yt,A),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function gt(K,nt){nt===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(nt.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(s===null)return;let nt=K.near,rt=K.far;p.texture!==null&&(p.depthNear>0&&(nt=p.depthNear),p.depthFar>0&&(rt=p.depthFar)),D.near=q.near=b.near=nt,D.far=q.far=b.far=rt,(F!==D.near||G!==D.far)&&(s.updateRenderState({depthNear:D.near,depthFar:D.far}),F=D.near,G=D.far),D.layers.mask=K.layers.mask|6,b.layers.mask=D.layers.mask&-5,q.layers.mask=D.layers.mask&-3;const Nt=K.parent,Ct=D.cameras;gt(D,Nt);for(let Pt=0;Pt<Ct.length;Pt++)gt(Ct[Pt],Nt);Ct.length===2?ht(D,b,q):D.projectionMatrix.copy(b.projectionMatrix),dt(K,D,Nt)};function dt(K,nt,rt){rt===null?K.matrix.copy(nt.matrixWorld):(K.matrix.copy(rt.matrixWorld),K.matrix.invert(),K.matrix.multiply(nt.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(nt.projectionMatrix),K.projectionMatrixInverse.copy(nt.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=wo*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return D},this.getFoveation=function(){if(!(u===null&&m===null))return c},this.setFoveation=function(K){c=K,u!==null&&(u.fixedFoveation=K),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=K)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(D)},this.getCameraTexture=function(K){return f[K]};let qt=null;function ue(K,nt){if(h=nt.getViewerPose(l||a),g=nt,h!==null){const rt=h.views;m!==null&&(t.setRenderTargetFramebuffer(y,m.framebuffer),t.setRenderTarget(y));let Nt=!1;rt.length!==D.cameras.length&&(D.cameras.length=0,Nt=!0);for(let Wt=0;Wt<rt.length;Wt++){const $t=rt[Wt];let ie=null;if(m!==null)ie=m.getViewport($t);else{const ge=d.getViewSubImage(u,$t);ie=ge.viewport,Wt===0&&(t.setRenderTargetTextures(y,ge.colorTexture,ge.depthStencilTexture),t.setRenderTarget(y))}let Ot=C[Wt];Ot===void 0&&(Ot=new tn,Ot.layers.enable(Wt),Ot.viewport=new me,C[Wt]=Ot),Ot.matrix.fromArray($t.transform.matrix),Ot.matrix.decompose(Ot.position,Ot.quaternion,Ot.scale),Ot.projectionMatrix.fromArray($t.projectionMatrix),Ot.projectionMatrixInverse.copy(Ot.projectionMatrix).invert(),Ot.viewport.set(ie.x,ie.y,ie.width,ie.height),Wt===0&&(D.matrix.copy(Ot.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),Nt===!0&&D.cameras.push(Ot)}const Ct=s.enabledFeatures;if(Ct&&Ct.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){d=n.getBinding();const Wt=d.getDepthInformation(rt[0]);Wt&&Wt.isValid&&Wt.texture&&p.init(Wt,s.renderState)}if(Ct&&Ct.includes("camera-access")&&x){t.state.unbindTexture(),d=n.getBinding();for(let Wt=0;Wt<rt.length;Wt++){const $t=rt[Wt].camera;if($t){let ie=f[$t];ie||(ie=new Oh,f[$t]=ie);const Ot=d.getCameraImage($t);ie.sourceTexture=Ot}}}}for(let rt=0;rt<w.length;rt++){const Nt=T[rt],Ct=w[rt];Nt!==null&&Ct!==void 0&&Ct.update(Nt,nt,l||a)}qt&&qt(K,nt),nt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:nt}),g=null}const he=new zh;he.setAnimationLoop(ue),this.setAnimationLoop=function(K){qt=K},this.dispose=function(){}}}const oi=new yn,b_=new oe;function E_(i,t){function e(p,f){p.matrixAutoUpdate===!0&&p.updateMatrix(),f.value.copy(p.matrix)}function n(p,f){f.color.getRGB(p.fogColor.value,Bh(i)),f.isFog?(p.fogNear.value=f.near,p.fogFar.value=f.far):f.isFogExp2&&(p.fogDensity.value=f.density)}function s(p,f,M,E,y){f.isMeshBasicMaterial?r(p,f):f.isMeshLambertMaterial?(r(p,f),f.envMap&&(p.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(r(p,f),d(p,f)):f.isMeshPhongMaterial?(r(p,f),h(p,f),f.envMap&&(p.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(r(p,f),u(p,f),f.isMeshPhysicalMaterial&&m(p,f,y)):f.isMeshMatcapMaterial?(r(p,f),g(p,f)):f.isMeshDepthMaterial?r(p,f):f.isMeshDistanceMaterial?(r(p,f),x(p,f)):f.isMeshNormalMaterial?r(p,f):f.isLineBasicMaterial?(a(p,f),f.isLineDashedMaterial&&o(p,f)):f.isPointsMaterial?c(p,f,M,E):f.isSpriteMaterial?l(p,f):f.isShadowMaterial?(p.color.value.copy(f.color),p.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(p,f){p.opacity.value=f.opacity,f.color&&p.diffuse.value.copy(f.color),f.emissive&&p.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(p.map.value=f.map,e(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,e(f.alphaMap,p.alphaMapTransform)),f.bumpMap&&(p.bumpMap.value=f.bumpMap,e(f.bumpMap,p.bumpMapTransform),p.bumpScale.value=f.bumpScale,f.side===We&&(p.bumpScale.value*=-1)),f.normalMap&&(p.normalMap.value=f.normalMap,e(f.normalMap,p.normalMapTransform),p.normalScale.value.copy(f.normalScale),f.side===We&&p.normalScale.value.negate()),f.displacementMap&&(p.displacementMap.value=f.displacementMap,e(f.displacementMap,p.displacementMapTransform),p.displacementScale.value=f.displacementScale,p.displacementBias.value=f.displacementBias),f.emissiveMap&&(p.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,p.emissiveMapTransform)),f.specularMap&&(p.specularMap.value=f.specularMap,e(f.specularMap,p.specularMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest);const M=t.get(f),E=M.envMap,y=M.envMapRotation;E&&(p.envMap.value=E,oi.copy(y),oi.x*=-1,oi.y*=-1,oi.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(oi.y*=-1,oi.z*=-1),p.envMapRotation.value.setFromMatrix4(b_.makeRotationFromEuler(oi)),p.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=f.reflectivity,p.ior.value=f.ior,p.refractionRatio.value=f.refractionRatio),f.lightMap&&(p.lightMap.value=f.lightMap,p.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,p.lightMapTransform)),f.aoMap&&(p.aoMap.value=f.aoMap,p.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,p.aoMapTransform))}function a(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,f.map&&(p.map.value=f.map,e(f.map,p.mapTransform))}function o(p,f){p.dashSize.value=f.dashSize,p.totalSize.value=f.dashSize+f.gapSize,p.scale.value=f.scale}function c(p,f,M,E){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.size.value=f.size*M,p.scale.value=E*.5,f.map&&(p.map.value=f.map,e(f.map,p.uvTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,e(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function l(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.rotation.value=f.rotation,f.map&&(p.map.value=f.map,e(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,e(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function h(p,f){p.specular.value.copy(f.specular),p.shininess.value=Math.max(f.shininess,1e-4)}function d(p,f){f.gradientMap&&(p.gradientMap.value=f.gradientMap)}function u(p,f){p.metalness.value=f.metalness,f.metalnessMap&&(p.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,p.metalnessMapTransform)),p.roughness.value=f.roughness,f.roughnessMap&&(p.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,p.roughnessMapTransform)),f.envMap&&(p.envMapIntensity.value=f.envMapIntensity)}function m(p,f,M){p.ior.value=f.ior,f.sheen>0&&(p.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),p.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(p.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,p.sheenColorMapTransform)),f.sheenRoughnessMap&&(p.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,p.sheenRoughnessMapTransform))),f.clearcoat>0&&(p.clearcoat.value=f.clearcoat,p.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(p.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,p.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(p.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===We&&p.clearcoatNormalScale.value.negate())),f.dispersion>0&&(p.dispersion.value=f.dispersion),f.iridescence>0&&(p.iridescence.value=f.iridescence,p.iridescenceIOR.value=f.iridescenceIOR,p.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(p.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,p.iridescenceMapTransform)),f.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),f.transmission>0&&(p.transmission.value=f.transmission,p.transmissionSamplerMap.value=M.texture,p.transmissionSamplerSize.value.set(M.width,M.height),f.transmissionMap&&(p.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,p.transmissionMapTransform)),p.thickness.value=f.thickness,f.thicknessMap&&(p.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=f.attenuationDistance,p.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(p.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(p.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=f.specularIntensity,p.specularColor.value.copy(f.specularColor),f.specularColorMap&&(p.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,p.specularColorMapTransform)),f.specularIntensityMap&&(p.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,f){f.matcap&&(p.matcap.value=f.matcap)}function x(p,f){const M=t.get(f).light;p.referencePosition.value.setFromMatrixPosition(M.matrixWorld),p.nearDistance.value=M.shadow.camera.near,p.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function A_(i,t,e,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(M,E){const y=E.program;n.uniformBlockBinding(M,y)}function l(M,E){let y=s[M.id];y===void 0&&(g(M),y=h(M),s[M.id]=y,M.addEventListener("dispose",p));const w=E.program;n.updateUBOMapping(M,w);const T=t.render.frame;r[M.id]!==T&&(u(M),r[M.id]=T)}function h(M){const E=d();M.__bindingPointIndex=E;const y=i.createBuffer(),w=M.__size,T=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,y),i.bufferData(i.UNIFORM_BUFFER,w,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,E,y),y}function d(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return Xt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(M){const E=s[M.id],y=M.uniforms,w=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let T=0,R=y.length;T<R;T++){const v=Array.isArray(y[T])?y[T]:[y[T]];for(let b=0,q=v.length;b<q;b++){const C=v[b];if(m(C,T,b,w)===!0){const D=C.__offset,F=Array.isArray(C.value)?C.value:[C.value];let G=0;for(let V=0;V<F.length;V++){const B=F[V],k=x(B);typeof B=="number"||typeof B=="boolean"?(C.__data[0]=B,i.bufferSubData(i.UNIFORM_BUFFER,D+G,C.__data)):B.isMatrix3?(C.__data[0]=B.elements[0],C.__data[1]=B.elements[1],C.__data[2]=B.elements[2],C.__data[3]=0,C.__data[4]=B.elements[3],C.__data[5]=B.elements[4],C.__data[6]=B.elements[5],C.__data[7]=0,C.__data[8]=B.elements[6],C.__data[9]=B.elements[7],C.__data[10]=B.elements[8],C.__data[11]=0):(B.toArray(C.__data,G),G+=k.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,D,C.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function m(M,E,y,w){const T=M.value,R=E+"_"+y;if(w[R]===void 0)return typeof T=="number"||typeof T=="boolean"?w[R]=T:w[R]=T.clone(),!0;{const v=w[R];if(typeof T=="number"||typeof T=="boolean"){if(v!==T)return w[R]=T,!0}else if(v.equals(T)===!1)return v.copy(T),!0}return!1}function g(M){const E=M.uniforms;let y=0;const w=16;for(let R=0,v=E.length;R<v;R++){const b=Array.isArray(E[R])?E[R]:[E[R]];for(let q=0,C=b.length;q<C;q++){const D=b[q],F=Array.isArray(D.value)?D.value:[D.value];for(let G=0,V=F.length;G<V;G++){const B=F[G],k=x(B),Q=y%w,j=Q%k.boundary,ht=Q+j;y+=j,ht!==0&&w-ht<k.storage&&(y+=w-ht),D.__data=new Float32Array(k.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=y,y+=k.storage}}}const T=y%w;return T>0&&(y+=w-T),M.__size=y,M.__cache={},this}function x(M){const E={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(E.boundary=4,E.storage=4):M.isVector2?(E.boundary=8,E.storage=8):M.isVector3||M.isColor?(E.boundary=16,E.storage=12):M.isVector4?(E.boundary=16,E.storage=16):M.isMatrix3?(E.boundary=48,E.storage=48):M.isMatrix4?(E.boundary=64,E.storage=64):M.isTexture?Dt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Dt("WebGLRenderer: Unsupported uniform value type.",M),E}function p(M){const E=M.target;E.removeEventListener("dispose",p);const y=a.indexOf(E.__bindingPointIndex);a.splice(y,1),i.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function f(){for(const M in s)i.deleteBuffer(s[M]);a=[],s={},r={}}return{bind:c,update:l,dispose:f}}const T_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let fn=null;function w_(){return fn===null&&(fn=new qh(T_,16,16,$i,Fn),fn.name="DFG_LUT",fn.minFilter=Ve,fn.magFilter=Ve,fn.wrapS=Dn,fn.wrapT=Dn,fn.generateMipmaps=!1,fn.needsUpdate=!0),fn}class C_{constructor(t={}){const{canvas:e=kd(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:m=je}=t;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;const x=m,p=new Set([Go,zo,ko]),f=new Set([je,Sn,Ms,Ss,Vo,Oo]),M=new Uint32Array(4),E=new Int32Array(4);let y=null,w=null;const T=[],R=[];let v=null;this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=xn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const b=this;let q=!1;this._outputColorSpace=$e;let C=0,D=0,F=null,G=-1,V=null;const B=new me,k=new me;let Q=null;const j=new Kt(0);let ht=0,gt=e.width,dt=e.height,qt=1,ue=null,he=null;const K=new me(0,0,gt,dt),nt=new me(0,0,gt,dt);let rt=!1;const Nt=new Ko;let Ct=!1,Pt=!1;const we=new oe,Wt=new N,$t=new me,ie={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ot=!1;function ge(){return F===null?qt:1}let I=n;function Me(S,U){return e.getContext(S,U)}try{const S={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${No}`),e.addEventListener("webglcontextlost",xt,!1),e.addEventListener("webglcontextrestored",Lt,!1),e.addEventListener("webglcontextcreationerror",ce,!1),I===null){const U="webgl2";if(I=Me(U,S),I===null)throw Me(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw Xt("WebGLRenderer: "+S.message),S}let jt,le,yt,A,_,L,Y,Z,X,_t,it,Tt,Rt,J,tt,vt,Mt,ut,Bt,P,st,et,mt;function $(){jt=new Cg(I),jt.init(),st=new v_(I,jt),le=new Mg(I,jt,t,st),yt=new g_(I,jt),le.reversedDepthBuffer&&u&&yt.buffers.depth.setReversed(!0),A=new Pg(I),_=new n_,L=new __(I,jt,yt,_,le,st,A),Y=new wg(b),Z=new Ff(I),et=new vg(I,Z),X=new Rg(I,Z,A,et),_t=new Dg(I,X,Z,et,A),ut=new Lg(I,le,L),tt=new Sg(_),it=new e_(b,Y,jt,le,et,tt),Tt=new E_(b,_),Rt=new s_,J=new h_(jt),Mt=new _g(b,Y,yt,_t,g,c),vt=new m_(b,_t,le),mt=new A_(I,A,le,yt),Bt=new xg(I,jt,A),P=new Ig(I,jt,A),A.programs=it.programs,b.capabilities=le,b.extensions=jt,b.properties=_,b.renderLists=Rt,b.shadowMap=vt,b.state=yt,b.info=A}$(),x!==je&&(v=new Ng(x,e.width,e.height,s,r));const W=new y_(b,I);this.xr=W,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const S=jt.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=jt.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return qt},this.setPixelRatio=function(S){S!==void 0&&(qt=S,this.setSize(gt,dt,!1))},this.getSize=function(S){return S.set(gt,dt)},this.setSize=function(S,U,H=!0){if(W.isPresenting){Dt("WebGLRenderer: Can't change size while VR device is presenting.");return}gt=S,dt=U,e.width=Math.floor(S*qt),e.height=Math.floor(U*qt),H===!0&&(e.style.width=S+"px",e.style.height=U+"px"),v!==null&&v.setSize(e.width,e.height),this.setViewport(0,0,S,U)},this.getDrawingBufferSize=function(S){return S.set(gt*qt,dt*qt).floor()},this.setDrawingBufferSize=function(S,U,H){gt=S,dt=U,qt=H,e.width=Math.floor(S*H),e.height=Math.floor(U*H),this.setViewport(0,0,S,U)},this.setEffects=function(S){if(x===je){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(S){for(let U=0;U<S.length;U++)if(S[U].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}v.setEffects(S||[])},this.getCurrentViewport=function(S){return S.copy(B)},this.getViewport=function(S){return S.copy(K)},this.setViewport=function(S,U,H,z){S.isVector4?K.set(S.x,S.y,S.z,S.w):K.set(S,U,H,z),yt.viewport(B.copy(K).multiplyScalar(qt).round())},this.getScissor=function(S){return S.copy(nt)},this.setScissor=function(S,U,H,z){S.isVector4?nt.set(S.x,S.y,S.z,S.w):nt.set(S,U,H,z),yt.scissor(k.copy(nt).multiplyScalar(qt).round())},this.getScissorTest=function(){return rt},this.setScissorTest=function(S){yt.setScissorTest(rt=S)},this.setOpaqueSort=function(S){ue=S},this.setTransparentSort=function(S){he=S},this.getClearColor=function(S){return S.copy(Mt.getClearColor())},this.setClearColor=function(){Mt.setClearColor(...arguments)},this.getClearAlpha=function(){return Mt.getClearAlpha()},this.setClearAlpha=function(){Mt.setClearAlpha(...arguments)},this.clear=function(S=!0,U=!0,H=!0){let z=0;if(S){let O=!1;if(F!==null){const lt=F.texture.format;O=p.has(lt)}if(O){const lt=F.texture.type,pt=f.has(lt),ct=Mt.getClearColor(),St=Mt.getClearAlpha(),Et=ct.r,Ut=ct.g,kt=ct.b;pt?(M[0]=Et,M[1]=Ut,M[2]=kt,M[3]=St,I.clearBufferuiv(I.COLOR,0,M)):(E[0]=Et,E[1]=Ut,E[2]=kt,E[3]=St,I.clearBufferiv(I.COLOR,0,E))}else z|=I.COLOR_BUFFER_BIT}U&&(z|=I.DEPTH_BUFFER_BIT),H&&(z|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z!==0&&I.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",xt,!1),e.removeEventListener("webglcontextrestored",Lt,!1),e.removeEventListener("webglcontextcreationerror",ce,!1),Mt.dispose(),Rt.dispose(),J.dispose(),_.dispose(),Y.dispose(),_t.dispose(),et.dispose(),mt.dispose(),it.dispose(),W.dispose(),W.removeEventListener("sessionstart",il),W.removeEventListener("sessionend",sl),ti.stop()};function xt(S){S.preventDefault(),Vl("WebGLRenderer: Context Lost."),q=!0}function Lt(){Vl("WebGLRenderer: Context Restored."),q=!1;const S=A.autoReset,U=vt.enabled,H=vt.autoUpdate,z=vt.needsUpdate,O=vt.type;$(),A.autoReset=S,vt.enabled=U,vt.autoUpdate=H,vt.needsUpdate=z,vt.type=O}function ce(S){Xt("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function Qt(S){const U=S.target;U.removeEventListener("dispose",Qt),En(U)}function En(S){An(S),_.remove(S)}function An(S){const U=_.get(S).programs;U!==void 0&&(U.forEach(function(H){it.releaseProgram(H)}),S.isShaderMaterial&&it.releaseShaderCache(S))}this.renderBufferDirect=function(S,U,H,z,O,lt){U===null&&(U=ie);const pt=O.isMesh&&O.matrixWorld.determinant()<0,ct=pu(S,U,H,z,O);yt.setMaterial(z,pt);let St=H.index,Et=1;if(z.wireframe===!0){if(St=X.getWireframeAttribute(H),St===void 0)return;Et=2}const Ut=H.drawRange,kt=H.attributes.position;let At=Ut.start*Et,ee=(Ut.start+Ut.count)*Et;lt!==null&&(At=Math.max(At,lt.start*Et),ee=Math.min(ee,(lt.start+lt.count)*Et)),St!==null?(At=Math.max(At,0),ee=Math.min(ee,St.count)):kt!=null&&(At=Math.max(At,0),ee=Math.min(ee,kt.count));const _e=ee-At;if(_e<0||_e===1/0)return;et.setup(O,z,ct,H,St);let pe,ne=Bt;if(St!==null&&(pe=Z.get(St),ne=P,ne.setIndex(pe)),O.isMesh)z.wireframe===!0?(yt.setLineWidth(z.wireframeLinewidth*ge()),ne.setMode(I.LINES)):ne.setMode(I.TRIANGLES);else if(O.isLine){let Ue=z.linewidth;Ue===void 0&&(Ue=1),yt.setLineWidth(Ue*ge()),O.isLineSegments?ne.setMode(I.LINES):O.isLineLoop?ne.setMode(I.LINE_LOOP):ne.setMode(I.LINE_STRIP)}else O.isPoints?ne.setMode(I.POINTS):O.isSprite&&ne.setMode(I.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)Cr("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ne.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if(jt.get("WEBGL_multi_draw"))ne.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{const Ue=O._multiDrawStarts,bt=O._multiDrawCounts,Xe=O._multiDrawCount,Zt=St?Z.get(St).bytesPerElement:1,nn=_.get(z).currentProgram.getUniforms();for(let un=0;un<Xe;un++)nn.setValue(I,"_gl_DrawID",un),ne.render(Ue[un]/Zt,bt[un])}else if(O.isInstancedMesh)ne.renderInstances(At,_e,O.count);else if(H.isInstancedBufferGeometry){const Ue=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,bt=Math.min(H.instanceCount,Ue);ne.renderInstances(At,_e,bt)}else ne.render(At,_e)};function nl(S,U,H){S.transparent===!0&&S.side===qe&&S.forceSinglePass===!1?(S.side=We,S.needsUpdate=!0,Ps(S,U,H),S.side=$n,S.needsUpdate=!0,Ps(S,U,H),S.side=qe):Ps(S,U,H)}this.compile=function(S,U,H=null){H===null&&(H=S),w=J.get(H),w.init(U),R.push(w),H.traverseVisible(function(O){O.isLight&&O.layers.test(U.layers)&&(w.pushLight(O),O.castShadow&&w.pushShadow(O))}),S!==H&&S.traverseVisible(function(O){O.isLight&&O.layers.test(U.layers)&&(w.pushLight(O),O.castShadow&&w.pushShadow(O))}),w.setupLights();const z=new Set;return S.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;const lt=O.material;if(lt)if(Array.isArray(lt))for(let pt=0;pt<lt.length;pt++){const ct=lt[pt];nl(ct,H,O),z.add(ct)}else nl(lt,H,O),z.add(lt)}),w=R.pop(),z},this.compileAsync=function(S,U,H=null){const z=this.compile(S,U,H);return new Promise(O=>{function lt(){if(z.forEach(function(pt){_.get(pt).currentProgram.isReady()&&z.delete(pt)}),z.size===0){O(S);return}setTimeout(lt,10)}jt.get("KHR_parallel_shader_compile")!==null?lt():setTimeout(lt,10)})};let Vr=null;function fu(S){Vr&&Vr(S)}function il(){ti.stop()}function sl(){ti.start()}const ti=new zh;ti.setAnimationLoop(fu),typeof self<"u"&&ti.setContext(self),this.setAnimationLoop=function(S){Vr=S,W.setAnimationLoop(S),S===null?ti.stop():ti.start()},W.addEventListener("sessionstart",il),W.addEventListener("sessionend",sl),this.render=function(S,U){if(U!==void 0&&U.isCamera!==!0){Xt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(q===!0)return;const H=W.enabled===!0&&W.isPresenting===!0,z=v!==null&&(F===null||H)&&v.begin(b,F);if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),W.enabled===!0&&W.isPresenting===!0&&(v===null||v.isCompositing()===!1)&&(W.cameraAutoUpdate===!0&&W.updateCamera(U),U=W.getCamera()),S.isScene===!0&&S.onBeforeRender(b,S,U,F),w=J.get(S,R.length),w.init(U),R.push(w),we.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),Nt.setFromProjectionMatrix(we,_n,U.reversedDepth),Pt=this.localClippingEnabled,Ct=tt.init(this.clippingPlanes,Pt),y=Rt.get(S,T.length),y.init(),T.push(y),W.enabled===!0&&W.isPresenting===!0){const pt=b.xr.getDepthSensingMesh();pt!==null&&Or(pt,U,-1/0,b.sortObjects)}Or(S,U,0,b.sortObjects),y.finish(),b.sortObjects===!0&&y.sort(ue,he),Ot=W.enabled===!1||W.isPresenting===!1||W.hasDepthSensing()===!1,Ot&&Mt.addToRenderList(y,S),this.info.render.frame++,Ct===!0&&tt.beginShadows();const O=w.state.shadowsArray;if(vt.render(O,S,U),Ct===!0&&tt.endShadows(),this.info.autoReset===!0&&this.info.reset(),(z&&v.hasRenderPass())===!1){const pt=y.opaque,ct=y.transmissive;if(w.setupLights(),U.isArrayCamera){const St=U.cameras;if(ct.length>0)for(let Et=0,Ut=St.length;Et<Ut;Et++){const kt=St[Et];al(pt,ct,S,kt)}Ot&&Mt.render(S);for(let Et=0,Ut=St.length;Et<Ut;Et++){const kt=St[Et];rl(y,S,kt,kt.viewport)}}else ct.length>0&&al(pt,ct,S,U),Ot&&Mt.render(S),rl(y,S,U)}F!==null&&D===0&&(L.updateMultisampleRenderTarget(F),L.updateRenderTargetMipmap(F)),z&&v.end(b),S.isScene===!0&&S.onAfterRender(b,S,U),et.resetDefaultState(),G=-1,V=null,R.pop(),R.length>0?(w=R[R.length-1],Ct===!0&&tt.setGlobalState(b.clippingPlanes,w.state.camera)):w=null,T.pop(),T.length>0?y=T[T.length-1]:y=null};function Or(S,U,H,z){if(S.visible===!1)return;if(S.layers.test(U.layers)){if(S.isGroup)H=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(U);else if(S.isLight)w.pushLight(S),S.castShadow&&w.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||Nt.intersectsSprite(S)){z&&$t.setFromMatrixPosition(S.matrixWorld).applyMatrix4(we);const pt=_t.update(S),ct=S.material;ct.visible&&y.push(S,pt,ct,H,$t.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||Nt.intersectsObject(S))){const pt=_t.update(S),ct=S.material;if(z&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),$t.copy(S.boundingSphere.center)):(pt.boundingSphere===null&&pt.computeBoundingSphere(),$t.copy(pt.boundingSphere.center)),$t.applyMatrix4(S.matrixWorld).applyMatrix4(we)),Array.isArray(ct)){const St=pt.groups;for(let Et=0,Ut=St.length;Et<Ut;Et++){const kt=St[Et],At=ct[kt.materialIndex];At&&At.visible&&y.push(S,pt,At,H,$t.z,kt)}}else ct.visible&&y.push(S,pt,ct,H,$t.z,null)}}const lt=S.children;for(let pt=0,ct=lt.length;pt<ct;pt++)Or(lt[pt],U,H,z)}function rl(S,U,H,z){const{opaque:O,transmissive:lt,transparent:pt}=S;w.setupLightsView(H),Ct===!0&&tt.setGlobalState(b.clippingPlanes,H),z&&yt.viewport(B.copy(z)),O.length>0&&Is(O,U,H),lt.length>0&&Is(lt,U,H),pt.length>0&&Is(pt,U,H),yt.buffers.depth.setTest(!0),yt.buffers.depth.setMask(!0),yt.buffers.color.setMask(!0),yt.setPolygonOffset(!1)}function al(S,U,H,z){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[z.id]===void 0){const At=jt.has("EXT_color_buffer_half_float")||jt.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[z.id]=new Mn(1,1,{generateMipmaps:!0,type:At?Fn:je,minFilter:mi,samples:Math.max(4,le.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Yt.workingColorSpace})}const lt=w.state.transmissionRenderTarget[z.id],pt=z.viewport||B;lt.setSize(pt.z*b.transmissionResolutionScale,pt.w*b.transmissionResolutionScale);const ct=b.getRenderTarget(),St=b.getActiveCubeFace(),Et=b.getActiveMipmapLevel();b.setRenderTarget(lt),b.getClearColor(j),ht=b.getClearAlpha(),ht<1&&b.setClearColor(16777215,.5),b.clear(),Ot&&Mt.render(H);const Ut=b.toneMapping;b.toneMapping=xn;const kt=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),w.setupLightsView(z),Ct===!0&&tt.setGlobalState(b.clippingPlanes,z),Is(S,H,z),L.updateMultisampleRenderTarget(lt),L.updateRenderTargetMipmap(lt),jt.has("WEBGL_multisampled_render_to_texture")===!1){let At=!1;for(let ee=0,_e=U.length;ee<_e;ee++){const pe=U[ee],{object:ne,geometry:Ue,material:bt,group:Xe}=pe;if(bt.side===qe&&ne.layers.test(z.layers)){const Zt=bt.side;bt.side=We,bt.needsUpdate=!0,ol(ne,H,z,Ue,bt,Xe),bt.side=Zt,bt.needsUpdate=!0,At=!0}}At===!0&&(L.updateMultisampleRenderTarget(lt),L.updateRenderTargetMipmap(lt))}b.setRenderTarget(ct,St,Et),b.setClearColor(j,ht),kt!==void 0&&(z.viewport=kt),b.toneMapping=Ut}function Is(S,U,H){const z=U.isScene===!0?U.overrideMaterial:null;for(let O=0,lt=S.length;O<lt;O++){const pt=S[O],{object:ct,geometry:St,group:Et}=pt;let Ut=pt.material;Ut.allowOverride===!0&&z!==null&&(Ut=z),ct.layers.test(H.layers)&&ol(ct,U,H,St,Ut,Et)}}function ol(S,U,H,z,O,lt){S.onBeforeRender(b,U,H,z,O,lt),S.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),O.onBeforeRender(b,U,H,z,S,lt),O.transparent===!0&&O.side===qe&&O.forceSinglePass===!1?(O.side=We,O.needsUpdate=!0,b.renderBufferDirect(H,U,z,O,S,lt),O.side=$n,O.needsUpdate=!0,b.renderBufferDirect(H,U,z,O,S,lt),O.side=qe):b.renderBufferDirect(H,U,z,O,S,lt),S.onAfterRender(b,U,H,z,O,lt)}function Ps(S,U,H){U.isScene!==!0&&(U=ie);const z=_.get(S),O=w.state.lights,lt=w.state.shadowsArray,pt=O.state.version,ct=it.getParameters(S,O.state,lt,U,H),St=it.getProgramCacheKey(ct);let Et=z.programs;z.environment=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?U.environment:null,z.fog=U.fog;const Ut=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap;z.envMap=Y.get(S.envMap||z.environment,Ut),z.envMapRotation=z.environment!==null&&S.envMap===null?U.environmentRotation:S.envMapRotation,Et===void 0&&(S.addEventListener("dispose",Qt),Et=new Map,z.programs=Et);let kt=Et.get(St);if(kt!==void 0){if(z.currentProgram===kt&&z.lightsStateVersion===pt)return cl(S,ct),kt}else ct.uniforms=it.getUniforms(S),S.onBeforeCompile(ct,b),kt=it.acquireProgram(ct,St),Et.set(St,kt),z.uniforms=ct.uniforms;const At=z.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(At.clippingPlanes=tt.uniform),cl(S,ct),z.needsLights=gu(S),z.lightsStateVersion=pt,z.needsLights&&(At.ambientLightColor.value=O.state.ambient,At.lightProbe.value=O.state.probe,At.directionalLights.value=O.state.directional,At.directionalLightShadows.value=O.state.directionalShadow,At.spotLights.value=O.state.spot,At.spotLightShadows.value=O.state.spotShadow,At.rectAreaLights.value=O.state.rectArea,At.ltc_1.value=O.state.rectAreaLTC1,At.ltc_2.value=O.state.rectAreaLTC2,At.pointLights.value=O.state.point,At.pointLightShadows.value=O.state.pointShadow,At.hemisphereLights.value=O.state.hemi,At.directionalShadowMatrix.value=O.state.directionalShadowMatrix,At.spotLightMatrix.value=O.state.spotLightMatrix,At.spotLightMap.value=O.state.spotLightMap,At.pointShadowMatrix.value=O.state.pointShadowMatrix),z.currentProgram=kt,z.uniformsList=null,kt}function ll(S){if(S.uniformsList===null){const U=S.currentProgram.getUniforms();S.uniformsList=Mr.seqWithValue(U.seq,S.uniforms)}return S.uniformsList}function cl(S,U){const H=_.get(S);H.outputColorSpace=U.outputColorSpace,H.batching=U.batching,H.batchingColor=U.batchingColor,H.instancing=U.instancing,H.instancingColor=U.instancingColor,H.instancingMorph=U.instancingMorph,H.skinning=U.skinning,H.morphTargets=U.morphTargets,H.morphNormals=U.morphNormals,H.morphColors=U.morphColors,H.morphTargetsCount=U.morphTargetsCount,H.numClippingPlanes=U.numClippingPlanes,H.numIntersection=U.numClipIntersection,H.vertexAlphas=U.vertexAlphas,H.vertexTangents=U.vertexTangents,H.toneMapping=U.toneMapping}function pu(S,U,H,z,O){U.isScene!==!0&&(U=ie),L.resetTextureUnits();const lt=U.fog,pt=z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial?U.environment:null,ct=F===null?b.outputColorSpace:F.isXRRenderTarget===!0?F.texture.colorSpace:Qi,St=z.isMeshStandardMaterial||z.isMeshLambertMaterial&&!z.envMap||z.isMeshPhongMaterial&&!z.envMap,Et=Y.get(z.envMap||pt,St),Ut=z.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,kt=!!H.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),At=!!H.morphAttributes.position,ee=!!H.morphAttributes.normal,_e=!!H.morphAttributes.color;let pe=xn;z.toneMapped&&(F===null||F.isXRRenderTarget===!0)&&(pe=b.toneMapping);const ne=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,Ue=ne!==void 0?ne.length:0,bt=_.get(z),Xe=w.state.lights;if(Ct===!0&&(Pt===!0||S!==V)){const Ce=S===V&&z.id===G;tt.setState(z,S,Ce)}let Zt=!1;z.version===bt.__version?(bt.needsLights&&bt.lightsStateVersion!==Xe.state.version||bt.outputColorSpace!==ct||O.isBatchedMesh&&bt.batching===!1||!O.isBatchedMesh&&bt.batching===!0||O.isBatchedMesh&&bt.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&bt.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&bt.instancing===!1||!O.isInstancedMesh&&bt.instancing===!0||O.isSkinnedMesh&&bt.skinning===!1||!O.isSkinnedMesh&&bt.skinning===!0||O.isInstancedMesh&&bt.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&bt.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&bt.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&bt.instancingMorph===!1&&O.morphTexture!==null||bt.envMap!==Et||z.fog===!0&&bt.fog!==lt||bt.numClippingPlanes!==void 0&&(bt.numClippingPlanes!==tt.numPlanes||bt.numIntersection!==tt.numIntersection)||bt.vertexAlphas!==Ut||bt.vertexTangents!==kt||bt.morphTargets!==At||bt.morphNormals!==ee||bt.morphColors!==_e||bt.toneMapping!==pe||bt.morphTargetsCount!==Ue)&&(Zt=!0):(Zt=!0,bt.__version=z.version);let nn=bt.currentProgram;Zt===!0&&(nn=Ps(z,U,O));let un=!1,ei=!1,yi=!1;const se=nn.getUniforms(),Ie=bt.uniforms;if(yt.useProgram(nn.program)&&(un=!0,ei=!0,yi=!0),z.id!==G&&(G=z.id,ei=!0),un||V!==S){yt.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),se.setValue(I,"projectionMatrix",S.projectionMatrix),se.setValue(I,"viewMatrix",S.matrixWorldInverse);const Bn=se.map.cameraPosition;Bn!==void 0&&Bn.setValue(I,Wt.setFromMatrixPosition(S.matrixWorld)),le.logarithmicDepthBuffer&&se.setValue(I,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&se.setValue(I,"isOrthographic",S.isOrthographicCamera===!0),V!==S&&(V=S,ei=!0,yi=!0)}if(bt.needsLights&&(Xe.state.directionalShadowMap.length>0&&se.setValue(I,"directionalShadowMap",Xe.state.directionalShadowMap,L),Xe.state.spotShadowMap.length>0&&se.setValue(I,"spotShadowMap",Xe.state.spotShadowMap,L),Xe.state.pointShadowMap.length>0&&se.setValue(I,"pointShadowMap",Xe.state.pointShadowMap,L)),O.isSkinnedMesh){se.setOptional(I,O,"bindMatrix"),se.setOptional(I,O,"bindMatrixInverse");const Ce=O.skeleton;Ce&&(Ce.boneTexture===null&&Ce.computeBoneTexture(),se.setValue(I,"boneTexture",Ce.boneTexture,L))}O.isBatchedMesh&&(se.setOptional(I,O,"batchingTexture"),se.setValue(I,"batchingTexture",O._matricesTexture,L),se.setOptional(I,O,"batchingIdTexture"),se.setValue(I,"batchingIdTexture",O._indirectTexture,L),se.setOptional(I,O,"batchingColorTexture"),O._colorsTexture!==null&&se.setValue(I,"batchingColorTexture",O._colorsTexture,L));const On=H.morphAttributes;if((On.position!==void 0||On.normal!==void 0||On.color!==void 0)&&ut.update(O,H,nn),(ei||bt.receiveShadow!==O.receiveShadow)&&(bt.receiveShadow=O.receiveShadow,se.setValue(I,"receiveShadow",O.receiveShadow)),(z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial)&&z.envMap===null&&U.environment!==null&&(Ie.envMapIntensity.value=U.environmentIntensity),Ie.dfgLUT!==void 0&&(Ie.dfgLUT.value=w_()),ei&&(se.setValue(I,"toneMappingExposure",b.toneMappingExposure),bt.needsLights&&mu(Ie,yi),lt&&z.fog===!0&&Tt.refreshFogUniforms(Ie,lt),Tt.refreshMaterialUniforms(Ie,z,qt,dt,w.state.transmissionRenderTarget[S.id]),Mr.upload(I,ll(bt),Ie,L)),z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(Mr.upload(I,ll(bt),Ie,L),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&se.setValue(I,"center",O.center),se.setValue(I,"modelViewMatrix",O.modelViewMatrix),se.setValue(I,"normalMatrix",O.normalMatrix),se.setValue(I,"modelMatrix",O.matrixWorld),z.isShaderMaterial||z.isRawShaderMaterial){const Ce=z.uniformsGroups;for(let Bn=0,bi=Ce.length;Bn<bi;Bn++){const hl=Ce[Bn];mt.update(hl,nn),mt.bind(hl,nn)}}return nn}function mu(S,U){S.ambientLightColor.needsUpdate=U,S.lightProbe.needsUpdate=U,S.directionalLights.needsUpdate=U,S.directionalLightShadows.needsUpdate=U,S.pointLights.needsUpdate=U,S.pointLightShadows.needsUpdate=U,S.spotLights.needsUpdate=U,S.spotLightShadows.needsUpdate=U,S.rectAreaLights.needsUpdate=U,S.hemisphereLights.needsUpdate=U}function gu(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return D},this.getRenderTarget=function(){return F},this.setRenderTargetTextures=function(S,U,H){const z=_.get(S);z.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),_.get(S.texture).__webglTexture=U,_.get(S.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:H,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,U){const H=_.get(S);H.__webglFramebuffer=U,H.__useDefaultFramebuffer=U===void 0};const _u=I.createFramebuffer();this.setRenderTarget=function(S,U=0,H=0){F=S,C=U,D=H;let z=null,O=!1,lt=!1;if(S){const ct=_.get(S);if(ct.__useDefaultFramebuffer!==void 0){yt.bindFramebuffer(I.FRAMEBUFFER,ct.__webglFramebuffer),B.copy(S.viewport),k.copy(S.scissor),Q=S.scissorTest,yt.viewport(B),yt.scissor(k),yt.setScissorTest(Q),G=-1;return}else if(ct.__webglFramebuffer===void 0)L.setupRenderTarget(S);else if(ct.__hasExternalTextures)L.rebindTextures(S,_.get(S.texture).__webglTexture,_.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const Ut=S.depthTexture;if(ct.__boundDepthTexture!==Ut){if(Ut!==null&&_.has(Ut)&&(S.width!==Ut.image.width||S.height!==Ut.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");L.setupDepthRenderbuffer(S)}}const St=S.texture;(St.isData3DTexture||St.isDataArrayTexture||St.isCompressedArrayTexture)&&(lt=!0);const Et=_.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Et[U])?z=Et[U][H]:z=Et[U],O=!0):S.samples>0&&L.useMultisampledRTT(S)===!1?z=_.get(S).__webglMultisampledFramebuffer:Array.isArray(Et)?z=Et[H]:z=Et,B.copy(S.viewport),k.copy(S.scissor),Q=S.scissorTest}else B.copy(K).multiplyScalar(qt).floor(),k.copy(nt).multiplyScalar(qt).floor(),Q=rt;if(H!==0&&(z=_u),yt.bindFramebuffer(I.FRAMEBUFFER,z)&&yt.drawBuffers(S,z),yt.viewport(B),yt.scissor(k),yt.setScissorTest(Q),O){const ct=_.get(S.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+U,ct.__webglTexture,H)}else if(lt){const ct=U;for(let St=0;St<S.textures.length;St++){const Et=_.get(S.textures[St]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+St,Et.__webglTexture,H,ct)}}else if(S!==null&&H!==0){const ct=_.get(S.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,ct.__webglTexture,H)}G=-1},this.readRenderTargetPixels=function(S,U,H,z,O,lt,pt,ct=0){if(!(S&&S.isWebGLRenderTarget)){Xt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let St=_.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&pt!==void 0&&(St=St[pt]),St){yt.bindFramebuffer(I.FRAMEBUFFER,St);try{const Et=S.textures[ct],Ut=Et.format,kt=Et.type;if(S.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+ct),!le.textureFormatReadable(Ut)){Xt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!le.textureTypeReadable(kt)){Xt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=S.width-z&&H>=0&&H<=S.height-O&&I.readPixels(U,H,z,O,st.convert(Ut),st.convert(kt),lt)}finally{const Et=F!==null?_.get(F).__webglFramebuffer:null;yt.bindFramebuffer(I.FRAMEBUFFER,Et)}}},this.readRenderTargetPixelsAsync=async function(S,U,H,z,O,lt,pt,ct=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let St=_.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&pt!==void 0&&(St=St[pt]),St)if(U>=0&&U<=S.width-z&&H>=0&&H<=S.height-O){yt.bindFramebuffer(I.FRAMEBUFFER,St);const Et=S.textures[ct],Ut=Et.format,kt=Et.type;if(S.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+ct),!le.textureFormatReadable(Ut))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!le.textureTypeReadable(kt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const At=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,At),I.bufferData(I.PIXEL_PACK_BUFFER,lt.byteLength,I.STREAM_READ),I.readPixels(U,H,z,O,st.convert(Ut),st.convert(kt),0);const ee=F!==null?_.get(F).__webglFramebuffer:null;yt.bindFramebuffer(I.FRAMEBUFFER,ee);const _e=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await zd(I,_e,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,At),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,lt),I.deleteBuffer(At),I.deleteSync(_e),lt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,U=null,H=0){const z=Math.pow(2,-H),O=Math.floor(S.image.width*z),lt=Math.floor(S.image.height*z),pt=U!==null?U.x:0,ct=U!==null?U.y:0;L.setTexture2D(S,0),I.copyTexSubImage2D(I.TEXTURE_2D,H,0,0,pt,ct,O,lt),yt.unbindTexture()};const vu=I.createFramebuffer(),xu=I.createFramebuffer();this.copyTextureToTexture=function(S,U,H=null,z=null,O=0,lt=0){let pt,ct,St,Et,Ut,kt,At,ee,_e;const pe=S.isCompressedTexture?S.mipmaps[lt]:S.image;if(H!==null)pt=H.max.x-H.min.x,ct=H.max.y-H.min.y,St=H.isBox3?H.max.z-H.min.z:1,Et=H.min.x,Ut=H.min.y,kt=H.isBox3?H.min.z:0;else{const Ie=Math.pow(2,-O);pt=Math.floor(pe.width*Ie),ct=Math.floor(pe.height*Ie),S.isDataArrayTexture?St=pe.depth:S.isData3DTexture?St=Math.floor(pe.depth*Ie):St=1,Et=0,Ut=0,kt=0}z!==null?(At=z.x,ee=z.y,_e=z.z):(At=0,ee=0,_e=0);const ne=st.convert(U.format),Ue=st.convert(U.type);let bt;U.isData3DTexture?(L.setTexture3D(U,0),bt=I.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(L.setTexture2DArray(U,0),bt=I.TEXTURE_2D_ARRAY):(L.setTexture2D(U,0),bt=I.TEXTURE_2D),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,U.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,U.unpackAlignment);const Xe=I.getParameter(I.UNPACK_ROW_LENGTH),Zt=I.getParameter(I.UNPACK_IMAGE_HEIGHT),nn=I.getParameter(I.UNPACK_SKIP_PIXELS),un=I.getParameter(I.UNPACK_SKIP_ROWS),ei=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,pe.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,pe.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Et),I.pixelStorei(I.UNPACK_SKIP_ROWS,Ut),I.pixelStorei(I.UNPACK_SKIP_IMAGES,kt);const yi=S.isDataArrayTexture||S.isData3DTexture,se=U.isDataArrayTexture||U.isData3DTexture;if(S.isDepthTexture){const Ie=_.get(S),On=_.get(U),Ce=_.get(Ie.__renderTarget),Bn=_.get(On.__renderTarget);yt.bindFramebuffer(I.READ_FRAMEBUFFER,Ce.__webglFramebuffer),yt.bindFramebuffer(I.DRAW_FRAMEBUFFER,Bn.__webglFramebuffer);for(let bi=0;bi<St;bi++)yi&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,_.get(S).__webglTexture,O,kt+bi),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,_.get(U).__webglTexture,lt,_e+bi)),I.blitFramebuffer(Et,Ut,pt,ct,At,ee,pt,ct,I.DEPTH_BUFFER_BIT,I.NEAREST);yt.bindFramebuffer(I.READ_FRAMEBUFFER,null),yt.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(O!==0||S.isRenderTargetTexture||_.has(S)){const Ie=_.get(S),On=_.get(U);yt.bindFramebuffer(I.READ_FRAMEBUFFER,vu),yt.bindFramebuffer(I.DRAW_FRAMEBUFFER,xu);for(let Ce=0;Ce<St;Ce++)yi?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Ie.__webglTexture,O,kt+Ce):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Ie.__webglTexture,O),se?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,On.__webglTexture,lt,_e+Ce):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,On.__webglTexture,lt),O!==0?I.blitFramebuffer(Et,Ut,pt,ct,At,ee,pt,ct,I.COLOR_BUFFER_BIT,I.NEAREST):se?I.copyTexSubImage3D(bt,lt,At,ee,_e+Ce,Et,Ut,pt,ct):I.copyTexSubImage2D(bt,lt,At,ee,Et,Ut,pt,ct);yt.bindFramebuffer(I.READ_FRAMEBUFFER,null),yt.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else se?S.isDataTexture||S.isData3DTexture?I.texSubImage3D(bt,lt,At,ee,_e,pt,ct,St,ne,Ue,pe.data):U.isCompressedArrayTexture?I.compressedTexSubImage3D(bt,lt,At,ee,_e,pt,ct,St,ne,pe.data):I.texSubImage3D(bt,lt,At,ee,_e,pt,ct,St,ne,Ue,pe):S.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,lt,At,ee,pt,ct,ne,Ue,pe.data):S.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,lt,At,ee,pe.width,pe.height,ne,pe.data):I.texSubImage2D(I.TEXTURE_2D,lt,At,ee,pt,ct,ne,Ue,pe);I.pixelStorei(I.UNPACK_ROW_LENGTH,Xe),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Zt),I.pixelStorei(I.UNPACK_SKIP_PIXELS,nn),I.pixelStorei(I.UNPACK_SKIP_ROWS,un),I.pixelStorei(I.UNPACK_SKIP_IMAGES,ei),lt===0&&U.generateMipmaps&&I.generateMipmap(bt),yt.unbindTexture()},this.initRenderTarget=function(S){_.get(S).__webglFramebuffer===void 0&&L.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?L.setTextureCube(S,0):S.isData3DTexture?L.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?L.setTexture2DArray(S,0):L.setTexture2D(S,0),yt.unbindTexture()},this.resetState=function(){C=0,D=0,F=null,yt.reset(),et.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return _n}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=Yt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Yt._getUnpackColorSpace()}}class R_{constructor(t){this.ctaUrl=t,this.mraid=null,this.audioUnlocked=!1,this._userInteracted=!1,this.mraid={open:e=>{window.open(e,"_blank")},addEventListener:()=>{},removeEventListener:()=>{},isViewable:()=>!0},this.setupInteractionTracking(),window.addEventListener("resize",()=>this.onResize())}startLoop(){let t=performance.now();const e=n=>{const s=(n-t)/1e3;t=n,this.update(s),this.render(),requestAnimationFrame(e)};requestAnimationFrame(e)}openCta(){this.mraid?this.mraid.open(this.ctaUrl):window.open(this.ctaUrl,"_blank")}canPlayAudio(){if(!this._userInteracted)return!1;try{if(localStorage.getItem("soccer1x1:settings:sound")==="off")return!1}catch{}return!0}setupInteractionTracking(){const t=()=>{this._userInteracted=!0,this.audioUnlocked=!0,document.removeEventListener("touchstart",t),document.removeEventListener("click",t)};document.addEventListener("touchstart",t,{once:!0}),document.addEventListener("click",t,{once:!0})}onHidden(){}}const Nc="data:audio/mpeg;base64,SUQzBAAAAAAAbVRFTkMAAAAIAAADUkVBUEVSAFREUkMAAAAMAAADMjAyMS0wOS0xMwBUWFhYAAAAGAAAA3RpbWVfcmVmZXJlbmNlADE2MjMzNDIAVFNTRQAAAA8AAANMYXZmNjIuMTIuMTAwAAAAAAAAAAAAAAD/+0DAAAAAAAAAAAAAAAAAAAAAAABYaW5nAAAADwAAAA0AAA0hAEVFRUVFRUVdXV1dXV1dXW1tbW1tbW1tgYGBgYGBgZSUlJSUlJSUpKSkpKSkpKS4uLi4uLi4yMjIyMjIyMjW1tbW1tbW1uTk5OTk5OTu7u7u7u7u7vj4+Pj4+Pj4/////////wAAAABMYXZjNjIuMjgAAAAAAAAAAAAAAAAkBb0AAAAAAAANIX2cDK4AAAAAAP/7wMQAAAaAA1/0EAAjijHtdzLwAIEAABMjSoEoL8ETg+OB8cCDhI4uD7w/cD/rDGGJzh/l3/+IBoIf/l31/wfflAQdWfwx/hhhH7thTqIxGpZGpxqyYLDh04iXTyEaQDmLiA6MHGkjhshgAk1WzpRQKFiS9KWxdxxnOALi4DdBbAZgEAfQmJUAXTPhUDnV5cyXMR6ba1czk4ekgSp2muSpXqHr7KcpsqaYyC2JN22Npwqk9EOtU5DrFuTiCcnZyLEdbQxPwXxzK9iu9ZlpwbY8d8lY0RDFAyQGBkP5VsjxXIpSvI7qDDxrwMRWxQKhpeafyRI+5IUaG9g7q9tDftM8LDd4lo99Q38dkrf3jvImqPEN+22k1t+0KM+xtudPJocsKlYrAbYIP/9Z1QVVh0RVNOSySeUhcCJjnEJGxu8rCqNlVduupU71FXe0B4Ph2DppRxV21xes1Kszaxd2vR2tdjYyGuV6hjiZo2oUVlIuqhtvK0Zr1q3NxgSMhqkFUmWNaHDozHlj1g07Qn7LiM8NMTc9hqQQjeCqr0zszaSqSX0pwCAgKTfJMJb6mrNFyxUvYqJQGlAjLzhoyXKoz57f6LoaN860pG2HfOBx3tXJQzhCQE383e2p5+XD5vekXkf0QU4TmYhC6VpuQxAg4HVkEw/ZUcjXjnKcS2wioaoEjkafJvv6EJUG+7qZqX9utk3PQPQSp+IGGSKkkId45DBJGVRQXDMkYtWIB0DHHmDoHLRiiGI3v2mxbGOJO5WTFmEdPSLowyTpNGRNv3Tz1u0ZOPLH1Xn3bPtlCcsqdGDDrI+OU85oPrLCosJgcYdhsYpPpuaRY1vf6gaLyauGXxJNJ4mAjQbajEJL6C8FuJED0FuJebLAJMsrRhKh9PBCJZdvcrIJ3cE1jmTUNZretYV0tvOijxL4oAMjc1YjCxBTHAzc9Xp6Ag6GVhowEgIsem4UNsPctKrOsIpP//twxNeADYzPd/2EACG8nm49hg1se68aeAKXUzJpNiZVSgicuZd2WIEAlUhAyYHjDPtbAiwdsRiVojy6k02itVeaLyl3gYstLfzTcOSWKXilU1xPwVCQIGMm6toqtFtWmxiDUZqCzk9ho8+M0zmCo4UHFjSGFUMUEIFJNh+wy2OQATo4Y93YqhYbDoaHqPkgpCRVVHaDq7zLQhMgABTCJCpyJUSWEaUpVA7asiQ2ZA5E1VrImUSxq5VMgmgVDEvWMLaFKqaXDKjHLZSaPffvawNxAsUbE0PkWLDNmJU50pFmx83W7RIbx6f0ZbSEsjH5Uul9w1ZBS7v3xy17joJOq6ZPdpx1/t7KB2nYqXRGgAAX4aD5EqIgrsQBQaUTUZZi1ln8KXxEoFwNORBcxqrj5Cnf4atVc5Roof/7UMT7gA4gy3XnsMqhvBntfPMOFKjX/R+Mf0iuVNDDGwPQ0wyKBG6iEgLe9QaNJINAxoOiJzVfqbU+ddkV3FHtWTGjVlAm4iAlpqpA2mZnYUmSQS7xTBNwlrePUG8JsKUV5nEjLCZKIP81mJygxHFvvHllI7KdMmZaRhDjQSYdCrfmX55pVQ1ZBICRtk1wRLZXQuajerNbkxy+a6HC2qQqGdTq3czaorSOzwk4gX1zRTa6pLgIUfvaLia3+pfv6gN5qamlZlEEO8AILlI5Qe3/+2DE6QAOZN9h7Bhu4cola72HjVUpQpS+G1NH+bhHIxHGWyn4cr6wjlkSyCiT/IFNCBmVfxojKQSuiMKTYmUWMqGslNzj97dGzmvY07bj+6ppvdxtrlOQnI+3teDjgoUC5RgyaNlAy83kw/kziBXVroW5qAab28qWRkspzAdUNTbRWsBBfJDkldASlbvKpMCgOEjAiBWzKFtLWlVmVO2uCorLMjIp7CpVy0BChRUwLFANEaNGHHg6l6xoOZa0izVVIhAkzOzXBmy8MDoDJPqFgLWjLfiwUwKUift8K/lKBbqc26RoiS3eFSLfQepQaN/0RGUs/lzTl3RZoS6Ym+kQBBhQuZn/+2DE7gANCJ9b7CRs4c4l6vzxln1R6R85yoRLPRiMybPa1doTsUO/YZmybRj/1lDWkZUtWal5AiRyZquZkxu3DKM4lmcND8HBZp3PMEljZ5Yu83l06mSACXQPSCCAlRHhVExRwVy5FyJuQA7FATpSEqOoZExsecoxLFYZmJKqBMhdRiZ1jWB+uQZzNTcoaYiPRJ0YRjB0NGq61YYYsLJcjOlwiuZEf46ebwkpLCWE++zn55u3Nv9/ygm9/cqlRJMuXBTEmOTTZShJqF9UBDGUESrJoDonKFxdOCy/CuYUPKrmFpcVmN8E6yBHkjwyCi1QaDCTI8nZiIyjTOs6UuUYt1IMfkr/+1DE+AAN4PlV7BhR4aob6r2EjZ3b3krMNElCoCYCpAqFAmVoQWpgow2rQD7/d/1D1ySygNNKLhAoeT6aY11VWilTImnCWdJUIDQ4rITFAe2iXYHqrjrohoStI25hyABR/GCqpbk+WEcZQACchThupm0N1zhGdKm0P3SvaVikcOkMFiIQUDVPfQzu7+/Kj2zW8B1SKSw61FwrqL8Eaw5TIN0RsQAFCgTDBJKSDcar3FFoYZW90pBFGbwKEj2p5uO+HM3rMErGRMjY1mf+pv5///tgxOiADD0NUewYbuGenij89I3Nri0aPerVLlHuFfJmCIaAXNd42Ef+b3VceOzbAMlSSRthoQHRWQVfbJMolgyeFI0B7N2eIlLmulr+DtIxWtSU2sr7fI7iQjuhiQ1UTCKoa8/KnSh1c8yVHsFV3cik8Am0mWx0Y0oI3LrMyo1stgAWYx0WK4yVrjQ7GkWnomLg0aosaKNUHKHO0hTLVBOoDyUcenGrxkqkfnOlx8CBNbi6lpthQxfVoq34uOGBVtBLvES8S1bcjAAlBJFYZ64evP2Iac9a0GoaNRskEM6KGEhyLI/QlpSQ/Tp+yQyN/cTwKi/KPl+ruSyHVIJBmpTwilce//tQxPuADFTvS+wwaqF0Him9hg1kgC3a1dAAPYlgks6tNiz/Gd7wy5Yt6wYS3u8MXSfe8m0cmNKRaSKSESmXadYtuPcxrl9OogZdhxdwi8JcYml/IIcAAAiHsssAAIw3pdjlyVGcaiUpHtDZapEqrnWWMFJqd9SPCnVKBhZpz13/37okdqZFB4YAAAB//QAACLsoL8ORKYfC3/nkHiTlGw2VcZWAiTN/dzkDwVDgAAAAAAABP0joADrgfaTl6w4GZ0YYctj8ASBA9Gn9DwL4Rf/7QMT5AAs09U/sMQUpRxvpfYSM9UYTc+gD+BdB3+8TALqMYS/1M6cew7R2Go9v2hJP6yQUNf7QMSCX/xZTRif//WpMQU1FMy4xMDCqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpMQU1FMy4xMDCqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//tAxPOACPSTRewYZ2kJE2c9gwx9qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr/+yDE/wAIEH8tjIDEqMgRpr2ADKWqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//sgxPwAA+QNM/WAACFdDiW3NNAAqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqv/7EMTWA8AAAf4cAAAgAAA0gAAABKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq",Fc="data:audio/mpeg;base64,SUQzBAAAAAAAbVRFTkMAAAAIAAADUkVBUEVSAFREUkMAAAAMAAADMjAyMS0wOS0xMwBUWFhYAAAAGAAAA3RpbWVfcmVmZXJlbmNlADE1OTc4ODkAVFNTRQAAAA8AAANMYXZmNjIuMTIuMTAwAAAAAAAAAAAAAAD/+0DAAAAAAAAAAAAAAAAAAAAAAABYaW5nAAAADwAAAAoAAAwcAFNTU1NTU1NTU2VlZWVlZWVlZWV6enp6enp6enp6kJCQkJCQkJCQkKGhoaGhoaGhoaG7u7u7u7u7u7u7zMzMzMzMzMzMzN3d3d3d3d3d3d3u7u7u7u7u7u7u/////////////wAAAABMYXZjNjIuMjgAAAAAAAAAAAAAAAAkAnkAAAAAAAAMHNk4TFUAAAAAAP/70MQAAAfgA1O0EAAj7zMuPzWCCAigXJISyok2BwPg+fBAAAgCAJvg+D4IBjLn/iAMFPDFQIflAQDGD4Pg+CDvg+D4YwQ/lAQKOD+CGGCjgfwQ6XMDULtAZyRCITCIrQYRVrDjODsWDPKA4YfNqlOJCENAchCw0zoBW4zAotYaViEOgc2LsvMsIF3BNykklXoZAFkDIOR/xCWwlChIRgl5Wdrzyvo7L8yp+mHtP7EXLSFQnOWu1kD9tdgiW523HoJyH76F6EqSS1lVO61K/NV5n+ikaa5Ou/r4Yj0Fto0x5nolV/GXVpfUd+Nz/ZuL54bt0kug2Ky6pVklyXTdn5Tu/jT2/3nnLMPlnMJPTbkFLQuzB1LLaGQ3rFatrGl3Wf+IxKzK7UsgB+KR2HcvRiUTlLla7yvTZyn7u/zleVa1a39Jnawprmdgp////3PUeQrLc5CCmUnMSEH2N0WopQ6RuC2AZjLZTGLAbpvMTMwhGGQFRMLEWJGY51hrms2vWG49GtV9vVYuZrZmj/a/44b2KWPATzIUBk6ZMCrIJoBlDCoSB0JU0LdWE7BfotoAtWWJR1KssHVFgdzh5dkRuRNS+hCzAacy5EA5UtJXypkelTKSByk0WTuR6SRqmWoxBgLpZMCiFjsPwqRZmQMwUiBjhMzzjEnoZnR0hrbzMivv1AU/yO4o3lWIye9jQ4RGabVBFfWPz7I6wr6L2c1ui8CS1lTe61r/e+2tKgGJd4mneNtNydQwYSx3T8lsiQSdSvoWNIHQARFXm1R4sWzChDDw7UrVSn8JjQgRnARtC2IGyvqU6SyMRtXmxrsQo2XhfvckN45pdJlvf2yfMkI3U2sahdlnvkaztPa1bpXmdZmRp10mnz0Wj+mfKEzW3d3T2WxNzkAkahJTcEam9kKHJFdHVZkWbs20hba9B0ue7KPLRWPbYdUvBzy3yJVlf4YjEVVmqrnNeZsGoJJZUlHFHPuomZ7TTzpWeUOSpsKeSmGMuFHDWuTSixhZqjT9gwUeXeTe9DQZFhoFRO06KgiYzGtoROFIF0BmkHCALDBKUkAthkiMRxOmR4e1y4lgS5IUXJQqv8JbP91pSMvJNoE4idqCMEX/+1DE+YANCK91vPQAIcea7n2HjVXl//jPH8p681r8NzoWuVOewuipsIPIzeIM1DQy21wMuWtyHCZhQRgeH8oCjohYVNjaxQgHi1KwqgW+ba1sgkouo6g4ixEBi7HAe1Ilcq1mJMODokGwOvXKR9LfLnlyTcUqgwwMOWZsPrBRrfdo5kcZD4zzIM6cU82spVW8+Gx/xYKpHqicy1O96Xz85yHNbn5F/nME8cONtudMBKeHH0PeWtOnc3UIvNu7mGbiSbvmA74e1lqJzXS0K7xo//tgxOmADdUVcewwaOnGmy39gw40q3n8X3E3IctrsNwBYDMA1GbJMnui5t8NhHBRUMQlDicP8jf8GdpoKkIO3mR1YfGp5TV/0PRWhVeHR1dCekUx4Lf38hFecGNi0sytqtFCu0Ti9/M1lTnTvsqxoG3O2phnkSSSnVsDzILxMABWCdsMCjghKXWxZ+n+ZG/sbh67PxuPiYXdG2xLYa0Ig9ubhyNlJ7D9XTLq9pPw3IE8BVS5GMj0WNUMu1itz5rcuGi8yPpGTZ5XvzkdfLixvnl5dmxl/8wcNHt6xWYa+W/5fTWqCNzKuGRNG2lJyeAggdQ4iAhBh4CHisFKLAd5rtRVBkUj//tgxPEADei5ZeeYb+Gwpms1hg1Yo/0zJloZlEGkg6FgalwG311OKR4OhoW47hrl2cSspBd18SPmT6itbjh4PtK09unreK+ePjSr1uOrg9KMLILZVP9+JtJuYlqhltJdHi55su+ChMMU4wXF2ZYSUuKGlTb82jGQanWGhG5l3DIMiSSbo/I4EQeoAvAkRMFWGwgB8kJNUsJll+USYWUOAvqRzLchgOBlzcgMOm9/gTuTNfRVtRhXockP4ztn+5ZRjLKTLXLX/8ivs3z7bHUnVZSIs5OWFrwrrL/rZMkPIsMa6paoqKDf/fiqcVyszKdTMFNFJw7iouVDBghFNmi4HXaSpu0J//tQxPsADhDtYewYbmnOrCt9gw4d4mIuFLwUCg7NUaFa76ciYMq3QsZ0YQ9zSruaZaxDUMSMYUQaGbm6Drcvc1Iy6Xt+X8I4FkVdYKuMLA0ChUVZGJZiz3lFiBypiwInxgM+S6VnWZ2zKmBCSSUgPanwYUxNBV2UvlPorJUJ9KWtJeGOHToLJmlEa2llbI0HSBhSw4xVeY55up9O5Uumaw1kKVvT97vl82aX0+0ss8z86WRLkyqeZZ/3L3h1FMdWhwRMhJLLLkioDaZ96gt3VP/7cMTmABDllVXnpQxJv6xqPPMNydzbNd/9CNvKuXU2U206AySOCAQAJIPRBBvqUwyQp+IdJCCXPjRKKiImg9GkYCgVoEKwlWrDyu5aVaUFAyBAfxSXmQBd2sv1Oh2HbUTf6jufjk60L/J0fk7/0wlaKsGhT/9hrRQImZmWQwRSJagDSRZUyB1MUu2Bo7QUxFwErnhcVk1ht4nKSVVOQmekLUACwhSlHZ3ILmWFGxzFRlyqqptVPp9Q9Db8f1UlhZ2R3PjKp7HNMdj0OMdX+GX9M//Vt24Ds2KCjqN+Ogupmap2OuZwD00oNExNOhicqj0ESmH4zE33aW1CaazukiU0RQDQg2bN1g4q5tAtWtdMWDy2pkQqcOfnBTGUBkS5+Fd0Xl02bpv5Uu1xf38Cg90q8w2s2uVQIiL/+1DE/IANTNNJ7KRswb6lKP2EjZFiZZlbskYAKQTQlBrEphuC5+KSyhqXYeiUih2nJAs2jRyduRfotYlSPmZ51eyzc0zhFUoUiFq8X07ItpbKxPz4TwrfEoLq3MYSFEhUY0VEYyVqkIAAAAAArneT2emqHiwfLLtsyRYTByvmsjBBlwJpUAG4GM85gkiiAW4OML8oxTq4LYJkFwGHSSXW3i8I2bDBjER/+aGCJuib/ygEQT/4WCADAf/0sCI9CP/+hr3JSn////7qKBQIBAGA//tQxO0AC+B3Q+ekbkmTJWa9lI2RwMAAAAAAMesBEv8DEBQ2Xxgh6XhRAXeFCoifzDSg+/yInFUhJfngqv+WIt/jNf/sX//21UxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7UMTogAsYpTnMGHDpKA0m/rBgBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+1DE9IANqJ8v+aaAAOOMpTMooABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV",I_="data:audio/mpeg;base64,SUQzBAAAAAAAbVRFTkMAAAAIAAADUkVBUEVSAFREUkMAAAAMAAADMjAyMS0wOS0xMwBUWFhYAAAAGAAAA3RpbWVfcmVmZXJlbmNlADE2NTQ2NzEAVFNTRQAAAA8AAANMYXZmNjIuMTIuMTAwAAAAAAAAAAAAAAD/+0DAAAAAAAAAAAAAAAAAAAAAAABYaW5nAAAADwAAAA4AAA3yAEFBQUFBQUFXV1dXV1dXampqampqan19fX19fX2QkJCQkJCQnp6enp6enq2tra2tra3AwMDAwMDAwM3Nzc3Nzc3a2tra2tra5eXl5eXl5e3t7e3t7e34+Pj4+Pj4/////////wAAAABMYXZjNjIuMjgAAAAAAAAAAAAAAAAkBpEAAAAAAAAN8mNfl6sAAAAAAP/7wMQAAAZ0A2f0EAAjlDKu/zOASCIliEQjQBTIS4EHzcH3lAwJHShwQAhlz/D/5eD8MdYPg/5R1UMf/DBR3D/Ln64fw+XP8MIAKJqLoEGRmCYOpxWJSXTL8QEBa8YDNv4WsDCF1KxDwZhFjQpeCMgABNMzCSyUVVULgxw9oCVPY9j9sWd9T0Ps1Z45DxQ7RwVAT90DRE5Ghw83JdF5+IbksNSOhnJqGHGh1+KkARmB6Sy48DQRIrlNE5DLopelNupejd2pK5uvBkpu3JfO00XiFx6JqMyOkqXbees6lekmJHZlOdnHHfKOpf3fq37Gq/c+4ZbpquNjspt0taVUMTjE7el8sv1aO3Uyo71unqc5388OfqzVsynOzTVrv7x1v8b1Dnhhdw7+eNcp//9iA2ZaVlRW7ZJNm8BLAMQsAJEfomSiFyJySpHJhPl1Z02XkRgHCELiwtcr5qD5WqaCntbmmKXmTVpmgur3lXUdVOszbQ1T29VQ+ZpLm/jH1R1RjIYEwOQBUJNjDgqVxCaYloJh5QUACyzpg8JUj1ruh2n+dLAjHCoJiaJIBKohWnMlXPkx1haVSZdlBO2GGlxPq00bkl1wQj55FZyz77vd6plm1UPBGG81GMirqiuU5FXUYEfCmZCMMe5syf9znWqFUipeIUB4cF2QAnJWT9z9du8tbP9OS3/3//xOH8d18O/+fyZ81Qapd2VDOFAAp1MF4yqROktkzhlIsNnCei72KOu/i7oeo4ukClEkDts20MNO3UJFt81/jSSEhk4RlkLnCbVOETA4xcthmc7094Ze893Ca5Fe/iI8yA54G95U6kzGX9aEglmWRlzNt+Nn/xuDRSNrhb3/fobe1dRLNW2UpenYjCLLWchG9SdrAIqstU7EAuLx2IQ0UQzgqNm79ZAA9zGm5jKGKsvRVChw71VdPpUjY1PUvzL5GM6+qkfr0i+r1JYqEG2OkZdUpVXL//twxNaADnTVefz0ACHDHC09hg2lc1I4X0obX9IZZF04bBYQucgSwm1RIw48aSHIzKiJB4qYZWRGgQCnyGCTYIJBLBVytYTGjqb62GYoaQDw8i15KfqDJ1OtafehryazceUrgnmpFngorEJKMWVvTIyoILh1QiUienn0itzuqlwhJ4OCuNTkhIaq5Aj+TQuIjfn/7AxJdndjLLLPnbppVxT5Ej6w23DZwH4IKa10IaJmXdhIU6HZvhozKlXRxe7T42qdtX0S+chuL6w91oVvd4HCPM13tMs9zzxiWQmdREE0Y6bkm6OFWK9QgTNCIiCuDM9clAGBhqhufzQl2NMyRsvL1wvxo1yULVvRGT4FoUswUnffTVnO6CuKoezKe83X0uZBRSojiYqVRDAAABnEA2SJXuggw0qXJ//7YMT2AA5Ey2vsGG9pzqht/YYNXOIDlioSFh2UNUksrqROtHKkvKuk6U59f0DLNh2s/Cl2kY2OZlbOfcuV5KragRAUOAVqukU/M1PAfjECYmtNY52jqQaD/A4LrHxVFP3gv/HE4YI/Dy8JoKPZ8G+vL7LtWd1xP//gNOVMsxmqknLqiFDjxwvkOCIjOmgypjJXEYGwK+2fEYAQElhzTVtMjc3GaPN95w4uyaDaOcpEyRxTF7iDZhwQoewfjwEi7XNvO6M7HSpMdpGWhHfq87dc4xy5X/MrsagmkJtS5nfIUcAkmnXuLXvNuT5eBsuqh2RAgQAZxorAkKVyphgwMBoMOij+qv/7YMT7AI9Zg2PsMGtp2aDr/YMOHe+yvZVSAW2JQhZVVG3ULmi5zvrwnz3QPNS7Fv/+59IE0B7vRpI0+4b4opb/NmLv49ZkRk5y5EYLgog3Otxc64aYUPd8MsAoIva2gtoCoTXukGNfNC+q04y7vJh3KABLoEcgoNNGJLBg4jmL0Vyr9jMoGsewhBmlPXVZuSkNhw7ehbYcHl+LaIuIA2zy7lxlR46CZaCsbUBEqGolSrG5KZdJmXI6wY4dzWOTH5Vc9s/JPItjVZSO/8aXn6ycjysM3uoFz8qJZDQABLoBApWLCbwMEngzBuSfLCGtJEIYzeWLB8pFp48hrWblSDRaO7mRnP/7YMT6AE8U9VfsGHFpyKoquYMN7KVyJ1Y+K5oUXpG60u2l/CEuy5GpLkfmuSzrQyU1s1/MxMChQmoF6RrA7VawApCW68RVFNTdQzqSRIUuBkIugWIjY1pHi8kqr1yFhW1b6GmgzBZpGRmWUFk2FGRl4BtYgohOpKSeLR+swOKhpqjfESHNc0cJY9yPPYzQsBHDBgOSBwcEho9xGBjxZS62XJDp76MVFSFHunh2dDIAADoB4AOYHtUJpZliSDyvpQz55mJNVmtwFF32f6miknBMPkl5PIyROiftvpSMzZ7K+pVbFXt7i/8+ZLmrXB6qpJ5yYmiMpaqR+GkL587ns5qWbKy5xf/7UMT8gA3wwVPsJMxhpymqfYYNZcW7d3De+5LwpdKKZlsKRNi8VMyymRJILgBqSqnT4Y+wFIV/FNklmDK+WGEMJQWNg6LRWiXKoKwL3J5qCCLDCItAlITEJJirZsCMowIzIoxt1fJm6nMlI+T/090Cg6EccuTjIbtEcCgs0md7+gi8y7hmSUZwMB3CRqgVXwsJZKq6tbTV1rQd53WjoQKHVEab0bB1Z0oQZo7yQc1LKD1EcDFMS7vr01rlUE0K52LevLuxpWahR68ZNZqsx1b/+1DE7QAMJPtN7DBq4YcZqP2EjZC+NhtPNnyhOduXbsjSbkoAjKCAomWFYPofYf6HiJBwnGWwqTCP5wV+FkgObSQTKbbmtAsTgVSxlWdjeRsb5pKFNNRNQ0fMr+hGZ/PLMi1ZxoTiSIibFpRFAUJvdbv+qgy7zJl4NtRxMAG4eAJMIchROg/RhFsJ+SZ8hx3EMysoFmQ5nXp3rt81aIGDwwiWhVmCdTVSzhqTYl1ixyNBFgipVsY1Ly2laUzqOTBTpnOOmi//6dWExMO6IBgr//tgxOkADXUHQ+yYcalxHud9lg1hIADMSBLRIhMvbCXQQEMjhs2GhtGCNAZtpUnI7pV0Gl0PhmpQVS1Vmc2Ec8Ut0YtSnSasyDqTec1hPV1FsQfOr+dZhEFJjAFfXQiHhohmTfpAEyNQUGhta0fMD5CNQkosD4IpgKPJTOiUshXyZCxRShDbh++Qgdj2CBWVQZZpBA5mBThlA9bKvdvm/+ktXXhPq7Nvg9l2/1SbjAADTX5adzwzPJbJv6FOJC2NxWVe4lQSlclNiVVja9OwyHpkazJWOqQJgrOodDenn3+ZnXThDsoX4X//67QAAFNN71JqZj3nDTZMgOguY6MFUUluTRZx//tAxP0ACqyTQcwkbKlfnCj88w3dSTNctRKntCXUlsLMhAn7qjX6ij2AQB2UQD8rwAqROiUy+2cp+msqdBo2FBESPfFj1yYjAYCAUBgQMIAAAAKG2DBFAbAgGEAl4EgQI/84Tngr4Xv83mf+bjkJRv/QQQL6f5cPhj+j/6dEQoEAYEAYGAAAAABFBCdT4GngLh4XBClvOFbwAwLoFX8sQiqFz/isPjyIffCowS/nViI9/UJZX/n/+0DE9oAKpL9B54yzKT4aZjmUjS0Zb/+V///9uypMQU1FMy4xMDCqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqkxBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqv/7MMT0gAlMgzPMJGXo9Bil9ZSMfKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqv/7EMT0AEY8bzGsBMSoe4HlNrIABKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//swxPUABtR5LZlWgAECjKUzJKAAqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//sQxNYDwAABpBwAACAAADSAAAAEqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqo=",P_=""+new URL("sfx_whistle-BcGKGweM.mp3",import.meta.url).href,L_=""+new URL("sfx_stadium_bg-BW_I0ADJ.mp3",import.meta.url).href,D_=""+new URL("sfx_lofi_lobby-Foeh27Ca.mp3",import.meta.url).href,Ta=""+new URL("sfx_goool-Chgm4qWh.mp3",import.meta.url).href,U_=""+new URL("sfx_goool_2-DJtIlPRc.mp3",import.meta.url).href,N_=""+new URL("sfx_goool_3-DzsQ9lUR.mp3",import.meta.url).href,F_=""+new URL("field_test_01-ISdRUoD4.jpg",import.meta.url).href,q_={"sfx_kick.mp3":Nc,"sfx_body_hit.mp3":Fc,"sfx_save.mp3":I_,"sfx_whistle.mp3":P_,"sfx_stadium_bg.mp3":L_,"sfx_lofi_lobby.mp3":D_,"sfx_goool.mp3":Ta,"sfx_goool_2.mp3":U_,"sfx_goool_3.mp3":N_,"sfx_hit.mp3":Fc,"sfx_shoot.mp3":Nc,"sfx_victory.mp3":Ta,"sfx_cheer.mp3":Ta},rr=["sfx_goool.mp3","sfx_goool_2.mp3","sfx_goool_3.mp3"],V_="https://play.google.com/store/apps/details?id=com.hackathon36.group16.pokerblast&listing=blitz13",Ze={player:3837695,rival:16724016,fieldLine:16777215,ball:16777215,ballDark:1118481,goalPost:16777215},Be=4.5,re=5.5,ye=1.4,qc=.8,Sr=.55,ar=ye-Sr,O_=2.3,or=.5,lr=.18,B_=130,k_=.12,z_=.85,G_=.05,wa=2,ps=250,H_=2200,W_=180,X_=1.05,Y_=.3,Vc=32,K_=.6,Oc=.04,Ca=.18,Bc=.05,cr=.3,hr=2.2,kc=.3,Z_=1,ur=1.5,j_=.3,dr=.75,Ra=3,zc=6,fr=6,Gc=13.5,ae=.22,J_=2.2,Hc=.06,Wc=.55,$_=.42,Xc=.35,Q_=5,Ia=.45,Yc=1.1,Kc=4.5,tv=.18,ev=2.4,nv=1.3,Pa=5.4,hi=.65,Zc="v71-training-fix+ramp",iv=3.8,li=.45*hi,sv=.5,rv=.8,ms=60,jc=100,Jc=1.6,$c=.5,Qc=.2,av=3,ov=1.5,lv=6,La=60,cv=10,He=(1+Math.sqrt(5))/2,hv=[[0,1,He],[0,1,-He],[0,-1,He],[0,-1,-He],[1,He,0],[1,-He,0],[-1,He,0],[-1,-He,0],[He,0,1],[-He,0,1],[He,0,-1],[-He,0,-1]],uv=Math.sqrt(1+He*He);function dv(i){const t=[0,0,0];for(let s=0;s<5;s++){const r=s*Math.PI*2/5-Math.PI/2;t.push(Math.cos(r)*i,Math.sin(r)*i,0)}const e=[];for(let s=0;s<5;s++)e.push(0,1+s,1+(s+1)%5);const n=new ze;return n.setAttribute("position",new en(new Float32Array(t),3)),n.setIndex(e),n.computeVertexNormals(),n}let Da=null;function fv(){return Da||(Da=dv(1)),Da}function th(i){const t=new Qe,e=new ot(new As(i,32,24),new be({color:16119274}));t.add(e);const n=i*.3,s=i*1.002,r=new be({color:657930,side:qe}),a=fv();for(const o of hv){const c=new N(o[0],o[1],o[2]).divideScalar(uv),l=new ot(a,r);l.position.copy(c).multiplyScalar(s),l.scale.setScalar(n),l.lookAt(l.position.clone().multiplyScalar(2)),t.add(l)}return t}const pv=2.8,mv=1,gv=.42,_v=1.8,eh={speed:iv,hesitateChance:.045,hesitateMin:.5,hesitateMax:.95,dashChance:.004,shootIntervalMul:1,markDistance:1.4,predict:.4,inaccuracy:gv,style:"balanced"};function vv(i){let t=0;for(let e=0;e<i.length;e++)t=t*31+i.charCodeAt(e)|0;return Math.abs(t)}function xv(i,t,e=""){const n=Math.max(0,Math.min(1,(t-i)/Math.max(1,t-1))),s=["defensive","balanced","aggressive"];return{speed:3.6+n*1.7,hesitateChance:.065-n*.05,hesitateMin:.5-n*.3,hesitateMax:.9-n*.55,dashChance:.0035+n*.009,shootIntervalMul:1.3-n*.55,markDistance:1.85-n*.95,predict:.22+n*.6,inaccuracy:.5-n*.32,style:s[vv(e||String(i))%s.length]}}class Mv extends R_{constructor(){super(V_),this.scene=new rf,this.state="MENU",this.stateTime=0,this.totalTime=0,this.matchTimeLeft=La,this.inOvertime=!1,this.balls=[],this.playerGoals=0,this.rivalGoals=0,this.charging=!1,this.chargeOriginX=0,this.chargeOriginY=0,this.chargeCurrentX=0,this.chargeCurrentY=0,this.slingshotPointerId=-1,this.lastMoveDirX=0,this.lastMoveDirZ=-1,this.chargeKickT=0,this.chargeEmberTimer=0,this.wasMoving=!1,this.movingTime=0,this.touchPointerId=-1,this.touchStartTime=0,this.touchStartX=0,this.touchStartY=0,this.touchCurrentX=0,this.touchCurrentY=0,this.touchLastSampleTime=0,this.touchLastSampleX=0,this.touchLastSampleY=0,this.touchVelX=0,this.touchVelY=0,this.touchFirstMoveTime=0,this.swipePath=[],this.blockTimer=0,this.blockCooldown=0,this.shieldHoldTimeout=0,this.shieldHoldActive=!1,this.dribbleTimer=0,this.dribbleDirX=0,this.dribbleDirZ=0,this.dribbleTailTimer=0,this.dribbleTailMax=0,this.stealOnlyTimer=0,this.joystickActive=!1,this.wasInSprintZone=!1,this.sprintDashTimer=0,this.joystickCenterScreenX=0,this.joystickCenterScreenY=0,this.smoothedMx=0,this.smoothedMz=0,this.joystickPointerId=-1,this.joystickOriginX=0,this.joystickOriginY=0,this.joystickCurrentX=0,this.joystickCurrentY=0,this.keys={},this.mouseScreenX=-1,this.mouseScreenY=-1,this.aimWorld=new N(0,0,-1),this.raycaster=new Uf,this.mouseNDC=new Ht,this.baseCamPos=new N(0,16.5,3.41),this.baseCamLookAt=new N(0,0,.5),this.lobbyCamPos=new N(0,1.6,4.8),this.lobbyCamLookAt=new N(0,.6,0),this.lobbyGroup=null,this.lobbyDragging=!1,this.lobbyDragLastX=0,this.lobbyDragLastSampleTime=0,this.lobbyAngularVelocity=0,this.lobbyIdleSpinTimer=0,this.shakeAmount=0,this.timeScale=1,this.rivalShootTimer=999,this.rivalMoveTarget=new N(0,0,-5),this.rivalRetargetTimer=0,this.rivalDribbleTimer=0,this.rivalDribbleDirX=0,this.rivalDribbleDirZ=0,this.rivalDashCooldown=0,this.rivalHesitateTimer=0,this.rivalHesitateCooldown=0,this.rivalProfile={...eh},this.celebrant=null,this.celebrateT=0,this.fxParticles=[],this.fxGeo=new zt(1,1,1),this.sprintFxTimer=0,this.playerHasFired=!1,this.training=!1,this.trainStep=0,this.trainT=0,this.coachTypeTimer=0,this.ftueEl=null,this.ftueTextEl=null,this.coachBubbleEl=null,this.coachTextEl=null,this.timerEl=null,this.battleBarEl=null,this.titleEl=null,this.surrenderEl=null,this.pauseEl=null,this.paused=!1,this.isMobile=!1,this.ready=!1,this.ended=!1,this.fieldLinesGroup=null,this.fieldMat=null,this.customFieldLoaded=!1,this.crowdGroup=null,this.crowdMesh=null,this.crowdSeats=[],this.crowdExcitement=0,this.crowdTime=0,this.crowdTmpMat=new oe,this.keepers=[],this.obstacles=[],this.audioBuffers={},this.audioBuffersLoading=!1,this.audioBuffersReady=!1,this.bgSource=null,this.bgGain=null,this.bgBaseVolume=.18,this.bgVolumeListenerWired=!1,this.masterGain=null,this.masterVolumeListenerWired=!1,this.init()}init(){if(!this.scene)return;const t=document.getElementById("game-canvas");this.isMobile="ontouchstart"in window||(navigator.maxTouchPoints||0)>0,this.renderer=new C_({canvas:t,antialias:!this.isMobile,powerPreference:"high-performance",alpha:!0}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,this.isMobile?1.5:2)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=mh,this.renderer.setClearColor(793914,0),this.camera=new tn(55,9/16,.5,60),this.camera.position.copy(this.baseCamPos),this.camera.lookAt(this.baseCamLookAt),this.scene.add(new Pf(16777215,.72)),this.scene.add(new Cf(16774368,3493994,.45));const e=new lc(16772829,1.05);e.position.set(6,14,5),e.castShadow=!0,e.shadow.mapSize.set(2048,2048),e.shadow.camera.near=1,e.shadow.camera.far=40,e.shadow.camera.left=-8,e.shadow.camera.right=8,e.shadow.camera.top=10,e.shadow.camera.bottom=-10,e.shadow.bias=-6e-4,e.shadow.normalBias=.02,this.scene.add(e);const n=new lc(10336511,.28);n.position.set(-5,9,-4),this.scene.add(n),this.buildField(),this.buildGoals(),this.buildSideFences(),this.buildKeepers(),this.buildCrowd(),this.buildLobbyCharacter(),this.player=this.makeCube(!0,new N(0,0,4)),this.rival=this.makeCube(!1,new N(0,0,-3)),this.enableCastShadow(this.player.group),this.enableCastShadow(this.rival.group);for(const l of this.keepers)l.mesh.castShadow=!0;this.bannerEl=document.getElementById("banner"),this.endcardEl=document.getElementById("endcard"),this.hintEl=document.getElementById("hint"),this.timerEl=document.getElementById("match-timer"),this.battleBarEl=document.getElementById("battle-bar"),this.titleEl=document.getElementById("title"),this.surrenderEl=document.getElementById("match-surrender"),this.surrenderEl&&this.surrenderEl.addEventListener("click",l=>{l.stopPropagation(),l.preventDefault(),!(this.state!=="PLAY"&&this.state!=="GOAL_PAUSE")&&confirm("Desistir da partida? Conta como derrota.")&&this.surrenderMatch()}),this.pauseEl=document.getElementById("match-pause"),this.pauseEl&&this.pauseEl.addEventListener("click",l=>{if(l.stopPropagation(),l.preventDefault(),this.state!=="PLAY"&&this.state!=="GOAL_PAUSE")return;const h=window.__onPauseRequested;if(typeof h=="function"){this.setPaused(!0);try{h()}catch{this.setPaused(!1)}}});const s=this.endcardEl.querySelector(".cta");this.ctaButton=s,s&&s.addEventListener("click",()=>this.openCta());const r=this.endcardEl.querySelector(".replay");r&&r.addEventListener("click",()=>this.resetGame());const a=document.getElementById("battle-bar");if(this.bbLeftFill=a.querySelector(".bb-fill.left"),this.bbRightFill=a.querySelector(".bb-fill.right"),this.bbLeftNum=a.querySelector(".left-num"),this.bbRightNum=a.querySelector(".right-num"),this.bbIcon=a.querySelector(".bb-icon"),this.updateScoreboard(),this.slingLine=document.getElementById("sling-line"),this.slingDot=document.getElementById("sling-dot"),this.joystickBase=document.getElementById("joystick-base"),this.joystickThumb=document.getElementById("joystick-thumb"),this.mobileHintsEl=document.getElementById("mobile-hints"),this.ftueEl=document.getElementById("ftue"),this.ftueTextEl=this.ftueEl?this.ftueEl.querySelector(".ftue-text"):null,this.coachBubbleEl=document.getElementById("coach-bubble"),this.coachTextEl=this.coachBubbleEl?this.coachBubbleEl.querySelector(".say"):null,this.isMobile){const l=this.hintEl.querySelector(".hint-desktop"),h=this.hintEl.querySelector(".hint-mobile");l&&(l.style.display="none"),h&&(h.style.display="inline"),this.mobileHintsEl.classList.add("visible")}this.setupInput(t),this.setupKeyboard();const o=async()=>{await this.loadAudioBuffers(),document.removeEventListener("touchstart",o),document.removeEventListener("click",o),document.removeEventListener("pointerdown",o),this.state==="MENU"&&!this.bgSource&&this.playBgLoop("sfx_lofi_lobby.mp3",.08,1500)};document.addEventListener("touchstart",o,{once:!0}),document.addEventListener("click",o,{once:!0}),document.addEventListener("pointerdown",o,{once:!0}),t.addEventListener("webglcontextlost",l=>{l.preventDefault(),this.showEnd("LOSS")}),document.title=`Soccer 1x1 ${Zc}`;const c=document.getElementById("ver-tag");c&&(c.textContent=Zc),this.ready=!0,this.onResize(),setTimeout(()=>this.onResize(),0),setTimeout(()=>this.onResize(),200),this.spawnMatchBall(),this.recomputeJoystickCenter(),this.updateJoystickViz(),this.setMatchHudVisible(!1),this.hintEl.classList.add("hidden"),this.mobileHintsEl&&this.mobileHintsEl.classList.add("hidden"),window.__game=this,this.startLoop()}onResize(){if(!this.ready)return;const t=9/16,e=window.innerWidth,n=window.innerHeight;let s,r;e/n>t?(r=n,s=n*t):(s=e,r=e/t),this.renderer.setSize(s,r,!0),this.camera.aspect=t,this.camera.fov=55,this.camera.updateProjectionMatrix(),this.recomputeJoystickCenter()}recomputeJoystickCenter(){const e=window.innerWidth,n=window.innerHeight;let s,r,a,o;e/n>.5625?(r=n,s=n*.5625,a=(e-s)/2,o=0):(s=e,r=e/.5625,a=0,o=(n-r)/2),this.joystickCenterScreenX=a+s*sv,this.joystickCenterScreenY=o+r*rv}buildField(){const t=this.makeFieldTexture(),e=new be({map:t});this.fieldMat=e;const n=new ot(new jn(9.5,13),e);n.rotation.x=-Math.PI/2,n.receiveShadow=!0,this.scene.add(n);const s=new Qe;this.scene.add(s),this.fieldLinesGroup=s;const r=new Jt({color:Ze.fieldLine,transparent:!0,opacity:1}),a=new ot(new zt(Be*2,.002,.08),r);a.position.y=.014,s.add(a);const o=new ot(new Gi(.95,1.02,48),new Jt({color:Ze.fieldLine,side:qe,transparent:!0,opacity:1}));o.rotation.x=-Math.PI/2,o.position.y=.014,s.add(o);const c=new ot(new di(.1,16),new Jt({color:Ze.fieldLine,transparent:!0,opacity:1}));c.rotation.x=-Math.PI/2,c.position.y=.014,s.add(c);const l=Be,h=re,d=.08;for(const y of[-l,l]){const w=new ot(new zt(d,.002,h*2),r);w.position.set(y,.014,0),s.add(w)}for(const y of[-h,h]){const w=l-ye;{const T=new ot(new zt(w,.002,d),r);T.position.set(-l+w/2,.014,y),s.add(T);const R=new ot(new zt(w,.002,d),r);R.position.set(l-w/2,.014,y),s.add(R)}}const u=ev*2,m=nv,g=ye*2+.7,x=.55,p=m*.667,f=m*.555,M=.2;for(const y of[-h,h]){const w=Math.sign(y),T=new ot(new zt(u,.002,d),r);T.position.set(0,.014,y-w*m),s.add(T);for(const B of[-u/2,u/2]){const k=new ot(new zt(d,.002,m),r);k.position.set(B,.014,y-w*m/2),s.add(k)}const R=new ot(new zt(g,.002,d),r);R.position.set(0,.014,y-w*x),s.add(R);for(const B of[-g/2,g/2]){const k=new ot(new zt(d,.002,x),r);k.position.set(B,.014,y-w*x/2),s.add(k)}const v=y-w*p,b=new ot(new di(.07,16),new Jt({color:Ze.fieldLine,transparent:!0,opacity:1}));b.rotation.x=-Math.PI/2,b.position.set(0,.014,v),s.add(b);const q=m-p,C=Math.acos(Math.min(.99,q/f)),D=C*2,G=(w>0?-Math.PI/2:Math.PI/2)-C,V=new ot(new Gi(f-.03,f+.03,48,1,G,D),new Jt({color:Ze.fieldLine,side:qe,transparent:!0,opacity:1}));V.rotation.x=-Math.PI/2,V.position.set(0,.014,v),s.add(V)}const E=[[-l,-h,0],[l,-h,Math.PI/2],[l,h,Math.PI],[-l,h,Math.PI*1.5]];for(const[y,w,T]of E){const R=new ot(new Gi(M-.03,M+.03,24,1,T,Math.PI/2),new Jt({color:Ze.fieldLine,side:qe,transparent:!0,opacity:1}));R.rotation.x=-Math.PI/2,R.position.set(y,.014,w),s.add(R)}new wf().load(F_,y=>{this.fieldMat&&(this.fieldMat.map=y,this.fieldMat.needsUpdate=!0),this.fieldLinesGroup&&(this.fieldLinesGroup.visible=!1),this.customFieldLoaded=!0,console.log("[soccer] loaded custom field image")},void 0,()=>{console.log("[soccer] field image failed to load — using procedural texture")})}makeFieldTexture(){const e=document.createElement("canvas");e.width=e.height=512;const n=e.getContext("2d"),s=8;for(let o=0;o<s;o++)n.fillStyle=o%2===0?"#3f9536":"#4ba640",n.fillRect(0,o*512/s,512,Math.ceil(512/s));const r=["rgba(40,82,30,0.42)","rgba(36,75,28,0.38)","rgba(82,158,68,0.45)","rgba(120,200,90,0.32)","rgba(28,60,22,0.30)"];for(let o=0;o<4500;o++){n.fillStyle=r[Math.floor(Math.random()*r.length)];const c=Math.floor(Math.random()*512),l=Math.floor(Math.random()*512),h=Math.random()<.3?2:1;n.fillRect(c,l,1,h)}for(let o=0;o<s;o++){const c=o*512/s,l=512/s,h=n.createLinearGradient(0,c,0,c+l);h.addColorStop(0,"rgba(255,255,255,0.04)"),h.addColorStop(.5,"rgba(0,0,0,0)"),h.addColorStop(1,"rgba(0,0,0,0.05)"),n.fillStyle=h,n.fillRect(0,c,512,l)}return new nc(e)}buildGoals(){this.makeGoal(-re,-1,Ze.rival),this.makeGoal(re,1,Ze.player)}makeGoal(t,e,n){const s=new be({color:Ze.goalPost}),r=.07,a=1,o=qc;for(const g of[-ye,ye]){const x=new ot(new Pn(r,r,a,12),s);x.position.set(g,a/2,t),this.scene.add(x);const p=new ot(new Pn(r,r,a,12),s);p.position.set(g,a/2,t+e*o),this.scene.add(p)}const c=new ot(new Pn(r,r,ye*2+r*2,12),s);c.rotation.z=Math.PI/2,c.position.set(0,a,t),this.scene.add(c);const l=new ot(new Pn(r*.7,r*.7,ye*2,10),s);l.rotation.z=Math.PI/2,l.position.set(0,a,t+e*o),this.scene.add(l);for(const g of[-ye,ye]){const x=new ot(new Pn(r*.7,r*.7,o,10),s);x.rotation.x=Math.PI/2,x.position.set(g,a,t+e*o/2),this.scene.add(x)}const h=this.makeNetTexture(),d=new Jt({map:h,transparent:!0,opacity:.7,side:qe,depthWrite:!1}),u=new ot(new jn(ye*2,a),d);u.position.set(0,a/2,t+e*o),e<0&&(u.rotation.y=Math.PI),this.scene.add(u);for(const g of[-ye,ye]){const x=new ot(new jn(o,a),d);x.rotation.y=Math.PI/2,x.position.set(g,a/2,t+e*o/2),this.scene.add(x)}const m=new ot(new jn(ye*2,o),d);m.rotation.x=Math.PI/2,m.position.set(0,a,t+e*o/2),this.scene.add(m)}makeNetTexture(){const e=document.createElement("canvas");e.width=e.height=64;const n=e.getContext("2d");n.fillStyle="rgba(0,0,0,0)",n.fillRect(0,0,64,64),n.strokeStyle="rgba(255,255,255,0.85)",n.lineWidth=1.5;const s=8,r=64/s;for(let o=0;o<=s;o++)n.beginPath(),n.moveTo(o*r,0),n.lineTo(o*r,64),n.stroke(),n.beginPath(),n.moveTo(0,o*r),n.lineTo(64,o*r),n.stroke();return new nc(e)}buildSideFences(){const n=Be+.09,s=re,r=new Jt({color:16722474}),a=new Jt({color:2788095}),o=new Jt({color:16732240,transparent:!0,opacity:.22,depthWrite:!1}),c=new Jt({color:6995967,transparent:!0,opacity:.22,depthWrite:!1}),l=new zt(.18,.55,s),h=new zt(.18*1.7,.55*1.05,s);for(const g of[-n,n]){const x=new ot(l,r);x.position.set(g,.55/2,-s/2),this.scene.add(x);const p=new ot(h,o);p.position.copy(x.position),this.scene.add(p);const f=new ot(l,a);f.position.set(g,.55/2,s/2),this.scene.add(f);const M=new ot(h,c);M.position.copy(f.position),this.scene.add(M)}const d=Be-ye,u=new zt(d,.55,.18),m=new zt(d*1.02,.55*1.05,.18*1.7);for(const g of[-2.95,Be-d/2]){const x=new ot(u,r);x.position.set(g,.55/2,-re-.18/2),this.scene.add(x);const p=new ot(m,o);p.position.copy(x.position),this.scene.add(p);const f=new ot(u,a);f.position.set(g,.55/2,re+.18/2),this.scene.add(f);const M=new ot(m,c);M.position.copy(f.position),this.scene.add(M)}}buildKeepers(){for(const t of[-1,1]){const e=t*(re-.18),n=new ot(new zt(Sr*2,.5,.16),new be({color:t<0?16733525:5611775}));n.position.set(0,.25,e),this.scene.add(n),this.keepers.push({mesh:n,z:e,x:0,dir:t>0?1:-1})}}updateKeepers(t){for(const e of this.keepers)e.x+=e.dir*O_*t,e.x>ar?(e.x=ar,e.dir=-1):e.x<-ar&&(e.x=-ar,e.dir=1),e.mesh.position.x=e.x}collideKeepers(t){for(const e of this.keepers){if(!(e.z<0&&t.vel.z<0||e.z>0&&t.vel.z>0))continue;const s=t.mesh.position.z-e.z;Math.abs(s)>.16+ae||Math.abs(t.mesh.position.x-e.x)>Sr+ae||(t.mesh.position.z=e.z+(e.z<0?1:-1)*(.16+ae+.01),t.vel.z*=-.88,t.vel.x+=(t.mesh.position.x-e.x)*4,t.curve=0,t.squashT=Math.max(t.squashT,.7),this.shakeAmount=Math.max(this.shakeAmount,.18),this.playSfx("sfx_save.mp3",.6))}}spawnObstaclePair(){this.clearObstacles();const t=(Math.random()-.5)*(Be*1.4),e=1.3+Math.random()*(re-2.6),n=(s,r)=>{const a=new ot(new zt(or*2,.34,lr*2),new be({color:16042050}));a.position.set(s,.17,r),a.castShadow=!0,a.receiveShadow=!0,this.scene.add(a),this.obstacles.push(a),this.spawnFxBurst(s,.3,r,{count:6,colors:[16765498,16777215],speed:1.6,up:1.4,gravity:6,life:.4,size:.07})};n(t,e),n(-t,-e)}clearObstacles(){var t,e;for(const n of this.obstacles)this.scene.remove(n),n.geometry.dispose(),(e=(t=n.material).dispose)==null||e.call(t);this.obstacles=[]}collideObstacles(t){const e=t.mesh.position.x,n=t.mesh.position.z;for(const s of this.obstacles){const r=e-s.position.x,a=n-s.position.z,o=or+ae-Math.abs(r),c=lr+ae-Math.abs(a);o<=0||c<=0||(o<c?(t.mesh.position.x=s.position.x+Math.sign(r||1)*(or+ae),Math.sign(r||1)!==Math.sign(t.vel.x)&&(t.vel.x*=-.88)):(t.mesh.position.z=s.position.z+Math.sign(a||1)*(lr+ae),Math.sign(a||1)!==Math.sign(t.vel.z)&&(t.vel.z*=-.88)),t.squashT=Math.max(t.squashT,.5),this.shakeAmount=Math.max(this.shakeAmount,.08))}}collideCombatantObstacles(t){const e=li,n=[];for(const s of this.obstacles)n.push({x:s.position.x,z:s.position.z,hx:or,hz:lr});if(!this.training)for(const s of this.keepers)n.push({x:s.x,z:s.z,hx:Sr,hz:.08});if(n.length!==0)for(const s of n){const r=t.pos.x-s.x,a=t.pos.z-s.z,o=s.hx+e-Math.abs(r),c=s.hz+e-Math.abs(a);o<=0||c<=0||(o<c?t.pos.x=s.x+Math.sign(r||1)*(s.hx+e):t.pos.z=s.z+Math.sign(a||1)*(s.hz+e),t.group.position.copy(t.pos))}}enableCastShadow(t){t.traverse(e=>{e.isMesh&&(e.castShadow=!0)})}buildCrowd(){const t=new Qe,e=this.crowdSeats,n=(u,m)=>u+Math.random()*(m-u),s=[16730698,14036783,16747130,16765120,15979176,16777215,9050144],r=[3833599,2777040,8040703,13164799,15979176,16777215,1191258],a=[16765498,4121984,15979176,16777215,16747130,8040703,11571455],o=(u,m,g,x,p,f)=>{for(let y=0;y<g;y++){const w=u+m*y,T=.35+y*.34;for(let R=x;R<=p;R+=.46)Math.random()<.12||e.push({x:R+n(-.07,.07),y:T+n(-.03,.03),z:w+n(-.06,.06),phase:Math.random()*Math.PI*2,speed:n(1.6,3.2),s:n(.85,1.15)})}const M=Math.abs(m)*g+.5,E=new ot(new zt(p-x+1.2,.18,M),new be({color:1054758}));return E.position.set((x+p)/2,.09,u+m*(g-1)/2),t.add(E),f};let c=0;const l=[],h=u=>{l.push({from:c,to:e.length,palette:u}),c=e.length};o(-re-1.1,-.52,3,-4.4,4.4,s),h(s),o(re+1.1,.52,3,-4.4,4.4,r),h(r);for(const u of[-5.35,Be+.85]){for(let g=0;g<2;g++){const x=u+(u>0?g*.5:-g*.5),p=.35+g*.34;for(let f=-4.6;f<=4.6;f+=.5)Math.random()<.15||e.push({x:x+n(-.06,.06),y:p,z:f+n(-.07,.07),phase:Math.random()*Math.PI*2,speed:n(1.6,3.2),s:n(.85,1.15)})}const m=new ot(new zt(1.3,.18,re*2-.6),new be({color:1054758}));m.position.set(u+(u>0?.25:-.25),.09,0),t.add(m),h(a)}const d=new df(new zt(.3,.44,.3),new be({color:16777215}),e.length);for(const u of l)for(let m=u.from;m<u.to;m++){const g=u.palette[Math.floor(Math.random()*u.palette.length)];d.setColorAt(m,new Kt(g))}d.instanceColor&&(d.instanceColor.needsUpdate=!0),t.add(d),this.crowdMesh=d,this.crowdGroup=t,this.scene.add(t),this.updateCrowd(0)}updateCrowd(t){if(!this.crowdMesh)return;this.crowdTime+=t,this.crowdExcitement>0&&(this.crowdExcitement=Math.max(0,this.crowdExcitement-t*.45));const e=this.crowdExcitement,n=this.crowdTime,s=this.crowdTmpMat;for(let r=0;r<this.crowdSeats.length;r++){const a=this.crowdSeats[r],o=Math.abs(Math.sin(n*a.speed+a.phase))*(.035+e*.42*a.s);s.makeScale(a.s,a.s,a.s),s.setPosition(a.x,a.y+o,a.z),this.crowdMesh.setMatrixAt(r,s)}this.crowdMesh.instanceMatrix.needsUpdate=!0}buildLobbyCharacter(){const t=new Qe,e=12854831,n=15979176,s=3809296,r=16777215,a=1118481,o=16777215,c=f=>new be({color:f}),l=(f,M,E,y,w,T,R)=>{const v=new ot(new zt(f,M,E),c(y));return v.position.set(w,T,R),t.add(v),v};for(const f of[-.18,.18])l(.22,.32,.22,e,f,.16,0),l(.22,.22,.22,n,f,-.1,0),l(.24,.1,.24,o,f,-.26,0),l(.26,.1,.36,a,f,-.36,.06);l(.65,.55,.34,e,0,.65,0),l(.5,.08,.36,r,0,.85,0),l(.06,.16,.02,r,.08,.6,.18);for(const f of[-.43,.43])l(.2,.4,.22,e,f,.62,0),l(.2,.2,.22,n,f,.32,0);l(.5,.46,.5,n,0,1.2,0),l(.56,.14,.56,s,0,1.5,0),l(.56,.18,.1,s,0,1.36,-.23),l(.1,.05,.02,a,-.12,1.2,.26),l(.1,.05,.02,a,.12,1.2,.26);const h=.18,d=.22,u=-.23,m=.46,g=th(h);g.position.set(d,u,m),t.add(g);const x=new ot(new Pn(.95,1,.15,32),c(1452106));x.position.set(0,-.49,0),t.add(x);const p=new ot(new Gi(.85,.95,32),new Jt({color:6009087,side:qe,transparent:!0,opacity:.95}));p.rotation.x=-Math.PI/2,p.position.set(0,-.41,0),t.add(p),t.visible=!1,t.position.set(0,.45,0),this.scene.add(t),this.lobbyGroup=t}makeCube(t,e){const n=new Qe;n.rotation.order="YXZ";const s=t?Ze.player:Ze.rival,r=t?1723801:9312280,a=15979176,o=2759184,c=t?1191258:4853262,l=1710618,h=-1,d=new ot(new Pn(.55,.55,.005,18),new Jt({color:0,transparent:!0,opacity:.42}));d.position.y=.003,n.add(d);for(const q of[-1,1]){const C=new ot(new zt(.22,.08,.3),new be({color:l}));C.position.set(q*.14,.04,h*.04),n.add(C)}for(const q of[-1,1]){const C=new ot(new zt(.2,.22,.22),new be({color:c}));C.position.set(q*.13,.18,0),n.add(C)}const u=new ot(new zt(.62,.45,.5),new be({color:s}));u.position.y=.52,n.add(u);const m=new ot(new zt(.5,.22,.01),new Jt({color:16777215}));m.position.set(0,.52,h*(.25+.001)),n.add(m);const g=new ot(new zt(.05,.16,.012),new Jt({color:r}));g.position.set(0,.52,h*(.255+.005)),n.add(g);for(const q of[-1,1]){const C=new ot(new zt(.13,.32,.18),new be({color:s}));C.position.set(q*(.31+.07),.55,0),n.add(C);const D=new ot(new zt(.14,.12,.18),new be({color:a}));D.position.set(q*(.31+.07),.32,0),n.add(D)}const x=new ot(new zt(.5,.42,.46),new be({color:a}));x.position.y=.95,n.add(x);const p=new ot(new zt(.52,.16,.5),new be({color:o}));p.position.set(0,1.18,h*-.02),n.add(p);const f=new ot(new zt(.5,.22,.1),new be({color:o}));f.position.set(0,1,h*-.2),n.add(f);for(const q of[-.1,.1]){const C=new ot(new zt(.09,.1,.02),new Jt({color:16777215}));C.position.set(q,.97,h*(.23+.001)),n.add(C);const D=new ot(new zt(.05,.06,.025),new Jt({color:1052688}));D.position.set(q,.97,h*(.23+.012)),n.add(D)}const M=new ot(new zt(.14,.025,.02),new Jt({color:2759184}));M.position.set(0,.84,h*(.23+.005)),n.add(M);const E=new Qe,y=new ot(new As(.18,16,12),new be({color:Ze.ball}));E.add(y);const w=new Jt({color:Ze.ballDark});for(let q=0;q<5;q++){const C=new ot(new As(.058,8,6),w),D=Math.acos(1-2*(q+.5)/5),F=Math.PI*(1+Math.sqrt(5))*q;C.position.set(.15*Math.cos(F)*Math.sin(D),.15*Math.sin(F)*Math.sin(D),.15*Math.cos(D)),E.add(C)}const T=new ot(new di(.18,12),new Jt({color:0,transparent:!0,opacity:.35}));T.rotation.x=-Math.PI/2,T.position.y=-.17,E.add(T),E.position.set(0,.18,h*.6),E.visible=!1,n.add(E);const R=new ot(new fi(.65,.08,8,32),new Jt({color:t?4240383:16732240,transparent:!0,opacity:.85}));R.rotation.x=-Math.PI/2,R.position.y=.02,R.visible=!1,n.add(R);const v=new ot(new fi(.78,.04,6,28),new Jt({color:8452351,transparent:!0,opacity:.9}));v.rotation.x=-Math.PI/2,v.position.y=.04,v.visible=!1,n.add(v);const b=new ot(new fi(.7,.12,8,32),new Jt({color:16765498,transparent:!0,opacity:.95}));return b.rotation.x=-Math.PI/2,b.position.y=.06,b.visible=!1,n.add(b),n.rotation.y=t?0:Math.PI,n.position.copy(e),n.scale.setScalar(hi),this.scene.add(n),{group:n,body:u,pos:e.clone(),isPlayer:t,yaw:t?0:Math.PI,indicatorBall:E,ballCooldown:0,bobTime:0,lastPos:e.clone(),possessRing:R,shieldReadyRing:v,chargeRing:b}}setupInput(t){const e=a=>a.pointerType==="touch"||a.pointerType==="pen",n=a=>{var c,l,h;const o=a.target;if(!((c=o==null?void 0:o.classList)!=null&&c.contains("pe"))){if(a.preventDefault(),this.state==="MENU"){this.lobbyDragging=!0,this.lobbyDragLastX=a.clientX,this.lobbyDragLastSampleTime=performance.now(),this.lobbyAngularVelocity=0,this.lobbyIdleSpinTimer=0,(l=t.setPointerCapture)==null||l.call(t,a.pointerId),this.audioCtx&&this.audioCtx.state==="suspended"&&this.audioCtx.resume().catch(()=>{}),this.bgSource||this.playBgLoop("sfx_lofi_lobby.mp3",.08,1500);return}if(this.isMobile&&e(a)){if(this.touchPointerId!==-1)return;const d=performance.now();this.touchPointerId=a.pointerId,this.touchStartTime=d,this.touchStartX=a.clientX,this.touchStartY=a.clientY,this.touchCurrentX=a.clientX,this.touchCurrentY=a.clientY,this.touchLastSampleTime=d,this.touchLastSampleX=a.clientX,this.touchLastSampleY=a.clientY,this.touchVelX=0,this.touchVelY=0,this.touchFirstMoveTime=0,this.swipePath=[{x:a.clientX,y:a.clientY,t:d}],this.updateJoystickViz(),(h=t.setPointerCapture)==null||h.call(t,a.pointerId)}this.hintEl.classList.add("hidden"),this.mobileHintsEl.classList.add("hidden"),this.audioCtx&&this.audioCtx.state==="suspended"&&this.audioCtx.resume().catch(()=>{})}},s=a=>{if(this.mouseScreenX=a.clientX,this.mouseScreenY=a.clientY,this.state==="MENU"&&this.lobbyDragging&&this.lobbyGroup){const M=a.clientX-this.lobbyDragLastX;this.lobbyDragLastX=a.clientX;const y=M*.007;this.lobbyGroup.rotation.y+=y;const w=performance.now(),T=Math.max(.001,(w-this.lobbyDragLastSampleTime)/1e3),R=y/T,v=Math.min(1,T/.08);let b=this.lobbyAngularVelocity*(1-v)+R*v;const q=6;b=Math.max(-q,Math.min(q,b)),this.lobbyAngularVelocity=b,this.lobbyDragLastSampleTime=w,this.lobbyIdleSpinTimer=0;return}if(a.pointerId!==this.touchPointerId)return;const o=performance.now(),c=a.clientX-this.touchLastSampleX,l=a.clientY-this.touchLastSampleY,h=Math.max(.001,(o-this.touchLastSampleTime)/1e3),d=c/h,u=l/h,m=Math.min(1,h/.08);this.touchVelX=this.touchVelX*(1-m)+d*m,this.touchVelY=this.touchVelY*(1-m)+u*m,this.touchLastSampleTime=o,this.touchLastSampleX=a.clientX,this.touchLastSampleY=a.clientY,this.touchCurrentX=a.clientX,this.touchCurrentY=a.clientY,this.swipePath.push({x:a.clientX,y:a.clientY,t:o}),this.swipePath.length>24&&this.swipePath.shift(),this.updateJoystickViz();const g=a.clientX-this.touchStartX,x=a.clientY-this.touchStartY,p=Math.sqrt(g*g+x*x);this.touchFirstMoveTime===0&&p>=wa&&(this.touchFirstMoveTime=o,this.shieldHoldTimeout!==0&&(clearTimeout(this.shieldHoldTimeout),this.shieldHoldTimeout=0),this.blockTimer>0&&this.shieldHoldActive&&this.endShield()),this.touchFirstMoveTime>0&&this.touchFirstMoveTime-this.touchStartTime>=W_&&p>=wa?(this.chargeOriginX=this.touchStartX,this.chargeOriginY=this.touchStartY,this.chargeCurrentX=this.touchCurrentX,this.chargeCurrentY=this.touchCurrentY,this.charging=!0,this.updateSlingViz()):this.charging&&(this.charging=!1,this.updateSlingViz())},r=a=>{var M;if(this.state==="MENU"&&this.lobbyDragging){this.lobbyDragging=!1,(M=t.releasePointerCapture)==null||M.call(t,a.pointerId);return}if(a.pointerId!==this.touchPointerId||(this.touchPointerId=-1,this.updateJoystickViz(),this.charging&&(this.charging=!1,this.updateSlingViz()),this.state!=="PLAY"&&this.state!=="INTRO"))return;const o=Math.sqrt(this.touchVelX**2+this.touchVelY**2),c=this.touchCurrentX-this.touchStartX,l=this.touchCurrentY-this.touchStartY,h=Math.sqrt(c*c+l*l),d=this.balls[0];if(this.chargeKickT>=Y_&&d&&d.possessor===this.player){let E,y;o>=ps?(E=this.touchVelX/o,y=this.touchVelY/o):this.lastMoveDirX!==0||this.lastMoveDirZ!==0?(E=this.lastMoveDirX,y=this.lastMoveDirZ):(E=-Math.sin(this.player.yaw),y=-Math.cos(this.player.yaw)),this.fireChargedKick(E,y,this.chargeKickT,this.computeSwipeCurve());return}if(this.chargeKickT=0,h<wa&&o<ps){this.player&&this.player.pos.z>=Ra&&this.blockCooldown<=0&&this.activateBlock();return}if(o<ps)return;const u=this.touchVelX/o,m=this.touchVelY/o,g=Math.min(1,(o-ps)/(H_-ps)),x=g*g,p=kc+x*(Z_-kc),f=this.computeSwipeCurve();this.firePlayerBall(u,m,p,f),p>.85&&(this.shakeAmount+=.18)};t.addEventListener("pointerdown",n),t.addEventListener("pointermove",s),t.addEventListener("pointerup",r),t.addEventListener("pointercancel",r)}startDribble(t,e,n=1){const s=Math.max(0,Math.min(1,n));this.dribbleTimer=Oc+s*(Ca-Oc),this.dribbleTailMax=Bc+s*(cr-Bc),this.dribbleTailTimer=0,this.dribbleDirX=t,this.dribbleDirZ=e,this.player.yaw=pr(Math.atan2(t,e)+Math.PI)}startSteal(t,e){this.dribbleTimer=Ca,this.dribbleTailMax=cr,this.dribbleTailTimer=0,this.dribbleDirX=t,this.dribbleDirZ=e,this.stealOnlyTimer=Ca,this.player.yaw=pr(Math.atan2(t,e)+Math.PI)}tryBlock(){this.player&&(this.blockCooldown>0||this.player.pos.z<Ra||this.activateBlock())}ensureBlockMesh(){if(this.blockMesh)return;const t=new Qe,e=.7/hi,n=.1/hi,s=new ot(new fi(e,n,10,48),new Jt({color:4253951,transparent:!0,opacity:1}));s.rotation.x=-Math.PI/2,s.position.set(0,.7/hi,0),t.add(s);const r=new ot(new di(e*.95,32),new Jt({color:8452351,transparent:!0,opacity:.35,side:qe}));r.rotation.x=-Math.PI/2,r.position.set(0,.7/hi,0),t.add(r);const a=new ot(new fi(e*1.15,n*.5,8,48),new Jt({color:16777215,transparent:!0,opacity:.6}));a.rotation.x=-Math.PI/2,a.position.set(0,.7/hi,0),t.add(a),t.visible=!1,this.blockMesh=t,this.player.group.add(t)}activateBlock(){this.ensureBlockMesh(),this.blockTimer=ur,this.blockCooldown=ur+j_,this.shieldHoldActive=!0,this.blockMesh.visible=!0,this.blockMesh.scale.setScalar(.5),this.shakeAmount+=.08,this.playSfx("sfx_save.mp3",.4)}endShield(){this.shieldHoldActive=!1,this.blockTimer=0,this.blockMesh&&(this.blockMesh.visible=!1)}updateBlock(t){if(this.blockCooldown>0&&(this.blockCooldown-=t),this.blockTimer<=0){this.blockMesh&&(this.blockMesh.visible=!1);return}if(this.blockTimer-=t,this.blockMesh){const e=1-this.blockTimer/ur;let n;e<.08?n=.5+e/.08*.55:n=1+Math.sin(e*Math.PI*4)*.02,this.blockMesh.scale.setScalar(n);const s=this.blockMesh.children.map(a=>a.material),r=this.blockTimer/ur;s[0].opacity=1*r,s[1].opacity=.35*r,s[2].opacity=.6*r}if(this.blockTimer>0){const e=this.player.pos.x,n=this.player.pos.z;for(const s of this.balls){if(s.possessor||s.ownerIsPlayer)continue;const r=s.mesh.position.x-e,a=s.mesh.position.z-n,o=r*r+a*a;if(o>dr*dr)continue;const c=Math.sqrt(o)||.001,l=r/c,h=a/c,d=s.vel.x*l+s.vel.z*h;d<0&&(s.vel.x-=2*d*l,s.vel.z-=2*d*h),s.vel.x=s.vel.x*.65+l*5,s.vel.z=s.vel.z*.65+h*5,s.mesh.position.x=e+l*(dr+.15),s.mesh.position.z=n+h*(dr+.15),s.kickImmunityTimer=.25,s.ownerIsPlayer=!0,this.shakeAmount=Math.max(this.shakeAmount,.25),this.playSfx("sfx_hit.mp3",.7);break}}}updateRings(t){const e=this.balls[0],n=e&&e.possessor===this.player,s=e&&e.possessor===this.rival;if(this.player.possessRing.visible=!!n,this.rival.possessRing.visible=!!s,n||s){const c=this.totalTime*3.5,l=1+Math.sin(c)*.08;(n?this.player:this.rival).possessRing.scale.setScalar(l)}let r=!1;if(this.blockCooldown<=0&&this.blockTimer<=0&&this.player.pos.z>=Ra&&(r=this.balls.some(c=>{if(c.possessor||c.ownerIsPlayer||c.vel.z<=.5||c.mesh.position.z>=this.player.pos.z)return!1;const l=c.mesh.position.x-this.player.pos.x,h=c.mesh.position.z-this.player.pos.z;return l*l+h*h<zc*zc})),this.player.shieldReadyRing.visible=r,r){const c=this.totalTime*8,l=1+Math.sin(c)*.18;this.player.shieldReadyRing.scale.setScalar(l);const h=this.player.shieldReadyRing.material;h.opacity=.5+Math.sin(c)*.4}if(this.state==="PLAY"&&n&&this.touchPointerId!==-1){const c=this.touchCurrentX-this.touchStartX,l=this.touchCurrentY-this.touchStartY,h=Math.sqrt(c*c+l*l);(h<Vc||this.chargeKickT>.001)&&h<Vc&&(this.chargeKickT=Math.min(1,this.chargeKickT+t/X_))}else this.touchPointerId;const a=this.player.chargeRing,o=a.material;if(this.chargeKickT>.03&&n){a.visible=!0;const c=this.chargeKickT;o.color.setRGB(1,.82-.67*c,.23-.18*c);const l=1+Math.sin(this.totalTime*(8+c*10))*(.06+c*.1);a.scale.setScalar((.7+c*.5)*l),o.opacity=.7+.3*c,c>.6&&(this.chargeEmberTimer-=t,this.chargeEmberTimer<=0&&(this.spawnFxBurst(this.player.pos.x,.1,this.player.pos.z,{count:2,colors:[16747546,16765498,16734746],speed:1,up:1.8,gravity:-1,life:.4,size:.07,spread:.5}),this.chargeEmberTimer=.06))}else a.visible=!1}fireChargedKick(t,e,n,s=0){const r=this.balls.find(a=>a.possessor===this.player);return r?(this.training&&this.trainStep===4&&this.advanceTraining(5),this.firePlayerBall(t,e,1,s,K_*n),r.hotTimer=1.4+n*.8,r.trailSpawnTimer=0,r.squashT=1,this.shakeAmount=Math.max(this.shakeAmount,.5+n*.4),this.spawnFxBurst(r.mesh.position.x,ae,r.mesh.position.z,{count:22,colors:[16777215,16765498,16747546,16726554],speed:4.2,up:3.2,gravity:5,life:.6,size:.1}),this.playSfx("sfx_kick.mp3",.9),this.chargeKickT=0,!0):(this.chargeKickT=0,!1)}updateJoystickViz(){if(!this.joystickBase||!this.joystickThumb)return;if(this.touchPointerId===-1){this.joystickBase.classList.remove("active","sprint"),this.joystickThumb.classList.remove("active","sprint");return}this.joystickBase.style.left=`${this.touchStartX}px`,this.joystickBase.style.top=`${this.touchStartY}px`,this.joystickBase.classList.add("active");const t=this.touchCurrentX-this.touchStartX,e=this.touchCurrentY-this.touchStartY,n=Math.sqrt(t*t+e*e),s=n>ms,r=Math.min(n,jc);if(n<.001)this.joystickThumb.style.left=`${this.touchStartX}px`,this.joystickThumb.style.top=`${this.touchStartY}px`;else{const a=this.touchStartX+t/n*r,o=this.touchStartY+e/n*r;this.joystickThumb.style.left=`${a}px`,this.joystickThumb.style.top=`${o}px`}this.joystickThumb.classList.add("active"),this.joystickThumb.classList.toggle("sprint",s),this.joystickBase.classList.toggle("sprint",s)}setupKeyboard(){let t=!1;const e=(n,s)=>{const r=n.key.toLowerCase();["w","a","s","d","arrowup","arrowdown","arrowleft","arrowright"].includes(r)&&(this.keys[r]=s,n.preventDefault()),(r===" "||n.code==="Space")&&(n.preventDefault(),s&&!t?(t=!0,(this.lastMoveDirX!==0||this.lastMoveDirZ!==0)&&this.startDribble(this.lastMoveDirX,this.lastMoveDirZ)):s||(t=!1)),s&&this.audioCtx&&this.audioCtx.state==="suspended"&&this.audioCtx.resume().catch(()=>{})};window.addEventListener("keydown",n=>e(n,!0)),window.addEventListener("keyup",n=>e(n,!1))}updateSlingViz(){if(!this.charging){this.slingLine.classList.remove("active"),this.slingDot.classList.remove("active");return}const t=this.chargeCurrentX-this.chargeOriginX,e=this.chargeCurrentY-this.chargeOriginY,n=Math.sqrt(t*t+e*e),s=Math.min(n,B_),r=Math.atan2(e,t);this.slingLine.style.left=`${this.chargeOriginX}px`,this.slingLine.style.top=`${this.chargeOriginY-2}px`,this.slingLine.style.width=`${s}px`,this.slingLine.style.transform=`rotate(${r}rad)`,this.slingLine.classList.add("active");const a=this.chargeOriginX+Math.cos(r)*s,o=this.chargeOriginY+Math.sin(r)*s;this.slingDot.style.left=`${a}px`,this.slingDot.style.top=`${o}px`,this.slingDot.classList.add("active")}updateAim(){if(this.mouseScreenX<0)return;const e=this.renderer.domElement.getBoundingClientRect(),n=(this.mouseScreenX-e.left)/e.width*2-1,s=-((this.mouseScreenY-e.top)/e.height)*2+1;this.mouseNDC.set(n,s),this.raycaster.setFromCamera(this.mouseNDC,this.camera);const r=this.raycaster.ray;if(Math.abs(r.direction.y)>.001){const a=-r.origin.y/r.direction.y;a>0&&this.aimWorld.copy(r.origin).addScaledVector(r.direction,a)}}computeSwipeCurve(){const t=this.swipePath;if(t.length<4)return 0;const e=t[t.length-1].t,n=t.filter(l=>e-l.t<=260);if(n.length<4)return 0;let s=0,r=0,a=0,o=!1;for(let l=1;l<n.length;l++){let h=n[l].x-n[l-1].x,d=n[l].y-n[l-1].y;const u=Math.hypot(h,d);if(!(u<1.5)){if(h/=u,d/=u,o){const m=r*d-a*h,g=r*h+a*d;s+=Math.atan2(m,g)}r=h,a=d,o=!0}}const c=Math.max(-1,Math.min(1,s/1.1));return Math.abs(c)<.14?0:c}firePlayerBall(t,e,n,s=0,r=0){if(this.stealOnlyTimer>0)return;const a=this.balls.find(l=>l.possessor===this.player);if(!a)return;const o=new N(t,0,e).normalize(),c=(fr+(Gc-fr)*n)*(1+r);a.possessor=null,a.ownerIsPlayer=!0,a.vel.copy(o).multiplyScalar(c),a.curve=s,a.kickImmunityTimer=Xc,a.mesh.position.x=this.player.pos.x+o.x*.7,a.mesh.position.z=this.player.pos.z+o.z*.7,a.mesh.position.y=ae,a.squashT=.5+n*.5,n>=.8&&(a.hotTimer=.5+n*.4,a.trailSpawnTimer=0,this.spawnFxBurst(a.mesh.position.x,ae,a.mesh.position.z,{count:8,colors:[16777215,16765498,16747546],speed:2.2,up:1.8,gravity:6,life:.4,size:.07})),this.shakeAmount=.12+n*.18,this.playSfx("sfx_shoot.mp3",.5),this.player.yaw=pr(Math.atan2(o.x,o.z)+Math.PI),this.playerHasFired||(this.playerHasFired=!0,this.rivalShootTimer=_v)}fireRivalBall(){if(!this.player)return;const t=this.balls.find(d=>d.possessor===this.rival);if(!t)return;const e=1-this.rivalProfile.inaccuracy/.55,n=(ye-.25)*(.45+.5*e),s=this.player.pos.x>=0?-n:n,r=re-.2,a=new N(s,0,r).sub(this.rival.pos).setY(0).normalize(),o=Math.atan2(a.x,a.z)+(Math.random()-.5)*this.rivalProfile.inaccuracy,c=new N(Math.sin(o),0,Math.cos(o)),l=.55+Math.random()*.35,h=fr+(Gc-fr)*l;t.possessor=null,t.ownerIsPlayer=!1,t.vel.copy(c).multiplyScalar(h),t.curve=0,t.kickImmunityTimer=Xc,t.squashT=.5+l*.5,l>=.8&&(t.hotTimer=.5+l*.4,t.trailSpawnTimer=0),t.mesh.position.x=this.rival.pos.x+c.x*.7,t.mesh.position.z=this.rival.pos.z+c.z*.7,t.mesh.position.y=ae,this.rival.yaw=Math.atan2(c.x,c.z)+Math.PI}spawnBall(t,e,n){const s=new Qe,r=th(ae);this.enableCastShadow(r),s.add(r);const a=new ot(new di(ae*1,12),new Jt({color:0,transparent:!0,opacity:.3}));a.rotation.x=-Math.PI/2,a.position.y=-ae+.005,s.add(a),s.position.copy(t),this.scene.add(s),this.balls.push({mesh:s,vel:e.clone(),ownerIsPlayer:n,possessor:null,kickImmunityTimer:0,ttlAfterCross:0,parkedInNet:!1,stuckTime:0,trail:[],trailSpawnTimer:0,hotTimer:0,squashT:0,curve:0})}countBalls(t){let e=0;for(const n of this.balls)n.ownerIsPlayer===t&&e++;return e}flashBallLimitHint(){this.state==="PLAY"&&(this.showBanner("MAX 3 — RECOVER IN YOUR AREA","danger"),this.shakeAmount=Math.max(this.shakeAmount,.15))}updateBalls(t){for(let e=this.balls.length-1;e>=0;e--){const n=this.balls[e];if(n.parkedInNet){n.ttlAfterCross+=t;continue}if(n.kickImmunityTimer>0&&(n.kickImmunityTimer-=t,n.kickImmunityTimer<0&&(n.kickImmunityTimer=0)),n.squashT>0){n.squashT=Math.max(0,n.squashT-t*5);const o=1+.32*n.squashT;n.mesh.scale.set(o,o,o)}else n.mesh.scale.x!==1&&n.mesh.scale.set(1,1,1);if(n.possessor){const o=n.possessor,c=-Math.sin(o.yaw),l=-Math.cos(o.yaw);let h=0;if(o===this.player){if(this.dribbleTimer>0)h=Ia;else if(this.dribbleTailTimer>0){const w=this.dribbleTailMax>0?this.dribbleTailMax:cr,T=this.dribbleTailTimer/w;h=Ia*T}}else this.rivalDribbleTimer>0&&(h=Ia*.7);const d=$_+h,u=o.pos.x+c*d,m=o.pos.z+l*d,g=1-Math.exp(-16*t),x=n.mesh.position.x,p=n.mesh.position.z;n.mesh.position.x+=(u-x)*g,n.mesh.position.z+=(m-p)*g,n.mesh.position.y=ae;const f=re-ae;n.mesh.position.z=pn(n.mesh.position.z,-f,f);const M=n.mesh.position.x-x,E=n.mesh.position.z-p,y=Math.sqrt(M*M+E*E);if(y>.001){const w=new N(-E,0,M).normalize(),T=y/ae;n.mesh.rotateOnWorldAxis(w,T)}n.vel.set(0,0,0),n.curve=0,n.stuckTime=0;continue}{for(const o of[this.player,this.rival]){if(n.kickImmunityTimer>0&&o.isPlayer===n.ownerIsPlayer)continue;const c=o.pos.x-n.mesh.position.x,l=o.pos.z-n.mesh.position.z;if(!(c*c+l*l>=Wc*Wc)){n.possessor=o,n.ownerIsPlayer=o.isPlayer,n.vel.set(0,0,0),this.onBallPickedUp(n,o);break}}if(n.possessor)continue}if(n.curve!==0){const o=Math.sqrt(n.vel.x*n.vel.x+n.vel.z*n.vel.z);if(o>.5){const c=-n.vel.z/o,l=n.vel.x/o,h=n.curve*J_*o*t;n.vel.x+=c*h,n.vel.z+=l*h}n.curve*=Math.pow(.22,t),Math.abs(n.curve)<.02&&(n.curve=0)}n.mesh.position.x+=n.vel.x*t,n.mesh.position.z+=n.vel.z*t,this.training||this.collideKeepers(n),this.collideObstacles(n);const s=Math.sqrt(n.vel.x*n.vel.x+n.vel.z*n.vel.z),r=new N(-n.vel.z,0,n.vel.x).normalize();s>.1&&n.mesh.rotateOnWorldAxis(r,s/ae*t),n.hotTimer>0&&(n.hotTimer-=t,n.trailSpawnTimer-=t,s>5&&n.trailSpawnTimer<=0&&(this.spawnFxBurst(n.mesh.position.x,n.mesh.position.y,n.mesh.position.z,{count:1,colors:[16747546,16765498,16734746],speed:.3,up:.4,gravity:-.5,life:.3,size:.09,spread:.4}),n.trailSpawnTimer=.022)),n.mesh.position.x>Be-ae&&n.vel.x>0?(n.mesh.position.x=Be-ae,n.vel.x*=-.88,this.shakeAmount=Math.max(this.shakeAmount,.08),n.squashT=Math.max(n.squashT,.6)):n.mesh.position.x<-Be+ae&&n.vel.x<0&&(n.mesh.position.x=-Be+ae,n.vel.x*=-.88,this.shakeAmount=Math.max(this.shakeAmount,.08),n.squashT=Math.max(n.squashT,.6));const a=n.mesh.position.z;if(Math.abs(a)>re-ae){const o=a>0?1:-1;if(Math.abs(n.mesh.position.x)<=ye-ae){n.ttlAfterCross===0&&(n.ttlAfterCross=.001,n.parkedInNet=!0,n.mesh.position.x=pn(n.mesh.position.x+(Math.random()-.5)*.4,-ye+.2,ye-.2),n.mesh.position.z=o*(re+qc*.55),n.vel.set(0,0,0),o===-1?this.scoreGoal(!0):this.scoreGoal(!1));continue}else o===1&&n.vel.z>0?(n.mesh.position.z=re-ae,n.vel.z*=-.88,this.shakeAmount=Math.max(this.shakeAmount,.08)):o===-1&&n.vel.z<0&&(n.mesh.position.z=-re+ae,n.vel.z*=-.88,this.shakeAmount=Math.max(this.shakeAmount,.08))}if(Math.abs(n.mesh.position.x)>Be+1.5||Math.abs(n.mesh.position.z)>re+2.5){this.removeBall(e);continue}if(n.vel.x*=1-Hc*t,n.vel.z*=1-Hc*t,Math.sqrt(n.vel.x*n.vel.x+n.vel.z*n.vel.z)<Q_*.6&&n.kickImmunityTimer<=0){let c=null,l=1/0;for(const h of[this.player,this.rival]){const d=h.pos.x-n.mesh.position.x,u=h.pos.z-n.mesh.position.z,m=Math.sqrt(d*d+u*u);m<Yc&&m<l&&(c=h,l=m)}if(c&&l>.001){const h=(c.pos.x-n.mesh.position.x)/l,d=(c.pos.z-n.mesh.position.z)/l,u=1-l/Yc;n.vel.x+=h*Kc*u*t,n.vel.z+=d*Kc*u*t}}n.stuckTime=0}}onBallPickedUp(t,e){this.shakeAmount=Math.max(this.shakeAmount,tv),e.isPlayer&&this.playSfx("sfx_hit.mp3",.4)}updateIndicatorBall(t,e){}removeBall(t){var n,s;const e=this.balls[t];this.scene.remove(e.mesh);for(const r of e.trail)this.scene.remove(r.mesh),r.mesh.geometry.dispose(),(s=(n=r.mesh.material).dispose)==null||s.call(n);this.balls.splice(t,1)}clearBalls(){for(let t=this.balls.length-1;t>=0;t--)this.removeBall(t)}scoreGoal(t){if(this.training){this.trainingGoal(t);return}t?(this.playerGoals++,this.flashFill(this.bbLeftFill),this.popScore(this.bbLeftNum),this.showBanner("GOAL!","goal")):(this.rivalGoals++,this.flashFill(this.bbRightFill),this.popScore(this.bbRightNum),this.showBanner("RIVAL GOAL","danger")),this.shakeAmount=.6;const e=rr[Math.floor(Math.random()*rr.length)];this.playSfx(e,t?.85:.55),this.updateScoreboard(),this.spawnObstaclePair(),this.celebrant=t?this.player:this.rival,this.celebrateT=0,this.crowdExcitement=1;const n=document.getElementById("goal-flash");n&&(n.classList.remove("flash"),n.offsetWidth,n.classList.add("flash"));const s=t?-re:re,r=t?[3833599,6271231,16765498,16777215]:[16726586,16743034,16765498,16777215];if(this.spawnFxBurst(0,.5,s,{count:30,colors:r,speed:4.5,up:4.5,gravity:7,life:1.1,size:.1}),this.inOvertime){this.matchTimeLeft=0,this.updateTimerDisplay(),this.stopBgLoop(600),this.playSfx("sfx_whistle.mp3",.45),this.spawnFxBurst(0,.8,s,{count:30,colors:r,speed:5.5,up:5.5,gravity:6,life:1.4,size:.12}),this.transition(t?"WIN":"LOSS");return}this.transition("GOAL_PAUSE"),this.timeScale=.25}enterOvertime(){this.inOvertime=!0,this.matchTimeLeft=cv,this.updateTimerDisplay(),this.showBanner("EXTRA TIME","goal"),this.playSfx("sfx_whistle.mp3",.4),this.shakeAmount=.4}flashFill(t){t.classList.remove("flash"),t.offsetWidth,t.classList.add("flash"),setTimeout(()=>t.classList.remove("flash"),350)}popScore(t){t.classList.remove("pop"),t.offsetWidth,t.classList.add("pop")}updateScoreboard(){if(!this.bbLeftFill)return;const t=this.playerGoals+this.rivalGoals;let e;t===0?e=50:e=this.playerGoals/t*100,e=Math.max(6,Math.min(94,e)),this.bbLeftFill.style.width=`${e}%`,this.bbRightFill.style.width=`${100-e}%`,this.bbIcon.style.left=`${e}%`,this.bbLeftNum.textContent=String(this.playerGoals),this.bbRightNum.textContent=String(this.rivalGoals)}resetForKickoff(){this.clearBalls(),this.player.pos.set(0,0,4),this.player.group.position.copy(this.player.pos),this.player.yaw=0,this.player.ballCooldown=0,this.rival.pos.set(0,0,-3),this.rival.group.position.copy(this.rival.pos),this.rival.yaw=Math.PI,this.rival.ballCooldown=0,this.training&&this.parkRival(),this.rivalShootTimer=1.6+Math.random()*1,this.rivalRetargetTimer=0,this.resetTransientInputState(),this.spawnMatchBall()}resetTransientInputState(){this.touchPointerId=-1,this.touchStartX=0,this.touchStartY=0,this.touchCurrentX=0,this.touchCurrentY=0,this.touchLastSampleX=0,this.touchLastSampleY=0,this.touchLastSampleTime=0,this.touchStartTime=0,this.touchFirstMoveTime=0,this.touchVelX=0,this.touchVelY=0,this.swipePath=[],this.chargeKickT=0,this.player&&this.player.chargeRing&&(this.player.chargeRing.visible=!1),this.shieldHoldTimeout!==0&&(clearTimeout(this.shieldHoldTimeout),this.shieldHoldTimeout=0),(this.shieldHoldActive||this.blockTimer>0)&&this.endShield(),this.blockTimer=0,this.blockMesh&&(this.blockMesh.visible=!1),this.charging&&(this.charging=!1,this.updateSlingViz()),this.joystickActive&&(this.joystickActive=!1,this.joystickBase&&this.updateJoystickViz()),this.dribbleTimer=0,this.dribbleTailTimer=0,this.dribbleTailMax=0,this.dribbleDirX=0,this.dribbleDirZ=0,this.stealOnlyTimer=0,this.smoothedMx=0,this.smoothedMz=0,this.wasInSprintZone=!1,this.sprintDashTimer=0,this.rivalHesitateTimer=0,this.rivalHesitateCooldown=0,this.wasMoving=!1,this.movingTime=0}spawnMatchBall(){this.balls.length>0&&this.clearBalls();const t=new N(0,ae,0),e=new N(0,0,0);this.spawnBall(t,e,!0)}resetGame(){this.playerGoals=0,this.rivalGoals=0,this.updateScoreboard(),this.matchTimeLeft=La,this.inOvertime=!1,this.updateTimerDisplay(),this.clearObstacles();for(const t of this.keepers)t.x=0,t.mesh.position.x=0;this.ended=!1,this.endcardEl.classList.remove("show","loss"),this.timeScale=1,this.shakeAmount=0,this.lastMoveDirX=0,this.lastMoveDirZ=-1,this.blockCooldown=0,this.playerHasFired=!1,this.resetTransientInputState(),this.resetForKickoff(),this.bannerEl.className="",this.state="INTRO",this.stateTime=0}update(t){if(!this.ready||this.paused)return;const e=Math.min(t,.05)*this.timeScale;if(this.totalTime+=e,this.stateTime+=e,this.state==="INTRO"&&this.stateTime>.1&&this.transition("PLAY"),this.state==="GOAL_PAUSE"&&this.stateTime>1.2&&(this.resetForKickoff(),this.transition("PLAY")),this.state==="PLAY")if(this.training||(this.matchTimeLeft-=e),this.matchTimeLeft<=0)if(this.matchTimeLeft=0,this.updateTimerDisplay(),!this.inOvertime&&this.playerGoals===this.rivalGoals)this.enterOvertime();else{let n;this.playerGoals>this.rivalGoals?n="WIN":this.playerGoals<this.rivalGoals?n="LOSS":n="DRAW",this.stopBgLoop(600),this.playSfx("sfx_whistle.mp3",.45),this.transition(n)}else this.updateTimerDisplay(),this.updateAim(),this.updatePlayerMovement(e),this.training||this.updateRivalAI(e),this.collideCombatantObstacles(this.player),this.collideCombatantObstacles(this.rival),this.training||this.resolveBodyCollision(),this.updatePlayerFacing(e),this.training&&this.updateTraining(e);this.player&&this.celebrant!==this.player&&(this.player.group.rotation.y=Ua(this.player.group.rotation.y,this.player.yaw,Math.min(1,e*8)),this.applyBob(this.player,e)),this.rival&&this.celebrant!==this.rival&&(this.rival.group.rotation.y=Ua(this.rival.group.rotation.y,this.rival.yaw,Math.min(1,e*6)),this.applyBob(this.rival,e)),this.updateCelebration(e),this.sprintFxTimer-=e,this.state==="PLAY"&&this.sprintFxTimer<=0&&((this.sprintDashTimer>0||this.dribbleTimer>0||this.wasInSprintZone&&this.touchPointerId!==-1)&&(this.spawnFxBurst(this.player.pos.x,.06,this.player.pos.z,{count:2,colors:[3046706,5025616,1793568],speed:1.2,up:1.6,gravity:7,life:.45,size:.06}),this.sprintFxTimer=.04),this.rivalDribbleTimer>0&&(this.spawnFxBurst(this.rival.pos.x,.06,this.rival.pos.z,{count:2,colors:[3046706,5025616,1793568],speed:1.2,up:1.6,gravity:7,life:.45,size:.06}),this.sprintFxTimer=.04)),this.updateIndicatorBall(this.player,e),this.updateIndicatorBall(this.rival,e),this.state==="PLAY"&&!this.training&&this.updateKeepers(e),this.updateBalls(e),this.updateFx(e),this.updateCrowd(e),this.updateBlock(e),this.updateRings(e),this.updateLobbyScene(e),this.updateCamera(),this.timeScale<1&&(this.timeScale=Math.min(1,this.timeScale+t*1.5))}updatePlayerMovement(t){var m;let e=0,n=0;(this.keys.w||this.keys.arrowup)&&(n-=1),(this.keys.s||this.keys.arrowdown)&&(n+=1),(this.keys.a||this.keys.arrowleft)&&(e-=1),(this.keys.d||this.keys.arrowright)&&(e+=1);let s=0,r=0,a=!1;if(this.touchPointerId!==-1){const g=this.touchCurrentX-this.touchStartX,x=this.touchCurrentY-this.touchStartY,p=Math.sqrt(g*g+x*x),f=p>ms;if(f&&!this.wasInSprintZone&&(this.sprintDashTimer=Qc),this.wasInSprintZone=f,p>av){a=!0;let M;if(f){if(M=1+Math.min(1,(p-ms)/(jc-ms))*(Jc-1),this.sprintDashTimer>0){const y=this.sprintDashTimer/Qc;M+=y*$c,this.sprintDashTimer-=t,this.sprintDashTimer<0&&(this.sprintDashTimer=0)}}else{const E=p/ms;M=Math.pow(E,ov)}s=g/p*M,r=x/p*M}}else this.wasInSprintZone=!1,this.sprintDashTimer=0;if(a)this.smoothedMx=s,this.smoothedMz=r;else{const g=1-Math.exp(-t*lv);this.smoothedMx+=(0-this.smoothedMx)*g,this.smoothedMz+=(0-this.smoothedMz)*g}if(e+=this.smoothedMx,n+=this.smoothedMz,this.dribbleTimer>0)e+=this.dribbleDirX*hr,n+=this.dribbleDirZ*hr,this.dribbleTimer-=t,this.dribbleTimer<=0&&(this.dribbleTimer=0,this.dribbleTailTimer=this.dribbleTailMax);else if(this.dribbleTailTimer>0){const g=this.dribbleTailMax>0?this.dribbleTailMax:cr,p=this.dribbleTailTimer/g,f=1-p,M=3*f*f*p*.72+3*f*p*p*1+p*p*p;e+=this.dribbleDirX*hr*M,n+=this.dribbleDirZ*hr*M,this.dribbleTailTimer-=t,this.dribbleTailTimer<0&&(this.dribbleTailTimer=0)}this.stealOnlyTimer>0&&(this.stealOnlyTimer-=t,this.stealOnlyTimer<0&&(this.stealOnlyTimer=0));const o=Jc+$c,c=Math.sqrt(e*e+n*n);c>o&&(e=e/c*o,n=n/c*o);const l=c>G_;if(this.player.pos.x,this.player.pos.z,l){const g=Math.sqrt(e*e+n*n);this.lastMoveDirX=e/g,this.lastMoveDirZ=n/g,this.dribbleTimer<=0&&(this.player.yaw=pr(Math.atan2(this.lastMoveDirX,this.lastMoveDirZ)+Math.PI)),this.player.pos.x+=e*Pa*t,this.player.pos.z+=n*Pa*t,this.movingTime+=t}else this.wasMoving&&(!this.isMobile&&(this.state==="PLAY"||this.state==="INTRO")&&this.player.ballCooldown<=0&&this.movingTime>=k_&&this.firePlayerBall(this.lastMoveDirX,this.lastMoveDirZ,z_),this.movingTime=0);this.wasMoving=l;const h=li+.05,d=Be-h,u=re-h;if(this.player.pos.x=pn(this.player.pos.x,-d,d),this.player.pos.z=pn(this.player.pos.z,-u,u),this.player.group.position.copy(this.player.pos),this.dribbleTimer>0&&((m=this.balls[0])==null?void 0:m.possessor)===this.rival){const g=this.player.pos.x-this.rival.pos.x,x=this.player.pos.z-this.rival.pos.z,p=g*g+x*x,f=li*2+.32;p<f*f&&(this.balls[0].possessor=this.player,this.balls[0].ownerIsPlayer=!0,this.shakeAmount=Math.max(this.shakeAmount,.22),this.playSfx("sfx_hit.mp3",.5),this.dribbleTimer=0)}}updateRivalAI(t){const e=this.balls[0];if(!e||this.state==="PLAY"&&this.stateTime<.5&&!e.possessor)return;let n=this.rival.pos.x,s=this.rival.pos.z;const r=this.totalTime,a=this.rivalProfile,o=a.style==="aggressive"?.6:a.style==="defensive"?1.55:1,c=a.style==="aggressive"?.5:1,l=Math.sin(r*.83)*.35*c,h=Math.cos(r*.71+1.2)*.3*c;if(e.possessor===this.rival)n=pn(this.player.pos.x*.5+l*1.3,-ye+.2,ye-.2),s=re-2.5+h*.5;else if(e.possessor===this.player){const M=-re,E=this.player.pos.x+this.lastMoveDirX*a.predict,y=this.player.pos.z+this.lastMoveDirZ*a.predict,w=E-0,T=y-M,R=Math.sqrt(w*w+T*T),v=a.markDistance*o;if(R>v+.1){const b=(R-v)/R;n=w*b+l,s=M+T*b+h}else n=E+l,s=pn(M+1+h*.4,M+.5,M+2.5)}else n=e.mesh.position.x+l*.4,s=e.mesh.position.z+h*.4;if(this.rivalHesitateTimer>0){this.rivalHesitateTimer-=t,this.rivalHesitateTimer<0&&(this.rivalHesitateTimer=0);return}this.rivalHesitateCooldown>0?this.rivalHesitateCooldown-=t:this.rivalDribbleTimer<=0&&Math.random()<a.hesitateChance&&(this.rivalHesitateTimer=a.hesitateMin+Math.random()*(a.hesitateMax-a.hesitateMin),this.rivalHesitateCooldown=1.8+Math.random()*1.4);const d=n-this.rival.pos.x,u=s-this.rival.pos.z,m=Math.sqrt(d*d+u*u);if(this.rivalDashCooldown>0&&(this.rivalDashCooldown-=t),this.rivalDashCooldown<=0&&this.rivalDribbleTimer<=0&&m>1.2){const M=this.playerGoals-this.rivalGoals;let E=a.dashChance+Math.max(0,M)*.006;e.possessor===this.player&&(a.style==="aggressive"?E*=2.2:a.style==="defensive"&&(E*=.5)),Math.random()<E&&(this.rivalDribbleTimer=.3,this.rivalDribbleDirX=d/m,this.rivalDribbleDirZ=u/m,this.rivalDashCooldown=1.4+Math.random()*.6)}const g=this.rivalDribbleTimer>0?1.7:1;if(this.rivalDribbleTimer>0&&(this.rivalDribbleTimer-=t,this.rivalDribbleTimer<0&&(this.rivalDribbleTimer=0)),this.rival.pos.x,this.rival.pos.z,m>.1){const M=a.speed*g*t,E=this.rivalDribbleTimer>0?this.rivalDribbleDirX:d/m,y=this.rivalDribbleTimer>0?this.rivalDribbleDirZ:u/m;this.rival.pos.x+=E*M,this.rival.pos.z+=y*M}const x=li+.05,p=Be-x,f=re-x;if(this.rival.pos.x=pn(this.rival.pos.x,-p,p),this.rival.pos.z=pn(this.rival.pos.z,-f,f),this.rival.group.position.copy(this.rival.pos),this.rivalDribbleTimer>0&&e.possessor===this.player){const M=this.rival.pos.x-this.player.pos.x,E=this.rival.pos.z-this.player.pos.z,y=li*2+.55;M*M+E*E<y*y&&(e.possessor=this.rival,e.ownerIsPlayer=!1,this.shakeAmount=Math.max(this.shakeAmount,.22),this.playSfx("sfx_hit.mp3",.45),this.rivalDribbleTimer=0)}if(e.possessor===this.rival){const M=new N(0,0,re).sub(this.rival.pos).setY(0).normalize();this.rival.yaw=Math.atan2(M.x,M.z)+Math.PI}else m>.1&&(this.rival.yaw=Math.atan2(d/m,u/m)+Math.PI);e.possessor===this.rival?(this.rivalShootTimer-=t,(this.rivalShootTimer<=0||this.rival.pos.z>1)&&(this.fireRivalBall(),this.rivalShootTimer=(pv+(Math.random()-.5)*mv)*a.shootIntervalMul)):this.rivalShootTimer=.7+Math.random()*.6}resolveBodyCollision(){if(!this.player||!this.rival)return;const t=this.player.pos.x-this.rival.pos.x,e=this.player.pos.z-this.rival.pos.z,n=t*t+e*e,s=li*2+.08;if(n>=s*s)return;const r=Math.sqrt(n);let a,o;if(r<.001){const g=Math.random()*Math.PI*2;a=Math.cos(g),o=Math.sin(g)}else a=t/r,o=e/r;const l=(s-r)/2;this.player.pos.x+=a*l,this.player.pos.z+=o*l,this.rival.pos.x-=a*l,this.rival.pos.z-=o*l;const h=li+.05,d=Be-h,u=re-h,m=g=>{g.x=pn(g.x,-d,d),g.z=pn(g.z,-u,u)};m(this.player.pos),m(this.rival.pos),this.player.group.position.copy(this.player.pos),this.rival.group.position.copy(this.rival.pos)}spawnFxBurst(t,e,n,s={}){const{count:r=12,colors:a=[16777215],speed:o=3,up:c=2.5,gravity:l=9,life:h=.7,size:d=.09,spread:u=1}=s;for(let m=0;m<r;m++){if(this.fxParticles.length>=180)return;const g=new Jt({color:a[m%a.length],transparent:!0,opacity:1}),x=new ot(this.fxGeo,g),p=d*(.6+Math.random()*.8);x.scale.set(p,p,p),x.position.set(t,e,n);const f=Math.random()*Math.PI*2,M=o*(.4+Math.random()*.6)*u,E=h*(.7+Math.random()*.6);this.fxParticles.push({mesh:x,vel:new N(Math.cos(f)*M,c*(.5+Math.random()*.8),Math.sin(f)*M),life:E,maxLife:E,gravity:l,spinX:(Math.random()-.5)*12,spinY:(Math.random()-.5)*12}),this.scene.add(x)}}updateFx(t){for(let e=this.fxParticles.length-1;e>=0;e--){const n=this.fxParticles[e];if(n.life-=t,n.life<=0||n.mesh.position.y<-.2){this.scene.remove(n.mesh),n.mesh.material.dispose(),this.fxParticles.splice(e,1);continue}n.vel.y-=n.gravity*t,n.mesh.position.x+=n.vel.x*t,n.mesh.position.y+=n.vel.y*t,n.mesh.position.z+=n.vel.z*t,n.mesh.rotation.x+=n.spinX*t,n.mesh.rotation.y+=n.spinY*t;const s=n.life/n.maxLife,r=n.mesh.material;r.opacity=s<.4?s/.4:1}}updateCelebration(t){const e=this.celebrant;if(!e)return;if(!(this.state==="GOAL_PAUSE"||this.state==="WIN"||this.state==="LOSS")){this.celebrant=null;return}this.celebrateT+=t,e.group.position.y=Math.abs(Math.sin(this.celebrateT*6))*.5,e.group.rotation.y+=t*10}matchesPlayedStored(){try{return parseInt(localStorage.getItem("s1x1_matches_played")||"0",10)||0}catch{return 0}}bumpMatchesPlayed(){try{localStorage.setItem("s1x1_matches_played",String(this.matchesPlayedStored()+1))}catch{}}setRivalProfile(t){const e={...eh,...t},n=this.matchesPlayedStored(),s=n<=0?.55:n===1?.35:n===2?.18:0;if(s>0){const r={speed:2.6,hesitateChance:.11,hesitateMin:.7,hesitateMax:1.3,dashChance:.001,shootIntervalMul:1.9,markDistance:2.5,predict:.08,inaccuracy:.68,style:e.style},a=(o,c)=>o+(c-o)*s;e.speed=a(e.speed,r.speed),e.hesitateChance=a(e.hesitateChance,r.hesitateChance),e.hesitateMin=a(e.hesitateMin,r.hesitateMin),e.hesitateMax=a(e.hesitateMax,r.hesitateMax),e.dashChance=a(e.dashChance,r.dashChance),e.shootIntervalMul=a(e.shootIntervalMul,r.shootIntervalMul),e.markDistance=a(e.markDistance,r.markDistance),e.predict=a(e.predict,r.predict),e.inaccuracy=a(e.inaccuracy,r.inaccuracy)}this.rivalProfile=e}applyBob(t,e){const n=t.pos.x-t.lastPos.x,s=t.pos.z-t.lastPos.z,r=Math.sqrt(n*n+s*s),a=Math.min(1,r/(Pa*e+1e-4));a>.05?t.bobTime+=e*(8+4*a):t.bobTime*=1-Math.min(1,e*6);const o=Math.abs(Math.sin(t.bobTime))*.06*a;t.group.position.y=o;const c=a*.14;t.group.rotation.x+=(c-t.group.rotation.x)*Math.min(1,e*9),t.lastPos.copy(t.pos)}updatePlayerFacing(t){this.wasMoving||this.charging||this.player.ballCooldown>.5||(this.player.yaw=Ua(this.player.yaw,0,Math.min(1,t*2.2)))}render(){this.ready&&this.renderer.render(this.scene,this.camera)}updateLobbyScene(t){if(!this.lobbyGroup)return;const e=this.state==="MENU";if(this.lobbyGroup.visible!==e){this.lobbyGroup.visible=e;const n=!e;for(const s of this.scene.children){if(s===this.lobbyGroup)continue;const r=s.type;if(!(r==="AmbientLight"||r==="DirectionalLight"||r==="HemisphereLight"||r==="PointLight"||r==="SpotLight")){if(s===this.fieldLinesGroup&&this.customFieldLoaded){s.visible=!1;continue}s.visible=n}}this.renderer.setClearColor(e?793914:1919514,e?0:1)}e&&(this.lobbyDragging||(this.lobbyGroup.rotation.y+=this.lobbyAngularVelocity*t,this.lobbyAngularVelocity*=Math.pow(.4,t),this.lobbyIdleSpinTimer+=t,this.lobbyIdleSpinTimer>1.5&&Math.abs(this.lobbyAngularVelocity)<.15&&(this.lobbyGroup.rotation.y+=t*.3)))}updateCamera(){let t=0,e=0;this.shakeAmount>.001&&(t=(Math.random()-.5)*this.shakeAmount,e=(Math.random()-.5)*this.shakeAmount,this.shakeAmount*=.85);const n=this.state==="MENU"?this.lobbyCamPos:this.baseCamPos,s=this.state==="MENU"?this.lobbyCamLookAt:this.baseCamLookAt;this.camera.position.set(n.x+t,n.y,n.z+e),this.camera.lookAt(s)}transition(t){this.state!==t&&(this.state=t,this.stateTime=0,t==="GOAL_PAUSE"&&this.resetTransientInputState(),t==="PLAY"||(t==="WIN"?(this.inOvertime?(this.showBanner("GOLDEN GOAL!","goal"),this.timeScale=.18,this.shakeAmount=.8):(this.showBanner("VICTORY!","success"),this.timeScale=.45,this.shakeAmount=.5),setTimeout(()=>this.showEnd("WIN"),1e3)):t==="LOSS"?(this.inOvertime?(this.showBanner("GOLDEN GOAL","danger"),this.timeScale=.18,this.shakeAmount=.8):(this.showBanner("DEFEAT","danger"),this.timeScale=.4,this.shakeAmount=.6),setTimeout(()=>this.showEnd("LOSS"),1e3)):t==="DRAW"&&(this.showBanner("FULL TIME",""),this.timeScale=.55,this.shakeAmount=.3,setTimeout(()=>this.showEnd("DRAW"),1e3))))}showBanner(t,e=""){this.bannerEl.textContent=t,this.bannerEl.className="",this.bannerEl.offsetWidth,this.bannerEl.className="show "+e}setMatchHudVisible(t){this.battleBarEl&&(this.battleBarEl.style.display=t?"":"none"),this.timerEl&&(this.timerEl.style.display=t?"":"none"),this.surrenderEl&&(this.surrenderEl.style.display=t?"":"none"),this.pauseEl&&(this.pauseEl.style.display=t?"":"none"),t||document.body.classList.remove("crunch-time"),this.titleEl&&(this.titleEl.style.display="none"),this.hintEl&&this.hintEl.classList.toggle("hidden",!t),this.mobileHintsEl&&(t&&this.isMobile?(this.mobileHintsEl.classList.remove("hidden"),this.mobileHintsEl.classList.add("visible")):this.mobileHintsEl.classList.add("hidden"))}updateTimerDisplay(){if(!this.timerEl)return;if(this.training){this.timerEl.textContent="TRAIN",this.timerEl.classList.remove("danger"),document.body.classList.remove("crunch-time");return}const t=Math.max(0,Math.ceil(this.matchTimeLeft)),e=Math.floor(t/60),n=t%60,s=this.inOvertime?"OT ":"";this.timerEl.textContent=`${s}${e}:${String(n).padStart(2,"0")}`;const r=(t<=10&&t>0||this.inOvertime)&&this.state==="PLAY";this.timerEl.classList.toggle("danger",r),document.body.classList.toggle("crunch-time",r)}ftueDoneStored(){try{return localStorage.getItem("s1x1_ftue_done")==="1"}catch{return!1}}markFtueDone(){try{localStorage.setItem("s1x1_ftue_done","1")}catch{}}setHandHint(t){this.ftueEl&&(this.ftueEl.className=t===0?"":"on handonly step"+t)}coachSay(t){if(!this.coachBubbleEl||!this.coachTextEl)return;window.clearInterval(this.coachTypeTimer),this.coachBubbleEl.classList.add("show"),this.coachTextEl.textContent="";let e=0;this.coachTypeTimer=window.setInterval(()=>{e++,this.coachTextEl&&(this.coachTextEl.textContent=t.slice(0,e)),e>=t.length&&window.clearInterval(this.coachTypeTimer)},22)}hideCoachBubble(){window.clearInterval(this.coachTypeTimer),this.coachBubbleEl&&this.coachBubbleEl.classList.remove("show")}startTraining(){this.training=!0,this.trainStep=1,this.trainT=0,this.parkRival(),this.rival.group.visible=!1;for(const t of this.keepers)t.mesh.visible=!1;this.hintEl.classList.add("hidden"),this.mobileHintsEl&&this.mobileHintsEl.classList.add("hidden"),this.updateTimerDisplay(),this.coachSay("Hey champ! Coach here. Quick warm-up before your first match!"),this.setHandHint(0)}parkRival(){this.rival.pos.set(0,0,-8),this.rival.group.position.copy(this.rival.pos)}advanceTraining(t){this.trainStep=t,this.trainT=0,t===2?(this.coachSay(this.isMobile?"DRAG anywhere to run. Go get the ball!":"Use W A S D to run. Go get the ball!"),this.setHandHint(1)):t===3?(this.coachSay(this.isMobile?"Now SWIPE at the goal up there. SHOOT!":"Run at the goal and release to SHOOT!"),this.setHandHint(2)):t===4?(this.coachSay("Awesome! Secret weapon: HOLD to charge... release = FIRE SHOT!"),this.setHandHint(3)):t===5&&(this.coachSay("You're READY! Here comes your first rival. GOOD LUCK, champ!"),this.setHandHint(0),this.spawnFxBurst(this.player.pos.x,.8,this.player.pos.z,{count:18,colors:[16765498,16777215,3833599],speed:3.2,up:3.4,gravity:6,life:.9,size:.09}))}trainingGoal(t){if(t){this.showBanner("GOOOL!","goal");const e=rr[Math.floor(Math.random()*rr.length)];this.playSfx(e,.85),this.spawnFxBurst(0,.5,-re,{count:26,colors:[3833599,16765498,16777215],speed:4.2,up:4.2,gravity:7,life:1,size:.1}),this.shakeAmount=.4,this.trainStep===3&&this.advanceTraining(4)}else this.showBanner("WRONG NET!","danger"),this.coachSay("Wrong net! The TOP goal, champ. Try again!"),this.playSfx("sfx_save.mp3",.5);this.transition("GOAL_PAUSE")}updateTraining(t){this.trainT+=t,this.trainStep===1&&this.trainT>2.6?this.advanceTraining(2):this.trainStep===2&&this.balls.some(e=>e.possessor===this.player)?this.advanceTraining(3):this.trainStep===4&&this.trainT>20?(this.coachSay("Tricky one, huh? No stress — you'll nail it in the match!"),this.advanceTraining(5)):this.trainStep===5&&this.trainT>3&&this.finishTraining()}finishTraining(){this.markFtueDone(),this.training=!1,this.trainStep=0,this.hideCoachBubble(),this.setHandHint(0),this.rival.group.visible=!0;for(const t of this.keepers)t.mesh.visible=!0;this.resetGame(),this.showBanner("MATCH TIME!","success"),this.playSfx("sfx_whistle.mp3",.5)}abortTraining(){this.training=!1,this.trainStep=0,this.hideCoachBubble(),this.setHandHint(0),this.rival.group.visible=!0;for(const t of this.keepers)t.mesh.visible=!0}startMatch(){this.setMatchHudVisible(!0),this.resetGame(),this.playSfx("sfx_whistle.mp3",.45),this.playBgLoop("sfx_stadium_bg.mp3",.28,600),setTimeout(()=>{this.hintEl&&this.hintEl.classList.add("hidden"),this.mobileHintsEl&&this.mobileHintsEl.classList.add("hidden")},6e3);const t=typeof location<"u"&&/[?&]ftue=1/.test(location.search);(!this.ftueDoneStored()||t)&&this.startTraining()}setPaused(t){this.paused=t}surrenderMatch(){if(!(this.state!=="PLAY"&&this.state!=="GOAL_PAUSE")){if(this.training){this.finishTraining();return}this.matchTimeLeft=0,this.timerEl&&this.updateTimerDisplay(),this.stopBgLoop(600),this.playSfx("sfx_whistle.mp3",.45),this.transition("LOSS")}}exitToMenu(){this.training&&this.abortTraining(),this.ended=!1,this.endcardEl.classList.remove("show","loss"),this.timeScale=1,this.shakeAmount=0,this.celebrant&&(this.celebrant.group.position.y=0,this.celebrant=null),this.state="MENU",this.stateTime=0,this.matchTimeLeft=La,this.inOvertime=!1,this.stopBgLoop(400),setTimeout(()=>{this.state==="MENU"&&this.playBgLoop("sfx_lofi_lobby.mp3",.08,800)},500),this.resetForKickoff(),this.setMatchHudVisible(!1),this.bannerEl.className=""}showEnd(t){if(this.ended)return;this.ended=!0,this.bumpMatchesPlayed();const e=typeof t=="boolean"?t?"LOSS":"WIN":t,n=window.__onMatchOver;if(typeof n=="function"){try{n({outcome:e,playerGoals:this.playerGoals,rivalGoals:this.rivalGoals})}catch(o){console.error("[soccer] __onMatchOver threw:",o)}return}this.endcardEl.classList.add("show");const s=this.endcardEl.querySelector(".hd"),r=this.endcardEl.querySelector(".sub"),a=this.endcardEl.querySelector(".cta");e==="LOSS"?(this.endcardEl.classList.add("loss"),s&&(s.textContent="DEFEAT"),r&&(r.textContent=`${this.playerGoals} × ${this.rivalGoals}`),a&&(a.textContent="TRY AGAIN")):e==="DRAW"?(s&&(s.textContent="DRAW"),r&&(r.textContent=`${this.playerGoals} × ${this.rivalGoals}`),a&&(a.textContent="PLAY AGAIN")):(s&&(s.textContent="VICTORY!"),r&&(r.textContent=`${this.playerGoals} × ${this.rivalGoals}`),a&&(a.textContent="PLAY AGAIN"))}async loadAudioBuffers(){if(this.audioBuffersLoading||this.audioBuffersReady)return;if(this.audioBuffersLoading=!0,!this.audioCtx){const n=window.AudioContext||window.webkitAudioContext;if(!n){this.audioBuffersLoading=!1;return}this.audioCtx=new n}if(this.audioCtx.state==="suspended")try{await this.audioCtx.resume()}catch{}const t=Object.entries(q_),e=new Map;for(const[n,s]of t)e.has(s)||e.set(s,n);await Promise.all(Array.from(e.entries()).map(async([n,s])=>{try{const a=await(await fetch(n)).arrayBuffer(),o=await this.audioCtx.decodeAudioData(a);for(const[c,l]of t)l===n&&(this.audioBuffers[c]=o)}catch(r){console.warn("[soccer] failed to decode audio",n,r)}})),this.audioBuffersReady=!0,this.audioBuffersLoading=!1}playSfx(t,e=.6,n=250){if(!this.canPlayAudio())return;if(!this.audioBuffersReady){this.loadAudioBuffers();return}const s=this.audioBuffers[t];if(!s||!this.audioCtx)return;this.audioCtx.state==="suspended"&&this.audioCtx.resume().catch(()=>{});const r=this.audioCtx,a=r.createBufferSource();a.buffer=s;const o=r.createGain();a.connect(o),o.connect(this.getMasterBus());const c=r.currentTime,l=s.duration,h=Math.min(n/1e3,l*.5);o.gain.setValueAtTime(e,c),o.gain.setValueAtTime(e,c+l-h),o.gain.linearRampToValueAtTime(1e-4,c+l),a.start(c)}getMasterVolumeMultiplier(){try{const t=localStorage.getItem("soccer1x1:settings:masterVolume");if(t===null)return .6;const e=parseInt(t,10);return Number.isFinite(e)?Math.max(0,Math.min(100,e))/100:.6}catch{return .6}}getMasterBus(){const t=this.audioCtx;return this.masterGain||(this.masterGain=t.createGain(),this.masterGain.gain.value=this.getMasterVolumeMultiplier(),this.masterGain.connect(t.destination)),this.masterVolumeListenerWired||(this.masterVolumeListenerWired=!0,window.addEventListener("soccer1x1:masterVolumeChange",()=>{if(!this.masterGain||!this.audioCtx)return;const e=this.audioCtx.currentTime;this.masterGain.gain.cancelScheduledValues(e),this.masterGain.gain.setValueAtTime(this.masterGain.gain.value,e),this.masterGain.gain.linearRampToValueAtTime(this.getMasterVolumeMultiplier(),e+.1)})),this.masterGain}getBgVolumeMultiplier(){try{const t=localStorage.getItem("soccer1x1:settings:bgVolume");if(t===null)return .7;const e=parseInt(t,10);return Number.isFinite(e)?Math.max(0,Math.min(100,e))/100:.5}catch{return .5}}wireBgVolumeListener(){this.bgVolumeListenerWired||(this.bgVolumeListenerWired=!0,window.addEventListener("soccer1x1:bgVolumeChange",()=>{if(!this.bgGain||!this.audioCtx)return;const t=this.getBgVolumeMultiplier(),e=this.bgBaseVolume*t,n=this.audioCtx.currentTime;this.bgGain.gain.cancelScheduledValues(n),this.bgGain.gain.setValueAtTime(this.bgGain.gain.value,n),this.bgGain.gain.linearRampToValueAtTime(e,n+.15)}))}playBgLoop(t,e=.18,n=600){if(!this.canPlayAudio())return;if(!this.audioBuffersReady||!this.audioCtx){this.loadAudioBuffers();return}this.wireBgVolumeListener(),this.stopBgLoop();const s=this.audioBuffers[t];if(!s)return;this.audioCtx.state==="suspended"&&this.audioCtx.resume().catch(()=>{});const r=this.audioCtx,a=r.createBufferSource();a.buffer=s,a.loop=!0;const o=r.createGain();a.connect(o),o.connect(this.getMasterBus());const c=r.currentTime,l=n/1e3;this.bgBaseVolume=e;const h=e*this.getBgVolumeMultiplier();o.gain.setValueAtTime(0,c),o.gain.linearRampToValueAtTime(h,c+l),a.start(c),this.bgSource=a,this.bgGain=o}stopBgLoop(t=500){if(!this.bgSource||!this.bgGain||!this.audioCtx)return;const e=this.bgSource,n=this.bgGain;this.bgSource=null,this.bgGain=null;const s=this.audioCtx.currentTime,r=t/1e3;n.gain.cancelScheduledValues(s),n.gain.setValueAtTime(n.gain.value,s),n.gain.linearRampToValueAtTime(0,s+r);try{e.stop(s+r+.05)}catch{}}playExtended(t,e=.7,n=4,s=700){if(!this.canPlayAudio())return;if(!this.audioBuffersReady||!this.audioCtx){this.loadAudioBuffers();return}const r=this.audioBuffers[t];if(!r)return;this.audioCtx.state==="suspended"&&this.audioCtx.resume().catch(()=>{});const a=this.audioCtx,o=a.createBufferSource();o.buffer=r,o.loop=!0;const c=a.createGain();o.connect(c),c.connect(this.getMasterBus());const l=a.currentTime,h=s/1e3;c.gain.setValueAtTime(e,l),c.gain.setValueAtTime(e,l+n-h),c.gain.linearRampToValueAtTime(1e-4,l+n),o.start(l);try{o.stop(l+n+.05)}catch{}}}function pn(i,t,e){return Math.max(t,Math.min(e,i))}function Ua(i,t,e){let n=t-i;for(;n>Math.PI;)n-=Math.PI*2;for(;n<-Math.PI;)n+=Math.PI*2;return i+n*e}function pr(i){let t=i;for(;t>Math.PI;)t-=2*Math.PI;for(;t<-Math.PI;)t+=2*Math.PI;return t}function Sv(){try{window.__bootStarted=!0,window.__GAME__=new Mv,window.__bootDone=!0}catch(i){window.__bootError=String(i.stack||i),console.error("[soccer-1x1] boot error:",i)}return{stop:()=>{}}}const yv=""+new URL("bg_lobby-D_0Rsyek.png",import.meta.url).href,$o="soccer1x1:meta:v1",hn=10,bv=5,yr=1800,Ev=60,Qo=1,Nr=1,nh=50,Av=["FERA_BR","ShadowStriker","NinjaBola","RodrigoPro","KaitoX","MessiFake","GoatHunter","JuninhoFC","TigrePrime","AceFutebol","PendekarBola","ViperKick","NoLookGod","MaracanaKid","GoldenBoot","StrikerKZ","TacoDeOuro","CavaniBR","TornadoFC","PhoenixK1ck","WitcherGoal","PibePower","BananaShot","CapitaoFut","LordOfPitch","RogerioPRO","DragaoBr","CrackOnline","ZeroBala","OneTapWonder","RolexFC","NeyOnTop","NazaUltra","KazumaKick","TheBigPlayer","CracaoXBR","PsychoStriker","MachadoFC","ElPibe10","BalaPerdida","StormFut","FuriaGoals","RamboFC","ColdShot77","GauchoKing","BalaDePrata","XuxoFC","GringoLoco","AraraXLR","SambaStriker"],ih=["🇧🇷","🇦🇷","🇪🇸","🇮🇹","🇫🇷","🇩🇪","🇬🇧","🇵🇹","🇲🇽","🇯🇵","🇰🇷","🇺🇸","🇨🇦","🇨🇴","🇨🇱","🇺🇾","🇳🇱","🇧🇪","🇸🇪","🇳🇴","🇸🇦","🇪🇬","🇲🇦","🇸🇳"];function Si(){return Date.now()}function Tv(){try{const i=localStorage.getItem($o);return i?JSON.parse(i):null}catch{return null}}function Qn(i){try{localStorage.setItem($o,JSON.stringify(i))}catch{}}function Kh(){const i=[...Av].sort(()=>Math.random()-.5),t=[];for(let e=0;e<nh;e++){const n=e+1,s=Math.max(2,Math.round(95*Math.pow(1-n/(nh+6),2.2))),r=Math.floor(Math.random()*8)-3;t.push({id:`bot_${e}`,name:i[e%i.length],flag:ih[Math.floor(Math.random()*ih.length)],weekGoals:Math.max(1,s+r)})}return t}function Zh(i){const t=new Date(i),n=(8-t.getDay())%7||7,s=new Date(t);return s.setDate(t.getDate()+n),s.setHours(0,0,0,0),s.getTime()}function jh(){const i=Si();return{tickets:bv,lastRegenAt:i,careerGoals:0,weekGoals:0,weekResetAt:Zh(i),adCooldownUntil:0,bots:Kh(),playerName:null,anonId:null}}function wv(){const i="abcdefghijklmnopqrstuvwxyz0123456789";let t="";for(let e=0;e<24;e++)t+=i[Math.floor(Math.random()*i.length)];return t}function tl(){const i=Oe();return i.anonId||(i.anonId=wv(),Qn(i)),i.anonId}const Jh=14;function Cv(i){return typeof i!="string"?"":i.replace(/[^A-Za-z0-9 ._\-À-ſ]/g,"").replace(/\s+/g," ").trim().slice(0,Jh)}function Fr(){const i=Oe().playerName;return typeof i=="string"&&i.length>0?i:null}function Rv(i){const t=Cv(i);if(!t)return!1;const e=Oe();return e.playerName=t,Qn(e),!0}function Iv(i){const t=Si();let e=!1;const n=jh();for(const s of Object.keys(n))(i[s]===void 0||i[s]===null)&&(i[s]=n[s],e=!0);if(i.tickets<hn){const s=Math.floor((t-i.lastRegenAt)/1e3),r=Math.floor(s/yr);if(r>0){const a=Math.min(r,hn-i.tickets);i.tickets+=a,i.lastRegenAt+=a*yr*1e3,e=!0}}else i.lastRegenAt<t-yr*1e3&&(i.lastRegenAt=t,e=!0);return t>=i.weekResetAt&&(i.weekGoals=0,i.weekResetAt=Zh(t),i.bots=Kh(),e=!0),e&&Qn(i),i}function Oe(){let i=Tv();return i||(i=jh(),Qn(i)),Iv(i)}function qr(){return Oe().tickets}function sh(){const i=Oe();return i.tickets<=0?!1:(i.tickets===hn&&(i.lastRegenAt=Si()),i.tickets-=Nr,Qn(i),!0)}function Pv(i){const t=Oe();return t.tickets=Math.max(0,Math.min(hn,t.tickets+i)),Qn(t),t.tickets}function Lv(){const i=Oe();if(i.tickets>=hn)return 0;const t=Si()-i.lastRegenAt,e=yr*1e3;return Math.max(0,e-t%e)}function Dv(){return Oe().careerGoals}function $h(i){if(i<=0)return;const t=Oe();t.careerGoals+=i,t.weekGoals+=i,Qn(t)}function Qh(){return Oe().weekGoals}function Uv(){return Math.max(0,Oe().weekResetAt-Si())}function el(){const i=Oe(),t=i.bots.map(e=>({...e,isPlayer:!1}));return t.push({id:"player",name:i.playerName||"YOU",flag:"🇧🇷",weekGoals:i.weekGoals,isPlayer:!0}),t.sort((e,n)=>n.weekGoals-e.weekGoals||(e.isPlayer?1:-1)),t}function Nv(){const i=el(),t=i.map((a,o)=>({row:a,rank:o+1})).filter(a=>!a.row.isPlayer),n=i.findIndex(a=>a.isPlayer)+1;let s=t;if(Math.random()<.7){const a=t.filter(o=>Math.abs(o.rank-n)<=6);a.length>=3&&(s=a)}const r=s[Math.floor(Math.random()*s.length)];return{bot:r.row,rank:r.rank,total:i.length}}function tu(){return Math.max(0,Oe().adCooldownUntil-Si())}function eu(){return tu()===0&&qr()<hn}function Fv(){if(!eu())return!1;const i=Oe();return i.adCooldownUntil=Si()+Ev*1e3,i.tickets=Math.min(hn,i.tickets+Qo),Qn(i),!0}typeof window<"u"&&(window.__meta={getState:Oe,addTickets:Pv,addCareerGoals:$h,reset:()=>(localStorage.removeItem($o),Oe())});const nu="soccer1x1_weekly_br",qv=10080*60,iu="BR",Rr=4e3;let vi=!1;function vn(i){vi||(console.debug("[cloud-lb] fallback engaged:",i),vi=!0)}function Ir(i,t,e){return new Promise(n=>{const s=setTimeout(()=>n({timedOut:!0,label:e}),t);i.then(r=>{clearTimeout(s),n({value:r})}).catch(r=>{clearTimeout(s),n({error:r})})})}function su(){return Er().leaderboardsService.fetch(nu,i=>i)}function ru(){return Er().playerProfilesService}async function Vv(i){var t,e;if(vi||!i)return!1;try{const n=new es("",i,iu,"",{}),s=await Ir(ru().publishPlayerProfile(n),Rr,"publishProfile");if(s.timedOut)return vn("publishProfile timeout"),!1;if(s.error)return vn(`publishProfile threw: ${((t=s.error)==null?void 0:t.message)??s.error}`),!1;const r=s.value;return!r||r.isSuccessful===!1?(vn(`publishProfile failed: ${((e=r==null?void 0:r.exception)==null?void 0:e.message)??"no-result"}`),!1):!0}catch(n){return vn(`publishProfile sync throw: ${(n==null?void 0:n.message)??n}`),!1}}async function Ov(i,t){var e,n;if(vi||!i||t<=0)return!1;try{const s=await Ir(su().upsertScore(i,t,qv),Rr,"upsertScore");if(s.timedOut)return vn("upsertScore timeout"),!1;if(s.error)return vn(`upsertScore threw: ${((e=s.error)==null?void 0:e.message)??s.error}`),!1;const r=s.value;return!r||r.isSuccessful===!1?(vn(`upsertScore failed: ${((n=r==null?void 0:r.exception)==null?void 0:n.message)??"no-result"}`),!1):!0}catch(s){return vn(`upsertScore sync throw: ${(s==null?void 0:s.message)??s}`),!1}}async function Bv(i,t){var e,n,s,r;if(vi)return null;try{const a=await Ir(su().fetchTopEntities(i),Rr,"fetchTopEntities");if(a.timedOut||a.error||!a.value||a.value.isSuccessful===!1)return vn(`fetchTop failed: ${((e=a.error)==null?void 0:e.message)??((s=(n=a.value)==null?void 0:n.exception)==null?void 0:s.message)??"timeout"}`),null;const o=a.value.value??[];if(o.length===0)return[];const c=o.map(h=>h.id);let l={};try{const h=await Ir(ru().fetchPublicProfiles(c),Rr,"fetchProfiles");!h.timedOut&&!h.error&&((r=h.value)!=null&&r.isSuccessful)&&(l=h.value.value??{})}catch{}return o.map(h=>{const d=l[h.id],u=`Player-${String(h.id).slice(0,4)}`;return{id:h.id,name:d&&d.name||u,region:d&&d.region||iu,score:h.score,rank:h.rank,isPlayer:h.id===t}})}catch(a){return vn(`fetchTop sync throw: ${(a==null?void 0:a.message)??a}`),null}}typeof window<"u"&&(window.__cloudLb={isOffline:()=>vi,reset:()=>{vi=!1},LEADERBOARD_ID:nu});let ve=null,br=null,Zn=null,gs=null;const au=["lobby","matchmaking","leaderboard","ads-overlay","endcard","settings","notifications","name-prompt","pause-menu"],ou="soccer1x1:settings:sound";function kv(){return localStorage.getItem(ou)!=="off"}function zv(i){localStorage.setItem(ou,i?"on":"off")}const lu="soccer1x1:settings:masterVolume";function Gv(){const i=localStorage.getItem(lu);if(i===null)return 60;const t=parseInt(i,10);return Number.isFinite(t)?Math.max(0,Math.min(100,t)):60}function Hv(i){const t=Math.max(0,Math.min(100,Math.round(i)));localStorage.setItem(lu,String(t)),window.dispatchEvent(new CustomEvent("soccer1x1:masterVolumeChange",{detail:t}))}const cu="soccer1x1:settings:bgVolume";function Wv(){const i=localStorage.getItem(cu);if(i===null)return 70;const t=parseInt(i,10);return Number.isFinite(t)?Math.max(0,Math.min(100,t)):50}function Xv(i){const t=Math.max(0,Math.min(100,Math.round(i)));localStorage.setItem(cu,String(t)),window.dispatchEvent(new CustomEvent("soccer1x1:bgVolumeChange",{detail:t}))}const Yv=[{icon:"🏆",title:"WEEKLY RANK RESETS MONDAY",sub:"You have until Sunday to climb the leaderboard. Top 10 get bragging rights.",unread:!0},{icon:"⚽",title:"NEW: CRUNCH TIME OVERLAY",sub:"The final 10 seconds of every match now pulse red. Push hard.",unread:!0},{icon:"🎫",title:"GET A FREE TICKET",sub:'Tap "WATCH AD" on the home screen to grab a bonus match.',unread:!1},{icon:"⚙",title:"SETTINGS LIVE",sub:"Toggle sound and reset progress from the gear icon up top.",unread:!1}];function ft(i){return document.getElementById(i)}function Vn(i){for(const t of au){const e=ft(t);e&&(t===i?e.classList.add("show"):e.classList.remove("show"))}i==="lobby"?(document.body.classList.add("lobby-bg"),document.body.classList.remove("in-overlay")):(document.body.classList.remove("lobby-bg"),document.body.classList.add("in-overlay"))}function _s(){for(const i of au){const t=ft(i);t&&t.classList.remove("show")}document.body.classList.remove("in-overlay")}function rh(i){const t=Math.max(0,Math.ceil(i/1e3)),e=Math.floor(t/3600),n=Math.floor(t%3600/60),s=t%60;return e>0?`${e}h ${n}m`:`${n}:${String(s).padStart(2,"0")}`}function Kv(i){const t=Math.max(0,Math.ceil(i/1e3)),e=Math.floor(t/86400),n=Math.floor(t%86400/3600);return e>0?`${e}d ${n}h`:`${n}h`}function Po(){const i=qr(),t=Dv(),e=Lv(),n=tu(),s=ft("lobby-tickets");s&&(s.textContent=String(i));const r=ft("lobby-career");r&&(r.textContent=String(t));const a=ft("lobby-status-title"),o=ft("lobby-regen");a&&o&&(i>=hn?(a.textContent=`${i} / ${hn} TICKETS`,o.textContent="AT MAX"):(a.textContent=`${i} / ${hn} TICKETS`,o.textContent=`NEXT IN ${rh(e).toUpperCase()}`));const c=ft("lobby-play");if(c){const x=c.querySelector(".play-arrow"),p=c.querySelector(".play-label"),f=c.querySelector(".play-cost");i>=Nr?(c.disabled=!1,x&&(x.style.display=""),p&&(p.textContent="PLAY"),f&&(f.textContent="-1 🎫",f.style.display="")):(c.disabled=!0,x&&(x.style.display="none"),p&&(p.textContent="NO TICKETS"),f&&(f.style.display="none"))}const l=ft("lobby-ads"),h=ft("lobby-ads-badge");l&&h&&(i>=hn?l.style.display="none":n>0?(l.style.display="",l.disabled=!0,h.textContent=rh(n)):(l.style.display="",l.disabled=!1,h.textContent=`+${Qo} 🎫`));const d=ft("lobby-rank-badge");if(d){const p=el().findIndex(f=>f.isPlayer);d.textContent=p>=0?`#${p+1}`:"#--"}const u=ft("lobby-name-chip"),m=ft("lobby-name-text"),g=Fr();u&&m&&(g?(m.textContent=g.toUpperCase(),u.classList.add("visible")):u.classList.remove("visible"))}function Zv(){zi(),Po(),br=setInterval(Po,1e3)}function zi(){br&&(clearInterval(br),br=null)}function mn(){Vn("lobby"),Zv(),uu()}function jv(){ft("settings-sound").checked=kv();const i=Wv(),t=ft("settings-bg-volume");t&&(t.value=String(i),t.style.setProperty("--pct",i+"%"));const e=ft("settings-bg-volume-pct");e&&(e.textContent=i+"%");const n="1.2.3";ft("settings-version").textContent=n,Vn("settings")}const hu="soccer1x1:notifs:seen";function Jv(){const i=ft("notif-list");i.innerHTML="";for(const t of Yv){const e=document.createElement("div");e.className="notif-row"+(t.unread?" unread":""),e.innerHTML=`
      <span class="notif-icon">${t.icon}</span>
      <div class="notif-body">
        <span class="notif-title">${t.title}</span>
        <span class="notif-sub">${t.sub}</span>
      </div>`,i.appendChild(e)}localStorage.setItem(hu,"1"),uu(),Vn("notifications")}function uu(){const i=document.querySelector("#lobby-notif .notif-dot");if(!i)return;const t=localStorage.getItem(hu)==="1";i.style.display=t?"none":""}function ah(i){const{bot:t,rank:e,total:n}=Nv();ve&&ve.setRivalProfile&&ve.setRivalProfile(xv(e,n,t.name)),ft("mm-rival-flag").textContent=t.flag,ft("mm-rival-name").textContent=`#${e} ${t.name}`,ft("mm-status").textContent="FINDING OPPONENT...",ft("mm-vs").classList.remove("show"),Vn("matchmaking"),gs&&clearTimeout(gs),gs=setTimeout(()=>{ft("mm-status").textContent="OPPONENT FOUND",ft("mm-vs").classList.add("show"),gs=setTimeout(()=>{gs=null,i()},1400)},1500)}function $v({outcome:i,playerGoals:t,rivalGoals:e}){if(ve&&ve.setMatchHudVisible&&ve.setMatchHudVisible(!1),$h(t),i==="WIN"&&!Fr()){Qv(()=>oh({outcome:i,playerGoals:t,rivalGoals:e}));return}oh({outcome:i,playerGoals:t,rivalGoals:e})}function oh({outcome:i,playerGoals:t,rivalGoals:e}){t>0&&Ov(tl(),Qh()).catch(()=>{});const n=ft("endcard");n.classList.remove("outcome-loss","outcome-draw");const s=ft("endcard-result");i==="WIN"?s.textContent="VICTORY!":i==="LOSS"?(s.textContent="DEFEAT",n.classList.add("outcome-loss")):(s.textContent="DRAW",n.classList.add("outcome-draw")),ft("endcard-score").textContent=`${t} × ${e}`;const r=ft("endcard-career");t>0?(r.textContent=`+${t} CAREER GOAL${t>1?"S":""}`,r.classList.remove("zero")):(r.textContent="no goals this match",r.classList.add("zero"));const a=ft("endcard-replay");a&&(qr()>=Nr?(a.disabled=!1,a.textContent="🔁 PLAY AGAIN"):(a.disabled=!0,a.textContent="NO TICKETS")),Vn("endcard")}let Lo=null;function Qv(i){Lo=typeof i=="function"?i:null;const t=ft("name-prompt-input"),e=ft("name-prompt-error");t&&(t.value="",t.maxLength=Jh),e&&(e.textContent=""),Vn("name-prompt"),setTimeout(()=>{t&&t.focus()},250)}function lh(){const i=ft("name-prompt-input"),t=ft("name-prompt-error");if(!i)return;const e=i.value;if(!Rv(e)){t&&(t.textContent="Need at least 1 valid character");return}Vv(Fr()).catch(()=>{});const s=Lo;Lo=null,s?s():mn()}function ch(i){const t=ft("lb-list");t.innerHTML="",i.forEach((n,s)=>{const r=document.createElement("div");r.className="lb-row"+(n.isPlayer?" player":""),r.innerHTML=`
      <span class="lb-rank">#${s+1}</span>
      <span class="lb-flag">${n.flag}</span>
      <span class="lb-name">${n.name}</span>
      <span class="lb-goals">${n.weekGoals}⚽</span>
    `,t.appendChild(r)}),ft("lb-reset").textContent=`resets in ${Kv(Uv())}`;const e=t.querySelector(".lb-row.player");e&&setTimeout(()=>e.scrollIntoView({block:"center",behavior:"smooth"}),80)}function tx(){ch(el()),Vn("leaderboard");const i=10,t=tl();Bv(50,t).then(e=>{if(!e||e.length<i)return;const n=e.some(r=>r.isPlayer),s=e.map(r=>({name:r.name,flag:"🇧🇷",weekGoals:r.score,isPlayer:r.isPlayer}));if(!n){const r=Qh();s.push({name:Fr()||"YOU",flag:"🇧🇷",weekGoals:r,isPlayer:!0}),s.sort((a,o)=>o.weekGoals-a.weekGoals||(a.isPlayer?1:-1))}ch(s)}).catch(()=>{})}function ex(){const i=ft("ad-content"),t=ft("ad-sub"),e=ft("ad-progress-fill"),n=ft("ad-skip"),s=ft("ad-reward"),r=ft("ad-actions"),a=ft("ad-claim");i.innerHTML="AD<br>IN PROGRESS",t.textContent="hold tight — almost there",e.style.width="0%",s.classList.remove("show"),r.classList.remove("show"),n.textContent="SKIP in 5s",Vn("ads-overlay");const o=5e3,c=performance.now();Zn&&clearInterval(Zn),Zn=setInterval(()=>{const l=performance.now()-c,h=Math.min(100,l/o*100);e.style.width=h+"%";const d=Math.max(0,Math.ceil((o-l)/1e3));if(n.textContent=d>0?`SKIP in ${d}s`:"",l>=o){clearInterval(Zn),Zn=null;const u=Fv();i.innerHTML=u?"AD<br>COMPLETE":"TICKETS<br>AT MAX",t.textContent=u?"reward ready":"come back after spending tickets",u&&(s.textContent=`+${Qo} 🎫`,s.classList.add("show")),r.classList.add("show"),a.textContent="OK"}},100)}function nx(){Zn&&(clearInterval(Zn),Zn=null),mn()}function ix(){ft("lobby-play").addEventListener("click",()=>{if(!sh()){Po();return}zi(),ah(()=>{_s(),ve.startMatch()})}),ft("lobby-ads").addEventListener("click",()=>{eu()&&(zi(),ex())}),ft("lobby-leaderboard").addEventListener("click",()=>{zi(),tx()}),ft("lobby-settings").addEventListener("click",()=>{zi(),jv()}),ft("lobby-notif").addEventListener("click",()=>{zi(),Jv()}),ft("settings-close").addEventListener("click",()=>mn()),ft("settings-back").addEventListener("click",()=>mn()),ft("settings-sound").addEventListener("change",e=>{zv(e.target.checked)}),ft("settings-bg-volume").addEventListener("input",e=>{const n=parseInt(e.target.value,10);Xv(n),e.target.style.setProperty("--pct",n+"%");const s=ft("settings-bg-volume-pct");s&&(s.textContent=n+"%")}),ft("settings-reset").addEventListener("click",()=>{confirm("Reset all career progress (goals, week stats, tickets)?")&&(localStorage.removeItem("soccer1x1:meta:v1"),location.reload())}),ft("notif-close").addEventListener("click",()=>mn()),ft("notif-back").addEventListener("click",()=>mn()),ft("lb-close").addEventListener("click",()=>mn()),ft("lb-back").addEventListener("click",()=>mn()),ft("ad-claim").addEventListener("click",()=>nx()),ft("endcard-lobby").addEventListener("click",()=>{ve.exitToMenu(),mn()}),ft("endcard-replay").addEventListener("click",()=>{qr()<Nr||(sh(),_s(),ve.exitToMenu(),ah(()=>{_s(),ve.startMatch()}))});const i=ft("name-prompt-save");i&&i.addEventListener("click",lh);const t=ft("name-prompt-input");t&&t.addEventListener("keydown",e=>{e.key==="Enter"&&(e.preventDefault(),lh())}),ft("pause-resume").addEventListener("click",()=>{_s(),ve&&ve.setPaused&&ve.setPaused(!1)}),ft("pause-surrender").addEventListener("click",()=>{_s(),ve&&ve.setPaused&&ve.setPaused(!1),ve&&ve.surrenderMatch&&ve.surrenderMatch()}),ft("pause-volume").addEventListener("input",e=>{const n=parseInt(e.target.value,10);Hv(n),e.target.style.setProperty("--pct",n+"%");const s=ft("pause-volume-pct");s&&(s.textContent=n+"%")})}function sx(){const i=Gv(),t=ft("pause-volume");t&&(t.value=String(i),t.style.setProperty("--pct",i+"%"));const e=ft("pause-volume-pct");e&&(e.textContent=i+"%"),Vn("pause-menu")}function rx(){window.__onMatchOver=i=>{$v(i)},window.__onPauseRequested=()=>{sx()}}function ax(i){const t=Sv();ve=window.__GAME__||window.__game,ve||console.error("[meta] startSoccer did not expose the game instance"),i&&i.classList.add("visible");const e=document.getElementById("game-canvas");return e&&e.classList.add("visible"),document.body.style.backgroundImage=`url(${yv})`,document.body.classList.add("lobby-bg"),rx(),ix(),mn(),t}const ox=document.getElementById("game-canvas"),de=(...i)=>console.log("[Shell]",...i);async function du(){de("Booting...",`platform=${Ln.getPlatform()}`,`native=${Ln.isNativePlatform()}`);try{await Er().initialize({appId:"soccer1x1-37",environment:"production",playerId:tl()}),de("[WildlifePlatform] initialized, version =",await Er().getPlatformVersion())}catch(t){de("[WildlifePlatform] initialize failed:",(t==null?void 0:t.message)??t)}Qu(),sd();let i="1.2.3";if(Ln.isNativePlatform()){try{const t=await uh.getInfo();i=t.version||i,de("Native app info:",JSON.stringify(t))}catch(t){de("Could not get native app info:",t.message)}if(de("Entering fullscreen mode..."),await gl.hide(),await gl.setOverlaysWebView({overlay:!0}),await Pu.hide(),de("Fullscreen + splash hidden"),Ln.getPlatform()==="ios")try{const t=await Lu.requestPermission();de("[ATT] status:",(t==null?void 0:t.status)??"unknown")}catch(t){de("[ATT] requestPermission failed:",(t==null?void 0:t.message)??t)}}td(i),de("Shell version:",i,"| Content version:","1.2.3"),kn.on("status",t=>{de("OTA status:",t),Us(t)}),kn.on("progress",t=>{de("OTA progress:",t+"%"),wl(t)}),kn.on("error",t=>de("OTA error:",t));try{de("Initializing OTA updater..."),await kn.init(),de("OTA updater initialized");const t=await kn.getContentVersion();de("Content version:",t),ed(t),de("Checking for updates...");const e=await kn.checkForUpdate();if(e){de("Update manifest:",JSON.stringify(e)),Us("Downloading update..."),await kn.downloadUpdate(e),Us("Applying update..."),de("Applying update immediately..."),await kn.applyNow();return}else de("No update available");Us("Starting game..."),wl(100),de("Launching game..."),await lx(300),ax(ox),de("Lobby ready — holding splash for 3s"),await new Promise(n=>setTimeout(n,3e3)),de("Hiding loader"),await id(),de("Boot complete")}catch(t){console.error("[Shell] Startup error:",t),rd(t.message||"Failed to start the game.",()=>du())}}function lx(i){return new Promise(t=>setTimeout(t,i))}du();export{hh as W};
