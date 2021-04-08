import SceneButton from '../../../common/js/sceneButton.js';
import Textbox from '../../../common/js/textbox.js';
import MRSStrings from './MRS_strings.js';
import DiagramInteractions from '../../../common/js/diagramInteractions.js';
import InfoButton from '../../../common/js/infoButton.js';
    
export default class MRS extends Phaser.Scene {
  constructor() {
    super({key: 'MRS'})
  }

  preload () {

    this.load.image('bladder', '../../Puberty/Male-internal/images/bladder.png');
    this.load.image('labels', '../../Puberty/Male-internal/images/labels.png');
    this.load.image('labelLines', '../../Puberty/Male-internal/images/label lines.png');
    this.load.image('epididymis', '../../Puberty/Male-internal/images/epididymis.png');
    this.load.image('MRS', '../../Puberty/Male-internal/images/MRS.png');
    this.load.image('prostate', '../../Puberty/Male-internal/images/prostate.png');
    this.load.image('svesicle', '../../Puberty/Male-internal/images/svesicle.png');
    this.load.image('teste', '../../Puberty/Male-internal/images/teste.png');
    this.load.image('urethra', '../../Puberty/Male-internal/images/urethra.png');
    this.load.image('vasdeferens', '../../Puberty/Male-internal/images/vasdeferens.png');

    this.load.image('backButton', '../../common/images/buttons/back.png');
    this.load.image('infoButton', '../../common/images/buttons/info.png');

 //   this.load.image('explanationButton', '../../common/images/buttons/more.png');

    
    resources.definitions = new MRSStrings(true);
  }

  create () {
    new Textbox(this, 810, 75, 430, 400);

    resources.maleInternal = this.add.image(450.1, 289.45, 'MRS');
    resources.bladder = this.add.image(450.4, 205.45, 'bladder');
    resources.prostate = this.add.image(454.1, 279.8, 'prostate');
    resources.urethra = this.add.image(371, 361.05, 'urethra');
    resources.vasdeferens = this.add.image(419.7, 276.05, 'vasdeferens');
    resources.teste = this.add.image(348.9, 411.4, 'teste');
    resources.epididymis = this.add.image(353.55, 398.7, 'epididymis');
    resources.svesicle = this.add.image(510.4, 235.25, 'svesicle');

    resources.organs = [resources.maleInternal, resources.bladder, resources.prostate, resources.vasdeferens, resources.teste, resources.epididymis, resources.svesicle, resources.urethra];

    resources.labels = this.add.image(416.05, 321.45, 'labels');
    resources.labelLines = this.add.image(435.05, 318.2, 'labelLines');

  //  resources.toggleObjects = {labels: resources.labels, lines: resources.labelLines};

 //   resources.labelButton = new ToggleButton(this, 55, 280, 'Assistant', '14px', '#f9f9f9', 'button', 'buttonPressed', 'Labels', toggle, resources.toggleObjects);

    resources.definitionDisplay = this.add.text(830, 95, resources.infoText,
      {
        fontFamily: 'Assistant',
        fontSize: '30px',
        fill: '#000',
        wordWrap: { width: 400, useAdvancedWrap: true }
      }
    );
    
  //  resources.explanationButton = new ToggleButton(this, 435, 280, 'Assistant', '14px', '#f9f9f9', 'explanationButton', 'explanationButton', '', explanations);
   // resources.explanationButton.visible = false;
    
    new DiagramInteractions(resources.organs, resources.definitionDisplay, resources.definitions, resources, 'organ', true, resources.explanationButton);
    
    resources.backButton = new SceneButton(this, 1200, 567, 0.1, 'reproductiveTitle', 'backButton');
    resources.infoButton = new InfoButton(this, 1200, 507, 0.1, infoText, resources, 'infoButton');
  }
}

function toggle(toggleObjects){
  for (const object in toggleObjects) {
    toggleObjects[object].visible = !toggleObjects[object].visible;
  }
}

function explanations() {
  resources.explanations = !resources.explanations;

  resources.definitions = new MRSStrings(resources.explanations);
  new DiagramInteractions(resources.organs, resources.definitionDisplay, resources.definitions, resources, 'organ', resources.explanationButton);
  
  resources.definitionDisplay.text = resources.definitions[resources.organ];
}

var resources = {
  explanations: false,
  organ: '',
  infoText: "Male Reproductive System. Click on each part to learn what it does."
};

function infoText (resources) {
  resources.definitionDisplay.setText(resources.infoText);
}


