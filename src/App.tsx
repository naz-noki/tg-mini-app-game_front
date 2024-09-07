import { useIntegration } from "@telegram-apps/react-router-integration";
import { initNavigator } from "@telegram-apps/sdk-react";
import { useEffect, useMemo, useRef } from "react";
import { Route, Router, Routes } from "react-router";
import styles from "./app.module.css";
import { Menu } from "./components/Menu";
import { IRefPhaserGame } from "./components/PhaserGame";
import { Account } from "./pages/Account";
import { Dashboard } from "./pages/Dashboard";
import { Game } from "./pages/Game";

function App() {
  const phaserRef = useRef<IRefPhaserGame | null>(null);
  const navigator = useMemo(() => initNavigator("app-navigation-state"), []);
  const [location, reactNavigator] = useIntegration(navigator);

  useEffect(() => {
    navigator.attach();

    return () => navigator.detach();
  }, [navigator]);

  return (
    <div id="app">
      <div
        className={styles["app-container"]}
        style={{
          width: window.innerWidth > 768 ? "768px" : window.innerWidth,
        }}
      >
        <Router location={location} navigator={reactNavigator}>
          <Routes>
            <Route path={"/"} element={<Game ref={phaserRef} />} />
            <Route path={"/dashboard"} element={<Dashboard />} />
            <Route path={"/account"} element={<Account />} />
          </Routes>
          <Menu />
        </Router>
      </div>
    </div>
  );
}

export default App;

