import 'phaser';
import MainMenu from './scenes/mainMenu';
import MainScene from './scenes/mainScene';
import PreloadScene from './scenes/preloadScene';

const DEFAULT_WIDTH = 256;
const DEFAULT_HEIGHT = 192;

const config = {
  type: Phaser.AUTO,
  //backgroundColor: '#ffffff',
  backgroundColor: '#222034',
  antialias: false,
  roundPixels: true,
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  },
  dom: {
    createContainer: true
  },
  scene: [PreloadScene, MainMenu, MainScene]
};

const game = new Phaser.Game(config);
