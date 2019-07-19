const CONSTANTS = {
    TILE_SPEED: 2,
    EDGE_BUFFER: 50,
    TILE_SPACING: 220,
    WARM_UP_SECONDS: 1
};

export default class Platform {
    constructor(dimensions) {
        this.dimensions = dimensions;

        this.platform = new Image();
        this.platform.src = "img/platform.png";

        const firstTileDistance =
            this.dimensions.width +
            (CONSTANTS.WARM_UP_SECONDS * 60 * CONSTANTS.TILE_SPEED);

        //tile(x-pos(0 to 2), y-pos(0 to 5))
        this.protoTiles = [
            {shortTile: {
                sX: 36,
                sY: 476,
                w: 74,
                h: 514,
                x: 0,
                y: 0
            }},
            {medTile: {
                sX: 0,
                sY: 329,
                w: 111,
                h: 342,
                x: 0,
                y: 0
            }},
            {longTile: {
                sX: 0,
                sY: 165,
                w: 166,
                h: 196,
                x: 0,
                y: 0
            }},
        ];

        this.tiles = [
            this.randomTiles(0),
            this.randomTiles(1),
            this.randomTiles(2),
            this.randomTiles(3),
            this.randomTiles(4)
        ];

            // this.randomTile(firstTileDistance),
            // this.randomTile(firstTileDistance + CONSTANTS.TILE_SPACING),
            // this.randomTile(firstTileDistance + (CONSTANTS.TILE_SPACING * 2)),
    
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
            //draw left tile
            ctx.drawImage(this.platform, 0, 0, 36, 42, this.x, this.y, 36, 42);

            //draw right tile
            ctx.drawImage(this.platform, 0, 0, 36, 42, this.x, this.y, 36, 42);
        });
    }

    animate(ctx) {
        this.moveTiles();
        this.drawTiles(ctx);
    }

}