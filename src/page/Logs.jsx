import { useEffect, useState } from "react";

import {
  FiSearch,
  FiRefreshCw,
  FiFilter,
  FiChevronLeft,
  FiChevronRight,
  FiAlertTriangle,
  FiInfo,
  FiXCircle,
} from "react-icons/fi";

import Sidebar from "../components/Sidebar/Sidebar";

import { useTranslation } from "../i18n";

import "../css/Logs.css";

const Logs = () => {
  const { t } = useTranslation();

  const [logs, setLogs] = useState([]);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;

  const getLogs = async () => {
    try {
      const role = localStorage.getItem("role");

      const api =
        role === "superadmin" ? "/api/superadmin/logs" : "/api/admin/logs";

      const response = await fetch(api, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();

      setLogs(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadLogs = async () => {
      await getLogs();
    };

    loadLogs();
  }, []);

  const filteredLogs = logs.filter((log) => {
    const searchText = `${log.action || ""} 
${log.message || ""} 
${log.user || ""}`.toLowerCase();

    const searchMatch = searchText.includes(search.toLowerCase());

    const filterMatch = filter === "All" || log.level === filter;

    return searchMatch && filterMatch;
  });

  const lastIndex = currentPage * itemsPerPage;

  const firstIndex = lastIndex - itemsPerPage;

  const currentLogs = filteredLogs.slice(
    firstIndex,

    lastIndex
  );

  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);

  const statusIcon = (level) => {
    if (level === "INFO") return <FiInfo />;

    if (level === "WARNING") return <FiAlertTriangle />;

    return <FiXCircle />;
  };

  return (
    <div className="dashboard-layout">
      <Sidebar active="Logs" />

      <div className="page-content">
        <div className="logs-page">
          <div className="logs-header">
            <div>
              <h1>{t("logs")}</h1>

              <p>{t("logsDescription")}</p>
            </div>

            <button
              className="refresh-btn"

              onClick={getLogs}
            >
              <FiRefreshCw />

              {t("refresh")}
            </button>
          </div>

          <div className="logs-toolbar">
            <div className="search-box">
              <FiSearch />

              <input
                placeholder={t("searchLogs")}

                value={search}

                onChange={(e) => {
                  setSearch(e.target.value);

                  setCurrentPage(1);
                }}
              />
            </div>

            <div className="filter-box">
              <FiFilter />

              <select
                value={filter}

                onChange={(e) => {
                  setFilter(e.target.value);

                  setCurrentPage(1);
                }}
              >
                <option value="All">{t("all")}</option>

                <option value="INFO">{t("info")}</option>

                <option value="WARNING">{t("warning")}</option>

                <option value="ERROR">{t("error")}</option>
              </select>
            </div>
          </div>

          <div className="logs-table-wrapper">
            <table className="logs-table">
              <thead>
                <tr>
                  <th>{t("level")}</th>

                  <th>{t("action")}</th>

                  <th>{t("user")}</th>

                  <th>{t("message")}</th>

                  <th>{t("date")}</th>
                </tr>
              </thead>

              <tbody>
                {currentLogs.length > 0 ? (
                  currentLogs.map((log) => (
                    <tr key={log.id}>
                      <td>
                        <span
                          className={`log-level ${log.level?.toLowerCase()}`}
                        >
                          {statusIcon(log.level)}

                          {t(log.level?.toLowerCase())}
                        </span>
                      </td>

                      <td>{log.action}</td>

                      <td>{log.user}</td>

                      <td>{log.message}</td>

                      <td>{log.createdAt || log.date || "-"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="no-data">
                      {t("noLogs")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <button
              onClick={() => {
                if (currentPage > 1) setCurrentPage(currentPage - 1);
              }}
            >
              <FiChevronLeft />
            </button>

            {Array.from(
              { length: totalPages },

              (_, index) => (
                <span
                  key={index}

                  className={currentPage === index + 1 ? "page-active" : ""}

                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </span>
              )
            )}

            <button
              onClick={() => {
                if (currentPage < totalPages) setCurrentPage(currentPage + 1);
              }}
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logs;
