// @ts-nocheck
import Tile from '../objects/tile';
import Board from '../objects/board';
import ConnectButton from '../objects/connectButton';
import Toast from '../objects/toast';
import { Scene } from 'phaser';
import ResetButton from '../objects/resetButton';
import QuitButton from '../objects/quitButton';
import LevelDisplay from '../objects/levelDisplay';

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

    // Add UI borders
    let toastOuter = this.add.rectangle(223 * 4, 63 * 4, 60 * 4, 61 * 4, 0xffffff);
    let toastInner = this.add.rectangle(223 * 4, 63 * 4, 56 * 4, 57 * 4, 0x000);

    this.add.existing(new LevelDisplay(this, this.level));
    this.add.existing(new ResetButton(this));
    this.add.existing(new QuitButton(this));

    // this.add.dom(223 * 4, 2 * 4, 'p', {
    //   'font': '14px Cozette',
    //   'text-align': 'right',
    //   'color': '#e3dac9'
    // }, `Level: ${this.level}`.padStart(2,'0'));
    
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

    let pipelineInstance = this.plugins.get('rexhorrifipipelineplugin');
    pipelineInstance.add(this.cameras.main, {
      enable: false,
  
      // Bloom
      bloomEnable: true,
      bloomRadius: 0.5, bloomIntensity: 0.5, bloomThreshold: 0.5,
      bloomTexelWidth: 0.5, bloomTexelHeight: 0.5,
  
      // Chromatic abberation
      chromaticEnable: true,
      chabIntensity: 0.2,
  
      // Vignette
      vignetteEnable: true,
      vignetteStrength: 1, vignetteIntensity: 0.3,
  
      // Noise
      noiseEnable: true,
      noiseStrength: 0.15,
      noiseSeed: 0.5,
  
      // VHS
      vhsEnable: true,
      vhsStrength: 0.5,
  
      // Scanlines
      scanlinesEnable: false,
      scanStrength: 0.1,
  
      // CRT
      crtEnable: true,
      crtWidth: 5, crtHeight: 5,
  
      // name: 'rexHorrifiPostFx'
  });
  }

  update() {
    
  }
}
