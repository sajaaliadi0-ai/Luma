import React, { useState, useRef, useEffect } from "react";
import "../css/newBlueprint.css";

/* ------------------------------------------------------------------ */
/*  Icons — small inline SVGs, no external icon library required      */
/* ------------------------------------------------------------------ */

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
const IconTerminal = (p) => (
  <Icon {...p}>
    <path d="M4 5h16v14H4z" />
    <path d="M8 10l3 2-3 2M13 14h3" />
  </Icon>
);
const IconPlanner = (p) => (
  <Icon {...p}>
    <rect x="3" y="4" width="18" height="17" rx="2" />
    <path d="M3 9h18M8 3v3M16 3v3" />
  </Icon>
);
const IconBrowser = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a13 13 0 0 1 0 18M12 3a13 13 0 0 0 0 18" />
  </Icon>
);
const IconNotebook = (p) => (
  <Icon {...p}>
    <path d="M6 3h12v18H6z" />
    <path d="M6 7h2M6 12h2M6 17h2M10 3v18" />
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
const IconChevronDown = (p) => (
  <Icon {...p}>
    <path d="M6 9l6 6 6-6" />
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
const IconSend = (p) => (
  <Icon {...p} size={13}>
    <path d="M4 12h16M14 6l6 6-6 6" />
  </Icon>
);
const IconGlobe = (p) => (
  <Icon {...p} size={12}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a13 13 0 0 1 0 18M12 3a13 13 0 0 0 0 18" />
  </Icon>
);
const IconX = (p) => (
  <Icon {...p} size={13}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Icon>
);
const IconDoc = (p) => (
  <Icon {...p} size={14}>
    <path d="M7 3h7l4 4v14H7z" />
    <path d="M14 3v4h4" />
  </Icon>
);

/* ------------------------------------------------------------------ */
/*  Tab configuration                                                  */
/* ------------------------------------------------------------------ */

const MAIN_TABS = [
  { key: "viewer", label: "App Viewer", icon: IconMonitor },
  { key: "edit", label: "Edit", icon: IconEdit },
  { key: "files", label: "Files", icon: IconFiles },
  { key: "analysis", label: "Analysis", icon: IconAnalysis },
];

const MORE_TABS = [
  { key: "terminal", label: "Terminal", icon: IconTerminal },
  { key: "planner", label: "Planner", icon: IconPlanner },
  { key: "browser", label: "Browser", icon: IconBrowser },
  { key: "notebook", label: "Notebook", icon: IconNotebook },
];

/* ------------------------------------------------------------------ */
/*  Segmented tab cluster                                             */
/*  - Only one tab is ever "open" (icon + label).                     */
/*  - Every other tab collapses down to an icon-only button.          */
/*  - The "..." button opens a dropdown with 4 extra tools; picking   */
/*    one of them makes IT the open tab instead.                      */
/* ------------------------------------------------------------------ */

function TabCluster({ activeTab, onSelect }) {
  const [moreOpen, setMoreOpen] = useState(false);
  const clusterRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (clusterRef.current && !clusterRef.current.contains(e.target)) {
        setMoreOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeMoreTab = MORE_TABS.find((t) => t.key === activeTab);

  return (
    <div className="newBlueprint-tabcluster" ref={clusterRef}>
      {MAIN_TABS.map((tab) => {
        const isActive = tab.key === activeTab;
        const TabIcon = tab.icon;
        return (
          <button
            key={tab.key}
            type="button"
            className={
              "newBlueprint-tab" +
              (isActive ? " newBlueprint-tab--active" : "")
            }
            onClick={() => {
              onSelect(tab.key);
              setMoreOpen(false);
            }}
            title={tab.label}
            aria-pressed={isActive}
          >
            <TabIcon />
            <span className="newBlueprint-tab-label">{tab.label}</span>
          </button>
        );
      })}

      {/* If one of the "more" tools is the active tab, show it open here too */}
      {activeMoreTab && (
        <button
          type="button"
          className="newBlueprint-tab newBlueprint-tab--active"
          onClick={() => setMoreOpen((o) => !o)}
        >
          <activeMoreTab.icon />
          <span className="newBlueprint-tab-label">{activeMoreTab.label}</span>
        </button>
      )}

      <button
        type="button"
        className={
          "newBlueprint-more-btn" +
          (moreOpen ? " newBlueprint-more-btn--open" : "")
        }
        onClick={() => setMoreOpen((o) => !o)}
        title="More"
        aria-haspopup="menu"
        aria-expanded={moreOpen}
      >
        <IconMore />
      </button>

      {moreOpen && (
        <div className="newBlueprint-more-menu" role="menu">
          {MORE_TABS.map((tab) => {
            const TabIcon = tab.icon;
            const isActive = tab.key === activeTab;
            return (
              <button
                key={tab.key}
                type="button"
                role="menuitem"
                className={
                  "newBlueprint-more-item" +
                  (isActive ? " newBlueprint-more-item--active" : "")
                }
                onClick={() => {
                  onSelect(tab.key);
                  setMoreOpen(false);
                }}
              >
                <TabIcon size={15} />
                {tab.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
const TooltipButton = ({ children, tooltip, onClick }) => {

  return (
    <button
      className="newBlueprint-icon-btn newBlueprint-tooltip-btn"
      onClick={onClick}
      data-tooltip={tooltip}
    >
      {children}
    </button>
  );

};
/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export default function NewBlueprint() {
  const [activeTab, setActiveTab] = useState("viewer");
  const [activeCategory, setActiveCategory] = useState("academic");

const [viewerContent, setViewerContent] = useState(null);

const [editContent, setEditContent] = useState(null);

const [analysisContent, setAnalysisContent] = useState(null);

const [terminalContent, setTerminalContent] = useState(null);

const [projectName, setProjectName] = useState("مشروع 2");

const [filesContent, setFilesContent] = useState([
  {
    name: "مشروع 2",
    type: "folder",
    children: []
  }
]);

  const suggestions = [
    { icon: IconDoc, label: "AI memory literature review" },
    { icon: IconDoc, label: "3D Urban Disaster Report", active: true },
    { icon: IconDoc, label: "Embodied agent project ideas" },
    { icon: IconDoc, label: "Multi-agent memory reproduction" },
  ];

const EmptyState = ({ message }) => (

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



    <h2>
      {message}
    </h2>


    <p>
      Your AI Agent will generate it here
    </p>


  </div>

);

const AnalyticsEmptyState = () => (

  <div className="newBlueprint-analysis-empty">


    <div className="newBlueprint-chart-icon">


      <div className="chart-bar chart-bar-big"></div>

      <div className="chart-bar chart-bar-medium"></div>

      <div className="chart-bar chart-bar-small"></div>


    </div>



    <h2>
      Site Analytics
    </h2>


    <p>
      Start building your site to enable analytics tracking.
    </p>


  </div>

);

const TerminalEmptyState = () => (

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

          <div className="robot-screen">
            
          </div>


          <div className="robot-buttons">
            <span></span>
            <span></span>
            <span></span>
          </div>


        </div>


      </div>

    </div>



    <h2>
      Terminal is not activated yet
    </h2>


    <p>
      Your AI Agent will activate the terminal here
    </p>


  </div>

);

const FilesView = () => (

  <div className="newBlueprint-files-view">


    <div className="newBlueprint-file-header">

      <h3>
        Files
      </h3>

    </div>



    <div className="newBlueprint-file-tree">


      {filesContent.map((file,index)=>(

        <div 
          key={index}
          className="newBlueprint-file-item"
        >

      <span>
{
 file.type === "folder"
 ? "📁"
 : "📄"
}
</span>
          <span>
            {file.name}
          </span>


        </div>


      ))}



    </div>


  </div>

);

  return (
    <div className="newBlueprint-page">
      {/* ---------- Top bar ---------- */}
    <header className="newBlueprint-topbar">

  {/* Left */}
  <div className="newBlueprint-topbar-left">
    <span className="newBlueprint-logo">
      <span className="newBlueprint-logo-dot" />
    </span>

    <button type="button" className="newBlueprint-project-name">
      مشروع 2 <IconChevronDown size={13} />
    </button>
     <button className="newBlueprint-icon-btn" title="History">
      <IconHistory />
    </button>
    
    <button className="newBlueprint-icon-btn" title="Expand">
      <IconChevronsRight />
    </button>
  </div>

  {/* Center */}
  <div className="newBlueprint-topbar-center">

    <div className="newBlueprint-divider" />

    <TabCluster
      activeTab={activeTab}
      onSelect={setActiveTab}
    />

  </div>

  {/* Right */}
  <div className="newBlueprint-topbar-right">

    <button
      className="newBlueprint-btn newBlueprint-btn--ghost"
      disabled
    >
      Share
    </button>

    <button className="newBlueprint-btn newBlueprint-btn--accent">
      Upgrade
    </button>

    <button className="newBlueprint-btn newBlueprint-btn--primary">
      Publish
    </button>

  </div>

</header>

      {/* ---------- Sub bar ---------- */}
 
{
activeTab === "viewer" && (

  <div className="newBlueprint-subbar">

    <div></div>

<div className="newBlueprint-subbar-center">


<TooltipButton tooltip="Show desktop preview">

  <IconMonitor />

</TooltipButton>



<TooltipButton tooltip="Reload app viewer">

  <IconRefresh />

</TooltipButton>



<TooltipButton tooltip="Home">

  <IconHome />

</TooltipButton>




<button
  type="button"
  className="newBlueprint-select"
  onClick={() => {

    // هنا لاحقاً نربطه بالـ AI Agent

    alert("No routes found");

  }}
>

 Home 
 <IconChevronDown size={13} />

</button>




<TooltipButton tooltip="Open a new tab in the browser">

  <IconExternal />

</TooltipButton>


</div>
  
    <a href="#" className="newBlueprint-console-link">
      <IconCode />
      Console
    </a>


  </div>

)

}

      {/* ---------- Stage / preview ---------- */}
     <main className="newBlueprint-stage">


{

activeTab === "viewer" && (

    viewerContent ? (

        <div className="newBlueprint-ai-content">
            {viewerContent}
        </div>

    ) : (

        <EmptyState message="No content yet for App Viewer" />

    )

)



}


{
activeTab === "edit" && (

    editContent ? (

        <div className="newBlueprint-ai-content">
            {editContent}
        </div>

    ) : (

        <EmptyState message="No content yet for Edit" />

    )

)


}

{
activeTab === "analysis" && (

    analysisContent ? (

        <div className="newBlueprint-ai-content">
            {analysisContent}
        </div>


    ) : (


        <AnalyticsEmptyState />


    )


)

}

{
activeTab === "files" && (

    <FilesView />

)
}
{
activeTab === "terminal" && (

    terminalContent ? (

        <div className="newBlueprint-ai-content">
            {terminalContent}
        </div>

    ) : (

        <TerminalEmptyState />

    )

)
}
{
activeTab === "planner" && (

    <EmptyState message="Planner is not activated yet." />

)
}


{
activeTab === "browser" && (

    <EmptyState message="Browser is not activated yet." />

)
}


{
activeTab === "notebook" && (

    <EmptyState message="Notebook is not activated yet." />

)
}
</main>
    </div>
  );
}