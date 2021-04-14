import SceneButton from '../../../common/js/sceneButton.js';
import Textbox from '../../../common/js/textbox.js';
import FRSStrings from './FRS_strings.js';
import DiagramInteractions from '../../../common/js/diagramInteractions.js';
import InfoButton from '../../../common/js/infoButton.js';
import QuestionButton from '../../../common/js/questionButton.js';
    
export default class FRS extends Phaser.Scene {
  constructor() {
    super({key: 'FRS'})
  }

  preload () {
    this.load.image('femaleBackground', '../../Puberty/Female-Internal/images/background.png');
    this.load.image('femaleInternal', '../../Puberty/Female-Internal/images/FRS diagram.png');
    this.load.image('frsLabels', '../../Puberty/Female-Internal/images/FRS labels.png');
    this.load.image('frsLabelLines', '../../Puberty/Female-Internal/images/FRS label lines.png');
    this.load.image('ovaries', '../../Puberty/Female-Internal/images/ovaries.png');
    this.load.image('fTubes', '../../Puberty/Female-Internal/images/FT.png');
    this.load.image('uterus', '../../Puberty/Female-Internal/images/uterus.png');
    this.load.image('vagina', '../../Puberty/Female-Internal/images/vagina.png');
    this.load.image('cervix', '../../Puberty/Female-Internal/images/cervix.png');

    this.load.image('backButton', '../../common/images/buttons/back.png');
    this.load.image('infoButton', '../../common/images/buttons/info.png');
    this.load.image('questionButton', '../../common/images/buttons/question.png');
    
    resources.definitions = new FRSStrings(true);
  }

  create () {
    resources.background = this.add.image(454.25, 310.35, 'femaleBackground').setAlpha(0.5);
    resources.femaleInternal = this.add.image(454.25, 290.55, 'femaleInternal');
    
    new Textbox(this, 810, 75, 430, 350);

    resources.definitionDisplay = this.add.text(830, 95, resources.infoText,
      {
        fontFamily: 'Assistant',
        fontSize: '30px',
        fill: '#000',
        wordWrap: { width: 400 }
      }
    );
    
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
    
    new DiagramInteractions(resources.organs, resources.definitionDisplay, resources.definitions, resources, 'organ', true, resources.explanationButton);
  
    resources.backButton = new SceneButton(this, 1200, 567, 0.1, 'reproductiveTitle', 'backButton');
    resources.infoButton = new InfoButton(this, 1200, 507, 0.1, infoText, resources, 'infoButton');
    resources.questionButton = new QuestionButton(this, 1140, 507, 0.1, 'test', 'questionButton');

  }
}
 
var resources = {
  explanations: false,
  organ: '',
  infoText: "Female Reproductive System.\n\nClick on each part to learn what it does."
};

function infoText (resources) {
  resources.definitionDisplay.setText(resources.infoText);
}



