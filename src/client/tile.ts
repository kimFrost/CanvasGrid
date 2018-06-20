'use strict';

import Vector from './math/vector';

export default class Tile extends PIXI.Sprite {
    public worldLocation: Vector;
    public coordinates: Vector;
    public index: number;
    constructor() {
        let texture = PIXI.loader.resources['assets/images/tile.png'].texture;
        super(texture);
        this.worldLocation = new Vector();
        this.coordinates = new Vector(0, 0);
        this.index = 0;

        //let text = new PIXI.Text(this.location.toString(), { fontFamily: 'Arial', fontSize: 12, fill: 0xff1010, align: 'center' });
        //this.addChild(text);
    }
}