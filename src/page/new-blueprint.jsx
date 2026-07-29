import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  FiMoreHorizontal,
  FiPackage,
  FiPlus,
  FiSettings,
  FiSliders,
  FiUser,
  FiUsers,
  FiX,
  FiZap,
    FiMic,

  
} from "react-icons/fi";
import alex from "./alex.png";
import emma from "./emma.png";
import noah from "./noah.png";
import luna from "./luna.png";
import david from "./david.png";
import mia from "./mia.png";
import leo from "./leo.png";
import api from "../api/api";
import "../css/newBlueprint.css";

const resources = [
  ["Robot for Forex Trading", "Osuji Promise · ◉ 7.7K", "forex", "Data Analysis"],
  ["إنشاء موقع لعرض الفيديوهات", "Musa Aljably · ◉ 2.6K", "purple", "Website"],
  ["موقع فيديوهات الذكاء الاصطناعي", "Mo Daha · ◉ 3.6K", "green", "AI"],
  ["Bakery dashboard", "Atoms · ◉ 1.4K", "dark", "E-commerce"],
  ["Fantasy landing page", "Atoms · ◉ 4.1K", "fantasy", "Website"],
  ["Wallet dashboard", "Atoms · ◉ 1.8K", "wallet", "Productivity"],
];
const avatars = [
  alex,
  emma,
  noah,
  luna,
  david,
  mia,
  leo,
];
function AtomsApp() {



const navigate = useNavigate();

const handleLogout = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");

    await api.post("/api/auth/logout", {
      refreshToken,
    });
  } catch (error) {
    console.error(error);
  } finally {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    sessionStorage.clear();

    navigate("/login");
  }
};
const [notifications] = useState([]);
  const [resourceFilter, setResourceFilter] = useState("All");
  const [resourceTab, setResourceTab] = useState("Discover");
  const [showProfile, setShowProfile] = useState(false);
  const [page, setPage] = useState("Home");
  const [collapsed, setCollapsed] = useState(false);
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [settings, setSettings] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [typing, setTyping] = useState(false);


  const choosePage = (next) => {
    setPage(next);
    setWorkspaceOpen(false);
    setProfileOpen(false);
  };


  const openSettings = (tab = "General") => {
    setSettings(tab);
    setProfileOpen(false);
  };


  const openConversation = (id) => {
    setActiveConversationId(id);
    setPage("Home");
    setWorkspaceOpen(false);
    setProfileOpen(false);
  };


  const toggleSidebar = () => {
    setCollapsed((current) => !current);
    setWorkspaceOpen(false);
    setProfileOpen(false);
  };


  const newChat = () => {

    const id = `chat-${Date.now()}`;

    setConversations((current) => [
      {
        id,
        title:"New chat",
        messages:[],
        createdAt:new Date().toLocaleDateString("en-CA"),
      },
      ...current,
    ]);

    setActiveConversationId(id);
    setPage("Home");
    setPrompt("");
    setWorkspaceOpen(false);
    setProfileOpen(false);
  };


  const sendMessage = () => {

    const text = prompt.trim();

    if(!text) return;


    const conversationId =
      activeConversationId || `chat-${Date.now()}`;


    const userMessage = {
      id:`user-${Date.now()}`,
      type:"user",
      text,
    };


    setConversations((current)=>{

      const existing =
        current.find(
          conversation =>
            conversation.id === conversationId
        );


      if(existing){

        return current.map(conversation =>
          conversation.id === conversationId
          ?
          {
            ...conversation,
            title:
              conversation.title==="New chat"
              ?
              text.length>30
              ?
              `${text.slice(0,30)}…`
              :
              text
              :
              conversation.title,

            messages:[
              ...conversation.messages,
              userMessage
            ]
          }

          :

          conversation
        );

      }


      return [
        {
          id:conversationId,
          title:
            text.length>30
            ?
            `${text.slice(0,30)}…`
            :
            text,

          messages:[
            userMessage
          ],

          createdAt:new Date().toLocaleDateString("en-CA"),
        },

        ...current,
      ];

    });


    setActiveConversationId(conversationId);
    setPrompt("");
    setTyping(true);

setPage("Home");
    window.setTimeout(()=>{

      setConversations(current=>

        current.map(conversation =>

          conversation.id===conversationId

          ?

          {
            ...conversation,

            messages:[
              ...conversation.messages,

              {
                id:`alex-${Date.now()}`,
                type:"assistant",
                text:"وصلت فكرتك. سأساعدك في تنفيذها خطوة بخطوة.",
              }
            ]
          }

          :

          conversation

        )

      );


      setTyping(false);

    },800);

  };


  return (
    <div
      className={`blueprint-app ${
        collapsed ? "blueprint-is-collapsed" : ""
      }`}
    >

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
    setWorkspaceOpen(!workspaceOpen);
    setProfileOpen(false);
  }}
  profileOpen={profileOpen}
  onProfile={() => {
    setProfileOpen(!profileOpen);
    setWorkspaceOpen(false);
  }}
  onSettings={openSettings}
  conversations={conversations}
  activeConversationId={activeConversationId}
  onConversation={openConversation}
/>

      <main 
  className={`blueprint-app-main ${
    page === "Home" ? "home-active" : "full-page-view"
  }`}
>
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
    />
  )}
                


        {page === "Resources" && !showProfile && (
          <Resources
            resourceTab={resourceTab}
            setResourceTab={setResourceTab}
            setShowProfile={setShowProfile}
            resourceFilter={resourceFilter}
            setResourceFilter={setResourceFilter}
          />
        )}


        {page === "Resources" && showProfile && (
          <ProfilePage />
        )}


        {page === "My Projects" && !showProfile && (
          <Projects
            conversations={conversations}
            onConversation={openConversation}
            setShowProfile={setShowProfile}
          />
        )}


        {page === "My Projects" && showProfile && (
          <ProfilePage />
        )}

       

      </main>


      {settings && (
        <SettingsModal
          tab={settings}
          onTab={setSettings}
          onClose={() => setSettings(null)}
        />
      )}

    </div>
  );
}



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
})  {

const nav = [
  ["Home", FiHome],
  ["Resources", FiCompass],
  ["My Projects", FiFolder],
  ["fullpage", FiPlus],
];

 


  return (

    <aside className="blueprint-app-sidebar">


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

          <b>Atoms</b>

        </button>


        <button
          onClick={onCollapse}
          aria-label="Collapse sidebar"
        >
          <FiMenu />
        </button>


      </div>



      <button
        className="blueprint-workspace-switch"
        onClick={onWorkspace}
      >

        <b>S</b>

        <span>
          saswe eng's Atoms
        </span>

        <FiChevronDown />

      </button>




      {workspaceOpen && (

        <div className="blueprint-workspace-popover">


          <div className="blueprint-workspace-head">

            <b>S</b>


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


            <b>S</b>


            saswe eng's Atoms


            <FiChevronRight />


          </div>


        </div>

      )}






      <nav>

        {nav.map(([name,Icon])=>(

          <button

            key={name}

            className={
              page===name
              ?
              "selected"
              :
              ""
            }


            onClick={()=>
              onPage(name)
            }

          >

            <Icon />

            <span>
              {name}
            </span>


          </button>


        ))}


      </nav>





      <small className="blueprint-recents-label">

        Recents

      </small>




      <div className="blueprint-recents">


        {conversations.length===0 ? (

          <small className="empty-recents">

            Your chats will appear here

          </small>


        )

        :

        (

          conversations.map(conversation=>(


            <button

              key={conversation.id}

              className={
                conversation.id===activeConversationId
                ?
                "active-chat"
                :
                ""
              }


              onClick={()=>
                onConversation(conversation.id)
              }

            >

              {conversation.title}


            </button>


          ))


        )}


      </div>





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
        alert(`You have ${notifications.length} notifications`);
    }}
>
    <FiBell />
</button>

        

    </span>

</footer>





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



         <button onClick={() => onSettings("General")}>
    <FiSettings />
    <span>Settings</span>
    <FiChevronRight />
</button>


          <button onClick={() => onSettings("Plans and credits")}>
    <FiPackage />
    <span>Plans</span>
    <FiChevronRight />
</button>




         <button onClick={() => onSettings("Account")}>
    <FiUser />
    <span>Profile</span>
    <FiChevronRight />
</button>





         <button>
    <FiGift />
    <span>Redemption</span>
    <FiChevronRight />
</button>




          <button
            onClick={() =>
              onSettings("Preference")
            }
          >

            <FiSliders />

            Appearance

            <FiChevronRight />

          </button>





          <button>

            ⓘ Help Center

          </button>





          <button onClick={() => onPage("Home")}>
  <FiHome />
  <span>Homepage</span>
</button>

<button
  className="signout"
  onClick={() => {
    console.log("clicked");
    onLogout();
  }}
>
  <FiLogOut />
  <span>Sign out</span>
</button>

        </div>

      )}


    </aside>

  );

}





function Home({
  prompt,
  setPrompt,
  messages,
  typing,
  onSend,
}) {
  
const [listening, setListening] = useState(false);
const [showThemeMenu, setShowThemeMenu] = useState(false);
const [showPlusMenu, setShowPlusMenu] = useState(false);
const [theme, setTheme] = useState("Light");
  const [hoveredAgent,setHoveredAgent] =
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



const startVoice = () => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Speech Recognition is not supported.");
    return;
  }

  const recognition = new SpeechRecognition();

  recognition.lang = "en-US";
  recognition.interimResults = false;

  recognition.start();

  setListening(true);

  recognition.onresult = (e) => {
    setPrompt(e.results[0][0].transcript);
  };

  recognition.onend = () => {
    setListening(false);
  };
};
  return (

    <div className="blueprint-home-page">



      <div className="blueprint-top-credit">

        Free plan ·

        <a>
          Upgrade
        </a>

      </div>





      <div
        className="blueprint-team-orbs"
        aria-label="Atoms team"
      >


        {Array.from(
          {length:7},
          (_,index)=>(


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



            {hoveredAgent===index && (

              <div className="blueprint-agent-tooltip">

                {agents[index]}

              </div>

            )}





            <i

              className={
                `blueprint-team-avatar avatar-${index+1}`
              }


              style={{
  backgroundImage: `url(${avatars[index]})`
}}
            />


          </div>


        ))}



      </div>





      <h1>

        Your next product starts here, saswe eng.

      </h1>






      {messages.length>0 && (

        <div className="blueprint-sent-messages">


          {messages.map(message=>(


            <p
              key={message.id}
              className={message.type}
            >

              {message.type==="assistant" &&
                <b>
                  Alex
                </b>
              }


              {message.text}


            </p>


          ))}






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






      <div className="blueprint-home-prompt">


        <input

          value={prompt}

          onChange={(event)=>
            setPrompt(event.target.value)
          }


          onKeyDown={(event)=>
            event.key==="Enter" && onSend()
          }


          placeholder=
          "Ask the team to bring your idea to life"

        />





        <footer>

<div className="prompt-action">

<button
  onClick={() => {
    setShowPlusMenu(!showPlusMenu);
    setShowThemeMenu(false);
  }}
>
  <FiPlus />
</button>


{showPlusMenu && (
  <div className="blueprint-plus-menu">

    <button>
      Upload file
    </button>

    <button>
      Add image
    </button>

    <button>
      Connect tools
    </button>

  </div>
)}

</div>



<div className="prompt-action">

<button
  onClick={() => {
    setShowThemeMenu(!showThemeMenu);
    setShowPlusMenu(false);
  }}
>
  {theme}
  <FiChevronDown />
</button>


{showThemeMenu && (
  <div className="blueprint-theme-menu">

    <button onClick={() => setTheme("System")}>
      System
    </button>

    <button onClick={() => setTheme("Light")}>
      Light
    </button>

    <button onClick={() => setTheme("Dark")}>
      Dark
    </button>

  </div>
)}

</div>




          <span />





          <button>

            Build

            <FiChevronDown />

          </button>





         <button
    onClick={startVoice}
    className={listening ? "recording" : ""}
>
    <FiMic />
</button>





          <button

            className="go"

            onClick={onSend}

          >

            ↑

          </button>



        </footer>






        <aside>


          <FiZap />


          Connect your tools to Atoms


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
function Resources({
  resourceTab,
  setResourceTab,
  
  resourceFilter,
  setResourceFilter
}) {


  const templates = [
    ["Landing Page Template", "Atoms · ◉ 3K", "purple"],
    ["Dashboard Template", "Atoms · ◉ 5K", "dark"],
    ["AI Website Template", "Atoms · ◉ 2K", "green"],
  ];


  return (

    <section className="blueprint-catalog">


      <header>

        <h2>
          Resources
        </h2>


        
      </header>





      <div className="blueprint-tabs">


        <button
          className={
            resourceTab==="Discover"
            ?
            "active"
            :
            ""
          }

          onClick={() =>
            setResourceTab("Discover")
          }

        >
          Discover
        </button>




        <button

          className={
            resourceTab==="Templates"
            ?
            "active"
            :
            ""
          }

          onClick={() =>
            setResourceTab("Templates")
          }

        >

          Templates

        </button>


      </div>





      <div className="blueprint-filters">


        {[
          "All",
          "E-commerce",
          "Website",
          "Game",
          "Productivity",
          "Data Analysis",
          "Latest",
        ].map((x)=>(


          <button

            key={x}

            className={
              resourceFilter===x
              ?
              "filter-active"
              :
              ""
            }


            onClick={() =>
              setResourceFilter(x)
            }

          >

            {x}

          </button>


        ))}


      </div>






      <div className="blueprint-resource-grid">


        {(resourceTab==="Discover"
          ?
          resources
          :
          templates
        )

        .filter(item =>
          resourceFilter==="All" ||
          item[3]===resourceFilter
        )

        .map(([title,meta,tone],index)=>(


          <article key={title}>


            <div
              className={`blueprint-resource-image ${tone}`}
            >

              <span>

                {
                  index % 2
                  ?
                  "حول أفكارك إلى فيديوهات احترافية"
                  :
                  "Trading Dashboard"
                }

              </span>


            </div>




            <footer>


              <b className="blueprint-resource-avatar">

                {title[0]}

              </b>



              <div>

                <strong>
                  {title}
                </strong>


                <small>
                  {meta}
                </small>


              </div>


            </footer>


          </article>


        ))}


      </div>



    </section>


  );

}






function ProfilePage(){


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



<div className="blueprint-profile-projects">

</div>


</section>

);


}






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





{
conversations.length===0

?

<p className="no-projects">

Start a new chat from the Atoms button to create your first project.

</p>


:

<div className="blueprint-project-grid">


{conversations.map(conversation=>(


<article

key={conversation.id}

onClick={() =>
onConversation(conversation.id)
}

>



<div className="blueprint-empty-project">


<span className="blueprint-project-logo">

<i/>
<i/>
<i/>

</span>


</div>




<footer>


<div>

<strong>
{conversation.title}
</strong>


<small>

{conversation.createdAt || "2026/07/26"}

</small>


</div>




<FiMoreHorizontal />


</footer>



</article>


))}



</div>


}



</section>

);


}
function SettingsModal({ tab, onTab, onClose }) {

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


          {tabs.slice(0,1).map(([n,I])=>(

            <Tab
              key={n}
              n={n}
              I={I}
              tab={tab}
              onTab={onTab}
            />

          ))}




          <small>
            Workspace
          </small>


          {tabs.slice(1,6).map(([n,I])=>(

            <Tab
              key={n}
              n={n}
              I={I}
              tab={tab}
              onTab={onTab}
            />

          ))}




          <small>
            Account
          </small>


          {tabs.slice(6).map(([n,I])=>(

            <Tab
              key={n}
              n={n}
              I={I}
              tab={tab}
              onTab={onTab}
            />

          ))}


        </aside>





        <main>


          <button
            className="blueprint-modal-close"
            onClick={onClose}
          >

            <FiX />

          </button>



          <SettingsContent tab={tab}/>


        </main>


      </section>


    </div>

  );

}






function Tab({n,I,tab,onTab}){

return (

<button

className={
  tab===n
  ?
  "active"
  :
  ""
}

onClick={() =>
  onTab(n)
}

>

<I/>

{n}


{n==="Cloud & AI" &&

<em>
✦ Free
</em>

}


</button>


);

}







function SettingsContent({tab}){


if(tab==="People")

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
Upgrade to invite members and collaborate on all projects.
</p>



<div className="blueprint-invite">


<input placeholder="Add emails"/>


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







if(tab==="Connectors")

return (

<>

<h2>
Connectors
</h2>



<div className="blueprint-connector-list">


{

[
"GitHub",
"Supabase",
"Stripe",
"Google Analytics 4",
"Google Search Console",
"Google Ads",
]

.map(n=>(


<div key={n}>


<b>

<FiCode/>

{n}


<small>
Connect {n} to manage your services and project data.
</small>


</b>



<button>
Connect
</button>


</div>


))


}



</div>


</>

);








if(tab==="Plans and credits")

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
<span/>
</i>


<small>
• 15 daily credits reset on Jul 28
</small>


</div>





<div className="blueprint-plan-tabs">

Plan Payment

</div>





<div className="blueprint-plans">


{

[
["Free","$0"],
["Pro","$15.8"],
["Max","$79"],
]

.map(([n,p])=>(


<article key={n}>


<h2>
{n}
</h2>


<strong>

{p}

<small>
/ month
</small>

</strong>



<p>
Unlock more features
</p>


</article>


))


}


</div>


</>

);








if(tab==="Preference")

return (

<>


<h2>
Preference
</h2>



<h3>
Language
</h3>


<p>
Change the language used in the user interface.
</p>



<hr/>



<h3>
Theme
</h3>


<p>
Customize how Atoms looks on your device.
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








if(tab==="Domains")

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


The project hasn't been published yet


<button>
Publish
</button>


</div>





<div className="blueprint-domain-row">


<FiGlobe/>



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







if(tab==="Account")

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







if(tab==="Cloud & AI")

return (

<>


<h2>
Cloud & AI
</h2>



<div className="blueprint-warning">

ⓘ Your Cloud & AI Balance is crucial for keeping your published projects running.

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


<hr/>


<h3>
AI $1.00 / $1.00
</h3>


</article>


</div>


</>

);







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

Set Default Access for Projects


<span>
◎ Public⌄
</span>


</div>




<h3>
Credit Balance Reminder
</h3>



<div className="blueprint-setting-line">

Show remaining credits


<i className="blueprint-toggle"/>


</div>


</>

);


}


export default AtomsApp;  
