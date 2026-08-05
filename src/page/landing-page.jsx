import "../css/landing-page.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "../i18n";

function Landpage({ dark, setDark }) {
  const navigate = useNavigate();
  const { t, language, setLanguage } = useTranslation();

  const steps = [
    {
      number: "1",
      title: t("step1Title"),
      text: t("step1Text"),
    },
    {
      number: "2",
      title: t("step2Title"),
      text: t("step2Text"),
    },
    {
      number: "3",
      title: t("step3Title"),
      text: t("step3Text"),
    }
  ];

  const blueprintCards = [
    {
      icon: "▣",
      title: t("requirementsTitle"),
      text: t("requirementsText")
    },
    {
      icon: "⌘",
      title: t("architectureTitle"),
      text: t("architectureText")
    },
    {
      icon: "◉",
      title: t("databaseTitle"),
      text: t("databaseText")
    },
    {
      icon: "⚡",
      title: t("apiTitle"),
      text: t("apiText")
    },
    {
      icon: "▤",
      title: t("uxTitle"),
      text: t("uxText")
    },
    {
      icon: "🔒",
      title: t("securityTitle"),
      text: t("securityText")
    },
    {
      icon: "✓",
      title: t("testingTitle"),
      text: t("testingText")
    },
    {
      icon: "◌",
      title: t("devopsTitle"),
      text: t("devopsText")
    }
  ];

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  return (

    <div className="home">

      {/* ================= NAVBAR ================= */}

      <header className="navbar">

        <div className="logo">
          <div className="logo-icon">L</div>
          <span>Luma Architect</span>
        </div>

        <nav className="nav-links">
          <a href="#hero">{t("product")}</a>
          <a href="#council">{t("council")}</a>
          <a href="#how">{t("how")}</a>
          <a href="#output">{t("output")}</a>
          <a href="#pricing">{t("pricing")}</a>
        </nav>

        <div className="nav-right">

          <button
            className="theme-btn"
            onClick={() => setDark(!dark)}
          >

            {dark ? (

              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
              </svg>

            ) : (

              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3A7 7 0 0 0 21 12.79Z" />
              </svg>

            )}

          </button>

          <button className="lang-btn" onClick={toggleLanguage}>
            {t("languageToggle")}
          </button>

          <button
            className="login"
            onClick={() => navigate("/Overview")}
          >
            {t("loginButton")}
          </button>

          <button
            className="signup"
            onClick={() => navigate("/work")}
          >
            {t("signupButton")}
          </button>

        </div>

      </header>
            {/* ================= HERO ================= */}

      <section id="hero" className="hero">

        <div className="badge">
          ● {t("heroBadge")}
        </div>

        <h1>
          {t("heroTitle1")}
          <br />
          {t("heroTitle2")}
        </h1>

        <p>{t("heroSubtitle")}</p>

        <div className="hero-buttons">

          <button
            className="primary-btn"
            onClick={() =>
              document
                .getElementById("team")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            {t("heroPrimary")}
          </button>

          <button
            className="secondary-btn"
            onClick={() =>
              document
                .getElementById("council")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            {t("heroSecondary")}
          </button>

        </div>

      </section>

      {/* ================= ENGINEERING COUNCIL ================= */}

      <section id="council" className="council">

        <div className="council-header">

          <div className="room-title">

            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>

            <p>{t("councilTitle")}</p>

          </div>

          <div className="progress">
            ● {t("councilProgress")}
          </div>

        </div>

        <div className="agents">

          <div className="agent-card">

            <div className="avatar">TU</div>

              <div className="info">
                <h3>Turing</h3>
                <p>{t("agentAnalysingScope")}</p>
              </div>

            <span className="status success"></span>

          </div>

          <div className="agent-card active">

            <div className="avatar">LO</div>

              <div className="info">
                <h3>Lovelace</h3>
                <p>{t("agentDraftingFR")}</p>
              </div>

            <span className="status working"></span>

          </div>

          <div className="agent-card">

            <div className="avatar">BR</div>

              <div className="info">
                <h3>Brooks</h3>
                <p>{t("agentLayeredArchitecture")}</p>
              </div>

            <span className="status success"></span>

          </div>

          <div className="agent-card active">

            <div className="avatar">CO</div>

            <div className="info">
              <h3>Codd</h3>
              <p>ERD + schema</p>
            </div>

            <span className="status working"></span>

          </div>

          <div className="agent-card">

            <div className="avatar">FI</div>

            <div className="info">
              <h3>Fielding</h3>
              <p>REST endpoints</p>
            </div>

            <span className="status waiting"></span>

          </div>

          <div className="agent-card">

            <div className="avatar">NO</div>

            <div className="info">
              <h3>Norman</h3>
              <p>Wireframes</p>
            </div>

            <span className="status waiting"></span>

          </div>

        </div>

      </section>
            {/* ================= MEET THE AI ENGINEERING COUNCIL ================= */}

      <section id="team" className="team">

        <h2 className="team-title">
          {t("teamTitle")}
        </h2>

        <p className="team-subtitle">
          {t("teamSubtitle")}
        </p>

        <div className="team-grid">

          {/* Turing */}
          <div className="member">
            <div className="member-header">
              <div className="member-avatar">TU</div>
              <div className="member-info">
                <h3>Turing</h3>
                <span>Project Director</span>
              </div>
            </div>
            <p>
              {t("descProjectDirector")}
            </p>
          </div>

          {/* Grove */}
          <div className="member">
            <div className="member-header">
              <div className="member-avatar">GR</div>
              <div className="member-info">
                <h3>Grove</h3>
                <span>Business Analyst</span>
              </div>
            </div>
            <p>
              {t("descBusinessAnalyst")}
            </p>
          </div>

          {/* Lovelace */}
          <div className="member">
            <div className="member-header">
              <div className="member-avatar">LO</div>
              <div className="member-info">
                <h3>Lovelace</h3>
                <span>Requirements Analyst</span>
              </div>
            </div>
            <p>
              {t("descRequirementsAnalyst")}
            </p>
          </div>

          {/* Brooks */}
          <div className="member">
            <div className="member-header">
              <div className="member-avatar">BR</div>
              <div className="member-info">
                <h3>Brooks</h3>
                <span>System Architect</span>
              </div>
            </div>
            <p>
              {t("descSystemArchitect")}
            </p>
          </div>

          {/* Codd */}
          <div className="member">
            <div className="member-header">
              <div className="member-avatar">CO</div>
              <div className="member-info">
                <h3>Codd</h3>
                <span>Database Engineer</span>
              </div>
            </div>
            <p>
              {t("descDatabaseEngineer")}
            </p>
          </div>

          {/* Fielding */}
          <div className="member">
            <div className="member-header">
              <div className="member-avatar">FI</div>
              <div className="member-info">
                <h3>Fielding</h3>
                <span>API Engineer</span>
              </div>
            </div>
            <p>
              {t("descApiEngineer")}
            </p>
          </div>

          {/* Norman */}
          <div className="member">
            <div className="member-header">
              <div className="member-avatar">NO</div>
              <div className="member-info">
                <h3>Norman</h3>
                <span>UI/UX Designer</span>
              </div>
            </div>
            <p>
              {t("descUiUxDesigner")}
            </p>
          </div>

          {/* Diffie */}
          <div className="member">
            <div className="member-header">
              <div className="member-avatar">DI</div>
              <div className="member-info">
                <h3>Diffie</h3>
                <span>Security Engineer</span>
              </div>
            </div>
            <p>
              {t("descSecurityEngineer")}
            </p>
          </div>

          {/* Hopper */}
          <div className="member">
            <div className="member-header">
              <div className="member-avatar">HO</div>
              <div className="member-info">
                <h3>Hopper</h3>
                <span>QA Engineer</span>
              </div>
            </div>
            <p>
              {t("descQaEngineer")}
            </p>
          </div>

          {/* Torvalds */}
          <div className="member member-last">
            <div className="member-header">
              <div className="member-avatar">TO</div>
              <div className="member-info">
                <h3>Torvalds</h3>
                <span>DevOps Engineer</span>
              </div>
            </div>
            <p>
              {t("descDevOpsEngineer")}
            </p>
          </div>

          {/* Knuth */}
          <div className="member member-last">
            <div className="member-header">
              <div className="member-avatar">KN</div>
              <div className="member-info">
                <h3>Knuth</h3>
                <span>Documentation Agent</span>
              </div>
            </div>
            <p>
              {t("descDocumentationAgent")}
            </p>
          </div>

        </div>

      </section>
            <section id="how" className="how-section">

        <div className="container">

         <h2 className="section-title">
  {t("how")}
</h2>

          <div className="steps-container">

            {steps.map((step, index) => (

              <div className="step-card" key={index}>

                <div className="number">
                  {step.number}
                </div>

                <h3>
                  {step.title}
                </h3>

                <p>
                  {step.text}
                </p>

              </div>

            ))}

          </div>

          {/* Blueprint */}

          <div id="output" className="blueprint">

            <h2>
              {t("outputHeading")}
            </h2>

            <p className="subtitle">
              {t("outputSubtitle")}
            </p>

            <div className="cards-grid">

              {blueprintCards.map((card, index) => (

                <div className="blue-card" key={index}>

                  <span className="card-icon">
                    {card.icon}
                  </span>

                  <h4>
                    {card.title}
                  </h4>

                  <p>
                    {card.text}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </div>
              </section>
              {/* ================= CTA ================= */}

      <div id="pricing" className="cta">

        <h2>
          {t("ctaTitle")}
        </h2>

        <p>
          {t("ctaText")}
        </p>

        <button
          onClick={() => navigate("/work")}
        >
          {t("ctaButton")}
        </button>

      </div>

      {/* ================= FOOTER ================= */}

      <footer className="footer">

        <div className="footer-container">

          {/* Left */}

          <div className="footer-left">

            <div className="footer-brand">

              <div className="logo-box">
                L
              </div>

              <div>

                <h3>
                  Luma Architect
                </h3>

                <p>
                    {t("footerBrandText")}
                </p>

              </div>

            </div>

            <small>
                {t("footerCopyright")}
            </small>

          </div>

          {/* Right */}

          <div className="footer-links">

            <div>

              <h4>
                Product
              </h4>

              <a href="#council">The Council</a>
              <a href="#how">How it works</a>
              <a href="#output">Sample output</a>
              <a href="#pricing">Pricing</a>

            </div>

            <div>

              <h4>
                Account
              </h4>

              <a onClick={() => navigate("/login")}>Log in</a>
              <a onClick={() => navigate("/Register")}>Create account</a>
              <a>Preferences</a>

            </div>

            <div>

              <h4>
                Legal
              </h4>

              <a>Privacy</a>
              <a>Terms</a>
              <a>Contact</a>

            </div>

          </div>

        </div>

      </footer>

    </div>

  );
}

export default Landpage;