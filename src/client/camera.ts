'use strict';

//import * as PIXI from '@types/pixi.js';
//import 'pixi.js';
import Cell from './cell';
import Vector from './math/vector';
import World from './world';

export default class Camera extends PIXI.Container {
    private world: World;
    private cellsInView: Cell[];
    private debugTextNode: PIXI.Text;
    constructor(world: World) {
        super();
        this.world = world;
        this.cellsInView = [];
        this.addChild(world);
        
        // Add center debug
        this.debugTextNode = new PIXI.Text('FINDME', { fontFamily: 'Arial', fontSize: 60, fill: 0x9FC5E8, align: 'center' });
        this.debugTextNode.anchor.set(0.5, 0.5);
        this.debugTextNode.position.set(50, 50);
        this.addChild(this.debugTextNode);

        //let interactionManager = PIXI.interaction.InteractionManager(renderer);
    }
    move(v:Vector) {
        this.world.position.set(this.world.position.x - v.x, this.world.position.y - v.y);
        this.updateRenderStates();
    }
    moveTo(worldPos:Vector) {
        this.world.position.set(worldPos.x, worldPos.y);
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
    update() {
        console.log('camerea update ');
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