import { Peer } from 'peerjs';

export default class ConnectBtn {
  scene: Phaser.Scene;
  peer;
  userId: string;
  conn;
  emitter: Phaser.Events.EventEmitter;
  element: Phaser.GameObjects.DOMElement;

  constructor(
      scene: Phaser.Scene,
      emitter: Phaser.Events.EventEmitter
    ) {
    this.scene = scene;
    let resetOuter = this.scene.add.rectangle(223 * 4, 143 * 4, 60 * 4, 29 * 4, 0xffffff).setInteractive();
    let resetInner = this.scene.add.rectangle(223 * 4, 143 * 4, 56 * 4, 25 * 4, 0x000).setInteractive();
    let resetText = this.scene.add.text(
      198 * 4,
      134 * 4,
      'CONNECT',
      {
        fontFamily: 'alagard',
        fontSize: '44px',
        color: '#ffffff',
        align: 'center'
      }
    ).setInteractive();
    
    resetOuter.on('pointerup', this.handleClick, this);
    resetInner.on('pointerup', this.handleClick, this);
    resetText.on('pointerup', this.handleClick, this);

    // TODO: Implement Co-op
    // this.init();
    // this.emitter = emitter;
    // this.emitter.on('tileFlip', this.tileFlip, this);
  }

  handleClick() {
    console.log('WIP!');
    //this.addFriendModal();
  }

  async init() {
    await this.getUserId();
    this.receiverConn();
  }

  async getUserId() {
    this.peer = new Peer();
    await this.peer.on('open', (id) => {
      console.log('My peer ID is: ' + id);
      this.userId = id;
    });
  }

  receiverConn() {
    this.peer.on("connection", (conn) => {
      if (!this.conn) {
        this.conn = conn;
      }
      this.conn.on("data", (data) => {
        if (typeof data === 'string') {
          console.log(data);
        } else if (data['type']) {
          if (data['type'] === 'tileFlip') {
            this.emitter.emit('tileFlip', data['row'], data['col']);
          } 
        }
      });
      this.conn.on("open", () => {
        this.conn.send("hello!");
        if (this.element) this.removeFriendModal();
      });
    });
  }

  senderConn(friendId: string) {
    // Close old connection
    if (this.conn) {
      this.conn.close();
    }
    this.conn = this.peer.connect(friendId, {reliable: true});
    this.conn.on("open", () => {
      this.conn.send("hi!");
      if (this.element) this.removeFriendModal();
    });
    this.conn.on('data', (data) => {
      if (typeof data === 'string') {
        console.log(data);
      } else if (data['type']) {
        if (data['type'] === 'tileFlip') {
          this.emitter.emit('tileFlip', data['row'], data['col']);
        } 
      }
    });
    this.conn.on('close', function () {
      alert("Connection closed");
    });
  }

  addFriendModal() {
    this.emitter.emit('modalOpen', true);
    this.element = this.scene.add.dom(
      this.scene.cameras.main.worldView.x + this.scene.cameras.main.width / 2,
      this.scene.cameras.main.worldView.y + this.scene.cameras.main.height / 2
    ).createFromCache('connectForm').setScale(2);
    var inputUserId = this.element.getChildByName('userId');
    inputUserId.setAttribute('value', this.userId);
    this.element.setPerspective(800);
    this.element.addListener('click');
    this.element.on('click', (event) => {
      event.preventDefault();
        if (event.target.name === 'connect')
        {
            var friendId = this.element.getChildByName('friendId') as HTMLInputElement;
            //  Have they entered anything?
            if (friendId.value !== '')
            {
              this.senderConn(friendId.value);
              //  Turn off the click events
              this.removeFriendModal();
            }
        } else if (event.target.name === 'close') {
          this.removeFriendModal();
        } else if (event.target.name === 'clipboard') {
          if (navigator.clipboard) {
            navigator.clipboard.writeText(this.userId);
            console.log('Your ID has been copied to your Clipboard!');
          }
        }
    });
  }

  removeFriendModal() {
    this.element.removeListener('click');
    this.element.removeElement();
    this.emitter.emit('modalOpen', false);
  }

  tileFlip(row: number, col: number) {
    if (this.conn){
      this.conn.send({
        "type": "tileFlip",
        "row": row,
        "col": col
      });
    }
  }
}