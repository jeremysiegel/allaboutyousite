export default class Textbox extends Phaser.GameObjects.Graphics {
  constructor(scene, x, y, width, height) {
    super(scene);

    this.fillStyle(0xfac6c3, 1);
    this.fillRoundedRect(x, y, width, height, 20);
    this.lineStyle(6, 0xffffff, 1);
    this.strokeRoundedRect(x, y, width, height, 20);

    scene.add.existing(this);
    
  }
}
