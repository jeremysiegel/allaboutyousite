import TitleButton from '../../../common/js/titleButton.js';


export default class Title extends Phaser.Scene {
  constructor() {
    super({key: 'title'})
  }

  preload () {
  
  }

  create () {
    this.changesButton = new TitleButton(this, 0, 0, '0x7ac7a5', 'Changes', 'hormones');
    this.reproductiveButton = new TitleButton(this, 0, 0, '0xfbae06', 'Reproductive system', 'FRS');
    this.periodButton = new TitleButton(this, 0, 0, '0x096a92', 'Periods', 'period');
    this.pregnancyButton = new TitleButton(this, 0, 0, '0xff8736', 'Pregnancy', 'pregnancy');

    Phaser.Actions.GridAlign([this.changesButton, this.reproductiveButton, this.periodButton, this.pregnancyButton], {
      width: 2,
      height: 2,
      cellWidth: 320,
      cellHeight: 220,
      position: Phaser.Display.Align.CENTER,
      x: 320,
      y: 100
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
