import TitleScreen from '../../../common/js/titleScreen.js';
import SceneButton from '../../../common/js/sceneButton.js';
import BaseScene from './base.js';

export default class ReproductiveTitle extends BaseScene {
  constructor() {
    super('reproductiveTitle');
  }

  preload () {

  }

  create () {

    super.create();
    
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
      },

      maleExternalButton: {
        color: '0xff8736',
        text: 'Male External',
        nextScene: 'maleExternal'
      },

      femaleExternalButton: {
        color: '0xff4e3e',
        text: 'Female External',
        nextScene: 'femaleExternal'
      }
    }
    
    new TitleScreen(this, sceneButtons);
    this.homeButton = new SceneButton(this, 1200, 567, 0.1, 'mainTitle', 'homeButton');
  }
}
