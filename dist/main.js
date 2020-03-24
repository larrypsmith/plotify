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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./router */ \"./src/router.js\");\n\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  const main = document.querySelector('main')\n  const router = new _router__WEBPACK_IMPORTED_MODULE_0__[\"default\"](main);\n  router.render();\n})\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/router.js":
/*!***********************!*\
  !*** ./src/router.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Router; });\n/* harmony import */ var _venn__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./venn */ \"./src/venn.js\");\n/* harmony import */ var _welcome__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./welcome */ \"./src/welcome.js\");\n\n\n\nclass Router {\n  constructor(node) {\n    this.node = node;\n  }\n\n  isAuthenticated() {\n    const hash = window.location.hash.substr(1);\n    return hash.includes('access_token');\n  }\n\n  render() {\n    this.node.innerHTML = \"\"; \n    if (this.isAuthenticated()) {\n      this.node.appendChild(_venn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].render())\n    } else {\n      this.node.appendChild(_welcome__WEBPACK_IMPORTED_MODULE_1__[\"default\"].render())\n    };\n  }\n}\n\n//# sourceURL=webpack:///./src/router.js?");

/***/ }),

/***/ "./src/venn.js":
/*!*********************!*\
  !*** ./src/venn.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  vennHtml: function() {\n    const html = 'This is the venn element';\n    return html;\n  },\n\n  render: function() {\n    let container = document.createElement(\"div\");\n    container.className = \"venn\";\n    container.innerHTML = this.vennHtml();\n    return container;\n  }\n});\n\n//# sourceURL=webpack:///./src/venn.js?");

/***/ }),

/***/ "./src/welcome.js":
/*!************************!*\
  !*** ./src/welcome.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  renderWelcome: function() {\n    const html = `\n      <h2>\n        Plotify plots your top Spotify artists in a Venn diagram that compares their genres.\n      </h2>\n\n      <button id=\"login\">\n        Connect with Spotify\n      </button>\n    `\n    return html;\n  },\n\n  render: function() {\n    let container = document.createElement('div');\n    container.className = 'welcome';\n    container.innerHTML = this.renderWelcome();\n    return container;\n  }\n});\n\n//# sourceURL=webpack:///./src/welcome.js?");

/***/ })

/******/ });