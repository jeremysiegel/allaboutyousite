import SceneButton from '../../../common/js/sceneButton.js';
import Hormone from '../../../common/js/hormone.js';
import Receptor from '../../../common/js/receptor.js';
import InfoButton from '../../../common/js/infoButton.js';
import Textbox from '../../../common/js/textbox.js';

export default class Start extends Phaser.Scene {
  constructor() {
    super({key: 'start'})
  }

  preload () {
    this.load.image('estrogenReceptor', '../../common/images/objects/estrogenReceptor.png');
    this.load.image('estrogen', '../../common/images/objects/estrogen.png');
  
    this.load.image('testosteroneReceptor', '../../common/images/objects/testosteroneReceptor.png');
    this.load.image('testosterone', '../../common/images/objects/testosterone.png');
   
    this.load.image('boy', '../../Puberty/Hormones/images/boy.png');
    this.load.image('girl', '../../Puberty/Hormones/images/girl.png');
    this.load.image('brain', '../../Puberty/Hormones/images/brain.png');

    this.load.image('backButton', '../../common/images/buttons/back.png');
    this.load.image('infoButton', '../../common/images/buttons/info.png');

  }

  create () {
    resources.boy = this.add.image(1054.15, 299.95, 'boy');
    resources.girl = this.add.image(200.15, 299.95, 'girl');
    
    resources.boyBrain = this.add.image(1057.15, 60.6, 'brain').setInteractive({useHandCursor: true});
    resources.girlBrain = this.add.image(198.9, 60.6, 'brain').setInteractive({useHandCursor: true});

    resources.boyBrain.on('pointerup', () => {
      brainClick();
    });
    
    resources.girlBrain.on('pointerup', () => {
      brainClick();
    });

    new Textbox(this, this.cameras.main.width/2 - 255, this.cameras.main.height/2 - 245, 510, 490);

    resources.text = this.add.text(this.cameras.main.width/2 - 235, this.cameras.main.height/2 - 225, resources.startText,
      {
        fontFamily: 'Assistant',
        fontSize: '30px',
        fill: '#000',
        wordWrap: { width: 490, useAdvancedWrap: true }
      }
    );

    resources.backButton = new SceneButton(this, 1200, 567, 0.1, 'changesTitle', 'backButton');
    resources.infoButton = new InfoButton(this, 1200, 507, 0.1, infoText, resources, 'infoButton');
    
    resources.scene = this;
   
  }
}

var resources = {
  startText: "How does the body know when to start puberty? Puberty starts when the brain sends a message to the body. The brain sends the message by making a tiny particle called a hormone. Click the brain to make a hormone messenger!",
  hormoneText: "Now click on the hormones to send the message to the body.",
  genitalsText: "The hormones travel from the brain to the genitals: ovaries in girls and testicles in boys. The genitals then send a message to the rest of the body to start the changes of puberty. How do the genitals send the message? By making hormones of their own! Click anywhere on the body to send out the hormone messengers."
};

function infoText(resources) {
 
}

function brainClick() {
  resources.hormone = new Hormone(resources.scene, 1057.15, 60.6, 'testosterone', 0.3).setInteractive({useHandCursor: true});;
  resources.hormone2 = new Hormone(resources.scene, 198.9, 60.6, 'testosterone', 0.3).setInteractive({useHandCursor: true});;  
  resources.boyBrain.removeInteractive();
  resources.girlBrain.removeInteractive();

  resources.text.setText(resources.hormoneText);

  resources.hormone.on('pointerup', () => {
    hormoneClick();
  });

  resources.hormone2.on('pointerup', () => {
    hormoneClick();
  });
}

function hormoneClick() {
  
  var timeline = resources.scene.tweens.createTimeline({
    targets: [resources.hormone, resources.hormone2],
  });

  timeline.add({
    targets: [resources.hormone, resources.hormone2],
    y: resources.hormone.y + 280,
    ease: 'Quad.easeInOut',
    duration: 3000
  });

  timeline.add({
    targets: [resources.hormone, resources.hormone2],
    alpha: 0,
    duration: 1000,
    onComplete: () => {
      resources.text.setText(resources.genitalsText);

      resources.hormone.removeInteractive();
      resources.hormone2.removeInteractive();
    
      resources.boy.setInteractive({useHandCursor: true, pixelPerfect: true});
      resources.girl.setInteractive({useHandCursor: true, pixelPerfect: true});
    
      resources.boy.on('pointerup', function() {
        personClick(this);
      });
    
      resources.girl.on('pointerup', function() {
        personClick(this);
      }); 
    }
  })
  timeline.play();
}

function personClick(object) {
  console.log(object);
}