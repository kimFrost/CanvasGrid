'use strict';

import Cell from './cell';

export default class CellMatrix {
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
{
    0:{
        0: null,
        1: cell
    }
    1:{

    }
    2:{

    }
}

*/




// Add cell and resize matrix?