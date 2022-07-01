

import React from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link
} from "react-router-dom";
//import Home from "./components/Home"
//import Lunes from "./components/Lunes"
//import Martes from "./components/Martes"
//import Miercoles from "./components/Miercoles"
//import Jueves from "./components/Jueves"
//import Viernes from "./components/Viernes"
//import Sabado from "./components/Sabado"
//import Domingo from "./components/Domingo"
import Main from "./components/Main"

function App() {
  return (
    <Router>
          
            <Routes>
              <Route exact path="/" element={<Main/>}>
              </Route>
              {/*<Route exact path="/lunes" element={<Lunes/>}>
              </Route>
              <Route exact path="/martes" element={<Martes/>}>
              </Route>
              <Route exact path="/miercoles" element={<Miercoles/>}>
              </Route>
              <Route exact path="/jueves" element={<Jueves/>}>
              </Route>
              <Route exact path="/viernes" element={<Viernes/>}>
              </Route>
              <Route exact path="/sabado" element={<Sabado/>}>
              </Route>
              <Route exact path="/domingo" element={<Domingo/>}>
              </Route>
  */}

            </Routes>

         
        </Router>
  );
}

export default App;
