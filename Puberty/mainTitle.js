// This scene is called on the initial start of the application and any manual url change.

import TitleScreen from '../../../common/js/titleScreen.js';
import BaseScene from './base.js';

export default class MainTitle extends BaseScene {
  constructor() {
    super('mainTitle');
  }

  preload () {
    super.preload();

    this.load.image('background', '../common/images/backgrounds/lightblue.png');
    this.load.image('homeButton', '../../common/images/buttons/home.png');
  }

  create () {
   
    super.create();

    var sceneButtons = {
      changesButton: {
        color: '0x7ac7a5',
        text: 'Changes',
        nextScene: 'changesTitle'
      },

      reproductiveButton: {
        color: '0xfbae06',
        text: 'Reproductive system',
        nextScene: 'reproductiveTitle'
      },

      periodButton: {
        color: '0x096a92',
        text: 'Periods & Pregnancy',
        nextScene: 'periodTitle'
      }
    }
    
    new TitleScreen(this, sceneButtons);



  }
}
