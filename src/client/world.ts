'use strict';

import Grid from './grid';

export default class World extends PIXI.Container {
    public grid: Grid;
    constructor() {
        super();
        this.grid = new Grid();
        this.grid.init();
        this.addChild(this.grid);
    }
}