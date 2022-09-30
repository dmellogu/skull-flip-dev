export default class MainMenu extends Phaser.Scene {
  element: Phaser.GameObjects.DOMElement;

  constructor() {
    super({ key: 'MainMenu' });
  }

  create() {
    this.add.sprite(
      this.cameras.main.width * (1/4),
      this.cameras.main.height / 2,
      'bigDeadTile'
    ).setScale(3);
    this.element = this.add.dom(
      this.cameras.main.width * (3/4),
      this.cameras.main.height / 2
    )
    .createFromCache('mainMenu')
    .setScale(0.5);
    this.element.addListener('click');
    this.element.on('click', (event) => {
      event.preventDefault();
      if (event.target.name === 'onePlayer')
      {
        this.scene.start('MainScene', {level: 1});
      } else if (event.target.name === 'twoPlayers') {
        console.log('2 players');
      } else if (event.target.name === 'howToPlay') {
        console.log('how to play');
      }
    });
  }

  update() {
  }
}
