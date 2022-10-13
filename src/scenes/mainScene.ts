import Board from '../objects/board';
import Toast from '../objects/toast';
import ResetButton from '../objects/resetButton';
import LevelDisplay from '../objects/levelDisplay';
import { sfx } from '../objects/sfx';
import ConnectBtn from '../objects/connectBtn';
import TutorialButton from '../objects/tutorialButton';

export default class MainScene extends Phaser.Scene {
  emitter: Phaser.Events.EventEmitter;
  //level: number;

  constructor() {
    super({ key: 'MainScene' });
  }

  // This is how to pass data to a new scene
  // init(data: any) {
  //   (data.level) ? this.level = data.level : this.level = 0;
  // }

  async create() {
    // Add systems
    this.emitter = new Phaser.Events.EventEmitter();
    new Board(this.emitter, this, Array.from({length: 25}, () => Math.floor(Math.random() * 4)));
    new Toast(this.emitter, this);
    new LevelDisplay(this, this.emitter, 1);
    new ResetButton(this, this.emitter);
    new ConnectBtn(this, this.emitter);
    new TutorialButton(this, this.emitter);
    sfx(this);

    // Add debugging hotkeys
    this.input.keyboard.on('keydown-R', () => {
      this.scene.restart({level: 1});
    }, this);
    this.input.keyboard.on('keydown-W', () => {
      this.emitter.emit('levelCleared');
    }, this);
  }
}
