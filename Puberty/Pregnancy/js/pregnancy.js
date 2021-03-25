import SceneButton from '../../../common/js/sceneButton.js';
import PregnancyStrings from './pregnancyStrings.js';
import DiagramInteractions from '../../../common/js/diagramInteractions.js';
    
export default class Pregnancy extends Phaser.Scene {
  constructor() {
    super({key: 'pregnancy'})
  }

  preload () {
    this.load.image('1', '../../Puberty/Pregnancy/images/pregnancy-1.png');
    this.load.image('2', '../../Puberty/Pregnancy/images/pregnancy-2.png');
    this.load.image('3', '../../Puberty/Pregnancy/images/pregnancy-3.png');
    this.load.image('4', '../../Puberty/Pregnancy/images/pregnancy-4.png');
    this.load.image('5', '../../Puberty/Pregnancy/images/pregnancy-5.png');
    this.load.image('6', '../../Puberty/Pregnancy/images/pregnancy-6.png');
    this.load.image('7', '../../Puberty/Pregnancy/images/pregnancy-7.png');
    this.load.image('8', '../../Puberty/Pregnancy/images/pregnancy-8.png');
    this.load.image('9', '../../Puberty/Pregnancy/images/pregnancy-9.png');

    this.load.image('button', '../../common/images/buttons/red_button01.png');
    this.load.image('buttonPressed', '../../common/images/buttons/red_button02.png');
    
    resources.definitions = new PregnancyStrings(false);
  }

  create () {
   
    resources.ellipse = new Phaser.Geom.Ellipse(400, 300, 550, 460);
    resources.rectangle = new Phaser.Geom.Rectangle(100, 100, 650, 460);

    resources.stages = this.add.group();
    
    resources.stagesBackground = this.add.group();

    resources.stagesBackground.create(0, 0, '5');
    resources.stagesBackground.create(0, 0, '6');
    resources.stagesBackground.create(0, 0, '7');
    resources.stagesBackground.create(0, 0, '8');
    resources.stagesBackground.create(0, 0, '9');
    resources.stagesBackground.create(0, 0, '1');
    resources.stagesBackground.create(0, 0, '2');
    resources.stagesBackground.create(0, 0, '3');
    resources.stagesBackground.create(0, 0, '4');

    resources.pregnancy5 = resources.stages.create(0, 0, '5');
    resources.stages.create(0, 0, '6');
    resources.stages.create(0, 0, '7');
    resources.stages.create(0, 0, '8');
    resources.stages.create(0, 0, '9');
    resources.stages.create(0, 0, '1');
    resources.stages.create(0, 0, '2');
    resources.stages.create(0, 0, '3');
    resources.stages.create(0, 0, '4');

    resources.pregnancy5.on('pointerdown', () => {console.log('click')});

 
    // Phaser.Actions.PlaceOnEllipse(resources.stagesBackground.getChildren(), resources.ellipse);
    //Phaser.Actions.PlaceOnEllipse(resources.stages.getChildren(), resources.ellipse);
    Phaser.Actions.PlaceOnRectangle(resources.stagesBackground.getChildren(), resources.rectangle);
    Phaser.Actions.PlaceOnRectangle(resources.stages.getChildren(), resources.rectangle);

    resources.definitionDisplay = this.add.text(820, 85, '',
      {
        fontFamily: 'Assistant',
        fontSize: '30px',
        fill: '#000',
        wordWrap: { width: 400, useAdvancedWrap: true }
      }
    );
    
    new DiagramInteractions(resources.stages.children.entries, resources.definitionDisplay, resources.definitions, resources, 'stage', false);
    
    resources.homeButton = new SceneButton(this, 600, 280, 'Assistant', '14px', '#f9f9f9', 'button', 'buttonPressed', 'Home', 'title');
  }
}

var resources = {
  explanations: false,
  stage: ''
};

