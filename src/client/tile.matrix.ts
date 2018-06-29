'use strict';

import Tile from './tile';

export default class CellMatrix {
    public matrix: any;
    constructor() {
        this.matrix = {};
    }
    get(x, y) {
        if (this.matrix[y] && this.matrix[y][x]) {
            return this.matrix[y][x];
        }
        return null;
    }
    set(x, y, cell) {
        if (!this.matrix[y]) {
            this.matrix[y] = {};
        }
        this.matrix[y][x] = cell;
        this.update();
    }
    update() {
        
    }
}
