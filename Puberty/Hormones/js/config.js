import Start from './start.js';

var config = {
  type: Phaser.AUTO,
  transparent: true,
  scene: [Start],
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


