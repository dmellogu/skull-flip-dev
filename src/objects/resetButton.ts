export default class ResetButton {
  scene: Phaser.Scene;
  emitter: Phaser.Events.EventEmitter;
  continue: boolean;
  resetText: Phaser.GameObjects.Text;

  constructor(
      scene: Phaser.Scene,
      emitter: Phaser.Events.EventEmitter
    ) {
    this.scene = scene;
    this.emitter = emitter;
    this.continue = false;

    let resetOuter = this.scene.add.rectangle(223 * 4, 111 * 4, 60 * 4, 29 * 4, 0xffffff).setInteractive();
    let resetInner = this.scene.add.rectangle(223 * 4, 111 * 4, 56 * 4, 25 * 4, 0x000).setInteractive();
    this.resetText = this.scene.add.text(
      198 * 4,
      102 * 4,
      'RESET',
      {
        fontFamily: 'alagard',
        fontSize: '44px',
        color: '#ffffff',
        align: 'center'
      }
    ).setInteractive();
    
    resetOuter.on('pointerup', this.handleClick, this);
    resetInner.on('pointerup', this.handleClick, this);
    this.resetText.on('pointerup', this.handleClick, this);
    this.emitter.on('levelCleared', () => {
      this.resetText.setText('CONTINUE');
      this.continue = true;
    }, this);
  }

  handleClick() {
    if (this.continue) {
      this.resetText.setText('RESET');
      this.continue = false;
      this.emitter.emit('nextLevel');
    } else {
      //this.scene.scene.restart();
      this.emitter.emit('reset');
    }
  }
}