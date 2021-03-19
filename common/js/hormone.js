export default class Hormone extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setInteractive({useHandCursor: true, draggable: true});

    this.body.setCircle(36);

    Hormone.prototype.isBound = false;

    Hormone.prototype.bindReceptor = function (hormone, receptor, cell) {
      var boundsR = receptor.returnBounds();
      var boundsH = this.getBounds();
      var overlap = Phaser.Geom.Intersects.RectangleToRectangle(boundsR, boundsH);
      var bindSite = receptor.body.center;
      
      if (overlap) {
        this.setX(bindSite.x);
        this.setY(bindSite.y);
        hormone.isBound = true;
      }

      if (cell && hormone.isBound) {
        cell.setTint(0xffffff);
      }
    }

    Hormone.prototype.unbindReceptor = function(hormone, cell) {
      if (hormone.isBound) {
        cell.setTint(0x999999);
        hormone.isBound = false;
      }
    }
  }
}