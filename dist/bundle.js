(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["CanvasUtil"] = factory();
	else
		root["CanvasUtil"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: getCanvasInstance */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getCanvasInstance\", function() { return getCanvasInstance; });\n/* harmony import */ var _js_util_Canvasutil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/util/Canvasutil */ \"./src/js/util/Canvasutil.js\");\n\n\nfunction getCanvasInstance(canvas) {\n\treturn new _js_util_Canvasutil__WEBPACK_IMPORTED_MODULE_0__[\"default\"](canvas);\n}\n\n\n//# sourceURL=webpack://CanvasUtil/./src/index.js?");

/***/ }),

/***/ "./src/js/util/Canvasutil.js":
/*!***********************************!*\
  !*** ./src/js/util/Canvasutil.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return CanvasUtil; });\nclass CanvasUtil {\n\tconstructor(canvas) {\n\t\tif (!canvas) throw new Error(\"INVALID CANVAS\");\n\t\tthis.canvas = canvas;\n\t\tconst canvasRect = this.canvas.getBoundingClientRect();\n\t\tthis.canvasCoord = { x: canvasRect.left, y: canvasRect.top };\n\n\t\tthis.context = canvas.getContext(\"2d\");\n\t\tthis.canvasWidth = canvas.width;\n\t\tthis.canvasHeight = canvas.height;\n\n\t\t//Mouse util function\n\t\tthis.mouseInfo = { px: 0, py: 0, x: 0, y: 0, up: true };\n\t\tthis.MOUSE_EVENTS = { MOVE: \"MOVE\" };\n\t\tthis.eventSubMap = {};\n\t\tthis.startMouseEvent();\n\n\t\t//for the loop function\n\t\tthis.ANIMATE_EVENTS = { START: \"START\", UPDATE: \"UPDATE\" };\n\t\tthis.startUpdateLoop();\n\t}\n\n\tstartUpdateLoop() {\n\t\t// this.publishEvents(this.ANIMATE_EVENTS.START, {});\n\t\tsetInterval(() => {\n\t\t\tthis.publishEvents(this.ANIMATE_EVENTS.UPDATE, this);\n\t\t}, 10);\n\t}\n\n\tupdate(handler) {\n\t\tthis.subscribeEvents(this.ANIMATE_EVENTS.UPDATE, handler);\n\t}\n\n\tstartMouseEvent() {\n\t\tdocument.addEventListener(\"mousemove\", (event) => {\n\t\t\tthis.updateMouseCorrds(event);\n\t\t\tthis.publishEvents(this.MOUSE_EVENTS.MOVE, this.mouseInfo);\n\t\t});\n\n\t\tdocument.addEventListener(\"mousedown\", () => {\n\t\t\tthis.mouseInfo.up = false;\n\t\t});\n\n\t\tdocument.addEventListener(\"mouseup\", () => {\n\t\t\tthis.mouseInfo.up = true;\n\t\t});\n\t}\n\n\tonMouseMove(handler) {\n\t\tthis.subscribeEvents(this.MOUSE_EVENTS.MOVE, handler);\n\t}\n\n\tsubscribeEvents(event, handler) {\n\t\tthis.eventSubMap[event] = this.eventSubMap[event] || [];\n\t\tthis.eventSubMap[event].push(handler);\n\t}\n\n\tpublishEvents(event, data) {\n\t\tthis.eventSubMap[event] = this.eventSubMap[event] || [];\n\t\tthis.eventSubMap[event].map((handler) => handler(data));\n\t}\n\n\tupdateMouseCorrds(event) {\n\t\tconst { clientX, clientY } = event;\n\t\tthis.mouseInfo.px = this.mouseInfo.x;\n\t\tthis.mouseInfo.py = this.mouseInfo.y;\n\t\tthis.mouseInfo.x = clientX - this.canvasCoord.x;\n\t\tthis.mouseInfo.y = clientY - this.canvasCoord.y;\n\t}\n\n\trect(x, y, w, h) {\n\t\tthis.context.fillRect(x, y, w, h);\n\t\tthis.context.strokeRect(x, y, w, h);\n\t}\n\n\tstroke(r, g, b, a = 1) {\n\t\tthis.context.stroke();\n\t\tthis.context.strokeStyle = `rgba(${r},${g},${b},${a})`;\n\t}\n\n\tfill(r, g, b, a = 1) {\n\t\tthis.context.fill();\n\t\tthis.context.fillStyle = `rgb(${r}, ${g}, ${b}, ${a})`;\n\t}\n\n\tbackground(r, g, b, a = 1) {\n\t\tthis.fill(r, g, b, a);\n\t\tthis.stroke(r, g, b, a);\n\t\tthis.rect(0, 0, this.canvasWidth, this.canvasHeight);\n\t}\n\n\tdot(x, y, weight = 5) {\n\t\tthis.circle(x, y, weight);\n\t}\n\n\tcircle(x, y, r) {\n\t\tthis.context.beginPath();\n\t\tthis.context.arc(x, y, r, 0, 2 * Math.PI);\n\t}\n\n\tline(prevx, prevy, curx, cury, strokeSize = 1) {\n\t\tthis.context.lineCap = \"round\";\n\t\tthis.context.lineWidth = strokeSize;\n\t\tthis.context.beginPath();\n\t\tthis.context.moveTo(prevx, prevy);\n\t\tthis.context.lineTo(curx, cury);\n\t\tthis.context.stroke();\n\t}\n\n\t/**\n\t * \tsetScale(canvas, pixelRatio) {\n\t\tcanvas.width = canvas.clientWidth * pixelRatio;\n\t\tcanvas.height = canvas.clientHeight * pixelRatio;\n\t\tcanvas.getContext(\"2d\").scale(pixelRatio,\n\t\tpixelRatio);\n\t\tconst scale = window.devicePixelRatio;\n\t\tconsole.log(scale);\n\t\tcanvas.width = Math.floor(300 * scale);\n\t\tcanvas.height = Math.floor(300 * scale);\n\t\tconst ctx = canvas.getContext(\"2d\");\n\t\tctx.scale(scale, scale);\n\t}\n\t *\n\t */\n}\n\n\n//# sourceURL=webpack://CanvasUtil/./src/js/util/Canvasutil.js?");

/***/ })

/******/ });
});