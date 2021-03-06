import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/Home.css";
import { Link } from "react-router-dom";
import axios from "axios";
import GastosList from "../components/GastosList";

function Home() {

  // Function to get expenses and budget at the time the page starts
  useEffect(() => {
    getData();
    getPresupuesto()
  }, [])

  // Use state variables to set expenses and budget
  const [gastos, setGastos] = useState([]);
  const [presupuesto, setPresupuesto] = useState([]);

  // Function to get budget
  const getPresupuesto = () => {
    // Request to DB for budget
    axios.get("https://murmuring-stream-02725.herokuapp.com/api/presupuesto").then((response) => {
      // Returns the JSON object for the budget
      setPresupuesto(response.data);
    }).catch((err) => {
      // Do something for an error here
      console.log("Error Reading data " + err)
    })
  }

  // Function to get expenses
  const getData = () => {
    axios.get("https://murmuring-stream-02725.herokuapp.com/api/gastos").then((response) => {
      // Returns the JSON object for the expenses
      setGastos(response.data)
    }).catch((err) => {
      // Do something for an error here
      console.log("Error Reading data " + err)
    })
  }

  return (
    <div className="contenedor">
      <h2>Gasto Semanal</h2>
      <div className="contenedor-cards">
        <div className="container2">
          <div className="card">
            <div className="imgBx">
              <h3>Lunes</h3>
            </div>
            <div className="content">
              {/* According to the state variable "presupuesto", it filters by day to get the budget */}
              {presupuesto.filter((dato) => dato.dia.toLowerCase() === "lunes").map((pres) => (
                <p>
                  Presupuesto:<span>$</span>
                  {pres.presupuesto}
                </p>
              ))}
              {/* Props to "GastosList" component */}
              <GastosList datos={gastos} dia={"Lunes".toLowerCase()} />
              {/* Button to go to page "Lunes" */}
              <Link to="/lunes">
                <button type="button" className="btn btn-warning">
                  Editar
                </button>
              </Link>
            </div>
          </div>

          <div className="card">
            <div className="imgBx">
              <h3>Martes</h3>
            </div>
            <div className="content">
              {/* According to the state variable "presupuesto", it filters by day to get the budget */}
              {presupuesto.filter((dato) => dato.dia.toLowerCase() === "martes").map((pres) => (
                <p>
                  Presupuesto: <span>$</span>
                  {pres.presupuesto}
                </p>
              ))}
              {/* Props to "GastosList" component */}
              <GastosList datos={gastos} dia={"Martes".toLowerCase()} />
              {/* Button to go to page "martes" */}
              <Link to="/martes">
                <button type="button" className="btn btn-warning">
                  Editar
                </button>
              </Link>
            </div>
          </div>

          <div className="card">
            <div className="imgBx">
              <h3>Mi??rcoles</h3>
            </div>
            <div className="content">
              {/* According to the state variable "presupuesto", it filters by day to get the budget */}
              {presupuesto.filter((dato) => dato.dia.toLowerCase() === "miercoles").map((pres) => (
                <p>
                  Presupuesto: <span>$</span>
                  {pres.presupuesto}
                </p>
              ))}
              {/* Props to "GastosList" component */}
              <GastosList datos={gastos} dia={"Miercoles".toLowerCase()} />
              {/* Button to go to page "miercoles" */}
              <Link to="/miercoles">
                <button type="button" className="btn btn-warning">
                  Editar
                </button>
              </Link>
            </div>
          </div>

          <div className="card">
            <div className="imgBx">
              <h3>Jueves</h3>
            </div>
            <div className="content">
              {/* According to the state variable "presupuesto", it filters by day to get the budget */}
              {presupuesto.filter((dato) => dato.dia.toLowerCase() === "jueves").map((pres) => (
                <p>
                  Presupuesto: <span>$</span>
                  {pres.presupuesto}
                </p>
              ))}
              {/* Props to "GastosList" component */}
              <GastosList datos={gastos} dia={"Jueves".toLowerCase()} />
              {/* Button to go to page "jueves" */}
              <Link to="/jueves">
                <button type="button" className="btn btn-warning">
                  Editar
                </button>
              </Link>
            </div>
          </div>

          <div className="card">
            <div className="imgBx">
              <h3>Viernes</h3>
            </div>
            <div className="content">
              {/* According to the state variable "presupuesto", it filters by day to get the budget */}
              {presupuesto.filter((dato) => dato.dia.toLowerCase() === "viernes").map((pres) => (
                <p>
                  Presupuesto: <span>$</span>
                  {pres.presupuesto}
                </p>
              ))}
              {/* Props to "GastosList" component */}
              <GastosList datos={gastos} dia={"Viernes".toLowerCase()} />
              {/* Button to go to page "viernes" */}
              <Link to="/viernes">
                <button type="button" className="btn btn-warning">
                  Editar
                </button>
              </Link>
            </div>
          </div>

          <div className="card">
            <div className="imgBx">
              <h3>S??bado</h3>
            </div>
            <div className="content">
              {/* According to the state variable "presupuesto", it filters by day to get the budget */}
              {presupuesto.filter((dato) => dato.dia.toLowerCase() === "sabado").map((pres) => (
                <p>
                  Presupuesto:<span>$</span> {pres.presupuesto}
                </p>
              ))}
              {/* Props to "GastosList" component */}
              <GastosList datos={gastos} dia={"Sabado".toLowerCase()} />
              {/* Button to go to page "sabado" */}
              <Link to="/sabado">
                <button type="button" className="btn btn-warning">
                  Editar
                </button>
              </Link>
            </div>
          </div>

          <div className="card">
            <div className="imgBx">
              <h3>Domingo</h3>
            </div>
            <div className="content">
              {/* According to the state variable "presupuesto", it filters by day to get the budget */}
              {presupuesto.filter((dato) => dato.dia.toLowerCase() === "domingo").map((pres) => (
                <p>
                  Presupuesto:<span>$</span> {pres.presupuesto}
                </p>
              ))}
              {/* Props to "GastosList" component */}
              <GastosList datos={gastos} dia={"Domingo".toLowerCase()} />
              {/* Button to go to page "domingo" */}
              <Link to="/domingo">
                <button type="button" className="btn btn-warning">
                  Editar
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;