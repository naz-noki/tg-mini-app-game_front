import { EventBus } from "../../utils";
import { Bone, GoldBone, Player } from "../entities";

export class GameScene extends Phaser.Scene {
  public player: Player;
  public bones: Bone;
  public goldBone: GoldBone;
  public coins: number = 0;
  public spins: number = 0;

  constructor() {
    super("game");
  }

  create() {
    this.add.image(0, this.scale.height, "background").setOrigin(0, 1);

    this.bones = new Bone(this, 0, 0, "bone");
    this.bones.setAlpha(0);
    this.bones.boneGroup.setDepth(0);

    this.goldBone = new GoldBone(this, 0, 0, "goldBone");
    this.goldBone.setAlpha(0);
    this.goldBone.goldBoneGroup.setDepth(1);

    this.player = new Player(
      this,
      this.game.scale.width / 2,
      this.game.scale.height - 100,
      "cube"
    );
    this.player.setDepth(2);

    this.physics.add.overlap(
      this.player,
      this.bones.boneGroup,
      this.bones.collectBone.bind(this.bones)
    );

    this.physics.add.overlap(
      this.player,
      this.goldBone.goldBoneGroup,
      this.goldBone.collectGoldBone.bind(this.goldBone)
    );

    EventBus.emit("main-scene-ready", this);
  }

  update(): void {
    this.player.update();
    this.bones.update();
    this.goldBone.update();
  }
}
