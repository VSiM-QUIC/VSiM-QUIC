'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _Constants=require('../constants/Constants');var _Constants2=_interopRequireDefault(_Constants);var _EventBus=require('../../core/EventBus');var _EventBus2=_interopRequireDefault(_EventBus);var _Events=require('../../core/events/Events');var _Events2=_interopRequireDefault(_Events);var _FactoryMaker=require('../../core/FactoryMaker');var _FactoryMaker2=_interopRequireDefault(_FactoryMaker);var _Debug=require('../../core/Debug');var _Debug2=_interopRequireDefault(_Debug);var _imsc=require('imsc');var _SupervisorTools=require('../utils/SupervisorTools');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function TextTracks(){var context=this.context;var eventBus=(0,_EventBus2.default)(context).getInstance();var instance=void 0,logger=void 0,Cue=void 0,videoModel=void 0,textTrackQueue=void 0,trackElementArr=void 0,currentTrackIdx=void 0,actualVideoLeft=void 0,actualVideoTop=void 0,actualVideoWidth=void 0,actualVideoHeight=void 0,captionContainer=void 0,videoSizeCheckInterval=void 0,fullscreenAttribute=void 0,displayCCOnTop=void 0,previousISDState=void 0,topZIndex=void 0;function setup(){logger=(0,_Debug2.default)(context).getInstance().getLogger(instance);}function initialize(){if(typeof window==='undefined'||typeof navigator==='undefined'){return;}Cue=window.VTTCue||window.TextTrackCue;textTrackQueue=[];trackElementArr=[];currentTrackIdx=-1;actualVideoLeft=0;actualVideoTop=0;actualVideoWidth=0;actualVideoHeight=0;captionContainer=null;videoSizeCheckInterval=null;displayCCOnTop=false;topZIndex=2147483647;previousISDState=null;if(document.fullscreenElement!==undefined){fullscreenAttribute='fullscreenElement';// Standard and Edge
}else if(document.webkitIsFullScreen!==undefined){fullscreenAttribute='webkitIsFullScreen';// Chrome and Safari (and Edge)
}else if(document.msFullscreenElement){// IE11
fullscreenAttribute='msFullscreenElement';}else if(document.mozFullScreen){// Firefox
fullscreenAttribute='mozFullScreen';}}function createTrackForUserAgent(i){var kind=textTrackQueue[i].kind;var label=textTrackQueue[i].id!==undefined?textTrackQueue[i].id:textTrackQueue[i].lang;var lang=textTrackQueue[i].lang;var isTTML=textTrackQueue[i].isTTML;var isEmbedded=textTrackQueue[i].isEmbedded;var track=videoModel.addTextTrack(kind,label,lang,isTTML,isEmbedded);return track;}function setDisplayCConTop(value){(0,_SupervisorTools.checkParameterType)(value,'boolean');displayCCOnTop=value;if(!captionContainer||document[fullscreenAttribute]){return;}captionContainer.style.zIndex=value?topZIndex:null;}function addTextTrack(textTrackInfoVO,totalTextTracks){if(textTrackQueue.length===totalTextTracks){logger.error('Trying to add too many tracks.');return;}textTrackQueue.push(textTrackInfoVO);if(textTrackQueue.length===totalTextTracks){textTrackQueue.sort(function(a,b){//Sort in same order as in manifest
return a.index-b.index;});captionContainer=videoModel.getTTMLRenderingDiv();var defaultIndex=-1;for(var i=0;i<textTrackQueue.length;i++){var track=createTrackForUserAgent.call(this,i);trackElementArr.push(track);//used to remove tracks from video element when added manually
if(textTrackQueue[i].defaultTrack){// track.default is an object property identifier that is a reserved word
// The following jshint directive is used to suppressed the warning "Expected an identifier and instead saw 'default' (a reserved word)"
/*jshint -W024 */track.default=true;defaultIndex=i;}var textTrack=getTrackByIdx(i);if(textTrack){//each time a track is created, its mode should be showing by default
//sometime, it's not on Chrome
textTrack.mode=_Constants2.default.TEXT_SHOWING;if(captionContainer&&(textTrackQueue[i].isTTML||textTrackQueue[i].isEmbedded)){textTrack.renderingType='html';}else{textTrack.renderingType='default';}}this.addCaptions(i,0,textTrackQueue[i].captionData);eventBus.trigger(_Events2.default.TEXT_TRACK_ADDED);}//set current track index in textTrackQueue array
setCurrentTrackIdx.call(this,defaultIndex);if(defaultIndex>=0){var onMetadataLoaded=function onMetadataLoaded(){var track=getTrackByIdx(defaultIndex);if(track){checkVideoSize.call(this,track,true);}eventBus.off(_Events2.default.PLAYBACK_METADATA_LOADED,onMetadataLoaded,this);};eventBus.on(_Events2.default.PLAYBACK_METADATA_LOADED,onMetadataLoaded,this);for(var idx=0;idx<textTrackQueue.length;idx++){var videoTextTrack=getTrackByIdx(idx);if(videoTextTrack){videoTextTrack.mode=idx===defaultIndex?_Constants2.default.TEXT_SHOWING:_Constants2.default.TEXT_HIDDEN;}}}eventBus.trigger(_Events2.default.TEXT_TRACKS_QUEUE_INITIALIZED,{index:currentTrackIdx,tracks:textTrackQueue});//send default idx.
}}function getVideoVisibleVideoSize(viewWidth,viewHeight,videoWidth,videoHeight,aspectRatio,use80Percent){var viewAspectRatio=viewWidth/viewHeight;var videoAspectRatio=videoWidth/videoHeight;var videoPictureWidth=0;var videoPictureHeight=0;if(viewAspectRatio>videoAspectRatio){videoPictureHeight=viewHeight;videoPictureWidth=videoPictureHeight/videoHeight*videoWidth;}else{videoPictureWidth=viewWidth;videoPictureHeight=videoPictureWidth/videoWidth*videoHeight;}var videoPictureXAspect=0;var videoPictureYAspect=0;var videoPictureWidthAspect=0;var videoPictureHeightAspect=0;var videoPictureAspect=videoPictureWidth/videoPictureHeight;if(videoPictureAspect>aspectRatio){videoPictureHeightAspect=videoPictureHeight;videoPictureWidthAspect=videoPictureHeight*aspectRatio;}else{videoPictureWidthAspect=videoPictureWidth;videoPictureHeightAspect=videoPictureWidth/aspectRatio;}videoPictureXAspect=(viewWidth-videoPictureWidthAspect)/2;videoPictureYAspect=(viewHeight-videoPictureHeightAspect)/2;if(use80Percent){return{x:videoPictureXAspect+videoPictureWidthAspect*0.1,y:videoPictureYAspect+videoPictureHeightAspect*0.1,w:videoPictureWidthAspect*0.8,h:videoPictureHeightAspect*0.8};/* Maximal picture size in videos aspect ratio */}else{return{x:videoPictureXAspect,y:videoPictureYAspect,w:videoPictureWidthAspect,h:videoPictureHeightAspect};/* Maximal picture size in videos aspect ratio */}}function checkVideoSize(track,forceDrawing){var clientWidth=videoModel.getClientWidth();var clientHeight=videoModel.getClientHeight();var videoWidth=videoModel.getVideoWidth();var videoHeight=videoModel.getVideoHeight();var videoOffsetTop=videoModel.getVideoRelativeOffsetTop();var videoOffsetLeft=videoModel.getVideoRelativeOffsetLeft();if(videoWidth!==0&&videoHeight!==0){var aspectRatio=videoWidth/videoHeight;var use80Percent=false;if(track.isFromCEA608){// If this is CEA608 then use predefined aspect ratio
aspectRatio=3.5/3.0;use80Percent=true;}var realVideoSize=getVideoVisibleVideoSize.call(this,clientWidth,clientHeight,videoWidth,videoHeight,aspectRatio,use80Percent);var newVideoWidth=realVideoSize.w;var newVideoHeight=realVideoSize.h;var newVideoLeft=realVideoSize.x;var newVideoTop=realVideoSize.y;if(newVideoWidth!=actualVideoWidth||newVideoHeight!=actualVideoHeight||newVideoLeft!=actualVideoLeft||newVideoTop!=actualVideoTop||forceDrawing){actualVideoLeft=newVideoLeft+videoOffsetLeft;actualVideoTop=newVideoTop+videoOffsetTop;actualVideoWidth=newVideoWidth;actualVideoHeight=newVideoHeight;if(captionContainer){var containerStyle=captionContainer.style;if(containerStyle){containerStyle.left=actualVideoLeft+'px';containerStyle.top=actualVideoTop+'px';containerStyle.width=actualVideoWidth+'px';containerStyle.height=actualVideoHeight+'px';containerStyle.zIndex=fullscreenAttribute&&document[fullscreenAttribute]||displayCCOnTop?topZIndex:null;eventBus.trigger(_Events2.default.CAPTION_CONTAINER_RESIZE,{});}}// Video view has changed size, so resize any active cues
var activeCues=track.activeCues;if(activeCues){var len=activeCues.length;for(var i=0;i<len;++i){var cue=activeCues[i];cue.scaleCue(cue);}}}}}function scaleCue(activeCue){var videoWidth=actualVideoWidth;var videoHeight=actualVideoHeight;var key=void 0,replaceValue=void 0,valueFontSize=void 0,valueLineHeight=void 0,elements=void 0;if(activeCue.cellResolution){var cellUnit=[videoWidth/activeCue.cellResolution[0],videoHeight/activeCue.cellResolution[1]];if(activeCue.linePadding){for(key in activeCue.linePadding){if(activeCue.linePadding.hasOwnProperty(key)){var valueLinePadding=activeCue.linePadding[key];replaceValue=(valueLinePadding*cellUnit[0]).toString();// Compute the CellResolution unit in order to process properties using sizing (fontSize, linePadding, etc).
var elementsSpan=document.getElementsByClassName('spanPadding');for(var i=0;i<elementsSpan.length;i++){elementsSpan[i].style.cssText=elementsSpan[i].style.cssText.replace(/(padding-left\s*:\s*)[\d.,]+(?=\s*px)/gi,'$1'+replaceValue);elementsSpan[i].style.cssText=elementsSpan[i].style.cssText.replace(/(padding-right\s*:\s*)[\d.,]+(?=\s*px)/gi,'$1'+replaceValue);}}}}if(activeCue.fontSize){for(key in activeCue.fontSize){if(activeCue.fontSize.hasOwnProperty(key)){if(activeCue.fontSize[key][0]==='%'){valueFontSize=activeCue.fontSize[key][1]/100;}else if(activeCue.fontSize[key][0]==='c'){valueFontSize=activeCue.fontSize[key][1];}replaceValue=(valueFontSize*cellUnit[1]).toString();if(key!=='defaultFontSize'){elements=document.getElementsByClassName(key);}else{elements=document.getElementsByClassName('paragraph');}for(var j=0;j<elements.length;j++){elements[j].style.cssText=elements[j].style.cssText.replace(/(font-size\s*:\s*)[\d.,]+(?=\s*px)/gi,'$1'+replaceValue);}}}if(activeCue.lineHeight){for(key in activeCue.lineHeight){if(activeCue.lineHeight.hasOwnProperty(key)){if(activeCue.lineHeight[key][0]==='%'){valueLineHeight=activeCue.lineHeight[key][1]/100;}else if(activeCue.fontSize[key][0]==='c'){valueLineHeight=activeCue.lineHeight[key][1];}replaceValue=(valueLineHeight*cellUnit[1]).toString();elements=document.getElementsByClassName(key);for(var k=0;k<elements.length;k++){elements[k].style.cssText=elements[k].style.cssText.replace(/(line-height\s*:\s*)[\d.,]+(?=\s*px)/gi,'$1'+replaceValue);}}}}}}if(activeCue.isd){var htmlCaptionDiv=document.getElementById(activeCue.cueID);if(htmlCaptionDiv){captionContainer.removeChild(htmlCaptionDiv);}renderCaption(activeCue);}}function renderCaption(cue){if(captionContainer){var finalCue=document.createElement('div');captionContainer.appendChild(finalCue);previousISDState=(0,_imsc.renderHTML)(cue.isd,finalCue,function(uri){var imsc1ImgUrnTester=/^(urn:)(mpeg:[a-z0-9][a-z0-9-]{0,31}:)(subs:)([0-9]+)$/;var smpteImgUrnTester=/^#(.*)$/;if(imsc1ImgUrnTester.test(uri)){var match=imsc1ImgUrnTester.exec(uri);var imageId=parseInt(match[4],10)-1;var imageData=btoa(cue.images[imageId]);var dataUrl='data:image/png;base64,'+imageData;return dataUrl;}else if(smpteImgUrnTester.test(uri)){var _match=smpteImgUrnTester.exec(uri);var _imageId=_match[1];var _dataUrl='data:image/png;base64,'+cue.embeddedImages[_imageId];return _dataUrl;}else{return null;}},captionContainer.clientHeight,captionContainer.clientWidth,false/*displayForcedOnlyMode*/,function(err){logger.info('renderCaption :',err);//TODO add ErrorHandler management
},previousISDState,true/*enableRollUp*/);finalCue.id=cue.cueID;eventBus.trigger(_Events2.default.CAPTION_RENDERED,{captionDiv:finalCue,currentTrackIdx:currentTrackIdx});}}/*
     * Add captions to track, store for later adding, or add captions added before
     */function addCaptions(trackIdx,timeOffset,captionData){var track=getTrackByIdx(trackIdx);var self=this;if(!track){return;}if(!Array.isArray(captionData)||captionData.length===0){return;}for(var item=0;item<captionData.length;item++){var cue=void 0;var currentItem=captionData[item];track.cellResolution=currentItem.cellResolution;track.isFromCEA608=currentItem.isFromCEA608;if(currentItem.type==='html'&&captionContainer){cue=new Cue(currentItem.start-timeOffset,currentItem.end-timeOffset,'');cue.cueHTMLElement=currentItem.cueHTMLElement;cue.isd=currentItem.isd;cue.images=currentItem.images;cue.embeddedImages=currentItem.embeddedImages;cue.cueID=currentItem.cueID;cue.scaleCue=scaleCue.bind(self);//useful parameters for cea608 subtitles, not for TTML one.
cue.cellResolution=currentItem.cellResolution;cue.lineHeight=currentItem.lineHeight;cue.linePadding=currentItem.linePadding;cue.fontSize=currentItem.fontSize;captionContainer.style.left=actualVideoLeft+'px';captionContainer.style.top=actualVideoTop+'px';captionContainer.style.width=actualVideoWidth+'px';captionContainer.style.height=actualVideoHeight+'px';cue.onenter=function(){if(track.mode===_Constants2.default.TEXT_SHOWING){if(this.isd){renderCaption(this);logger.debug('Cue enter id:'+this.cueID);}else{captionContainer.appendChild(this.cueHTMLElement);scaleCue.call(self,this);eventBus.trigger(_Events2.default.CAPTION_RENDERED,{captionDiv:this.cueHTMLElement,currentTrackIdx:currentTrackIdx});}}};cue.onexit=function(){if(captionContainer){var divs=captionContainer.childNodes;for(var i=0;i<divs.length;++i){if(divs[i].id===this.cueID){logger.debug('Cue exit id:'+divs[i].id);captionContainer.removeChild(divs[i]);--i;}}}};}else{if(currentItem.data){cue=new Cue(currentItem.start-timeOffset,currentItem.end-timeOffset,currentItem.data);if(currentItem.styles){if(currentItem.styles.align!==undefined&&'align'in cue){cue.align=currentItem.styles.align;}if(currentItem.styles.line!==undefined&&'line'in cue){cue.line=currentItem.styles.line;}if(currentItem.styles.position!==undefined&&'position'in cue){cue.position=currentItem.styles.position;}if(currentItem.styles.size!==undefined&&'size'in cue){cue.size=currentItem.styles.size;}}cue.onenter=function(){if(track.mode===_Constants2.default.TEXT_SHOWING){eventBus.trigger(_Events2.default.CAPTION_RENDERED,{currentTrackIdx:currentTrackIdx});}};}}try{if(cue){track.addCue(cue);}else{logger.error('impossible to display subtitles.');}}catch(e){// Edge crash, delete everything and start adding again
// @see https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/11979877/
deleteTrackCues(track);track.addCue(cue);throw e;}}}function getTrackByIdx(idx){return idx>=0&&textTrackQueue[idx]?videoModel.getTextTrack(textTrackQueue[idx].kind,textTrackQueue[idx].id,textTrackQueue[idx].lang,textTrackQueue[idx].isTTML,textTrackQueue[idx].isEmbedded):null;}function getCurrentTrackIdx(){return currentTrackIdx;}function getTrackIdxForId(trackId){var idx=-1;for(var i=0;i<textTrackQueue.length;i++){if(textTrackQueue[i].id===trackId){idx=i;break;}}return idx;}function setCurrentTrackIdx(idx){if(idx===currentTrackIdx){return;}currentTrackIdx=idx;var track=getTrackByIdx(currentTrackIdx);setCueStyleOnTrack.call(this,track);if(videoSizeCheckInterval){clearInterval(videoSizeCheckInterval);videoSizeCheckInterval=null;}if(track&&track.renderingType==='html'){checkVideoSize.call(this,track,true);videoSizeCheckInterval=setInterval(checkVideoSize.bind(this,track),500);}}function setCueStyleOnTrack(track){clearCaptionContainer.call(this);if(track){if(track.renderingType==='html'){setNativeCueStyle.call(this);}else{removeNativeCueStyle.call(this);}}else{removeNativeCueStyle.call(this);}}function cueInRange(cue,start,end){return(isNaN(start)||cue.startTime>=start)&&(isNaN(end)||cue.endTime<=end);}function deleteTrackCues(track,start,end){if(track.cues){var cues=track.cues;var lastIdx=cues.length-1;for(var r=lastIdx;r>=0;r--){if(cueInRange(cues[r],start,end)){track.removeCue(cues[r]);}}}}function deleteCuesFromTrackIdx(trackIdx,start,end){var track=getTrackByIdx(trackIdx);if(track){deleteTrackCues(track,start,end);}}function deleteAllTextTracks(){var ln=trackElementArr?trackElementArr.length:0;for(var i=0;i<ln;i++){var track=getTrackByIdx(i);if(track){deleteTrackCues.call(this,track);track.mode='disabled';}}trackElementArr=[];textTrackQueue=[];if(videoSizeCheckInterval){clearInterval(videoSizeCheckInterval);videoSizeCheckInterval=null;}currentTrackIdx=-1;clearCaptionContainer.call(this);}function deleteTextTrack(idx){videoModel.removeChild(trackElementArr[idx]);trackElementArr.splice(idx,1);}/* Set native cue style to transparent background to avoid it being displayed. */function setNativeCueStyle(){var styleElement=document.getElementById('native-cue-style');if(styleElement){return;//Already set
}styleElement=document.createElement('style');styleElement.id='native-cue-style';document.head.appendChild(styleElement);var stylesheet=styleElement.sheet;var video=videoModel.getElement();try{if(video){if(video.id){stylesheet.insertRule('#'+video.id+'::cue {background: transparent}',0);}else if(video.classList.length!==0){stylesheet.insertRule('.'+video.className+'::cue {background: transparent}',0);}else{stylesheet.insertRule('video::cue {background: transparent}',0);}}}catch(e){logger.info(''+e.message);}}/* Remove the extra cue style with transparent background for native cues. */function removeNativeCueStyle(){var styleElement=document.getElementById('native-cue-style');if(styleElement){document.head.removeChild(styleElement);}}function clearCaptionContainer(){if(captionContainer){while(captionContainer.firstChild){captionContainer.removeChild(captionContainer.firstChild);}}}function setConfig(config){if(!config){return;}if(config.videoModel){videoModel=config.videoModel;}}function setModeForTrackIdx(idx,mode){var track=getTrackByIdx(idx);if(track&&track.mode!==mode){track.mode=mode;}}function getCurrentTrackInfo(){return textTrackQueue[currentTrackIdx];}instance={initialize:initialize,setDisplayCConTop:setDisplayCConTop,addTextTrack:addTextTrack,addCaptions:addCaptions,getCurrentTrackIdx:getCurrentTrackIdx,setCurrentTrackIdx:setCurrentTrackIdx,getTrackIdxForId:getTrackIdxForId,getCurrentTrackInfo:getCurrentTrackInfo,setModeForTrackIdx:setModeForTrackIdx,deleteCuesFromTrackIdx:deleteCuesFromTrackIdx,deleteAllTextTracks:deleteAllTextTracks,deleteTextTrack:deleteTextTrack,setConfig:setConfig};setup();return instance;}/**
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
 */TextTracks.__dashjs_factory_name='TextTracks';exports.default=_FactoryMaker2.default.getSingletonFactory(TextTracks);
//# sourceMappingURL=TextTracks.js.map
