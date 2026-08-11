
import { useEffect, useState } from "react";

import {
  FiSearch,
  FiRefreshCw,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

import Sidebar from "../components/Sidebar/Sidebar";
import { useTranslation } from "../i18n";
import api from "../api/api";

import "../css/Logs.css";

const Logs = () => {
  const { t } = useTranslation();

  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState("");

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [apiError, setApiError] = useState("");

  const itemsPerPage = 8;

  // =====================================================
  // LOAD LOGS
  // =====================================================

  const getLogs = async (from = fromDate, to = toDate) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    // ---------------------------------------------
    // CHECK TOKEN
    // ---------------------------------------------

    if (!token) {
      console.error("LOGS: No authentication token found.");

      setLogs([]);
      setApiError("Authentication token is missing.");
      return;
    }

    try {
      setLoading(true);
      setApiError("");

      // ---------------------------------------------
      // BUILD QUERY PARAMS
      // ---------------------------------------------

      const params = {};

      if (from) {
        params.from = from;
      }

      if (to) {
        params.to = to;
      }

      // ---------------------------------------------
      // SELECT ENDPOINT BASED ON ROLE
      // ---------------------------------------------

      const endpoint =
        role === "super_admin"
          ? "/superadmin/logs"
          : "/admin/logs";

      console.log("LOGS: Token exists:", !!token);
      console.log("LOGS: Role:", role);
      console.log("LOGS: Endpoint:", endpoint);
      console.log("LOGS: Params:", params);

      // ---------------------------------------------
      // API REQUEST
      // ---------------------------------------------

      const response = await api.get(endpoint, {
        params,
      });

      console.log("LOGS API RESPONSE:", response);
      console.log("LOGS API DATA:", response.data);

      // ---------------------------------------------
      // HANDLE RESPONSE
      // ---------------------------------------------

      const data = response.data;

      let logsData = [];

      if (Array.isArray(data)) {
        logsData = data;
      } else if (Array.isArray(data?.logs)) {
        logsData = data.logs;
      } else if (Array.isArray(data?.data)) {
        logsData = data.data;
      } else if (Array.isArray(data?.data?.logs)) {
        logsData = data.data.logs;
      } else if (Array.isArray(data?.data?.items)) {
        logsData = data.data.items;
      } else if (Array.isArray(data?.items)) {
        logsData = data.items;
      }

      console.log("NORMALIZED LOGS:", logsData);

      setLogs(logsData);
      setCurrentPage(1);
    } catch (error) {
      console.error("INITIAL LOGS API ERROR:", {
        status: error?.response?.status,
        statusText: error?.response?.statusText,
        data: error?.response?.data,
        message: error?.message,
      });

      // ---------------------------------------------
      // 401 UNAUTHORIZED
      // ---------------------------------------------

      if (error?.response?.status === 401) {
        setLogs([]);

        setApiError(
          "Your session is no longer valid. Please login again."
        );

        return;
      }

      // ---------------------------------------------
      // 403 FORBIDDEN
      // ---------------------------------------------

      if (error?.response?.status === 403) {
        setLogs([]);

        setApiError(
          "You do not have permission to view the logs."
        );

        return;
      }

      // ---------------------------------------------
      // OTHER API ERRORS
      // ---------------------------------------------

      if (error?.response) {
        setLogs([]);

        setApiError(
          `Logs API error: ${error.response.status}`
        );

        return;
      }

      // ---------------------------------------------
      // NETWORK / UNKNOWN ERROR
      // ---------------------------------------------

      setLogs([]);
      setApiError("Failed to load logs.");
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // INITIAL LOAD
  // =====================================================


useEffect(() => {
  let cancelled = false;

  const loadInitialLogs = async () => {
    if (cancelled) return;

    await getLogs();
  };

  loadInitialLogs();

  return () => {
    cancelled = true;
  };

  // We intentionally load logs only once.
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);



  // =====================================================
  // SEARCH
  // =====================================================

  const filteredLogs = logs.filter((log) => {
    const text = `
      ${log?.action || ""}
      ${log?.entity_type || ""}
      ${log?.user_id || ""}
      ${log?.ip_address || ""}
      ${log?.created_at || ""}
    `.toLowerCase();

    return text.includes(search.toLowerCase());
  });

  // =====================================================
  // PAGINATION
  // =====================================================

  const totalPages =
    Math.ceil(filteredLogs.length / itemsPerPage) || 1;

  const lastIndex = currentPage * itemsPerPage;

  const firstIndex = lastIndex - itemsPerPage;

  const currentLogs = filteredLogs.slice(
    firstIndex,
    lastIndex
  );

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="dashboard-layout">

      {/* =================================================
          SIDEBAR
      ================================================= */}

      <Sidebar active="Logs" />

      {/* =================================================
          CONTENT
      ================================================= */}

      <div className="page-content">

        <div className="logs-page">

          {/* =================================================
              HEADER
          ================================================= */}

          <div className="logs-header">

            <div>
              <h1>
                {t("logs")}
              </h1>

              <p>
                {t("logsDescription")}
              </p>
            </div>

            <button
              className="refresh-btn"
              onClick={() => getLogs()}
              disabled={loading}
            >
              <FiRefreshCw />

              {loading
                ? t("loading")
                : t("refresh")}
            </button>

          </div>

          {/* =================================================
              TOOLBAR
          ================================================= */}

          <div className="logs-toolbar">

            {/* SEARCH */}

            <div className="search-box">

              <FiSearch />

              <input
                type="text"
                placeholder={t("searchLogs")}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
              />

            </div>

            {/* DATE FILTER */}

            <div className="filter-box">

              <input
                type="date"
                value={fromDate}
                onChange={(e) => {
                  setFromDate(e.target.value);
                  setCurrentPage(1);
                }}
              />

              <input
                type="date"
                value={toDate}
                onChange={(e) => {
                  setToDate(e.target.value);
                  setCurrentPage(1);
                }}
              />

              <button
                className="apply-filter-btn"
                onClick={() => {
                  setCurrentPage(1);

                  getLogs(
                    fromDate,
                    toDate
                  );
                }}
                disabled={loading}
              >
                {t("apply")}
              </button>

            </div>

          </div>

          {/* =================================================
              API ERROR
          ================================================= */}

          {apiError && !loading && (
            <div className="logs-error">
              {apiError}
            </div>
          )}

          {/* =================================================
              LOADING
          ================================================= */}

          {loading ? (

            <div className="logs-loading">

              <div className="spinner"></div>

              <p>
                {t("loading")}
              </p>

            </div>

          ) : (

            <div className="logs-table-wrapper">

              <table className="logs-table">

                <thead>

                  <tr>

                    <th>
                      {t("timestamp")}
                    </th>

                    <th>
                      {t("action")}
                    </th>

                    <th>
                      {t("entityType")}
                    </th>

                    <th>
                      {t("userId")}
                    </th>

                    <th>
                      {t("ipAddress")}
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {currentLogs.length > 0 ? (

                    currentLogs.map(
                      (log, index) => (

                        <tr
                          key={
                            log?.id ||
                            `${log?.created_at}-${index}`
                          }
                        >

                          <td>
                            {log?.created_at || "-"}
                          </td>

                          <td>
                            {log?.action || "-"}
                          </td>

                          <td>
                            {log?.entity_type || "-"}
                          </td>

                          <td>
                            {log?.user_id || "-"}
                          </td>

                          <td>
                            {log?.ip_address || "-"}
                          </td>

                        </tr>

                      )
                    )

                  ) : (

                    <tr>

                      <td
                        colSpan="5"
                        className="no-data"
                      >

                        {apiError
                          ? apiError
                          : t("noLogsFound")}

                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          )}

          {/* =================================================
              PAGINATION
          ================================================= */}

          {!loading &&
            filteredLogs.length > 0 && (

              <div className="pagination">

                <button
                  disabled={currentPage === 1}
                  onClick={() => {
                    setCurrentPage(
                      (page) =>
                        Math.max(
                          page - 1,
                          1
                        )
                    );
                  }}
                >
                  <FiChevronLeft />
                </button>

                <span className="page-info">

                  {currentPage}

                  {" / "}

                  {totalPages}

                </span>

                <button
                  disabled={
                    currentPage === totalPages
                  }
                  onClick={() => {
                    setCurrentPage(
                      (page) =>
                        Math.min(
                          page + 1,
                          totalPages
                        )
                    );
                  }}
                >
                  <FiChevronRight />
                </button>

              </div>

            )}

        </div>

      </div>

    </div>
  );
};

export default Logs;

