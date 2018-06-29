'use strict';

import Vector from './math/vector';
import Grid from './grid';
import Cell from './cell';

export default class Tile extends PIXI.Sprite {
    public worldLocation: Vector;
    public coordinate: Vector;
    public index: number;
    private cell: Cell;
    private grid: Grid;
    constructor(cell: Cell, grid: Grid) {
        let texture = PIXI.loader.resources['assets/images/tile.png'].texture;
        super(texture);
        this.worldLocation = new Vector();
        this.coordinate = new Vector(0, 0);
        this.index = 0;
        this.cell = cell;
        this.grid = grid;
        
        //let text = new PIXI.Text(this.location.toString(), { fontFamily: 'Arial', fontSize: 12, fill: 0xff1010, align: 'center' });
        //this.addChild(text);
    }
    public getAdjacent(v:Vector): Tile {
        return this.grid.getTile(v.add(this.coordinate));
    }
}