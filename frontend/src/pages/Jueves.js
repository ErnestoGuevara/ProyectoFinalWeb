import React from "react";
import Formulario from "../components/Formulario";
import NavBar from "../components/NavBar";

function Jueves() {
  return (
    <div>
      <NavBar />
      {/* Send the prop "dia" to "Formulario" component */}
      <Formulario dia="Jueves" />
    </div>
  );
}

export default Jueves;
