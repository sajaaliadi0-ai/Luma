import { useState } from "react";
import { useTranslation } from "../i18n";
import Sidebar from "../components/Sidebar/Sidebar";
import "../css/Settings.css";

function SystemSettings({ dark, setDark }) {
  const { t } = useTranslation();

  const [settings, setSettings] = useState({
    maintenanceMode: false,
    registrationEnabled: true,
    emailVerification: true,
    notifications: true,
    allowBlueprintCreation: true,
    allowAiChat: true,
  });

  const handleToggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className={`system-settings-page ${dark ? "dark" : ""}`}>
      {/* ================= SIDEBAR ================= */}

      <Sidebar dark={dark} setDark={setDark} />

      {/* ================= MAIN CONTENT ================= */}

      <main className="system-settings-main">
        {/* ================= HEADER ================= */}

        <header className="system-settings-header">
          <div>
            <h1>{t("systemSettings")}</h1>

            <p>{t("systemSettingsDescription")}</p>
          </div>
        </header>

        {/* ================= GENERAL SETTINGS ================= */}

        <section className="system-settings-card">
          <div className="system-settings-card-header">
            <div>
              <h2>{t("generalSettings")}</h2>

              <p>{t("generalSettingsDescription")}</p>
            </div>
          </div>

          <div className="system-settings-list">
            {/* Maintenance Mode */}

            <div className="system-settings-item">
              <div className="system-settings-item-info">
                <h3>{t("maintenanceMode")}</h3>

                <p>{t("maintenanceModeDescription")}</p>
              </div>

              <button
                type="button"
                className={`system-settings-toggle ${
                  settings.maintenanceMode
                    ? "system-settings-toggle-active"
                    : ""
                }`}
                onClick={() => handleToggle("maintenanceMode")}
                aria-label={t("toggleMaintenanceMode")}
              >
                <span></span>
              </button>
            </div>

            {/* User Registration */}

            <div className="system-settings-item">
              <div className="system-settings-item-info">
                <h3>{t("userRegistration")}</h3>

                <p>{t("userRegistrationDescription")}</p>
              </div>

              <button
                type="button"
                className={`system-settings-toggle ${
                  settings.registrationEnabled
                    ? "system-settings-toggle-active"
                    : ""
                }`}
                onClick={() => handleToggle("registrationEnabled")}
                aria-label={t("toggleUserRegistration")}
              >
                <span></span>
              </button>
            </div>

            {/* Email Verification */}

            <div className="system-settings-item">
              <div className="system-settings-item-info">
                <h3>{t("emailVerification")}</h3>

                <p>{t("emailVerificationDescription")}</p>
              </div>

              <button
                type="button"
                className={`system-settings-toggle ${
                  settings.emailVerification
                    ? "system-settings-toggle-active"
                    : ""
                }`}
                onClick={() => handleToggle("emailVerification")}
                aria-label={t("toggleEmailVerification")}
              >
                <span></span>
              </button>
            </div>
          </div>
        </section>

        {/* ================= PLATFORM SETTINGS ================= */}

        <section className="system-settings-card">
          <div className="system-settings-card-header">
            <div>
              <h2>{t("platformFeatures")}</h2>

              <p>{t("platformFeaturesDescription")}</p>
            </div>
          </div>

          <div className="system-settings-list">
            {/* Notifications */}

            <div className="system-settings-item">
              <div className="system-settings-item-info">
                <h3>{t("notifications")}</h3>

                <p>{t("notificationsDescription")}</p>
              </div>

              <button
                type="button"
                className={`system-settings-toggle ${
                  settings.notifications ? "system-settings-toggle-active" : ""
                }`}
                onClick={() => handleToggle("notifications")}
                aria-label={t("toggleNotifications")}
              >
                <span></span>
              </button>
            </div>

            {/* Blueprint Creation */}

            <div className="system-settings-item">
              <div className="system-settings-item-info">
                <h3>{t("blueprintCreation")}</h3>

                <p>{t("blueprintCreationDescription")}</p>
              </div>

              <button
                type="button"
                className={`system-settings-toggle ${
                  settings.allowBlueprintCreation
                    ? "system-settings-toggle-active"
                    : ""
                }`}
                onClick={() => handleToggle("allowBlueprintCreation")}
                aria-label={t("toggleBlueprintCreation")}
              >
                <span></span>
              </button>
            </div>

            {/* AI Chat */}

            <div className="system-settings-item">
              <div className="system-settings-item-info">
                <h3>{t("aiChat")}</h3>

                <p>{t("aiChatDescription")}</p>
              </div>

              <button
                type="button"
                className={`system-settings-toggle ${
                  settings.allowAiChat ? "system-settings-toggle-active" : ""
                }`}
                onClick={() => handleToggle("allowAiChat")}
                aria-label={t("toggleAiChat")}
              >
                <span></span>
              </button>
            </div>
          </div>
        </section>

        {/* ================= SYSTEM INFORMATION ================= */}

        <section className="system-settings-card">
          <div className="system-settings-card-header">
            <div>
              <h2>{t("systemInformation")}</h2>

              <p>{t("systemInformationDescription")}</p>
            </div>
          </div>

          <div className="system-settings-info-grid">
            {/* Platform */}

            <div className="system-settings-info-box">
              <span>{t("platform")}</span>

              <strong>LUMA</strong>
            </div>

            {/* Environment */}

            <div className="system-settings-info-box">
              <span>{t("environment")}</span>

              <strong>{t("production")}</strong>
            </div>

            {/* System Status */}

            <div className="system-settings-info-box">
              <span>{t("systemStatus")}</span>

              <strong className="system-settings-status">
                <span></span>

                {t("operational")}
              </strong>
            </div>

            {/* Version */}

            <div className="system-settings-info-box">
              <span>{t("version")}</span>

              <strong>1.0.0</strong>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default SystemSettings;
