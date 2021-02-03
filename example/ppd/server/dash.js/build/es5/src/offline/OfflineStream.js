'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _OfflineStreamProcessor=require('./OfflineStreamProcessor');var _OfflineStreamProcessor2=_interopRequireDefault(_OfflineStreamProcessor);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}/**
 * @module  OfflineStream
 * @description Initialize and Manage Offline Stream for each type
 * @param {Object} config - dependences
 */function OfflineStream(config){config=config||{};var context=this.context;var eventBus=config.eventBus;var events=config.events;var constants=config.constants;var debug=config.debug;var adapter=config.adapter;var offlineStoreController=config.offlineStoreController;var manifestId=config.id;var startedCb=config.callbacks&&config.callbacks.started;var progressionCb=config.callbacks&&config.callbacks.progression;var finishedCb=config.callbacks&&config.callbacks.finished;var updateManifest=config.callbacks&&config.callbacks.updateManifestNeeded;var instance=void 0,offlineStreamProcessors=void 0,startedOfflineStreamProcessors=void 0,finishedOfflineStreamProcessors=void 0,streamInfo=void 0,representationsToUpdate=void 0,allMediasInfosList=void 0,progressionById=void 0;function setup(){resetInitialSettings();}/**
     * Reset
     */function resetInitialSettings(){streamInfo=null;offlineStreamProcessors=[];startedOfflineStreamProcessors=0;finishedOfflineStreamProcessors=0;allMediasInfosList=[];representationsToUpdate=[];progressionById={};}/**
     * Initialize offlinestream
     * @param {Object} initStreamInfo
     */function initialize(initStreamInfo){streamInfo=initStreamInfo;eventBus.on(events.DATA_UPDATE_COMPLETED,onDataUpdateCompleted,this);}/**
     * Creates media bitrate list, so that user will be able to choose the representation he wants to download
     */function getDownloadableRepresentations(){var downloadableRepresentations={video:[],audio:[],text:[]};var trackKindMap={subtitle:'subtitles',caption:'captions'};//Dash Spec has no "s" on end of KIND but HTML needs plural.
var getKind=function getKind(mediaInfo){var kind=mediaInfo.roles.length>0?trackKindMap[mediaInfo.roles[0]]:trackKindMap.caption;kind=kind===trackKindMap.caption||kind===trackKindMap.subtitle?kind:trackKindMap.caption;return kind;};// video
var mediaInfo=adapter.getAllMediaInfoForType(streamInfo,constants.VIDEO);if(mediaInfo.length>0){mediaInfo.forEach(function(item){item.bitrateList.forEach(function(bitrate){downloadableRepresentations.video.push({id:bitrate.id,bandwidth:bitrate.bandwidth,width:bitrate.width,height:bitrate.height});});});}// audio
mediaInfo=adapter.getAllMediaInfoForType(streamInfo,constants.AUDIO);if(mediaInfo.length>0){mediaInfo.forEach(function(item){item.bitrateList.forEach(function(bitrate){downloadableRepresentations.audio.push({id:bitrate.id,bandwidth:bitrate.bandwidth,lang:item.lang});});});}// text
var addTextInfo=function addTextInfo(infos,type){if(infos.length>0){infos.forEach(function(item){item.bitrateList.forEach(function(bitrate){downloadableRepresentations.text.push({id:bitrate.id,lang:item.lang,kind:getKind(item),roles:item.roles,accessibility:item.accessibility,type:type});});});}};mediaInfo=adapter.getAllMediaInfoForType(streamInfo,constants.FRAGMENTED_TEXT);addTextInfo(mediaInfo,constants.FRAGMENTED_TEXT);mediaInfo=adapter.getAllMediaInfoForType(streamInfo,constants.TEXT);addTextInfo(mediaInfo,constants.TEXT);/**
        mediaInfo = adapter.getAllMediaInfoForType(streamInfo, constants.MUXED);
        if (mediaInfo.length > 0) {
            downloadableRepresentations.push(mediaInfo);
        }
        mediaInfo = adapter.getAllMediaInfoForType(streamInfo, constants.IMAGE);
        if (mediaInfo.length > 0) {
            downloadableRepresentations.push(mediaInfo);
        }
        */eventBus.trigger(events.DOWNLOADABLE_REPRESENTATIONS_LOADED,{data:{id:manifestId,downloadableRepresentations:downloadableRepresentations},sender:this});}/**
     * Initialize with choosen representations by user
     * @param {Object} mediasInfoList
     */function initializeAllMediasInfoList(mediasInfoList){allMediasInfosList=mediasInfoList;initializeMedia(streamInfo);}/**
     * Initialize media for each type
     * @param {Object} streamInfo
     */function initializeMedia(streamInfo){createOfflineStreamProcessorFor(constants.VIDEO,streamInfo);createOfflineStreamProcessorFor(constants.AUDIO,streamInfo);createOfflineStreamProcessorFor(constants.FRAGMENTED_TEXT,streamInfo);createOfflineStreamProcessorFor(constants.TEXT,streamInfo);for(var i=0;i<offlineStreamProcessors.length;i++){offlineStreamProcessors[i].initialize();}/*
        createOfflineStreamProcessorFor(constants.MUXED,streamInfo);
        createOfflineStreamProcessorFor(constants.IMAGE,streamInfo);
        */}function createOfflineStreamProcessorFor(type,streamInfo){// filter mediaInfo according to choosen representation id
var allMediaInfoForType=adapter.getAllMediaInfoForType(streamInfo,type);allMediaInfoForType.forEach(function(media){media.bitrateList=media.bitrateList.filter(function(bitrate){if(allMediasInfosList[type]&&allMediasInfosList[type].indexOf(bitrate.id)!==-1){return true;}return false;});});allMediaInfoForType=allMediaInfoForType.filter(function(media){return media.bitrateList&&media.bitrateList.length>0;});// cration of an offline stream processor for each choosen representation
allMediaInfoForType.forEach(function(mediaInfo){if(mediaInfo.bitrateList){mediaInfo.bitrateList.forEach(function(bitrate){createStreamProcessor(mediaInfo,bitrate);});}});return allMediaInfoForType;}function createStreamProcessor(mediaInfo,bitrate){var streamProcessor=(0,_OfflineStreamProcessor2.default)(context).create({id:manifestId,callbacks:{completed:onStreamCompleted,progression:onStreamProgression},debug:debug,events:events,eventBus:eventBus,constants:constants});streamProcessor.setConfig({type:mediaInfo.type,mimeType:mediaInfo.mimeType,mediaInfo:mediaInfo,bitrate:bitrate,adapter:adapter,stream:instance,offlineStoreController:offlineStoreController});offlineStreamProcessors.push(streamProcessor);progressionById[bitrate.id]=null;}function onStreamCompleted(){finishedOfflineStreamProcessors++;if(finishedOfflineStreamProcessors===offlineStreamProcessors.length){finishedCb({sender:this,id:manifestId,message:'Downloading has been successfully completed for this stream !'});}}function onStreamProgression(streamProcessor,downloadedSegments,availableSegments){progressionById[streamProcessor.getRepresentationId()]={downloadedSegments:downloadedSegments,availableSegments:availableSegments};var segments=0;var allSegments=0;var waitForAllProgress=void 0;for(var property in progressionById){if(progressionById.hasOwnProperty(property)){if(progressionById[property]===null){waitForAllProgress=true;}else{segments+=progressionById[property].downloadedSegments;allSegments+=progressionById[property].availableSegments;}}}if(!waitForAllProgress&&progressionCb){// all progression have been started, we can compute global progression
if(allSegments>0){progressionCb(instance,segments,allSegments);}}}function onDataUpdateCompleted(e){var repCtrl=e.sender;if(!streamInfo||repCtrl.getStreamId()!==streamInfo.id)return;if(e.currentRepresentation.segments&&e.currentRepresentation.segments.length>0){representationsToUpdate.push(e.currentRepresentation);}var sp=void 0;// data are ready fr stream processor, let's start download
for(var i=0;i<offlineStreamProcessors.length;i++){if(offlineStreamProcessors[i].getRepresentationController()===repCtrl){sp=offlineStreamProcessors[i];break;}}if(sp){checkIfAllOfflineStreamProcessorsStarted();}}function checkIfAllOfflineStreamProcessorsStarted(){startedOfflineStreamProcessors++;if(startedOfflineStreamProcessors===offlineStreamProcessors.length){startedCb({sender:this,id:manifestId,message:'Downloading started for this stream !'});if(representationsToUpdate.length>0){updateManifest({sender:this,id:manifestId,representations:representationsToUpdate});}else{startOfflineStreamProcessors();}}}function getStreamInfo(){return streamInfo;}function getStartTime(){return streamInfo?streamInfo.start:NaN;}function getDuration(){return streamInfo?streamInfo.duration:NaN;}/**
     * Stop offline stream processors
     */function stopOfflineStreamProcessors(){for(var i=0;i<offlineStreamProcessors.length;i++){offlineStreamProcessors[i].stop();}}/**
     * Start offline stream processors
     */function startOfflineStreamProcessors(){for(var i=0;i<offlineStreamProcessors.length;i++){offlineStreamProcessors[i].start();}}function deactivate(){var ln=offlineStreamProcessors?offlineStreamProcessors.length:0;for(var i=0;i<ln;i++){offlineStreamProcessors[i].removeExecutedRequestsBeforeTime(getStartTime()+getDuration());offlineStreamProcessors[i].reset();}}/**
     * Reset
     */function reset(){stopOfflineStreamProcessors();deactivate();resetInitialSettings();eventBus.off(events.DATA_UPDATE_COMPLETED,onDataUpdateCompleted,this);}instance={initialize:initialize,getDownloadableRepresentations:getDownloadableRepresentations,initializeAllMediasInfoList:initializeAllMediasInfoList,getStreamInfo:getStreamInfo,stopOfflineStreamProcessors:stopOfflineStreamProcessors,startOfflineStreamProcessors:startOfflineStreamProcessors,reset:reset};setup();return instance;}/**
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
 */OfflineStream.__dashjs_factory_name='OfflineStream';exports.default=dashjs.FactoryMaker.getClassFactory(OfflineStream);/* jshint ignore:line */
//# sourceMappingURL=OfflineStream.js.map
