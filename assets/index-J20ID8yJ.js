(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();/*! Capacitor: https://capacitorjs.com/ - MIT License */var Hi;(function(i){i.Unimplemented="UNIMPLEMENTED",i.Unavailable="UNAVAILABLE"})(Hi||(Hi={}));class br extends Error{constructor(t,e,n){super(t),this.message=t,this.code=e,this.data=n}}const Fh=i=>{var t,e;return i!=null&&i.androidBridge?"android":!((e=(t=i==null?void 0:i.webkit)===null||t===void 0?void 0:t.messageHandlers)===null||e===void 0)&&e.bridge?"ios":"web"},Oh=i=>{const t=i.CapacitorCustomPlatform||null,e=i.Capacitor||{},n=e.Plugins=e.Plugins||{},s=()=>t!==null?t.name:Fh(i),r=()=>s()!=="web",a=d=>{const u=l.get(d);return!!(u!=null&&u.platforms.has(s())||o(d))},o=d=>{var u;return(u=e.PluginHeaders)===null||u===void 0?void 0:u.find(p=>p.name===d)},c=d=>i.console.error(d),l=new Map,h=(d,u={})=>{const p=l.get(d);if(p)return console.warn(`Capacitor plugin "${d}" already registered. Cannot register plugins twice.`),p.proxy;const g=s(),x=o(d);let m;const f=async()=>(!m&&g in u?m=typeof u[g]=="function"?m=await u[g]():m=u[g]:t!==null&&!m&&"web"in u&&(m=typeof u.web=="function"?m=await u.web():m=u.web),m),y=(_,S)=>{var O,R;if(x){const U=x==null?void 0:x.methods.find(F=>S===F.name);if(U)return U.rtype==="promise"?F=>e.nativePromise(d,S.toString(),F):(F,H)=>e.nativeCallback(d,S.toString(),F,H);if(_)return(O=_[S])===null||O===void 0?void 0:O.bind(_)}else{if(_)return(R=_[S])===null||R===void 0?void 0:R.bind(_);throw new br(`"${d}" plugin is not implemented on ${g}`,Hi.Unimplemented)}},T=_=>{let S;const O=(...R)=>{const U=f().then(F=>{const H=y(F,_);if(H){const B=H(...R);return S=B==null?void 0:B.remove,B}else throw new br(`"${d}.${_}()" is not implemented on ${g}`,Hi.Unimplemented)});return _==="addListener"&&(U.remove=async()=>S()),U};return O.toString=()=>`${_.toString()}() { [capacitor code] }`,Object.defineProperty(O,"name",{value:_,writable:!1,configurable:!1}),O},b=T("addListener"),w=T("removeListener"),E=(_,S)=>{const O=b({eventName:_},S),R=async()=>{const F=await O;w({eventName:_,callbackId:F},S)},U=new Promise(F=>O.then(()=>F({remove:R})));return U.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await R()},U},C=new Proxy({},{get(_,S){switch(S){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return x?E:b;case"removeListener":return w;default:return T(S)}}});return n[d]=C,l.set(d,{name:d,proxy:C,platforms:new Set([...Object.keys(u),...x?[g]:[]])}),C};return e.convertFileSrc||(e.convertFileSrc=d=>d),e.getPlatform=s,e.handleError=c,e.isNativePlatform=r,e.isPluginAvailable=a,e.registerPlugin=h,e.Exception=br,e.DEBUG=!!e.DEBUG,e.isLoggingEnabled=!!e.isLoggingEnabled,e},Bh=i=>i.Capacitor=Oh(i),Rn=Bh(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),fi=Rn.registerPlugin;class Dc{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(t,e){let n=!1;this.listeners[t]||(this.listeners[t]=[],n=!0),this.listeners[t].push(e);const r=this.windowListeners[t];r&&!r.registered&&this.addWindowListener(r),n&&this.sendRetainedArgumentsForEvent(t);const a=async()=>this.removeListener(t,e);return Promise.resolve({remove:a})}async removeAllListeners(){this.listeners={};for(const t in this.windowListeners)this.removeWindowListener(this.windowListeners[t]);this.windowListeners={}}notifyListeners(t,e,n){const s=this.listeners[t];if(!s){if(n){let r=this.retainedEventArguments[t];r||(r=[]),r.push(e),this.retainedEventArguments[t]=r}return}s.forEach(r=>r(e))}hasListeners(t){var e;return!!(!((e=this.listeners[t])===null||e===void 0)&&e.length)}registerWindowListener(t,e){this.windowListeners[e]={registered:!1,windowEventName:t,pluginEventName:e,handler:n=>{this.notifyListeners(e,n)}}}unimplemented(t="not implemented"){return new Rn.Exception(t,Hi.Unimplemented)}unavailable(t="not available"){return new Rn.Exception(t,Hi.Unavailable)}async removeListener(t,e){const n=this.listeners[t];if(!n)return;const s=n.indexOf(e);this.listeners[t].splice(s,1),this.listeners[t].length||this.removeWindowListener(this.windowListeners[t])}addWindowListener(t){window.addEventListener(t.windowEventName,t.handler),t.registered=!0}removeWindowListener(t){t&&(window.removeEventListener(t.windowEventName,t.handler),t.registered=!1)}sendRetainedArgumentsForEvent(t){const e=this.retainedEventArguments[t];e&&(delete this.retainedEventArguments[t],e.forEach(n=>{this.notifyListeners(t,n)}))}}const Wo=i=>encodeURIComponent(i).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),Xo=i=>i.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class kh extends Dc{async getCookies(){const t=document.cookie,e={};return t.split(";").forEach(n=>{if(n.length<=0)return;let[s,r]=n.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");s=Xo(s).trim(),r=Xo(r).trim(),e[s]=r}),e}async setCookie(t){try{const e=Wo(t.key),n=Wo(t.value),s=t.expires?`; expires=${t.expires.replace("expires=","")}`:"",r=(t.path||"/").replace("path=",""),a=t.url!=null&&t.url.length>0?`domain=${t.url}`:"";document.cookie=`${e}=${n||""}${s}; path=${r}; ${a};`}catch(e){return Promise.reject(e)}}async deleteCookie(t){try{document.cookie=`${t.key}=; Max-Age=0`}catch(e){return Promise.reject(e)}}async clearCookies(){try{const t=document.cookie.split(";")||[];for(const e of t)document.cookie=e.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(t){return Promise.reject(t)}}async clearAllCookies(){try{await this.clearCookies()}catch(t){return Promise.reject(t)}}}fi("CapacitorCookies",{web:()=>new kh});const zh=async i=>new Promise((t,e)=>{const n=new FileReader;n.onload=()=>{const s=n.result;t(s.indexOf(",")>=0?s.split(",")[1]:s)},n.onerror=s=>e(s),n.readAsDataURL(i)}),Gh=(i={})=>{const t=Object.keys(i);return Object.keys(i).map(s=>s.toLocaleLowerCase()).reduce((s,r,a)=>(s[r]=i[t[a]],s),{})},Vh=(i,t=!0)=>i?Object.entries(i).reduce((n,s)=>{const[r,a]=s;let o,c;return Array.isArray(a)?(c="",a.forEach(l=>{o=t?encodeURIComponent(l):l,c+=`${r}=${o}&`}),c.slice(0,-1)):(o=t?encodeURIComponent(a):a,c=`${r}=${o}`),`${n}&${c}`},"").substr(1):null,Hh=(i,t={})=>{const e=Object.assign({method:i.method||"GET",headers:i.headers},t),s=Gh(i.headers)["content-type"]||"";if(typeof i.data=="string")e.body=i.data;else if(s.includes("application/x-www-form-urlencoded")){const r=new URLSearchParams;for(const[a,o]of Object.entries(i.data||{}))r.set(a,o);e.body=r.toString()}else if(s.includes("multipart/form-data")||i.data instanceof FormData){const r=new FormData;if(i.data instanceof FormData)i.data.forEach((o,c)=>{r.append(c,o)});else for(const o of Object.keys(i.data))r.append(o,i.data[o]);e.body=r;const a=new Headers(e.headers);a.delete("content-type"),e.headers=a}else(s.includes("application/json")||typeof i.data=="object")&&(e.body=JSON.stringify(i.data));return e};class Wh extends Dc{async request(t){const e=Hh(t,t.webFetchExtra),n=Vh(t.params,t.shouldEncodeUrlParams),s=n?`${t.url}?${n}`:t.url,r=await fetch(s,e),a=r.headers.get("content-type")||"";let{responseType:o="text"}=r.ok?t:{};a.includes("application/json")&&(o="json");let c,l;switch(o){case"arraybuffer":case"blob":l=await r.blob(),c=await zh(l);break;case"json":c=await r.json();break;case"document":case"text":default:c=await r.text()}const h={};return r.headers.forEach((d,u)=>{h[u]=d}),{data:c,headers:h,status:r.status,url:r.url}}async get(t){return this.request(Object.assign(Object.assign({},t),{method:"GET"}))}async post(t){return this.request(Object.assign(Object.assign({},t),{method:"POST"}))}async put(t){return this.request(Object.assign(Object.assign({},t),{method:"PUT"}))}async patch(t){return this.request(Object.assign(Object.assign({},t),{method:"PATCH"}))}async delete(t){return this.request(Object.assign(Object.assign({},t),{method:"DELETE"}))}}fi("CapacitorHttp",{web:()=>new Wh});const Xh="modulepreload",qh=function(i,t){return new URL(i,t).href},qo={},mr=function(t,e,n){let s=Promise.resolve();if(e&&e.length>0){let a=function(h){return Promise.all(h.map(d=>Promise.resolve(d).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};const o=document.getElementsByTagName("link"),c=document.querySelector("meta[property=csp-nonce]"),l=(c==null?void 0:c.nonce)||(c==null?void 0:c.getAttribute("nonce"));s=a(e.map(h=>{if(h=qh(h,n),h in qo)return;qo[h]=!0;const d=h.endsWith(".css"),u=d?'[rel="stylesheet"]':"";if(!!n)for(let x=o.length-1;x>=0;x--){const m=o[x];if(m.href===h&&(!d||m.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${h}"]${u}`))return;const g=document.createElement("link");if(g.rel=d?"stylesheet":Xh,d||(g.as="script"),g.crossOrigin="",g.href=h,l&&g.setAttribute("nonce",l),document.head.appendChild(g),d)return new Promise((x,m)=>{g.addEventListener("load",x),g.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${h}`)))})}))}function r(a){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=a,window.dispatchEvent(o),!o.defaultPrevented)throw a}return s.then(a=>{for(const o of a||[])o.status==="rejected"&&r(o.reason);return t().catch(r)})},Uc=fi("App",{web:()=>mr(()=>import("./web-jiZJXsHG.js"),[],import.meta.url).then(i=>new i.AppWeb)}),Yh=fi("SplashScreen",{web:()=>mr(()=>import("./web-Dijx2q2l.js"),[],import.meta.url).then(i=>new i.SplashScreenWeb)});var Yo;(function(i){i.Dark="DARK",i.Light="LIGHT",i.Default="DEFAULT"})(Yo||(Yo={}));var $o;(function(i){i.None="NONE",i.Slide="SLIDE",i.Fade="FADE"})($o||($o={}));const Ko=fi("StatusBar"),$h=fi("AppTrackingTransparency",{web:()=>mr(()=>import("./web-Dgey2v8r.js"),[],import.meta.url).then(i=>new i.AppTrackingTransparencyWeb)}),It=fi("WildlifePlatform",{web:()=>mr(()=>import("./web-BmdtJDE1.js"),[],import.meta.url).then(i=>new i.WildlifePlatformWeb)});let Zo=!1;function Kh(){if(Zo||!Rn.isNativePlatform())return;Zo=!0;const i=t=>{(t.level==="error"?console.error:t.level==="warn"?console.warn:t.level==="info"?console.info:console.log)(`[WildlifePlatform:${t.tag}]`,t.msg)};(async()=>{try{await It.addListener("nativeLog",i);const{logs:t}=await It._drainEarlyNativeLogs();for(const e of t)i(e)}catch{}})()}const Zh="0.1.0";class At{constructor(t,e,n){this.value=t,this.exception=e,this.isSuccessful=n}static success(t){return new At(t,null,!0)}static error(t){return new At(null,t,!1)}get errorMessages(){var t,e;return(e=(t=this.exception)===null||t===void 0?void 0:t.toString())!==null&&e!==void 0?e:"Unknown error"}voided(){return this.isSuccessful?At.success(void 0):At.error(this.exception)}}async function Wi(i,t,e){var n;const s=Date.now(),r=(n=e==null?void 0:e.method)!==null&&n!==void 0?n:"GET",a=typeof t=="string"?t:t.url,o=`[WildlifePlatform:${i}]`;console.log(`${o} → ${r} ${a}`);try{const c=await fetch(t,e),l=Date.now()-s,h=c.ok?"log":"warn";return console[h](`${o} ← ${c.status} ${r} ${a} (${l}ms)`),c}catch(c){const l=Date.now()-s,h=c instanceof Error?c.message:String(c);throw console.error(`${o} ✗ ${r} ${a} (${l}ms): ${h}`),c}}const jo="https://authentication-service-api-prod.authentication-service.shared-services.us-east-1.general.prod.wildlife.io",Jo="wildlife_platform_security_token",Qo="wildlife_platform_account_id";class jh{constructor(){this._securityToken=""}get securityToken(){return this._securityToken}get isAuthenticated(){return this._securityToken.length>0}async authenticate(t){var e,n,s,r;const a=(e=globalThis.localStorage)===null||e===void 0?void 0:e.getItem(Jo),o=(n=globalThis.localStorage)===null||n===void 0?void 0:n.getItem(Qo);if(a&&a.length>0&&o===t.playerId&&(await this.authenticateAccount({playerId:t.playerId,tenantId:t.tenantId,securityToken:a,accountData:t.accountData})).isSuccessful)return this._securityToken=a,At.success(this._securityToken);const c=await this.createAccount({playerId:t.playerId,tenantId:t.tenantId,accountData:t.accountData});return c.isSuccessful?(this._securityToken=c.value,(s=globalThis.localStorage)===null||s===void 0||s.setItem(Jo,this._securityToken),(r=globalThis.localStorage)===null||r===void 0||r.setItem(Qo,t.playerId),At.success(this._securityToken)):At.error(c.exception)}async createAccount(t){var e;try{const n=await Wi("AccountService",`${jo}/accounts`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({tenantId:t.tenantId,id:t.playerId,accountData:t.accountData})});if(n.status===200){const r=await n.json();return At.success(r.account.securityToken)}const s=await n.text().catch(()=>"");return At.error(new Error(`Account creation failed (${n.status}): ${s}`))}catch(n){return At.error(new Error(`Account creation error: ${(e=n==null?void 0:n.message)!==null&&e!==void 0?e:n}`))}}async authenticateAccount(t){var e;try{const n=await Wi("AccountService",`${jo}/accounts:authenticate`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({tenantId:t.tenantId,accountId:t.playerId,securityToken:t.securityToken,accountData:t.accountData})});if(n.status===200)return At.success(void 0);const s=await n.text().catch(()=>"");return At.error(new Error(`Authentication failed (${n.status}): ${s}`))}catch(n){return At.error(new Error(`Authentication error: ${(e=n==null?void 0:n.message)!==null&&e!==void 0?e:n}`))}}}const Er="wildlife_platform_player_id";function Jh(){var i;return!((i=globalThis.crypto)===null||i===void 0)&&i.randomUUID?globalThis.crypto.randomUUID():"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,t=>{const e=Math.random()*16|0;return(t==="x"?e:e&3|8).toString(16)})}class Qh{constructor(){this._playerId="",this._isInitialized=!1}async initialize(){this._isInitialized||(await this.loadPlayerId(),this._isInitialized=!0)}getPlayerId(){if(!this._isInitialized)throw new Error("IdentificationService is not initialized");return this._playerId}async setPlayerId(t){var e;this._playerId=t,this._isInitialized=!0,(e=globalThis.localStorage)===null||e===void 0||e.setItem(Er,t)}async loadPlayerId(){var t,e,n;let s=(e=(t=globalThis.localStorage)===null||t===void 0?void 0:t.getItem(Er))!==null&&e!==void 0?e:null;s==null&&(s=Jh(),(n=globalThis.localStorage)===null||n===void 0||n.setItem(Er,s)),this._playerId=s}}class gs{constructor(t,e,n,s){this.id=t,this.score=e,this.rank=n,this.metadata=s}static fromJson(t,e){let n;return t.metadata!=null&&e?n=e(t.metadata):t.metadata!=null&&(n=t.metadata),new gs(t.publicID,Number(t.score),t.rank,n)}toJson(){const t={publicID:this.id,score:this.score,rank:this.rank};return this.metadata!=null&&(t.metadata=this.metadata),t}}class xe extends Error{constructor(t,e){super(t),this.name="LeaderboardException",this.statusCode=e}static badRequest(){return new xe("bad request",400)}static unauthorized(){return new xe("unauthorized access",401)}static notFound(){return new xe("success on communication, but no entity was found",404)}static internalServerError(){return new xe("internal server error",500)}static unknown(t,e){return new xe(`unknown error
${t}`,e)}toString(){return`LeaderboardException(${this.statusCode}): ${this.message}`}}class tu{constructor(t,e,n,s){this.leaderboardId=t,this.api=e,this.cache=n,this.metadataFromJson=s}async fetchEntity(t){var e;const n=await this.api.getMembers(this.leaderboardId,[t],this.metadataFromJson);if(!n.isSuccessful)return At.error(n.exception);const s=(e=n.value)!==null&&e!==void 0?e:[];return s.length===0?At.error(xe.notFound()):(this.cache.cacheMembers(this.leaderboardId,this.leaderboardId,s,[t]),this.cache.cacheMembers("getMembers",this.leaderboardId,s,[t]),At.success(s[0]))}async fetchEntities(t){const e=await this.api.getMembers(this.leaderboardId,t,this.metadataFromJson);return e.isSuccessful&&this.cache.cacheMembers("getMembers",this.leaderboardId,e.value,t),e}async fetchTopEntities(t=10){const e=this.validatePageSize(t);if(e)return e;const n=await this.api.getTopMembers(this.leaderboardId,t,this.metadataFromJson);return n.isSuccessful&&this.cache.cacheMembers("getTopMembers",this.leaderboardId,n.value,[String(t)]),n}async fetchEntitiesAroundEntity(t,e=10){const n=this.validatePageSize(e);if(n)return n;const s=await this.api.getMembersAroundMember(this.leaderboardId,t,e,this.metadataFromJson);return s.isSuccessful&&this.cache.cacheMembers("getMembersAroundMember",this.leaderboardId,s.value,[t,String(e)]),s}getCachedEntity(t){const e=this.cache.getMembers("getMembers",this.leaderboardId,{metadataFromJson:this.metadataFromJson,keyParts:[t]});return e&&e.length>0?e[0]:null}getCachedEntities(t){return this.cache.getMembers("getMembers",this.leaderboardId,{metadataFromJson:this.metadataFromJson,keyParts:t})}getCachedTopEntities(t=10){return this.cache.getMembers("getTopMembers",this.leaderboardId,{metadataFromJson:this.metadataFromJson,keyParts:[String(t)]})}getCachedEntitiesAroundEntity(t,e=10){return this.cache.getMembers("getMembersAroundMember",this.leaderboardId,{metadataFromJson:this.metadataFromJson,keyParts:[t,String(e)]})}async upsertScore(t,e,n=-1){const s=await this.api.upsertScore(this.leaderboardId,t,e,n);if(!s.isSuccessful)return At.error(s.exception);const r=s.value;if(r.publicID!==t)return At.error(xe.notFound());const a=this.getCachedEntity(t),o=new gs(t,e,r.rank,a==null?void 0:a.metadata);return this.cache.cacheMembers("getMembers",this.leaderboardId,[o],[t]),At.success(o)}validatePageSize(t){return t<1||t>100?At.error(xe.badRequest()):null}}const eu=12,nu="leaderboard_cache_";function iu(i){let t=5381;const e=i.join(":");for(let n=0;n<e.length;n++)t=(t<<5)+t+e.charCodeAt(n)|0;return String(t)}class su{cacheMembers(t,e,n,s){var r;const a=this.buildKey(t,e,s),o=JSON.stringify({writeTime:new Date().toISOString(),members:n.map(c=>c.toJson())});(r=globalThis.localStorage)===null||r===void 0||r.setItem(a,o)}getMembers(t,e,n={}){var s,r,a;const o=this.buildKey(t,e,n.keyParts),c=(s=globalThis.localStorage)===null||s===void 0?void 0:s.getItem(o);if(!c)return null;let l;try{l=JSON.parse(c)}catch{return(r=globalThis.localStorage)===null||r===void 0||r.removeItem(o),null}const h=new Date(l.writeTime);return Date.now()-h.getTime()>=eu*3600*1e3?((a=globalThis.localStorage)===null||a===void 0||a.removeItem(o),null):l.members.map(u=>gs.fromJson(u,n.metadataFromJson))}buildKey(t,e,n){const s=[t,e];return n&&s.push(...[...n].sort()),`${nu}${iu(s)}`}}class mo{constructor(t,e,n,s,r){this.success=t,this.publicID=e,this.rank=n,this.previousRank=s,this.expireAt=r}static fromJson(t){return new mo(t.success,t.publicID,t.rank,t.previousRank,t.expireAt)}}const bs="https://podium.shared-services.us-east-1.general.prod.wildlife.io";class ru{constructor(t){this.headers=t}async getTopMembers(t,e,n){const s=`${bs}/l/${t}/top/1?pageSize=${e}`;return this.getRequest(s,n)}async getMembers(t,e,n){const s=`${bs}/l/${t}/members?ids=${e.join(",")}`;return this.getRequest(s,n)}async getMembersAroundMember(t,e,n,s){const r=`${bs}/l/${t}/members/${e}/around?pageSize=${n}`;return this.getRequest(r,s)}async upsertScore(t,e,n,s=-1){var r;let a=`${bs}/l/${t}/members/${e}/score`;s!==-1&&(a+=`?scoreTTL=${s}`);try{const o=await Wi("Podium",a,{method:"PUT",headers:Object.assign(Object.assign({},this.headers),{"Content-Type":"application/json"}),body:JSON.stringify({score:n})});return this.handleUpsertResponse(o)}catch(o){return At.error(xe.unknown(String((r=o==null?void 0:o.message)!==null&&r!==void 0?r:o),0))}}async getRequest(t,e){var n;try{const s=await Wi("Podium",t,{headers:this.headers});return this.handleResponse(s,e)}catch(s){return At.error(xe.unknown(String((n=s==null?void 0:s.message)!==null&&n!==void 0?n:s),0))}}async handleResponse(t,e){var n;switch(t.status){case 200:{const r=((n=(await t.json()).members)!==null&&n!==void 0?n:[]).map(a=>gs.fromJson(a,e));return At.success(r)}case 400:return At.error(xe.badRequest());case 401:return At.error(xe.unauthorized());case 404:return At.error(xe.notFound());case 500:return At.error(xe.internalServerError());default:{const s=await t.text().catch(()=>"");return At.error(xe.unknown(s,t.status))}}}async handleUpsertResponse(t){switch(t.status){case 200:{const e=await t.json();return At.success(mo.fromJson(e))}case 400:return At.error(xe.badRequest());case 401:return At.error(xe.unauthorized());case 404:return At.error(xe.notFound());case 500:return At.error(xe.internalServerError());default:{const e=await t.text().catch(()=>"");return At.error(xe.unknown(e,t.status))}}}}class au{constructor(){this.isInitialized=!1}initialize(t){this.isInitialized||(this.api=new ru(t),this.cache=new su,this.isInitialized=!0)}fetch(t,e){if(!this.isInitialized||!this.api||!this.cache)throw new Error("LeaderboardsService is not initialized");return new tu(t,this.api,this.cache,e)}}class _s{constructor(t,e,n="",s="",r={}){this.accountId=t,this.name=e,this.region=n,this.pictureUrl=s,this.metadata=r}static fromJson(t){var e,n,s,r;const a=(e=t.metadata)!==null&&e!==void 0?e:{},o={};for(const[c,l]of Object.entries(a))o[c]=String(l);return new _s(t.accountId,(n=t.name)!==null&&n!==void 0?n:"",(s=t.region)!==null&&s!==void 0?s:"",(r=t.pictureUrl)!==null&&r!==void 0?r:"",o)}toJson(){return{accountId:this.accountId,name:this.name,region:this.region,pictureUrl:this.pictureUrl,metadata:this.metadata}}}class ye extends Error{constructor(t,e){super(t),this.name="PlayerProfileException",this.statusCode=e}static badRequest(){return new ye("bad request",400)}static unauthorized(){return new ye("unauthorized access",401)}static notFound(){return new ye("success on communication, but no entity was found",404)}static internalServerError(){return new ye("internal server error",500)}static unknown(t,e){return new ye(`unknown error
${t}`,e)}toString(){return`PlayerProfileException(${this.statusCode}): ${this.message}`}}const tl="https://cloud-save-api.cloud-save.shared-services.us-east-1.general.prod.wildlife.io",el="wildlife-platform-player-profile";class ou{constructor(t,e,n,s){this.headers=t,this.tenantId=e,this.accountId=n,this.deviceId=s}async fetchPublicProfiles(t){var e;const n=`${tl}/get-public-documents/${el}`,s=JSON.stringify({tenant_id:this.tenantId,account_id:this.accountId,public_account_ids:t});try{const r=await Wi("CloudSave",n,{method:"POST",headers:Object.assign(Object.assign({},this.headers),{"Content-Type":"application/json"}),body:s});return this.handleFetchResponse(r)}catch(r){return At.error(ye.unknown(String((e=r==null?void 0:r.message)!==null&&e!==void 0?e:r),0))}}async publishProfile(t){var e;const n=`${tl}/public-documents/${el}`,s=JSON.stringify({tenant_id:this.tenantId,account_id:this.accountId,device_id:this.deviceId,document:t.toJson()});try{const r=await Wi("CloudSave",n,{method:"POST",headers:Object.assign(Object.assign({},this.headers),{"Content-Type":"application/json"}),body:s});return this.handlePublishResponse(r,t)}catch(r){return At.error(ye.unknown(String((e=r==null?void 0:r.message)!==null&&e!==void 0?e:r),0))}}async handleFetchResponse(t){var e;switch(t.status){case 200:{const n=await t.json(),s={};for(const r of(e=n.documents)!==null&&e!==void 0?e:[]){const a=r.accountId,o=Object.assign(Object.assign({},r.data),{accountId:a});s[a]=_s.fromJson(o)}return At.success(s)}case 400:return At.error(ye.badRequest());case 401:return At.error(ye.unauthorized());case 404:return At.error(ye.notFound());case 500:return At.error(ye.internalServerError());default:{const n=await t.text().catch(()=>"");return At.error(ye.unknown(n,t.status))}}}async handlePublishResponse(t,e){switch(t.status){case 200:return At.success(e);case 400:return At.error(ye.badRequest());case 401:return At.error(ye.unauthorized());case 404:return At.error(ye.notFound());case 500:return At.error(ye.internalServerError());default:{const n=await t.text().catch(()=>"");return At.error(ye.unknown(n,t.status))}}}}const lu=12,Es="player_profile_cache_";class cu{cacheProfile(t,e){var n;const s=JSON.stringify({writeTime:new Date().toISOString(),profile:e.toJson()});(n=globalThis.localStorage)===null||n===void 0||n.setItem(`${Es}${t}`,s)}getProfile(t){var e,n,s;const r=(e=globalThis.localStorage)===null||e===void 0?void 0:e.getItem(`${Es}${t}`);if(!r)return null;let a;try{a=JSON.parse(r)}catch{return(n=globalThis.localStorage)===null||n===void 0||n.removeItem(`${Es}${t}`),null}const o=new Date(a.writeTime);return Date.now()-o.getTime()>=lu*3600*1e3?((s=globalThis.localStorage)===null||s===void 0||s.removeItem(`${Es}${t}`),null):_s.fromJson(a.profile)}cacheProfiles(t){for(const[e,n]of Object.entries(t))this.cacheProfile(e,n)}getProfiles(t){const e={};for(const n of t){const s=this.getProfile(n);s&&(e[n]=s)}return e}}class hu{constructor(){this.isInitialized=!1,this.playerId=""}initialize(t){this.isInitialized||(this.api=new ou(t.platformHeaders,t.tenantId,t.playerId,t.deviceId),this.cache=new cu,this.playerId=t.playerId,this.isInitialized=!0)}async fetchMyProfile(){this.requireInit();const t=await this.fetchPublicProfiles([this.playerId]);if(!t.isSuccessful)return At.error(t.exception);const e=t.value;return this.playerId in e?At.success(e[this.playerId]):At.error(ye.notFound())}async fetchPublicProfiles(t){this.requireInit();const e=await this.api.fetchPublicProfiles(t);return e.isSuccessful&&this.cache&&this.cache.cacheProfiles(e.value),e}async publishProfile(t){this.requireInit();const e=await this.api.publishProfile(t);return e.isSuccessful&&this.cache&&this.cache.cacheProfile(this.playerId,e.value),e}async publishPlayerProfile(t){const e=new _s(this.playerId,t.name,t.region,t.pictureUrl,t.metadata);return this.publishProfile(e)}get cachedProfile(){var t,e;return this.requireInit(),(e=(t=this.cache)===null||t===void 0?void 0:t.getProfile(this.playerId))!==null&&e!==void 0?e:null}requireInit(){if(!this.isInitialized)throw new Error("PlayerProfilesService is not initialized")}}class uu{constructor(){this._isInitialized=!1}async initialize(t){this._isInitialized||(await It.singular_initialize({playerId:t.playerId,firstUserInstallId:t.firstUserInstallId,installId:t.installId,facebookAnonymousId:t.facebookAnonymousId}),this._isInitialized=!0)}async trackEvent(t,e){this._isInitialized&&await It.singular_trackEvent({eventName:t,attributes:e})}async trackRevenue(t,e,n,s){this._isInitialized&&await It.singular_trackRevenue({eventName:t,currency:e,amount:n,attributes:s})}}const nl="0.1.0";class du{constructor(){this._isInitialized=!1,this._accountService=new jh,this._identificationService=new Qh,this._leaderboardsService=new au,this._playerProfilesService=new hu,this._singularService=new uu,this.deviceInfoGetDeviceName=async()=>(await It.deviceInfo_getDeviceName()).value,this.deviceInfoGetDeviceModel=async()=>(await It.deviceInfo_getDeviceModel()).value,this.deviceInfoGetDeviceRegion=async()=>(await It.deviceInfo_getDeviceRegion()).value,this.deviceInfoGetDeviceLanguage=async()=>(await It.deviceInfo_getDeviceLanguage()).value,this.deviceInfoGetDeviceTimezone=async()=>(await It.deviceInfo_getDeviceTimezone()).value,this.deviceInfoGetDeviceSystemVersion=async()=>(await It.deviceInfo_getDeviceSystemVersion()).value,this.deviceInfoGetAppBundle=async()=>(await It.deviceInfo_getAppBundle()).value,this.deviceInfoGetAppVersion=async()=>(await It.deviceInfo_getAppVersion()).value,this.deviceInfoGetAppBuildNumber=async()=>(await It.deviceInfo_getAppBuildNumber()).value,Kh()}get accountService(){return this._accountService}get identificationService(){return this._identificationService}get leaderboardsService(){return this._leaderboardsService}get playerProfilesService(){return this._playerProfilesService}get singularService(){return this._singularService}get isInitialized(){return this._isInitialized}async initialize(t){var e,n,s,r,a,o,c,l,h,d,u;if(this._isInitialized)throw new Error("Platform already initialized");await this._identificationService.initialize(),t.playerId!=null&&await this._identificationService.setPlayerId(t.playerId);const p=this._identificationService.getPlayerId();await It.initialize({appId:t.appId,playerId:p,platformVersion:nl,tenantId:`${t.appId}:${t.environment}`});const g=(e=await this.deviceInfoGetAppBundle())!==null&&e!==void 0?e:t.appId,x=`${t.appId}:${t.environment}`,m=(n=await this.getDeviceId())!==null&&n!==void 0?n:"",f=!((s=await this.getPlatformVersion())===null||s===void 0)&&s.toLowerCase().includes("ios")?"ios":"android",y={fiu:m,bundleId:g,platform:f,buildNumber:(r=await this.deviceInfoGetAppBuildNumber())!==null&&r!==void 0?r:"1",deviceType:(a=await this.deviceInfoGetDeviceModel())!==null&&a!==void 0?a:"unknown",clientVersion:(o=await this.deviceInfoGetAppVersion())!==null&&o!==void 0?o:"1.0.0",language:(c=await this.deviceInfoGetDeviceLanguage())!==null&&c!==void 0?c:"en",osVersion:(l=await this.deviceInfoGetDeviceSystemVersion())!==null&&l!==void 0?l:"unknown",region:(h=await this.deviceInfoGetDeviceRegion())!==null&&h!==void 0?h:"US"};await this._accountService.authenticate({playerId:p,tenantId:x,accountData:y});const T={"Wildlife-Platform-SDK-Version":nl,"Wildlife-Platform-Bundle-Id":g,"Wildlife-Platform-Tenant-Id":x,"Wildlife-Platform-Player-Id":p,"Wildlife-Platform-Runtime-Platform":"Capacitor"};this._accountService.isAuthenticated&&(T["Wildlife-Platform-Player-Token"]=this._accountService.securityToken),this._leaderboardsService.initialize(T),this._playerProfilesService.initialize({platformHeaders:T,playerId:p,tenantId:x,deviceId:m});const b=await this.getFirstInstall(),w=await this.getCurrentInstall(),E=(d=b==null?void 0:b.gameInstallId)!==null&&d!==void 0?d:"",C=(u=w==null?void 0:w.gameInstallId)!==null&&u!==void 0?u:"";await this._singularService.initialize({playerId:p,firstUserInstallId:E,installId:C,facebookAnonymousId:t.facebookAnonymousId}),this._isInitialized=!0,t.facebookAnonymousId!=null&&await this.analyticsSendEvent("singular:ConfigureFBAnon",{anonId:t.facebookAnonymousId,init:"automatic"})}requireInit(){if(!this._isInitialized)throw new Error("Platform is not initialized")}async getPlatformVersion(){return(await It.getPlatformVersion()).value}async getNativeSdkVersion(){return(await It.getNativeSdkVersion()).value}get pluginVersion(){return Zh}async setPlatformHeaders(t){await It.networking_setPlatformHeaders(t)}async trackingTransparencyGetAdvertisementId(){return(await It.trackingTransparency_getAdvertisementId()).value}async getInstallId(){return(await It.identification_getDeviceId()).value}async getDeviceId(){return(await It.identification_getDeviceId()).value}async getCurrentInstall(){return(await It.identification_getCurrentInstall()).value}async getFirstInstall(){return(await It.identification_getFirstInstall()).value}async analyticsSendEvent(t,e,n=!1){this.requireInit(),await It.analytics_sendEvent({eventType:t,eventParameters:e,oneTimeEvent:n})}async analyticsTriggerAllEventsUpload(){this.requireInit(),await It.analytics_triggerAllEventsUpload()}get analyticsIsFirstSession(){return It.analytics_isFirstSession().then(t=>t.value)}get analyticsIsReinstall(){return It.analytics_isReinstall().then(t=>t.value)}get analyticsNumSessions(){return It.analytics_numSessions().then(t=>t.value)}get analyticsFirstInstallId(){return It.analytics_firstInstallId().then(t=>t.value)}get analyticsFirstInstallAppVersion(){return It.analytics_firstInstallAppVersion().then(t=>t.value)}get analyticsActivationDate(){return It.analytics_activationDate().then(t=>t.value)}async purchasesInitialize(t){this.requireInit(),await It.purchases_initialize(t)}async purchasesBuyProduct(t,e){this.requireInit(),await It.purchases_buyProduct({itemId:t,placement:e})}async purchasesRestorePurchases(){this.requireInit(),await It.purchases_restorePurchases()}async purchasesGetProductsList(){return this.requireInit(),(await It.purchases_getProductsList()).value}async purchasesFinishTransaction(t,e){this.requireInit(),await It.purchases_finishTransaction({productId:t,transactionId:e})}async remoteConfigInitialize(){this.requireInit(),await It.remoteconfig_initialize()}async remoteConfigFetch(){this.requireInit(),await It.remoteconfig_fetch()}async remoteConfigActivate(){this.requireInit(),await It.remoteconfig_activate()}async remoteConfigGetAll(){return this.requireInit(),It.remoteconfig_getAll()}async remoteConfigGetValue(t){return this.requireInit(),(await It.remoteconfig_getValue({key:t})).value}async remoteConfigGetBoolean(t){return this.requireInit(),(await It.remoteconfig_getBoolean({key:t})).value}async remoteConfigGetString(t){return this.requireInit(),(await It.remoteconfig_getString({key:t})).value}async remoteConfigGetInt(t){return this.requireInit(),(await It.remoteconfig_getInt({key:t})).value}async remoteConfigGetDouble(t){return this.requireInit(),(await It.remoteconfig_getDouble({key:t})).value}addAnalyticsListener(t){return It.addListener("analyticsEvents",t)}addPurchaseListener(t){return It.addListener("purchaseEvents",t)}addRemoteConfigListener(t){return It.addListener("remoteConfigEvents",t)}}let Tr=null;function il(){return Tr||(Tr=new du),Tr}var sl;(function(i){i.providerNotFound="providerNotFound",i.invalidScopeArgument="invalidScopeArgument",i.timeoutException="timeoutException",i.unexpectedException="unexpectedException",i.networkError="networkError",i.deserializationError="deserializationError"})(sl||(sl={}));var rl;(function(i){i.remote="remote",i.local="local",i.fallback="fallback",i.cache="cache"})(rl||(rl={}));const fu=18;let nr,zi,va,al,ur,dr,Nc;function pu(){nr=document.getElementById("loader"),zi=document.getElementById("progress-bar"),va=document.getElementById("loader-status"),al=document.getElementById("loader-title"),ur=document.getElementById("loader-shell-version"),dr=document.getElementById("loader-content-version"),Nc=document.getElementById("particles"),al.textContent="Soccer 1x1",ur.textContent="Shell v...",dr.textContent="Content v1.0.0",_u(),Fc(!0)}function mu(i){ur&&(ur.textContent=`Shell v${i}`);const t=document.getElementById("error-shell-version");t&&(t.textContent=`Shell v${i}`)}function gu(i){dr&&(dr.textContent=`Content v${i}`);const t=document.getElementById("error-content-version");t&&(t.textContent=`Content v${i}`);const e=document.getElementById("loader-bundle-checksum");if(e){const n=localStorage.getItem("ota_current_checksum")||"";e.textContent=n?`Bundle: ${n.slice(7,19)}`:"Bundle: built-in"}}function _u(){for(let i=0;i<fu;i++){const t=document.createElement("div");t.className="particle";const e=2+Math.random()*4,n=Math.random()*100,s=8+Math.random()*12,r=Math.random()*s;t.style.cssText=`
      width: ${e}px; height: ${e}px;
      left: ${n}%;
      bottom: -${e}px;
      animation-duration: ${s}s;
      animation-delay: -${r}s;
    `,Nc.appendChild(t)}}function Ts(i){va&&(va.textContent=i)}function ol(i){zi&&(Fc(!1),zi.style.width=`${Math.min(100,Math.max(0,i))}%`)}function Fc(i){zi&&(i?zi.classList.add("indeterminate"):zi.classList.remove("indeterminate"))}function vu(){return new Promise(i=>{if(!nr)return i();nr.classList.add("fade-out"),setTimeout(()=>{nr.style.display="none",i()},500)})}let go,Oc,ll,xa=null;function xu(){go=document.getElementById("error-screen"),Oc=document.getElementById("error-message"),ll=document.getElementById("error-retry");const i=document.getElementById("error-shell-version"),t=document.getElementById("error-content-version");i&&(i.textContent="Shell v..."),t&&(t.textContent="Content v1.0.0"),ll.addEventListener("click",()=>{xa?(Su(),xa()):window.location.reload()})}function Mu(i,t){xa=t||null,Oc.textContent=i,go.hidden=!1}function Su(){go.hidden=!0}const yu="",Ar=!1,As="1.0.0",vi=(...i)=>console.log("[OTA]",...i);let bu=null,Fi={};function cl(i,t){(Fi[i]||[]).forEach(e=>e(t))}function wr(){return Rn.isNativePlatform()}const Bn={on(i,t){return Fi[i]||(Fi[i]=[]),Fi[i].push(t),()=>{Fi[i]=Fi[i].filter(e=>e!==t)}},async init(){vi("Config:",JSON.stringify({OTA_ENABLED:Ar,OTA_MANIFEST_URL:yu,CURRENT_VERSION:As,native:wr()}));{vi("Skipping — OTA_ENABLED:",Ar,"native:",wr()),cl("status","OTA skipped (web or disabled)");return}},async checkForUpdate(){return vi("Check skipped — OTA_ENABLED:",Ar,"OTA_MANIFEST_URL:","(empty)"),null},async downloadUpdate(i){return vi("Download skipped — plugin not available"),cl("status","Updater not available"),null},async applyNow(){{vi("applyNow() skipped — no pending bundle or plugin");return}},async getShellVersion(){if(wr())try{return(await Uc.getInfo()).version||As}catch{}return As},async getContentVersion(){return vi("Content version: using shell version (no plugin or web)"),As},hasPendingUpdate(){return bu!==null}};/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const _o="183",Eu=0,hl=1,Tu=2,ir=1,Au=2,cs=3,Kn=0,Ve=1,ke=2,Ln=0,Gi=1,ul=2,dl=3,fl=4,wu=5,ai=100,Cu=101,Ru=102,Iu=103,Pu=104,Lu=200,Du=201,Uu=202,Nu=203,Ma=204,Sa=205,Fu=206,Ou=207,Bu=208,ku=209,zu=210,Gu=211,Vu=212,Hu=213,Wu=214,ya=0,ba=1,Ea=2,Xi=3,Ta=4,Aa=5,wa=6,Ca=7,vo=0,Xu=1,qu=2,pn=0,Bc=1,kc=2,zc=3,Gc=4,Vc=5,Hc=6,Wc=7,Xc=300,di=301,qi=302,Cr=303,Rr=304,gr=306,Ra=1e3,In=1001,Ia=1002,Re=1003,Yu=1004,ws=1005,Ne=1006,Ir=1007,hi=1008,$e=1009,qc=1010,Yc=1011,us=1012,xo=1013,_n=1014,dn=1015,Un=1016,Mo=1017,So=1018,ds=1020,$c=35902,Kc=35899,Zc=1021,jc=1022,rn=1023,Nn=1026,ui=1027,Jc=1028,yo=1029,Yi=1030,bo=1031,Eo=1033,sr=33776,rr=33777,ar=33778,or=33779,Pa=35840,La=35841,Da=35842,Ua=35843,Na=36196,Fa=37492,Oa=37496,Ba=37488,ka=37489,za=37490,Ga=37491,Va=37808,Ha=37809,Wa=37810,Xa=37811,qa=37812,Ya=37813,$a=37814,Ka=37815,Za=37816,ja=37817,Ja=37818,Qa=37819,to=37820,eo=37821,no=36492,io=36494,so=36495,ro=36283,ao=36284,oo=36285,lo=36286,$u=3200,Qc=0,Ku=1,Xn="",je="srgb",$i="srgb-linear",fr="linear",te="srgb",xi=7680,pl=519,Zu=512,ju=513,Ju=514,To=515,Qu=516,td=517,Ao=518,ed=519,ml=35044,gl="300 es",fn=2e3,fs=2001;function nd(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function ps(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function id(){const i=ps("canvas");return i.style.display="block",i}const _l={};function vl(...i){const t="THREE."+i.shift();console.log(t,...i)}function th(i){const t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){const e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Dt(...i){i=th(i);const t="THREE."+i.shift();{const e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function Xt(...i){i=th(i);const t="THREE."+i.shift();{const e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function pr(...i){const t=i.join(" ");t in _l||(_l[t]=!0,Dt(...i))}function sd(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const rd={[ya]:ba,[Ea]:wa,[Ta]:Ca,[Xi]:Aa,[ba]:ya,[wa]:Ea,[Ca]:Ta,[Aa]:Xi};class Zi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const s=n[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const Le=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Pr=Math.PI/180,co=180/Math.PI;function vs(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Le[i&255]+Le[i>>8&255]+Le[i>>16&255]+Le[i>>24&255]+"-"+Le[t&255]+Le[t>>8&255]+"-"+Le[t>>16&15|64]+Le[t>>24&255]+"-"+Le[e&63|128]+Le[e>>8&255]+"-"+Le[e>>16&255]+Le[e>>24&255]+Le[n&255]+Le[n>>8&255]+Le[n>>16&255]+Le[n>>24&255]).toLowerCase()}function Vt(i,t,e){return Math.max(t,Math.min(e,i))}function ad(i,t){return(i%t+t)%t}function Lr(i,t,e){return(1-e)*i+e*t}function ts(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function ze(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class Ht{constructor(t=0,e=0){Ht.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Vt(this.x,t.x,e.x),this.y=Vt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Vt(this.x,t,e),this.y=Vt(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Vt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Vt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ji{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let c=n[s+0],l=n[s+1],h=n[s+2],d=n[s+3],u=r[a+0],p=r[a+1],g=r[a+2],x=r[a+3];if(d!==x||c!==u||l!==p||h!==g){let m=c*u+l*p+h*g+d*x;m<0&&(u=-u,p=-p,g=-g,x=-x,m=-m);let f=1-o;if(m<.9995){const y=Math.acos(m),T=Math.sin(y);f=Math.sin(f*y)/T,o=Math.sin(o*y)/T,c=c*f+u*o,l=l*f+p*o,h=h*f+g*o,d=d*f+x*o}else{c=c*f+u*o,l=l*f+p*o,h=h*f+g*o,d=d*f+x*o;const y=1/Math.sqrt(c*c+l*l+h*h+d*d);c*=y,l*=y,h*=y,d*=y}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,s,r,a){const o=n[s],c=n[s+1],l=n[s+2],h=n[s+3],d=r[a],u=r[a+1],p=r[a+2],g=r[a+3];return t[e]=o*g+h*d+c*p-l*u,t[e+1]=c*g+h*u+l*d-o*p,t[e+2]=l*g+h*p+o*u-c*d,t[e+3]=h*g-o*d-c*u-l*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(s/2),d=o(r/2),u=c(n/2),p=c(s/2),g=c(r/2);switch(a){case"XYZ":this._x=u*h*d+l*p*g,this._y=l*p*d-u*h*g,this._z=l*h*g+u*p*d,this._w=l*h*d-u*p*g;break;case"YXZ":this._x=u*h*d+l*p*g,this._y=l*p*d-u*h*g,this._z=l*h*g-u*p*d,this._w=l*h*d+u*p*g;break;case"ZXY":this._x=u*h*d-l*p*g,this._y=l*p*d+u*h*g,this._z=l*h*g+u*p*d,this._w=l*h*d-u*p*g;break;case"ZYX":this._x=u*h*d-l*p*g,this._y=l*p*d+u*h*g,this._z=l*h*g-u*p*d,this._w=l*h*d+u*p*g;break;case"YZX":this._x=u*h*d+l*p*g,this._y=l*p*d+u*h*g,this._z=l*h*g-u*p*d,this._w=l*h*d-u*p*g;break;case"XZY":this._x=u*h*d-l*p*g,this._y=l*p*d-u*h*g,this._z=l*h*g+u*p*d,this._w=l*h*d+u*p*g;break;default:Dt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],c=e[9],l=e[2],h=e[6],d=e[10],u=n+o+d;if(u>0){const p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(h-c)*p,this._y=(r-l)*p,this._z=(a-s)*p}else if(n>o&&n>d){const p=2*Math.sqrt(1+n-o-d);this._w=(h-c)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+l)/p}else if(o>d){const p=2*Math.sqrt(1+o-n-d);this._w=(r-l)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(c+h)/p}else{const p=2*Math.sqrt(1+d-n-o);this._w=(a-s)/p,this._x=(r+l)/p,this._y=(c+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Vt(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+a*o+s*l-r*c,this._y=s*h+a*c+r*o-n*l,this._z=r*h+a*l+n*c-s*o,this._w=a*h-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let c=1-e;if(o<.9995){const l=Math.acos(o),h=Math.sin(l);c=Math.sin(c*l)/h,e=Math.sin(e*l)/h,this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+a*e,this._onChangeCallback()}else this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+a*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class N{constructor(t=0,e=0,n=0){N.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(xl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(xl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*s-o*n),h=2*(o*e-r*s),d=2*(r*n-a*e);return this.x=e+c*l+a*d-o*h,this.y=n+c*h+o*l-r*d,this.z=s+c*d+r*h-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Vt(this.x,t.x,e.x),this.y=Vt(this.y,t.y,e.y),this.z=Vt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Vt(this.x,t,e),this.y=Vt(this.y,t,e),this.z=Vt(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Vt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,c=e.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Dr.copy(this).projectOnVector(t),this.sub(Dr)}reflect(t){return this.sub(Dr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Vt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Dr=new N,xl=new ji;class Ft{constructor(t,e,n,s,r,a,o,c,l){Ft.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l)}set(t,e,n,s,r,a,o,c,l){const h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],d=n[7],u=n[2],p=n[5],g=n[8],x=s[0],m=s[3],f=s[6],y=s[1],T=s[4],b=s[7],w=s[2],E=s[5],C=s[8];return r[0]=a*x+o*y+c*w,r[3]=a*m+o*T+c*E,r[6]=a*f+o*b+c*C,r[1]=l*x+h*y+d*w,r[4]=l*m+h*T+d*E,r[7]=l*f+h*b+d*C,r[2]=u*x+p*y+g*w,r[5]=u*m+p*T+g*E,r[8]=u*f+p*b+g*C,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8];return e*a*h-e*o*l-n*r*h+n*o*c+s*r*l-s*a*c}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],d=h*a-o*l,u=o*c-h*r,p=l*r-a*c,g=e*d+n*u+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/g;return t[0]=d*x,t[1]=(s*l-h*n)*x,t[2]=(o*n-s*a)*x,t[3]=u*x,t[4]=(h*e-s*c)*x,t[5]=(s*r-o*e)*x,t[6]=p*x,t[7]=(n*c-l*e)*x,t[8]=(a*e-n*r)*x,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+t,-s*l,s*c,-s*(-l*a+c*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Ur.makeScale(t,e)),this}rotate(t){return this.premultiply(Ur.makeRotation(-t)),this}translate(t,e){return this.premultiply(Ur.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Ur=new Ft,Ml=new Ft().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Sl=new Ft().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function od(){const i={enabled:!0,workingColorSpace:$i,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===te&&(s.r=Dn(s.r),s.g=Dn(s.g),s.b=Dn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===te&&(s.r=Vi(s.r),s.g=Vi(s.g),s.b=Vi(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Xn?fr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return pr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return pr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[$i]:{primaries:t,whitePoint:n,transfer:fr,toXYZ:Ml,fromXYZ:Sl,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:je},outputColorSpaceConfig:{drawingBufferColorSpace:je}},[je]:{primaries:t,whitePoint:n,transfer:te,toXYZ:Ml,fromXYZ:Sl,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:je}}}),i}const qt=od();function Dn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Vi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Mi;class ld{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Mi===void 0&&(Mi=ps("canvas")),Mi.width=t.width,Mi.height=t.height;const s=Mi.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=Mi}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=ps("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Dn(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Dn(e[n]/255)*255):e[n]=Dn(e[n]);return{data:e,width:t.width,height:t.height}}else return Dt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let cd=0;class wo{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:cd++}),this.uuid=vs(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Nr(s[a].image)):r.push(Nr(s[a]))}else r=Nr(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function Nr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?ld.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Dt("Texture: Unable to serialize Texture."),{})}let hd=0;const Fr=new N;class Ie extends Zi{constructor(t=Ie.DEFAULT_IMAGE,e=Ie.DEFAULT_MAPPING,n=In,s=In,r=Ne,a=hi,o=rn,c=$e,l=Ie.DEFAULT_ANISOTROPY,h=Xn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:hd++}),this.uuid=vs(),this.name="",this.source=new wo(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Ht(0,0),this.repeat=new Ht(1,1),this.center=new Ht(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ft,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Fr).x}get height(){return this.source.getSize(Fr).y}get depth(){return this.source.getSize(Fr).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){Dt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Dt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Xc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ra:t.x=t.x-Math.floor(t.x);break;case In:t.x=t.x<0?0:1;break;case Ia:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ra:t.y=t.y-Math.floor(t.y);break;case In:t.y=t.y<0?0:1;break;case Ia:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ie.DEFAULT_IMAGE=null;Ie.DEFAULT_MAPPING=Xc;Ie.DEFAULT_ANISOTROPY=1;class ge{constructor(t=0,e=0,n=0,s=1){ge.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const c=t.elements,l=c[0],h=c[4],d=c[8],u=c[1],p=c[5],g=c[9],x=c[2],m=c[6],f=c[10];if(Math.abs(h-u)<.01&&Math.abs(d-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+x)<.1&&Math.abs(g+m)<.1&&Math.abs(l+p+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const T=(l+1)/2,b=(p+1)/2,w=(f+1)/2,E=(h+u)/4,C=(d+x)/4,_=(g+m)/4;return T>b&&T>w?T<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(T),s=E/n,r=C/n):b>w?b<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(b),n=E/s,r=_/s):w<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),n=C/r,s=_/r),this.set(n,s,r,e),this}let y=Math.sqrt((m-g)*(m-g)+(d-x)*(d-x)+(u-h)*(u-h));return Math.abs(y)<.001&&(y=1),this.x=(m-g)/y,this.y=(d-x)/y,this.z=(u-h)/y,this.w=Math.acos((l+p+f-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Vt(this.x,t.x,e.x),this.y=Vt(this.y,t.y,e.y),this.z=Vt(this.z,t.z,e.z),this.w=Vt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Vt(this.x,t,e),this.y=Vt(this.y,t,e),this.z=Vt(this.z,t,e),this.w=Vt(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Vt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class ud extends Zi{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ne,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new ge(0,0,t,e),this.scissorTest=!1,this.viewport=new ge(0,0,t,e),this.textures=[];const s={width:t,height:e,depth:n.depth},r=new Ie(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){const e={minFilter:Ne,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new wo(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class mn extends ud{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class eh extends Ie{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Re,this.minFilter=Re,this.wrapR=In,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class dd extends Ie{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Re,this.minFilter=Re,this.wrapR=In,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class pe{constructor(t,e,n,s,r,a,o,c,l,h,d,u,p,g,x,m){pe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l,h,d,u,p,g,x,m)}set(t,e,n,s,r,a,o,c,l,h,d,u,p,g,x,m){const f=this.elements;return f[0]=t,f[4]=e,f[8]=n,f[12]=s,f[1]=r,f[5]=a,f[9]=o,f[13]=c,f[2]=l,f[6]=h,f[10]=d,f[14]=u,f[3]=p,f[7]=g,f[11]=x,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new pe().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinant()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinant()===0)return this.identity();const e=this.elements,n=t.elements,s=1/Si.setFromMatrixColumn(t,0).length(),r=1/Si.setFromMatrixColumn(t,1).length(),a=1/Si.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){const u=a*h,p=a*d,g=o*h,x=o*d;e[0]=c*h,e[4]=-c*d,e[8]=l,e[1]=p+g*l,e[5]=u-x*l,e[9]=-o*c,e[2]=x-u*l,e[6]=g+p*l,e[10]=a*c}else if(t.order==="YXZ"){const u=c*h,p=c*d,g=l*h,x=l*d;e[0]=u+x*o,e[4]=g*o-p,e[8]=a*l,e[1]=a*d,e[5]=a*h,e[9]=-o,e[2]=p*o-g,e[6]=x+u*o,e[10]=a*c}else if(t.order==="ZXY"){const u=c*h,p=c*d,g=l*h,x=l*d;e[0]=u-x*o,e[4]=-a*d,e[8]=g+p*o,e[1]=p+g*o,e[5]=a*h,e[9]=x-u*o,e[2]=-a*l,e[6]=o,e[10]=a*c}else if(t.order==="ZYX"){const u=a*h,p=a*d,g=o*h,x=o*d;e[0]=c*h,e[4]=g*l-p,e[8]=u*l+x,e[1]=c*d,e[5]=x*l+u,e[9]=p*l-g,e[2]=-l,e[6]=o*c,e[10]=a*c}else if(t.order==="YZX"){const u=a*c,p=a*l,g=o*c,x=o*l;e[0]=c*h,e[4]=x-u*d,e[8]=g*d+p,e[1]=d,e[5]=a*h,e[9]=-o*h,e[2]=-l*h,e[6]=p*d+g,e[10]=u-x*d}else if(t.order==="XZY"){const u=a*c,p=a*l,g=o*c,x=o*l;e[0]=c*h,e[4]=-d,e[8]=l*h,e[1]=u*d+x,e[5]=a*h,e[9]=p*d-g,e[2]=g*d-p,e[6]=o*h,e[10]=x*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(fd,t,pd)}lookAt(t,e,n){const s=this.elements;return Xe.subVectors(t,e),Xe.lengthSq()===0&&(Xe.z=1),Xe.normalize(),kn.crossVectors(n,Xe),kn.lengthSq()===0&&(Math.abs(n.z)===1?Xe.x+=1e-4:Xe.z+=1e-4,Xe.normalize(),kn.crossVectors(n,Xe)),kn.normalize(),Cs.crossVectors(Xe,kn),s[0]=kn.x,s[4]=Cs.x,s[8]=Xe.x,s[1]=kn.y,s[5]=Cs.y,s[9]=Xe.y,s[2]=kn.z,s[6]=Cs.z,s[10]=Xe.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],d=n[5],u=n[9],p=n[13],g=n[2],x=n[6],m=n[10],f=n[14],y=n[3],T=n[7],b=n[11],w=n[15],E=s[0],C=s[4],_=s[8],S=s[12],O=s[1],R=s[5],U=s[9],F=s[13],H=s[2],B=s[6],z=s[10],G=s[14],Q=s[3],Z=s[7],ht=s[11],mt=s[15];return r[0]=a*E+o*O+c*H+l*Q,r[4]=a*C+o*R+c*B+l*Z,r[8]=a*_+o*U+c*z+l*ht,r[12]=a*S+o*F+c*G+l*mt,r[1]=h*E+d*O+u*H+p*Q,r[5]=h*C+d*R+u*B+p*Z,r[9]=h*_+d*U+u*z+p*ht,r[13]=h*S+d*F+u*G+p*mt,r[2]=g*E+x*O+m*H+f*Q,r[6]=g*C+x*R+m*B+f*Z,r[10]=g*_+x*U+m*z+f*ht,r[14]=g*S+x*F+m*G+f*mt,r[3]=y*E+T*O+b*H+w*Q,r[7]=y*C+T*R+b*B+w*Z,r[11]=y*_+T*U+b*z+w*ht,r[15]=y*S+T*F+b*G+w*mt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],c=t[9],l=t[13],h=t[2],d=t[6],u=t[10],p=t[14],g=t[3],x=t[7],m=t[11],f=t[15],y=c*p-l*u,T=o*p-l*d,b=o*u-c*d,w=a*p-l*h,E=a*u-c*h,C=a*d-o*h;return e*(x*y-m*T+f*b)-n*(g*y-m*w+f*E)+s*(g*T-x*w+f*C)-r*(g*b-x*E+m*C)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],d=t[9],u=t[10],p=t[11],g=t[12],x=t[13],m=t[14],f=t[15],y=e*o-n*a,T=e*c-s*a,b=e*l-r*a,w=n*c-s*o,E=n*l-r*o,C=s*l-r*c,_=h*x-d*g,S=h*m-u*g,O=h*f-p*g,R=d*m-u*x,U=d*f-p*x,F=u*f-p*m,H=y*F-T*U+b*R+w*O-E*S+C*_;if(H===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const B=1/H;return t[0]=(o*F-c*U+l*R)*B,t[1]=(s*U-n*F-r*R)*B,t[2]=(x*C-m*E+f*w)*B,t[3]=(u*E-d*C-p*w)*B,t[4]=(c*O-a*F-l*S)*B,t[5]=(e*F-s*O+r*S)*B,t[6]=(m*b-g*C-f*T)*B,t[7]=(h*C-u*b+p*T)*B,t[8]=(a*U-o*O+l*_)*B,t[9]=(n*O-e*U-r*_)*B,t[10]=(g*E-x*b+f*y)*B,t[11]=(d*b-h*E-p*y)*B,t[12]=(o*S-a*R-c*_)*B,t[13]=(e*R-n*S+s*_)*B,t[14]=(x*T-g*w-m*y)*B,t[15]=(h*w-d*T+u*y)*B,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,c=t.z,l=r*a,h=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,h*o+n,h*c-s*a,0,l*c-s*o,h*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,a=e._y,o=e._z,c=e._w,l=r+r,h=a+a,d=o+o,u=r*l,p=r*h,g=r*d,x=a*h,m=a*d,f=o*d,y=c*l,T=c*h,b=c*d,w=n.x,E=n.y,C=n.z;return s[0]=(1-(x+f))*w,s[1]=(p+b)*w,s[2]=(g-T)*w,s[3]=0,s[4]=(p-b)*E,s[5]=(1-(u+f))*E,s[6]=(m+y)*E,s[7]=0,s[8]=(g+T)*C,s[9]=(m-y)*C,s[10]=(1-(u+x))*C,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];const r=this.determinant();if(r===0)return n.set(1,1,1),e.identity(),this;let a=Si.set(s[0],s[1],s[2]).length();const o=Si.set(s[4],s[5],s[6]).length(),c=Si.set(s[8],s[9],s[10]).length();r<0&&(a=-a),tn.copy(this);const l=1/a,h=1/o,d=1/c;return tn.elements[0]*=l,tn.elements[1]*=l,tn.elements[2]*=l,tn.elements[4]*=h,tn.elements[5]*=h,tn.elements[6]*=h,tn.elements[8]*=d,tn.elements[9]*=d,tn.elements[10]*=d,e.setFromRotationMatrix(tn),n.x=a,n.y=o,n.z=c,this}makePerspective(t,e,n,s,r,a,o=fn,c=!1){const l=this.elements,h=2*r/(e-t),d=2*r/(n-s),u=(e+t)/(e-t),p=(n+s)/(n-s);let g,x;if(c)g=r/(a-r),x=a*r/(a-r);else if(o===fn)g=-(a+r)/(a-r),x=-2*a*r/(a-r);else if(o===fs)g=-a/(a-r),x=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=d,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=fn,c=!1){const l=this.elements,h=2/(e-t),d=2/(n-s),u=-(e+t)/(e-t),p=-(n+s)/(n-s);let g,x;if(c)g=1/(a-r),x=a/(a-r);else if(o===fn)g=-2/(a-r),x=-(a+r)/(a-r);else if(o===fs)g=-1/(a-r),x=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=d,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=g,l[14]=x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Si=new N,tn=new pe,fd=new N(0,0,0),pd=new N(1,1,1),kn=new N,Cs=new N,Xe=new N,yl=new pe,bl=new ji;class vn{constructor(t=0,e=0,n=0,s=vn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],h=s[9],d=s[2],u=s[6],p=s[10];switch(e){case"XYZ":this._y=Math.asin(Vt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Vt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Vt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Vt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Vt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Vt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:Dt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return yl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(yl,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return bl.setFromEuler(this),this.setFromQuaternion(bl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}vn.DEFAULT_ORDER="XYZ";class Co{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let md=0;const El=new N,yi=new ji,yn=new pe,Rs=new N,es=new N,gd=new N,_d=new ji,Tl=new N(1,0,0),Al=new N(0,1,0),wl=new N(0,0,1),Cl={type:"added"},vd={type:"removed"},bi={type:"childadded",child:null},Or={type:"childremoved",child:null};class Fe extends Zi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:md++}),this.uuid=vs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Fe.DEFAULT_UP.clone();const t=new N,e=new vn,n=new ji,s=new N(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new pe},normalMatrix:{value:new Ft}}),this.matrix=new pe,this.matrixWorld=new pe,this.matrixAutoUpdate=Fe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Fe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Co,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return yi.setFromAxisAngle(t,e),this.quaternion.multiply(yi),this}rotateOnWorldAxis(t,e){return yi.setFromAxisAngle(t,e),this.quaternion.premultiply(yi),this}rotateX(t){return this.rotateOnAxis(Tl,t)}rotateY(t){return this.rotateOnAxis(Al,t)}rotateZ(t){return this.rotateOnAxis(wl,t)}translateOnAxis(t,e){return El.copy(t).applyQuaternion(this.quaternion),this.position.add(El.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Tl,t)}translateY(t){return this.translateOnAxis(Al,t)}translateZ(t){return this.translateOnAxis(wl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(yn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Rs.copy(t):Rs.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),es.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?yn.lookAt(es,Rs,this.up):yn.lookAt(Rs,es,this.up),this.quaternion.setFromRotationMatrix(yn),s&&(yn.extractRotation(s.matrixWorld),yi.setFromRotationMatrix(yn),this.quaternion.premultiply(yi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Xt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Cl),bi.child=t,this.dispatchEvent(bi),bi.child=null):Xt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(vd),Or.child=t,this.dispatchEvent(Or),Or.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),yn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),yn.multiply(t.parent.matrixWorld)),t.applyMatrix4(yn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Cl),bi.child=t,this.dispatchEvent(bi),bi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(es,t,gd),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(es,_d,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const d=c[l];r(t.shapes,d)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(t.materials,this.material[c]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(t.animations,c))}}if(e){const o=a(t.geometries),c=a(t.materials),l=a(t.textures),h=a(t.images),d=a(t.shapes),u=a(t.skeletons),p=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const c=[];for(const l in o){const h=o[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),t.pivot!==null&&(this.pivot=t.pivot.clone()),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}Fe.DEFAULT_UP=new N(0,1,0);Fe.DEFAULT_MATRIX_AUTO_UPDATE=!0;Fe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class hn extends Fe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const xd={type:"move"};class Br{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new hn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new hn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new hn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(const x of t.hand.values()){const m=e.getJointPose(x,n),f=this._getHandJoint(l,x);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const h=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],u=h.position.distanceTo(d.position),p=.02,g=.005;l.inputState.pinching&&u>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&u<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(xd)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new hn;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const nh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},zn={h:0,s:0,l:0},Is={h:0,s:0,l:0};function kr(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Kt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=je){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,qt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=qt.workingColorSpace){return this.r=t,this.g=e,this.b=n,qt.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=qt.workingColorSpace){if(t=ad(t,1),e=Vt(e,0,1),n=Vt(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=kr(a,r,t+1/3),this.g=kr(a,r,t),this.b=kr(a,r,t-1/3)}return qt.colorSpaceToWorking(this,s),this}setStyle(t,e=je){function n(r){r!==void 0&&parseFloat(r)<1&&Dt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Dt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Dt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=je){const n=nh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Dt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Dn(t.r),this.g=Dn(t.g),this.b=Dn(t.b),this}copyLinearToSRGB(t){return this.r=Vi(t.r),this.g=Vi(t.g),this.b=Vi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=je){return qt.workingToColorSpace(De.copy(this),t),Math.round(Vt(De.r*255,0,255))*65536+Math.round(Vt(De.g*255,0,255))*256+Math.round(Vt(De.b*255,0,255))}getHexString(t=je){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=qt.workingColorSpace){qt.workingToColorSpace(De.copy(this),e);const n=De.r,s=De.g,r=De.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let c,l;const h=(o+a)/2;if(o===a)c=0,l=0;else{const d=a-o;switch(l=h<=.5?d/(a+o):d/(2-a-o),a){case n:c=(s-r)/d+(s<r?6:0);break;case s:c=(r-n)/d+2;break;case r:c=(n-s)/d+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=qt.workingColorSpace){return qt.workingToColorSpace(De.copy(this),e),t.r=De.r,t.g=De.g,t.b=De.b,t}getStyle(t=je){qt.workingToColorSpace(De.copy(this),t);const e=De.r,n=De.g,s=De.b;return t!==je?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(zn),this.setHSL(zn.h+t,zn.s+e,zn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(zn),t.getHSL(Is);const n=Lr(zn.h,Is.h,e),s=Lr(zn.s,Is.s,e),r=Lr(zn.l,Is.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const De=new Kt;Kt.NAMES=nh;class Md extends Fe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new vn,this.environmentIntensity=1,this.environmentRotation=new vn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}const en=new N,bn=new N,zr=new N,En=new N,Ei=new N,Ti=new N,Rl=new N,Gr=new N,Vr=new N,Hr=new N,Wr=new ge,Xr=new ge,qr=new ge;class sn{constructor(t=new N,e=new N,n=new N){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),en.subVectors(t,e),s.cross(en);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){en.subVectors(s,e),bn.subVectors(n,e),zr.subVectors(t,e);const a=en.dot(en),o=en.dot(bn),c=en.dot(zr),l=bn.dot(bn),h=bn.dot(zr),d=a*l-o*o;if(d===0)return r.set(0,0,0),null;const u=1/d,p=(l*c-o*h)*u,g=(a*h-o*c)*u;return r.set(1-p-g,g,p)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,En)===null?!1:En.x>=0&&En.y>=0&&En.x+En.y<=1}static getInterpolation(t,e,n,s,r,a,o,c){return this.getBarycoord(t,e,n,s,En)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,En.x),c.addScaledVector(a,En.y),c.addScaledVector(o,En.z),c)}static getInterpolatedAttribute(t,e,n,s,r,a){return Wr.setScalar(0),Xr.setScalar(0),qr.setScalar(0),Wr.fromBufferAttribute(t,e),Xr.fromBufferAttribute(t,n),qr.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(Wr,r.x),a.addScaledVector(Xr,r.y),a.addScaledVector(qr,r.z),a}static isFrontFacing(t,e,n,s){return en.subVectors(n,e),bn.subVectors(t,e),en.cross(bn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return en.subVectors(this.c,this.b),bn.subVectors(this.a,this.b),en.cross(bn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return sn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return sn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return sn.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return sn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return sn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let a,o;Ei.subVectors(s,n),Ti.subVectors(r,n),Gr.subVectors(t,n);const c=Ei.dot(Gr),l=Ti.dot(Gr);if(c<=0&&l<=0)return e.copy(n);Vr.subVectors(t,s);const h=Ei.dot(Vr),d=Ti.dot(Vr);if(h>=0&&d<=h)return e.copy(s);const u=c*d-h*l;if(u<=0&&c>=0&&h<=0)return a=c/(c-h),e.copy(n).addScaledVector(Ei,a);Hr.subVectors(t,r);const p=Ei.dot(Hr),g=Ti.dot(Hr);if(g>=0&&p<=g)return e.copy(r);const x=p*l-c*g;if(x<=0&&l>=0&&g<=0)return o=l/(l-g),e.copy(n).addScaledVector(Ti,o);const m=h*g-p*d;if(m<=0&&d-h>=0&&p-g>=0)return Rl.subVectors(r,s),o=(d-h)/(d-h+(p-g)),e.copy(s).addScaledVector(Rl,o);const f=1/(m+x+u);return a=x*f,o=u*f,e.copy(n).addScaledVector(Ei,a).addScaledVector(Ti,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class xs{constructor(t=new N(1/0,1/0,1/0),e=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(nn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(nn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=nn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,nn):nn.fromBufferAttribute(r,a),nn.applyMatrix4(t.matrixWorld),this.expandByPoint(nn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ps.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ps.copy(n.boundingBox)),Ps.applyMatrix4(t.matrixWorld),this.union(Ps)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,nn),nn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ns),Ls.subVectors(this.max,ns),Ai.subVectors(t.a,ns),wi.subVectors(t.b,ns),Ci.subVectors(t.c,ns),Gn.subVectors(wi,Ai),Vn.subVectors(Ci,wi),Jn.subVectors(Ai,Ci);let e=[0,-Gn.z,Gn.y,0,-Vn.z,Vn.y,0,-Jn.z,Jn.y,Gn.z,0,-Gn.x,Vn.z,0,-Vn.x,Jn.z,0,-Jn.x,-Gn.y,Gn.x,0,-Vn.y,Vn.x,0,-Jn.y,Jn.x,0];return!Yr(e,Ai,wi,Ci,Ls)||(e=[1,0,0,0,1,0,0,0,1],!Yr(e,Ai,wi,Ci,Ls))?!1:(Ds.crossVectors(Gn,Vn),e=[Ds.x,Ds.y,Ds.z],Yr(e,Ai,wi,Ci,Ls))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,nn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(nn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Tn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Tn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Tn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Tn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Tn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Tn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Tn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Tn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Tn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Tn=[new N,new N,new N,new N,new N,new N,new N,new N],nn=new N,Ps=new xs,Ai=new N,wi=new N,Ci=new N,Gn=new N,Vn=new N,Jn=new N,ns=new N,Ls=new N,Ds=new N,Qn=new N;function Yr(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Qn.fromArray(i,r);const o=s.x*Math.abs(Qn.x)+s.y*Math.abs(Qn.y)+s.z*Math.abs(Qn.z),c=t.dot(Qn),l=e.dot(Qn),h=n.dot(Qn);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}const Se=new N,Us=new Ht;let Sd=0;class gn{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Sd++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=ml,this.updateRanges=[],this.gpuType=dn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Us.fromBufferAttribute(this,e),Us.applyMatrix3(t),this.setXY(e,Us.x,Us.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.applyMatrix3(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.applyMatrix4(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.applyNormalMatrix(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.transformDirection(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=ts(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ze(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=ts(e,this.array)),e}setX(t,e){return this.normalized&&(e=ze(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=ts(e,this.array)),e}setY(t,e){return this.normalized&&(e=ze(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=ts(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ze(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=ts(e,this.array)),e}setW(t,e){return this.normalized&&(e=ze(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=ze(e,this.array),n=ze(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=ze(e,this.array),n=ze(n,this.array),s=ze(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=ze(e,this.array),n=ze(n,this.array),s=ze(s,this.array),r=ze(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==ml&&(t.usage=this.usage),t}}class ih extends gn{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class sh extends gn{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class he extends gn{constructor(t,e,n){super(new Float32Array(t),e,n)}}const yd=new xs,is=new N,$r=new N;class Ro{constructor(t=new N,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):yd.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;is.subVectors(t,this.center);const e=is.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(is,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):($r.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(is.copy(t.center).add($r)),this.expandByPoint(is.copy(t.center).sub($r))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let bd=0;const Ze=new pe,Kr=new Fe,Ri=new N,qe=new xs,ss=new xs,we=new N;class He extends Zi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:bd++}),this.uuid=vs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(nd(t)?sh:ih)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ft().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ze.makeRotationFromQuaternion(t),this.applyMatrix4(Ze),this}rotateX(t){return Ze.makeRotationX(t),this.applyMatrix4(Ze),this}rotateY(t){return Ze.makeRotationY(t),this.applyMatrix4(Ze),this}rotateZ(t){return Ze.makeRotationZ(t),this.applyMatrix4(Ze),this}translate(t,e,n){return Ze.makeTranslation(t,e,n),this.applyMatrix4(Ze),this}scale(t,e,n){return Ze.makeScale(t,e,n),this.applyMatrix4(Ze),this}lookAt(t){return Kr.lookAt(t),Kr.updateMatrix(),this.applyMatrix4(Kr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ri).negate(),this.translate(Ri.x,Ri.y,Ri.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new he(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Dt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new xs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Xt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];qe.setFromBufferAttribute(r),this.morphTargetsRelative?(we.addVectors(this.boundingBox.min,qe.min),this.boundingBox.expandByPoint(we),we.addVectors(this.boundingBox.max,qe.max),this.boundingBox.expandByPoint(we)):(this.boundingBox.expandByPoint(qe.min),this.boundingBox.expandByPoint(qe.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Xt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ro);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Xt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(t){const n=this.boundingSphere.center;if(qe.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];ss.setFromBufferAttribute(o),this.morphTargetsRelative?(we.addVectors(qe.min,ss.min),qe.expandByPoint(we),we.addVectors(qe.max,ss.max),qe.expandByPoint(we)):(qe.expandByPoint(ss.min),qe.expandByPoint(ss.max))}qe.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)we.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(we));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)we.fromBufferAttribute(o,l),c&&(Ri.fromBufferAttribute(t,l),we.add(Ri)),s=Math.max(s,n.distanceToSquared(we))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Xt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Xt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new gn(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let _=0;_<n.count;_++)o[_]=new N,c[_]=new N;const l=new N,h=new N,d=new N,u=new Ht,p=new Ht,g=new Ht,x=new N,m=new N;function f(_,S,O){l.fromBufferAttribute(n,_),h.fromBufferAttribute(n,S),d.fromBufferAttribute(n,O),u.fromBufferAttribute(r,_),p.fromBufferAttribute(r,S),g.fromBufferAttribute(r,O),h.sub(l),d.sub(l),p.sub(u),g.sub(u);const R=1/(p.x*g.y-g.x*p.y);isFinite(R)&&(x.copy(h).multiplyScalar(g.y).addScaledVector(d,-p.y).multiplyScalar(R),m.copy(d).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(R),o[_].add(x),o[S].add(x),o[O].add(x),c[_].add(m),c[S].add(m),c[O].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let _=0,S=y.length;_<S;++_){const O=y[_],R=O.start,U=O.count;for(let F=R,H=R+U;F<H;F+=3)f(t.getX(F+0),t.getX(F+1),t.getX(F+2))}const T=new N,b=new N,w=new N,E=new N;function C(_){w.fromBufferAttribute(s,_),E.copy(w);const S=o[_];T.copy(S),T.sub(w.multiplyScalar(w.dot(S))).normalize(),b.crossVectors(E,S);const R=b.dot(c[_])<0?-1:1;a.setXYZW(_,T.x,T.y,T.z,R)}for(let _=0,S=y.length;_<S;++_){const O=y[_],R=O.start,U=O.count;for(let F=R,H=R+U;F<H;F+=3)C(t.getX(F+0)),C(t.getX(F+1)),C(t.getX(F+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new gn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,p=n.count;u<p;u++)n.setXYZ(u,0,0,0);const s=new N,r=new N,a=new N,o=new N,c=new N,l=new N,h=new N,d=new N;if(t)for(let u=0,p=t.count;u<p;u+=3){const g=t.getX(u+0),x=t.getX(u+1),m=t.getX(u+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,x),a.fromBufferAttribute(e,m),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,m),o.add(h),c.add(h),l.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let u=0,p=e.count;u<p;u+=3)s.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),a.fromBufferAttribute(e,u+2),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)we.fromBufferAttribute(t,e),we.normalize(),t.setXYZ(e,we.x,we.y,we.z)}toNonIndexed(){function t(o,c){const l=o.array,h=o.itemSize,d=o.normalized,u=new l.constructor(c.length*h);let p=0,g=0;for(let x=0,m=c.length;x<m;x++){o.isInterleavedBufferAttribute?p=c[x]*o.data.stride+o.offset:p=c[x]*h;for(let f=0;f<h;f++)u[g++]=l[p++]}return new gn(u,h,d)}if(this.index===null)return Dt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new He,n=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=t(c,n);e.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let h=0,d=l.length;h<d;h++){const u=l[h],p=t(u,n);c.push(p)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let d=0,u=l.length;d<u;d++){const p=l[d];h.push(p.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const s=t.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(e))}const r=t.morphAttributes;for(const l in r){const h=[],d=r[l];for(let u=0,p=d.length;u<p;u++)h.push(d[u].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let l=0,h=a.length;l<h;l++){const d=a[l];this.addGroup(d.start,d.count,d.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let Ed=0;class Ms extends Zi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ed++}),this.uuid=vs(),this.name="",this.type="Material",this.blending=Gi,this.side=Kn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ma,this.blendDst=Sa,this.blendEquation=ai,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Kt(0,0,0),this.blendAlpha=0,this.depthFunc=Xi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=pl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=xi,this.stencilZFail=xi,this.stencilZPass=xi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){Dt(`Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Dt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Gi&&(n.blending=this.blending),this.side!==Kn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ma&&(n.blendSrc=this.blendSrc),this.blendDst!==Sa&&(n.blendDst=this.blendDst),this.blendEquation!==ai&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Xi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==pl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==xi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==xi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==xi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const An=new N,Zr=new N,Ns=new N,Hn=new N,jr=new N,Fs=new N,Jr=new N;class rh{constructor(t=new N,e=new N(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,An)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=An.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(An.copy(this.origin).addScaledVector(this.direction,e),An.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Zr.copy(t).add(e).multiplyScalar(.5),Ns.copy(e).sub(t).normalize(),Hn.copy(this.origin).sub(Zr);const r=t.distanceTo(e)*.5,a=-this.direction.dot(Ns),o=Hn.dot(this.direction),c=-Hn.dot(Ns),l=Hn.lengthSq(),h=Math.abs(1-a*a);let d,u,p,g;if(h>0)if(d=a*c-o,u=a*o-c,g=r*h,d>=0)if(u>=-g)if(u<=g){const x=1/h;d*=x,u*=x,p=d*(d+a*u+2*o)+u*(a*d+u+2*c)+l}else u=r,d=Math.max(0,-(a*u+o)),p=-d*d+u*(u+2*c)+l;else u=-r,d=Math.max(0,-(a*u+o)),p=-d*d+u*(u+2*c)+l;else u<=-g?(d=Math.max(0,-(-a*r+o)),u=d>0?-r:Math.min(Math.max(-r,-c),r),p=-d*d+u*(u+2*c)+l):u<=g?(d=0,u=Math.min(Math.max(-r,-c),r),p=u*(u+2*c)+l):(d=Math.max(0,-(a*r+o)),u=d>0?r:Math.min(Math.max(-r,-c),r),p=-d*d+u*(u+2*c)+l);else u=a>0?-r:r,d=Math.max(0,-(a*u+o)),p=-d*d+u*(u+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Zr).addScaledVector(Ns,u),p}intersectSphere(t,e){An.subVectors(t.center,this.origin);const n=An.dot(this.direction),s=An.dot(An)-n*n,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,c;const l=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return l>=0?(n=(t.min.x-u.x)*l,s=(t.max.x-u.x)*l):(n=(t.max.x-u.x)*l,s=(t.min.x-u.x)*l),h>=0?(r=(t.min.y-u.y)*h,a=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,a=(t.min.y-u.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(t.min.z-u.z)*d,c=(t.max.z-u.z)*d):(o=(t.max.z-u.z)*d,c=(t.min.z-u.z)*d),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,An)!==null}intersectTriangle(t,e,n,s,r){jr.subVectors(e,t),Fs.subVectors(n,t),Jr.crossVectors(jr,Fs);let a=this.direction.dot(Jr),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Hn.subVectors(this.origin,t);const c=o*this.direction.dot(Fs.crossVectors(Hn,Fs));if(c<0)return null;const l=o*this.direction.dot(jr.cross(Hn));if(l<0||c+l>a)return null;const h=-o*Hn.dot(Jr);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class jt extends Ms{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Kt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vn,this.combine=vo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Il=new pe,ti=new rh,Os=new Ro,Pl=new N,Bs=new N,ks=new N,zs=new N,Qr=new N,Gs=new N,Ll=new N,Vs=new N;class ct extends Fe{constructor(t=new He,e=new jt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){Gs.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=o[c],d=r[c];h!==0&&(Qr.fromBufferAttribute(d,t),a?Gs.addScaledVector(Qr,h):Gs.addScaledVector(Qr.sub(e),h))}e.add(Gs)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Os.copy(n.boundingSphere),Os.applyMatrix4(r),ti.copy(t.ray).recast(t.near),!(Os.containsPoint(ti.origin)===!1&&(ti.intersectSphere(Os,Pl)===null||ti.origin.distanceToSquared(Pl)>(t.far-t.near)**2))&&(Il.copy(r).invert(),ti.copy(t.ray).applyMatrix4(Il),!(n.boundingBox!==null&&ti.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ti)))}_computeIntersections(t,e,n){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,x=u.length;g<x;g++){const m=u[g],f=a[m.materialIndex],y=Math.max(m.start,p.start),T=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let b=y,w=T;b<w;b+=3){const E=o.getX(b),C=o.getX(b+1),_=o.getX(b+2);s=Hs(this,f,t,n,l,h,d,E,C,_),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,p.start),x=Math.min(o.count,p.start+p.count);for(let m=g,f=x;m<f;m+=3){const y=o.getX(m),T=o.getX(m+1),b=o.getX(m+2);s=Hs(this,a,t,n,l,h,d,y,T,b),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,x=u.length;g<x;g++){const m=u[g],f=a[m.materialIndex],y=Math.max(m.start,p.start),T=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let b=y,w=T;b<w;b+=3){const E=b,C=b+1,_=b+2;s=Hs(this,f,t,n,l,h,d,E,C,_),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,p.start),x=Math.min(c.count,p.start+p.count);for(let m=g,f=x;m<f;m+=3){const y=m,T=m+1,b=m+2;s=Hs(this,a,t,n,l,h,d,y,T,b),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function Td(i,t,e,n,s,r,a,o){let c;if(t.side===Ve?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,t.side===Kn,o),c===null)return null;Vs.copy(o),Vs.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(Vs);return l<e.near||l>e.far?null:{distance:l,point:Vs.clone(),object:i}}function Hs(i,t,e,n,s,r,a,o,c,l){i.getVertexPosition(o,Bs),i.getVertexPosition(c,ks),i.getVertexPosition(l,zs);const h=Td(i,t,e,n,Bs,ks,zs,Ll);if(h){const d=new N;sn.getBarycoord(Ll,Bs,ks,zs,d),s&&(h.uv=sn.getInterpolatedAttribute(s,o,c,l,d,new Ht)),r&&(h.uv1=sn.getInterpolatedAttribute(r,o,c,l,d,new Ht)),a&&(h.normal=sn.getInterpolatedAttribute(a,o,c,l,d,new N),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:c,c:l,normal:new N,materialIndex:0};sn.getNormal(Bs,ks,zs,u.normal),h.face=u,h.barycoord=d}return h}class Ad extends Ie{constructor(t=null,e=1,n=1,s,r,a,o,c,l=Re,h=Re,d,u){super(null,a,o,c,l,h,s,r,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const ta=new N,wd=new N,Cd=new Ft;class si{constructor(t=new N(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=ta.subVectors(n,e).cross(wd.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(ta),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Cd.getNormalMatrix(t),s=this.coplanarPoint(ta).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ei=new Ro,Rd=new Ht(.5,.5),Ws=new N;class Io{constructor(t=new si,e=new si,n=new si,s=new si,r=new si,a=new si){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=fn,n=!1){const s=this.planes,r=t.elements,a=r[0],o=r[1],c=r[2],l=r[3],h=r[4],d=r[5],u=r[6],p=r[7],g=r[8],x=r[9],m=r[10],f=r[11],y=r[12],T=r[13],b=r[14],w=r[15];if(s[0].setComponents(l-a,p-h,f-g,w-y).normalize(),s[1].setComponents(l+a,p+h,f+g,w+y).normalize(),s[2].setComponents(l+o,p+d,f+x,w+T).normalize(),s[3].setComponents(l-o,p-d,f-x,w-T).normalize(),n)s[4].setComponents(c,u,m,b).normalize(),s[5].setComponents(l-c,p-u,f-m,w-b).normalize();else if(s[4].setComponents(l-c,p-u,f-m,w-b).normalize(),e===fn)s[5].setComponents(l+c,p+u,f+m,w+b).normalize();else if(e===fs)s[5].setComponents(c,u,m,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ei.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ei.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ei)}intersectsSprite(t){ei.center.set(0,0,0);const e=Rd.distanceTo(t.center);return ei.radius=.7071067811865476+e,ei.applyMatrix4(t.matrixWorld),this.intersectsSphere(ei)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Ws.x=s.normal.x>0?t.max.x:t.min.x,Ws.y=s.normal.y>0?t.max.y:t.min.y,Ws.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Ws)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class ah extends Ie{constructor(t=[],e=di,n,s,r,a,o,c,l,h){super(t,e,n,s,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Dl extends Ie{constructor(t,e,n,s,r,a,o,c,l){super(t,e,n,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ms extends Ie{constructor(t,e,n=_n,s,r,a,o=Re,c=Re,l,h=Nn,d=1){if(h!==Nn&&h!==ui)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:t,height:e,depth:d};super(u,s,r,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new wo(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Id extends ms{constructor(t,e=_n,n=di,s,r,a=Re,o=Re,c,l=Nn){const h={width:t,height:t,depth:1},d=[h,h,h,h,h,h];super(t,t,e,n,s,r,a,o,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class oh extends Ie{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class $t extends He{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],h=[],d=[];let u=0,p=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,s,a,2),g("x","z","y",1,-1,t,n,-e,s,a,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new he(l,3)),this.setAttribute("normal",new he(h,3)),this.setAttribute("uv",new he(d,2));function g(x,m,f,y,T,b,w,E,C,_,S){const O=b/C,R=w/_,U=b/2,F=w/2,H=E/2,B=C+1,z=_+1;let G=0,Q=0;const Z=new N;for(let ht=0;ht<z;ht++){const mt=ht*R-F;for(let dt=0;dt<B;dt++){const Ot=dt*O-U;Z[x]=Ot*y,Z[m]=mt*T,Z[f]=H,l.push(Z.x,Z.y,Z.z),Z[x]=0,Z[m]=0,Z[f]=E>0?1:-1,h.push(Z.x,Z.y,Z.z),d.push(dt/C),d.push(1-ht/_),G+=1}}for(let ht=0;ht<_;ht++)for(let mt=0;mt<C;mt++){const dt=u+mt+B*ht,Ot=u+mt+B*(ht+1),ce=u+(mt+1)+B*(ht+1),le=u+(mt+1)+B*ht;c.push(dt,Ot,le),c.push(Ot,ce,le),Q+=6}o.addGroup(p,Q,S),p+=Q,u+=G}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new $t(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class oi extends He{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],a=[],o=[],c=[],l=new N,h=new Ht;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let d=0,u=3;d<=e;d++,u+=3){const p=n+d/e*s;l.x=t*Math.cos(p),l.y=t*Math.sin(p),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[u]/t+1)/2,h.y=(a[u+1]/t+1)/2,c.push(h.x,h.y)}for(let d=1;d<=e;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new he(a,3)),this.setAttribute("normal",new he(o,3)),this.setAttribute("uv",new he(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new oi(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class wn extends He{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const h=[],d=[],u=[],p=[];let g=0;const x=[],m=n/2;let f=0;y(),a===!1&&(t>0&&T(!0),e>0&&T(!1)),this.setIndex(h),this.setAttribute("position",new he(d,3)),this.setAttribute("normal",new he(u,3)),this.setAttribute("uv",new he(p,2));function y(){const b=new N,w=new N;let E=0;const C=(e-t)/n;for(let _=0;_<=r;_++){const S=[],O=_/r,R=O*(e-t)+t;for(let U=0;U<=s;U++){const F=U/s,H=F*c+o,B=Math.sin(H),z=Math.cos(H);w.x=R*B,w.y=-O*n+m,w.z=R*z,d.push(w.x,w.y,w.z),b.set(B,C,z).normalize(),u.push(b.x,b.y,b.z),p.push(F,1-O),S.push(g++)}x.push(S)}for(let _=0;_<s;_++)for(let S=0;S<r;S++){const O=x[S][_],R=x[S+1][_],U=x[S+1][_+1],F=x[S][_+1];(t>0||S!==0)&&(h.push(O,R,F),E+=3),(e>0||S!==r-1)&&(h.push(R,U,F),E+=3)}l.addGroup(f,E,0),f+=E}function T(b){const w=g,E=new Ht,C=new N;let _=0;const S=b===!0?t:e,O=b===!0?1:-1;for(let U=1;U<=s;U++)d.push(0,m*O,0),u.push(0,O,0),p.push(.5,.5),g++;const R=g;for(let U=0;U<=s;U++){const H=U/s*c+o,B=Math.cos(H),z=Math.sin(H);C.x=S*z,C.y=m*O,C.z=S*B,d.push(C.x,C.y,C.z),u.push(0,O,0),E.x=B*.5+.5,E.y=z*.5*O+.5,p.push(E.x,E.y),g++}for(let U=0;U<s;U++){const F=w+U,H=R+U;b===!0?h.push(H,H+1,F):h.push(H+1,H,F),_+=3}l.addGroup(f,_,b===!0?1:2),f+=_}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new wn(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Yn extends He{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(n),c=Math.floor(s),l=o+1,h=c+1,d=t/o,u=e/c,p=[],g=[],x=[],m=[];for(let f=0;f<h;f++){const y=f*u-a;for(let T=0;T<l;T++){const b=T*d-r;g.push(b,-y,0),x.push(0,0,1),m.push(T/o),m.push(1-f/c)}}for(let f=0;f<c;f++)for(let y=0;y<o;y++){const T=y+l*f,b=y+l*(f+1),w=y+1+l*(f+1),E=y+1+l*f;p.push(T,b,E),p.push(b,w,E)}this.setIndex(p),this.setAttribute("position",new he(g,3)),this.setAttribute("normal",new he(x,3)),this.setAttribute("uv",new he(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Yn(t.width,t.height,t.widthSegments,t.heightSegments)}}class Bi extends He{constructor(t=.5,e=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const o=[],c=[],l=[],h=[];let d=t;const u=(e-t)/s,p=new N,g=new Ht;for(let x=0;x<=s;x++){for(let m=0;m<=n;m++){const f=r+m/n*a;p.x=d*Math.cos(f),p.y=d*Math.sin(f),c.push(p.x,p.y,p.z),l.push(0,0,1),g.x=(p.x/e+1)/2,g.y=(p.y/e+1)/2,h.push(g.x,g.y)}d+=u}for(let x=0;x<s;x++){const m=x*(n+1);for(let f=0;f<n;f++){const y=f+m,T=y,b=y+n+1,w=y+n+2,E=y+1;o.push(T,b,E),o.push(b,w,E)}}this.setIndex(o),this.setAttribute("position",new he(c,3)),this.setAttribute("normal",new he(l,3)),this.setAttribute("uv",new he(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Bi(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class li extends He{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const h=[],d=new N,u=new N,p=[],g=[],x=[],m=[];for(let f=0;f<=n;f++){const y=[],T=f/n;let b=0;f===0&&a===0?b=.5/e:f===n&&c===Math.PI&&(b=-.5/e);for(let w=0;w<=e;w++){const E=w/e;d.x=-t*Math.cos(s+E*r)*Math.sin(a+T*o),d.y=t*Math.cos(a+T*o),d.z=t*Math.sin(s+E*r)*Math.sin(a+T*o),g.push(d.x,d.y,d.z),u.copy(d).normalize(),x.push(u.x,u.y,u.z),m.push(E+b,1-T),y.push(l++)}h.push(y)}for(let f=0;f<n;f++)for(let y=0;y<e;y++){const T=h[f][y+1],b=h[f][y],w=h[f+1][y],E=h[f+1][y+1];(f!==0||a>0)&&p.push(T,b,E),(f!==n-1||c<Math.PI)&&p.push(b,w,E)}this.setIndex(p),this.setAttribute("position",new he(g,3)),this.setAttribute("normal",new he(x,3)),this.setAttribute("uv",new he(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new li(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class ki extends He{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},n=Math.floor(n),s=Math.floor(s);const c=[],l=[],h=[],d=[],u=new N,p=new N,g=new N;for(let x=0;x<=n;x++){const m=a+x/n*o;for(let f=0;f<=s;f++){const y=f/s*r;p.x=(t+e*Math.cos(m))*Math.cos(y),p.y=(t+e*Math.cos(m))*Math.sin(y),p.z=e*Math.sin(m),l.push(p.x,p.y,p.z),u.x=t*Math.cos(y),u.y=t*Math.sin(y),g.subVectors(p,u).normalize(),h.push(g.x,g.y,g.z),d.push(f/s),d.push(x/n)}}for(let x=1;x<=n;x++)for(let m=1;m<=s;m++){const f=(s+1)*x+m-1,y=(s+1)*(x-1)+m-1,T=(s+1)*(x-1)+m,b=(s+1)*x+m;c.push(f,y,b),c.push(y,T,b)}this.setIndex(c),this.setAttribute("position",new he(l,3)),this.setAttribute("normal",new he(h,3)),this.setAttribute("uv",new he(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ki(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}function Ki(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(Dt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Be(i){const t={};for(let e=0;e<i.length;e++){const n=Ki(i[e]);for(const s in n)t[s]=n[s]}return t}function Pd(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function lh(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:qt.workingColorSpace}const Ld={clone:Ki,merge:Be};var Dd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ud=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class xn extends Ms{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Dd,this.fragmentShader=Ud,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ki(t.uniforms),this.uniformsGroups=Pd(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Nd extends xn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Ye extends Ms{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Kt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Kt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Qc,this.normalScale=new Ht(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vn,this.combine=vo,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Fd extends Ms{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=$u,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Od extends Ms{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const ea={enabled:!1,files:{},add:function(i,t){this.enabled!==!1&&(Ul(i)||(this.files[i]=t))},get:function(i){if(this.enabled!==!1&&!Ul(i))return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};function Ul(i){try{const t=i.slice(i.indexOf(":")+1);return new URL(t).protocol==="blob:"}catch{return!1}}class Bd{constructor(t,e,n){const s=this;let r=!1,a=0,o=0,c;const l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,d){return l.push(h,d),this},this.removeHandler=function(h){const d=l.indexOf(h);return d!==-1&&l.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=l.length;d<u;d+=2){const p=l[d],g=l[d+1];if(p.global&&(p.lastIndex=0),p.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const kd=new Bd;class Po{constructor(t){this.manager=t!==void 0?t:kd,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){const n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}}Po.DEFAULT_MATERIAL_NAME="__DEFAULT";const Ii=new WeakMap;class zd extends Po{constructor(t){super(t)}load(t,e,n,s){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,a=ea.get(`image:${t}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(t),setTimeout(function(){e&&e(a),r.manager.itemEnd(t)},0);else{let d=Ii.get(a);d===void 0&&(d=[],Ii.set(a,d)),d.push({onLoad:e,onError:s})}return a}const o=ps("img");function c(){h(),e&&e(this);const d=Ii.get(this)||[];for(let u=0;u<d.length;u++){const p=d[u];p.onLoad&&p.onLoad(this)}Ii.delete(this),r.manager.itemEnd(t)}function l(d){h(),s&&s(d),ea.remove(`image:${t}`);const u=Ii.get(this)||[];for(let p=0;p<u.length;p++){const g=u[p];g.onError&&g.onError(d)}Ii.delete(this),r.manager.itemError(t),r.manager.itemEnd(t)}function h(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),ea.add(`image:${t}`,o),r.manager.itemStart(t),o.src=t,o}}class Gd extends Po{constructor(t){super(t)}load(t,e,n,s){const r=new Ie,a=new zd(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(t,function(o){r.image=o,r.needsUpdate=!0,e!==void 0&&e(r)},n,s),r}}class ch extends Fe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Kt(t),this.intensity=e}dispose(){this.dispatchEvent({type:"dispose"})}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}}const na=new pe,Nl=new N,Fl=new N;class Vd{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ht(512,512),this.mapType=$e,this.map=null,this.mapPass=null,this.matrix=new pe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Io,this._frameExtents=new Ht(1,1),this._viewportCount=1,this._viewports=[new ge(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Nl.setFromMatrixPosition(t.matrixWorld),e.position.copy(Nl),Fl.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Fl),e.updateMatrixWorld(),na.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(na,e.coordinateSystem,e.reversedDepth),e.coordinateSystem===fs||e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(na)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Xs=new N,qs=new ji,ln=new N;class hh extends Fe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new pe,this.projectionMatrix=new pe,this.projectionMatrixInverse=new pe,this.coordinateSystem=fn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Xs,qs,ln),ln.x===1&&ln.y===1&&ln.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Xs,qs,ln.set(1,1,1)).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorld.decompose(Xs,qs,ln),ln.x===1&&ln.y===1&&ln.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Xs,qs,ln.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Wn=new N,Ol=new Ht,Bl=new Ht;class Je extends hh{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=co*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Pr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return co*2*Math.atan(Math.tan(Pr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Wn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Wn.x,Wn.y).multiplyScalar(-t/Wn.z),Wn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Wn.x,Wn.y).multiplyScalar(-t/Wn.z)}getViewSize(t,e){return this.getViewBounds(t,Ol,Bl),e.subVectors(Bl,Ol)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Pr*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,e-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}class Lo extends hh{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Hd extends Vd{constructor(){super(new Lo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Wd extends ch{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Fe.DEFAULT_UP),this.updateMatrix(),this.target=new Fe,this.shadow=new Hd}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}}class Xd extends ch{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}const Pi=-90,Li=1;class qd extends Fe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Je(Pi,Li,t,e);s.layers=this.layers,this.add(s);const r=new Je(Pi,Li,t,e);r.layers=this.layers,this.add(r);const a=new Je(Pi,Li,t,e);a.layers=this.layers,this.add(a);const o=new Je(Pi,Li,t,e);o.layers=this.layers,this.add(o);const c=new Je(Pi,Li,t,e);c.layers=this.layers,this.add(c);const l=new Je(Pi,Li,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,c]=e;for(const l of e)this.remove(l);if(t===fn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===fs)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,2,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,3,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),t.setRenderTarget(n,4,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(d,u,p),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Yd extends Je{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const kl=new pe;class $d{constructor(t,e,n=0,s=1/0){this.ray=new rh(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new Co,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):Xt("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return kl.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(kl),this}intersectObject(t,e=!0,n=[]){return ho(t,this,n,e),n.sort(zl),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)ho(t[s],this,n,e);return n.sort(zl),n}}function zl(i,t){return i.distance-t.distance}function ho(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)ho(r[a],t,e,!0)}}function Gl(i,t,e,n){const s=Kd(n);switch(e){case Zc:return i*t;case Jc:return i*t/s.components*s.byteLength;case yo:return i*t/s.components*s.byteLength;case Yi:return i*t*2/s.components*s.byteLength;case bo:return i*t*2/s.components*s.byteLength;case jc:return i*t*3/s.components*s.byteLength;case rn:return i*t*4/s.components*s.byteLength;case Eo:return i*t*4/s.components*s.byteLength;case sr:case rr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case ar:case or:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case La:case Ua:return Math.max(i,16)*Math.max(t,8)/4;case Pa:case Da:return Math.max(i,8)*Math.max(t,8)/2;case Na:case Fa:case Ba:case ka:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Oa:case za:case Ga:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Va:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ha:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Wa:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Xa:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case qa:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Ya:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case $a:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Ka:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Za:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case ja:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Ja:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Qa:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case to:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case eo:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case no:case io:case so:return Math.ceil(i/4)*Math.ceil(t/4)*16;case ro:case ao:return Math.ceil(i/4)*Math.ceil(t/4)*8;case oo:case lo:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Kd(i){switch(i){case $e:case qc:return{byteLength:1,components:1};case us:case Yc:case Un:return{byteLength:2,components:1};case Mo:case So:return{byteLength:2,components:4};case _n:case xo:case dn:return{byteLength:4,components:1};case $c:case Kc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:_o}}));typeof window<"u"&&(window.__THREE__?Dt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=_o);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function uh(){let i=null,t=!1,e=null,n=null;function s(r,a){e(r,a),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Zd(i){const t=new WeakMap;function e(o,c){const l=o.array,h=o.usage,d=l.byteLength,u=i.createBuffer();i.bindBuffer(c,u),i.bufferData(c,l,h),o.onUploadCallback();let p;if(l instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)p=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=i.SHORT;else if(l instanceof Uint32Array)p=i.UNSIGNED_INT;else if(l instanceof Int32Array)p=i.INT;else if(l instanceof Int8Array)p=i.BYTE;else if(l instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,c,l){const h=c.array,d=c.updateRanges;if(i.bindBuffer(l,o),d.length===0)i.bufferSubData(l,0,h);else{d.sort((p,g)=>p.start-g.start);let u=0;for(let p=1;p<d.length;p++){const g=d[u],x=d[p];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++u,d[u]=x)}d.length=u+1;for(let p=0,g=d.length;p<g;p++){const x=d[p];i.bufferSubData(l,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=t.get(o);c&&(i.deleteBuffer(c.buffer),t.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=t.get(o);if(l===void 0)t.set(o,e(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var jd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Jd=`#ifdef USE_ALPHAHASH
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
#endif`,Qd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,tf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ef=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,nf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,sf=`#ifdef USE_AOMAP
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
#endif`,rf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,af=`#ifdef USE_BATCHING
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
#endif`,of=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,lf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,cf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,hf=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,uf=`#ifdef USE_IRIDESCENCE
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
#endif`,df=`#ifdef USE_BUMPMAP
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
#endif`,ff=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,pf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,mf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,gf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,_f=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,vf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,xf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Mf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Sf=`#define PI 3.141592653589793
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
} // validated`,yf=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,bf=`vec3 transformedNormal = objectNormal;
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
#endif`,Ef=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Tf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Af=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,wf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Cf="gl_FragColor = linearToOutputTexel( gl_FragColor );",Rf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,If=`#ifdef USE_ENVMAP
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
#endif`,Pf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Lf=`#ifdef USE_ENVMAP
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
#endif`,Df=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Uf=`#ifdef USE_ENVMAP
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
#endif`,Nf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Ff=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Of=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Bf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,kf=`#ifdef USE_GRADIENTMAP
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
}`,zf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Gf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Vf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Hf=`uniform bool receiveShadow;
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
#endif`,Wf=`#ifdef USE_ENVMAP
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
#endif`,Xf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,qf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Yf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,$f=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Kf=`PhysicalMaterial material;
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
#endif`,Zf=`uniform sampler2D dfgLUT;
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
}`,jf=`
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
#endif`,Jf=`#if defined( RE_IndirectDiffuse )
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
#endif`,Qf=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,tp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ep=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,np=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ip=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,sp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,rp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ap=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,op=`#if defined( USE_POINTS_UV )
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
#endif`,lp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,cp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,hp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,up=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,dp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,fp=`#ifdef USE_MORPHTARGETS
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
#endif`,pp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,mp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,gp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,_p=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,vp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,xp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Mp=`#ifdef USE_NORMALMAP
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
#endif`,Sp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,yp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,bp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ep=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Tp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ap=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,wp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Cp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Rp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Ip=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Pp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Lp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Dp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Up=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Np=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Fp=`float getShadowMask() {
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
}`,Op=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Bp=`#ifdef USE_SKINNING
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
#endif`,kp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,zp=`#ifdef USE_SKINNING
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
#endif`,Gp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Vp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Hp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Wp=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Xp=`#ifdef USE_TRANSMISSION
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
#endif`,qp=`#ifdef USE_TRANSMISSION
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
#endif`,Yp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,$p=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Kp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Zp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const jp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Jp=`uniform sampler2D t2D;
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
}`,Qp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,tm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,em=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,nm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,im=`#include <common>
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
}`,sm=`#if DEPTH_PACKING == 3200
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
}`,rm=`#define DISTANCE
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
}`,am=`#define DISTANCE
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
}`,om=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,lm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cm=`uniform float scale;
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
}`,hm=`uniform vec3 diffuse;
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
}`,um=`#include <common>
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
}`,dm=`uniform vec3 diffuse;
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
}`,fm=`#define LAMBERT
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
}`,pm=`#define LAMBERT
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
}`,mm=`#define MATCAP
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
}`,gm=`#define MATCAP
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
}`,_m=`#define NORMAL
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
}`,vm=`#define NORMAL
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
}`,xm=`#define PHONG
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
}`,Mm=`#define PHONG
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
}`,Sm=`#define STANDARD
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
}`,ym=`#define STANDARD
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
}`,bm=`#define TOON
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
}`,Em=`#define TOON
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
}`,Tm=`uniform float size;
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
}`,Am=`uniform vec3 diffuse;
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
}`,wm=`#include <common>
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
}`,Cm=`uniform vec3 color;
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
}`,Rm=`uniform float rotation;
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
}`,Im=`uniform vec3 diffuse;
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
}`,Bt={alphahash_fragment:jd,alphahash_pars_fragment:Jd,alphamap_fragment:Qd,alphamap_pars_fragment:tf,alphatest_fragment:ef,alphatest_pars_fragment:nf,aomap_fragment:sf,aomap_pars_fragment:rf,batching_pars_vertex:af,batching_vertex:of,begin_vertex:lf,beginnormal_vertex:cf,bsdfs:hf,iridescence_fragment:uf,bumpmap_pars_fragment:df,clipping_planes_fragment:ff,clipping_planes_pars_fragment:pf,clipping_planes_pars_vertex:mf,clipping_planes_vertex:gf,color_fragment:_f,color_pars_fragment:vf,color_pars_vertex:xf,color_vertex:Mf,common:Sf,cube_uv_reflection_fragment:yf,defaultnormal_vertex:bf,displacementmap_pars_vertex:Ef,displacementmap_vertex:Tf,emissivemap_fragment:Af,emissivemap_pars_fragment:wf,colorspace_fragment:Cf,colorspace_pars_fragment:Rf,envmap_fragment:If,envmap_common_pars_fragment:Pf,envmap_pars_fragment:Lf,envmap_pars_vertex:Df,envmap_physical_pars_fragment:Wf,envmap_vertex:Uf,fog_vertex:Nf,fog_pars_vertex:Ff,fog_fragment:Of,fog_pars_fragment:Bf,gradientmap_pars_fragment:kf,lightmap_pars_fragment:zf,lights_lambert_fragment:Gf,lights_lambert_pars_fragment:Vf,lights_pars_begin:Hf,lights_toon_fragment:Xf,lights_toon_pars_fragment:qf,lights_phong_fragment:Yf,lights_phong_pars_fragment:$f,lights_physical_fragment:Kf,lights_physical_pars_fragment:Zf,lights_fragment_begin:jf,lights_fragment_maps:Jf,lights_fragment_end:Qf,logdepthbuf_fragment:tp,logdepthbuf_pars_fragment:ep,logdepthbuf_pars_vertex:np,logdepthbuf_vertex:ip,map_fragment:sp,map_pars_fragment:rp,map_particle_fragment:ap,map_particle_pars_fragment:op,metalnessmap_fragment:lp,metalnessmap_pars_fragment:cp,morphinstance_vertex:hp,morphcolor_vertex:up,morphnormal_vertex:dp,morphtarget_pars_vertex:fp,morphtarget_vertex:pp,normal_fragment_begin:mp,normal_fragment_maps:gp,normal_pars_fragment:_p,normal_pars_vertex:vp,normal_vertex:xp,normalmap_pars_fragment:Mp,clearcoat_normal_fragment_begin:Sp,clearcoat_normal_fragment_maps:yp,clearcoat_pars_fragment:bp,iridescence_pars_fragment:Ep,opaque_fragment:Tp,packing:Ap,premultiplied_alpha_fragment:wp,project_vertex:Cp,dithering_fragment:Rp,dithering_pars_fragment:Ip,roughnessmap_fragment:Pp,roughnessmap_pars_fragment:Lp,shadowmap_pars_fragment:Dp,shadowmap_pars_vertex:Up,shadowmap_vertex:Np,shadowmask_pars_fragment:Fp,skinbase_vertex:Op,skinning_pars_vertex:Bp,skinning_vertex:kp,skinnormal_vertex:zp,specularmap_fragment:Gp,specularmap_pars_fragment:Vp,tonemapping_fragment:Hp,tonemapping_pars_fragment:Wp,transmission_fragment:Xp,transmission_pars_fragment:qp,uv_pars_fragment:Yp,uv_pars_vertex:$p,uv_vertex:Kp,worldpos_vertex:Zp,background_vert:jp,background_frag:Jp,backgroundCube_vert:Qp,backgroundCube_frag:tm,cube_vert:em,cube_frag:nm,depth_vert:im,depth_frag:sm,distance_vert:rm,distance_frag:am,equirect_vert:om,equirect_frag:lm,linedashed_vert:cm,linedashed_frag:hm,meshbasic_vert:um,meshbasic_frag:dm,meshlambert_vert:fm,meshlambert_frag:pm,meshmatcap_vert:mm,meshmatcap_frag:gm,meshnormal_vert:_m,meshnormal_frag:vm,meshphong_vert:xm,meshphong_frag:Mm,meshphysical_vert:Sm,meshphysical_frag:ym,meshtoon_vert:bm,meshtoon_frag:Em,points_vert:Tm,points_frag:Am,shadow_vert:wm,shadow_frag:Cm,sprite_vert:Rm,sprite_frag:Im},at={common:{diffuse:{value:new Kt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ft},alphaMap:{value:null},alphaMapTransform:{value:new Ft},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ft}},envmap:{envMap:{value:null},envMapRotation:{value:new Ft},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ft}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ft}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ft},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ft},normalScale:{value:new Ht(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ft},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ft}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ft}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ft}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Kt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Kt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ft},alphaTest:{value:0},uvTransform:{value:new Ft}},sprite:{diffuse:{value:new Kt(16777215)},opacity:{value:1},center:{value:new Ht(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ft},alphaMap:{value:null},alphaMapTransform:{value:new Ft},alphaTest:{value:0}}},un={basic:{uniforms:Be([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.fog]),vertexShader:Bt.meshbasic_vert,fragmentShader:Bt.meshbasic_frag},lambert:{uniforms:Be([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new Kt(0)},envMapIntensity:{value:1}}]),vertexShader:Bt.meshlambert_vert,fragmentShader:Bt.meshlambert_frag},phong:{uniforms:Be([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new Kt(0)},specular:{value:new Kt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Bt.meshphong_vert,fragmentShader:Bt.meshphong_frag},standard:{uniforms:Be([at.common,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.roughnessmap,at.metalnessmap,at.fog,at.lights,{emissive:{value:new Kt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Bt.meshphysical_vert,fragmentShader:Bt.meshphysical_frag},toon:{uniforms:Be([at.common,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.gradientmap,at.fog,at.lights,{emissive:{value:new Kt(0)}}]),vertexShader:Bt.meshtoon_vert,fragmentShader:Bt.meshtoon_frag},matcap:{uniforms:Be([at.common,at.bumpmap,at.normalmap,at.displacementmap,at.fog,{matcap:{value:null}}]),vertexShader:Bt.meshmatcap_vert,fragmentShader:Bt.meshmatcap_frag},points:{uniforms:Be([at.points,at.fog]),vertexShader:Bt.points_vert,fragmentShader:Bt.points_frag},dashed:{uniforms:Be([at.common,at.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Bt.linedashed_vert,fragmentShader:Bt.linedashed_frag},depth:{uniforms:Be([at.common,at.displacementmap]),vertexShader:Bt.depth_vert,fragmentShader:Bt.depth_frag},normal:{uniforms:Be([at.common,at.bumpmap,at.normalmap,at.displacementmap,{opacity:{value:1}}]),vertexShader:Bt.meshnormal_vert,fragmentShader:Bt.meshnormal_frag},sprite:{uniforms:Be([at.sprite,at.fog]),vertexShader:Bt.sprite_vert,fragmentShader:Bt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ft},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Bt.background_vert,fragmentShader:Bt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ft}},vertexShader:Bt.backgroundCube_vert,fragmentShader:Bt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Bt.cube_vert,fragmentShader:Bt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Bt.equirect_vert,fragmentShader:Bt.equirect_frag},distance:{uniforms:Be([at.common,at.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Bt.distance_vert,fragmentShader:Bt.distance_frag},shadow:{uniforms:Be([at.lights,at.fog,{color:{value:new Kt(0)},opacity:{value:1}}]),vertexShader:Bt.shadow_vert,fragmentShader:Bt.shadow_frag}};un.physical={uniforms:Be([un.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ft},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ft},clearcoatNormalScale:{value:new Ht(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ft},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ft},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ft},sheen:{value:0},sheenColor:{value:new Kt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ft},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ft},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ft},transmissionSamplerSize:{value:new Ht},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ft},attenuationDistance:{value:0},attenuationColor:{value:new Kt(0)},specularColor:{value:new Kt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ft},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ft},anisotropyVector:{value:new Ht},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ft}}]),vertexShader:Bt.meshphysical_vert,fragmentShader:Bt.meshphysical_frag};const Ys={r:0,b:0,g:0},ni=new vn,Pm=new pe;function Lm(i,t,e,n,s,r){const a=new Kt(0);let o=s===!0?0:1,c,l,h=null,d=0,u=null;function p(y){let T=y.isScene===!0?y.background:null;if(T&&T.isTexture){const b=y.backgroundBlurriness>0;T=t.get(T,b)}return T}function g(y){let T=!1;const b=p(y);b===null?m(a,o):b&&b.isColor&&(m(b,1),T=!0);const w=i.xr.getEnvironmentBlendMode();w==="additive"?e.buffers.color.setClear(0,0,0,1,r):w==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||T)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function x(y,T){const b=p(T);b&&(b.isCubeTexture||b.mapping===gr)?(l===void 0&&(l=new ct(new $t(1,1,1),new xn({name:"BackgroundCubeMaterial",uniforms:Ki(un.backgroundCube.uniforms),vertexShader:un.backgroundCube.vertexShader,fragmentShader:un.backgroundCube.fragmentShader,side:Ve,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(w,E,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),ni.copy(T.backgroundRotation),ni.x*=-1,ni.y*=-1,ni.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(ni.y*=-1,ni.z*=-1),l.material.uniforms.envMap.value=b,l.material.uniforms.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,l.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Pm.makeRotationFromEuler(ni)),l.material.toneMapped=qt.getTransfer(b.colorSpace)!==te,(h!==b||d!==b.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,h=b,d=b.version,u=i.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null)):b&&b.isTexture&&(c===void 0&&(c=new ct(new Yn(2,2),new xn({name:"BackgroundMaterial",uniforms:Ki(un.background.uniforms),vertexShader:un.background.vertexShader,fragmentShader:un.background.fragmentShader,side:Kn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=b,c.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,c.material.toneMapped=qt.getTransfer(b.colorSpace)!==te,b.matrixAutoUpdate===!0&&b.updateMatrix(),c.material.uniforms.uvTransform.value.copy(b.matrix),(h!==b||d!==b.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,h=b,d=b.version,u=i.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function m(y,T){y.getRGB(Ys,lh(i)),e.buffers.color.setClear(Ys.r,Ys.g,Ys.b,T,r)}function f(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,T=1){a.set(y),o=T,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(y){o=y,m(a,o)},render:g,addToRenderList:x,dispose:f}}function Dm(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null);let r=s,a=!1;function o(R,U,F,H,B){let z=!1;const G=d(R,H,F,U);r!==G&&(r=G,l(r.object)),z=p(R,H,F,B),z&&g(R,H,F,B),B!==null&&t.update(B,i.ELEMENT_ARRAY_BUFFER),(z||a)&&(a=!1,b(R,U,F,H),B!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(B).buffer))}function c(){return i.createVertexArray()}function l(R){return i.bindVertexArray(R)}function h(R){return i.deleteVertexArray(R)}function d(R,U,F,H){const B=H.wireframe===!0;let z=n[U.id];z===void 0&&(z={},n[U.id]=z);const G=R.isInstancedMesh===!0?R.id:0;let Q=z[G];Q===void 0&&(Q={},z[G]=Q);let Z=Q[F.id];Z===void 0&&(Z={},Q[F.id]=Z);let ht=Z[B];return ht===void 0&&(ht=u(c()),Z[B]=ht),ht}function u(R){const U=[],F=[],H=[];for(let B=0;B<e;B++)U[B]=0,F[B]=0,H[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:F,attributeDivisors:H,object:R,attributes:{},index:null}}function p(R,U,F,H){const B=r.attributes,z=U.attributes;let G=0;const Q=F.getAttributes();for(const Z in Q)if(Q[Z].location>=0){const mt=B[Z];let dt=z[Z];if(dt===void 0&&(Z==="instanceMatrix"&&R.instanceMatrix&&(dt=R.instanceMatrix),Z==="instanceColor"&&R.instanceColor&&(dt=R.instanceColor)),mt===void 0||mt.attribute!==dt||dt&&mt.data!==dt.data)return!0;G++}return r.attributesNum!==G||r.index!==H}function g(R,U,F,H){const B={},z=U.attributes;let G=0;const Q=F.getAttributes();for(const Z in Q)if(Q[Z].location>=0){let mt=z[Z];mt===void 0&&(Z==="instanceMatrix"&&R.instanceMatrix&&(mt=R.instanceMatrix),Z==="instanceColor"&&R.instanceColor&&(mt=R.instanceColor));const dt={};dt.attribute=mt,mt&&mt.data&&(dt.data=mt.data),B[Z]=dt,G++}r.attributes=B,r.attributesNum=G,r.index=H}function x(){const R=r.newAttributes;for(let U=0,F=R.length;U<F;U++)R[U]=0}function m(R){f(R,0)}function f(R,U){const F=r.newAttributes,H=r.enabledAttributes,B=r.attributeDivisors;F[R]=1,H[R]===0&&(i.enableVertexAttribArray(R),H[R]=1),B[R]!==U&&(i.vertexAttribDivisor(R,U),B[R]=U)}function y(){const R=r.newAttributes,U=r.enabledAttributes;for(let F=0,H=U.length;F<H;F++)U[F]!==R[F]&&(i.disableVertexAttribArray(F),U[F]=0)}function T(R,U,F,H,B,z,G){G===!0?i.vertexAttribIPointer(R,U,F,B,z):i.vertexAttribPointer(R,U,F,H,B,z)}function b(R,U,F,H){x();const B=H.attributes,z=F.getAttributes(),G=U.defaultAttributeValues;for(const Q in z){const Z=z[Q];if(Z.location>=0){let ht=B[Q];if(ht===void 0&&(Q==="instanceMatrix"&&R.instanceMatrix&&(ht=R.instanceMatrix),Q==="instanceColor"&&R.instanceColor&&(ht=R.instanceColor)),ht!==void 0){const mt=ht.normalized,dt=ht.itemSize,Ot=t.get(ht);if(Ot===void 0)continue;const ce=Ot.buffer,le=Ot.type,$=Ot.bytesPerElement,nt=le===i.INT||le===i.UNSIGNED_INT||ht.gpuType===xo;if(ht.isInterleavedBufferAttribute){const rt=ht.data,Nt=rt.stride,wt=ht.offset;if(rt.isInstancedInterleavedBuffer){for(let Pt=0;Pt<Z.locationSize;Pt++)f(Z.location+Pt,rt.meshPerAttribute);R.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let Pt=0;Pt<Z.locationSize;Pt++)m(Z.location+Pt);i.bindBuffer(i.ARRAY_BUFFER,ce);for(let Pt=0;Pt<Z.locationSize;Pt++)T(Z.location+Pt,dt/Z.locationSize,le,mt,Nt*$,(wt+dt/Z.locationSize*Pt)*$,nt)}else{if(ht.isInstancedBufferAttribute){for(let rt=0;rt<Z.locationSize;rt++)f(Z.location+rt,ht.meshPerAttribute);R.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=ht.meshPerAttribute*ht.count)}else for(let rt=0;rt<Z.locationSize;rt++)m(Z.location+rt);i.bindBuffer(i.ARRAY_BUFFER,ce);for(let rt=0;rt<Z.locationSize;rt++)T(Z.location+rt,dt/Z.locationSize,le,mt,dt*$,dt/Z.locationSize*rt*$,nt)}}else if(G!==void 0){const mt=G[Q];if(mt!==void 0)switch(mt.length){case 2:i.vertexAttrib2fv(Z.location,mt);break;case 3:i.vertexAttrib3fv(Z.location,mt);break;case 4:i.vertexAttrib4fv(Z.location,mt);break;default:i.vertexAttrib1fv(Z.location,mt)}}}}y()}function w(){S();for(const R in n){const U=n[R];for(const F in U){const H=U[F];for(const B in H){const z=H[B];for(const G in z)h(z[G].object),delete z[G];delete H[B]}}delete n[R]}}function E(R){if(n[R.id]===void 0)return;const U=n[R.id];for(const F in U){const H=U[F];for(const B in H){const z=H[B];for(const G in z)h(z[G].object),delete z[G];delete H[B]}}delete n[R.id]}function C(R){for(const U in n){const F=n[U];for(const H in F){const B=F[H];if(B[R.id]===void 0)continue;const z=B[R.id];for(const G in z)h(z[G].object),delete z[G];delete B[R.id]}}}function _(R){for(const U in n){const F=n[U],H=R.isInstancedMesh===!0?R.id:0,B=F[H];if(B!==void 0){for(const z in B){const G=B[z];for(const Q in G)h(G[Q].object),delete G[Q];delete B[z]}delete F[H],Object.keys(F).length===0&&delete n[U]}}}function S(){O(),a=!0,r!==s&&(r=s,l(r.object))}function O(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:S,resetDefaultState:O,dispose:w,releaseStatesOfGeometry:E,releaseStatesOfObject:_,releaseStatesOfProgram:C,initAttributes:x,enableAttribute:m,disableUnusedAttributes:y}}function Um(i,t,e){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),e.update(h,n,1)}function a(l,h,d){d!==0&&(i.drawArraysInstanced(n,l,h,d),e.update(h,n,d))}function o(l,h,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,d);let p=0;for(let g=0;g<d;g++)p+=h[g];e.update(p,n,1)}function c(l,h,d,u){if(d===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<l.length;g++)a(l[g],h[g],u[g]);else{p.multiDrawArraysInstancedWEBGL(n,l,0,h,0,u,0,d);let g=0;for(let x=0;x<d;x++)g+=h[x]*u[x];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function Nm(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const C=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(C){return!(C!==rn&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){const _=C===Un&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==$e&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==dn&&!_)}function c(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(Dt("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const d=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),y=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),T=i.getParameter(i.MAX_VARYING_VECTORS),b=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),w=i.getParameter(i.MAX_SAMPLES),E=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:p,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:y,maxVaryings:T,maxFragmentUniforms:b,maxSamples:w,samples:E}}function Fm(i){const t=this;let e=null,n=0,s=!1,r=!1;const a=new si,o=new Ft,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const p=d.length!==0||u||n!==0||s;return s=u,n=d.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,p){const g=d.clippingPlanes,x=d.clipIntersection,m=d.clipShadows,f=i.get(d);if(!s||g===null||g.length===0||r&&!m)r?h(null):l();else{const y=r?0:n,T=y*4;let b=f.clippingState||null;c.value=b,b=h(g,u,T,p);for(let w=0;w!==T;++w)b[w]=e[w];f.clippingState=b,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=y}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,u,p,g){const x=d!==null?d.length:0;let m=null;if(x!==0){if(m=c.value,g!==!0||m===null){const f=p+x*4,y=u.matrixWorldInverse;o.getNormalMatrix(y),(m===null||m.length<f)&&(m=new Float32Array(f));for(let T=0,b=p;T!==x;++T,b+=4)a.copy(d[T]).applyMatrix4(y,o),a.normal.toArray(m,b),m[b+3]=a.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,m}}const $n=4,Vl=[.125,.215,.35,.446,.526,.582],ci=20,Om=256,rs=new Lo,Hl=new Kt;let ia=null,sa=0,ra=0,aa=!1;const Bm=new N;class Wl{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){const{size:a=256,position:o=Bm}=r;ia=this._renderer.getRenderTarget(),sa=this._renderer.getActiveCubeFace(),ra=this._renderer.getActiveMipmapLevel(),aa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,s,c,o),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Yl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ql(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(ia,sa,ra),this._renderer.xr.enabled=aa,t.scissorTest=!1,Di(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===di||t.mapping===qi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),ia=this._renderer.getRenderTarget(),sa=this._renderer.getActiveCubeFace(),ra=this._renderer.getActiveMipmapLevel(),aa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Ne,minFilter:Ne,generateMipmaps:!1,type:Un,format:rn,colorSpace:$i,depthBuffer:!1},s=Xl(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Xl(t,e,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=km(r)),this._blurMaterial=Gm(r,t,e),this._ggxMaterial=zm(r,t,e)}return s}_compileMaterial(t){const e=new ct(new He,t);this._renderer.compile(e,rs)}_sceneToCubeUV(t,e,n,s,r){const c=new Je(90,1,e,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,p=d.toneMapping;d.getClearColor(Hl),d.toneMapping=pn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ct(new $t,new jt({name:"PMREM.Background",side:Ve,depthWrite:!1,depthTest:!1})));const x=this._backgroundBox,m=x.material;let f=!1;const y=t.background;y?y.isColor&&(m.color.copy(y),t.background=null,f=!0):(m.color.copy(Hl),f=!0);for(let T=0;T<6;T++){const b=T%3;b===0?(c.up.set(0,l[T],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[T],r.y,r.z)):b===1?(c.up.set(0,0,l[T]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[T],r.z)):(c.up.set(0,l[T],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[T]));const w=this._cubeSize;Di(s,b*w,T>2?w:0,w,w),d.setRenderTarget(s),f&&d.render(x,c),d.render(t,c)}d.toneMapping=p,d.autoClear=u,t.background=y}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===di||t.mapping===qi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Yl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ql());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=t;const c=this._cubeSize;Di(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(a,rs)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=n}_applyGGXFilter(t,e,n){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const c=a.uniforms,l=n/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),d=Math.sqrt(l*l-h*h),u=0+l*1.25,p=d*u,{_lodMax:g}=this,x=this._sizeLods[n],m=3*x*(n>g-$n?n-g+$n:0),f=4*(this._cubeSize-x);c.envMap.value=t.texture,c.roughness.value=p,c.mipInt.value=g-e,Di(r,m,f,3*x,2*x),s.setRenderTarget(r),s.render(o,rs),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=g-n,Di(t,m,f,3*x,2*x),s.setRenderTarget(t),s.render(o,rs)}_blur(t,e,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",r),this._halfBlur(a,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Xt("blur direction must be either latitudinal or longitudinal!");const h=3,d=this._lodMeshes[s];d.material=l;const u=l.uniforms,p=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*ci-1),x=r/g,m=isFinite(r)?1+Math.floor(h*x):ci;m>ci&&Dt(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ci}`);const f=[];let y=0;for(let C=0;C<ci;++C){const _=C/x,S=Math.exp(-_*_/2);f.push(S),C===0?y+=S:C<m&&(y+=2*S)}for(let C=0;C<f.length;C++)f[C]=f[C]/y;u.envMap.value=t.texture,u.samples.value=m,u.weights.value=f,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:T}=this;u.dTheta.value=g,u.mipInt.value=T-n;const b=this._sizeLods[s],w=3*b*(s>T-$n?s-T+$n:0),E=4*(this._cubeSize-b);Di(e,w,E,3*b,2*b),c.setRenderTarget(e),c.render(d,rs)}}function km(i){const t=[],e=[],n=[];let s=i;const r=i-$n+1+Vl.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let c=1/o;a>i-$n?c=Vl[a-i+$n-1]:a===0&&(c=0),e.push(c);const l=1/(o-2),h=-l,d=1+l,u=[h,h,d,h,d,d,h,h,d,d,h,d],p=6,g=6,x=3,m=2,f=1,y=new Float32Array(x*g*p),T=new Float32Array(m*g*p),b=new Float32Array(f*g*p);for(let E=0;E<p;E++){const C=E%3*2/3-1,_=E>2?0:-1,S=[C,_,0,C+2/3,_,0,C+2/3,_+1,0,C,_,0,C+2/3,_+1,0,C,_+1,0];y.set(S,x*g*E),T.set(u,m*g*E);const O=[E,E,E,E,E,E];b.set(O,f*g*E)}const w=new He;w.setAttribute("position",new gn(y,x)),w.setAttribute("uv",new gn(T,m)),w.setAttribute("faceIndex",new gn(b,f)),n.push(new ct(w,null)),s>$n&&s--}return{lodMeshes:n,sizeLods:t,sigmas:e}}function Xl(i,t,e){const n=new mn(i,t,e);return n.texture.mapping=gr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Di(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function zm(i,t,e){return new xn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Om,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:_r(),fragmentShader:`

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
		`,blending:Ln,depthTest:!1,depthWrite:!1})}function Gm(i,t,e){const n=new Float32Array(ci),s=new N(0,1,0);return new xn({name:"SphericalGaussianBlur",defines:{n:ci,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:_r(),fragmentShader:`

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
		`,blending:Ln,depthTest:!1,depthWrite:!1})}function ql(){return new xn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:_r(),fragmentShader:`

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
		`,blending:Ln,depthTest:!1,depthWrite:!1})}function Yl(){return new xn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:_r(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ln,depthTest:!1,depthWrite:!1})}function _r(){return`

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
	`}class dh extends mn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new ah(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new $t(5,5,5),r=new xn({name:"CubemapFromEquirect",uniforms:Ki(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ve,blending:Ln});r.uniforms.tEquirect.value=e;const a=new ct(s,r),o=e.minFilter;return e.minFilter===hi&&(e.minFilter=Ne),new qd(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}}function Vm(i){let t=new WeakMap,e=new WeakMap,n=null;function s(u,p=!1){return u==null?null:p?a(u):r(u)}function r(u){if(u&&u.isTexture){const p=u.mapping;if(p===Cr||p===Rr)if(t.has(u)){const g=t.get(u).texture;return o(g,u.mapping)}else{const g=u.image;if(g&&g.height>0){const x=new dh(g.height);return x.fromEquirectangularTexture(i,u),t.set(u,x),u.addEventListener("dispose",l),o(x.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){const p=u.mapping,g=p===Cr||p===Rr,x=p===di||p===qi;if(g||x){let m=e.get(u);const f=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==f)return n===null&&(n=new Wl(i)),m=g?n.fromEquirectangular(u,m):n.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),m.texture;if(m!==void 0)return m.texture;{const y=u.image;return g&&y&&y.height>0||x&&y&&c(y)?(n===null&&(n=new Wl(i)),m=g?n.fromEquirectangular(u):n.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),u.addEventListener("dispose",h),m.texture):null}}}return u}function o(u,p){return p===Cr?u.mapping=di:p===Rr&&(u.mapping=qi),u}function c(u){let p=0;const g=6;for(let x=0;x<g;x++)u[x]!==void 0&&p++;return p===g}function l(u){const p=u.target;p.removeEventListener("dispose",l);const g=t.get(p);g!==void 0&&(t.delete(p),g.dispose())}function h(u){const p=u.target;p.removeEventListener("dispose",h);const g=e.get(p);g!==void 0&&(e.delete(p),g.dispose())}function d(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:d}}function Hm(i){const t={};function e(n){if(t[n]!==void 0)return t[n];const s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&pr("WebGLRenderer: "+n+" extension not supported."),s}}}function Wm(i,t,e,n){const s={},r=new WeakMap;function a(d){const u=d.target;u.index!==null&&t.remove(u.index);for(const g in u.attributes)t.remove(u.attributes[g]);u.removeEventListener("dispose",a),delete s[u.id];const p=r.get(u);p&&(t.remove(p),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function o(d,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,e.memory.geometries++),u}function c(d){const u=d.attributes;for(const p in u)t.update(u[p],i.ARRAY_BUFFER)}function l(d){const u=[],p=d.index,g=d.attributes.position;let x=0;if(g===void 0)return;if(p!==null){const y=p.array;x=p.version;for(let T=0,b=y.length;T<b;T+=3){const w=y[T+0],E=y[T+1],C=y[T+2];u.push(w,E,E,C,C,w)}}else{const y=g.array;x=g.version;for(let T=0,b=y.length/3-1;T<b;T+=3){const w=T+0,E=T+1,C=T+2;u.push(w,E,E,C,C,w)}}const m=new(g.count>=65535?sh:ih)(u,1);m.version=x;const f=r.get(d);f&&t.remove(f),r.set(d,m)}function h(d){const u=r.get(d);if(u){const p=d.index;p!==null&&u.version<p.version&&l(d)}else l(d);return r.get(d)}return{get:o,update:c,getWireframeAttribute:h}}function Xm(i,t,e){let n;function s(u){n=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function c(u,p){i.drawElements(n,p,r,u*a),e.update(p,n,1)}function l(u,p,g){g!==0&&(i.drawElementsInstanced(n,p,r,u*a,g),e.update(p,n,g))}function h(u,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,u,0,g);let m=0;for(let f=0;f<g;f++)m+=p[f];e.update(m,n,1)}function d(u,p,g,x){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<u.length;f++)l(u[f]/a,p[f],x[f]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,r,u,0,x,0,g);let f=0;for(let y=0;y<g;y++)f+=p[y]*x[y];e.update(f,n,1)}}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function qm(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:Xt("WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Ym(i,t,e){const n=new WeakMap,s=new ge;function r(a,o,c){const l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0;let u=n.get(o);if(u===void 0||u.count!==d){let S=function(){C.dispose(),n.delete(o),o.removeEventListener("dispose",S)};u!==void 0&&u.texture.dispose();const p=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],f=o.morphAttributes.normal||[],y=o.morphAttributes.color||[];let T=0;p===!0&&(T=1),g===!0&&(T=2),x===!0&&(T=3);let b=o.attributes.position.count*T,w=1;b>t.maxTextureSize&&(w=Math.ceil(b/t.maxTextureSize),b=t.maxTextureSize);const E=new Float32Array(b*w*4*d),C=new eh(E,b,w,d);C.type=dn,C.needsUpdate=!0;const _=T*4;for(let O=0;O<d;O++){const R=m[O],U=f[O],F=y[O],H=b*w*4*O;for(let B=0;B<R.count;B++){const z=B*_;p===!0&&(s.fromBufferAttribute(R,B),E[H+z+0]=s.x,E[H+z+1]=s.y,E[H+z+2]=s.z,E[H+z+3]=0),g===!0&&(s.fromBufferAttribute(U,B),E[H+z+4]=s.x,E[H+z+5]=s.y,E[H+z+6]=s.z,E[H+z+7]=0),x===!0&&(s.fromBufferAttribute(F,B),E[H+z+8]=s.x,E[H+z+9]=s.y,E[H+z+10]=s.z,E[H+z+11]=F.itemSize===4?s.w:1)}}u={count:d,texture:C,size:new Ht(b,w)},n.set(o,u),o.addEventListener("dispose",S)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let p=0;for(let x=0;x<l.length;x++)p+=l[x];const g=o.morphTargetsRelative?1:1-p;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",u.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function $m(i,t,e,n,s){let r=new WeakMap;function a(l){const h=s.render.frame,d=l.geometry,u=t.get(l,d);if(r.get(u)!==h&&(t.update(u),r.set(u,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==h&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){const p=l.skeleton;r.get(p)!==h&&(p.update(),r.set(p,h))}return u}function o(){r=new WeakMap}function c(l){const h=l.target;h.removeEventListener("dispose",c),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:a,dispose:o}}const Km={[Bc]:"LINEAR_TONE_MAPPING",[kc]:"REINHARD_TONE_MAPPING",[zc]:"CINEON_TONE_MAPPING",[Gc]:"ACES_FILMIC_TONE_MAPPING",[Hc]:"AGX_TONE_MAPPING",[Wc]:"NEUTRAL_TONE_MAPPING",[Vc]:"CUSTOM_TONE_MAPPING"};function Zm(i,t,e,n,s){const r=new mn(t,e,{type:i,depthBuffer:n,stencilBuffer:s}),a=new mn(t,e,{type:Un,depthBuffer:!1,stencilBuffer:!1}),o=new He;o.setAttribute("position",new he([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new he([0,2,0,0,2,0],2));const c=new Nd({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),l=new ct(o,c),h=new Lo(-1,1,1,-1,0,1);let d=null,u=null,p=!1,g,x=null,m=[],f=!1;this.setSize=function(y,T){r.setSize(y,T),a.setSize(y,T);for(let b=0;b<m.length;b++){const w=m[b];w.setSize&&w.setSize(y,T)}},this.setEffects=function(y){m=y,f=m.length>0&&m[0].isRenderPass===!0;const T=r.width,b=r.height;for(let w=0;w<m.length;w++){const E=m[w];E.setSize&&E.setSize(T,b)}},this.begin=function(y,T){if(p||y.toneMapping===pn&&m.length===0)return!1;if(x=T,T!==null){const b=T.width,w=T.height;(r.width!==b||r.height!==w)&&this.setSize(b,w)}return f===!1&&y.setRenderTarget(r),g=y.toneMapping,y.toneMapping=pn,!0},this.hasRenderPass=function(){return f},this.end=function(y,T){y.toneMapping=g,p=!0;let b=r,w=a;for(let E=0;E<m.length;E++){const C=m[E];if(C.enabled!==!1&&(C.render(y,w,b,T),C.needsSwap!==!1)){const _=b;b=w,w=_}}if(d!==y.outputColorSpace||u!==y.toneMapping){d=y.outputColorSpace,u=y.toneMapping,c.defines={},qt.getTransfer(d)===te&&(c.defines.SRGB_TRANSFER="");const E=Km[u];E&&(c.defines[E]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=b.texture,y.setRenderTarget(x),y.render(l,h),x=null,p=!1},this.isCompositing=function(){return p},this.dispose=function(){r.dispose(),a.dispose(),o.dispose(),c.dispose()}}const fh=new Ie,uo=new ms(1,1),ph=new eh,mh=new dd,gh=new ah,$l=[],Kl=[],Zl=new Float32Array(16),jl=new Float32Array(9),Jl=new Float32Array(4);function Ji(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=$l[s];if(r===void 0&&(r=new Float32Array(s),$l[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function be(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Ee(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function vr(i,t){let e=Kl[t];e===void 0&&(e=new Int32Array(t),Kl[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function jm(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Jm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(be(e,t))return;i.uniform2fv(this.addr,t),Ee(e,t)}}function Qm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(be(e,t))return;i.uniform3fv(this.addr,t),Ee(e,t)}}function tg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(be(e,t))return;i.uniform4fv(this.addr,t),Ee(e,t)}}function eg(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(be(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Ee(e,t)}else{if(be(e,n))return;Jl.set(n),i.uniformMatrix2fv(this.addr,!1,Jl),Ee(e,n)}}function ng(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(be(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Ee(e,t)}else{if(be(e,n))return;jl.set(n),i.uniformMatrix3fv(this.addr,!1,jl),Ee(e,n)}}function ig(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(be(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Ee(e,t)}else{if(be(e,n))return;Zl.set(n),i.uniformMatrix4fv(this.addr,!1,Zl),Ee(e,n)}}function sg(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function rg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(be(e,t))return;i.uniform2iv(this.addr,t),Ee(e,t)}}function ag(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(be(e,t))return;i.uniform3iv(this.addr,t),Ee(e,t)}}function og(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(be(e,t))return;i.uniform4iv(this.addr,t),Ee(e,t)}}function lg(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function cg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(be(e,t))return;i.uniform2uiv(this.addr,t),Ee(e,t)}}function hg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(be(e,t))return;i.uniform3uiv(this.addr,t),Ee(e,t)}}function ug(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(be(e,t))return;i.uniform4uiv(this.addr,t),Ee(e,t)}}function dg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(uo.compareFunction=e.isReversedDepthBuffer()?Ao:To,r=uo):r=fh,e.setTexture2D(t||r,s)}function fg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||mh,s)}function pg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||gh,s)}function mg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||ph,s)}function gg(i){switch(i){case 5126:return jm;case 35664:return Jm;case 35665:return Qm;case 35666:return tg;case 35674:return eg;case 35675:return ng;case 35676:return ig;case 5124:case 35670:return sg;case 35667:case 35671:return rg;case 35668:case 35672:return ag;case 35669:case 35673:return og;case 5125:return lg;case 36294:return cg;case 36295:return hg;case 36296:return ug;case 35678:case 36198:case 36298:case 36306:case 35682:return dg;case 35679:case 36299:case 36307:return fg;case 35680:case 36300:case 36308:case 36293:return pg;case 36289:case 36303:case 36311:case 36292:return mg}}function _g(i,t){i.uniform1fv(this.addr,t)}function vg(i,t){const e=Ji(t,this.size,2);i.uniform2fv(this.addr,e)}function xg(i,t){const e=Ji(t,this.size,3);i.uniform3fv(this.addr,e)}function Mg(i,t){const e=Ji(t,this.size,4);i.uniform4fv(this.addr,e)}function Sg(i,t){const e=Ji(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function yg(i,t){const e=Ji(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function bg(i,t){const e=Ji(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Eg(i,t){i.uniform1iv(this.addr,t)}function Tg(i,t){i.uniform2iv(this.addr,t)}function Ag(i,t){i.uniform3iv(this.addr,t)}function wg(i,t){i.uniform4iv(this.addr,t)}function Cg(i,t){i.uniform1uiv(this.addr,t)}function Rg(i,t){i.uniform2uiv(this.addr,t)}function Ig(i,t){i.uniform3uiv(this.addr,t)}function Pg(i,t){i.uniform4uiv(this.addr,t)}function Lg(i,t,e){const n=this.cache,s=t.length,r=vr(e,s);be(n,r)||(i.uniform1iv(this.addr,r),Ee(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=uo:a=fh;for(let o=0;o!==s;++o)e.setTexture2D(t[o]||a,r[o])}function Dg(i,t,e){const n=this.cache,s=t.length,r=vr(e,s);be(n,r)||(i.uniform1iv(this.addr,r),Ee(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||mh,r[a])}function Ug(i,t,e){const n=this.cache,s=t.length,r=vr(e,s);be(n,r)||(i.uniform1iv(this.addr,r),Ee(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||gh,r[a])}function Ng(i,t,e){const n=this.cache,s=t.length,r=vr(e,s);be(n,r)||(i.uniform1iv(this.addr,r),Ee(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||ph,r[a])}function Fg(i){switch(i){case 5126:return _g;case 35664:return vg;case 35665:return xg;case 35666:return Mg;case 35674:return Sg;case 35675:return yg;case 35676:return bg;case 5124:case 35670:return Eg;case 35667:case 35671:return Tg;case 35668:case 35672:return Ag;case 35669:case 35673:return wg;case 5125:return Cg;case 36294:return Rg;case 36295:return Ig;case 36296:return Pg;case 35678:case 36198:case 36298:case 36306:case 35682:return Lg;case 35679:case 36299:case 36307:return Dg;case 35680:case 36300:case 36308:case 36293:return Ug;case 36289:case 36303:case 36311:case 36292:return Ng}}class Og{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=gg(e.type)}}class Bg{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Fg(e.type)}}class kg{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],n)}}}const oa=/(\w+)(\])?(\[|\.)?/g;function Ql(i,t){i.seq.push(t),i.map[t.id]=t}function zg(i,t,e){const n=i.name,s=n.length;for(oa.lastIndex=0;;){const r=oa.exec(n),a=oa.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){Ql(e,l===void 0?new Og(o,i,t):new Bg(o,i,t));break}else{let d=e.map[o];d===void 0&&(d=new kg(o),Ql(e,d)),e=d}}}class lr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=t.getActiveUniform(e,a),c=t.getUniformLocation(e,o.name);zg(o,c,this)}const s=[],r=[];for(const a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&n.push(a)}return n}}function tc(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const Gg=37297;let Vg=0;function Hg(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const ec=new Ft;function Wg(i){qt._getMatrix(ec,qt.workingColorSpace,i);const t=`mat3( ${ec.elements.map(e=>e.toFixed(4))} )`;switch(qt.getTransfer(i)){case fr:return[t,"LinearTransferOETF"];case te:return[t,"sRGBTransferOETF"];default:return Dt("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function nc(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+Hg(i.getShaderSource(t),o)}else return r}function Xg(i,t){const e=Wg(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}const qg={[Bc]:"Linear",[kc]:"Reinhard",[zc]:"Cineon",[Gc]:"ACESFilmic",[Hc]:"AgX",[Wc]:"Neutral",[Vc]:"Custom"};function Yg(i,t){const e=qg[t];return e===void 0?(Dt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const $s=new N;function $g(){qt.getLuminanceCoefficients($s);const i=$s.x.toFixed(4),t=$s.y.toFixed(4),e=$s.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Kg(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(hs).join(`
`)}function Zg(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function jg(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function hs(i){return i!==""}function ic(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function sc(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Jg=/^[ \t]*#include +<([\w\d./]+)>/gm;function fo(i){return i.replace(Jg,t0)}const Qg=new Map;function t0(i,t){let e=Bt[t];if(e===void 0){const n=Qg.get(t);if(n!==void 0)e=Bt[n],Dt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return fo(e)}const e0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function rc(i){return i.replace(e0,n0)}function n0(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function ac(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}const i0={[ir]:"SHADOWMAP_TYPE_PCF",[cs]:"SHADOWMAP_TYPE_VSM"};function s0(i){return i0[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const r0={[di]:"ENVMAP_TYPE_CUBE",[qi]:"ENVMAP_TYPE_CUBE",[gr]:"ENVMAP_TYPE_CUBE_UV"};function a0(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":r0[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const o0={[qi]:"ENVMAP_MODE_REFRACTION"};function l0(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":o0[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const c0={[vo]:"ENVMAP_BLENDING_MULTIPLY",[Xu]:"ENVMAP_BLENDING_MIX",[qu]:"ENVMAP_BLENDING_ADD"};function h0(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":c0[i.combine]||"ENVMAP_BLENDING_NONE"}function u0(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function d0(i,t,e,n){const s=i.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const c=s0(e),l=a0(e),h=l0(e),d=h0(e),u=u0(e),p=Kg(e),g=Zg(r),x=s.createProgram();let m,f,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(hs).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(hs).join(`
`),f.length>0&&(f+=`
`)):(m=[ac(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(hs).join(`
`),f=[ac(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==pn?"#define TONE_MAPPING":"",e.toneMapping!==pn?Bt.tonemapping_pars_fragment:"",e.toneMapping!==pn?Yg("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Bt.colorspace_pars_fragment,Xg("linearToOutputTexel",e.outputColorSpace),$g(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(hs).join(`
`)),a=fo(a),a=ic(a,e),a=sc(a,e),o=fo(o),o=ic(o,e),o=sc(o,e),a=rc(a),o=rc(o),e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",e.glslVersion===gl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===gl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const T=y+m+a,b=y+f+o,w=tc(s,s.VERTEX_SHADER,T),E=tc(s,s.FRAGMENT_SHADER,b);s.attachShader(x,w),s.attachShader(x,E),e.index0AttributeName!==void 0?s.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function C(R){if(i.debug.checkShaderErrors){const U=s.getProgramInfoLog(x)||"",F=s.getShaderInfoLog(w)||"",H=s.getShaderInfoLog(E)||"",B=U.trim(),z=F.trim(),G=H.trim();let Q=!0,Z=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(Q=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,w,E);else{const ht=nc(s,w,"vertex"),mt=nc(s,E,"fragment");Xt("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+B+`
`+ht+`
`+mt)}else B!==""?Dt("WebGLProgram: Program Info Log:",B):(z===""||G==="")&&(Z=!1);Z&&(R.diagnostics={runnable:Q,programLog:B,vertexShader:{log:z,prefix:m},fragmentShader:{log:G,prefix:f}})}s.deleteShader(w),s.deleteShader(E),_=new lr(s,x),S=jg(s,x)}let _;this.getUniforms=function(){return _===void 0&&C(this),_};let S;this.getAttributes=function(){return S===void 0&&C(this),S};let O=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return O===!1&&(O=s.getProgramParameter(x,Gg)),O},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Vg++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=w,this.fragmentShader=E,this}let f0=0;class p0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new m0(t),e.set(t,n)),n}}class m0{constructor(t){this.id=f0++,this.code=t,this.usedTimes=0}}function g0(i,t,e,n,s,r){const a=new Co,o=new p0,c=new Set,l=[],h=new Map,d=n.logarithmicDepthBuffer;let u=n.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(_){return c.add(_),_===0?"uv":`uv${_}`}function x(_,S,O,R,U){const F=R.fog,H=U.geometry,B=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?R.environment:null,z=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,G=t.get(_.envMap||B,z),Q=G&&G.mapping===gr?G.image.height:null,Z=p[_.type];_.precision!==null&&(u=n.getMaxPrecision(_.precision),u!==_.precision&&Dt("WebGLProgram.getParameters:",_.precision,"not supported, using",u,"instead."));const ht=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,mt=ht!==void 0?ht.length:0;let dt=0;H.morphAttributes.position!==void 0&&(dt=1),H.morphAttributes.normal!==void 0&&(dt=2),H.morphAttributes.color!==void 0&&(dt=3);let Ot,ce,le,$;if(Z){const Qt=un[Z];Ot=Qt.vertexShader,ce=Qt.fragmentShader}else Ot=_.vertexShader,ce=_.fragmentShader,o.update(_),le=o.getVertexShaderID(_),$=o.getFragmentShaderID(_);const nt=i.getRenderTarget(),rt=i.state.buffers.depth.getReversed(),Nt=U.isInstancedMesh===!0,wt=U.isBatchedMesh===!0,Pt=!!_.map,Te=!!_.matcap,Wt=!!G,Jt=!!_.aoMap,ie=!!_.lightMap,kt=!!_.bumpMap,_e=!!_.normalMap,I=!!_.displacementMap,Me=!!_.emissiveMap,Zt=!!_.metalnessMap,re=!!_.roughnessMap,St=_.anisotropy>0,A=_.clearcoat>0,v=_.dispersion>0,L=_.iridescence>0,Y=_.sheen>0,K=_.transmission>0,q=St&&!!_.anisotropyMap,gt=A&&!!_.clearcoatMap,it=A&&!!_.clearcoatNormalMap,Tt=A&&!!_.clearcoatRoughnessMap,Rt=L&&!!_.iridescenceMap,j=L&&!!_.iridescenceThicknessMap,tt=Y&&!!_.sheenColorMap,_t=Y&&!!_.sheenRoughnessMap,xt=!!_.specularMap,ut=!!_.specularColorMap,zt=!!_.specularIntensityMap,P=K&&!!_.transmissionMap,st=K&&!!_.thicknessMap,et=!!_.gradientMap,pt=!!_.alphaMap,J=_.alphaTest>0,X=!!_.alphaHash,vt=!!_.extensions;let Lt=pn;_.toneMapped&&(nt===null||nt.isXRRenderTarget===!0)&&(Lt=i.toneMapping);const ae={shaderID:Z,shaderType:_.type,shaderName:_.name,vertexShader:Ot,fragmentShader:ce,defines:_.defines,customVertexShaderID:le,customFragmentShaderID:$,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:u,batching:wt,batchingColor:wt&&U._colorsTexture!==null,instancing:Nt,instancingColor:Nt&&U.instanceColor!==null,instancingMorph:Nt&&U.morphTexture!==null,outputColorSpace:nt===null?i.outputColorSpace:nt.isXRRenderTarget===!0?nt.texture.colorSpace:$i,alphaToCoverage:!!_.alphaToCoverage,map:Pt,matcap:Te,envMap:Wt,envMapMode:Wt&&G.mapping,envMapCubeUVHeight:Q,aoMap:Jt,lightMap:ie,bumpMap:kt,normalMap:_e,displacementMap:I,emissiveMap:Me,normalMapObjectSpace:_e&&_.normalMapType===Ku,normalMapTangentSpace:_e&&_.normalMapType===Qc,metalnessMap:Zt,roughnessMap:re,anisotropy:St,anisotropyMap:q,clearcoat:A,clearcoatMap:gt,clearcoatNormalMap:it,clearcoatRoughnessMap:Tt,dispersion:v,iridescence:L,iridescenceMap:Rt,iridescenceThicknessMap:j,sheen:Y,sheenColorMap:tt,sheenRoughnessMap:_t,specularMap:xt,specularColorMap:ut,specularIntensityMap:zt,transmission:K,transmissionMap:P,thicknessMap:st,gradientMap:et,opaque:_.transparent===!1&&_.blending===Gi&&_.alphaToCoverage===!1,alphaMap:pt,alphaTest:J,alphaHash:X,combine:_.combine,mapUv:Pt&&g(_.map.channel),aoMapUv:Jt&&g(_.aoMap.channel),lightMapUv:ie&&g(_.lightMap.channel),bumpMapUv:kt&&g(_.bumpMap.channel),normalMapUv:_e&&g(_.normalMap.channel),displacementMapUv:I&&g(_.displacementMap.channel),emissiveMapUv:Me&&g(_.emissiveMap.channel),metalnessMapUv:Zt&&g(_.metalnessMap.channel),roughnessMapUv:re&&g(_.roughnessMap.channel),anisotropyMapUv:q&&g(_.anisotropyMap.channel),clearcoatMapUv:gt&&g(_.clearcoatMap.channel),clearcoatNormalMapUv:it&&g(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Tt&&g(_.clearcoatRoughnessMap.channel),iridescenceMapUv:Rt&&g(_.iridescenceMap.channel),iridescenceThicknessMapUv:j&&g(_.iridescenceThicknessMap.channel),sheenColorMapUv:tt&&g(_.sheenColorMap.channel),sheenRoughnessMapUv:_t&&g(_.sheenRoughnessMap.channel),specularMapUv:xt&&g(_.specularMap.channel),specularColorMapUv:ut&&g(_.specularColorMap.channel),specularIntensityMapUv:zt&&g(_.specularIntensityMap.channel),transmissionMapUv:P&&g(_.transmissionMap.channel),thicknessMapUv:st&&g(_.thicknessMap.channel),alphaMapUv:pt&&g(_.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(_e||St),vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!H.attributes.uv&&(Pt||pt),fog:!!F,useFog:_.fog===!0,fogExp2:!!F&&F.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||H.attributes.normal===void 0&&_e===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:rt,skinning:U.isSkinnedMesh===!0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:mt,morphTextureStride:dt,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&O.length>0,shadowMapType:i.shadowMap.type,toneMapping:Lt,decodeVideoTexture:Pt&&_.map.isVideoTexture===!0&&qt.getTransfer(_.map.colorSpace)===te,decodeVideoTextureEmissive:Me&&_.emissiveMap.isVideoTexture===!0&&qt.getTransfer(_.emissiveMap.colorSpace)===te,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===ke,flipSided:_.side===Ve,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:vt&&_.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(vt&&_.extensions.multiDraw===!0||wt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return ae.vertexUv1s=c.has(1),ae.vertexUv2s=c.has(2),ae.vertexUv3s=c.has(3),c.clear(),ae}function m(_){const S=[];if(_.shaderID?S.push(_.shaderID):(S.push(_.customVertexShaderID),S.push(_.customFragmentShaderID)),_.defines!==void 0)for(const O in _.defines)S.push(O),S.push(_.defines[O]);return _.isRawShaderMaterial===!1&&(f(S,_),y(S,_),S.push(i.outputColorSpace)),S.push(_.customProgramCacheKey),S.join()}function f(_,S){_.push(S.precision),_.push(S.outputColorSpace),_.push(S.envMapMode),_.push(S.envMapCubeUVHeight),_.push(S.mapUv),_.push(S.alphaMapUv),_.push(S.lightMapUv),_.push(S.aoMapUv),_.push(S.bumpMapUv),_.push(S.normalMapUv),_.push(S.displacementMapUv),_.push(S.emissiveMapUv),_.push(S.metalnessMapUv),_.push(S.roughnessMapUv),_.push(S.anisotropyMapUv),_.push(S.clearcoatMapUv),_.push(S.clearcoatNormalMapUv),_.push(S.clearcoatRoughnessMapUv),_.push(S.iridescenceMapUv),_.push(S.iridescenceThicknessMapUv),_.push(S.sheenColorMapUv),_.push(S.sheenRoughnessMapUv),_.push(S.specularMapUv),_.push(S.specularColorMapUv),_.push(S.specularIntensityMapUv),_.push(S.transmissionMapUv),_.push(S.thicknessMapUv),_.push(S.combine),_.push(S.fogExp2),_.push(S.sizeAttenuation),_.push(S.morphTargetsCount),_.push(S.morphAttributeCount),_.push(S.numDirLights),_.push(S.numPointLights),_.push(S.numSpotLights),_.push(S.numSpotLightMaps),_.push(S.numHemiLights),_.push(S.numRectAreaLights),_.push(S.numDirLightShadows),_.push(S.numPointLightShadows),_.push(S.numSpotLightShadows),_.push(S.numSpotLightShadowsWithMaps),_.push(S.numLightProbes),_.push(S.shadowMapType),_.push(S.toneMapping),_.push(S.numClippingPlanes),_.push(S.numClipIntersection),_.push(S.depthPacking)}function y(_,S){a.disableAll(),S.instancing&&a.enable(0),S.instancingColor&&a.enable(1),S.instancingMorph&&a.enable(2),S.matcap&&a.enable(3),S.envMap&&a.enable(4),S.normalMapObjectSpace&&a.enable(5),S.normalMapTangentSpace&&a.enable(6),S.clearcoat&&a.enable(7),S.iridescence&&a.enable(8),S.alphaTest&&a.enable(9),S.vertexColors&&a.enable(10),S.vertexAlphas&&a.enable(11),S.vertexUv1s&&a.enable(12),S.vertexUv2s&&a.enable(13),S.vertexUv3s&&a.enable(14),S.vertexTangents&&a.enable(15),S.anisotropy&&a.enable(16),S.alphaHash&&a.enable(17),S.batching&&a.enable(18),S.dispersion&&a.enable(19),S.batchingColor&&a.enable(20),S.gradientMap&&a.enable(21),_.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reversedDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),_.push(a.mask)}function T(_){const S=p[_.type];let O;if(S){const R=un[S];O=Ld.clone(R.uniforms)}else O=_.uniforms;return O}function b(_,S){let O=h.get(S);return O!==void 0?++O.usedTimes:(O=new d0(i,S,_,s),l.push(O),h.set(S,O)),O}function w(_){if(--_.usedTimes===0){const S=l.indexOf(_);l[S]=l[l.length-1],l.pop(),h.delete(_.cacheKey),_.destroy()}}function E(_){o.remove(_)}function C(){o.dispose()}return{getParameters:x,getProgramCacheKey:m,getUniforms:T,acquireProgram:b,releaseProgram:w,releaseShaderCache:E,programs:l,dispose:C}}function _0(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function v0(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function oc(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function lc(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(u){let p=0;return u.isInstancedMesh&&(p+=2),u.isSkinnedMesh&&(p+=1),p}function o(u,p,g,x,m,f){let y=i[t];return y===void 0?(y={id:u.id,object:u,geometry:p,material:g,materialVariant:a(u),groupOrder:x,renderOrder:u.renderOrder,z:m,group:f},i[t]=y):(y.id=u.id,y.object=u,y.geometry=p,y.material=g,y.materialVariant=a(u),y.groupOrder=x,y.renderOrder=u.renderOrder,y.z=m,y.group=f),t++,y}function c(u,p,g,x,m,f){const y=o(u,p,g,x,m,f);g.transmission>0?n.push(y):g.transparent===!0?s.push(y):e.push(y)}function l(u,p,g,x,m,f){const y=o(u,p,g,x,m,f);g.transmission>0?n.unshift(y):g.transparent===!0?s.unshift(y):e.unshift(y)}function h(u,p){e.length>1&&e.sort(u||v0),n.length>1&&n.sort(p||oc),s.length>1&&s.sort(p||oc)}function d(){for(let u=t,p=i.length;u<p;u++){const g=i[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:d,sort:h}}function x0(){let i=new WeakMap;function t(n,s){const r=i.get(n);let a;return r===void 0?(a=new lc,i.set(n,[a])):s>=r.length?(a=new lc,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function M0(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new N,color:new Kt};break;case"SpotLight":e={position:new N,direction:new N,color:new Kt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new N,color:new Kt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new N,skyColor:new Kt,groundColor:new Kt};break;case"RectAreaLight":e={color:new Kt,position:new N,halfWidth:new N,halfHeight:new N};break}return i[t.id]=e,e}}}function S0(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ht};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ht};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ht,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let y0=0;function b0(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function E0(i){const t=new M0,e=S0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new N);const s=new N,r=new pe,a=new pe;function o(l){let h=0,d=0,u=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let p=0,g=0,x=0,m=0,f=0,y=0,T=0,b=0,w=0,E=0,C=0;l.sort(b0);for(let S=0,O=l.length;S<O;S++){const R=l[S],U=R.color,F=R.intensity,H=R.distance;let B=null;if(R.shadow&&R.shadow.map&&(R.shadow.map.texture.format===Yi?B=R.shadow.map.texture:B=R.shadow.map.depthTexture||R.shadow.map.texture),R.isAmbientLight)h+=U.r*F,d+=U.g*F,u+=U.b*F;else if(R.isLightProbe){for(let z=0;z<9;z++)n.probe[z].addScaledVector(R.sh.coefficients[z],F);C++}else if(R.isDirectionalLight){const z=t.get(R);if(z.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const G=R.shadow,Q=e.get(R);Q.shadowIntensity=G.intensity,Q.shadowBias=G.bias,Q.shadowNormalBias=G.normalBias,Q.shadowRadius=G.radius,Q.shadowMapSize=G.mapSize,n.directionalShadow[p]=Q,n.directionalShadowMap[p]=B,n.directionalShadowMatrix[p]=R.shadow.matrix,y++}n.directional[p]=z,p++}else if(R.isSpotLight){const z=t.get(R);z.position.setFromMatrixPosition(R.matrixWorld),z.color.copy(U).multiplyScalar(F),z.distance=H,z.coneCos=Math.cos(R.angle),z.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),z.decay=R.decay,n.spot[x]=z;const G=R.shadow;if(R.map&&(n.spotLightMap[w]=R.map,w++,G.updateMatrices(R),R.castShadow&&E++),n.spotLightMatrix[x]=G.matrix,R.castShadow){const Q=e.get(R);Q.shadowIntensity=G.intensity,Q.shadowBias=G.bias,Q.shadowNormalBias=G.normalBias,Q.shadowRadius=G.radius,Q.shadowMapSize=G.mapSize,n.spotShadow[x]=Q,n.spotShadowMap[x]=B,b++}x++}else if(R.isRectAreaLight){const z=t.get(R);z.color.copy(U).multiplyScalar(F),z.halfWidth.set(R.width*.5,0,0),z.halfHeight.set(0,R.height*.5,0),n.rectArea[m]=z,m++}else if(R.isPointLight){const z=t.get(R);if(z.color.copy(R.color).multiplyScalar(R.intensity),z.distance=R.distance,z.decay=R.decay,R.castShadow){const G=R.shadow,Q=e.get(R);Q.shadowIntensity=G.intensity,Q.shadowBias=G.bias,Q.shadowNormalBias=G.normalBias,Q.shadowRadius=G.radius,Q.shadowMapSize=G.mapSize,Q.shadowCameraNear=G.camera.near,Q.shadowCameraFar=G.camera.far,n.pointShadow[g]=Q,n.pointShadowMap[g]=B,n.pointShadowMatrix[g]=R.shadow.matrix,T++}n.point[g]=z,g++}else if(R.isHemisphereLight){const z=t.get(R);z.skyColor.copy(R.color).multiplyScalar(F),z.groundColor.copy(R.groundColor).multiplyScalar(F),n.hemi[f]=z,f++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=at.LTC_FLOAT_1,n.rectAreaLTC2=at.LTC_FLOAT_2):(n.rectAreaLTC1=at.LTC_HALF_1,n.rectAreaLTC2=at.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;const _=n.hash;(_.directionalLength!==p||_.pointLength!==g||_.spotLength!==x||_.rectAreaLength!==m||_.hemiLength!==f||_.numDirectionalShadows!==y||_.numPointShadows!==T||_.numSpotShadows!==b||_.numSpotMaps!==w||_.numLightProbes!==C)&&(n.directional.length=p,n.spot.length=x,n.rectArea.length=m,n.point.length=g,n.hemi.length=f,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=T,n.pointShadowMap.length=T,n.spotShadow.length=b,n.spotShadowMap.length=b,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=T,n.spotLightMatrix.length=b+w-E,n.spotLightMap.length=w,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=C,_.directionalLength=p,_.pointLength=g,_.spotLength=x,_.rectAreaLength=m,_.hemiLength=f,_.numDirectionalShadows=y,_.numPointShadows=T,_.numSpotShadows=b,_.numSpotMaps=w,_.numLightProbes=C,n.version=y0++)}function c(l,h){let d=0,u=0,p=0,g=0,x=0;const m=h.matrixWorldInverse;for(let f=0,y=l.length;f<y;f++){const T=l[f];if(T.isDirectionalLight){const b=n.directional[d];b.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(m),d++}else if(T.isSpotLight){const b=n.spot[p];b.position.setFromMatrixPosition(T.matrixWorld),b.position.applyMatrix4(m),b.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(m),p++}else if(T.isRectAreaLight){const b=n.rectArea[g];b.position.setFromMatrixPosition(T.matrixWorld),b.position.applyMatrix4(m),a.identity(),r.copy(T.matrixWorld),r.premultiply(m),a.extractRotation(r),b.halfWidth.set(T.width*.5,0,0),b.halfHeight.set(0,T.height*.5,0),b.halfWidth.applyMatrix4(a),b.halfHeight.applyMatrix4(a),g++}else if(T.isPointLight){const b=n.point[u];b.position.setFromMatrixPosition(T.matrixWorld),b.position.applyMatrix4(m),u++}else if(T.isHemisphereLight){const b=n.hemi[x];b.direction.setFromMatrixPosition(T.matrixWorld),b.direction.transformDirection(m),x++}}}return{setup:o,setupView:c,state:n}}function cc(i){const t=new E0(i),e=[],n=[];function s(h){l.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function a(h){n.push(h)}function o(){t.setup(e)}function c(h){t.setupView(e,h)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:o,setupLightsView:c,pushLight:r,pushShadow:a}}function T0(i){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new cc(i),t.set(s,[o])):r>=a.length?(o=new cc(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}const A0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,w0=`uniform sampler2D shadow_pass;
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
}`,C0=[new N(1,0,0),new N(-1,0,0),new N(0,1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1)],R0=[new N(0,-1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1),new N(0,-1,0),new N(0,-1,0)],hc=new pe,as=new N,la=new N;function I0(i,t,e){let n=new Io;const s=new Ht,r=new Ht,a=new ge,o=new Fd,c=new Od,l={},h=e.maxTextureSize,d={[Kn]:Ve,[Ve]:Kn,[ke]:ke},u=new xn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ht},radius:{value:4}},vertexShader:A0,fragmentShader:w0}),p=u.clone();p.defines.HORIZONTAL_PASS=1;const g=new He;g.setAttribute("position",new gn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new ct(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ir;let f=this.type;this.render=function(E,C,_){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;this.type===Au&&(Dt("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=ir);const S=i.getRenderTarget(),O=i.getActiveCubeFace(),R=i.getActiveMipmapLevel(),U=i.state;U.setBlending(Ln),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const F=f!==this.type;F&&C.traverse(function(H){H.material&&(Array.isArray(H.material)?H.material.forEach(B=>B.needsUpdate=!0):H.material.needsUpdate=!0)});for(let H=0,B=E.length;H<B;H++){const z=E[H],G=z.shadow;if(G===void 0){Dt("WebGLShadowMap:",z,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;s.copy(G.mapSize);const Q=G.getFrameExtents();s.multiply(Q),r.copy(G.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/Q.x),s.x=r.x*Q.x,G.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/Q.y),s.y=r.y*Q.y,G.mapSize.y=r.y));const Z=i.state.buffers.depth.getReversed();if(G.camera._reversedDepth=Z,G.map===null||F===!0){if(G.map!==null&&(G.map.depthTexture!==null&&(G.map.depthTexture.dispose(),G.map.depthTexture=null),G.map.dispose()),this.type===cs){if(z.isPointLight){Dt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}G.map=new mn(s.x,s.y,{format:Yi,type:Un,minFilter:Ne,magFilter:Ne,generateMipmaps:!1}),G.map.texture.name=z.name+".shadowMap",G.map.depthTexture=new ms(s.x,s.y,dn),G.map.depthTexture.name=z.name+".shadowMapDepth",G.map.depthTexture.format=Nn,G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=Re,G.map.depthTexture.magFilter=Re}else z.isPointLight?(G.map=new dh(s.x),G.map.depthTexture=new Id(s.x,_n)):(G.map=new mn(s.x,s.y),G.map.depthTexture=new ms(s.x,s.y,_n)),G.map.depthTexture.name=z.name+".shadowMap",G.map.depthTexture.format=Nn,this.type===ir?(G.map.depthTexture.compareFunction=Z?Ao:To,G.map.depthTexture.minFilter=Ne,G.map.depthTexture.magFilter=Ne):(G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=Re,G.map.depthTexture.magFilter=Re);G.camera.updateProjectionMatrix()}const ht=G.map.isWebGLCubeRenderTarget?6:1;for(let mt=0;mt<ht;mt++){if(G.map.isWebGLCubeRenderTarget)i.setRenderTarget(G.map,mt),i.clear();else{mt===0&&(i.setRenderTarget(G.map),i.clear());const dt=G.getViewport(mt);a.set(r.x*dt.x,r.y*dt.y,r.x*dt.z,r.y*dt.w),U.viewport(a)}if(z.isPointLight){const dt=G.camera,Ot=G.matrix,ce=z.distance||dt.far;ce!==dt.far&&(dt.far=ce,dt.updateProjectionMatrix()),as.setFromMatrixPosition(z.matrixWorld),dt.position.copy(as),la.copy(dt.position),la.add(C0[mt]),dt.up.copy(R0[mt]),dt.lookAt(la),dt.updateMatrixWorld(),Ot.makeTranslation(-as.x,-as.y,-as.z),hc.multiplyMatrices(dt.projectionMatrix,dt.matrixWorldInverse),G._frustum.setFromProjectionMatrix(hc,dt.coordinateSystem,dt.reversedDepth)}else G.updateMatrices(z);n=G.getFrustum(),b(C,_,G.camera,z,this.type)}G.isPointLightShadow!==!0&&this.type===cs&&y(G,_),G.needsUpdate=!1}f=this.type,m.needsUpdate=!1,i.setRenderTarget(S,O,R)};function y(E,C){const _=t.update(x);u.defines.VSM_SAMPLES!==E.blurSamples&&(u.defines.VSM_SAMPLES=E.blurSamples,p.defines.VSM_SAMPLES=E.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new mn(s.x,s.y,{format:Yi,type:Un})),u.uniforms.shadow_pass.value=E.map.depthTexture,u.uniforms.resolution.value=E.mapSize,u.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(C,null,_,u,x,null),p.uniforms.shadow_pass.value=E.mapPass.texture,p.uniforms.resolution.value=E.mapSize,p.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(C,null,_,p,x,null)}function T(E,C,_,S){let O=null;const R=_.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(R!==void 0)O=R;else if(O=_.isPointLight===!0?c:o,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const U=O.uuid,F=C.uuid;let H=l[U];H===void 0&&(H={},l[U]=H);let B=H[F];B===void 0&&(B=O.clone(),H[F]=B,C.addEventListener("dispose",w)),O=B}if(O.visible=C.visible,O.wireframe=C.wireframe,S===cs?O.side=C.shadowSide!==null?C.shadowSide:C.side:O.side=C.shadowSide!==null?C.shadowSide:d[C.side],O.alphaMap=C.alphaMap,O.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,O.map=C.map,O.clipShadows=C.clipShadows,O.clippingPlanes=C.clippingPlanes,O.clipIntersection=C.clipIntersection,O.displacementMap=C.displacementMap,O.displacementScale=C.displacementScale,O.displacementBias=C.displacementBias,O.wireframeLinewidth=C.wireframeLinewidth,O.linewidth=C.linewidth,_.isPointLight===!0&&O.isMeshDistanceMaterial===!0){const U=i.properties.get(O);U.light=_}return O}function b(E,C,_,S,O){if(E.visible===!1)return;if(E.layers.test(C.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&O===cs)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,E.matrixWorld);const F=t.update(E),H=E.material;if(Array.isArray(H)){const B=F.groups;for(let z=0,G=B.length;z<G;z++){const Q=B[z],Z=H[Q.materialIndex];if(Z&&Z.visible){const ht=T(E,Z,S,O);E.onBeforeShadow(i,E,C,_,F,ht,Q),i.renderBufferDirect(_,null,F,ht,E,Q),E.onAfterShadow(i,E,C,_,F,ht,Q)}}}else if(H.visible){const B=T(E,H,S,O);E.onBeforeShadow(i,E,C,_,F,B,null),i.renderBufferDirect(_,null,F,B,E,null),E.onAfterShadow(i,E,C,_,F,B,null)}}const U=E.children;for(let F=0,H=U.length;F<H;F++)b(U[F],C,_,S,O)}function w(E){E.target.removeEventListener("dispose",w);for(const _ in l){const S=l[_],O=E.target.uuid;O in S&&(S[O].dispose(),delete S[O])}}}function P0(i,t){function e(){let P=!1;const st=new ge;let et=null;const pt=new ge(0,0,0,0);return{setMask:function(J){et!==J&&!P&&(i.colorMask(J,J,J,J),et=J)},setLocked:function(J){P=J},setClear:function(J,X,vt,Lt,ae){ae===!0&&(J*=Lt,X*=Lt,vt*=Lt),st.set(J,X,vt,Lt),pt.equals(st)===!1&&(i.clearColor(J,X,vt,Lt),pt.copy(st))},reset:function(){P=!1,et=null,pt.set(-1,0,0,0)}}}function n(){let P=!1,st=!1,et=null,pt=null,J=null;return{setReversed:function(X){if(st!==X){const vt=t.get("EXT_clip_control");X?vt.clipControlEXT(vt.LOWER_LEFT_EXT,vt.ZERO_TO_ONE_EXT):vt.clipControlEXT(vt.LOWER_LEFT_EXT,vt.NEGATIVE_ONE_TO_ONE_EXT),st=X;const Lt=J;J=null,this.setClear(Lt)}},getReversed:function(){return st},setTest:function(X){X?nt(i.DEPTH_TEST):rt(i.DEPTH_TEST)},setMask:function(X){et!==X&&!P&&(i.depthMask(X),et=X)},setFunc:function(X){if(st&&(X=rd[X]),pt!==X){switch(X){case ya:i.depthFunc(i.NEVER);break;case ba:i.depthFunc(i.ALWAYS);break;case Ea:i.depthFunc(i.LESS);break;case Xi:i.depthFunc(i.LEQUAL);break;case Ta:i.depthFunc(i.EQUAL);break;case Aa:i.depthFunc(i.GEQUAL);break;case wa:i.depthFunc(i.GREATER);break;case Ca:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}pt=X}},setLocked:function(X){P=X},setClear:function(X){J!==X&&(J=X,st&&(X=1-X),i.clearDepth(X))},reset:function(){P=!1,et=null,pt=null,J=null,st=!1}}}function s(){let P=!1,st=null,et=null,pt=null,J=null,X=null,vt=null,Lt=null,ae=null;return{setTest:function(Qt){P||(Qt?nt(i.STENCIL_TEST):rt(i.STENCIL_TEST))},setMask:function(Qt){st!==Qt&&!P&&(i.stencilMask(Qt),st=Qt)},setFunc:function(Qt,Mn,Sn){(et!==Qt||pt!==Mn||J!==Sn)&&(i.stencilFunc(Qt,Mn,Sn),et=Qt,pt=Mn,J=Sn)},setOp:function(Qt,Mn,Sn){(X!==Qt||vt!==Mn||Lt!==Sn)&&(i.stencilOp(Qt,Mn,Sn),X=Qt,vt=Mn,Lt=Sn)},setLocked:function(Qt){P=Qt},setClear:function(Qt){ae!==Qt&&(i.clearStencil(Qt),ae=Qt)},reset:function(){P=!1,st=null,et=null,pt=null,J=null,X=null,vt=null,Lt=null,ae=null}}}const r=new e,a=new n,o=new s,c=new WeakMap,l=new WeakMap;let h={},d={},u=new WeakMap,p=[],g=null,x=!1,m=null,f=null,y=null,T=null,b=null,w=null,E=null,C=new Kt(0,0,0),_=0,S=!1,O=null,R=null,U=null,F=null,H=null;const B=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,G=0;const Q=i.getParameter(i.VERSION);Q.indexOf("WebGL")!==-1?(G=parseFloat(/^WebGL (\d)/.exec(Q)[1]),z=G>=1):Q.indexOf("OpenGL ES")!==-1&&(G=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),z=G>=2);let Z=null,ht={};const mt=i.getParameter(i.SCISSOR_BOX),dt=i.getParameter(i.VIEWPORT),Ot=new ge().fromArray(mt),ce=new ge().fromArray(dt);function le(P,st,et,pt){const J=new Uint8Array(4),X=i.createTexture();i.bindTexture(P,X),i.texParameteri(P,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(P,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let vt=0;vt<et;vt++)P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY?i.texImage3D(st,0,i.RGBA,1,1,pt,0,i.RGBA,i.UNSIGNED_BYTE,J):i.texImage2D(st+vt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,J);return X}const $={};$[i.TEXTURE_2D]=le(i.TEXTURE_2D,i.TEXTURE_2D,1),$[i.TEXTURE_CUBE_MAP]=le(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),$[i.TEXTURE_2D_ARRAY]=le(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),$[i.TEXTURE_3D]=le(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),nt(i.DEPTH_TEST),a.setFunc(Xi),kt(!1),_e(hl),nt(i.CULL_FACE),Jt(Ln);function nt(P){h[P]!==!0&&(i.enable(P),h[P]=!0)}function rt(P){h[P]!==!1&&(i.disable(P),h[P]=!1)}function Nt(P,st){return d[P]!==st?(i.bindFramebuffer(P,st),d[P]=st,P===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=st),P===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=st),!0):!1}function wt(P,st){let et=p,pt=!1;if(P){et=u.get(st),et===void 0&&(et=[],u.set(st,et));const J=P.textures;if(et.length!==J.length||et[0]!==i.COLOR_ATTACHMENT0){for(let X=0,vt=J.length;X<vt;X++)et[X]=i.COLOR_ATTACHMENT0+X;et.length=J.length,pt=!0}}else et[0]!==i.BACK&&(et[0]=i.BACK,pt=!0);pt&&i.drawBuffers(et)}function Pt(P){return g!==P?(i.useProgram(P),g=P,!0):!1}const Te={[ai]:i.FUNC_ADD,[Cu]:i.FUNC_SUBTRACT,[Ru]:i.FUNC_REVERSE_SUBTRACT};Te[Iu]=i.MIN,Te[Pu]=i.MAX;const Wt={[Lu]:i.ZERO,[Du]:i.ONE,[Uu]:i.SRC_COLOR,[Ma]:i.SRC_ALPHA,[zu]:i.SRC_ALPHA_SATURATE,[Bu]:i.DST_COLOR,[Fu]:i.DST_ALPHA,[Nu]:i.ONE_MINUS_SRC_COLOR,[Sa]:i.ONE_MINUS_SRC_ALPHA,[ku]:i.ONE_MINUS_DST_COLOR,[Ou]:i.ONE_MINUS_DST_ALPHA,[Gu]:i.CONSTANT_COLOR,[Vu]:i.ONE_MINUS_CONSTANT_COLOR,[Hu]:i.CONSTANT_ALPHA,[Wu]:i.ONE_MINUS_CONSTANT_ALPHA};function Jt(P,st,et,pt,J,X,vt,Lt,ae,Qt){if(P===Ln){x===!0&&(rt(i.BLEND),x=!1);return}if(x===!1&&(nt(i.BLEND),x=!0),P!==wu){if(P!==m||Qt!==S){if((f!==ai||b!==ai)&&(i.blendEquation(i.FUNC_ADD),f=ai,b=ai),Qt)switch(P){case Gi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ul:i.blendFunc(i.ONE,i.ONE);break;case dl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case fl:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Xt("WebGLState: Invalid blending: ",P);break}else switch(P){case Gi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ul:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case dl:Xt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case fl:Xt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Xt("WebGLState: Invalid blending: ",P);break}y=null,T=null,w=null,E=null,C.set(0,0,0),_=0,m=P,S=Qt}return}J=J||st,X=X||et,vt=vt||pt,(st!==f||J!==b)&&(i.blendEquationSeparate(Te[st],Te[J]),f=st,b=J),(et!==y||pt!==T||X!==w||vt!==E)&&(i.blendFuncSeparate(Wt[et],Wt[pt],Wt[X],Wt[vt]),y=et,T=pt,w=X,E=vt),(Lt.equals(C)===!1||ae!==_)&&(i.blendColor(Lt.r,Lt.g,Lt.b,ae),C.copy(Lt),_=ae),m=P,S=!1}function ie(P,st){P.side===ke?rt(i.CULL_FACE):nt(i.CULL_FACE);let et=P.side===Ve;st&&(et=!et),kt(et),P.blending===Gi&&P.transparent===!1?Jt(Ln):Jt(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),a.setFunc(P.depthFunc),a.setTest(P.depthTest),a.setMask(P.depthWrite),r.setMask(P.colorWrite);const pt=P.stencilWrite;o.setTest(pt),pt&&(o.setMask(P.stencilWriteMask),o.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),o.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),Me(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?nt(i.SAMPLE_ALPHA_TO_COVERAGE):rt(i.SAMPLE_ALPHA_TO_COVERAGE)}function kt(P){O!==P&&(P?i.frontFace(i.CW):i.frontFace(i.CCW),O=P)}function _e(P){P!==Eu?(nt(i.CULL_FACE),P!==R&&(P===hl?i.cullFace(i.BACK):P===Tu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):rt(i.CULL_FACE),R=P}function I(P){P!==U&&(z&&i.lineWidth(P),U=P)}function Me(P,st,et){P?(nt(i.POLYGON_OFFSET_FILL),(F!==st||H!==et)&&(F=st,H=et,a.getReversed()&&(st=-st),i.polygonOffset(st,et))):rt(i.POLYGON_OFFSET_FILL)}function Zt(P){P?nt(i.SCISSOR_TEST):rt(i.SCISSOR_TEST)}function re(P){P===void 0&&(P=i.TEXTURE0+B-1),Z!==P&&(i.activeTexture(P),Z=P)}function St(P,st,et){et===void 0&&(Z===null?et=i.TEXTURE0+B-1:et=Z);let pt=ht[et];pt===void 0&&(pt={type:void 0,texture:void 0},ht[et]=pt),(pt.type!==P||pt.texture!==st)&&(Z!==et&&(i.activeTexture(et),Z=et),i.bindTexture(P,st||$[P]),pt.type=P,pt.texture=st)}function A(){const P=ht[Z];P!==void 0&&P.type!==void 0&&(i.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function v(){try{i.compressedTexImage2D(...arguments)}catch(P){Xt("WebGLState:",P)}}function L(){try{i.compressedTexImage3D(...arguments)}catch(P){Xt("WebGLState:",P)}}function Y(){try{i.texSubImage2D(...arguments)}catch(P){Xt("WebGLState:",P)}}function K(){try{i.texSubImage3D(...arguments)}catch(P){Xt("WebGLState:",P)}}function q(){try{i.compressedTexSubImage2D(...arguments)}catch(P){Xt("WebGLState:",P)}}function gt(){try{i.compressedTexSubImage3D(...arguments)}catch(P){Xt("WebGLState:",P)}}function it(){try{i.texStorage2D(...arguments)}catch(P){Xt("WebGLState:",P)}}function Tt(){try{i.texStorage3D(...arguments)}catch(P){Xt("WebGLState:",P)}}function Rt(){try{i.texImage2D(...arguments)}catch(P){Xt("WebGLState:",P)}}function j(){try{i.texImage3D(...arguments)}catch(P){Xt("WebGLState:",P)}}function tt(P){Ot.equals(P)===!1&&(i.scissor(P.x,P.y,P.z,P.w),Ot.copy(P))}function _t(P){ce.equals(P)===!1&&(i.viewport(P.x,P.y,P.z,P.w),ce.copy(P))}function xt(P,st){let et=l.get(st);et===void 0&&(et=new WeakMap,l.set(st,et));let pt=et.get(P);pt===void 0&&(pt=i.getUniformBlockIndex(st,P.name),et.set(P,pt))}function ut(P,st){const pt=l.get(st).get(P);c.get(st)!==pt&&(i.uniformBlockBinding(st,pt,P.__bindingPointIndex),c.set(st,pt))}function zt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},Z=null,ht={},d={},u=new WeakMap,p=[],g=null,x=!1,m=null,f=null,y=null,T=null,b=null,w=null,E=null,C=new Kt(0,0,0),_=0,S=!1,O=null,R=null,U=null,F=null,H=null,Ot.set(0,0,i.canvas.width,i.canvas.height),ce.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:nt,disable:rt,bindFramebuffer:Nt,drawBuffers:wt,useProgram:Pt,setBlending:Jt,setMaterial:ie,setFlipSided:kt,setCullFace:_e,setLineWidth:I,setPolygonOffset:Me,setScissorTest:Zt,activeTexture:re,bindTexture:St,unbindTexture:A,compressedTexImage2D:v,compressedTexImage3D:L,texImage2D:Rt,texImage3D:j,updateUBOMapping:xt,uniformBlockBinding:ut,texStorage2D:it,texStorage3D:Tt,texSubImage2D:Y,texSubImage3D:K,compressedTexSubImage2D:q,compressedTexSubImage3D:gt,scissor:tt,viewport:_t,reset:zt}}function L0(i,t,e,n,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Ht,h=new WeakMap;let d;const u=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(A,v){return p?new OffscreenCanvas(A,v):ps("canvas")}function x(A,v,L){let Y=1;const K=St(A);if((K.width>L||K.height>L)&&(Y=L/Math.max(K.width,K.height)),Y<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const q=Math.floor(Y*K.width),gt=Math.floor(Y*K.height);d===void 0&&(d=g(q,gt));const it=v?g(q,gt):d;return it.width=q,it.height=gt,it.getContext("2d").drawImage(A,0,0,q,gt),Dt("WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+q+"x"+gt+")."),it}else return"data"in A&&Dt("WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),A;return A}function m(A){return A.generateMipmaps}function f(A){i.generateMipmap(A)}function y(A){return A.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?i.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function T(A,v,L,Y,K=!1){if(A!==null){if(i[A]!==void 0)return i[A];Dt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let q=v;if(v===i.RED&&(L===i.FLOAT&&(q=i.R32F),L===i.HALF_FLOAT&&(q=i.R16F),L===i.UNSIGNED_BYTE&&(q=i.R8)),v===i.RED_INTEGER&&(L===i.UNSIGNED_BYTE&&(q=i.R8UI),L===i.UNSIGNED_SHORT&&(q=i.R16UI),L===i.UNSIGNED_INT&&(q=i.R32UI),L===i.BYTE&&(q=i.R8I),L===i.SHORT&&(q=i.R16I),L===i.INT&&(q=i.R32I)),v===i.RG&&(L===i.FLOAT&&(q=i.RG32F),L===i.HALF_FLOAT&&(q=i.RG16F),L===i.UNSIGNED_BYTE&&(q=i.RG8)),v===i.RG_INTEGER&&(L===i.UNSIGNED_BYTE&&(q=i.RG8UI),L===i.UNSIGNED_SHORT&&(q=i.RG16UI),L===i.UNSIGNED_INT&&(q=i.RG32UI),L===i.BYTE&&(q=i.RG8I),L===i.SHORT&&(q=i.RG16I),L===i.INT&&(q=i.RG32I)),v===i.RGB_INTEGER&&(L===i.UNSIGNED_BYTE&&(q=i.RGB8UI),L===i.UNSIGNED_SHORT&&(q=i.RGB16UI),L===i.UNSIGNED_INT&&(q=i.RGB32UI),L===i.BYTE&&(q=i.RGB8I),L===i.SHORT&&(q=i.RGB16I),L===i.INT&&(q=i.RGB32I)),v===i.RGBA_INTEGER&&(L===i.UNSIGNED_BYTE&&(q=i.RGBA8UI),L===i.UNSIGNED_SHORT&&(q=i.RGBA16UI),L===i.UNSIGNED_INT&&(q=i.RGBA32UI),L===i.BYTE&&(q=i.RGBA8I),L===i.SHORT&&(q=i.RGBA16I),L===i.INT&&(q=i.RGBA32I)),v===i.RGB&&(L===i.UNSIGNED_INT_5_9_9_9_REV&&(q=i.RGB9_E5),L===i.UNSIGNED_INT_10F_11F_11F_REV&&(q=i.R11F_G11F_B10F)),v===i.RGBA){const gt=K?fr:qt.getTransfer(Y);L===i.FLOAT&&(q=i.RGBA32F),L===i.HALF_FLOAT&&(q=i.RGBA16F),L===i.UNSIGNED_BYTE&&(q=gt===te?i.SRGB8_ALPHA8:i.RGBA8),L===i.UNSIGNED_SHORT_4_4_4_4&&(q=i.RGBA4),L===i.UNSIGNED_SHORT_5_5_5_1&&(q=i.RGB5_A1)}return(q===i.R16F||q===i.R32F||q===i.RG16F||q===i.RG32F||q===i.RGBA16F||q===i.RGBA32F)&&t.get("EXT_color_buffer_float"),q}function b(A,v){let L;return A?v===null||v===_n||v===ds?L=i.DEPTH24_STENCIL8:v===dn?L=i.DEPTH32F_STENCIL8:v===us&&(L=i.DEPTH24_STENCIL8,Dt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===_n||v===ds?L=i.DEPTH_COMPONENT24:v===dn?L=i.DEPTH_COMPONENT32F:v===us&&(L=i.DEPTH_COMPONENT16),L}function w(A,v){return m(A)===!0||A.isFramebufferTexture&&A.minFilter!==Re&&A.minFilter!==Ne?Math.log2(Math.max(v.width,v.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?v.mipmaps.length:1}function E(A){const v=A.target;v.removeEventListener("dispose",E),_(v),v.isVideoTexture&&h.delete(v)}function C(A){const v=A.target;v.removeEventListener("dispose",C),O(v)}function _(A){const v=n.get(A);if(v.__webglInit===void 0)return;const L=A.source,Y=u.get(L);if(Y){const K=Y[v.__cacheKey];K.usedTimes--,K.usedTimes===0&&S(A),Object.keys(Y).length===0&&u.delete(L)}n.remove(A)}function S(A){const v=n.get(A);i.deleteTexture(v.__webglTexture);const L=A.source,Y=u.get(L);delete Y[v.__cacheKey],a.memory.textures--}function O(A){const v=n.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),n.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(v.__webglFramebuffer[Y]))for(let K=0;K<v.__webglFramebuffer[Y].length;K++)i.deleteFramebuffer(v.__webglFramebuffer[Y][K]);else i.deleteFramebuffer(v.__webglFramebuffer[Y]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[Y])}else{if(Array.isArray(v.__webglFramebuffer))for(let Y=0;Y<v.__webglFramebuffer.length;Y++)i.deleteFramebuffer(v.__webglFramebuffer[Y]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let Y=0;Y<v.__webglColorRenderbuffer.length;Y++)v.__webglColorRenderbuffer[Y]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[Y]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const L=A.textures;for(let Y=0,K=L.length;Y<K;Y++){const q=n.get(L[Y]);q.__webglTexture&&(i.deleteTexture(q.__webglTexture),a.memory.textures--),n.remove(L[Y])}n.remove(A)}let R=0;function U(){R=0}function F(){const A=R;return A>=s.maxTextures&&Dt("WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+s.maxTextures),R+=1,A}function H(A){const v=[];return v.push(A.wrapS),v.push(A.wrapT),v.push(A.wrapR||0),v.push(A.magFilter),v.push(A.minFilter),v.push(A.anisotropy),v.push(A.internalFormat),v.push(A.format),v.push(A.type),v.push(A.generateMipmaps),v.push(A.premultiplyAlpha),v.push(A.flipY),v.push(A.unpackAlignment),v.push(A.colorSpace),v.join()}function B(A,v){const L=n.get(A);if(A.isVideoTexture&&Zt(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&L.__version!==A.version){const Y=A.image;if(Y===null)Dt("WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)Dt("WebGLRenderer: Texture marked for update but image is incomplete");else{$(L,A,v);return}}else A.isExternalTexture&&(L.__webglTexture=A.sourceTexture?A.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,L.__webglTexture,i.TEXTURE0+v)}function z(A,v){const L=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&L.__version!==A.version){$(L,A,v);return}else A.isExternalTexture&&(L.__webglTexture=A.sourceTexture?A.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,L.__webglTexture,i.TEXTURE0+v)}function G(A,v){const L=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&L.__version!==A.version){$(L,A,v);return}e.bindTexture(i.TEXTURE_3D,L.__webglTexture,i.TEXTURE0+v)}function Q(A,v){const L=n.get(A);if(A.isCubeDepthTexture!==!0&&A.version>0&&L.__version!==A.version){nt(L,A,v);return}e.bindTexture(i.TEXTURE_CUBE_MAP,L.__webglTexture,i.TEXTURE0+v)}const Z={[Ra]:i.REPEAT,[In]:i.CLAMP_TO_EDGE,[Ia]:i.MIRRORED_REPEAT},ht={[Re]:i.NEAREST,[Yu]:i.NEAREST_MIPMAP_NEAREST,[ws]:i.NEAREST_MIPMAP_LINEAR,[Ne]:i.LINEAR,[Ir]:i.LINEAR_MIPMAP_NEAREST,[hi]:i.LINEAR_MIPMAP_LINEAR},mt={[Zu]:i.NEVER,[ed]:i.ALWAYS,[ju]:i.LESS,[To]:i.LEQUAL,[Ju]:i.EQUAL,[Ao]:i.GEQUAL,[Qu]:i.GREATER,[td]:i.NOTEQUAL};function dt(A,v){if(v.type===dn&&t.has("OES_texture_float_linear")===!1&&(v.magFilter===Ne||v.magFilter===Ir||v.magFilter===ws||v.magFilter===hi||v.minFilter===Ne||v.minFilter===Ir||v.minFilter===ws||v.minFilter===hi)&&Dt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(A,i.TEXTURE_WRAP_S,Z[v.wrapS]),i.texParameteri(A,i.TEXTURE_WRAP_T,Z[v.wrapT]),(A===i.TEXTURE_3D||A===i.TEXTURE_2D_ARRAY)&&i.texParameteri(A,i.TEXTURE_WRAP_R,Z[v.wrapR]),i.texParameteri(A,i.TEXTURE_MAG_FILTER,ht[v.magFilter]),i.texParameteri(A,i.TEXTURE_MIN_FILTER,ht[v.minFilter]),v.compareFunction&&(i.texParameteri(A,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(A,i.TEXTURE_COMPARE_FUNC,mt[v.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Re||v.minFilter!==ws&&v.minFilter!==hi||v.type===dn&&t.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){const L=t.get("EXT_texture_filter_anisotropic");i.texParameterf(A,L.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function Ot(A,v){let L=!1;A.__webglInit===void 0&&(A.__webglInit=!0,v.addEventListener("dispose",E));const Y=v.source;let K=u.get(Y);K===void 0&&(K={},u.set(Y,K));const q=H(v);if(q!==A.__cacheKey){K[q]===void 0&&(K[q]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,L=!0),K[q].usedTimes++;const gt=K[A.__cacheKey];gt!==void 0&&(K[A.__cacheKey].usedTimes--,gt.usedTimes===0&&S(v)),A.__cacheKey=q,A.__webglTexture=K[q].texture}return L}function ce(A,v,L){return Math.floor(Math.floor(A/L)/v)}function le(A,v,L,Y){const q=A.updateRanges;if(q.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,v.width,v.height,L,Y,v.data);else{q.sort((j,tt)=>j.start-tt.start);let gt=0;for(let j=1;j<q.length;j++){const tt=q[gt],_t=q[j],xt=tt.start+tt.count,ut=ce(_t.start,v.width,4),zt=ce(tt.start,v.width,4);_t.start<=xt+1&&ut===zt&&ce(_t.start+_t.count-1,v.width,4)===ut?tt.count=Math.max(tt.count,_t.start+_t.count-tt.start):(++gt,q[gt]=_t)}q.length=gt+1;const it=i.getParameter(i.UNPACK_ROW_LENGTH),Tt=i.getParameter(i.UNPACK_SKIP_PIXELS),Rt=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,v.width);for(let j=0,tt=q.length;j<tt;j++){const _t=q[j],xt=Math.floor(_t.start/4),ut=Math.ceil(_t.count/4),zt=xt%v.width,P=Math.floor(xt/v.width),st=ut,et=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,zt),i.pixelStorei(i.UNPACK_SKIP_ROWS,P),e.texSubImage2D(i.TEXTURE_2D,0,zt,P,st,et,L,Y,v.data)}A.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,it),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Tt),i.pixelStorei(i.UNPACK_SKIP_ROWS,Rt)}}function $(A,v,L){let Y=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(Y=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(Y=i.TEXTURE_3D);const K=Ot(A,v),q=v.source;e.bindTexture(Y,A.__webglTexture,i.TEXTURE0+L);const gt=n.get(q);if(q.version!==gt.__version||K===!0){e.activeTexture(i.TEXTURE0+L);const it=qt.getPrimaries(qt.workingColorSpace),Tt=v.colorSpace===Xn?null:qt.getPrimaries(v.colorSpace),Rt=v.colorSpace===Xn||it===Tt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Rt);let j=x(v.image,!1,s.maxTextureSize);j=re(v,j);const tt=r.convert(v.format,v.colorSpace),_t=r.convert(v.type);let xt=T(v.internalFormat,tt,_t,v.colorSpace,v.isVideoTexture);dt(Y,v);let ut;const zt=v.mipmaps,P=v.isVideoTexture!==!0,st=gt.__version===void 0||K===!0,et=q.dataReady,pt=w(v,j);if(v.isDepthTexture)xt=b(v.format===ui,v.type),st&&(P?e.texStorage2D(i.TEXTURE_2D,1,xt,j.width,j.height):e.texImage2D(i.TEXTURE_2D,0,xt,j.width,j.height,0,tt,_t,null));else if(v.isDataTexture)if(zt.length>0){P&&st&&e.texStorage2D(i.TEXTURE_2D,pt,xt,zt[0].width,zt[0].height);for(let J=0,X=zt.length;J<X;J++)ut=zt[J],P?et&&e.texSubImage2D(i.TEXTURE_2D,J,0,0,ut.width,ut.height,tt,_t,ut.data):e.texImage2D(i.TEXTURE_2D,J,xt,ut.width,ut.height,0,tt,_t,ut.data);v.generateMipmaps=!1}else P?(st&&e.texStorage2D(i.TEXTURE_2D,pt,xt,j.width,j.height),et&&le(v,j,tt,_t)):e.texImage2D(i.TEXTURE_2D,0,xt,j.width,j.height,0,tt,_t,j.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){P&&st&&e.texStorage3D(i.TEXTURE_2D_ARRAY,pt,xt,zt[0].width,zt[0].height,j.depth);for(let J=0,X=zt.length;J<X;J++)if(ut=zt[J],v.format!==rn)if(tt!==null)if(P){if(et)if(v.layerUpdates.size>0){const vt=Gl(ut.width,ut.height,v.format,v.type);for(const Lt of v.layerUpdates){const ae=ut.data.subarray(Lt*vt/ut.data.BYTES_PER_ELEMENT,(Lt+1)*vt/ut.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,Lt,ut.width,ut.height,1,tt,ae)}v.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,ut.width,ut.height,j.depth,tt,ut.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,J,xt,ut.width,ut.height,j.depth,0,ut.data,0,0);else Dt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else P?et&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,ut.width,ut.height,j.depth,tt,_t,ut.data):e.texImage3D(i.TEXTURE_2D_ARRAY,J,xt,ut.width,ut.height,j.depth,0,tt,_t,ut.data)}else{P&&st&&e.texStorage2D(i.TEXTURE_2D,pt,xt,zt[0].width,zt[0].height);for(let J=0,X=zt.length;J<X;J++)ut=zt[J],v.format!==rn?tt!==null?P?et&&e.compressedTexSubImage2D(i.TEXTURE_2D,J,0,0,ut.width,ut.height,tt,ut.data):e.compressedTexImage2D(i.TEXTURE_2D,J,xt,ut.width,ut.height,0,ut.data):Dt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):P?et&&e.texSubImage2D(i.TEXTURE_2D,J,0,0,ut.width,ut.height,tt,_t,ut.data):e.texImage2D(i.TEXTURE_2D,J,xt,ut.width,ut.height,0,tt,_t,ut.data)}else if(v.isDataArrayTexture)if(P){if(st&&e.texStorage3D(i.TEXTURE_2D_ARRAY,pt,xt,j.width,j.height,j.depth),et)if(v.layerUpdates.size>0){const J=Gl(j.width,j.height,v.format,v.type);for(const X of v.layerUpdates){const vt=j.data.subarray(X*J/j.data.BYTES_PER_ELEMENT,(X+1)*J/j.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,X,j.width,j.height,1,tt,_t,vt)}v.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,j.width,j.height,j.depth,tt,_t,j.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,xt,j.width,j.height,j.depth,0,tt,_t,j.data);else if(v.isData3DTexture)P?(st&&e.texStorage3D(i.TEXTURE_3D,pt,xt,j.width,j.height,j.depth),et&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,j.width,j.height,j.depth,tt,_t,j.data)):e.texImage3D(i.TEXTURE_3D,0,xt,j.width,j.height,j.depth,0,tt,_t,j.data);else if(v.isFramebufferTexture){if(st)if(P)e.texStorage2D(i.TEXTURE_2D,pt,xt,j.width,j.height);else{let J=j.width,X=j.height;for(let vt=0;vt<pt;vt++)e.texImage2D(i.TEXTURE_2D,vt,xt,J,X,0,tt,_t,null),J>>=1,X>>=1}}else if(zt.length>0){if(P&&st){const J=St(zt[0]);e.texStorage2D(i.TEXTURE_2D,pt,xt,J.width,J.height)}for(let J=0,X=zt.length;J<X;J++)ut=zt[J],P?et&&e.texSubImage2D(i.TEXTURE_2D,J,0,0,tt,_t,ut):e.texImage2D(i.TEXTURE_2D,J,xt,tt,_t,ut);v.generateMipmaps=!1}else if(P){if(st){const J=St(j);e.texStorage2D(i.TEXTURE_2D,pt,xt,J.width,J.height)}et&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,tt,_t,j)}else e.texImage2D(i.TEXTURE_2D,0,xt,tt,_t,j);m(v)&&f(Y),gt.__version=q.version,v.onUpdate&&v.onUpdate(v)}A.__version=v.version}function nt(A,v,L){if(v.image.length!==6)return;const Y=Ot(A,v),K=v.source;e.bindTexture(i.TEXTURE_CUBE_MAP,A.__webglTexture,i.TEXTURE0+L);const q=n.get(K);if(K.version!==q.__version||Y===!0){e.activeTexture(i.TEXTURE0+L);const gt=qt.getPrimaries(qt.workingColorSpace),it=v.colorSpace===Xn?null:qt.getPrimaries(v.colorSpace),Tt=v.colorSpace===Xn||gt===it?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Tt);const Rt=v.isCompressedTexture||v.image[0].isCompressedTexture,j=v.image[0]&&v.image[0].isDataTexture,tt=[];for(let X=0;X<6;X++)!Rt&&!j?tt[X]=x(v.image[X],!0,s.maxCubemapSize):tt[X]=j?v.image[X].image:v.image[X],tt[X]=re(v,tt[X]);const _t=tt[0],xt=r.convert(v.format,v.colorSpace),ut=r.convert(v.type),zt=T(v.internalFormat,xt,ut,v.colorSpace),P=v.isVideoTexture!==!0,st=q.__version===void 0||Y===!0,et=K.dataReady;let pt=w(v,_t);dt(i.TEXTURE_CUBE_MAP,v);let J;if(Rt){P&&st&&e.texStorage2D(i.TEXTURE_CUBE_MAP,pt,zt,_t.width,_t.height);for(let X=0;X<6;X++){J=tt[X].mipmaps;for(let vt=0;vt<J.length;vt++){const Lt=J[vt];v.format!==rn?xt!==null?P?et&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,vt,0,0,Lt.width,Lt.height,xt,Lt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,vt,zt,Lt.width,Lt.height,0,Lt.data):Dt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):P?et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,vt,0,0,Lt.width,Lt.height,xt,ut,Lt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,vt,zt,Lt.width,Lt.height,0,xt,ut,Lt.data)}}}else{if(J=v.mipmaps,P&&st){J.length>0&&pt++;const X=St(tt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,pt,zt,X.width,X.height)}for(let X=0;X<6;X++)if(j){P?et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,0,0,tt[X].width,tt[X].height,xt,ut,tt[X].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,zt,tt[X].width,tt[X].height,0,xt,ut,tt[X].data);for(let vt=0;vt<J.length;vt++){const ae=J[vt].image[X].image;P?et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,vt+1,0,0,ae.width,ae.height,xt,ut,ae.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,vt+1,zt,ae.width,ae.height,0,xt,ut,ae.data)}}else{P?et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,0,0,xt,ut,tt[X]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,zt,xt,ut,tt[X]);for(let vt=0;vt<J.length;vt++){const Lt=J[vt];P?et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,vt+1,0,0,xt,ut,Lt.image[X]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,vt+1,zt,xt,ut,Lt.image[X])}}}m(v)&&f(i.TEXTURE_CUBE_MAP),q.__version=K.version,v.onUpdate&&v.onUpdate(v)}A.__version=v.version}function rt(A,v,L,Y,K,q){const gt=r.convert(L.format,L.colorSpace),it=r.convert(L.type),Tt=T(L.internalFormat,gt,it,L.colorSpace),Rt=n.get(v),j=n.get(L);if(j.__renderTarget=v,!Rt.__hasExternalTextures){const tt=Math.max(1,v.width>>q),_t=Math.max(1,v.height>>q);K===i.TEXTURE_3D||K===i.TEXTURE_2D_ARRAY?e.texImage3D(K,q,Tt,tt,_t,v.depth,0,gt,it,null):e.texImage2D(K,q,Tt,tt,_t,0,gt,it,null)}e.bindFramebuffer(i.FRAMEBUFFER,A),Me(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Y,K,j.__webglTexture,0,I(v)):(K===i.TEXTURE_2D||K>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Y,K,j.__webglTexture,q),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Nt(A,v,L){if(i.bindRenderbuffer(i.RENDERBUFFER,A),v.depthBuffer){const Y=v.depthTexture,K=Y&&Y.isDepthTexture?Y.type:null,q=b(v.stencilBuffer,K),gt=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Me(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,I(v),q,v.width,v.height):L?i.renderbufferStorageMultisample(i.RENDERBUFFER,I(v),q,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,q,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,gt,i.RENDERBUFFER,A)}else{const Y=v.textures;for(let K=0;K<Y.length;K++){const q=Y[K],gt=r.convert(q.format,q.colorSpace),it=r.convert(q.type),Tt=T(q.internalFormat,gt,it,q.colorSpace);Me(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,I(v),Tt,v.width,v.height):L?i.renderbufferStorageMultisample(i.RENDERBUFFER,I(v),Tt,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,Tt,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function wt(A,v,L){const Y=v.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,A),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const K=n.get(v.depthTexture);if(K.__renderTarget=v,(!K.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),Y){if(K.__webglInit===void 0&&(K.__webglInit=!0,v.depthTexture.addEventListener("dispose",E)),K.__webglTexture===void 0){K.__webglTexture=i.createTexture(),e.bindTexture(i.TEXTURE_CUBE_MAP,K.__webglTexture),dt(i.TEXTURE_CUBE_MAP,v.depthTexture);const Rt=r.convert(v.depthTexture.format),j=r.convert(v.depthTexture.type);let tt;v.depthTexture.format===Nn?tt=i.DEPTH_COMPONENT24:v.depthTexture.format===ui&&(tt=i.DEPTH24_STENCIL8);for(let _t=0;_t<6;_t++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,tt,v.width,v.height,0,Rt,j,null)}}else B(v.depthTexture,0);const q=K.__webglTexture,gt=I(v),it=Y?i.TEXTURE_CUBE_MAP_POSITIVE_X+L:i.TEXTURE_2D,Tt=v.depthTexture.format===ui?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(v.depthTexture.format===Nn)Me(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Tt,it,q,0,gt):i.framebufferTexture2D(i.FRAMEBUFFER,Tt,it,q,0);else if(v.depthTexture.format===ui)Me(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Tt,it,q,0,gt):i.framebufferTexture2D(i.FRAMEBUFFER,Tt,it,q,0);else throw new Error("Unknown depthTexture format")}function Pt(A){const v=n.get(A),L=A.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==A.depthTexture){const Y=A.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),Y){const K=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,Y.removeEventListener("dispose",K)};Y.addEventListener("dispose",K),v.__depthDisposeCallback=K}v.__boundDepthTexture=Y}if(A.depthTexture&&!v.__autoAllocateDepthBuffer)if(L)for(let Y=0;Y<6;Y++)wt(v.__webglFramebuffer[Y],A,Y);else{const Y=A.texture.mipmaps;Y&&Y.length>0?wt(v.__webglFramebuffer[0],A,0):wt(v.__webglFramebuffer,A,0)}else if(L){v.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[Y]),v.__webglDepthbuffer[Y]===void 0)v.__webglDepthbuffer[Y]=i.createRenderbuffer(),Nt(v.__webglDepthbuffer[Y],A,!1);else{const K=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,q=v.__webglDepthbuffer[Y];i.bindRenderbuffer(i.RENDERBUFFER,q),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,q)}}else{const Y=A.texture.mipmaps;if(Y&&Y.length>0?e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),Nt(v.__webglDepthbuffer,A,!1);else{const K=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,q=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,q),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,q)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Te(A,v,L){const Y=n.get(A);v!==void 0&&rt(Y.__webglFramebuffer,A,A.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),L!==void 0&&Pt(A)}function Wt(A){const v=A.texture,L=n.get(A),Y=n.get(v);A.addEventListener("dispose",C);const K=A.textures,q=A.isWebGLCubeRenderTarget===!0,gt=K.length>1;if(gt||(Y.__webglTexture===void 0&&(Y.__webglTexture=i.createTexture()),Y.__version=v.version,a.memory.textures++),q){L.__webglFramebuffer=[];for(let it=0;it<6;it++)if(v.mipmaps&&v.mipmaps.length>0){L.__webglFramebuffer[it]=[];for(let Tt=0;Tt<v.mipmaps.length;Tt++)L.__webglFramebuffer[it][Tt]=i.createFramebuffer()}else L.__webglFramebuffer[it]=i.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){L.__webglFramebuffer=[];for(let it=0;it<v.mipmaps.length;it++)L.__webglFramebuffer[it]=i.createFramebuffer()}else L.__webglFramebuffer=i.createFramebuffer();if(gt)for(let it=0,Tt=K.length;it<Tt;it++){const Rt=n.get(K[it]);Rt.__webglTexture===void 0&&(Rt.__webglTexture=i.createTexture(),a.memory.textures++)}if(A.samples>0&&Me(A)===!1){L.__webglMultisampledFramebuffer=i.createFramebuffer(),L.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,L.__webglMultisampledFramebuffer);for(let it=0;it<K.length;it++){const Tt=K[it];L.__webglColorRenderbuffer[it]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,L.__webglColorRenderbuffer[it]);const Rt=r.convert(Tt.format,Tt.colorSpace),j=r.convert(Tt.type),tt=T(Tt.internalFormat,Rt,j,Tt.colorSpace,A.isXRRenderTarget===!0),_t=I(A);i.renderbufferStorageMultisample(i.RENDERBUFFER,_t,tt,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+it,i.RENDERBUFFER,L.__webglColorRenderbuffer[it])}i.bindRenderbuffer(i.RENDERBUFFER,null),A.depthBuffer&&(L.__webglDepthRenderbuffer=i.createRenderbuffer(),Nt(L.__webglDepthRenderbuffer,A,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(q){e.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture),dt(i.TEXTURE_CUBE_MAP,v);for(let it=0;it<6;it++)if(v.mipmaps&&v.mipmaps.length>0)for(let Tt=0;Tt<v.mipmaps.length;Tt++)rt(L.__webglFramebuffer[it][Tt],A,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+it,Tt);else rt(L.__webglFramebuffer[it],A,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+it,0);m(v)&&f(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(gt){for(let it=0,Tt=K.length;it<Tt;it++){const Rt=K[it],j=n.get(Rt);let tt=i.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(tt=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(tt,j.__webglTexture),dt(tt,Rt),rt(L.__webglFramebuffer,A,Rt,i.COLOR_ATTACHMENT0+it,tt,0),m(Rt)&&f(tt)}e.unbindTexture()}else{let it=i.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(it=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(it,Y.__webglTexture),dt(it,v),v.mipmaps&&v.mipmaps.length>0)for(let Tt=0;Tt<v.mipmaps.length;Tt++)rt(L.__webglFramebuffer[Tt],A,v,i.COLOR_ATTACHMENT0,it,Tt);else rt(L.__webglFramebuffer,A,v,i.COLOR_ATTACHMENT0,it,0);m(v)&&f(it),e.unbindTexture()}A.depthBuffer&&Pt(A)}function Jt(A){const v=A.textures;for(let L=0,Y=v.length;L<Y;L++){const K=v[L];if(m(K)){const q=y(A),gt=n.get(K).__webglTexture;e.bindTexture(q,gt),f(q),e.unbindTexture()}}}const ie=[],kt=[];function _e(A){if(A.samples>0){if(Me(A)===!1){const v=A.textures,L=A.width,Y=A.height;let K=i.COLOR_BUFFER_BIT;const q=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,gt=n.get(A),it=v.length>1;if(it)for(let Rt=0;Rt<v.length;Rt++)e.bindFramebuffer(i.FRAMEBUFFER,gt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Rt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,gt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Rt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,gt.__webglMultisampledFramebuffer);const Tt=A.texture.mipmaps;Tt&&Tt.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,gt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,gt.__webglFramebuffer);for(let Rt=0;Rt<v.length;Rt++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(K|=i.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(K|=i.STENCIL_BUFFER_BIT)),it){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,gt.__webglColorRenderbuffer[Rt]);const j=n.get(v[Rt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,j,0)}i.blitFramebuffer(0,0,L,Y,0,0,L,Y,K,i.NEAREST),c===!0&&(ie.length=0,kt.length=0,ie.push(i.COLOR_ATTACHMENT0+Rt),A.depthBuffer&&A.resolveDepthBuffer===!1&&(ie.push(q),kt.push(q),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,kt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ie))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),it)for(let Rt=0;Rt<v.length;Rt++){e.bindFramebuffer(i.FRAMEBUFFER,gt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Rt,i.RENDERBUFFER,gt.__webglColorRenderbuffer[Rt]);const j=n.get(v[Rt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,gt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Rt,i.TEXTURE_2D,j,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,gt.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&c){const v=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function I(A){return Math.min(s.maxSamples,A.samples)}function Me(A){const v=n.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function Zt(A){const v=a.render.frame;h.get(A)!==v&&(h.set(A,v),A.update())}function re(A,v){const L=A.colorSpace,Y=A.format,K=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||L!==$i&&L!==Xn&&(qt.getTransfer(L)===te?(Y!==rn||K!==$e)&&Dt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Xt("WebGLTextures: Unsupported texture color space:",L)),v}function St(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(l.width=A.naturalWidth||A.width,l.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(l.width=A.displayWidth,l.height=A.displayHeight):(l.width=A.width,l.height=A.height),l}this.allocateTextureUnit=F,this.resetTextureUnits=U,this.setTexture2D=B,this.setTexture2DArray=z,this.setTexture3D=G,this.setTextureCube=Q,this.rebindTextures=Te,this.setupRenderTarget=Wt,this.updateRenderTargetMipmap=Jt,this.updateMultisampleRenderTarget=_e,this.setupDepthRenderbuffer=Pt,this.setupFrameBufferTexture=rt,this.useMultisampledRTT=Me,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function D0(i,t){function e(n,s=Xn){let r;const a=qt.getTransfer(s);if(n===$e)return i.UNSIGNED_BYTE;if(n===Mo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===So)return i.UNSIGNED_SHORT_5_5_5_1;if(n===$c)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Kc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===qc)return i.BYTE;if(n===Yc)return i.SHORT;if(n===us)return i.UNSIGNED_SHORT;if(n===xo)return i.INT;if(n===_n)return i.UNSIGNED_INT;if(n===dn)return i.FLOAT;if(n===Un)return i.HALF_FLOAT;if(n===Zc)return i.ALPHA;if(n===jc)return i.RGB;if(n===rn)return i.RGBA;if(n===Nn)return i.DEPTH_COMPONENT;if(n===ui)return i.DEPTH_STENCIL;if(n===Jc)return i.RED;if(n===yo)return i.RED_INTEGER;if(n===Yi)return i.RG;if(n===bo)return i.RG_INTEGER;if(n===Eo)return i.RGBA_INTEGER;if(n===sr||n===rr||n===ar||n===or)if(a===te)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===sr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===rr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ar)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===or)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===sr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===rr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ar)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===or)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Pa||n===La||n===Da||n===Ua)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Pa)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===La)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Da)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ua)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Na||n===Fa||n===Oa||n===Ba||n===ka||n===za||n===Ga)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Na||n===Fa)return a===te?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Oa)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Ba)return r.COMPRESSED_R11_EAC;if(n===ka)return r.COMPRESSED_SIGNED_R11_EAC;if(n===za)return r.COMPRESSED_RG11_EAC;if(n===Ga)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Va||n===Ha||n===Wa||n===Xa||n===qa||n===Ya||n===$a||n===Ka||n===Za||n===ja||n===Ja||n===Qa||n===to||n===eo)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Va)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ha)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Wa)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Xa)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===qa)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ya)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===$a)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ka)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Za)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ja)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ja)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Qa)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===to)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===eo)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===no||n===io||n===so)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===no)return a===te?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===io)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===so)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===ro||n===ao||n===oo||n===lo)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===ro)return r.COMPRESSED_RED_RGTC1_EXT;if(n===ao)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===oo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===lo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ds?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const U0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,N0=`
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

}`;class F0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new oh(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new xn({vertexShader:U0,fragmentShader:N0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ct(new Yn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class O0 extends Zi{constructor(t,e){super();const n=this;let s=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,d=null,u=null,p=null,g=null;const x=typeof XRWebGLBinding<"u",m=new F0,f={},y=e.getContextAttributes();let T=null,b=null;const w=[],E=[],C=new Ht;let _=null;const S=new Je;S.viewport=new ge;const O=new Je;O.viewport=new ge;const R=[S,O],U=new Yd;let F=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let nt=w[$];return nt===void 0&&(nt=new Br,w[$]=nt),nt.getTargetRaySpace()},this.getControllerGrip=function($){let nt=w[$];return nt===void 0&&(nt=new Br,w[$]=nt),nt.getGripSpace()},this.getHand=function($){let nt=w[$];return nt===void 0&&(nt=new Br,w[$]=nt),nt.getHandSpace()};function B($){const nt=E.indexOf($.inputSource);if(nt===-1)return;const rt=w[nt];rt!==void 0&&(rt.update($.inputSource,$.frame,l||a),rt.dispatchEvent({type:$.type,data:$.inputSource}))}function z(){s.removeEventListener("select",B),s.removeEventListener("selectstart",B),s.removeEventListener("selectend",B),s.removeEventListener("squeeze",B),s.removeEventListener("squeezestart",B),s.removeEventListener("squeezeend",B),s.removeEventListener("end",z),s.removeEventListener("inputsourceschange",G);for(let $=0;$<w.length;$++){const nt=E[$];nt!==null&&(E[$]=null,w[$].disconnect(nt))}F=null,H=null,m.reset();for(const $ in f)delete f[$];t.setRenderTarget(T),p=null,u=null,d=null,s=null,b=null,le.stop(),n.isPresenting=!1,t.setPixelRatio(_),t.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){r=$,n.isPresenting===!0&&Dt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){o=$,n.isPresenting===!0&&Dt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function($){l=$},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return d===null&&x&&(d=new XRWebGLBinding(s,e)),d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function($){if(s=$,s!==null){if(T=t.getRenderTarget(),s.addEventListener("select",B),s.addEventListener("selectstart",B),s.addEventListener("selectend",B),s.addEventListener("squeeze",B),s.addEventListener("squeezestart",B),s.addEventListener("squeezeend",B),s.addEventListener("end",z),s.addEventListener("inputsourceschange",G),y.xrCompatible!==!0&&await e.makeXRCompatible(),_=t.getPixelRatio(),t.getSize(C),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let rt=null,Nt=null,wt=null;y.depth&&(wt=y.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,rt=y.stencil?ui:Nn,Nt=y.stencil?ds:_n);const Pt={colorFormat:e.RGBA8,depthFormat:wt,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(Pt),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),b=new mn(u.textureWidth,u.textureHeight,{format:rn,type:$e,depthTexture:new ms(u.textureWidth,u.textureHeight,Nt,void 0,void 0,void 0,void 0,void 0,void 0,rt),stencilBuffer:y.stencil,colorSpace:t.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const rt={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,e,rt),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),b=new mn(p.framebufferWidth,p.framebufferHeight,{format:rn,type:$e,colorSpace:t.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),le.setContext(s),le.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function G($){for(let nt=0;nt<$.removed.length;nt++){const rt=$.removed[nt],Nt=E.indexOf(rt);Nt>=0&&(E[Nt]=null,w[Nt].disconnect(rt))}for(let nt=0;nt<$.added.length;nt++){const rt=$.added[nt];let Nt=E.indexOf(rt);if(Nt===-1){for(let Pt=0;Pt<w.length;Pt++)if(Pt>=E.length){E.push(rt),Nt=Pt;break}else if(E[Pt]===null){E[Pt]=rt,Nt=Pt;break}if(Nt===-1)break}const wt=w[Nt];wt&&wt.connect(rt)}}const Q=new N,Z=new N;function ht($,nt,rt){Q.setFromMatrixPosition(nt.matrixWorld),Z.setFromMatrixPosition(rt.matrixWorld);const Nt=Q.distanceTo(Z),wt=nt.projectionMatrix.elements,Pt=rt.projectionMatrix.elements,Te=wt[14]/(wt[10]-1),Wt=wt[14]/(wt[10]+1),Jt=(wt[9]+1)/wt[5],ie=(wt[9]-1)/wt[5],kt=(wt[8]-1)/wt[0],_e=(Pt[8]+1)/Pt[0],I=Te*kt,Me=Te*_e,Zt=Nt/(-kt+_e),re=Zt*-kt;if(nt.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(re),$.translateZ(Zt),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),wt[10]===-1)$.projectionMatrix.copy(nt.projectionMatrix),$.projectionMatrixInverse.copy(nt.projectionMatrixInverse);else{const St=Te+Zt,A=Wt+Zt,v=I-re,L=Me+(Nt-re),Y=Jt*Wt/A*St,K=ie*Wt/A*St;$.projectionMatrix.makePerspective(v,L,Y,K,St,A),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function mt($,nt){nt===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(nt.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(s===null)return;let nt=$.near,rt=$.far;m.texture!==null&&(m.depthNear>0&&(nt=m.depthNear),m.depthFar>0&&(rt=m.depthFar)),U.near=O.near=S.near=nt,U.far=O.far=S.far=rt,(F!==U.near||H!==U.far)&&(s.updateRenderState({depthNear:U.near,depthFar:U.far}),F=U.near,H=U.far),U.layers.mask=$.layers.mask|6,S.layers.mask=U.layers.mask&-5,O.layers.mask=U.layers.mask&-3;const Nt=$.parent,wt=U.cameras;mt(U,Nt);for(let Pt=0;Pt<wt.length;Pt++)mt(wt[Pt],Nt);wt.length===2?ht(U,S,O):U.projectionMatrix.copy(S.projectionMatrix),dt($,U,Nt)};function dt($,nt,rt){rt===null?$.matrix.copy(nt.matrixWorld):($.matrix.copy(rt.matrixWorld),$.matrix.invert(),$.matrix.multiply(nt.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(nt.projectionMatrix),$.projectionMatrixInverse.copy(nt.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=co*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(u===null&&p===null))return c},this.setFoveation=function($){c=$,u!==null&&(u.fixedFoveation=$),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=$)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(U)},this.getCameraTexture=function($){return f[$]};let Ot=null;function ce($,nt){if(h=nt.getViewerPose(l||a),g=nt,h!==null){const rt=h.views;p!==null&&(t.setRenderTargetFramebuffer(b,p.framebuffer),t.setRenderTarget(b));let Nt=!1;rt.length!==U.cameras.length&&(U.cameras.length=0,Nt=!0);for(let Wt=0;Wt<rt.length;Wt++){const Jt=rt[Wt];let ie=null;if(p!==null)ie=p.getViewport(Jt);else{const _e=d.getViewSubImage(u,Jt);ie=_e.viewport,Wt===0&&(t.setRenderTargetTextures(b,_e.colorTexture,_e.depthStencilTexture),t.setRenderTarget(b))}let kt=R[Wt];kt===void 0&&(kt=new Je,kt.layers.enable(Wt),kt.viewport=new ge,R[Wt]=kt),kt.matrix.fromArray(Jt.transform.matrix),kt.matrix.decompose(kt.position,kt.quaternion,kt.scale),kt.projectionMatrix.fromArray(Jt.projectionMatrix),kt.projectionMatrixInverse.copy(kt.projectionMatrix).invert(),kt.viewport.set(ie.x,ie.y,ie.width,ie.height),Wt===0&&(U.matrix.copy(kt.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),Nt===!0&&U.cameras.push(kt)}const wt=s.enabledFeatures;if(wt&&wt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){d=n.getBinding();const Wt=d.getDepthInformation(rt[0]);Wt&&Wt.isValid&&Wt.texture&&m.init(Wt,s.renderState)}if(wt&&wt.includes("camera-access")&&x){t.state.unbindTexture(),d=n.getBinding();for(let Wt=0;Wt<rt.length;Wt++){const Jt=rt[Wt].camera;if(Jt){let ie=f[Jt];ie||(ie=new oh,f[Jt]=ie);const kt=d.getCameraImage(Jt);ie.sourceTexture=kt}}}}for(let rt=0;rt<w.length;rt++){const Nt=E[rt],wt=w[rt];Nt!==null&&wt!==void 0&&wt.update(Nt,nt,l||a)}Ot&&Ot($,nt),nt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:nt}),g=null}const le=new uh;le.setAnimationLoop(ce),this.setAnimationLoop=function($){Ot=$},this.dispose=function(){}}}const ii=new vn,B0=new pe;function k0(i,t){function e(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,lh(i)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,y,T,b){f.isMeshBasicMaterial?r(m,f):f.isMeshLambertMaterial?(r(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(r(m,f),d(m,f)):f.isMeshPhongMaterial?(r(m,f),h(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(r(m,f),u(m,f),f.isMeshPhysicalMaterial&&p(m,f,b)):f.isMeshMatcapMaterial?(r(m,f),g(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),x(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(a(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?c(m,f,y,T):f.isSpriteMaterial?l(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,e(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Ve&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,e(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Ve&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,e(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,e(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const y=t.get(f),T=y.envMap,b=y.envMapRotation;T&&(m.envMap.value=T,ii.copy(b),ii.x*=-1,ii.y*=-1,ii.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(ii.y*=-1,ii.z*=-1),m.envMapRotation.value.setFromMatrix4(B0.makeRotationFromEuler(ii)),m.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,m.aoMapTransform))}function a(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function c(m,f,y,T){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*y,m.scale.value=T*.5,f.map&&(m.map.value=f.map,e(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function l(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function d(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function u(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,y){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Ve&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function x(m,f){const y=t.get(f).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function z0(i,t,e,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(y,T){const b=T.program;n.uniformBlockBinding(y,b)}function l(y,T){let b=s[y.id];b===void 0&&(g(y),b=h(y),s[y.id]=b,y.addEventListener("dispose",m));const w=T.program;n.updateUBOMapping(y,w);const E=t.render.frame;r[y.id]!==E&&(u(y),r[y.id]=E)}function h(y){const T=d();y.__bindingPointIndex=T;const b=i.createBuffer(),w=y.__size,E=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,b),i.bufferData(i.UNIFORM_BUFFER,w,E),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,T,b),b}function d(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return Xt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(y){const T=s[y.id],b=y.uniforms,w=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,T);for(let E=0,C=b.length;E<C;E++){const _=Array.isArray(b[E])?b[E]:[b[E]];for(let S=0,O=_.length;S<O;S++){const R=_[S];if(p(R,E,S,w)===!0){const U=R.__offset,F=Array.isArray(R.value)?R.value:[R.value];let H=0;for(let B=0;B<F.length;B++){const z=F[B],G=x(z);typeof z=="number"||typeof z=="boolean"?(R.__data[0]=z,i.bufferSubData(i.UNIFORM_BUFFER,U+H,R.__data)):z.isMatrix3?(R.__data[0]=z.elements[0],R.__data[1]=z.elements[1],R.__data[2]=z.elements[2],R.__data[3]=0,R.__data[4]=z.elements[3],R.__data[5]=z.elements[4],R.__data[6]=z.elements[5],R.__data[7]=0,R.__data[8]=z.elements[6],R.__data[9]=z.elements[7],R.__data[10]=z.elements[8],R.__data[11]=0):(z.toArray(R.__data,H),H+=G.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,U,R.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(y,T,b,w){const E=y.value,C=T+"_"+b;if(w[C]===void 0)return typeof E=="number"||typeof E=="boolean"?w[C]=E:w[C]=E.clone(),!0;{const _=w[C];if(typeof E=="number"||typeof E=="boolean"){if(_!==E)return w[C]=E,!0}else if(_.equals(E)===!1)return _.copy(E),!0}return!1}function g(y){const T=y.uniforms;let b=0;const w=16;for(let C=0,_=T.length;C<_;C++){const S=Array.isArray(T[C])?T[C]:[T[C]];for(let O=0,R=S.length;O<R;O++){const U=S[O],F=Array.isArray(U.value)?U.value:[U.value];for(let H=0,B=F.length;H<B;H++){const z=F[H],G=x(z),Q=b%w,Z=Q%G.boundary,ht=Q+Z;b+=Z,ht!==0&&w-ht<G.storage&&(b+=w-ht),U.__data=new Float32Array(G.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=b,b+=G.storage}}}const E=b%w;return E>0&&(b+=w-E),y.__size=b,y.__cache={},this}function x(y){const T={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(T.boundary=4,T.storage=4):y.isVector2?(T.boundary=8,T.storage=8):y.isVector3||y.isColor?(T.boundary=16,T.storage=12):y.isVector4?(T.boundary=16,T.storage=16):y.isMatrix3?(T.boundary=48,T.storage=48):y.isMatrix4?(T.boundary=64,T.storage=64):y.isTexture?Dt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Dt("WebGLRenderer: Unsupported uniform value type.",y),T}function m(y){const T=y.target;T.removeEventListener("dispose",m);const b=a.indexOf(T.__bindingPointIndex);a.splice(b,1),i.deleteBuffer(s[T.id]),delete s[T.id],delete r[T.id]}function f(){for(const y in s)i.deleteBuffer(s[y]);a=[],s={},r={}}return{bind:c,update:l,dispose:f}}const G0=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let cn=null;function V0(){return cn===null&&(cn=new Ad(G0,16,16,Yi,Un),cn.name="DFG_LUT",cn.minFilter=Ne,cn.magFilter=Ne,cn.wrapS=In,cn.wrapT=In,cn.generateMipmaps=!1,cn.needsUpdate=!0),cn}class H0{constructor(t={}){const{canvas:e=id(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:p=$e}=t;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;const x=p,m=new Set([Eo,bo,yo]),f=new Set([$e,_n,us,ds,Mo,So]),y=new Uint32Array(4),T=new Int32Array(4);let b=null,w=null;const E=[],C=[];let _=null;this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=pn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const S=this;let O=!1;this._outputColorSpace=je;let R=0,U=0,F=null,H=-1,B=null;const z=new ge,G=new ge;let Q=null;const Z=new Kt(0);let ht=0,mt=e.width,dt=e.height,Ot=1,ce=null,le=null;const $=new ge(0,0,mt,dt),nt=new ge(0,0,mt,dt);let rt=!1;const Nt=new Io;let wt=!1,Pt=!1;const Te=new pe,Wt=new N,Jt=new ge,ie={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let kt=!1;function _e(){return F===null?Ot:1}let I=n;function Me(M,D){return e.getContext(M,D)}try{const M={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${_o}`),e.addEventListener("webglcontextlost",vt,!1),e.addEventListener("webglcontextrestored",Lt,!1),e.addEventListener("webglcontextcreationerror",ae,!1),I===null){const D="webgl2";if(I=Me(D,M),I===null)throw Me(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(M){throw Xt("WebGLRenderer: "+M.message),M}let Zt,re,St,A,v,L,Y,K,q,gt,it,Tt,Rt,j,tt,_t,xt,ut,zt,P,st,et,pt;function J(){Zt=new Hm(I),Zt.init(),st=new D0(I,Zt),re=new Nm(I,Zt,t,st),St=new P0(I,Zt),re.reversedDepthBuffer&&u&&St.buffers.depth.setReversed(!0),A=new qm(I),v=new _0,L=new L0(I,Zt,St,v,re,st,A),Y=new Vm(S),K=new Zd(I),et=new Dm(I,K),q=new Wm(I,K,A,et),gt=new $m(I,q,K,et,A),ut=new Ym(I,re,L),tt=new Fm(v),it=new g0(S,Y,Zt,re,et,tt),Tt=new k0(S,v),Rt=new x0,j=new T0(Zt),xt=new Lm(S,Y,St,gt,g,c),_t=new I0(S,gt,re),pt=new z0(I,A,re,St),zt=new Um(I,Zt,A),P=new Xm(I,Zt,A),A.programs=it.programs,S.capabilities=re,S.extensions=Zt,S.properties=v,S.renderLists=Rt,S.shadowMap=_t,S.state=St,S.info=A}J(),x!==$e&&(_=new Zm(x,e.width,e.height,s,r));const X=new O0(S,I);this.xr=X,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const M=Zt.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=Zt.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return Ot},this.setPixelRatio=function(M){M!==void 0&&(Ot=M,this.setSize(mt,dt,!1))},this.getSize=function(M){return M.set(mt,dt)},this.setSize=function(M,D,W=!0){if(X.isPresenting){Dt("WebGLRenderer: Can't change size while VR device is presenting.");return}mt=M,dt=D,e.width=Math.floor(M*Ot),e.height=Math.floor(D*Ot),W===!0&&(e.style.width=M+"px",e.style.height=D+"px"),_!==null&&_.setSize(e.width,e.height),this.setViewport(0,0,M,D)},this.getDrawingBufferSize=function(M){return M.set(mt*Ot,dt*Ot).floor()},this.setDrawingBufferSize=function(M,D,W){mt=M,dt=D,Ot=W,e.width=Math.floor(M*W),e.height=Math.floor(D*W),this.setViewport(0,0,M,D)},this.setEffects=function(M){if(x===$e){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let D=0;D<M.length;D++)if(M[D].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}_.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(z)},this.getViewport=function(M){return M.copy($)},this.setViewport=function(M,D,W,V){M.isVector4?$.set(M.x,M.y,M.z,M.w):$.set(M,D,W,V),St.viewport(z.copy($).multiplyScalar(Ot).round())},this.getScissor=function(M){return M.copy(nt)},this.setScissor=function(M,D,W,V){M.isVector4?nt.set(M.x,M.y,M.z,M.w):nt.set(M,D,W,V),St.scissor(G.copy(nt).multiplyScalar(Ot).round())},this.getScissorTest=function(){return rt},this.setScissorTest=function(M){St.setScissorTest(rt=M)},this.setOpaqueSort=function(M){ce=M},this.setTransparentSort=function(M){le=M},this.getClearColor=function(M){return M.copy(xt.getClearColor())},this.setClearColor=function(){xt.setClearColor(...arguments)},this.getClearAlpha=function(){return xt.getClearAlpha()},this.setClearAlpha=function(){xt.setClearAlpha(...arguments)},this.clear=function(M=!0,D=!0,W=!0){let V=0;if(M){let k=!1;if(F!==null){const ot=F.texture.format;k=m.has(ot)}if(k){const ot=F.texture.type,ft=f.has(ot),lt=xt.getClearColor(),Mt=xt.getClearAlpha(),bt=lt.r,Ut=lt.g,Gt=lt.b;ft?(y[0]=bt,y[1]=Ut,y[2]=Gt,y[3]=Mt,I.clearBufferuiv(I.COLOR,0,y)):(T[0]=bt,T[1]=Ut,T[2]=Gt,T[3]=Mt,I.clearBufferiv(I.COLOR,0,T))}else V|=I.COLOR_BUFFER_BIT}D&&(V|=I.DEPTH_BUFFER_BIT),W&&(V|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),V!==0&&I.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",vt,!1),e.removeEventListener("webglcontextrestored",Lt,!1),e.removeEventListener("webglcontextcreationerror",ae,!1),xt.dispose(),Rt.dispose(),j.dispose(),v.dispose(),Y.dispose(),gt.dispose(),et.dispose(),pt.dispose(),it.dispose(),X.dispose(),X.removeEventListener("sessionstart",Fo),X.removeEventListener("sessionend",Oo),Zn.stop()};function vt(M){M.preventDefault(),vl("WebGLRenderer: Context Lost."),O=!0}function Lt(){vl("WebGLRenderer: Context Restored."),O=!1;const M=A.autoReset,D=_t.enabled,W=_t.autoUpdate,V=_t.needsUpdate,k=_t.type;J(),A.autoReset=M,_t.enabled=D,_t.autoUpdate=W,_t.needsUpdate=V,_t.type=k}function ae(M){Xt("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function Qt(M){const D=M.target;D.removeEventListener("dispose",Qt),Mn(D)}function Mn(M){Sn(M),v.remove(M)}function Sn(M){const D=v.get(M).programs;D!==void 0&&(D.forEach(function(W){it.releaseProgram(W)}),M.isShaderMaterial&&it.releaseShaderCache(M))}this.renderBufferDirect=function(M,D,W,V,k,ot){D===null&&(D=ie);const ft=k.isMesh&&k.matrixWorld.determinant()<0,lt=Ih(M,D,W,V,k);St.setMaterial(V,ft);let Mt=W.index,bt=1;if(V.wireframe===!0){if(Mt=q.getWireframeAttribute(W),Mt===void 0)return;bt=2}const Ut=W.drawRange,Gt=W.attributes.position;let Et=Ut.start*bt,ee=(Ut.start+Ut.count)*bt;ot!==null&&(Et=Math.max(Et,ot.start*bt),ee=Math.min(ee,(ot.start+ot.count)*bt)),Mt!==null?(Et=Math.max(Et,0),ee=Math.min(ee,Mt.count)):Gt!=null&&(Et=Math.max(Et,0),ee=Math.min(ee,Gt.count));const ve=ee-Et;if(ve<0||ve===1/0)return;et.setup(k,V,lt,W,Mt);let me,ne=zt;if(Mt!==null&&(me=K.get(Mt),ne=P,ne.setIndex(me)),k.isMesh)V.wireframe===!0?(St.setLineWidth(V.wireframeLinewidth*_e()),ne.setMode(I.LINES)):ne.setMode(I.TRIANGLES);else if(k.isLine){let Pe=V.linewidth;Pe===void 0&&(Pe=1),St.setLineWidth(Pe*_e()),k.isLineSegments?ne.setMode(I.LINES):k.isLineLoop?ne.setMode(I.LINE_LOOP):ne.setMode(I.LINE_STRIP)}else k.isPoints?ne.setMode(I.POINTS):k.isSprite&&ne.setMode(I.TRIANGLES);if(k.isBatchedMesh)if(k._multiDrawInstances!==null)pr("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ne.renderMultiDrawInstances(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount,k._multiDrawInstances);else if(Zt.get("WEBGL_multi_draw"))ne.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{const Pe=k._multiDrawStarts,yt=k._multiDrawCounts,We=k._multiDrawCount,Yt=Mt?K.get(Mt).bytesPerElement:1,Qe=v.get(V).currentProgram.getUniforms();for(let on=0;on<We;on++)Qe.setValue(I,"_gl_DrawID",on),ne.render(Pe[on]/Yt,yt[on])}else if(k.isInstancedMesh)ne.renderInstances(Et,ve,k.count);else if(W.isInstancedBufferGeometry){const Pe=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,yt=Math.min(W.instanceCount,Pe);ne.renderInstances(Et,ve,yt)}else ne.render(Et,ve)};function No(M,D,W){M.transparent===!0&&M.side===ke&&M.forceSinglePass===!1?(M.side=Ve,M.needsUpdate=!0,ys(M,D,W),M.side=Kn,M.needsUpdate=!0,ys(M,D,W),M.side=ke):ys(M,D,W)}this.compile=function(M,D,W=null){W===null&&(W=M),w=j.get(W),w.init(D),C.push(w),W.traverseVisible(function(k){k.isLight&&k.layers.test(D.layers)&&(w.pushLight(k),k.castShadow&&w.pushShadow(k))}),M!==W&&M.traverseVisible(function(k){k.isLight&&k.layers.test(D.layers)&&(w.pushLight(k),k.castShadow&&w.pushShadow(k))}),w.setupLights();const V=new Set;return M.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;const ot=k.material;if(ot)if(Array.isArray(ot))for(let ft=0;ft<ot.length;ft++){const lt=ot[ft];No(lt,W,k),V.add(lt)}else No(ot,W,k),V.add(ot)}),w=C.pop(),V},this.compileAsync=function(M,D,W=null){const V=this.compile(M,D,W);return new Promise(k=>{function ot(){if(V.forEach(function(ft){v.get(ft).currentProgram.isReady()&&V.delete(ft)}),V.size===0){k(M);return}setTimeout(ot,10)}Zt.get("KHR_parallel_shader_compile")!==null?ot():setTimeout(ot,10)})};let Sr=null;function Rh(M){Sr&&Sr(M)}function Fo(){Zn.stop()}function Oo(){Zn.start()}const Zn=new uh;Zn.setAnimationLoop(Rh),typeof self<"u"&&Zn.setContext(self),this.setAnimationLoop=function(M){Sr=M,X.setAnimationLoop(M),M===null?Zn.stop():Zn.start()},X.addEventListener("sessionstart",Fo),X.addEventListener("sessionend",Oo),this.render=function(M,D){if(D!==void 0&&D.isCamera!==!0){Xt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(O===!0)return;const W=X.enabled===!0&&X.isPresenting===!0,V=_!==null&&(F===null||W)&&_.begin(S,F);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),X.enabled===!0&&X.isPresenting===!0&&(_===null||_.isCompositing()===!1)&&(X.cameraAutoUpdate===!0&&X.updateCamera(D),D=X.getCamera()),M.isScene===!0&&M.onBeforeRender(S,M,D,F),w=j.get(M,C.length),w.init(D),C.push(w),Te.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),Nt.setFromProjectionMatrix(Te,fn,D.reversedDepth),Pt=this.localClippingEnabled,wt=tt.init(this.clippingPlanes,Pt),b=Rt.get(M,E.length),b.init(),E.push(b),X.enabled===!0&&X.isPresenting===!0){const ft=S.xr.getDepthSensingMesh();ft!==null&&yr(ft,D,-1/0,S.sortObjects)}yr(M,D,0,S.sortObjects),b.finish(),S.sortObjects===!0&&b.sort(ce,le),kt=X.enabled===!1||X.isPresenting===!1||X.hasDepthSensing()===!1,kt&&xt.addToRenderList(b,M),this.info.render.frame++,wt===!0&&tt.beginShadows();const k=w.state.shadowsArray;if(_t.render(k,M,D),wt===!0&&tt.endShadows(),this.info.autoReset===!0&&this.info.reset(),(V&&_.hasRenderPass())===!1){const ft=b.opaque,lt=b.transmissive;if(w.setupLights(),D.isArrayCamera){const Mt=D.cameras;if(lt.length>0)for(let bt=0,Ut=Mt.length;bt<Ut;bt++){const Gt=Mt[bt];ko(ft,lt,M,Gt)}kt&&xt.render(M);for(let bt=0,Ut=Mt.length;bt<Ut;bt++){const Gt=Mt[bt];Bo(b,M,Gt,Gt.viewport)}}else lt.length>0&&ko(ft,lt,M,D),kt&&xt.render(M),Bo(b,M,D)}F!==null&&U===0&&(L.updateMultisampleRenderTarget(F),L.updateRenderTargetMipmap(F)),V&&_.end(S),M.isScene===!0&&M.onAfterRender(S,M,D),et.resetDefaultState(),H=-1,B=null,C.pop(),C.length>0?(w=C[C.length-1],wt===!0&&tt.setGlobalState(S.clippingPlanes,w.state.camera)):w=null,E.pop(),E.length>0?b=E[E.length-1]:b=null};function yr(M,D,W,V){if(M.visible===!1)return;if(M.layers.test(D.layers)){if(M.isGroup)W=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(D);else if(M.isLight)w.pushLight(M),M.castShadow&&w.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||Nt.intersectsSprite(M)){V&&Jt.setFromMatrixPosition(M.matrixWorld).applyMatrix4(Te);const ft=gt.update(M),lt=M.material;lt.visible&&b.push(M,ft,lt,W,Jt.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||Nt.intersectsObject(M))){const ft=gt.update(M),lt=M.material;if(V&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Jt.copy(M.boundingSphere.center)):(ft.boundingSphere===null&&ft.computeBoundingSphere(),Jt.copy(ft.boundingSphere.center)),Jt.applyMatrix4(M.matrixWorld).applyMatrix4(Te)),Array.isArray(lt)){const Mt=ft.groups;for(let bt=0,Ut=Mt.length;bt<Ut;bt++){const Gt=Mt[bt],Et=lt[Gt.materialIndex];Et&&Et.visible&&b.push(M,ft,Et,W,Jt.z,Gt)}}else lt.visible&&b.push(M,ft,lt,W,Jt.z,null)}}const ot=M.children;for(let ft=0,lt=ot.length;ft<lt;ft++)yr(ot[ft],D,W,V)}function Bo(M,D,W,V){const{opaque:k,transmissive:ot,transparent:ft}=M;w.setupLightsView(W),wt===!0&&tt.setGlobalState(S.clippingPlanes,W),V&&St.viewport(z.copy(V)),k.length>0&&Ss(k,D,W),ot.length>0&&Ss(ot,D,W),ft.length>0&&Ss(ft,D,W),St.buffers.depth.setTest(!0),St.buffers.depth.setMask(!0),St.buffers.color.setMask(!0),St.setPolygonOffset(!1)}function ko(M,D,W,V){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[V.id]===void 0){const Et=Zt.has("EXT_color_buffer_half_float")||Zt.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[V.id]=new mn(1,1,{generateMipmaps:!0,type:Et?Un:$e,minFilter:hi,samples:Math.max(4,re.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:qt.workingColorSpace})}const ot=w.state.transmissionRenderTarget[V.id],ft=V.viewport||z;ot.setSize(ft.z*S.transmissionResolutionScale,ft.w*S.transmissionResolutionScale);const lt=S.getRenderTarget(),Mt=S.getActiveCubeFace(),bt=S.getActiveMipmapLevel();S.setRenderTarget(ot),S.getClearColor(Z),ht=S.getClearAlpha(),ht<1&&S.setClearColor(16777215,.5),S.clear(),kt&&xt.render(W);const Ut=S.toneMapping;S.toneMapping=pn;const Gt=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),w.setupLightsView(V),wt===!0&&tt.setGlobalState(S.clippingPlanes,V),Ss(M,W,V),L.updateMultisampleRenderTarget(ot),L.updateRenderTargetMipmap(ot),Zt.has("WEBGL_multisampled_render_to_texture")===!1){let Et=!1;for(let ee=0,ve=D.length;ee<ve;ee++){const me=D[ee],{object:ne,geometry:Pe,material:yt,group:We}=me;if(yt.side===ke&&ne.layers.test(V.layers)){const Yt=yt.side;yt.side=Ve,yt.needsUpdate=!0,zo(ne,W,V,Pe,yt,We),yt.side=Yt,yt.needsUpdate=!0,Et=!0}}Et===!0&&(L.updateMultisampleRenderTarget(ot),L.updateRenderTargetMipmap(ot))}S.setRenderTarget(lt,Mt,bt),S.setClearColor(Z,ht),Gt!==void 0&&(V.viewport=Gt),S.toneMapping=Ut}function Ss(M,D,W){const V=D.isScene===!0?D.overrideMaterial:null;for(let k=0,ot=M.length;k<ot;k++){const ft=M[k],{object:lt,geometry:Mt,group:bt}=ft;let Ut=ft.material;Ut.allowOverride===!0&&V!==null&&(Ut=V),lt.layers.test(W.layers)&&zo(lt,D,W,Mt,Ut,bt)}}function zo(M,D,W,V,k,ot){M.onBeforeRender(S,D,W,V,k,ot),M.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),k.onBeforeRender(S,D,W,V,M,ot),k.transparent===!0&&k.side===ke&&k.forceSinglePass===!1?(k.side=Ve,k.needsUpdate=!0,S.renderBufferDirect(W,D,V,k,M,ot),k.side=Kn,k.needsUpdate=!0,S.renderBufferDirect(W,D,V,k,M,ot),k.side=ke):S.renderBufferDirect(W,D,V,k,M,ot),M.onAfterRender(S,D,W,V,k,ot)}function ys(M,D,W){D.isScene!==!0&&(D=ie);const V=v.get(M),k=w.state.lights,ot=w.state.shadowsArray,ft=k.state.version,lt=it.getParameters(M,k.state,ot,D,W),Mt=it.getProgramCacheKey(lt);let bt=V.programs;V.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?D.environment:null,V.fog=D.fog;const Ut=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;V.envMap=Y.get(M.envMap||V.environment,Ut),V.envMapRotation=V.environment!==null&&M.envMap===null?D.environmentRotation:M.envMapRotation,bt===void 0&&(M.addEventListener("dispose",Qt),bt=new Map,V.programs=bt);let Gt=bt.get(Mt);if(Gt!==void 0){if(V.currentProgram===Gt&&V.lightsStateVersion===ft)return Vo(M,lt),Gt}else lt.uniforms=it.getUniforms(M),M.onBeforeCompile(lt,S),Gt=it.acquireProgram(lt,Mt),bt.set(Mt,Gt),V.uniforms=lt.uniforms;const Et=V.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Et.clippingPlanes=tt.uniform),Vo(M,lt),V.needsLights=Lh(M),V.lightsStateVersion=ft,V.needsLights&&(Et.ambientLightColor.value=k.state.ambient,Et.lightProbe.value=k.state.probe,Et.directionalLights.value=k.state.directional,Et.directionalLightShadows.value=k.state.directionalShadow,Et.spotLights.value=k.state.spot,Et.spotLightShadows.value=k.state.spotShadow,Et.rectAreaLights.value=k.state.rectArea,Et.ltc_1.value=k.state.rectAreaLTC1,Et.ltc_2.value=k.state.rectAreaLTC2,Et.pointLights.value=k.state.point,Et.pointLightShadows.value=k.state.pointShadow,Et.hemisphereLights.value=k.state.hemi,Et.directionalShadowMatrix.value=k.state.directionalShadowMatrix,Et.spotLightMatrix.value=k.state.spotLightMatrix,Et.spotLightMap.value=k.state.spotLightMap,Et.pointShadowMatrix.value=k.state.pointShadowMatrix),V.currentProgram=Gt,V.uniformsList=null,Gt}function Go(M){if(M.uniformsList===null){const D=M.currentProgram.getUniforms();M.uniformsList=lr.seqWithValue(D.seq,M.uniforms)}return M.uniformsList}function Vo(M,D){const W=v.get(M);W.outputColorSpace=D.outputColorSpace,W.batching=D.batching,W.batchingColor=D.batchingColor,W.instancing=D.instancing,W.instancingColor=D.instancingColor,W.instancingMorph=D.instancingMorph,W.skinning=D.skinning,W.morphTargets=D.morphTargets,W.morphNormals=D.morphNormals,W.morphColors=D.morphColors,W.morphTargetsCount=D.morphTargetsCount,W.numClippingPlanes=D.numClippingPlanes,W.numIntersection=D.numClipIntersection,W.vertexAlphas=D.vertexAlphas,W.vertexTangents=D.vertexTangents,W.toneMapping=D.toneMapping}function Ih(M,D,W,V,k){D.isScene!==!0&&(D=ie),L.resetTextureUnits();const ot=D.fog,ft=V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial?D.environment:null,lt=F===null?S.outputColorSpace:F.isXRRenderTarget===!0?F.texture.colorSpace:$i,Mt=V.isMeshStandardMaterial||V.isMeshLambertMaterial&&!V.envMap||V.isMeshPhongMaterial&&!V.envMap,bt=Y.get(V.envMap||ft,Mt),Ut=V.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,Gt=!!W.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Et=!!W.morphAttributes.position,ee=!!W.morphAttributes.normal,ve=!!W.morphAttributes.color;let me=pn;V.toneMapped&&(F===null||F.isXRRenderTarget===!0)&&(me=S.toneMapping);const ne=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,Pe=ne!==void 0?ne.length:0,yt=v.get(V),We=w.state.lights;if(wt===!0&&(Pt===!0||M!==B)){const Ae=M===B&&V.id===H;tt.setState(V,M,Ae)}let Yt=!1;V.version===yt.__version?(yt.needsLights&&yt.lightsStateVersion!==We.state.version||yt.outputColorSpace!==lt||k.isBatchedMesh&&yt.batching===!1||!k.isBatchedMesh&&yt.batching===!0||k.isBatchedMesh&&yt.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&yt.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&yt.instancing===!1||!k.isInstancedMesh&&yt.instancing===!0||k.isSkinnedMesh&&yt.skinning===!1||!k.isSkinnedMesh&&yt.skinning===!0||k.isInstancedMesh&&yt.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&yt.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&yt.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&yt.instancingMorph===!1&&k.morphTexture!==null||yt.envMap!==bt||V.fog===!0&&yt.fog!==ot||yt.numClippingPlanes!==void 0&&(yt.numClippingPlanes!==tt.numPlanes||yt.numIntersection!==tt.numIntersection)||yt.vertexAlphas!==Ut||yt.vertexTangents!==Gt||yt.morphTargets!==Et||yt.morphNormals!==ee||yt.morphColors!==ve||yt.toneMapping!==me||yt.morphTargetsCount!==Pe)&&(Yt=!0):(Yt=!0,yt.__version=V.version);let Qe=yt.currentProgram;Yt===!0&&(Qe=ys(V,D,k));let on=!1,jn=!1,gi=!1;const se=Qe.getUniforms(),Ce=yt.uniforms;if(St.useProgram(Qe.program)&&(on=!0,jn=!0,gi=!0),V.id!==H&&(H=V.id,jn=!0),on||B!==M){St.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),se.setValue(I,"projectionMatrix",M.projectionMatrix),se.setValue(I,"viewMatrix",M.matrixWorldInverse);const On=se.map.cameraPosition;On!==void 0&&On.setValue(I,Wt.setFromMatrixPosition(M.matrixWorld)),re.logarithmicDepthBuffer&&se.setValue(I,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&se.setValue(I,"isOrthographic",M.isOrthographicCamera===!0),B!==M&&(B=M,jn=!0,gi=!0)}if(yt.needsLights&&(We.state.directionalShadowMap.length>0&&se.setValue(I,"directionalShadowMap",We.state.directionalShadowMap,L),We.state.spotShadowMap.length>0&&se.setValue(I,"spotShadowMap",We.state.spotShadowMap,L),We.state.pointShadowMap.length>0&&se.setValue(I,"pointShadowMap",We.state.pointShadowMap,L)),k.isSkinnedMesh){se.setOptional(I,k,"bindMatrix"),se.setOptional(I,k,"bindMatrixInverse");const Ae=k.skeleton;Ae&&(Ae.boneTexture===null&&Ae.computeBoneTexture(),se.setValue(I,"boneTexture",Ae.boneTexture,L))}k.isBatchedMesh&&(se.setOptional(I,k,"batchingTexture"),se.setValue(I,"batchingTexture",k._matricesTexture,L),se.setOptional(I,k,"batchingIdTexture"),se.setValue(I,"batchingIdTexture",k._indirectTexture,L),se.setOptional(I,k,"batchingColorTexture"),k._colorsTexture!==null&&se.setValue(I,"batchingColorTexture",k._colorsTexture,L));const Fn=W.morphAttributes;if((Fn.position!==void 0||Fn.normal!==void 0||Fn.color!==void 0)&&ut.update(k,W,Qe),(jn||yt.receiveShadow!==k.receiveShadow)&&(yt.receiveShadow=k.receiveShadow,se.setValue(I,"receiveShadow",k.receiveShadow)),(V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial)&&V.envMap===null&&D.environment!==null&&(Ce.envMapIntensity.value=D.environmentIntensity),Ce.dfgLUT!==void 0&&(Ce.dfgLUT.value=V0()),jn&&(se.setValue(I,"toneMappingExposure",S.toneMappingExposure),yt.needsLights&&Ph(Ce,gi),ot&&V.fog===!0&&Tt.refreshFogUniforms(Ce,ot),Tt.refreshMaterialUniforms(Ce,V,Ot,dt,w.state.transmissionRenderTarget[M.id]),lr.upload(I,Go(yt),Ce,L)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(lr.upload(I,Go(yt),Ce,L),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&se.setValue(I,"center",k.center),se.setValue(I,"modelViewMatrix",k.modelViewMatrix),se.setValue(I,"normalMatrix",k.normalMatrix),se.setValue(I,"modelMatrix",k.matrixWorld),V.isShaderMaterial||V.isRawShaderMaterial){const Ae=V.uniformsGroups;for(let On=0,_i=Ae.length;On<_i;On++){const Ho=Ae[On];pt.update(Ho,Qe),pt.bind(Ho,Qe)}}return Qe}function Ph(M,D){M.ambientLightColor.needsUpdate=D,M.lightProbe.needsUpdate=D,M.directionalLights.needsUpdate=D,M.directionalLightShadows.needsUpdate=D,M.pointLights.needsUpdate=D,M.pointLightShadows.needsUpdate=D,M.spotLights.needsUpdate=D,M.spotLightShadows.needsUpdate=D,M.rectAreaLights.needsUpdate=D,M.hemisphereLights.needsUpdate=D}function Lh(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return U},this.getRenderTarget=function(){return F},this.setRenderTargetTextures=function(M,D,W){const V=v.get(M);V.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,V.__autoAllocateDepthBuffer===!1&&(V.__useRenderToTexture=!1),v.get(M.texture).__webglTexture=D,v.get(M.depthTexture).__webglTexture=V.__autoAllocateDepthBuffer?void 0:W,V.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,D){const W=v.get(M);W.__webglFramebuffer=D,W.__useDefaultFramebuffer=D===void 0};const Dh=I.createFramebuffer();this.setRenderTarget=function(M,D=0,W=0){F=M,R=D,U=W;let V=null,k=!1,ot=!1;if(M){const lt=v.get(M);if(lt.__useDefaultFramebuffer!==void 0){St.bindFramebuffer(I.FRAMEBUFFER,lt.__webglFramebuffer),z.copy(M.viewport),G.copy(M.scissor),Q=M.scissorTest,St.viewport(z),St.scissor(G),St.setScissorTest(Q),H=-1;return}else if(lt.__webglFramebuffer===void 0)L.setupRenderTarget(M);else if(lt.__hasExternalTextures)L.rebindTextures(M,v.get(M.texture).__webglTexture,v.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const Ut=M.depthTexture;if(lt.__boundDepthTexture!==Ut){if(Ut!==null&&v.has(Ut)&&(M.width!==Ut.image.width||M.height!==Ut.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");L.setupDepthRenderbuffer(M)}}const Mt=M.texture;(Mt.isData3DTexture||Mt.isDataArrayTexture||Mt.isCompressedArrayTexture)&&(ot=!0);const bt=v.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(bt[D])?V=bt[D][W]:V=bt[D],k=!0):M.samples>0&&L.useMultisampledRTT(M)===!1?V=v.get(M).__webglMultisampledFramebuffer:Array.isArray(bt)?V=bt[W]:V=bt,z.copy(M.viewport),G.copy(M.scissor),Q=M.scissorTest}else z.copy($).multiplyScalar(Ot).floor(),G.copy(nt).multiplyScalar(Ot).floor(),Q=rt;if(W!==0&&(V=Dh),St.bindFramebuffer(I.FRAMEBUFFER,V)&&St.drawBuffers(M,V),St.viewport(z),St.scissor(G),St.setScissorTest(Q),k){const lt=v.get(M.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+D,lt.__webglTexture,W)}else if(ot){const lt=D;for(let Mt=0;Mt<M.textures.length;Mt++){const bt=v.get(M.textures[Mt]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+Mt,bt.__webglTexture,W,lt)}}else if(M!==null&&W!==0){const lt=v.get(M.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,lt.__webglTexture,W)}H=-1},this.readRenderTargetPixels=function(M,D,W,V,k,ot,ft,lt=0){if(!(M&&M.isWebGLRenderTarget)){Xt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Mt=v.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&ft!==void 0&&(Mt=Mt[ft]),Mt){St.bindFramebuffer(I.FRAMEBUFFER,Mt);try{const bt=M.textures[lt],Ut=bt.format,Gt=bt.type;if(M.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+lt),!re.textureFormatReadable(Ut)){Xt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!re.textureTypeReadable(Gt)){Xt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=M.width-V&&W>=0&&W<=M.height-k&&I.readPixels(D,W,V,k,st.convert(Ut),st.convert(Gt),ot)}finally{const bt=F!==null?v.get(F).__webglFramebuffer:null;St.bindFramebuffer(I.FRAMEBUFFER,bt)}}},this.readRenderTargetPixelsAsync=async function(M,D,W,V,k,ot,ft,lt=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Mt=v.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&ft!==void 0&&(Mt=Mt[ft]),Mt)if(D>=0&&D<=M.width-V&&W>=0&&W<=M.height-k){St.bindFramebuffer(I.FRAMEBUFFER,Mt);const bt=M.textures[lt],Ut=bt.format,Gt=bt.type;if(M.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+lt),!re.textureFormatReadable(Ut))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!re.textureTypeReadable(Gt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Et=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,Et),I.bufferData(I.PIXEL_PACK_BUFFER,ot.byteLength,I.STREAM_READ),I.readPixels(D,W,V,k,st.convert(Ut),st.convert(Gt),0);const ee=F!==null?v.get(F).__webglFramebuffer:null;St.bindFramebuffer(I.FRAMEBUFFER,ee);const ve=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await sd(I,ve,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,Et),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,ot),I.deleteBuffer(Et),I.deleteSync(ve),ot}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,D=null,W=0){const V=Math.pow(2,-W),k=Math.floor(M.image.width*V),ot=Math.floor(M.image.height*V),ft=D!==null?D.x:0,lt=D!==null?D.y:0;L.setTexture2D(M,0),I.copyTexSubImage2D(I.TEXTURE_2D,W,0,0,ft,lt,k,ot),St.unbindTexture()};const Uh=I.createFramebuffer(),Nh=I.createFramebuffer();this.copyTextureToTexture=function(M,D,W=null,V=null,k=0,ot=0){let ft,lt,Mt,bt,Ut,Gt,Et,ee,ve;const me=M.isCompressedTexture?M.mipmaps[ot]:M.image;if(W!==null)ft=W.max.x-W.min.x,lt=W.max.y-W.min.y,Mt=W.isBox3?W.max.z-W.min.z:1,bt=W.min.x,Ut=W.min.y,Gt=W.isBox3?W.min.z:0;else{const Ce=Math.pow(2,-k);ft=Math.floor(me.width*Ce),lt=Math.floor(me.height*Ce),M.isDataArrayTexture?Mt=me.depth:M.isData3DTexture?Mt=Math.floor(me.depth*Ce):Mt=1,bt=0,Ut=0,Gt=0}V!==null?(Et=V.x,ee=V.y,ve=V.z):(Et=0,ee=0,ve=0);const ne=st.convert(D.format),Pe=st.convert(D.type);let yt;D.isData3DTexture?(L.setTexture3D(D,0),yt=I.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(L.setTexture2DArray(D,0),yt=I.TEXTURE_2D_ARRAY):(L.setTexture2D(D,0),yt=I.TEXTURE_2D),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,D.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,D.unpackAlignment);const We=I.getParameter(I.UNPACK_ROW_LENGTH),Yt=I.getParameter(I.UNPACK_IMAGE_HEIGHT),Qe=I.getParameter(I.UNPACK_SKIP_PIXELS),on=I.getParameter(I.UNPACK_SKIP_ROWS),jn=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,me.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,me.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,bt),I.pixelStorei(I.UNPACK_SKIP_ROWS,Ut),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Gt);const gi=M.isDataArrayTexture||M.isData3DTexture,se=D.isDataArrayTexture||D.isData3DTexture;if(M.isDepthTexture){const Ce=v.get(M),Fn=v.get(D),Ae=v.get(Ce.__renderTarget),On=v.get(Fn.__renderTarget);St.bindFramebuffer(I.READ_FRAMEBUFFER,Ae.__webglFramebuffer),St.bindFramebuffer(I.DRAW_FRAMEBUFFER,On.__webglFramebuffer);for(let _i=0;_i<Mt;_i++)gi&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,v.get(M).__webglTexture,k,Gt+_i),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,v.get(D).__webglTexture,ot,ve+_i)),I.blitFramebuffer(bt,Ut,ft,lt,Et,ee,ft,lt,I.DEPTH_BUFFER_BIT,I.NEAREST);St.bindFramebuffer(I.READ_FRAMEBUFFER,null),St.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(k!==0||M.isRenderTargetTexture||v.has(M)){const Ce=v.get(M),Fn=v.get(D);St.bindFramebuffer(I.READ_FRAMEBUFFER,Uh),St.bindFramebuffer(I.DRAW_FRAMEBUFFER,Nh);for(let Ae=0;Ae<Mt;Ae++)gi?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Ce.__webglTexture,k,Gt+Ae):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Ce.__webglTexture,k),se?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Fn.__webglTexture,ot,ve+Ae):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Fn.__webglTexture,ot),k!==0?I.blitFramebuffer(bt,Ut,ft,lt,Et,ee,ft,lt,I.COLOR_BUFFER_BIT,I.NEAREST):se?I.copyTexSubImage3D(yt,ot,Et,ee,ve+Ae,bt,Ut,ft,lt):I.copyTexSubImage2D(yt,ot,Et,ee,bt,Ut,ft,lt);St.bindFramebuffer(I.READ_FRAMEBUFFER,null),St.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else se?M.isDataTexture||M.isData3DTexture?I.texSubImage3D(yt,ot,Et,ee,ve,ft,lt,Mt,ne,Pe,me.data):D.isCompressedArrayTexture?I.compressedTexSubImage3D(yt,ot,Et,ee,ve,ft,lt,Mt,ne,me.data):I.texSubImage3D(yt,ot,Et,ee,ve,ft,lt,Mt,ne,Pe,me):M.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,ot,Et,ee,ft,lt,ne,Pe,me.data):M.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,ot,Et,ee,me.width,me.height,ne,me.data):I.texSubImage2D(I.TEXTURE_2D,ot,Et,ee,ft,lt,ne,Pe,me);I.pixelStorei(I.UNPACK_ROW_LENGTH,We),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Yt),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Qe),I.pixelStorei(I.UNPACK_SKIP_ROWS,on),I.pixelStorei(I.UNPACK_SKIP_IMAGES,jn),ot===0&&D.generateMipmaps&&I.generateMipmap(yt),St.unbindTexture()},this.initRenderTarget=function(M){v.get(M).__webglFramebuffer===void 0&&L.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?L.setTextureCube(M,0):M.isData3DTexture?L.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?L.setTexture2DArray(M,0):L.setTexture2D(M,0),St.unbindTexture()},this.resetState=function(){R=0,U=0,F=null,St.reset(),et.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return fn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=qt._getDrawingBufferColorSpace(t),e.unpackColorSpace=qt._getUnpackColorSpace()}}class W0{constructor(t){this.ctaUrl=t,this.mraid=null,this.audioUnlocked=!1,this._userInteracted=!1,this.mraid={open:e=>{window.open(e,"_blank")},addEventListener:()=>{},removeEventListener:()=>{},isViewable:()=>!0},this.setupInteractionTracking(),window.addEventListener("resize",()=>this.onResize())}startLoop(){let t=performance.now();const e=n=>{const s=(n-t)/1e3;t=n,this.update(s),this.render(),requestAnimationFrame(e)};requestAnimationFrame(e)}openCta(){this.mraid?this.mraid.open(this.ctaUrl):window.open(this.ctaUrl,"_blank")}canPlayAudio(){if(!this._userInteracted)return!1;try{if(localStorage.getItem("soccer1x1:settings:sound")==="off")return!1}catch{}return!0}setupInteractionTracking(){const t=()=>{this._userInteracted=!0,this.audioUnlocked=!0,document.removeEventListener("touchstart",t),document.removeEventListener("click",t)};document.addEventListener("touchstart",t,{once:!0}),document.addEventListener("click",t,{once:!0})}onHidden(){}}const uc=""+new URL("sfx_kick-B2C89up0.mp3",import.meta.url).href,dc=""+new URL("sfx_body_hit-r8Zo7B1A.mp3",import.meta.url).href,X0=""+new URL("sfx_save-Ci7eAy2c.mp3",import.meta.url).href,q0=""+new URL("sfx_whistle-DJSLoq7V.mp3",import.meta.url).href,Y0=""+new URL("sfx_stadium_bg-CnSAa3zt.mp3",import.meta.url).href,ca=""+new URL("sfx_goool-BX0BYKkL.mp3",import.meta.url).href,$0=""+new URL("field_test_01-ISdRUoD4.jpg",import.meta.url).href,K0={"sfx_kick.mp3":uc,"sfx_body_hit.mp3":dc,"sfx_save.mp3":X0,"sfx_whistle.mp3":q0,"sfx_stadium_bg.mp3":Y0,"sfx_goool.mp3":ca,"sfx_hit.mp3":dc,"sfx_shoot.mp3":uc,"sfx_victory.mp3":ca,"sfx_cheer.mp3":ca},Z0="https://play.google.com/store/apps/details?id=com.hackathon36.group16.pokerblast&listing=blitz13",Oe={player:3837695,rival:16724016,fieldLine:16777215,ball:16777215,ballDark:1118481,goalPost:16777215},Ge=4.5,ue=5.5,oe=1.4,Ui=.8,j0=130,J0=.12,Q0=.85,t_=.05,ha=2,Ks=250,e_=2200,n_=180,fc=.04,ua=.18,pc=.05,Zs=.3,js=2.2,mc=.3,i_=1,Js=1.5,s_=.3,Qs=.75,da=3,gc=6,tr=6,_c=13.5,de=.22,vc=.06,xc=.55,r_=.42,Mc=.35,a_=5,fa=.45,Sc=1.1,yc=4.5,o_=.18,l_=2.4,c_=1.3,pa=5.4,ri=.65,bc="v48-store-ready",h_=3.8,Ni=.45*ri,u_=.5,d_=.8,os=60,Ec=100,Tc=1.6,Ac=.5,wc=.2,f_=3,p_=1.5,m_=6,ma=60,g_=2.8,__=1,v_=.42,x_=1.8;class M_ extends W0{constructor(){super(Z0),this.scene=new Md,this.state="MENU",this.stateTime=0,this.totalTime=0,this.matchTimeLeft=ma,this.balls=[],this.playerGoals=0,this.rivalGoals=0,this.charging=!1,this.chargeOriginX=0,this.chargeOriginY=0,this.chargeCurrentX=0,this.chargeCurrentY=0,this.slingshotPointerId=-1,this.lastMoveDirX=0,this.lastMoveDirZ=-1,this.wasMoving=!1,this.movingTime=0,this.touchPointerId=-1,this.touchStartTime=0,this.touchStartX=0,this.touchStartY=0,this.touchCurrentX=0,this.touchCurrentY=0,this.touchLastSampleTime=0,this.touchLastSampleX=0,this.touchLastSampleY=0,this.touchVelX=0,this.touchVelY=0,this.touchFirstMoveTime=0,this.blockTimer=0,this.blockCooldown=0,this.shieldHoldTimeout=0,this.shieldHoldActive=!1,this.dribbleTimer=0,this.dribbleDirX=0,this.dribbleDirZ=0,this.dribbleTailTimer=0,this.dribbleTailMax=0,this.stealOnlyTimer=0,this.joystickActive=!1,this.wasInSprintZone=!1,this.sprintDashTimer=0,this.joystickCenterScreenX=0,this.joystickCenterScreenY=0,this.smoothedMx=0,this.smoothedMz=0,this.joystickPointerId=-1,this.joystickOriginX=0,this.joystickOriginY=0,this.joystickCurrentX=0,this.joystickCurrentY=0,this.keys={},this.mouseScreenX=-1,this.mouseScreenY=-1,this.aimWorld=new N(0,0,-1),this.raycaster=new $d,this.mouseNDC=new Ht,this.baseCamPos=new N(0,16.5,3.41),this.baseCamLookAt=new N(0,0,.5),this.lobbyCamPos=new N(0,1.6,4.8),this.lobbyCamLookAt=new N(0,.6,0),this.lobbyGroup=null,this.lobbyDragging=!1,this.lobbyDragLastX=0,this.lobbyDragLastSampleTime=0,this.lobbyAngularVelocity=0,this.lobbyIdleSpinTimer=0,this.shakeAmount=0,this.timeScale=1,this.rivalShootTimer=999,this.rivalMoveTarget=new N(0,0,-5),this.rivalRetargetTimer=0,this.rivalDribbleTimer=0,this.rivalDribbleDirX=0,this.rivalDribbleDirZ=0,this.rivalDashCooldown=0,this.rivalHesitateTimer=0,this.rivalHesitateCooldown=0,this.playerHasFired=!1,this.timerEl=null,this.battleBarEl=null,this.titleEl=null,this.isMobile=!1,this.ready=!1,this.ended=!1,this.fieldLinesGroup=null,this.fieldMat=null,this.customFieldLoaded=!1,this.audioBuffers={},this.audioBuffersLoading=!1,this.audioBuffersReady=!1,this.bgSource=null,this.bgGain=null,this.init()}init(){if(!this.scene)return;const t=document.getElementById("game-canvas");this.isMobile="ontouchstart"in window||(navigator.maxTouchPoints||0)>0,this.renderer=new H0({canvas:t,antialias:!this.isMobile,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,this.isMobile?1.5:2)),this.renderer.setClearColor(1919514),this.camera=new Je(55,9/16,.5,60),this.camera.position.copy(this.baseCamPos),this.camera.lookAt(this.baseCamLookAt),this.scene.add(new Xd(16777215,1.05));const e=new Wd(16775400,.85);e.position.set(0,14,0),this.scene.add(e),this.buildField(),this.buildGoals(),this.buildSideFences(),this.buildLobbyCharacter(),this.player=this.makeCube(!0,new N(0,0,4)),this.rival=this.makeCube(!1,new N(0,0,-3)),this.bannerEl=document.getElementById("banner"),this.endcardEl=document.getElementById("endcard"),this.hintEl=document.getElementById("hint"),this.timerEl=document.getElementById("match-timer"),this.battleBarEl=document.getElementById("battle-bar"),this.titleEl=document.getElementById("title");const n=this.endcardEl.querySelector(".cta");this.ctaButton=n,n&&n.addEventListener("click",()=>this.openCta());const s=this.endcardEl.querySelector(".replay");s&&s.addEventListener("click",()=>this.resetGame());const r=document.getElementById("battle-bar");if(this.bbLeftFill=r.querySelector(".bb-fill.left"),this.bbRightFill=r.querySelector(".bb-fill.right"),this.bbLeftNum=r.querySelector(".left-num"),this.bbRightNum=r.querySelector(".right-num"),this.bbIcon=r.querySelector(".bb-icon"),this.updateScoreboard(),this.slingLine=document.getElementById("sling-line"),this.slingDot=document.getElementById("sling-dot"),this.joystickBase=document.getElementById("joystick-base"),this.joystickThumb=document.getElementById("joystick-thumb"),this.mobileHintsEl=document.getElementById("mobile-hints"),this.isMobile){const c=this.hintEl.querySelector(".hint-desktop"),l=this.hintEl.querySelector(".hint-mobile");c&&(c.style.display="none"),l&&(l.style.display="inline"),this.mobileHintsEl.classList.add("visible")}this.setupInput(t),this.setupKeyboard();const a=()=>{this.loadAudioBuffers(),document.removeEventListener("touchstart",a),document.removeEventListener("click",a),document.removeEventListener("pointerdown",a)};document.addEventListener("touchstart",a,{once:!0}),document.addEventListener("click",a,{once:!0}),document.addEventListener("pointerdown",a,{once:!0}),t.addEventListener("webglcontextlost",c=>{c.preventDefault(),this.showEnd("LOSS")}),document.title=`Soccer 1x1 ${bc}`;const o=document.getElementById("ver-tag");o&&(o.textContent=bc),this.ready=!0,this.onResize(),setTimeout(()=>this.onResize(),0),setTimeout(()=>this.onResize(),200),this.spawnMatchBall(),this.recomputeJoystickCenter(),this.updateJoystickViz(),this.setMatchHudVisible(!1),this.hintEl.classList.add("hidden"),this.mobileHintsEl&&this.mobileHintsEl.classList.add("hidden"),window.__game=this,this.startLoop()}onResize(){if(!this.ready)return;const t=9/16,e=window.innerWidth,n=window.innerHeight;let s,r;e/n>t?(r=n,s=n*t):(s=e,r=e/t),this.renderer.setSize(s,r,!0),this.camera.aspect=t,this.camera.fov=55,this.camera.updateProjectionMatrix(),this.recomputeJoystickCenter()}recomputeJoystickCenter(){const e=window.innerWidth,n=window.innerHeight;let s,r,a,o;e/n>.5625?(r=n,s=n*.5625,a=(e-s)/2,o=0):(s=e,r=e/.5625,a=0,o=(n-r)/2),this.joystickCenterScreenX=a+s*u_,this.joystickCenterScreenY=o+r*d_}buildField(){const t=this.makeFieldTexture(),e=new Ye({map:t});this.fieldMat=e;const n=new ct(new Yn(9.5,13),e);n.rotation.x=-Math.PI/2,this.scene.add(n);const s=new hn;this.scene.add(s),this.fieldLinesGroup=s;const r=new jt({color:Oe.fieldLine,transparent:!0,opacity:1}),a=new ct(new $t(Ge*2,.002,.08),r);a.position.y=.014,s.add(a);const o=new ct(new Bi(.95,1.02,48),new jt({color:Oe.fieldLine,side:ke,transparent:!0,opacity:1}));o.rotation.x=-Math.PI/2,o.position.y=.014,s.add(o);const c=new ct(new oi(.1,16),new jt({color:Oe.fieldLine,transparent:!0,opacity:1}));c.rotation.x=-Math.PI/2,c.position.y=.014,s.add(c);const l=Ge,h=ue,d=.08;for(const b of[-l,l]){const w=new ct(new $t(d,.002,h*2),r);w.position.set(b,.014,0),s.add(w)}for(const b of[-h,h]){const w=l-oe;{const E=new ct(new $t(w,.002,d),r);E.position.set(-l+w/2,.014,b),s.add(E);const C=new ct(new $t(w,.002,d),r);C.position.set(l-w/2,.014,b),s.add(C)}}const u=l_*2,p=c_,g=oe*2+.7,x=.55,m=p*.667,f=p*.555,y=.2;for(const b of[-h,h]){const w=Math.sign(b),E=new ct(new $t(u,.002,d),r);E.position.set(0,.014,b-w*p),s.add(E);for(const z of[-u/2,u/2]){const G=new ct(new $t(d,.002,p),r);G.position.set(z,.014,b-w*p/2),s.add(G)}const C=new ct(new $t(g,.002,d),r);C.position.set(0,.014,b-w*x),s.add(C);for(const z of[-g/2,g/2]){const G=new ct(new $t(d,.002,x),r);G.position.set(z,.014,b-w*x/2),s.add(G)}const _=b-w*m,S=new ct(new oi(.07,16),new jt({color:Oe.fieldLine,transparent:!0,opacity:1}));S.rotation.x=-Math.PI/2,S.position.set(0,.014,_),s.add(S);const O=p-m,R=Math.acos(Math.min(.99,O/f)),U=R*2,H=(w>0?-Math.PI/2:Math.PI/2)-R,B=new ct(new Bi(f-.03,f+.03,48,1,H,U),new jt({color:Oe.fieldLine,side:ke,transparent:!0,opacity:1}));B.rotation.x=-Math.PI/2,B.position.set(0,.014,_),s.add(B)}const T=[[-l,-h,0],[l,-h,Math.PI/2],[l,h,Math.PI],[-l,h,Math.PI*1.5]];for(const[b,w,E]of T){const C=new ct(new Bi(y-.03,y+.03,24,1,E,Math.PI/2),new jt({color:Oe.fieldLine,side:ke,transparent:!0,opacity:1}));C.rotation.x=-Math.PI/2,C.position.set(b,.014,w),s.add(C)}new Gd().load($0,b=>{this.fieldMat&&(this.fieldMat.map=b,this.fieldMat.needsUpdate=!0),this.fieldLinesGroup&&(this.fieldLinesGroup.visible=!1),this.customFieldLoaded=!0,console.log("[soccer] loaded custom field image")},void 0,()=>{console.log("[soccer] field image failed to load — using procedural texture")})}makeFieldTexture(){const e=document.createElement("canvas");e.width=e.height=512;const n=e.getContext("2d"),s=8;for(let o=0;o<s;o++)n.fillStyle=o%2===0?"#3f9536":"#4ba640",n.fillRect(0,o*512/s,512,Math.ceil(512/s));const r=["rgba(40,82,30,0.42)","rgba(36,75,28,0.38)","rgba(82,158,68,0.45)","rgba(120,200,90,0.32)","rgba(28,60,22,0.30)"];for(let o=0;o<4500;o++){n.fillStyle=r[Math.floor(Math.random()*r.length)];const c=Math.floor(Math.random()*512),l=Math.floor(Math.random()*512),h=Math.random()<.3?2:1;n.fillRect(c,l,1,h)}for(let o=0;o<s;o++){const c=o*512/s,l=512/s,h=n.createLinearGradient(0,c,0,c+l);h.addColorStop(0,"rgba(255,255,255,0.04)"),h.addColorStop(.5,"rgba(0,0,0,0)"),h.addColorStop(1,"rgba(0,0,0,0.05)"),n.fillStyle=h,n.fillRect(0,c,512,l)}return new Dl(e)}buildGoals(){this.makeGoal(-ue,-1,Oe.rival),this.makeGoal(ue,1,Oe.player)}makeGoal(t,e,n){const s=new Ye({color:Oe.goalPost}),r=.07,a=1,o=Ui;for(const g of[-oe,oe]){const x=new ct(new wn(r,r,a,12),s);x.position.set(g,a/2,t),this.scene.add(x);const m=new ct(new wn(r,r,a,12),s);m.position.set(g,a/2,t+e*o),this.scene.add(m)}const c=new ct(new wn(r,r,oe*2+r*2,12),s);c.rotation.z=Math.PI/2,c.position.set(0,a,t),this.scene.add(c);const l=new ct(new wn(r*.7,r*.7,oe*2,10),s);l.rotation.z=Math.PI/2,l.position.set(0,a,t+e*o),this.scene.add(l);for(const g of[-oe,oe]){const x=new ct(new wn(r*.7,r*.7,o,10),s);x.rotation.x=Math.PI/2,x.position.set(g,a,t+e*o/2),this.scene.add(x)}const h=this.makeNetTexture(),d=new jt({map:h,transparent:!0,opacity:.7,side:ke,depthWrite:!1}),u=new ct(new Yn(oe*2,a),d);u.position.set(0,a/2,t+e*o),e<0&&(u.rotation.y=Math.PI),this.scene.add(u);for(const g of[-oe,oe]){const x=new ct(new Yn(o,a),d);x.rotation.y=Math.PI/2,x.position.set(g,a/2,t+e*o/2),this.scene.add(x)}const p=new ct(new Yn(oe*2,o),d);p.rotation.x=Math.PI/2,p.position.set(0,a,t+e*o/2),this.scene.add(p)}makeNetTexture(){const e=document.createElement("canvas");e.width=e.height=64;const n=e.getContext("2d");n.fillStyle="rgba(0,0,0,0)",n.fillRect(0,0,64,64),n.strokeStyle="rgba(255,255,255,0.85)",n.lineWidth=1.5;const s=8,r=64/s;for(let o=0;o<=s;o++)n.beginPath(),n.moveTo(o*r,0),n.lineTo(o*r,64),n.stroke(),n.beginPath(),n.moveTo(0,o*r),n.lineTo(64,o*r),n.stroke();return new Dl(e)}buildSideFences(){const n=Ge+.09,s=ue,r=new jt({color:16722474}),a=new jt({color:2788095}),o=new jt({color:16732240,transparent:!0,opacity:.22,depthWrite:!1}),c=new jt({color:6995967,transparent:!0,opacity:.22,depthWrite:!1}),l=new $t(.18,.55,s),h=new $t(.18*1.7,.55*1.05,s);for(const g of[-n,n]){const x=new ct(l,r);x.position.set(g,.55/2,-s/2),this.scene.add(x);const m=new ct(h,o);m.position.copy(x.position),this.scene.add(m);const f=new ct(l,a);f.position.set(g,.55/2,s/2),this.scene.add(f);const y=new ct(h,c);y.position.copy(f.position),this.scene.add(y)}const d=Ge-oe,u=new $t(d,.55,.18),p=new $t(d*1.02,.55*1.05,.18*1.7);for(const g of[-2.95,Ge-d/2]){const x=new ct(u,r);x.position.set(g,.55/2,-ue-.18/2),this.scene.add(x);const m=new ct(p,o);m.position.copy(x.position),this.scene.add(m);const f=new ct(u,a);f.position.set(g,.55/2,ue+.18/2),this.scene.add(f);const y=new ct(p,c);y.position.copy(f.position),this.scene.add(y)}}buildLobbyCharacter(){const t=new hn,e=12854831,n=15979176,s=3809296,r=16777215,a=1118481,o=16777215,c=f=>new Ye({color:f}),l=(f,y,T,b,w,E,C)=>{const _=new ct(new $t(f,y,T),c(b));return _.position.set(w,E,C),t.add(_),_};for(const f of[-.18,.18])l(.22,.32,.22,e,f,.16,0),l(.22,.22,.22,n,f,-.1,0),l(.24,.1,.24,o,f,-.26,0),l(.26,.1,.36,a,f,-.36,.06);l(.65,.55,.34,e,0,.65,0),l(.5,.08,.36,r,0,.85,0),l(.06,.16,.02,r,.08,.6,.18);for(const f of[-.43,.43])l(.2,.4,.22,e,f,.62,0),l(.2,.2,.22,n,f,.32,0);l(.5,.46,.5,n,0,1.2,0),l(.56,.14,.56,s,0,1.5,0),l(.56,.18,.1,s,0,1.36,-.23),l(.1,.05,.02,a,-.12,1.2,.26),l(.1,.05,.02,a,.12,1.2,.26);const h=.18,d=.22,u=-.23,p=.46,g=new ct(new li(h,16,12),c(r));g.position.set(d,u,p),t.add(g);for(let f=0;f<5;f++){const y=f/5*Math.PI*2,T=new ct(new $t(.06,.06,.02),new jt({color:a}));T.position.set(d+Math.cos(y)*.16,u+Math.sin(y)*.1,p+h*(f%2?1:-1)*.5),T.rotation.y=y,t.add(T)}const x=new ct(new wn(.95,1,.15,32),c(1452106));x.position.set(0,-.49,0),t.add(x);const m=new ct(new Bi(.85,.95,32),new jt({color:6009087,side:ke,transparent:!0,opacity:.95}));m.rotation.x=-Math.PI/2,m.position.set(0,-.41,0),t.add(m),t.visible=!1,t.position.set(0,.45,0),this.scene.add(t),this.lobbyGroup=t}makeCube(t,e){const n=new hn,s=t?Oe.player:Oe.rival,r=t?1723801:9312280,a=15979176,o=2759184,c=t?1191258:4853262,l=1710618,h=-1,d=new ct(new wn(.55,.55,.005,18),new jt({color:0,transparent:!0,opacity:.42}));d.position.y=.003,n.add(d);for(const S of[-1,1]){const O=new ct(new $t(.22,.08,.3),new Ye({color:l}));O.position.set(S*.14,.04,h*.04),n.add(O)}for(const S of[-1,1]){const O=new ct(new $t(.2,.22,.22),new Ye({color:c}));O.position.set(S*.13,.18,0),n.add(O)}const u=new ct(new $t(.62,.45,.5),new Ye({color:s}));u.position.y=.52,n.add(u);const p=new ct(new $t(.5,.22,.01),new jt({color:16777215}));p.position.set(0,.52,h*(.25+.001)),n.add(p);const g=new ct(new $t(.05,.16,.012),new jt({color:r}));g.position.set(0,.52,h*(.255+.005)),n.add(g);for(const S of[-1,1]){const O=new ct(new $t(.13,.32,.18),new Ye({color:s}));O.position.set(S*(.31+.07),.55,0),n.add(O);const R=new ct(new $t(.14,.12,.18),new Ye({color:a}));R.position.set(S*(.31+.07),.32,0),n.add(R)}const x=new ct(new $t(.5,.42,.46),new Ye({color:a}));x.position.y=.95,n.add(x);const m=new ct(new $t(.52,.16,.5),new Ye({color:o}));m.position.set(0,1.18,h*-.02),n.add(m);const f=new ct(new $t(.5,.22,.1),new Ye({color:o}));f.position.set(0,1,h*-.2),n.add(f);for(const S of[-.1,.1]){const O=new ct(new $t(.09,.1,.02),new jt({color:16777215}));O.position.set(S,.97,h*(.23+.001)),n.add(O);const R=new ct(new $t(.05,.06,.025),new jt({color:1052688}));R.position.set(S,.97,h*(.23+.012)),n.add(R)}const y=new ct(new $t(.14,.025,.02),new jt({color:2759184}));y.position.set(0,.84,h*(.23+.005)),n.add(y);const T=new hn,b=new ct(new li(.18,16,12),new Ye({color:Oe.ball}));T.add(b);const w=new jt({color:Oe.ballDark});for(let S=0;S<5;S++){const O=new ct(new li(.058,8,6),w),R=Math.acos(1-2*(S+.5)/5),U=Math.PI*(1+Math.sqrt(5))*S;O.position.set(.15*Math.cos(U)*Math.sin(R),.15*Math.sin(U)*Math.sin(R),.15*Math.cos(R)),T.add(O)}const E=new ct(new oi(.18,12),new jt({color:0,transparent:!0,opacity:.35}));E.rotation.x=-Math.PI/2,E.position.y=-.17,T.add(E),T.position.set(0,.18,h*.6),T.visible=!1,n.add(T);const C=new ct(new ki(.65,.08,8,32),new jt({color:t?4240383:16732240,transparent:!0,opacity:.85}));C.rotation.x=-Math.PI/2,C.position.y=.02,C.visible=!1,n.add(C);const _=new ct(new ki(.78,.04,6,28),new jt({color:8452351,transparent:!0,opacity:.9}));return _.rotation.x=-Math.PI/2,_.position.y=.04,_.visible=!1,n.add(_),n.rotation.y=t?0:Math.PI,n.position.copy(e),n.scale.setScalar(ri),this.scene.add(n),{group:n,body:u,pos:e.clone(),isPlayer:t,yaw:t?0:Math.PI,indicatorBall:T,ballCooldown:0,bobTime:0,lastPos:e.clone(),possessRing:C,shieldReadyRing:_}}setupInput(t){const e=a=>a.pointerType==="touch"||a.pointerType==="pen",n=a=>{var c,l,h;const o=a.target;if(!((c=o==null?void 0:o.classList)!=null&&c.contains("pe"))){if(a.preventDefault(),this.state==="MENU"){this.lobbyDragging=!0,this.lobbyDragLastX=a.clientX,this.lobbyDragLastSampleTime=performance.now(),this.lobbyAngularVelocity=0,this.lobbyIdleSpinTimer=0,(l=t.setPointerCapture)==null||l.call(t,a.pointerId),this.audioCtx&&this.audioCtx.state==="suspended"&&this.audioCtx.resume().catch(()=>{});return}if(this.isMobile&&e(a)){if(this.touchPointerId!==-1)return;const d=performance.now();this.touchPointerId=a.pointerId,this.touchStartTime=d,this.touchStartX=a.clientX,this.touchStartY=a.clientY,this.touchCurrentX=a.clientX,this.touchCurrentY=a.clientY,this.touchLastSampleTime=d,this.touchLastSampleX=a.clientX,this.touchLastSampleY=a.clientY,this.touchVelX=0,this.touchVelY=0,this.touchFirstMoveTime=0,this.updateJoystickViz(),(h=t.setPointerCapture)==null||h.call(t,a.pointerId)}this.hintEl.classList.add("hidden"),this.mobileHintsEl.classList.add("hidden"),this.audioCtx&&this.audioCtx.state==="suspended"&&this.audioCtx.resume().catch(()=>{})}},s=a=>{if(this.mouseScreenX=a.clientX,this.mouseScreenY=a.clientY,this.state==="MENU"&&this.lobbyDragging&&this.lobbyGroup){const y=a.clientX-this.lobbyDragLastX;this.lobbyDragLastX=a.clientX;const b=y*.007;this.lobbyGroup.rotation.y+=b;const w=performance.now(),E=Math.max(.001,(w-this.lobbyDragLastSampleTime)/1e3),C=b/E,_=Math.min(1,E/.08);let S=this.lobbyAngularVelocity*(1-_)+C*_;const O=6;S=Math.max(-O,Math.min(O,S)),this.lobbyAngularVelocity=S,this.lobbyDragLastSampleTime=w,this.lobbyIdleSpinTimer=0;return}if(a.pointerId!==this.touchPointerId)return;const o=performance.now(),c=a.clientX-this.touchLastSampleX,l=a.clientY-this.touchLastSampleY,h=Math.max(.001,(o-this.touchLastSampleTime)/1e3),d=c/h,u=l/h,p=Math.min(1,h/.08);this.touchVelX=this.touchVelX*(1-p)+d*p,this.touchVelY=this.touchVelY*(1-p)+u*p,this.touchLastSampleTime=o,this.touchLastSampleX=a.clientX,this.touchLastSampleY=a.clientY,this.touchCurrentX=a.clientX,this.touchCurrentY=a.clientY,this.updateJoystickViz();const g=a.clientX-this.touchStartX,x=a.clientY-this.touchStartY,m=Math.sqrt(g*g+x*x);this.touchFirstMoveTime===0&&m>=ha&&(this.touchFirstMoveTime=o,this.shieldHoldTimeout!==0&&(clearTimeout(this.shieldHoldTimeout),this.shieldHoldTimeout=0),this.blockTimer>0&&this.shieldHoldActive&&this.endShield()),this.touchFirstMoveTime>0&&this.touchFirstMoveTime-this.touchStartTime>=n_&&m>=ha?(this.chargeOriginX=this.touchStartX,this.chargeOriginY=this.touchStartY,this.chargeCurrentX=this.touchCurrentX,this.chargeCurrentY=this.touchCurrentY,this.charging=!0,this.updateSlingViz()):this.charging&&(this.charging=!1,this.updateSlingViz())},r=a=>{var m;if(this.state==="MENU"&&this.lobbyDragging){this.lobbyDragging=!1,(m=t.releasePointerCapture)==null||m.call(t,a.pointerId);return}if(a.pointerId!==this.touchPointerId||(this.touchPointerId=-1,this.updateJoystickViz(),this.charging&&(this.charging=!1,this.updateSlingViz()),this.state!=="PLAY"&&this.state!=="INTRO"))return;const o=Math.sqrt(this.touchVelX**2+this.touchVelY**2),c=this.touchCurrentX-this.touchStartX,l=this.touchCurrentY-this.touchStartY;if(Math.sqrt(c*c+l*l)<ha&&o<Ks){this.player&&this.player.pos.z>=da&&this.blockCooldown<=0&&this.activateBlock();return}if(o<Ks)return;const d=this.touchVelX/o,u=this.touchVelY/o,p=Math.min(1,(o-Ks)/(e_-Ks)),g=p*p,x=mc+g*(i_-mc);this.firePlayerBall(d,u,x),x>.85&&(this.shakeAmount+=.18)};t.addEventListener("pointerdown",n),t.addEventListener("pointermove",s),t.addEventListener("pointerup",r),t.addEventListener("pointercancel",r)}startDribble(t,e,n=1){const s=Math.max(0,Math.min(1,n));this.dribbleTimer=fc+s*(ua-fc),this.dribbleTailMax=pc+s*(Zs-pc),this.dribbleTailTimer=0,this.dribbleDirX=t,this.dribbleDirZ=e,this.player.yaw=er(Math.atan2(t,e)+Math.PI)}startSteal(t,e){this.dribbleTimer=ua,this.dribbleTailMax=Zs,this.dribbleTailTimer=0,this.dribbleDirX=t,this.dribbleDirZ=e,this.stealOnlyTimer=ua,this.player.yaw=er(Math.atan2(t,e)+Math.PI)}tryBlock(){this.player&&(this.blockCooldown>0||this.player.pos.z<da||this.activateBlock())}ensureBlockMesh(){if(this.blockMesh)return;const t=new hn,e=.7/ri,n=.1/ri,s=new ct(new ki(e,n,10,48),new jt({color:4253951,transparent:!0,opacity:1}));s.rotation.x=-Math.PI/2,s.position.set(0,.7/ri,0),t.add(s);const r=new ct(new oi(e*.95,32),new jt({color:8452351,transparent:!0,opacity:.35,side:ke}));r.rotation.x=-Math.PI/2,r.position.set(0,.7/ri,0),t.add(r);const a=new ct(new ki(e*1.15,n*.5,8,48),new jt({color:16777215,transparent:!0,opacity:.6}));a.rotation.x=-Math.PI/2,a.position.set(0,.7/ri,0),t.add(a),t.visible=!1,this.blockMesh=t,this.player.group.add(t)}activateBlock(){this.ensureBlockMesh(),this.blockTimer=Js,this.blockCooldown=Js+s_,this.shieldHoldActive=!0,this.blockMesh.visible=!0,this.blockMesh.scale.setScalar(.5),this.shakeAmount+=.08,this.playSfx("sfx_save.mp3",.4)}endShield(){this.shieldHoldActive=!1,this.blockTimer=0,this.blockMesh&&(this.blockMesh.visible=!1)}updateBlock(t){if(this.blockCooldown>0&&(this.blockCooldown-=t),this.blockTimer<=0){this.blockMesh&&(this.blockMesh.visible=!1);return}if(this.blockTimer-=t,this.blockMesh){const e=1-this.blockTimer/Js;let n;e<.08?n=.5+e/.08*.55:n=1+Math.sin(e*Math.PI*4)*.02,this.blockMesh.scale.setScalar(n);const s=this.blockMesh.children.map(a=>a.material),r=this.blockTimer/Js;s[0].opacity=1*r,s[1].opacity=.35*r,s[2].opacity=.6*r}if(this.blockTimer>0){const e=this.player.pos.x,n=this.player.pos.z;for(const s of this.balls){if(s.possessor||s.ownerIsPlayer)continue;const r=s.mesh.position.x-e,a=s.mesh.position.z-n,o=r*r+a*a;if(o>Qs*Qs)continue;const c=Math.sqrt(o)||.001,l=r/c,h=a/c,d=s.vel.x*l+s.vel.z*h;d<0&&(s.vel.x-=2*d*l,s.vel.z-=2*d*h),s.vel.x=s.vel.x*.65+l*5,s.vel.z=s.vel.z*.65+h*5,s.mesh.position.x=e+l*(Qs+.15),s.mesh.position.z=n+h*(Qs+.15),s.kickImmunityTimer=.25,s.ownerIsPlayer=!0,this.shakeAmount=Math.max(this.shakeAmount,.25),this.playSfx("sfx_hit.mp3",.7);break}}}updateRings(t){const e=this.balls[0],n=e&&e.possessor===this.player,s=e&&e.possessor===this.rival;if(this.player.possessRing.visible=!!n,this.rival.possessRing.visible=!!s,n||s){const a=this.totalTime*3.5,o=1+Math.sin(a)*.08;(n?this.player:this.rival).possessRing.scale.setScalar(o)}let r=!1;if(this.blockCooldown<=0&&this.blockTimer<=0&&this.player.pos.z>=da&&(r=this.balls.some(a=>{if(a.possessor||a.ownerIsPlayer||a.vel.z<=.5||a.mesh.position.z>=this.player.pos.z)return!1;const o=a.mesh.position.x-this.player.pos.x,c=a.mesh.position.z-this.player.pos.z;return o*o+c*c<gc*gc})),this.player.shieldReadyRing.visible=r,r){const a=this.totalTime*8,o=1+Math.sin(a)*.18;this.player.shieldReadyRing.scale.setScalar(o);const c=this.player.shieldReadyRing.material;c.opacity=.5+Math.sin(a)*.4}}updateJoystickViz(){if(!this.joystickBase||!this.joystickThumb)return;if(this.touchPointerId===-1){this.joystickBase.classList.remove("active","sprint"),this.joystickThumb.classList.remove("active","sprint");return}this.joystickBase.style.left=`${this.touchStartX}px`,this.joystickBase.style.top=`${this.touchStartY}px`,this.joystickBase.classList.add("active");const t=this.touchCurrentX-this.touchStartX,e=this.touchCurrentY-this.touchStartY,n=Math.sqrt(t*t+e*e),s=n>os,r=Math.min(n,Ec);if(n<.001)this.joystickThumb.style.left=`${this.touchStartX}px`,this.joystickThumb.style.top=`${this.touchStartY}px`;else{const a=this.touchStartX+t/n*r,o=this.touchStartY+e/n*r;this.joystickThumb.style.left=`${a}px`,this.joystickThumb.style.top=`${o}px`}this.joystickThumb.classList.add("active"),this.joystickThumb.classList.toggle("sprint",s),this.joystickBase.classList.toggle("sprint",s)}setupKeyboard(){let t=!1;const e=(n,s)=>{const r=n.key.toLowerCase();["w","a","s","d","arrowup","arrowdown","arrowleft","arrowright"].includes(r)&&(this.keys[r]=s,n.preventDefault()),(r===" "||n.code==="Space")&&(n.preventDefault(),s&&!t?(t=!0,(this.lastMoveDirX!==0||this.lastMoveDirZ!==0)&&this.startDribble(this.lastMoveDirX,this.lastMoveDirZ)):s||(t=!1)),s&&this.audioCtx&&this.audioCtx.state==="suspended"&&this.audioCtx.resume().catch(()=>{})};window.addEventListener("keydown",n=>e(n,!0)),window.addEventListener("keyup",n=>e(n,!1))}updateSlingViz(){if(!this.charging){this.slingLine.classList.remove("active"),this.slingDot.classList.remove("active");return}const t=this.chargeCurrentX-this.chargeOriginX,e=this.chargeCurrentY-this.chargeOriginY,n=Math.sqrt(t*t+e*e),s=Math.min(n,j0),r=Math.atan2(e,t);this.slingLine.style.left=`${this.chargeOriginX}px`,this.slingLine.style.top=`${this.chargeOriginY-2}px`,this.slingLine.style.width=`${s}px`,this.slingLine.style.transform=`rotate(${r}rad)`,this.slingLine.classList.add("active");const a=this.chargeOriginX+Math.cos(r)*s,o=this.chargeOriginY+Math.sin(r)*s;this.slingDot.style.left=`${a}px`,this.slingDot.style.top=`${o}px`,this.slingDot.classList.add("active")}updateAim(){if(this.mouseScreenX<0)return;const e=this.renderer.domElement.getBoundingClientRect(),n=(this.mouseScreenX-e.left)/e.width*2-1,s=-((this.mouseScreenY-e.top)/e.height)*2+1;this.mouseNDC.set(n,s),this.raycaster.setFromCamera(this.mouseNDC,this.camera);const r=this.raycaster.ray;if(Math.abs(r.direction.y)>.001){const a=-r.origin.y/r.direction.y;a>0&&this.aimWorld.copy(r.origin).addScaledVector(r.direction,a)}}firePlayerBall(t,e,n){if(this.stealOnlyTimer>0)return;const s=this.balls.find(o=>o.possessor===this.player);if(!s)return;const r=new N(t,0,e).normalize(),a=tr+(_c-tr)*n;s.possessor=null,s.ownerIsPlayer=!0,s.vel.copy(r).multiplyScalar(a),s.kickImmunityTimer=Mc,s.mesh.position.x=this.player.pos.x+r.x*.7,s.mesh.position.z=this.player.pos.z+r.z*.7,s.mesh.position.y=de,this.shakeAmount=.12+n*.18,this.playSfx("sfx_shoot.mp3",.5),this.player.yaw=er(Math.atan2(r.x,r.z)+Math.PI),this.playerHasFired||(this.playerHasFired=!0,this.rivalShootTimer=x_)}fireRivalBall(){if(!this.player)return;const t=this.balls.find(l=>l.possessor===this.rival);if(!t)return;const e=(Math.random()-.5)*(oe*1.4),n=ue-.2,s=new N(e,0,n).sub(this.rival.pos).setY(0).normalize(),r=Math.atan2(s.x,s.z)+(Math.random()-.5)*v_,a=new N(Math.sin(r),0,Math.cos(r)),o=.55+Math.random()*.35,c=tr+(_c-tr)*o;t.possessor=null,t.ownerIsPlayer=!1,t.vel.copy(a).multiplyScalar(c),t.kickImmunityTimer=Mc,t.mesh.position.x=this.rival.pos.x+a.x*.7,t.mesh.position.z=this.rival.pos.z+a.z*.7,t.mesh.position.y=de,this.rival.yaw=Math.atan2(a.x,a.z)+Math.PI}spawnBall(t,e,n){const s=new hn,r=new ct(new li(de,16,12),new Ye({color:Oe.ball}));s.add(r);const a=new jt({color:Oe.ballDark});for(let c=0;c<5;c++){const l=new ct(new li(de*.32,8,6),a),h=Math.acos(1-2*(c+.5)/5),d=Math.PI*(1+Math.sqrt(5))*c;l.position.set(de*.85*Math.cos(d)*Math.sin(h),de*.85*Math.sin(d)*Math.sin(h),de*.85*Math.cos(h)),s.add(l)}const o=new ct(new oi(de*1,12),new jt({color:0,transparent:!0,opacity:.3}));o.rotation.x=-Math.PI/2,o.position.y=-de+.005,s.add(o),s.position.copy(t),this.scene.add(s),this.balls.push({mesh:s,vel:e.clone(),ownerIsPlayer:n,possessor:null,kickImmunityTimer:0,ttlAfterCross:0,parkedInNet:!1,stuckTime:0,trail:[],trailSpawnTimer:0})}countBalls(t){let e=0;for(const n of this.balls)n.ownerIsPlayer===t&&e++;return e}flashBallLimitHint(){this.state==="PLAY"&&(this.showBanner("MAX 3 — RECOVER IN YOUR AREA","danger"),this.shakeAmount=Math.max(this.shakeAmount,.15))}updateBalls(t){for(let e=this.balls.length-1;e>=0;e--){const n=this.balls[e];if(n.parkedInNet){n.ttlAfterCross+=t;continue}if(n.kickImmunityTimer>0&&(n.kickImmunityTimer-=t,n.kickImmunityTimer<0&&(n.kickImmunityTimer=0)),n.possessor){const o=n.possessor,c=-Math.sin(o.yaw),l=-Math.cos(o.yaw);let h=0;if(o===this.player){if(this.dribbleTimer>0)h=fa;else if(this.dribbleTailTimer>0){const E=this.dribbleTailMax>0?this.dribbleTailMax:Zs,C=this.dribbleTailTimer/E;h=fa*C}}else this.rivalDribbleTimer>0&&(h=fa*.7);const d=r_+h,u=o.pos.x+c*d,p=o.pos.z+l*d,g=1-Math.exp(-16*t),x=n.mesh.position.x,m=n.mesh.position.z;n.mesh.position.x+=(u-x)*g,n.mesh.position.z+=(p-m)*g,n.mesh.position.y=de;const f=n.mesh.position.x-x,y=n.mesh.position.z-m,T=Math.sqrt(f*f+y*y);if(T>.001){const E=new N(-y,0,f).normalize(),C=T/de;n.mesh.rotateOnWorldAxis(E,C)}n.vel.set(0,0,0),n.stuckTime=0;const b=n.mesh.position.z,w=n.mesh.position.x;if(Math.abs(b)>ue-de&&Math.abs(w)<=oe-de&&n.ttlAfterCross===0){const E=b>0?1:-1;n.ownerIsPlayer=n.possessor.isPlayer,n.possessor=null,n.ttlAfterCross=.001,n.parkedInNet=!0,n.mesh.position.x=Ue(w+(Math.random()-.5)*.4,-oe+.2,oe-.2),n.mesh.position.z=E*(ue+Ui*.55),n.vel.set(0,0,0),E===-1?this.scoreGoal(!0):this.scoreGoal(!1)}continue}{for(const o of[this.player,this.rival]){if(n.kickImmunityTimer>0&&o.isPlayer===n.ownerIsPlayer)continue;const c=o.pos.x-n.mesh.position.x,l=o.pos.z-n.mesh.position.z;if(!(c*c+l*l>=xc*xc)){n.possessor=o,n.ownerIsPlayer=o.isPlayer,n.vel.set(0,0,0),this.onBallPickedUp(n,o);break}}if(n.possessor)continue}n.mesh.position.x+=n.vel.x*t,n.mesh.position.z+=n.vel.z*t;const s=Math.sqrt(n.vel.x*n.vel.x+n.vel.z*n.vel.z),r=new N(-n.vel.z,0,n.vel.x).normalize();s>.1&&n.mesh.rotateOnWorldAxis(r,s/de*t),n.mesh.position.x>Ge-de&&n.vel.x>0?(n.mesh.position.x=Ge-de,n.vel.x*=-.88,this.shakeAmount=Math.max(this.shakeAmount,.08)):n.mesh.position.x<-Ge+de&&n.vel.x<0&&(n.mesh.position.x=-Ge+de,n.vel.x*=-.88,this.shakeAmount=Math.max(this.shakeAmount,.08));const a=n.mesh.position.z;if(Math.abs(a)>ue-de){const o=a>0?1:-1;if(Math.abs(n.mesh.position.x)<=oe-de){n.ttlAfterCross===0&&(n.ttlAfterCross=.001,n.parkedInNet=!0,n.mesh.position.x=Ue(n.mesh.position.x+(Math.random()-.5)*.4,-oe+.2,oe-.2),n.mesh.position.z=o*(ue+Ui*.55),n.vel.set(0,0,0),o===-1?this.scoreGoal(!0):this.scoreGoal(!1));continue}else o===1&&n.vel.z>0?(n.mesh.position.z=ue-de,n.vel.z*=-.88,this.shakeAmount=Math.max(this.shakeAmount,.08)):o===-1&&n.vel.z<0&&(n.mesh.position.z=-ue+de,n.vel.z*=-.88,this.shakeAmount=Math.max(this.shakeAmount,.08))}if(Math.abs(n.mesh.position.x)>Ge+1.5||Math.abs(n.mesh.position.z)>ue+2.5){this.removeBall(e);continue}if(n.vel.x*=1-vc*t,n.vel.z*=1-vc*t,Math.sqrt(n.vel.x*n.vel.x+n.vel.z*n.vel.z)<a_*.6&&n.kickImmunityTimer<=0){let c=null,l=1/0;for(const h of[this.player,this.rival]){const d=h.pos.x-n.mesh.position.x,u=h.pos.z-n.mesh.position.z,p=Math.sqrt(d*d+u*u);p<Sc&&p<l&&(c=h,l=p)}if(c&&l>.001){const h=(c.pos.x-n.mesh.position.x)/l,d=(c.pos.z-n.mesh.position.z)/l,u=1-l/Sc;n.vel.x+=h*yc*u*t,n.vel.z+=d*yc*u*t}}n.stuckTime=0}}onBallPickedUp(t,e){this.shakeAmount=Math.max(this.shakeAmount,o_),e.isPlayer&&this.playSfx("sfx_hit.mp3",.4)}updateIndicatorBall(t,e){}removeBall(t){var n,s;const e=this.balls[t];this.scene.remove(e.mesh);for(const r of e.trail)this.scene.remove(r.mesh),r.mesh.geometry.dispose(),(s=(n=r.mesh.material).dispose)==null||s.call(n);this.balls.splice(t,1)}clearBalls(){for(let t=this.balls.length-1;t>=0;t--)this.removeBall(t)}scoreGoal(t){t?(this.playerGoals++,this.flashFill(this.bbLeftFill),this.popScore(this.bbLeftNum),this.showBanner("GOAL!","goal")):(this.rivalGoals++,this.flashFill(this.bbRightFill),this.popScore(this.bbRightNum),this.showBanner("RIVAL GOAL","danger")),this.shakeAmount=.6,this.playSfx("sfx_goool.mp3",t?.85:.55),this.updateScoreboard(),this.transition("GOAL_PAUSE")}flashFill(t){t.classList.remove("flash"),t.offsetWidth,t.classList.add("flash"),setTimeout(()=>t.classList.remove("flash"),350)}popScore(t){t.classList.remove("pop"),t.offsetWidth,t.classList.add("pop")}updateScoreboard(){if(!this.bbLeftFill)return;const t=this.playerGoals+this.rivalGoals;let e;t===0?e=50:e=this.playerGoals/t*100,e=Math.max(6,Math.min(94,e)),this.bbLeftFill.style.width=`${e}%`,this.bbRightFill.style.width=`${100-e}%`,this.bbIcon.style.left=`${e}%`,this.bbLeftNum.textContent=String(this.playerGoals),this.bbRightNum.textContent=String(this.rivalGoals)}resetForKickoff(){this.clearBalls(),this.player.pos.set(0,0,4),this.player.group.position.copy(this.player.pos),this.player.yaw=0,this.player.ballCooldown=0,this.rival.pos.set(0,0,-3),this.rival.group.position.copy(this.rival.pos),this.rival.yaw=Math.PI,this.rival.ballCooldown=0,this.rivalShootTimer=1.6+Math.random()*1,this.rivalRetargetTimer=0,this.resetTransientInputState(),this.spawnMatchBall()}resetTransientInputState(){this.touchPointerId=-1,this.touchStartX=0,this.touchStartY=0,this.touchCurrentX=0,this.touchCurrentY=0,this.touchLastSampleX=0,this.touchLastSampleY=0,this.touchLastSampleTime=0,this.touchStartTime=0,this.touchFirstMoveTime=0,this.touchVelX=0,this.touchVelY=0,this.shieldHoldTimeout!==0&&(clearTimeout(this.shieldHoldTimeout),this.shieldHoldTimeout=0),(this.shieldHoldActive||this.blockTimer>0)&&this.endShield(),this.blockTimer=0,this.blockMesh&&(this.blockMesh.visible=!1),this.charging&&(this.charging=!1,this.updateSlingViz()),this.joystickActive&&(this.joystickActive=!1,this.joystickBase&&this.updateJoystickViz()),this.dribbleTimer=0,this.dribbleTailTimer=0,this.dribbleTailMax=0,this.dribbleDirX=0,this.dribbleDirZ=0,this.stealOnlyTimer=0,this.smoothedMx=0,this.smoothedMz=0,this.wasInSprintZone=!1,this.sprintDashTimer=0,this.rivalHesitateTimer=0,this.rivalHesitateCooldown=0,this.wasMoving=!1,this.movingTime=0}spawnMatchBall(){this.balls.length>0&&this.clearBalls();const t=new N(0,de,0),e=new N(0,0,0);this.spawnBall(t,e,!0)}resetGame(){this.playerGoals=0,this.rivalGoals=0,this.updateScoreboard(),this.matchTimeLeft=ma,this.updateTimerDisplay(),this.ended=!1,this.endcardEl.classList.remove("show","loss"),this.timeScale=1,this.shakeAmount=0,this.lastMoveDirX=0,this.lastMoveDirZ=-1,this.blockCooldown=0,this.playerHasFired=!1,this.resetTransientInputState(),this.resetForKickoff(),this.bannerEl.className="",this.state="INTRO",this.stateTime=0}update(t){if(!this.ready)return;const e=Math.min(t,.05)*this.timeScale;if(this.totalTime+=e,this.stateTime+=e,this.state==="INTRO"&&this.stateTime>.1&&this.transition("PLAY"),this.state==="GOAL_PAUSE"&&this.stateTime>1.2&&(this.resetForKickoff(),this.transition("PLAY")),this.state==="PLAY")if(this.matchTimeLeft-=e,this.matchTimeLeft<=0){this.matchTimeLeft=0,this.updateTimerDisplay();let n;this.playerGoals>this.rivalGoals?n="WIN":this.playerGoals<this.rivalGoals?n="LOSS":n="DRAW",this.stopBgLoop(600),this.playSfx("sfx_whistle.mp3",.75),this.transition(n)}else this.updateTimerDisplay(),this.updateAim(),this.updatePlayerMovement(e),this.updateRivalAI(e),this.resolveBodyCollision(),this.updatePlayerFacing(e);this.player&&(this.player.group.rotation.y=ga(this.player.group.rotation.y,this.player.yaw,Math.min(1,e*8)),this.applyBob(this.player,e)),this.rival&&(this.rival.group.rotation.y=ga(this.rival.group.rotation.y,this.rival.yaw,Math.min(1,e*6)),this.applyBob(this.rival,e)),this.updateIndicatorBall(this.player,e),this.updateIndicatorBall(this.rival,e),this.updateBalls(e),this.updateBlock(e),this.updateRings(e),this.updateLobbyScene(e),this.updateCamera(),this.timeScale<1&&(this.timeScale=Math.min(1,this.timeScale+t*1.5))}updatePlayerMovement(t){var b;let e=0,n=0;(this.keys.w||this.keys.arrowup)&&(n-=1),(this.keys.s||this.keys.arrowdown)&&(n+=1),(this.keys.a||this.keys.arrowleft)&&(e-=1),(this.keys.d||this.keys.arrowright)&&(e+=1);let s=0,r=0,a=!1;if(this.touchPointerId!==-1){const w=this.touchCurrentX-this.touchStartX,E=this.touchCurrentY-this.touchStartY,C=Math.sqrt(w*w+E*E),_=C>os;if(_&&!this.wasInSprintZone&&(this.sprintDashTimer=wc),this.wasInSprintZone=_,C>f_){a=!0;let S;if(_){if(S=1+Math.min(1,(C-os)/(Ec-os))*(Tc-1),this.sprintDashTimer>0){const R=this.sprintDashTimer/wc;S+=R*Ac,this.sprintDashTimer-=t,this.sprintDashTimer<0&&(this.sprintDashTimer=0)}}else{const O=C/os;S=Math.pow(O,p_)}s=w/C*S,r=E/C*S}}else this.wasInSprintZone=!1,this.sprintDashTimer=0;if(a)this.smoothedMx=s,this.smoothedMz=r;else{const w=1-Math.exp(-t*m_);this.smoothedMx+=(0-this.smoothedMx)*w,this.smoothedMz+=(0-this.smoothedMz)*w}if(e+=this.smoothedMx,n+=this.smoothedMz,this.dribbleTimer>0)e+=this.dribbleDirX*js,n+=this.dribbleDirZ*js,this.dribbleTimer-=t,this.dribbleTimer<=0&&(this.dribbleTimer=0,this.dribbleTailTimer=this.dribbleTailMax);else if(this.dribbleTailTimer>0){const w=this.dribbleTailMax>0?this.dribbleTailMax:Zs,C=this.dribbleTailTimer/w,_=1-C,S=3*_*_*C*.72+3*_*C*C*1+C*C*C;e+=this.dribbleDirX*js*S,n+=this.dribbleDirZ*js*S,this.dribbleTailTimer-=t,this.dribbleTailTimer<0&&(this.dribbleTailTimer=0)}this.stealOnlyTimer>0&&(this.stealOnlyTimer-=t,this.stealOnlyTimer<0&&(this.stealOnlyTimer=0));const o=Tc+Ac,c=Math.sqrt(e*e+n*n);c>o&&(e=e/c*o,n=n/c*o);const l=c>t_,h=this.player.pos.x,d=this.player.pos.z;if(l){const w=Math.sqrt(e*e+n*n);this.lastMoveDirX=e/w,this.lastMoveDirZ=n/w,this.dribbleTimer<=0&&(this.player.yaw=er(Math.atan2(this.lastMoveDirX,this.lastMoveDirZ)+Math.PI)),this.player.pos.x+=e*pa*t,this.player.pos.z+=n*pa*t,this.movingTime+=t}else this.wasMoving&&(!this.isMobile&&(this.state==="PLAY"||this.state==="INTRO")&&this.player.ballCooldown<=0&&this.movingTime>=J0&&this.firePlayerBall(this.lastMoveDirX,this.lastMoveDirZ,Q0),this.movingTime=0);this.wasMoving=l;const u=Ni+.05,p=ue-.4,g=oe-u,x=Ge-u,m=ue+Ui-u,f=Math.abs(d)>p,y=Math.abs(h)<=g;if(f&&y?this.player.pos.x=Ue(this.player.pos.x,-g,g):this.player.pos.x=Ue(this.player.pos.x,-x,x),Math.abs(this.player.pos.x)<=g?this.player.pos.z=Ue(this.player.pos.z,-m,m):this.player.pos.z=Ue(this.player.pos.z,-p,p),this.player.group.position.copy(this.player.pos),this.dribbleTimer>0&&((b=this.balls[0])==null?void 0:b.possessor)===this.rival){const w=this.player.pos.x-this.rival.pos.x,E=this.player.pos.z-this.rival.pos.z,C=w*w+E*E,_=Ni*2+.32;C<_*_&&(this.balls[0].possessor=this.player,this.balls[0].ownerIsPlayer=!0,this.shakeAmount=Math.max(this.shakeAmount,.22),this.playSfx("sfx_hit.mp3",.5),this.dribbleTimer=0)}}updateRivalAI(t){const e=this.balls[0];if(!e||this.state==="PLAY"&&this.stateTime<.5&&!e.possessor)return;let n=this.rival.pos.x,s=this.rival.pos.z;const r=this.totalTime,a=Math.sin(r*.83)*.35,o=Math.cos(r*.71+1.2)*.3;if(e.possessor===this.rival)n=Ue(this.player.pos.x*.5+a*1.3,-oe+.2,oe-.2),s=ue-2.5+o*.5;else if(e.possessor===this.player){const E=-ue,C=this.player.pos.x+this.lastMoveDirX*.4,_=this.player.pos.z+this.lastMoveDirZ*.4,S=C-0,O=_-E,R=Math.sqrt(S*S+O*O),U=1.4;if(R>U+.1){const F=(R-U)/R;n=S*F+a,s=E+O*F+o}else n=C+a,s=Ue(E+1+o*.4,E+.5,E+2.5)}else n=e.mesh.position.x+a*.4,s=e.mesh.position.z+o*.4;if(this.rivalHesitateTimer>0){this.rivalHesitateTimer-=t,this.rivalHesitateTimer<0&&(this.rivalHesitateTimer=0);return}this.rivalHesitateCooldown>0?this.rivalHesitateCooldown-=t:this.rivalDribbleTimer<=0&&Math.random()<.045&&(this.rivalHesitateTimer=.5+Math.random()*.45,this.rivalHesitateCooldown=1.8+Math.random()*1.4);const c=n-this.rival.pos.x,l=s-this.rival.pos.z,h=Math.sqrt(c*c+l*l);if(this.rivalDashCooldown>0&&(this.rivalDashCooldown-=t),this.rivalDashCooldown<=0&&this.rivalDribbleTimer<=0&&h>1.2){const E=this.playerGoals-this.rivalGoals,C=.004+Math.max(0,E)*.006;Math.random()<C&&(this.rivalDribbleTimer=.3,this.rivalDribbleDirX=c/h,this.rivalDribbleDirZ=l/h,this.rivalDashCooldown=1.4+Math.random()*.6)}const d=this.rivalDribbleTimer>0?1.7:1;this.rivalDribbleTimer>0&&(this.rivalDribbleTimer-=t,this.rivalDribbleTimer<0&&(this.rivalDribbleTimer=0));const u=this.rival.pos.x,p=this.rival.pos.z;if(h>.1){const E=h_*d*t,C=this.rivalDribbleTimer>0?this.rivalDribbleDirX:c/h,_=this.rivalDribbleTimer>0?this.rivalDribbleDirZ:l/h;this.rival.pos.x+=C*E,this.rival.pos.z+=_*E}const g=Ni+.05,x=ue-.4,m=oe-g,f=Ge-g,y=ue+Ui-g,T=Math.abs(p)>x,b=Math.abs(u)<=m;if(T&&b?this.rival.pos.x=Ue(this.rival.pos.x,-m,m):this.rival.pos.x=Ue(this.rival.pos.x,-f,f),Math.abs(this.rival.pos.x)<=m?this.rival.pos.z=Ue(this.rival.pos.z,-y,y):this.rival.pos.z=Ue(this.rival.pos.z,-x,x),this.rival.group.position.copy(this.rival.pos),this.rivalDribbleTimer>0&&e.possessor===this.player){const E=this.rival.pos.x-this.player.pos.x,C=this.rival.pos.z-this.player.pos.z,_=Ni*2+.55;E*E+C*C<_*_&&(e.possessor=this.rival,e.ownerIsPlayer=!1,this.shakeAmount=Math.max(this.shakeAmount,.22),this.playSfx("sfx_hit.mp3",.45),this.rivalDribbleTimer=0)}if(e.possessor===this.rival){const E=new N(0,0,ue).sub(this.rival.pos).setY(0).normalize();this.rival.yaw=Math.atan2(E.x,E.z)+Math.PI}else h>.1&&(this.rival.yaw=Math.atan2(c/h,l/h)+Math.PI);e.possessor===this.rival?(this.rivalShootTimer-=t,(this.rivalShootTimer<=0||this.rival.pos.z>1)&&(this.fireRivalBall(),this.rivalShootTimer=g_+(Math.random()-.5)*__)):this.rivalShootTimer=.7+Math.random()*.6}resolveBodyCollision(){if(!this.player||!this.rival)return;const t=this.player.pos.x-this.rival.pos.x,e=this.player.pos.z-this.rival.pos.z,n=t*t+e*e,s=Ni*2+.08;if(n>=s*s)return;const r=Math.sqrt(n);let a,o;if(r<.001){const p=Math.random()*Math.PI*2;a=Math.cos(p),o=Math.sin(p)}else a=t/r,o=e/r;const l=(s-r)/2;this.player.pos.x+=a*l,this.player.pos.z+=o*l,this.rival.pos.x-=a*l,this.rival.pos.z-=o*l;const h=Ni+.05,d=ue-.4,u=p=>{if(Math.abs(p.z)>d?p.x=Ue(p.x,-1.0574999999999999,oe-h):p.x=Ue(p.x,-Ge+h,Ge-h),Math.abs(p.x)<oe-h){const x=ue+Ui-h;p.z=Ue(p.z,-x,x)}else p.z=Ue(p.z,-d,d)};u(this.player.pos),u(this.rival.pos),this.player.group.position.copy(this.player.pos),this.rival.group.position.copy(this.rival.pos)}applyBob(t,e){const n=t.pos.x-t.lastPos.x,s=t.pos.z-t.lastPos.z,r=Math.sqrt(n*n+s*s),a=Math.min(1,r/(pa*e+1e-4));a>.05?t.bobTime+=e*(8+4*a):t.bobTime*=1-Math.min(1,e*6);const o=Math.abs(Math.sin(t.bobTime))*.06*a;t.group.position.y=o,t.lastPos.copy(t.pos)}updatePlayerFacing(t){this.charging||this.player.ballCooldown>.5||(this.player.yaw=ga(this.player.yaw,0,Math.min(1,t*2.2)))}render(){this.ready&&this.renderer.render(this.scene,this.camera)}updateLobbyScene(t){if(!this.lobbyGroup)return;const e=this.state==="MENU";if(this.lobbyGroup.visible!==e){this.lobbyGroup.visible=e;const n=!e;for(const s of this.scene.children){if(s===this.lobbyGroup)continue;const r=s.type;if(!(r==="AmbientLight"||r==="DirectionalLight"||r==="HemisphereLight"||r==="PointLight"||r==="SpotLight")){if(s===this.fieldLinesGroup&&this.customFieldLoaded){s.visible=!1;continue}s.visible=n}}this.renderer.setClearColor(e?793914:1919514)}e&&(this.lobbyDragging||(this.lobbyGroup.rotation.y+=this.lobbyAngularVelocity*t,this.lobbyAngularVelocity*=Math.pow(.4,t),this.lobbyIdleSpinTimer+=t,this.lobbyIdleSpinTimer>1.5&&Math.abs(this.lobbyAngularVelocity)<.15&&(this.lobbyGroup.rotation.y+=t*.3)))}updateCamera(){let t=0,e=0;this.shakeAmount>.001&&(t=(Math.random()-.5)*this.shakeAmount,e=(Math.random()-.5)*this.shakeAmount,this.shakeAmount*=.85);const n=this.state==="MENU"?this.lobbyCamPos:this.baseCamPos,s=this.state==="MENU"?this.lobbyCamLookAt:this.baseCamLookAt;this.camera.position.set(n.x+t,n.y,n.z+e),this.camera.lookAt(s)}transition(t){this.state!==t&&(this.state=t,this.stateTime=0,t==="GOAL_PAUSE"&&this.resetTransientInputState(),t==="PLAY"||(t==="WIN"?(this.showBanner("VICTORY!","success"),this.timeScale=.45,this.shakeAmount=.5,setTimeout(()=>this.showEnd("WIN"),1e3)):t==="LOSS"?(this.showBanner("DEFEAT","danger"),this.timeScale=.4,this.shakeAmount=.6,setTimeout(()=>this.showEnd("LOSS"),1e3)):t==="DRAW"&&(this.showBanner("FULL TIME",""),this.timeScale=.55,this.shakeAmount=.3,setTimeout(()=>this.showEnd("DRAW"),1e3))))}showBanner(t,e=""){this.bannerEl.textContent=t,this.bannerEl.className="",this.bannerEl.offsetWidth,this.bannerEl.className="show "+e}setMatchHudVisible(t){this.battleBarEl&&(this.battleBarEl.style.display=t?"":"none"),this.timerEl&&(this.timerEl.style.display=t?"":"none"),t||document.body.classList.remove("crunch-time"),this.titleEl&&(this.titleEl.style.display="none"),this.hintEl&&this.hintEl.classList.toggle("hidden",!t),this.mobileHintsEl&&(t&&this.isMobile?(this.mobileHintsEl.classList.remove("hidden"),this.mobileHintsEl.classList.add("visible")):this.mobileHintsEl.classList.add("hidden"))}updateTimerDisplay(){if(!this.timerEl)return;const t=Math.max(0,Math.ceil(this.matchTimeLeft)),e=Math.floor(t/60),n=t%60;this.timerEl.textContent=`${e}:${String(n).padStart(2,"0")}`;const s=t<=10&&t>0&&this.state==="PLAY";this.timerEl.classList.toggle("danger",s),document.body.classList.toggle("crunch-time",s)}startMatch(){this.setMatchHudVisible(!0),this.resetGame(),this.playSfx("sfx_whistle.mp3",.7),this.playBgLoop("sfx_stadium_bg.mp3",.16,150),setTimeout(()=>{this.hintEl&&this.hintEl.classList.add("hidden"),this.mobileHintsEl&&this.mobileHintsEl.classList.add("hidden")},6e3)}exitToMenu(){this.ended=!1,this.endcardEl.classList.remove("show","loss"),this.timeScale=1,this.shakeAmount=0,this.state="MENU",this.stateTime=0,this.matchTimeLeft=ma,this.stopBgLoop(400),this.resetForKickoff(),this.setMatchHudVisible(!1),this.bannerEl.className=""}showEnd(t){if(this.ended)return;this.ended=!0;const e=typeof t=="boolean"?t?"LOSS":"WIN":t,n=window.__onMatchOver;if(typeof n=="function"){try{n({outcome:e,playerGoals:this.playerGoals,rivalGoals:this.rivalGoals})}catch(o){console.error("[soccer] __onMatchOver threw:",o)}return}this.endcardEl.classList.add("show");const s=this.endcardEl.querySelector(".hd"),r=this.endcardEl.querySelector(".sub"),a=this.endcardEl.querySelector(".cta");e==="LOSS"?(this.endcardEl.classList.add("loss"),s&&(s.textContent="DEFEAT"),r&&(r.textContent=`${this.playerGoals} × ${this.rivalGoals}`),a&&(a.textContent="TRY AGAIN")):e==="DRAW"?(s&&(s.textContent="DRAW"),r&&(r.textContent=`${this.playerGoals} × ${this.rivalGoals}`),a&&(a.textContent="PLAY AGAIN")):(s&&(s.textContent="VICTORY!"),r&&(r.textContent=`${this.playerGoals} × ${this.rivalGoals}`),a&&(a.textContent="PLAY AGAIN"))}async loadAudioBuffers(){if(this.audioBuffersLoading||this.audioBuffersReady)return;if(this.audioBuffersLoading=!0,!this.audioCtx){const n=window.AudioContext||window.webkitAudioContext;if(!n){this.audioBuffersLoading=!1;return}this.audioCtx=new n}if(this.audioCtx.state==="suspended")try{await this.audioCtx.resume()}catch{}const t=Object.entries(K0),e=new Map;for(const[n,s]of t)e.has(s)||e.set(s,n);await Promise.all(Array.from(e.entries()).map(async([n,s])=>{try{const a=await(await fetch(n)).arrayBuffer(),o=await this.audioCtx.decodeAudioData(a);for(const[c,l]of t)l===n&&(this.audioBuffers[c]=o)}catch(r){console.warn("[soccer] failed to decode audio",n,r)}})),this.audioBuffersReady=!0,this.audioBuffersLoading=!1}playSfx(t,e=.6,n=250){if(!this.canPlayAudio())return;if(!this.audioBuffersReady){this.loadAudioBuffers();return}const s=this.audioBuffers[t];if(!s||!this.audioCtx)return;this.audioCtx.state==="suspended"&&this.audioCtx.resume().catch(()=>{});const r=this.audioCtx,a=r.createBufferSource();a.buffer=s;const o=r.createGain();a.connect(o),o.connect(r.destination);const c=r.currentTime,l=s.duration,h=Math.min(n/1e3,l*.5);o.gain.setValueAtTime(e,c),o.gain.setValueAtTime(e,c+l-h),o.gain.linearRampToValueAtTime(1e-4,c+l),a.start(c)}playBgLoop(t,e=.18,n=600){if(!this.canPlayAudio())return;if(!this.audioBuffersReady||!this.audioCtx){this.loadAudioBuffers();return}this.stopBgLoop();const s=this.audioBuffers[t];if(!s)return;this.audioCtx.state==="suspended"&&this.audioCtx.resume().catch(()=>{});const r=this.audioCtx,a=r.createBufferSource();a.buffer=s,a.loop=!0;const o=r.createGain();a.connect(o),o.connect(r.destination);const c=r.currentTime,l=n/1e3;o.gain.setValueAtTime(0,c),o.gain.linearRampToValueAtTime(e,c+l),a.start(c),this.bgSource=a,this.bgGain=o}stopBgLoop(t=500){if(!this.bgSource||!this.bgGain||!this.audioCtx)return;const e=this.bgSource,n=this.bgGain;this.bgSource=null,this.bgGain=null;const s=this.audioCtx.currentTime,r=t/1e3;n.gain.cancelScheduledValues(s),n.gain.setValueAtTime(n.gain.value,s),n.gain.linearRampToValueAtTime(0,s+r);try{e.stop(s+r+.05)}catch{}}playExtended(t,e=.7,n=4,s=700){if(!this.canPlayAudio())return;if(!this.audioBuffersReady||!this.audioCtx){this.loadAudioBuffers();return}const r=this.audioBuffers[t];if(!r)return;this.audioCtx.state==="suspended"&&this.audioCtx.resume().catch(()=>{});const a=this.audioCtx,o=a.createBufferSource();o.buffer=r,o.loop=!0;const c=a.createGain();o.connect(c),c.connect(a.destination);const l=a.currentTime,h=s/1e3;c.gain.setValueAtTime(e,l),c.gain.setValueAtTime(e,l+n-h),c.gain.linearRampToValueAtTime(1e-4,l+n),o.start(l);try{o.stop(l+n+.05)}catch{}}}function Ue(i,t,e){return Math.max(t,Math.min(e,i))}function ga(i,t,e){let n=t-i;for(;n>Math.PI;)n-=Math.PI*2;for(;n<-Math.PI;)n+=Math.PI*2;return i+n*e}function er(i){let t=i;for(;t>Math.PI;)t-=2*Math.PI;for(;t<-Math.PI;)t+=2*Math.PI;return t}function S_(){try{window.__bootStarted=!0,window.__GAME__=new M_,window.__bootDone=!0}catch(i){window.__bootError=String(i.stack||i),console.error("[soccer-1x1] boot error:",i)}return{stop:()=>{}}}const Do="soccer1x1:meta:v1",an=10,y_=5,cr=1800,b_=60,Uo=1,xr=1,Cc=50,E_=["FERA_BR","ShadowStriker","NinjaBola","RodrigoPro","KaitoX","MessiFake","GoatHunter","JuninhoFC","TigrePrime","AceFutebol","PendekarBola","ViperKick","NoLookGod","MaracanaKid","GoldenBoot","StrikerKZ","TacoDeOuro","CavaniBR","TornadoFC","PhoenixK1ck","WitcherGoal","PibePower","BananaShot","CapitaoFut","LordOfPitch","RogerioPRO","DragaoBr","CrackOnline","ZeroBala","OneTapWonder","RolexFC","NeyOnTop","NazaUltra","KazumaKick","TheBigPlayer","CracaoXBR","PsychoStriker","MachadoFC","ElPibe10","BalaPerdida","StormFut","FuriaGoals","RamboFC","ColdShot77","GauchoKing","BalaDePrata","XuxoFC","GringoLoco","AraraXLR","SambaStriker"],Rc=["🇧🇷","🇦🇷","🇪🇸","🇮🇹","🇫🇷","🇩🇪","🇬🇧","🇵🇹","🇲🇽","🇯🇵","🇰🇷","🇺🇸","🇨🇦","🇨🇴","🇨🇱","🇺🇾","🇳🇱","🇧🇪","🇸🇪","🇳🇴","🇸🇦","🇪🇬","🇲🇦","🇸🇳"];function pi(){return Date.now()}function T_(){try{const i=localStorage.getItem(Do);return i?JSON.parse(i):null}catch{return null}}function Qi(i){try{localStorage.setItem(Do,JSON.stringify(i))}catch{}}function _h(){const i=[...E_].sort(()=>Math.random()-.5),t=[];for(let e=0;e<Cc;e++){const n=e+1,s=Math.max(2,Math.round(95*Math.pow(1-n/(Cc+6),2.2))),r=Math.floor(Math.random()*8)-3;t.push({id:`bot_${e}`,name:i[e%i.length],flag:Rc[Math.floor(Math.random()*Rc.length)],weekGoals:Math.max(1,s+r)})}return t}function vh(i){const t=new Date(i),n=(8-t.getDay())%7||7,s=new Date(t);return s.setDate(t.getDate()+n),s.setHours(0,0,0,0),s.getTime()}function xh(){const i=pi();return{tickets:y_,lastRegenAt:i,careerGoals:0,weekGoals:0,weekResetAt:vh(i),adCooldownUntil:0,bots:_h()}}function A_(i){const t=pi();let e=!1;const n=xh();for(const s of Object.keys(n))(i[s]===void 0||i[s]===null)&&(i[s]=n[s],e=!0);if(i.tickets<an){const s=Math.floor((t-i.lastRegenAt)/1e3),r=Math.floor(s/cr);if(r>0){const a=Math.min(r,an-i.tickets);i.tickets+=a,i.lastRegenAt+=a*cr*1e3,e=!0}}else i.lastRegenAt<t-cr*1e3&&(i.lastRegenAt=t,e=!0);return t>=i.weekResetAt&&(i.weekGoals=0,i.weekResetAt=vh(t),i.bots=_h(),e=!0),e&&Qi(i),i}function Ke(){let i=T_();return i||(i=xh(),Qi(i)),A_(i)}function Mr(){return Ke().tickets}function Ic(){const i=Ke();return i.tickets<=0?!1:(i.tickets===an&&(i.lastRegenAt=pi()),i.tickets-=xr,Qi(i),!0)}function w_(i){const t=Ke();return t.tickets=Math.max(0,Math.min(an,t.tickets+i)),Qi(t),t.tickets}function C_(){const i=Ke();if(i.tickets>=an)return 0;const t=pi()-i.lastRegenAt,e=cr*1e3;return Math.max(0,e-t%e)}function R_(){return Ke().careerGoals}function Mh(i){if(i<=0)return;const t=Ke();t.careerGoals+=i,t.weekGoals+=i,Qi(t)}function I_(){return Math.max(0,Ke().weekResetAt-pi())}function Sh(){const i=Ke(),t=i.bots.map(e=>({...e,isPlayer:!1}));return t.push({id:"player",name:"YOU",flag:"🇧🇷",weekGoals:i.weekGoals,isPlayer:!0}),t.sort((e,n)=>n.weekGoals-e.weekGoals||(e.isPlayer?1:-1)),t}function P_(){const i=Ke(),t=Math.floor(Math.random()*i.bots.length);return i.bots[t]}function yh(){return Math.max(0,Ke().adCooldownUntil-pi())}function bh(){return yh()===0&&Mr()<an}function L_(){if(!bh())return!1;const i=Ke();return i.adCooldownUntil=pi()+b_*1e3,i.tickets=Math.min(an,i.tickets+Uo),Qi(i),!0}typeof window<"u"&&(window.__meta={getState:Ke,addTickets:w_,addCareerGoals:Mh,reset:()=>(localStorage.removeItem(Do),Ke())});let Pn=null,hr=null,qn=null,ls=null;const Eh=["lobby","matchmaking","leaderboard","ads-overlay","endcard","settings","notifications"],Th="soccer1x1:settings:sound";function D_(){return localStorage.getItem(Th)!=="off"}function U_(i){localStorage.setItem(Th,i?"on":"off")}const N_=[{icon:"🏆",title:"WEEKLY RANK RESETS MONDAY",sub:"You have until Sunday to climb the leaderboard. Top 10 get bragging rights.",unread:!0},{icon:"⚽",title:"NEW: CRUNCH TIME OVERLAY",sub:"The final 10 seconds of every match now pulse red. Push hard.",unread:!0},{icon:"🎫",title:"GET A FREE TICKET",sub:'Tap "WATCH AD" on the home screen to grab a bonus match.',unread:!1},{icon:"⚙",title:"SETTINGS LIVE",sub:"Toggle sound and reset progress from the gear icon up top.",unread:!1}];function Ct(i){return document.getElementById(i)}function mi(i){for(const t of Eh){const e=Ct(t);e&&(t===i?e.classList.add("show"):e.classList.remove("show"))}}function _a(){for(const i of Eh){const t=Ct(i);t&&t.classList.remove("show")}}function Pc(i){const t=Math.max(0,Math.ceil(i/1e3)),e=Math.floor(t/3600),n=Math.floor(t%3600/60),s=t%60;return e>0?`${e}h ${n}m`:`${n}:${String(s).padStart(2,"0")}`}function F_(i){const t=Math.max(0,Math.ceil(i/1e3)),e=Math.floor(t/86400),n=Math.floor(t%86400/3600);return e>0?`${e}d ${n}h`:`${n}h`}function po(){const i=Mr(),t=R_(),e=C_(),n=yh(),s=Ct("lobby-tickets");s&&(s.textContent=String(i));const r=Ct("lobby-career");r&&(r.textContent=String(t));const a=Ct("lobby-status-title"),o=Ct("lobby-regen");a&&o&&(i>=an?(a.textContent=`${i} / ${an} TICKETS`,o.textContent="AT MAX"):(a.textContent=`${i} / ${an} TICKETS`,o.textContent=`NEXT IN ${Pc(e).toUpperCase()}`));const c=Ct("lobby-play");if(c){const u=c.querySelector(".play-arrow"),p=c.querySelector(".play-label"),g=c.querySelector(".play-cost");i>=xr?(c.disabled=!1,u&&(u.style.display=""),p&&(p.textContent="PLAY"),g&&(g.textContent="-1 🎫",g.style.display="")):(c.disabled=!0,u&&(u.style.display="none"),p&&(p.textContent="NO TICKETS"),g&&(g.style.display="none"))}const l=Ct("lobby-ads"),h=Ct("lobby-ads-badge");l&&h&&(i>=an?(l.disabled=!0,h.textContent="MAX"):n>0?(l.disabled=!0,h.textContent=Pc(n)):(l.disabled=!1,h.textContent=`+${Uo} 🎫`));const d=Ct("lobby-rank-badge");if(d){const p=Sh().findIndex(g=>g.isPlayer);d.textContent=p>=0?`#${p+1}`:"#--"}}function O_(){Oi(),po(),hr=setInterval(po,1e3)}function Oi(){hr&&(clearInterval(hr),hr=null)}function Cn(){mi("lobby"),O_(),wh()}function B_(){Ct("settings-sound").checked=D_();const i="1.0.0";Ct("settings-version").textContent=i,mi("settings")}const Ah="soccer1x1:notifs:seen";function k_(){const i=Ct("notif-list");i.innerHTML="";for(const t of N_){const e=document.createElement("div");e.className="notif-row"+(t.unread?" unread":""),e.innerHTML=`
      <span class="notif-icon">${t.icon}</span>
      <div class="notif-body">
        <span class="notif-title">${t.title}</span>
        <span class="notif-sub">${t.sub}</span>
      </div>`,i.appendChild(e)}localStorage.setItem(Ah,"1"),wh(),mi("notifications")}function wh(){const i=document.querySelector("#lobby-notif .notif-dot");if(!i)return;const t=localStorage.getItem(Ah)==="1";i.style.display=t?"none":""}function Lc(i){const t=P_();Ct("mm-rival-flag").textContent=t.flag,Ct("mm-rival-name").textContent=t.name,Ct("mm-status").textContent="FINDING OPPONENT...",Ct("mm-vs").classList.remove("show"),mi("matchmaking"),ls&&clearTimeout(ls),ls=setTimeout(()=>{Ct("mm-status").textContent="OPPONENT FOUND",Ct("mm-vs").classList.add("show"),ls=setTimeout(()=>{ls=null,i()},1400)},1500)}function z_({outcome:i,playerGoals:t,rivalGoals:e}){Pn&&Pn.setMatchHudVisible&&Pn.setMatchHudVisible(!1),Mh(t);const n=Ct("endcard");n.classList.remove("outcome-loss","outcome-draw");const s=Ct("endcard-result");i==="WIN"?s.textContent="VICTORY!":i==="LOSS"?(s.textContent="DEFEAT",n.classList.add("outcome-loss")):(s.textContent="DRAW",n.classList.add("outcome-draw")),Ct("endcard-score").textContent=`${t} × ${e}`;const r=Ct("endcard-career");t>0?(r.textContent=`+${t} CAREER GOAL${t>1?"S":""}`,r.classList.remove("zero")):(r.textContent="no goals this match",r.classList.add("zero"));const a=Ct("endcard-replay");a&&(Mr()>=xr?(a.disabled=!1,a.textContent="🔁 PLAY AGAIN"):(a.disabled=!0,a.textContent="NO TICKETS")),mi("endcard")}function G_(){const i=Ct("lb-list");i.innerHTML="",Sh().forEach((n,s)=>{const r=document.createElement("div");r.className="lb-row"+(n.isPlayer?" player":""),r.innerHTML=`
      <span class="lb-rank">#${s+1}</span>
      <span class="lb-flag">${n.flag}</span>
      <span class="lb-name">${n.name}</span>
      <span class="lb-goals">${n.weekGoals}⚽</span>
    `,i.appendChild(r)}),Ct("lb-reset").textContent=`resets in ${F_(I_())}`,mi("leaderboard");const e=i.querySelector(".lb-row.player");e&&setTimeout(()=>e.scrollIntoView({block:"center",behavior:"smooth"}),80)}function V_(){const i=Ct("ad-content"),t=Ct("ad-sub"),e=Ct("ad-progress-fill"),n=Ct("ad-skip"),s=Ct("ad-reward"),r=Ct("ad-actions"),a=Ct("ad-claim");i.innerHTML="AD<br>IN PROGRESS",t.textContent="hold tight — almost there",e.style.width="0%",s.classList.remove("show"),r.classList.remove("show"),n.textContent="SKIP in 5s",mi("ads-overlay");const o=5e3,c=performance.now();qn&&clearInterval(qn),qn=setInterval(()=>{const l=performance.now()-c,h=Math.min(100,l/o*100);e.style.width=h+"%";const d=Math.max(0,Math.ceil((o-l)/1e3));if(n.textContent=d>0?`SKIP in ${d}s`:"",l>=o){clearInterval(qn),qn=null;const u=L_();i.innerHTML=u?"AD<br>COMPLETE":"TICKETS<br>AT MAX",t.textContent=u?"reward ready":"come back after spending tickets",u&&(s.textContent=`+${Uo} 🎫`,s.classList.add("show")),r.classList.add("show"),a.textContent="OK"}},100)}function H_(){qn&&(clearInterval(qn),qn=null),Cn()}function W_(){Ct("lobby-play").addEventListener("click",()=>{if(!Ic()){po();return}Oi(),Lc(()=>{_a(),Pn.startMatch()})}),Ct("lobby-ads").addEventListener("click",()=>{bh()&&(Oi(),V_())}),Ct("lobby-leaderboard").addEventListener("click",()=>{Oi(),G_()}),Ct("lobby-settings").addEventListener("click",()=>{Oi(),B_()}),Ct("lobby-notif").addEventListener("click",()=>{Oi(),k_()}),Ct("settings-close").addEventListener("click",()=>Cn()),Ct("settings-back").addEventListener("click",()=>Cn()),Ct("settings-sound").addEventListener("change",i=>{U_(i.target.checked)}),Ct("settings-reset").addEventListener("click",()=>{confirm("Reset all career progress (goals, week stats, tickets)?")&&(localStorage.removeItem("soccer1x1:meta:v1"),location.reload())}),Ct("notif-close").addEventListener("click",()=>Cn()),Ct("notif-back").addEventListener("click",()=>Cn()),Ct("lb-close").addEventListener("click",()=>Cn()),Ct("lb-back").addEventListener("click",()=>Cn()),Ct("ad-claim").addEventListener("click",()=>H_()),Ct("endcard-lobby").addEventListener("click",()=>{Pn.exitToMenu(),Cn()}),Ct("endcard-replay").addEventListener("click",()=>{Mr()<xr||(Ic(),_a(),Pn.exitToMenu(),Lc(()=>{_a(),Pn.startMatch()}))})}function X_(){window.__onMatchOver=i=>{z_(i)}}function q_(i){const t=S_();Pn=window.__GAME__||window.__game,Pn||console.error("[meta] startSoccer did not expose the game instance"),i&&i.classList.add("visible");const e=document.getElementById("game-canvas");return e&&e.classList.add("visible"),X_(),W_(),Cn(),t}const Y_=document.getElementById("game-canvas"),fe=(...i)=>console.log("[Shell]",...i);async function Ch(){fe("Booting...",`platform=${Rn.getPlatform()}`,`native=${Rn.isNativePlatform()}`);try{await il().initialize({appId:"Soccer 1x1",environment:"production"}),fe("[WildlifePlatform] initialized, version =",await il().getPlatformVersion())}catch(t){fe("[WildlifePlatform] initialize failed:",(t==null?void 0:t.message)??t)}pu(),xu();let i="1.0.0";if(Rn.isNativePlatform()){try{const t=await Uc.getInfo();i=t.version||i,fe("Native app info:",JSON.stringify(t))}catch(t){fe("Could not get native app info:",t.message)}if(fe("Entering fullscreen mode..."),await Ko.hide(),await Ko.setOverlaysWebView({overlay:!0}),await Yh.hide(),fe("Fullscreen + splash hidden"),Rn.getPlatform()==="ios")try{const t=await $h.requestPermission();fe("[ATT] status:",(t==null?void 0:t.status)??"unknown")}catch(t){fe("[ATT] requestPermission failed:",(t==null?void 0:t.message)??t)}}mu(i),fe("Shell version:",i,"| Content version:","1.0.0"),Bn.on("status",t=>{fe("OTA status:",t),Ts(t)}),Bn.on("progress",t=>{fe("OTA progress:",t+"%"),ol(t)}),Bn.on("error",t=>fe("OTA error:",t));try{fe("Initializing OTA updater..."),await Bn.init(),fe("OTA updater initialized");const t=await Bn.getContentVersion();fe("Content version:",t),gu(t),fe("Checking for updates...");const e=await Bn.checkForUpdate();if(e){fe("Update manifest:",JSON.stringify(e)),Ts("Downloading update..."),await Bn.downloadUpdate(e),Ts("Applying update..."),fe("Applying update immediately..."),await Bn.applyNow();return}else fe("No update available");Ts("Starting game..."),ol(100),fe("Launching game..."),await $_(300),q_(Y_),fe("Lobby ready — hiding loader"),await vu(),fe("Boot complete")}catch(t){console.error("[Shell] Startup error:",t),Mu(t.message||"Failed to start the game.",()=>Ch())}}function $_(i){return new Promise(t=>setTimeout(t,i))}Ch();export{Dc as W};
