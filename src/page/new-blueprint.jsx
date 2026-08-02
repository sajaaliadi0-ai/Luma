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
  localStorage.setItem("theme", theme);

  document.documentElement.setAttribute(
  "data-theme",
  theme
);

document.body.classList.toggle(
  "dark",
  theme === "dark"
);
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

      navigate("/login");
    }
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


  /* ===================================================
     PROMPT

     مهم:
     هذا يأخذ prompt الموجود من Home
     =================================================== */

  const [prompt, setPrompt] =
    useState("");


  /* ===================================================
     CONVERSATIONS

     مهم جداً:
     بدل [] نقرأ من sessionStorage
     =================================================== */

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


  /* ===================================================
     SAVE CONVERSATIONS

     كل ما conversations تتغير
     نحفظها في sessionStorage
  =================================================== */

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


  /* ===================================================
     RECEIVE PROMPT FROM OLD HOME PAGE

     الصفحة الأولى Home.jsx تعمل:

     sessionStorage.setItem(
       "blueprintPrompt",
       text
     );

     ثم navigate("/DualWorkspace")

     هنا نستقبلها.
  =================================================== */

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

        {page === "My Projects" &&
          !showProfile && (

            <Projects

              conversations={
                conversations
              }

              onConversation={
                openConversation
              }

            />

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
          title="New chat"
        >

          <span className="blueprint-atoms-symbol">

            <i />
            <i />
            <i />

          </span>

          <b>
            Atoms
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
          saswe eng's Atoms
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
                saswe eng's Atoms
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

            saswe eng's Atoms

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
              Settings
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
              Plans
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
              Profile
            </span>

            <FiChevronRight />

          </button>


          <button>

            <FiGift />

            <span>
              Redemption
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
              Appearance
            </span>

            <FiChevronRight />

          </button>


          <button>
            ⓘ Help Center
          </button>


          <button
            onClick={() =>
              onPage("Home")
            }
          >

            <FiHome />

            <span>
              Homepage
            </span>

          </button>


          <button
            className="signout"
            onClick={onLogout}
          >

            <FiLogOut />

            <span>
              Sign out
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

        setTheme(dark ? "Dark" : "Light");
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

  return (

    <section className="blueprint-profile-page">

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

    </section>
  );
}


/* =====================================================
   PROJECTS
===================================================== */

function Projects({
  conversations,
  onConversation,
}) {

  return (

    <section className="blueprint-catalog blueprint-projects">

      <header>

        <h2>
          My Projects
        </h2>

      </header>


      <div className="blueprint-filters blueprint-project-filter">

        <span>
          Starred
        </span>

      </div>


      {conversations.length === 0 ? (

        <p className="no-projects">

          Start a new chat from the
          Atoms button to create your
          first project.

        </p>

      ) : (

        <div className="blueprint-project-grid">

          {conversations.map(
            (conversation) => (

              <article
                key={
                  conversation.id
                }
                onClick={() =>
                  onConversation(
                    conversation.id
                  )
                }
              >

                <div className="blueprint-empty-project">

                  <span className="blueprint-project-logo">

                    <i />
                    <i />
                    <i />

                  </span>

                </div>


                <footer>

                  <div>

                    <strong>
                      {
                        conversation.title
                      }
                    </strong>

                    <small>
                      {
                        conversation.createdAt ||
                        "2026/07/26"
                      }
                    </small>

                  </div>

                  <FiMoreHorizontal />

                </footer>

              </article>

            )
          )}

        </div>

      )}

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
}) {

  const tabs = [

    ["Domains", FiGlobe],

    ["People", FiUsers],

    ["General", FiSliders],

    ["Connectors", FiZap],

    ["Plans and credits", FiPackage],

    ["Cloud & AI", FiGrid],

    ["Account", FiUser],

    ["Preference", FiSliders],

  ];


  return (

    <div className="blueprint-modal-backdrop">

      <section className="blueprint-settings-modal">

        <aside>

          <b>
            Settings
          </b>


          <small>
            Project
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
            Workspace
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
            Account
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

  /* ===================================================
     PEOPLE
  =================================================== */

  if (tab === "People") {

    return (

      <>

        <h2>
          People <em>Free</em>
        </h2>


        <div className="blueprint-settings-card">

          <h3>
            Invite workspace members
          </h3>

          <p>
            Upgrade to invite members and
            collaborate on all projects.
          </p>


          <div className="blueprint-invite">

            <input
              placeholder="Add emails"
            />

            <button>
              Upgrade to invite members
            </button>

          </div>

        </div>


        <div className="blueprint-members">

          <header>

            User

            <span>
              Role
            </span>

            <span>
              Status
            </span>

            <span>
              Total Usage
            </span>

            <span>
              Date Joined
            </span>

          </header>


          <p>

            <b>
              S
            </b>

            saswe eng (you)

            <span>
              Owner
            </span>

            <span className="blueprint-active-badge">
              Active
            </span>

            <span>
              6.51 credits
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

  if (tab === "Connectors") {

    return (

      <>

        <h2>
          Connectors
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
                    Connect {name} to manage
                    your services and project
                    data.
                  </small>

                </b>


                <button>
                  Connect
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

  if (
    tab ===
    "Plans and credits"
  ) {

    return (

      <>

        <h2>
          Plans and credits <em>Free</em>
        </h2>


        <div className="blueprint-credits-card">

          <b>
            Credits remaining
          </b>

          <strong>
            15 / 15
          </strong>

          <i>
            <span />
          </i>

          <small>
            • 15 daily credits reset on
            Jul 28
          </small>

        </div>


        <div className="blueprint-plan-tabs">
          Plan Payment
        </div>


        <div className="blueprint-plans">

          {[
            ["Free", "$0"],
            ["Pro", "$15.8"],
            ["Max", "$79"],
          ].map(
            ([name, price]) => (

              <article key={name}>

                <h2>
                  {name}
                </h2>

                <strong>

                  {price}

                  <small>
                    / month
                  </small>

                </strong>

                <p>
                  Unlock more features
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

  if (
    tab ===
    "Preference"
  ) {

    return (

      <>

        <h2>
          Preference
        </h2>

        <h3>
          Language
        </h3>

        <p>
          Change the language used
          in the user interface.
        </p>

        <hr />

        <h3>
          Theme
        </h3>

        <p>
          Customize how Atoms looks
          on your device.
        </p>


        <div className="blueprint-themes">

          <b>
            System
          </b>

          <b className="chosen">
            Light
          </b>

          <b>
            Dark
          </b>

        </div>

      </>
    );
  }


  /* ===================================================
     DOMAINS
  =================================================== */

  if (tab === "Domains") {

    return (

      <>

        <h2>
          Domains ⓘ
        </h2>

        <h3>
          Connected Domains
        </h3>

        <p>
          Manage your connected domains
        </p>


        <div className="blueprint-notice">

          The project hasn't been
          published yet

          <button>
            Publish
          </button>

        </div>


        <div className="blueprint-domain-row">

          <FiGlobe />

          <span>

            <b>
              Connect Existing Domain
            </b>

            <small>
              Upgrade your subscription
            </small>

          </span>

          <button>
            Connect domain
          </button>

        </div>

      </>
    );
  }


  /* ===================================================
     ACCOUNT
  =================================================== */

  if (tab === "Account") {

    return (

      <>

        <h2>
          Account Settings
        </h2>


        <div className="blueprint-account-row">

          Avatar

          <b>
            S
          </b>

        </div>


        <div className="blueprint-account-row">

          Username

          <span>
            saswe eng✎
          </span>

        </div>


        <div className="blueprint-account-row">

          Email

          <span>
            engsaswe@gmail.com
          </span>

        </div>

      </>
    );
  }


  /* ===================================================
     CLOUD & AI
  =================================================== */

  if (
    tab ===
    "Cloud & AI"
  ) {

    return (

      <>

        <h2>
          Cloud & AI
        </h2>


        <div className="blueprint-warning">

          ⓘ Your Cloud & AI Balance is
          crucial for keeping your
          published projects running.

        </div>


        <div className="blueprint-cloud-cards">

          <article>

            <h3>
              ◕ Cloud & AI
            </h3>

            <strong>
              $0.00
            </strong>

            <button>
              Upgrade
            </button>

          </article>


          <article>

            <h3>
              Cloud $25.00 / $25.00
            </h3>

            <hr />

            <h3>
              AI $1.00 / $1.00
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
        General
      </h2>


      <h3>
        Default Model
      </h3>


      <div className="blueprint-setting-line">

        Model

        <span>
          Claude Opus 4.7⌄
        </span>

      </div>


      <h3>
        Permissions
      </h3>


      <div className="blueprint-setting-line">

        Set Default Access for
        Projects

        <span>
          ◎ Public⌄
        </span>

      </div>


      <h3>
        Credit Balance Reminder
      </h3>


      <div className="blueprint-setting-line">

        Show remaining credits

        <i className="blueprint-toggle" />

      </div>

    </>
  );
}


/* =====================================================
   EXPORT
===================================================== */

export default AtomsApp;
