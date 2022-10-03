import Tile from './tile';
import SpecialTile from './specialTile';

export default class Board {
  nums: number[];
  emitter: Phaser.Events.EventEmitter;
  scene: Phaser.Scene;
  style: object;
  pointsNeeded: number;
  earnedPoints: number;

  constructor(
    emitter: Phaser.Events.EventEmitter,
    scene: Phaser.Scene
    ) {
    this.emitter = emitter;
    this.scene = scene;
    this.nums = Array.from({length: 25}, () => Math.floor(Math.random() * 4));
    this.pointsNeeded = 0;
    this.earnedPoints = 0;
    this.style = {
      'font': '14px Cozette',
      'text-align': 'right',
      'color': '#222034'
    };

    this.createTileGroup();
    this.createHorizontalCountGroup();
    this.createVerticalCountGroup();
    this.emitter.on('earnedPoint', () => {
      this.earnedPoints += 1;
      if (this.earnedPoints === this.pointsNeeded) this.emitter.emit('levelCleared');
    }, this);
  }

  createTileGroup() {
    let tileGroup: Phaser.GameObjects.Group = this.scene.add.group();
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        if (this.nums[(row * 5) + col] === 2 || this.nums[(row * 5) + col] === 3) {
          this.pointsNeeded += 1;
        }
        let tile = new Tile(this.scene, 100, 100, 'tile', {
          row: row,
          col: col,
          emitter: this.emitter,
          num: this.nums[(row * 5) + col]
        });
        this.scene.add.existing(tile);
        tileGroup.add(tile);
      }
    }
    Phaser.Actions.GridAlign(tileGroup.getChildren(), {
      width: 5,
      height: 5,
      cellWidth: 32 * 4,
      cellHeight: 32 * 4,
      position: Phaser.Display.Align.TOP_LEFT,
      x: 64 + 1,
      y: 64 + 1
    });
  }

  createHorizontalCountGroup() {
    let horizontalNumGroup: Phaser.GameObjects.Group = this.scene.add.group();
    for (let col = 0; col < 5; col++) {
      let points = 0;
      let skulls = 0;
      for (let row = 0; row < 5; row++) {
        let tmp = this.nums[(5 * row) + col];
        (tmp === 0) ? skulls += 1 : points += tmp;
      }
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
      horizontalNumGroup.add(
        this.scene.add.existing(
          new SpecialTile(this.scene, 100, 100, texture, {
            emitter: this.emitter,
            points: points,
            skulls: skulls
          })
        )
      );
    }
    Phaser.Actions.GridAlign(horizontalNumGroup.getChildren(), {
      width: 5,
      height: 1,
      cellWidth: 32 * 4,
      cellHeight: 32 * 4,
      position: Phaser.Display.Align.BOTTOM_LEFT,
      x: 64 + 1,
      y: 608 + 1
    });
    this.emitter.emit('reposition');
  }

  createVerticalCountGroup() { // 178 15
    let verticalNumGroup: Phaser.GameObjects.Group = this.scene.add.group();
    for (let row = 0; row < 5; row++) {
      let points = 0;
      let skulls = 0;
      for (let col = 0; col < 5; col++) {
        let tmp = this.nums[(5 * row) + col];
        (tmp === 0) ? skulls += 1 : points += tmp;
      }
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
      verticalNumGroup.add(
        this.scene.add.existing(
          new SpecialTile(this.scene, 100, 100, texture, {
            emitter: this.emitter,
            points: points,
            skulls: skulls
          })
        )
      );
    }
    Phaser.Actions.GridAlign(verticalNumGroup.getChildren(), {
      width: 1,
      height: 5,
      cellWidth: 32 * 4,
      cellHeight: 32 * 4,
      position: Phaser.Display.Align.BOTTOM_LEFT,
      x: 704 + 1,
      y: -34 + 1
    });
    this.emitter.emit('reposition');
  }
}

// var style = {
//   'font': '20px Cozette'
// };
// this.scene.add.dom(this.x - 0.5, this.y - 18, 'p', style, `${this.num}`);