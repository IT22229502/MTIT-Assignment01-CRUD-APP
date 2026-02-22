import React from "react";

import InventoryList_ChatGPT from "./components/InventoryList_ChatGPT.jsx";
import InventoryList_Gemini from "./components/InventoryList_Gemini.jsx";
import "./App.css";

function App() {
  return (
    /* We keep the container but remove the duplicate headers/footers */
    <div className="app-container">
      <InventoryList_ChatGPT />
    </div>
  );
}

export default App;