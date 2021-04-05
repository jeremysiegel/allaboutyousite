import TitleScreen from '../../../common/js/titleScreen.js';

export default class PeriodTitle extends Phaser.Scene {
  constructor() {
    super({key: 'periodTitle'})
  }

  preload () {
  
  }

  create () {
    
    var sceneButtons = {
      periodButton: {
        color: '0x7ac7a5',
        text: 'Periods',
        nextScene: 'period'
      },

      pregnancyButton: {
        color: '0xfbae06',
        text: 'Pregnancy',
        nextScene: 'pregnancy'
      }
    }
    
    new TitleScreen(this, sceneButtons);

  }
}
