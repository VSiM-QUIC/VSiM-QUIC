'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _EventsBase2=require('./../../core/events/EventsBase');var _EventsBase3=_interopRequireDefault(_EventsBase2);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}/**
 * These are offline events that should be sent to the player level.
 * @class
 * @ignore
 */var OfflineEvents=function(_EventsBase){_inherits(OfflineEvents,_EventsBase);function OfflineEvents(){_classCallCheck(this,OfflineEvents);var _this=_possibleConstructorReturn(this,(OfflineEvents.__proto__||Object.getPrototypeOf(OfflineEvents)).call(this));_this.DOWNLOADING_PAUSED='downloadingPaused';/**
         * Triggered when all mediaInfo has been loaded on OfflineStream
         * Return a list of available bitrateInfo needed to download stream.
         */_this.DOWNLOADABLE_REPRESENTATIONS_LOADED='public_downloadableRepresentationsInfoLoaded';_this.DASH_ELEMENTS_CREATION_NEEDED='dashElementsCreationNeeded';/** Triggered when the downloading is initialize and started
        * @event OfflineEvents#DOWNLOADING_STOPPED
        */_this.DOWNLOADING_STARTED='public_downloadingStarted';/**
        * Triggered when the user stop current downloading
        * @event OfflineEvents#DOWNLOADING_STOPPED
        */_this.DOWNLOADING_STOPPED='public_downloadingStopped';/**
        * Triggered when all fragments has been downloaded
        * @event OfflineEvents#DOWNLOADING_FINISHED
        */_this.DOWNLOADING_FINISHED='public_downloadingFinished';return _this;}return OfflineEvents;}(_EventsBase3.default);var offlineEvents=new OfflineEvents();exports.default=offlineEvents;
//# sourceMappingURL=OfflineEvents.js.map
