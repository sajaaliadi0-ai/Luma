import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landpage from "./page/landing-page";
import Login from "./page/Login";
import Work from "./page/Workspace";
import Register from "./page/Register";
import NewBlueprint from "./page/new-blueprint";
import ForgotPassword from "./page/ForgotPassword";
import VerifyEmail from "./page/VerifyEmail";
import ResetPassword from "./page/ResetPassword";
function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Landpage />} />

        <Route path="/login" element={<Login />} />

        <Route path="/work" element={<Work />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/new-blueprint" element={<NewBlueprint />} />
   <Route path="/ForgotPassword" element={<ForgotPassword />}/>

        <Route path="/VerifyEmail" element={<VerifyEmail />}/>

        <Route path="/ResetPassword" element={<ResetPassword />}/>

      </Routes>

    </BrowserRouter>
  );
}

export default App;