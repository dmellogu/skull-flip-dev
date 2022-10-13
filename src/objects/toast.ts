export default class Toast {
  emitter: Phaser.Events.EventEmitter;
  scene: Phaser.Scene;
  gameOverText: Phaser.GameObjects.Text;
  levelClearedText: Phaser.GameObjects.Text;

  constructor (
    emitter: Phaser.Events.EventEmitter,
    scene: Phaser.Scene
  ){
    this.emitter = emitter;
    this.scene = scene;

    // Add UI borders
    this.scene.add.rectangle(223 * 4, 63 * 4, 60 * 4, 61 * 4, 0xffffff);
    this.scene.add.rectangle(223 * 4, 63 * 4, 56 * 4, 57 * 4, 0x000);

    this.emitter.on('levelCleared', this.levelCleared, this);
    this.emitter.on('gameOver', this.gameOver, this);
    this.emitter.on('nextLevel', () => {
      this.levelClearedText.destroy(true);
    }, this);
    this.emitter.on('reset', () => {
      this.gameOverText.destroy(true);
    }, this);
  }

  gameOver() {
    this.gameOverText = this.scene.add.text(
      202 * 4,
      46 * 4,
      'Game\nOver',
      {
        fontFamily: 'alagard',
        fontSize: '72px',
        color: '#ffffff',
        align: 'center'
      }
    );
  }

  levelCleared() {
    this.levelClearedText = this.scene.add.text(
      790,
      46 * 4,
      'LEVEL\nCOMPLETE',
      {
        fontFamily: 'alagard',
        fontSize: '44px',
        color: '#ffffff',
        align: 'left'
      }
    );
  }
}