'use strict';

//import * as PIXI from '@types/pixi.js';
//import 'pixi.js';
import Cell from './cell';
import Vector from './math/vector';
import World from './world';
import { getController } from './main';

export default class Camera extends PIXI.Container {
    private world: World;
    private cellsInView: Cell[];
    private debugTextNode: PIXI.Text;
    public testGraphic: PIXI.Graphics;
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

        this.testGraphic = new PIXI.Graphics();
        this.testGraphic.lineStyle(2, 0x0000FF, 1);
        this.testGraphic.beginFill(0xFF00BB, 0.15);
        this.testGraphic.drawRect(-10, -10, 20, 20);
        this.testGraphic.endFill();
        this.world.addChild(this.testGraphic);

        //console.log(new Vector(100, 0), new Vector(100, 0).rotate(90));

        //let interactionManager = PIXI.interaction.InteractionManager(renderer);
    }
    move(v: Vector) {
        this.world.position.set(this.world.position.x + v.x, this.world.position.y + v.y);
        this.updateRenderStates();
    }
    moveTo(worldPos: Vector) {
        this.world.position.set(worldPos.x, worldPos.y);
        this.updateRenderStates();
    }
    screenPositionToWorldPosition(screenPosition: Vector): Vector {
        //let worldPos = screenPosition.subtract(new Vector(this.world.position.x, this.world.position.y)).rotate(-45);
        let skewedLoc = screenPosition.rotate(-45);
        return skewedLoc.add(new Vector(this.world.position.x, this.world.position.y));
    }
    updateRenderStates() {
        if (this.world) {
            let grid = this.world.grid;
            let cellMatrix = grid.cells;
            //let WorldPosition = new Vector(this.position.x, this.position.y).multiply(-1);

            let controller = getController();
            if (controller) {
                //let worldPosition = this.screenPositionToWorldPosition(controller.cursor.position);
                //let coordinate = grid.worldPositionToCoordinate(worldPosition);
                
                //console.log('worldPosition', worldPosition);
                //console.log('coordinate', coordinate);
                //console.log('pos', controller.cursor.position);

            }
            //let screenPosition = Controller.GetCursorScreenPosition();
            //let worldPosition = this.screenPositionToWorldPosition(screenPosition);

            //console.log('WorldPosition', WorldPosition);
            //WorldPosition = 
            //console.log('coordinate', grid.worldPositionToCoordinate(WorldPosition));

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


//https://stackoverflow.com/questions/36056628/angular2-mouse-event-handling-movement-relative-to-current-position