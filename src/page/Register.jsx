import "../css/Register.css";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import { useTranslation } from "../i18n";

function Register() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const getStrength = () => {
    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    return score;
  };

  const strength = getStrength();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      alert(t("passwordMustContain8"));
      return;
    }

    if (password !== confirmPassword) {
      alert(t("passwordsDoNotMatch"));
      return;
    }

    try {
      const response = await api.post("/auth/register", {
        full_name: fullName,
        email: email,
        password: password,
      });

      console.log(response.data);

      alert(t("registrationSuccessful"));

      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || t("registrationFailed"));
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <div className="logo">
          <div className="logo-icon">L</div>
        </div>

        <div className="register-page-avatar">
          <div
            className={`register-page-robot ${
              showPassword || showConfirmPassword
                ? "register-page-robot-open"
                : "register-page-robot-close"
            }`}
          >
            <div className="register-page-robot-antenna"></div>

            <div className="register-page-robot-head">
              <div className="register-page-robot-eye register-page-robot-eye-left"></div>

              <div className="register-page-robot-eye register-page-robot-eye-right"></div>

              <div className="register-page-robot-mouth"></div>

              <div className="register-page-robot-hand register-page-robot-hand-left"></div>

              <div className="register-page-robot-hand register-page-robot-hand-right"></div>
            </div>
          </div>
        </div>

        <h2>{t("createYourAccount")}</h2>

        <p className="subtitle">{t("startTurningIdeas")}</p>

        <form onSubmit={handleSubmit}>
          <label>{t("fullNameLabel")}</label>

          <input
            type="text"
            placeholder={t("enterYourName")}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <label>{t("emailAddressLabel")}</label>

          <input
            type="email"
            placeholder={t("userNamePlaceholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>{t("passwordLabel")}</label>

          <div className="password-box">
            <input
              type={showPassword ? "text" : "password"}
              placeholder={t("passwordPlaceholderRegister")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <span
              className="show-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="strength">
            <div className={strength >= 1 ? "active" : ""}></div>

            <div className={strength >= 2 ? "active" : ""}></div>

            <div className={strength >= 3 ? "active" : ""}></div>

            <div className={strength >= 4 ? "active" : ""}></div>
          </div>

          <p className={password.length >= 8 ? "valid" : "invalid"}>
            {password.length >= 8 ? t("passwordValid") : t("passwordTooShort")}
          </p>

          <label>{t("confirmPasswordLabel")}</label>

          <div className="password-box">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder={t("passwordPlaceholderRegister")}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <span
              className="show-password"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="check">
            <input type="checkbox" required />

            <span>{t("agreeTerms")}</span>
          </div>

          <button type="submit">{t("createAccountButton")}</button>
        </form>
        <p className="bottom">
          {t("alreadyHaveAccount")}

          <Link to="/login"> {t("signIn")}</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
