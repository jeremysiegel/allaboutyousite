import SceneButton from '../../../common/js/sceneButton.js';
import PregnancyStrings from './pregnancyStrings.js';
import DiagramInteractions from '../../../common/js/diagramInteractions.js';
    
export default class Pregnancy extends Phaser.Scene {
  constructor() {
    super({key: 'pregnancy'})
  }

  preload () {
    this.load.image('drawn0', '../../Puberty/Pregnancy/images/drawn0.png');
    this.load.image('drawn1', '../../Puberty/Pregnancy/images/pregnancy-1.png');
    this.load.image('drawn2', '../../Puberty/Pregnancy/images/pregnancy-2.png');
    this.load.image('drawn3', '../../Puberty/Pregnancy/images/pregnancy-3.png');
    this.load.image('drawn4', '../../Puberty/Pregnancy/images/pregnancy-4.png');
    this.load.image('drawn5', '../../Puberty/Pregnancy/images/pregnancy-5.png');
    this.load.image('drawn6', '../../Puberty/Pregnancy/images/pregnancy-6.png');
    this.load.image('drawn7', '../../Puberty/Pregnancy/images/pregnancy-7.png');
    this.load.image('drawn8', '../../Puberty/Pregnancy/images/pregnancy-8.png');
    this.load.image('drawn9', '../../Puberty/Pregnancy/images/pregnancy-9.png');

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

    this.load.image('button', '../../common/images/buttons/red_button01.png');
    this.load.image('buttonPressed', '../../common/images/buttons/red_button02.png');
    
    resources.definitions = new PregnancyStrings(false);
  }

  create () {
    resources.stages = this.add.group();
    resources.scene = this;

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


    resources.pregnancyDrawing = this.add.sprite(855, 400, 'drawn0');

    resources.pregnancyDrawingNames = {
      0: 'drawn0',
      1: 'drawn1',
      2: 'drawn2',
      3: 'drawn3',
      4: 'drawn4',
      5: 'drawn5',
      6: 'drawn6',
      7: 'drawn7',
      8: 'drawn8',
      9: 'drawn9'
    }

    resources.pregnancyPicture = this.add.sprite(350, 250, 'picture0');
    resources.pregnancyPicture.setScale(400/resources.pregnancyPicture.height)

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

    resources.definitionDisplay = this.add.text(820, 85, '',
      {
        fontFamily: 'Assistant',
        fontSize: '30px',
        fill: '#000',
        wordWrap: { width: 400, useAdvancedWrap: true }
      }
    );
    resources.definitionDisplay.setText(resources.definitions['0']);

    var month;
    var monthX = 110;
    for (var i = 0; i < 10; i++) {
      month = this.add.text(monthX, 520, i, 
        {
          fontFamily: 'Assistant',
          fontSize: '50px',
          fill: '#000'
        }
      );
      monthX += 50;
     
      month.setInteractive({useHandCursor: true});

      month.on('pointerup', function() {
        resources.definitionDisplay.setText(resources.definitions[this._text]);
        resources.pregnancyDrawing.destroy();
        resources.pregnancyDrawing = resources.scene.add.sprite(855, 400, resources.pregnancyDrawingNames[this._text]);

        resources.pregnancyPicture.destroy();
        resources.pregnancyPicture = resources.scene.add.sprite(350, 250, resources.pregnancyPictureNames[this._text]);
        var scale = 400/resources.pregnancyPicture.height;
        resources.pregnancyPicture.setScale(scale);

        if (this._text === '3') {
          resources.pregnancyPicture.play('fingers');
        } else if (this._text === '5') {
          resources.pregnancyPicture.play('yawn');
        } else if (this._text === '6') {
          resources.pregnancyPicture.play('heart');
        } else if (this._text === '7') {
          resources.pregnancyPicture.play('kick');
        } else if (this._text === '8') {
          resources.pregnancyPicture.play('breathe');
        }
      });
      resources.stages.add(month);

    }
  //  new DiagramInteractions(resources.stages.children.entries, resources.definitionDisplay, resources.definitions, resources, 'stage', false);

    resources.homeButton = new SceneButton(this, 600, 280, 'Assistant', '14px', '#f9f9f9', 'button', 'buttonPressed', 'Home', 'title');
  }
}

var resources = {
  explanations: false,
  stage: ''
};

/*Legacy code

 
    resources.ellipse = new Phaser.Geom.Ellipse(400, 300, 550, 460);
    resources.rectangle = new Phaser.Geom.Rectangle(100, 100, 650, 460);

    resources.stages = this.add.group();
    
    resources.stagesBackground = this.add.group();

    resources.stagesBackground.create(0, 0, '5');
    resources.stagesBackground.create(0, 0, '6');
    resources.stagesBackground.create(0, 0, '7');
    resources.stagesBackground.create(0, 0, '8');
    resources.stagesBackground.create(0, 0, '9');
    resources.stagesBackground.create(0, 0, '1');
    resources.stagesBackground.create(0, 0, '2');
    resources.stagesBackground.create(0, 0, '3');
    resources.stagesBackground.create(0, 0, '4');

    resources.pregnancy5 = resources.stages.create(0, 0, '5');
    resources.stages.create(0, 0, '6');
    resources.stages.create(0, 0, '7');
    resources.stages.create(0, 0, '8');
    resources.stages.create(0, 0, '9');
    resources.stages.create(0, 0, '1');
    resources.stages.create(0, 0, '2');
    resources.stages.create(0, 0, '3');
    resources.stages.create(0, 0, '4');

    resources.pregnancy5.on('pointerdown', () => {console.log('click')});

    Phaser.Actions.PlaceOnRectangle(resources.stagesBackground.getChildren(), resources.rectangle);
    Phaser.Actions.PlaceOnRectangle(resources.stages.getChildren(), resources.rectangle);
*/