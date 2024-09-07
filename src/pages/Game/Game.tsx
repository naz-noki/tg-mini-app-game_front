import { forwardRef } from "react";
import { GameInfo } from "../../components/GameInfo";
import { IRefPhaserGame, PhaserGame } from "../../components/PhaserGame";

export const Game = forwardRef<IRefPhaserGame | null>(function Game(
  _props,
  ref
) {
  return (
    <>
      <GameInfo />
      <PhaserGame ref={ref} />
    </>
  );
});

