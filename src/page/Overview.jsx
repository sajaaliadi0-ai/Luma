import { useEffect, useState } from "react";

import api from "../api/api";
import "../css/overview.css";

import Sidebar from "../components/Sidebar/Sidebar";
import { useTranslation } from "../i18n";


function Overview({ dark }) {

  const { t } = useTranslation();


  // =========================================================
  // ROLE
  // =========================================================

  const storedRole = localStorage.getItem("role");

  const isSuperAdmin =
    storedRole === "superadmin" ||
    storedRole === "super_admin";


  // =========================================================
  // DATA
  // =========================================================

  const [users, setUsers] = useState([]);

  const [blueprints, setBlueprints] = useState([]);

  const [logs, setLogs] = useState([]);

  const [systemStats, setSystemStats] =
    useState(null);

  const [loading, setLoading] =
    useState(true);




  // =========================================================
  // LOAD OVERVIEW DATA
  // =========================================================

  useEffect(() => {

    const loadOverview = async () => {

      try {

        setLoading(true);


        // -----------------------------------------------------
        // USERS
        // -----------------------------------------------------

        const usersResponse =
          await api.get(
            "/api/superadmin/users"
          );


        // -----------------------------------------------------
        // BLUEPRINTS
        // -----------------------------------------------------

        const blueprintsResponse =
          await api.get(
            "/api/superadmin/blueprints"
          );


        // -----------------------------------------------------
        // LOGS
        // -----------------------------------------------------

        const logsResponse =
          await api.get(
            "/api/superadmin/logs"
          );


        // -----------------------------------------------------
        // USERS DATA
        // -----------------------------------------------------

        setUsers(

          Array.isArray(
            usersResponse.data
          )

            ? usersResponse.data

            : usersResponse.data?.users || []

        );


        // -----------------------------------------------------
        // BLUEPRINTS DATA
        // -----------------------------------------------------

        setBlueprints(

          Array.isArray(
            blueprintsResponse.data
          )

            ? blueprintsResponse.data

            : blueprintsResponse.data?.blueprints || []

        );


        // -----------------------------------------------------
        // LOGS DATA
        // -----------------------------------------------------

        setLogs(

          Array.isArray(
            logsResponse.data
          )

            ? logsResponse.data

            : logsResponse.data?.logs || []

        );


        // -----------------------------------------------------
        // SYSTEM STATS
        // Super Admin only
        // -----------------------------------------------------

        if (isSuperAdmin) {

          const statsResponse =
            await api.get(
              "/api/superadmin/system-stats"
            );


          setSystemStats(
            statsResponse.data
          );

        }

      }

      catch (error) {

        console.error(
          "Error loading overview:",
          error
        );

      }

      finally {

        setLoading(false);

      }

    };


    loadOverview();

  }, [isSuperAdmin]);


  // =========================================================
  // HELPERS
  // =========================================================

  const getInitial = () => {

    return isSuperAdmin
      ? "S"
      : "A";

  };


  const getRoleName = () => {

    return isSuperAdmin

      ? t("overviewSuperAdministrator")

      : t("overviewAdministrator");

  };


  // =========================================================
  // RENDER
  // =========================================================

  return (

    <div
      className={
        `dashboard-layout ${
          dark ? "dark" : ""
        }`
      }
    >


      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <Sidebar
        active="Overview"
      />


      {/* =====================================================
          PAGE CONTENT
      ===================================================== */}

      <div className="page-content">


        <main className="overview-page">


          {/* =================================================
              HEADER
          ================================================= */}

          <header className="overview-header">


            <div className="overview-title-area">


              <span className="overview-eyebrow">

                {isSuperAdmin

                  ? t(
                      "overviewSuperAdminDashboard"
                    )

                  : t(
                      "overviewAdminDashboard"
                    )

                }

              </span>


              <h1>

                {t("overviewTitle")}

              </h1>


              <p>

                {t("overviewDescription")}

              </p>


            </div>


            {/* =================================================
                PROFILE
            ================================================= */}

            <div className="overview-profile">


              <div className="overview-avatar">

                {getInitial()}

              </div>


              <div className="overview-profile-info">


                <strong>

                  {isSuperAdmin

                    ? t("overviewSuperAdmin")

                    : t("overviewAdmin")

                  }

                </strong>


                <span>

                  {getRoleName()}

                </span>


              </div>


              <span
                className="overview-status-dot"
              />


            </div>


          </header>


          {/* =================================================
              CONTROL BANNER
          ================================================= */}

          <section className="overview-banner">


            <div className="overview-banner-content">


              <div className="overview-bot">


                <div className="overview-bot-face">


                  <span className="overview-bot-eye" />

                  <span className="overview-bot-eye" />


                </div>


                <span
                  className="overview-bot-signal"
                />


              </div>


              <div>


                <span className="overview-banner-label">

                  {t(
                    "overviewControlCenter"
                  )}

                </span>


                <h2>

                  {t(
                    "overviewEverythingUnderControl"
                  )}

                </h2>


                <p>

                  {t(
                    "overviewBannerDescription"
                  )}

                </p>


              </div>


            </div>


            <div className="overview-banner-decoration">

              <span />
              <span />
              <span />

            </div>


          </section>


          {/* =================================================
              STATISTICS
          ================================================= */}

          <section className="overview-stats">


            {/* USERS */}

            <div className="overview-stat-card">


              <div className="overview-stat-top">


                <div className="overview-stat-icon purple">

                  <span>♙</span>

                </div>


                <span className="overview-stat-badge">

                  {t("overviewLive")}

                </span>


              </div>


              <div className="overview-stat-info">


                <span>

                  {t(
                    "overviewTotalUsers"
                  )}

                </span>


                <strong>

                  {loading
                    ? "..."
                    : users.length}

                </strong>


                <small>

                  {t(
                    "overviewRegisteredUsers"
                  )}

                </small>


              </div>


            </div>


            {/* BLUEPRINTS */}

            <div className="overview-stat-card">


              <div className="overview-stat-top">


                <div className="overview-stat-icon violet">

                  <span>▤</span>

                </div>


                <span className="overview-stat-badge">

                  {t("overviewActive")}

                </span>


              </div>


              <div className="overview-stat-info">


                <span>

                  {t(
                    "overviewBlueprints"
                  )}

                </span>


                <strong>

                  {loading
                    ? "..."
                    : blueprints.length}

                </strong>


                <small>

                  {t(
                    "overviewGeneratedBlueprints"
                  )}

                </small>


              </div>


            </div>


            {/* ACTIVITY */}

            <div className="overview-stat-card">


              <div className="overview-stat-top">


                <div className="overview-stat-icon pink">

                  <span>⌁</span>

                </div>


                <span className="overview-stat-badge">

                  {t("overviewRecent")}

                </span>


              </div>


              <div className="overview-stat-info">


                <span>

                  {t(
                    "overviewActivities"
                  )}

                </span>


                <strong>

                  {loading
                    ? "..."
                    : logs.length}

                </strong>


                <small>

                  {t(
                    "overviewRecordedActivities"
                  )}

                </small>


              </div>


            </div>


            {/* SUPER ADMIN SYSTEM */}

            {isSuperAdmin && (

              <div className="overview-stat-card">


                <div className="overview-stat-top">


                  <div className="overview-stat-icon green">

                    <span>◫</span>

                  </div>


                  <span className="overview-stat-badge">

                    {t(
                      "overviewSystem"
                    )}

                  </span>


                </div>


                <div className="overview-stat-info">


                  <span>

                    {t(
                      "overviewSystemStatus"
                    )}

                  </span>


                  <strong>

                    {systemStats

                      ? t(
                          "overviewOnline"
                        )

                      : "..."

                    }

                  </strong>


                  <small>

                    {t(
                      "overviewSystemMonitoring"
                    )}

                  </small>


                </div>


              </div>

            )}


          </section>


          {/* =================================================
              MAIN GRID
          ================================================= */}

          <section className="overview-grid">


            {/* =================================================
                SYSTEM OVERVIEW
            ================================================= */}

            <div className="overview-card overview-system-card">


              <div className="overview-card-header">


                <div>


                  <span className="overview-card-label">

                    {t(
                      "overviewPlatform"
                    )}

                  </span>


                  <h3>

                    {t(
                      "overviewSystemOverview"
                    )}

                  </h3>


                  <p>

                    {t(
                      "overviewCurrentPlatformInfo"
                    )}

                  </p>


                </div>


                <div className="overview-card-icon">

                  ✦

                </div>


              </div>


              {/* SUPER ADMIN */}

              {isSuperAdmin ? (

                <div className="overview-system-panel">


                  <div className="overview-system-header">


                    <div className="system-online">

                      <span />

                      {t(
                        "overviewSystemOperational"
                      )}

                    </div>


                    <span className="system-live">

                      {t(
                        "overviewLive"
                      )}

                    </span>


                  </div>


                  {systemStats ? (

                    <div className="system-data-grid">


                      {Object.entries(
                        systemStats
                      )
                        .slice(0, 4)
                        .map(
                          ([key, value]) => (

                            <div
                              className="system-data-item"
                              key={key}
                            >

                              <span>

                                {key
                                  .replaceAll(
                                    "_",
                                    " "
                                  )
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

                          )
                        )}


                    </div>

                  ) : (

                    <div className="overview-no-data">


                      <div>
                        ◫
                      </div>


                      <span>

                        {t(
                          "overviewNoSystemStats"
                        )}

                      </span>


                    </div>

                  )}


                </div>

              ) : (

                /* ADMIN */

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

                      {t(
                        "overviewTotalBlueprints"
                      )}

                    </span>


                  </div>


                  <div className="summary-line">

                    <span />

                  </div>


                </div>

              )}


            </div>


            {/* =================================================
                RECENT ACTIVITY
            ================================================= */}

            <div className="overview-card overview-activity-card">


              <div className="overview-card-header">


                <div>


                  <span className="overview-card-label">

                    {t(
                      "overviewMonitoring"
                    )}

                  </span>


                  <h3>

                    {t(
                      "overviewRecentActivity"
                    )}

                  </h3>


                  <p>

                    {t(
                      "overviewLatestEvents"
                    )}

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

                      {t(
                        "overviewNoActivity"
                      )}

                    </p>


                  </div>

                ) : (

                  logs
                    .slice(0, 5)
                    .map(
                      (log, index) => (

                        <div
                          className="overview-activity-item"
                          key={
                            log.id ||
                            index
                          }
                        >


                          <div className="activity-timeline">


                            <span className="activity-dot" />


                            {index !==
                              Math.min(
                                logs.length,
                                5
                              ) - 1 && (

                              <span className="activity-line" />

                            )}


                          </div>


                          <div className="activity-content">


                            <strong>

                              {log.action ||
                                log.event ||
                                t(
                                  "overviewPlatformActivity"
                                )}

                            </strong>


                            <p>

                              {log.user ||
                                log.user_name ||
                                t(
                                  "overviewSystemActivity"
                                )}

                            </p>


                            <small>

                              {log.created_at ||
                                log.createdAt ||
                                log.date ||
                                ""}

                            </small>


                          </div>


                        </div>

                      )
                    )

                )}


              </div>


            </div>


          </section>


          {/* =================================================
              AI PANEL
          ================================================= */}

          <section className="overview-ai-panel">


            <div className="overview-ai-left">


              <div className="ai-robot">


                <div className="ai-antenna" />


                <div className="ai-head">

                  <span />
                  <span />

                </div>


              </div>


              <div>


                <span className="ai-label">

                  {t(
                    "overviewAiCore"
                  )}

                </span>


                <h3>

                  {t(
                    "overviewAssistantReady"
                  )}

                </h3>


                <p>

                  {t(
                    "overviewAssistantDescription"
                  )}

                </p>


              </div>


            </div>


            <div className="ai-grid">

              <span />
              <span />
              <span />

              <span />
              <span />
              <span />

              <span />
              <span />
              <span />

            </div>


          </section>


        </main>

      </div>

    </div>

  );

}


export default Overview;