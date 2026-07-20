import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landpage from "./landing-page";
import Login from "./Login";
import Work from "./work";

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