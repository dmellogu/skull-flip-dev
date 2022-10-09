export default class TutorialButton {
  scene: Phaser.Scene;
  emitter: Phaser.Events.EventEmitter;
  element: Phaser.GameObjects.DOMElement;

  constructor(
    scene: Phaser.Scene,
    emitter: Phaser.Events.EventEmitter
    ) {
    this.scene = scene;
    this.emitter = emitter;

    let outer = this.scene.add.rectangle(240 * 4, 15 * 4, 30 * 4, 30 * 4, 0xffffff).setInteractive();
    let inner = this.scene.add.rectangle(240 * 4, 15 * 4, 27 * 4, 27 * 4, 0x000).setInteractive();
    let text = this.scene.add.text(
      236 * 4,
      26,
      '?',
      {
        fontFamily: 'alagard',
        fontSize: '66px',
        color: '#ffffff',
        align: 'center'
      }
    ).setInteractive();

    outer.on('pointerup', this.handleClick, this);
    inner.on('pointerup', this.handleClick, this);
    text.on('pointerup', this.handleClick, this);
  }

  handleClick() {
    this.emitter.emit('modalOpen', true);
    this.element = this.scene.add.dom(
      this.scene.cameras.main.worldView.x + this.scene.cameras.main.width / 2,
      this.scene.cameras.main.worldView.y + this.scene.cameras.main.height / 2
    ).createFromCache('tutorial');
    this.element.setPerspective(800);
    this.element.addListener('click');
    this.element.on('click', (event) => {
      event.preventDefault();
        if (event.target.name === 'close') {
          this.element.removeListener('click');
          this.element.removeElement();
          this.emitter.emit('modalOpen', false);
        }
    });
  }
}