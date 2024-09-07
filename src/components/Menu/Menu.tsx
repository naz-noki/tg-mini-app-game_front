import { Gamepad2, LayoutDashboard, UserRound } from "lucide-react";
import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./menu.module.css";

export const Menu: FC = () => {
  const location = useLocation();

  return (
    <div className={styles["menu-container"]}>
      <Link
        to={"/"}
        replace={true}
        className={[
          styles["menu-button"],
          location.pathname === "/" ? styles["menu-button_active"] : "",
        ].join(" ")}
      >
        <Gamepad2 />
      </Link>
      <Link
        to={"/dashboard"}
        replace={true}
        className={[
          styles["menu-button"],
          location.pathname === "/dashboard"
            ? styles["menu-button_active"]
            : "",
        ].join(" ")}
      >
        <LayoutDashboard />
      </Link>
      <Link
        to={"/account"}
        replace={true}
        className={[
          styles["menu-button"],
          location.pathname === "/account" ? styles["menu-button_active"] : "",
        ].join(" ")}
      >
        <UserRound />
      </Link>
    </div>
  );
};

