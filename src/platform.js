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
        debugger
        this.tiles = [
            this.randomTiles(100),
            this.randomTiles(200),
            this.randomTiles(300),
            this.randomTiles(400),
            this.randomTiles(500)
        ];
    
    }

    randomTiles(line) {
        //2 random tiles out of 3 different lengths
        const leftTile = this.protoTiles[Math.floor(Math.random() * 3)];
        const rightTile = this.protoTiles[Math.floor(Math.random() * 3)];

        ///Math.floor(Math.random() * (max - min + 1) ) + min
        leftTile.x = Math.floor(Math.random() * (240 - leftTile.w + 1));
        rightTile.x = Math.floor(Math.random() * (480 - rightTile.w - 240 + 1)) + 240;
        leftTile.y = line;
        rightTile.y = line;

        return [leftTile, rightTile];
    }

    eachTileLine(callback) {
        this.tiles.forEach(callback.bind(this));
    }

    moveTiles() {
        this.eachTileLine(function (tileLine) {
            tileLine[0].y += CONSTANTS.TILE_SPEED;
            tileLine[1].y += CONSTANTS.TILE_SPEED;
            if (tileLine[0].y >= 640) {
                this.tiles.pop();
                this.tiles.unshift(this.randomTiles(100));
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
        });
    }

    animate(ctx) {
        this.moveTiles();
        this.drawTiles(ctx);
    }

}