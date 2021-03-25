import SceneButton from '../../../common/js/sceneButton.js';
import ToggleButton from '../../../common/js/toggleButton.js';
    
export default class Period extends Phaser.Scene {
  constructor() {
    super({key: 'period'})
  }

  preload () {
    this.load.spritesheet('periodSpritesheet', '../../Puberty/Menstruation/images/period_spritesheet.png', { frameWidth: 489.4, frameHeight: 489.4, margin: 10, spacing: 20 });
    this.load.image('hormonesGraph', '../../Puberty/Menstruation/images/hormones.png');

    this.load.image('button', '../../common/images/buttons/red_button01.png');
    this.load.image('buttonPressed', '../../common/images/buttons/red_button02.png');    
  }

  create () {
    resources.stage = this.add.sprite(321.3, 277.3, 'periodSpritesheet', 0);
    resources.hormonesGraph = this.add.image(990, 200, 'hormonesGraph').setScale(0.55);

    resources.menstruationButton = new ToggleButton(this, 435, 200, 'Assistant', '14px', '#f9f9f9', 'button', 'buttonPressed', 'Menstruation', changeFRS.bind(this), 0);
    resources.follicularButton = new ToggleButton(this, 435, 220, 'Assistant', '14px', '#f9f9f9', 'button', 'buttonPressed', 'Follicular', changeFRS.bind(this), 1);
    resources.ovulationButton = new ToggleButton(this, 435, 240, 'Assistant', '14px', '#f9f9f9', 'button', 'buttonPressed', 'Ovulation', changeFRS.bind(this), 2);
    resources.lutealButton = new ToggleButton(this, 435, 260, 'Assistant', '14px', '#f9f9f9', 'button', 'buttonPressed', 'Luteal', changeFRS.bind(this), 3);

    resources.homeButton = new SceneButton(this, 600, 280, 'Assistant', '14px', '#f9f9f9', 'button', 'buttonPressed', 'Home', 'title');
  }
}

var resources = {};

function changeFRS(stage) {
  resources.stage.destroy();
  resources.stage = this.add.sprite(321.3, 277.3, 'periodSpritesheet', stage);
}