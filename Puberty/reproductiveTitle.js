import TitleScreen from '../../../common/js/titleScreen.js';
import SceneButton from '../../../common/js/sceneButton.js';

export default class ReproductiveTitle extends Phaser.Scene {
  constructor() {
    super({key: 'reproductiveTitle'})
  }

  preload () {
    this.load.image('homeButton', '../../common/images/buttons/home.png');

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
    this.homeButton = new SceneButton(this, 1200, 567, 0.1, 'mainTitle', 'homeButton');
  }
}
