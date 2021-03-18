import ToggleButton from '../../../common/js/toggleButton.js';
    
export default class Hormones extends Phaser.Scene {
  constructor() {
    super({key: 'hormones'})
  }

  preload () {

    this.load.image('receptorCell', '../../Puberty/Hormones/images/receptorCell.png');
    this.load.image('receptorCell2', '../../Puberty/Hormones/images/receptorCell2.png');
    this.load.image('receptor', '../../Puberty/Hormones/images/receptor.png');
    this.load.image('receptor2', '../../Puberty/Hormones/images/receptor2.png');
    this.load.image('hormone', '../../Puberty/Hormones/images/hormone.png');
    this.load.image('hormone2', '../../Puberty/Hormones/images/hormone2.png');
    this.load.image('signalCell', '../../Puberty/Hormones/images/signalCell.png');
    this.load.image('signalCell2', '../../Puberty/Hormones/images/signalCell2.png');

    this.load.image('button', '../../common/images/buttons/red_button01.png');
    this.load.image('buttonPressed', '../../common/images/buttons/red_button02.png');
    
  }

  create () {
    /*
    window.addEventListener('resize', () => {
      console.log('resize');
    });
    */
    
    resources.cells = this.physics.add.staticGroup();
    resources.hormones = this.physics.add.group({collideWorldBounds:true});
    resources.receptors = this.physics.add.staticGroup();

    resources.receptors.create(920.1, 215.65, 'receptor').setCircle(30);
    resources.receptors.create(913.5, 388.1, 'receptor2').setCircle(30);
    //resources.receptor = this.physics.add.image(920.1, 215.65, 'receptor');
    //resources.receptor2 = this.physics.add.image(913.5, 388.1, 'receptor2');

    resources.cells.create(1057.7, 131.5, 'receptorCell').setCircle(125).setTint(0x999999);
    resources.cells.create(1052.25, 462.15, 'receptorCell2').setCircle(115).setTint(0x999999);
    resources.cells.create(161.45, 136.2, 'signalCell').setCircle(105);
    resources.cells.create(162.3, 453.4, 'signalCell2').setCircle(105);

    resources.hormones.create(188.7, 56.4, 'hormone').setInteractive({useHandCursor: true, draggable: true}).setCircle(22);
    resources.hormones.create(213.35, 396.65, 'hormone2').setInteractive({useHandCursor: true, draggable: true}).setCircle(25);

   // resources.hormone = this.physics.add.sprite(400, 150, 'hormone').setCollideWorldBounds(true);
   // resources.hormone2 = this.physics.add.sprite(470, 450, 'hormone2').setCollideWorldBounds(true);
    //resources.hormones.hormone

    this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
      var index;

      if (gameObject.texture.key === 'hormone') {
        index = 0;

      } else if (gameObject.texture.key === 'hormone2') {
        index = 1;
      }
    
      var overlap = testOverlap(gameObject);

      if (overlap === false) {
        resources.cells.children.entries[index].setTint(0x999999);
      }
    });

    this.input.on('dragend', function(pointer, gameObject) {
      
      var index = testOverlap(gameObject);

      if (index !== false) {
        bindReceptor(gameObject, index);
      }
    });

   // resources.hormone2.setInteractive({useHandCursor: true});

  //  resources.hormones[hormone2].setCircle(25);
  //  resources.hormones.hormone.setCircle(22);

   // resources.cells.refresh();

    this.physics.add.collider(resources.hormones, resources.cells);
   // this.physics.add.collider(resources.hormones, resources.hormones);
  //  this.physics.add.overlap(resources.hormones, resources.receptors, (gameObject1, gameObject2) => {console.log('overlap')});


    resources.homeButton = new ToggleButton(this, 600, 280, 'Assistant', '14px', '#f9f9f9', 'button', 'buttonPressed', 'Home', home.bind(this));
  }
}

var resources = {};

function bindReceptor(hormoneObj, index) {
  var cellObj = resources.cells.children.entries[index];

  cellObj.setTint(0xffffff);
  var x;
  var y;

  if (index === 0) {
    x = 895.2;
    y = 219.9;
  } else if (index === 1) {
    x = 883.35;
    y = 380.65;
  }

  hormoneObj.setX(x);
  hormoneObj.setY(y);

}

function testOverlap(hormoneObj){

  var receptorObj;
  var cellObj;
  var index;

  if (hormoneObj.texture.key === 'hormone') {
    index = 0;
    
  } else if (hormoneObj.texture.key === 'hormone2') {
    index = 1;
  }

  receptorObj = resources.receptors.children.entries[index];

  
  index = checkOverlap(hormoneObj, receptorObj, index);

  return index;

  function checkOverlap(hormoneObj, receptorObj, index) {
    var boundsH = hormoneObj.getBounds();
    var boundsR = receptorObj.getBounds();
    var overlap = Phaser.Geom.Intersects.RectangleToRectangle(boundsH, boundsR);

    if (overlap) {
      return index;
    } else {

      return false;
    }
  }
}


function home() {
  this.scene.switch('title');
}



