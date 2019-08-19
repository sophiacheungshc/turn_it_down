# Turn It Down

[Turn It Down Live!](https://sophiacheungshc.github.io/turn_it_down)

Turn It Down is a vertical platformer web game with a musical twist. Built entirely with JavaScript, HTML5 & CSS3, this little canvas game encompasses what I loved playing as a kid: mini platformers and music rhythm games.

## Technologies
* [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
* [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)

## Key Features
* Player controls sprite by pressing arrow keys and spacebar, with different animations to depict different types of movement.
* Platform tiles are randomized and moving down at a faster rate than the background, creating an illusion of upward movement.
* Three levels of difficulty (three different songs) are available for player to select. 
* Health system displays number of hearts with respect to the number of extra lives left which can endure a missed beat.
* Beats visualization achieved with moving bars in the background pose as indication for player to duck.

<p align="center">
  <img width="600" height="350" src="https://github.com/sophiacheungshc/turn_it_down/blob/master/tid.gif">
</p>

##### Code Snippet - Random Tiles
```js
  //100-500 indicate y positions => lines 1 - 5
  this.tiles = [
      ///player will start off on one of these top tiles
      this.randomTiles(100),
      this.randomTiles(200),
      this.randomTiles(300),
      this.randomTiles(400),
      this.randomTiles(500)
  ];
        
   randomTiles(y) {
      //2 random tiles out of 3 different lengths
      //Object.assign because protoTiles were being changed each time 
      const leftTile = Object.assign({}, this.protoTiles[Math.floor(Math.random() * 3)]);
      const rightTile = Object.assign({}, this.protoTiles[Math.floor(Math.random() * 3)]);

      leftTile.x = Math.floor(Math.random() * (240 - leftTile.w + 1));
      rightTile.x = Math.floor(Math.random() * (480 - rightTile.w - 240 + 1)) + 240;

      leftTile.y = y;
      rightTile.y = y;

      return [leftTile, rightTile];
    }
```

##### Code Snippet - Beats Visualizer
```js
    visualize() {
        
        let x = (Math.round(this.music.currentTime * 10) / 10) % this.bps;

        //round the rounded result again for +/- 0.01, just rounding once would leave out other close beats
        if (this.music.currentTime !== 0 && (x === 0 || (Math.round(x * 10) / 10) % this.bps === 0)) {
            //offset first beat
            if (this.music.currentTime > this.firstBeat) {
                this.ctx1.drawImage(this.alert, 0, 0, 150, 56, 180, 0, 150, 56);
                this.needaDuck = true;
            }
            this.ctx.fillStyle = 'white';
            this.ctx.fillRect(0, 0, this.width, this.height);
            this.topY = 0;
            this.bottomY = this.height;
            this.op = 0;
        } else {
            this.needaDuck = false;

            //let alert image come up 0.1s before actual beat
            if (x === this.bps-0.1 || (Math.round(x * 10) / 10) % this.bps === this.bps-0.1) {
                if (this.music.currentTime > this.firstBeat) {
                    this.ctx1.drawImage(this.alert, 0, 0, 150, 56, 180, 0, 150, 56);
                }
            }
            this.ctx.clearRect(0, 0, this.width, this.height);
            this.ctx.fillStyle = `rgba(200, 166, 234, ${this.op})`;
            this.ctx.fillRect(0, this.topY, this.width, 10);
            this.ctx.fillStyle = `rgba(104, 157, 255, ${this.op})`;
            this.ctx.fillRect(0, this.bottomY, this.width, 10);
            this.topY += this.interval;
            this.bottomY -= this.interval;
            this.op += 0.007;
        }
    }
```
##### Code Snippet - Double Jump
```js
  jump() {
    //allows for rapid double jump with < 1 ---> must press upkey again before player goes down with gravity 
    if (this.jumpCount > 0 && this.vel < 1 || this.collidesPlatformTop()[0]) {
        this.vel = -1 * CONSTANTS.JUMP_SPEED;
        this.jumpCount -= 1;
    } else if (this.jumpCount === 0 && this.collidesPlatformTop()[0]) {
        this.jumpCount = 2; 
    }
  }
```
##### Code Snippet - Collision Logic
```js
  const platformCollides = this.collidesPlatformTop();
    if (platformCollides[0]) {
        this.y = platformCollides[1] - CONSTANTS.PLAYER_HEIGHT;
        this.vel = 0;
        this.jumpCount = 2;
    } else {
        this.vel += CONSTANTS.GRAVITY;
        this.y += this.vel;
  }
  
  collidesPlatformTop(){
        let collides = false;
        let tileTop = null;

        this.platform.tiles.forEach( tileLine =>  {
            tileLine.forEach( tile => {
                //conditional checking if tile top is between player old y pos and player new pos
                //x + 10 to allow player to stand on one foot without falling through
                if (this.y + CONSTANTS.PLAYER_HEIGHT <= tile.y && this.y + CONSTANTS.PLAYER_HEIGHT + this.vel >= tile.y
                    && this.x + 10 > tile.x && this.x - 10 < tile.x + tile.w){
                    collides = true;
                    tileTop = tile.y;
                }
            })
        })
        return [collides, tileTop];
    }
```
