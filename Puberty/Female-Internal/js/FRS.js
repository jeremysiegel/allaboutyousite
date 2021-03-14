import ToggleButton from '../../../evolutus-core/js/toggleButton.js';
import FRSStrings from './FRS_strings.js';
import DiagramInteractions from '../../../evolutus-core/js/diagramInteractions.js';
    
export default class FRS extends Phaser.Scene {
  constructor() {
    super({key: 'FRS'})
  }

  preload () {

    this.load.image('femaleInternal', '../../Puberty/Female-Internal/images/FRS diagram.png');
    this.load.image('frsTitle', '../../Puberty/Female-Internal/images/FRS title.png');
    this.load.image('frsLabels', '../../Puberty/Female-Internal/images/FRS labels.png');
    this.load.image('frsLabelLines', '../../Puberty/Female-Internal/images/FRS label lines.png');
    this.load.image('ovaries', '../../Puberty/Female-Internal/images/ovaries.png');
    this.load.image('fTubes', '../../Puberty/Female-Internal/images/FT.png');
    this.load.image('uterus', '../../Puberty/Female-Internal/images/uterus.png');
    this.load.image('vagina', '../../Puberty/Female-Internal/images/vagina.png');
    this.load.image('cervix', '../../Puberty/Female-Internal/images/cervix.png');

    this.load.image('button', '../../evolutus-core/images/buttons/red_button01.png');
    this.load.image('buttonPressed', '../../evolutus-core/images/buttons/red_button02.png');
    
    resources.definitions = new FRSStrings(false);

    //test 3
  }

  create () {
    resources.femaleInternal = this.add.image(454.25, 340.55, 'femaleInternal');
    resources.ft = this.add.image(454.6, 200.85, 'fTubes');
    resources.ovaries = this.add.image(454, 266.65, 'ovaries');
    resources.uterus = this.add.image(454.75, 298.6, 'uterus')
      .on('pointerover', function() {
        resources.cervix.setBlendMode(Phaser.BlendModes.SCREEN);
      })
      .on('pointerout', function() {
        resources.cervix.setBlendMode(Phaser.BlendModes.NORMAL);
    });

    resources.vagina = this.add.image(454.25, 497.7, 'vagina');
    resources.cervix = this.add.image(455.35, 443.2, 'cervix');

    resources.organs = [resources.ft, resources.ovaries, resources.uterus, resources.vagina, resources.cervix];

    resources.frsTitle = this.add.image(195.8, 43.3, 'frsTitle');
    resources.frsLabels = this.add.image(384.35, 424.55, 'frsLabels');
    resources.frsLabelLines = this.add.image(377.6, 349.2, 'frsLabelLines');

    resources.toggleObjects = {labels: resources.frsLabels, lines: resources.frsLabelLines};

    resources.labelButton = new ToggleButton(this, 55, 280, 'Assistant', '14px', '#f9f9f9', 'button', 'buttonPressed', 'Labels', toggle, resources.toggleObjects);

    resources.definitionDisplay = this.add.text(820, 135, '',
      {
        fontFamily: 'Assistant',
        fontSize: '30px',
        fill: '#000',
        wordWrap: { width: 400, useAdvancedWrap: true }
      }
    );
    
    resources.explanationButton = new ToggleButton(this, 435, 280, 'Assistant', '14px', '#f9f9f9', 'button', 'buttonPressed', 'Explanations', explanations);
    resources.explanationButton.visible = false;
    new DiagramInteractions(resources.organs, resources.definitionDisplay, resources.definitions, resources, 'organ', resources.explanationButton);
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

