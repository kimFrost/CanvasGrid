

import Tile from './tile';
import Cell from './cell';
import World from './world';
import Camera from './camera';
import Vector from './math/vector';




let zoom = 1;
let xCount = 20;
let yCount = 20;

const TILE_WIDTH = 100;
const TILE_HEIGHT = 100;
const TILE_WIDTH_HALF = TILE_WIDTH / 2;
const TILE_HEIGHT_HALF  = TILE_HEIGHT / 2;


class Cursor {
  public position: Vector;
  public prevPosition: Vector;
  constructor() {
    this.position = new Vector();
    this.prevPosition = new Vector();
  }
}

export default class Controller {
  public app: PIXI.Application;
  public camera: Camera;
  public cursor: Cursor;
  public world: World;
  constructor() {
    this.cursor = new Cursor();
  }
  screenPositionToWorldPosition(screenPosition: Vector): Vector {
    screenPosition = screenPosition.subtract(new Vector(this.world.position.x, this.world.position.y));
    let coordinate = new Vector();
    coordinate.x = (screenPosition.x / TILE_WIDTH_HALF + screenPosition.y / TILE_HEIGHT_HALF) /2;
    coordinate.y = (screenPosition.y / TILE_HEIGHT_HALF -(screenPosition.x / TILE_WIDTH_HALF)) /2;
    return coordinate;
    //return screenPosition.subtract(new Vector(this.world.position.x, this.world.position.y)).rotate(-26.56505);

    /*
    worldLocation.x = (screen.x / TILE_WIDTH_HALF + screen.y / TILE_HEIGHT_HALF) /2;
    worldLocation.y = (screen.y / TILE_HEIGHT_HALF -(screen.x / TILE_WIDTH_HALF)) /2;
    */
  }
}

let controller = new Controller();

export function getController(): Controller {
  return controller;
}



/*
for (let yi = 0; yi < yCount; yi++) {
  for (let xi = 0; xi < xCount; xi++) {
    let tile = new Tile();
    tile.coordinates = { xi, yi };
    tile.position.x = xi * options.tileWidth + (yi % 2 * options.tileWidth / 2);
    tile.position.y = yi * options.tileHeight / 2;// - (yi % 2 * options.tileHeight / 2);
    tile.position.y += Math.floor(Math.floor(Math.random() * (20 - 0 + 1)) + 0);
    tiles.push(tile);
  }
}
*/


//WEBGLRENDERER
//CanvasRenderer

//var renderer = new PIXI.autoDetectRenderer(400, 300);if (renderer.type == PIXI.WEBGL_RENDERER) {   console.log('Using WebGL');} else {  console.log('Using Canvas');};

//renderer.plugins.interaction.mouse
//renderer.plugins.interaction.mouse.global.x


/*
let appOptions = {
  width: 1200,         // default: 800
  height: 800,        // default: 600
  //forceCanvas: true,
  antialias: false,    // default: false
  transparent: false, // default: false
  resolution: 1,       // default: 1
  backgroundColor: '0x1099bb'
} as PIXI.ApplicationOptions
*/

//Create a Pixi Application
controller.app = new PIXI.Application(
  1200,
  800,
  {
    //forceCanvas: true,
    antialias: false,
    transparent: false,
    resolution: 1,
    backgroundColor: 0x1099bb
  } as PIXI.ApplicationOptions
);

//autoDetectRenderer

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(controller.app.view);

//app.renderer.type

/*
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);
*/

//let world = null;
//let camera = null;

//load an image and run the `setup` function when it's done
PIXI.loader
  .add('assets/images/tile.png')
  .load(setup);

//This `setup` function will run when the image has loaded
function setup() {
  //var texture = PIXI.Texture.fromImage('/assets/images/pc_keys.png');
  var texture = PIXI.loader.resources['assets/images/tile.png'].texture;
  //Create the cat sprite
  let sprite = new PIXI.Sprite(texture);
  //Add the cat to the stage
  //app.stage.addChild(cat);

  //world.addChild(sprite);

  controller.world = new World();
  controller.camera = new Camera(controller.world);

  controller.app.stage.addChild(controller.camera);



  //world.position.set(20, 50);
  //world.vx = 1;

  //world.x = (app.screen.width - world.width) / 2;
  //world.y = (app.screen.height - world.height) / 2;


  /*
  for (let tile of tiles) {
    var tileSprite = new PIXI.Sprite(texture);
    //tileSprite.anchor.set(0.5);
    tileSprite.x = tile.position.x;
    tileSprite.y = tile.position.y;
    world.addChild(tileSprite);
  }
  */

  /*
  for (let yi = 0; yi < yCount; yi++) {
    for (let xi = 0; xi < xCount; xi++) {
      let tile = new Tile(texture);
      tile.coordinates = { xi, yi };
      tile.position.x = xi * options.tileWidth + (yi % 2 * options.tileWidth / 2);
      tile.position.y = yi * options.tileHeight / 2;// - (yi % 2 * options.tileHeight / 2);
      tile.position.y += Math.floor(Math.floor(Math.random() * (20 - 0 + 1)) + 0);
      world.addChild(tile);
    }
  }
  */

}



//let superFastSprites = new PIXI.particles.ParticleContainer();


function gameLoop(delta) {
  //console.log('gameLoop', delta)
  //Call this `gameLoop` function on the next screen refresh
  //(which happens 60 times per second)

  //Move the cat
  //world.x += 1 + delta;

  requestAnimationFrame(gameLoop);
}

//Start the loop
controller.app.ticker.add(delta => gameLoop(delta));




let inputStates = {
  leftMouseDown: false,
  middleMouseDown: false,
  rightMouseDown: false
}

// Bind input events
controller.app.view.addEventListener('mousedown', (event) => {
  if (event.which === 1) {
    inputStates.leftMouseDown = true;
  }
  else if (event.which === 2) {
    inputStates.middleMouseDown = true;
  }
  else if (event.which === 3) {
    inputStates.rightMouseDown = true;
  }
});

controller.app.view.addEventListener('mouseup', (event) => {
  if (event.which === 1) {
    inputStates.leftMouseDown = false;
  }
  else if (event.which === 2) {
    inputStates.middleMouseDown = false;
  }
  else if (event.which === 3) {
    inputStates.rightMouseDown = false;
  }
});

var prevXPos = 0;
var prevYPos = 0;
controller.app.view.addEventListener('mousemove', (e: MouseEvent) => {
  //var distanceX = prevXPos - e.pageX;
  //var distanceY = prevYPos - e.pageY;
  //prevXPos = e.pageX;
  //prevYPos = e.pageY;
  //var screenX = e.pageX - controller.app.view.offsetLeft; 
  //var screenY = e.pageY - controller.app.view.offsetTop; 

  //console.log(e.offsetX, e.offsetY);

  controller.cursor.position.set(e.offsetX, e.offsetY);

  let worldPosition = controller.screenPositionToWorldPosition(controller.cursor.position)
  let coordinate = controller.world.grid.worldPositionToCoordinate(worldPosition);

  console.log('worldPosition', worldPosition);
  console.log('coordinate', coordinate);

  //let cellInFocus = controller.world.grid.getCell(coordinate);

  //controller.camera.testGraphic.position.set(worldPosition.x, worldPosition.y);

  //e.offsetX
  //e.movementX
  //controller.cursor.prevPosition
  //controller.cursor.position.x
  if (inputStates.leftMouseDown && controller.camera) {
    controller.camera.move(new Vector(e.movementX, e.movementY));
    //controller.camera.move(new Vector(distanceX, distanceY));
    //let worldPosition = world.grid.position;
    //world.setWorldPosition(worldPosition.x - distanceX, worldPosition.y - distanceY);
  }
});




var statsFPS = new Stats();
statsFPS.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
statsFPS.dom.style.cssText = 'position:absolute;top:0px;left:0px;';
document.body.appendChild(statsFPS.dom);

var statsMB = new Stats();
statsMB.showPanel(2); // 0: fps, 1: ms, 2: mb, 3+: custom
statsMB.dom.style.cssText = 'position:absolute;top:0px;left:80px;';
document.body.appendChild(statsMB.dom);

function update() {
  window.requestAnimationFrame(update);
  statsFPS.update();
  statsMB.update();
};
window.requestAnimationFrame(update);


//TODO:
/*
  - Move input to controller class
  -
*/





//https://sprite-storm.com/tutorial/pixi-tutorial/pixi-js-creating-game-pixi-application-class/
//https://sprite-storm.com/tutorial/pixi-tutorial/dynamic-button-class-pixi-js/