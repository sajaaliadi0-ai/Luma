import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import "../css/ForgotPassword.css";

function ForgotPassword() {

    const navigate = useNavigate();

    // ==========================
    // States
    // ==========================

    const [email, setEmail] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");

    // Animation Stages
    // open -> close -> fly

    const [animationStage, setAnimationStage] = useState("open");

    // ==========================
    // Dark Mode
    // ==========================

    useEffect(() => {

        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === "dark") {

            document.body.classList.add("dark");

        } else {

            document.body.classList.remove("dark");

        }

    }, []);

    const toggleTheme = () => {

        if (document.body.classList.contains("dark")) {

            document.body.classList.remove("dark");

            localStorage.setItem("theme", "light");

        } else {

            document.body.classList.add("dark");

            localStorage.setItem("theme", "dark");

        }

    };

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

            setError("Please enter your email");

            return;

        }

        if (!validateEmail(email)) {

            setError("Please enter a valid email");

            return;

        }

        setLoading(true);

        try {

            const response = await fetch(
                "https://dummyjson.com/users"
            );

            const data = await response.json();

            const user = data.users.find(

                (user) =>
                    user.email.toLowerCase() === email.toLowerCase()

            );

            if (user) {

                setSuccess("Sending verification email...");

                // Close Envelope

                setAnimationStage("close");

                setTimeout(() => {

                    // Transform into paper plane

                    setAnimationStage("fly");

                }, 900);

                setTimeout(() => {

                    navigate("/VerifyEmail");

                }, 1200);

            }

            else {

                setError("Email not found");

            }

        }

        catch (error) {

            console.log(error);

            setError("Server error. Try again later");

        }

        finally {

            setLoading(false);

        }

    };
    return (

    <div className="forgotpassword-page-wrapper">

        <div className="forgotpassword-page-sheet">
 {/* Theme Button */}

        <button
            type="button"
            className="forgotpassword-page-theme-toggle"
            onClick={toggleTheme}
        >
            <i className="fa-solid fa-moon"></i>
        </button>
            {/* Envelope */}
           <div
 className={`forgotpassword-page-envelope ${animationStage}`}
>

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

                Forgot Password?

            </h1>

            {/* Subtitle */}

            <p className="forgotpassword-page-subtitle">

                Enter your email address and we'll send you a link to reset your password.

            </p>

            {/* Form */}

            <form onSubmit={handleSubmit}>

                <div className="forgotpassword-page-input-group">

                    <label htmlFor="email">

                        Email Address

                    </label>

                    <div className="forgotpassword-page-input-box">

                        <i className="fa-solid fa-envelope"></i>

                        <input
                            className="forgotpassword-page-input"
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                    </div>

                </div>

                {error && (

                    <p className="forgotpassword-page-error-message">

                        {error}

                    </p>

                )}

                {success && (

                    <p className="forgotpassword-page-success-message">

                        {success}

                    </p>

                )}

                <button
                    type="submit"
                    className="forgotpassword-page-btn"
                    disabled={loading}
                >

                    {

                        loading ?

                        <span className="forgotpassword-page-spinner"></span>

                        :

                        "Send Reset Link"

                    }

                </button>

            </form>

            <p className="forgotpassword-page-bottom-text">

                Remember your password?

                <Link to="/login">

                    Back to Login

                </Link>

            </p>

        </div>

    </div>

);

}

export default ForgotPassword;