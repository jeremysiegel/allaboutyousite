export default class Title extends Phaser.Scene {
  constructor(game) {
    super({key: 'title'})
    resources.game = game;
  }

  preload () {

    this.load.image('MRS', '../../Puberty/Male-internal/images/MRS.png');
    this.load.image('FRS', '../../Puberty/Female-Internal/images/FRS diagram.png');
    this.load.image('hormones', '../../Puberty/Hormones/images/receptorCell.png');
    this.load.image('changes', '../../common/images/objects/estrogenReceptor.png');
    this.load.image('estrogen', '../../common/images/objects/estrogen.png');
  }

  create () {
    /*
    window.addEventListener('resize', () => {
      console.log('resize');
    });
    */

    this.femaleInternal = this.add.image(400, 200, 'FRS').setInteractive({useHandCursor: true}).setScale(0.4);
    this.maleInternal = this.add.image(900, 200, 'MRS').setInteractive({useHandCursor: true}).setScale(0.4);
    this.hormones = this.add.image(400, 400, 'hormones').setInteractive({useHandCursor: true}).setScale(0.4);
    this.changes = this.add.image(900, 400, 'changes').setInteractive({useHandCursor: true});

    this.scenes = [
      this.femaleInternal, 
      this.maleInternal,
      this.hormones,
      this.changes
    ];

    this.sceneKeys = {
      femaleInternal: 'FRS',
      maleInternal: 'MRS',
      hormones: 'hormones',
      changes: 'changes'
    }

    this.femaleInternal.on('pointerup', () => {
      this.scene.switch('FRS');
    })

    this.maleInternal.on('pointerup', () => {
      this.scene.switch('MRS');
    })

    this.hormones.on('pointerup', () => {
      this.scene.switch('hormones');
    })

    this.changes.on('pointerup', () => {
      this.scene.switch('changes');
    })
  }
}

var resources = {};