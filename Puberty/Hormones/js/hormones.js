import SceneButton from '../../../common/js/sceneButton.js';
import Hormone from '../../../common/js/hormone.js';
import InfoButton from '../../../common/js/infoButton.js';
import Textbox from '../../../common/js/textbox.js';
import ResetButton from '../../../common/js/resetButton.js';
import QuestionButton from '../../../common/js/questionButton.js';
import HormonesStrings from './hormonesStrings.js';

export default class Hormones extends Phaser.Scene {
  constructor() {
    super({key: 'hormones'})
  }

  preload () {
    this.load.image('testosterone', '../../common/images/objects/testosterone.png');
   
    this.load.image('boy', '../../Puberty/Hormones/images/boy.png');
    this.load.image('girl', '../../Puberty/Hormones/images/girl.png');
    this.load.image('brain', '../../Puberty/Hormones/images/brain.png');

    this.load.image('backButton', '../../common/images/buttons/back.png');
    this.load.image('infoButton', '../../common/images/buttons/info.png');
    this.load.image('resetButton', '../../common/images/buttons/reset.png');
    this.load.image('questionButton', '../../common/images/buttons/question.png');

    resources.questions = new HormonesStrings('questions');

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

    // Center textbox by subtractung half the width and height.
    new Textbox(this, this.cameras.main.width/2 - 255, this.cameras.main.height/2 - 245, 510, 490);

    resources.text = this.add.text(this.cameras.main.width/2 - 235, this.cameras.main.height/2 - 225, resources.startText,
      {
        fontFamily: 'Assistant',
        fontSize: '30px',
        fill: '#000',
        wordWrap: { width: 480, useAdvancedWrap: false }
      }
    );

    resources.backButton = new SceneButton(this, 1220, 567, 0.1, 'changesTitle', 'backButton');
    resources.scene = this;
  }
}

var resources = {
  startText: "How does the body know when to start puberty?\n\nIt all starts in the brain. The brain tells the body to start puberty by making a tiny messenger called a hormone.\n\nClick the brain to make a hormone messenger!",
  hormoneText: "Now click on the hormones to send the message to the body to start puberty.",
  genitalsText: "The hormones travel from the brain to the genitals: ovaries in females and testicles in males.\n\nThe genitals then send a message to the rest of the body to start the changes of puberty. How do the genitals send the message? By making hormones of their own!\n\nClick anywhere on the body to send out more hormone messengers.",
  endText: "You're all ready for puberty!\n\nYou'll learn a lot more as you explore the app. Navigate using the buttons below:",
  // Buttons and labels for navigating the app, to be displayed at the end of the scene in the textbox.
  endKey: {
    info: {
      text: 'Instructions',
      image: 'infoButton'
    },
    back: {
      text: 'Menu',
      image: 'backButton'
    },
    reset: {
      text: 'Reset',
      image: 'resetButton'
    },
    question: {
      text: 'Common questions',
      image: 'questionButton'
    }
  }
};

// Callback for when info button is clicked.
function infoText(resources) {
  resources.text.setText(resources.genitalsText);
  if (resources.keys) {
    var keys = resources.keys.getChildren();
    for (var i = keys.length - 1; i > -1; i--) {
      keys[i].destroy();
    }
  }
}

function brainClick() {
  resources.hormone = new Hormone(resources.scene, 1057.15, 60.6, 'testosterone', 0.3).setInteractive({useHandCursor: true}).setAlpha(0);
  resources.hormone2 = new Hormone(resources.scene, 198.9, 60.6, 'testosterone', 0.3).setInteractive({useHandCursor: true}).setAlpha(0);  
  
  resources.scene.add.tween({
    targets: [resources.hormone, resources.hormone2],
    alpha: 1,
    duration: 1000,
    onComplete: () => {
      resources.text.setText(resources.hormoneText);

      resources.hormoneKey = new Hormone(resources.scene, 500, 250, 'testosterone', 0.7).setOrigin(0);  
      resources.hormoneLabel = resources.scene.add.text(555, 258, '    Hormone',
        {
          fontFamily: 'Assistant',
          fontSize: '30px',
          fill: '#000',
        });

      resources.hormone.on('pointerup', () => {
        hormoneClick();
      });
    
      resources.hormone2.on('pointerup', () => {
        hormoneClick();
      });
    }
  })
  
  resources.boyBrain.removeInteractive();
  resources.girlBrain.removeInteractive();
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

      resources.hormone.destroy();
      resources.hormone2.destroy();
      resources.hormoneKey.destroy();
      resources.hormoneLabel.destroy();
    
      resources.boy.setInteractive({useHandCursor: true, pixelPerfect: true});
      resources.girl.setInteractive({useHandCursor: true, pixelPerfect: true});
    
      resources.boy.on('pointerup', function(pointer) {
        personClick(this, pointer);
      });
    
      resources.girl.on('pointerup', function(pointer) {
        personClick(this, pointer);
      }); 
    }
  })
  timeline.play();
}

function personClick(object, pointer) {
  // Set hormone x based on boy or girl being clicked. y is the same.
  var x;
  if (object.texture.key === 'boy') {
    x = 1057.15;
  } else {
    x = 198.9;
  }

  var timeline = resources.scene.tweens.createTimeline({
    targets: [resources.hormone, resources.hormone2],
  });

  resources.hormone = new Hormone(resources.scene, x, 340.6, 'testosterone', 0.3);

  var timeline = resources.scene.tweens.createTimeline({
    targets: [resources.hormone, resources.hormone2],
  });

  timeline.add({
    targets: [resources.hormone],
    x: pointer.x,
    y: pointer.y,
    ease: 'Power1',
    duration: 1500
  });

  timeline.add({
    targets: [resources.hormone],
    alpha: 0,
    duration: 1000,
    completeDelay: 1000,
    onComplete: function() {
      this.data[0].target.destroy();
      
      // Puts end text back up if the info button was clicked at the end of the scene.
      if (resources.text.text !== resources.endText) {
        resources.text.setText(resources.endText);

        resources.infoButton = new InfoButton(resources.scene, 1220, 507, 0.1, infoText, resources, 'infoButton');
        resources.resetButton = new ResetButton(resources.scene, 1160, 567, 0.1, 'resetButton');
        resources.questionButton = new QuestionButton(resources.scene, 1160, 507, 0.1, resources.questions, 'questionButton');

        var containerY = 292;
        resources.keys = resources.scene.add.group();

        for (let key in resources.endKey) {
          var image = resources.scene.add.image(0, 0, resources.endKey[key].image).setScale(0.1);
          var text = resources.scene.add.text(75, 0, resources.endKey[key].text, {
            fontFamily: 'Assistant',
            fontSize: '30px',
            fill: '#000'
          }).setOrigin(0, 0.5);
      
          var container = resources.scene.add.container(500, containerY, [image, text]);
          container.setSize(image.width, image.height);

          resources.keys.add(container);
          containerY += 64;
        }
      }
    }
  });

  timeline.play();
}