import SceneButton from '../../../common/js/sceneButton.js';
import ToggleButton from '../../../common/js/toggleButton.js';
    
export default class Period extends Phaser.Scene {
  constructor() {
    super({key: 'period'})
  }

  preload () {
  //  this.load.spritesheet('periodSpritesheet', '../../Puberty/Menstruation/images/period_spritesheet.png', { frameWidth: 489.4, frameHeight: 489.4, margin: 10, spacing: 20 });
    //this.load.image('hormonesGraph', '../../Puberty/Menstruation/images/hormones.png');
    this.load.spritesheet('topSpritesheet', '../../Puberty/Menstruation/images/top sprite.png', { frameWidth: 1200, frameHeight: 277, margin: 0, spacing: 0 });
    this.load.spritesheet('leftSpritesheet', '../../Puberty/Menstruation/images/left sprite.png', { frameWidth: 480, frameHeight: 858, margin: 0, spacing: 0 });

    //  this.load.spritesheet('leftSpritesheet', '../../Puberty/Menstruation/images/left sprite.png', { frameWidth: 395, frameHeight: 664, margin: 0, spacing: 0 });
   // this.load.spritesheet('rightSpritesheet', '../../Puberty/Menstruation/images/right2 sprite.png', { frameWidth: 500, frameHeight: 858, margin: 0, spacing: 0 });
    this.load.image('FRS', '../../Puberty/Female-Internal/images/FRS diagram.png');
    this.load.image('uterusMask', '../../Puberty/Menstruation/images/uterus.png');

    this.load.image('button', '../../common/images/buttons/red_button01.png');
    this.load.image('buttonPressed', '../../common/images/buttons/red_button02.png');    
  }

  create () {
   // resources.stage = this.add.sprite(321.3, 277.3, 'periodSpritesheet', 0);
    //resources.hormonesGraph = this.add.image(990, 200, 'hormonesGraph').setScale(0.55);
    resources.femaleInternal = this.add.image(404.25, 290.55, 'FRS');
    
    resources.left = this.add.sprite(366.3, 235, 'leftSpritesheet', 0).setScale(0.125);
    resources.right = this.add.sprite(442.2, 235, 'leftSpritesheet', 0);
    resources.right.flipX = true;
    resources.right.setScale(0.125);
    resources.top = this.add.sprite(406, 184, 'topSpritesheet', 0).setScale(0.125);

    resources.uterus = this.add.image(404.65, 248.6, 'uterusMask');

//    resources.menstruationButton = new ToggleButton(this, 435, 200, 'Assistant', '14px', '#f9f9f9', 'button', 'buttonPressed', 'Menstruation', changeFRS.bind(this), 0);
 //   resources.follicularButton = new ToggleButton(this, 435, 220, 'Assistant', '14px', '#f9f9f9', 'button', 'buttonPressed', 'Follicular', changeFRS.bind(this), 1);
 //   resources.ovulationButton = new ToggleButton(this, 435, 240, 'Assistant', '14px', '#f9f9f9', 'button', 'buttonPressed', 'Ovulation', changeFRS.bind(this), 2);
 //   resources.lutealButton = new ToggleButton(this, 435, 260, 'Assistant', '14px', '#f9f9f9', 'button', 'buttonPressed', 'Luteal', changeFRS.bind(this), 3);
    var circle = new Phaser.Geom.Circle(970, 300, 170);
    resources.circleGroup = this.add.group(); 

    var fillColor = '0xff0000';
    for (var i = 1; i < 29; i++) {
      var dayCircle = this.add.circle(0, 0, 14, fillColor);
      var day = this.add.text(0, 0, i, {fontFamily: 'Arial'}).setOrigin(0.5);

      var container = this.add.container(0, 0, [dayCircle, day]);

      container.setSize(dayCircle.width, dayCircle.height);
      container.setInteractive({useHandCursor:true});
      container.on('pointerup', function() {
        changeDay(Number(this.list[1].text));
      });
      resources.circleGroup.add(container);

      if (i === 4) {
        fillColor = '0x33cc33';
      } else if (i === 13) {
        fillColor = '0x0099ff';
      } else if (i === 15) {
        fillColor = '0x33cc33';
      } else if (i === 27) {
        fillColor = '0xff0000';
      }
    }

    resources.stage = this.add.text(circle.x, circle.y, 'Period', 
      {
        fontFamily: 'Assistant',
        fontSize: '50px',
        fill: '#000',
        wordWrap: { width: 190, useAdvancedWrap: false }
      }
    ).setOrigin(0.5);

    Phaser.Actions.PlaceOnCircle(resources.circleGroup.getChildren(), circle, Phaser.Math.DegToRad(-90), Phaser.Math.DegToRad(270));

    resources.homeButton = new SceneButton(this, 600, 280, 'Assistant', '14px', '#f9f9f9', 'button', 'buttonPressed', 'Home', 'title');
    resources.scene = this;
  }
}

var resources = {
  currentDay: 1,
  previousDay: 1
};

function changeDay(day) {
  resources.previousDay = resources.currentDay;
  resources.currentDay = day;

  generateAnimation(resources.previousDay, resources.currentDay);

  if ((day >= 1 && day <= 5) || day > 27) {
    resources.stage.setText('Period');
  } else if (day >= 14 && day <=15) {
    resources.stage.setText('Ovulation');
  } else {
    resources.stage.setText('Lining builds');
  }
}

function generateAnimation(previousDay, currentDay) {
  var frames = [];

  if (currentDay < previousDay) {
    for (var i = (previousDay - 1); i < 28; i ++) {
      frames.push(i);
    }

    for (var j = 0; j < currentDay; j++) {
      frames.push(j);
    }
  } else {
    for (var i = (previousDay - 1); i < currentDay; i++) {
      frames.push(i);
    }
  }

  if (resources.scene.anims.exists('leftClick')) {
    resources.scene.anims.remove('leftClick');
    resources.scene.anims.remove('topClick');
  }

  resources.scene.anims.create({
    key: 'leftClick',
    frames: resources.scene.anims.generateFrameNumbers('leftSpritesheet', {frames: frames}),
    frameRate: 4
  });

  resources.scene.anims.create({
    key: 'topClick',
    frames: resources.scene.anims.generateFrameNumbers('topSpritesheet', {frames: frames}),
    frameRate: 4
  });

  resources.left.play('leftClick');
  resources.right.play('leftClick');
  resources.top.play('topClick');
}