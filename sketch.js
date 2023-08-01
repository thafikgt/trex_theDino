var trex ,trex_running;
var edges;
var ground,ground_img;
var invisibleGround;
var cloud,cloud_image;
var r;
var o1,o2,o3,o4,o5,o6;
var obstcl;
var cloudGroup;
var obstacleGroup;
var PLAY=1;
var END=0;
var gameState=PLAY;
var score=0;
var trex_collided;
var gameOver;
var gameOverimg;
var restart;
var restart_img;
var checkpoinSound;
var collidedSound;
var dieSound;
var jumpSound;

function preload(){
  
trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
ground_img=loadImage("ground2.png");
cloud_image=loadImage("cloud.png");
o1=loadImage("obstacle1.png");
o2=loadImage("obstacle2.png");
o3=loadImage("obstacle3.png");
o4=loadImage("obstacle4.png");
o5=loadImage("obstacle5.png");
o6=loadImage("obstacle6.png");
gameOverimg=loadImage("gameOver.png");
restart_img=loadImage("restart.png");
trex_collided=loadAnimation("trex_collided.png");
checkpoinSound=loadSound("checkpoint.mp3");
collidedSound=loadSound("collided.wav");
dieSound=loadSound("die.mp3");
jumpSound=loadSound("jump.wav");
}

function setup(){
  createCanvas(600,200);
  
  //create a trex sprite
 trex=createSprite(50,160,20,50)
trex.addAnimation("running",trex_running);
trex.addAnimation("collided",trex_collided);
trex.scale=0.5

ground=createSprite(200,180,400,20);
ground.addImage("ground",ground_img);

invisibleGround=createSprite(200,190,500,20)
invisibleGround.visible=false;

restart=createSprite(300,100,20,50);
restart.addImage("restart",restart_img);
restart.scale=0.4;

gameOver=createSprite(300,70.20,50);
gameOver.addImage("gameover",gameOverimg);
gameOver.scale=0.5;

edges=createEdgeSprites();

var ran=Math.round(random(1,100))
//console.log(ran)

cloudGroup=createGroup();
obstacleGroup=createGroup();
}

function draw(){
  background(53);

text("SCORE - " +score,500,30);

if (score>0 && score % 100 === 0) {
  checkpoinSound.play();
};

if (gameState===PLAY) {
  score=score+Math.round(frameCount/100);

  ground.velocityX=-6;

  if(ground.x<0){
    ground.x=ground.width/2
    }

    if (keyDown("space") && trex.y>=156) {
      trex.velocityY=-10;
      jumpSound.play()
    }
    trex.velocityY+=0.5;

    restart.visible=false;
    gameOver.visible=false;

    spawnClouds();
    spawnObstacles();


if (obstacleGroup.isTouching(trex)) {
  gameState=END
  collidedSound.play();
}
}
else if (gameState===END) {
  ground.velocityX=0;

trex.velocityY=0;
trex.y=160;
trex.changeAnimation("collided",trex_collided);

cloudGroup.setLifetimeEach(-1);
obstacleGroup.setLifetimeEach(-1);

restart.visible=true;
gameOver.visible=true;

cloudGroup.setVelocityXEach(0);
obstacleGroup.setVelocityXEach(0);

if (mousePressedOver(restart)) {
  reset()
}
}

//console.log(trex.y);




trex.collide(invisibleGround);


drawSprites();
}

function spawnClouds() {

if (frameCount%60===0) {
  cloud=createSprite(600,100,40,10);
cloud.velocityX=-3;
cloud.y=Math.round(random(5,100))
cloud.addImage("cloud",cloud_image)
cloud.scale=0.6
//console.log(trex.depth)
//console.log(cloud.depth)
cloud.depth=trex.depth;
trex.depth=trex.depth+1;
cloud.lifetime=210;
cloudGroup.add(cloud)
}


//console.log(frameCount)
}

function spawnObstacles() {
  
if (frameCount%65===0) {
  obstcl=createSprite(600,165,10,40);
obstcl.velocityX=-6;


  var r=Math.round(random(1,6))
switch (r) {
case 1: obstcl.addImage(o1);
          break;
case 2: obstcl.addImage(o2);
          break;
case 3: obstcl.addImage(o3);
          break;
case 4: obstcl.addImage(o4);
          break;
case 5: obstcl.addImage(o5);
          break;
case 6: obstcl.addImage(o6);
          break;
  default:
    break;
}
obstcl.scale=0.4;
obstcl.lifetime=210;
obstacleGroup.add(obstcl);
}
}

function reset() {
  gameState=PLAY;
  restart.visible=false;
  gameOver.visible=false;
obstacleGroup.destroyEach();
cloudGroup.destroyEach();
trex.changeAnimation("running",trex_running);
score=0;
}








