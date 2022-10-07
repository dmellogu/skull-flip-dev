export default class QuitButton {
  scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    let resetOuter = this.scene.add.rectangle(223 * 4, 143 * 4, 60 * 4, 29 * 4, 0xffffff).setInteractive();
    let resetInner = this.scene.add.rectangle(223 * 4, 143 * 4, 56 * 4, 25 * 4, 0x000).setInteractive();
    let resetText = this.scene.add.text(
      198 * 4,
      134 * 4,
      'QUIT',
      {
        fontFamily: 'alagard',
        fontSize: '55px',
        color: '#ffffff',
        align: 'center'
      }
    ).setInteractive();
    
    resetOuter.on('pointerup', this.handleClick, this);
    resetInner.on('pointerup', this.handleClick, this);
    resetText.on('pointerup', this.handleClick, this);
  }

  handleClick() {
    console.log('main menu needs to be worked on first!')
  }
}