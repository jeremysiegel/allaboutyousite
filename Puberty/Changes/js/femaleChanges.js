import SceneButton from '../../../common/js/sceneButton.js';
import Hormone from '../../../common/js/hormone.js';
import Receptor from '../../../common/js/receptor.js';
import ReceptorInteractions from '../../../common/js/receptorInteractions.js';
import FemaleChangesStrings from './femaleChangesStrings.js';

    
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

    resources.definitions = new FemaleChangesStrings(false);

    
  }

  create () {

    resources.girl = this.add.image(522.85, 310.25, 'girl');
    
    resources.breasts2 = new Receptor(this, 600.75, 251.7, 'estrogenReceptor', 0.8, 12, 'breasts');
    resources.genitals2 = new Receptor(this, 570.75, 384.45, 'estrogenReceptor', 0.8, 33, 'genitals');
    resources.hair2 = new Receptor(this, 601, 467, 'testosteroneReceptor', 0.8, 0, 'hair');
    resources.growth2 = new Receptor(this, 392.55, 460.75, 'estrogenReceptor', 0.8, 180, 'growth');
    resources.hips2 = new Receptor(this, 384.95, 362.9, 'estrogenReceptor', 0.8, 151, 'hips');
    resources.sweat2 = new Receptor(this, 390.65, 275.05, 'testosteroneReceptor', 0.8, 145, 'sweat');

    resources.breasts = new Receptor(this, 600.75, 251.7, 'estrogenReceptor', 0.8, 12, 'breasts');
    resources.genitals = new Receptor(this, 570.75, 384.45, 'estrogenReceptor', 0.8, 33, 'genitals');
    resources.hair = new Receptor(this, 601, 467, 'testosteroneReceptor', 0.8, 0, 'hair');
    resources.growth = new Receptor(this, 392.55, 460.75, 'estrogenReceptor', 0.8, 180, 'growth');
    resources.hips = new Receptor(this, 384.95, 362.9, 'estrogenReceptor', 0.8, 151, 'hips');
    resources.sweat = new Receptor(this, 390.65, 275.05, 'testosteroneReceptor', 0.8, 145, 'sweat');

    resources.estrogen = new Hormone(this, 125.65, 469.8, 'estrogen', 0.8);
    resources.estrogen2 = new Hormone(this, 161.35, 431.6, 'estrogen', 0.8);
    resources.estrogen3 = new Hormone(this, 175.65, 487.3, 'estrogen', 0.8);
    resources.estrogen4 = new Hormone(this, 213.15, 447.3, 'estrogen', 0.8);

    resources.testosterone = new Hormone(this, 155.05, 296.95, 'testosterone', 0.8);
    resources.testosterone2 = new Hormone(this, 171.45, 255.05, 'testosterone', 0.8);

    resources.changes = [resources.breasts, resources.genitals, resources.hair, resources.growth, resources.hips, resources.sweat];
    resources.changes2 = [resources.breasts2, resources.genitals2, resources.hair2, resources.growth2, resources.hips2, resources.sweat2];

    resources.estrogenReceptors = this.physics.add.staticGroup([resources.breasts, resources.genitals, resources.growth, resources.hips]);
    resources.estrogenGroup = this.physics.add.group({collideWorldBounds:true});
    resources.estrogens = [resources.estrogen, resources.estrogen2, resources.estrogen3, resources.estrogen4];

    resources.estrogenGroup.add(resources.estrogen);
    resources.estrogenGroup.add(resources.estrogen2);
    resources.estrogenGroup.add(resources.estrogen3);
    resources.estrogenGroup.add(resources.estrogen4);

    /*
    for (let estrogen in resources.estrogens) {
      resources.estrogenGroup.add(estrogen);
    }
*/
    resources.testosteroneReceptors = this.physics.add.staticGroup([resources.hair, resources.sweat]);
    resources.testosteroneGroup = this.physics.add.group({collideWorldBounds:true});
    resources.testosterones = [resources.testosterone, resources.testosterone2];

    resources.testosteroneGroup.add(resources.testosterone);
    resources.testosteroneGroup.add(resources.testosterone2);
  
    this.physics.add.overlap(resources.estrogenReceptors, resources.estrogenGroup, (receptor, hormone) => {hormone.on('pointerup', () => {hormone.bindReceptor(hormone, receptor)})});
    this.physics.add.overlap(resources.testosteroneReceptors, resources.testosteroneGroup, (receptor, hormone) => {hormone.on('pointerup', () => {hormone.bindReceptor(hormone, receptor)})});

    this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    resources.definitionDisplay = this.add.text(820, 85, '',
      {
        fontFamily: 'Assistant',
        fontSize: '30px',
        fill: '#000',
        wordWrap: { width: 400, useAdvancedWrap: true }
      }
    );

  new ReceptorInteractions(resources.changes, resources.definitionDisplay, resources.definitions, resources, 'change', false);


  resources.homeButton = new SceneButton(this, 600, 280, 'Assistant', '14px', '#f9f9f9', 'button', 'buttonPressed', 'Home', 'title');
  }
}

var resources = {
  change: ''
};



