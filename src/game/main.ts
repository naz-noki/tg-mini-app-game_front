import { AUTO, Game, Types } from "phaser";
import { GameScene, LoadingScene } from "./scenes";

const config: Types.Core.GameConfig = {
  type: AUTO,
  width: window.innerWidth > 768 ? 768 : window.innerWidth,
  height: window.innerHeight - 61,
  parent: "game-container",
  backgroundColor: "#000000",
  scene: [LoadingScene, GameScene],
  fps: { target: 60 },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false,
    },
  },
};

const StartGame = (parent?: string | HTMLElement | undefined) => {
  return new Game({ ...config, parent });
};

export default StartGame;

