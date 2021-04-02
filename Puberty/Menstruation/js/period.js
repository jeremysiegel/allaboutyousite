import SceneButton from '../../../common/js/sceneButton.js';
import ToggleButton from '../../../common/js/toggleButton.js';
    
export default class Period extends Phaser.Scene {
  constructor() {
    super({key: 'period'})
  }

  preload () {
  //  this.load.spritesheet('periodSpritesheet', '../../Puberty/Menstruation/images/period_spritesheet.png', { frameWidth: 489.4, frameHeight: 489.4, margin: 10, spacing: 20 });
    //this.load.image('hormonesGraph', '../../Puberty/Menstruation/images/hormones.png');
    this.load.spritesheet('topSpritesheet', '../../Puberty/Menstruation/images/top sprite3.png', { frameWidth: 1200, frameHeight: 277, margin: 0, spacing: 0 });
    this.load.spritesheet('leftSpritesheet', '../../Puberty/Menstruation/images/left2 sprite.png', { frameWidth: 480, frameHeight: 858, margin: 0, spacing: 0 });

    //  this.load.spritesheet('leftSpritesheet', '../../Puberty/Menstruation/images/left sprite.png', { frameWidth: 395, frameHeight: 664, margin: 0, spacing: 0 });
    this.load.spritesheet('rightSpritesheet', '../../Puberty/Menstruation/images/right sprite.png', { frameWidth: 370, frameHeight: 633, margin: 0, spacing: 0 });
    this.load.image('FRS', '../../Puberty/Female-Internal/images/FRS diagram.png');
    this.load.image('uterusMask', '../../Puberty/Menstruation/images/uterus.png');

    this.load.image('button', '../../common/images/buttons/red_button01.png');
    this.load.image('buttonPressed', '../../common/images/buttons/red_button02.png');    
  }

  create () {
   // resources.stage = this.add.sprite(321.3, 277.3, 'periodSpritesheet', 0);
    //resources.hormonesGraph = this.add.image(990, 200, 'hormonesGraph').setScale(0.55);
    resources.femaleInternal = this.add.image(454.25, 290.55, 'FRS');

    this.anims.create({
      key: 'top',
      frames: this.anims.generateFrameNumbers('topSpritesheet'),
      frameRate: 2,
      repeat: 1
    });

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('leftSpritesheet'),
      frameRate: 2,
      repeat: 1
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('rightSpritesheet'),
      frameRate: 2,
      repeat: 1
    });
    
    resources.left = this.add.sprite(414, 235, 'leftSpritesheet').play('left').setScale(0.125);
    resources.right = this.add.sprite(494.5, 234.5, 'rightSpritesheet').play('right').setScale(0.17);
    resources.top = this.add.sprite(456, 183, 'topSpritesheet').play('top').setScale(0.125);

    resources.uterus = this.add.image(454.65, 248.6, 'uterusMask');

//    resources.menstruationButton = new ToggleButton(this, 435, 200, 'Assistant', '14px', '#f9f9f9', 'button', 'buttonPressed', 'Menstruation', changeFRS.bind(this), 0);
 //   resources.follicularButton = new ToggleButton(this, 435, 220, 'Assistant', '14px', '#f9f9f9', 'button', 'buttonPressed', 'Follicular', changeFRS.bind(this), 1);
 //   resources.ovulationButton = new ToggleButton(this, 435, 240, 'Assistant', '14px', '#f9f9f9', 'button', 'buttonPressed', 'Ovulation', changeFRS.bind(this), 2);
 //   resources.lutealButton = new ToggleButton(this, 435, 260, 'Assistant', '14px', '#f9f9f9', 'button', 'buttonPressed', 'Luteal', changeFRS.bind(this), 3);

    resources.homeButton = new SceneButton(this, 600, 280, 'Assistant', '14px', '#f9f9f9', 'button', 'buttonPressed', 'Home', 'title');
  }
}

var resources = {};

function changeFRS(stage) {
  resources.stage.destroy();
  resources.stage = this.add.sprite(321.3, 277.3, 'periodSpritesheet', stage);
}