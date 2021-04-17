import SceneButton from '../../../common/js/sceneButton.js';
import InfoButton from '../../../common/js/infoButton.js';
import Popup from '../../../common/js/popup.js';
import QuestionButton from '../../../common/js/questionButton.js';
import PeriodStrings from './periodStrings.js';
import BaseScene from '../../base.js';

export default class Period extends BaseScene {
  constructor() {
    super('period');
  }

  preload () {
    resources.questions = new PeriodStrings();

  }

  create () {
    super.create();
    resources.scene = this;
    resources.femaleInternal = this.add.image(404.25, 290.55, 'femaleInternal');

    // Endometrium spritesheets
    resources.left = this.add.sprite(366.3, 235, 'leftSpritesheet', 0).setScale(0.5);
    resources.right = this.add.sprite(442.2, 235, 'leftSpritesheet', 0);
    resources.right.flipX = true;
    resources.right.setScale(0.5);
    resources.top = this.add.sprite(406, 184, 'topSpritesheet', 0).setScale(0.5);

    // This covers the endometrium animations so they appear to emerge from the uterus.
    resources.uterus = this.add.image(404.65, 248.6, 'uterusMask');
    
    // This sets up the interactive cycle calendar
    var circle = new Phaser.Geom.Circle(970, 300, 170);

    resources.backgroundCircle = this.add.circle(970, 300, 200, 0xcfcffa).setStrokeStyle(5, 0x8e4ab3, 0.7);
    
    resources.stage = this.add.text(circle.x, circle.y - 20, 'Period', 
    {
      fontFamily: 'Assistant',
      fontSize: '50px',
      fill: '#000',
      wordWrap: { width: 190, useAdvancedWrap: false }
    }).setOrigin(0.5);
    
    resources.dayLabel = this.add.text(resources.backgroundCircle.x, 360, 'Day 1', 
    {
      fontFamily: 'Assistant',
      fontSize: '25px',
      fill: '#000'
    }).setOrigin(0.5, 0);

    resources.circleGroup = this.add.group(); 

    var fillColor = '0xff0000';
    
    for (var i = 1; i < 29; i++) {
      var dayCircle = this.add.circle(0, 0, 14, fillColor);

      var day = this.add.text(0, 0, i, {fontFamily: 'Arial'}).setOrigin(0.5);

      var container = this.add.container(0, 0, [dayCircle, day]);
      container
        .setSize(dayCircle.width, dayCircle.height)
        .setInteractive({useHandCursor:true})
        .on('pointerup', function() {
          changeDay(Number(this.list[1].text));
        });

      resources.circleGroup.add(container);

      if (i === 5) {
        fillColor = '0x33cc33';
      } else if (i === 14) {
        fillColor = '0x0099ff';
      } else if (i === 15) {
        fillColor = '0x33cc33';
      } 
    }

    Phaser.Actions.PlaceOnCircle(resources.circleGroup.getChildren(), circle, Phaser.Math.DegToRad(-90), Phaser.Math.DegToRad(270));

    resources.infoButton = new InfoButton(this, 1200, 507, 0.1, infoText, resources, 'infoButton');
    resources.backButton = new SceneButton(this, 1200, 567, 0.1, 'periodTitle', 'backButton');
    resources.questionButton = new QuestionButton(this, 1140, 507, 0.1, resources.questions, 'questionButton');

    newEgg();
    changeDay(1);
  }
}

var resources = {
  currentDay: 1,
  previousDay: 1,
  infoText: 'Click on a day of the menstrual cycle on the right and watch what happens on the left.\n\nThe menstrual cycle is a set of changes in the female reproductive system. Each cycle, a lining builds up on the uterus. If there is no pregnancy, the lining is shed, and some of it leaves the body during the period.\n\nJust like a day, week, or year, when one menstrual cycle ends another begins.',
};

function infoText(resources) {
  const screenCenterX = resources.scene.cameras.main.worldView.x + resources.scene.cameras.main.width / 2;
  const screenCenterY = resources.scene.cameras.main.worldView.y + resources.scene.cameras.main.height / 2;
  var width = 600;
  var height = 410;

  if (!resources.popup || !resources.popup.isVisible()) {
    resources.popup = new Popup(resources.scene, screenCenterX - width/2, screenCenterY - height/2, width, height, resources.infoText);
  }
}

// Function to change the day when the user clicks on the cycle calendar.
function changeDay(day) {
  resources.previousDay = resources.currentDay;
  resources.currentDay = day;

  resources.dayLabel.setText('Day ' + day);

  resources.circleGroup.getChildren()[resources.previousDay-1].list[0].setStrokeStyle(0);
  resources.circleGroup.getChildren()[day - 1].list[0].setStrokeStyle(4.5, '0xF1F227');
  
  generateAnimation(resources.previousDay, resources.currentDay);

  // Only plays destroy animation on day 16.
  if (resources.egg) {
    if (day === 16) {
      resources.eggTimeline.play();
      resources.destroyEgg.play();
    } else if (day > 16 || resources.previousDay === 15) {
      resources.egg.destroy();
      delete resources.egg;
    }
  }
  
  // Creates a new egg for days <15 if there is no egg already.
  if (day <= 15 && !resources.egg) {
    newEgg();
  }

  if (day >= 1 && day <= 5) {
    resources.stage.setText('Period');
  } else if (day >= 6 && day <= 14) {
    resources.stage.setText('Lining builds');
  } else if (day === 15) {
    resources.stage.setText('Ovulation');
    resources.eggTimeline.play();
  } else {
    resources.stage.setText('Lining builds');
  }
}

// Function to run endometrium animations on a day change.
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
  
  // Stops previous animation if user changes day before the end of the previous animation.
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

// Function to create a new egg.
function newEgg() {
  resources.egg = resources.scene.add.image(200, 224, 'egg').setScale(1.3);

  resources.eggTimeline = resources.scene.tweens.createTimeline();

  resources.eggTimeline.add({
    targets: resources.egg,
    x: 150.5,
    y: 172,  
    duration: 500
  });

  resources.eggTimeline.add({
    targets: resources.egg,
    x: 142,
    y: 112,
    duration: 500
  });

  resources.destroyEgg = resources.scene.tweens.createTimeline();
  
  resources.destroyEgg.add({
    targets: resources.egg,
    alpha: 0,
    duration: 1100,
    onComplete: () => {
      if (resources.egg) {
        resources.egg.destroy();
        delete resources.egg;
      }

    }
  })
}