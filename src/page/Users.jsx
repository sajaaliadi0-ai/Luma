import { useEffect, useState } from "react";

import api from "../api/api";
import Sidebar from "../components/Sidebar/Sidebar";

import { useTranslation } from "../i18n";

import "../css/Users.css";

function User({ dark }) {
  const { t } = useTranslation();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  // ================= GET USERS =================

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/users");

      const data = response?.data;

      if (Array.isArray(data)) {
        setUsers(data);
      } else if (Array.isArray(data?.users)) {
        setUsers(data.users);
      } else if (Array.isArray(data?.data)) {
        setUsers(data.data);
      } else {
        setUsers([]);
      }
    } catch (err) {
      console.error("Failed to fetch users:", err);

      setError(
        err?.response?.data?.message ||
          t("usersLoadError")
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadUsers = async () => {
      await fetchUsers();
    };

    loadUsers();
  }, []);

  // ================= HELPERS =================

  const getUserName = (user) => {
    return (
      user?.name ||
      user?.username ||
      `${user?.firstName || ""} ${user?.lastName || ""}`.trim() ||
      t("usersUnknownUser")
    );
  };

  const getUserRole = (user) => {
    const role = user?.role || user?.userRole || "User";

    const roles = {
      User: t("usersUserRole"),
      user: t("usersUserRole"),

      Admin: t("usersAdminRole"),
      admin: t("usersAdminRole"),

      "Super Admin": t("usersSuperAdminRole"),
      "super admin": t("usersSuperAdminRole"),
      superadmin: t("usersSuperAdminRole"),
    };

    return roles[role] || role;
  };

  const getUserStatus = (user) => {
    return (
      user?.status ||
      (user?.isActive ? "Active" : "Inactive")
    );
  };

  const isUserActive = (user) => {
    return (
      String(getUserStatus(user)).toLowerCase() ===
      "active"
    );
  };

  const getTranslatedStatus = (user) => {
    return isUserActive(user)
      ? t("usersActiveStatus")
      : t("usersInactiveStatus");
  };

  const getInitial = (user) => {
    return getUserName(user)
      .charAt(0)
      .toUpperCase();
  };

  // ================= SEARCH =================

  const filteredUsers = users.filter((user) => {
    const value = search.toLowerCase();

    return (
      String(user?.name || "")
        .toLowerCase()
        .includes(value) ||
      String(user?.email || "")
        .toLowerCase()
        .includes(value) ||
      String(user?.role || "")
        .toLowerCase()
        .includes(value) ||
      String(user?.username || "")
        .toLowerCase()
        .includes(value)
    );
  });

  // ================= RENDER =================

  return (
    <div
      className={`dashboard-layout ${
        dark ? "dark" : ""
      }`}
    >
      {/* ================= SIDEBAR ================= */}

      <Sidebar active="Users" />

      {/* ================= PAGE CONTENT ================= */}

      <div className="page-content">

        {/* ================= HEADER ================= */}

        <header className="user-header">
          <div>
            <h1>{t("usersTitle")}</h1>

            <p>{t("usersDescription")}</p>
          </div>

          <button
            className="user-refresh-button"
            onClick={fetchUsers}
            disabled={loading}
          >
            ↻

            <span>
              {loading
                ? t("usersLoading")
                : t("usersRefresh")}
            </span>
          </button>
        </header>

        {/* ================= STATS ================= */}

        <section className="user-stats">

          {/* Total Users */}

          <div className="user-stat-card">
            <div className="user-stat-icon user-purple">
              ♙
            </div>

            <div>
              <span>
                {t("usersTotal")}
              </span>

              <h2>{users.length}</h2>
            </div>
          </div>

          {/* Active Users */}

          <div className="user-stat-card">
            <div className="user-stat-icon user-green">
              ✓
            </div>

            <div>
              <span>
                {t("usersActive")}
              </span>

              <h2>
                {
                  users.filter((user) =>
                    isUserActive(user)
                  ).length
                }
              </h2>
            </div>
          </div>

          {/* Inactive Users */}

          <div className="user-stat-card">
            <div className="user-stat-icon user-orange">
              ◉
            </div>

            <div>
              <span>
                {t("usersInactive")}
              </span>

              <h2>
                {
                  users.filter(
                    (user) => !isUserActive(user)
                  ).length
                }
              </h2>
            </div>
          </div>

          {/* Search Results */}

          <div className="user-stat-card">
            <div className="user-stat-icon user-blue">
              ⌕
            </div>

            <div>
              <span>
                {t("usersSearchResults")}
              </span>

              <h2>
                {filteredUsers.length}
              </h2>
            </div>
          </div>

        </section>

        {/* ================= USERS TABLE ================= */}

        <section className="user-content-card">

          <div className="user-content-header">

            <div>
              <h2>
                {t("usersAll")}
              </h2>

              <p>
                {t("usersAllDescription")}
              </p>
            </div>

            {/* Search */}

            <div className="user-search-wrapper">

              <span className="user-search-icon">
                ⌕
              </span>

              <input
                type="text"
                placeholder={t(
                  "usersSearchPlaceholder"
                )}
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>

          </div>

          {/* ================= ERROR ================= */}

          {error && (
            <div className="user-error">

              <span>{error}</span>

              <button onClick={fetchUsers}>
                {t("usersTryAgain")}
              </button>

            </div>
          )}

          {/* ================= LOADING ================= */}

          {loading ? (

            <div className="user-loading">

              <div className="user-spinner"></div>

              <p>
                {t("usersLoadingUsers")}
              </p>

            </div>

          ) : filteredUsers.length === 0 ? (

            /* ================= EMPTY ================= */

            <div className="user-empty">

              <div className="user-empty-icon">
                ♙
              </div>

              <h3>
                {t("usersNoUsers")}
              </h3>

              <p>
                {search
                  ? t("usersNoSearchResults")
                  : t("usersNoUsersToDisplay")}
              </p>

            </div>

          ) : (

            /* ================= TABLE ================= */

            <div className="user-table-wrapper">

              <table className="user-table">

                <thead>
                  <tr>

                    <th>
                      {t("usersUser")}
                    </th>

                    <th>
                      {t("usersEmail")}
                    </th>

                    <th>
                      {t("usersRole")}
                    </th>

                    <th>
                      {t("usersStatus")}
                    </th>

                    <th>
                      {t("usersAction")}
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {filteredUsers.map(
                    (user, index) => {

                      const name =
                        getUserName(user);

                      const role =
                        getUserRole(user);

                      return (
                        <tr
                          key={
                            user?.id ||
                            user?._id ||
                            index
                          }
                        >

                          {/* User */}

                          <td>

                            <div className="user-info">

                              <div className="user-avatar">
                                {getInitial(user)}
                              </div>

                              <div>

                                <strong>
                                  {name}
                                </strong>

                                {user?.username && (
                                  <small>
                                    @{user.username}
                                  </small>
                                )}

                              </div>

                            </div>

                          </td>

                          {/* Email */}

                          <td>

                            <span className="user-email">
                              {user?.email || "—"}
                            </span>

                          </td>

                          {/* Role */}

                          <td>

                            <span className="user-role">
                              {role}
                            </span>

                          </td>

                          {/* Status */}

                          <td>

                            <span
                              className={`user-status ${
                                isUserActive(user)
                                  ? "user-status-active"
                                  : "user-status-inactive"
                              }`}
                            >

                              <span className="user-status-dot"></span>

                              {getTranslatedStatus(
                                user
                              )}

                            </span>

                          </td>

                          {/* Action */}

                          <td>

                            <button
                              className="user-view-button"
                              onClick={() =>
                                setSelectedUser(
                                  user
                                )
                              }
                            >
                              {t("usersView")}
                            </button>

                          </td>

                        </tr>
                      );
                    }
                  )}

                </tbody>

              </table>

            </div>
          )}

        </section>

      </div>

      {/* ================= USER DETAILS MODAL ================= */}

      {selectedUser && (

        <div
          className="user-modal-overlay"
          onClick={() =>
            setSelectedUser(null)
          }
        >

          <div
            className="user-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* Modal Header */}

            <div className="user-modal-header">

              <div>

                <h2>
                  {t("usersDetails")}
                </h2>

                <p>
                  {t(
                    "usersDetailsDescription"
                  )}
                </p>

              </div>

              <button
                className="user-modal-close"
                onClick={() =>
                  setSelectedUser(null)
                }
              >
                ×
              </button>

            </div>

            {/* ================= PROFILE ================= */}

            <div className="user-modal-profile">

              <div className="user-modal-avatar">
                {getInitial(selectedUser)}
              </div>

              <div>

                <h3>
                  {getUserName(
                    selectedUser
                  )}
                </h3>

                <p>
                  {selectedUser?.email ||
                    "—"}
                </p>

              </div>

            </div>

            {/* ================= DETAILS ================= */}

            <div className="user-details-grid">

              {/* ID */}

              <div className="user-detail-item">

                <span>
                  {t("usersId")}
                </span>

                <strong>
                  {selectedUser?.id ||
                    selectedUser?._id ||
                    "—"}
                </strong>

              </div>

              {/* Role */}

              <div className="user-detail-item">

                <span>
                  {t("usersRole")}
                </span>

                <strong>
                  {getUserRole(
                    selectedUser
                  )}
                </strong>

              </div>

              {/* Status */}

              <div className="user-detail-item">

                <span>
                  {t("usersStatus")}
                </span>

                <strong>
                  {getTranslatedStatus(
                    selectedUser
                  )}
                </strong>

              </div>

              {/* Username */}

              <div className="user-detail-item">

                <span>
                  {t("usersUsername")}
                </span>

                <strong>
                  {selectedUser?.username ||
                    "—"}
                </strong>

              </div>

            </div>

            {/* ================= CLOSE ================= */}

            <button
              className="user-modal-done"
              onClick={() =>
                setSelectedUser(null)
              }
            >
              {t("usersClose")}
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default User;