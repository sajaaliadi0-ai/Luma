
import { useNavigate } from "react-router-dom";

import {
  FiHome,
  FiUsers,
  FiBox,
  FiActivity,
  FiFileText,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

import { useTranslation } from "../../i18n";

import "./Sidebar.css";

const Sidebar = ({ active }) => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  // ================= ROLE =================

  const user = JSON.parse(localStorage.getItem("user"));

  const role = user?.role;

  console.log("SIDEBAR ROLE:", role);

  // ================= ADMIN ITEMS =================

  const adminItems = [
    {
      name: "Overview",
      label: t("overview"),
      path: "/Overview",
      icon: <FiHome />,
    },

    {
      name: "Users",
      label: t("users"),
      path: "/Users",
      icon: <FiUsers />,
    },

    {
      name: "Blueprints",
      label: t("blueprints"),
      path: "/BlueprintsAdmen",
      icon: <FiBox />,
    },

    {
      name: "Logs",
      label: t("logs"),
      path: "/Logs",
      icon: <FiFileText />,
    },
  ];

  // ================= SUPER ADMIN ITEMS =================

  const superAdminItems = [
    {
      name: "Overview",
      label: t("overview"),
      path: "/Overview",
      icon: <FiHome />,
    },

    {
      name: "Users",
      label: t("users"),
      path: "/Users",
      icon: <FiUsers />,
    },

    {
      name: "Blueprints",
      label: t("blueprints"),
      path: "/BlueprintsAdmen",
      icon: <FiBox />,
    },

    {
      name: "Logs",
      label: t("logs"),
      path: "/Logs",
      icon: <FiFileText />,
    },

    {
      name: "SystemState",
      label: t("systemState"),
      path: "/SystemState",
      icon: <FiActivity />,
    },

    {
      name: "Settings",
      label: t("settings"),
      path: "/Settings",
      icon: <FiSettings />,
    },
  ];

  // ================= SELECT MENU =================

  const menuItems =
    role === "super_admin"
      ? superAdminItems
      : adminItems;

  // ================= LOGOUT =================

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    navigate("/login");
  };

  // ================= UI =================

  return (
    <aside className="sidebar">

      {/* ================= LOGO ================= */}

      <div className="sidebar-logo">

        <div className="logo-circle">
          L
        </div>

        <span>
          Luma
        </span>

      </div>

      {/* ================= MENU ================= */}

      <div className="sidebar-menu">

        {menuItems.map((item) => (

          <div
            key={item.name}
            className={
              active === item.name
                ? "sidebar-link active"
                : "sidebar-link"
            }
            onClick={() => navigate(item.path)}
          >

            <span className="icon">
              {item.icon}
            </span>

            <span>
              {item.label}
            </span>

          </div>

        ))}

      </div>

      {/* ================= FOOTER ================= */}

      <div className="sidebar-footer">

        <div
          className="sidebar-link logout"
          onClick={logout}
        >

          <span className="icon">
            <FiLogOut />
          </span>

          <span>
            {t("logout")}
          </span>

        </div>

      </div>

    </aside>
  );
};

export default Sidebar;

