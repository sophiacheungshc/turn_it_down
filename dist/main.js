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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return TurnItDown; });\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ \"./src/player.js\");\n/* harmony import */ var _platform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./platform */ \"./src/platform.js\");\n/* harmony import */ var _song__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./song */ \"./src/song.js\");\n\n\n\n\nclass TurnItDown { \n    constructor(canvas) {\n        this.ctx = canvas.getContext(\"2d\");\n        this.dimensions = { width: canvas.width, height: canvas.height };\n\n        this.background = new Image();\n        this.background.src = \"img/background.png\";\n        this.ready = new Image();\n        this.ready.src = \"img/ready.png\";\n        this.over = new Image();\n        this.over.src = \"img/over.png\";\n        this.retry = new Image();\n        this.retry.src = \"img/retry.png\";\n        this.won = new Image();\n        this.won.src = \"img/won.png\";\n\n\n        // this.music = new Audio();\n        // this.music.src = \"audio/sunflower.mp3\";\n        this.x = 0;\n        this.y = 600;\n\n        this.animate = this.animate.bind(this);\n\n        window.addEventListener(\"keydown\", this.key.bind(this));\n        window.addEventListener(\"keyup\", this.keyUp.bind(this));\n        // window.addEventListener(\"click\", this.click.bind(this));\n\n        this.state = {\n            current: 0,\n            getReady: 0,\n            game: 1,\n            over: 2\n        }\n        this.beats =\n            [1.22672, 1.527722, 2.501502, 3.176734, 3.887559, 4.20795, 5.192413, 5.836397, 6.519782, 6.853072, 7.841342, 8.190902, 9.217472, 10.51407, 10.846211, 11.888745, 13.178915, 13.8811, 14.549633, 14.87647, 15.87867, 16.51019, 17.504571, 18.551692, 19.195345, 20.193361, 21.202456, 21.790121, 22.57955, 22.879475, 23.835124, 25.211204, 25.527084, 26.522532, 27.895835, 28.191122, 29.156978, 29.865386, 30.140762, 30.499908, 31.903639, 32.540023, 33.147646, 33.500525, 34.494649, 35.203443, 35.529571, 35.873726, 37.201191, 37.881193, 38.555789, 38.875287, 39.857741, 40.511276, 41.180406, 41.497179, 42.521054, 43.170799, 43.853628, 44.179862, 45.222432, 45.835863, 46.527207, 46.847779, 47.857952, 48.524699, 49.528827, 50.59454, 51.2103, 52.158182, 53.185294, 53.852314, 54.890791, 55.844176, 56.520486, 57.521662, 58.559546, 59.231268, 61.590898, 61.901095, 63.923178, 64.532754, 66.446213, 67.155965, 69.228279, 69.891548, 70.856916, 71.861055, 72.48184, 73.183356, 73.521195, 74.545246, 75.143969, 75.880138, 76.222428, 77.21688, 77.819836, 78.518718, 78.84976, 79.859976, 80.519381, 81.183932, 81.542642, 82.4966, 83.175413, 83.827206, 84.160055, 85.184333, 85.870341, 86.519423, 86.839311, 87.885334, 88.528219, 89.180377, 89.524934, 90.486528, 91.215722, 92.209077, 93.853703, 95.180681, 95.895594, 96.553805, 97.512561, 98.520706, 99.238562, 101.180349, 101.841447, 102.566323, 103.885408, 104.548485, 105.23375, 106.535282, 107.189643, 107.856507, 109.166843, 109.884893, 110.563192, 111.834851, 113.214709, 114.524809, 115.81649, 117.144216, 118.529581, 119.821481, 121.208094, 122.46703, 123.237998, 123.854236, 124.189978, 125.205481, 125.889218, 126.557486, 126.874082, 127.843715, 128.545944, 129.530784, 130.539702, 131.23772, 131.867477, 132.187926, 133.197316, 133.84365, 134.528929, 134.850367, 135.841274, 136.524011, 137.218327, 137.541129, 138.514054, 139.925736, 140.247134, 141.886843, 142.875723, 143.882989, 144.478024, 145.566787, 148.215862, 149.216683, 149.874217, 151.852351, 152.534274, 153.562413];\n\n        this.ducked = false;\n        this.restart();\n    }\n    \n    start(){\n        switch(this.state.current){\n            case this.state.getReady:\n                this.state.current = this.state.game;\n                this.music.play();\n                break;\n            case this.state.over:\n                this.restart();\n                break;\n        }\n    }\n\n    key(e) {\n        if (this.state.current === this.state.game) {\n            if (e.keyCode === 38) this.player.jump();\n            if (e.keyCode === 37) this.player.left = true;\n            if (e.keyCode === 39) this.player.right = true;\n            if (e.keyCode === 32) {\n                this.player.duck();\n                this.ducked = true;\n            }\n        } else {\n            if (e.keyCode === 32) this.start();\n        }\n    }\n\n    keyUp(e) {\n        if (this.state.current === this.state.game) {\n            if (e.keyCode === 37) this.player.left = false;\n            if (e.keyCode === 39) this.player.right = false;\n        }\n    }\n    \n    restart() {\n        this.state.current = this.state.getReady;\n        this.platform = new _platform__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.dimensions);\n        this.music = new _song__WEBPACK_IMPORTED_MODULE_2__[\"default\"](\"audio/sunflower.mp3\");\n        this.player = new _player__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.dimensions, this.platform, this.music);\n\n\n        this.animate();\n    }\n\n    animate(){\n        this.backgroundDraw();\n        this.platform.animate(this.ctx);\n        this.player.animate(this.ctx);\n\n        if (this.gameOver()) {\n            this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);\n            this.ctx.drawImage(this.over, 0, 0, 250, 134, this.dimensions.width / 4, this.dimensions.height / 6, 250, 134);\n            this.ctx.drawImage(this.retry, 0, 0, 400, 34, 45, this.dimensions.height / 2, 400, 34);\n        } else if (this.music.currentTime > 160) {\n                this.music.pause();\n                this.music.currentTime = 0;\n                this.state.current = this.state.over;\n                this.ctx.clearRect(0, 0, 480, 640);\n            this.ctx.drawImage(this.won, 0, 0, 439, 350, 20, 100, 439, 350);\n        } else {\n            if (this.state.current === this.state.game) {\n                this.frame = requestAnimationFrame(this.animate);\n            } else if (this.state.current === this.state.over && this.music.currentTime === 0) {\n                this.ctx.clearRect(0, 0, 480, 640);\n                // this.ctx.drawImage(this.over, 0, 0, 250, 134, this.dimensions.width / 5, this.dimensions.height / 6, 250, 134);\n                this.frame = requestAnimationFrame(this.animate);\n            } else if (this.state.current === this.state.getReady) {\n                this.ctx.clearRect(0, 0, 480, 640);\n                this.ctx.drawImage(this.ready, 0, 0, 400, 132, 45, this.dimensions.height / 4, 400, 132);\n                this.frame = requestAnimationFrame(this.animate);\n            }    \n        }\n    }\n        \n    backgroundDraw(){\n        this.ctx.drawImage(this.background, this.x, this.y, 480, 640, 0, 0, 480, 640);\n        if (this.y < 0) this.y += (2400-640);\n\n        //background scroll\n        this.y -= 0.2;\n    }\n\n    gameOver(){\n        if (this.player.y >= this.dimensions.height) {\n            this.state.current = this.state.over;\n            this.music.pause();\n            this.music.currentTime = 0;\n            return true;\n        } \n\n        return false;\n    }\n\n}\n\n\n\n//# sourceURL=webpack:///./src/game.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Platform; });\nclass Platform {\n    constructor(dimensions) {\n        this.dimensions = dimensions;\n        \n        this.platform = new Image();\n        this.platform.src = \"img/platform.png\";\n\n        this.protoTiles = [\n            // {shortTile: \n            {\n                sX: 36,\n                sY: 476,\n                w: 38,\n                h: 38,\n                x: 0,\n                y: 0\n            },\n            // {medTile: \n            {\n                sX: 0,\n                sY: 329,\n                w: 111,\n                h: 13,\n                x: 0,\n                y: 0\n            },\n            // {longTile: \n            {\n                sX: 0,\n                sY: 165,\n                w: 166,\n                h: 31,\n                x: 0,\n                y: 0\n            },\n        ];\n\n        //100-500 indicate y positions => lines 1 - 5\n        this.tiles = [\n            this.randomTiles(100),\n            this.randomTiles(200),\n            this.randomTiles(300),\n            this.randomTiles(400),\n            ///player will start off on one of these bottom tiles\n            this.randomTiles(500)\n        ];\n\n    }\n\n    randomTiles(y) {\n        //2 random tiles out of 3 different lengths\n        //Object.assign because protoTiles were being changed each time \n        const leftTile = Object.assign({}, this.protoTiles[Math.floor(Math.random() * 3)]);\n        const rightTile = Object.assign({}, this.protoTiles[Math.floor(Math.random() * 3)]);\n\n        leftTile.x = Math.floor(Math.random() * (240 - leftTile.w + 1));\n        rightTile.x = Math.floor(Math.random() * (480 - rightTile.w - 240 + 1)) + 240;\n\n        leftTile.y = y;\n        rightTile.y = y;\n\n        return [leftTile, rightTile];\n    }\n\n    eachTileLine(callback) {\n        this.tiles.forEach(callback.bind(this));\n    }\n\n    moveTiles() {\n        this.eachTileLine(function (tileLine) {\n            // tileLine[0].y += 1.5;\n            // tileLine[1].y += 1.5;\n\n            const newTiles = this.randomTiles(100);\n\n            //if a tile line has left the bottom of the screen add a new line to the top\n            if (tileLine[0].y >= 640) {\n                tileLine.shift();\n                tileLine.unshift(newTiles[0]);\n            }\n            if (tileLine[1].y >= 640) {\n                tileLine.pop();\n                tileLine.push(newTiles[1]);\n            }\n\n        });\n    }\n\n    drawTiles(ctx) {\n\n        this.eachTileLine(function (tileLine) {\n\n            //draw left tile\n            ctx.drawImage(this.platform, tileLine[0].sX, tileLine[0].sY, \n                tileLine[0].w, tileLine[0].h, tileLine[0].x, tileLine[0].y, \n                tileLine[0].w, tileLine[0].h);\n                \n            //draw right tile\n            ctx.drawImage(this.platform, tileLine[1].sX, tileLine[1].sY,\n                tileLine[1].w, tileLine[1].h, tileLine[1].x, tileLine[1].y,\n                tileLine[1].w, tileLine[1].h);\n\n        });\n    }\n\n    animate(ctx) {\n        this.moveTiles();\n        this.drawTiles(ctx);\n    }\n\n}\n\n//# sourceURL=webpack:///./src/platform.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Player; });\nconst CONSTANTS = {\n    GRAVITY: 0.4,\n    JUMP_SPEED: 8,\n    TERMINAL_VEL: 10,\n    PLAYER_WIDTH: 40,\n    PLAYER_HEIGHT: 56\n};\n\nclass Player {\n\n    constructor(dimensions, platform, song) {\n        this.dimensions = dimensions;\n        this.platform = platform;\n        this.song = song;\n\n        ///player will start off on one of the bottom tiles\n        const startTile = this.platform.tiles[4][Math.floor(Math.random() * 2)];\n        this.x = startTile.x + (startTile.w / 2);\n        this.y = 500 - CONSTANTS.PLAYER_HEIGHT;\n\n        this.vel = 0;\n        this.jumpCount = 2;\n\n        this.right = false;\n        this.left = false;\n\n        this.sprite = new Image();\n        this.sprite.src = \"img/sprite.png\";\n        this.ducking = new Image();\n        this.ducking.src = \"img/duck.png\";\n\n        this.idleAnimation = [\n            {sX: 0, sY: 384},\n            {sX: 56, sY: 384},\n            {sX: 112, sY: 384},\n            {sX: 165, sY: 384},\n            {sX: 219, sY: 384},\n            {sX: 277, sY: 384},\n            {sX: 331, sY: 384},\n            {sX: 389, sY: 384},\n            {sX: 443, sY: 384}\n        ];\n        this.rightAnimation = [\n            {sX: 0, sY: 0},\n            {sX: 53, sY: 0},\n            {sX: 107, sY: 0},\n            {sX: 163, sY: 0},\n            {sX: 217, sY: 0},\n            {sX: 273, sY: 0},\n            {sX: 329, sY: 0},\n            {sX: 383, sY: 0},\n            {sX: 439, sY: 0}\n        ];\n        this.leftAnimation = [\n            {sX: 0, sY: 554},\n            {sX: 60, sY: 554},\n            {sX: 112, sY: 554},\n            {sX: 170, sY: 554},\n            {sX: 225, sY: 554},\n            {sX: 278, sY: 554},\n            {sX: 333, sY: 554},\n            {sX: 390, sY: 554},\n            {sX: 443, sY: 554}\n        ];\n        this.duckAnimation = [\n            { sX: 0, sY: 384 },\n            { sX: 56, sY: 384 },\n            { sX: 112, sY: 384 },\n            { sX: 165, sY: 384 },\n            { sX: 219, sY: 384 },\n            { sX: 277, sY: 384 },\n            { sX: 331, sY: 384 },\n            { sX: 389, sY: 384 },\n            { sX: 443, sY: 384 }\n        ];\n        this.fallingAnimation = [\n            { sX: 0, sY: 384 },\n            { sX: 56, sY: 384 },\n            { sX: 112, sY: 384 },\n            { sX: 165, sY: 384 },\n            { sX: 219, sY: 384 },\n            { sX: 277, sY: 384 },\n            { sX: 331, sY: 384 },\n            { sX: 389, sY: 384 },\n            { sX: 443, sY: 384 }\n        ];\n\n        this.beats =\n            [1.22672, 1.527722, 2.501502, 3.176734, 3.887559, 4.20795, 5.192413, 5.836397, 6.519782, 6.853072, 7.841342, 8.190902, 9.217472, 10.51407, 10.846211, 11.888745, 13.178915, 13.8811, 14.549633, 14.87647, 15.87867, 16.51019, 17.504571, 18.551692, 19.195345, 20.193361, 21.202456, 21.790121, 22.57955, 22.879475, 23.835124, 25.211204, 25.527084, 26.522532, 27.895835, 28.191122, 29.156978, 29.865386, 30.140762, 30.499908, 31.903639, 32.540023, 33.147646, 33.500525, 34.494649, 35.203443, 35.529571, 35.873726, 37.201191, 37.881193, 38.555789, 38.875287, 39.857741, 40.511276, 41.180406, 41.497179, 42.521054, 43.170799, 43.853628, 44.179862, 45.222432, 45.835863, 46.527207, 46.847779, 47.857952, 48.524699, 49.528827, 50.59454, 51.2103, 52.158182, 53.185294, 53.852314, 54.890791, 55.844176, 56.520486, 57.521662, 58.559546, 59.231268, 61.590898, 61.901095, 63.923178, 64.532754, 66.446213, 67.155965, 69.228279, 69.891548, 70.856916, 71.861055, 72.48184, 73.183356, 73.521195, 74.545246, 75.143969, 75.880138, 76.222428, 77.21688, 77.819836, 78.518718, 78.84976, 79.859976, 80.519381, 81.183932, 81.542642, 82.4966, 83.175413, 83.827206, 84.160055, 85.184333, 85.870341, 86.519423, 86.839311, 87.885334, 88.528219, 89.180377, 89.524934, 90.486528, 91.215722, 92.209077, 93.853703, 95.180681, 95.895594, 96.553805, 97.512561, 98.520706, 99.238562, 101.180349, 101.841447, 102.566323, 103.885408, 104.548485, 105.23375, 106.535282, 107.189643, 107.856507, 109.166843, 109.884893, 110.563192, 111.834851, 113.214709, 114.524809, 115.81649, 117.144216, 118.529581, 119.821481, 121.208094, 122.46703, 123.237998, 123.854236, 124.189978, 125.205481, 125.889218, 126.557486, 126.874082, 127.843715, 128.545944, 129.530784, 130.539702, 131.23772, 131.867477, 132.187926, 133.197316, 133.84365, 134.528929, 134.850367, 135.841274, 136.524011, 137.218327, 137.541129, 138.514054, 139.925736, 140.247134, 141.886843, 142.875723, 143.882989, 144.478024, 145.566787, 148.215862, 149.216683, 149.874217, 151.852351, 152.534274, 153.562413];\n\n        this.frame = 0;\n        this.frameCount = 0;\n        this.currentAnimation = this.idleAnimation;\n        this.isDucking = false;\n    }\n\n    animate(ctx) {\n        this.move();\n        this.draw(ctx);\n    }\n    \n    draw(ctx) {\n        if (this.right){\n            this.currentAnimation = this.rightAnimation;\n        } else if (this.left) {\n            this.currentAnimation = this.leftAnimation;\n        } else {\n            this.currentAnimation = this.idleAnimation;\n        }\n\n        //only shows falling when going down height of a double jump\n        if (this.vel <= 10) {\n            ctx.drawImage(this.sprite, this.currentAnimation[this.frame].sX, \n                this.currentAnimation[this.frame].sY, 40, 56, this.x - 20, this.y, 40, 56);\n        } else {\n            ctx.drawImage(this.sprite, 107, 110, 40, 56, this.x, this.y, 40, 56);\n        }\n            \n        if (this.isDucking) {\n            ctx.drawImage(this.ducking, 0, 0, 100, 100, this.x - 50, this.y - 25, 100, 100);\n            setTimeout( ()=> {\n                this.isDucking = false\n            }, 100);\n        }\n\n        if (this.frameCount <= 10){\n            this.frameCount += 1;\n        } else {\n            this.frame = (this.frame + 1) % 9;\n            this.frameCount = 0;\n        }\n        \n    }\n    \n    jump() {\n        //allows for rapid double jump with < 1 ---> must press upkey again before player goes down with gravity \n        if (this.jumpCount > 0 && this.vel < 1 || this.collidesPlatformTop()[0]) {\n            this.vel = -1 * CONSTANTS.JUMP_SPEED;\n            this.jumpCount -= 1;\n        } else if (this.jumpCount === 0 && this.collidesPlatformTop()[0]) {\n            this.jumpCount = 2; \n        }\n    }\n    \n    duck(){\n        this.isDucking = true;\n\n        // console.log(this.song.currentTime)\n        // if (this.song.currentTime + 0.05 ) { \n        //     console.log('made it')\n        // } else {\n        //     console.log(this.song.currentTime)\n        // }\n        this.beats.forEach(beat => {\n            if (this.madeIt(beat)){\n                console.log('made it')\n            } \n        })\n    }\n\n    madeIt(time){\n        if (time > this.song.currentTime + 0.05 || time < this.song.currentTime - 0.05) return false;\n        return true;\n    }\n\n    move() {\n        //for each frame, the player should move by it's current velocity\n        //velocity is 'pixels per frame', so each frame it should update position by vel\n\n        //this code prevents player from falling out of bounds\n        // if (this.y >= this.dimensions.height) {\n        //     this.y = this.dimensions.height - CONSTANTS.PLAYER_HEIGHT - CONSTANTS.PLAYER_HEIGHT;\n        // } else if (this.y + this.vel < this.dimensions.height - CONSTANTS.PLAYER_HEIGHT ) {\n        //     this.y += this.vel;\n        // }\n      \n        if (this.left) this.x -= 4;\n        if (this.right) this.x += 4;\n        //the acceleration of gravity is in pixels per second per second\n        //so each second, it changes the velocity by whatever the gravity constant is\n        //we set a 'terminal velocity', a maximum speed the player can travel\n        if (Math.abs(this.vel) > CONSTANTS.TERMINAL_VEL) {\n            //if the terminal velocity is exceeded, we set it to the terminal velicty\n            if (this.vel > 0) {\n                this.vel = CONSTANTS.TERMINAL_VEL;\n            } else {\n                this.vel = CONSTANTS.TERMINAL_VEL * -1;\n            }\n        }\n        const platformCollides = this.collidesPlatformTop();\n        if (platformCollides[0]) {\n            this.y = platformCollides[1] - CONSTANTS.PLAYER_HEIGHT;\n            this.vel = 0;\n            this.jumpCount = 2;\n        } else {\n            this.vel += CONSTANTS.GRAVITY;\n            this.y += this.vel;\n        }\n        \n    }\n\n    collidesPlatformTop(){\n        let collides = false;\n        let tileTop = null;\n\n        this.platform.tiles.forEach( tileLine =>  {\n            tileLine.forEach( tile => {\n                //conditional checking if tile top is between player old y pos and player new pos\n                //x + 10 to allow player to stand on one foot without falling thru\n                if (this.y + CONSTANTS.PLAYER_HEIGHT <= tile.y && this.y + CONSTANTS.PLAYER_HEIGHT + this.vel >= tile.y\n                    && this.x + 10 > tile.x && this.x - 10 < tile.x + tile.w){\n                    collides = true;\n                    tileTop = tile.y;\n                }\n            })\n        })\n        return [collides, tileTop];\n    }\n    \n}\n\n//# sourceURL=webpack:///./src/player.js?");

/***/ }),

/***/ "./src/song.js":
/*!*********************!*\
  !*** ./src/song.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Song; });\nclass Song {\n\n    constructor(src) {\n        this.music = new Audio();\n        this.music.src = src;\n        this.beats = [1.22672, 1.527722, 2.501502, 3.176734, 3.887559, 4.20795, 5.192413, 5.836397, 6.519782, 6.853072, 7.841342, 8.190902, 9.217472, 10.51407, 10.846211, 11.888745, 13.178915, 13.8811, 14.549633, 14.87647, 15.87867, 16.51019, 17.504571, 18.551692, 19.195345, 20.193361, 21.202456, 21.790121, 22.57955, 22.879475, 23.835124, 25.211204, 25.527084, 26.522532, 27.895835, 28.191122, 29.156978, 29.865386, 30.140762, 30.499908, 31.903639, 32.540023, 33.147646, 33.500525, 34.494649, 35.203443, 35.529571, 35.873726, 37.201191, 37.881193, 38.555789, 38.875287, 39.857741, 40.511276, 41.180406, 41.497179, 42.521054, 43.170799, 43.853628, 44.179862, 45.222432, 45.835863, 46.527207, 46.847779, 47.857952, 48.524699, 49.528827, 50.59454, 51.2103, 52.158182, 53.185294, 53.852314, 54.890791, 55.844176, 56.520486, 57.521662, 58.559546, 59.231268, 61.590898, 61.901095, 63.923178, 64.532754, 66.446213, 67.155965, 69.228279, 69.891548, 70.856916, 71.861055, 72.48184, 73.183356, 73.521195, 74.545246, 75.143969, 75.880138, 76.222428, 77.21688, 77.819836, 78.518718, 78.84976, 79.859976, 80.519381, 81.183932, 81.542642, 82.4966, 83.175413, 83.827206, 84.160055, 85.184333, 85.870341, 86.519423, 86.839311, 87.885334, 88.528219, 89.180377, 89.524934, 90.486528, 91.215722, 92.209077, 93.853703, 95.180681, 95.895594, 96.553805, 97.512561, 98.520706, 99.238562, 101.180349, 101.841447, 102.566323, 103.885408, 104.548485, 105.23375, 106.535282, 107.189643, 107.856507, 109.166843, 109.884893, 110.563192, 111.834851, 113.214709, 114.524809, 115.81649, 117.144216, 118.529581, 119.821481, 121.208094, 122.46703, 123.237998, 123.854236, 124.189978, 125.205481, 125.889218, 126.557486, 126.874082, 127.843715, 128.545944, 129.530784, 130.539702, 131.23772, 131.867477, 132.187926, 133.197316, 133.84365, 134.528929, 134.850367, 135.841274, 136.524011, 137.218327, 137.541129, 138.514054, 139.925736, 140.247134, 141.886843, 142.875723, 143.882989, 144.478024, 145.566787, 148.215862, 149.216683, 149.874217, 151.852351, 152.534274, 153.562413];\n    }\n\n    play(){\n        this.music.play();\n    }\n\n    currentTime(){\n        this.music.currentTime;\n    }\n\n    pause(){\n        this.music.pause();\n    }\n}\n\n\n\n//# sourceURL=webpack:///./src/song.js?");

/***/ })

/******/ });