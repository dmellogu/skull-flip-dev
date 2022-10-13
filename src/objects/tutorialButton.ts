export default class TutorialButton {
  scene: Phaser.Scene;
  emitter: Phaser.Events.EventEmitter;
  element: Phaser.GameObjects.DOMElement;
  clickable: boolean;

  constructor(
    scene: Phaser.Scene,
    emitter: Phaser.Events.EventEmitter
    ) {
    this.scene = scene;
    this.emitter = emitter;
    this.clickable = true;

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
    this.handleClick();
  }

  handleClick() {
    console.log(`clickable begin = ${this.clickable}`);
    if (this.clickable) {
      this.clickable = false;
    } else {
      return;
    }
    this.emitter.emit('modalOpen', true);
    //if (this.element) this.removeElement();
    this.element = this.scene.add.dom(
      947,
      70
    ).createFromCache('tutorial').setScale(0.13,0.27);
    this.scene.tweens.add({ 
      targets: this.element,
      scaleX: 1,
      scaleY: 1,
      x: this.scene.cameras.main.worldView.x + this.scene.cameras.main.width / 2,
      y: this.scene.cameras.main.worldView.y + this.scene.cameras.main.height / 2,
      alpha: {
        getStart: () => 0.1,
        getEnd: () => 1
      },
      duration: 1000,
      ease: 'Power3',
      onComplete: () =>
      {
        console.log('open');
      }
    });
    //this.element.setPerspective(800);
    this.element.addListener('click');
    this.element.on('click', (event) => {
      event.preventDefault();
        if (event.target.name === 'close') {
          this.emitter.emit('modalOpen', false);
          this.scene.tweens.add({ 
            targets: this.element,
            scaleX: 0.13,
            scaleY: 0.27,
            x: 947,
            y: 70,
            alpha: {
              getStart: () => 1,
              getEnd: () => 0
            },
            duration: 1500,
            ease: 'Power3',
            onComplete: () =>
            {
              console.log('closed');
              this.removeElement();
            }
          });
        }
    });
  }

  removeElement() {
    this.element.removeListener('click');
    this.element.removeElement();
    //this.element.destroy(true);
    console.log(`clickable end = ${this.clickable}`);
    this.clickable = true;
  }
}