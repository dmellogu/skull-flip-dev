import 'phaser';
import MainMenu from './scenes/mainMenu';
import MainScene from './scenes/mainScene';
import PreloadScene from './scenes/preloadScene';
import HorrifiPipelinePlugin from 'phaser3-rex-plugins/plugins/horrifipipeline-plugin.js';

const DEFAULT_WIDTH = 256 * 4;
const DEFAULT_HEIGHT = 192 * 4;

const config = {
  type: Phaser.AUTO,
  //backgroundColor: '#ffffff',
  //backgroundColor: '#222034',
  backgroundColor: '#000',
  //antialias: false,
  //roundPixels: true,
  pixelArt: true,
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
  // plugins: {
  //   global: [{
  //       key: 'rexHorrifiPipeline',
  //       plugin: HorrifiPipelinePlugin,
  //       start: true
  //   }]
  // },
  scene: [PreloadScene, MainMenu, MainScene]
};

const game = new Phaser.Game(config);
