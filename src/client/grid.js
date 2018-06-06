'use strict';

import Tile from './tile';
import Cell from './cell';
import math from '../3rdparty/math.min';

export default class Grid extends PIXI.Container {
    constructor() {
        super();
        this.cells = math.matrix();
        this.chunkXCount = 10;
        this.chunkYCount = 10;
        this.tileWidth = 100;
        this.tileHeight = 50;
        this.cellWidth = this.tileWidth * 16;
        this.cellHeight = this.tileHeight * 16;
        this.cellStates = [];
        this.loadedCells = [];
        // matrix array x, y [[x: {}][y: {}]]
        /*
          x 1 2 3 4 
        y   x c c x
        1   x c c c
        2   x c c x
        3   x x x x
        4   x x x x

,t
        */
    }
    init() {
        //~~ Split tiles into chunk containers  ~~//
        for (let yi = 0; yi < 5; yi++) {
            for (let xi = 0; xi < 5; xi++) {
                this.addCell(xi, yi);
            }
        }

    }
    setWorldPosition(x, y) {
        this.position.set(x, y);
        // Set cell focus
        
    }
    addCell(x, y) {
        // If not exits, then genrate new
        this.generateCell(x, y);
        // Else load cell
    }
    generateCell(x, y) {
        let cell = new Cell(x, y, this.cellWidth, this.cellHeight);
        cell.init();
        this.addChild(cell);
    }
    loadCell(cell) {
        // Load from json file or db

        //Add cell to loadedCells
    }
    getCell(x, y) {

    }
    setCellFocus(cell) {
        // Load all cells in range of 2 of cell

        //Loop load cells
        if (!this.loadedCells.includes(cell)) {
            loadCell(cell);
        }
    }
}


/*
var grid = [
    1, 2, 3,
    4, 5, 6,
    7, 8, 9
];
var grid2D = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
*/


// Add cell and resize matrix?