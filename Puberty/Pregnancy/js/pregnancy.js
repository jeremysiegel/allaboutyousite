import SceneButton from '../../../common/js/sceneButton.js';
import PregnancyStrings from './pregnancyStrings.js';
import Textbox from '../../../common/js/textbox.js';
import InfoButton from '../../../common/js/infoButton.js';

    
export default class Pregnancy extends Phaser.Scene {
  constructor() {
    super({key: 'pregnancy'})
  }

  preload () {
    this.load.image('picture0', '../../Puberty/Pregnancy/images/embryo.png');
    this.load.image('picture1', '../../Puberty/Pregnancy/images/month 1.jpg');
    this.load.image('picture2', '../../Puberty/Pregnancy/images/month 2.jpg');
    this.load.spritesheet('picture3', '../../Puberty/Pregnancy/images/fingers-spritesheet.png', { frameWidth: 600, frameHeight: 338, margin: 0, spacing: 0 });
    this.load.image('picture4', '../../Puberty/Pregnancy/images/twins.jpg');
    this.load.spritesheet('picture5', '../../Puberty/Pregnancy/images/yawn-spritesheet.png', { frameWidth: 316, frameHeight: 338, margin: 0, spacing: 0 });
    this.load.spritesheet('picture6', '../../Puberty/Pregnancy/images/heart-spritesheet.png', { frameWidth: 436, frameHeight: 503, margin: 0, spacing: 0 });
    this.load.spritesheet('picture7', '../../Puberty/Pregnancy/images/kick-spritesheet.png', { frameWidth: 600, frameHeight: 338, margin: 0, spacing: 0 });
    this.load.spritesheet('picture8', '../../Puberty/Pregnancy/images/breathe-spritesheet.png', { frameWidth: 600, frameHeight: 338, margin: 0, spacing: 0 });
    this.load.image('picture9', '../../Puberty/Pregnancy/images/term.png');

    this.load.image('buttonUp', '../../common/images/buttons/grey_button_up.png');
    this.load.image('buttonDown', '../../common/images/buttons/grey_button_down.png');

    this.load.image('monitor', '../../Puberty/Pregnancy/images/monitor2.png');
    this.load.image('ultrasound', '../../Puberty/Pregnancy/images/ultrasound2.png');

    this.load.image('backButton', '../../common/images/buttons/back.png');
    this.load.image('infoButton', '../../common/images/buttons/info.png');
    
    resources.definitions = new PregnancyStrings(false);
  }

  create () {
    resources.stages = this.add.group();
    resources.scene = this;

    resources.ultrasound = this.add.image(850, 480, 'ultrasound');
    resources.monitor = this.add.image(350, 300, 'monitor');

    this.anims.create({
      key: 'fingers',
      frames: this.anims.generateFrameNumbers('picture3'),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'yawn',
      frames: this.anims.generateFrameNumbers('picture5'),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'heart',
      frames: this.anims.generateFrameNumbers('picture6'),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'kick',
      frames: this.anims.generateFrameNumbers('picture7'),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'breathe',
      frames: this.anims.generateFrameNumbers('picture8'),
      frameRate: 10,
      repeat: -1
    });


    //resources.pregnancyPicture = this.add.sprite(350, 250, 'picture0');
   // resources.pregnancyPicture.setScale(400/resources.pregnancyPicture.height)

    resources.pregnancyPictureNames = {
      0: 'picture0',
      1: 'picture1',
      2: 'picture2',
      3: 'picture3',
      4: 'picture4',
      5: 'picture5',
      6: 'picture6',
      7: 'picture7',
      8: 'picture8',
      9: 'picture9'
    }
    
    new Textbox(this, 760, 65, 470, 360);

    resources.definitionDisplay = this.add.text(780, 85, '',
      {
        fontFamily: 'Assistant',
        fontSize: '30px',
        fill: '#000',
        wordWrap: { width: 440 }
      }
    );

    resources.definitionDisplay.setText(resources.infoText);

    var monthX = 90;
    for (var i = 0; i < 10; i++) {
      var monthText = this.add.text(0, 0, i, 
        {
          fontFamily: 'Assistant',
          fontSize: '47px',
          fill: '0x333333'
        }
      ).setOrigin(0.5);
      
      var monthBackgroundScale = 0.2
      var monthBackground = this.add.image(0, 0, 'buttonUp').setScale(monthBackgroundScale);

      var month = this.add.container(monthX, 515, [monthBackground, monthText]);
      monthX += 53;

      month.setSize(monthBackground.width * monthBackgroundScale, monthBackground.height * monthBackgroundScale);
      month.setInteractive({useHandCursor: true})
        .on('pointerdown', function () {
          this.list[0].setTexture('buttonDown');
        })
        .on('pointerup', function() {
          resources.definitionDisplay.setText(resources.definitions[this.list[1]._text]);

          for (var j = 0; j < resources.stages.getChildren().length; j++) {
            var monthButton = resources.stages.getChildren()[j].list[0];
            monthButton.setTexture('buttonUp');
          }
          this.list[0].setTexture('buttonDown');

          if (resources.pregnancyPicture) {
            resources.pregnancyPicture.destroy();
          }
         
          resources.pregnancyPicture = resources.scene.add.sprite(350, 250, resources.pregnancyPictureNames[this.list[1]._text]);
        
          var scale = 400/resources.pregnancyPicture.height;
          resources.pregnancyPicture.setScale(scale);

        if (this.list[1]._text === '3') {
          resources.pregnancyPicture.setCrop(50, 0, 500, 400)
            .play('fingers');
        } else if (this.list[1]._text === '5') {
          resources.pregnancyPicture.play('yawn');
        } else if (this.list[1]._text === '6') {
          resources.pregnancyPicture.play('heart');
        } else if (this.list[1]._text === '7') {
          resources.pregnancyPicture.setCrop(50, 0, 500, 400)
            .play('kick');
        } else if (this.list[1]._text === '8') {
          resources.pregnancyPicture.setCrop(50, 0, 500, 400)
            .play('breathe');
        }
      });
      
      resources.stages.add(month);
    }

    resources.infoButton = new InfoButton(this, 1200, 507, 0.1, infoText, resources, 'infoButton');
    resources.backButton = new SceneButton(this, 1200, 567, 0.1, 'periodTitle', 'backButton');
  }
}

var resources = {
  infoText: "You can watch the baby grow during pregnancy using a device called an ultrasound.\n\nClick on each month to learn what is happening to the baby."
};

function infoText (resources) {
  resources.definitionDisplay.setText(resources.infoText);
}
