import TitleScreen from '../../../common/js/titleScreen.js';

export default class ChangesTitle extends Phaser.Scene {
  constructor() {
    super({key: 'changesTitle'})
  }

  preload () {
  
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

  }
}
