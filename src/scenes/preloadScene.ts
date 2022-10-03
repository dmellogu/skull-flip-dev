export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.image('tile', 'assets/img/tile.png');
    this.load.image('flippedTile', 'assets/img/flippedTile.png');
    this.load.image('deadTile', 'assets/img/deadTile.png');

    this.load.image('bigDeadTile', 'assets/img/bigDeadTile.png');
    this.load.image('redTile', 'assets/img/redTile.png');
    this.load.image('greenTile', 'assets/img/greenTile.png');
    this.load.image('orangeTile', 'assets/img/orangeTile.png');
    this.load.image('blueTile', 'assets/img/blueTile.png');
    this.load.image('purpleTile', 'assets/img/purpleTile.png');

    this.load.image('memoSkull', 'assets/img/memoSkull.png');
    this.load.image('openMemo', 'assets/img/openMemo.png');

    this.load.html('connectForm', 'assets/text/connectForm.html');
    this.load.plugin(
      'rexhorrifipipelineplugin',
      'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexhorrifipipelineplugin.min.js',
      true
    );
  }

  create() {
    //this.scene.start('MainMenu');
    this.scene.start('MainScene', {level: 1});
  }
}
