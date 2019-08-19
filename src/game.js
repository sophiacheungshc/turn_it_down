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
        this.hearts = new Image();
        this.hearts.src = "img/harts.png";

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

        //w=50
        this.heartsAnimation = [
            { sX: 1, sY: 0 },
            { sX: 37, sY: 0 },
            { sX: 67, sY: 0 },
            { sX: 91, sY: 0 },
            { sX: 117, sY: 0 }
        ];
        this.heartsFrame = 0;
        this.heartsFrameCount = 0;

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
        this.music.play();

        this.animate();
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
        } else if (e.keyCode === 32) {
            if (this.state.current === this.state.getReady) {
                this.state.current = this.state.game;
                this.start();
                //allow for time to switch from game over screen to start, or else would be too sudden
            } else {
                this.state.current = this.state.game;
                setTimeout(() => {
                    this.start();
                }, 800);
            }
        }
    }

    keyUp(e) {
        if (this.state.current === this.state.game) {
            if (e.keyCode === 37) this.player.left = false;
            if (e.keyCode === 39) this.player.right = false;
        }
    }

    animate(){
        this.backgroundDraw();
        this.platform.animate(this.ctx);
        this.player.animate(this.ctx);
        this.checkGameOver();
        this.heartsDraw();

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

    heartsDraw() {
        
        if (this.lives > 1) {
            this.ctx.drawImage(this.hearts, this.heartsAnimation[this.heartsFrame].sX,
                this.heartsAnimation[this.heartsFrame].sY, 30, 30, 390, 10, 30, 30);
            if (this.lives > 7) {
                this.ctx.drawImage(this.hearts, this.heartsAnimation[this.heartsFrame].sX,
                    this.heartsAnimation[this.heartsFrame].sY, 30, 30, 430, 10, 30, 30);
            }
        }

        if (this.heartsFrameCount < 10) {
            this.heartsFrameCount += 1;
        } else {
            this.heartsFrame = (this.heartsFrame + 1) % 5;
            this.heartsFrameCount = 0;
        }
    }

}

