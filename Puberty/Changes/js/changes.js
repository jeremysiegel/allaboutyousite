import ToggleButton from '../../../common/js/toggleButton.js';
import Hormone from './hormone.js';
import Receptor from './receptor.js';
    
export default class Changes extends Phaser.Scene {
  constructor() {
    super({key: 'changes'})
  }

  preload () {

    this.load.image('estrogenReceptor', '../../Puberty/Changes/images/estrogenReceptor.png');
    this.load.image('estrogen', '../../Puberty/Changes/images/estrogen.png');

    this.load.image('button', '../../common/images/buttons/red_button01.png');
    this.load.image('buttonPressed', '../../common/images/buttons/red_button02.png');
    
  }

  create () {

    resources.estrogenReceptor1 = new Receptor(this, 500, 500, 'estrogenReceptor', 0.5, 135);
    resources.estrogenReceptor2 = new Receptor(this, 300, 100, 'estrogenReceptor', 1, 45);
    resources.estrogen = new Hormone(this, 100, 100, 'estrogen');

    resources.estrogenReceptors = this.physics.add.staticGroup([resources.estrogenReceptor1, resources.estrogenReceptor2]);
    resources.estrogens = this.physics.add.group(resources.estrogen);

    this.physics.add.overlap(resources.estrogenReceptors, resources.estrogens, (gameObject1, gameObject2) => {gameObject2.bindReceptor(gameObject1.body.center)});

    //resources.estrogenReceptor2.changeAngle(135);
    //resources.estrogenReceptor2.changeScale(0.5);
  
//    resources.estrogenReceptor.body.angle = 45;

    this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

   // resources.estrogen.on('pointerup', () => {
   //   var bindingSite = resources.estrogenReceptor2.getBindingSite();
   //   resources.estrogen.bindReceptor(bindingSite);
   // })

    resources.homeButton = new ToggleButton(this, 600, 280, 'Assistant', '14px', '#f9f9f9', 'button', 'buttonPressed', 'Home', home.bind(this));
  }
}

var resources = {};


function home() {
  this.scene.switch('title');
}



