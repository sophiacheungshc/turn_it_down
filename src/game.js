import Player from "./player";

export default class TurnItDown { 
    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        this.dimensions = { width: canvas.width, height: canvas.height };

        this.background = new Image();
        this.background.src = "img/background.png";

        this.animate = this.animate.bind(this);

        this.player = new Player(this.dimensions);
        this.animate();
        
    }

    animate(){
        this.frame = requestAnimationFrame(this.animate);
        console.log("rendering");
        this.backgroundDraw();
        this.player.animate(this.ctx);
    }

    stopAnimation(){
        cancelAnimationFrame(this.frame);
    }

    backgroundDraw(){
        this.ctx.drawImage(this.background, 0, 900-640, 480, 640, 0, 0, 480, 640);    
        // this.ctx.drawImage(this.background, 0, 0, 480, 900 - 640, 0, 0, 480, 640 + (900 - 640));    
    }

    registerEvents() {
        this.boundUpKey = this.upKey.bind(this);
        this.ctx.canvas.addEventListener("keydown", this.boundClickHandler);
    }

    upKey(e) {
        if (!this.running) {
            this.play();
        }
        this.bird.flap();
    }
}

