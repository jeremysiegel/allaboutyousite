
import MRS from './Male-internal/js/MRS.js';
import FRS from './Female-Internal/js/FRS.js';
import Hormones from './Hormones/js/hormones.js';
import Title from './title.js';

var title = new Title(game);
var frs = new FRS();
var hormones = new Hormones();
var mrs = new MRS();


var config = {
  type: Phaser.AUTO,
  transparent: true,
  scale: {
    mode: Phaser.Scale.FIT,
    width: 1280,
    height: 609
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  }
};

var game = new Phaser.Game(config);

// load scenes
game.scene.add('title', title);
game.scene.add('FRS', frs);
game.scene.add('MRS', mrs);
game.scene.add('hormones', hormones);

// start title
game.scene.start('title');
