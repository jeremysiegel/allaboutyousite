export default class Hormone extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setInteractive({useHandCursor: true, draggable: true});

    this.body.setCircle(36);

    Hormone.prototype.getX = function () {
      console.log(this.x);
    }

    Hormone.prototype.bindReceptor = function (bindSite) {
      this.setX(bindSite.x);
      this.setY(bindSite.y);
    }

  }
}