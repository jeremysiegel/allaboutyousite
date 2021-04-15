import SceneButton from '../../../common/js/sceneButton.js';
import InfoButton from '../../../common/js/infoButton.js';
import Popup from '../../../common/js/popup.js';
import QuestionButton from '../../../common/js/questionButton.js';
//import EmotionsStrings from '../js/emotionsStrings.js';
import EmotionsStrings from '../../External/js/femaleExternalStrings.js';

import Textbox from '../../../common/js/textbox.js';
import ResetButton from '../../../common/js/resetButton.js';


export default class Emotions extends Phaser.Scene {
  constructor() {
    super({key: 'emotions'})
  }

  preload() {
    this.load.image('brainEmotions', '../../Puberty/Emotions/images/brainDown.png');
    this.load.image('brainDown', '../../Puberty/Emotions/images/brainDown2.png');
    
    this.load.image('backButton', '../../common/images/buttons/back.png');
    this.load.image('infoButton', '../../common/images/buttons/info.png');
    this.load.image('questionButton', '../../common/images/buttons/question.png');
    this.load.image('resetButton', '../../common/images/buttons/reset.png');


    resources.emotions = new EmotionsStrings('definitions');
    resources.questions = new EmotionsStrings('questions');
  }

  create() {
    resources.scene = this;

    resources.positiveBox = new Textbox(this, 23, 85, 340, 400, '0x7ac7a5', '0x23ba77');
    resources.unsureBox = new Textbox(this, 390, 350, 510, 250, '0x83c5e7', '0x4baadb');
    resources.nervousBox = new Textbox(this, 927, 85, 340, 400, '0xfc9b5a', '0xff8533');

    this.add.text(43, 100, "I'm excited about...", {
      fontFamily: 'Calibri',
      fontStyle: 'bold',
      fontSize: '38px',
      fill: '#fff'
    });

    this.add.text(410, 360, "I'm unsure about...", {
      fontFamily: 'Calibri',
      fontStyle: 'bold',
      fontSize: '38px',
      fill: '#fff'
    });

    this.add.text(942, 100, "I'm nervous about...", {
      fontFamily: 'Calibri',
      fontStyle: 'bold',
      fontSize: '38px',
      fill: '#fff'
    });

    

    var emotionNumber = 1;


    resources.brainBackground = this.add.image(this.cameras.main.width/2, 170, 'brainEmotions').setOrigin(0.5);

    resources.brain = this.add.image(this.cameras.main.width/2, 170, 'brainEmotions').setOrigin(0.5);
    resources.brain.setInteractive({useHandCursor: true, pixelPerfect: true})
      .on('pointerdown', function() {
        this.setBlendMode(Phaser.BlendModes.SCREEN);
        this.setTexture('brainDown');
      })
      .on('pointerup', function() {
        this.setBlendMode(Phaser.BlendModes.NORMAL);
        this.setTexture('brainEmotions');
        
        var emotionX = 385;
        var emotionY = 250;
        
        if (emotionNumber % 4 === 4) {
          emotionX = 395;
          emotionY = 240;
        } else if (emotionNumber % 4 === 3) {
          emotionX = 372;
          emotionY = 20;
        } else if (emotionNumber % 4 === 2) {
          emotionX = 770;
          emotionY = 250;
        } else if (emotionNumber % 4 === 1) {
          emotionX = 770;
          emotionY = 20;
        }

        resources.scene.add.text(emotionX, emotionY, resources.emotions[emotionNumber], {
          fontFamily: 'Assistant',
          fontSize: '30px',
          fill: '#000',
          align: 'center',
          wordWrap: {width:150}
        }).setInteractive({useHandCursor:true, draggable:true});

        emotionNumber++;
      })

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    resources.infoButton = new InfoButton(this, 1200, 520, 0.1, infoText, resources, 'infoButton');
    resources.backButton = new SceneButton(this, 1200, 575, 0.1, 'changesTitle', 'backButton');
    resources.questionButton = new QuestionButton(this, 1140, 520, 0.1, resources.questions, 'questionButton');
    resources.resetButton = new ResetButton(this, 1140, 575, 0.1, 'resetButton');

  }
}

var resources = {
  infoText: 'New thoughts and feelings are an exciting part of puberty. But they can also feel a bit scary.\n\nClick on the brain to generate an emotion, and drag it into the box you think it belongs in. There are no right or wrong answers!'
};

function infoText(resources) {
  const screenCenterX = resources.scene.cameras.main.worldView.x + resources.scene.cameras.main.width / 2;
  const screenCenterY = resources.scene.cameras.main.worldView.y + resources.scene.cameras.main.height / 2;
  var width = 610;
  var height = 310;

  if (!resources.popup || !resources.popup.isVisible()) {
    resources.popup = new Popup(resources.scene, screenCenterX - width/2, screenCenterY - height/2, width, height, resources.infoText);
  }
}

/*
crushes
new ways of thinking
new hobbies
changing friendships
discovering who you are
New likes and dislikes
express yourself
Crying
More self confident
More unsure of yourself
Sexuality
Make your own choices
Peer pressure
*/