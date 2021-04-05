import TitleScreen from '../../../common/js/titleScreen.js';

export default class ReproductiveTitle extends Phaser.Scene {
  constructor() {
    super({key: 'reproductiveTitle'})
  }

  preload () {
  
  }

  create () {
    
    var sceneButtons = {
      femaleButton: {
        color: '0x7ac7a5',
        text: 'Female',
        nextScene: 'FRS'
      },

      maleButton: {
        color: '0xfbae06',
        text: 'Male',
        nextScene: 'MRS'
      },

      gameButton: {
        color: '0x096a92',
        text: 'Game',
        nextScene: 'rsGame'
      }
    }
    
    new TitleScreen(this, sceneButtons);

  }
}
