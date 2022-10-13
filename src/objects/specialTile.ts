export default class SpecialTile extends Phaser.GameObjects.Sprite {
    points: number;
    skulls: number;
    emitter: Phaser.Events.EventEmitter;
    skullSprite: Phaser.GameObjects.Sprite;
    pointsText: Phaser.GameObjects.Text;
    skullsText: Phaser.GameObjects.Text;
    type: string;
    pos: number;


    constructor(
      scene: any,
      x: number,
      y: number,
      texture: string,
      data: object
    ) {
      super(scene, x, y, texture);
      this.setInteractive();
      this.setScale(4);
      this.setOrigin(0,0);
      this.type = data['type'];
      this.pos = data['pos'];

      this.skullSprite = this.scene.add.sprite(this.x, this.y, 'deadTile').setScale(4);
      

      this.pointsText = this.scene.add.text(
        100,
        100,
        '00',
        {
          fontFamily: 'alagard',
          fontSize: '44px',
          color: '#222034',
          //color: '#e3dac9',
          align: 'right'
        }
      );
      this.skullsText = this.scene.add.text(
        100,
        100,
        '0',
        {
          fontFamily: 'alagard',
          fontSize: '44px',
          color: '#222034',
          //color: '#e3dac9',
          align: 'right'
        }
      );

      this.emitter = data['emitter'];

      this.emitter.on('reposition', ()=>{
        this.skullSprite.setX(this.x);
        this.skullSprite.setY(this.y);
        this.skullSprite.setOrigin(0);
        this.skullSprite.setDepth(1);

        this.pointsText.setX(this.x + 60);
        this.pointsText.setY(this.y + 8);
        this.pointsText.setDepth(1);

        this.skullsText.setX(this.x + 74);
        this.skullsText.setY(this.y + 60);
        this.skullsText.setDepth(1);
      }, this);

      this.on('pointerup', () => {
        this.emitter.emit('rowColFlip', this.type, this.pos);
      }, this);

      this.emitter.on('modalOpen', (b: boolean) => {
        (b) ? this.disableInteractive() : this.setInteractive();
      }, this);

      this.emitter.on('setBoard', (board: number[]) => {
        let points = 0;
        let skulls = 0;
        for (let i = 0; i < 5; i++) {
          let tmp: number = 0;
          if (this.type === 'row') tmp = board[(5 * this.pos) + i];
          else tmp = board[(5 * i) + this.pos];
          (tmp === 0) ? skulls += 1 : points += tmp;
        }
        this.pointsText.setText(`${points}`.padStart(2,'0'));
        this.skullsText.setText(`${skulls}`);
      }, this);
    }
  }