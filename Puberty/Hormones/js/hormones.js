import SceneButton from '../../../common/js/sceneButton.js';
import Hormone from '../../../common/js/hormone.js';
import Receptor from '../../../common/js/receptor.js';
    
export default class Hormones extends Phaser.Scene {
  constructor() {
    super({key: 'hormones'})
  }

  preload () {

    this.load.image('estrogenReceptor', '../../common/images/objects/estrogenReceptor.png');
    this.load.image('estrogen', '../../common/images/objects/estrogen.png');
  

    this.load.image('testosteroneReceptor', '../../common/images/objects/testosteroneReceptor.png');
    this.load.image('testosterone', '../../common/images/objects/testosterone.png');
    
    this.load.image('receptorCell', '../../Puberty/Hormones/images/receptorCell.png');
    this.load.image('receptorCell2', '../../Puberty/Hormones/images/receptorCell2.png');
   
    this.load.image('signalCell', '../../Puberty/Hormones/images/signalCell.png');
    this.load.image('signalCell2', '../../Puberty/Hormones/images/signalCell2.png');

    this.load.image('button', '../../common/images/buttons/red_button01.png');
    this.load.image('buttonPressed', '../../common/images/buttons/red_button02.png');
    
  }

  create () {
    
    resources.cells = this.physics.add.staticGroup();

    resources.estrogenReceptor = new Receptor(this, 850.1, 180.65, 'estrogenReceptor', 1, 155);
    resources.testosteroneReceptor = new Receptor(this, 850.5, 388.1, 'testosteroneReceptor', 1, 200);

    resources.cells.create(1057.7, 131.5, 'receptorCell').setCircle(125).setTint(0x999999);
    resources.cells.create(1052.25, 462.15, 'receptorCell2').setCircle(115).setTint(0x999999);
    resources.cells.create(161.45, 136.2, 'signalCell').setCircle(105).setInteractive({useHandCursor:true});
    resources.cells.create(162.3, 453.4, 'signalCell2').setCircle(105).setInteractive({useHandCursor:true});

    
    resources.signalTween = this.tweens.add({
      targets: resources.cells.getChildren()[2],
      alpha: 0.65,
      duration: 1500,
      yoyo: true,
      delay: Math.random()*1000,
      repeat: -1
    });

    resources.signalTween2 = this.tweens.add({
      targets: resources.cells.getChildren()[3],
      alpha: 0.65,
      duration: 1500,
      yoyo: true,
      delay: Math.random()*500,
      repeat: -1
    });

    resources.hormones = this.physics.add.group({collideWorldBounds:true});

    resources.cells.getChildren()[2].on('pointerup', () => {
      resources.signalTween.stop();
      resources.cells.getChildren()[2].setAlpha(1);

      if(!resources.estrogen) {
        resources.estrogen = new Hormone(this, 238.9, 117, 'estrogen', 1).setAlpha(0);
        this.physics.add.overlap(resources.estrogenReceptor, resources.estrogen, (receptor, hormone) => {hormone.on('pointerup', () => {hormone.bindReceptor(hormone, receptor, resources.cells.children.entries[0], resources)})});  
        this.tweens.add({
          targets: resources.estrogen,
          x: resources.estrogen.x + 140,
          alpha: 1,
          duration: 1000,
          onComplete: () => {
            resources.hormones.add(resources.estrogen);
          }
        });
      }
    })

    resources.cells.getChildren()[3].on('pointerup', () => {
      resources.signalTween2.stop();
      resources.cells.getChildren()[3].setAlpha(1);

      if (!resources.testosterone) {
        resources.testosterone = new Hormone(this, 252.6, 455, 'testosterone', 1).setAlpha(0).setAngle(200);
        this.physics.add.overlap(resources.testosteroneReceptor, resources.testosterone, (receptor, hormone) => {hormone.on('pointerup', () => {hormone.bindReceptor(hormone, receptor, resources.cells.children.entries[1], resources)})});
      
        this.tweens.add({
          targets: resources.testosterone,
          x: resources.testosterone.x + 150,
          alpha: 1,
          duration: 1000,
          onComplete: () => {
            resources.hormones.add(resources.testosterone);
          }
        });
      }
    })

    this.physics.add.collider(resources.hormones, resources.cells);

    this.input.on('drag', function(pointer, hormone, dragX, dragY) {
      hormone.x = dragX;
      hormone.y = dragY;
    });

    resources.homeButton = new SceneButton(this, 600, 280, 'Assistant', '14px', '#f9f9f9', 'button', 'buttonPressed', 'Home', 'title');
  }

  update () {

  }
}
var resources = {};

// Function if you want to allow learner to remove hormone from receptor.
/*
function unbindHormone(hormone) {
  var receptor;
  var cell;

  if (hormone === resources.estrogen) {
    cell = resources.cells.children.entries[0];
    receptor = resources.estrogenReceptor;
  } else {
    cell = resources.cells.children.entries[1];
    receptor = resources.testosteroneReceptor
  }
  hormone.unbindReceptor(hormone, receptor, cell);
}
*/


