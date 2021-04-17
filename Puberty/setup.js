/* 
This scene is called only on the initial start of the app.
It preloads resources and sets up the url router.
*/

export default class Setup extends Phaser.Scene {
  constructor() {
    super({key: 'setup'});
  }

  preload () {

  }

  create () {
    // Adds event listener to allow navigation by url. Defaults to remain on current scene. 
    window.hashListener = window.addEventListener('hashchange', () => {
      var currentScene;

      for (var i = 0; i < this.scene.manager.scenes.length; i++) {
        if (this.scene.isActive(this.scene.manager.scenes[i])) {
          currentScene = this.scene.manager.scenes[i];

        }
      }

      for (var i = 0; i < this.scene.manager.scenes.length; i++) {
        if (this.scene.manager.scenes[i].scene.key === window.location.hash.substring(2)) {
          this.scene.stop(currentScene);
          this.scene.start(window.location.hash.substring(2));
        }
      }
    })

    // Checks if there is initially another scene name at the end of the url. If so, start that scene. 
    var initialScene = false;
    for (var i = 0; i < this.scene.manager.scenes.length; i++) {
      if (this.scene.manager.scenes[i].scene.key === window.location.hash.substring(2)) {
        this.scene.switch(window.location.hash.substring(2));
        
        initialScene = true;
        break;
      } 
    }
    
    // Default to mainTitle.
    if (!initialScene) {
      window.location.hash = '/mainTitle';
    }

  }
}
