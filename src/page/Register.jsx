import "../css/Register.css";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";

function Register() {
  const navigate = useNavigate();

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
      alert("Password must contain at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

try {

  const response = await api.post("/api/auth/register", {
    full_name: fullName,
    email: email,
    password: password,
  });

  console.log(response.data);

  alert("Registration successful!");

  navigate("/login");

} catch (err) {

  alert(
    err.response?.data?.message ||
    "Registration failed."
  );

}  };

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

        <h2>Create your account</h2>

        <p className="subtitle">
          Start turning ideas into blueprints
        </p>

        <form onSubmit={handleSubmit}>
                    <label>Full name</label>

        <input
  type="text"
  placeholder="Enter your name"
  value={fullName}
  onChange={(e) => setFullName(e.target.value)}
/>
          <label>Email</label>

         <input
  type="email"
  placeholder="user-name@example.com"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

          <label>Password</label>

          <div className="password-box">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
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
            {password.length >= 8
              ? "✔ Password length is valid"
              : "✖ Password must contain at least 8 characters"}
          </p>

          <label>Confirm password</label>

          <div className="password-box">

            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <span
              className="show-password"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
            >
              {showConfirmPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </span>

          </div>

          <div className="check">

            <input type="checkbox" required />

            <span>
              I agree to the Terms of Service and Privacy Policy
            </span>

          </div>

          <button type="submit">
            Create account
          </button>

        </form>
                <p className="bottom">

          Already have an account?

          <Link to="/login">
            {" "}Sign in
          </Link>

        </p>

      </div>

    </div>

  );

}

export default Register;