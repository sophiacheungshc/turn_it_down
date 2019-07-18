const CONSTANTS = {
    GRAVITY: 0.4,
    FLAP_SPEED: 8,
    TERMINAL_VEL: 12,
    BIRD_WIDTH: 40,
    BIRD_HEIGHT: 30
};

export default class Player {

    constructor(dimensions) {
        this.dimensions = dimensions;
        this.x = this.dimensions.width / 3;
        this.y = this.dimensions.height / 2;
        this.vel = 0;
    }
}