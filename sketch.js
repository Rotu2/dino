//variable declaration
var score = 0;
var ground,invisibleGround;
var  trex_running;
var groundImage;
var cloudsGroup, cloudImage; 
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOverImg,restartImg;
var gameOver, restart;
//load all images
function preload(){
  trex_running =                        loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  restartImg = loadImage("restart.png");
  gameOverImg = loadImage("gameOver.png");
}


function setup() {
  createCanvas(600, 200);
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  obstaclesGroup = new Group();
  cloudsGroup = new Group();
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;
  ground.velocityX = -6;
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  restart = createSprite(300,140);
  restart.addImage(restartImg)
  restart.scale = 0.5;
  restart.visible = false;
}

function draw() {
  background(255);
  if(gameState === PLAY){
        score = score + Math.round(getFrameRate()/60);
          if(keyDown("space")&& trex.y >= 150) 

    { 
      trex.velocityY = -12;
    }
  
//adding gravity
  trex.velocityY = trex.velocityY + 0.8;
   if (ground.x < 0){
     
    ground.x = ground.width/2;
    }  
  trex.collide(invisibleGround);
  console.log(trex.y);  
  spawnClouds();
  spawnObstacles();  
    if(obstaclesGroup.isTouching(trex)){
   gameState = END;
 }
  }
  
else if(gameState === END){  
  restart.visible = true;
trex.velocityY = 0
ground.velocityX = 0;
obstaclesGroup.setVelocityXEach(0);
cloudsGroup.setVelocityXEach(0);
 gameOver.visible = true;
if(mousePressedOver(restart)) {
      reset();
    }

}
  textSize(20);
fill("black");
//text("Happy Fathers Day", 10, 30);
 text("Score: "+ score, 500,50); 



  drawSprites();
}
function spawnClouds() {
  if (frameCount % 60 === 0) {
     var cloud = createSprite(600,120,40,10);
  cloud.y = Math.round(random(80,120))
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    cloud.lifetime = 200;
    cloudsGroup.add(cloud);

  }
    
  }
 function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,165,10,40);
   obstacle.velocityX = -6;
   // //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
//assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300; 
//adding obstacles to the group
   obstaclesGroup.add(obstacle);
 }
 
 
 }


function reset(){
  gameState = PLAY;
gameOver.visible = false;
restart.visible = false;


}