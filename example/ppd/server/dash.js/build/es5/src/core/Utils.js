'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 *//**
 * @class
 * @ignore
 */var Utils=function(){function Utils(){_classCallCheck(this,Utils);}_createClass(Utils,null,[{key:'mixin',value:function mixin(dest,source,copy){var s=void 0;var empty={};if(dest){for(var name in source){if(source.hasOwnProperty(name)){s=source[name];if(!(name in dest)||dest[name]!==s&&(!(name in empty)||empty[name]!==s)){if(_typeof(dest[name])==='object'&&dest[name]!==null){dest[name]=Utils.mixin(dest[name],s,copy);}else{dest[name]=copy(s);}}}}}return dest;}},{key:'clone',value:function clone(src){if(!src||(typeof src==='undefined'?'undefined':_typeof(src))!=='object'){return src;// anything
}var r=void 0;if(src instanceof Array){// array
r=[];for(var i=0,l=src.length;i<l;++i){if(i in src){r.push(Utils.clone(src[i]));}}}else{r={};}return Utils.mixin(r,src,Utils.clone);}},{key:'addAditionalQueryParameterToUrl',value:function addAditionalQueryParameterToUrl(url,params){try{if(!params||params.length===0){return url;}var modifiedUrl=new URL(url);params.forEach(function(param){if(param.key&&param.value){modifiedUrl.searchParams.set(param.key,param.value);}});return modifiedUrl.href;}catch(e){return url;}}},{key:'generateUuid',value:function generateUuid(){var dt=new Date().getTime();var uuid='xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(c){var r=(dt+Math.random()*16)%16|0;dt=Math.floor(dt/16);return(c=='x'?r:r&0x3|0x8).toString(16);});return uuid;}},{key:'generateHashCode',value:function generateHashCode(string){var hash=0;if(string.length===0){return hash;}for(var i=0;i<string.length;i++){var chr=string.charCodeAt(i);hash=(hash<<5)-hash+chr;hash|=0;}return hash;}}]);return Utils;}();exports.default=Utils;
//# sourceMappingURL=Utils.js.map