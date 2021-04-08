import TitleScreen from '../../../common/js/titleScreen.js';
import SceneButton from '../../../common/js/sceneButton.js';

export default class ChangesTitle extends Phaser.Scene {
  constructor() {
    super({key: 'changesTitle'})
  }

  preload () {
    this.load.image('homeButton', '../../common/images/buttons/home.png');

  }

  create () {
    
    var sceneButtons = {
      hormoneButton: {
        color: '0x096a92',
        text: 'Hormones',
        nextScene: 'hormones'
      },

      maleButton: {
        color: '0x7ac7a5',
        text: 'Male',
        nextScene: 'maleChanges'
      },

      femaleButton: {
        color: '0xfbae06',
        text: 'Female',
        nextScene: 'femaleChanges'
      }
    }
    
    new TitleScreen(this, sceneButtons);

    this.homeButton = new SceneButton(this, 1200, 567, 0.1, 'mainTitle', 'homeButton');



  }
}
