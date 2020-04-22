let score = 0;
let scroll = 10;
let scrollBg = 0;
let trains = [];
let unicorn;
let failSounds = [];
let restart = false;
let count = 0;
let mv = 0;
let flag = 0;

function preload() {
  music = loadSound('theme.mp3');
  ding = loadSound('smw_jump.wav');
  whistle = loadSound('quedate.mp3');
  bg = loadImage('bgn1.png');
  train = loadImage('virus.png');
  jumper = loadImage('test2.png');

  for (let i = 0; i < 2; i++) {
    failSounds[i] = loadSound(`fail${i+1}.mp3`);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight-(windowHeight/4));
  unicorn = new Unicorn();
  music.playMode('restart');
  music.setLoop(true);
  music.play();

  createP(' <a href="https://forcesk.github.io/Gatell-Game/">JUGAR DE NUEVO</a>')

  createP('<br/>')
  createP('<br/>')


  createP('Based on <a href="https://thecodingtrain.com/CodingChallenges/147-chrome-dinosaur" target="_blank">coding challenge</a> by <a href="https://shiffman.net/" target="_blank">Dan Shiffman')
  createP('Based on <a href="https://editor.p5js.org/swiftpotato/sketches/Ca6Q58Gq2" target="_blank">This dot jumper by Swiftpotato</a>')
  createP('Based on <a href="https://www.facebook.com/eldeformaTV/videos/884599352012036/UzpfSTMyNzA5NDg0MDc0ODg3MzoyMDUzNDk0NDIxNDQyMjMx/" target="_blank">El deforma TV</a>')

}

function keyPressed() {
  if (restart){
    restart = false;
    score = 0;
    scollBg = 0;
    scroll = 10;
    trains = [];
    music.play();
    loop();
  }
  if (key == ' ') {
      unicorn.jump();
      return false;
  }


}


 function mousePressed()
{

  if (restart){
    restart = false;
    score = 0;
    scollBg = 0;
    scroll = 10;
    trains = [];
    music.play();
    loop();
  }

	 unicorn.jump();
      return false;
}


function draw() {

   mv = mv+1;

  if(mv==22){

  if(flag == 0){
    jumper = loadImage('move2.png');
      flag = 1;
      mv= 0;
  }


  }


   if(mv==22){

  if(flag == 1){
    jumper = loadImage('test2.png');
      flag = 0;
     mv= 0;
  }

  }





  image(bg, -scrollBg, 0, width,height);
  image(bg, -scrollBg + width, 0,width,height);

  if (scrollBg > width) {
    scrollBg = 0;
  }

  if (random(1) < 0.90 && frameCount % 55 == 0) {
    trains.push(new Train())

  }

  if (score % 100 == 0 && score != 0) {
    whistle.play()
  }

  if (frameCount % 10 == 0) {
    score++;
  }

  fill(255)
  textSize(32);
  textFont('monospace');
  text(`Score: ${score}`, 10, 30);

  for (let t of trains) {
    t.move();
    t.show();

    if(unicorn.collide(t)) {
      noLoop()
      music.stop();
      let sound = random(failSounds)
      sound.play();

      fill(255)
      text(`Game Over! Estás contagiado!`, 45, height/2)
      restart = true;
    }
  }

  unicorn.show()
  unicorn.move()

  scroll += 0.02;
  scrollBg += scroll / 5;
}

class Unicorn {
  constructor() {
    this.r = 100;
    this.x = 50;
    this.y = height - this.r;
    this.vy = 0;
    this.gravity = 2;
  }

  move() {

    this.y += this.vy;
    this.vy += this.gravity;


    this.y = constrain(this.y,0,height-this.r)

  }

  jump() {
    jumper = loadImage('jump1.png');
    if (this.y == height - this.r) {
      this.vy = -32;
      ding.play();

    }
  }

  collide(other) {

      let hitX = this.x + this.r > other.x &&
                 this.x < other.x + other.r
      let hitY = this.y + this.r > other.y
      return(hitX && hitY)
  }

  show() {
    fill(255,127);
    //rect(this.x, this.y, this.r, this.r)
    image(jumper,this.x, this.y, this.r, this.r)

  }
}

class Train {
  constructor() {
    this.r = 75;
    this.x = width-10;
    this.y = height - this.r+10;
  }

  move(){

    this.x -= scroll;
  }

  show() {
    fill(255,127);
    //rect(this.x, this.y, this.r, this.r)

    image(train,this.x, this.y-10, this.r, this.r)

  }
}
