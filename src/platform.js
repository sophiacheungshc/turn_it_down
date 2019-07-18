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

        const firstTileDistance =
            this.dimensions.width +
            (CONSTANTS.WARM_UP_SECONDS * 60 * CONSTANTS.TILE_SPEED);

        this.tiles = [
            this.randomTile(firstTileDistance),
            this.randomTile(firstTileDistance + CONSTANTS.TILE_SPACING),
            this.randomTile(firstTileDistance + (CONSTANTS.TILE_SPACING * 2)),
        ];
    }

    randomTile(x) {
        const heightRange = this.dimensions.height - (2 * CONSTANTS.EDGE_BUFFER) - CONSTANTS.GAP_HEIGHT;
        const gapTop = (Math.random() * heightRange) + CONSTANTS.EDGE_BUFFER;
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

    drawTiles(ctx) {
        this.eachTile(function (tile) {
            ctx.fillStyle = "green";

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

    eachTile(callback) {
        this.tiles.forEach(callback.bind(this));
    }
}