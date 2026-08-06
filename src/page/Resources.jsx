import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import "../css/newBlueprint.css";

const resources = [
  [
    "Robot for Forex Trading",
    "Osuji Promise · ◉ 7.7K",
    "forex",
    "Data Analysis",
  ],
  ["إنشاء موقع لعرض الفيديوهات", "Musa Aljably · ◉ 2.6K", "purple", "Website"],
  ["موقع فيديوهات الذكاء الاصطناعي", "Mo Daha · ◉ 3.6K", "green", "AI"],
  ["Bakery dashboard", "Atoms · ◉ 1.4K", "dark", "E-commerce"],
  ["Fantasy landing page", "Atoms · ◉ 4.1K", "fantasy", "Website"],
  ["Wallet dashboard", "Atoms · ◉ 1.8K", "wallet", "Productivity"],
];

const templates = [
  ["Landing Page Template", "Atoms · ◉ 3K", "purple", "Website"],
  ["Dashboard Template", "Atoms · ◉ 5K", "dark", "Productivity"],
  ["AI Website Template", "Atoms · ◉ 2K", "green", "AI"],
];

function Resources() {
  const navigate = useNavigate();

  const [resourceTab, setResourceTab] = useState("Discover");
  const [resourceFilter, setResourceFilter] = useState("All");

  const currentResources = resourceTab === "Discover" ? resources : templates;

  const filteredResources = currentResources.filter((item) => {
    if (resourceFilter === "All") {
      return true;
    }

    return item[3] === resourceFilter;
  });

  const handleBack = () => {
    navigate("/DualWorkspace");
  };

  const handleTabChange = (tab) => {
    setResourceTab(tab);
    setResourceFilter("All");
  };

  return (
    <section className="blueprint-catalog blueprint-resources-page">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="blueprint-resources-header">
        <button
          type="button"
          className="blueprint-back-button"
          onClick={handleBack}
        >
          <FiArrowLeft />
          Back
        </button>

        <h2>Resources</h2>
      </header>

      {/* =====================================================
          TABS
      ===================================================== */}

      <div className="blueprint-tabs">
        <button
          type="button"
          className={resourceTab === "Discover" ? "active" : ""}
          onClick={() => handleTabChange("Discover")}
        >
          Discover
        </button>

        <button
          type="button"
          className={resourceTab === "Templates" ? "active" : ""}
          onClick={() => handleTabChange("Templates")}
        >
          Templates
        </button>
      </div>

      {/* =====================================================
          FILTERS
      ===================================================== */}

      <div className="blueprint-filters">
        {[
          "All",
          "E-commerce",
          "Website",
          "Game",
          "Productivity",
          "Data Analysis",
          "AI",
          "Latest",
        ].map((filter) => (
          <button
            type="button"
            key={filter}
            className={resourceFilter === filter ? "filter-active" : ""}
            onClick={() => setResourceFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* =====================================================
          RESOURCES
      ===================================================== */}

      <div className="blueprint-resource-grid">
        {filteredResources.length === 0 ? (
          <p className="no-projects">No resources found.</p>
        ) : (
          filteredResources.map(([title, meta, tone], index) => (
            <article key={title}>
              <div className={`blueprint-resource-image ${tone}`}>
                <span>
                  {index % 2 === 0
                    ? "Trading Dashboard"
                    : "حول أفكارك إلى فيديوهات احترافية"}
                </span>
              </div>

              <footer>
                <b className="blueprint-resource-avatar">{title[0]}</b>

                <div>
                  <strong>{title}</strong>

                  <small>{meta}</small>
                </div>
              </footer>
            </article>
          ))
        )}
      </div>
    </section>
  );
}

export default Resources;
