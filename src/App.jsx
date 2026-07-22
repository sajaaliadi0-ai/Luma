import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landpage from "./page/landing-page";
import Login from "./page/Login";
import Work from "./page/work";
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

        <Route path="/ForgotPassword" element={<ForgotPassword />}/>

        <Route path="/VerifyEmail" element={<VerifyEmail />}/>

        <Route path="/ResetPassword" element={<ResetPassword />}/>


      </Routes>

    </BrowserRouter>
  );
}

export default App;