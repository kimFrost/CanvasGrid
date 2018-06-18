
import Tile from './tile';
import Cell from './cell';
import World from './world';
import Camera from './camera';



let zoom = 1;
let xCount = 20;
let yCount = 20;


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

//Create a Pixi Application
let app = new PIXI.Application({
  width: 1200,         // default: 800
  height: 800,        // default: 600
  //forceCanvas: true,
  antialias: false,    // default: false
  transparent: false, // default: false
  resolution: 1,       // default: 1
  backgroundColor: '0x1099bb'
});

//autoDetectRenderer

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

console.log('app', app);

app.renderer.type

/*
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);
*/

let world = null;


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

  world = new World();
  let camera = new Camera(world);

  app.stage.addChild(camera);



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
app.ticker.add(delta => gameLoop(delta));




let inputStates = {
  leftMouseDown: false,
  middleMouseDown: false,
  rightMouseDown: false
}

// Bind input events
app.view.addEventListener('mousedown', (event) => {
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

app.view.addEventListener('mouseup', (event) => {
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
app.view.addEventListener('mousemove', (e) => {
  var distanceX = prevXPos - e.pageX;
  var distanceY = prevYPos - e.pageY;
  prevXPos = e.pageX;
  prevYPos = e.pageY;
  if (inputStates.leftMouseDown && world) {
    let worldPosition = world.grid.position;
    world.setWorldPosition(worldPosition.x - distanceX, worldPosition.y - distanceY);
  }
});




var statsFPS = new Stats();
statsFPS.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
statsFPS.domElement.style.cssText = 'position:absolute;top:0px;left:0px;';
document.body.appendChild(statsFPS.dom);

var statsMB = new Stats();
statsMB.showPanel(2); // 0: fps, 1: ms, 2: mb, 3+: custom
statsMB.domElement.style.cssText = 'position:absolute;top:0px;left:80px;';
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