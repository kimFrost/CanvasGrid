'use strict';

import Cell from './cell';

export default class Camera extends PIXI.Container {
    constructor(world) {
        super();
        this.world = world;
        this.addChild(world);
    }
    move(offset) {

    }
    moveTo(worldPos) {

    }
    updateRenderStates() {

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