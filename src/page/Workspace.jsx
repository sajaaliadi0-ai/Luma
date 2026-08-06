import "../css/workspace.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "../i18n";
import {
  FiSearch,
  FiBell,
  FiMoon,
  FiMoreHorizontal,
  FiPlus,
} from "react-icons/fi";

const projects = [
  {
    title: "clinicAppointmentSystem",
    status: "Generating",
    color: "purple",
    type: "Web App",
    level: "Complex",
    footer: "clinicFooter",
    avatars: true,
  },
  {
    title: "campusFoodDelivery",
    status: "Completed",
    color: "green",
    type: "Mobile App",
    level: "Medium",
    footer: "campusFooter",
  },
  {
    title: "freelancerInvoicingTool",
    status: "In review",
    color: "orange",
    type: "API Service",
    level: "Medium",
    footer: "freelancerFooter",
  },
  {
    title: "fitnessHabitTracker",
    status: "Draft",
    color: "gray",
    type: "Mobile App",
    level: "Simple",
    footer: "fitnessFooter",
  },
  {
    title: "smartParkingPlatform",
    status: "Failed",
    color: "red",
    type: "Platform",
    level: "Complex",
    footer: "parkingFooter",
  },
  {
    title: "onlineBookstore",
    status: "Completed",
    color: "green",
    type: "Web App",
    level: "Medium",
    footer: "bookstoreFooter",
  },
];

function Workspace() {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("A-Z");

  const navigate = useNavigate();
  // ==========================
  // Dark Mode
  // ==========================
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.body.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const body = document.body;

    if (body.classList.contains("dark")) {
      body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  const filteredProjects = [...projects]
    .filter((project) => {
      const matchSearch = project.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchFilter = filter === "All" || project.status === filter;

      return matchSearch && matchFilter;
    })
    .sort((a, b) => {
      if (sort === "A-Z") {
        return a.title.localeCompare(b.title);
      }

      if (sort === "Z-A") {
        return b.title.localeCompare(a.title);
      }

      return 0;
    });

  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    t("workspaceNotification1"),
    t("workspaceNotification2"),
    t("workspaceNotification3"),
  ];

  return (
    <div className="workspace-page">
      {/* ================= MAIN ================= */}

      <main className="workspace-main">
        {/* ================= NAVBAR ================= */}

        <header className="workspace-navbar">
          <div className="workspace-search">
            <FiSearch />

            <input
              type="text"
              placeholder={t("workspaceSearchPlaceholder")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="workspace-shortcut">⌘K</div>
          </div>

          <div className="workspace-right">
            <div style={{ position: "relative" }}>
              <button
                className="workspace-icon-btn"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <FiBell />
              </button>

              {showNotifications && (
                <div className="workspace-notifications">
                  {notifications.map((item, index) => (
                    <div key={index} className="workspace-notification-item">
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* يستخدم الثيم العام */}
            <button className="workspace-icon-btn" onClick={toggleTheme}>
              <FiMoon />
            </button>

            <div className="workspace-avatar">AF</div>
            <button
              className="workspace-admin-btn"
              onClick={() => navigate("/Overview")}
            >
              Admin
            </button>
          </div>
        </header>

        {/* ================= PAGE HEADER ================= */}

        <section className="workspace-header">
          <div>
            <h1 className="workspace-title">{t("workspaceTitle")}</h1>

            <p className="workspace-subtitle">{t("workspaceSubtitle")}</p>
          </div>
        </section>

        {/* ================= HERO ================= */}

        <section className="workspace-hero">
          <div className="workspace-hero-left">
            <img
              src="/images/workspace-small-robot.png"
              className="workspace-hero-robot"
              alt="Robot"
            />

            <div>
              <h2>{t("workspaceHi")}</h2>

              <p>{t("workspaceHeroText")}</p>
            </div>
          </div>

          <div className="workspace-hero-right">
            <button className="workspace-btn" onClick={() => navigate("/home")}>
              <FiPlus />
              <span>{t("workspaceNewBlueprint")}</span>
            </button>

            <select
              className="workspace-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="A-Z">{t("workspaceSortAZ")}</option>

              <option value="Z-A">{t("workspaceSortZA")}</option>
            </select>
          </div>
        </section>

        {/* ================= FILTERS ================= */}

        <div className="workspace-filters">
          <button
            className={`workspace-filter-btn ${filter === "All" ? "active" : ""}`}
            onClick={() => setFilter("All")}
          >
            {t("workspaceFilterAll")}
          </button>

          <button
            className={`workspace-filter-btn ${filter === "Draft" ? "active" : ""}`}
            onClick={() => setFilter("Draft")}
          >
            {t("workspaceFilterDraft")}
          </button>

          <button
            className={`workspace-filter-btn ${filter === "Generating" ? "active" : ""}`}
            onClick={() => setFilter("Generating")}
          >
            {t("workspaceFilterGenerating")}
          </button>

          <button
            className={`workspace-filter-btn ${filter === "In review" ? "active" : ""}`}
            onClick={() => setFilter("In review")}
          >
            {t("workspaceFilterInReview")}
          </button>

          <button
            className={`workspace-filter-btn ${filter === "Completed" ? "active" : ""}`}
            onClick={() => setFilter("Completed")}
          >
            {t("workspaceFilterCompleted")}
          </button>

          <button
            className={`workspace-filter-btn ${filter === "Failed" ? "active" : ""}`}
            onClick={() => setFilter("Failed")}
          >
            {t("workspaceFilterFailed")}
          </button>
        </div>

        {/* ================= PROJECT GRID ================= */}

        <div className="workspace-grid">
          {filteredProjects.map((item, index) => (
            <div key={index} className="workspace-card">
              <div className="workspace-card-top">
                <span className={`workspace-badge workspace-${item.color}`}>
                  {(() => {
                    const s = item.status;
                    if (s === "Generating") return t("statusGenerating");
                    if (s === "Completed") return t("statusCompleted");
                    if (s === "In review") return t("statusInReview");
                    if (s === "Draft") return t("statusDraft");
                    if (s === "Failed") return t("statusFailed");
                    return s;
                  })()}
                </span>

                <button className="workspace-more">
                  <FiMoreHorizontal />
                </button>
              </div>

              <h3 className="workspace-card-title">{t(item.title)}</h3>

              <div className="workspace-tags">
                <span className="workspace-tag">
                  {(() => {
                    const ty = item.type;
                    if (ty === "Web App") return t("typeWebApp");
                    if (ty === "Mobile App") return t("typeMobileApp");
                    if (ty === "API Service") return t("typeApiService");
                    if (ty === "Platform") return t("typePlatform");
                    return ty;
                  })()}
                </span>

                <span className="workspace-tag">
                  {(() => {
                    const lv = item.level;
                    if (lv === "Complex") return t("levelComplex");
                    if (lv === "Medium") return t("levelMedium");
                    if (lv === "Simple") return t("levelSimple");
                    return lv;
                  })()}
                </span>
              </div>

              {item.avatars && (
                <div className="workspace-card-users">
                  <div className="workspace-user">OK</div>

                  <div className="workspace-user">F</div>

                  <div className="workspace-user">HO</div>
                </div>
              )}

              <div className="workspace-card-divider"></div>

              <div className="workspace-footer">
                <span>{t(item.footer)}</span>

                <button className="workspace-open">{t("workspaceOpen")}</button>
              </div>
            </div>
          ))}
        </div>
        {/* ================= FLOATING AI ================= */}

        <div className="workspace-floating-robot">
          <img
            src="/images/workspace-big-robot.png"
            alt="AI Robot"
            className="workspace-big-robot-image"
          />
        </div>
      </main>
    </div>
  );
}

export default Workspace;
