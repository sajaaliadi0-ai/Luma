import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import "./css/theme.css";

import Landpage from "./page/landing-page";
import Login from "./page/Login";
import Work from "./page/Workspace";
import Register from "./page/Register";
import NewBlueprint from "./page/new-blueprint";
import ForgotPassword from "./page/ForgotPassword";
import VerifyEmail from "./page/VerifyEmail";
import ResetPassword from "./page/ResetPassword";
import  Fullpage  from "./page/fullpage";

function App() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Landpage dark={dark} setDark={setDark} />}
        />

        <Route
          path="/login"
          element={<Login dark={dark} setDark={setDark} />}
        />

        <Route
          path="/work"
          element={<Work dark={dark} setDark={setDark} />}
        />

        <Route
          path="/Register"
          element={<Register dark={dark} setDark={setDark} />}
        />

        <Route
          path="/new-blueprint"
          element={<NewBlueprint dark={dark} setDark={setDark} />}
        />

        <Route
          path="/ForgotPassword"
          element={<ForgotPassword dark={dark} setDark={setDark} />}
        />

        <Route
          path="/VerifyEmail"
          element={<VerifyEmail dark={dark} setDark={setDark} />}
        />

        <Route
          path="/ResetPassword"
          element={<ResetPassword dark={dark} setDark={setDark} />}
        />

         <Route
          path="/fullpage"
          element={<Fullpage dark={dark} setDark={setDark} />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
