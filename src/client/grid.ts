'use strict';

import Tile from './tile';
import Cell from './cell';
import CellMatrix from './cell.matrix';
import Vector from './math/vector';
//import math from '../3rdparty/math.min';

export default class Grid extends PIXI.Container {
    public cells: CellMatrix;
    private chunkXCount: number;
    private chunkYCount: number;
    private tileWidth: number;
    private tileHeight: number; 
    readonly tileSideLength: number;
    private cellWidth: number;
    private cellHeight: number;
    private cellStates: any[];
    private loadedCells: Cell[];
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
        this.tileSideLength = Math.round(new Vector(this.tileWidth / 2, this.tileWidth / 4).length * 100) / 100;

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
    public init() {
        //~~ Split tiles into chunk containers  ~~//
        for (let yi = 0; yi < 5; yi++) {
            for (let xi = 0; xi < 5; xi++) {
                this.addCell(xi, yi);
            }
        }

    }
    public worldPositionToCoordinate(worldPosition: Vector): Vector {
        let coordinate = new Vector(0, 0);

        coordinate.x = Math.round(worldPosition.x / this.tileSideLength);
        coordinate.y = Math.round(worldPosition.y / this.tileSideLength);

        return coordinate;
    }
    public getClosetCell(worldPosition: Vector): Cell {
        let coordinate = this.worldPositionToCoordinate(worldPosition);
        return this.getCell(coordinate);
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
        let cell = new Cell(x, y, this.cellWidth, this.cellHeight, this);
        cell.init();
        return cell;
    }
    loadCell(cell) {
        // Load from json file or db

        //Add cell to loadedCells
    }
    public getCell(cellCoordinate: Vector): Cell {
        return this.cells.get(cellCoordinate.x, cellCoordinate.y);
    }
    public getTile(tileCoordinate: Vector): Tile {
        let cellCoordinate = tileCoordinate.divide(16).floor();
        let cell = this.getCell(cellCoordinate);
        let localTileCordinate = tileCoordinate.subtract(cellCoordinate.multiply(16));
        return cell.tiles.get(localTileCordinate.x, localTileCordinate.y);
    }
    setCellFocus(cell) {
        // Load all cells in range of 2 of cell

        //Loop load cells
        if (!this.loadedCells.includes(cell)) {
            this.loadCell(cell);
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