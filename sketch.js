var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  doorsGroup = new Group();
  climbersGroup = new Group();
  ghost = createSprite(200,200);
  ghost.addImage(ghostImg);
  ghost.scale = 0.5;
  invisibleBlockGroup = new Group();
}

function draw() {
  background(200);
  //start
  if(keyDown("left_arrow"))
  {
    ghost.x = ghost.x-3;
  }
  if(keyDown("right_arrow"))
  {
    ghost.x = ghost.x+3;
  }
  if(keyDown("space"))
  {
    ghost.velocityY = -5;
  }
  ghost.velocityY += 0.8;
  if(invisibleBlockGroup.isTouching(ghost))
  {
    ghost.velocityY = 0;
  }
  spawnDoors();

  if(tower.y > 400){
      tower.y = 300
    }
  //end
    drawSprites();
}

function spawnDoors()
{
  if(frameCount%250===0)
  {
    var door = createSprite(Math.round(random(120,400)),-50);
    door.velocityY = 1;
    door.addImage(doorImg);
    door.lifetime = 725;
    doorsGroup.add(door);
    var climber = createSprite(door.x,door.y+60);
    climber.velocityY = door.velocityY;
    climber.addImage(climberImg);
    climber.lifetime = door.lifetime;
    climbersGroup.add(climber);

    ghost.depth = door.depth;
    ghost.depth += 1;

    var invisibleBlock = createSprite(door.x,15,climber.width,2);
    invisibleBlock.velocityY = door.velocityY;
    invisibleBlockGroup.add(invisibleBlock);
  }
}