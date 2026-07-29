import { useState, useRef, useEffect } from "react";
import "../css/newBlueprint.css";
import Newblueprint from "./new-blueprint";
import { useTranslation } from "../i18n";

/* Small inline icons */
const Icon = ({ children, size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);

const IconMonitor = (p) => (
  <Icon {...p}>
    <rect x="3" y="4" width="18" height="13" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </Icon>
);
const IconEdit = (p) => (
  <Icon {...p}>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </Icon>
);
const IconFiles = (p) => (
  <Icon {...p}>
    <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
  </Icon>
);
const IconAnalysis = (p) => (
  <Icon {...p}>
    <path d="M4 19V10M12 19V5M20 19v-7" />
  </Icon>
);
const IconMore = (p) => (
  <Icon {...p}>
    <circle cx="5" cy="12" r="1.4" fill="currentColor" stroke="none" />
    <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
    <circle cx="19" cy="12" r="1.4" fill="currentColor" stroke="none" />
  </Icon>
);
const IconRefresh = (p) => (
  <Icon {...p}>
    <path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5" />
  </Icon>
);
const IconHome = (p) => (
  <Icon {...p}>
    <path d="M3 11l9-7 9 7" />
    <path d="M5 10v10h14V10" />
  </Icon>
);
const IconExternal = (p) => (
  <Icon {...p}>
    <path d="M14 4h6v6M20 4 10 14" />
    <path d="M20 14v6H4V4h6" />
  </Icon>
);
const IconCode = (p) => (
  <Icon {...p}>
    <path d="M8 5 3 12l5 7M16 5l5 7-5 7" />
  </Icon>
);
const IconChevronDown = (p) => (
  <Icon {...p}>
    <path d="M6 9l6 6 6-6" />
  </Icon>
);
const IconHistory = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l4 2" />
  </Icon>
);
const IconChevronsRight = (p) => (
  <Icon {...p}>
    <path d="M6 5l6 7-6 7M13 5l6 7-6 7" />
  </Icon>
);

const MAIN_TABS = [
  { key: "viewer", label: "tabAppViewer", icon: IconMonitor },
  { key: "edit", label: "tabEdit", icon: IconEdit },
  { key: "files", label: "tabFiles", icon: IconFiles },
  { key: "analysis", label: "tabAnalysis", icon: IconAnalysis },
];
const MORE_TABS = [
  { key: "terminal", label: "tabTerminal" },
  { key: "planner", label: "tabPlanner" },
  { key: "browser", label: "tabBrowser" },
  { key: "notebook", label: "tabNotebook" },
];

function TabCluster({ activeTab, onSelect }) {
  const [moreOpen, setMoreOpen] = useState(false);
  const clusterRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    function handleClickOutside(e) {
      if (clusterRef.current && !clusterRef.current.contains(e.target)) {
        setMoreOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeMoreTab = MORE_TABS.find((tab) => tab.key === activeTab);

  return (
    <div className="newBlueprint-tabcluster" ref={clusterRef}>
      {MAIN_TABS.map((tab) => {
        const TabIcon = tab.icon;
        const isActive = tab.key === activeTab;
        return (
          <button
            key={tab.key}
            type="button"
            className={"newBlueprint-tab" + (isActive ? " newBlueprint-tab--active" : "")}
            onClick={() => {
              onSelect(tab.key);
              setMoreOpen(false);
            }}
            title={t(tab.label)}
          >
            <TabIcon />
            <span className="newBlueprint-tab-label">{t(tab.label)}</span>
          </button>
        );
      })}

      {activeMoreTab && (
        <button
          type="button"
          className="newBlueprint-tab newBlueprint-tab--active"
          onClick={() => setMoreOpen((prev) => !prev)}
        >
          <IconMonitor />
          <span className="newBlueprint-tab-label">{t(activeMoreTab.label)}</span>
        </button>
      )}

      <button
        type="button"
        className={"newBlueprint-more-btn" + (moreOpen ? " newBlueprint-more-btn--open" : "")}
        onClick={() => setMoreOpen((prev) => !prev)}
        title={t("more")}
      >
        <IconMore />
      </button>

      {moreOpen && (
        <div className="newBlueprint-more-menu" role="menu">
          {MORE_TABS.map((tab) => {
            const isActive = tab.key === activeTab;
            return (
              <button
                key={tab.key}
                type="button"
                className={"newBlueprint-more-item" + (isActive ? " newBlueprint-more-item--active" : "")}
                onClick={() => {
                  onSelect(tab.key);
                  setMoreOpen(false);
                }}
              >
                {t(tab.label)}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

const TooltipButton = ({ children, tooltip, onClick }) => (
  <button className="newBlueprint-icon-btn newBlueprint-tooltip-btn" onClick={onClick} data-tooltip={tooltip} type="button">
    {children}
  </button>
);

const EmptyState = ({ message }) => {
  const { t } = useTranslation();
  return (
    <div className="newBlueprint-empty-viewer">
      <div className="newBlueprint-robot">
        <div className="robot-character">
          <div className="robot-antenna">
            <span></span>
          </div>
          <div className="robot-head">
            <div className="robot-ear robot-ear-left"></div>
            <div className="robot-ear robot-ear-right"></div>
            <div className="robot-eyes">
              <div className="robot-eye">
                <span></span>
              </div>
              <div className="robot-eye">
                <span></span>
              </div>
            </div>
            <div className="robot-cheeks">
              <span></span>
              <span></span>
            </div>
            <div className="robot-mouth"></div>
          </div>
          <div className="robot-body">
            <div className="robot-screen"></div>
            <div className="robot-buttons">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>

      <h2>{message}</h2>
      <p>{t("emptyStateDetail")}</p>
    </div>
  );
};

const AnalyticsEmptyState = () => {
  const { t } = useTranslation();
  return (
    <div className="newBlueprint-analysis-empty">
      <div className="newBlueprint-chart-icon">
        <div className="chart-bar chart-bar-big"></div>
        <div className="chart-bar chart-bar-medium"></div>
        <div className="chart-bar chart-bar-small"></div>
      </div>
      <h2>{t("siteAnalyticsTitle")}</h2>
      <p>{t("siteAnalyticsText")}</p>
    </div>
  );
};

const FilesView = () => {
  const { t } = useTranslation();
  return (
    <div className="newBlueprint-files-view">
      <div className="newBlueprint-file-header">
        <h3>{t("filesTitle")}</h3>
      </div>

      <div className="newBlueprint-file-tree">
        {filesContent.map((file, index) => (
          <div key={index} className="newBlueprint-file-item">
            <span>{file.type === "folder" ? "📁" : "📄"}</span>
            <span>{file.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const filesContent = [
  { name: "src", type: "folder" },
  { name: "App.jsx", type: "file" },
  { name: "index.css", type: "file" },
  { name: "package.json", type: "file" },
];

export default function NewBlueprint() {
  const [activeTab, setActiveTab] = useState("viewer");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { t } = useTranslation();

  const viewerContent = null;
  const editContent = null;
  const analysisContent = null;
  const terminalContent = null;

  return (
    <div className="blueprint-container">
      <div className={`newBlueprint-page ${drawerOpen ? "split-mode" : ""}`}>
        <header className="newBlueprint-topbar">
          <div className="newBlueprint-topbar-left">
            <span className="newBlueprint-logo" title="Luma">
              <span className="luma-character">
                <span className="luma-ear luma-ear-left"></span>
                <span className="luma-ear luma-ear-right"></span>
                <span className="luma-face">
                  <span className="luma-eye luma-eye-left"></span>
                  <span className="luma-eye luma-eye-right"></span>
                  <span className="luma-smile"></span>
                </span>
              </span>
            </span>

            <button className="newBlueprint-icon-btn" title={t("history")} type="button">
              <IconHistory />
            </button>

            <button
              className="newBlueprint-icon-btn"
              title={drawerOpen ? t("closeSplitView") : t("openSplitView")}
              type="button"
              onClick={() => setDrawerOpen((prev) => !prev)}
            >
              <IconChevronsRight className={drawerOpen ? "rotate-icon" : ""} />
            </button>
          </div>

          <div className="newBlueprint-topbar-center">
            <div className="newBlueprint-divider" />
            <TabCluster activeTab={activeTab} onSelect={setActiveTab} />
          </div>

          <div className="newBlueprint-topbar-right">
            <button className="newBlueprint-btn newBlueprint-btn--ghost" disabled type="button">
              {t("workspaceShare")}
            </button>
            <button className="newBlueprint-btn newBlueprint-btn--accent" type="button">
              {t("workspaceUpgrade")}
            </button>
            <button className="newBlueprint-btn newBlueprint-btn--primary" type="button">
              {t("workspacePublish")}
            </button>
          </div>
        </header>

        {activeTab === "viewer" && (
          <div className="newBlueprint-subbar">
            <div />
            <div className="newBlueprint-subbar-center">
              <TooltipButton tooltip={t("showDesktopPreview")}>
                <IconMonitor />
              </TooltipButton>
              <TooltipButton tooltip={t("reloadAppViewer")}>
                <IconRefresh />
              </TooltipButton>
              <TooltipButton tooltip={t("homeButton")}>
                <IconHome />
              </TooltipButton>

              <button
                type="button"
                className="newBlueprint-select"
                onClick={() => {
                  alert(t("noRoutesFound"));
                }}
              >
                {t("homeButton")}
                <IconChevronDown size={13} />
              </button>

              <TooltipButton tooltip={t("openNewTab")}>
                <IconExternal />
              </TooltipButton>
            </div>

            <a href="#" className="newBlueprint-console-link">
              <IconCode />
              {t("console")}
            </a>
          </div>
        )}

        <main className="newBlueprint-stage">
          {activeTab === "viewer" && (viewerContent ? <div className="newBlueprint-ai-content">{viewerContent}</div> : <EmptyState message={t("emptyNoContentAppViewer")} />)}
          {activeTab === "edit" && (editContent ? <div className="newBlueprint-ai-content">{editContent}</div> : <EmptyState message={t("emptyNoContentEdit")} />)}
          {activeTab === "analysis" && (analysisContent ? <div className="newBlueprint-ai-content">{analysisContent}</div> : <AnalyticsEmptyState />)}
          {activeTab === "files" && <FilesView />}
          {activeTab === "terminal" && (terminalContent ? <div className="newBlueprint-ai-content">{terminalContent}</div> : <EmptyState message={t("terminalNotActivated")} />)}
          {activeTab === "planner" && <EmptyState message={t("plannerNotActivated")} />}
          {activeTab === "browser" && <EmptyState message={t("browserNotActivated")} />}
          {activeTab === "notebook" && <EmptyState message={t("notebookNotActivated")} />}
        </main>
      </div>

      {drawerOpen && (
        <div className="friend-page">
          <Newblueprint />
        </div>
      )}
    </div>
  );
}
