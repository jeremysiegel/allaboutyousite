import SceneButton from '../../../common/js/sceneButton.js';
    
export default class RSGame extends Phaser.Scene {
  constructor() {
    super({key: 'rsGame'})
  }

  preload () {

    this.load.image('labelLines', '../../Puberty/Male-internal/images/label lines.png');
    this.load.image('MRS', '../../Puberty/Male-internal/images/MRS.png');
    this.load.image('sperm', '../../Puberty/rsGame/images/sperm.png');
    this.load.spritesheet('spermSpritesheet', '../../Puberty/rsGame/images/sperm2_spritesheet.png', { frameWidth: 9, frameHeight: 69, margin: 10, spacing: 20 });
    
   // this.load.spritesheet('spermSpritesheet2', '../../Puberty/rsGame/images/sperm_spritesheet.png', { frameWidth: 104, frameHeight: 277, margin: 10, spacing: 20 });


    this.load.image('button', '../../common/images/buttons/red_button01.png');
    this.load.image('buttonPressed', '../../common/images/buttons/red_button02.png');
    
  }

  create () {
    resources.maleInternal = this.add.image(450.1, 289.45, 'MRS'); 
    resources.labelLines = this.add.image(435.05, 318.2, 'labelLines');
    resources.sperm = this.add.image(346, 413, 'sperm').setAngle(60).setScale(0.65);



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

    this.anims.create({
      key: 'swim',
      frames: this.anims.generateFrameNumbers('spermSpritesheet', { frames: [0, 1, 2] }),
      frameRate: 8,
      repeat: -1
    });

    const cody = this.add.sprite(268.5, 378.8);
    cody.setScale(0.75);
    cody.setAngle(173)
    cody.play('swim');

    resources.homeButton = new SceneButton(this, 600, 280, 'Assistant', '14px', '#f9f9f9', 'button', 'buttonPressed', 'Home', 'title');
  }
}

var resources = {}

var organs = {
  testicle: {
    name: 'Testicle',
    x: 342,
    y: 573,
    next: 'Epididymis'
  },
  epididymis: {
    name: 'Epididymis',
    x: 520.7,
    y: 557,
    next: 'Vas Deferens',
    tweens: [
      {
        x: 358,
        y: 388.2,
        ease: 'Power1',      
        duration: 1500,
        angle: 230
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
  vdeferens: {
    name: 'Vas Deferens',
    x: 143.2,
    y: 214.2,
    next: 'Bladder',
    tweens: [
      {
        x: 383.7,
        y: 400.2,
        ease: 'Power1',      
        duration: 1500,
        angle: -290
      },
    ]
  },
  bladder: {
    name: 'Bladder',
    x: 298.2,
    y: 81.7,
    next: 'Seminal Vesicle',
    tweens: []
  },
  svesicle: {
    name: 'Seminal Vesicle',
    x: 708.2,
    y: 89.7,
    next: 'Prostate',
    tweens: []
  },
  prostate: {
    name: 'Prostate',
    x: 650.7,
    y: 454.2,
    next: 'Urethra',
    tweens: []
  },
  urethra: {
    name: 'Urethra',
    x: 155.7,
    y: 339.2,
    next: null,
    tweens: []
  },
};


function nextOrgan(scene) {
  if (resources.currentOrgan.next === null) {
    return;
  }

  for (let organ in organs) {
    if (organs[organ].name === resources.currentOrgan.next) {
      resources.currentOrgan = organs[organ]
      break;
    }
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

  resources.hitBox.destroy();
  resources.hitBox = scene.add.rectangle(resources.currentOrgan.x, resources.currentOrgan.y, 35, 25);
  resources.hitBoxGroup.add(resources.hitBox);

}

