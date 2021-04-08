import TitleScreen from '../../../common/js/titleScreen.js';
import SceneButton from '../../../common/js/sceneButton.js';


export default class PeriodTitle extends Phaser.Scene {
  constructor() {
    super({key: 'periodTitle'})
  }

  preload () {
    this.load.image('homeButton', '../../common/images/buttons/home.png');

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
    this.homeButton = new SceneButton(this, 1200, 567, 0.1, 'mainTitle', 'homeButton');
  }
}
