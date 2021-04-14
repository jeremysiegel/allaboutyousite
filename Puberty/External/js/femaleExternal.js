import SceneButton from '../../../common/js/sceneButton.js';
import Textbox from '../../../common/js/textbox.js';
import FemaleExternalStrings from './femaleExternalStrings.js';
import InfoButton from '../../../common/js/infoButton.js';
    
export default class FemaleExternal extends Phaser.Scene {
  constructor() {
    super({key: 'femaleExternal'})
  }

  preload () {
    this.load.image('femaleExternal', '../../Puberty/External/images/femaleExternal.png');

    this.load.image('backButton', '../../common/images/buttons/back.png');
    this.load.image('infoButton', '../../common/images/buttons/info.png');
 
   resources.definitions = new FemaleExternalStrings();
  }

  create () {
    new Textbox(this, 840, 60, 400, 270);

    resources.definitionDisplay = this.add.text(860, 80, resources.infoText,
      {
        fontFamily: 'Assistant',
        fontSize: '30px',
        fill: '#000',
        wordWrap: {width: 380}
      }
    );
    this.add.image(383.4, 300.05, 'femaleExternal');

    for (let organ in resources.organs) {

      var rect = this.add.rectangle(0, 0, 140, 38, 0xf4bda8);
      rect.setStrokeStyle(2, 0xf58b62)
      
      var text = this.add.text(0, 0, resources.organs[organ].name, {
        fontFamily: 'Open Sans', 
        fontStyle: '', 
        fontSize: '24px', 
        color: '#050709'
      }).setOrigin(0.5);
  
      var container = this.add.container(resources.organs[organ].labelX, resources.organs[organ].labelY, [rect, text]);
  
      container.setSize(rect.width, rect.height)
        .setInteractive({useHandCursor:true})
        .on('pointerover', function() {
          this.list[0].setFillStyle(0xf4d9cf);
        })
        .on('pointerout', function() {
          this.list[0].setFillStyle(0xf4bda8);
        })
        .on('pointerup', () => {
          resources.definitionDisplay.setText(resources.definitions[organ]);
      });
      
      this.add.existing(container);
    }
    
    resources.backButton = new SceneButton(this, 1200, 567, 0.1, 'reproductiveTitle', 'backButton');
    resources.infoButton = new InfoButton(this, 1200, 507, 0.1, infoText, resources, 'infoButton');
  }
}

var resources = {
  infoText: "Female reproductive system.\n\nClick on each label to learn what it does.",
  organs: {
    clitoris: {
      name: 'Clitoris',
      labelX: 92.55,
      labelY: 150.55
    },
    urethra: {
      name: 'Urethra',
      labelX: 111.05,
      labelY: 238.6
    },
    anus: {
      name: 'Anus',
      labelX: 124.9,
      labelY: 396
    },
    outerLabia: {
      name: 'Outer Labia',
      labelX: 708.95,
      labelY: 124.4
    },
    innerLabia: {
      name: 'Inner Labia',
      labelX: 703.8,
      labelY: 225.7
    },
    vagina: {
      name: 'Vagina',
      labelX: 656.1,
      labelY: 317.45
    },
    hymen: {
      name: 'Hymen',
      labelX: 111.05,
      labelY: 318.5
    }
  }
};

function infoText (resources) {
  resources.definitionDisplay.setText(resources.infoText);
}


