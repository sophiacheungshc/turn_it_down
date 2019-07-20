import Player from "./player";
import Platform from './platform';

export default class TurnItDown { 
    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        this.dimensions = { width: canvas.width, height: canvas.height };

        this.background = new Image();
        this.background.src = "img/background.png";
        this.music = new Audio();
        this.music.src = "audio/sunflower.mp3";
        this.x = 0;
        this.y = 600;

        this.animate = this.animate.bind(this);

        window.addEventListener("keydown", this.key.bind(this));
        window.addEventListener("keyup", this.keyUp.bind(this));
        window.addEventListener("click", this.click.bind(this));

        this.restart();
    }
    
    click(e){
        if (!this.running) {
            this.play();
            this.music.play();
        }
    }
    restart() {
        this.running = false;
        this.score = 0;
        this.platform = new Platform(this.dimensions);
        this.player = new Player(this.dimensions, this.platform, this.music);

        this.animate();
    }

    play() {
        this.running = true;
        this.animate();
    }

    key(e) {
        if (e.keyCode === 38) {
            this.player.jump();
        }
        if (e.keyCode === 37) this.player.left = true;
        if (e.keyCode === 39) this.player.right = true;
        if (e.keyCode === 32) this.player.duck();
    }

    keyUp(e) {
        if (e.keyCode === 37) this.player.left = false;
        if (e.keyCode === 39) this.player.right = false;
    }

    animate(){
        this.backgroundDraw();
        this.platform.animate(this.ctx);
        this.player.animate(this.ctx);
        if (this.gameOver()) {
            alert("Game Over :(");
            this.ctx.clearRect(0, 0, 480, 640);
            this.restart();
        } else {
            if (this.running) {
                this.frame = requestAnimationFrame(this.animate);
            } 
        }    
    }

    // stopAnimation(){
    //     cancelAnimationFrame(this.frame);
    // }

    backgroundDraw(){
        this.ctx.drawImage(this.background, this.x, this.y, 480, 640, 0, 0, 480, 640);
        if (this.y < 0) {
            this.y += (2400-640);
        }
        //background scroll
        this.y -= 0.2;
    }

    gameOver(){
        if (this.player.y >= this.dimensions.height) {
            this.music.pause();
            this.music.currentTime = 0;
            return true;
        } 
        return false;
    }

}

