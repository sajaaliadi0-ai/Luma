import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

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

const avatars = [
  alex,
  emma,
  noah,
  luna,
  david,
  mia,
  leo,
];


/* =====================================================
   STORAGE KEYS
===================================================== */

const CONVERSATIONS_KEY =
  "atomsConversations";

const ACTIVE_CONVERSATION_KEY =
  "atomsActiveConversation";


/* =====================================================
   LOAD CONVERSATIONS
===================================================== */

function getSavedConversations() {
  try {
    const saved =
      sessionStorage.getItem(
        CONVERSATIONS_KEY
      );

    if (!saved) {
      return [];
    }

    const parsed = JSON.parse(saved);

    return Array.isArray(parsed)
      ? parsed
      : [];

  } catch (error) {
    console.error(
      "Failed to load conversations:",
      error
    );

    return [];
  }
}


/* =====================================================
   LOAD ACTIVE CONVERSATION
===================================================== */

function getSavedActiveConversation() {
  return (
    sessionStorage.getItem(
      ACTIVE_CONVERSATION_KEY
    ) || null
  );
}


/* =====================================================
   ATOMS APP
===================================================== */

function AtomsApp() {

  const [theme, setTheme] = useState(() => {
  return localStorage.getItem("theme") || "light";
});

useEffect(() => {
  console.log(theme);

localStorage.setItem("theme", theme);

document.documentElement.setAttribute("data-theme", theme);

}, [theme]);

  const navigate = useNavigate();

const { language, setLanguage, t } = useTranslation();
  /* ===================================================
     LOGOUT
  =================================================== */

  const handleLogout = async () => {

    try {

      const refreshToken =
        localStorage.getItem(
          "refreshToken"
        );

      await api.post(
        "/api/auth/logout",
        {
          refreshToken,
        }
      );

    } catch (error) {

      console.error(
        "Logout error:",
        error
      );

    } finally {

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

navigate("/landing-page");    }
  };


  /* ===================================================
     STATES
  =================================================== */

  const [notifications] =
    useState([]);

  const [showProfile, setShowProfile] =
    useState(false);

  const [page, setPage] =
    useState("Home");

  const [collapsed, setCollapsed] =
    useState(false);

  const [workspaceOpen, setWorkspaceOpen] =
    useState(false);

  const [profileOpen, setProfileOpen] =
    useState(false);

  const [settings, setSettings] =
    useState(null);



  const [prompt, setPrompt] =
    useState("");

  const [conversations, setConversations] =
    useState(() =>
      getSavedConversations()
    );


  /* ===================================================
     ACTIVE CONVERSATION
  =================================================== */

  const [
    activeConversationId,
    setActiveConversationId,
  ] = useState(() =>
    getSavedActiveConversation()
  );


  /* ===================================================
     TYPING
  =================================================== */

  const [typing, setTyping] =
    useState(false);


  useEffect(() => {

    try {

      sessionStorage.setItem(
        CONVERSATIONS_KEY,
        JSON.stringify(
          conversations
        )
      );

    } catch (error) {

      console.error(
        "Failed to save conversations:",
        error
      );

    }

  }, [conversations]);


  /* ===================================================
     SAVE ACTIVE CONVERSATION
  =================================================== */

  useEffect(() => {

    if (
      activeConversationId
    ) {

      sessionStorage.setItem(
        ACTIVE_CONVERSATION_KEY,
        activeConversationId
      );

    } else {

      sessionStorage.removeItem(
        ACTIVE_CONVERSATION_KEY
      );

    }

  }, [
    activeConversationId,
  ]);


  useEffect(() => {

    const savedPrompt =
      sessionStorage.getItem(
        "blueprintPrompt"
      );

    if (!savedPrompt) {
      return;
    }


    const text =
      savedPrompt.trim();

    if (!text) {

      sessionStorage.removeItem(
        "blueprintPrompt"
      );

      return;
    }


    /* =================================================
       منع التكرار
    ================================================= */

    const alreadyExists =
      conversations.some(
        (conversation) =>
          conversation.messages?.some(
            (message) =>
              message.type === "user" &&
              message.text === text
          )
      );


    if (alreadyExists) {

      sessionStorage.removeItem(
        "blueprintPrompt"
      );

      return;
    }


    /* =================================================
       CREATE CONVERSATION
    ================================================= */

    const conversationId =
      `chat-${Date.now()}`;


    const newConversation = {

      id: conversationId,

      title:
        text.length > 30
          ? `${text.slice(0, 30)}…`
          : text,

      messages: [

        {
          id:
            `user-${Date.now()}`,

          type: "user",

          text,
        },

      ],

      createdAt:
        new Date()
          .toLocaleDateString(
            "en-CA"
          ),
    };


    setConversations(
      (current) => [
        newConversation,
        ...current,
      ]
    );


    setActiveConversationId(
      conversationId
    );


    /* =================================================
       تنظيف prompt بعد استلامه
    ================================================= */

    sessionStorage.removeItem(
      "blueprintPrompt"
    );


  }, []);


  /* ===================================================
     PAGE
  =================================================== */

  const choosePage = (
    next
  ) => {

    setPage(next);

    setWorkspaceOpen(false);

    setProfileOpen(false);

    setShowProfile(false);
  };


  /* ===================================================
     SETTINGS
  =================================================== */

  const openSettings = (
    tab = "General"
  ) => {

    setSettings(tab);

    setProfileOpen(false);
  };


  /* ===================================================
     OPEN CONVERSATION
  =================================================== */

  const openConversation = (
    id
  ) => {

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

    setCollapsed(
      (current) => !current
    );

    setWorkspaceOpen(false);

    setProfileOpen(false);
  };


  /* ===================================================
     NEW CHAT
  =================================================== */

  const newChat = () => {

    const id =
      `chat-${Date.now()}`;


    const newConversation = {

      id,

      title: "New chat",

      messages: [],

      createdAt:
        new Date()
          .toLocaleDateString(
            "en-CA"
          ),
    };


    setConversations(
      (current) => [
        newConversation,
        ...current,
      ]
    );


    setActiveConversationId(
      id
    );


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

  const sendMessage = () => {

    const text =
      prompt.trim();


    if (!text) {
      return;
    }


    const conversationId =
      activeConversationId ||
      `chat-${Date.now()}`;


    const userMessage = {

      id:
        `user-${Date.now()}`,

      type: "user",

      text,
    };


    setConversations(
      (current) => {

        const existing =
          current.find(
            (conversation) =>
              conversation.id ===
              conversationId
          );


        /* =============================================
           EXISTING CHAT
        ============================================= */

        if (existing) {

          return current.map(
            (conversation) => {

              if (
                conversation.id !==
                conversationId
              ) {

                return conversation;
              }


              return {

                ...conversation,

                title:
                  conversation.title ===
                  "New chat"

                    ? text.length > 30
                      ? `${text.slice(0, 30)}…`
                      : text

                    : conversation.title,

                messages: [

                  ...conversation.messages,

                  userMessage,

                ],
              };

            }
          );
        }


        /* =============================================
           NEW CHAT
        ============================================= */

        return [

          {

            id:
              conversationId,

            title:
              text.length > 30
                ? `${text.slice(0, 30)}…`
                : text,

            messages: [
              userMessage,
            ],

            createdAt:
              new Date()
                .toLocaleDateString(
                  "en-CA"
                ),
          },

          ...current,

        ];
      }
    );


    setActiveConversationId(
      conversationId
    );


    setPrompt("");

    setTyping(true);

    setPage("Home");


    /* =================================================
       TEMPORARY AI RESPONSE
    ================================================= */

    window.setTimeout(() => {

      setConversations(
        (current) =>
          current.map(
            (conversation) => {

              if (
                conversation.id !==
                conversationId
              ) {

                return conversation;
              }


              return {

                ...conversation,

                messages: [

                  ...conversation.messages,

                  {

                    id:
                      `alex-${Date.now()}`,

                    type:
                      "assistant",

                    text:
                      "وصلت فكرتك. سأساعدك في تنفيذها خطوة بخطوة.",

                  },

                ],
              };

            }
          )
      );

      setTyping(false);

    }, 800);

  };


  /* ===================================================
     RENDER
  =================================================== */

  return (

   <div
  dir={language === "ar" ? "rtl" : "ltr"}
  className={`blueprint-app ${
    collapsed
      ? "blueprint-is-collapsed"
      : ""
  }`}
>

      {/* =================================================
          SIDEBAR
      ================================================= */}

      <Sidebar

        notifications={
          notifications
        }

        navigate={
          navigate
        }

        onLogout={
          handleLogout
        }

        page={
          page
        }

        onPage={
          choosePage
        }

        onNewChat={
          newChat
        }

        onCollapse={
          toggleSidebar
        }

        workspaceOpen={
          workspaceOpen
        }

        onWorkspace={() => {

          setWorkspaceOpen(
            (current) =>
              !current
          );

          setProfileOpen(false);
        }}

        profileOpen={
          profileOpen
        }

        onProfile={() => {

          setProfileOpen(
            (current) =>
              !current
          );

          setWorkspaceOpen(false);
        }}

        onSettings={
          openSettings
        }

        conversations={
          conversations
        }

        activeConversationId={
          activeConversationId
        }

        onConversation={
          openConversation
        }
      />


      {/* =================================================
          MAIN
      ================================================= */}

      <main
        className={
          `blueprint-app-main ${
            page === "Home"
              ? "home-active"
              : "full-page-view"
          }`
        }
      >

        {/* =================================================
            HOME
        ================================================= */}

        {page === "Home" && (

          <Home
  prompt={prompt}
  setPrompt={setPrompt}
  messages={
    conversations.find(
      (conversation) =>
        conversation.id === activeConversationId
    )?.messages || []
  }
  typing={typing}
  onSend={sendMessage}
  theme={theme}
  setTheme={setTheme}
/>

        )}


       {/* =================================================
    MY PROJECTS
================================================= */}

{page === "My Projects" && !showProfile && (

  <section className="blueprint-projects-page">

    <h1>My Projects</h1>

    {conversations.length === 0 ? (

      <div className="blueprint-empty-projects">

        <FiFolder size={48} />

        <h3>No projects yet</h3>

        <p>Create a new chat to start your first project.</p>

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
              {conversation.messages.length} message
              {conversation.messages.length !== 1 ? "s" : ""}
            </p>

            <small>{conversation.createdAt}</small>

          </div>

        ))}

      </div>

    )}

  </section>

)}


        {/* =================================================
            PROFILE
        ================================================= */}

        {page === "My Projects" &&
          showProfile && (

            <ProfilePage />

          )}

      </main>


      {/* =================================================
          SETTINGS
      ================================================= */}

      {settings && (

        <SettingsModal

          tab={
            settings
          }

          onTab={
            setSettings
          }

          onClose={() =>
            setSettings(null)
          }

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
    const { t } = useTranslation()
const nav = [
  [t("home"), FiHome],
  [t("resources"), FiCompass],
  [t("newChat"), FiPlus],
  [t("myProjects"), FiFolder],
];


  return (

    <aside
      className="blueprint-app-sidebar"
    >

      {/* =================================================
          BRAND
      ================================================= */}

      <div className="blueprint-brand">

        <button
          className="new-chat-brand"
          onClick={onNewChat}
title={t("newChat")}        >

          <span className="blueprint-atoms-symbol">

           
          </span>

          <b>
            Luma
          </b>

        </button>


        <button
          onClick={onCollapse}
          aria-label="Collapse sidebar"
        >

          <FiMenu />

        </button>

      </div>


      {/* =================================================
          WORKSPACE
      ================================================= */}

      <button
        className="blueprint-workspace-switch"
        onClick={onWorkspace}
      >

        <b>
          S
        </b>

        <span>
           eng 
        </span>

        <FiChevronDown />

      </button>


      {/* =================================================
          WORKSPACE POPOVER
      ================================================= */}

      {workspaceOpen && (

        <div className="blueprint-workspace-popover">

          <div className="blueprint-workspace-head">

            <b>
              S
            </b>

            <span>

              <strong>
               eng
              </strong>

              <small>
                Free plan
              </small>

            </span>

          </div>


          <div className="blueprint-credit-line">

            Credits remaining

            <a>
              Upgrade
            </a>

          </div>


          <div className="blueprint-credit-bar">

            <i />

          </div>


          <small className="blueprint-credit-left">
            15 left
          </small>


          <small>
            All workspaces
          </small>


          <div className="blueprint-workspace-row">

            <b>
              S
            </b>

          eng

            <FiChevronRight />

          </div>

        </div>

      )}


      {/* =================================================
          NAVIGATION
      ================================================= */}

      <nav>

        {nav.map(
          ([name, Icon]) => (

            <button
              key={name}
              className={
                page === name
                  ? "selected"
                  : ""
              }
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

  onPage(name);

}}
            >

              <Icon />

              <span>
                {name}
              </span>

            </button>

          )
        )}

      </nav>


      {/* =================================================
          RECENTS
      ================================================= */}

      <small className="blueprint-recents-label">
        Recents
      </small>


      <div className="blueprint-recents">

        {conversations.length === 0 ? (

          <small className="empty-recents">
            Your chats will appear here
          </small>

        ) : (

          conversations.map(
            (conversation) => (

              <button
                key={
                  conversation.id
                }
                className={
                  conversation.id ===
                  activeConversationId
                    ? "active-chat"
                    : ""
                }
                onClick={() =>
                  onConversation(
                    conversation.id
                  )
                }
              >

                {conversation.title}

              </button>

            )
          )

        )}

      </div>


      {/* =================================================
          SIDEBAR BOTTOM
      ================================================= */}

      <div className="blueprint-sidebar-bottom">

        <aside>

          <FiUsers />

          <span>

            <b>
              Join our Community
            </b>

            <small>
              Earn up to 25 credits
            </small>

          </span>

          <FiChevronRight />

        </aside>


        <aside>

          <FiGift />

          <span>

            <b>
              Get Free Credits
            </b>

            <small>
              Get 10 credits each
            </small>

          </span>

          <FiChevronRight />

        </aside>

      </div>


      {/* =================================================
          FOOTER
      ================================================= */}

      <footer>

        <button
          className="blueprint-avatar"
          onClick={onProfile}
        >
          S
        </button>


        <span>

          <button
            className="blueprint-sidebar-icon-btn"
            onClick={() => {

              alert(
                `You have ${notifications.length} notifications`
              );

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

            <b>
              S
            </b>

            <span>

              <strong>
                saswe eng
              </strong>

              <small>
                engsaswe@gmail.com
              </small>

            </span>

          </header>


          <button
            onClick={() =>
              onSettings("General")
            }
          >

            <FiSettings />

            <span>
  {t("settings")}
            </span>

            <FiChevronRight />

          </button>


          <button
            onClick={() =>
              onSettings(
                "Plans and credits"
              )
            }
          >

            <FiPackage />

            <span>
  {t("plans")}
            </span>

            <FiChevronRight />

          </button>


          <button
            onClick={() =>
              onSettings("Account")
            }
          >

            <FiUser />

            <span>
                {t("profile")}

            </span>

            <FiChevronRight />

          </button>


          <button>

            <FiGift />

            <span>
                {t("redemption")}

            </span>

            <FiChevronRight />

          </button>


          <button
            onClick={() =>
              onSettings(
                "Preference"
              )
            }
          >

            <FiSliders />

            <span>
  {t("appearance")}
            </span>

            <FiChevronRight />

          </button>


          <button>
  ⓘ {t("helpCenter")}
          </button>


          <button
            onClick={() =>
              onPage("Home")
            }
          >

            <FiHome />

            <span>
 {t("homepage")}
            </span>

          </button>


          <button
            className="signout"
            onClick={onLogout}
          >

            <FiLogOut />

            <span>
 {t("signOut")}
            </span>

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
  typing,
  onSend,
  theme,
  setTheme,
}) {
const { t } = useTranslation();
  const [listening, setListening] =
    useState(false);

  const [showThemeMenu, setShowThemeMenu] =
    useState(false);

  const [showPlusMenu, setShowPlusMenu] =
    useState(false);


  const [hoveredAgent, setHoveredAgent] =
    useState(null);


  const agents = [

    "Alex is a Product Manager",

    "Emma is a UI Designer",

    "Noah is a Backend Developer",

    "Luna is a QA Engineer",

    "David is a Data Analyst",

    "Mia is an AI Engineer",

    "Leo is a Marketing Expert",

  ];
  

  /* ===================================================
     VOICE
  =================================================== */

  const startVoice = () => {

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

      alert(
        "Speech Recognition is not supported."
      );

      return;
    }


    const recognition =
      new SpeechRecognition();


    recognition.lang =
      "en-US";

    recognition.interimResults =
      false;


    recognition.start();

    setListening(true);


    recognition.onresult = (
      event
    ) => {

      setPrompt(
        event.results[0][0]
          .transcript
      );

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

{t("freePlan")} ·
        <a>
{t("upgrade")}        </a>

      </div>


      {/* =================================================
          TEAM AVATARS
      ================================================= */}

      <div
        className="blueprint-team-orbs"
        aria-label="Atoms team"
      >

        {avatars.map(
          (avatar, index) => (

            <div
              key={index}
              className="avatar-wrapper"
              onMouseEnter={() =>
                setHoveredAgent(index)
              }
              onMouseLeave={() =>
                setHoveredAgent(null)
              }
            >

              {hoveredAgent ===
                index && (

                <div className="blueprint-agent-tooltip">

                  {
                    agents[index]
                  }

                </div>

              )}


              <i
                className={
                  `blueprint-team-avatar avatar-${
                    index + 1
                  }`
                }
                style={{
                  backgroundImage:
                    `url(${avatar})`,
                }}
              />

            </div>

          )
        )}

      </div>


      {/* =================================================
          TITLE
      ================================================= */}

      <h1>
  {t("homeTitle")}
</h1>

      {/* =================================================
          MESSAGES
      ================================================= */}

      {messages.length > 0 && (

        <div className="blueprint-sent-messages">

          {messages.map(
            (message) => (

              <p
                key={
                  message.id
                }
                className={
                  message.type
                }
              >

                {message.type ===
                  "assistant" && (

                  <b>
                    Alex
                  </b>

                )}

                {
                  message.text
                }

              </p>

            )
          )}


          {typing && (

            <p className="assistant typing-message">

              <b>
                Alex
              </b>

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
          onChange={(event) =>
            setPrompt(
              event.target.value
            )
          }
          onKeyDown={(event) => {

            if (
              event.key ===
              "Enter"
            ) {

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

                setShowPlusMenu(
                  (current) =>
                    !current
                );

                setShowThemeMenu(
                  false
                );

              }}
            >

              <FiPlus />

            </button>


            {showPlusMenu && (

              <div className="blueprint-plus-menu">

                <button type="button">
{t("uploadFile")}
                </button>

                <button type="button">
{t("addImage")}                </button>

                <button type="button">
{t("connectTools")}                </button>

              </div>

            )}

          </div>


          {/* =============================================
              THEME
          ============================================= */}

          <div className="prompt-action">

            <button
              type="button"
              onClick={() => {

                setShowThemeMenu(
                  (current) =>
                    !current
                );

                setShowPlusMenu(
                  false
                );

              }}
            >

              {theme}

              <FiChevronDown />

            </button>


           {showThemeMenu && (

  <div className="blueprint-theme-menu">

    <button
      type="button"
      onClick={() => {
        const dark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;

setTheme(dark ? "dark" : "light");
        setShowThemeMenu(false);
      }}
    >
{t("system")}    </button>

    <button
      type="button"
      onClick={() => {
setTheme("light");
        setShowThemeMenu(false);
      }}
    >
{t("light")}    </button>

    <button
      type="button"
      onClick={() => {
setTheme("dark");
        setShowThemeMenu(false);
      }}
    >
{t("dark")}    </button>

  </div>

)}

          </div>


          <span />


          {/* =============================================
              BUILD
          ============================================= */}

          <button
            type="button"
          >

{t("build")}
            <FiChevronDown />

          </button>


          {/* =============================================
              MIC
          ============================================= */}

          <button
            type="button"
            onClick={startVoice}
            className={
              listening
                ? "recording"
                : ""
            }
          >

            <FiMic />

          </button>


          {/* =============================================
              SEND
          ============================================= */}

          <button
            type="button"
            className="go"
            onClick={onSend}
          >

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

          <b>
            ● ● ● ●
          </b>

          <FiX />

        </aside>

      </div>

    </div>
  );
}


/* =====================================================
   PROFILE PAGE
===================================================== */
function ProfilePage() {
  const [accountActive, setAccountActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

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
        ? "/api/users/account/deactivate"
        : "/api/users/account/activate";

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
      await api.delete("/api/users/account");

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

      <div className="blueprint-profile-avatar">
        S
      </div>

      <button className="blueprint-edit-profile">
        Edit profile
      </button>

      <h1>
        saswe eng
      </h1>

      <p>
        0 saves | 0 views
      </p>

      <div className="blueprint-profile-tabs">
        <b>
          Public Projects
        </b>

        <span>
          Saved
        </span>
      </div>

      <h3>
        Other Projects
      </h3>

      <div className="blueprint-profile-projects" />

      {/* =========================
          ACCOUNT MANAGEMENT
      ========================= */}

      <div className="blueprint-account-management">

        <h3>
          Account Settings
        </h3>

        <p className="account-management-description">
          Manage your account status and permanently delete your account.
        </p>

        {/* SUCCESS MESSAGE */}
        {message && (
          <div className="account-success-message">
            {message}
          </div>
        )}

        {/* ERROR MESSAGE */}
        {error && (
          <div className="account-error-message">
            {error}
          </div>
        )}

        {/* =========================
            ACTIVATE / DEACTIVATE
        ========================= */}

        <div className="account-management-row">

          <div className="account-management-info">
            <strong>
              Account status
            </strong>

            <span>
              {accountActive
                ? "Your account is currently active."
                : "Your account is currently deactivated."
              }
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
              ? "Please wait..."
              : accountActive
                ? "Deactivate account"
                : "Activate account"
            }
          </button>

        </div>

        {/* =========================
            DELETE ACCOUNT
        ========================= */}

        <div className="account-danger-zone">

          <div className="account-management-info">
            <strong>
              Delete account
            </strong>

            <span>
              Permanently delete your account and all associated data.
            </span>
          </div>

          <button
            className="account-delete-button"
            onClick={handleDeleteAccount}
            disabled={deleteLoading}
          >
            {deleteLoading
              ? "Deleting..."
              : "Delete account"
            }
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
}) {const { t } = useTranslation();

  const tabs = [

  [t("domains"), FiGlobe],

  [t("people"), FiUsers],

  [t("general"), FiSliders],

  [t("connectors"), FiZap],

  [t("plansCredits"), FiPackage],

  [t("cloudAI"), FiGrid],

  [t("account"), FiUser],

  [t("preference"), FiSliders],

];


  return (

    <div className="blueprint-modal-backdrop">

      <section className="blueprint-settings-modal">

        <aside>

          <b>
             {t("settings")}

          </b>


          <small>
             {t("project")}

          </small>


          {tabs
            .slice(0, 1)
            .map(
              ([n, I]) => (

                <Tab
                  key={n}
                  n={n}
                  I={I}
                  tab={tab}
                  onTab={onTab}
                />

              )
            )}


          <small>
             {t("workspace")}

          </small>


          {tabs
            .slice(1, 6)
            .map(
              ([n, I]) => (

                <Tab
                  key={n}
                  n={n}
                  I={I}
                  tab={tab}
                  onTab={onTab}
                />

              )
            )}


          <small>
             {t("account")}

          </small>


          {tabs
            .slice(6)
            .map(
              ([n, I]) => (

                <Tab
                  key={n}
                  n={n}
                  I={I}
                  tab={tab}
                  onTab={onTab}
                />

              )
            )}

        </aside>


        <main>

          <button
            className="blueprint-modal-close"
            onClick={onClose}
          >

            <FiX />

          </button>


          <SettingsContent
            tab={tab}
          />

        </main>

      </section>

    </div>
  );
}


/* =====================================================
   TAB
===================================================== */

function Tab({
  n,
  I,
  tab,
  onTab,
}) {

  return (

    <button
      className={
        tab === n
          ? "active"
          : ""
      }
      onClick={() =>
        onTab(n)
      }
    >

      <I />

      {n}

      {n ===
        "Cloud & AI" && (

        <em>
          ✦ Free
        </em>

      )}

    </button>
  );
}


/* =====================================================
   SETTINGS CONTENT
===================================================== */
function SettingsContent({
  tab,
}) {
    const { t } = useTranslation();

  const [accountActive, setAccountActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleAccountStatus = async () => {
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const endpoint = accountActive
        ? "/api/users/account/deactivate"
        : "/api/users/account/activate";

      await api.patch(endpoint);

      setAccountActive((current) => !current);

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
      await api.delete("/api/users/account");

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      sessionStorage.clear();

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

  /* ===================================================
     PEOPLE
  =================================================== */

  if (tab === "people") {

  return (

    <>

      <h2>
        {t("people")} <em>{t("free")}</em>
      </h2>


      <div className="blueprint-settings-card">

        <h3>
          {t("inviteWorkspaceMembers")}
        </h3>


        <p>
          {t("upgradeToInviteMembers")}
          {" "}
          {t("collaborateProjects")}
        </p>


        <div className="blueprint-invite">

          <input
            placeholder={t("addEmails")}
          />


          <button>
            {t("upgradeToInviteMembers")}
          </button>

        </div>

      </div>



      <div className="blueprint-members">


        <header>

          {t("user")}


          <span>
            {t("role")}
          </span>


          <span>
            {t("status")}
          </span>


          <span>
            {t("totalUsage")}
          </span>


          <span>
            {t("dateJoined")}
          </span>


        </header>



        <p>

          <b>
            S
          </b>


          saswe eng ({t("you")})


          <span>
            {t("owner")}
          </span>


          <span className="blueprint-active-badge">
            {t("active")}
          </span>


          <span>
            6.51 {t("credits")}
          </span>


          <span>
            Jul 26, 2026
          </span>


        </p>


      </div>


    </>
  );
}

  /* ===================================================
     CONNECTORS
  =================================================== */

 if (tab === "connectors") {

  return (

    <>

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
        ].map(
          (name) => (


            <div key={name}>


              <b>


                <FiCode />


                {name}


                <small>

                  {t("connectServiceData", {
                    name
                  })}


                </small>


              </b>



              <button>

                {t("connect")}

              </button>


            </div>


          )
        )}


      </div>


    </>
  );
}

  /* ===================================================
     PLANS
  =================================================== */

  if (tab === "plansCredits") {

  return (

    <>

      <h2>

        {t("plansCredits")}{" "}

        <em>
          {t("free")}
        </em>

      </h2>



      <div className="blueprint-credits-card">


        <b>
          {t("creditsRemaining")}
        </b>



        <strong>
          15 / 15
        </strong>



        <i>
          <span />
        </i>



        <small>

          • {t("dailyCreditsReset", {
              count: 15,
              date: "Jul 28"
          })}

        </small>



      </div>



      <div className="blueprint-plan-tabs">

        {t("planPayment")}

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
                {t("unlockFeatures")}
              </p>


            </article>

          )
        )}

      </div>


    </>
  );
}

  /* ===================================================
     PREFERENCE
  =================================================== */

  if (tab === "preference") {

  return (

    <>

      <h2>
        {t("preference")}
      </h2>



      <h3>
        {t("language")}
      </h3>



      <p>
        {t("changeLanguage")}
      </p>



      <hr />



      <h3>
        {t("theme")}
      </h3>



      <p>
        {t("customizeAppearance")}
      </p>



      <div className="blueprint-themes">


        <b>
          {t("system")}
        </b>



        <b className="chosen">
          {t("light")}
        </b>



        <b>
          {t("dark")}
        </b>


      </div>


    </>
  );
}

  /* ===================================================
     DOMAINS
  =================================================== */

  if (tab === "domains") {

  return (

    <>

      <h2>
        {t("domains")} ⓘ
      </h2>



      <h3>
        {t("connectedDomains")}
      </h3>



      <p>
        {t("manageConnectedDomains")}
      </p>



      <div className="blueprint-notice">


        {t("notPublished")}



        <button>

          {t("publish")}

        </button>


      </div>





      <div className="blueprint-domain-row">


        <FiGlobe />



        <span>


          <b>

            {t("connectExistingDomain")}

          </b>



          <small>

            {t("upgradeSubscription")}

          </small>


        </span>




        <button>

          {t("connectDomain")}

        </button>



      </div>



    </>
  );
}


  /* ===================================================
     ACCOUNT
  =================================================== */
if (tab === "account") {

  return (

    <>

      <h2>
        {t("accountSettings")}
      </h2>



      <div className="blueprint-account-row">

        {t("avatar")}

        <b>
          S
        </b>

      </div>




      <div className="blueprint-account-row">

        {t("username")}


        <span>
          saswe eng ✎
        </span>


      </div>




      <div className="blueprint-account-row">

        {t("email")}


        <span>
          engsaswe@gmail.com
        </span>


      </div>




      <div className="blueprint-account-profile">


        <h3>
          {t("profile")}
        </h3>



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

                : t("accountDeactivated")

              }

            </span>


          </div>





          <button

            type="button"

            className={`account-toggle ${
              accountActive ? "active" : ""
            }`}

            onClick={handleAccountStatus}

            disabled={loading}

            aria-label={t("toggleAccountStatus")}

          >


            <span />


          </button>



        </div>







        <div className="account-danger-zone">


          <div className="account-management-info">


            <strong>

              {t("deleteAccount")}

            </strong>



            <span>

              {t("deleteAccountWarning")}

            </span>


          </div>





          <button

            type="button"

            className="account-delete-button"

            onClick={handleDeleteAccount}

            disabled={deleteLoading}


          >


            {deleteLoading

              ? t("deleting")

              : t("deleteAccount")

            }


          </button>



        </div>



      </div>



    </>

  );

}
  /* ===================================================
     CLOUD & AI
  =================================================== */
if (tab === "cloudAI") {

  return (

    <>


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



    </>

  );

}
  /* ===================================================
     GENERAL
  =================================================== */

  return (

  <>


    <h2>

      {t("general")}

    </h2>





    <h3>

      {t("defaultModel")}

    </h3>





    <div className="blueprint-setting-line">


      {t("model")}



      <span>

        Claude Opus 4.7⌄

      </span>



    </div>







    <h3>

      {t("permissions")}

    </h3>





    <div className="blueprint-setting-line">


      {t("defaultAccess")}



      <span>

        ◎ {t("public")}⌄

      </span>



    </div>







    <h3>

      {t("creditReminder")}

    </h3>






    <div className="blueprint-setting-line">


      {t("showCredits")}



      <i className="blueprint-toggle" />



    </div>




  </>

);}

/* =====================================================
   EXPORT
===================================================== */

export default AtomsApp;