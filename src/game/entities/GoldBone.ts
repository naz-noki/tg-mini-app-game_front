import { EventBus } from "../../utils";
import { GameScene } from "../scenes";

export class GoldBone extends Phaser.GameObjects.Sprite {
  private gameScene: Phaser.Scene;
  private isTimer: boolean = false;
  public goldBoneGroup: Phaser.Physics.Arcade.Group;

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

    this.goldBoneGroup = scene.physics.add.group({
      defaultKey: "goldBone",
      maxSize: 1,
    });
  }

  update() {
    Phaser.Actions.IncY(this.goldBoneGroup.getChildren(), 1);

    this.spawnGoldBone();

    this.removalBeyondBordersWorld();
  }

  private spawnGoldBone() {
    if (this.goldBoneGroup.countActive(true) === 0 && !this.isTimer) {
      const delay = Phaser.Math.Between(1000, 10000); // Phaser.Math.Between(120000, 600000), (от 2 мин. до 10 мин.)
      this.isTimer = true;

      this.gameScene.time.addEvent({
        delay: delay,
        callback: () => this.addGoldBone(),
      });
    }
  }

  private addGoldBone() {
    const x = Phaser.Math.Between(20, this.gameScene.game.scale.width - 20);
    const y = Phaser.Math.Between(-25, 0);
    const rotationRadians = Phaser.Math.Between(0, 3);

    const goldBone = this.goldBoneGroup.get(
      x,
      y
    ) as Phaser.GameObjects.Sprite | null;

    if (!goldBone) return;

    this.getGoldBoneBody(goldBone).setVelocity(0, 200);

    goldBone.setRotation(rotationRadians);

    this.activateGoldBone(goldBone);
    this.isTimer = false;
  }

  private activateGoldBone(goldBone: Phaser.GameObjects.Sprite) {
    goldBone.setActive(true).setVisible(true);
  }

  public collectGoldBone(
    _player:
      | Phaser.Types.Physics.Arcade.GameObjectWithBody
      | Phaser.Tilemaps.Tile,
    bone: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile
  ) {
    if (this.gameScene instanceof GameScene) {
      const gameScene = this.gameScene;

      gameScene.spins += 1;
      EventBus.emit("update-spins", gameScene.spins);

      if (bone instanceof Phaser.GameObjects.GameObject) {
        gameScene.goldBone.goldBoneGroup.killAndHide(bone);
        gameScene.goldBone.goldBoneGroup.remove(bone);
      }
    }
  }

  removalBeyondBordersWorld() {
    this.goldBoneGroup.children.iterate(
      (goldBone: Phaser.GameObjects.GameObject) => {
        if (
          goldBone instanceof Phaser.GameObjects.Sprite &&
          goldBone.y > this.gameScene.game.scale.height + 20
        ) {
          this.goldBoneGroup.killAndHide(goldBone);
        }

        return true;
      }
    );
  }

  private getGoldBoneBody(goldBone: Phaser.GameObjects.Sprite) {
    return goldBone.body as Phaser.Physics.Arcade.Body;
  }
}

