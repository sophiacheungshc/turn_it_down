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

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return TurnItDown; });\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ \"./src/player.js\");\n/* harmony import */ var _platform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./platform */ \"./src/platform.js\");\n\n\n\nclass TurnItDown { \n    constructor(canvas) {\n        this.ctx = canvas.getContext(\"2d\");\n        this.dimensions = { width: canvas.width, height: canvas.height };\n\n        this.background = new Image();\n        this.background.src = \"img/background.png\";\n        this.x = 0;\n        this.y = 100;\n\n        this.animate = this.animate.bind(this);\n        this.player = new _player__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.dimensions);\n        this.platform = new _platform__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.dimensions);\n\n        window.addEventListener(\"keydown\", this.key.bind(this));\n        window.addEventListener(\"keyup\", this.keyUp.bind(this))\n\n        this.animate();\n        \n    }\n\n    key(e) {\n        if (e.keyCode === 38) this.player.jump();\n        if (e.keyCode === 37) this.player.left = true;\n        if (e.keyCode === 39) this.player.right = true;\n    }\n\n    keyUp(e) {\n        if (e.keyCode === 37) this.player.left = false;\n        if (e.keyCode === 39) this.player.right = false;\n    }\n\n    animate(){\n        this.frame = requestAnimationFrame(this.animate);\n        // console.log(\"rendering\");\n        this.backgroundDraw();\n        this.player.animate(this.ctx);\n        // this.platform.animate(this.ctx);\n    }\n\n    stopAnimation(){\n        cancelAnimationFrame(this.frame);\n    }\n\n    backgroundDraw(){\n        this.ctx.drawImage(this.background, this.x, this.y, 480, 640, 0, 0, 480, 640);\n        if (this.y < 0) {\n            this.y += (1500-640);\n        }\n        this.y -= 1;\n        console.log(this.y);\n        // this.ctx.drawImage(this.background, 0, 0, 480, 900 - 640, 0, 0, 480, 640 + (900 - 640));    \n    }\n\n}\n\n\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\nconst canvas = document.getElementById('tid-game');\n\nwindow.TurnItDown = new _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"](canvas);\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/platform.js":
/*!*************************!*\
  !*** ./src/platform.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Platform; });\nconst CONSTANTS = {\n    TILE_SPEED: 2,\n    EDGE_BUFFER: 50,\n    TILE_SPACING: 220,\n    WARM_UP_SECONDS: 1\n};\n\nclass Platform {\n    constructor(dimensions) {\n        this.dimensions = dimensions;\n\n        this.platform = new Image();\n        this.platform.src = \"img/platform.png\";\n\n        const firstTileDistance =\n            this.dimensions.width +\n            (CONSTANTS.WARM_UP_SECONDS * 60 * CONSTANTS.TILE_SPEED);\n\n        //tile(x-pos(0 to 2), y-pos(0 to 5))\n        this.protoTiles = [\n            {shortTile: {\n                sX: 36,\n                sY: 476,\n                w: 74,\n                h: 514,\n                x: 0,\n                y: 0\n            }},\n            {medTile: {\n                sX: 0,\n                sY: 329,\n                w: 111,\n                h: 342,\n                x: 0,\n                y: 0\n            }},\n            {longTile: {\n                sX: 0,\n                sY: 165,\n                w: 166,\n                h: 196,\n                x: 0,\n                y: 0\n            }},\n        ];\n\n        this.tiles = [\n            this.randomTiles(0),\n            this.randomTiles(1),\n            this.randomTiles(2),\n            this.randomTiles(3),\n            this.randomTiles(4)\n        ];\n\n            // this.randomTile(firstTileDistance),\n            // this.randomTile(firstTileDistance + CONSTANTS.TILE_SPACING),\n            // this.randomTile(firstTileDistance + (CONSTANTS.TILE_SPACING * 2)),\n    \n    }\n\n    randomTiles(line) {\n        //2 random tiles out of 3 different lengths\n        const leftTile = this.protoTiles[Math.floor(Math.random() * 3)];\n        const rightTile = this.protoTiles[Math.floor(Math.random() * 3)];\n        \n        return [leftTile, rightTile, line];\n    }\n\n    eachTileLine(callback) {\n        this.tiles.forEach(callback.bind(this));\n    }\n\n    moveTiles() {\n        this.eachTileLine(function (tileLine) {\n            tileLine[0].y += CONSTANTS.TILE_SPEED;\n            tileLine[1].y += CONSTANTS.TILE_SPEED;\n        });\n\n        //if a tile line has left the bottom of the screen add a new line to the top\n        if (this.tiles[0].y >= 640) {\n            this.tiles.pop();\n            this.tiles.unshift(this.randomTiles(0));\n        }\n    }\n\n    drawTiles(ctx) {\n        this.eachTileLine(function (tileLine) {\n            //draw left tile\n            ctx.drawImage(this.platform, 0, 0, 36, 42, this.x, this.y, 36, 42);\n\n            //draw right tile\n            ctx.drawImage(this.platform, 0, 0, 36, 42, this.x, this.y, 36, 42);\n        });\n    }\n\n    animate(ctx) {\n        this.moveTiles();\n        this.drawTiles(ctx);\n    }\n\n}\n\n//# sourceURL=webpack:///./src/platform.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Player; });\nconst CONSTANTS = {\n    GRAVITY: 0.4,\n    JUMP_SPEED: 8,\n    TERMINAL_VEL: 10,\n    PLAYER_WIDTH: 36,\n    PLAYER_HEIGHT: 42\n};\n\nclass Player {\n\n    constructor(dimensions) {\n        this.dimensions = dimensions;\n        this.x = this.dimensions.width / 2;\n        this.y = this.dimensions.height - this.dimensions.height / 8;\n        // this.y = 0 ;\n        this.vel = 0;\n\n        this.right = false;\n        this.left = false;\n\n        this.sprite = new Image();\n        this.sprite.src = \"img/sprite.png\";\n    }\n\n    animate(ctx) {\n        this.move();\n        this.draw(ctx);\n    }\n\n    draw(ctx) {\n        ctx.drawImage(this.sprite, 0, 0, 36, 42, this.x, this.y, 36, 42);\n    }\n\n    jump() {\n        //if this were a more realistic bird simulation, we would be adding to the velocity\n        //instead of just assigning it outright\n        this.vel = -1 * CONSTANTS.JUMP_SPEED;\n    }\n\n    move() {\n        //for each frame, the player should move by it's current velocity\n        //velocity is 'pixels per frame', so each frame it should update position by vel\n        if (this.y >= this.dimensions.height) {\n            this.y = this.dimensions.height - CONSTANTS.PLAYER_HEIGHT - CONSTANTS.PLAYER_HEIGHT;\n        } else if (this.y + this.vel < this.dimensions.height - CONSTANTS.PLAYER_HEIGHT ) {\n            this.y += this.vel;\n        }\n\n        if (this.left) this.x -= 10;\n        if (this.right) this.x += 10;\n        //the acceleration of gravity is in pixels per second per second\n        //so each second, it changes the velocity by whatever the gravity constant is\n        this.vel += CONSTANTS.GRAVITY;\n        //we set a 'terminal velocity', a maximum speed the player can travel\n        //this keeps the game from becoming too wild because the player is moving too fast to control\n        if (Math.abs(this.vel) > CONSTANTS.TERMINAL_VEL) {\n            //if the terminal velocity is exceeded, we set it to the terminal velicty\n            if (this.vel > 0) {\n                this.vel = CONSTANTS.TERMINAL_VEL;\n            } else {\n                this.vel = CONSTANTS.TERMINAL_VEL * -1;\n            }\n        }\n\n    }\n\n}\n\n//# sourceURL=webpack:///./src/player.js?");

/***/ })

/******/ });