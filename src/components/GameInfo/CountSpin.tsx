import { LoaderPinwheel } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { EventBus } from "../../utils";
import styles from "./countSpin.module.css";

export const CountSpin: FC = () => {
  const [countSpin, setCountSpin] = useState<number>(0);

  useEffect(() => {
    EventBus.on("update-spins", (count: number) => {
      setCountSpin(count);
    });

    return () => {
      EventBus.removeListener("update-spins");
    };
  }, []);

  return (
    <span className={styles["count-spin"]}>
      <LoaderPinwheel color={"#ff7514"} /> {countSpin}
    </span>
  );
};

