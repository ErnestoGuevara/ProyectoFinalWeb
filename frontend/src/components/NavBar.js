import React from "react";

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
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
              <a className="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/lunes">
                Lunes
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/martes">
                Martes
              </a>
            </li>

            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="/miercoles"
              >
                Miercoles
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/jueves">
                Jueves
              </a>
            </li>

            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="/viernes"
              >
                Viernes
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/sabado">
                Sabado
              </a>
            </li>

            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="/domingo"
              >
                Domingo
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
