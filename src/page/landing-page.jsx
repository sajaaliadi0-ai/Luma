import "../css/landing-page.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const steps = [
  {
    number: "1",
    title: "Describe the idea",
    text: "Write your idea in plain language, pick a project type, complexity, and output language.",
  },
  {
    number: "2",
    title: "The Council engineers it",
    text: "Eleven agents run a structured pipeline in real time, debate, and resolve conflicts.",
  },
  {
    number: "3",
    title: "Download the Blueprint",
    text: "Read, refine, and export a complete engineering document as PDF or Markdown.",
  }
];


const blueprintCards = [
  {
    icon: "▣",
    title: "Requirements",
    text: "Numbered FR & NFR with acceptance criteria and use cases."
  },
  {
    icon: "⌘",
    title: "Architecture",
    text: "Layered system architecture with clear module boundaries."
  },
  {
    icon: "◉",
    title: "Database",
    text: "Entities, ERD and a normalized SQL schema with indexes."
  },
  {
    icon: "⚡",
    title: "API",
    text: "REST endpoints with authentication, pagination, and error semantics."
  },
  {
    icon: "▤",
    title: "UX/UI",
    text: "User flows, wireframes and a full design system."
  },
  {
    icon: "🔒",
    title: "Security",
    text: "Threat model, controls, and a security analysis"
  },
  {
    icon: "✓",
    title: "Testing",
    text: "A test plan with concrete, traceable test cases."
  },
  {
    icon: "◌",
    title: "DevOps",
    text: "CI/CD pipeline and a deployment strategy."
  }
];
function Landpage() {

  

    const [darkMode, setDarkMode] = useState(false);
    
const navigate = useNavigate();
useEffect(() => {
  document.documentElement.setAttribute(
    "data-theme",
    darkMode ? "dark" : "light"
  );
}, [darkMode]); 
  return (
    
    <div className="home">

      {/* ================= NAVBAR ================= */}

      <header className="navbar">

  <div className="logo">
  <div className="logo-icon">L</div>
  <span>Luma Architect</span>
</div>

<nav className="nav-links">
  <a href="#hero">Product</a>
  <a href="#council">The Council</a>
  <a href="#how">How it works</a>
  <a href="#output">Output</a>
  <a href="#pricing">Pricing</a>
</nav>
  <div className="nav-right">

   <button
  className="theme-btn"
  onClick={() => setDarkMode(!darkMode)}
>
  {darkMode ? (
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
      <path d="M21 12.79A9 9 0 1 1 11.21 3
      A7 7 0 0 0 21 12.79Z" />
    </svg>
  )}
</button>

    <button 
  className="login"
  onClick={() => navigate("/login")}
>
  Log in
</button>

     <button 
    className="signup"
    onClick={() => navigate("/work")}
  >
    Start a Blueprint
  </button>

  </div>

</header>


<section id="hero" className="hero">
  <div className="badge">
    ● A virtual software engineering company — not a chatbot
  </div>

  <h1>
    From raw idea to complete
    <br />
    software blueprint
  </h1>

  <p>
    Describe your idea in a sentence. A council of eleven
    specialized AI agents turns it into requirements,
    architecture, database, API, UI/UX, security, tests and a
    deployment plan — exportable as PDF or Markdown.
  </p>

  <div className="hero-buttons">

  <button
    className="primary-btn"
    onClick={() =>
      document
        .getElementById("team")
        .scrollIntoView({ behavior: "smooth" })
    }
  >
    Start a Blueprint →
  </button>

  <button
    className="secondary-btn"
    onClick={() =>
      document
        .getElementById("council")
        .scrollIntoView({ behavior: "smooth" })
    }
  >
    See how the Council works
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

      <p>Engineering Council Room</p>

    </div>

    <div className="progress">
      ● 7 / 11 agents complete
    </div>

  </div>

  <div className="agents">

    <div className="agent-card">

      <div className="avatar">TU</div>

      <div className="info">
        <h3>Turing</h3>
        <p>Analysing scope</p>
      </div>

      <span className="status success"></span>

    </div>

    <div className="agent-card active">

      <div className="avatar">LO</div>

      <div className="info">
        <h3>Lovelace</h3>
        <p>Drafting FR-001...</p>
      </div>

      <span className="status working"></span>

    </div>

    <div className="agent-card">

      <div className="avatar">BR</div>

      <div className="info">
        <h3>Brooks</h3>
        <p>Layered architecture</p>
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
    Meet the AI Engineering Council
  </h2>

  <p className="team-subtitle">
    Eleven specialists named after pioneers of computing. Each owns one
    discipline, works in order, and reviews the others.
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
        Analyses the idea, plans the pipeline,
        resolves conflicts and approves.
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
        Stakeholders, value proposition
        and business rules.
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
        Functional and non-functional
        requirements and use cases.
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
        Layered architecture and clear
        module boundaries.
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
        Entities, ERD and normalized
        SQL schema.
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
        REST endpoints, authentication
        and error semantics.
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
        User flows, wireframes and the design system.
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
        Threat model and concrete security controls.
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
        Test plan with concrete, traceable test cases.
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
        CI/CD pipeline and deployment strategy.
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
        Compiles everything into the final blueprint.
      </p>
    </div>

  </div>

</section>

<section id="how" className="how-section">

      {/* How it works */}
      <div className="container">

        <h2 className="section-title">
          How it works
        </h2>


        <div className="steps-container">

          {steps.map((step,index)=>(
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
            One idea in. A complete blueprint out.
          </h2>

          <p className="subtitle">
Every blueprint is an SRS/SDD-grade document covering the full analysis and          </p>



          <div className="cards-grid">

            {
              blueprintCards.map((card,index)=>(

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

              ))
            }

          </div>


        </div>


      </div>

{/* CTA */}

<div id="pricing" className="cta">

  <h2>
    Turn your idea into an engineered system
  </h2>

  <p>
    Free while in beta · English & Arabic output · Export as PDF or Markdown
  </p>

  <button
    onClick={() => navigate("/work")}
  >
    Start a Blueprint →
  </button>

</div>


{/* Footer */}

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
            From raw idea to complete software blueprint.
          </p>

        </div>

      </div>


      <small>
        © 2026 Luma Architect · Graduation Project
      </small>

    </div>



    {/* Right */}

    <div className="footer-links">


      <div>
        <h4>
          Product
        </h4>

        <a>The Council</a>
        <a>How it works</a>
        <a>Sample output</a>
        <a>Pricing</a>

      </div>



      <div>

        <h4>
          Account
        </h4>

        <a>Log in</a>
        <a>Create account</a>
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

     
    </section>
    </div>
  );
}

export default Landpage;


