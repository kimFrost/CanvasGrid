'use strict';

import Grid from './grid';

export default class World extends PIXI.Container {
    constructor() {
        super();
        this.position = {
            x: 0,
            y: 0
        }
        this.grid = new Grid();
        this.grid.init();
        this.addChild(this.grid);
    }
}