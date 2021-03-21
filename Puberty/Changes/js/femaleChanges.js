import SceneButton from '../../../common/js/sceneButton.js';
import Hormone from '../../../common/js/hormone.js';
import Receptor from '../../../common/js/receptor.js';
    
export default class FemaleChanges extends Phaser.Scene {
  constructor() {
    super({key: 'changes'})
  }

  preload () {

    this.load.image('estrogenReceptor', '../../common/images/objects/estrogenReceptor.png');
    this.load.image('estrogen', '../../common/images/objects/estrogen.png');
    this.load.image('testosteroneReceptor', '../../common/images/objects/testosteroneReceptor.png');
    this.load.image('testosterone', '../../common/images/objects/testosterone.png');
    this.load.image('girl', './Puberty/Changes/images/girl.png');

    this.load.image('button', '../../common/images/buttons/red_button01.png');
    this.load.image('buttonPressed', '../../common/images/buttons/red_button02.png');
    
  }

  create () {

    resources.girl = this.add.image(522.85, 310.25, 'girl');
    
    resources.estrogenReceptorBreasts = new Receptor(this, 600.75, 251.7, 'estrogenReceptor', 0.8, 12, 'breast');
    resources.estrogenReceptorGenitals = new Receptor(this, 570.75, 384.45, 'estrogenReceptor', 0.8, 33, 'genitals');
    resources.testosteroneReceptorHair = new Receptor(this, 601, 467, 'testosteroneReceptor', 0.8, 0, 'hair');
    resources.estrogenReceptorGrowth = new Receptor(this, 392.55, 460.75, 'estrogenReceptor', 0.8, 180, 'growth');
    resources.estrogenReceptorHips = new Receptor(this, 384.95, 362.9, 'estrogenReceptor', 0.8, 151, 'hips');
    resources.testosteroneReceptorSweat = new Receptor(this, 390.65, 275.05, 'testosteroneReceptor', 0.8, 145, 'sweat');

    resources.estrogen = new Hormone(this, 100, 100, 'estrogen');

   // resources.estrogenReceptors = this.physics.add.staticGroup([resources.estrogenReceptor1, resources.estrogenReceptor2]);
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



