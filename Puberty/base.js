export default class Background {
  constructor(scene) {
    this.scene = scene
  }

  preload () {
    this.scene.load.image('background', '../common/images/backgrounds/lightblue.png');

  }

  create () {
    this.scene.background = this.scene.add.image(this.scene.cameras.main.width/2, this.scene.cameras.main.height/2, 'background');
    this.scene.background.setScale(this.scene.cameras.main.width/this.scene.background.width, this.scene.cameras.main.height/this.scene.background.height);
  }
}
