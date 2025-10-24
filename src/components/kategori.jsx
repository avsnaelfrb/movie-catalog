import React, { useState } from "react";
import "../style/Kategori.css";
import MovieList from "./MovieList";

function Kategori() {
  const [activeTab, setActiveTab] = useState("Trends Now");

  const tabButtons = ["Trends Now", "Popular", "Premieres", "Recently Added"];

  return (
    <div className="kategori-container">
      <div className="tab-buttons">
        {tabButtons.map((tabName) => (
          <button
            key={tabName}
            className={
              activeTab === tabName ? "tab-button active" : "tab-button"
            }
            onClick={() => setActiveTab(tabName)}
          >
            {tabName}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {activeTab === "Trends Now" && <MovieList kategori="trending" />}
        {activeTab === "Popular" && <MovieList kategori="popular" />}
        {activeTab === "Premieres" && <MovieList kategori="premieres" />}
        {activeTab === "Recently Added" && <MovieList kategori="recent" />}
      </div>
    </div>
  );
}

export default Kategori;
