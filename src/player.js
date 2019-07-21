const CONSTANTS = {
    GRAVITY: 0.4,
    JUMP_SPEED: 8,
    TERMINAL_VEL: 10,
    PLAYER_WIDTH: 40,
    PLAYER_HEIGHT: 56
};

export default class Player {

    constructor(dimensions, platform, song) {
        this.dimensions = dimensions;
        this.platform = platform;
        this.song = song;

        ///player will start off on one of the bottom tiles
        const startTile = this.platform.tiles[4][Math.floor(Math.random() * 2)];
        this.x = startTile.x + (startTile.w / 2);
        this.y = 500 - CONSTANTS.PLAYER_HEIGHT;

        this.vel = 0;
        this.jumpCount = 2;

        this.right = false;
        this.left = false;

        this.sprite = new Image();
        this.sprite.src = "img/sprite.png";
        this.ducking = new Image();
        this.ducking.src = "img/duck.png";

        this.idleAnimation = [
            {sX: 0, sY: 384},
            {sX: 56, sY: 384},
            {sX: 112, sY: 384},
            {sX: 165, sY: 384},
            {sX: 219, sY: 384},
            {sX: 277, sY: 384},
            {sX: 331, sY: 384},
            {sX: 389, sY: 384},
            {sX: 443, sY: 384}
        ];
        this.rightAnimation = [
            {sX: 0, sY: 0},
            {sX: 53, sY: 0},
            {sX: 107, sY: 0},
            {sX: 163, sY: 0},
            {sX: 217, sY: 0},
            {sX: 273, sY: 0},
            {sX: 329, sY: 0},
            {sX: 383, sY: 0},
            {sX: 439, sY: 0}
        ];
        this.leftAnimation = [
            {sX: 0, sY: 554},
            {sX: 60, sY: 554},
            {sX: 112, sY: 554},
            {sX: 170, sY: 554},
            {sX: 225, sY: 554},
            {sX: 278, sY: 554},
            {sX: 333, sY: 554},
            {sX: 390, sY: 554},
            {sX: 443, sY: 554}
        ];
        this.duckAnimation = [
            { sX: 0, sY: 384 },
            { sX: 56, sY: 384 },
            { sX: 112, sY: 384 },
            { sX: 165, sY: 384 },
            { sX: 219, sY: 384 },
            { sX: 277, sY: 384 },
            { sX: 331, sY: 384 },
            { sX: 389, sY: 384 },
            { sX: 443, sY: 384 }
        ];
        this.fallingAnimation = [
            { sX: 0, sY: 384 },
            { sX: 56, sY: 384 },
            { sX: 112, sY: 384 },
            { sX: 165, sY: 384 },
            { sX: 219, sY: 384 },
            { sX: 277, sY: 384 },
            { sX: 331, sY: 384 },
            { sX: 389, sY: 384 },
            { sX: 443, sY: 384 }
        ];

        this.frame = 0;
        this.frameCount = 0;
        this.currentAnimation = this.idleAnimation;
        this.isDucking = false;
    }

    animate(ctx) {
        this.move();
        this.draw(ctx);
    }
    
    draw(ctx) {
        if (this.right){
            this.currentAnimation = this.rightAnimation;
        } else if (this.left) {
            this.currentAnimation = this.leftAnimation;
        } else {
            this.currentAnimation = this.idleAnimation;
        }

        //only shows falling when going down height of a double jump
        if (this.vel <= 9) {
            ctx.drawImage(this.sprite, this.currentAnimation[this.frame].sX, 
                this.currentAnimation[this.frame].sY, 40, 56, this.x - 20, this.y, 40, 56);
        } else {
            ctx.drawImage(this.sprite, 107, 110, 40, 56, this.x, this.y, 40, 56);
        }
            
        if (this.isDucking) {
            ctx.drawImage(this.ducking, 0, 0, 100, 100, this.x - 50, this.y - 25, 100, 100);
            setTimeout( ()=> {
                this.isDucking = false
            }, 100);
        }

        if (this.frameCount <= 15){
            this.frameCount += 1;
        } else {
            this.frame = (this.frame + 1) % 9;
            this.frameCount = 0;
        }
        
    }
    
    jump() {
        //allows for rapid double jump with < 1 ---> must press upkey again before player goes down with gravity 
        if (this.jumpCount > 0 && this.vel < 1 || this.collidesPlatformTop()[0]) {
            this.vel = -1 * CONSTANTS.JUMP_SPEED;
            this.jumpCount -= 1;
        } else if (this.jumpCount === 0 && this.collidesPlatformTop()[0]) {
            this.jumpCount = 2; 
        }
    }
    
    duck(){
        this.isDucking = true;

        if (this.madeIt(3.18) || this.madeIt(3.84) || 
            this.madeIt(5.2) || this.madeIt(5.87)) { 
            console.log('made it')
        } else {
            console.log(this.song.currentTime)
        }
    }

    madeIt(time){
        if (time > this.song.currentTime + 0.05 || time < this.song.currentTime - 0.05) return false;
        return true;
    }

    move() {
        //for each frame, the player should move by it's current velocity
        //velocity is 'pixels per frame', so each frame it should update position by vel

        //this code prevents player from falling out of bounds
        // if (this.y >= this.dimensions.height) {
        //     this.y = this.dimensions.height - CONSTANTS.PLAYER_HEIGHT - CONSTANTS.PLAYER_HEIGHT;
        // } else if (this.y + this.vel < this.dimensions.height - CONSTANTS.PLAYER_HEIGHT ) {
        //     this.y += this.vel;
        // }
      
        if (this.left) this.x -= 4;
        if (this.right) this.x += 4;
        //the acceleration of gravity is in pixels per second per second
        //so each second, it changes the velocity by whatever the gravity constant is
        //we set a 'terminal velocity', a maximum speed the player can travel
        if (Math.abs(this.vel) > CONSTANTS.TERMINAL_VEL) {
            //if the terminal velocity is exceeded, we set it to the terminal velicty
            if (this.vel > 0) {
                this.vel = CONSTANTS.TERMINAL_VEL;
            } else {
                this.vel = CONSTANTS.TERMINAL_VEL * -1;
            }
        }
        const platformCollides = this.collidesPlatformTop();
        if (platformCollides[0]) {
            this.y = platformCollides[1] - CONSTANTS.PLAYER_HEIGHT;
            this.vel = 0;
            this.jumpCount = 2;
        } else {
            this.vel += CONSTANTS.GRAVITY;
            this.y += this.vel;
        }
        
    }

    collidesPlatformTop(){
        let collides = false;
        let tileTop = null;

        this.platform.tiles.forEach( tileLine =>  {
            tileLine.forEach( tile => {
                //conditional checking if tile top is between player old y pos and player new pos
                //x + 10 to allow player to stand on one foot without falling thru
                if (this.y + CONSTANTS.PLAYER_HEIGHT <= tile.y && this.y + CONSTANTS.PLAYER_HEIGHT + this.vel >= tile.y
                    && this.x + 10 > tile.x && this.x - 10 < tile.x + tile.w){
                    collides = true;
                    tileTop = tile.y;
                }
            })
        })
        return [collides, tileTop];
    }
}