
export default class DiagramInteractions {
  constructor(shapes, textbox, textContent, clickObject, clickProperty, button) {
    for (let shape of shapes) {
      shape.setInteractive({pixelPerfect: true})
        .on('pointerover', function() {
          this.setBlendMode(Phaser.BlendModes.SCREEN);
        })
        .on('pointerout', function() {
          this.setBlendMode(Phaser.BlendModes.NORMAL);
        })
        .on('pointerup', function() {
          textbox.setText(textContent[shape.texture.key]);
          clickObject[clickProperty] = shape.texture.key;
          button.visible = true;   
      });
    }
  }
}
