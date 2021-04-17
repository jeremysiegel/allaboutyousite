import TitleScreen from '../../../common/js/titleScreen.js';
import SceneButton from '../../../common/js/sceneButton.js';
import BaseScene from './base.js';

export default class ChangesTitle extends BaseScene {
  constructor() {
   super('changesTitle');
    // super({key: 'changesTitle'})
  }

  preload () {
    super.preload();
  }

  create () {
    super.create();

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
      },

      emotionsButton: {
        color: '0xff8736',
        text: 'New feelings',
        nextScene: 'emotions'
      },
    }
    
    new TitleScreen(this, sceneButtons);

    this.homeButton = new SceneButton(this, 1200, 567, 0.1, 'mainTitle', 'homeButton');



  }
}
