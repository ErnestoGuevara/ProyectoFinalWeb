import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: "#657275"}}>
      <div className="container-fluid">
        <button
          className="navbar-toggler collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse" id="navbarColor01">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
            <li className="nav-item">
            <Link to="/" className="nav-link active" aria-current="page">
                Calendario
              </Link>
            </li>

            <li className="nav-item">
            <Link to="/lunes" className="nav-link active" aria-current="page">
                Lunes
              </Link>
            </li>

            <li className="nav-item">
            <Link to="/martes" className="nav-link active" aria-current="page">
                Martes
              </Link>
            </li>

            <li className="nav-item">
            <Link to="/miercoles" className="nav-link active" aria-current="page">
                Miercoles
              </Link>
            </li>

            <li className="nav-item">
            <Link to="/jueves" className="nav-link active" aria-current="page">
                Jueves
              </Link>
            </li>

            <li className="nav-item">
            <Link to="/viernes" className="nav-link active" aria-current="page">
                Viernes
              </Link>
            </li>

            <li className="nav-item">
            <Link to="/sabado" className="nav-link active" aria-current="page">
                Sabado
              </Link>
            </li>

            <li className="nav-item">
            <Link to="/domingo" className="nav-link active" aria-current="page">
                Domingo
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
