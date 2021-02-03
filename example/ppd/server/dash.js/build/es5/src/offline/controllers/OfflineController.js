'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _OfflineConstants=require('../constants/OfflineConstants');var _OfflineConstants2=_interopRequireDefault(_OfflineConstants);var _OfflineStoreController=require('./OfflineStoreController');var _OfflineStoreController2=_interopRequireDefault(_OfflineStoreController);var _OfflineDownload=require('../OfflineDownload');var _OfflineDownload2=_interopRequireDefault(_OfflineDownload);var _IndexDBOfflineLoader=require('../net/IndexDBOfflineLoader');var _IndexDBOfflineLoader2=_interopRequireDefault(_IndexDBOfflineLoader);var _OfflineUrlUtils=require('../utils/OfflineUrlUtils');var _OfflineUrlUtils2=_interopRequireDefault(_OfflineUrlUtils);var _OfflineEvents=require('../events/OfflineEvents');var _OfflineEvents2=_interopRequireDefault(_OfflineEvents);var _OfflineErrors=require('../errors/OfflineErrors');var _OfflineErrors2=_interopRequireDefault(_OfflineErrors);var _OfflineDownloadVo=require('../vo/OfflineDownloadVo');var _OfflineDownloadVo2=_interopRequireDefault(_OfflineDownloadVo);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}/**
 * @class OfflineController
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
 */function OfflineController(){var context=this.context;var instance=void 0,downloads=void 0,adapter=void 0,schemeLoaderFactory=void 0,debug=void 0,logger=void 0,manifestLoader=void 0,manifestModel=void 0,manifestUpdater=void 0,baseURLController=void 0,offlineStoreController=void 0,urlUtils=void 0,offlineUrlUtils=void 0,events=void 0,eventBus=void 0,constants=void 0,dashConstants=void 0,errHandler=void 0;function setup(){offlineUrlUtils=(0,_OfflineUrlUtils2.default)(context).getInstance();downloads=[];}function setConfig(config){if(!config)return;if(config.errHandler){errHandler=config.errHandler;}if(config.events&&config.eventBus){events=config.events;eventBus=config.eventBus;offlineStoreController=(0,_OfflineStoreController2.default)(context).create({eventBus:config.eventBus,errHandler:errHandler});}if(config.debug){debug=config.debug;logger=debug.getLogger(instance);}if(config.manifestLoader){manifestLoader=config.manifestLoader;}if(config.manifestModel){manifestModel=config.manifestModel;}if(config.adapter){adapter=config.adapter;}if(config.manifestUpdater){manifestUpdater=config.manifestUpdater;}if(config.baseURLController){baseURLController=config.baseURLController;}if(config.schemeLoaderFactory){schemeLoaderFactory=config.schemeLoaderFactory;}if(config.constants){constants=config.constants;}if(config.dashConstants){dashConstants=config.dashConstants;}if(config.urlUtils){urlUtils=config.urlUtils;urlUtils.registerUrlRegex(offlineUrlUtils.getRegex(),offlineUrlUtils);}schemeLoaderFactory.registerLoader(_OfflineConstants2.default.OFFLINE_SCHEME,_IndexDBOfflineLoader2.default);}/*
    ---------------------------------------------------------------------------

        DOWNLOAD LIST FUNCTIONS

    ---------------------------------------------------------------------------
    */function getDownloadFromId(id){var download=downloads.find(function(item){return item.getId()===id;});return download;}function createDownloadFromId(id){var download=void 0;download=getDownloadFromId(id);if(!download){// create download controller
download=(0,_OfflineDownload2.default)(context).create({id:id,eventBus:eventBus,events:events,manifestLoader:manifestLoader,manifestModel:manifestModel,manifestUpdater:manifestUpdater,baseURLController:baseURLController,adapter:adapter,errHandler:errHandler,offlineStoreController:offlineStoreController,debug:debug,constants:constants,dashConstants:dashConstants,urlUtils:urlUtils});downloads.push(download);}return download;}function createDownloadFromStorage(offline){var download=getDownloadFromId(offline.manifestId);if(!download){download=createDownloadFromId(offline.manifestId);var status=offline.status;if(status===_OfflineConstants2.default.OFFLINE_STATUS_STARTED){status=_OfflineConstants2.default.OFFLINE_STATUS_STOPPED;}download.setInitialState({url:offline.url,progress:offline.progress,originalUrl:offline.originalURL,status:status});}return download;}function removeDownloadFromId(id){return new Promise(function(resolve,reject){var download=getDownloadFromId(id);var waitForStatusChanged=false;if(download){//is download running?
if(download.isDownloading()){//register status changed event
waitForStatusChanged=true;var downloadStopped=function downloadStopped(){eventBus.off(events.DOWNLOADING_STOPPED,downloadStopped,instance);return offlineStoreController.deleteDownloadById(id).then(function(){resolve();}).catch(function(err){reject(err);});};eventBus.on(events.DOWNLOADING_STOPPED,downloadStopped,instance);}download.deleteDownload();var index=downloads.indexOf(download);downloads.splice(index,1);}if(!waitForStatusChanged){resolve();}});}/*
    ---------------------------------------------------------------------------

        DOWNLOAD FUNCTIONS

    ---------------------------------------------------------------------------
    */function generateManifestId(){var timestamp=new Date().getTime();return timestamp;}function loadDownloadsFromStorage(){return new Promise(function(resolve,reject){offlineStoreController.getAllManifests().then(function(items){items.manifests.forEach(function(offline){createDownloadFromStorage(offline);});resolve();}).catch(function(e){logger.error('Failed to load downloads '+e);reject(e);});});}function createDownload(url){return new Promise(function(resolve,reject){var id=generateManifestId();// create download controller
var download=createDownloadFromId(id);download.downloadFromUrl(url).then(function(){resolve(id);}).catch(function(e){logger.error('Failed to download '+e);removeDownloadFromId(id).then(function(){reject(e);});});});}function initDownload(id){var download=getDownloadFromId(id);if(download){download.initDownload();}}function startDownload(id,selectedRepresentations){var download=getDownloadFromId(id);if(download){download.startDownload(selectedRepresentations);}}function getAllDownloads(){var ret=[];downloads.forEach(function(download){var offlineDownload=new _OfflineDownloadVo2.default();offlineDownload.id=download.getId();offlineDownload.progress=download.getDownloadProgression();offlineDownload.url=download.getOfflineUrl();offlineDownload.originalUrl=download.getManifestUrl();offlineDownload.status=download.getStatus();ret.push(offlineDownload);});return ret;}function stopDownload(id){var download=getDownloadFromId(id);if(download){download.stopDownload();}}function deleteDownload(id){return removeDownloadFromId(id).then(function(){return offlineStoreController.deleteDownloadById(id);});}function resumeDownload(id){var download=getDownloadFromId(id);if(download){download.resumeDownload();}}function getDownloadProgression(id){var download=getDownloadFromId(id);if(download){return download.getDownloadProgression();}return 0;}function resetDownloads(){downloads.forEach(function(download){download.resetDownload();});}/**
     * Reset
     * @instance
     */function reset(){resetDownloads();schemeLoaderFactory.unregisterLoader(_OfflineConstants2.default.OFFLINE_SCHEME);}instance={setConfig:setConfig,loadDownloadsFromStorage:loadDownloadsFromStorage,createDownload:createDownload,initDownload:initDownload,startDownload:startDownload,stopDownload:stopDownload,resumeDownload:resumeDownload,deleteDownload:deleteDownload,getDownloadProgression:getDownloadProgression,getAllDownloads:getAllDownloads,resetDownloads:resetDownloads,reset:reset};setup();return instance;}OfflineController.__dashjs_factory_name='OfflineController';var factory=dashjs.FactoryMaker.getClassFactory(OfflineController);/* jshint ignore:line */factory.events=_OfflineEvents2.default;factory.errors=_OfflineErrors2.default;dashjs.FactoryMaker.updateClassFactory(OfflineController.__dashjs_factory_name,factory);/* jshint ignore:line */exports.default=factory;
//# sourceMappingURL=OfflineController.js.map
