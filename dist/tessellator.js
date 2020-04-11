/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/is-odd/index.js":
/*!**************************************!*\
  !*** ./node_modules/is-odd/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/*!\n * is-odd <https://github.com/jonschlinkert/is-odd>\n *\n * Copyright (c) 2015-2017, Jon Schlinkert.\n * Released under the MIT License.\n */\n\n\n\nconst isNumber = __webpack_require__(/*! is-number */ \"./node_modules/is-odd/node_modules/is-number/index.js\");\n\nmodule.exports = function isOdd(value) {\n  const n = Math.abs(value);\n  if (!isNumber(n)) {\n    throw new TypeError('expected a number');\n  }\n  if (!Number.isInteger(n)) {\n    throw new Error('expected an integer');\n  }\n  if (!Number.isSafeInteger(n)) {\n    throw new Error('value exceeds maximum safe integer');\n  }\n  return (n % 2) === 1;\n};\n\n\n\n//# sourceURL=webpack:///./node_modules/is-odd/index.js?");

/***/ }),

/***/ "./node_modules/is-odd/node_modules/is-number/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/is-odd/node_modules/is-number/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/*!\n * is-number <https://github.com/jonschlinkert/is-number>\n *\n * Copyright (c) 2014-2018, Jon Schlinkert.\n * Released under the MIT License.\n */\n\n\n\nmodule.exports = function isNumber(num) {\n  var number = +num;\n\n  if ((number - number) !== 0) {\n    // Discard Infinity and NaN\n    return false;\n  }\n\n  if (number === num) {\n    return true;\n  }\n\n  if (typeof num === 'string') {\n    // String parsed, both a non-empty whitespace string and an empty string\n    // will have been coerced to 0. If 0 trim the string and see if its empty.\n    if (number === 0 && num.trim() === '') {\n      return false;\n    }\n    return true;\n  }\n  return false;\n};\n\n\n//# sourceURL=webpack:///./node_modules/is-odd/node_modules/is-number/index.js?");

/***/ }),

/***/ "./src/color.js":
/*!**********************!*\
  !*** ./src/color.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Color; });\nclass Color {\r\n  constructor (...[vals]) {\r\n    this.vals = vals.map(x => Math.round(x));\r\n  }\r\n\r\n  get r() { return this.vals[0]; }\r\n  get g() { return this.vals[1]; }\r\n  get b() { return this.vals[2]; }\r\n  toString() {\r\n    return `rgb(${this.r},${this.g},${this.b})`;\r\n  }\r\n\r\n  //returns average color from ImageData\r\n  static fromImageData(imgData) {\r\n    let arr = imgData.data;\r\n\r\n    let rgb = [0,0,0];\r\n    let count = 0;\r\n    for (let i = 0; i < arr.length; i += 4) {\r\n      count++;\r\n      rgb[0] += arr[i];\r\n      rgb[1] += arr[i+1];\r\n      rgb[2] += arr[i+2];\r\n    }\r\n\r\n    return new Color(rgb.map(x => x/count));\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/color.js?");

/***/ }),

/***/ "./src/heap.js":
/*!*********************!*\
  !*** ./src/heap.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return BinaryHeap; });\n// https://eloquentjavascript.net/1st_edition/appendix2.html\r\nclass BinaryHeap {\r\n  constructor(scoreFunction) {\r\n    this.content = [];\r\n    this.scoreFunction = scoreFunction;\r\n  }\r\n\r\n  push(element) {\r\n    // Add the new element to the end of the array.\r\n    this.content.push(element);\r\n    // Allow it to bubble up.\r\n    this.bubbleUp(this.content.length - 1);\r\n  }\r\n\r\n  pop() {\r\n    // Store the first element so we can return it later.\r\n    var result = this.content[0];\r\n    // Get the element at the end of the array.\r\n    var end = this.content.pop();\r\n    // If there are any elements left, put the end element at the\r\n    // start, and let it sink down.\r\n    if (this.content.length > 0) {\r\n      this.content[0] = end;\r\n      this.sinkDown(0);\r\n    }\r\n    return result;\r\n  }\r\n\r\n  remove(node) {\r\n    var length = this.content.length;\r\n    // To remove a value, we must search through the array to find\r\n    // it.\r\n    for (var i = 0; i < length; i++) {\r\n      if (this.content[i] != node) continue;\r\n      // When it is found, the process seen in 'pop' is repeated\r\n      // to fill up the hole.\r\n      var end = this.content.pop();\r\n      // If the element we popped was the one we needed to remove,\r\n      // we're done.\r\n      if (i == length - 1) break;\r\n      // Otherwise, we replace the removed element with the popped\r\n      // one, and allow it to float up or sink down as appropriate.\r\n      this.content[i] = end;\r\n      this.bubbleUp(i);\r\n      this.sinkDown(i);\r\n      break;\r\n    }\r\n  }\r\n\r\n  size() {\r\n    return this.content.length;\r\n  }\r\n\r\n  bubbleUp(n) {\r\n    // Fetch the element that has to be moved.\r\n    var element = this.content[n], score = this.scoreFunction(element);\r\n    // When at 0, an element can not go up any further.\r\n    while (n > 0) {\r\n      // Compute the parent element's index, and fetch it.\r\n      var parentN = Math.floor((n + 1) / 2) - 1,\r\n      parent = this.content[parentN];\r\n      // If the parent has a greater score, things are in order and we\r\n      // are done.\r\n      if (score < this.scoreFunction(parent))\r\n        break;\r\n  \r\n      // Otherwise, swap the parent with the current element and\r\n      // continue.\r\n      this.content[parentN] = element;\r\n      this.content[n] = parent;\r\n      n = parentN;\r\n    }\r\n  }\r\n\r\n  sinkDown(n) {\r\n    // Look up the target element and its score.\r\n    var length = this.content.length,\r\n    element = this.content[n],\r\n    elemScore = this.scoreFunction(element);\r\n\r\n    while(true) {\r\n      // Compute the indices of the child elements.\r\n      var child2N = (n + 1) * 2, child1N = child2N - 1;\r\n      // This is used to store the new position of the element,\r\n      // if any.\r\n      var swap = null;\r\n      // If the first child exists (is inside the array)...\r\n      if (child1N < length) {\r\n        // Look it up and compute its score.\r\n        var child1 = this.content[child1N],\r\n        child1Score = this.scoreFunction(child1);\r\n        // If the score is greater than our element's, we need to swap.\r\n        if (child1Score >= elemScore)\r\n          swap = child1N;\r\n      }\r\n      // Do the same checks for the other child.\r\n      if (child2N < length) {\r\n        var child2 = this.content[child2N],\r\n        child2Score = this.scoreFunction(child2);\r\n        if (child2Score >= (swap == null ? elemScore : child1Score))\r\n          swap = child2N;\r\n      }\r\n\r\n      // No need to swap further, we are done.\r\n      if (swap == null) break;\r\n\r\n      // Otherwise, swap and continue.\r\n      this.content[n] = this.content[swap];\r\n      this.content[swap] = element;\r\n      n = swap;\r\n    }\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/heap.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return ImageTessellator; });\n/* harmony import */ var _heap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./heap */ \"./src/heap.js\");\n/* harmony import */ var _screensplit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./screensplit */ \"./src/screensplit.js\");\n/* harmony import */ var _color__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./color */ \"./src/color.js\");\n\r\n\r\n\r\n\r\nconst isOdd = __webpack_require__(/*! is-odd */ \"./node_modules/is-odd/index.js\")\r\nclass ImageTessellator {\r\n\r\n  static get FitOptions() {\r\n    return {\r\n      FIT: 0,      // largest possible size while still fitting inside canvas\r\n      FILL: 1,     // fill canvas completely while keeping aspect ratio\r\n      SAME: 2,     // draw at original image size\r\n      STRETCH: 3,  // stretch to canvas dimensions\r\n    }\r\n  }\r\n\r\n  static get TraversalOptions() {\r\n    return {\r\n      LARGEST_FIRST: 0,\r\n      IN_ORDER: 1,\r\n      RANDOM_ORDER: 2,\r\n    }\r\n  }\r\n\r\n  static get SplitOptions() {\r\n    return {\r\n      HALVE: 0,\r\n      SIERPINSKI: 1,\r\n      CENTROID: 2,\r\n    }\r\n  }\r\n\r\n  static get defaultOptions() {\r\n    return {\r\n      imgSampleRatio: .01, // 0 to 1. smaller value means less color accuracy but faster processing\r\n\r\n      fitMethod: ImageTessellator.FitOptions.FIT,\r\n      \r\n      traversalMode: ImageTessellator.TraversalOptions.LARGEST_FIRST,\r\n\r\n      splitMode: ImageTessellator.SplitOptions.HALVE,\r\n      \r\n      loadCallback: null,\r\n      \r\n      backgroundColor: \"#555\",\r\n      strokeColor: \"#555\",\r\n      //TODO: no stroke option\r\n\r\n      minColorArea: 50,\r\n      itersPerTick: 200,\r\n      areaPerTick: 10000,\r\n      tickMinDuration: 0,\r\n\r\n      renderImgPieces: false, //set to true to draw pieces of the actual image when triangles are tiny\r\n\r\n      //fade can only happen if renderImgPieces is false\r\n      doFadeAfter: false,\r\n      fadeDelay: 500, //in ms\r\n    }\r\n  }\r\n\r\n  constructor(canvas, image, options) {\r\n    console.log(\"odd\", isOdd(1))\r\n    this.canvas = canvas;\r\n    this.ctx = this.canvas.getContext(\"2d\");\r\n    this.tessellatingComplete = false;\r\n    this.done = false;\r\n    this.options = {};\r\n    for (let key in ImageTessellator.defaultOptions) {\r\n      if (options.hasOwnProperty(key)) this.options[key] = options[key];\r\n      else this.options[key] = ImageTessellator.defaultOptions[key];\r\n    }\r\n\r\n    if (typeof image == \"string\") {\r\n      let src = image;\r\n      image = new Image()\r\n      image.src = src;\r\n    }\r\n    image.crossOrigin = \"Anonymous\";\r\n    this.imgLoaded = image.complete\r\n\r\n    this.tempCanvas = new OffscreenCanvas(1, 1);\r\n    this.tempCtx = this.tempCanvas.getContext(\"2d\");\r\n    \r\n    // init triangles collection\r\n    switch (this.options.traversalMode) {\r\n      case ImageTessellator.TraversalOptions.RANDOM_ORDER:\r\n        this.triangles = new _heap__WEBPACK_IMPORTED_MODULE_0__[\"default\"](() => Math.random());\r\n        break;\r\n      case ImageTessellator.TraversalOptions.LARGEST_FIRST:\r\n        this.triangles = new _heap__WEBPACK_IMPORTED_MODULE_0__[\"default\"](triangle => triangle.area2);\r\n        break;\r\n      case ImageTessellator.TraversalOptions.IN_ORDER:\r\n        this.triangles = [];\r\n        break;\r\n    }\r\n\r\n    if (this.imgLoaded) setTimeout(this.imgAfterLoad(image), 0);\r\n    else image.addEventListener(\"load\", e => this.imgAfterLoad(e.target))\r\n  }\r\n\r\n  imgAfterLoad(img) {\r\n    // setup canvas, imgCanvas, and pieceCanvas\r\n    this.imgLoaded = true;\r\n    let cw = this.canvas.clientWidth;\r\n    let ch = this.canvas.clientHeight;\r\n    this.canvas.width = cw;\r\n    this.canvas.height = ch;\r\n\r\n    this.tempCanvas.width = cw;\r\n    this.tempCanvas.height = ch;\r\n\r\n    this.imgCanvas = new OffscreenCanvas(cw, ch);\r\n    this.imgCtx = this.imgCanvas.getContext(\"2d\");\r\n    this.imgCtx.fillStyle = this.options.backgroundColor;\r\n    this.imgCtx.fillRect(0, 0, cw, ch);\r\n\r\n    let box = this.placeImage(this.imgCtx, img, this.options.fitMethod);\r\n    this.addPrimerTriangles(box);\r\n    \r\n    if (this.options.renderImgPieces) {\r\n      this.pieceCanvas = new OffscreenCanvas(cw, ch);\r\n      this.pieceCtx = this.pieceCanvas.getContext(\"2d\");\r\n    }\r\n\r\n    let onload = this.options.loadCallback\r\n    if (typeof onload == \"function\") onload();\r\n    if (typeof onload == \"string\") this[onload]();\r\n  }\r\n\r\n  /**\r\n   * \r\n   * @param {CanvasRenderingContext2D} context \r\n   * @param {CanvasImageSource} img \r\n   * @param {number} fitMethod \r\n   * @returns {{x:number, y:number, w:number, h:number}} \r\n   *    rectangle representing image position on canvas \r\n   */\r\n  placeImage(context, img, fitMethod) {\r\n    context.save();\r\n    let imgw = img.width;\r\n    let imgh = img.height;\r\n    let cw = context.canvas.width;\r\n    let ch = context.canvas.height;\r\n\r\n    if (fitMethod == ImageTessellator.FitOptions.SAME) {\r\n      let x = Math.round((cw-imgw)/2);\r\n      let y = Math.round((ch-imgh)/2);\r\n      context.drawImage(img, x, y);\r\n      return { x, y, w: imgw, h: imgh };\r\n    }\r\n\r\n    if (fitMethod == ImageTessellator.FitOptions.STRETCH) {\r\n      context.drawImage(img, 0, 0, imgw, imgh, 0, 0, cw, ch);\r\n      return { x: 0, y: 0, w: cw, h: ch };\r\n    }\r\n\r\n    let aspectRatio = imgw / imgh;\r\n    let canvasRatio = cw / ch;\r\n    let w = cw;\r\n    let h = ch;\r\n  \r\n    if (fitMethod == ImageTessellator.FitOptions.FIT) {\r\n      if (canvasRatio > aspectRatio) w = Math.round(h * aspectRatio);\r\n      else h = Math.round(w / aspectRatio);\r\n    }\r\n    \r\n    else if (fitMethod == ImageTessellator.FitOptions.FILL) {\r\n      if (canvasRatio > aspectRatio) h = Math.round(w / aspectRatio);\r\n      else w = Math.round(h * aspectRatio);\r\n    }\r\n  \r\n    let cbox = { x: Math.round((cw-w)/2), y: Math.round((ch-h)/2), w, h }\r\n    context.drawImage(img,\r\n      0, 0, imgw, imgh,\r\n      cbox.x, cbox.y, cbox.w, cbox.h\r\n    );\r\n\r\n    return cbox;\r\n  }\r\n\r\n  addPrimerTriangles(box) {\r\n    if (!this.imgLoaded) throw new Error(\"Tried to add priming triangles before image was loaded.\");\r\n    //TODO: if desired, black bars from fit/same should removed at this stage.\r\n    let splitter = new _screensplit__WEBPACK_IMPORTED_MODULE_1__[\"default\"](box.x, box.y, box.w, box.h);\r\n    let firstTriangles = splitter.randomSplit();\r\n    firstTriangles.forEach(tri => this.triangles.push(tri));\r\n  }\r\n\r\n  /**\r\n   * Checks if a triangle should be represented by a solid color\r\n   * @param {Triangle} triangle \r\n   * @returns true if the triangle should be drawn as a solid color\r\n   */\r\n  isRenderable(triangle) {\r\n    return triangle.area > this.options.minColorArea;\r\n  }\r\n\r\n  /**\r\n   * Finds the color for which the given triangle should be drawn \r\n   * @param {Triangle} triangle \r\n   */\r\n  getTriangleColor(triangle) {\r\n    if (!this.imgLoaded) throw new Error(\"Tried to calculate color before image was loaded.\");\r\n    let box = triangle.boundingBox;\r\n    let { x, y, w, h } = box;\r\n    x = Math.floor(x);\r\n    y = Math.floor(y);\r\n    w = Math.ceil(w);\r\n    h = Math.ceil(h);\r\n    if (w < 1) w = 1;\r\n    if (h < 1) h = 1;\r\n    let sampleW = Math.ceil(w * this.options.imgSampleRatio)\r\n    let sampleH = Math.ceil(h * this.options.imgSampleRatio)\r\n\r\n    this.tempCtx.fillStyle = this.options.backgroundColor;\r\n\r\n    this.tempCtx.drawImage(this.imgCanvas, x, y, w, h, 0, 0, sampleW, sampleH);\r\n    let imgData = this.tempCtx.getImageData(0, 0, sampleW, sampleH)\r\n    return _color__WEBPACK_IMPORTED_MODULE_2__[\"default\"].fromImageData(imgData);\r\n  }\r\n\r\n  /**\r\n   * Takes the intersection of the triangles drawn to pieceCanvas and\r\n   * the actual image and flushes them to the main canvas\r\n   */\r\n  flushImagePieces() {\r\n    this.pieceCtx.save();\r\n    this.pieceCtx.globalCompositeOperation = \"source-in\";\r\n    this.pieceCtx.drawImage(this.imgCanvas, 0, 0, this.pieceCanvas.width, this.pieceCanvas.height);\r\n    this.pieceCtx.restore();\r\n    this.ctx.drawImage(this.pieceCanvas, 0, 0);\r\n  }\r\n\r\n  playAnimation() {\r\n    window.cancelAnimationFrame(this.currentRafId);\r\n    this.lastTick = 0;\r\n    window.requestAnimationFrame(t => this.animate(t));\r\n  }\r\n\r\n  pauseAnimation() {\r\n    window.cancelAnimationFrame(this.currentRafId);\r\n  }\r\n\r\n  animate(t) {\r\n    if (this.tessellatingComplete) return;\r\n\r\n    if (t - this.lastTick > this.options.tickMinDuration) {\r\n      this.lastTick = t;\r\n      this.tick();\r\n    }\r\n\r\n    this.currentRafId = window.requestAnimationFrame(t => this.animate(t));\r\n  }\r\n\r\n  tick() {\r\n    let flushPieces = false;\r\n    let iters = 0;\r\n    let area = 0;\r\n    while (true) {\r\n      let triangle = this.processOne();\r\n      if (this.tessellatingComplete) break;\r\n  \r\n      //non-renderables only count if we render pieces\r\n      if (this.isRenderable(triangle)) {\r\n        iters++;\r\n        area += triangle.area;\r\n      } else if (this.options.renderImgPieces) {\r\n        flushPieces = true;\r\n        iters++;\r\n        area += triangle.area;\r\n      }\r\n      \r\n      if (iters >= this.options.itersPerTick) break;\r\n      if (area >= this.options.areaPerTick) break;\r\n    }\r\n  \r\n    // console.log(area, iters);\r\n  \r\n    if (this.options.renderImgPieces && flushPieces) this.flushImagePieces();\r\n  \r\n    if (this.tessellatingComplete) {\r\n      if (this.options.renderImgPieces) {\r\n        this.ctx.drawImage(this.imgCanvas, 0, 0, this.canvas.width, this.canvas.height);\r\n        this.done = true;\r\n      }\r\n      if (!this.options.doFadeAfter) this.done = true;\r\n      else this.beginFade();\r\n      return;\r\n    }\r\n  }\r\n\r\n  /**\r\n   * Processes and draws one triangle. If there are no triangles left, the tessellatingComplete flag is set.\r\n   */\r\n  processOne() {\r\n    let triangle = this.options.traversalMode == ImageTessellator.TraversalOptions.IN_ORDER \r\n      ? this.triangles.shift()\r\n      : this.triangles.pop()\r\n    ;\r\n    if (triangle == null) {\r\n      this.tessellatingComplete = true;\r\n      return null;\r\n    }\r\n    \r\n    let subs = this.getSubTriangles(triangle, this.options.splitMode);\r\n    if (this.isRenderable(triangle)) {\r\n      for (let sub of subs) {\r\n        sub.draw(this.ctx, this.getTriangleColor(sub), this.options.strokeColor);\r\n        this.triangles.push(sub)\r\n      }\r\n    } else if (this.options.renderImgPieces) { //dispose img-triangle intersection to piece canvas\r\n      triangle.draw(this.pieceCtx);\r\n    }\r\n\r\n    return triangle;\r\n  }\r\n\r\n  getSubTriangles(triangle, splitMode) {\r\n    switch (splitMode) {\r\n      case ImageTessellator.SplitOptions.HALVE:\r\n        return triangle.getHalves();\r\n      case ImageTessellator.SplitOptions.SIERPINSKI:\r\n        return triangle.getSubSierpinksis();\r\n      case ImageTessellator.SplitOptions.CENTROID:\r\n        return triangle.getCentroidSubs();\r\n    }\r\n    return [];\r\n  }\r\n\r\n  beginFade() {\r\n    // reuse tempCanvas to store current state\r\n    this.tempCtx.fillStyle = this.options.backgroundColor;\r\n    this.tempCtx.fillRect(0, 0, this.canvas.width, this.canvas.height)\r\n\r\n    this.tempCtx.drawImage(this.canvas, 0, 0);\r\n\r\n    this.fadeAlpha = 0;\r\n    requestAnimationFrame(() => this.fadeToImg());\r\n  }\r\n  \r\n  fadeToImg() {\r\n    this.ctx.globalAlpha = 1;\r\n    this.ctx.drawImage(this.tempCanvas, 0, 0);\r\n\r\n    this.ctx.globalAlpha = this.fadeAlpha += .01;\r\n    this.ctx.drawImage(this.imgCanvas, 0, 0, this.canvas.width, this.canvas.height);\r\n    \r\n    if (this.fadeAlpha < 1) requestAnimationFrame(() => this.fadeToImg());\r\n  }\r\n\r\n}\r\n\r\nif (!window.OffscreenCanvas) {\r\n  window.OffscreenCanvas = class OffscreenCanvas {\r\n    constructor(width, height) {\r\n      let canvas = document.createElement(\"canvas\");\r\n      canvas.width = width;\r\n      canvas.height = height;\r\n      return canvas;\r\n    }\r\n  };\r\n}\r\n\r\nwindow.ImageTessellator = ImageTessellator;\r\n\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ }),

/***/ "./src/mathhelp.js":
/*!*************************!*\
  !*** ./src/mathhelp.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return MathHelp; });\n\r\nclass MathHelp {\r\n  static lerp(a, b, frac) {\r\n    return (a * frac) + (b * (1-frac))\r\n  }\r\n\r\n  static randFloat(a, b) {\r\n    let rng = b-a;\r\n    return (Math.random() * rng) + a\r\n  }\r\n\r\n  static randInt(a, b) {\r\n    let rng = b-a;\r\n    return Math.floor(Math.random() * rng) + a\r\n  }\r\n\r\n  static compareInts(a, b) { return a-b }\r\n  \r\n  static randNearHalf() {\r\n    return Math.round(MathHelp.randFloat(.4,.6) * 100) / 100\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/mathhelp.js?");

/***/ }),

/***/ "./src/point.js":
/*!**********************!*\
  !*** ./src/point.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Point; });\n/* harmony import */ var _mathhelp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mathhelp */ \"./src/mathhelp.js\");\n\r\nclass Point {\r\n  constructor(x, y) {\r\n    if (x == null) x = 0;\r\n    if (y == null) y = 0;\r\n    this.vals = [x, y];\r\n  }\r\n  \r\n  get x() { return this.vals[0]; }\r\n  get y() { return this.vals[1]; }\r\n\r\n  static midpoint(p1, p2, frac=.5) {\r\n    let x = _mathhelp__WEBPACK_IMPORTED_MODULE_0__[\"default\"].lerp(p1.x, p2.x, frac);\r\n    let y = _mathhelp__WEBPACK_IMPORTED_MODULE_0__[\"default\"].lerp(p1.y, p2.y, frac);\r\n    return new Point(x, y);\r\n  }\r\n\r\n  static distsq(p1, p2) {\r\n    let dx = p2.x - p1.x;\r\n    let dy = p2.y - p1.y;\r\n    return dx*dx + dy*dy\r\n  }\r\n\r\n  static dist(p1, p2) {\r\n    return Math.sqrt(Point.distsq(p1, p2));\r\n  }\r\n}\n\n//# sourceURL=webpack:///./src/point.js?");

/***/ }),

/***/ "./src/screensplit.js":
/*!****************************!*\
  !*** ./src/screensplit.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return ScreenSplitter; });\n/* harmony import */ var _triangle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./triangle */ \"./src/triangle.js\");\n/* harmony import */ var _point__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./point */ \"./src/point.js\");\n/* harmony import */ var _mathhelp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mathhelp */ \"./src/mathhelp.js\");\n\r\n\r\n\r\n\r\nclass ScreenSplitter {\r\n  constructor(x, y, w, h) {\r\n    this.tl = new _point__WEBPACK_IMPORTED_MODULE_1__[\"default\"](x, y);\r\n    this.tr = new _point__WEBPACK_IMPORTED_MODULE_1__[\"default\"](x+w, y);\r\n    this.bl = new _point__WEBPACK_IMPORTED_MODULE_1__[\"default\"](x, y+h);\r\n    this.br = new _point__WEBPACK_IMPORTED_MODULE_1__[\"default\"](x+w, y+h);\r\n\r\n    this.tm = _point__WEBPACK_IMPORTED_MODULE_1__[\"default\"].midpoint(this.tl, this.tr, _mathhelp__WEBPACK_IMPORTED_MODULE_2__[\"default\"].randNearHalf());\r\n    this.bm = _point__WEBPACK_IMPORTED_MODULE_1__[\"default\"].midpoint(this.bl, this.br, _mathhelp__WEBPACK_IMPORTED_MODULE_2__[\"default\"].randNearHalf());\r\n    this.ml = _point__WEBPACK_IMPORTED_MODULE_1__[\"default\"].midpoint(this.tl, this.bl, _mathhelp__WEBPACK_IMPORTED_MODULE_2__[\"default\"].randNearHalf());\r\n    this.mr = _point__WEBPACK_IMPORTED_MODULE_1__[\"default\"].midpoint(this.tr, this.br, _mathhelp__WEBPACK_IMPORTED_MODULE_2__[\"default\"].randNearHalf());\r\n    \r\n    this.c = new _point__WEBPACK_IMPORTED_MODULE_1__[\"default\"](\r\n      _mathhelp__WEBPACK_IMPORTED_MODULE_2__[\"default\"].lerp(0, w, _mathhelp__WEBPACK_IMPORTED_MODULE_2__[\"default\"].randFloat(.1,.9)),\r\n      _mathhelp__WEBPACK_IMPORTED_MODULE_2__[\"default\"].lerp(0, h, _mathhelp__WEBPACK_IMPORTED_MODULE_2__[\"default\"].randFloat(.1,.9))\r\n    );\r\n\r\n  }\r\n\r\n  randomSplit() {\r\n    let splitMethods = [\r\n      \"split1\",\r\n      \"split2\",\r\n      \"split3\",\r\n      \"split4\",\r\n      \"split5\",\r\n      \"split6\",\r\n      \"split7\",\r\n      \"split8\",\r\n      \"split9\",\r\n    ]\r\n    let idx = _mathhelp__WEBPACK_IMPORTED_MODULE_2__[\"default\"].randInt(0, splitMethods.length);\r\n    let method = this[splitMethods[idx]];\r\n    return method.call(this);\r\n  }\r\n\r\n  // split like: |\\|\r\n  split1() {\r\n    return [\r\n      new _triangle__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.tl, this.bl, this.br),\r\n      new _triangle__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.tr, this.br, this.tl),\r\n    ]\r\n  }\r\n\r\n  // split like: |/|\r\n  split2() {\r\n    return [\r\n      new _triangle__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.tl, this.bl, this.tr),\r\n      new _triangle__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.tr, this.br, this.bl),\r\n    ]\r\n  }\r\n\r\n  // split like: |/\\|\r\n  split3() {\r\n    return [\r\n      new _triangle__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.tl, this.bl, this.tm),\r\n      new _triangle__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.br, this.bl, this.tm),\r\n      new _triangle__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.br, this.tr, this.tm),\r\n    ]\r\n  }\r\n\r\n  // split like: |\\/|\r\n  split4() {\r\n    return [\r\n      new _triangle__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.tl, this.bl, this.bm),\r\n      new _triangle__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.tl, this.tr, this.bm),\r\n      new _triangle__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.br, this.tr, this.bm),\r\n    ]\r\n  }\r\n\r\n  // split like: |>|\r\n  split5() {\r\n    return [\r\n      new _triangle__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.tl, this.mr, this.tr),\r\n      new _triangle__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.tl, this.mr, this.bl),\r\n      new _triangle__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.br, this.mr, this.bl),\r\n    ]\r\n  }\r\n\r\n  // split like: |<|\r\n  split6() {\r\n    return [\r\n      new _triangle__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.tl, this.ml, this.tr),\r\n      new _triangle__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.br, this.ml, this.tr),\r\n      new _triangle__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.br, this.ml, this.bl),\r\n    ]\r\n  }\r\n\r\n  // split like: |><|\r\n  split7() {\r\n    return [\r\n      new _triangle__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.tl, this.tr, this.c),\r\n      new _triangle__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.br, this.tr, this.c),\r\n      new _triangle__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.bl, this.br, this.c),\r\n      new _triangle__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.tl, this.bl, this.c),\r\n    ]\r\n  }\r\n\r\n  // split like: |<->|\r\n  split8() {\r\n    return [\r\n      new _triangle__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.tl, this.tm, this.ml),\r\n      new _triangle__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.tr, this.tm, this.mr),\r\n      new _triangle__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.bl, this.bm, this.ml),\r\n      new _triangle__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.br, this.bm, this.mr),\r\n      new _triangle__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.tm, this.ml, this.mr),\r\n      new _triangle__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.bm, this.ml, this.mr),\r\n    ]\r\n  }\r\n\r\n  // split like: |<|>|\r\n  split9() {\r\n    return [\r\n      new _triangle__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.tl, this.tm, this.ml),\r\n      new _triangle__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.tr, this.tm, this.mr),\r\n      new _triangle__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.bl, this.bm, this.ml),\r\n      new _triangle__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.br, this.bm, this.mr),\r\n      new _triangle__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.tm, this.bm, this.mr),\r\n      new _triangle__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.tm, this.bm, this.ml),\r\n    ]\r\n  }\r\n}\n\n//# sourceURL=webpack:///./src/screensplit.js?");

/***/ }),

/***/ "./src/triangle.js":
/*!*************************!*\
  !*** ./src/triangle.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Triangle; });\n/* harmony import */ var _point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./point */ \"./src/point.js\");\n/* harmony import */ var _mathhelp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mathhelp */ \"./src/mathhelp.js\");\n\r\n\r\n\r\nclass Triangle {\r\n  constructor(p1, p2, p3) {\r\n    this.p1 = p1;\r\n    this.p2 = p2;\r\n    this.p3 = p3;\r\n  }\r\n\r\n  get boundingBox() {\r\n    let { p1, p2, p3 } = this;\r\n    let xs = [p1.x, p2.x, p3.x];\r\n    let ys = [p1.y, p2.y, p3.y];\r\n    xs.sort(_mathhelp__WEBPACK_IMPORTED_MODULE_1__[\"default\"].compareInts);\r\n    ys.sort(_mathhelp__WEBPACK_IMPORTED_MODULE_1__[\"default\"].compareInts);\r\n    let x = xs[0];\r\n    let y = ys[0];\r\n    let w = xs[2] - xs[0];\r\n    let h = ys[2] - ys[0];\r\n    return { x, y, w, h };\r\n  }\r\n\r\n  get area2() {\r\n    let { p1, p2, p3 } = this;\r\n    return Math.abs(p1.x * (p2.y - p3.y) + p2.x * (p3.y - p1.y) + p3.x * (p1.y - p2.y))\r\n  }\r\n\r\n  get area() {\r\n    return this.area2 / 2\r\n  }\r\n\r\n  get centroid() {\r\n    let x = (this.p1.x + this.p2.x + this.p3.x) / 3;\r\n    let y = (this.p1.y + this.p2.y + this.p3.y) / 3;\r\n    return new _point__WEBPACK_IMPORTED_MODULE_0__[\"default\"](x, y);\r\n  }\r\n\r\n  draw(ctx, fillColor=\"orange\", strokeColor=\"#555\") {\r\n    ctx.fillStyle = fillColor.toString();\r\n    ctx.strokeStyle = strokeColor;\r\n    ctx.lineJoin = \"bevel\";\r\n    ctx.lineWidth = Math.sqrt(this.area) / 10;\r\n    if (ctx.lineWidth < 2) {\r\n      ctx.lineWidth = 2;\r\n      ctx.strokeStyle = fillColor;\r\n    }\r\n    ctx.beginPath();\r\n    ctx.moveTo(this.p1.x, this.p1.y);\r\n    ctx.lineTo(this.p2.x, this.p2.y);\r\n    ctx.lineTo(this.p3.x, this.p3.y);\r\n    ctx.closePath();\r\n    ctx.fill();\r\n    ctx.stroke();\r\n  }\r\n  \r\n  getSubSierpinksis() {\r\n    let { p1, p2, p3 } = this;\r\n    let p4 = _point__WEBPACK_IMPORTED_MODULE_0__[\"default\"].midpoint(p1, p2, _mathhelp__WEBPACK_IMPORTED_MODULE_1__[\"default\"].randNearHalf());\r\n    let p5 = _point__WEBPACK_IMPORTED_MODULE_0__[\"default\"].midpoint(p1, p3, _mathhelp__WEBPACK_IMPORTED_MODULE_1__[\"default\"].randNearHalf());\r\n    let p6 = _point__WEBPACK_IMPORTED_MODULE_0__[\"default\"].midpoint(p2, p3, _mathhelp__WEBPACK_IMPORTED_MODULE_1__[\"default\"].randNearHalf());\r\n    return [\r\n      new Triangle(p1, p4, p5),\r\n      new Triangle(p2, p4, p6),\r\n      new Triangle(p3, p5, p6),\r\n      new Triangle(p4, p5, p6),\r\n    ]\r\n  }\r\n\r\n  getHalves() {\r\n    let { p1, p2, p3 } = this;\r\n    let d1 = _point__WEBPACK_IMPORTED_MODULE_0__[\"default\"].distsq(p2, p3);\r\n    let d2 = _point__WEBPACK_IMPORTED_MODULE_0__[\"default\"].distsq(p1, p3);\r\n    let d3 = _point__WEBPACK_IMPORTED_MODULE_0__[\"default\"].distsq(p1, p2);\r\n\r\n    let d = Math.max(d1, d2, d3)\r\n\r\n    //rotate points so p1 is across from longest dist\r\n    if (d2 == d) {\r\n      let temp = p1;\r\n      p1 = p2;\r\n      p2 = temp;\r\n\r\n    } else if (d3 == d) {\r\n      let temp = p1;\r\n      p1 = p3;\r\n      p3 = temp;\r\n    }\r\n\r\n    let mp = _point__WEBPACK_IMPORTED_MODULE_0__[\"default\"].midpoint(p2, p3, _mathhelp__WEBPACK_IMPORTED_MODULE_1__[\"default\"].randNearHalf());\r\n\r\n    return [\r\n      new Triangle(p1, p2, mp),\r\n      new Triangle(p1, p3, mp),\r\n    ]\r\n  }\r\n\r\n  getCentroidSubs() {\r\n    let { p1, p2, p3 } = this;\r\n    let c = this.centroid;\r\n    return [\r\n      new Triangle(c, p1, p2),\r\n      new Triangle(c, p1, p3),\r\n      new Triangle(c, p2, p3),\r\n    ]\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/triangle.js?");

/***/ })

/******/ });