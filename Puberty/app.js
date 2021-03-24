
import MRS from './Male-internal/js/MRS.js';
import FRS from './Female-Internal/js/FRS.js';
import Hormones from './Hormones/js/hormones.js';
import MaleChanges from './Changes/js/maleChanges.js';
import FemaleChanges from './Changes/js/femaleChanges.js';
import Period from './Menstruation/js/period.js';
import Pregnancy from './Pregnancy/js/pregnancy.js';

import Title from './title.js';

var title = new Title(game);
var frs = new FRS();
var hormones = new Hormones();
var mrs = new MRS();
var maleChanges = new MaleChanges();
var femaleChanges = new FemaleChanges();
var period = new Period();
var pregnancy = new Pregnancy();

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
      debug: true
    }
  }
};

var game = new Phaser.Game(config);

// load scenes
game.scene.add('title', title);
game.scene.add('FRS', frs);
game.scene.add('MRS', mrs);
game.scene.add('hormones', hormones);
game.scene.add('maleChanges', maleChanges);
game.scene.add('femaleChanges', femaleChanges);
game.scene.add('period', period);
game.scene.add('pregnancy', pregnancy);

// start title
game.scene.start('title');
