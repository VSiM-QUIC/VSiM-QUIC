'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _OfflineEvents=require('./events/OfflineEvents');var _OfflineEvents2=_interopRequireDefault(_OfflineEvents);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}/**
 * @module OfflineStreamProcessor
 * @param {object} config configuration
 * @description Arrange downloading for each type
 */function OfflineStreamProcessor(config){config=config||{};var eventBus=config.eventBus;var events=config.events;var debug=config.debug;var constants=config.constants;var manifestId=config.id;var completedCb=config.callbacks&&config.callbacks.completed;var progressCb=config.callbacks&&config.callbacks.progression;var instance=void 0,adapter=void 0,logger=void 0,indexHandler=void 0,representationController=void 0,type=void 0,mimeType=void 0,fragmentModel=void 0,mediaInfo=void 0,bitrate=void 0,updating=void 0,offlineStoreController=void 0,downloadedSegments=void 0,isInitialized=void 0,isStopped=void 0,stream=void 0;function setConfig(config){if(!config)return;if(config.type){type=config.type;}if(config.stream){stream=config.stream;}if(config.mimeType){mimeType=config.mimeType;}if(config.adapter){adapter=config.adapter;}if(config.mediaInfo){mediaInfo=config.mediaInfo;}if(config.bitrate){bitrate=config.bitrate;}if(config.offlineStoreController){offlineStoreController=config.offlineStoreController;}}function setup(){resetInitialSettings();logger=debug.getLogger(instance);eventBus.on(events.STREAM_COMPLETED,onStreamCompleted,instance);eventBus.on(events.FRAGMENT_LOADING_COMPLETED,onFragmentLoadingCompleted,instance);}function isInitRequest(request){return request.type==='InitializationSegment';}function onFragmentLoadingCompleted(e){if(e.sender!==fragmentModel){return;}if(e.request!==null){var isInit=isInitRequest(e.request);var suffix=isInit?'init':e.request.index;var fragmentName=e.request.representationId+'_'+suffix;offlineStoreController.storeFragment(manifestId,fragmentName,e.response).then(function(){if(!isInit){// store current index and downloadedSegments number
offlineStoreController.setRepresentationCurrentState(manifestId,e.request.representationId,{index:e.request.index,downloaded:downloadedSegments});}});}if(e.error&&e.request.serviceLocation&&!isStopped){fragmentModel.executeRequest(e.request);}else{downloadedSegments++;download();}}function onStreamCompleted(e){if(e.fragmentModel!==fragmentModel){return;}logger.info('['+manifestId+'] Stream is complete');stop();completedCb();}function getRepresentationController(){return representationController;}function getRepresentationId(){return representationController.getCurrentRepresentation().id;}/**
     * Stops download of fragments
     * @memberof OfflineStreamProcessor#
     */function stop(){if(isStopped){return;}isStopped=true;}function initializeDownloader(){updateRepresentation(mediaInfo);}function setDashElements(handler,fragModel,repController){indexHandler=handler;indexHandler.initialize(false);fragmentModel=fragModel;representationController=repController;initializeDownloader();}/**
     * Initialization
     * @memberof OfflineStreamProcessor#
    */function initialize(){eventBus.trigger(_OfflineEvents2.default.DASH_ELEMENTS_CREATION_NEEDED,{sender:instance,config:{type:type,mimeType:mimeType,streamInfo:getStreamInfo()}});}function removeExecutedRequestsBeforeTime(time){if(fragmentModel){fragmentModel.removeExecutedRequestsBeforeTime(time);}}/**
     * Execute init request for the represenation
     * @memberof OfflineStreamProcessor#
    */function getInitRequest(){if(!representationController.getCurrentRepresentation()){return null;}return indexHandler.getInitRequest(getMediaInfo(),representationController.getCurrentRepresentation());}/**
     * Get next request
     * @memberof OfflineStreamProcessor#
    */function getNextRequest(){return indexHandler.getNextSegmentRequest(getMediaInfo(),representationController.getCurrentRepresentation());}/**
     * Start download
     * @memberof OfflineStreamProcessor#
    */function start(){if(representationController){if(!representationController.getCurrentRepresentation()){throw new Error('Start denied to OfflineStreamProcessor');}isStopped=false;offlineStoreController.getRepresentationCurrentState(manifestId,representationController.getCurrentRepresentation().id).then(function(state){if(state){indexHandler.setCurrentIndex(state.index);downloadedSegments=state.downloaded;}download();}).catch(function(){// start from beginining
download();});}}/**
     * Performs download of fragment according to type
     * @memberof OfflineStreamProcessor#
    */function download(){if(isStopped){return;}if(isNaN(representationController.getCurrentRepresentation())){var request=null;if(!isInitialized){request=getInitRequest();isInitialized=true;}else{request=getNextRequest();// update progression : done here because availableSegmentsNumber is done in getNextRequest from dash handler
updateProgression();}if(request){logger.info('['+manifestId+'] download request : '+request.url);fragmentModel.executeRequest(request);}else{logger.info('['+manifestId+'] no request to be downloaded');}}}/**
     * Update representation
     * @param {Object} mediaInfo - mediaInfo
     * @memberof OfflineStreamProcessor#
     */function updateRepresentation(mediaInfo){updating=true;var voRepresentations=adapter.getVoRepresentations(mediaInfo);// get representation VO according to id.
var quality=voRepresentations.findIndex(function(representation){return representation.id===bitrate.id;});if(type!==constants.VIDEO&&type!==constants.AUDIO&&type!==constants.TEXT&&type!==constants.FRAGMENTED_TEXT){updating=false;return;}representationController.updateData(null,voRepresentations,type,quality);}function getStreamInfo(){return stream?stream.getStreamInfo():null;}function isUpdating(){return updating;}function getType(){return type;}function getMediaInfo(){return mediaInfo;}function getAvailableSegmentsNumber(){return representationController.getCurrentRepresentation().availableSegmentsNumber+1;// do not forget init segment
}function updateProgression(){if(progressCb){progressCb(instance,downloadedSegments,getAvailableSegmentsNumber());}}function resetInitialSettings(){isInitialized=false;downloadedSegments=0;mimeType=null;mediaInfo=null;bitrate=null;updating=false;type=null;stream=null;}/**
     * Reset
     * @memberof OfflineStreamProcessor#
    */function reset(){resetInitialSettings();indexHandler.reset();eventBus.off(events.STREAM_COMPLETED,onStreamCompleted,instance);eventBus.off(events.FRAGMENT_LOADING_COMPLETED,onFragmentLoadingCompleted,instance);}instance={initialize:initialize,setConfig:setConfig,getStreamInfo:getStreamInfo,getMediaInfo:getMediaInfo,getRepresentationController:getRepresentationController,removeExecutedRequestsBeforeTime:removeExecutedRequestsBeforeTime,getType:getType,getRepresentationId:getRepresentationId,isUpdating:isUpdating,start:start,stop:stop,getAvailableSegmentsNumber:getAvailableSegmentsNumber,setDashElements:setDashElements,reset:reset};setup();return instance;}/**
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
 */OfflineStreamProcessor.__dashjs_factory_name='OfflineStreamProcessor';var factory=dashjs.FactoryMaker.getClassFactory(OfflineStreamProcessor);/* jshint ignore:line */exports.default=factory;
//# sourceMappingURL=OfflineStreamProcessor.js.map
