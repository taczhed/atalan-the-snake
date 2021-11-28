/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_Area__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/Area */ \"./src/modules/Area.ts\");\n/* harmony import */ var _modules_Snake__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/Snake */ \"./src/modules/Snake.ts\");\n/* harmony import */ var _assets_maps_default_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../assets/maps/default.json */ \"./assets/maps/default.json\");\n// 52x24 map size\r\n\r\n\r\n\r\n//variables\r\nconst areaSize = 16;\r\nlet snakeCords = [8, 10]; //y, x\r\nlet currentDestiantion = 'bottom';\r\nlet gameMapScheme = _assets_maps_default_json__WEBPACK_IMPORTED_MODULE_2__.gameMap;\r\nlet arrayOfMapAreas = gameMapScheme;\r\nlet snakeInterval;\r\nlet snakeTimeOut;\r\nlet snakeBody = [];\r\nlet pressAccess = true;\r\nconst gameMap = document.getElementById('app');\r\nconst app = {\r\n    renderMapOfTheGame: () => {\r\n        let y = 0;\r\n        gameMapScheme.forEach((gameRow, yIndex) => {\r\n            let x = 0;\r\n            gameRow.forEach((gameAreaType, xIndex) => {\r\n                if (gameAreaType === 1) {\r\n                    const area = new _modules_Area__WEBPACK_IMPORTED_MODULE_0__[\"default\"](x, y, 'wall');\r\n                    gameMap.appendChild(area.body);\r\n                    arrayOfMapAreas[yIndex][xIndex] = area;\r\n                }\r\n                x += areaSize;\r\n            });\r\n            y += areaSize;\r\n        });\r\n    },\r\n    setSnakeInterval: () => {\r\n        snakeTimeOut = setTimeout(() => (snakeInterval = setInterval(() => {\r\n            if (currentDestiantion === 'top' && gameMapScheme[snakeCords[0] - 1][snakeCords[1]] === 0) {\r\n                app.moveAllSnakeBody();\r\n                snakeBody[0].snakeMove('y', -16);\r\n                snakeCords[0] -= 1;\r\n                snakeBody[0].rotateHead('top');\r\n            }\r\n            else if (currentDestiantion === 'bottom' && gameMapScheme[snakeCords[0] + 1][snakeCords[1]] === 0) {\r\n                app.moveAllSnakeBody();\r\n                snakeBody[0].snakeMove('y', 16);\r\n                snakeCords[0] += 1;\r\n                snakeBody[0].rotateHead('bottom');\r\n            }\r\n            else if (currentDestiantion === 'left' && gameMapScheme[snakeCords[0]][snakeCords[1] - 1] === 0) {\r\n                app.moveAllSnakeBody();\r\n                snakeBody[0].snakeMove('x', -16);\r\n                snakeCords[1] -= 1;\r\n                snakeBody[0].rotateHead('left');\r\n            }\r\n            else if (currentDestiantion === 'right' && gameMapScheme[snakeCords[0]][snakeCords[1] + 1] === 0) {\r\n                app.moveAllSnakeBody();\r\n                snakeBody[0].snakeMove('x', 16);\r\n                snakeCords[1] += 1;\r\n                snakeBody[0].rotateHead('right');\r\n            }\r\n            else {\r\n                alert(\"end!\");\r\n            }\r\n            pressAccess = true;\r\n        }, 300)), 300);\r\n    },\r\n    renderSnake: () => {\r\n        const snake = new _modules_Snake__WEBPACK_IMPORTED_MODULE_1__[\"default\"](snakeCords[1] * areaSize, snakeCords[0] * areaSize, 'head');\r\n        gameMap.appendChild(snake.body);\r\n        app.setSnakeInterval();\r\n        snakeBody.push(snake);\r\n        // snakeBody\r\n        for (let y = 1; y < 8; y++) {\r\n            const snakeBodyItem = new _modules_Snake__WEBPACK_IMPORTED_MODULE_1__[\"default\"](snakeCords[1] * areaSize, (snakeCords[0] - y) * areaSize, y === 7 ? 'ass' : 'body');\r\n            snakeBody.push(snakeBodyItem);\r\n            gameMap.appendChild(snakeBodyItem.body);\r\n        }\r\n        document.addEventListener('keydown', e => {\r\n            if (pressAccess) {\r\n                if (e.keyCode === 38 && currentDestiantion !== 'bottom')\r\n                    currentDestiantion = 'top';\r\n                else if (e.keyCode === 40 && currentDestiantion !== 'top')\r\n                    currentDestiantion = 'bottom';\r\n                else if (e.keyCode === 37 && currentDestiantion !== 'right')\r\n                    currentDestiantion = 'left';\r\n                else if (e.keyCode === 39 && currentDestiantion !== 'left')\r\n                    currentDestiantion = 'right';\r\n                pressAccess = false;\r\n            }\r\n        });\r\n        // document.addEventListener('keyup', e => pressAccess = true)\r\n    },\r\n    moveAllSnakeBody: () => {\r\n        for (let itemIndex = 0; itemIndex < snakeBody.length - 1; itemIndex++) {\r\n            snakeBody[snakeBody.length - 1 - itemIndex].x = snakeBody[snakeBody.length - 2 - itemIndex].x;\r\n            snakeBody[snakeBody.length - 1 - itemIndex].y = snakeBody[snakeBody.length - 2 - itemIndex].y;\r\n            snakeBody[snakeBody.length - 1 - itemIndex].snakeIntervalChange();\r\n            snakeBody[snakeBody.length - 1 - itemIndex].matchBodyImage();\r\n        }\r\n    }\r\n};\r\napp.renderMapOfTheGame();\r\napp.renderSnake();\r\n\n\n//# sourceURL=webpack://atalan-the-snake/./src/index.ts?");

/***/ }),

/***/ "./src/modules/Area.ts":
/*!*****************************!*\
  !*** ./src/modules/Area.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Area {\r\n    constructor(x, y, type) {\r\n        this.body = document.createElement(\"div\");\r\n        this.setBodyDefaultVariables = () => {\r\n            this.body.classList.add('area');\r\n            this.body.style.left = `${this.x}px`;\r\n            this.body.style.top = `${this.y}px`;\r\n            const img = document.createElement('img');\r\n            if (this.type === 'wall')\r\n                img.setAttribute('src', '../../assets/textures/wall.png');\r\n            else if (this.type === 'head')\r\n                img.setAttribute('src', '../../assets/textures/head.png');\r\n            else if (this.type === 'body')\r\n                img.setAttribute('src', '../../assets/textures/body.png');\r\n            else if (this.type === 'ass')\r\n                img.setAttribute('src', '../../assets/textures/ass.png');\r\n            this.body.appendChild(img);\r\n            img.classList.add('element');\r\n        };\r\n        this.x = x;\r\n        this.y = y;\r\n        this.type = type;\r\n        this.setBodyDefaultVariables();\r\n    }\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Area);\r\n\n\n//# sourceURL=webpack://atalan-the-snake/./src/modules/Area.ts?");

/***/ }),

/***/ "./src/modules/Snake.ts":
/*!******************************!*\
  !*** ./src/modules/Snake.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Area__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Area */ \"./src/modules/Area.ts\");\n\r\nclass Snake extends _Area__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\r\n    constructor(x, y, type) {\r\n        super(x, y, type);\r\n        this.snakeIntervalChange = () => {\r\n            this.body.style.left = `${this.x}px`;\r\n            this.body.style.top = `${this.y}px`;\r\n        };\r\n        this.snakeMove = (way, px) => {\r\n            if (way === 'x') {\r\n                this.x = this.x + px;\r\n                this.body.style.left = `${this.x}px`;\r\n            }\r\n            else {\r\n                this.y = this.y + px;\r\n                this.body.style.top = `${this.y}px`;\r\n            }\r\n        };\r\n        this.rotateHead = (way) => {\r\n            if (way === 'top')\r\n                this.body.style.transform = 'rotate(180deg)';\r\n            else if (way === 'bottom')\r\n                this.body.style.transform = 'rotate(0deg)';\r\n            else if (way === 'left')\r\n                this.body.style.transform = 'rotate(90deg)';\r\n            else if (way === 'right')\r\n                this.body.style.transform = 'rotate(-90deg)';\r\n        };\r\n        this.matchBodyImage = () => {\r\n        };\r\n    }\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Snake);\r\n\n\n//# sourceURL=webpack://atalan-the-snake/./src/modules/Snake.ts?");

/***/ }),

/***/ "./assets/maps/default.json":
/*!**********************************!*\
  !*** ./assets/maps/default.json ***!
  \**********************************/
/***/ ((module) => {

eval("module.exports = JSON.parse('{\"gameMap\":[[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0]]}');\n\n//# sourceURL=webpack://atalan-the-snake/./assets/maps/default.json?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;