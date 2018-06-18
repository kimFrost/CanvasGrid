'use strict';

import Tile from './tile';
import Cell from './cell';
import CellMatrix from './cell.matrix';
//import math from '../3rdparty/math.min';

export default class Grid extends PIXI.Container {
    constructor() {
        super();
        //this.cells = math.matrix();
        this.cells = new CellMatrix();
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
        */
        this.cells.onUpdate((cells) => {
            console.log('cell matrix update', cells);
        });
    }
    init() {
        //~~ Split tiles into chunk containers  ~~//
        for (let yi = 0; yi < 5; yi++) {
            for (let xi = 0; xi < 5; xi++) {
                this.addCell(xi, yi);
            }
        }

    }
    setWorldPosition(posX, posY) {
        this.position.set(posX, posY);
        console.log('setWorldPosition', posX, posY);
        // Set cell focus
        // Position to cell
        let x = Math.round(posX);
        let Y = Math.round(posY);
        //let cell = this.getCell(x, y);
    }
    addCell(x, y) {
        // If not exits, then genrate new
        // Else load cell
        let cell = this.generateCell(x, y);
        this.cells.set(x, y, cell);
        this.addChild(cell);
    }
    generateCell(x, y) {
        let cell = new Cell(x, y, this.cellWidth, this.cellHeight);
        cell.init();
        return cell;
    }
    loadCell(cell) {
        // Load from json file or db

        //Add cell to loadedCells
    }
    getCell(x, y) {
        return this.cells.get(x, y);
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