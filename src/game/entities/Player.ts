export class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string | Phaser.Textures.Texture,
    frame?: string | number
  ) {
    super(scene, x, y, texture, frame);

    this.setData("speed", 400);

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.getBody().setCollideWorldBounds(true);

    scene.input.on("pointermove", this.movePlayer.bind(this));
  }

  update() {
    this.getBody().setVelocity(0);
  }

  public movePlayer(pointer: Phaser.Input.Pointer) {
    this.setX(pointer.x);
    this.setY(pointer.y);
  }

  public getBody() {
    return this.body as Phaser.Physics.Arcade.Body;
  }
}

