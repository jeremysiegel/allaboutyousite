export default class Button extends Phaser.GameObjects.Container {
  constructor(scene, x, y, fontFamily, fontsize, fontColor, key1, key2, text, callback, toggleObjects) {
    super(scene);
    this.scene = scene;
    this.x = x;
    this.y = y;
    
    const button = this.scene.add.image(x, y, key1).setInteractive({useHandCursor: true});
  
    const buttonText = this.scene.add.text(x, y, text, { fontFamily: fontFamily, fontSize: fontsize, color: fontColor });
    
    Phaser.Display.Align.In.Center(buttonText, button);
    this.add(button);
    
    this.add(buttonText);
    
    button.on('pointerdown', () => {
      button.setTexture(key2);
    });

    button.on('pointerup', () => {
      button.setTexture(key1);
      callback(toggleObjects);
    });

    this.scene.add.existing(this);
  }
}