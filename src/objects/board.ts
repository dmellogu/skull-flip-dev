import Tile from './tile';

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
      cellWidth: 32,
      cellHeight: 32,
      position: Phaser.Display.Align.TOP_LEFT,
      x: 18,
      y: 17
    });
  }

  createHorizontalCountGroup() {
    // background tile
    let horizontalCountGroup: Phaser.GameObjects.Group = this.scene.add.group();
    horizontalCountGroup.add(this.scene.add.sprite(100, 100, 'redTile'));
    horizontalCountGroup.add(this.scene.add.sprite(100, 100, 'greenTile'));
    horizontalCountGroup.add(this.scene.add.sprite(100, 100, 'orangeTile'));
    horizontalCountGroup.add(this.scene.add.sprite(100, 100, 'blueTile'));
    horizontalCountGroup.add(this.scene.add.sprite(100, 100, 'purpleTile'));
    Phaser.Actions.GridAlign(horizontalCountGroup.getChildren(), {
      width: 5,
      height: 1,
      cellWidth: 32,
      cellHeight: 32,
      position: Phaser.Display.Align.BOTTOM_LEFT,
      x: 18,
      y: 175
    });

    // small skull
    let smallSkullGroup: Phaser.GameObjects.Group = this.scene.add.group();
    for (let i = 0; i < 5; i++) smallSkullGroup.add(this.scene.add.sprite(100, 100, 'deadTile'));
    Phaser.Actions.GridAlign(smallSkullGroup.getChildren(), {
      width: 5,
      height: 1,
      cellWidth: 32,
      cellHeight: 32,
      position: Phaser.Display.Align.BOTTOM_LEFT,
      x: 18,
      y: 175
    });

    // points
    let horizontalNumGroup: Phaser.GameObjects.Group = this.scene.add.group();
    for (let col = 0; col < 5; col++) {
      let sum = 0;
      for (let row = 0; row < 5; row++) {
        sum += this.nums[(5 * row) + col]
      }
      horizontalNumGroup.add(this.scene.add.dom(100, 100, 'p', this.style, `${sum}`.padStart(2,'0')));
    }
    Phaser.Actions.GridAlign(horizontalNumGroup.getChildren(), {
      width: 5,
      height: 1,
      cellWidth: 32,
      cellHeight: 32,
      position: Phaser.Display.Align.BOTTOM_LEFT,
      x: 25.5,
      y: 147.5
    });

    // skulls
    let horizontalSkullGroup: Phaser.GameObjects.Group = this.scene.add.group();
    for (let col = 0; col < 5; col++) {
      let sum = 0;
      for (let row = 0; row < 5; row++) {
        if (this.nums[(5 * row) + col] === 0) sum += 1;
      }
      horizontalSkullGroup.add(this.scene.add.dom(100, 100, 'p', this.style, `${sum}`));
    }
    Phaser.Actions.GridAlign(horizontalSkullGroup.getChildren(), {
      width: 5,
      height: 1,
      cellWidth: 32,
      cellHeight: 32,
      position: Phaser.Display.Align.BOTTOM_LEFT,
      x: 37,
      y: 160.5
    });
  }

  createVerticalCountGroup() {
    // background tile
    let verticalCountGroup: Phaser.GameObjects.Group = this.scene.add.group();
    verticalCountGroup.add(this.scene.add.sprite(100, 100, 'redTile'));
    verticalCountGroup.add(this.scene.add.sprite(100, 100, 'greenTile'));
    verticalCountGroup.add(this.scene.add.sprite(100, 100, 'orangeTile'));
    verticalCountGroup.add(this.scene.add.sprite(100, 100, 'blueTile'));
    verticalCountGroup.add(this.scene.add.sprite(100, 100, 'purpleTile'));
    Phaser.Actions.GridAlign(verticalCountGroup.getChildren(), {
      width: 1,
      height: 5,
      cellWidth: 32,
      cellHeight: 32,
      position: Phaser.Display.Align.BOTTOM_LEFT,
      x: 178,
      y: 15
    });

    // small skull
    let smallSkullGroup: Phaser.GameObjects.Group = this.scene.add.group();
    for (let i = 0; i < 5; i++) smallSkullGroup.add(this.scene.add.sprite(100, 100, 'deadTile'));
    Phaser.Actions.GridAlign(smallSkullGroup.getChildren(), {
      width: 1,
      height: 5,
      cellWidth: 32,
      cellHeight: 32,
      position: Phaser.Display.Align.BOTTOM_LEFT,
      x: 178,
      y: 15
    });

    // points
    let verticalNumGroup: Phaser.GameObjects.Group = this.scene.add.group();
    for (let row = 0; row < 5; row++) {
      let sum = 0;
      for (let col = 0; col < 5; col++) {
        sum += this.nums[(5 * row) + col]
      }
      verticalNumGroup.add(this.scene.add.dom(100, 100, 'p', this.style, `${sum}`.padStart(2,'0')));
    }
    Phaser.Actions.GridAlign(verticalNumGroup.getChildren(), {
      width: 1,
      height: 5,
      cellWidth: 32,
      cellHeight: 32,
      position: Phaser.Display.Align.BOTTOM_LEFT,
      x: 185.5,
      y: -12.5
    });

    // skulls
    let verticalSkullGroup: Phaser.GameObjects.Group = this.scene.add.group();
    for (let row = 0; row < 5; row++) {
      let sum = 0;
      for (let col = 0; col < 5; col++) {
        if (this.nums[(5 * row) + col] === 0) sum += 1;
      }
      verticalSkullGroup.add(this.scene.add.dom(100, 100, 'p', this.style, `${sum}`));
    }
    Phaser.Actions.GridAlign(verticalSkullGroup.getChildren(), {
      width: 1,
      height: 5,
      cellWidth: 32,
      cellHeight: 32,
      position: Phaser.Display.Align.BOTTOM_LEFT,
      x: 197,
      y: 0.5
    });
  }
}

// var style = {
//   'font': '20px Cozette'
// };
// this.scene.add.dom(this.x - 0.5, this.y - 18, 'p', style, `${this.num}`);