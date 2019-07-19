const CONSTANTS = {
    TILE_SPEED: 1
};

export default class Platform {
    constructor(dimensions) {
        this.dimensions = dimensions;

        this.platform = new Image();
        this.platform.src = "img/platform.png";

        this.protoTiles = [
            // {shortTile: 
            {
                sX: 36,
                sY: 476,
                w: 38,
                h: 38,
                x: 0,
                y: 0
            },
            // {medTile: 
            {
                sX: 0,
                sY: 329,
                w: 111,
                h: 13,
                x: 0,
                y: 0
            },
            // {longTile: 
            {
                sX: 0,
                sY: 165,
                w: 166,
                h: 31,
                x: 0,
                y: 0
            },
        ];

        //100-500 indicate y positions => lines 1 - 5
        this.tiles = [
            this.randomTiles(100),
            this.randomTiles(200),
            this.randomTiles(300),
            this.randomTiles(400),
            this.randomTiles(500)
        ];
        debugger
        console.log(this.tiles)
    }

    randomTiles(y) {
        //2 random tiles out of 3 different lengths
        const leftTile = Object.assign({}, this.protoTiles[Math.floor(Math.random() * 3)]);
        const rightTile = Object.assign({}, this.protoTiles[Math.floor(Math.random() * 3)]);

        ///Math.floor(Math.random() * (max - min + 1) ) + min
        leftTile.x = Math.floor(Math.random() * (240 - leftTile.w + 1));
        rightTile.x = Math.floor(Math.random() * (480 - rightTile.w - 240 + 1)) + 240;
        // debugger
        // leftTile.y = Math.floor(Math.random() * (500 - 100 + 1)) + 100;
        leftTile.y = y;
        // console.log(leftTile.y)
        // debugger
        // rightTile.y = Math.floor(Math.random() * (500 - 100 + 1)) + 100;
        rightTile.y = y;
        // console.log(rightTile.y)
        // console.log([leftTile, rightTile])
        return [leftTile, rightTile];
    }

    eachTileLine(callback) {
        this.tiles.forEach(callback.bind(this));
    }

    moveTiles() {
        this.eachTileLine(function (tileLine) {
            tileLine[0].y += 1;
            tileLine[1].y += 1;

            const newTiles = this.randomTiles(100);

            if (tileLine[0].y >= 640) {
                tileLine.shift();
                tileLine.unshift(newTiles[0]);
            }
            if (tileLine[1].y >= 640) {
                tileLine.pop();
                tileLine.push(newTiles[1]);
            }

        });

        //if a tile line has left the bottom of the screen add a new line to the top
        // if (this.tiles[0][0].y >= 640) {
        //     this.tiles.pop();
        //     this.tiles.unshift(this.randomTiles(100));

        // }


    }

    drawTiles(ctx) {

        this.eachTileLine(function (tileLine) {

            //draw left tile
            ctx.drawImage(this.platform, tileLine[0].sX, tileLine[0].sY, 
                tileLine[0].w, tileLine[0].h, tileLine[0].x, tileLine[0].y, 
                tileLine[0].w, tileLine[0].h);
  
                
            //draw right tile
            ctx.drawImage(this.platform, tileLine[1].sX, tileLine[1].sY,
                tileLine[1].w, tileLine[1].h, tileLine[1].x, tileLine[1].y,
                tileLine[1].w, tileLine[1].h);

            // console.log([tileLine[0].y, tileLine[1].y])

            // const newTiles = this.randomTiles(100);
            // if (tileLine[0].y >= 640) {
            //     tileLine.shift();
            //     tileLine.unshift(newTiles[0]);
            // }
            // if (tileLine[1].y >= 640) {
            //     tileLine.pop();
            //     tileLine.push(newTiles[1]);
            // }
        });

    }

    animate(ctx) {
        this.moveTiles();
        this.drawTiles(ctx);
    }

    //functions below check for player/platform overlap
    // collidePlatformBottom(player, tile) {
    //     if (player.y < tile.y && ) {

    //         player.setTop(tile_bottom);
    //         player.velocity_y = 0;
    //         return true;

    //     } return false;
    // }

    // collidePlatformLeft(player, tile) {

    //     if (player.getRight() > tile_left && player.getOldRight() <= tile_left) {

    //         player.setRight(tile_left - 0.01);
    //         player.velocity_x = 0;
    //         return true;

    //     } return false;

    // }

    // collidePlatformRight(player, tile_right) {

    //     if (player.getLeft() < tile_right && player.getOldLeft() >= tile_right) {

    //         player.setLeft(tile_right);
    //         player.velocity_x = 0;
    //         return true;

    //     } return false;

    // }

    // collidePlatformTop(player, tile_top) {

    //     if (player.getBottom() > tile_top && player.getOldBottom() <= tile_top) {

    //         player.setBottom(tile_top - 0.01);
    //         player.velocity_y = 0;
    //         player.jumping = false;
    //         return true;

    //     } return false;

    // }

}