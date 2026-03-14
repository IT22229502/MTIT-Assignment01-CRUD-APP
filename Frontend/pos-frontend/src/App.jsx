import React from "react";
import { useState } from "react";

import InventoryList_ChatGPT from "./components/InventoryList_ChatGPT.jsx";
import InventoryList_Gemini from "./components/InventoryList_Gemini.jsx";
import "./App.css";

function App() {
  const [activeView, setActiveView] = useState("chatgpt");

  const showingChatGPT = activeView === "chatgpt";

  return (
    <div className="app-container">
      <div className="switch-bar">
        {showingChatGPT ? (
          <button
            type="button"
            className="switch-btn"
            onClick={() => setActiveView("gemini")}
          >
            Swith to Gemini
          </button>
        ) : (
          <button
            type="button"
            className="switch-btn"
            onClick={() => setActiveView("chatgpt")}
          >
            Swith to ChatGPT
          </button>
        )}
      </div>

      {showingChatGPT ? <InventoryList_ChatGPT /> : <InventoryList_Gemini />}
    </div>
  );
}

export default App;
