import Board from '../objects/board';
import Toast from '../objects/toast';
import ResetButton from '../objects/resetButton';
import QuitButton from '../objects/quitButton';
import LevelDisplay from '../objects/levelDisplay';
import { sfx } from '../objects/sfx';
import ConnectBtn from '../objects/connectBtn';
import TutorialButton from '../objects/tutorialButton';

export default class MainScene extends Phaser.Scene {
  emitter: Phaser.Events.EventEmitter;
  level: number;

  constructor() {
    super({ key: 'MainScene' });
    this.level
  }

  init(data: any) {
    (data.level) ? this.level = data.level : this.level = 0;
  }

  async create() {
    // Add systems
    this.emitter = new Phaser.Events.EventEmitter();
    new Board(this.emitter, this);
    new Toast(this.emitter, this);
    new LevelDisplay(this, this.level);
    new ResetButton(this, this.emitter);
    //new QuitButton(this);
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

    // High-level next level logic
    this.emitter.on('nextLevel', () => {
      this.scene.restart({
        level: this.level + 1
      });
    }, this);
  }
}
