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

    // Add UI borders
    this.scene.add.rectangle(223 * 4, 63 * 4, 60 * 4, 61 * 4, 0xffffff);
    this.scene.add.rectangle(223 * 4, 63 * 4, 56 * 4, 57 * 4, 0x000);

    this.emitter.on('levelCleared', this.levelCleared, this);
    this.emitter.on('gameOver', this.gameOver, this);
  }

  gameOver() {
    if (this.stopper) return;
    this.stopper = true;
    console.log('game over');
    let gameOverText = this.scene.add.text(
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
    // let element = this.scene.add.dom(
    //   this.scene.cameras.main.width * (7/8),
    //   this.scene.cameras.main.height / 2
    // )
    // .createFromCache('gameOver')
    // .setScale(0.5);
    // element.addListener('click');
    // element.on('click', (event) => {
    //   event.preventDefault();
    //   if (event.target.name === 'quitBtn')
    //   {
    //     this.scene.scene.start('MainMenu');
    //   } else if (event.target.name === 'resetBtn') {
    //     this.scene.scene.restart({level: 1});
    //   }
    // });
  }

  levelCleared() {
    if (this.stopper) return;
    this.stopper = true;
    console.log('level cleared');
    let gameOverText = this.scene.add.text(
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
    // let element = this.scene.add.dom(
    //   this.scene.cameras.main.width * (7/8),
    //   this.scene.cameras.main.height / 2
    // )
    // .createFromCache('levelCleared')
    // .setScale(0.5);
    // element.addListener('click');
    // element.on('click', (event) => {
    //   event.preventDefault();
    //   if (event.target.name === 'quitBtn')
    //   {
    //     this.scene.scene.start('MainMenu');
    //   } else if (event.target.name === 'resetBtn') {
    //     this.emitter.emit('nextLevel');
    //   }
    // });
  }
}