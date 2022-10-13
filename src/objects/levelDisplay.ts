export default class LevelDisplay {
  scene: Phaser.Scene;
  emitter: Phaser.Events.EventEmitter;
  level: number;

  constructor(scene: Phaser.Scene, emitter: Phaser.Events.EventEmitter, level: number) {
    this.scene = scene;
    this.emitter = emitter;
    this.level = level;

    this.scene.add.rectangle(208 * 4, 15 * 4, 30 * 4, 30 * 4, 0xffffff);
    this.scene.add.rectangle(208 * 4, 15 * 4, 27 * 4, 27 * 4, 0x000);
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

    this.emitter.on('nextLevel', () => {
      this.level += 1;
      resetText.setText(`Lv.${this.level}`);
    }, this);

    this.emitter.on('reset', () => {
      this.level = 1;
      resetText.setText(`Lv.${this.level}`);
    }, this);
  }
}