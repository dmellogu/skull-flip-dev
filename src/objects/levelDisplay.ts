export default class LevelDisplay {
  scene: Phaser.Scene;
  level: number;

  constructor(scene: Phaser.Scene, level: number) {
    this.scene = scene;
    this.level = level;

    let resetOuter = this.scene.add.rectangle(223 * 4, 16 * 4, 60 * 4, 29 * 4, 0xffffff);
    let resetInner = this.scene.add.rectangle(223 * 4, 16 * 4, 56 * 4, 25 * 4, 0x000);
    let resetText = this.scene.add.text(
      198 * 4,
      32,
      `LEVEL ${this.level}`,
      {
        fontFamily: 'alagard',
        fontSize: '55px',
        color: '#ffffff',
        align: 'center'
      }
    );
  }

  handleClick() {
    this.scene.scene.restart({level: 1});
  }
}