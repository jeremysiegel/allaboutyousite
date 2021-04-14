import SceneButton from '../../../common/js/sceneButton.js';
import Textbox from '../../../common/js/textbox.js';
import MaleExternalStrings from './maleExternalStrings.js';
import InfoButton from '../../../common/js/infoButton.js';
    
export default class MaleExternal extends Phaser.Scene {
  constructor() {
    super({key: 'maleExternal'})
  }

  preload () {
    this.load.image('maleExternal', '../../Puberty/External/images/maleExternal.png');
    this.load.image('foreskin', '../../Puberty/External/images/foreskin.png');

    this.load.image('backButton', '../../common/images/buttons/back.png');
    this.load.image('infoButton', '../../common/images/buttons/info.png');
 
   resources.definitions = new MaleExternalStrings();
  }

  create () {
    new Textbox(this, 660, 60, 500, 200);

    resources.definitionDisplay = this.add.text(680, 80, resources.infoText,
      {
        fontFamily: 'Assistant',
        fontSize: '30px',
        fill: '#000',
        wordWrap: {width: 480}
      }
    );
    this.add.image(292.9, 293.15, 'maleExternal');
    this.add.image(678.7, 460.8, 'foreskin');

    for (let organ in resources.organs) {

      var rect = this.add.rectangle(0, 0, 120, 38, 0xf4bda8);
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
  infoText: "Male reproductive system.\n\nClick on each label to learn what it does.",
  organs: {
    urethra: {
      name: 'Urethra',
      labelX: 472.55,
      labelY: 57.4
    },
    glans: {
      name: 'Glans',
      labelX: 101.8,
      labelY: 86.05
    },
    shaft: {
      name: 'Shaft',
      labelX: 101.75,
      labelY: 154.85
    },
    scrotum: {
      name: 'Scrotum',
      labelX: 477.8,
      labelY: 281.45
    },
    anus: {
      name: 'Anus',
      labelX: 100.5,
      labelY: 447.5
    },
    foreskin: {
      name: 'Foreskin',
      labelX: 849.5,
      labelY: 437.8
    }
  }
};

function infoText (resources) {
  resources.definitionDisplay.setText(resources.infoText);
}


