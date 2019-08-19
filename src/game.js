import Player from "./player";
import Platform from './platform';
import Song from "./song";

export default class TurnItDown { 
    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        this.dimensions = { width: canvas.width, height: canvas.height };

        this.visualizer = document.getElementById("visualizer");
        this.ctx2 = this.visualizer.getContext("2d");

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
            over: 2,
            won: 3
        }

        this.ducked = false;
        this.prevBeat = false;
        this.state.current = this.state.getReady;
        
        this.ready.onload = () => this.ctx.drawImage(this.ready, 0, 0, 400, 132, 45, this.dimensions.height / 4, 400, 132);
    }
    
    start(){
        //can miss 2 beats, die on 3rd missed beat
        this.lives = 13;
        this.platform = new Platform(this.dimensions);
        this.song = new Song(this.ctx);
        this.music = this.song.music;
        this.player = new Player(this.dimensions, this.platform, this.music);
        
        this.state.current = this.state.game;
        this.music.play();

        this.animate();
        // switch(this.state.current){
        //     case this.state.getReady:
        //         this.state.current = this.state.game;
        //         this.song = new Song(this.ctx);
        //         this.music = this.song.music;
        //         this.music.play();
        //         break;
        //     case this.state.over:
        //         this.restart();
        //         break;
        // }
    }

    key(e) {
        e.preventDefault();
        if (this.state.current === this.state.game) {
            if (e.keyCode === 38) this.player.jump();
            if (e.keyCode === 37) this.player.left = true;
            if (e.keyCode === 39) this.player.right = true;
            if (e.keyCode === 32) {
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
        this.song = new Song(this.ctx);
        this.music = this.song.music;
        this.player = new Player(this.dimensions, this.platform, this.music);


        this.animate();
    }

    animate(){
        this.backgroundDraw();
        this.platform.animate(this.ctx);
        this.player.animate(this.ctx);
        this.checkGameOver();

        if (this.state.current !== this.state.game) {
            this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);
            this.ctx2.clearRect(0, 0, this.visualizer.width, this.visualizer.height);
            switch (this.state.current){
                case this.state.over:
                    this.ctx.drawImage(this.over, 0, 0, 250, 134, this.dimensions.width / 4, this.dimensions.height / 6, 250, 134);
                    this.ctx.drawImage(this.retry, 0, 0, 400, 34, 45, this.dimensions.height / 2, 400, 34);
                    break;
                case this.state.won:
                    this.ctx.drawImage(this.won, 0, 0, 439, 350, 20, 100, 439, 350);
                    break;
                case this.state.getReady:
                    this.ctx.drawImage(this.ready, 0, 0, 400, 132, 45, this.dimensions.height / 4, 400, 132);
                    break;
            }
        } else {
            this.frame = requestAnimationFrame(this.animate);
            this.song.visualize();
        }
    }
        
    backgroundDraw(){
        this.ctx.drawImage(this.background, this.x, this.y, 480, 640, 0, 0, 480, 640);
        if (this.y < 0) this.y += (2400-640);

        //background scroll
        this.y -= 0.2;
    }

    checkGameOver(){
        if (this.song.needaDuck && !this.ducked){
            this.lives -= 1;
        }

        if (this.lives <= 0 || this.player.y >= this.dimensions.height) {
            this.state.current = this.state.over;
            this.music.pause();
            this.music.currentTime = 0;
        } else if (this.music.ended) {
            this.music.pause();
            this.music.currentTime = 0;
            this.state.current = this.state.won;
        }

    }

}

