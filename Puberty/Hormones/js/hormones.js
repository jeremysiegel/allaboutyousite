import ToggleButton from '../../../common/js/toggleButton.js';
import Hormone from '../../../common/js/hormone.js';
import Receptor from '../../../common/js/receptor.js';
    
export default class Hormones extends Phaser.Scene {
  constructor() {
    super({key: 'hormones'})
  }

  preload () {

    this.load.image('estrogenReceptor', '../../Puberty/Changes/images/estrogenReceptor.png');
    this.load.image('estrogen', '../../Puberty/Changes/images/estrogen.png');

    this.load.image('testosteroneReceptor', '../../Puberty/Changes/images/testosteroneReceptor.png');
    this.load.image('testosterone', '../../Puberty/Changes/images/testosterone.png');
    
    this.load.image('receptorCell', '../../Puberty/Hormones/images/receptorCell.png');
    this.load.image('receptorCell2', '../../Puberty/Hormones/images/receptorCell2.png');
   
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
    //resources.hormones = this.physics.add.group({collideWorldBounds:true});
    //resources.receptors = this.physics.add.staticGroup();

    resources.estrogenReceptor = new Receptor(this, 850.1, 180.65, 'estrogenReceptor', 1, 155);
    resources.testosteroneReceptor = new Receptor(this, 850.5, 388.1, 'testosteroneReceptor', 1, 200);

    resources.cells.create(1057.7, 131.5, 'receptorCell').setCircle(125).setTint(0x999999);
    resources.cells.create(1052.25, 462.15, 'receptorCell2').setCircle(115).setTint(0x999999);
    resources.cells.create(161.45, 136.2, 'signalCell').setCircle(105);
    resources.cells.create(162.3, 453.4, 'signalCell2').setCircle(105);

    resources.estrogen = new Hormone(this, 188.7, 56.4, 'estrogen');
    resources.testosterone = new Hormone(this, 213.35, 396.65, 'testosterone');
    resources.testosterone.angle = 200;


  //  resources.estrogenReceptorGroup = this.physics.add.staticGroup(resources.estrogenReceptor);
    resources.hormones = this.physics.add.group({collideWorldBounds:true});
    resources.hormones.add(resources.estrogen);

  //  resources.testosteroneReceptorGroup = this.physics.add.staticGroup(resources.testosteroneReceptor);
  //  resources.testosteroneGroup = this.physics.add.group({collideWorldBounds:true});
    resources.hormones.add(resources.testosterone);

    this.physics.add.overlap(resources.estrogenReceptor, resources.estrogen, (receptor, hormone) => {
      bindHormone(receptor, hormone);
    });

    this.physics.add.overlap(resources.testosteroneReceptor, resources.testosterone, (receptor, hormone) => {
      bindHormone(receptor, hormone);
    });

    this.physics.add.collider(resources.hormones, resources.cells);

    this.input.on('drag', function(pointer, hormone, dragX, dragY) {
      hormone.x = dragX;
      hormone.y = dragY;

      unbindHormone(hormone);
    });

    resources.homeButton = new ToggleButton(this, 600, 280, 'Assistant', '14px', '#f9f9f9', 'button', 'buttonPressed', 'Home', home.bind(this));
  }
}

var resources = {};

function bindHormone(receptor, hormone) {
  var cell;
  
  if (hormone === resources.estrogen) {
    cell = resources.cells.children.entries[0];
  } else {
    cell = resources.cells.children.entries[1];
  }
  
  hormone.on('pointerup', () => {
 
      hormone.bindReceptor(hormone, receptor, cell);
    
  });
}

function unbindHormone(hormone) {
  var cell;

  if (hormone === resources.estrogen) {
    cell = resources.cells.children.entries[0];
  } else {
    cell = resources.cells.children.entries[1];
  }
  hormone.unbindReceptor(hormone, cell);
}
/*
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
*/

function home() {
  this.scene.switch('title');
}



