const CONSTANTS = {
    GRAVITY: 0.1,
    FLAP_SPEED: 8,
    TERMINAL_VEL: 12,
    PLAYER_WIDTH: 36,
    PLAYER_HEIGHT: 42
};

export default class Player {

    constructor(dimensions) {
        this.dimensions = dimensions;
        this.x = this.dimensions.width / 2;
        this.y = this.dimensions.height - this.dimensions.height / 8;
        this.vel = 0;

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
        //to make the experience more fun and 'bouncy' we just set it directly
        this.vel = -1 * CONSTANTS.FLAP_SPEED;
    }

    move() {
        //for each frame, the player should move by it's current velocity
        //velocity is 'pixels per frame', so each frame it should update position by vel
        this.y += this.vel;
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