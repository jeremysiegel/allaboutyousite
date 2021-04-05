import TitleButton from '../../../common/js/titleButton.js';

export default class TitleScreen {
  constructor(scene, sceneButtons) {
    
    var resources = {
      buttons: []
    };

    resources.width = 300;
    resources.height = 200;
    resources.spacing = 20;

    var i = 0;
    for (let button in sceneButtons) {
      resources.i = new TitleButton(scene, 0, 0, resources.width, resources.height, sceneButtons[button].color, sceneButtons[button].text, sceneButtons[button].nextScene);
      resources.buttons.push(resources.i);
      i++;
    }

    resources.gridWidth = Math.ceil(resources.buttons.length / 2);

    Phaser.Actions.GridAlign(resources.buttons, {
      width: resources.gridWidth,
      height: 2,
      cellWidth: resources.width + resources.spacing,
      cellHeight: resources.height + resources.spacing,
      position: Phaser.Display.Align.CENTER,
      x: (1280 / 2) - resources.width - (resources.spacing),
      y: (609 / 2) - resources.height - (resources.spacing / 2)
  });

/*  
    var background = this.add.rectangle(window.innerWidth/2, window.innerHeight/2, window.innerWidth, window.innerHeight, 0x7ac7a5);

    window.addEventListener('resize', () => {
      background.width = window.innerWidth;
      background.height = window.innerHeight;

    });
  
*/
  }
}