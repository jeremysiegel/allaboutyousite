import SceneButton from '../../../common/js/sceneButton.js';
import Hormone from '../../../common/js/hormone.js';
import Receptor from '../../../common/js/receptor.js';
    
export default class Changes extends Phaser.Scene {
  constructor() {
    super({key: 'changes'})
  }

  preload () {

    this.load.image('estrogenReceptor', '../../common/images/objects/estrogenReceptor.png');
    this.load.image('estrogen', '../../common/images/objects/estrogen.png');

    this.load.image('button', '../../common/images/buttons/red_button01.png');
    this.load.image('buttonPressed', '../../common/images/buttons/red_button02.png');
    
  }

  create () {

    resources.estrogenReceptor1 = new Receptor(this, 500, 500, 'estrogenReceptor', 0.5, 135);
    resources.estrogenReceptor2 = new Receptor(this, 300, 100, 'estrogenReceptor', 1, 45);
    resources.estrogen = new Hormone(this, 100, 100, 'estrogen');

    resources.estrogenReceptors = this.physics.add.staticGroup([resources.estrogenReceptor1, resources.estrogenReceptor2]);
    resources.estrogens = this.physics.add.group({collideWorldBounds:true});

    resources.estrogens.add(resources.estrogen);

    this.physics.add.overlap(resources.estrogenReceptors, resources.estrogens, (receptor, hormone) => {hormone.on('pointerup', () => {hormone.bindReceptor(hormone, receptor)})});

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

   resources.homeButton = new SceneButton(this, 600, 280, 'Assistant', '14px', '#f9f9f9', 'button', 'buttonPressed', 'Home', 'title');
  }
}

var resources = {};



