import { useEffect, useState } from "react";
import { EventSource } from "eventsource";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  FiBell,
  FiChevronDown,
  FiChevronRight,
  FiCode,
  FiCompass,
  FiFolder,
  FiGift,
  FiGlobe,
  FiGrid,
  FiHome,
  FiLogOut,
  FiMenu,
  FiMic,
  FiMoreHorizontal,
  FiPackage,
  FiPlus,
  FiSettings,
  FiSliders,
  FiUser,
  FiUsers,
  FiX,
  FiZap,
} from "react-icons/fi";

import alex from "./alex.png";
import emma from "./emma.png";
import noah from "./noah.png";
import luna from "./luna.png";
import david from "./david.png";
import mia from "./mia.png";
import leo from "./leo.png";

import api from "../api/api";
import "../css/newblueprint2.css";

import { useTranslation } from "../i18n";
/* =====================================================
   AVATARS
===================================================== */

const avatars = [alex, emma, noah, luna, david, mia, leo];

/* =====================================================
   STORAGE KEYS
===================================================== */

const CONVERSATIONS_KEY = "atomsConversations";

const ACTIVE_CONVERSATION_KEY = "atomsActiveConversation";

/* =====================================================
   LOAD CONVERSATIONS
===================================================== */

function getSavedConversations() {
  try {
    const saved = sessionStorage.getItem(CONVERSATIONS_KEY);

    if (!saved) {
      return [];
    }

    const parsed = JSON.parse(saved);

    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Failed to load conversations:", error);

    return [];
  }
}

/* =====================================================
   LOAD ACTIVE CONVERSATION
===================================================== */

function getSavedActiveConversation() {
  return sessionStorage.getItem(ACTIVE_CONVERSATION_KEY) || null;
}

/* =====================================================
   ATOMS APP
===================================================== */

function AtomsApp({ themeMode, setThemeMode, dark, setDark ,initialMessage,
  onBlueprintCreated }) {
  const navigate = useNavigate();

  const { t, language } = useTranslation();

  const [searchParams] = useSearchParams();

  const blueprintId = searchParams.get("id");

  const [sections, setSections] = useState([]);

  const [currentBlueprint, setCurrentBlueprint] = useState(null);
  const [themeModeState, setThemeModeState] = useState(() => {
    if (typeof themeMode === "string") {
      return themeMode;
    }

    if (typeof dark === "boolean") {
      return dark ? "dark" : "light";
    }

    return localStorage.getItem("theme") || "light";
  });

  const activeThemeMode = themeMode ?? themeModeState;

  const handleThemeModeChange = (nextTheme) => {
    if (typeof setThemeMode === "function") {
      setThemeMode(nextTheme);
    }

    if (typeof setDark === "function") {
      setDark(nextTheme === "dark");
    }

    setThemeModeState(nextTheme);
  };

  /* ===================================================
     LOGOUT
  =================================================== */

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");

      await api.post("/auth/logout", {
        refreshToken,
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("accessToken");

      localStorage.removeItem("refreshToken");

      localStorage.removeItem("user");

      sessionStorage.clear();

      navigate("/Login");
    }
  };

  /* ===================================================
     STATES
  =================================================== */

  const [notifications] = useState([]);

  const [showProfile, setShowProfile] = useState(false);

  const [page, setPage] = useState("Home");

  const [collapsed, setCollapsed] = useState(false);

  const [workspaceOpen, setWorkspaceOpen] = useState(false);

  const [profileOpen, setProfileOpen] = useState(false);

  const [settings, setSettings] = useState(null);

  const [prompt, setPrompt] = useState("");

  const [conversations, setConversations] = useState(() =>
    getSavedConversations()
  );
  const [showBlueprintForm, setShowBlueprintForm] = useState(true);


  useEffect(() => {

if (!blueprintId) return;


api
.get(`/blueprints/${blueprintId}`)
.then((res)=>{

const bp = res.data.blueprint || res.data;

setCurrentBlueprint(bp);

})
.catch((err)=>{
console.error("Blueprint loading error", err);
});


},[blueprintId]);

  /* ===================================================
     ACTIVE CONVERSATION
  =================================================== */

  const [activeConversationId, setActiveConversationId] = useState(() =>
    getSavedActiveConversation()
  );

  /* ===================================================
     TYPING
  =================================================== */

  const [typing, setTyping] = useState(false);

  useEffect(() => {
    try {
      sessionStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(conversations));
    } catch (error) {
      console.error("Failed to save conversations:", error);
    }
  }, [conversations]);

  /* ===================================================
     SAVE ACTIVE CONVERSATION
  =================================================== */
useEffect(() => {
  const savedPrompt =
    sessionStorage.getItem("blueprintPrompt");

  if (savedPrompt) {
    setPrompt(savedPrompt);

    sessionStorage.removeItem("blueprintPrompt");
  }
}, []);
  /* ===================================================
     PAGE
  =================================================== */

  const choosePage = (next) => {
    setPage(next);

    setWorkspaceOpen(false);

    setProfileOpen(false);

    setShowProfile(false);
  };

  /* ===================================================
     SETTINGS
  =================================================== */
const openSettings = (tab = "general") => {
  console.log("Opening settings:", tab);

  setSettings(tab);
  setProfileOpen(false);
  setWorkspaceOpen(false);
  setShowProfile(false);
};

  /* ===================================================
     OPEN CONVERSATION
  =================================================== */

  const openConversation = (id) => {
    setActiveConversationId(id);

    setPage("Home");

    setWorkspaceOpen(false);

    setProfileOpen(false);

    setShowProfile(false);
  };

  /* ===================================================
     SIDEBAR COLLAPSE
  =================================================== */

  const toggleSidebar = () => {
    setCollapsed((current) => !current);

    setWorkspaceOpen(false);

    setProfileOpen(false);
  };

  /* ===================================================
     NEW CHAT
  =================================================== */

  const newChat = () => {
    const id = `chat-${Date.now()}`;

    const newConversation = {
      id,

      title: t("newChat"),
      createdAt: new Date().toLocaleDateString("en-CA"),
    };

    setConversations((current) => [newConversation, ...current]);

    setActiveConversationId(id);

    setPage("Home");

    setPrompt("");

    setTyping(false);

    setWorkspaceOpen(false);

    setProfileOpen(false);

    setShowProfile(false);
  };

  /* ===================================================
     SEND MESSAGE
  =================================================== */
const sendMessage = async () => {
  const text = prompt.trim();

  if (!text) {
    return;
  }

  const conversationId =
    activeConversationId || `chat-${Date.now()}`;

  const userMessage = {
    id: `user-${Date.now()}`,
    type: "user",
    text,
  };

  setConversations((current) => {
    const existing = current.find(
      (conversation) =>
        conversation.id === conversationId
    );

    if (existing) {
      return current.map((conversation) =>
        conversation.id === conversationId
          ? {
              ...conversation,
              messages: [
                ...conversation.messages,
                userMessage,
              ],
            }
          : conversation
      );
    }

    return [
      {
        id: conversationId,
        title:
          text.length > 30
            ? `${text.slice(0, 30)}…`
            : text,
        messages: [userMessage],
        createdAt:
          new Date().toLocaleDateString("en-CA"),
        blueprintId,
      },
      ...current,
    ];
  });

setActiveConversationId(conversationId);

setPrompt("");

setTyping(true);

try {
  await api.post(`/blueprints/${blueprintId}/generate`);
} catch (error) {
  console.error("Starting blueprint generation failed:", error);
} finally {
  setTyping(false);
}

};
 

// ==============================
// Blueprint Creation Form
// ==============================
function BlueprintCreationForm({ onSuccess, onBlueprintCreated }) {
    const navigate = useNavigate();
  const { t } = useTranslation();

  const [ideaText, setIdeaText] = useState("");
  const [projectType, setProjectType] = useState("web");
  const [complexity, setComplexity] = useState("medium");
  const [outputLanguage, setOutputLanguage] = useState("en");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedPrompt = sessionStorage.getItem("blueprintPrompt");

    if (savedPrompt) {
      setIdeaText(savedPrompt);
      sessionStorage.removeItem("blueprintPrompt");
    }
  }, []);

  const handleSubmit = async () => {
    if (!ideaText.trim()) {
      setError(t("blueprintErrorGeneric"));
      return;
    }

    setLoading(true);
    setError("");

    try {
      console.log("🚀 Creating blueprint...");

      const response = await api.post("/blueprints", {
        title: ideaText.trim().slice(0, 10),
        idea_text: ideaText.trim(),
        project_type: projectType,
        complexity,
        output_language: outputLanguage,
      });

      console.log(
        "✅ Blueprint creation response:",
        response.data
      );

      const blueprint =
        response.data?.blueprint ||
        response.data?.data ||
        response.data;

      if (!blueprint?.id) {
        throw new Error("No blueprint ID returned from API");
      }
console.log("✅ Blueprint ID:", blueprint.id);

if (onBlueprintCreated) {
  onBlueprintCreated(blueprint.id);
}

      sessionStorage.removeItem("blueprintPrompt");

      onSuccess(blueprint.id);

      navigate(`/DualWorkspace?id=${blueprint.id}`);
    } catch (err) {
      console.error(
        "❌ Blueprint creation failed:",
        err.response?.data || err
      );

      const message =
        err.response?.data?.message ||
        err.message ||
        t("blueprintErrorGeneric");

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="blueprint-form-container">
      <div className="blueprint-form-chat">
        <div className="chat-header">
          <div>
            <h1>{t("blueprintCreateTitle")}</h1>
            <p>{t("blueprintCreateSubtitle")}</p>
          </div>
        </div>

        <div className="blueprint-form-grid">
          <div className="blueprint-form-field">
            <label>{t("blueprintProjectIdeaLabel")}</label>

            <textarea
              value={ideaText}
              onChange={(e) => setIdeaText(e.target.value)}
              placeholder={t(
                "blueprintProjectIdeaPlaceholder"
              )}
            />
          </div>

          <div className="blueprint-form-grid-side">

            <div className="blueprint-form-field">
              <label>
                {t("blueprintProjectTypeLabel")}
              </label>

              <select
                value={projectType}
                onChange={(e) =>
                  setProjectType(e.target.value)
                }
              >
                <option value="web">
                  {t("blueprintProjectTypeWeb")}
                </option>

                <option value="mobile">
                  {t("blueprintProjectTypeMobile")}
                </option>

                <option value="api">
                  {t("blueprintProjectTypeApi")}
                </option>
              </select>
            </div>

            <div className="blueprint-form-field">
              <label>
                {t("blueprintComplexityLabel")}
              </label>

              <select
                value={complexity}
                onChange={(e) =>
                  setComplexity(e.target.value)
                }
              >
                <option value="simple">
                  {t("blueprintComplexitySimple")}
                </option>

                <option value="medium">
                  {t("blueprintComplexityMedium")}
                </option>

                <option value="complex">
                  {t("blueprintComplexityComplex")}
                </option>
              </select>
            </div>

            <div className="blueprint-form-field">
              <label>
                {t("blueprintOutputLanguageLabel")}
              </label>

              <select
                value={outputLanguage}
                onChange={(e) =>
                  setOutputLanguage(e.target.value)
                }
              >
                <option value="en">
                  {t("blueprintOutputLanguageEnglish")}
                </option>

                <option value="ar">
                  {t("blueprintOutputLanguageArabic")}
                </option>
              </select>
            </div>

          </div>
        </div>
      </div>

      {error && (
        <div className="blueprint-error">
          {error}
        </div>
      )}

      <button
        type="button"
        className="blueprint-form-submit"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading
          ? t("blueprintCreating")
          : t("blueprintCreateButton")}
      </button>
    </div>
  );
}

  /* ===================================================
     RENDER
  =================================================== */

  return (
    <div
      dir={language === "ar" ? "rtl" : "ltr"}
      className={`blueprint-app ${collapsed ? "blueprint-is-collapsed" : ""}`}
    >
      {/* =================================================
          SIDEBAR
      ================================================= */}

      <Sidebar
        notifications={notifications}

        navigate={navigate}

        onLogout={handleLogout}

        page={page}

        onPage={choosePage}

        onNewChat={newChat}

        onCollapse={toggleSidebar}

        workspaceOpen={workspaceOpen}

        onWorkspace={() => {
          setWorkspaceOpen((current) => !current);

          setProfileOpen(false);
        }}

        profileOpen={profileOpen}

        onProfile={() => {
          setProfileOpen((current) => !current);

          setWorkspaceOpen(false);
        }}

        onSettings={openSettings}

        conversations={conversations}

        activeConversationId={activeConversationId}

        onConversation={openConversation}
      />

      {/* =================================================
          MAIN
      ================================================= */}

      <main
        className={`blueprint-app-main ${
          page === "Home" ? "home-active" : "full-page-view"
        }`}
      >
        {/* =================================================
            HOME
        ================================================= */}

     {page === "Home" && (
  <>
    {showBlueprintForm ? (
<BlueprintCreationForm
  onBlueprintCreated={onBlueprintCreated}
  onSuccess={(blueprintId) => {
    setShowBlueprintForm(false);

    const conversationId = `chat-${Date.now()}`;

    const savedPrompt =
      sessionStorage.getItem("blueprintPrompt") || "";

    setConversations((current) => [
      {
        id: conversationId,
        title:
          savedPrompt.length > 30
            ? `${savedPrompt.slice(0, 30)}…`
            : savedPrompt,
        messages: [],
        createdAt: new Date().toLocaleDateString("en-CA"),
        blueprintId: blueprintId,
      },
      ...current,
    ]);

    setActiveConversationId(conversationId);
  }}
/>

    ) : (
     <Home
 prompt={prompt}
 setPrompt={setPrompt}
 messages={
 conversations.find(
 (conversation)=>
 conversation.id === activeConversationId
 )?.messages || []
 }
 sections={sections}
 typing={typing}
 onSend={sendMessage}
themeMode={activeThemeMode}
 setThemeMode={handleThemeModeChange}
/>
    )}
  </>
)}

        {/* =================================================
    MY PROJECTS
================================================= */}

        {page === "My Projects" && !showProfile && (
          <section className="blueprint-projects-page">
            <h1>{t("blueprintMyProjectsTitle")}</h1>

            {conversations.length === 0 ? (
              <div className="blueprint-empty-projects">
                <FiFolder size={48} />

                <h3>{t("blueprintNoProjectsTitle")}</h3>

                <p>{t("blueprintNoProjectsText")}</p>
              </div>
            ) : (
              <div className="blueprint-projects-grid">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className="blueprint-project-card"
                    onClick={() => openConversation(conversation.id)}
                  >
                    <div className="blueprint-project-card-header">
                      <FiFolder />

                      <button type="button">
                        <FiMoreHorizontal />
                      </button>
                    </div>

                    <h3>{conversation.title}</h3>

                    <p>
                      {conversation.messages.length} {conversation.messages.length === 1 ? t("blueprintMessageSingular") : t("blueprintMessagePlural")}
                    </p>

                    <small>{conversation.createdAt}</small>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

       { /* =================================================
            PROFILE
        ================================================= */}

        {page === "My Projects" && showProfile && <ProfilePage />}
      </main>

      {/* =================================================
          SETTINGS
      ================================================= */}

      {settings && (
      <SettingsModal
        tab={settings}
        onTab={setSettings}
        onClose={() => setSettings(null)}
        themeMode={activeThemeMode}
        setThemeMode={handleThemeModeChange}
      />
      )}
    </div>
  );
}

/* =====================================================
   SIDEBAR
===================================================== */

function Sidebar({
  page,
  onPage,
  onNewChat,
  onCollapse,
  workspaceOpen,
  onWorkspace,
  profileOpen,
  onProfile,
  onSettings,
  conversations,
  activeConversationId,
  onConversation,
  notifications,
  onLogout,
  navigate,
}) {
  const { t } = useTranslation();
  const nav = [
    [t("home"), FiHome],
    [t("resources"), FiCompass],
    [t("newChat"), FiPlus],
    [t("myProjects"), FiFolder],
  ];

  return (
    <aside className="blueprint-app-sidebar">
      {/* =================================================
          BRAND
      ================================================= */}

      <div className="blueprint-brand">
        <button
          className="new-chat-brand"
          onClick={onNewChat}
          title={t("newChat")}
        >
          <span className="blueprint-atoms-symbol"></span>

          <b>Luma</b>
        </button>

        <button onClick={onCollapse} aria-label={t("workspaceCollapseAriaLabel")}>
          <FiMenu />
        </button>
      </div>

      {/* =================================================
          WORKSPACE
      ================================================= */}

      <button className="blueprint-workspace-switch" onClick={onWorkspace}>
        <b>S</b>

        <span>{t("workspace")}</span>

        <FiChevronDown />
      </button>

      {/* =================================================
          WORKSPACE POPOVER
      ================================================= */}

      {workspaceOpen && (
        <div className="blueprint-workspace-popover">
          <div className="blueprint-workspace-head">
            <b>S</b>

            <span>
              <strong>eng</strong>

              <small>{t("workspaceFreePlan")}</small>
            </span>
          </div>

          <div className="blueprint-credit-line">
            {t("workspaceCreditsRemaining")}
            <a>Upgrade</a>
          </div>

          <div className="blueprint-credit-bar">
            <i />
          </div>

          <small className="blueprint-credit-left">{t("workspaceCreditsLeft")}</small>

          <small>{t("workspaceAllWorkspaces")}</small>

          <div className="blueprint-workspace-row">
            <b>S</b>
            eng
            <FiChevronRight />
          </div>
        </div>
      )}

      {/* =================================================
          NAVIGATION
      ================================================= */}

      <nav>
        {nav.map(([name, Icon]) => (
          <button
            key={name}
            className={page === name ? "selected" : ""}
            onClick={() => {
              if (name === t("resources")) {
                navigate("/resources");
                return;
              }

              if (name === t("newChat")) {
                onNewChat();
                return;
              }

              onPage(name);
            }}
          >
            <Icon />

            <span>{name}</span>
          </button>
        ))}
      </nav>

      {/* =================================================
          RECENTS
      ================================================= */}

      <small className="blueprint-recents-label">{t("recents")}</small>

      <div className="blueprint-recents">
        {conversations.length === 0 ? (
          <small className="empty-recents">{t("yourChats")}</small>
        ) : (
          conversations.map((conversation) => (
            <button
              key={conversation.id}
              className={
                conversation.id === activeConversationId ? "active-chat" : ""
              }
              onClick={() => onConversation(conversation.id)}
            >
              {conversation.title}
            </button>
          ))
        )}
      </div>

      {/* =================================================
          SIDEBAR BOTTOM
      ================================================= */}

      <div className="blueprint-sidebar-bottom">
        <aside>
          <FiUsers />

          <span>
            <b>{t("joinCommunity")}</b>

            <small>{t("earnCredits")}</small>
          </span>

          <FiChevronRight />
        </aside>

        <aside>
          <FiGift />

          <span>
            <b>{t("getFreeCredits")}</b>

            <small>{t("get10Credits")}</small>
          </span>

          <FiChevronRight />
        </aside>
      </div>

      {/* =================================================
          FOOTER
      ================================================= */}

      <footer>
        <button className="blueprint-avatar" onClick={onProfile}>
          S
        </button>

        <span>
          <button
            className="blueprint-sidebar-icon-btn"
            onClick={() => {
              alert(`You have ${notifications.length} notifications`);
            }}
          >
            <FiBell />
          </button>
        </span>
      </footer>

      {/* =================================================
          PROFILE POPOVER
      ================================================= */}
{profileOpen && (
  <div className="blueprint-profile-popover">

    <header>
      <b>S</b>

      <span>
        <strong>saswe eng</strong>
        <small>engsaswe@gmail.com</small>
      </span>
    </header>

    {/* GENERAL */}
   <button onClick={() => onSettings("general")}>
  <FiSettings />
  <span>{t("settings")}</span>
  <FiChevronRight />
</button>
    {/* PLANS */}
    <button onClick={() => onSettings("plansCredits")}>
      <FiPackage />
      <span>{t("plans")}</span>
      <FiChevronRight />
    </button>

    {/* ACCOUNT */}
    <button onClick={() => onSettings("account")}>
  <FiUser />
  <span>{t("profile")}</span>
  <FiChevronRight />
</button>
    {/* REDEMPTION */}
    <button>
      <FiGift />
      <span>{t("redemption")}</span>
      <FiChevronRight />
    </button>

    {/* PREFERENCE */}
  <button onClick={() => onSettings("preference")}>
  <FiSliders />
  <span>{t("appearance")}</span>
  <FiChevronRight />
</button>
    {/* HELP */}
    <button>
      ⓘ
      <span>{t("helpCenter")}</span>
    </button>

    {/* HOME */}
    <button onClick={() => onPage("Home")}>
      <FiHome />
      <span>{t("homepage")}</span>
    </button>

    {/* LOGOUT */}
    <button className="signout" onClick={onLogout}>
      <FiLogOut />
      <span>{t("signOut")}</span>
    </button>

  </div>
)}
    
    </aside>
  );
}

/* =====================================================
   HOME
===================================================== */
function Home({
prompt,
setPrompt,
messages,
sections,
typing,
onSend,
themeMode,
setThemeMode,
}){
  const theme = themeMode || "light";
  const { t } = useTranslation();
  const [listening, setListening] = useState(false);

  const [showThemeMenu, setShowThemeMenu] = useState(false);

  const [showPlusMenu, setShowPlusMenu] = useState(false);

  const [hoveredAgent, setHoveredAgent] = useState(null);

  const agents = [
    t("alexAgent"),
    t("emmaAgent"),
    t("noahAgent"),
    t("lunaAgent"),
    t("davidAgent"),
    t("miaAgent"),
    t("leoAgent"),
  ];

  /* ===================================================
     VOICE
  =================================================== */

  const startVoice = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(t("speechNotSupported"));

      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";

    recognition.interimResults = false;

    recognition.start();

    setListening(true);

    recognition.onresult = (event) => {
      setPrompt(event.results[0][0].transcript);
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  /* ===================================================
     RENDER
  =================================================== */

  return (
    <div className="blueprint-home-page">
      {/* =================================================
          CREDIT
      ================================================= */}

      <div className="blueprint-top-credit">
        {t("freePlan")} ·<a>{t("upgrade")} </a>
      </div>

      {/* =================================================
          TEAM AVATARS
      ================================================= */}

      <div className="blueprint-team-orbs" aria-label="Atoms team">
        {avatars.map((avatar, index) => (
          <div
            key={index}
            className="avatar-wrapper"
            onMouseEnter={() => setHoveredAgent(index)}
            onMouseLeave={() => setHoveredAgent(null)}
          >
            {hoveredAgent === index && (
              <div className="blueprint-agent-tooltip">{agents[index]}</div>
            )}

            <i
              className={`blueprint-team-avatar avatar-${index + 1}`}
              style={{
                backgroundImage: `url(${avatar})`,
              }}
            />
          </div>
        ))}
      </div>

      {/* =================================================
          TITLE
      ================================================= */}

      <h1>{t("homeTitle")}</h1>

      {/* =================================================
          MESSAGES
      ================================================= */}
{sections.length > 0 && (

  <div className="assistant-sections">

    {sections.map((section,index)=>(

      <div
        key={section.id || index}
        className="assistant-section-message"
      >

        <b>
          {section.sectionKey ||
            section.title ||
            "AI Agent"}
        </b>


        {
          section.status === "done" ? (

            section.contentMarkdown
              ?.split("\n")
              .filter(Boolean)
              .map((line,i)=>(

                <p key={i}>
                  {line}
                </p>

              ))

          ) : (

            <div className="generating">

              <span>
                {t("blueprintGenerating")}
              </span>

              <i></i>
              <i></i>
              <i></i>

            </div>

          )
        }


      </div>

    ))}

  </div>

)}
      {messages.length > 0 && (
        <div className="blueprint-sent-messages">
          {messages.map((message) => (
            <p key={message.id} className={message.type}>
              {message.type === "assistant" && <b>{t("blueprintAgentAlex")}</b>}

              {message.text}
            </p>
          ))}

          {typing && (
            <p className="assistant typing-message">
              <b>{t("blueprintAgentAlex")}</b>

              <i />
              <i />
              <i />
            </p>
          )}
        </div>
      )}

      {/* =================================================
          PROMPT
      ================================================= */}

      <div className="blueprint-home-prompt">
        <input
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              onSend();
            }
          }}
          placeholder={t("askPlaceholder")}
        />

        <footer>
          {/* =============================================
              PLUS
          ============================================= */}

          <div className="prompt-action">
            <button
              type="button"
              onClick={() => {
                setShowPlusMenu((current) => !current);

                setShowThemeMenu(false);
              }}
            >
              <FiPlus />
            </button>

            {showPlusMenu && (
              <div className="blueprint-plus-menu">
                <button type="button">{t("uploadFile")}</button>

                <button type="button">{t("addImage")} </button>

                <button type="button">{t("connectTools")} </button>
              </div>
            )}
          </div>

       

          <span />

          {/* =============================================
              BUILD
          ============================================= */}

          <button type="button">
            {t("build")}
            <FiChevronDown />
          </button>

          {/* =============================================
              MIC
          ============================================= */}

          <button
            type="button"
            onClick={startVoice}
            className={listening ? "recording" : ""}
          >
            <FiMic />
          </button>

          {/* =============================================
              SEND
          ============================================= */}

          <button type="button" className="go" onClick={onSend}>
            ↑
          </button>
        </footer>

        {/* =================================================
            TOOLS
        ================================================= */}

        <aside>
          <FiZap />

          {t("connectAtoms")}
          <span />

          <b>● ● ● ●</b>

          <FiX />
        </aside>
      </div>
    </div>
  );
}

{/* =====================================================
   PROFILE PAGE
===================================================== */}
function ProfilePage() {
  const { t } = useTranslation();
  const [accountActive, setAccountActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [themeMode, setThemeMode] = useState(
  () => localStorage.getItem("theme") || "light"
);
  const navigate = useNavigate();

  // =========================
  // DEACTIVATE / ACTIVATE
  // =========================
  const handleAccountStatus = async () => {
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const endpoint = accountActive
        ? "/users/account/deactivate"
        : "/users/account/activate";

      await api.patch(endpoint);

      setAccountActive(!accountActive);

      setMessage(
        accountActive
          ? "Your account has been deactivated."
          : "Your account has been activated."
      );
    } catch (error) {
      console.error("Account status error:", error);

      setError(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };


  // =========================
  // DELETE ACCOUNT
  // =========================
  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete your account? This action cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    setDeleteLoading(true);
    setMessage("");
    setError("");

    try {
      await api.delete("/users/account");

      // Remove saved authentication data
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      sessionStorage.clear();

      // Go back to login
      navigate("/login");
    } catch (error) {
      console.error("Delete account error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to delete your account. Please try again."
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <section className="blueprint-profile-page">
      {/* =========================
          OLD PROFILE DESIGN
      ========================= */}

      <div className="blueprint-profile-cover" />

      <div className="blueprint-profile-avatar">S</div>

      <button className="blueprint-edit-profile">{t("blueprintEditProfile")}</button>

      <h1>saswe eng</h1>

      <p>{t("blueprintProfileStats")}</p>

      <div className="blueprint-profile-tabs">
        <b>{t("blueprintPublicProjects")}</b>

        <span>{t("blueprintSaved")}</span>
      </div>

      <h3>{t("blueprintOtherProjects")}</h3>

      <div className="blueprint-profile-projects" />

      {/* =========================
          ACCOUNT MANAGEMENT
      ========================= */}

      <div className="blueprint-account-management">
        <h3>{t("blueprintAccountSettings")}</h3>

        <p className="account-management-description">
          {t("blueprintAccountDescription")}
        </p>

        {/* SUCCESS MESSAGE */}
        {message && <div className="account-success-message">{message}</div>}

        {/* ERROR MESSAGE */}
        {error && <div className="account-error-message">{error}</div>}

        {/* =========================
            ACTIVATE / DEACTIVATE
        ========================= */}

        <div className="account-management-row">
          <div className="account-management-info">
            <strong>{t("blueprintAccountStatus")}</strong>

            <span>
              {accountActive
                ? t("blueprintAccountActive")
                : t("blueprintAccountDeactivated")}
            </span>
          </div>

          <button
            className={
              accountActive
                ? "account-status-button deactivate"
                : "account-status-button activate"
            }
            onClick={handleAccountStatus}
            disabled={loading}
          >
            {loading
              ? t("pleaseWait")
              : accountActive
                ? t("blueprintDeactivateAccount")
                : t("blueprintActivateAccount")}
          </button>
        </div>

        {/* =========================
            DELETE ACCOUNT
        ========================= */}

        <div className="account-danger-zone">
          <div className="account-management-info">
            <strong>{t("blueprintDeleteAccount")}</strong>

            <span>
              {t("blueprintDeleteAccountWarning")}
            </span>
          </div>

          <button
            className="account-delete-button"
            onClick={handleDeleteAccount}
            disabled={deleteLoading}
          >
            {deleteLoading ? t("blueprintDeleting") : t("blueprintDeleteAccount")}
          </button>
        </div>
      </div>
    </section>
  );
}

/* =====================================================
   SETTINGS MODAL
===================================================== */
function SettingsModal({
  tab,
  onTab,
  onClose,
  themeMode,
  setThemeMode,
}) {
  const { t } = useTranslation();

  const tabs = [
    {
      key: "domains",
      label: t("domains"),
      icon: FiGlobe,
      group: "project",
    },
    {
      key: "people",
      label: t("people"),
      icon: FiUsers,
      group: "workspace",
    },
    {
      key: "general",
      label: t("general"),
      icon: FiSliders,
      group: "workspace",
    },
    {
      key: "connectors",
      label: t("connectors"),
      icon: FiZap,
      group: "workspace",
    },
    {
      key: "plansCredits",
      label: t("plansCredits"),
      icon: FiPackage,
      group: "workspace",
    },
    {
      key: "cloudAI",
      label: t("cloudAI"),
      icon: FiGrid,
      group: "workspace",
    },
    {
      key: "account",
      label: t("account"),
      icon: FiUser,
      group: "account",
    },
    {
      key: "preference",
      label: t("preference"),
      icon: FiSliders,
      group: "account",
    },
  ];

  return (
    <div className="blueprint-settings-overlay">

      <section className="blueprint-settings-modal">

        {/* SIDEBAR */}
        <aside className="blueprint-settings-sidebar">

          <div className="blueprint-settings-title">
            <h2>{t("settings")}</h2>

            <button
              type="button"
              onClick={onClose}
              className="blueprint-settings-mobile-close"
            >
              <FiX />
            </button>
          </div>

          {/* PROJECT */}
          <small>{t("project")}</small>

          {tabs
            .filter((item) => item.group === "project")
            .map(({ key, label, icon }) => (
              <Tab
                key={key}
                id={key}
                label={label}
                I={icon}
                tab={tab}
                onTab={onTab}
              />
            ))}

          {/* WORKSPACE */}
          <small>{t("workspace")}</small>

          {tabs
            .filter((item) => item.group === "workspace")
            .map(({ key, label, icon }) => (
              <Tab
                key={key}
                id={key}
                label={label}
                I={icon}
                tab={tab}
                onTab={onTab}
              />
            ))}

          {/* ACCOUNT */}
          <small>{t("account")}</small>

          {tabs
            .filter((item) => item.group === "account")
            .map(({ key, label, icon }) => (
              <Tab
                key={key}
                id={key}
                label={label}
                I={icon}
                tab={tab}
                onTab={onTab}
              />
            ))}

        </aside>

        {/* CONTENT */}
        <main className="blueprint-settings-content">

          <button
            type="button"
            className="blueprint-modal-close"
            onClick={onClose}
            aria-label={t("blueprintCloseSettingsAriaLabel")}
          >
            <FiX />
          </button>

          <SettingsContent
            tab={tab}
            themeMode={themeMode}
            setThemeMode={setThemeMode}
          />

        </main>

      </section>

    </div>
  );
}

/* =====================================================
   SETTINGS TAB
===================================================== */
function Tab({
  id,
  label,
  I,
  tab,
  onTab,
}) {
  const Icon = I;
  const { t } = useTranslation();

  return (
    <button
      type="button"
      className={`blueprint-settings-tab ${
        tab === id ? "active" : ""
      }`}
      onClick={() => onTab(id)}
    >
      <Icon />

      <span>{label}</span>

      {id === "cloudAI" && (
        <small className="settings-free-badge">
          ✦ {t("free")}
        </small>
      )}
    </button>
  );
}
/* =====================================================
   SETTINGS CONTENT
===================================================== */

function SettingsContent({
  tab,
  themeMode,
  setThemeMode,
}) {
  const { t, language, setLanguage } = useTranslation();
  const navigate = useNavigate();

  const [accountActive, setAccountActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  /* ===================================================
     PROFILE
  =================================================== */

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState("");
  const [profileError, setProfileError] = useState("");

  /* ===================================================
     LOAD USER
  =================================================== */

  useEffect(() => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user") || "{}"
      );

      setFullName(user.full_name || "");
      setEmail(user.email || "");
    } catch (error) {
      console.error(
        "Failed to load user data:",
        error
      );
    }
  }, []);

  /* ===================================================
     APPLY THEME
  =================================================== */
useEffect(() => {
  if (!themeMode) return;

  localStorage.setItem("theme", themeMode);

  const root = document.documentElement;
  const body = document.body;

  if (themeMode === "dark") {
    root.classList.add("dark");
    body.classList.add("dark");
    root.setAttribute("data-theme", "dark");
  } else if (themeMode === "light") {
    root.classList.remove("dark");
    body.classList.remove("dark");
    root.setAttribute("data-theme", "light");
  } else if (themeMode === "system") {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    root.classList.toggle("dark", prefersDark);
    body.classList.toggle("dark", prefersDark);
    root.setAttribute(
      "data-theme",
      prefersDark ? "dark" : "light"
    );
  }
}, [themeMode]);
  /* ===================================================
     SAVE PROFILE
  =================================================== */

  const handleSaveProfile = async () => {
    try {
      setProfileLoading(true);
      setProfileSuccess("");
      setProfileError("");

      const res = await api.patch(
        "/users/me",
        {
          full_name: fullName,
        }
      );

      const updatedUser =
        res.data.user || res.data;

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      setFullName(
        updatedUser.full_name || fullName
      );

      setEmail(
        updatedUser.email || email
      );

      setProfileSuccess(
        t("blueprintProfileSuccess")
      );

    } catch (error) {
      console.error(
        "Profile update error:",
        error
      );

      setProfileError(
        error.response?.data?.message ||
          t("blueprintProfileError")
      );
    } finally {
      setProfileLoading(false);
    }
  };

  /* ===================================================
     ACTIVATE / DEACTIVATE
  =================================================== */

  const handleAccountStatus = async () => {
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const endpoint = accountActive
        ? "/users/account/deactivate"
        : "/users/account/activate";

      await api.patch(endpoint);

      setAccountActive(
        (current) => !current
      );

      setMessage(
        accountActive
          ? t("blueprintProfileAccountDeactivated")
          : t("blueprintProfileAccountActivated")
      );

    } catch (error) {
      console.error(
        "Account status error:",
        error
      );

      setError(
        error.response?.data?.message ||
          t("blueprintErrorGeneric")
      );
    } finally {
      setLoading(false);
    }
  };

  /* ===================================================
     DELETE ACCOUNT
  =================================================== */

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      t("blueprintDeleteConfirm")
    );

    if (!confirmed) return;

    setDeleteLoading(true);
    setMessage("");
    setError("");

    try {
      await api.delete(
        "/users/account"
      );

      localStorage.removeItem(
        "accessToken"
      );

      localStorage.removeItem(
        "refreshToken"
      );

      localStorage.removeItem(
        "user"
      );

      sessionStorage.clear();

      navigate("/login");

    } catch (error) {
      console.error(
        "Delete account error:",
        error
      );

      setError(
        error.response?.data?.message ||
          t("blueprintDeleteError")
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  /* ===================================================
     PREFERENCE
  =================================================== */

  if (tab === "preference") {
    const currentTheme =
      themeMode || "light";

    return (
      <section className="settings-page-section">

        <div className="settings-page-header">
          <h2>{t("preference")}</h2>

          <p>
            {t("customizeAppearance")}
          </p>
        </div>

        {/* =========================
            LANGUAGE
        ========================= */}

        <div className="settings-section-card">

          <div className="settings-section-info">
            <h3>{t("language")}</h3>

            <p>
              {t("changeLanguage")}
            </p>
          </div>

          <div className="blueprint-language-options">

            <button
              type="button"
              className={
                language === "en"
                  ? "chosen"
                  : ""
              }
              onClick={() =>
                setLanguage("en")
              }
            >
              English
            </button>

            <button
              type="button"
              className={
                language === "ar"
                  ? "chosen"
                  : ""
              }
              onClick={() =>
                setLanguage("ar")
              }
            >
              عربي
            </button>

          </div>
        </div>

        {/* =========================
            THEME
        ========================= */}

        <div className="settings-section-card">

          <div className="settings-section-info">
            <h3>{t("theme")}</h3>

            <p>
              {t("customizeAppearance")}
            </p>
          </div>

          <div className="blueprint-themes">

            {/* SYSTEM */}

            <button
              type="button"
              className={
                currentTheme === "system"
                  ? "chosen"
                  : ""
              }
              onClick={() =>
                setThemeMode("system")
              }
            >
              <span className="theme-option-icon">
                ◐
              </span>

              <span>
                {t("system")}
              </span>
            </button>

            {/* LIGHT */}

            <button
              type="button"
              className={
                currentTheme === "light"
                  ? "chosen"
                  : ""
              }
              onClick={() =>
                setThemeMode("light")
              }
            >
              <span className="theme-option-icon">
                ☀
              </span>

              <span>
                {t("light")}
              </span>
            </button>

            {/* DARK */}

            <button
              type="button"
              className={
                currentTheme === "dark"
                  ? "chosen"
                  : ""
              }
              onClick={() =>
                setThemeMode("dark")
              }
            >
              <span className="theme-option-icon">
                ☾
              </span>

              <span>
                {t("dark")}
              </span>
            </button>

          </div>
        </div>

      </section>
    );
  }

  /* ===================================================
     ACCOUNT
  =================================================== */

  if (tab === "account") {
    return (
      <section className="settings-page-section">

        <h2>{t("accountSettings")}</h2>

        {/* PROFILE */}

        <div className="blueprint-account-row">
          <span>{t("avatar")}</span>

          <b>
            {fullName
              ? fullName
                  .charAt(0)
                  .toUpperCase()
              : "S"}
          </b>
        </div>

        <div className="blueprint-account-row">
          <label>
            {t("username")}
          </label>

          <input
            type="text"
            value={fullName}
            onChange={(e) =>
              setFullName(
                e.target.value
              )
            }
            placeholder={t("blueprintAccountNamePlaceholder")}
          />
        </div>

        <div className="blueprint-account-row">
          <label>
            {t("email")}
          </label>

          <input
            type="email"
            value={email}
            disabled
            readOnly
          />
        </div>

        {profileSuccess && (
          <div className="account-success-message">
            {profileSuccess}
          </div>
        )}

        {profileError && (
          <div className="account-error-message">
            {profileError}
          </div>
        )}

        <button
          type="button"
          className="blueprint-save-profile-button"
          onClick={handleSaveProfile}
          disabled={profileLoading}
        >
          {profileLoading
            ? t("blueprintProfileSaving")
            : t("blueprintProfileSaveChanges")}
        </button>

        {/* ACCOUNT STATUS */}

        <div className="blueprint-account-profile">

          <h3>{t("profile")}</h3>

          <p>
            {t("manageProfile")}
          </p>

          {message && (
            <div className="account-success-message">
              {message}
            </div>
          )}

          {error && (
            <div className="account-error-message">
              {error}
            </div>
          )}

          <div className="account-management-row">

            <div className="account-management-info">

              <strong>
                {t("accountStatus")}
              </strong>

              <span>
                {accountActive
                  ? t("accountActive")
                  : t("accountDeactivated")}
              </span>

            </div>

            <button
              type="button"
              className={`account-toggle ${
                accountActive
                  ? "active"
                  : ""
              }`}
              onClick={
                handleAccountStatus
              }
              disabled={loading}
            >
              <span />
            </button>

          </div>

          {/* DELETE */}

          <div className="account-danger-zone">

            <div className="account-management-info">

              <strong>
                {t("deleteAccount")}
              </strong>

              <span>
                {t(
                  "deleteAccountWarning"
                )}
              </span>

            </div>

            <button
              type="button"
              className="account-delete-button"
              onClick={
                handleDeleteAccount
              }
              disabled={deleteLoading}
            >
              {deleteLoading
                ? t("deleting")
                : t("deleteAccount")}
            </button>

          </div>

        </div>

      </section>
    );
  }

  /* ===================================================
     PEOPLE
  =================================================== */

  if (tab === "people") {
    return (
      <section className="settings-page-section">

        <h2>
          {t("people")}
        </h2>

        <div className="blueprint-settings-card">

          <h3>
            {t(
              "inviteWorkspaceMembers"
            )}
          </h3>

          <p>
            {t(
              "upgradeToInviteMembers"
            )}
          </p>

          <div className="blueprint-invite">

            <input
              placeholder={t(
                "addEmails"
              )}
            />

            <button>
              {t(
                "upgradeToInviteMembers"
              )}
            </button>

          </div>

        </div>

      </section>
    );
  }

  /* ===================================================
     CONNECTORS
  =================================================== */

  if (tab === "connectors") {
    return (
      <section className="settings-page-section">

        <h2>
          {t("connectors")}
        </h2>

        <div className="blueprint-connector-list">

          {[
            "GitHub",
            "Supabase",
            "Stripe",
            "Google Analytics 4",
            "Google Search Console",
            "Google Ads",
          ].map((name) => (

            <div key={name}>

              <b>
                <FiCode />

                {name}

                <small>
                  {t(
                    "connectServiceData",
                    { name }
                  )}
                </small>
              </b>

              <button>
                {t("connect")}
              </button>

            </div>

          ))}

        </div>

      </section>
    );
  }

  /* ===================================================
     PLANS
  =================================================== */

  if (tab === "plansCredits") {
    return (
      <section className="settings-page-section">

        <h2>
          {t("plansCredits")}
        </h2>

        <div className="blueprint-credits-card">

          <b>
            {t(
              "creditsRemaining"
            )}
          </b>

          <strong>
            15 / 15
          </strong>

          <i>
            <span />
          </i>

        </div>

        <div className="blueprint-plans">

          {[
            ["free", "$0"],
            ["pro", "$15.8"],
            ["max", "$79"],
          ].map(
            ([name, price]) => (

              <article key={name}>

                <h2>
                  {t(name)}
                </h2>

                <strong>
                  {price}

                  <small>
                    {t("month")}
                  </small>
                </strong>

                <p>
                  {t(
                    "unlockFeatures"
                  )}
                </p>

              </article>

            )
          )}

        </div>

      </section>
    );
  }

  /* ===================================================
     DOMAINS
  =================================================== */

  if (tab === "domains") {
    return (
      <section className="settings-page-section">

        <h2>
          {t("domains")}
        </h2>

        <h3>
          {t("connectedDomains")}
        </h3>

        <p>
          {t(
            "manageConnectedDomains"
          )}
        </p>

        <div className="blueprint-notice">

          {t("notPublished")}

          <button>
            {t("publish")}
          </button>

        </div>

      </section>
    );
  }

  /* ===================================================
     CLOUD AI
  =================================================== */

  if (tab === "cloudAI") {
    return (
      <section className="settings-page-section">

        <h2>
          {t("cloudAI")}
        </h2>

        <div className="blueprint-warning">
          ⓘ {t("cloudWarning")}
        </div>

        <div className="blueprint-cloud-cards">

          <article>

            <h3>
              ◕ {t("cloudAI")}
            </h3>

            <strong>
              $0.00
            </strong>

            <button>
              {t("upgrade")}
            </button>

          </article>

          <article>

            <h3>
              {t("cloudBalance")}
            </h3>

            <hr />

            <h3>
              {t("aiBalance")}
            </h3>

          </article>

        </div>

      </section>
    );
  }

  /* ===================================================
     GENERAL
  =================================================== */
if (tab === "general") {
  const currentTheme = themeMode || "light";

  const handleThemeChange = (newTheme) => {
    setThemeMode(newTheme);
  };

  return (
    <section className="settings-page-section">
      <div className="settings-page-header">
        <h2>{t("general")}</h2>

        <p>{t("customizeAppearance")}</p>
      </div>

      <div className="settings-section-card">
        <div className="settings-section-info">
          <h3>{t("theme")}</h3>

          <p>{t("customizeAppearance")}</p>
        </div>

        <div className="blueprint-themes">
          {/* SYSTEM */}
          <button
            type="button"
            className={
              currentTheme === "system" ? "chosen" : ""
            }
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              handleThemeChange("system");
            }}
          >
            <span className="theme-option-icon">
              ◐
            </span>

            <span>{t("system")}</span>
          </button>

          {/* LIGHT */}
          <button
            type="button"
            className={
              currentTheme === "light" ? "chosen" : ""
            }
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              handleThemeChange("light");
            }}
          >
            <span className="theme-option-icon">
              ☀
            </span>

            <span>{t("light")}</span>
          </button>

          {/* DARK */}
          <button
            type="button"
            className={
              currentTheme === "dark" ? "chosen" : ""
            }
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              handleThemeChange("dark");
            }}
          >
            <span className="theme-option-icon">
              ☾
            </span>

            <span>{t("dark")}</span>
          </button>
        </div>
      </div>

      <hr />

      {/* LANGUAGE */}
      <div className="settings-section-card">
        <div className="settings-section-info">
          <h3>{t("language")}</h3>

          <p>{t("changeLanguage")}</p>
        </div>

        <div className="blueprint-language-options">
          <button
            type="button"
            className={language === "en" ? "chosen" : ""}
            onClick={() => setLanguage("en")}
          >
            English
          </button>

          <button
            type="button"
            className={language === "ar" ? "chosen" : ""}
            onClick={() => setLanguage("ar")}
          >
            عربي
          </button>
        </div>
      </div>
    </section>
  );
}

}
/* =====================================================
   EXPORT
===================================================== */

export default AtomsApp;