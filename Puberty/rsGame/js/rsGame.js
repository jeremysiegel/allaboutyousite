import SceneButton from '../../../common/js/sceneButton.js';
    
export default class RSGame extends Phaser.Scene {
  constructor() {
    super({key: 'rsGame'})
  }

  preload () {

    this.load.image('labelLines', '../../Puberty/Male-internal/images/label lines.png');
    this.load.image('MRS', '../../Puberty/Male-internal/images/MRS.png');
    this.load.image('sperm', '../../Puberty/rsGame/images/sperm.png');
    this.load.spritesheet('spermSpritesheet', '../../Puberty/rsGame/images/sperm3_spritesheet.png', { frameWidth: 27, frameHeight: 214, margin: 10, spacing: 20 });
   
    // this.load.spritesheet('spermSpritesheet', '../../Puberty/rsGame/images/sperm2_spritesheet.png', { frameWidth: 9, frameHeight: 69, margin: 10, spacing: 20 });

   // this.load.spritesheet('spermSpritesheet2', '../../Puberty/rsGame/images/sperm_spritesheet.png', { frameWidth: 104, frameHeight: 277, margin: 10, spacing: 20 });


    this.load.image('button', '../../common/images/buttons/red_button01.png');
    this.load.image('buttonPressed', '../../common/images/buttons/red_button02.png');
    
  }

  create () {
    resources.maleInternal = this.add.image(450.1, 289.45, 'MRS'); 
    resources.labelLines = this.add.image(435.05, 318.2, 'labelLines');
   // resources.sperm = this.add.image(346, 413, 'sperm').setAngle(60).setScale(0.65);

    this.anims.create({
      key: 'swim',
      frames: this.anims.generateFrameNumbers('spermSpritesheet', { frames: [0, 1, 2] }),
      frameRate: 8,
      repeat: -1
    });

    resources.sperm = this.add.sprite(346, 413, 'spermSpritesheet', 1);
    resources.sperm.setScale(0.23);
    resources.sperm.setAngle(315)
    //resources.sperm.play('swim');

    var testicleTween = this.tweens.add({
      targets: resources.sperm,
      x: 340,
      y: 420,
      ease: 'Quad.easeInOut',      
      duration: 1500,
      yoyo: true,
      repeat: -1
    });

    resources.labels = this.physics.add.group({collideWorldBounds:true});

    resources.maleOrgans = ['Testicle', 'Epididymis', 'Vas Deferens', 'Bladder', 'Seminal Vesicle', 'Prostate', 'Urethra'];

    var spacing = 100;

    for (let organ in resources.maleOrgans) {
      var rect = this.add.rectangle(0, 0, 145, 25, 0x6666ff);
      var text = this.add.text(0, 0, resources.maleOrgans[organ]).setOrigin(0.5);
  
      var container = this.add.container(900, spacing, [rect, text]);
  
      container.setSize(rect.width, rect.height);
      container.setInteractive({draggable: true, useHandCursor:true, setCollideWorldBounds: true});
      resources.labels.add(container);

      spacing += 35;
    }

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    for (let organ in organs) {
      resources[organ] = organs[organ];
    }

    resources.currentOrgan = resources.testicle;

    resources.hitBox = this.add.rectangle(resources.currentOrgan.x, resources.currentOrgan.y, 35, 25);

    resources.hitBoxGroup = this.physics.add.staticGroup();
    resources.hitBoxGroup.add(resources.hitBox);

    this.input.on('dragend', (pointer, gameObject) => {
      if (gameObject.list[1].text === resources.currentOrgan.name) {
        var bounds = gameObject.getBounds();
        var boundsHitBox = resources.hitBox.getBounds();
        var overlap = Phaser.Geom.Intersects.RectangleToRectangle(bounds, boundsHitBox);

        if (overlap) {
          gameObject.x = resources.hitBox.x;
          gameObject.y = resources.hitBox.y;
          gameObject.input.draggable = false;
  
          nextOrgan(this);
        }
      }
    });



    resources.homeButton = new SceneButton(this, 600, 280, 'Assistant', '14px', '#f9f9f9', 'button', 'buttonPressed', 'Home', 'title');
  }
}

var resources = {}

var organs = {
  testicle: {
    name: 'Testicle',
    x: 342,
    y: 573,
    next: 'Epididymis',
    tweens: [
      {
        x: 358,
        y: 388.2,
        ease: 'Power1',      
        duration: 1500,
        angle: 140
      },

      {
        x: 360,
        y: 391,
        ease: 'Quad.easeInOut',      
        duration: 1000,
        yoyo: true,
        repeat: -1,
        offset: '-=500'
      }
    ]
  },
  epididymis: {
    name: 'Epididymis',
    x: 520.7,
    y: 557,
    next: 'Vas Deferens',
    tweens: [
      {
        x: 383.7,
        y: 400.2,
        ease: 'Power1',      
        duration: 1500,
        angle: -20
      },
    ]
  },
  vdeferens: {
    name: 'Vas Deferens',
    x: 143.2,
    y: 214.2,
    next: 'Bladder',
    tweens: [
      {
        x: 349.7,
        y: 352.7,
        ease: 'Linear',      
        duration: 1500,
        angle: -42
      },     
      
      {
        x: 325.7,
        y: 325.7,
        ease: 'Linear',      
        duration: 500,
        angle: -10
      },

      {
        x: 323.5,
        y: 257.7,
        ease: 'Linear',      
        duration: 1500,
        angle: -10,
        offset: '-=100'
      },
      {
        x: 310.5,
        y: 217.7,
        ease: 'Linear',      
        duration: 500,
        angle: -16,
        offset: '-=50'
      },
      {
        x: 305,
        y: 200,
        ease: 'Linear',      
        duration: 500,
        angle: -16,
        offset: '-=100'
      },
      {
        x: 310,
        y: 170,
        ease: 'Linear',      
        duration: 500,
        angle: 60,
        offset: '-=200'
      },
      {
        x: 329.5,
        y: 155,
        ease: 'Linear',      
        duration: 1000,
        angle: 60,
        offset: '-=200'
      },
      {
        x: 340.5,
        y: 145,
        ease: 'Linear',      
        duration: 500,
        angle: 75,
        offset: '-=200'
      },
      {
        x: 400,
        y: 133,
        ease: 'Power1',      
        duration: 500,
        angle: 90,
        offset: '-=200'
      },
    ]
  },
  bladder: {
    name: 'Bladder',
    x: 298.2,
    y: 81.7,
    next: 'Seminal Vesicle',
    tweens: [      
      {
        x: 477.7,
        y: 145,
        ease: 'Linear',      
        duration: 1000,
        angle: 110,
        offset: '-=50'
      },
      {
        x: 531.2,
        y: 187,
        ease: 'Linear',      
        duration: 1000,
        angle: 150,
        offset: '-=50'
      },
      {
        x: 531.2,
        y: 215,
        ease: 'Linear',      
        duration: 1000,
        angle: 210,
        offset: '-=200'
      },

    ]
  },
  svesicle: {
    name: 'Seminal Vesicle',
    x: 708.2,
    y: 89.7,
    next: 'Prostate',
    tweens: [
      {
        x: 510.2,
        y: 245,    
        duration: 500,
        angle: -110,
        offset: '-=50'
      },

      {
        x: 490.2,
        y: 245,    
        duration: 500,
        angle: -110,
        offset: '-=50'
      },
      {
        x: 456.7,
        y: 278,    
        duration: 500,
        angle: -165,
        offset: '-=50'
      },
    ]
  },
  prostate: {
    name: 'Prostate',
    x: 650.7,
    y: 454.2,
    next: 'Urethra',
    tweens: [
      {
        x: 415,
        y: 313,    
        duration: 500,
        angle: -70,

      },
      {
        x: 370,
        y: 294.2,    
        duration: 1500,
        angle: -70,
        offset: '-=50'
      },
    ]
  },
  urethra: {
    name: 'Urethra',
    x: 155.7,
    y: 339.2,
    next: null,
    tweens: [
      {
        x: 321,
        y: 284,    
        duration: 500,
        angle: -100,
        offset: '-=500'
      },
      {
        x: 294,
        y: 294,    
        duration: 500,
        angle: -140,
        offset: '-=50'
      },

      {
        x: 268,
        y: 343,    
        duration: 500,
        angle: -165,
        offset: '-=50'
      },
      {
        x: 278,
        y: 443,    
        duration: 500,
        angle: -175,
        offset: '-=50'
      },
     {
        x: 284.7,
        y: 530,    
        duration: 1500,
        angle: -180,
        offset: '-=50'
      },
    ]
  },
};


function nextOrgan(scene) {

  if (resources.currentOrgan.name === 'Epididymis') {
    resources.sperm.play('swim');
  }

  var tweens = scene.tweens.getTweensOf(resources.sperm);
  if (tweens[0]) {
    tweens[0].stop();
  }
  
  var timeline = scene.tweens.createTimeline({
    targets: resources.sperm,
  });

  resources.currentOrgan.tweens.forEach(function(tween) {
    tween.targets = resources.sperm,
    timeline.add(tween);
  })

  timeline.play();

  if (resources.currentOrgan.next !== null) {
    for (let organ in organs) {
      if (organs[organ].name === resources.currentOrgan.next) {
        resources.currentOrgan = organs[organ]
        break;
      }
    }
  
    resources.hitBox.destroy();
    resources.hitBox = scene.add.rectangle(resources.currentOrgan.x, resources.currentOrgan.y, 35, 25);
    resources.hitBoxGroup.add(resources.hitBox);
  }


}

