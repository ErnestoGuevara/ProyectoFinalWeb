import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link
} from "react-router-dom";

import Lunes from "./pages/Lunes";
import Martes from "./pages/Martes";
import Miercoles from "./pages/Miercoles";
import Jueves from "./pages/Jueves";
import Viernes from "./pages/Viernes";
import Sabado from "./pages/Sabado";
import Domingo from "./pages/Domingo";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/lunes" element={<Lunes />}></Route>
        <Route exact path="/martes" element={<Martes />}></Route>
        <Route exact path="/miercoles" element={<Miercoles />}></Route>
        <Route exact path="/jueves" element={<Jueves />}></Route>
        <Route exact path="/viernes" element={<Viernes />}></Route>
        <Route exact path="/sabado" element={<Sabado />}></Route>
        <Route exact path="/domingo" element={<Domingo />}></Route>
      </Routes>
    </Router>
  )
}

export default App