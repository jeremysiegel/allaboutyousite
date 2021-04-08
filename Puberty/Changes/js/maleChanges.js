import SceneButton from '../../../common/js/sceneButton.js';
import Hormone from '../../../common/js/hormone.js';
import Receptor from '../../../common/js/receptor.js';
import ReceptorInteractions from '../../../common/js/receptorInteractions.js';
import MaleChangesStrings from './maleChangesStrings.js';
import Textbox from '../../../common/js/textbox.js';
import ResetButton from '../../../common/js/resetButton.js';
import InfoButton from '../../../common/js/infoButton.js';

    
export default class MaleChanges extends Phaser.Scene {
  constructor() {
    super({key: 'maleChanges'})
  }

  preload () {

    this.load.image('estrogenReceptor', '../../common/images/objects/estrogenReceptor.png');
    this.load.image('estrogen', '../../common/images/objects/estrogen.png');
    this.load.image('testosteroneReceptor', '../../common/images/objects/testosteroneReceptor.png');
    this.load.image('testosterone', '../../common/images/objects/testosterone.png');
    this.load.image('boy', './Puberty/Changes/images/boy.png');

    this.load.image('backButton', '../../common/images/buttons/back.png');
    this.load.image('resetButton', '../../common/images/buttons/reset.png');
    this.load.image('infoButton', '../../common/images/buttons/info.png');

    resources.definitions = new MaleChangesStrings(false);

  }

  create () {
    new Textbox(this, 810, 75, 430, 400);

    resources.boy = this.add.image(529.2, 310.5, 'boy');

    resources.voice2 = new Receptor(this, 428.1, 172.9, 'testosteroneReceptor', 0.8, 180, 'voice');
    resources.genitals2 = new Receptor(this, 577.15, 392.1, 'testosteroneReceptor', 0.8, 33, 'genitals');
    resources.hair2 = new Receptor(this, 625.1, 474.9, 'testosteroneReceptor', 0.8, 0, 'hair');
    resources.growth2 = new Receptor(this, 390.35, 463.95, 'estrogenReceptor', 0.8, 180, 'growth');
    resources.shoulders2 = new Receptor(this, 621.7, 161.75, 'testosteroneReceptor', 0.8, -12, 'shoulders');
    resources.sweat2 = new Receptor(this, 399.35, 250.5, 'testosteroneReceptor', 0.8, 145, 'sweat');

    resources.voice = new Receptor(this, 428.1, 172.9, 'testosteroneReceptor', 0.8, 180, 'voice');
    resources.genitals = new Receptor(this, 577.15, 392.1, 'testosteroneReceptor', 0.8, 33, 'genitals');
    resources.hair = new Receptor(this, 625.1, 474.9, 'testosteroneReceptor', 0.8, 0, 'hair');
    resources.growth = new Receptor(this, 390.35, 463.95, 'estrogenReceptor', 0.8, 180, 'growth');
    resources.shoulders = new Receptor(this, 621.7, 161.75, 'testosteroneReceptor', 0.8, -12, 'shoulders');
    resources.sweat = new Receptor(this, 399.35, 250.5, 'testosteroneReceptor', 0.8, 145, 'sweat');

    resources.estrogen = new Hormone(this, 161.35, 431.6, 'estrogen', 0.8);

    resources.testosterone = new Hormone(this, 95.55, 248.05, 'testosterone', 0.8);
    resources.testosterone2 = new Hormone(this, 141.45, 228.75, 'testosterone', 0.8);
    resources.testosterone3 = new Hormone(this, 171.45, 255.05, 'testosterone', 0.8);
    resources.testosterone4 = new Hormone(this, 153.45, 292.25, 'testosterone', 0.8);
    resources.testosterone5 = new Hormone(this, 125.05, 267.45, 'testosterone', 0.8);

    resources.changes = [resources.voice, resources.genitals, resources.hair, resources.growth, resources.shoulders, resources.sweat];
    resources.changes2 = [resources.voice2, resources.genitals2, resources.hair2, resources.growth2, resources.shoulders2, resources.sweat2];

    resources.estrogenReceptors = this.physics.add.staticGroup(resources.growth);
    resources.estrogenGroup = this.physics.add.group({collideWorldBounds:true});
    resources.estrogens = [resources.estrogen];

    resources.estrogenGroup.add(resources.estrogen);

    resources.testosteroneReceptors = this.physics.add.staticGroup([resources.voice, resources.genitals, resources.hair, resources.shoulders, resources.sweat]);
    resources.testosteroneGroup = this.physics.add.group({collideWorldBounds:true});
    resources.testosterones = [resources.testosterone, resources.testosterone2];

    resources.testosteroneGroup.add(resources.testosterone);
    resources.testosteroneGroup.add(resources.testosterone2);
    resources.testosteroneGroup.add(resources.testosterone3);
    resources.testosteroneGroup.add(resources.testosterone4);
    resources.testosteroneGroup.add(resources.testosterone5);
  
    this.physics.add.collider(resources.testosteroneGroup, resources.testosteroneGroup);
    this.physics.add.collider(resources.testosteroneGroup, resources.estrogenGroup);
    this.physics.add.overlap(resources.estrogenReceptors, resources.estrogenGroup, (receptor, hormone) => {hormone.on('pointerup', () => {hormone.bindReceptor(hormone, receptor)})});
    this.physics.add.overlap(resources.testosteroneReceptors, resources.testosteroneGroup, (receptor, hormone) => {hormone.on('pointerup', () => {hormone.bindReceptor(hormone, receptor)})});

    this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    resources.definitionDisplay = this.add.text(830, 95, resources.infoText,
      {
        fontFamily: 'Assistant',
        fontSize: '30px',
        fill: '#000',
        wordWrap: { width: 400, useAdvancedWrap: true }
      }
    );

    new ReceptorInteractions(resources.changes, resources.definitionDisplay, resources.definitions, false);

    resources.backButton = new SceneButton(this, 1200, 567, 0.1, 'changesTitle', 'backButton');
    resources.resetButton = new ResetButton(this, 1140, 567, 0.1, 'resetButton');
    resources.infoButton = new InfoButton(this, 1200, 507, 0.1, infoText, resources, 'infoButton');

  }
}

var resources = {
  change: '',
  infoText: 'What are the male changes of puberty? Different parts of the body are listening for the hormone messages during puberty. Drag the hormones to each body part to trigger the changes of puberty.'
};

function infoText (resources) {
  resources.definitionDisplay.setText(resources.infoText);
}




