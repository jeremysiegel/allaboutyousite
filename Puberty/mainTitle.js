import TitleScreen from '../../../common/js/title.js';

export default class MainScreen extends Phaser.Scene {
  constructor() {
    super({key: 'mainTitle'})
  }

  preload () {
  
  }

  create () {
    
    var sceneButtons = {
      changesButton: {
        color: '0x7ac7a5',
        text: 'Changes',
        nextScene: 'hormones'
      },

      reproductiveButton: {
        color: '0xfbae06',
        text: 'Reproductive system',
        nextScene: 'FRS'
      },

      periodButton: {
        color: '0x096a92',
        text: 'Periods',
        nextScene: 'period'
      },

      pregnancyButton: {
        color: '0xff8736',
        text: 'Pregnancy',
        nextScene: 'pregnancy'
      }
    }
    
    new TitleScreen(this, sceneButtons);

  }
}
