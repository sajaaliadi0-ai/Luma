
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/api";
import { useTranslation } from "../i18n";

import "../css/login.css";

function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [email, setEmail] = useState(() => {
    return localStorage.getItem("rememberedEmail") || "";
  });

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [rememberMe, setRememberMe] = useState(() => {
    return localStorage.getItem("rememberedEmail") !== null;
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (email.trim() === "") {
      setError(t("enterEmail"));
      return;
    }

    if (password.trim() === "") {
      setError(t("enterPassword"));
      return;
    }

    if (password.length < 6) {
      setError(t("passwordMin6"));
      return;
    }

    try {
      setLoading(true);

      // =====================================================
      // LOGIN
      // =====================================================

      const response = await api.post("/auth/login", {
        email: email.trim(),
        password,
      });

      // =====================================================
      // LOGIN RESPONSE
      // =====================================================

      const data = response.data;

      console.log("LOGIN RESPONSE DATA:", data);

      // =====================================================
      // GET USER DATA
      // =====================================================

      const userData = data.data?.user;

      const accessToken =
        data.data?.accessToken;

      const refreshToken =
        data.data?.refreshToken;

      console.log("USER DATA:", userData);
      console.log("USER ROLE:", userData?.role);

      // =====================================================
      // CHECK ACCESS TOKEN
      // =====================================================

      if (!accessToken) {
        console.error(
          "LOGIN ERROR: Access token was not returned",
          data
        );

        setError(
          data.message || "Login failed: No access token"
        );

        return;
      }

      // =====================================================
      // SAVE ACCESS TOKEN
      // =====================================================

      const cleanAccessToken = accessToken
        .replace(/^Bearer\s+/i, "")
        .trim();

      localStorage.setItem(
        "token",
        cleanAccessToken
      );

      // =====================================================
      // SAVE REFRESH TOKEN
      // =====================================================

      if (refreshToken) {
        localStorage.setItem(
          "refreshToken",
          refreshToken
        );
      }

      // =====================================================
      // SAVE USER
      // =====================================================

      if (userData) {
        localStorage.setItem(
          "user",
          JSON.stringify(userData)
        );
      }

      // =====================================================
      // SAVE USER ROLE
      // =====================================================

      if (userData?.role) {
        localStorage.setItem(
          "role",
          userData.role
        );

        console.log(
          "ROLE SAVED:",
          userData.role
        );
      } else {
        localStorage.removeItem("role");

        console.warn(
          "LOGIN WARNING: User role was not returned"
        );
      }

      // =====================================================
      // REMEMBER EMAIL
      // =====================================================

      if (rememberMe) {
        localStorage.setItem(
          "rememberedEmail",
          email.trim()
        );
      } else {
        localStorage.removeItem(
          "rememberedEmail"
        );
      }

      // =====================================================
      // LOGIN SUCCESS
      // =====================================================

      setSuccess(t("loginSuccess"));

      console.log(
        "LOGIN SUCCESS - TOKEN SAVED"
      );

      console.log(
        "TOKEN EXISTS:",
        !!localStorage.getItem("token")
      );

      console.log(
        "ROLE:",
        localStorage.getItem("role")
      );

      // =====================================================
      // NAVIGATE
      // =====================================================

      setTimeout(() => {
        navigate("/work");
      }, 1500);

    } catch (err) {
      console.log(
        "STATUS:",
        err.response?.status
      );

      console.log(
        "ERROR DATA:",
        err.response?.data
      );

      console.log(
        "ERROR:",
        err
      );

      const message =
        err.response?.data?.message;

      setError(
        message || "Login failed"
      );

    } finally {
      setLoading(false);
    }
  };

 return (
  <div className="login-page-wrapper">

    <div className="login-page-container">

      <div className="login-page-card">

        {/* =====================================================
            ROBOT
        ===================================================== */}

        <div className="login-page-avatar">

          <div
            className={`login-page-robot ${
              showPassword
                ? "login-page-robot-open"
                : "login-page-robot-close"
            }`}
          >

            <div className="login-page-robot-antenna"></div>

            <div className="login-page-robot-head">

              <div className="login-page-robot-eye login-page-robot-eye-left"></div>

              <div className="login-page-robot-eye login-page-robot-eye-right"></div>

              <div className="login-page-robot-mouth"></div>

              <div className="login-page-robot-hand login-page-robot-hand-left"></div>

              <div className="login-page-robot-hand login-page-robot-hand-right"></div>

            </div>

          </div>

        </div>


        {/* =====================================================
            TITLE
        ===================================================== */}

        <h1 className="login-page-title">
          {t("loginWelcome")}
        </h1>


        {/* =====================================================
            SUBTITLE
        ===================================================== */}

        <p className="login-page-subtitle">
          {t("loginSubtitle")}
        </p>


        {/* =====================================================
            ERROR
        ===================================================== */}

        {error && (
          <div className="login-page-error-message">
            {error}
          </div>
        )}


        {/* =====================================================
            SUCCESS
        ===================================================== */}

        {success && (
          <div className="login-page-success-message">
            {success}
          </div>
        )}


        {/* =====================================================
            FORM
        ===================================================== */}

        <form
          className="login-page-form"
          onSubmit={handleSubmit}
        >

          {/* EMAIL */}

          <div className="login-page-input-group">

            <label htmlFor="email">
              {t("emailLabel")}
            </label>

            <div className="login-page-input-box">

              <i className="fa-solid fa-user"></i>

              <input
                type="email"
                id="email"
                placeholder={t("emailPlaceholder")}
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />

            </div>

          </div>


          {/* PASSWORD */}

          <div className="login-page-input-group">

            <label htmlFor="password">
              {t("passwordLabel")}
            </label>

            <div className="login-page-input-box">

              <i className="fa-solid fa-lock"></i>

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                id="password"
                placeholder={t("passwordPlaceholder")}
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />

              <button
                type="button"
                className="login-page-password-toggle"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                <i
                  className={
                    showPassword
                      ? "fa-solid fa-eye-slash"
                      : "fa-solid fa-eye"
                  }
                ></i>
              </button>

            </div>

          </div>


          {/* OPTIONS */}

          <div className="login-page-options">

            <label className="login-page-remember">

              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) =>
                  setRememberMe(
                    e.target.checked
                  )
                }
              />

              {t("rememberMe")}

            </label>


            <Link to="/ForgotPassword">
              {t("forgotPassword")}
            </Link>

          </div>


          {/* LOGIN BUTTON */}

          <button
            type="submit"
            className="login-page-btn"
            disabled={loading}
          >
            {loading
              ? t("loading")
              : t("loginSubmit")}
          </button>

        </form>


        {/* =====================================================
            REGISTER
        ===================================================== */}

        <p className="login-page-bottom-text">

          {t("accountPrompt")}

          <Link to="/Register">
            {t("registerLink")}
          </Link>

        </p>

      </div>

    </div>

  </div>
);
}

export default Login;
