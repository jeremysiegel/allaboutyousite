import TitleScreen from '../../../common/js/titleScreen.js';

export default class MainTitle extends Phaser.Scene {
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
