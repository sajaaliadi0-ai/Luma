import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "../i18n";

import "../css/ForgotPassword.css";

function ForgotPassword() {
  const { t } = useTranslation();

  const navigate = useNavigate();

  // ==========================
  // States
  // ==========================

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  // Animation Stages

  const [animationStage, setAnimationStage] = useState("open");

  // ==========================
  // Validation
  // ==========================

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // ==========================
  // Submit
  // ==========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    setSuccess("");

    if (email.trim() === "") {
      setError(t("enterEmail"));

      return;
    }

    if (!validateEmail(email)) {
      setError(t("enterValidEmail"));

      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://dummyjson.com/users");

      const data = await response.json();

      const user = data.users.find(
        (user) => user.email.toLowerCase() === email.toLowerCase()
      );

      if (user) {
        setSuccess(t("sendingVerificationEmail"));

        // Close Envelope

        setAnimationStage("close");

        setTimeout(() => {
          // Transform into paper plane

          setAnimationStage("fly");
        }, 900);

        setTimeout(() => {
          navigate("/VerifyEmail");
        }, 1200);
      } else {
        setError(t("emailNotFound"));
      }
    } catch (error) {
      console.log(error);

      setError(t("serverErrorTryLater"));
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="forgotpassword-page-wrapper">
      <div className="forgotpassword-page-sheet">
        {/* Envelope */}

        <div className={`forgotpassword-page-envelope ${animationStage}`}>
          {/* PAPER PLANE */}

          <div className="forgotpassword-page-paper-plane">
            <i className="fa-solid fa-paper-plane"></i>
          </div>

          {/* LETTER */}

          <div className="forgotpassword-page-letter">
            <i className="fa-solid fa-at"></i>
          </div>

          {/* ENVELOPE */}

          <div className="forgotpassword-page-envelope-back"></div>

          <div className="forgotpassword-page-envelope-left"></div>

          <div className="forgotpassword-page-envelope-right"></div>

          <div className="forgotpassword-page-envelope-bottom"></div>

          <div className="forgotpassword-page-envelope-flap"></div>
        </div>

        {/* Title */}

        <h1 className="forgotpassword-page-title">
          {t("forgotPasswordTitle")}
        </h1>

        {/* Subtitle */}

        <p className="forgotpassword-page-subtitle">
          {t("forgotPasswordSubtitle")}
        </p>

        {/* Form */}

        <form onSubmit={handleSubmit}>
          <div className="forgotpassword-page-input-group">
            <label htmlFor="email">{t("emailAddressLabel")}</label>

            <div className="forgotpassword-page-input-box">
              <i className="fa-solid fa-envelope"></i>

              <input
                className="forgotpassword-page-input"

                type="email"

                id="email"

                placeholder={t("enterEmailPlaceholder")}

                value={email}

                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          {error && (
            <p className="forgotpassword-page-error-message">{error}</p>
          )}

          {success && (
            <p className="forgotpassword-page-success-message">{success}</p>
          )}

          <button
            type="submit"

            className="forgotpassword-page-btn"

            disabled={loading}
          >
            {loading ? (
              <span className="forgotpassword-page-spinner"></span>
            ) : (
              t("sendResetLink")
            )}
          </button>
        </form>

        <p className="forgotpassword-page-bottom-text">
          {t("rememberPassword")}

          <Link to="/login">{t("backToLogin")}</Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
