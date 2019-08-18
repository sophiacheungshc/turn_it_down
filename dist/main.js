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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return TurnItDown; });\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ \"./src/player.js\");\n/* harmony import */ var _platform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./platform */ \"./src/platform.js\");\n/* harmony import */ var _song__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./song */ \"./src/song.js\");\n\n\n\n\nclass TurnItDown { \n    constructor(canvas) {\n        this.ctx = canvas.getContext(\"2d\");\n        this.dimensions = { width: canvas.width, height: canvas.height };\n\n        this.visualizer = document.getElementById(\"visualizer\");\n        this.ctx2 = this.visualizer.getContext(\"2d\");\n\n        this.background = new Image();\n        this.background.src = \"img/background.png\";\n        this.ready = new Image();\n        this.ready.src = \"img/ready.png\";\n        this.over = new Image();\n        this.over.src = \"img/over.png\";\n        this.retry = new Image();\n        this.retry.src = \"img/retry.png\";\n        this.won = new Image();\n        this.won.src = \"img/won.png\";\n\n        this.x = 0;\n        this.y = 600;\n\n        this.animate = this.animate.bind(this);\n\n        window.addEventListener(\"keydown\", this.key.bind(this));\n        window.addEventListener(\"keyup\", this.keyUp.bind(this));\n\n        this.state = {\n            current: 0,\n            getReady: 0,\n            game: 1,\n            over: 2\n        }\n\n        this.ducked = false;\n        this.prevBeat = false;\n        this.restart();\n    }\n    \n    start(){\n        switch(this.state.current){\n            case this.state.getReady:\n                this.state.current = this.state.game;\n                this.song = new _song__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this.ctx);\n                this.music = this.song.music;\n                this.music.play();\n                break;\n            case this.state.over:\n                this.restart();\n                break;\n        }\n    }\n\n    key(e) {\n        e.preventDefault();\n        if (this.state.current === this.state.game) {\n            if (e.keyCode === 38) this.player.jump();\n            if (e.keyCode === 37) this.player.left = true;\n            if (e.keyCode === 39) this.player.right = true;\n            if (e.keyCode === 32) {\n                console.log(this.music.currentTime)\n                this.player.duck();\n                this.ducked = true;\n                setTimeout(() => {\n                    this.ducked = false\n                }, 500);\n            }\n        } else {\n            if (e.keyCode === 32) this.start();\n        }\n    }\n\n    keyUp(e) {\n        if (this.state.current === this.state.game) {\n            if (e.keyCode === 37) this.player.left = false;\n            if (e.keyCode === 39) this.player.right = false;\n        }\n    }\n    \n    restart() {\n        this.state.current = this.state.getReady;\n        this.platform = new _platform__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.dimensions);\n        this.song = new _song__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this.ctx);\n        this.music = this.song.music;\n        this.player = new _player__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.dimensions, this.platform, this.music);\n\n\n        this.animate();\n    }\n\n    animate(){\n        this.backgroundDraw();\n        this.platform.animate(this.ctx);\n        this.player.animate(this.ctx);\n\n        if (this.state.current !== this.state.getReady && this.gameOver()) {\n            this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);\n            this.ctx2.clearRect(0, 0, this.visualizer.width, this.visualizer.height);\n            this.ctx.drawImage(this.over, 0, 0, 250, 134, this.dimensions.width / 4, this.dimensions.height / 6, 250, 134);\n            this.ctx.drawImage(this.retry, 0, 0, 400, 34, 45, this.dimensions.height / 2, 400, 34);\n        } else if (this.music.ended) {\n                this.music.pause();\n                this.music.currentTime = 0;\n                this.state.current = this.state.over;\n                this.ctx.clearRect(0, 0, 480, 640);\n                this.ctx2.clearRect(0, 0, this.visualizer.width, this.visualizer.height);\n            this.ctx.drawImage(this.won, 0, 0, 439, 350, 20, 100, 439, 350);\n        } else {\n            if (this.state.current === this.state.game) {\n                this.frame = requestAnimationFrame(this.animate);\n                this.song.visualize();\n            } else if (this.state.current === this.state.over && this.music.currentTime === 0) {\n                this.ctx.clearRect(0, 0, 480, 640);\n                this.ctx2.clearRect(0, 0, this.visualizer.width, this.visualizer.height);\n                // this.ctx.drawImage(this.over, 0, 0, 250, 134, this.dimensions.width / 5, this.dimensions.height / 6, 250, 134);\n                this.frame = requestAnimationFrame(this.animate);\n            } else if (this.state.current === this.state.getReady) {\n                this.ctx.clearRect(0, 0, 480, 640);\n                this.ctx.drawImage(this.ready, 0, 0, 400, 132, 45, this.dimensions.height / 4, 400, 132);\n                this.frame = requestAnimationFrame(this.animate);\n            }    \n        }\n    }\n        \n    backgroundDraw(){\n        this.ctx.drawImage(this.background, this.x, this.y, 480, 640, 0, 0, 480, 640);\n        if (this.y < 0) this.y += (2400-640);\n\n        //background scroll\n        this.y -= 0.2;\n    }\n\n    gameOver(){\n        \n        if ((this.song.needaDuck && !this.ducked) || this.player.y >= this.dimensions.height) {\n        // if (this.player.y >= this.dimensions.height) {\n            this.state.current = this.state.over;\n            this.music.pause();\n            this.music.currentTime = 0;\n            return true;\n        } \n\n        return false;\n    }\n\n}\n\n\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\nconst canvas = document.getElementById('tid-game');\ndocument.getElementById(\"github\").addEventListener(\"click\", () => { window.open('https://github.com/sophiacheungshc/turn_it_down')} )\n\nwindow.TurnItDown = new _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"](canvas);\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/platform.js":
/*!*************************!*\
  !*** ./src/platform.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Platform; });\nclass Platform {\n    constructor(dimensions) {\n        this.dimensions = dimensions;\n        \n        this.platform = new Image();\n        this.platform.src = \"img/platform.png\";\n\n        this.protoTiles = [\n            // {shortTile: \n            {\n                sX: 36,\n                sY: 476,\n                w: 38,\n                h: 38,\n                x: 0,\n                y: 0\n            },\n            // {medTile: \n            {\n                sX: 0,\n                sY: 329,\n                w: 111,\n                h: 13,\n                x: 0,\n                y: 0\n            },\n            // {longTile: \n            {\n                sX: 0,\n                sY: 165,\n                w: 166,\n                h: 31,\n                x: 0,\n                y: 0\n            },\n        ];\n\n        //100-500 indicate y positions => lines 1 - 5\n        this.tiles = [\n            ///player will start off on one of these top tiles\n            this.randomTiles(100),\n            this.randomTiles(200),\n            this.randomTiles(300),\n            this.randomTiles(400),\n            this.randomTiles(500)\n        ];\n\n    }\n\n    randomTiles(y) {\n        //2 random tiles out of 3 different lengths\n        //Object.assign because protoTiles were being changed each time \n        const leftTile = Object.assign({}, this.protoTiles[Math.floor(Math.random() * 3)]);\n        const rightTile = Object.assign({}, this.protoTiles[Math.floor(Math.random() * 3)]);\n\n        leftTile.x = Math.floor(Math.random() * (240 - leftTile.w + 1));\n        rightTile.x = Math.floor(Math.random() * (480 - rightTile.w - 240 + 1)) + 240;\n\n        leftTile.y = y;\n        rightTile.y = y;\n\n        return [leftTile, rightTile];\n    }\n\n    eachTileLine(callback) {\n        this.tiles.forEach(callback.bind(this));\n    }\n\n    moveTiles() {\n        this.eachTileLine(function (tileLine) {\n            tileLine[0].y += 1.3;\n            tileLine[1].y += 1.3;\n\n            const newTiles = this.randomTiles(100);\n\n            //if a tile line has left the bottom of the screen add a new line to the top\n            if (tileLine[0].y >= 640) {\n                tileLine.shift();\n                tileLine.unshift(newTiles[0]);\n            }\n            if (tileLine[1].y >= 640) {\n                tileLine.pop();\n                tileLine.push(newTiles[1]);\n            }\n\n        });\n    }\n\n    drawTiles(ctx) {\n\n        this.eachTileLine(function (tileLine) {\n\n            //draw left tile\n            ctx.drawImage(this.platform, tileLine[0].sX, tileLine[0].sY, \n                tileLine[0].w, tileLine[0].h, tileLine[0].x, tileLine[0].y, \n                tileLine[0].w, tileLine[0].h);\n                \n            //draw right tile\n            ctx.drawImage(this.platform, tileLine[1].sX, tileLine[1].sY,\n                tileLine[1].w, tileLine[1].h, tileLine[1].x, tileLine[1].y,\n                tileLine[1].w, tileLine[1].h);\n\n        });\n    }\n\n    animate(ctx) {\n        this.moveTiles();\n        this.drawTiles(ctx);\n    }\n\n}\n\n//# sourceURL=webpack:///./src/platform.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Player; });\nconst CONSTANTS = {\n    GRAVITY: 0.4,\n    JUMP_SPEED: 8,\n    TERMINAL_VEL: 10,\n    PLAYER_WIDTH: 40,\n    PLAYER_HEIGHT: 56\n};\n\nclass Player {\n\n    constructor(dimensions, platform, song) {\n        this.dimensions = dimensions;\n        this.platform = platform;\n        this.song = song;\n\n        ///player will start off on one of the top tiles\n        const startTile = this.platform.tiles[1][Math.floor(Math.random() * 2)];\n        this.x = startTile.x + (startTile.w / 2);\n        this.y = startTile.y - CONSTANTS.PLAYER_HEIGHT;\n\n        this.vel = 0;\n        this.jumpCount = 2;\n\n        this.right = false;\n        this.left = false;\n\n        this.sprite = new Image();\n        this.sprite.src = \"img/sprite.png\";\n        this.ducking = new Image();\n        this.ducking.src = \"img/duck.png\";\n\n        this.idleAnimation = [\n            {sX: 0, sY: 384},\n            {sX: 56, sY: 384},\n            {sX: 112, sY: 384},\n            {sX: 165, sY: 384},\n            {sX: 219, sY: 384},\n            {sX: 277, sY: 384},\n            {sX: 331, sY: 384},\n            {sX: 389, sY: 384},\n            {sX: 443, sY: 384}\n        ];\n        this.rightAnimation = [\n            {sX: 0, sY: 0},\n            {sX: 53, sY: 0},\n            {sX: 107, sY: 0},\n            {sX: 163, sY: 0},\n            {sX: 217, sY: 0},\n            {sX: 273, sY: 0},\n            {sX: 329, sY: 0},\n            {sX: 383, sY: 0},\n            {sX: 439, sY: 0}\n        ];\n        this.leftAnimation = [\n            {sX: 0, sY: 554},\n            {sX: 60, sY: 554},\n            {sX: 112, sY: 554},\n            {sX: 170, sY: 554},\n            {sX: 225, sY: 554},\n            {sX: 278, sY: 554},\n            {sX: 333, sY: 554},\n            {sX: 390, sY: 554},\n            {sX: 443, sY: 554}\n        ];\n        this.duckAnimation = [\n            { sX: 0, sY: 384 },\n            { sX: 56, sY: 384 },\n            { sX: 112, sY: 384 },\n            { sX: 165, sY: 384 },\n            { sX: 219, sY: 384 },\n            { sX: 277, sY: 384 },\n            { sX: 331, sY: 384 },\n            { sX: 389, sY: 384 },\n            { sX: 443, sY: 384 }\n        ];\n        this.fallingAnimation = [\n            { sX: 0, sY: 384 },\n            { sX: 56, sY: 384 },\n            { sX: 112, sY: 384 },\n            { sX: 165, sY: 384 },\n            { sX: 219, sY: 384 },\n            { sX: 277, sY: 384 },\n            { sX: 331, sY: 384 },\n            { sX: 389, sY: 384 },\n            { sX: 443, sY: 384 }\n        ];\n\n        this.frame = 0;\n        this.frameCount = 0;\n        this.currentAnimation = this.idleAnimation;\n        this.isDucking = false;\n    }\n\n    animate(ctx) {\n        this.move();\n        this.draw(ctx);\n    }\n    \n    draw(ctx) {\n        if (this.isDucking) {\n            ctx.drawImage(this.ducking, 0, 0, 100, 100, this.x - 50, this.y - 25, 100, 100);\n            ctx.drawImage(this.sprite, 55, 58, 40, 56, this.x - 20, this.y, 40, 56);\n            setTimeout( ()=> {\n                this.isDucking = false\n            }, 500);\n        } else {\n            if (this.right){\n                this.currentAnimation = this.rightAnimation;\n            } else if (this.left) {\n                this.currentAnimation = this.leftAnimation;\n            } else {\n                this.currentAnimation = this.idleAnimation;\n            }\n    \n            //only shows falling when going down height of a double jump\n            if (this.vel <= 10) {\n                ctx.drawImage(this.sprite, this.currentAnimation[this.frame].sX, \n                    this.currentAnimation[this.frame].sY, 40, 56, this.x - 20, this.y, 40, 56);\n            } else {\n                ctx.drawImage(this.sprite, 107, 110, 40, 56, this.x, this.y, 40, 56);\n            }\n        }\n            \n\n        if (this.frameCount <= 10){\n            this.frameCount += 1;\n        } else {\n            this.frame = (this.frame + 1) % 9;\n            this.frameCount = 0;\n        }\n        \n    }\n    \n    jump() {\n        //allows for rapid double jump with < 1 ---> must press upkey again before player goes down with gravity \n        if (this.jumpCount > 0 && this.vel < 1 || this.collidesPlatformTop()[0]) {\n            this.vel = -1 * CONSTANTS.JUMP_SPEED;\n            this.jumpCount -= 1;\n        } else if (this.jumpCount === 0 && this.collidesPlatformTop()[0]) {\n            this.jumpCount = 2; \n        }\n    }\n    \n    duck(){\n        this.isDucking = true;\n    }\n\n    madeIt(time){\n        if (time > this.song.currentTime + 0.05 || time < this.song.currentTime - 0.05) return false;\n        return true;\n    }\n\n    move() {\n        //for each frame, the player should move by it's current velocity\n        //velocity is 'pixels per frame', so each frame it should update position by vel\n\n        //this code prevents player from falling out of bounds\n        // if (this.y >= this.dimensions.height) {\n        //     this.y = this.dimensions.height - CONSTANTS.PLAYER_HEIGHT - CONSTANTS.PLAYER_HEIGHT;\n        // } else if (this.y + this.vel < this.dimensions.height - CONSTANTS.PLAYER_HEIGHT ) {\n        //     this.y += this.vel;\n        // }\n      \n        if (this.left) this.x -= 4;\n        if (this.right) this.x += 4;\n        //the acceleration of gravity is in pixels per second per second\n        //so each second, it changes the velocity by whatever the gravity constant is\n        //we set a 'terminal velocity', a maximum speed the player can travel\n        if (Math.abs(this.vel) > CONSTANTS.TERMINAL_VEL) {\n            //if the terminal velocity is exceeded, we set it to the terminal velicty\n            if (this.vel > 0) {\n                this.vel = CONSTANTS.TERMINAL_VEL;\n            } else {\n                this.vel = CONSTANTS.TERMINAL_VEL * -1;\n            }\n        }\n        const platformCollides = this.collidesPlatformTop();\n        if (platformCollides[0]) {\n            this.y = platformCollides[1] - CONSTANTS.PLAYER_HEIGHT;\n            this.vel = 0;\n            this.jumpCount = 2;\n        } else {\n            this.vel += CONSTANTS.GRAVITY;\n            this.y += this.vel;\n        }\n        \n    }\n\n    collidesPlatformTop(){\n        let collides = false;\n        let tileTop = null;\n\n        this.platform.tiles.forEach( tileLine =>  {\n            tileLine.forEach( tile => {\n                //conditional checking if tile top is between player old y pos and player new pos\n                //x + 10 to allow player to stand on one foot without falling thru\n                if (this.y + CONSTANTS.PLAYER_HEIGHT <= tile.y && this.y + CONSTANTS.PLAYER_HEIGHT + this.vel >= tile.y\n                    && this.x + 10 > tile.x && this.x - 10 < tile.x + tile.w){\n                    collides = true;\n                    tileTop = tile.y;\n                }\n            })\n        })\n        return [collides, tileTop];\n    }\n    \n}\n\n//# sourceURL=webpack:///./src/player.js?");

/***/ }),

/***/ "./src/song.js":
/*!*********************!*\
  !*** ./src/song.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Song; });\nclass Song {\n\n    constructor(ctx) {\n        \n        this.ctx1 = ctx;\n        this.canvas = document.getElementById(\"visualizer\");\n        this.ctx = this.canvas.getContext(\"2d\");\n\n        if (document.getElementById('sunflower-song').checked){\n            this.music = document.getElementById('sunflower');\n            this.bps = 2.7;\n            this.firstBeat = 4;\n            this.interval = 0.48;\n            // this.beats =\n            //     [3.213065, 3.872749, 4.187596, 5.204652, 5.887114, 6.538934, 6.857041, 7.83132, 8.495047, 9.192563, 9.531511, 10.511366, 11.21205, 11.863047, 12.190406, 13.162107, 13.858648, 14.528459, 14.871855, 15.827137, 16.521702, 17.237666, 17.556692, 18.504399, 19.176457, 19.846555, 20.182578, 21.181199, 21.86326, 22.50438, 22.846213, 23.802691, 24.509204, 25.140981, 25.490467, 26.505405, 27.205429, 27.878758, 28.189615, 29.122952, 29.810234, 30.509916, 30.837726, 31.822042, 32.515678, 33.203755, 33.499801, 34.48136, 35.138477, 35.861624, 36.197783, 37.162338, 37.843591, 38.507225, 38.84504, 39.807029, 40.490618, 41.197643, 41.501018, 42.471219, 43.169383, 43.832087, 44.178929, 45.150966, 45.843932, 46.504432, 46.863542, 47.833257, 48.494831, 49.213469, 49.5436, 50.539229, 51.204529, 51.875948, 52.180751, 53.163717, 53.899981, 54.556327, 54.871625, 55.808203, 56.531162, 57.213934, 57.533856, 58.529806, 59.196462, 60.151946, 61.204714, 61.860038, 62.810738, 63.85, 64.478658, 65.480043, 66.535709, 67.160534, 68.159383, 69.215001, 69.90153, 70.527071, 70.876908, 71.868999, 72.51437, 73.204648, 73.535515, 74.52083, 75.206741, 75.872538, 76.221395, 77.219098, 77.879155, 78.566581, 78.908685, 79.8289, 80.528895, 81.154682, 81.527547, 82.542067, 83.218459, 83.901569, 84.209898, 85.171399, 85.901184, 86.552779, 86.903477, 87.865072, 88.533905, 89.193634, 89.544027, 90.481812, 91.222037, 92.186578, 95.897609, 96.498016, 97.162701, 97.507769, 98.555856, 99.216271, 99.832508, 100.185126, 101.189058, 101.846306, 102.545891, 102.879379, 103.882544, 104.550926, 105.205295, 105.522301, 106.546095, 107.207112, 107.86688, 108.212636, 109.195663, 109.864431, 110.523722, 110.867807, 111.83902, 123.192882, 123.858931, 124.196055, 125.198947, 125.862995, 126.530771, 126.88162, 127.838581, 128.531995, 129.194814, 129.554865, 130.523532, 131.207737, 131.832705, 132.187441, 133.210455, 133.829802, 134.488314, 134.83457, 135.755137, 136.560037, 137.227001, 137.590749, 138.490381, 139.179974, 139.854018, 140.200925, 141.215266, 141.832674, 142.502263, 142.856791, 143.872584]\n        } else if (document.getElementById('faded-song').checked){\n            this.music = document.getElementById('faded');\n            this.bps = 1.4;\n            this.firstBeat = 2;\n            this.interval = 1;\n            // this.beats =\n            //     [11.388368, 14.049613, 16.683368, 19.358908, 22.064994, 24.720243, 27.350127, 29.945018, 32.694734, 33.40836, 34.013865, 34.66984, 35.31849, 36.022038, 36.653425, 37.311712, 38.01863, 38.675487, 39.363677, 40.020984, 40.668035, 41.352631, 42.020131, 42.658589, 43.360694, 44.022849, 44.689301, 45.317273, 45.99774, 46.623005, 47.312719, 47.950685, 48.625551, 49.261277, 49.955911, 50.634884, 51.287736, 51.986311, 52.647582, 55.311576, 56.657898, 58.00672, 59.378954, 60.638797, 62.01119, 63.312211, 64.599003, 66.004886, 67.323165, 68.68774, 70.008061, 71.321342, 72.710849, 74.023271, 75.343502, 76.640439, 77.960587, 79.300722, 80.635904, 81.992872, 83.37773, 84.712863, 86.001693, 87.321577, 88.650045, 90.069076, 91.313109, 92.656493, 94.000714, 95.334265, 96.616381, 97.968418, 100.675827, 101.94455, 103.332619, 104.580195, 105.988154, 107.261311, 108.648588, 109.949838, 111.324599, 112.604383, 114.037369, 115.312496, 116.649051, 117.964443, 119.333831, 119.983699, 120.668966, 121.320452, 121.984837, 122.629402, 123.305157, 123.993965, 124.649557, 125.30357, 125.987154, 126.607746, 127.282303, 127.952018, 128.670214, 129.335761, 129.931355, 130.60379, 131.262965, 131.887481, 132.594092, 133.251856, 133.95456, 134.648085, 135.337879, 135.989469, 136.640522, 137.293008, 138.013262, 138.66614, 139.279891, 139.978048, 140.667213, 141.384665, 142.039539, 142.708154, 143.389804, 144.025079, 144.728909, 145.405369, 146.028551, 146.695338, 147.348109, 148.03458, 148.743956, 149.401067, 150.059518, 150.760677, 152.696693, 154.045479, 155.336029, 156.585484, 157.974092, 159.312223, 160.635573, 161.995252, 163.331265, 164.5936, 165.975844, 167.291154, 168.63536, 169.930653, 171.273932, 172.634429, 173.970815, 175.281743, 176.671651, 177.937901, 179.262958, 180.614983, 182.020597, 183.333109, 184.659804, 185.951068, 187.3414, 188.628768, 189.951942, 191.320275, 192.65, 194.032484, 195.269008, 196.679695, 197.968322, 199.322395, 200.624373, 202.000956, 203.639426]\n        } else {\n            this.music = document.getElementById('dolphin');\n            this.bps = 1.1;\n            this.firstBeat = 3;\n            this.interval = 1.3;\n        }\n\n        this.needaDuck = false;\n\n        this.alert = new Image();\n        this.alert.src = \"img/spacebar.png\";\n\n        const volSlider = document.getElementById(\"volSlider\");\n        volSlider.addEventListener('input', function () {\n            document.querySelectorAll(\"audio\").forEach( song => {\n                song.volume = volSlider.value\n            });\n        }); \n\n        this.width = this.canvas.width;\n        this.height = this.canvas.height;\n        this.topY = 0;\n        this.bottomY = this.height;\n        this.op = 0;\n    }\n\n    visualize() {\n        \n        let x = (Math.round(this.music.currentTime * 10) / 10) % this.bps;\n\n        //round the rounded result again for +/- 0.01, just rounding once would leave out other close beats\n        if (this.music.currentTime !== 0 && (x === 0 || (Math.round(x * 10) / 10) % this.bps === 0)) {\n            //offset first beat\n            if (this.music.currentTime > this.firstBeat) {\n                this.ctx1.drawImage(this.alert, 0, 0, 150, 56, 180, 0, 150, 56);\n                this.needaDuck = true;\n            }\n            this.ctx.fillStyle = 'white';\n            this.ctx.fillRect(0, 0, this.width, this.height);\n            this.topY = 0;\n            this.bottomY = this.height;\n            this.op = 0;\n        } else {\n            this.needaDuck = false;\n\n            //let alert image come up 0.1s before actual beat\n            if (x === this.bps-0.1 || (Math.round(x * 10) / 10) % this.bps === this.bps-0.1) {\n                if (this.music.currentTime > this.firstBeat) {\n                    this.ctx1.drawImage(this.alert, 0, 0, 150, 56, 180, 0, 150, 56);\n                }\n            }\n            this.ctx.clearRect(0, 0, this.width, this.height);\n            this.ctx.fillStyle = `rgba(200, 166, 234, ${this.op})`;\n            this.ctx.fillRect(0, this.topY, this.width, 10);\n            this.ctx.fillStyle = `rgba(104, 157, 255, ${this.op})`;\n            this.ctx.fillRect(0, this.bottomY, this.width, 10);\n            this.topY += this.interval;\n            this.bottomY -= this.interval;\n            this.op += 0.007;\n        }\n    }\n\n    play(){\n        this.music.play();\n    }\n\n    currentTime(){\n        return this.music.currentTime;\n    }\n\n    pause(){\n        this.music.pause();\n    }\n}\n\n\n\n//# sourceURL=webpack:///./src/song.js?");

/***/ })

/******/ });