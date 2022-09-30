import Tile from '../objects/tile';
import Board from '../objects/board';
import ConnectButton from '../objects/connectButton';
import Toast from '../objects/toast';

export default class MainScene extends Phaser.Scene {
  tileGroup: Phaser.GameObjects.Group;
  uiGroup: Phaser.GameObjects.Group;
  emitter: Phaser.Events.EventEmitter;
  board: Board;
  toast: Toast;
  level: number;

  constructor() {
    super({ key: 'MainScene' });
    this.level
  }

  init(data) {
    console.log('init', data);
    (data.level) ? this.level = data.level : this.level = 0;
  }

  async create() {
    this.emitter = new Phaser.Events.EventEmitter();
    this.board = new Board(this.emitter, this);
    this.toast = new Toast(this.emitter, this);
    this.add.dom(223, 0, 'p', {
      // 'font': '14px Arial',
      'text-align': 'right',
      'color': '#e3dac9'
    }, `Level: ${this.level}`.padStart(2,'0'));
    
    this.input.keyboard.on('keydown-R', () => {
      this.scene.restart({level: 1});
    }, this);

    this.input.keyboard.on('keydown-W', () => {
      this.emitter.emit('levelCleared');
    }, this);

    this.emitter.on('nextLevel', () => {
      this.scene.restart({
        level: this.level + 1
      });
    }, this);
  }

  update() {
    
  }
}
