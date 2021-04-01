import SceneButton from '../../../common/js/sceneButton.js';
import PregnancyStrings from './pregnancyStrings.js';
import DiagramInteractions from '../../../common/js/diagramInteractions.js';
    
export default class Pregnancy extends Phaser.Scene {
  constructor() {
    super({key: 'pregnancy'})
  }

  preload () {
    this.load.image('drawn1', '../../Puberty/Pregnancy/images/pregnancy-1.png');
    this.load.image('drawn2', '../../Puberty/Pregnancy/images/pregnancy-2.png');
    this.load.image('drawn3', '../../Puberty/Pregnancy/images/pregnancy-3.png');
    this.load.image('drawn4', '../../Puberty/Pregnancy/images/pregnancy-4.png');
    this.load.image('drawn5', '../../Puberty/Pregnancy/images/pregnancy-5.png');
    this.load.image('drawn6', '../../Puberty/Pregnancy/images/pregnancy-6.png');
    this.load.image('drawn7', '../../Puberty/Pregnancy/images/pregnancy-7.png');
    this.load.image('drawn8', '../../Puberty/Pregnancy/images/pregnancy-8.png');
    this.load.image('drawn9', '../../Puberty/Pregnancy/images/pregnancy-9.png');

    this.load.image('picture1', '../../Puberty/Pregnancy/images/month 1.jpg');
    this.load.image('picture2', '../../Puberty/Pregnancy/images/month 2.jpg');
    this.load.spritesheet('picture3', '../../Puberty/Pregnancy/images/heart-spritesheet.png', { frameWidth: 436, frameHeight: 503, margin: 0, spacing: 0 });
    this.load.spritesheet('picture4', '../../Puberty/Pregnancy/images/yawn-spritesheet.png', { frameWidth: 316, frameHeight: 338, margin: 0, spacing: 0 });


    this.load.image('button', '../../common/images/buttons/red_button01.png');
    this.load.image('buttonPressed', '../../common/images/buttons/red_button02.png');
    
    resources.definitions = new PregnancyStrings(false);
  }

  create () {
    resources.stages = this.add.group();
    resources.scene = this;

    this.anims.create({
      key: 'heart',
      frames: this.anims.generateFrameNumbers('picture3', { frames: [0, 1, 2, 3, 4, 5] }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'yawn',
      frames: this.anims.generateFrameNumbers('picture4', {}),
      frameRate: 10,
      repeat: -1
    });

    resources.pregnancyDrawing = this.add.sprite(855, 400, 'drawn1');

    resources.pregnancyDrawingNames = {
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

    resources.pregnancyPicture = this.add.sprite(200, 250, 'picture1');

    resources.pregnancyPictureNames = {
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

    var month;
    var i = 1;
    var monthX = 20
    for (i = 1; i < 10; i++) {
      month = this.add.text(monthX, 550, i, 
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
        resources.pregnancyPicture = resources.scene.add.sprite(200, 250, resources.pregnancyPictureNames[this._text]).setScale(0.5);
        if (this._text === '3') {
          resources.pregnancyPicture.play('heart');
        } else if (this._text === '4') {
          resources.pregnancyPicture.play('yawn');
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