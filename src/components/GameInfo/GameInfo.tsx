import { FC } from "react";
import { CountCoins } from "./CountCoins";
import { CountSpin } from "./CountSpin";
import styles from "./gameInfo.module.css";

export const GameInfo: FC = () => {
  return (
    <div className={styles["game-info"]}>
      <CountCoins />
      <CountSpin />
    </div>
  );
};

