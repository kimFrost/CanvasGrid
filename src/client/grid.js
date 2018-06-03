'use strict';

import Tile from './tile';
import Cell from './cell';

export default class Grid extends PIXI.Container {
    constructor() {
        super();
        this.cells = [];
        this.chunkXCount = 10;
        this.chunkYCount = 10;
        this.tileWidth = 100;
        this.tileHeight = 50;
        this.cellWidth = this.tileWidth * 16;
        this.cellHeight = this.tileHeight * 16;
    }
    init() {
        //~~ Split tiles into chunk containers  ~~//
        for (let yi = 0; yi < 5; yi++) {
            for (let xi = 0; xi < 5; xi++) {
                this.addCell(xi, yi);
            }
        }
    }
    addCell(x, y) {
        // If not exits, then genrate new
        this.generateCell(x, y);
    }
    generateCell(x, y) {
        let cell = new Cell(x, y, this.cellWidth, this.cellHeight);
        cell.init();
        this.addChild(cell);
    }
}