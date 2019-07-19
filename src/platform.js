const CONSTANTS = {
    TILE_SPEED: 2
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
                w: 74,
                h: 514,
                x: 0,
                y: 0
            },
            // {medTile: 
            {
                sX: 0,
                sY: 329,
                w: 111,
                h: 342,
                x: 0,
                y: 0
            },
            // {longTile: 
            {
                sX: 0,
                sY: 165,
                w: 166,
                h: 196,
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
        
        return [leftTile, rightTile, line];
    }

    eachTileLine(callback) {
        this.tiles.forEach(callback.bind(this));
    }

    moveTiles() {
        this.eachTileLine(function (tileLine) {
            tileLine[0].y += CONSTANTS.TILE_SPEED;
            tileLine[1].y += CONSTANTS.TILE_SPEED;
        });

        //if a tile line has left the bottom of the screen add a new line to the top
        if (this.tiles[0].y >= 640) {
            this.tiles.pop();
            this.tiles.unshift(this.randomTiles(0));
        }
    }

    drawTiles(ctx) {
        this.eachTileLine(function (tileLine) {
            let sX = tileLine[0].sX;
            let sY = tileLine[0].sY;
            let w = tileLine[0].w;
            let h = tileLine[0].h;
            // let x = Math.floor(Math.random() * (240 - w + 1));
            let x = 50;
            let y = tileLine[2];

            //draw left tile
            ctx.drawImage(this.platform, sX, sY, w, h, x, y, w, h);

            sX = tileLine[1].sX;
            sY = tileLine[1].sY;
            w = tileLine[1].w;
            h = tileLine[1].h;
            // x = Math.floor(Math.random() * (480 - w - 240 + 1)) + 240; ///Math.floor(Math.random() * (max - min + 1) ) + min
            x = 100; 
            y = tileLine[2];
            debugger
            //draw right tile
            ctx.drawImage(this.platform, sX, sY, w, h, x, y, w, h);
        });
    }

    animate(ctx) {
        // this.moveTiles();
        this.drawTiles(ctx);
    }

}