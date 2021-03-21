
export default class Receptor extends Phaser.GameObjects.Container {
  constructor(scene, x, y, key, scale, angle, type) {
    super(scene, x, y);

		this.receptor = scene.add.image(x, y, key);
		this.receptor.setOrigin(0.9, 0.5);

		scene.physics.add.existing(this);

    this.receptor.setInteractive();

    this.receptor.setScale(scale);
    this.receptor.angle = angle;

    if (type) {
      this.receptor.type = type;
    }

		const radius = this.receptor.height * 0.3 * scale;
		this.body.setCircle(radius);
		this.receptor.y += radius;
		this.receptor.x += radius;

    Receptor.prototype.getBindingSite = function () {
      var bindingSite = this.body.center;

      return bindingSite;
    }

    Receptor.prototype.changeAngle = function (angle) {
      this.receptor.angle = angle;
    }

    Receptor.prototype.returnBounds = function () {
      return this.receptor.getBounds();
    }

   // Receptor.prototype.changeScale = function (scale) {
    //  this.receptor.setScale(scale);
    //  this.body.setCircle(radius*scale);

  //}
  }
}