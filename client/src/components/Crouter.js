import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "../contexts/AuthContext";
import Cnavbar from "./Cnavbar";
import CHomepage from "./CHomepage";
import CConferences from "./CConferences";
import CTalks from "./CTalks";
import CMedia from "./CMedia";
import CLogin from "./CLogin";
import CPrivateRoute from "./CPrivateRoute";
import CTest from "./CTest";

export default function Crouter() {
  return (
    <Router>
      <AuthProvider>
        <Cnavbar />
        <Routes>
          <Route path="/login" element={<CLogin />} />
          <Route path="/" element={<CPrivateRoute component={CHomepage} />} />
          <Route path="/conferences" element={<CPrivateRoute component={CConferences} />} />
          <Route path="/talks" element={<CPrivateRoute component={CTalks} />} />
          <Route path="/media" element={<CPrivateRoute component={CMedia} />} />
          <Route path="/test" element={<CPrivateRoute component={CTest} />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
