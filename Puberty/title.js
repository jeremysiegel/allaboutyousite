export default class Title extends Phaser.Scene {
  constructor(game) {
    super({key: 'title'})
    resources.game = game;
  }

  preload () {
    this.load.image('MRS', '../../Puberty/Male-internal/images/MRS.png');
    this.load.image('FRS', '../../Puberty/Female-Internal/images/FRS diagram.png');
    this.load.image('receptorCell', '../../Puberty/Hormones/images/receptorCell.png');
    this.load.image('femaleChanges', '../../common/images/objects/estrogenReceptor.png');
    this.load.image('maleChanges', '../../common/images/objects/testosteroneReceptor.png');
    this.load.image('pregnancy', '../../Puberty/Pregnancy/images/pregnancy-9.png');
    this.load.image('period', '../../Puberty/Menstruation/images/period-3.png');

    var url;
  
    url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexpinchplugin.min.js';
    this.load.plugin('rexpinchplugin', url, true);

  }

  create () {
    /*
    window.addEventListener('resize', () => {
      console.log('resize');
    });
    */
    var dragScale = this.plugins.get('rexpinchplugin').add(this);

    var camera = this.cameras.main;
    dragScale
        .on('drag1', function (dragScale) {
            var drag1Vector = dragScale.drag1Vector;
            camera.scrollX -= drag1Vector.x / camera.zoom;
            camera.scrollY -= drag1Vector.y / camera.zoom;
        })
        .on('pinch', function (dragScale) {
            var scaleFactor = dragScale.scaleFactor;
            camera.zoom *= scaleFactor;
        }, this);

    this.femaleInternal = this.add.image(400, 200, 'FRS').setInteractive({useHandCursor: true}).setScale(0.4);
    this.maleInternal = this.add.image(900, 200, 'MRS').setInteractive({useHandCursor: true}).setScale(0.4);
    this.hormones = this.add.image(400, 400, 'receptorCell').setInteractive({useHandCursor: true}).setScale(0.4);
    this.maleChanges = this.add.image(900, 400, 'maleChanges').setInteractive({useHandCursor: true});
    this.femaleChanges = this.add.image(1050, 400, 'femaleChanges').setInteractive({useHandCursor: true});
    this.period = this.add.image(650, 400, 'period').setInteractive({useHandCursor: true}).setScale(0.4);
    this.pregnancy = this.add.image(650, 200, 'pregnancy').setInteractive({useHandCursor: true});

    this.femaleInternal.on('pointerup', () => {
      this.scene.switch('FRS');
    })

    this.maleInternal.on('pointerup', () => {
      this.scene.switch('MRS');
    })

    this.hormones.on('pointerup', () => {
      this.scene.switch('hormones');
    })

    this.maleChanges.on('pointerup', () => {
      this.scene.switch('maleChanges');
    })

    this.femaleChanges.on('pointerup', () => {
      this.scene.switch('femaleChanges');
    })

    this.period.on('pointerup', () => {
      this.scene.switch('period');
    })

    this.pregnancy.on('pointerup', () => {
      this.scene.switch('pregnancy');
    })
  }
}

var resources = {};