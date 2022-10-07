export default class ResetButton {
  scene: Phaser.Scene;
  emitter: Phaser.Events.EventEmitter;
  continue: boolean;

  constructor(
      scene: Phaser.Scene,
      emitter: Phaser.Events.EventEmitter
    ) {
    this.scene = scene;
    this.emitter = emitter;
    this.continue = false;

    let resetOuter = this.scene.add.rectangle(223 * 4, 111 * 4, 60 * 4, 29 * 4, 0xffffff).setInteractive();
    let resetInner = this.scene.add.rectangle(223 * 4, 111 * 4, 56 * 4, 25 * 4, 0x000).setInteractive();
    let resetText = this.scene.add.text(
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
    resetText.on('pointerup', this.handleClick, this);
    this.emitter.on('levelCleared', () => {
      resetText.setText('CONTINUE');
      this.continue = true;
    }, this);
  }

  handleClick() {
    if (this.continue) {
      this.emitter.emit('nextLevel');
    } else {
      this.scene.scene.restart({level: 1});
    }
  }
}