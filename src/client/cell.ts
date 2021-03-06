'use strict';

import Tile from './tile';
import Grid from './grid';
import Vector from './math/vector';
import TileMatrix from './tile.matrix';

export default class Cell extends PIXI.Container {
    public worldLocation: Vector;
    private neighbours: Cell[];
    private xi: number;
    private yi: number;
    private cellWidth: number;
    private cellHeight: number;
    private grid: Grid;
    readonly tiles: TileMatrix;
    readonly tileWidth: number;
    readonly tileHeight: number;
    readonly tileSideLength: number;
    constructor(x, y, width, height, grid: Grid) {
        super();
        this.worldLocation = new Vector();
        this.tiles = new TileMatrix();
        this.neighbours = [null, null, null, null];
        this.xi = x * 1.02;
        this.yi = y * 1.02;
        this.cellWidth = width;
        this.cellHeight = height;
        this.grid = grid;

        this.tileWidth = this.cellWidth / 16;
        this.tileHeight = this.cellHeight / 16;
        this.tileSideLength = Math.round(new Vector(this.tileWidth / 2, this.tileWidth / 4).length * 100) / 100;
        this.visible = false;
    }

    public getAdjacent(v:Vector): Cell {
        return this.grid.getCell(v.add(new Vector(this.xi, this.yi)));
    }

    init() {
        let testGraphic = new PIXI.Graphics();
        let position = {
            x: 0,
            y: 0
        };
        position.x -= this.cellWidth / 2;
        position.x += this.xi * (this.cellWidth / 2);
        position.x -= this.yi * (this.cellWidth / 2);
        position.y += this.xi * (this.cellHeight / 2);
        position.y += this.yi * (this.cellHeight / 2);
        //this.position.set(this.xi * this.cellWidth, this.yi * this.cellHeight + (this.yi % 2 * this.cellHeight));
        this.position.set(position.x, position.y);

        this.worldLocation = new Vector(position.x + this.cellWidth / 2, position.y);

        testGraphic.lineStyle(2, 0x0000FF, 1);
        testGraphic.beginFill(0xFF00BB, 0.15);
        testGraphic.drawRect(0, 0, this.cellWidth, this.cellHeight);
        testGraphic.endFill();
        this.addChild(testGraphic);

        for (let yi = 0; yi < 16; yi++) {
            for (let xi = 0; xi < 16; xi++) {
                let tile = new Tile(this, this.grid);
                tile.coordinate = new Vector(xi, yi);
                let position = {
                    x: this.cellWidth / 2 - this.tileWidth / 2,
                    y: 0
                };
                position.x += xi * (this.tileWidth / 2);
                position.x -= yi * (this.tileWidth / 2);
                position.y += xi * (this.tileHeight / 2);
                position.y += yi * (this.tileHeight / 2);

                //tile.position.x = xi * tileWidth + (yi % 2 * tileWidth / 2);
                //tile.position.y = yi * tileHeight / 2;
                tile.position.x = position.x;
                tile.position.y = position.y;

                //tile.position.y += Math.floor(Math.floor(Math.random() * (10 - 0 + 1)) + 0);

                tile.worldLocation = new Vector(xi * this.tileSideLength, yi * this.tileSideLength).add(this.worldLocation);
                //tile.worldLocation = new Vector(xi * 100, yi * 100);

                let text = new PIXI.Text(`x: ${tile.worldLocation.x}, y: ${tile.worldLocation.y}`, { fontFamily: 'Arial', fontSize: 12, fill: 0xff1010, align: 'center' });
                //let text = new PIXI.Text(`xi: ${xi}, yi: ${yi}`, { fontFamily: 'Arial', fontSize: 12, fill: 0xff1010, align: 'center' });
                tile.addChild(text);

                //tile.zOrder = yi;
                this.tiles.set(xi, yi, tile);
                this.addChild(tile);
            }
        }
    }
}


//TODO:
/*
o Switch tile generation to follow a tile pattern instead, tile in tile, not along x axis on canvas
- Add tile line along edge texture
*/