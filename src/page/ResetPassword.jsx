import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import "../css/ResetPassword.css";


function ResetPassword() {


    const navigate = useNavigate();


    const [newPassword,setNewPassword] = useState("");

    const [confirmNewPassword,setConfirmNewPassword] = useState("");


    const [showNewPassword,setShowNewPassword] = useState(false);

    const [showConfirmPassword,setShowConfirmPassword] = useState(false);


    const [strength,setStrength] = useState(0);



    const [darkMode,setDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
    );



    useEffect(()=>{


        if(darkMode){

            document.body.classList.add("dark");

            localStorage.setItem(
                "theme",
                "dark"
            );


        }else{


            document.body.classList.remove("dark");

            localStorage.setItem(
                "theme",
                "light"
            );


        }


    },[darkMode]);






    function checkPasswordStrength(password){


        let s = 0;


        if(password.length >= 8)
            s++;


        if(/[A-Z]/.test(password))
            s++;


        if(/[0-9]/.test(password))
            s++;


        if(/[^A-Za-z0-9]/.test(password))
            s++;



        setStrength(s);

    }







    async function resetPassword(){


        if(newPassword.length < 8){


            alert(
                "Password must be at least 8 characters"
            );

            return;

        }





        if(newPassword !== confirmNewPassword){


            alert(
                "Passwords do not match"
            );

            return;

        }





        try{


            const response = await fetch(

                "https://dummyjson.com/users/1",

                {

                    method:"PUT",

                    headers:{

                        "Content-Type":"application/json"

                    },


                    body:JSON.stringify({

                        password:newPassword

                    })

                }

            );



            const data = await response.json();


            console.log(data);




            if(response.ok){


                navigate("/success?type=reset");


            }else{


                alert(
                    "Reset password failed"
                );


            }





        }catch(error){


            console.log(error);


            alert(
                "Something went wrong"
            );


        }



    }





return(


<div className="resetpassword-page-wrapper">
<div className="resetpassword-page-card">

<button
className="resetpassword-page-theme-toggle"
type="button"
onClick={()=>setDarkMode(prev=>!prev)}
>

<i
className={
darkMode
?
"fa-solid fa-sun"
:
"fa-solid fa-moon"
}
></i>

</button>

<div className="resetpassword-page-header">
<div className="resetpassword-page-avatar">

   <div
    className={`resetpassword-page-robot ${
        showNewPassword || showConfirmPassword
        ?
        "resetpassword-page-robot-cover"
        :
        "resetpassword-page-robot-normal"
    }`}
>
        <div className="resetpassword-page-robot-antenna"></div>


        <div className="resetpassword-page-robot-head">


            <div className="resetpassword-page-robot-eye resetpassword-page-robot-eye-left"></div>


            <div className="resetpassword-page-robot-eye resetpassword-page-robot-eye-right"></div>


            <div className="resetpassword-page-robot-mouth"></div>


            <div className="resetpassword-page-robot-hand resetpassword-page-robot-hand-left"></div>


            <div className="resetpassword-page-robot-hand resetpassword-page-robot-hand-right"></div>


        </div>


    </div>

</div>
<h1>

Reset Password

</h1>



<p>

Create your new password

</p>



</div>









<form>



<div className="resetpassword-page-input-group">


<label>

New Password

</label>




<div className="resetpassword-page-password-field">



<input


type={
showNewPassword
?
"text"
:
"password"
}


placeholder="Enter new password"


value={newPassword}


onChange={(e)=>{


setNewPassword(e.target.value);


checkPasswordStrength(
e.target.value
);


}}



/>
<button
className="resetpassword-page-eye-btn"
type="button"
onClick={() =>
    setShowNewPassword(prev => !prev)
}
>

<i
className={
    showNewPassword
    ?
    "fa-solid fa-eye-slash"
    :
    "fa-solid fa-eye"
}
></i>

</button>
</div>

<small className="resetpassword-page-error">

</small>

<div className="resetpassword-page-strength">



<div className="resetpassword-page-strength-bar">


<div


className="resetpassword-page-strength-fill"


style={{

width:

strength===0

?

"0%"

:

strength<=2

?

"35%"

:

strength===3

?

"65%"

:

"100%"


}}


/>



</div>






<p>


{

strength===0

?

""

:

strength<=2

?

"Weak Password"

:

strength===3

?

"Medium Password"

:

"Strong Password"

}



</p>




</div>




</div>



<div className="resetpassword-page-input-group">


<label>

Confirm Password

</label>




<div className="resetpassword-page-password-field">



<input


type={

showConfirmPassword

?

"text"

:

"password"

}



placeholder="Confirm password"



value={confirmNewPassword}



onChange={(e)=>

setConfirmNewPassword(
e.target.value
)

}



/>

<button
className="resetpassword-page-eye-btn"
type="button"
onClick={() =>
    setShowConfirmPassword(prev => !prev)
}
>

<i
className={
    showConfirmPassword
    ?
    "fa-solid fa-eye-slash"
    :
    "fa-solid fa-eye"
}
></i>

</button>

</div>







<small className="resetpassword-page-error">

</small>




</div>









<button


className="resetpassword-page-btn"


type="button"


onClick={resetPassword}



>


Reset Password


</button>







</form>









<div className="resetpassword-page-footer">



<Link to="/login">


Back to Login


</Link>



</div>







</div>









<div className="resetpassword-page-success">


<div className="resetpassword-page-success-icon">

✓

</div>


<h2>

Password Updated

</h2>


<p>

Your password has been reset successfully.

</p>


</div>






</div>



);


}


export default ResetPassword;