'use strict';

export default class Tile extends PIXI.Sprite {
    constructor(texture) {
        super(texture);
        this.position = {
            x: 0,
            y: 0
        }
        this.coordinates = {
            x: 0,
            y: 0
        }
        this.index = 0
    }
}