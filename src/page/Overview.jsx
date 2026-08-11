
import { useEffect, useState } from "react";

import api from "../api/api";
import "../css/Overview.css";

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

  const [stats, setStats] = useState({
    total_users: 0,
    total_blueprints: 0,
    active_agent_runs: 0,

    blueprints_by_status: {
      draft: 0,
      generating: 0,
      completed: 0,
      failed: 0,
      cancelled: 0,
    },
  });

  const [, setBlueprints] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  // =========================================================
  // LOAD OVERVIEW DATA
  // =========================================================

  useEffect(() => {
    const loadOverview = async () => {
      setLoading(true);
      setError(null);

      try {
        // =====================================================
        // GET BLUEPRINTS
        // =====================================================

        const response = await api.get(
          "/admin/blueprints?limit=10&sort=created_at:desc"
        );

        console.log(
          "OVERVIEW BLUEPRINTS RESPONSE:",
          JSON.stringify(response.data, null, 2)
        );

        // =====================================================
        // API RESPONSE:
        //
        // {
        //   success: true,
        //   message: "...",
        //   data: [...]
        // }
        // =====================================================

        const apiData = response?.data;

        const loadedBlueprints = Array.isArray(
          apiData?.data
        )
          ? apiData.data
          : [];

        setBlueprints(loadedBlueprints);

        // =====================================================
        // CALCULATE BLUEPRINT STATISTICS
        // =====================================================

        const statusCounts = {
          draft: 0,
          generating: 0,
          completed: 0,
          failed: 0,
          cancelled: 0,
        };

        loadedBlueprints.forEach((blueprint) => {
          const status = String(
            blueprint?.status || ""
          ).toLowerCase();

          if (
            Object.prototype.hasOwnProperty.call(
              statusCounts,
              status
            )
          ) {
            statusCounts[status]++;
          }
        });

        // =====================================================
        // UNIQUE USERS FROM RETURNED BLUEPRINTS
        // =====================================================
        //
        // ملاحظة:
        // هذا ليس العدد الحقيقي لكل Users في النظام.
        // هو عدد المستخدمين المختلفين الموجودين
        // في الـ Blueprints التي رجعت من هذا الطلب فقط.
        //
        // =====================================================

        const uniqueUsers = new Set(
          loadedBlueprints
            .map(
              (blueprint) =>
                blueprint?.user_id
            )
            .filter(Boolean)
        );

        // =====================================================
        // SET STATS
        // =====================================================

        setStats({
          // حالياً نحسب المستخدمين الموجودين في النتائج فقط
          total_users: uniqueUsers.size,

          // عدد الـ Blueprints التي رجعها الـ API
          total_blueprints:
            loadedBlueprints.length,

          // لا يوجد endpoint للـ Agent Runs
          // في الـ response الحالي
          active_agent_runs: 0,

          blueprints_by_status:
            statusCounts,
        });
      } catch (err) {
        console.error(
          "Overview loading error:",
          err
        );

        console.error(
          "Status:",
          err?.response?.status
        );

        console.error(
          "Response:",
          err?.response?.data
        );

        setBlueprints([]);

        setStats({
          total_users: 0,
          total_blueprints: 0,
          active_agent_runs: 0,

          blueprints_by_status: {
            draft: 0,
            generating: 0,
            completed: 0,
            failed: 0,
            cancelled: 0,
          },
        });

        setError(
          "Unable to load overview data."
        );
      } finally {
        setLoading(false);
      }
    };

    loadOverview();
  }, []);

  // =========================================================
  // HELPERS
  // =========================================================

  const getInitial = () => {
    return isSuperAdmin ? "S" : "A";
  };

  const getRoleName = () => {
    return isSuperAdmin
      ? t("overviewSuperAdministrator")
      : t("overviewAdministrator");
  };

  const getStatusCount = (status) => {
    return (
      stats?.blueprints_by_status?.[status] ||
      0
    );
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div
      className={`dashboard-layout ${
        dark ? "dark" : ""
      }`}
    >
      <Sidebar active="Overview" />

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
                    )}
              </span>

              <h1>
                {t("overviewTitle")}
              </h1>

              <p>
                {t("overviewDescription")}
              </p>

            </div>

            <div className="overview-profile">

              <div className="overview-avatar">
                {getInitial()}
              </div>

              <div className="overview-profile-info">

                <strong>
                  {isSuperAdmin
                    ? t("overviewSuperAdmin")
                    : t("overviewAdmin")}
                </strong>

                <span>
                  {getRoleName()}
                </span>

              </div>

              <span className="overview-status-dot" />

            </div>

          </header>

          {/* =================================================
              ERROR
          ================================================= */}

          {error && (
            <div className="overview-error">
              {error}
            </div>
          )}

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

                <span className="overview-bot-signal" />

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

            {/* =================================================
                TOTAL USERS
            ================================================= */}

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
                    : stats.total_users}
                </strong>

                <small>
                  {t(
                    "overviewRegisteredUsers"
                  )}
                </small>

              </div>

            </div>

            {/* =================================================
                TOTAL BLUEPRINTS
            ================================================= */}

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
                    : stats.total_blueprints}
                </strong>

                <small>
                  {t(
                    "overviewGeneratedBlueprints"
                  )}
                </small>

              </div>

            </div>

            {/* =================================================
                ACTIVE AGENT RUNS
            ================================================= */}

            <div className="overview-stat-card">

              <div className="overview-stat-top">

                <div className="overview-stat-icon pink">
                  <span>⌁</span>
                </div>

                <span className="overview-stat-badge">
                  Active
                </span>

              </div>

              <div className="overview-stat-info">

                <span>
                  Active Agent Runs
                </span>

                <strong>
                  {loading
                    ? "..."
                    : stats.active_agent_runs}
                </strong>

                <small>
                  Running AI agents
                </small>

              </div>

            </div>

            {/* =================================================
                COMPLETED
            ================================================= */}

            <div className="overview-stat-card">

              <div className="overview-stat-top">

                <div className="overview-stat-icon green">
                  <span>✓</span>
                </div>

                <span className="overview-stat-badge">
                  Status
                </span>

              </div>

              <div className="overview-stat-info">

                <span>
                  Completed
                </span>

                <strong>
                  {loading
                    ? "..."
                    : getStatusCount(
                        "completed"
                      )}
                </strong>

                <small>
                  Completed blueprints
                </small>

              </div>

            </div>

          </section>

          {/* =================================================
              BLUEPRINT STATUS DETAILS
          ================================================= */}

          <section className="overview-status-grid">

            {/* DRAFT */}

            <div className="overview-stat-card">

              <span>
                Draft
              </span>

              <strong>
                {getStatusCount("draft")}
              </strong>

            </div>

            {/* GENERATING */}

            <div className="overview-stat-card">

              <span>
                Generating
              </span>

              <strong>
                {getStatusCount(
                  "generating"
                )}
              </strong>

            </div>

            {/* COMPLETED */}

            <div className="overview-stat-card">

              <span>
                Completed
              </span>

              <strong>
                {getStatusCount(
                  "completed"
                )}
              </strong>

            </div>

            {/* FAILED */}

            <div className="overview-stat-card">

              <span>
                Failed
              </span>

              <strong>
                {getStatusCount("failed")}
              </strong>

            </div>

          </section>

          {/* =================================================
              MAIN GRID
          ================================================= */}

         

            {/* =================================================
                SYSTEM OVERVIEW
            ================================================= */}

            

              <div >

                <div className="overview-system-header">

                  
                </div>

                <div className="system-data-grid">

                  
                </div>

              </div>

          

            

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
                  {t("overviewAiCore")}
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

