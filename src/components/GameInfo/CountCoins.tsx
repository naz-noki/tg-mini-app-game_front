import { CircleDollarSign } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { EventBus } from "../../utils";
import styles from "./countCoins.module.css";

export const CountCoins: FC = () => {
  const [countCoins, setCountCoins] = useState<number>(0);

  useEffect(() => {
    EventBus.on("update-coins", (coins: number) => {
      setCountCoins(coins);
    });

    return () => {
      EventBus.removeListener("update-coins");
    };
  }, []);

  return (
    <>
      <span className={styles["count-coins"]}>
        <CircleDollarSign color={"#DAA520"} /> {countCoins}
      </span>
    </>
  );
};

