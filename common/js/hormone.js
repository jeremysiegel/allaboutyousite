export default class Hormone extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key, scale) {
    super(scene, x, y, key);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setInteractive({useHandCursor: true, draggable: true});

    this.body.setCircle(36);
    this.setScale(scale);

    Hormone.prototype.isBound = false;

    Hormone.prototype.bindReceptor = function (hormone, receptor, cell) {
      var boundsR = new Phaser.Geom.Circle( receptor.body.center.x, receptor.body.center.y, receptor.body.radius);
      var boundsH = new Phaser.Geom.Circle( hormone.body.center.x, hormone.body.center.y, hormone.body.radius);
      var overlap = Phaser.Geom.Intersects.CircleToCircle(boundsR, boundsH);
      var bindSite = receptor.body.center;
      
      if (overlap) {
        this.setX(bindSite.x);
        this.setY(bindSite.y);
        hormone.isBound = true;

        hormone.angle = receptor.receptor.angle;
      } 

      if (hormone.isBound) {
        if (cell) {
          cell.setTint(0xffffff);
        }
        receptor.receptor.isBound = true;
        receptor.receptor.setTint(0xffffff);
      }
    }

    Hormone.prototype.unbindReceptor = function(hormone, cell) {
      if (hormone.isBound) {
        cell.setTint(0x999999);
        hormone.isBound = false;
        receptor.receptor.isBound = false;
        receptor.receptor.setTint();
      }

    }
  }
}