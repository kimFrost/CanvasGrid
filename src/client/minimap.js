'use strict';


export default class Minimap extends PIXI.Container {
    constructor(world) {
        super();
        this.world = world;
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
*/

