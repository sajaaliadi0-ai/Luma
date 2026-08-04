import { useEffect, useState } from "react";
import api from "../api/api";
import "../css/overview.css";
import Sidebar from "../components/Sidebar/Sidebar";

function Overview({ userRole = "admin" }) {
  const isSuperAdmin = userRole === "super_admin";

  const [users, setUsers] = useState([]);
  const [blueprints, setBlueprints] = useState([]);
  const [logs, setLogs] = useState([]);
  const [systemStats, setSystemStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOverview = async () => {
      try {
        setLoading(true);

        const usersResponse = await api.get(
          "/api/superadmin/users"
        );

        const blueprintsResponse = await api.get(
          "/api/superadmin/blueprints"
        );

        const logsResponse = await api.get(
          "/api/superadmin/logs"
        );

        setUsers(
          Array.isArray(usersResponse.data)
            ? usersResponse.data
            : usersResponse.data?.users || []
        );

        setBlueprints(
          Array.isArray(blueprintsResponse.data)
            ? blueprintsResponse.data
            : blueprintsResponse.data?.blueprints || []
        );

        setLogs(
          Array.isArray(logsResponse.data)
            ? logsResponse.data
            : logsResponse.data?.logs || []
        );

        if (isSuperAdmin) {
          const statsResponse = await api.get(
            "/api/superadmin/system-stats"
          );

          setSystemStats(statsResponse.data);
        }
      } catch (error) {
        console.error("Error loading overview:", error);
      } finally {
        setLoading(false);
      }
    };

    loadOverview();
  }, [isSuperAdmin]);

  const getInitial = () => {
    return isSuperAdmin ? "S" : "A";
  };

  const getRoleName = () => {
    return isSuperAdmin ? "Super Administrator" : "Administrator";
  };

  return (
    <div className="dashboard-layout">

      {/* Sidebar */}
      <Sidebar active="Overview" />

      {/* Page */}
      <div className="page-content">

        <main className="overview-page">

          {/* ================= HEADER ================= */}

          <header className="overview-header">

            <div className="overview-title-area">

              <span className="overview-eyebrow">
                {isSuperAdmin
                  ? "SUPER ADMIN DASHBOARD"
                  : "ADMIN DASHBOARD"}
              </span>

              <h1>Overview</h1>

              <p>
                Monitor your Luma platform from one place.
              </p>

            </div>

            <div className="overview-profile">

              <div className="overview-avatar">
                {getInitial()}
              </div>

              <div className="overview-profile-info">

                <strong>
                  {isSuperAdmin
                    ? "Super Admin"
                    : "Admin"}
                </strong>

                <span>
                  {getRoleName()}
                </span>

              </div>

              <span className="overview-status-dot"></span>

            </div>

          </header>


          {/* ================= WELCOME BANNER ================= */}

          <section className="overview-banner">

            <div className="overview-banner-content">

              <div className="overview-bot">

                <div className="overview-bot-face">

                  <span className="overview-bot-eye"></span>
                  <span className="overview-bot-eye"></span>

                </div>

                <span className="overview-bot-signal"></span>

              </div>

              <div>

                <span className="overview-banner-label">
                  LUMA CONTROL CENTER
                </span>

                <h2>
                  Everything is under control.
                </h2>

                <p>
                  Track users, blueprints and platform
                  activity from your dashboard.
                </p>

              </div>

            </div>

            <div className="overview-banner-decoration">
              <span></span>
              <span></span>
              <span></span>
            </div>

          </section>


          {/* ================= STATISTICS ================= */}

          <section className="overview-stats">

            {/* Users */}

            <div className="overview-stat-card">

              <div className="overview-stat-top">

                <div className="overview-stat-icon purple">
                  <span>♙</span>
                </div>

                <span className="overview-stat-badge">
                  LIVE
                </span>

              </div>

              <div className="overview-stat-info">

                <span>Total Users</span>

                <strong>
                  {loading ? "..." : users.length}
                </strong>

                <small>
                  Registered platform users
                </small>

              </div>

            </div>


            {/* Blueprints */}

            <div className="overview-stat-card">

              <div className="overview-stat-top">

                <div className="overview-stat-icon violet">
                  <span>▤</span>
                </div>

                <span className="overview-stat-badge">
                  ACTIVE
                </span>

              </div>

              <div className="overview-stat-info">

                <span>Blueprints</span>

                <strong>
                  {loading ? "..." : blueprints.length}
                </strong>

                <small>
                  Generated project blueprints
                </small>

              </div>

            </div>


            {/* Activity */}

            <div className="overview-stat-card">

              <div className="overview-stat-top">

                <div className="overview-stat-icon pink">
                  <span>⌁</span>
                </div>

                <span className="overview-stat-badge">
                  RECENT
                </span>

              </div>

              <div className="overview-stat-info">

                <span>Activities</span>

                <strong>
                  {loading ? "..." : logs.length}
                </strong>

                <small>
                  Recorded platform activities
                </small>

              </div>

            </div>


            {/* System Stats - Super Admin */}

            {isSuperAdmin && (

              <div className="overview-stat-card">

                <div className="overview-stat-top">

                  <div className="overview-stat-icon green">
                    <span>◫</span>
                  </div>

                  <span className="overview-stat-badge">
                    SYSTEM
                  </span>

                </div>

                <div className="overview-stat-info">

                  <span>System Status</span>

                  <strong>
                    {systemStats
                      ? "Online"
                      : "..."}
                  </strong>

                  <small>
                    Platform system monitoring
                  </small>

                </div>

              </div>

            )}

          </section>


          {/* ================= MAIN GRID ================= */}

          <section className="overview-grid">


            {/* ================= SYSTEM OVERVIEW ================= */}

            <div className="overview-card overview-system-card">

              <div className="overview-card-header">

                <div>

                  <span className="overview-card-label">
                    PLATFORM
                  </span>

                  <h3>
                    System Overview
                  </h3>

                  <p>
                    Current platform information
                  </p>

                </div>

                <div className="overview-card-icon">
                  ✦
                </div>

              </div>


              {isSuperAdmin ? (

                <div className="overview-system-panel">

                  <div className="overview-system-header">

                    <div className="system-online">
                      <span></span>
                      System Operational
                    </div>

                    <span className="system-live">
                      LIVE
                    </span>

                  </div>

                  {systemStats ? (

                    <div className="system-data-grid">

                      {Object.entries(systemStats)
                        .slice(0, 4)
                        .map(([key, value]) => (

                          <div
                            className="system-data-item"
                            key={key}
                          >

                            <span>
                              {key
                                .replaceAll("_", " ")
                                .replace(
                                  /\b\w/g,
                                  (letter) =>
                                    letter.toUpperCase()
                                )}
                            </span>

                            <strong>
                              {String(value)}
                            </strong>

                          </div>

                        ))}

                    </div>

                  ) : (

                    <div className="overview-no-data">
                      <div>◫</div>
                      <span>
                        No system statistics available.
                      </span>
                    </div>

                  )}

                </div>

              ) : (

                <div className="overview-blueprint-summary">

                  <div className="blueprint-summary-icon">
                    ✦
                  </div>

                  <div>

                    <strong>
                      {loading
                        ? "..."
                        : blueprints.length}
                    </strong>

                    <span>
                      Total Blueprints
                    </span>

                  </div>

                  <div className="summary-line">
                    <span></span>
                  </div>

                </div>

              )}

            </div>


            {/* ================= RECENT ACTIVITY ================= */}

            <div className="overview-card overview-activity-card">

              <div className="overview-card-header">

                <div>

                  <span className="overview-card-label">
                    MONITORING
                  </span>

                  <h3>
                    Recent Activity
                  </h3>

                  <p>
                    Latest platform events
                  </p>

                </div>

                <div className="overview-card-icon">
                  ◉
                </div>

              </div>


              <div className="overview-activity">

                {logs.length === 0 ? (

                  <div className="overview-no-activity">

                    <div className="activity-empty-icon">
                      ◌
                    </div>

                    <p>
                      No activity available.
                    </p>

                  </div>

                ) : (

                  logs
                    .slice(0, 5)
                    .map((log, index) => (

                      <div
                        className="overview-activity-item"
                        key={log.id || index}
                      >

                        <div className="activity-timeline">

                          <span className="activity-dot"></span>

                          {index !==
                            Math.min(logs.length, 5) - 1 && (
                            <span className="activity-line"></span>
                          )}

                        </div>

                        <div className="activity-content">

                          <strong>
                            {log.action ||
                              log.event ||
                              "Platform Activity"}
                          </strong>

                          <p>
                            {log.user ||
                              log.user_name ||
                              "System activity"}
                          </p>

                          <small>
                            {log.created_at ||
                              log.createdAt ||
                              log.date ||
                              ""}
                          </small>

                        </div>

                      </div>

                    ))

                )}

              </div>

            </div>

          </section>


          {/* ================= BOTTOM ROBOT PANEL ================= */}

          <section className="overview-ai-panel">

            <div className="overview-ai-left">

              <div className="ai-robot">

                <div className="ai-antenna"></div>

                <div className="ai-head">

                  <span></span>
                  <span></span>

                </div>

              </div>

              <div>

                <span className="ai-label">
                  LUMA AI CORE
                </span>

                <h3>
                  Your platform assistant is ready.
                </h3>

                <p>
                  Luma keeps your workspace organized,
                  monitored and running smoothly.
                </p>

              </div>

            </div>

            <div className="ai-grid">

              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>

            </div>

          </section>

        </main>

      </div>

    </div>
  );
}

export default Overview;