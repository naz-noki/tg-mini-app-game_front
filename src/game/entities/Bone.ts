import { EventBus } from "../../utils";
import { GameScene } from "../scenes";

export class Bone extends Phaser.Physics.Arcade.Sprite {
  private gameScene: Phaser.Scene;
  public boneGroup: Phaser.GameObjects.Group;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string | Phaser.Textures.Texture,
    frame?: string | number
  ) {
    super(scene, x, y, texture, frame);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.gameScene = scene;

    this.boneGroup = scene.physics.add.group({
      defaultKey: "bone",
      maxSize: 150,
    });

    scene.time.addEvent({
      delay: 500,
      loop: true,
      callback: () => this.addBone(),
    });
  }

  update() {
    Phaser.Actions.IncY(this.boneGroup.getChildren(), 1);

    this.removalBeyondBordersWorld();
  }

  private addBone() {
    const x = Phaser.Math.Between(20, this.gameScene.game.scale.width - 20);
    const y = Phaser.Math.Between(-25, 0);
    const rotationRadians = Phaser.Math.Between(0, 3);

    const bone = this.boneGroup.get(x, y) as Phaser.GameObjects.Sprite | null;

    if (!bone) return;

    this.getBoneBody(bone).setVelocity(0, 200);

    bone.setRotation(rotationRadians);

    this.activateBone(bone);
  }

  private activateBone(bone: Phaser.GameObjects.Sprite) {
    bone.setActive(true).setVisible(true);
  }

  public collectBone(
    _player:
      | Phaser.Types.Physics.Arcade.GameObjectWithBody
      | Phaser.Tilemaps.Tile,
    bone: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile
  ) {
    if (this.gameScene instanceof GameScene) {
      const gameScene = this.gameScene;

      gameScene.coins += 10;
      EventBus.emit("update-coins", gameScene.coins);

      if (bone instanceof Phaser.GameObjects.GameObject) {
        gameScene.bones.boneGroup.killAndHide(bone);
        gameScene.bones.boneGroup.remove(bone);
      }
    }
  }

  removalBeyondBordersWorld() {
    this.boneGroup.children.iterate((bone: Phaser.GameObjects.GameObject) => {
      if (
        bone instanceof Phaser.GameObjects.Sprite &&
        bone.y > this.gameScene.game.scale.height + 20
      ) {
        this.boneGroup.killAndHide(bone);
      }

      return true;
    });
  }

  private getBoneBody(bone: Phaser.GameObjects.Sprite) {
    return bone.body as Phaser.Physics.Arcade.Body;
  }
}

