import background from "/assets/bg-space-2k-mini.png";
import bone from "/assets/bone.png";
import goldBone from "/assets/gold-bone.png";
import player from "/assets/telegram-dog-player.png";

export class LoadingScene extends Phaser.Scene {
  private loadingText: Phaser.GameObjects.Text;

  constructor() {
    super("loading");
  }

  preload() {
    this.loadingText = this.add.text(
      this.game.scale.width / 2,
      this.game.scale.height / 2 - 50,
      "Loading...",
      { color: "#ffffff", fontFamily: "monospace", fontSize: 24 }
    );
    this.loadingText.setOrigin(0.5, 0.5);

    this.load.on("progress", (value: number) => {
      this.loadingText.setText(`${Math.round(value * 100)}% Loading...`);
    });

    this.load.on("complete", () => {
      this.loadingText.destroy();
    });

    this.load.image("background", background);
    this.load.image("cube", player);
    this.load.image("bone", bone);
    this.load.image("goldBone", goldBone);
  }

  create() {
    this.scene.start("game");
  }
}

