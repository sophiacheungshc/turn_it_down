const CONSTANTS = {
    TILE_SPEED: 2,
    GAP_HEIGHT: 150,
    TILE_WIDTH: 50,
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
        this.tiles = [
            {shortTile: {
                sX: 36,
                sY: 476,
                w: 74,
                h: 514
            }},
            {medTile: {
                sX: 0,
                sY: 329,
                w: 111,
                h: 342
            }},
            {longTile: {
                sX: 0,
                sY: 165,
                w: 166,
                h: 196
            }},
        ];

            // this.randomTile(firstTileDistance),
            // this.randomTile(firstTileDistance + CONSTANTS.TILE_SPACING),
            // this.randomTile(firstTileDistance + (CONSTANTS.TILE_SPACING * 2)),
    
    }

    randomTile(y) {
        // const heightRange = this.dimensions.height - (2 * CONSTANTS.EDGE_BUFFER) - CONSTANTS.GAP_HEIGHT;
        // const gapTop = (Math.random() * heightRange) + CONSTANTS.EDGE_BUFFER;
        const tile = {
            topTile: {
                left: x,
                right: CONSTANTS.TILE_WIDTH + x,
                top: 0,
                bottom: gapTop
            },
            bottomTile: {
                left: x,
                right: CONSTANTS.TILE_WIDTH + x,
                top: gapTop + CONSTANTS.GAP_HEIGHT,
                bottom: this.dimensions.height
            },
            passed: false
        };
        return tile;
    }

    eachTile(callback) {
        this.tiles.forEach(callback.bind(this));
    }

    moveTiles() {
        this.eachTile(function (pipe) {
            pipe.topTile.left -= CONSTANTS.PIPE_SPEED;
            pipe.topTile.right -= CONSTANTS.PIPE_SPEED;
            pipe.bottomPipe.left -= CONSTANTS.PIPE_SPEED;
            pipe.bottomPipe.right -= CONSTANTS.PIPE_SPEED;
        });

        //if a pipe has left the screen add a new one to the end
        if (this.pipes[0].topTile.right <= 0) {
            this.pipes.shift();
            const newX = this.pipes[1].topTile.left + CONSTANTS.PIPE_SPACING;
            this.pipes.push(this.randomPipe(newX));
        }
    }

    drawTiles(ctx) {
        this.eachTile(function (tile) {
            ctx.drawImage(this.platform, 0, 0, 36, 42, this.x, this.y, 36, 42);

            //draw top pipe
            ctx.fillRect(
                tile.topTile.left,
                tile.topTile.top,
                CONSTANTS.TILE_WIDTH,
                tile.topTile.bottom - tile.topTile.top
            );
            //draw bottom tile
            ctx.fillRect(
                tile.bottomTile.left,
                tile.bottomTile.top,
                CONSTANTS.TILE_WIDTH,
                tile.bottomTile.bottom - tile.bottomTile.top
            );
        });
    }

    animate(ctx) {
        this.moveTiles();
        this.drawPipes(ctx);
    }

}