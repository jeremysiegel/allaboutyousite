export default class Title extends Phaser.Scene {
  constructor(game) {
    super({key: 'title'})
    resources.game = game;
  }

  preload () {

    this.load.image('MRS', '../../Puberty/Male-internal/images/MRS.png');
    this.load.image('FRS', '../../Puberty/Female-internal/images/FRS diagram.png');

  }

  create () {
    /*
    window.addEventListener('resize', () => {
      console.log('resize');
    });
    */

    this.femaleInternal = this.add.image(400, 300, 'FRS').setInteractive({useHandCursor: true}).setScale(0.8);
    this.maleInternal = this.add.image(900, 300, 'MRS').setInteractive({useHandCursor: true}).setScale(0.8);

    this.femaleInternal.on('pointerup', () => {
      this.scene.switch('FRS');
    })

    this.maleInternal.on('pointerup', () => {
      this.scene.switch('MRS');
    })

    this.scenes = [
      this.femaleInternal, 
      this.maleInternal
    ];

    this.sceneKeys = {
      femaleInternal: 'FRS',
      maleInternal: 'MRS'
    }


  }

}

var resources = {};