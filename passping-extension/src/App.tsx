import "./App.css";
import { useState } from "react";
import Home from "./pages/Home";
import Settings from "./pages/Settings";

function App() {
  const [currentPage, setCurrentPage] = useState<"home" | "settings">("home");

  return (
    <>
      {currentPage === "home" && (
        <Home goToSettings={() => setCurrentPage("settings")} />
      )}

      {currentPage === "settings" && (
        <Settings goBack={() => setCurrentPage("home")} />
      )}
    </>
  );
}

export default App;
