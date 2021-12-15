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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_Area__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/Area */ \"./src/modules/Area.ts\");\n/* harmony import */ var _modules_Snake__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/Snake */ \"./src/modules/Snake.ts\");\n/* harmony import */ var _assets_maps_map1_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../assets/maps/map1.json */ \"./assets/maps/map1.json\");\n/* harmony import */ var _assets_maps_map2_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../assets/maps/map2.json */ \"./assets/maps/map2.json\");\n/* harmony import */ var _assets_maps_map3_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../assets/maps/map3.json */ \"./assets/maps/map3.json\");\n/* harmony import */ var _assets_maps_map4_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../assets/maps/map4.json */ \"./assets/maps/map4.json\");\n/* harmony import */ var _modules_Point__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/Point */ \"./src/modules/Point.ts\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\n// 36x22 map size\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n//variables\r\nconst snakeSize = 8;\r\nconst areaSize = 20;\r\nconst mapWidth = 36;\r\nconst mapHeight = 22;\r\nlet points = 0;\r\nlet snakeCords = [8, 10]; //y, x\r\nlet currentDestiantion = 'bottom';\r\nconst gameMaps = [_assets_maps_map1_json__WEBPACK_IMPORTED_MODULE_2__.gameMap, _assets_maps_map2_json__WEBPACK_IMPORTED_MODULE_3__.gameMap, _assets_maps_map3_json__WEBPACK_IMPORTED_MODULE_4__.gameMap, _assets_maps_map4_json__WEBPACK_IMPORTED_MODULE_5__.gameMap];\r\nlet gameMapScheme = gameMaps[0];\r\nlet arrayOfMapAreas = gameMapScheme;\r\nlet snakeInterval;\r\nlet snakeTimeOut;\r\nlet snakeBody = [];\r\nlet pressAccess = true;\r\nlet isLevelSelected = false;\r\nconst gameMap = document.getElementById('app');\r\nlet selectedGameMapNumber = 0;\r\nlet backgroundMusicPermission = false;\r\nlet isSoundEnabled = false;\r\nlet backgroundMusic;\r\nlet pointCollectingSound;\r\nconst app = {\r\n    startMapsChoosingMenu: () => {\r\n        isLevelSelected = true;\r\n        gameMap.innerHTML = '<video width=\"721\" height=\"440\" playsinline autoplay muted loop><source src=\"../assets/video/choose_menu.mp4\" type=\"video/mp4\">Your browser does not support the video tag.</video><div id=\"game-maps\"></div>';\r\n        //display levels\r\n        const gameMapsContainer = document.getElementById('game-maps');\r\n        for (let mapIndex = 1; mapIndex <= 4; mapIndex++) {\r\n            const img = document.createElement('div');\r\n            img.classList.add('game-maps-item');\r\n            img.style.backgroundImage = 'url(\"' + `../assets/textures/map_${mapIndex}.png` + '\")';\r\n            gameMapsContainer.appendChild(img);\r\n        }\r\n        gameMap.appendChild(gameMapsContainer);\r\n        const gameMapsPicker = document.createElement('div');\r\n        const imgsDOM = document.querySelectorAll('.game-maps-item');\r\n        gameMapsPicker.classList.add('game-maps-picker');\r\n        imgsDOM[selectedGameMapNumber].appendChild(gameMapsPicker);\r\n        document.addEventListener('keydown', e => {\r\n            if (e.keyCode === 39) {\r\n                if (selectedGameMapNumber < 3)\r\n                    selectedGameMapNumber += 1;\r\n            }\r\n            else if (e.keyCode === 37) {\r\n                if (selectedGameMapNumber > 0)\r\n                    selectedGameMapNumber -= 1;\r\n            }\r\n            imgsDOM[selectedGameMapNumber].appendChild(gameMapsPicker);\r\n        });\r\n    },\r\n    audio: () => __awaiter(void 0, void 0, void 0, function* () {\r\n        backgroundMusic = new Audio('../assets/sounds/background_song.mp4');\r\n        pointCollectingSound = new Audio('../assets/sounds/point.mp4');\r\n        backgroundMusic.loop = true;\r\n    }),\r\n    startTheGame: () => {\r\n        gameMapScheme = gameMaps[selectedGameMapNumber];\r\n        arrayOfMapAreas = gameMapScheme;\r\n        gameMap.innerHTML = '';\r\n        backgroundMusic.src = '../assets/sounds/background.mp4';\r\n        backgroundMusic.play();\r\n        app.renderMapOfTheGame();\r\n        app.renderSnake();\r\n        app.renderPoint();\r\n    },\r\n    renderMapOfTheGame: () => {\r\n        let y = 0;\r\n        gameMapScheme.forEach((gameRow, yIndex) => {\r\n            let x = 0;\r\n            gameRow.forEach((gameAreaType, xIndex) => {\r\n                if (gameAreaType === 1) {\r\n                    const area = new _modules_Area__WEBPACK_IMPORTED_MODULE_0__[\"default\"](x, y, 'wall');\r\n                    gameMap.appendChild(area.body);\r\n                    arrayOfMapAreas[yIndex][xIndex] = area;\r\n                }\r\n                x += areaSize;\r\n            });\r\n            y += areaSize;\r\n        });\r\n    },\r\n    setSnakeInterval: () => {\r\n        snakeTimeOut = setTimeout(() => (snakeInterval = setInterval(() => {\r\n            if (currentDestiantion === 'top' && typeof gameMapScheme[snakeCords[0] - 1][snakeCords[1]] === 'number') {\r\n                snakeBody[0].rotateHead('top');\r\n                if (app.isBodyHittedByHead('top'))\r\n                    app.endGame();\r\n                else {\r\n                    if (arrayOfMapAreas[snakeCords[0] - 1][snakeCords[1]] === 1)\r\n                        app.collectPoint(snakeCords[0] - 1, snakeCords[1], 'top');\r\n                    app.moveAllSnakeBody();\r\n                    snakeBody[0].snakeMove('y', -areaSize);\r\n                    app.MatchTextures();\r\n                    snakeCords[0] -= 1;\r\n                }\r\n            }\r\n            else if (currentDestiantion === 'bottom' && typeof gameMapScheme[snakeCords[0] + 1][snakeCords[1]] === 'number') {\r\n                snakeBody[0].rotateHead('bottom');\r\n                if (app.isBodyHittedByHead('bottom'))\r\n                    app.endGame();\r\n                else {\r\n                    if (arrayOfMapAreas[snakeCords[0] + 1][snakeCords[1]])\r\n                        app.collectPoint(snakeCords[0] + 1, snakeCords[1], 'bottom');\r\n                    app.moveAllSnakeBody();\r\n                    snakeBody[0].snakeMove('y', areaSize);\r\n                    app.MatchTextures();\r\n                    snakeCords[0] += 1;\r\n                }\r\n            }\r\n            else if (currentDestiantion === 'left' && typeof gameMapScheme[snakeCords[0]][snakeCords[1] - 1] === 'number') {\r\n                snakeBody[0].rotateHead('left');\r\n                if (app.isBodyHittedByHead('left'))\r\n                    app.endGame();\r\n                else {\r\n                    if (arrayOfMapAreas[snakeCords[0]][snakeCords[1] - 1])\r\n                        app.collectPoint(snakeCords[0], snakeCords[1] - 1, 'left');\r\n                    app.moveAllSnakeBody();\r\n                    snakeBody[0].snakeMove('x', -areaSize);\r\n                    app.MatchTextures();\r\n                    snakeCords[1] -= 1;\r\n                }\r\n            }\r\n            else if (currentDestiantion === 'right' && typeof gameMapScheme[snakeCords[0]][snakeCords[1] + 1] === 'number') {\r\n                snakeBody[0].rotateHead('right');\r\n                if (app.isBodyHittedByHead('right'))\r\n                    app.endGame();\r\n                else {\r\n                    if (arrayOfMapAreas[snakeCords[0]][snakeCords[1] + 1])\r\n                        app.collectPoint(snakeCords[0], snakeCords[1] + 1, 'right');\r\n                    app.moveAllSnakeBody();\r\n                    snakeBody[0].snakeMove('x', areaSize);\r\n                    app.MatchTextures();\r\n                    snakeCords[1] += 1;\r\n                }\r\n            }\r\n            else {\r\n                app.endGame();\r\n            }\r\n            pressAccess = true;\r\n        }, 250)), 250);\r\n    },\r\n    renderSnake: () => {\r\n        const snake = new _modules_Snake__WEBPACK_IMPORTED_MODULE_1__[\"default\"](snakeCords[1] * areaSize, snakeCords[0] * areaSize, 'head', 'bottom');\r\n        gameMap.appendChild(snake.body);\r\n        app.setSnakeInterval();\r\n        snakeBody.push(snake);\r\n        // snakeBody\r\n        for (let y = 1; y < snakeSize; y++) {\r\n            const snakeBodyItem = new _modules_Snake__WEBPACK_IMPORTED_MODULE_1__[\"default\"](snakeCords[1] * areaSize, (snakeCords[0] - y) * areaSize, y === snakeSize - 1 ? 'ass' : 'body', 'bottom');\r\n            snakeBody.push(snakeBodyItem);\r\n            gameMap.appendChild(snakeBodyItem.body);\r\n        }\r\n        document.addEventListener('keydown', e => {\r\n            if (pressAccess) {\r\n                if (e.keyCode === 38 && currentDestiantion !== 'bottom')\r\n                    currentDestiantion = 'top';\r\n                else if (e.keyCode === 40 && currentDestiantion !== 'top')\r\n                    currentDestiantion = 'bottom';\r\n                else if (e.keyCode === 37 && currentDestiantion !== 'right')\r\n                    currentDestiantion = 'left';\r\n                else if (e.keyCode === 39 && currentDestiantion !== 'left')\r\n                    currentDestiantion = 'right';\r\n                pressAccess = false;\r\n            }\r\n        });\r\n        // document.addEventListener('keyup', e => pressAccess = true)\r\n    },\r\n    moveAllSnakeBody: () => {\r\n        for (let itemIndex = 0; itemIndex < snakeBody.length - 1; itemIndex++) {\r\n            snakeBody[snakeBody.length - 1 - itemIndex].x = snakeBody[snakeBody.length - 2 - itemIndex].x;\r\n            snakeBody[snakeBody.length - 1 - itemIndex].y = snakeBody[snakeBody.length - 2 - itemIndex].y;\r\n            snakeBody[snakeBody.length - 1 - itemIndex].direction = snakeBody[snakeBody.length - 2 - itemIndex].direction;\r\n            snakeBody[snakeBody.length - 1 - itemIndex].snakeIntervalChange();\r\n        }\r\n    },\r\n    isBodyHittedByHead: (destination) => {\r\n        let isHitted = false;\r\n        snakeBody.forEach((bodyElement, i) => {\r\n            if (i !== 0) {\r\n                if (destination === 'top' && bodyElement.y - snakeBody[0].y === -areaSize && bodyElement.x === snakeBody[0].x)\r\n                    isHitted = true, console.log(\"tutej!\");\r\n                else if (destination === 'bottom' && bodyElement.y - snakeBody[0].y === areaSize && bodyElement.x === snakeBody[0].x)\r\n                    isHitted = true, console.log(\"tutej!\");\r\n                else if (destination === 'left' && bodyElement.x - snakeBody[0].x === -areaSize && bodyElement.y === snakeBody[0].y)\r\n                    isHitted = true, console.log(\"tutej!\");\r\n                else if (destination === 'right' && bodyElement.x - snakeBody[0].x === areaSize && bodyElement.y === snakeBody[0].y)\r\n                    isHitted = true, console.log(\"tutej!\");\r\n            }\r\n        });\r\n        return isHitted;\r\n    },\r\n    MatchTextures: () => {\r\n        snakeBody.forEach((bodyElement, i) => {\r\n            if (i !== 0) {\r\n                bodyElement.matchBodyImage(snakeBody[i - 1], snakeBody[i], snakeBody[i + 1]);\r\n            }\r\n        });\r\n    },\r\n    endGame: () => {\r\n        clearTimeout(snakeTimeOut);\r\n        clearInterval(snakeInterval);\r\n        backgroundMusic.pause();\r\n        alert('You lose!');\r\n    },\r\n    renderPoint: () => {\r\n        let loop = true;\r\n        while (loop === true) {\r\n            const x = Math.floor(Math.random() * (mapWidth - 1));\r\n            const y = Math.floor(Math.random() * (mapHeight - 1));\r\n            let areCoordsFreeForPoint = true;\r\n            snakeBody.forEach(bodyItem => {\r\n                if (bodyItem.x === x * areaSize || bodyItem.y === y * areaSize)\r\n                    areCoordsFreeForPoint = false;\r\n            });\r\n            if (!arrayOfMapAreas[y][x] && areCoordsFreeForPoint) {\r\n                const point = new _modules_Point__WEBPACK_IMPORTED_MODULE_6__[\"default\"](x * areaSize, y * areaSize, 'point');\r\n                arrayOfMapAreas[y][x] = 1;\r\n                gameMap.appendChild(point.body);\r\n                loop = false;\r\n            }\r\n        }\r\n    },\r\n    collectPoint: (y, x, direction) => {\r\n        pointCollectingSound.play();\r\n        points += 1;\r\n        console.log(points);\r\n        arrayOfMapAreas[y][x] = 0;\r\n        const pointsDOM = document.querySelector('.point');\r\n        pointsDOM.remove();\r\n        let snakeBodyItem;\r\n        if (direction === 'top')\r\n            snakeBodyItem = new _modules_Snake__WEBPACK_IMPORTED_MODULE_1__[\"default\"](snakeBody[snakeBody.length - 1].x, snakeBody[snakeBody.length - 1].y + 20, 'ass', snakeBody[snakeBody.length - 1].direction);\r\n        else if (direction === 'bottom')\r\n            snakeBodyItem = new _modules_Snake__WEBPACK_IMPORTED_MODULE_1__[\"default\"](snakeBody[snakeBody.length - 1].x, snakeBody[snakeBody.length - 1].y - 20, 'ass', snakeBody[snakeBody.length - 1].direction);\r\n        else if (direction === 'left')\r\n            snakeBodyItem = new _modules_Snake__WEBPACK_IMPORTED_MODULE_1__[\"default\"](snakeBody[snakeBody.length - 1].x + 20, snakeBody[snakeBody.length - 1].y, 'ass', snakeBody[snakeBody.length - 1].direction);\r\n        else if (direction === 'right')\r\n            snakeBodyItem = new _modules_Snake__WEBPACK_IMPORTED_MODULE_1__[\"default\"](snakeBody[snakeBody.length - 1].x - 20, snakeBody[snakeBody.length - 1].y, 'ass', snakeBody[snakeBody.length - 1].direction);\r\n        snakeBody[snakeBody.length - 1].changeBodyType('ass', 'body', snakeBody[snakeBody.length - 1].direction);\r\n        snakeBody.push(snakeBodyItem);\r\n        gameMap.appendChild(snakeBodyItem.body);\r\n        app.renderPoint();\r\n    }\r\n};\r\napp.audio();\r\n//keys\r\ndocument.addEventListener('keydown', e => {\r\n    if (e.keyCode === 16) {\r\n        if (isLevelSelected)\r\n            app.startTheGame();\r\n        else\r\n            app.startMapsChoosingMenu();\r\n    }\r\n    if (e.keyCode === 83) {\r\n        if (!backgroundMusicPermission)\r\n            backgroundMusic.play(), backgroundMusicPermission = true;\r\n        else if (isSoundEnabled) {\r\n            isSoundEnabled = false;\r\n            pointCollectingSound.muted = false;\r\n            backgroundMusic.muted = false;\r\n        }\r\n        else {\r\n            isSoundEnabled = true;\r\n            pointCollectingSound.muted = true;\r\n            backgroundMusic.muted = true;\r\n        }\r\n    }\r\n});\r\n\n\n//# sourceURL=webpack://atalan-the-snake/./src/index.ts?");

/***/ }),

/***/ "./src/modules/Area.ts":
/*!*****************************!*\
  !*** ./src/modules/Area.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Area {\r\n    constructor(x, y, type) {\r\n        this.body = document.createElement('img');\r\n        this.setBodyDefaultVariables = () => {\r\n            this.body.style.position = 'absolute';\r\n            this.body.style.display = 'block';\r\n            this.body.style.left = `${this.x}px`;\r\n            this.body.style.top = `${this.y}px`;\r\n            if (this.type === 'wall')\r\n                this.body.setAttribute('src', '../../assets/textures/wall.png');\r\n            else if (this.type === 'head')\r\n                this.body.setAttribute('src', '../../assets/textures/head.png');\r\n            else if (this.type === 'body')\r\n                this.body.setAttribute('src', '../../assets/textures/body.png');\r\n            else if (this.type === 'circle')\r\n                this.body.setAttribute('src', '../../assets/textures/circle.png');\r\n            else if (this.type === 'ass')\r\n                this.body.setAttribute('src', '../../assets/textures/ass.png');\r\n            this.body.classList.add('area');\r\n        };\r\n        this.x = x;\r\n        this.y = y;\r\n        this.type = type;\r\n        this.setBodyDefaultVariables();\r\n    }\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Area);\r\n\n\n//# sourceURL=webpack://atalan-the-snake/./src/modules/Area.ts?");

/***/ }),

/***/ "./src/modules/Point.ts":
/*!******************************!*\
  !*** ./src/modules/Point.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Area__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Area */ \"./src/modules/Area.ts\");\n\r\nclass Point extends _Area__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\r\n    constructor(x, y, type) {\r\n        super(x, y, type);\r\n        this.body.setAttribute('src', '../../assets/textures/point.png');\r\n        this.body.classList.add('point');\r\n    }\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Point);\r\n\n\n//# sourceURL=webpack://atalan-the-snake/./src/modules/Point.ts?");

/***/ }),

/***/ "./src/modules/Snake.ts":
/*!******************************!*\
  !*** ./src/modules/Snake.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Area__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Area */ \"./src/modules/Area.ts\");\n\r\nconst areaSize = 20;\r\nclass Snake extends _Area__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\r\n    constructor(x, y, type, direction) {\r\n        super(x, y, type);\r\n        this.snakeIntervalChange = () => {\r\n            this.body.style.left = `${this.x}px`;\r\n            this.body.style.top = `${this.y}px`;\r\n        };\r\n        this.snakeMove = (way, px) => {\r\n            if (way === 'x') {\r\n                this.x = this.x + px;\r\n                this.body.style.left = `${this.x}px`;\r\n            }\r\n            else {\r\n                this.y = this.y + px;\r\n                this.body.style.top = `${this.y}px`;\r\n            }\r\n        };\r\n        this.changeBodyType = (oldType, newType, rotation) => {\r\n            this.body.style.transform = rotation;\r\n            if (newType !== oldType) {\r\n                if (newType === 'body')\r\n                    this.body.setAttribute('src', '../../assets/textures/body.png'), this.type = 'body';\r\n                else if (newType === 'circle')\r\n                    this.body.setAttribute('src', '../../assets/textures/circle.png'), this.type = 'circle';\r\n            }\r\n        };\r\n        this.rotateHead = (direction) => {\r\n            if (direction === 'top')\r\n                this.body.style.transform = 'rotate(180deg)';\r\n            else if (direction === 'bottom')\r\n                this.body.style.transform = 'rotate(0deg)';\r\n            else if (direction === 'left')\r\n                this.body.style.transform = 'rotate(90deg)';\r\n            else if (direction === 'right')\r\n                this.body.style.transform = 'rotate(-90deg)';\r\n            this.direction = direction;\r\n        };\r\n        this.matchBodyImage = (prevSibling, bodyElement, nextSibling) => {\r\n            //spaghetti alert\r\n            switch (true) {\r\n                //end of snake\r\n                case (!nextSibling && bodyElement.x - prevSibling.x === -areaSize):\r\n                    this.body.style.transform = 'rotate(270deg)';\r\n                    break;\r\n                case (!nextSibling && bodyElement.x - prevSibling.x === areaSize):\r\n                    this.body.style.transform = 'rotate(90deg)';\r\n                    break;\r\n                case (!nextSibling && bodyElement.y - prevSibling.y === -areaSize):\r\n                    this.body.style.transform = 'rotate(0deg)';\r\n                    break;\r\n                case (!nextSibling && bodyElement.y - prevSibling.y === areaSize):\r\n                    this.body.style.transform = 'rotate(180deg)';\r\n                    break;\r\n                //regular body\r\n                case ((bodyElement === null || bodyElement === void 0 ? void 0 : bodyElement.x) - (prevSibling === null || prevSibling === void 0 ? void 0 : prevSibling.x) === -areaSize && (bodyElement === null || bodyElement === void 0 ? void 0 : bodyElement.x) - (nextSibling === null || nextSibling === void 0 ? void 0 : nextSibling.x) === areaSize): {\r\n                    this.changeBodyType(bodyElement.type, 'body', 'rotate(90deg)');\r\n                    break;\r\n                }\r\n                case ((bodyElement === null || bodyElement === void 0 ? void 0 : bodyElement.x) - (prevSibling === null || prevSibling === void 0 ? void 0 : prevSibling.x) === areaSize && (bodyElement === null || bodyElement === void 0 ? void 0 : bodyElement.x) - (nextSibling === null || nextSibling === void 0 ? void 0 : nextSibling.x) === -areaSize): {\r\n                    this.changeBodyType(bodyElement.type, 'body', 'rotate(270deg)');\r\n                    break;\r\n                }\r\n                case ((bodyElement === null || bodyElement === void 0 ? void 0 : bodyElement.y) - (prevSibling === null || prevSibling === void 0 ? void 0 : prevSibling.y) === -areaSize && (bodyElement === null || bodyElement === void 0 ? void 0 : bodyElement.y) - (nextSibling === null || nextSibling === void 0 ? void 0 : nextSibling.y) === areaSize): {\r\n                    this.changeBodyType(bodyElement.type, 'body', 'rotate(0deg)');\r\n                    break;\r\n                }\r\n                case ((bodyElement === null || bodyElement === void 0 ? void 0 : bodyElement.y) - (prevSibling === null || prevSibling === void 0 ? void 0 : prevSibling.y) === areaSize && (bodyElement === null || bodyElement === void 0 ? void 0 : bodyElement.y) - (nextSibling === null || nextSibling === void 0 ? void 0 : nextSibling.y) === -areaSize): {\r\n                    this.changeBodyType(bodyElement.type, 'body', 'rotate(180deg)');\r\n                    break;\r\n                }\r\n                //circles\r\n                case ((bodyElement === null || bodyElement === void 0 ? void 0 : bodyElement.x) - (prevSibling === null || prevSibling === void 0 ? void 0 : prevSibling.x) === -areaSize && (bodyElement === null || bodyElement === void 0 ? void 0 : bodyElement.y) - (nextSibling === null || nextSibling === void 0 ? void 0 : nextSibling.y) === -areaSize || (bodyElement === null || bodyElement === void 0 ? void 0 : bodyElement.x) - (nextSibling === null || nextSibling === void 0 ? void 0 : nextSibling.x) === -areaSize && (bodyElement === null || bodyElement === void 0 ? void 0 : bodyElement.y) - (prevSibling === null || prevSibling === void 0 ? void 0 : prevSibling.y) === -areaSize): {\r\n                    this.changeBodyType(bodyElement.type, 'circle', 'rotate(180deg)');\r\n                    break;\r\n                }\r\n                case ((bodyElement === null || bodyElement === void 0 ? void 0 : bodyElement.y) - (prevSibling === null || prevSibling === void 0 ? void 0 : prevSibling.y) === areaSize && (bodyElement === null || bodyElement === void 0 ? void 0 : bodyElement.x) - (nextSibling === null || nextSibling === void 0 ? void 0 : nextSibling.x) === areaSize || (bodyElement === null || bodyElement === void 0 ? void 0 : bodyElement.y) - (nextSibling === null || nextSibling === void 0 ? void 0 : nextSibling.y) === areaSize && (bodyElement === null || bodyElement === void 0 ? void 0 : bodyElement.x) - (prevSibling === null || prevSibling === void 0 ? void 0 : prevSibling.x) === areaSize): {\r\n                    this.changeBodyType(bodyElement.type, 'circle', 'rotate(0deg)');\r\n                    break;\r\n                }\r\n                case ((bodyElement === null || bodyElement === void 0 ? void 0 : bodyElement.x) - (prevSibling === null || prevSibling === void 0 ? void 0 : prevSibling.x) === areaSize && (bodyElement === null || bodyElement === void 0 ? void 0 : bodyElement.y) - (nextSibling === null || nextSibling === void 0 ? void 0 : nextSibling.y) === -areaSize || (bodyElement === null || bodyElement === void 0 ? void 0 : bodyElement.x) - (nextSibling === null || nextSibling === void 0 ? void 0 : nextSibling.x) === areaSize && (bodyElement === null || bodyElement === void 0 ? void 0 : bodyElement.y) - (prevSibling === null || prevSibling === void 0 ? void 0 : prevSibling.y) === -areaSize): {\r\n                    this.changeBodyType(bodyElement.type, 'circle', 'rotate(270deg)');\r\n                    break;\r\n                }\r\n                case ((bodyElement === null || bodyElement === void 0 ? void 0 : bodyElement.y) - (prevSibling === null || prevSibling === void 0 ? void 0 : prevSibling.y) === areaSize && (bodyElement === null || bodyElement === void 0 ? void 0 : bodyElement.x) - (nextSibling === null || nextSibling === void 0 ? void 0 : nextSibling.x) === -areaSize || (bodyElement === null || bodyElement === void 0 ? void 0 : bodyElement.y) - (nextSibling === null || nextSibling === void 0 ? void 0 : nextSibling.y) === areaSize && (bodyElement === null || bodyElement === void 0 ? void 0 : bodyElement.x) - (prevSibling === null || prevSibling === void 0 ? void 0 : prevSibling.x) === -areaSize): {\r\n                    this.changeBodyType(bodyElement.type, 'circle', 'rotate(90deg)');\r\n                    break;\r\n                }\r\n            }\r\n        };\r\n        this.direction = direction;\r\n    }\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Snake);\r\n\n\n//# sourceURL=webpack://atalan-the-snake/./src/modules/Snake.ts?");

/***/ }),

/***/ "./assets/maps/map1.json":
/*!*******************************!*\
  !*** ./assets/maps/map1.json ***!
  \*******************************/
/***/ ((module) => {

eval("module.exports = JSON.parse('{\"gameMap\":[[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]]}');\n\n//# sourceURL=webpack://atalan-the-snake/./assets/maps/map1.json?");

/***/ }),

/***/ "./assets/maps/map2.json":
/*!*******************************!*\
  !*** ./assets/maps/map2.json ***!
  \*******************************/
/***/ ((module) => {

eval("module.exports = JSON.parse('{\"gameMap\":[[1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1]]}');\n\n//# sourceURL=webpack://atalan-the-snake/./assets/maps/map2.json?");

/***/ }),

/***/ "./assets/maps/map3.json":
/*!*******************************!*\
  !*** ./assets/maps/map3.json ***!
  \*******************************/
/***/ ((module) => {

eval("module.exports = JSON.parse('{\"gameMap\":[[1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1]]}');\n\n//# sourceURL=webpack://atalan-the-snake/./assets/maps/map3.json?");

/***/ }),

/***/ "./assets/maps/map4.json":
/*!*******************************!*\
  !*** ./assets/maps/map4.json ***!
  \*******************************/
/***/ ((module) => {

eval("module.exports = JSON.parse('{\"gameMap\":[[1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1]]}');\n\n//# sourceURL=webpack://atalan-the-snake/./assets/maps/map4.json?");

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