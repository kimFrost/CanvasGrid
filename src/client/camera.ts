'use strict';

//import * as PIXI from '@types/pixi.js';
//import 'pixi.js';
import Cell from './cell';
import Vector from './math/vector';

export default class Findme extends PIXI.Container {
    world: any;
    constructor(world: any) {
        super();
        this.world = world;
        this.addChild(world);
    }
    move(v:Vector) {
        this.position.set(this.position.x - v.x, this.position.y - v.y);
        this.updateRenderStates();
    }
    moveTo(worldPos:Vector) {
        this.position.set(worldPos.x, worldPos.y);
        this.updateRenderStates();
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