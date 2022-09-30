export default class Tile extends Phaser.GameObjects.Sprite {
  row: number;
  col: number;
  emitter: Phaser.Events.EventEmitter;
  num: number;
  flipped: boolean;
  selected: boolean;

  constructor(
    scene: any,
    x: number,
    y: number,
    texture: string,
    data: object
  ) {
    super(scene, x, y, texture)
    this.setInteractive();
    this.row = data['row'];
    this.col = data['col'];
    this.emitter = data['emitter'];
    this.num = data['num'];
    this.flipped = false;

    this.on('pointerup', this.tilePointerUp, this);
    this.emitter.on('tileFlip', this.tileFlipEvent, this);
    this.emitter.on('modalOpen', (b: boolean) => {
      (b) ? this.disableInteractive() : this.setInteractive();
    }, this);
    this.emitter.on('gameOver', () => {
      if (!this.flipped) this.flipTile();
    }, this);
    this.emitter.on('levelCleared', () => {
      if (!this.flipped) this.flipTile();
    }, this);
  }

  tilePointerUp() {
    if (this.flipped) return;
    this.flipTile();
    if (this.num === 0) {
      this.emitter.emit('gameOver');
    } else if (this.num === 2) {
      this.emitter.emit('earnedPoint');
    } else if (this.num === 3) {
      this.emitter.emit('earnedPoint');
    }
    this.emitter.emit('tileFlip', this.row, this.col);
  }

  flipTile() {
    this.setTexture('flippedTile');
    this.flipped = true;
    if (this.num === 0) {
      this.scene.add.sprite(this.x, this.y, 'bigDeadTile');
    } else if (this.num === 1) {
      this.scene.add.sprite(this.x, this.y, 'bigOneTile');
    } else if (this.num === 2) {
      this.scene.add.sprite(this.x, this.y, 'bigTwoTile');
    } else if (this.num === 3) {
      this.scene.add.sprite(this.x, this.y, 'bigThreeTile');
    }
  }

  tileFlipEvent(row: number, col: number) {
    if (row === this.row && col === this.col && !this.flipped) {
      this.tilePointerUp();
    }
  }
}