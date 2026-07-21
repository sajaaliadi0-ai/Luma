import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landpage from "./page/landing-page";
import Login from "./page/Login";
import Work from "./page/work";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Landpage />} />

        <Route path="/login" element={<Login />} />

        <Route path="/work" element={<Work />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;