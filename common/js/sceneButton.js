import Button from '../../../common/js/button.js';

export default class SceneButton extends Button {
  constructor(scene, x, y, fontFamily, fontsize, fontColor, key1, key2, text, switchScene) {
    var button = super(scene, x, y, fontFamily, fontsize, fontColor, key1, text);

    button.on('pointerdown', () => {
      if (key2) {
        button.setTexture(key2);
      }
    });

    button.on('pointerup', () => {
      button.setTexture(key1);
      scene.sys.scenePlugin.switch(switchScene);
    });
  }
}