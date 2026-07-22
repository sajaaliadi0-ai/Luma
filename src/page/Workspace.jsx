import "../css/workspace.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiHome,
  FiFolder,
  FiGrid,
  FiUsers,
  FiBarChart2,
  FiSettings,
  FiSearch,
  FiBell,
  FiMoon,
  FiMoreHorizontal,
  FiPlus
} from "react-icons/fi";

const projects = [
  {
    title: "Clinic Appointment System",
    status: "Generating",
    color: "purple",
    type: "Web App",
    level: "Complex",
    footer: "7 / 11 agents",
    avatars: true
  },
  {
    title: "Campus Food Delivery",
    status: "Completed",
    color: "green",
    type: "Mobile App",
    level: "Medium",
    footer: "11 sections · updated 2h ago"
  },
  {
    title: "Freelancer Invoicing Tool",
    status: "In review",
    color: "orange",
    type: "API Service",
    level: "Medium",
    footer: "3 open reviews · updated 6h ago"
  },
  {
    title: "Fitness Habit Tracker",
    status: "Draft",
    color: "gray",
    type: "Mobile App",
    level: "Simple",
    footer: "Draft · edited yesterday"
  },
  {
    title: "Smart Parking Platform",
    status: "Failed",
    color: "red",
    type: "Platform",
    level: "Complex",
    footer: "Fetching failed · retry available"
  },
  {
    title: "Online Bookstore",
    status: "Completed",
    color: "green",
    type: "Web App",
    level: "Medium",
    footer: "10 sections · updated 5 days ago"
  }
];

function Workspace() {
const [search, setSearch] = useState("");
const [filter, setFilter] = useState("All");
const [sort, setSort] = useState("A-Z");
const navigate = useNavigate();

const filteredProjects = [...projects]
  .filter((project) => {

    const matchSearch =
      project.title.toLowerCase().includes(search.toLowerCase());

    const matchFilter =
      filter === "All" || project.status === filter;

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


const [darkMode, setDarkMode] = useState(false);

const [showNotifications, setShowNotifications] = useState(false);

const notifications = [
  "Blueprint generated successfully",
  "Campus Food Delivery updated",
  "New AI suggestion available"
];
  return (

<div className={`workspace-page ${darkMode ? "dark" : ""}`}>
        {/* ================= SIDEBAR ================= */}

      <aside className="workspace-sidebar">

        <div>

          <div className="workspace-logo">

            <div className="workspace-logo-box">
              L
            </div>

            <div>

              <h2>Luma</h2>

              <p>Architect</p>

            </div>

          </div>

          <nav className="workspace-menu">

            <button className="active">
              <FiHome />
              <span>Workspace</span>
            </button>

            <button>
              <FiFolder />
              <span>Blueprints</span>
            </button>

            <button>
              <FiGrid />
              <span>Templates</span>
            </button>

            <button>
              <FiUsers />
              <span>Teams</span>
            </button>

            <button>
              <FiBarChart2 />
              <span>Analytics</span>
            </button>

            <button>
              <FiSettings />
              <span>Settings</span>
            </button>

          </nav>

        </div>

        

      </aside>

      {/* ================= MAIN ================= */}

      <main className="workspace-main">       
         {/* ================= NAVBAR ================= */}

        <header className="workspace-navbar">

          <div className="workspace-search">

            <FiSearch />

            <input
  type="text"
  placeholder="Search blueprints..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
            <div className="workspace-shortcut">
              ⌘K
            </div>

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

          <div
            key={index}
            className="workspace-notification-item"
          >
            {item}
          </div>

        ))}

      </div>

    )}

  </div>

 <button
  className="workspace-icon-btn"
  onClick={() => setDarkMode(prev => !prev)}
>
  <FiMoon />
</button>
  <div className="workspace-avatar">
    AF
  </div>

</div>

        </header>

        {/* ================= PAGE HEADER ================= */}

        <section className="workspace-header">

          <div>

            <h1 className="workspace-title">
              Workspace
            </h1>

            <p className="workspace-subtitle">
              6 blueprints · your engineering company is ready
            </p>

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

              <h2>
                Hi, I'm Luma! 👋
              </h2>

              <p>
                I can help you create software blueprints,
                design scalable systems, optimize workflows
                and generate complete project architecture
                within minutes.
              </p>

            </div>

          </div>

          <div className="workspace-hero-right">

            <button
  className="workspace-btn"
  onClick={() => navigate("/new-blueprint")}
>
  <FiPlus />
  <span>New Blueprint</span>
</button>

           <select
  className="workspace-sort"
  value={sort}
  onChange={(e) => setSort(e.target.value)}
>

  <option value="A-Z">
    A → Z
  </option>

  <option value="Z-A">
    Z → A
  </option>

</select>

          </div>

        </section>

        {/* ================= FILTERS ================= */}

        <div className="workspace-filters">

  <button
    className={`workspace-filter-btn ${filter === "All" ? "active" : ""}`}
    onClick={() => setFilter("All")}
  >
    All
  </button>

  <button
    className={`workspace-filter-btn ${filter === "Draft" ? "active" : ""}`}
    onClick={() => setFilter("Draft")}
  >
    Draft
  </button>

  <button
    className={`workspace-filter-btn ${filter === "Generating" ? "active" : ""}`}
    onClick={() => setFilter("Generating")}
  >
    Generating
  </button>

  <button
    className={`workspace-filter-btn ${filter === "In review" ? "active" : ""}`}
    onClick={() => setFilter("In review")}
  >
    In review
  </button>

  <button
    className={`workspace-filter-btn ${filter === "Completed" ? "active" : ""}`}
    onClick={() => setFilter("Completed")}
  >
    Completed
  </button>

  <button
    className={`workspace-filter-btn ${filter === "Failed" ? "active" : ""}`}
    onClick={() => setFilter("Failed")}
  >
    Failed
  </button>

</div>

        {/* ================= PROJECT GRID ================= */}

        <div className="workspace-grid">
{filteredProjects.map((item, index) => (
  <div
    key={index}
    className="workspace-card"
  >

    <div className="workspace-card-top">

      <span
        className={`workspace-badge workspace-${item.color}`}
      >
        {item.status}
      </span>

      <button className="workspace-more">

        <FiMoreHorizontal />

      </button>

    </div>

    <h3 className="workspace-card-title">
      {item.title}
    </h3>

    <div className="workspace-tags">

      <span className="workspace-tag">
        {item.type}
      </span>

      <span className="workspace-tag">
        {item.level}
      </span>

    </div>

    {item.avatars && (

      <div className="workspace-card-users">

        <div className="workspace-user">
          OK
        </div>

        <div className="workspace-user">
          F
        </div>

        <div className="workspace-user">
          HO
        </div>

      </div>

    )}

    <div className="workspace-card-divider"></div>

    <div className="workspace-footer">

      <span>
        {item.footer}
      </span>

      <button className="workspace-open">
        Open →
      </button>

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
