import Player from "./player";
import Platform from './platform';

export default class TurnItDown { 
    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        this.dimensions = { width: canvas.width, height: canvas.height };

        this.background = new Image();
        this.background.src = "img/background.png";
        this.ready = new Image();
        this.ready.src = "img/ready.png";
        this.over = new Image();
        this.over.src = "img/over.png";
        this.retry = new Image();
        this.retry.src = "img/retry.png";


        this.music = new Audio();
        this.music.src = "audio/sunflower.mp3";
        this.x = 0;
        this.y = 600;

        this.animate = this.animate.bind(this);

        window.addEventListener("keydown", this.key.bind(this));
        window.addEventListener("keyup", this.keyUp.bind(this));
        // window.addEventListener("click", this.click.bind(this));

        this.state = {
            current: 0,
            getReady: 0,
            game: 1,
            over: 2
        }

        this.restart();
    }
    
    start(){
        switch(this.state.current){
            case this.state.getReady:
                this.state.current = this.state.game;
                this.music.play();
                break;
            case this.state.over:
                this.restart();
                break;
        }
    }

    key(e) {
        if (this.state.current === this.state.game) {
            if (e.keyCode === 38) this.player.jump();
            if (e.keyCode === 37) this.player.left = true;
            if (e.keyCode === 39) this.player.right = true;
            if (e.keyCode === 32) this.player.duck();
        } else {
            if (e.keyCode === 32) this.start();
        }
    }

    keyUp(e) {
        if (this.state.current === this.state.game) {
            if (e.keyCode === 37) this.player.left = false;
            if (e.keyCode === 39) this.player.right = false;
        }
    }
    
    restart() {
        this.state.current = this.state.getReady;
        this.platform = new Platform(this.dimensions);
        this.player = new Player(this.dimensions, this.platform, this.music);

        this.animate();
    }

    animate(){
        this.backgroundDraw();
        this.platform.animate(this.ctx);
        this.player.animate(this.ctx);
        if (this.gameOver()) {
            this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);
            this.ctx.drawImage(this.over, 0, 0, 250, 134, this.dimensions.width / 4, this.dimensions.height / 6, 250, 134);
            this.ctx.drawImage(this.retry, 0, 0, 400, 34, 45, this.dimensions.height / 2, 400, 34);
        } else {
            if (this.state.current === this.state.game) {
                this.frame = requestAnimationFrame(this.animate);
            } else if (this.state.current === this.state.over) {
                this.ctx.clearRect(0, 0, 480, 640);
                // this.ctx.drawImage(this.over, 0, 0, 250, 134, this.dimensions.width / 5, this.dimensions.height / 6, 250, 134);
                this.frame = requestAnimationFrame(this.animate);
            } else if (this.state.current === this.state.getReady) {
                this.ctx.clearRect(0, 0, 480, 640);
                this.ctx.drawImage(this.background, 0, 0, 233, 111, this.dimensions.width / 4, this.dimensions.height / 2, 233, 111);
                this.frame = requestAnimationFrame(this.animate);
            }
        }    
    }
        
    backgroundDraw(){
        this.ctx.drawImage(this.background, this.x, this.y, 480, 640, 0, 0, 480, 640);
        if (this.y < 0) this.y += (2400-640);

        //background scroll
        this.y -= 0.2;
    }

    gameOver(){
        if (this.player.y >= this.dimensions.height) {
            this.state.current = this.state.over;
            this.music.pause();
            this.music.currentTime = 0;
            return true;
        } 
        return false;
    }

}

