export default class TitleButton extends Phaser.GameObjects.Container {
  constructor(scene, x, y, color, text, newScene) {
    super(scene);
    this.scene = scene;
    this.x = x;
    this.y = y;

    this.buttonWidth = 300;
    this.buttonHeight = 200;

    // Number added to x, y represent relative offset of text from top left of button box.

    var buttonText = this.scene.add.text(x + 30, y + 30, text, { fontFamily: 'Assistant', fontSize: 48, color: '#ffffff', wordWrap: { width: 250, useAdvancedWrap: false }});

    var button = this.scene.add.graphics();
    button.fillRoundedRect(x, y, this.buttonWidth, this.buttonHeight, 32);
    button.fillStyle(color, 1);
    button.strokeRoundedRect(x, y, this.buttonWidth, this.buttonHeight, 32);
    button.lineStyle(4, 0xffffff, 1);
    
    var hitBox = this.scene.add.rectangle(x + this.buttonWidth/2, y + this.buttonHeight/2, this.buttonWidth, this.buttonHeight).setInteractive({useHandCursor: true});


    hitBox.on('pointerup', () => {
      this.scene.scene.switch(newScene);
    });

    this.add(button);
    this.add(buttonText);
    this.add(hitBox);
    this.scene.add.existing(this);

    return this;
      
  }
}
