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
     const response = await api.post("/auth/login", {
  email,
  password,
});

const data = response.data;

console.log("LOGIN RESPONSE:", data);

if (data.success && data.data) {
  // Save access token
  localStorage.setItem("token", data.data.accessToken);

  // Save refresh token
  localStorage.setItem("refreshToken", data.data.refreshToken);

  // Save user information
  localStorage.setItem("user", JSON.stringify(data.data.user));
}

      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      setSuccess(t("loginSuccess"));
      setTimeout(() => {
        navigate("/work");
      }, 1500);
    } catch (err) {
      const message = err.response?.data?.message;

      if (
        message === "Invalid email or password" ||
        message === "Invalid credentials"
      ) {
        setError(t("invalidCredentials"));
      } else {
        setError(message || t("invalidCredentials"));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-page-container">
        <div className="login-page-card">
          <div className="login-page-logo">L</div>

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

          <h1 className="login-page-title">{t("loginWelcome")}</h1>

          <p className="login-page-subtitle">{t("loginSubtitle")}</p>

          {error && <div className="login-page-error-message">{error}</div>}

          {success && (
            <div className="login-page-success-message">{success}</div>
          )}

          <form className="login-page-form" onSubmit={handleSubmit}>
            <div className="login-page-input-group">
              <label htmlFor="email">{t("emailLabel")}</label>

              <div className="login-page-input-box">
                <i className="fa-solid fa-user"></i>
                <input
                  type="email"
                  id="email"
                  placeholder={t("emailPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="login-page-input-group">
              <label htmlFor="password">{t("passwordLabel")}</label>

              <div className="login-page-input-box">
                <i className="fa-solid fa-lock"></i>

                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder={t("passwordPlaceholder")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button
                  type="button"
                  className="login-page-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i
                    className={
                      showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"
                    }
                  ></i>
                </button>
              </div>
            </div>
            <div className="login-page-options">
              <label className="login-page-remember">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />

                {t("rememberMe")}
              </label>

              <Link to="/ForgotPassword">{t("forgotPassword")}</Link>
            </div>

            <button type="submit" className="login-page-btn" disabled={loading}>
              {loading ? t("loading") : t("loginSubmit")}
            </button>
          </form>

          <p className="login-page-bottom-text">
            {t("accountPrompt")}

            <Link to="/Register">{t("registerLink")}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
