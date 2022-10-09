export default class LevelDisplay {
  scene: Phaser.Scene;
  level: number;

  constructor(scene: Phaser.Scene, level: number) {
    this.scene = scene;
    this.level = level;

    let resetOuter = this.scene.add.rectangle(208 * 4, 15 * 4, 30 * 4, 30 * 4, 0xffffff);
    let resetInner = this.scene.add.rectangle(208 * 4, 15 * 4, 27 * 4, 27 * 4, 0x000);
    let resetText = this.scene.add.text(
      198 * 4,
      36,
      `Lv.${this.level}`,
      {
        fontFamily: 'alagard',
        fontSize: '44px',
        color: '#ffffff',
        align: 'center'
      }
    );
  }

  handleClick() {
    this.scene.scene.restart({level: 1});
  }
}