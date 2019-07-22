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

        this.beats =
            [1.22672, 1.527722, 2.501502, 3.176734, 3.887559, 4.20795, 5.192413, 5.836397, 6.519782, 6.853072, 7.841342, 8.190902, 9.217472, 10.51407, 10.846211, 11.888745, 13.178915, 13.8811, 14.549633, 14.87647, 15.87867, 16.51019, 17.504571, 18.551692, 19.195345, 20.193361, 21.202456, 21.790121, 22.57955, 22.879475, 23.835124, 25.211204, 25.527084, 26.522532, 27.895835, 28.191122, 29.156978, 29.865386, 30.140762, 30.499908, 31.903639, 32.540023, 33.147646, 33.500525, 34.494649, 35.203443, 35.529571, 35.873726, 37.201191, 37.881193, 38.555789, 38.875287, 39.857741, 40.511276, 41.180406, 41.497179, 42.521054, 43.170799, 43.853628, 44.179862, 45.222432, 45.835863, 46.527207, 46.847779, 47.857952, 48.524699, 49.528827, 50.59454, 51.2103, 52.158182, 53.185294, 53.852314, 54.890791, 55.844176, 56.520486, 57.521662, 58.559546, 59.231268, 61.590898, 61.901095, 63.923178, 64.532754, 66.446213, 67.155965, 69.228279, 69.891548, 70.856916, 71.861055, 72.48184, 73.183356, 73.521195, 74.545246, 75.143969, 75.880138, 76.222428, 77.21688, 77.819836, 78.518718, 78.84976, 79.859976, 80.519381, 81.183932, 81.542642, 82.4966, 83.175413, 83.827206, 84.160055, 85.184333, 85.870341, 86.519423, 86.839311, 87.885334, 88.528219, 89.180377, 89.524934, 90.486528, 91.215722, 92.209077, 93.853703, 95.180681, 95.895594, 96.553805, 97.512561, 98.520706, 99.238562, 101.180349, 101.841447, 102.566323, 103.885408, 104.548485, 105.23375, 106.535282, 107.189643, 107.856507, 109.166843, 109.884893, 110.563192, 111.834851, 113.214709, 114.524809, 115.81649, 117.144216, 118.529581, 119.821481, 121.208094, 122.46703, 123.237998, 123.854236, 124.189978, 125.205481, 125.889218, 126.557486, 126.874082, 127.843715, 128.545944, 129.530784, 130.539702, 131.23772, 131.867477, 132.187926, 133.197316, 133.84365, 134.528929, 134.850367, 135.841274, 136.524011, 137.218327, 137.541129, 138.514054, 139.925736, 140.247134, 141.886843, 142.875723, 143.882989, 144.478024, 145.566787, 148.215862, 149.216683, 149.874217, 151.852351, 152.534274, 153.562413];

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
        if (this.isDucking) {
            ctx.drawImage(this.ducking, 0, 0, 100, 100, this.x - 50, this.y - 25, 100, 100);
            ctx.drawImage(this.sprite, 55, 58, 40, 56, this.x - 20, this.y, 40, 56);
            setTimeout( ()=> {
                this.isDucking = false
            }, 500);
        } else {
            if (this.right){
                this.currentAnimation = this.rightAnimation;
            } else if (this.left) {
                this.currentAnimation = this.leftAnimation;
            } else {
                this.currentAnimation = this.idleAnimation;
            }
    
            //only shows falling when going down height of a double jump
            if (this.vel <= 10) {
                ctx.drawImage(this.sprite, this.currentAnimation[this.frame].sX, 
                    this.currentAnimation[this.frame].sY, 40, 56, this.x - 20, this.y, 40, 56);
            } else {
                ctx.drawImage(this.sprite, 107, 110, 40, 56, this.x, this.y, 40, 56);
            }
        }
            

        if (this.frameCount <= 10){
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