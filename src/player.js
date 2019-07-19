import Platform from './platform';

const CONSTANTS = {
    GRAVITY: 0.4,
    JUMP_SPEED: 8,
    TERMINAL_VEL: 10,
    PLAYER_WIDTH: 36,
    PLAYER_HEIGHT: 42
};

export default class Player {

    constructor(dimensions, platform) {
        this.dimensions = dimensions;
        this.platform = platform;

        this.x = this.dimensions.width / 2;
        this.y = this.dimensions.height - this.dimensions.height / 8;

        this.vel = 0;

        this.right = false;
        this.left = false;

        this.sprite = new Image();
        this.sprite.src = "img/sprite.png";
    }

    animate(ctx) {
        this.move();
        this.draw(ctx);
    }

    draw(ctx) {
        ctx.drawImage(this.sprite, 0, 0, 36, 42, this.x - 18, this.y, 36, 42);
    }

    jump() {
        this.vel = -1 * CONSTANTS.JUMP_SPEED;
    }

    move() {
        //for each frame, the player should move by it's current velocity
        //velocity is 'pixels per frame', so each frame it should update position by vel
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
    };

}