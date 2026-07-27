import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/api";

import "../css/login.css";

function Login() {

  const navigate = useNavigate();

 const [email, setEmail] = useState(() => {
  return localStorage.getItem("rememberedEmail") || "";
});

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [rememberMe, setRememberMe] = useState(() => {
return localStorage.getItem("rememberedEmail") !== null;  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    setSuccess("");

   if (email.trim() === "") {
    setError("Please enter your email.");
    return;
}

    if (password.trim() === "") {

      setError("Please enter your password.");

      return;

    }

    if (password.length < 6) {

      setError("Password must be at least 6 characters.");

      return;

    }

    try {

      setLoading(true);
const response = await api.post(
  "https://api.luma-agent.com/api/auth/login",
  {
    email,
    password,
  }
);

const data = response.data;
     if (data.token) {
  localStorage.setItem("token", data.token);
}
      localStorage.setItem(
        "user",
        JSON.stringify(data)
      );

      if (rememberMe) {

       localStorage.setItem(
  "rememberedEmail",
  email
);
      } else {

       localStorage.removeItem(
  "rememberedEmail"
        );

      }

      setSuccess("✅ Login Successful!");

      setTimeout(() => {

        navigate("/work");

      }, 1500);

    } catch (err) {

setError(
  err.response?.data?.message ||
  "Invalid email or password."
);
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

          <h1 className="login-page-title">
            Welcome
          </h1>

          <p className="login-page-subtitle">
            Sign in to your account
          </p>

          {error && (

            <div className="login-page-error-message">

              {error}

            </div>

          )}

          {success && (

            <div className="login-page-success-message">

              {success}

            </div>

          )}

          <form
            className="login-page-form"
            onSubmit={handleSubmit}
          >

            <div className="login-page-input-group">

<label htmlFor="email">         Email              </label>


              <div className="login-page-input-box">

                <i className="fa-solid fa-user"></i>
 <input
    type="email"
    id="email"
    placeholder="Enter your email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
/>




              </div>

            </div>

            <div className="login-page-input-group">

              <label htmlFor="password">
                Password
              </label>

              <div className="login-page-input-box">

                <i className="fa-solid fa-lock"></i>

                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
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
                      showPassword
                        ? "fa-solid fa-eye-slash"
                        : "fa-solid fa-eye"
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

                Remember Me

              </label>

              <Link to="/ForgotPassword">
                Forgot Password?
              </Link>

            </div>

            <button
              type="submit"
              className="login-page-btn"
              disabled={loading}
            >

              {loading
                ? "Loading..."
                : "Login"}

            </button>

          </form>

          <p className="login-page-bottom-text">

            Don't have an account?

            <Link to="/Register">
              Register
            </Link>

          </p>

        </div>

      </div>

    </div>

  );

}

export default Login;