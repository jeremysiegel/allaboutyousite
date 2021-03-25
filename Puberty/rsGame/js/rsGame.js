import SceneButton from '../../../common/js/sceneButton.js';
import ToggleButton from '../../../common/js/toggleButton.js';
    
export default class RSGame extends Phaser.Scene {
  constructor() {
    super({key: 'rsGame'})
  }

  preload () {

    this.load.image('labelLines', '../../Puberty/Male-internal/images/label lines.png');
    this.load.image('MRS', '../../Puberty/Male-internal/images/MRS.png');

    this.load.image('button', '../../common/images/buttons/red_button01.png');
    this.load.image('buttonPressed', '../../common/images/buttons/red_button02.png');
    
  }

  create () {
    resources.maleInternal = this.add.image(450.1, 289.45, 'MRS'); 
    resources.labelLines = this.add.image(435.05, 318.2, 'labelLines');

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
    next: 'Epididymis'
  },
  epididymis: {
    name: 'Epididymis',
    x: 520.7,
    y: 557,
    next: 'Vas Deferens'
  },
  vdeferens: {
    name: 'Vas Deferens',
    x: 143.2,
    y: 214.2,
    next: 'Bladder'
  },
  bladder: {
    name: 'Bladder',
    x: 298.2,
    y: 81.7,
    next: 'Seminal Vesicle'
  },
  svesicle: {
    name: 'Seminal Vesicle',
    x: 708.2,
    y: 89.7,
    next: 'Prostate'
  },
  prostate: {
    name: 'Prostate',
    x: 650.7,
    y: 454.2,
    next: 'Urethra'
  },
  urethra: {
    name: 'Urethra',
    x: 155.7,
    y: 339.2,
    next: null
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
  
  resources.hitBox.destroy();
  resources.hitBox = scene.add.rectangle(resources.currentOrgan.x, resources.currentOrgan.y, 35, 25);
  resources.hitBoxGroup.add(resources.hitBox);


}

