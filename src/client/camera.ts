'use strict';

//import * as PIXI from '@types/pixi.js';
//import 'pixi.js';
import Cell from './cell';
import Vector from './math/vector';
import World from './world';

export default class Camera extends PIXI.Container {
    private world: World;
    private cellsInView: Cell[];
    constructor(world: World) {
        super();
        this.world = world;
        this.cellsInView = [];
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
    screenPositionToWorldPosition(screenPosition: Vector): Vector {

        return null;
    }
    updateRenderStates() {
        if (this.world) {
            let grid = this.world.grid;
            let cellMatrix = grid.cells;
            let WorldPosition = new Vector(this.position.x, this.position.y).multiply(-1);
            console.log('WorldPosition', WorldPosition);
            //WorldPosition = 
            console.log('coordinate', grid.worldPositionToCoordinate(WorldPosition));

            //this.cellsInView
            //cellMatrix.get
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