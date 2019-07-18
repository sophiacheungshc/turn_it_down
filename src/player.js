const CONSTANTS = {
    GRAVITY: 0.4,
    JUMP_SPEED: 8,
    TERMINAL_VEL: 10,
    PLAYER_WIDTH: 36,
    PLAYER_HEIGHT: 42
};

export default class Player {

    constructor(dimensions) {
        this.dimensions = dimensions;
        this.x = this.dimensions.width / 2;
        // this.y = this.dimensions.height - this.dimensions.height / 8;
        this.y = 0 ;
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

        ctx.drawImage(this.sprite, 0, 0, 36, 42, this.x, this.y, 36, 42);
    }

    jump() {
        //if this were a more realistic bird simulation, we would be adding to the velocity
        //instead of just assigning it outright
        this.vel = -1 * CONSTANTS.JUMP_SPEED;
    }

    move() {
        //for each frame, the player should move by it's current velocity
        //velocity is 'pixels per frame', so each frame it should update position by vel
        this.y += this.vel;
        if (this.left) this.x -= 10;
        if (this.right) this.x += 10;
        //the acceleration of gravity is in pixels per second per second
        //so each second, it changes the velocity by whatever the gravity constant is
        this.vel += CONSTANTS.GRAVITY;
        //we set a 'terminal velocity', a maximum speed the player can travel
        //this keeps the game from becoming too wild because the player is moving too fast to control
        if (Math.abs(this.vel) > CONSTANTS.TERMINAL_VEL) {
            //if the terminal velocity is exceeded, we set it to the terminal velicty
            if (this.vel > 0) {
                this.vel = CONSTANTS.TERMINAL_VEL;
            } else {
                this.vel = CONSTANTS.TERMINAL_VEL * -1;
            }
        }
    }

}