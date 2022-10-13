import Tile from './tile';
import SpecialTile from './specialTile';

export default class Board {
  nums: number[];
  emitter: Phaser.Events.EventEmitter;
  scene: Phaser.Scene;
  style: object;
  pointsNeeded: number;
  earnedPoints: number;
  tileGroup: Phaser.GameObjects.Group;
  horizontalGroup: Phaser.GameObjects.Group;
  verticalGroup: Phaser.GameObjects.Group;


  constructor(
    emitter: Phaser.Events.EventEmitter,
    scene: Phaser.Scene,
    nums: number[]
    ) {
    this.emitter = emitter;
    this.scene = scene;
    this.pointsNeeded = 0;
    this.earnedPoints = 0;

    this.createTileGroup();
    this.createHorizontalCountGroup();
    this.createVerticalCountGroup();
    this.init(nums)
    
    this.emitter.on('earnedPoint', () => {
      this.earnedPoints += 1;
      if (this.earnedPoints === this.pointsNeeded) this.emitter.emit('levelCleared');
    }, this);

    this.emitter.on('setBoard', (board: number[])=> {
      this.earnedPoints = 0;
    }, this);

    this.emitter.on('reset', () => {
      this.init(Array.from({length: 25}, () => Math.floor(Math.random() * 4)));
    }, this);

    this.emitter.on('nextLevel', () => {
      this.init(Array.from({length: 25}, () => Math.floor(Math.random() * 4)));
    }, this);
  }

  init(nums: number[]) {
    this.nums = nums;
    this.pointsNeeded = 0;
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        if (this.nums[(row * 5) + col] === 2 || this.nums[(row * 5) + col] === 3) {
          this.pointsNeeded += 1;
        }
      }
    }
    this.emitter.emit('setBoard', nums);
  }

  createTileGroup() {
    this.tileGroup = this.scene.add.group();
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        let tile = new Tile(this.scene, 100, 100, 'tile', {
          row: row,
          col: col,
          emitter: this.emitter
        });
        this.scene.add.existing(tile);
        this.tileGroup.add(tile);
      }
    }
    Phaser.Actions.GridAlign(this.tileGroup.getChildren(), {
      width: 5,
      height: 5,
      cellWidth: 32 * 4,
      cellHeight: 32 * 4,
      position: Phaser.Display.Align.TOP_LEFT,
      x: 64 + 4,
      y: 64 + 1
    });
  }

  createHorizontalCountGroup() {
    this.horizontalGroup = this.scene.add.group();
    for (let col = 0; col < 5; col++) {
      let texture = '';
      if (col === 0) {
        texture = 'redTile';
      } else if (col === 1) {
        texture = 'greenTile';
      } else if (col === 2) {
        texture = 'orangeTile';
      } else if (col === 3) {
        texture = 'blueTile';
      } else if (col === 4) {
        texture = 'purpleTile';
      }
      this.horizontalGroup.add(
        this.scene.add.existing(
          new SpecialTile(this.scene, 100, 100, texture, {
            emitter: this.emitter,
            type: 'col',
            pos: col
          })
        )
      );
    }
    Phaser.Actions.GridAlign(this.horizontalGroup.getChildren(), {
      width: 5,
      height: 1,
      cellWidth: 32 * 4,
      cellHeight: 32 * 4,
      position: Phaser.Display.Align.BOTTOM_LEFT,
      x: 64 + 4,
      y: 608 + 1
    });
    this.emitter.emit('reposition');
  }

  createVerticalCountGroup() {
    this.verticalGroup = this.scene.add.group();
    for (let row = 0; row < 5; row++) {
      let texture = '';
      if (row === 0) {
        texture = 'redTile';
      } else if (row === 1) {
        texture = 'greenTile';
      } else if (row === 2) {
        texture = 'orangeTile';
      } else if (row === 3) {
        texture = 'blueTile';
      } else if (row === 4) {
        texture = 'purpleTile';
      }
      this.verticalGroup.add(
        this.scene.add.existing(
          new SpecialTile(this.scene, 100, 100, texture, {
            emitter: this.emitter,
            type: 'row',
            pos: row
          })
        )
      );
    }
    Phaser.Actions.GridAlign(this.verticalGroup.getChildren(), {
      width: 1,
      height: 5,
      cellWidth: 32 * 4,
      cellHeight: 32 * 4,
      position: Phaser.Display.Align.BOTTOM_LEFT,
      x: 704 + 4,
      y: -34 + 1
    });
    this.emitter.emit('reposition');
  }
}
