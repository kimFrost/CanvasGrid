
import Tile from './tile';


const options = {
  tileWidth: 100,
  tileHeight: 50
};

let zoom = 1;
let xCount = 20;
let yCount = 20;
let tiles = [];

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



//Create a Pixi Application
let app = new PIXI.Application({
  width: 1200,         // default: 800
  height: 800,        // default: 600
  antialias: true,    // default: false
  transparent: false, // default: false
  resolution: 1,       // default: 1
  backgroundColor: '0x1099bb'
});

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

/*
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);
*/

let world = new PIXI.Container()
app.stage.addChild(world);

world.position.set(20, 50);
world.vx = 1;
//world.x = (app.screen.width - world.width) / 2;
//world.y = (app.screen.height - world.height) / 2;



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
  world.addChild(sprite);

  for (let tile of tiles) {
    var tileSprite = new PIXI.Sprite(texture);
    //tileSprite.anchor.set(0.5);
    tileSprite.x = tile.position.x;
    tileSprite.y = tile.position.y;
    world.addChild(tileSprite);
  }
}



//let superFastSprites = new PIXI.particles.ParticleContainer();


function gameLoop(delta) {
  //console.log('gameLoop', delta)
  //Call this `gameLoop` function on the next screen refresh
  //(which happens 60 times per second)
  requestAnimationFrame(gameLoop);

  //Move the cat
  //world.x += 1 + delta;
}

//Start the loop
app.ticker.add(delta => gameLoop(delta));