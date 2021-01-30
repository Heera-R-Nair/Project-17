var PLAY = 1;
var END = 0;
var gameState = PLAY;

var knife, knifeImage;

var score;

var fruit, fruitGroup, fruit1, fruit2, fruit3, fruit4;

var monster, monsterImage, enemyGroup;

var gameoverImage;

var knifeSwooshSound, gameoverSound;

function preload() {

  knifeImage = loadImage("sword.png");

  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");

  monsterImage = loadAnimation("alien1.png", "alien2.png");

  gameoverImage = loadImage("gameover.png");

  knifeSwooshSound = loadSound("knifeSwooshSound.mp3");

  gameoverSound = loadSound("gameover.mp3");

}

function setup() {
  createCanvas(600, 600);

  knife = createSprite(40, 200, 20, 20);
  knife.addImage(knifeImage);
  knife.scale = 0.7;

  fruitGroup = createGroup();
  enemyGroup = createGroup();

  score = 0;

}

function draw() {
  background("lightblue");
  text("Score:" + score, 500, 50);

  if (gameState === PLAY) {

    if (fruitGroup.isTouching(knife)) {
      fruitGroup.destroyEach();
      score = score + 2;
      knifeSwooshSound.play();

    }

    knife.y = World.mouseY;
    knife.x = World.mouseX;

    if (knife.isTouching(enemyGroup)) {
      gameState = END;
      fruitGroup.destroyEach();
      enemyGroup.destroyEach()
      gameoverSound.play();

    }

    fruits();
    Enemy();

  }

  if (gameState === END) {

    fruitGroup.setVelocityXEach(0);
    enemyGroup.setVelocityXEach(0);
    knife.x = 200;
    knife.y = 200;
    knife.addImage(gameoverImage);

  }

  drawSprites();
}

function fruits() {
  if (World.frameCount % 80 === 0) {
    fruit = createSprite(400, 200, 20, 20);
    fruit.scale = 0.2;
    var r = Math.round(random(1, 4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else if (r == 4) {
      fruit.addImage(fruit4);
    }

    fruit.y = Math.round(random(50, 340));

    fruit.velocityX = -(7 + (score / 4));
    fruit.set = 100;

    fruitGroup.add(fruit);

  }
}

function Enemy() {
  if (World.frameCount % 200 === 0) {
    monster = createSprite(400, 200, 20, 20);
    monster.addAnimation("moving", monsterImage);
    monster.y = Math.round(random(100, 300));
    monster.velocityX = -(8 + (score / 10));
    monster.setLifetime = 50;

    enemyGroup.add(monster);
  }
}