import SceneButton from '../../../common/js/sceneButton.js';
import Textbox from '../../../common/js/textbox.js';
import FRSStrings from './FRS_strings.js';
import DiagramInteractions from '../../../common/js/diagramInteractions.js';
    
export default class FRS extends Phaser.Scene {
  constructor() {
    super({key: 'FRS'})
  }

  preload () {

    this.load.image('femaleInternal', '../../Puberty/Female-Internal/images/FRS diagram.png');
    this.load.image('frsLabels', '../../Puberty/Female-Internal/images/FRS labels.png');
    this.load.image('frsLabelLines', '../../Puberty/Female-Internal/images/FRS label lines.png');
    this.load.image('ovaries', '../../Puberty/Female-Internal/images/ovaries.png');
    this.load.image('fTubes', '../../Puberty/Female-Internal/images/FT.png');
    this.load.image('uterus', '../../Puberty/Female-Internal/images/uterus.png');
    this.load.image('vagina', '../../Puberty/Female-Internal/images/vagina.png');
    this.load.image('cervix', '../../Puberty/Female-Internal/images/cervix.png');

    this.load.image('backButton', '../../common/images/buttons/back.png');
  //  this.load.image('explanationButton', '../../common/images/buttons/more.png');
    
    resources.definitions = new FRSStrings(true);
  }

  create () {
    new Textbox(this, 810, 75, 430, 400);

    resources.femaleInternal = this.add.image(454.25, 290.55, 'femaleInternal');
    resources.ft = this.add.image(454.6, 150.85, 'fTubes');
    resources.ovaries = this.add.image(454, 216.65, 'ovaries');
    resources.uterus = this.add.image(454.75, 248.6, 'uterus')
      .on('pointerover', function() {
        resources.cervix.setBlendMode(Phaser.BlendModes.SCREEN);
      })
      .on('pointerout', function() {
        resources.cervix.setBlendMode(Phaser.BlendModes.NORMAL);
    });

    resources.vagina = this.add.image(454.25, 447.7, 'vagina');
    resources.cervix = this.add.image(455.35, 393.2, 'cervix');

    resources.organs = [resources.ft, resources.ovaries, resources.uterus, resources.vagina, resources.cervix];

    resources.frsLabels = this.add.image(384.35, 374.55, 'frsLabels');
    resources.frsLabelLines = this.add.image(377.6, 299.2, 'frsLabelLines');

  //  resources.toggleObjects = {labels: resources.frsLabels, lines: resources.frsLabelLines};

  //  resources.labelButton = new ToggleButton(this, 55, 280, 'Assistant', '14px', '#f9f9f9', 'button', 'buttonPressed', 'Labels', toggle, resources.toggleObjects);

    resources.definitionDisplay = this.add.text(830, 95, 'Female Reproductive System. Click on each part to learn what it does.',
      {
        fontFamily: 'Assistant',
        fontSize: '30px',
        fill: '#000',
        wordWrap: { width: 400, useAdvancedWrap: true }
      }
    );
    
 //   resources.explanationButton = new ToggleButton(this, 435, 280, 'Assistant', '14px', '#f9f9f9', 'explanationButton', 'explanationButton', '', explanations);
 //   resources.explanationButton.visible = false;
    
    new DiagramInteractions(resources.organs, resources.definitionDisplay, resources.definitions, resources, 'organ', true, resources.explanationButton);
  
    resources.backButton = new SceneButton(this, 600, 280, 'Assistant', '14px', '#f9f9f9', 'backButton', 'backButton', '', 'reproductiveTitle');

  }
}

function toggle(toggleObjects){
  for (const object in toggleObjects) {
    toggleObjects[object].visible = !toggleObjects[object].visible;
  }
}

function explanations() {
  resources.explanations = !resources.explanations;

  resources.definitions = new FRSStrings(resources.explanations);
  new DiagramInteractions(resources.organs, resources.definitionDisplay, resources.definitions, resources, 'organ', resources.explanationButton);
  
  resources.definitionDisplay.text = resources.definitions[resources.organ];
}

var resources = {
  explanations: false,
  organ: ''
};

