'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _FactoryMaker=require('../../core/FactoryMaker');var _FactoryMaker2=_interopRequireDefault(_FactoryMaker);var _SchemeLoaderFactory=require('../../streaming/net/SchemeLoaderFactory');var _SchemeLoaderFactory2=_interopRequireDefault(_SchemeLoaderFactory);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}/**
 * @module URLLoader
 * @description  Call Offline Loader or Online Loader dependaing on URL
 * @param {Object} cfg - dependances
*//**
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
 */function URLLoader(cfg){cfg=cfg||{};var context=this.context;var instance=void 0,schemeLoaderFactory=void 0,loader=void 0;schemeLoaderFactory=(0,_SchemeLoaderFactory2.default)(context).getInstance();function load(config){var loaderFactory=schemeLoaderFactory.getLoader(config&&config.request?config.request.url:null);loader=loaderFactory(context).create({errHandler:cfg.errHandler,mediaPlayerModel:cfg.mediaPlayerModel,requestModifier:cfg.requestModifier,useFetch:cfg.useFetch||null,dashMetrics:cfg.dashMetrics,boxParser:cfg.boxParser?cfg.boxParser:null,constants:cfg.constants?cfg.constants:null,dashConstants:cfg.dashConstants?cfg.dashConstants:null,urlUtils:cfg.urlUtils?cfg.urlUtils:null,errors:cfg.errors});loader.load(config);}function abort(){if(loader){loader.abort();}}instance={load:load,abort:abort};return instance;}URLLoader.__dashjs_factory_name='URLLoader';var factory=_FactoryMaker2.default.getClassFactory(URLLoader);exports.default=factory;
//# sourceMappingURL=URLLoader.js.map
