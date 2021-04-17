export default class BaseScene extends Phaser.Scene {
  constructor(scene) {
    super({key: scene})
  }

  preload () {


  }

  create () {    

    this.background = this.add.image(this.cameras.main.width/2, this.cameras.main.height/2, 'background');
    this.background.setScale(this.cameras.main.width/this.background.width, this.cameras.main.height/this.background.height);
  }
}
