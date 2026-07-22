import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import "../css/VerifyEmail.css";


function VerifyEmail() {
    const navigate = useNavigate();
    const [otp, setOtp] = useState(
        ["","","","","",""]
    );
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [timer, setTimer] = useState(30);
const inputRefs = useRef([]);


    // ==========================
    // Dark Mode
    // ==========================
    useEffect(()=>{
        const savedTheme =
        localStorage.getItem("theme");
        if(savedTheme === "dark"){
            document.body.classList.add("dark");
        }
    },[]);

    const toggleTheme = ()=>{

        const body = document.body;

        if(body.classList.contains("dark")){

            body.classList.remove("dark");

            localStorage.setItem(
                "theme",
                "light"
            );
        }
        else{

            body.classList.add("dark");

            localStorage.setItem(
                "theme",
                "dark"
            );
        }
    };

    // ==========================
    // OTP
    // ==========================
const handleChange = (value,index)=>{

    if(!/^[0-9]?$/.test(value))
        return;

    const newOtp=[...otp];

    newOtp[index]=value;

    setOtp(newOtp);

    // move to next box

    if(value && index < otp.length - 1){

        inputRefs.current[index + 1].focus();

    }};

    // ==========================
    // VERIFY
    // ==========================

    const handleVerify = ()=>{

        setError("");

        setSuccess("");

        const code = otp.join("");

        if(code.length !== 6){

            setError(
                "Please enter the 6 digit code"
            );

            return;
        }

        setLoading(true);

        setTimeout(()=>{

            setLoading(false);

            setSuccess(
                "Email verified successfully"
            );

            setTimeout(()=>{

                navigate("/ResetPassword");

            },1500);

        },1500);};

    // ==========================
    // TIMER
    // ==========================

    useEffect(()=>{

        if(timer===0)
            return;

        const interval=setInterval(()=>{

            setTimer(prev=>prev-1);

        },1000);

        return ()=>clearInterval(interval);

    },[timer]);

    const resendCode = ()=>{

        if(timer!==0)
            return;

        setTimer(30);

        setSuccess(
            "New code sent"
        );};

    return (

        <div className="verify-page-wrapper">

            <div className="verify-page-container">

{/* Theme Button */}
            <button

                type="button"
                className="verify-page-theme-toggle"

                onClick={toggleTheme}
            >

                <i className="fa-solid fa-moon"></i>

            </button>

                <div className="verify-page-card">

                    {/* MAIL ANIMATION */}

                    <div className="verify-page-mail-animation">

                        <div className="verify-page-plane">

                            <i className="fa-solid fa-paper-plane"></i>

                        </div>
                        <div className="verify-page-envelope">

                            <div className="verify-page-envelope-back"></div>

                            <div className="verify-page-envelope-left"></div>

                            <div className="verify-page-envelope-right"></div>

                            <div className="verify-page-envelope-bottom"></div>

                            <div className="verify-page-envelope-flap"></div>

                            <div className="verify-page-check">

                                <i className="fa-solid fa-circle-check"></i>

                            </div>
                        </div>
                    </div>
                    <h1 className="verify-page-title">
                        Verify Your Email
                    </h1>

                    <p className="verify-page-subtitle">
                        We sent a verification code to your email.
                        Please enter the code below.
                    </p>

                    <div className="verify-page-otp-container">
                        {
                            otp.map((digit,index)=>(
                               <input
key={index}

ref={(el)=>
    inputRefs.current[index]=el
}

type="text"

maxLength="1"

value={digit}


onChange={(e)=>

    handleChange(
        e.target.value,
        index
    )}/>
 ))

 }


                    </div>

                    {
                        error &&
                        <p className="verify-page-error-message">
                            {error}
                        </p>
                    }
                    {
                        success &&
                        <p className="verify-page-success-message">
                            {success}
                        </p>
                    }
                    <button
                        type="button"

                        className="verify-page-btn"

                        onClick={handleVerify}

                        disabled={loading}>
                        {

                            loading ?
                            <span className="spinner"></span>
                            :
                            "Verify"
                        }
                    </button>
                    <p className="verify-page-bottom-text">

                        Didn't receive the code?

                        <button

                            type="button"

                            className="verify-page-resend-btn"

                            disabled={timer !==0}

                            onClick={resendCode}
                        >
                            {
                                timer !==0
                                ?

                                `Resend Code (${timer})`

                                :

                                "Resend Code"

                            }
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}



export default VerifyEmail;