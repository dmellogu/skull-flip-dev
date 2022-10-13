export default class Tile extends Phaser.GameObjects.Sprite {
  row: number;
  col: number;
  emitter: Phaser.Events.EventEmitter;
  num: number;
  flipped: boolean;
  selected: boolean;
  flippedSprite: Phaser.GameObjects.Sprite | Phaser.GameObjects.Text;
  seeThroughSprite: Phaser.GameObjects.Sprite;

  constructor(
    scene: any,
    x: number,
    y: number,
    texture: string,
    data: object
  ) {
    super(scene, x, y, texture)
    this.setInteractive();
    this.setScale(4);
    this.setOrigin(0,0);
    this.row = data['row'];
    this.col = data['col'];
    this.emitter = data['emitter'];
    this.flipped = false;

    this.on('pointerup', this.tilePointerUp, this);
    this.emitter.on('tileFlip', this.tileFlipEvent, this);
    this.emitter.on('modalOpen', (b: boolean) => {
      (b) ? this.disableInteractive() : this.setInteractive();
    }, this);
    this.emitter.on('gameOver', () => {
      if (!this.flipped) {
        this.flipTile();
        this.seeThrough();
      }
    }, this);
    this.emitter.on('levelCleared', () => {
      if (!this.flipped) {
        this.flipTile();
        this.seeThrough();
      }
    }, this);
    this.emitter.on('rowColFlip', (type: string, pos: number) => {
      if (!this.flipped) {
        if (type === 'row' && this.row === pos) this.tilePointerUp();
        if (type === 'col' && this.col === pos) this.tilePointerUp();
      }
    }, this);
    this.emitter.on('setBoard', (board: number[])=> {
      if (this.flipped) {
        this.flipped = false;
        this.setTexture('tile');
      }
      if (this.flippedSprite) this.flippedSprite.destroy(true);
      if (this.seeThroughSprite) this.seeThroughSprite.destroy(true);
      this.num = board[(this.row * 5) + this.col]
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
      this.flippedSprite = this.scene.add.sprite(this.x, this.y, 'bigDeadTile').setOrigin(0).setScale(4);
    } else {
      this.flippedSprite = this.scene.add.text(
        this.x + 48,
        this.y + 14,
        `${this.num}`,
        {
          fontFamily: 'alagard',
          fontSize: '88px',
          color: '#222034',
          align: 'center'
        }
      ).setOrigin(0);
    }
  }

  tileFlipEvent(row: number, col: number) {
    if (row === this.row && col === this.col && !this.flipped) {
      this.tilePointerUp();
    }
  }

  seeThrough() {
    this.seeThroughSprite = this.scene.add.sprite(this.x, this.y, 'tile').setOrigin(0).setScale(4).setAlpha(0.5);
  }
}