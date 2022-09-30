export default class Toast {
  emitter: Phaser.Events.EventEmitter;
  scene: Phaser.Scene;
  element: Phaser.GameObjects.DOMElement;
  stopper: Boolean;

  constructor (
    emitter: Phaser.Events.EventEmitter,
    scene: Phaser.Scene
  ){
    this.emitter = emitter;
    this.scene = scene;
    this.stopper = false;

    this.emitter.on('levelCleared', this.levelCleared, this);
    this.emitter.on('gameOver', this.gameOver, this);
  }

  gameOver() {
    if (this.stopper) return;
    this.stopper = true;
    console.log('game over');
    let element = this.scene.add.dom(
      this.scene.cameras.main.width * (7/8),
      this.scene.cameras.main.height / 2
    )
    .createFromCache('gameOver')
    .setScale(0.5);
    element.addListener('click');
    element.on('click', (event) => {
      event.preventDefault();
      if (event.target.name === 'quitBtn')
      {
        this.scene.scene.start('MainMenu');
      } else if (event.target.name === 'resetBtn') {
        this.scene.scene.restart({level: 1});
      }
    });
  }

  levelCleared() {
    if (this.stopper) return;
    this.stopper = true;
    console.log('level cleared');
    let element = this.scene.add.dom(
      this.scene.cameras.main.width * (7/8),
      this.scene.cameras.main.height / 2
    )
    .createFromCache('levelCleared')
    .setScale(0.5);
    element.addListener('click');
    element.on('click', (event) => {
      event.preventDefault();
      if (event.target.name === 'quitBtn')
      {
        this.scene.scene.start('MainMenu');
      } else if (event.target.name === 'resetBtn') {
        this.emitter.emit('nextLevel');
      }
    });
  }
}