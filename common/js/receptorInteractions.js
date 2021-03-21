
export default class ReceptorInteractions {
  constructor(shapes, textbox, textContent, clickObject, clickProperty, pixelPerfect, button) {
    for (let shape of shapes) {
      shape.receptor.setInteractive({pixelPerfect: pixelPerfect})
        .on('pointerover', function() {
          this.setBlendMode(Phaser.BlendModes.SCREEN);
        })
        .on('pointerout', function() {
          this.setBlendMode(Phaser.BlendModes.NORMAL);
        })
        .on('pointerup', function() {
          textbox.setText(textContent[shape.receptor.type]);
          clickObject[clickProperty] = shape.receptor.type;
          if (button) {
            button.visible = true; 
          }  
      });
    }
  }
}
