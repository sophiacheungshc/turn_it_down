import Player from "./player";
import Platform from './platform';
import Song from "./song";

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
        this.won = new Image();
        this.won.src = "img/won.png";

        this.x = 0;
        this.y = 600;

        this.animate = this.animate.bind(this);

        window.addEventListener("keydown", this.key.bind(this));
        window.addEventListener("keyup", this.keyUp.bind(this));

        this.state = {
            current: 0,
            getReady: 0,
            game: 1,
            over: 2
        }

        this.ducked = false;
        this.prevBeat = false;
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
            if (e.keyCode === 32) {
                console.log(this.music.currentTime())
                this.player.duck();
                this.ducked = true;
                setTimeout(() => {
                    this.ducked = false
                }, 500);
            }
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
        this.music = new Song("audio/sunflower.mp3", this.ctx, this.retry);
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
        } else if (this.music.currentTime > 160) {
                this.music.pause();
                this.music.currentTime = 0;
                this.state.current = this.state.over;
                this.ctx.clearRect(0, 0, 480, 640);
            this.ctx.drawImage(this.won, 0, 0, 439, 350, 20, 100, 439, 350);
        } else {
            if (this.state.current === this.state.game) {
                this.frame = requestAnimationFrame(this.animate);
            } else if (this.state.current === this.state.over && this.music.currentTime === 0) {
                this.ctx.clearRect(0, 0, 480, 640);
                // this.ctx.drawImage(this.over, 0, 0, 250, 134, this.dimensions.width / 5, this.dimensions.height / 6, 250, 134);
                this.frame = requestAnimationFrame(this.animate);
            } else if (this.state.current === this.state.getReady) {
                this.ctx.clearRect(0, 0, 480, 640);
                this.ctx.drawImage(this.ready, 0, 0, 400, 132, 45, this.dimensions.height / 4, 400, 132);
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
        this.music.onBeat();
        // if ((this.music.onBeat() && !this.ducked) || this.player.y >= this.dimensions.height) {
        if (this.player.y >= this.dimensions.height) {
            this.state.current = this.state.over;
            this.music.pause();
            this.music.currentTime = 0;
            return true;
        } 

        return false;
    }

}

