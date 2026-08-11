
import { useEffect, useState } from "react";

import {
  FiUsers,
  FiFileText,
  FiActivity,
  FiServer,
  FiRefreshCw,
  FiCheckCircle,
  FiAlertTriangle,
  FiXCircle,
} from "react-icons/fi";

import api from "../api/api";

import { useTranslation } from "../i18n";

import Sidebar from "../components/Sidebar/Sidebar";

import "../css/SystemState.css";

const SystemState = () => {
  const { t } = useTranslation();

  const [health, setHealth] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // =========================================================
  // FETCH SYSTEM STATISTICS
  // =========================================================

  const fetchHealth = async () => {
    try {
      setLoading(true);
      setError("");

      // =====================================================
      // Swagger Endpoint:
      //
      // GET /api/super-admin/system-stats
      //
      // api.js already adds:
      // Authorization: Bearer <token>
      // =====================================================

      const response = await api.get(
        "/super-admin/system-stats"
      );

      console.log(
        "SYSTEM STATS RESPONSE:",
        response.data
      );

      // =====================================================
      // API RESPONSE:
      //
      // {
      //   success: true,
      //   data: {
      //     total_users: 100,
      //     total_blueprints: 50
      //   }
      // }
      // =====================================================

      if (
        response.data?.success === false
      ) {
        throw new Error(
          response.data?.message ||
          "Failed to load system statistics"
        );
      }

      const data =
        response.data?.data || {};

      setHealth(data);

    } catch (err) {
      console.error(
        "System stats error:",
        err
      );

      // =====================================================
      // 401
      // =====================================================

      if (
        err.response?.status === 401
      ) {
        setError(
          "غير مصرح لك بالوصول إلى إحصائيات النظام. يرجى تسجيل الدخول مرة أخرى."
        );
      }

      // =====================================================
      // 403
      // =====================================================

      else if (
        err.response?.status === 403
      ) {
        setError(
          "ليس لديك صلاحية للوصول إلى إحصائيات النظام."
        );
      }

      // =====================================================
      // OTHER ERRORS
      // =====================================================

      else {
        setError(
          err.response?.data?.message ||
          err.message ||
          "Failed to load system statistics"
        );
      }

      setHealth(null);

    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // AUTO REFRESH
  // =========================================================

  useEffect(() => {
    const initialTimer =
      setTimeout(() => {
        fetchHealth();
      }, 0);

    const interval =
      setInterval(() => {
        fetchHealth();
      }, 30000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  // =========================================================
  // STATUS ICON
  // =========================================================

  const statusIcon = (status) => {
    const value =
      String(status).toLowerCase();

    if (
      value === "running" ||
      value === "connected" ||
      value === "active"
    ) {
      return <FiCheckCircle />;
    }

    if (
      value === "warning"
    ) {
      return <FiAlertTriangle />;
    }

    return <FiXCircle />;
  };

  // =========================================================
  // STATUS TEXT
  // =========================================================

  const getStatusText = (status) => {
    const value =
      String(status).toLowerCase();

    if (
      value === "running"
    ) {
      return t("running");
    }

    if (
      value === "stopped"
    ) {
      return t("stopped");
    }

    if (
      value === "connected"
    ) {
      return t("connected");
    }

    if (
      value === "disconnected"
    ) {
      return t("disconnected");
    }

    return status;
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="loading-page">
        {t("loadingSystemData")}
      </div>
    );
  }

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <div className="dashboard-layout">

      <Sidebar active="SystemState" />

      <div className="page-content">

        <div className="system-page">

          {/* =================================================
              HEADER
          ================================================= */}

          <div className="system-header">

            <div>

              <h1>
                {t("systemState")}
              </h1>

              <p>
                {t(
                  "systemStateDescription"
                )}
              </p>

            </div>

            <button
              className="refresh-btn"
              onClick={fetchHealth}
            >

              <FiRefreshCw />

              {t("refresh")}

            </button>

          </div>

          {/* =================================================
              ERROR
          ================================================= */}

          {error && (
            <div className="system-error">

              <span>
                {error}
              </span>

              <button
                onClick={fetchHealth}
              >
                {t("tryAgain")}
              </button>

            </div>
          )}

          {/* =================================================
              SYSTEM CARDS
          ================================================= */}

          <div className="system-cards">

            {/* =================================================
                TOTAL USERS
            ================================================= */}

            <div className="system-card">

              <div className="card-icon purple">

                <FiUsers />

              </div>

              <div>

                <span>
                  {t("totalUsers")}
                </span>

                <h2>
                  {
                    health?.total_users ??
                    0
                  }
                </h2>

              </div>

            </div>

            {/* =================================================
                TOTAL BLUEPRINTS
            ================================================= */}

            <div className="system-card">

              <div className="card-icon green">

                <FiFileText />

              </div>

              <div>

                <span>
                  {t("totalBlueprints")}
                </span>

                <h2>
                  {
                    health?.total_blueprints ??
                    0
                  }
                </h2>

              </div>

            </div>

            {/* =================================================
                SYSTEM STATUS
            ================================================= */}

            <div className="system-card">

              <div className="card-icon orange">

                <FiActivity />

              </div>

              <div>

                <span>
                  {t("systemStatus")}
                </span>

                <h2>

                  <span className="service-status running">

                    {statusIcon(
                      "running"
                    )}

                    {getStatusText(
                      "running"
                    )}

                  </span>

                </h2>

              </div>

            </div>

            {/* =================================================
                API STATUS
            ================================================= */}

            <div className="system-card">

              <div className="card-icon blue">

                <FiServer />

              </div>

              <div>

                <span>
                  {t("apiStatus")}
                </span>

                <h2>

                  <span className="service-status connected">

                    {statusIcon(
                      "connected"
                    )}

                    {getStatusText(
                      "connected"
                    )}

                  </span>

                </h2>

              </div>

            </div>

          </div>

          {/* =================================================
              SYSTEM SUMMARY
          ================================================= */}

          <div className="resources-card">

            <h2>
              {t("systemResources")}
            </h2>

            <div className="progress-item">

              <div>

                <span>
                  {t("systemStatus")}
                </span>

                <b>
                  {getStatusText(
                    "running"
                  )}
                </b>

              </div>

              <div className="progress">

                <div
                  style={{
                    width: "100%",
                  }}
                />

              </div>

            </div>

          </div>

          {/* =================================================
              SERVICES STATUS
          ================================================= */}

          <div className="services-table">

            <h2>
              {t("servicesStatus")}
            </h2>

            <table>

              <thead>

                <tr>

                  <th>
                    {t("service")}
                  </th>

                  <th>
                    {t("status")}
                  </th>

                  <th>
                    {t("details")}
                  </th>

                </tr>

              </thead>

              <tbody>

                {/* LUMA API */}

                <tr>

                  <td>
                    Luma API
                  </td>

                  <td>

                    <span className="service-status running">

                      {statusIcon(
                        "running"
                      )}

                      {getStatusText(
                        "running"
                      )}

                    </span>

                  </td>

                  <td>
                    {t("apiStatus")}
                  </td>

                </tr>

                {/* SYSTEM STATISTICS */}

                <tr>

                  <td>
                    System Statistics
                  </td>

                  <td>

                    <span className="service-status connected">

                      {statusIcon(
                        "connected"
                      )}

                      {getStatusText(
                        "connected"
                      )}

                    </span>

                  </td>

                  <td>
                    {t("systemState")}
                  </td>

                </tr>

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
};

export default SystemState;

