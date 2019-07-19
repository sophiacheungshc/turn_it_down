import Player from "./player";
import Platform from './platform';

export default class TurnItDown { 
    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        this.dimensions = { width: canvas.width, height: canvas.height };

        this.background = new Image();
        this.background.src = "img/background.png";
        this.x = 0;
        this.y = 600;

        this.animate = this.animate.bind(this);
        this.platform = new Platform(this.dimensions);
        this.player = new Player(this.dimensions, this.platform);

        window.addEventListener("keydown", this.key.bind(this));
        window.addEventListener("keyup", this.keyUp.bind(this))

        this.animate();
        
    }

    key(e) {
        if (e.keyCode === 38) this.player.jump();
        if (e.keyCode === 37) this.player.left = true;
        if (e.keyCode === 39) this.player.right = true;
    }

    keyUp(e) {
        if (e.keyCode === 37) this.player.left = false;
        if (e.keyCode === 39) this.player.right = false;
    }

    animate(){
        this.frame = requestAnimationFrame(this.animate);
        // console.log("rendering");
        this.backgroundDraw();
        this.platform.animate(this.ctx);
        this.player.animate(this.ctx);
        
    }

    stopAnimation(){
        cancelAnimationFrame(this.frame);
    }

    backgroundDraw(){
        this.ctx.drawImage(this.background, this.x, this.y, 480, 640, 0, 0, 480, 640);
        if (this.y < 0) {
            this.y += (2400-640);
        }
        this.y -= 0.5;
        // this.ctx.drawImage(this.background, 0, 0, 480, 900 - 640, 0, 0, 480, 640 + (900 - 640));    
    }

}

