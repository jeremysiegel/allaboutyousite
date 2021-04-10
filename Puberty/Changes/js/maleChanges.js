import SceneButton from '../../../common/js/sceneButton.js';
import Hormone from '../../../common/js/hormone.js';
import Receptor from '../../../common/js/receptor.js';
import ReceptorInteractions from '../../../common/js/receptorInteractions.js';
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
    this.load.image('boyChanges', './Puberty/Changes/images/boy.png');

    this.load.image('backButton', '../../common/images/buttons/back.png');
    this.load.image('resetButton', '../../common/images/buttons/reset.png');
    this.load.image('infoButton', '../../common/images/buttons/info.png');
  }

  create () {
    new Textbox(this, 810, 75, 430, 390);
    
    resources.definitionDisplay = this.add.text(830, 95, resources.infoText,
      {
        fontFamily: 'Assistant',
        fontSize: '30px',
        fill: '0x2E343B',
        wordWrap: { width: 400, useAdvancedWrap: false }
      }
    );
    
    // Hormone boxes.
    new Textbox(this, 45.5, 141, 230, 164, '0xff9085', '0xfe7266', 4);
    new Textbox(this, 45.5, 346, 230, 164, '0x7ac7a5', '0x13c576', 4);

    this.add.text(55, 148, 'Testosterone', {
      fontFamily: 'Assistant',
      fontSize: '30px',
      fill: '#fff'
    });

    this.add.text(55, 353, 'Estrogen', {
      fontFamily: 'Assistant',
      fontSize: '30px',
      fill: '#fff'
    });

    resources.boy = this.add.image(559.2, 310.5, 'boyChanges');

    resources.voice2 = new Receptor(this, 458.1, 172.9, 'testosteroneReceptor', 0.8, 180, 'voice');
    resources.genitals2 = new Receptor(this, 607.15, 392.1, 'testosteroneReceptor', 0.8, 33, 'genitals');
    resources.hair2 = new Receptor(this, 655.1, 474.9, 'testosteroneReceptor', 0.8, 0, 'hair');
    resources.growth2 = new Receptor(this, 420.35, 463.95, 'estrogenReceptor', 0.8, 180, 'growth');
    resources.shoulders2 = new Receptor(this, 651.7, 161.75, 'testosteroneReceptor', 0.8, -12, 'shoulders');
    resources.sweat2 = new Receptor(this, 3429.35, 250.5, 'testosteroneReceptor', 0.8, 145, 'sweat');

    resources.voice = new Receptor(this, 458.1, 172.9, 'testosteroneReceptor', 0.8, 180, 'voice');
    resources.genitals = new Receptor(this, 607.15, 392.1, 'testosteroneReceptor', 0.8, 33, 'genitals');
    resources.hair = new Receptor(this, 655.1, 474.9, 'testosteroneReceptor', 0.8, 0, 'hair');
    resources.growth = new Receptor(this, 420.35, 463.95, 'estrogenReceptor', 0.8, 180, 'growth');
    resources.shoulders = new Receptor(this, 651.7, 161.75, 'testosteroneReceptor', 0.8, -12, 'shoulders');
    resources.sweat = new Receptor(this, 429.35, 250.5, 'testosteroneReceptor', 0.8, 145, 'sweat');

    resources.estrogen = new Hormone(this, 181.35, 441.6, 'estrogen', 0.8);

    resources.testosterone = new Hormone(this, 80.55, 248.05, 'testosterone', 0.8);
    resources.testosterone2 = new Hormone(this, 155.45, 210.75, 'testosterone', 0.8);
    resources.testosterone3 = new Hormone(this, 225.45, 205.05, 'testosterone', 0.8);
    resources.testosterone4 = new Hormone(this, 203.45, 272.25, 'testosterone', 0.8);
    resources.testosterone5 = new Hormone(this, 135.05, 267.45, 'testosterone', 0.8);

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

    new ReceptorInteractions(resources.changes, resources.definitionDisplay, resources.definitions, false);

    resources.backButton = new SceneButton(this, 1200, 567, 0.1, 'changesTitle', 'backButton');
    resources.resetButton = new ResetButton(this, 1140, 567, 0.1, 'resetButton');
    resources.infoButton = new InfoButton(this, 1200, 507, 0.1, infoText, resources, 'infoButton');

  }
}

var resources = {
  change: '',
  infoText: "What are the changes of puberty?\n\nDifferent parts of the body are \"listening\" for a hormone message.\n\nDrag the hormones to each body part to trigger the changes of puberty.",
  definitions: {
    voice: 'The voice deepens significantly.\n\nSometimes the voice cracks when it changes, which is perfectly normal.',
    genitals: 'The penis and testicles grow.\n\nErections and ejaculations (sperm leaving the body) begin.\n\nSometimes the first ejaculation happens during sleep (also known as a "wet dream").',
    hair: 'Thick hair starts to grow all around the body, like the arms, legs, and face.\n\nNew hair grows around the genitals (pubic hair), and in the armpits.',
    growth: 'There is a "growth spurt", or a time when you get taller pretty quickly.\n\nYou might notice that you need to get new clothes.',
    shoulders: 'Males develop wider shoulders.',
    sweat: 'Sweat changes and gets more smelly. Many people wear deoderant to stop the smell.\n\nThe new sweat causes acne or pimples, another perfectly normal part of puberty'
  }
};

function infoText (resources) {
  resources.definitionDisplay.setText(resources.infoText);
}




