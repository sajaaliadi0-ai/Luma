import {
  FiChevronDown,
  FiMic,
  FiPlus,
  FiZap,
  FiX,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";
import { useTranslation } from "../i18n";
import { useEffect, useState } from "react";

import alex from "./alex.png";
import emma from "./emma.png";
import noah from "./noah.png";
import luna from "./luna.png";
import david from "./david.png";
import mia from "./mia.png";
import leo from "./leo.png";

import "../css/home.css";


const avatars = [
  alex,
  emma,
  noah,
  luna,
  david,
  mia,
  leo,
];


const agents = [
  "homeAgentAlex",
  "homeAgentEmma",
  "homeAgentNoah",
  "homeAgentLuna",
  "homeAgentDavid",
  "homeAgentMia",
  "homeAgentLeo",
];



function Home({ dark, setDark, themeMode, setThemeMode }) {

  const navigate = useNavigate();
  const { t } = useTranslation();

  const [prompt, setPrompt] = useState("");
  const [listening, setListening] = useState(false);

  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showPlusMenu, setShowPlusMenu] = useState(false);

  const theme =
    themeMode === "system"
      ? "System"
      : themeMode === "dark"
      ? "Dark"
      : "Light";

  const [hoveredAgent, setHoveredAgent] = useState(null);




  // =================================
  // VOICE
  // =================================


  const startVoice = () => {


    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;



    if (!SpeechRecognition) {

      alert(t("speechNotSupported"));

      return;

    }



    const recognition =
      new SpeechRecognition();



    recognition.lang = "en-US";

    recognition.interimResults = false;



    recognition.start();


    setListening(true);



    recognition.onresult = (event) => {


      setPrompt(
        event.results[0][0].transcript
      );


    };



    recognition.onend = () => {


      setListening(false);


    };


  };




  // =================================
  // SEND
  // =================================


  const handleSend = () => {


    const text = prompt.trim();



    if (!text) {

      return;

    }



    sessionStorage.setItem(
      "blueprintPrompt",
      text
    );



    navigate("/DualWorkspace");


  };





  // =================================
  // CHANGE THEME
  // =================================


  const handleThemeChange = (value) => {
    setShowThemeMenu(false);

    const normalized = value.toLowerCase();

    if (normalized === "system") {
      setThemeMode("system");
    } else if (normalized === "dark") {
      setThemeMode("dark");
    } else {
      setThemeMode("light");
    }
  };






  return (

    <div className="home-page">



      {/* TOP CREDIT */}

      <div className="home-top-credit">

        {t("homeFreePlan")} ·


        <a href="#">

          {t("workspaceUpgrade")}

        </a>


      </div>






      {/* TEAM */}

      <div
        className="home-team-orbs"
        aria-label={t("homeTeamAriaLabel")}
      >


        {avatars.map((avatar,index)=>(


          <div

            key={index}

            className="home-avatar-wrapper"


            onMouseEnter={() =>
              setHoveredAgent(index)
            }


            onMouseLeave={() =>
              setHoveredAgent(null)
            }


          >



            {hoveredAgent === index && (

              <div className="home-agent-tooltip">

                {t(agents[index])}

              </div>

            )}




            <i

              className="home-team-avatar"


              style={{

                backgroundImage:
                `url(${avatar})`

              }}

            />



          </div>


        ))}


      </div>






      {/* TITLE */}


      <h1 className="home-title">

        {t("homeTitle")}

      </h1>







      {/* PROMPT */}


      <div className="home-prompt">



        <input

          type="text"

          value={prompt}


          onChange={(event)=>
            setPrompt(event.target.value)
          }


          onKeyDown={(event)=>{

            if(event.key==="Enter"){

              handleSend();

            }

          }}


          placeholder={
            t("homePromptPlaceholder")
          }

        />







        <footer>




          {/* PLUS */}


          <div className="home-prompt-action">


            <button

              type="button"


              onClick={()=>{

                setShowPlusMenu(!showPlusMenu);

                setShowThemeMenu(false);

              }}

            >

              <FiPlus />

            </button>





            {showPlusMenu && (

              <div className="home-plus-menu">


                <button>

                  {t("homeUploadFile")}

                </button>



                <button>

                  {t("homeAddImage")}

                </button>



                <button>

                  {t("homeConnectTools")}

                </button>



              </div>

            )}



          </div>








          {/* THEME */}



          <div className="home-prompt-action">


            <button

              type="button"


              onClick={()=>{

                setShowThemeMenu(!showThemeMenu);

                setShowPlusMenu(false);

              }}

            >


              {theme==="Light"
              ? t("homeLight")
              : theme==="Dark"
              ? t("homeDark")
              : t("homeSystem")}



              <FiChevronDown />



            </button>





            {showThemeMenu && (


              <div className="home-theme-menu">



                <button
                  onClick={()=>
                    handleThemeChange("System")
                  }
                >

                  {t("homeSystem")}

                </button>




                <button
                  onClick={()=>
                    handleThemeChange("Light")
                  }
                >

                  {t("homeLight")}

                </button>





                <button
                  onClick={()=>
                    handleThemeChange("Dark")
                  }
                >

                  {t("homeDark")}

                </button>



              </div>



            )}



          </div>







          <span className="home-prompt-spacer"/>







          {/* BUILD */}



          <button
            type="button"
            className="home-build-button"
          >


            {t("homeBuild")}


            <FiChevronDown />


          </button>








          {/* MIC */}



          <button

            type="button"


            onClick={startVoice}


            className={
              listening
              ? "home-recording"
              : ""
            }


          >


            <FiMic />


          </button>








          {/* SEND */}



          <button

            type="button"


            className="home-go-button"


            onClick={handleSend}


          >


            ↑


          </button>





        </footer>







        {/* TOOLS NOTICE */}



        <aside className="home-tools-notice">


          <FiZap />



          <span>

            {t("homeConnectToolsNotice")}

          </span>




          <div className="home-tool-dots">

            ● ● ● ●

          </div>




          <button>

            <FiX />

          </button>



        </aside>





      </div>





    </div>


  );


}


export default Home;